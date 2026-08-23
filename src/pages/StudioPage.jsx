import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/common/Footer';
import './StudioPage.css';

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

export function StudioPage() {
  return (
    <div className="aar-studio-page">
      <Navbar />

      {/* ── 01. STUDIO OPENING HERO ── */}
      <section className="studio-hero">
        <div className="studio-hero__container">
          
          <div className="studio-hero__eyebrow">
            <span className="studio-hero__eyebrow-dash" />
            <span className="studio-hero__eyebrow-text">PHILOSOPHY & CULTURE / EST. 2026</span>
          </div>

          <div className="studio-hero__main">
            <h1 className="studio-hero__title">
              AN INDEPENDENT STUDIO<br />
              DEDICATED TO<br />
              <span className="studio-hero__title--gold">VISUAL CLARITY</span>
              <span className="studio-hero__title-dot">.</span>
            </h1>

            <div className="studio-hero__lead-col">
              <p className="studio-hero__lead">
                AAR Visuals was founded on a simple conviction: that meaningful design is born from human taste, deep patience, and uncompromising craftsmanship.
              </p>
              <div className="studio-hero__coordinates">
                <span className="studio-coord-label">BASE LOCATION</span>
                <span className="studio-coord-val">NEW DELHI, INDIA • 28.6139° N, 77.2090° E</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 02. PHILOSOPHY ESSAY ── */}
      <section className="studio-essay-section">
        <div className="studio-essay-container">
          
          <div className="studio-section-header">
            <span className="studio-section-header__dash" />
            <span className="studio-section-header__title">01 / OUR BELIEF</span>
          </div>

          <div className="studio-essay-grid">
            <div className="studio-essay-left">
              <h2 className="studio-essay-headline">
                WE DO NOT BELIEVE IN FORMULAIC EFFICIENCY. WE BELIEVE IN INTENTIONALITY.
              </h2>
            </div>

            <div className="studio-essay-right">
              <p className="studio-essay-p">
                Most digital agency work today feels interchangeable—templated cards, generic animations, and disposable branding created for quick clicks rather than lasting connection.
              </p>
              <p className="studio-essay-p">
                We take the opposing view. We operate like a monastic visual atelier: keeping our client roster intentionally small so every engagement receives our full, undivided creative obsession.
              </p>
              <p className="studio-essay-p">
                From hand-curated typographic ligatures to mathematical spatial shaders, we treat every pixel and ink mark as an enduring cultural artifact.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 03. HOW WE THINK / 3 CORE PRINCIPLES ── */}
      <section className="studio-principles-section">
        <div className="studio-principles-container">
          
          <div className="studio-section-header">
            <span className="studio-section-header__dash" />
            <span className="studio-section-header__title">02 / CORE PRINCIPLES</span>
          </div>

          <div className="studio-principles-grid">
            {PRINCIPLES.map((item, idx) => (
              <div key={idx} className="studio-principle-card">
                <div className="studio-principle-header">
                  <span className="studio-principle-num">{item.number}</span>
                  <div className="studio-principle-line" />
                </div>
                <h3 className="studio-principle-title">{item.principle}</h3>
                <h4 className="studio-principle-lead">{item.lead}</h4>
                <p className="studio-principle-body">{item.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 04. ART-DIRECTED VISUAL MOMENT / GRAPHIC PAUSE ── */}
      <section className="studio-visual-pause-section">
        <div className="studio-visual-pause-container">
          
          <div className="studio-sculpture-card">
            {/* Background Texture & Flow Lines */}
            <div className="studio-sculpture-bg" />
            
            {/* Big Watermark Typographic Monument */}
            <div className="studio-sculpture-watermark">AAR</div>

            {/* Central Badge */}
            <div className="studio-sculpture-content">
              <div className="studio-seal-wrap">
                <div className="studio-seal-ring">
                  <span className="studio-seal-star">✦</span>
                </div>
              </div>

              <span className="studio-sculpture-eyebrow">AAR VISUALS ATELIER</span>
              <h2 className="studio-sculpture-headline">WHERE VISION FINDS VISIBILITY.</h2>
              
              <div className="studio-sculpture-meta-bar">
                <span>INDEPENDENT CREATIVE PRACTICE</span>
                <span className="studio-sculpture-dot">•</span>
                <span>NEW DELHI</span>
                <span className="studio-sculpture-dot">•</span>
                <span>EST. 2026</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 05. COLLABORATION INQUIRY CTA ── */}
      <section className="studio-cta-section">
        <div className="studio-cta-wrap">
          <div className="studio-cta-left">
            <span className="studio-cta-eyebrow">COMMISSIONS & ENQUIRIES</span>
            <h2 className="studio-cta-title">
              LET’S CREATE SOMETHING<br />
              <span className="studio-cta-title--gold">UNFORGETTABLE.</span>
            </h2>
          </div>
          <Link to="/contact" className="studio-cta-btn">
            <span>GET IN TOUCH</span>
            <span className="studio-cta-arrow">→</span>
          </Link>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
}

export default StudioPage;
