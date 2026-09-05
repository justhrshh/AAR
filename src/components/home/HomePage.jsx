import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../navigation/Navbar';
import { Skiper31 } from './Skiper31';
import { ZoomParallax } from './ZoomParallax';
import { WorkSection } from '../sections/WorkSection';
import { ServicesSection } from '../sections/ServicesSection';
import { StudioSection } from '../sections/StudioSection';
import { JoinMicroSection } from './JoinMicroSection';
import { ContactSection } from '../sections/ContactSection';
import { Footer } from '../common/Footer';
import { SplitText } from '../ui/SplitText';
import { TypewriterText } from '../ui/TypewriterText';
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
  const aboutScrollHintRef = useRef(null);
  const aboutMetaRef = useRef(null);

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

  // Offscreen pre-rendered feather mask canvas (cached for peak 60fps performance)
  const maskCanvasRef = useRef(null);

  const getMaskCanvas = useCallback(() => {
    if (maskCanvasRef.current) return maskCanvasRef.current;
    const w = 1920;
    const h = 1080;
    const mask = document.createElement('canvas');
    mask.width = w;
    mask.height = h;
    const mCtx = mask.getContext('2d');
    if (!mCtx) return null;

    // 1. Horizontal gradient: velvet-smooth fade into paper cream at left & right borders
    const hGrad = mCtx.createLinearGradient(0, 0, w, 0);
    hGrad.addColorStop(0, 'rgba(0,0,0,0)');
    hGrad.addColorStop(0.12, 'rgba(0,0,0,1)');
    hGrad.addColorStop(0.88, 'rgba(0,0,0,1)');
    hGrad.addColorStop(1, 'rgba(0,0,0,0)');
    mCtx.fillStyle = hGrad;
    mCtx.fillRect(0, 0, w, h);

    // 2. Vertical gradient: micro-feather at top (0-16px) & bottom (1055-1080px) preserving 100% of orbital rings & shadow
    mCtx.globalCompositeOperation = 'destination-in';
    const vGrad = mCtx.createLinearGradient(0, 0, 0, h);
    vGrad.addColorStop(0, 'rgba(0,0,0,0)');
    vGrad.addColorStop(0.015, 'rgba(0,0,0,1)');
    vGrad.addColorStop(0.975, 'rgba(0,0,0,1)');
    vGrad.addColorStop(1, 'rgba(0,0,0,0)');
    mCtx.fillStyle = vGrad;
    mCtx.fillRect(0, 0, w, h);

    // 3. Elliptical radial corner dissolution ensuring all 4 far corners smoothly dissolve without dark vignette
    mCtx.save();
    mCtx.scale(1.0, h / w);
    const cyScaled = (h * 0.5) * (w / h);
    const rGrad = mCtx.createRadialGradient(w * 0.5, cyScaled, 320, w * 0.5, cyScaled, 860);
    rGrad.addColorStop(0, 'rgba(0,0,0,1)');
    rGrad.addColorStop(0.55, 'rgba(0,0,0,1)');
    rGrad.addColorStop(0.80, 'rgba(0,0,0,0.45)');
    rGrad.addColorStop(1, 'rgba(0,0,0,0)');
    mCtx.fillStyle = rGrad;
    mCtx.fillRect(0, 0, w, cyScaled * 2);
    mCtx.restore();

    maskCanvasRef.current = mask;
    return mask;
  }, []);

  // Draw a specific frame to the canvas with frame caching & seamless feathering
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

      // Seamless atmospheric feathering: zeros out alpha at canvas borders with 0.2 RGB discontinuity
      const mask = getMaskCanvas();
      if (mask) {
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(mask, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }

      lastRenderedFrameRef.current = clampedIndex;
    }
  }, [getMaskCanvas]);

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
      const currentY = window.scrollY;

      // Downward intentional scroll from Hero -> Ultra-gentle, slow 30fps film disassembly to About
      if (e.deltaY > 18 && currentY < maxScroll * 0.45) {
        e.preventDefault();
        snapTo(maxScroll, 7.8);
      }
      // Upward intentional scroll from About -> Ultra-gentle, slow 30fps film assembly to Hero
      else if (e.deltaY < -18 && currentY > maxScroll * 0.55 && currentY <= maxScroll + 80) {
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
      const currentY = window.scrollY;

      // Intentional swipe down from Hero -> Snap to About
      if (deltaY > 35 && currentY < maxScroll * 0.45) {
        e.preventDefault();
        snapTo(maxScroll, 7.8);
      } 
      // Intentional swipe up from About -> Snap to Hero
      else if (deltaY < -35 && currentY > maxScroll * 0.55 && currentY <= maxScroll + 80) {
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
        aboutImpactHeadlineRef.current,
        aboutScrollHintRef.current
      ];

      gsap.set(aboutItems, {
        autoAlpha: 0,
        y: 28
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
      // PHASE 1: Hero UI Disappears (0.00 -> 0.10)
      // =========================================================================
      mainTl
        .to(heroLeftRef.current, {
          autoAlpha: 0,
          y: -30,
          duration: 0.10,
          ease: 'power2.inOut'
        }, 0)
        .to(heroRightRef.current, {
          autoAlpha: 0,
          x: 30,
          duration: 0.10,
          ease: 'power2.inOut'
        }, 0)
        .to(heroMetaRef.current, {
          autoAlpha: 0,
          duration: 0.08,
          ease: 'power1.inOut'
        }, 0)
        .to(ghostVisRef.current, {
          opacity: 0.20,
          y: -10,
          duration: 0.12,
          ease: 'none'
        }, 0);

      // =========================================================================
      // PHASE 2: Cube Frame Scrubbing (0.08 -> 0.88)
      // Cube disassembles as you scroll through its layers
      // =========================================================================
      mainTl.to(frameObj, {
        frame: TOTAL_FRAMES,
        ease: 'none',
        duration: 0.80,
        onUpdate: () => {
          renderFrame(Math.round(frameObj.frame));
        }
      }, 0.08);

      // =========================================================================
      // PHASE 3 & 4: Progressive Glide-In of About Elements (0.18 -> 0.86)
      // =========================================================================
      
      // Reveal About column containers
      mainTl.to([aboutLeftRef.current, aboutRightRef.current], {
        autoAlpha: 1,
        duration: 0.10
      }, 0.18);

      // 1. "WE ARE" Eyebrow (Scroll ~20% -> 32%)
      mainTl.to(aboutEyebrowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.20);

      // 2. "AAR VISUALS" Brand Header (Scroll ~28% -> 40%)
      mainTl.to(aboutBrandRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.28);

      // 3. "OUR IDENTITY" Header on right (Scroll ~34% -> 46%)
      mainTl.to(aboutIdentityHeaderRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.34);

      // 4. Gold Dash (Scroll ~40% -> 52%)
      mainTl.to(aboutDashRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.40);

      // 5. Studio Statement on left (Scroll ~46% -> 58%)
      mainTl.to(aboutStatementRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.46);

      // 6. Identity Paragraph on right (Scroll ~52% -> 64%)
      mainTl.to(aboutIdentityBodyRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.52);

      // 7. Gold Divider line on right (Scroll ~60% -> 70%)
      mainTl.to(aboutDividerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.60);

      // 8. "WE TURN" Eyebrow on right (Scroll ~66% -> 76%)
      mainTl.to(aboutImpactEyebrowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.66);

      // 9. "IDEAS INTO IMPACT." Headline on right (Scroll ~72% -> 82%)
      mainTl.to(aboutImpactHeadlineRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.72);

      // 10. "BRAND | DESIGN | VISUAL" Tags on left (Scroll ~76% -> 86%)
      mainTl.to(aboutTagsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.76);

      // 11. "SCROLL TO SEE MORE" Indicator at About bottom (Scroll ~78% -> 88%)
      mainTl.to(aboutScrollHintRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.78);

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
      snapTo(maxScroll, 2.4);
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
            <div className="hero-left__top">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow__dash" />
                <TypewriterText
                  words={[
                    "CREATIVE VISUAL STUDIO",
                    "IDENTITY & MOTION SYSTEMS",
                    "BESPOKE DIGITAL ARCHITECTURE",
                    "SENSORIAL BRAND EXPERIENCES"
                  ]}
                  speed={55}
                  deleteSpeed={35}
                  pauseTime={2500}
                  loop={true}
                  cursorChar="|"
                  className="hero-eyebrow__text"
                />
              </div>

              <h1 className="hero-headline">
                <span className="hero-headline__line">
                  <SplitText text="WE DESIGN" type="chars" delay={0.2} stagger={0.03} />
                </span>
                <span className="hero-headline__line">
                  <SplitText text="VISUALS THAT" type="chars" delay={0.5} stagger={0.03} />
                </span>
                <span className="hero-headline__line hero-headline__line--gold">
                  <SplitText text="CONNECT." type="chars" delay={0.8} stagger={0.035} />
                </span>
              </h1>
            </div>

            <div className="hero-left__bottom">
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
                    snapTo(maxScroll, 2.2);
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
            <div className="about-left__top">
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
            </div>

            <div className="about-left__bottom">
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

        {/* About Bottom Scroll Hint */}
        <div className="about-scroll-hint" ref={aboutScrollHintRef}>
          <span className="about-scroll-hint__text">SCROLL TO SEE MORE</span>
          <div className="about-scroll-hint__line" />
        </div>

      </div>
    </div>

    {/* Section 2: SCATTERED CHARACTER ASSEMBLY (Skiper31) */}
    <Skiper31 />

    {/* Section 3: MULTI-SCALE PINNED ZOOM PARALLAX */}
    <ZoomParallax />

    {/* Section 4: SELECTED WORK / ASYMMETRIC PROJECT ARCHIVE */}
    <WorkSection />

    {/* Section 5: CAPABILITIES & 5-STEP METHODOLOGY */}
    <ServicesSection />

    {/* Section 6: STUDIO PHILOSOPHY & PRINCIPLES */}
    <StudioSection />

    {/* Section 8.5: JOIN OUR TALENT / MICRO RECRUITMENT TEASER */}
    <JoinMicroSection />

    {/* Section 9: BESPOKE CONTACT & INQUIRY */}
    <ContactSection />

    {/* Section 10: SHARED EDITORIAL FOOTER */}
    <Footer theme="light" />
    </>
  );
}

export default HomePage;
