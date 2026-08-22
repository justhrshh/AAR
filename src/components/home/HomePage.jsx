import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  // Images cache
  const imagesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cinematic auto-scroll / smooth snap controller
  const isAutoScrollingRef = useRef(false);
  const snapTweenRef = useRef(null);

  // Smooth cinematic snap to target position
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
    // 5.0s - 6.0s duration for an ultra-slow, peaceful, high-end cinematic glide
    const duration = customDuration || Math.min(6.0, Math.max(4.8, (distance / 800) * 5.0));

    snapTweenRef.current = gsap.to(scrollProxy, {
      y: targetY,
      duration: duration,
      ease: 'sine.inOut', // Ultra-smooth organic harmonic easing
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y);
      },
      onComplete: () => {
        setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 150);
      }
    });
  }, []);

  // Draw a specific frame to the canvas
  const renderFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIndex = Math.max(1, Math.min(TOTAL_FRAMES, frameNumber));
    const img = imagesRef.current[clampedIndex - 1];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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

  // Wheel & Touch gesture detection for threshold-based snapping
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

      // Downward intentional scroll from Hero -> Smoothly animate to About endpoint
      if (e.deltaY > 18 && currentY < maxScroll * 0.45) {
        e.preventDefault();
        snapTo(maxScroll, 5.5);
      }
      // Upward intentional scroll from About -> Smoothly animate back to Hero start
      else if (e.deltaY < -18 && currentY > maxScroll * 0.55 && currentY <= maxScroll + 50) {
        e.preventDefault();
        snapTo(0, 5.0);
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

      // Intentional swipe down/up
      if (deltaY > 35 && currentY < maxScroll * 0.45) {
        e.preventDefault();
        snapTo(maxScroll, 5.5);
      } else if (deltaY < -35 && currentY > maxScroll * 0.55 && currentY <= maxScroll + 50) {
        e.preventDefault();
        snapTo(0, 5.0);
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

      // 1. Initial Hero states (Active at 0% scroll)
      gsap.set([heroLeftRef.current, heroRightRef.current, heroMetaRef.current], {
        opacity: 1,
        x: 0,
        y: 0,
        pointerEvents: 'auto'
      });

      // 2. Initial About states (Hidden, primed for glide-in)
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
        aboutMetaRef.current
      ];

      gsap.set(aboutItems, {
        opacity: 0,
        y: 28,
        pointerEvents: 'none'
      });

      // 3. Main GSAP Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45, // Butter-smooth lerped scrubbing
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
      // PHASE 1: Hero UI Disappears in the starting 0% -> 10% scroll
      // =========================================================================
      mainTl
        .to(heroLeftRef.current, {
          opacity: 0,
          y: -30,
          pointerEvents: 'none',
          duration: 0.10,
          ease: 'power2.inOut'
        }, 0)
        .to(heroRightRef.current, {
          opacity: 0,
          x: 30,
          pointerEvents: 'none',
          duration: 0.10,
          ease: 'power2.inOut'
        }, 0)
        .to(heroMetaRef.current, {
          opacity: 0,
          duration: 0.08,
          ease: 'power1.inOut'
        }, 0)
        .to(ghostVisRef.current, {
          opacity: 0.20,
          y: -10,
          duration: 0.15,
          ease: 'none'
        }, 0);

      // =========================================================================
      // PHASE 2 & 3: Cube Frame Scrubbing (0.08 -> 0.92)
      // Cube disassembles as you scroll through its layers
      // =========================================================================
      mainTl.to(frameObj, {
        frame: TOTAL_FRAMES,
        ease: 'none',
        duration: 0.84,
        onUpdate: () => {
          renderFrame(Math.round(frameObj.frame));
        }
      }, 0.08);

      // =========================================================================
      // PHASE 3 & 4: Progressive Glide-In of About Elements as you scroll
      // Each piece enters sequentially alongside the animation
      // =========================================================================
      
      // 1. "WE ARE" Eyebrow (Scroll ~22% -> 30%)
      mainTl.to(aboutEyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.22);

      // 2. "AAR VISUALS" Brand Header (Scroll ~28% -> 38%)
      mainTl.to(aboutBrandRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.28);

      // 3. "OUR IDENTITY" Header on right (Scroll ~34% -> 44%)
      mainTl.to(aboutIdentityHeaderRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.34);

      // 4. Gold Dash (Scroll ~38% -> 46%)
      mainTl.to(aboutDashRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.38);

      // 5. Studio Statement on left (Scroll ~42% -> 54%)
      mainTl.to(aboutStatementRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.42);

      // 6. Identity Paragraph on right (Scroll ~46% -> 58%)
      mainTl.to(aboutIdentityBodyRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.46);

      // 7. Gold Divider line on right (Scroll ~54% -> 64%)
      mainTl.to(aboutDividerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.54);

      // 8. "WE TURN" Eyebrow on right (Scroll ~60% -> 70%)
      mainTl.to(aboutImpactEyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.60);

      // 9. "IDEAS INTO IMPACT." Headline on right (Scroll ~68% -> 80%)
      mainTl.to(aboutImpactHeadlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.14,
        ease: 'power2.out'
      }, 0.68);

      // 10. "BRAND | DESIGN | VISUAL" Tags on left (Scroll ~76% -> 86%)
      mainTl.to(aboutTagsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.76);

      // 11. Bottom Meta Footer (Scroll ~82% -> 92%)
      mainTl.to(aboutMetaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.82);

      // Refresh ScrollTrigger calculations
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);

    }, container);

    return () => ctx.revert();
  }, [renderFrame, isLoaded]);

  return (
    <div className="aar-scroll-container" ref={containerRef}>
      {/* Viewport pinned during the scroll sequence */}
      <div className="aar-hero-pin-viewport" ref={pinViewportRef}>
        
        {/* Layer 0: Ghost VISIBILITY Background */}
        <div className="ghost-visibility" ref={ghostVisRef}>
          <span className="ghost-visibility__text">VISIBILITY</span>
        </div>

        {/* Layer 1: Persistent Header Navigation */}
        <header className="aar-header">
          <a
            href="#"
            className="aar-logo"
            onClick={(e) => {
              e.preventDefault();
              snapTo(0, 1.8);
            }}
          >
            <img
              src="/images/aar_logo.png"
              alt="AAR"
              className="aar-logo__img"
            />
            <div className="aar-logo__sub">
              <span>V</span>
              <span>I</span>
              <span>S</span>
              <span>U</span>
              <span>A</span>
              <span>L</span>
              <span>S</span>
            </div>
          </a>

          <nav className="aar-nav">
            {['WORK', 'SERVICES', 'STUDIO', 'ABOUT', 'CONTACT'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="aar-nav__link"
                onClick={(e) => {
                  if (item === 'ABOUT' && containerRef.current) {
                    e.preventDefault();
                    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
                    snapTo(maxScroll, 2.2);
                  }
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <button className="aar-menu-btn" onClick={onReplay} aria-label="Replay loader">
            <span>MENU</span>
            <div className="aar-menu-dots">
              {[...Array(9)].map((_, i) => (
                <span key={i} />
              ))}
            </div>
          </button>
        </header>

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
          <div className="about-left">
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
          <div className="about-right">
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

        {/* About Bottom Meta Bar */}
        <div className="about-meta" ref={aboutMetaRef}>
          <span className="about-meta__item">STUDIO IDENTITY &copy; 2026</span>
          <span className="about-meta__item">ALL RIGHTS RESERVED</span>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
