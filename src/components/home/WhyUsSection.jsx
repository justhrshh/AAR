import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyUsSection.css';

gsap.registerPlugin(ScrollTrigger);

export function WhyUsSection() {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);
  const bgBaseRef = useRef(null);

  // SVG Layer refs (independent physical sheets)
  const navyWaveRef = useRef(null);
  const greyWaveRef = useRef(null);
  const ivoryWaveRef = useRef(null);

  // Left rail & lower CTA refs
  const leftRailRef = useRef(null);
  const lowerCtaRef = useRef(null);

  // Typography refs
  const eyebrowRef = useRef(null);
  const titleWhyRef = useRef(null);
  const titleUsRef = useRef(null);
  const supportingCopyRef = useRef(null);

  // Principles refs (01, 02, 03, 04)
  const principleRefs = useRef([]);
  principleRefs.current = [];
  const addToPrincipleRefs = (el) => {
    if (el && !principleRefs.current.includes(el)) {
      principleRefs.current.push(el);
    }
  };

  const principlesData = [
    {
      num: '01',
      title: 'CLARITY',
      desc: 'We strip away the unnecessary until the idea speaks for itself.'
    },
    {
      num: '02',
      title: 'CRAFT',
      desc: 'Every detail is considered, from the first frame to the final pixel.'
    },
    {
      num: '03',
      title: 'INTENT',
      desc: 'Design with purpose, not decoration. Every decision has a reason.'
    },
    {
      num: '04',
      title: 'IMPACT',
      desc: 'Visuals built to be remembered, not simply viewed.'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // INITIAL STATES (Physical sheets primed below viewport)
      // -----------------------------------------------------------------------

      // 0. Base canvas
      gsap.set(bgBaseRef.current, {
        opacity: 0
      });

      // 1. Physical Paper Layers (Independent entrance velocities for realistic depth)
      gsap.set(navyWaveRef.current, {
        yPercent: 110,
        xPercent: -5,
        opacity: 0.2
      });

      gsap.set(greyWaveRef.current, {
        yPercent: 115,
        xPercent: 4,
        rotation: -1,
        opacity: 0.3
      });

      gsap.set(ivoryWaveRef.current, {
        yPercent: 105,
        opacity: 0.5
      });

      // 2. Left vertical rail & lower CTA
      gsap.set(leftRailRef.current, {
        opacity: 0,
        x: -25,
        y: 15
      });

      gsap.set(lowerCtaRef.current, {
        opacity: 0,
        y: 35
      });

      // 3. Main typography
      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 20
      });

      gsap.set(titleWhyRef.current, {
        opacity: 0,
        y: 40
      });

      gsap.set(titleUsRef.current, {
        opacity: 0,
        y: 40
      });

      gsap.set(supportingCopyRef.current, {
        opacity: 0,
        y: 25
      });

      // 4. Principles rows (01 - 04)
      gsap.set(principleRefs.current, {
        opacity: 0,
        y: 30
      });

      // -----------------------------------------------------------------------
      // MASTER SCROLLTRIGGER TIMELINE (Pinned & scrubbed with natural momentum)
      // -----------------------------------------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinWrapRef.current,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // -----------------------------------------------------------------------
      // PHASE 1: Organic Physical Sheets Rise (0.00 -> 0.48)
      // -----------------------------------------------------------------------
      tl.to(bgBaseRef.current, {
        opacity: 1,
        duration: 0.22,
        ease: 'power2.out'
      }, 0.02)
      .to(navyWaveRef.current, {
        yPercent: 0,
        xPercent: 0,
        opacity: 1,
        duration: 0.44,
        ease: 'power3.out'
      }, 0.02)
      .to(greyWaveRef.current, {
        yPercent: 0,
        xPercent: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.46,
        ease: 'power3.out'
      }, 0.04)
      .to(ivoryWaveRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.40,
        ease: 'power3.out'
      }, 0.06);

      // -----------------------------------------------------------------------
      // PHASE 2: Left Rail & Main WHY US Typography (0.22 -> 0.60)
      // -----------------------------------------------------------------------
      tl.to(leftRailRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.22,
        ease: 'power2.out'
      }, 0.20)
      .to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.18,
        ease: 'power2.out'
      }, 0.22)
      .to(titleWhyRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power3.out'
      }, 0.26)
      .to(titleUsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.26,
        ease: 'power3.out'
      }, 0.30)
      .to(supportingCopyRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: 'power2.out'
      }, 0.35);

      // -----------------------------------------------------------------------
      // PHASE 3: Sequential Reveal of Principles 01 -> 04 (0.42 -> 0.85)
      // -----------------------------------------------------------------------
      principleRefs.current.forEach((rowEl, index) => {
        const startPos = 0.42 + index * 0.11;
        tl.to(rowEl, {
          opacity: 1,
          y: 0,
          duration: 0.18,
          ease: 'power2.out'
        }, startPos);
      });

      // -----------------------------------------------------------------------
      // PHASE 4: Lower Left CTA Settles (0.70 -> 0.95)
      // -----------------------------------------------------------------------
      tl.to(lowerCtaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.20,
        ease: 'power2.out'
      }, 0.70);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why-us-section" ref={sectionRef} id="services">
      <div className="why-us-pin-wrap" ref={pinWrapRef}>
        
        {/* Layer 0: Warm Ivory Base Canvas */}
        <div className="why-us-bg-base" ref={bgBaseRef} />

        {/* Layer 1: Physical Layered SVG Paper Sheets */}
        <div className="why-us-svg-container">
          
          {/* ================================================================= */}
          {/* 1. DEEP NAVY / CHARCOAL BASE SHEET (#101B2A)                      */}
          {/* ================================================================= */}
          <div className="why-us-wave why-us-wave--navy" ref={navyWaveRef}>
            <svg
              viewBox="0 0 1600 1000"
              preserveAspectRatio="none"
              className="why-us-wave-svg"
            >
              <defs>
                <linearGradient id="navyMaterialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#132030" />
                  <stop offset="50%" stopColor="#101B2A" />
                  <stop offset="100%" stopColor="#0B131E" />
                </linearGradient>
              </defs>
              {/* Bottom-left organic sheet */}
              <path
                d="M 0,660 C 140,670 280,740 440,830 C 580,910 700,970 820,1000 L 0,1000 Z"
                fill="url(#navyMaterialGrad)"
              />
              {/* Subtle top surface highlight line */}
              <path
                d="M 0,660 C 140,670 280,740 440,830 C 580,910 700,970 820,1000"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* ================================================================= */}
          {/* 2. COOL STONE GREY MIDDLE SHEET (#B8B7B2)                         */}
          {/* ================================================================= */}
          <div className="why-us-wave why-us-wave--grey" ref={greyWaveRef}>
            <svg
              viewBox="0 0 1600 1000"
              preserveAspectRatio="none"
              className="why-us-wave-svg"
            >
              <defs>
                <linearGradient id="greyMaterialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C4C3BE" />
                  <stop offset="55%" stopColor="#B8B7B2" />
                  <stop offset="100%" stopColor="#A3A29C" />
                </linearGradient>
                {/* Contact & ambient drop shadow over navy layer */}
                <filter id="greyPaperShadow" x="-5%" y="-10%" width="120%" height="135%">
                  <feDropShadow dx="-2" dy="-5" stdDeviation="12" floodColor="#000000" floodOpacity="0.32" />
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.18" />
                </filter>
              </defs>
              {/* Organic contour sweeping across center and rising dramatically up right side */}
              <path
                d="M 0,640 C 180,655 340,740 520,760 C 700,780 860,880 1000,980 C 1080,1030 1180,980 1280,880 C 1400,760 1520,580 1600,440 L 1600,1000 L 0,1000 Z"
                fill="url(#greyMaterialGrad)"
                filter="url(#greyPaperShadow)"
              />
              {/* Crisp top edge highlight */}
              <path
                d="M 0,640 C 180,655 340,740 520,760 C 700,780 860,880 1000,980 C 1080,1030 1180,980 1280,880 C 1400,760 1520,580 1600,440"
                fill="none"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* ================================================================= */}
          {/* 3. WARM CREAM TOP FOREGROUND SHEET (#EDE6DC)                      */}
          {/* ================================================================= */}
          <div className="why-us-wave why-us-wave--ivory" ref={ivoryWaveRef}>
            <svg
              viewBox="0 0 1600 1000"
              preserveAspectRatio="none"
              className="why-us-wave-svg"
            >
              <defs>
                {/* Multi-tier realistic 3D paper shadow: tight contact + soft ambient */}
                <filter id="ivoryPhysicalShadow" x="-10%" y="-10%" width="125%" height="145%">
                  {/* Tight dark contact shadow */}
                  <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#08101a" floodOpacity="0.40" />
                  {/* Broad soft ambient shadow */}
                  <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#08101a" floodOpacity="0.22" />
                </filter>
              </defs>
              {/* Primary asymmetrical organic contour matching reference */}
              <path
                d="M 0,0 L 1600,0 L 1600,440 C 1510,600 1390,780 1240,880 C 1120,950 980,880 860,780 C 720,660 560,670 380,710 C 220,740 100,660 0,590 Z"
                fill="#EDE6DC"
                filter="url(#ivoryPhysicalShadow)"
              />
              {/* Physical edge bevel / underside shadow strip */}
              <path
                d="M 0,590 C 100,660 220,740 380,710 C 560,670 720,660 860,780 C 980,880 1120,950 1240,880 C 1390,780 1510,600 1600,440"
                fill="none"
                stroke="rgba(0, 0, 0, 0.08)"
                strokeWidth="2.5"
              />
              {/* Crisp top edge highlight catching light */}
              <path
                d="M 0,590 C 100,660 220,740 380,710 C 560,670 720,660 860,780 C 980,880 1120,950 1240,880 C 1390,780 1510,600 1600,440"
                fill="none"
                stroke="rgba(255, 255, 255, 0.65)"
                strokeWidth="1.2"
              />
            </svg>
          </div>

        </div>

        {/* Layer 2: Main Editorial Grid Content */}
        <div className="why-us-content-grid">
          
          {/* Left Vertical Editorial Rail */}
          <div className="why-us-left-rail" ref={leftRailRef}>
            <div className="why-us-rail__line-top" />
            <span className="why-us-rail__text">BRAND | DESIGN | VISUAL</span>
            <div className="why-us-rail__dot" />
          </div>

          {/* Center/Left Main Heading & Intro Copy */}
          <div className="why-us-hero-col">
            <div className="why-us-eyebrow" ref={eyebrowRef}>
              WHY AAR
            </div>

            <div className="why-us-headline-wrap">
              <h2 className="why-us-headline">
                <span className="why-us-headline__why" ref={titleWhyRef}>WHY</span>
                <span className="why-us-headline__us" ref={titleUsRef}>US.</span>
              </h2>

              <p className="why-us-statement" ref={supportingCopyRef}>
                We don’t just make things look good. We make ideas impossible to ignore.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Editorial Principles */}
          <div className="why-us-principles-col">
            {principlesData.map((item, i) => (
              <div
                key={item.num}
                className="why-us-principle-row"
                ref={addToPrincipleRefs}
              >
                <div className="why-us-principle-header">
                  <span className="why-us-principle-num">{item.num}</span>
                  <h3 className="why-us-principle-title">{item.title}</h3>
                </div>

                <p className="why-us-principle-desc">{item.desc}</p>

                {i < principlesData.length - 1 && (
                  <div className="why-us-principle-divider" />
                )}
              </div>
            ))}
          </div>

          {/* Lower Left Dark Slate CTA (Positioned on the dark navy paper sheet) */}
          <div className="why-us-lower-cta" ref={lowerCtaRef}>
            <a href="#contact" className="why-us-cta-link">
              <div className="why-us-cta-text">
                <span>LET'S CREATE</span>
                <span>SOMETHING ICONIC <span className="why-us-cta-arrow">→</span></span>
              </div>
              <div className="why-us-cta-dash" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyUsSection;
