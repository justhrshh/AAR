import React from 'react';
import './StudioSection.css';
import { Skiper104 } from '../ui/skiper104';

const PHILOSOPHY_ITEMS = [
  {
    bgSrc: 'https://i.pinimg.com/1200x/7f/f1/79/7ff1790a8ee1baa01f236eaf11ff7c56.jpg',
    title: 'MAKE IT CLEAR.',
    lead: 'COMPLEXITY IS SIMPLE. ABSOLUTE CLARITY IS THE ULTIMATE LUXURY.',
    desc: 'We strip away decorative excess until only the purest essence remains. In a world saturated with digital noise, unmistakable clarity is the most potent differentiator.'
  },
  {
    bgSrc: 'https://i.pinimg.com/1200x/ed/f0/26/edf026fc24297432a2502bf280db885b.jpg',
    title: 'MAKE IT DISTINCT.',
    lead: 'IF IT RESEMBLES EVERYTHING ELSE, IT FAILS TO EXIST.',
    desc: 'We reject template-driven uniformity and generic algorithm aesthetics. Every identity system and digital architecture we build possesses a singular, recognizable soul.'
  },
  {
    bgSrc: 'https://i.pinimg.com/1200x/d8/f1/fa/d8f1fa8bde3860818dc978b3ae692891.jpg',
    title: 'MAKE IT MATTER.',
    lead: 'DESIGN WITH PHYSICAL GRAVITY, PERMANENCE, AND ENDURING WEIGHT.',
    desc: 'We build for longevity. Whether constructing a physical monograph or a 60fps WebGL interactive canvas, we ensure the work commands respect today and in decades to come.'
  }
];

