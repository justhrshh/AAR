import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CraftingTransition.css';

gsap.registerPlugin(ScrollTrigger);

export function CraftingTransition() {
  const sectionRef = useRef(null);
  const blackPanelRef = useRef(null);
  const headlineWrapRef = useRef(null);

  // Word & Character Refs for progressive multi-stage reveal
  const word1CRAFT = useRef(null);
  const wireframeI = useRef(null);
  const solidI = useRef(null);
  const word1NG = useRef(null);

  const wireframeD = useRef(null);
  const solidD = useRef(null);
  const word2IGITAL = useRef(null);

  const wireframeE = useRef(null);
  const solidE = useRef(null);
  const word3XPERIENCES = useRef(null);

  const word4TH = useRef(null);
  const wireframeA = useRef(null);
  const solidA = useRef(null);
  const word4T = useRef(null);

  const word5CONVERT = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const panelEl = blackPanelRef.current;
    const headlineWrapEl = headlineWrapRef.current;
    if (!sectionEl || !panelEl || !headlineWrapEl) return;

    const ctx = gsap.context(() => {
      // 1. Initial GSAP states
      // Panel starts completely ABOVE the viewport (-100%)
      gsap.set(panelEl, {
        yPercent: -100,
        borderBottomLeftRadius: 'clamp(36px, 6vw, 80px)',
        borderBottomRightRadius: 'clamp(36px, 6vw, 80px)'
      });

      // Headline container starts shifted down (animates upward from bottom)
      gsap.set(headlineWrapEl, {
        y: 80,
        autoAlpha: 0.2
      });

      // Word & character initial states
      gsap.set(word1CRAFT.current, { autoAlpha: 1, y: 0 });

      // Outlined & solid IDEA special characters
      gsap.set([wireframeI.current, wireframeD.current, wireframeE.current, wireframeA.current], {
        autoAlpha: 0,
        y: 28,
        scale: 0.92
      });

      gsap.set([solidI.current, solidD.current, solidE.current, solidA.current], {
        autoAlpha: 0
      });

      // Subsequent words/syllables initially hidden below
      gsap.set([
        word1NG.current,
        word2IGITAL.current,
        word3XPERIENCES.current,
        word4TH.current,
        word4T.current,
        word5CONVERT.current
      ], {
        autoAlpha: 0,
        y: 30
      });

      // 2. Master Scroll-Driven Timeline
      // Black screen animates DOWN from TOP (-100% -> 0%)
      // Text animates UP from BOTTOM with progressive letter/word reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // Smooth 1:1 scroll connection
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // =========================================================================
      // SYNCHRONIZED TIMELINE
      // =========================================================================

      // A. Black Panel comes in from TOP downward (yPercent: -100 -> 0)
      tl.to(panelEl, {
        yPercent: 0,
        ease: 'none',
        duration: 0.70
      }, 0);

      // B. Headline container moves up into center from bottom
      tl.to(headlineWrapEl, {
        y: 0,
        autoAlpha: 1,
        ease: 'power2.out',
        duration: 0.65
      }, 0);

      // C. Progressive Typography Construction (from bottom up in stages)
      
      // Step 1: Wireframe "I" enters (0.04 -> 0.12)
      tl.to(wireframeI.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.04);

      // Step 2: "I" turns solid and "NG" reveals (0.12 -> 0.22) -> "CRAFTING" complete
      tl.to(wireframeI.current, {
        autoAlpha: 0,
        duration: 0.04
      }, 0.13)
      .to(solidI.current, {
        autoAlpha: 1,
        duration: 0.04
      }, 0.13)
      .to(word1NG.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.14);

      // Step 3: Wireframe "D" enters (0.18 -> 0.26)
      tl.to(wireframeD.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.18);

      // Step 4: "D" turns solid and "IGITAL" reveals (0.26 -> 0.36) -> "CRAFTING DIGITAL" complete
      tl.to(wireframeD.current, {
        autoAlpha: 0,
        duration: 0.04
      }, 0.27)
      .to(solidD.current, {
        autoAlpha: 1,
        duration: 0.04
      }, 0.27)
      .to(word2IGITAL.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.28);

      // Step 5: Wireframe "E" enters (0.33 -> 0.42)
      tl.to(wireframeE.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.33);

      // Step 6: "E" turns solid and "XPERIENCES" reveals (0.42 -> 0.52) -> "CRAFTING DIGITAL EXPERIENCES" complete
      tl.to(wireframeE.current, {
        autoAlpha: 0,
        duration: 0.04
      }, 0.43)
      .to(solidE.current, {
        autoAlpha: 1,
        duration: 0.04
      }, 0.43)
      .to(word3XPERIENCES.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.44);

      // Step 7: "TH" + Wireframe "A" enters (0.49 -> 0.58)
      tl.to(word4TH.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.07,
        ease: 'power2.out'
      }, 0.49)
      .to(wireframeA.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.51);

      // Step 8: "A" turns solid, "T" reveals (0.58 -> 0.65) -> "THAT" complete
      tl.to(wireframeA.current, {
        autoAlpha: 0,
        duration: 0.04
      }, 0.59)
      .to(solidA.current, {
        autoAlpha: 1,
        duration: 0.04
      }, 0.59)
      .to(word4T.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.06,
        ease: 'power2.out'
      }, 0.60);

      // Step 9: Final word "CONVERT" reveals (0.65 -> 0.74) -> Full statement assembled!
      tl.to(word5CONVERT.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.09,
        ease: 'power2.out'
      }, 0.65);

      // D. Reading Buffer (0.75 -> 1.0)
      // Panel stays firmly in place, giving user ample time to read the completed headline
      // before scrolling naturally into the next section!
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="crafting-transition-section">
      {/* Pinned Viewport Container */}
      <div className="crafting-viewport">
        
        {/* Incoming Pure Black Rounded Panel (Animates in from TOP) */}
        <div ref={blackPanelRef} className="crafting-black-panel">
          
          {/* Studio Chapter Marker */}
          <div className="crafting-chapter-tag">
            <span className="crafting-chapter-dash" />
            <span className="crafting-chapter-text">AAR VISUALS • MANIFESTO</span>
          </div>

          {/* Progressive Animated Headline (Animates in from BOTTOM) */}
          <div ref={headlineWrapRef} className="crafting-headline-wrap">
            <h2 className="crafting-headline">
              
              {/* WORD 1: CRAFTING (CRAFT + I [wireframe/solid] + NG) */}
              <span className="crafting-word">
                <span ref={word1CRAFT} className="crafting-glyph-solid">CRAFT</span>
                
                <span className="crafting-special-char-wrap">
                  <span ref={wireframeI} className="crafting-glyph-wireframe">I</span>
                  <span ref={solidI} className="crafting-glyph-solid crafting-glyph-solid--accent">I</span>
                </span>
                
                <span ref={word1NG} className="crafting-glyph-solid">NG</span>
              </span>

              {/* WORD 2: DIGITAL (D [wireframe/solid] + IGITAL) */}
              <span className="crafting-word">
                <span className="crafting-special-char-wrap">
                  <span ref={wireframeD} className="crafting-glyph-wireframe">D</span>
                  <span ref={solidD} className="crafting-glyph-solid crafting-glyph-solid--accent">D</span>
                </span>
                
                <span ref={word2IGITAL} className="crafting-glyph-solid">IGITAL</span>
              </span>

              {/* WORD 3: EXPERIENCES (E [wireframe/solid] + XPERIENCES) */}
              <span className="crafting-word">
                <span className="crafting-special-char-wrap">
                  <span ref={wireframeE} className="crafting-glyph-wireframe">E</span>
                  <span ref={solidE} className="crafting-glyph-solid crafting-glyph-solid--accent">E</span>
                </span>
                
                <span ref={word3XPERIENCES} className="crafting-glyph-solid">XPERIENCES</span>
              </span>

              {/* WORD 4: THAT (TH + A [wireframe/solid] + T) */}
              <span className="crafting-word">
                <span ref={word4TH} className="crafting-glyph-solid">TH</span>
                
                <span className="crafting-special-char-wrap">
                  <span ref={wireframeA} className="crafting-glyph-wireframe">A</span>
                  <span ref={solidA} className="crafting-glyph-solid crafting-glyph-solid--accent">A</span>
                </span>
                
                <span ref={word4T} className="crafting-glyph-solid">T</span>
              </span>

              {/* WORD 5: CONVERT */}
              <span className="crafting-word">
                <span ref={word5CONVERT} className="crafting-glyph-solid crafting-glyph-solid--gold">
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
    </section>
  );
}

export default CraftingTransition;
