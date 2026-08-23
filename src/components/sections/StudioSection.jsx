import React from 'react';
import './StudioSection.css';

const PRINCIPLES = [
  {
    number: '01',
    principle: 'MAKE IT CLEAR.',
    lead: 'Complexity is simple. Absolute clarity is the ultimate luxury.',
    body: 'We strip away decorative excess until only the purest essence remains. In a world saturated with digital noise, unmistakable clarity is the most potent differentiator.'
  },
  {
    number: '02',
    principle: 'MAKE IT DISTINCT.',
    lead: 'If it resembles everything else, it fails to exist.',
    body: 'We reject template-driven uniformity and generic algorithm aesthetics. Every identity system and digital architecture we build possesses a singular, recognizable soul.'
  },
  {
    number: '03',
    principle: 'MAKE IT MATTER.',
    lead: 'Design with physical gravity, permanence, and enduring weight.',
    body: 'We build for longevity. Whether constructing a physical monograph or a 60fps WebGL interactive canvas, we ensure the work commands respect today and in decades to come.'
  }
];

export function StudioSection() {
  return (
    <section id="studio" className="aar-studio-section">
      <div className="studio-section-container">

        {/* ── 01. STUDIO HERO / ESSAY ── */}
        <div className="studio-header">
          <div className="studio-header__eyebrow">
            <span className="studio-header__eyebrow-dash" />
            <span className="studio-header__eyebrow-text">CHAPTER 04 / STUDIO PHILOSOPHY</span>
          </div>

          <div className="studio-header__main-row">
            <h2 className="studio-header__title">
              THE STUDIO<br />
              <span className="studio-header__title--gold">PHILOSOPHY</span>
              <span className="studio-header__title-dot">.</span>
            </h2>

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

        {/* ── 03. 3 CORE PRINCIPLES ── */}
        <div className="studio-principles-block">
          <div className="studio-principles-tag">02 / HOW WE THINK</div>
          
          <div className="studio-principles-grid">
            {PRINCIPLES.map((item, idx) => (
              <div key={idx} className="studio-principle-node">
                <div className="studio-principle-top">
                  <span className="studio-principle-num">{item.number}</span>
                  <div className="studio-principle-line" />
                </div>
                <h4 className="studio-principle-title">{item.principle}</h4>
                <h5 className="studio-principle-lead">{item.lead}</h5>
                <p className="studio-principle-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 04. VISUAL PAUSE / TYPOGRAPHIC MONUMENT ── */}
        <div className="studio-sculpture-block">
          <div className="studio-sculpture-card">
            <div className="studio-sculpture-bg" />
            <div className="studio-sculpture-watermark">AAR</div>

            <div className="studio-sculpture-content">
              <div className="studio-seal-ring">
                <span>✦</span>
              </div>
              <span className="studio-sculpture-eyebrow">AAR VISUALS ATELIER</span>
              <h3 className="studio-sculpture-headline">WHERE VISION FINDS VISIBILITY.</h3>
              <div className="studio-sculpture-meta">
                <span>INDEPENDENT CREATIVE PRACTICE</span>
                <span>•</span>
                <span>NEW DELHI</span>
                <span>•</span>
                <span>EST. 2026</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default StudioSection;