export function StudioSection() {
  return (
    <section id="studio" className="aar-studio-section">
      <div className="studio-section-container">

        {/* ── 01. STUDIO HERO / ESSAY ── */}
        <div className="studio-header">
          {/* Chapter Eyebrow with diamond & decorative lines */}
          <div className="studio-header__eyebrow-center">
            <span className="studio-eyebrow-line" />
            <span className="studio-eyebrow-diamond">♦</span>
            <span className="studio-header__eyebrow-text">CHAPTER 04 / STUDIO PHILOSOPHY</span>
            <span className="studio-eyebrow-diamond">♦</span>
            <span className="studio-eyebrow-line" />
          </div>

          <div className="studio-header__main-row">
            {/* ── EXACT REFERENCE ARTWORK LOCKUP ── */}
            <div className="studio-lockup-container">
              {/* Row 1: THE + Studio */}
              <div className="studio-lockup-row1">
                <span className="studio-lockup-the">THE</span>
                <span className="studio-lockup-script">Studio</span>
              </div>

              {/* Row 2: PHILOSO + PHY (framed in vector box) */}
              <div className="studio-lockup-row2">
                <span className="studio-lockup-philoso">PHILOSO</span>
                <div className="studio-lockup-phy-box">
                  <span className="studio-lockup-phy-gold">PHY</span>
                  
                  {/* Exact Vector Pen Tool & Bézier Handles Graphic */}
                  <svg className="studio-vector-overlay-precision" viewBox="0 0 200 160" fill="none" aria-hidden="true">
                    {/* Construction guidelines */}
                    <line x1="32" y1="12" x2="32" y2="155" stroke="#c9962c" strokeWidth="1.2" opacity="0.75" />
                    <line x1="18" y1="34" x2="195" y2="34" stroke="#c9962c" strokeWidth="1.2" opacity="0.75" />
                    <line x1="190" y1="34" x2="190" y2="148" stroke="#c9962c" strokeWidth="1.2" opacity="0.75" />
                    <line x1="32" y1="148" x2="190" y2="148" stroke="#c9962c" strokeWidth="1.2" opacity="0.75" />
                    
                    {/* Top-Left Corner Vertex Anchor Point */}
                    <rect x="28" y="30" width="8" height="8" fill="#ede8e1" stroke="#c9962c" strokeWidth="1.4" />
                    
                    {/* Bézier curve arcs originating at vertex (32, 34) */}
                    <path d="M 32 34 C 22 14, 8 10, 2 22" stroke="#c9962c" strokeWidth="1.3" fill="none" />
                    <path d="M 32 34 C 20 56, 10 74, 4 58" stroke="#c9962c" strokeWidth="1.3" fill="none" />
                    
                    {/* Tangent Handles & Control Nodes */}
                    <line x1="2" y1="22" x2="-2" y2="26" stroke="#c9962c" strokeWidth="1" />
                    <circle cx="-2" cy="26" r="2.2" fill="#c9962c" />
                    <rect x="-1" y="19" width="6" height="6" fill="#ede8e1" stroke="#c9962c" strokeWidth="1.2" />

                    <line x1="4" y1="58" x2="0" y2="54" stroke="#c9962c" strokeWidth="1" />
                    <circle cx="0" cy="54" r="2.2" fill="#c9962c" />
                    <rect x="1" y="55" width="6" height="6" fill="#ede8e1" stroke="#c9962c" strokeWidth="1.2" />

                    {/* Classic Illustrator Pen Nib pointing directly at vertex (32, 34) */}
                    <g transform="translate(32, 34) rotate(45)">
                      <path d="M 0 0 L -8 -18 L -5 -26 L -12 -38 L 12 -38 L 5 -26 L 8 -18 Z" fill="#c9962c" />
                      <circle cx="0" cy="-16" r="2" fill="#ede8e1" />
                      <line x1="0" y1="0" x2="0" y2="-16" stroke="#ede8e1" strokeWidth="1.2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div className="studio-header__lead-col">
              <p className="studio-header__lead">
                AAR Visuals was founded on a simple conviction: that meaningful design is born from human taste, deep patience, and uncompromising craftsmanship.
              </p>
              <div className="studio-header__coords">
                <span className="studio-coords-label">BASE LOCATION</span>
                <span className="studio-coords-val">NEW DELHI, INDIA • 28.6139° N, 77.2090° E</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 02. MANIFESTO ESSAY ── */}
        <div className="studio-manifesto-block">
          <div className="studio-manifesto-left">
            <h3 className="studio-manifesto-title">
              WE DO NOT BELIEVE IN FORMULAIC EFFICIENCY. WE BELIEVE IN INTENTIONALITY.
            </h3>
          </div>

          <div className="studio-manifesto-right">
            <p>
              Most digital studio work today feels interchangeable—templated cards, generic animations, and disposable branding created for quick clicks rather than lasting connection.
            </p>
            <p>
              We take the opposing view. We operate like a monastic visual atelier: keeping our client roster intentionally small so every engagement receives our full, undivided creative obsession.
            </p>
            <p>
              From hand-curated typographic ligatures to mathematical spatial shaders, we treat every pixel and ink mark as an enduring cultural artifact.
            </p>
          </div>
        </div>

        {/* ── 03. 3 CORE PRINCIPLES (SKIPER-UI 104 SCROLL REVEAL) ── */}
        <div className="studio-principles-block">
          <div className="studio-principles-tag">02 / HOW WE THINK</div>
          <Skiper104 items={PHILOSOPHY_ITEMS} />
        </div>

        {/* ── 04. VISUAL PAUSE / STUDIO BANNER ── */}
        <div className="studio-sculpture-block">
          <div className="studio-banner-wrap relative w-full overflow-hidden rounded-2xl border border-[#0d0d0d]/10 shadow-[0_20px_50px_-15px_rgba(13,13,13,0.15)] bg-[#141416]">
            <img
              src="https://res.cloudinary.com/hspt0e7x/image/upload/v1788494920/d66c00be-dc24-4f7a-aefd-0f14792efc89_dtyptq.png"
              alt="AAR Visuals Atelier — Where Vision Finds Visibility"
              className="w-full h-auto object-cover block"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default StudioSection;
