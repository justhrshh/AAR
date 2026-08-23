import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../navigation/Navbar';
import { WhyUsSection } from './WhyUsSection';
import { WorkSection } from '../sections/WorkSection';
import { ServicesSection } from '../sections/ServicesSection';
import { StudioSection } from '../sections/StudioSection';
import { ContactSection } from '../sections/ContactSection';
import { Footer } from '../common/Footer';
import './HomePage.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

// Format frame index: e.g. 1 -> "/frames/frame_0001.webp"
const getFrameUrl = (index) => {
  const pad = String(index).padStart(4, '0');
  return `/frames/frame_${pad}.webp`;
};

export function HomePage({ onReplay }) {
  const containerRef = useRef(null);
  const pinViewportRef = useRef(null);
  const canvasRef = useRef(null);

  // Hero element refs (disappear in initial 0% -> 10%)
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);
  const ghostVisRef = useRef(null);
  const heroMetaRef = useRef(null);
  const canvasWrapperRef = useRef(null);

  // Progressive About element refs (glide in step-by-step with scroll)
  const aboutLeftRef = useRef(null);
  const aboutRightRef = useRef(null);
  const aboutEyebrowRef = useRef(null);
  const aboutBrandRef = useRef(null);
  const aboutDashRef = useRef(null);
  const aboutStatementRef = useRef(null);
  const aboutTagsRef = useRef(null);

  const aboutIdentityHeaderRef = useRef(null);
  const aboutIdentityBodyRef = useRef(null);
  const aboutDividerRef = useRef(null);
  const aboutImpactEyebrowRef = useRef(null);
  const aboutImpactHeadlineRef = useRef(null);
  const aboutMetaRef = useRef(null);

  // Crafting Black Panel & Typography refs
  const craftingPanelRef = useRef(null);
  const craftingHeadlineWrapRef = useRef(null);
  const craftingWord1CRAFT = useRef(null);
  const craftingWireframeI = useRef(null);
  const craftingSolidI = useRef(null);
  const craftingWord1NG = useRef(null);
  const craftingWireframeD = useRef(null);
  const craftingSolidD = useRef(null);
  const craftingWord2IGITAL = useRef(null);
  const craftingWireframeE = useRef(null);
  const craftingSolidE = useRef(null);
  const craftingWord3XPERIENCES = useRef(null);
  const craftingWord4TH = useRef(null);
  const craftingWireframeA = useRef(null);
  const craftingSolidA = useRef(null);
  const craftingWord4T = useRef(null);
  const craftingWord5CONVERT = useRef(null);

  // Images cache
  const imagesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cinematic auto-scroll / smooth snap controller
  const isAutoScrollingRef = useRef(false);
  const snapTweenRef = useRef(null);
  const lastRenderedFrameRef = useRef(-1);

  // Smooth cinematic snap to target position (Ultra-gentle film glide)
  const snapTo = useCallback((targetY, customDuration) => {
    if (isAutoScrollingRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      return;
    }

    isAutoScrollingRef.current = true;

    if (snapTweenRef.current) {
      snapTweenRef.current.kill();
    }

    const scrollProxy = { y: window.scrollY };
    const distance = Math.abs(targetY - scrollProxy.y);
    // 7.5s - 8.5s peaceful luxury film speed (approx 28-30fps playback rate)
    const duration = customDuration || Math.min(8.5, Math.max(7.2, (distance / 800) * 7.6));

    snapTweenRef.current = gsap.to(scrollProxy, {
      y: targetY,
      duration: duration,
      ease: 'power1.inOut', // Very gentle, progressive, peaceful acceleration/deceleration
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y);
        ScrollTrigger.update();
      },
      onComplete: () => {
        setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 150);
      }
    });
  }, []);

  // Draw a specific frame to the canvas with frame caching
  const renderFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const clampedIndex = Math.max(1, Math.min(TOTAL_FRAMES, frameNumber));
    if (lastRenderedFrameRef.current === clampedIndex) return;

    const img = imagesRef.current[clampedIndex - 1];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastRenderedFrameRef.current = clampedIndex;
    }
  }, []);

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const images = [];
    let loadedCount = 0;

    // Load Frame 1 immediately for instant first-paint
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      if (!isCancelled) {
        images[0] = firstImg;
        renderFrame(1);
        setIsLoaded(true);
      }
    };
    images.push(firstImg);

    // Preload remaining frames in background
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  // Mouse parallax interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const mx = (e.clientX / innerWidth - 0.5) * 2;
      const my = (e.clientY / innerHeight - 0.5) * 2;

      if (canvasWrapperRef.current) {
        gsap.to(canvasWrapperRef.current, {
          x: mx * 10,
          y: my * 6,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Wheel & Touch gesture detection for smooth cinematic snap between Hero and About
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAutoScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.offsetHeight - window.innerHeight;
      const aboutEndpoint = maxScroll * 0.42; // Exact position of complete About state
      const currentY = window.scrollY;

      // Downward intentional scroll from Hero -> Ultra-gentle, slow 30fps film disassembly to About
      if (e.deltaY > 18 && currentY < aboutEndpoint * 0.5) {
        e.preventDefault();
        snapTo(aboutEndpoint, 7.8);
      }
      // Upward intentional scroll from About -> Ultra-gentle, slow 30fps film assembly to Hero
      else if (e.deltaY < -18 && currentY > aboutEndpoint * 0.6 && currentY <= aboutEndpoint + 80) {
        e.preventDefault();
        snapTo(0, 7.0);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isAutoScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const container = containerRef.current;
      if (!container) return;

      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      const maxScroll = container.offsetHeight - window.innerHeight;
      const aboutEndpoint = maxScroll * 0.42;
      const currentY = window.scrollY;

      // Intentional swipe down from Hero -> Snap to About
      if (deltaY > 35 && currentY < aboutEndpoint * 0.5) {
        e.preventDefault();
        snapTo(aboutEndpoint, 7.8);
      } 
      // Intentional swipe up from About -> Snap to Hero
      else if (deltaY < -35 && currentY > aboutEndpoint * 0.6 && currentY <= aboutEndpoint + 80) {
        e.preventDefault();
        snapTo(0, 7.0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (snapTweenRef.current) {
        snapTweenRef.current.kill();
      }
    };
  }, [snapTo]);

  // Setup GSAP ScrollTrigger Sequence
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    renderFrame(1);

    const ctx = gsap.context(() => {
      const frameObj = { frame: 1 };

      // 0. Orchestrated Hero Entrance Animation (Plays gracefully upon Loader completion)
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set(canvasWrapperRef.current, { autoAlpha: 0, scale: 0.90 });
      gsap.set(ghostVisRef.current, { autoAlpha: 0, y: -25 });
      gsap.set('.hero-eyebrow', { autoAlpha: 0, y: 20 });
      gsap.set('.hero-headline__line', { autoAlpha: 0, y: 40 });
      gsap.set('.hero-body', { autoAlpha: 0, y: 25 });
      gsap.set('.hero-cta', { autoAlpha: 0, y: 20, scale: 0.94 });
      gsap.set('.hero-socials__link', { autoAlpha: 0, y: 15 });
      gsap.set('.hero-vision-marker', { autoAlpha: 0, x: 25 });
      gsap.set('.service-link', { autoAlpha: 0, x: 35 });
      gsap.set('.hero-scroll', { autoAlpha: 0, y: 20 });

      entranceTl
        .to(canvasWrapperRef.current, { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, 0.1)
        .to(ghostVisRef.current, { autoAlpha: 0.45, y: 0, duration: 1.4 }, 0.2)
        .to('.hero-eyebrow', { autoAlpha: 1, y: 0, duration: 0.8 }, 0.35)
        .to('.hero-headline__line', { autoAlpha: 1, y: 0, duration: 1.0, stagger: 0.14 }, 0.45)
        .to('.hero-body', { autoAlpha: 1, y: 0, duration: 0.9 }, 0.8)
        .to('.hero-cta', { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 }, 0.95)
        .to('.hero-socials__link', { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1.1)
        .to('.hero-vision-marker', { autoAlpha: 1, x: 0, duration: 0.8 }, 0.5)
        .to('.service-link', { autoAlpha: 1, x: 0, duration: 0.85, stagger: 0.12 }, 0.65)
        .to('.hero-scroll', { autoAlpha: 1, y: 0, duration: 0.8 }, 1.0);

      // 1. Initial Hero states (Active at 0% scroll)
      gsap.set([heroLeftRef.current, heroRightRef.current, heroMetaRef.current], {
        autoAlpha: 1,
        x: 0,
        y: 0
      });

      // 2. Initial About states (Hidden, primed for glide-in)
      gsap.set([aboutLeftRef.current, aboutRightRef.current], {
        autoAlpha: 0
      });

      const aboutItems = [
        aboutEyebrowRef.current,
        aboutBrandRef.current,
        aboutDashRef.current,
        aboutStatementRef.current,
        aboutTagsRef.current,
        aboutIdentityHeaderRef.current,
        aboutIdentityBodyRef.current,
        aboutDividerRef.current,
        aboutImpactEyebrowRef.current,
        aboutImpactHeadlineRef.current
      ];

      gsap.set(aboutItems, {
        autoAlpha: 0,
        y: 28
      });

      // Crafting Black Panel & Typography initial states (Completely hidden above viewport)
      gsap.set(craftingPanelRef.current, {
        yPercent: -105,
        borderBottomLeftRadius: 'clamp(36px, 6vw, 80px)',
        borderBottomRightRadius: 'clamp(36px, 6vw, 80px)'
      });

      gsap.set(craftingHeadlineWrapRef.current, {
        y: 80,
        autoAlpha: 0.2
      });

      gsap.set(craftingWord1CRAFT.current, { autoAlpha: 1, y: 0 });

      gsap.set([craftingWireframeI.current, craftingWireframeD.current, craftingWireframeE.current, craftingWireframeA.current], {
        autoAlpha: 0,
        y: 28,
        scale: 0.92
      });

      gsap.set([craftingSolidI.current, craftingSolidD.current, craftingSolidE.current, craftingSolidA.current], {
        autoAlpha: 0
      });

      gsap.set([
        craftingWord1NG.current,
        craftingWord2IGITAL.current,
        craftingWord3XPERIENCES.current,
        craftingWord4TH.current,
        craftingWord4T.current,
        craftingWord5CONVERT.current
      ], {
        autoAlpha: 0,
        y: 30
      });

      // 3. Main GSAP Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1, // 1:1 Instant sync with scroll tweens
          pin: pinViewportRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress <= 0.001) {
              renderFrame(1);
            }
          }
        }
      });

      // =========================================================================
      // PHASE 1: Hero UI Disappears (0.00 -> 0.06)
      // =========================================================================
      mainTl
        .to(heroLeftRef.current, {
          autoAlpha: 0,
          y: -30,
          duration: 0.06,
          ease: 'power2.inOut'
        }, 0)
        .to(heroRightRef.current, {
          autoAlpha: 0,
          x: 30,
          duration: 0.06,
          ease: 'power2.inOut'
        }, 0)
        .to(heroMetaRef.current, {
          autoAlpha: 0,
          duration: 0.05,
          ease: 'power1.inOut'
        }, 0)
        .to(ghostVisRef.current, {
          opacity: 0.20,
          y: -10,
          duration: 0.08,
          ease: 'none'
        }, 0);

      // =========================================================================
      // PHASE 2: Cube Frame Scrubbing (0.04 -> 0.36)
      // Cube disassembles as you scroll through its layers
      // =========================================================================
      mainTl.to(frameObj, {
        frame: TOTAL_FRAMES,
        ease: 'none',
        duration: 0.32,
        onUpdate: () => {
          renderFrame(Math.round(frameObj.frame));
        }
      }, 0.04);

      // =========================================================================
      // PHASE 3 & 4: Progressive Glide-In of About Elements (0.12 -> 0.38)
      // =========================================================================
      
      // Reveal About column containers
      mainTl.to([aboutLeftRef.current, aboutRightRef.current], {
        autoAlpha: 1,
        duration: 0.04
      }, 0.12);

      // 1. "WE ARE" Eyebrow (Scroll ~12% -> 18%)
      mainTl.to(aboutEyebrowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.12);

      // 2. "AAR VISUALS" Brand Header (Scroll ~16% -> 22%)
      mainTl.to(aboutBrandRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.16);

      // 3. "OUR IDENTITY" Header on right (Scroll ~18% -> 24%)
      mainTl.to(aboutIdentityHeaderRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.18);

      // 4. Gold Dash (Scroll ~22% -> 28%)
      mainTl.to(aboutDashRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.22);

      // 5. Studio Statement on left (Scroll ~24% -> 30%)
      mainTl.to(aboutStatementRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.24);

      // 6. Identity Paragraph on right (Scroll ~26% -> 32%)
      mainTl.to(aboutIdentityBodyRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.26);

      // 7. Gold Divider line on right (Scroll ~30% -> 34%)
      mainTl.to(aboutDividerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.04,
        ease: 'power2.out'
      }, 0.30);

      // 8. "WE TURN" Eyebrow on right (Scroll ~32% -> 36%)
      mainTl.to(aboutImpactEyebrowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.04,
        ease: 'power2.out'
      }, 0.32);

      // 9. "IDEAS INTO IMPACT." Headline on right (Scroll ~34% -> 38%)
      mainTl.to(aboutImpactHeadlineRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.34);

      // 10. "BRAND | DESIGN | VISUAL" Tags on left (Scroll ~36% -> 40%)
      mainTl.to(aboutTagsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.36);

      // =========================================================================
      // [STABLE ABOUT HOLD ZONE: 0.38 -> 0.65]
      // Full About section sits rock-solid in the viewport.
      // Nothing else moves until user explicitly scrolls past 0.65!
      // =========================================================================

      // =========================================================================
      // PHASE 5: The Black Screen Transition (Starts ONLY when user scrolls past 0.65)
      // Panel sweeps DOWN from TOP directly over the hero in the pinned viewport
      // =========================================================================
      mainTl
        .to(craftingPanelRef.current, {
          yPercent: 0,
          ease: 'none',
          duration: 0.28
        }, 0.65)
        .to(craftingHeadlineWrapRef.current, {
          y: 0,
          autoAlpha: 1,
          ease: 'power2.out',
          duration: 0.26
        }, 0.65);

      // Progressive typography assembly (0.67 -> 0.93)
      // 1. Wireframe "I" enters (0.67 -> 0.71)
      mainTl.to(craftingWireframeI.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.04,
        ease: 'power2.out'
      }, 0.67);

      // 2. "I" turns solid + "NG" reveals -> "CRAFTING" complete (0.71 -> 0.76)
      mainTl
        .to(craftingWireframeI.current, { autoAlpha: 0, duration: 0.02 }, 0.71)
        .to(craftingSolidI.current, { autoAlpha: 1, duration: 0.02 }, 0.71)
        .to(craftingWord1NG.current, { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.72);

      // 3. Wireframe "D" enters (0.74 -> 0.78)
      mainTl.to(craftingWireframeD.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.04,
        ease: 'power2.out'
      }, 0.74);

      // 4. "D" turns solid + "IGITAL" reveals -> "CRAFTING DIGITAL" complete (0.78 -> 0.83)
      mainTl
        .to(craftingWireframeD.current, { autoAlpha: 0, duration: 0.02 }, 0.78)
        .to(craftingSolidD.current, { autoAlpha: 1, duration: 0.02 }, 0.78)
        .to(craftingWord2IGITAL.current, { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.79);

      // 5. Wireframe "E" enters (0.80 -> 0.84)
      mainTl.to(craftingWireframeE.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.04,
        ease: 'power2.out'
      }, 0.80);

      // 6. "E" turns solid + "XPERIENCES" reveals -> "CRAFTING DIGITAL EXPERIENCES" complete (0.84 -> 0.88)
      mainTl
        .to(craftingWireframeE.current, { autoAlpha: 0, duration: 0.02 }, 0.84)
        .to(craftingSolidE.current, { autoAlpha: 1, duration: 0.02 }, 0.84)
        .to(craftingWord3XPERIENCES.current, { autoAlpha: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.85);

      // 7. "TH" + Wireframe "A" enters (0.86 -> 0.90)
      mainTl
        .to(craftingWord4TH.current, { autoAlpha: 1, y: 0, duration: 0.03, ease: 'power2.out' }, 0.86)
        .to(craftingWireframeA.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.04, ease: 'power2.out' }, 0.87);

      // 8. "A" turns solid + "T" reveals -> "THAT" complete (0.90 -> 0.93)
      mainTl
        .to(craftingWireframeA.current, { autoAlpha: 0, duration: 0.02 }, 0.90)
        .to(craftingSolidA.current, { autoAlpha: 1, duration: 0.02 }, 0.90)
        .to(craftingWord4T.current, { autoAlpha: 1, y: 0, duration: 0.03, ease: 'power2.out' }, 0.91);

      // 9. "CONVERT." reveals -> Full statement assembled! (0.93 -> 0.97)
      mainTl.to(craftingWord5CONVERT.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.04,
        ease: 'power2.out'
      }, 0.93);

      // Refresh ScrollTrigger calculations
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);

    }, container);

    return () => ctx.revert();
  }, [renderFrame, isLoaded]);

  const handleNavNavigate = useCallback((item) => {
    if (item === 'TOP' || item === 'WORK') {
      snapTo(0, 2.0);
    } else if (item === 'ABOUT' && containerRef.current) {
      const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
      snapTo(maxScroll * 0.42, 2.4);
    } else if (item === 'SERVICES' || item === 'STUDIO' || item === 'WHY US') {
      const sectionEl = document.getElementById('services');
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const sectionEl = document.getElementById(item.toLowerCase());
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [snapTo]);

  return (
    <>
    {/* Global Persistent Fixed Navbar */}
    <Navbar onReplay={onReplay} onNavigate={handleNavNavigate} />

    <div className="aar-scroll-container" ref={containerRef}>
      {/* Viewport pinned during the scroll sequence */}
      <div className="aar-hero-pin-viewport" ref={pinViewportRef}>
        
        {/* Layer 0: Ghost VISIBILITY Background */}
        <div className="ghost-visibility" ref={ghostVisRef}>
          <span className="ghost-visibility__text">VISIBILITY</span>
        </div>

        {/* Layer 2: 60fps Canvas Frame Scrubber */}
        <div className="hero-canvas-wrapper" ref={canvasWrapperRef}>
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="hero-frame-canvas"
          />
        </div>

        {/* Layer 3: HERO STAGE OVERLAYS (Active at 0% scroll, fades out 0% -> 10%) */}
        <div className="hero-overlay-grid">
          
          {/* Left Column */}
          <div className="hero-left" ref={heroLeftRef}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow__dash" />
              <span className="hero-eyebrow__text">CREATIVE VISUAL STUDIO</span>
            </div>

            <h1 className="hero-headline">
              <span className="hero-headline__line">WE DESIGN</span>
              <span className="hero-headline__line">VISUALS THAT</span>
              <span className="hero-headline__line hero-headline__line--gold">CONNECT.</span>
            </h1>

            <p className="hero-body">
              We help brands communicate with clarity through branding, digital experiences and motion.
            </p>

            <a
              href="#work"
              className="hero-cta"
              onClick={(e) => {
                e.preventDefault();
                if (containerRef.current) {
                  const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
                  snapTo(maxScroll * 0.42, 2.2);
                }
              }}
            >
              <span className="hero-cta__text">EXPLORE OUR WORK</span>
              <div className="hero-cta__btn">→</div>
            </a>

            <div className="hero-socials">
              {['IG', 'BE', 'LI', 'DR'].map((s) => (
                <a key={s} href={`#${s.toLowerCase()}`} className="hero-socials__link">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="hero-right" ref={heroRightRef}>
            <div className="hero-vision-marker">
              <div className="hero-vision-dot" />
              <div className="hero-vision-text">
                <span>A VISION</span>
                <span>TO VISIBILITY</span>
              </div>
            </div>

            <div className="service-links">
              {[
                {
                  key: 'branding',
                  label: 'BRANDING',
                  icon: (
                    <svg width="100%" height="100%" viewBox="0 0 80 56" fill="none">
                      <path d="M12 48 L40 12 L68 48 Z" fill="#cfcac1" fillOpacity="0.8" />
                      <path d="M40 12 L68 48 L40 48 Z" fill="#9e988e" fillOpacity="0.7" />
                      <rect x="24" y="28" width="32" height="1.5" fill="#4a4844" fillOpacity="0.7" />
                      <rect x="28" y="36" width="24" height="1.2" fill="#4a4844" fillOpacity="0.5" />
                    </svg>
                  )
                },
                {
                  key: 'digital',
                  label: 'DIGITAL',
                  icon: (
                    <svg width="100%" height="100%" viewBox="0 0 80 56" fill="none">
                      <path d="M4 38 C24 16, 52 46, 76 22" stroke="#1a1a1e" strokeWidth="2" fill="none" />
                      <path d="M4 42 C24 20, 52 50, 76 26" stroke="#4a4a55" strokeWidth="1.2" fill="none" opacity="0.6" />
                      <polygon points="38,24 44,28 38,32" fill="#111111" fillOpacity="0.85" />
                    </svg>
                  )
                },
                {
                  key: 'motion',
                  label: 'MOTION',
                  icon: (
                    <svg width="100%" height="100%" viewBox="0 0 80 56" fill="none">
                      <circle cx="40" cy="28" r="22" stroke="#222228" strokeWidth="1.5" />
                      <circle cx="40" cy="28" r="16" stroke="#555562" strokeWidth="1.2" opacity="0.7" />
                      <polygon points="38,23 45,28 38,33" fill="#111111" fillOpacity="0.85" />
                    </svg>
                  )
                }
              ].map(({ key, label, icon }) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="service-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (containerRef.current) {
                      const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
                      snapTo(maxScroll * 0.5, 1.8);
                    }
                  }}
                >
                  <div className="service-link__thumb">
                    <div className="service-link__thumb-inner">{icon}</div>
                  </div>
                  <span className="service-link__label">{label}</span>
                  <span className="service-link__arrow">→</span>
                </a>
              ))}
            </div>

            <div
              className="hero-scroll"
              onClick={() => {
                if (containerRef.current) {
                  const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
                  snapTo(maxScroll, 2.2);
                }
              }}
            >
              <div className="hero-scroll__btn">↓</div>
              <span className="hero-scroll__text">SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>

        {/* Hero Bottom Meta Bar */}
        <div className="hero-meta" ref={heroMetaRef}>
          <span className="hero-meta__item">NEW DELHI, INDIA</span>
          <span className="hero-meta__item">28.6139° N, 77.2090° E</span>
          <span className="hero-meta__item">
            EST. 2026
            <span className="hero-meta__dot" />
          </span>
        </div>

        {/* Layer 4: ABOUT STAGE OVERLAYS (Progressive Glide-In as you scroll) */}
        <div className="about-overlay-grid">
          
          {/* About Left Column */}
          <div className="about-left" ref={aboutLeftRef}>
            <div className="about-eyebrow" ref={aboutEyebrowRef}>WE ARE</div>
            
            <div className="about-brand" ref={aboutBrandRef}>
              <img
                src="/images/aar_logo.png"
                alt="AAR"
                className="about-brand__logo"
              />
              <div className="about-brand__sub">
                <span>V</span>
                <span>I</span>
                <span>S</span>
                <span>U</span>
                <span>A</span>
                <span>L</span>
                <span>S</span>
              </div>
            </div>

            <div className="about-gold-dash" ref={aboutDashRef} />

            <div className="about-studio-statement" ref={aboutStatementRef}>
              <p>A CREATIVE VISUAL STUDIO</p>
              <p>CRAFTING EXPERIENCES</p>
              <p>
                THAT <span className="about-gold-word">CONNECT.</span>
              </p>
            </div>

            <div className="about-tags" ref={aboutTagsRef}>
              <span>BRAND</span>
              <span className="about-tags__sep">|</span>
              <span>DESIGN</span>
              <span className="about-tags__sep">|</span>
              <span>VISUAL</span>
            </div>
          </div>

          {/* About Right Column */}
          <div className="about-right" ref={aboutRightRef}>
            <div className="about-identity-header" ref={aboutIdentityHeaderRef}>OUR IDENTITY</div>

            <p className="about-identity-body" ref={aboutIdentityBodyRef}>
              AAR Visuals is more than a name. It represents our belief in clarity, creativity and commitment. We promise designs that speak, experiences that engage and partnerships that grow.
            </p>

            <div className="about-divider-line" ref={aboutDividerRef}>
              <div className="about-divider-line__gold" />
            </div>

            <div className="about-impact-block">
              <span className="about-impact__eyebrow" ref={aboutImpactEyebrowRef}>WE TURN</span>
              <div className="about-impact__headline" ref={aboutImpactHeadlineRef}>
                <span className="about-impact__word">IDEAS</span>
                <span className="about-impact__word about-impact__word--italic">INTO</span>
                <span className="about-impact__word">
                  IMPACT<span className="about-gold-dot">.</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 5: Integrated Crafting Black Panel Scroll Transition (Animates in from TOP) */}
        <div ref={craftingPanelRef} className="crafting-black-panel">
          
          {/* Chapter Manifesto Marker */}
          <div className="crafting-chapter-tag">
            <span className="crafting-chapter-dash" />
            <span className="crafting-chapter-text">AAR VISUALS • MANIFESTO</span>
          </div>

          {/* Progressive Animated Headline (Animates in from BOTTOM) */}
          <div ref={craftingHeadlineWrapRef} className="crafting-headline-wrap">
            <h2 className="crafting-headline">
              
              {/* WORD 1: CRAFTING (CRAFT + I [wireframe/solid] + NG) */}
              <span className="crafting-word">
                <span ref={craftingWord1CRAFT} className="crafting-glyph-solid">CRAFT</span>
                
                <span className="crafting-special-char-wrap">
                  <span ref={craftingWireframeI} className="crafting-glyph-wireframe">I</span>
                  <span ref={craftingSolidI} className="crafting-glyph-solid crafting-glyph-solid--accent">I</span>
                </span>
                
                <span ref={craftingWord1NG} className="crafting-glyph-solid">NG</span>
              </span>

              {/* WORD 2: DIGITAL (D [wireframe/solid] + IGITAL) */}
              <span className="crafting-word">
                <span className="crafting-special-char-wrap">
                  <span ref={craftingWireframeD} className="crafting-glyph-wireframe">D</span>
                  <span ref={craftingSolidD} className="crafting-glyph-solid crafting-glyph-solid--accent">D</span>
                </span>
                
                <span ref={craftingWord2IGITAL} className="crafting-glyph-solid">IGITAL</span>
              </span>

              {/* WORD 3: EXPERIENCES (E [wireframe/solid] + XPERIENCES) */}
              <span className="crafting-word">
                <span className="crafting-special-char-wrap">
                  <span ref={craftingWireframeE} className="crafting-glyph-wireframe">E</span>
                  <span ref={craftingSolidE} className="crafting-glyph-solid crafting-glyph-solid--accent">E</span>
                </span>
                
                <span ref={craftingWord3XPERIENCES} className="crafting-glyph-solid">XPERIENCES</span>
              </span>

              {/* WORD 4: THAT (TH + A [wireframe/solid] + T) */}
              <span className="crafting-word">
                <span ref={craftingWord4TH} className="crafting-glyph-solid">TH</span>
                
                <span className="crafting-special-char-wrap">
                  <span ref={craftingWireframeA} className="crafting-glyph-wireframe">A</span>
                  <span ref={craftingSolidA} className="crafting-glyph-solid crafting-glyph-solid--accent">A</span>
                </span>
                
                <span ref={craftingWord4T} className="crafting-glyph-solid">T</span>
              </span>

              {/* WORD 5: CONVERT */}
              <span className="crafting-word">
                <span ref={craftingWord5CONVERT} className="crafting-glyph-solid crafting-glyph-solid--gold">
                  CONVERT<span className="crafting-dot">.</span>
                </span>
              </span>

            </h2>
          </div>

          {/* Bottom Subtext */}
          <div className="crafting-footer-note">
            <span>TACTILE CLARITY</span>
            <span className="crafting-footer-sep">•</span>
            <span>UNCOMPROMISING PRECISION</span>
          </div>

        </div>

      </div>
    </div>

    {/* Section 2: WHY US Physical Assembly Scroll Sequence */}
    <WhyUsSection />

    {/* Section 3: SELECTED WORK / ASYMMETRIC PROJECT ARCHIVE */}
    <WorkSection />

    {/* Section 4: CAPABILITIES & 5-STEP METHODOLOGY */}
    <ServicesSection />

    {/* Section 5: STUDIO PHILOSOPHY & PRINCIPLES */}
    <StudioSection />

    {/* Section 6: BESPOKE CONTACT & INQUIRY */}
    <ContactSection />

    {/* Section 7: SHARED EDITORIAL FOOTER */}
    <Footer theme="light" />
    </>
  );
}

export default HomePage;
