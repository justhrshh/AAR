import React, { useState } from 'react';
import './ServicesSection.css';

const SERVICES_DATA = [
  {
    number: '01',
    id: 'branding',
    title: 'BRANDING & IDENTITY',
    tagline: 'Forming enduring visual universes that command cultural authority.',
    description: 'We build comprehensive identity systems from foundational strategy to bespoke typographic creation. Our approach avoids trend-chasing in favor of distinctive mathematical and sensorial resonance.',
    deliverables: [
      'Visual Identity Systems',
      'Custom Display Typography',
      'Brand Strategy & Positioning',
      'Tactile Packaging Suite',
      'Digital & Print Brand Books',
      'Spatial & Environmental Signage'
    ]
  },
  {
    number: '02',
    id: 'digital',
    title: 'DIGITAL EXPERIENCES',
    tagline: 'Web architectures engineered with tactile elegance and fluid performance.',
    description: 'We design and engineer bespoke web platforms that feel like art pieces while delivering flawless user experience. Built with modern React, Three.js/WebGL shaders, and butter-smooth GSAP choreography.',
    deliverables: [
      'Interactive Web Platforms',
      'WebGL & Custom Shaders',
      'Creative Frontend Development',
      'Editorial E-Commerce Design',
      'Micro-Interactions & Physics',
      'Design Systems for Scaling'
    ]
  },
  {
    number: '03',
    id: 'motion',
    title: 'MOTION & 3D DIRECTION',
    tagline: 'Sculpting time, weight, and inertia to give digital objects physical soul.',
    description: 'Motion is not an afterthought—it is the living pulse of modern identity. We choreograph procedural physics, 3D simulations, and harmonic kinetic typography that elevate passive viewers into active witnesses.',
    deliverables: [
      'Generative Motion Systems',
      '3D Product & Spatial Simulations',
      'Kinetic Typographic Engines',
      'Broadcast & Film Title Sequences',
      'Audio-Reactive Stage Visuals',
      'Real-Time Interactive Prototypes'
    ]
  },
  {
    number: '04',
    id: 'art-direction',
    title: 'ART DIRECTION & EDITORIAL',
    tagline: 'Curation with monastic focus, extreme typographic tension, and tactile weight.',
    description: 'For physical publications, monographs, and international exhibition spaces, we curate photography, bespoke paper stocks, hot-stamped finishes, and asymmetric layouts that celebrate permanence.',
    deliverables: [
      'Monograph & Book Design',
      'Editorial Art Direction',
      'Exhibition & Gallery Scenography',
      'Still-Life Photography Direction',
      'Print Material & Stock Curation',
      'Limited-Edition Collector Suites'
    ]
  },
  {
    number: '05',
    id: 'creative-tech',
    title: 'CREATIVE TECHNOLOGY',
    tagline: 'Bridging physical optics and next-generation volumetric computation.',
    description: 'We explore spatial computing (XR/AR), generative visual algorithms, and physical computing installations that push the boundaries of what is visually and technologically possible.',
    deliverables: [
      'Spatial (XR/AR) Interface Design',
      'Generative Visual Pipelines',
      'Interactive Installation Code',
      'Hardware & Exhibit Integration',
      'Real-Time Graphics Prototyping'
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    phase: 'DISCOVER',
    headline: 'ARCHAEOLOGY OF PURPOSE',
    text: 'We dive into the cultural foundations, competitive landscape, and essential truth of your mission. No assumptions—only clarity.'
  },
  {
    num: '02',
    phase: 'DEFINE',
    headline: 'THE CREATIVE THESIS',
    text: 'We formulate the conceptual framework, aesthetic coordinates, and typographic hierarchy that will guide every visual decision.'
  },
  {
    num: '03',
    phase: 'DESIGN',
    headline: 'MATERIAL EXPLORATION',
    text: 'We sculpt the visual world across tactile paper, interactive code, and kinetic physics, iterating until every element is undeniable.'
  },
  {
    num: '04',
    phase: 'DEVELOP',
    headline: 'TECHNICAL RIGOR',
    text: 'We bring designs to life with custom code, optimized shaders, and precision print craftsmanship that withstands close scrutiny.'
  },
  {
    num: '05',
    phase: 'DELIVER',
    headline: 'GLOBAL DEPLOYMENT',
    text: 'Comprehensive asset handoff, documentation, and continuous launch support ensuring seamless rollout across international markets.'
  }
];

export function ServicesSection() {
  const [openService, setOpenService] = useState('branding');

  const toggleService = (id) => {
    setOpenService(prev => prev === id ? null : id);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="aar-services-section">
      <div className="services-section-container">

        {/* ── 01. SERVICES HERO STATEMENT ── */}
        <div className="services-header">
          <div className="services-header__eyebrow">
            <span className="services-header__eyebrow-dash" />
            <span className="services-header__eyebrow-text">CHAPTER 03 / CAPABILITIES & METHODOLOGY</span>
          </div>

          <div className="services-header__main-row">
            <h2 className="services-header__title">
              WHAT WE DO<br />
              <span className="services-header__title--gold">FOR BRANDS</span>
              <span className="services-header__title-dot">.</span>
            </h2>

            <div className="services-header__desc-col">
              <p className="services-header__desc">
                We operate at the precise intersection of brand architecture, sensory digital craft, and kinetic storytelling.
              </p>
              <div className="services-header__meta-box">
                <span className="services-meta-label">CAPABILITY MATRIX</span>
                <span className="services-meta-val">05 SPECIALIZED CREATIVE PILLARS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 02. TYPOGRAPHY-LED CAPABILITIES ACCORDION ── */}
        <div className="services-accordion-wrap">
          <div className="services-accordion">
            {SERVICES_DATA.map((svc) => {
              const isOpen = openService === svc.id;

              return (
                <div
                  key={svc.id}
                  className={`service-card ${isOpen ? 'service-card--open' : ''}`}
                >
                  <button
                    className="service-card-trigger"
                    onClick={() => toggleService(svc.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="service-card-title-group">
                      <span className="service-card-num">{svc.number}</span>
                      <h3 className="service-card-name">{svc.title}</h3>
                    </div>

                    <div className="service-card-meta-right">
                      <span className="service-card-tagline-preview">{svc.tagline}</span>
                      <span className="service-card-toggle-icon">{isOpen ? '—' : '+'}</span>
                    </div>
                  </button>

                  <div className="service-card-drawer">
                    <div className="service-card-drawer-inner">
                      <div className="service-drawer-col-left">
                        <h4 className="service-drawer-lead">{svc.tagline}</h4>
                        <p className="service-drawer-desc">{svc.description}</p>
                      </div>

                      <div className="service-drawer-col-right">
                        <span className="service-drawer-deliv-title">KEY DELIVERABLES:</span>
                        <ul className="service-drawer-deliv-list">
                          {svc.deliverables.map((d, i) => (
                            <li key={i} className="service-deliv-item">
                              <span className="service-deliv-dash" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 03. 5-STEP CREATIVE PROCESS ── */}
        <div className="services-process-block">
          <div className="services-process-intro">
            <span className="services-process-tag">HOW WE WORK</span>
            <h3 className="services-process-title">A DELIBERATE, HUMAN PROCESS.</h3>
            <p className="services-process-desc">
              Every project follows an uncompromising trajectory from deep discovery through radical design and rigorous technical execution.
            </p>
          </div>

          <div className="services-process-grid">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="process-node">
                <div className="process-node__top">
                  <span className="process-node__num">{step.num}</span>
                  <span className="process-node__phase">{step.phase}</span>
                </div>
                <h4 className="process-node__headline">{step.headline}</h4>
                <p className="process-node__text">{step.text}</p>
                <div className="process-node__line" />
              </div>
            ))}
          </div>
        </div>

        {/* ── 04. CTA STRIP ── */}
        <div className="services-cta-strip">
          <div className="services-cta-left">
            <span className="services-cta-eyebrow">READY TO SHAPE YOUR VISION?</span>
            <h4 className="services-cta-title">DISCUSS YOUR NEXT INITIATIVE WITH OUR DIRECTORS.</h4>
          </div>
          <button onClick={scrollToContact} className="services-cta-btn">
            <span>INITIATE PROJECT</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;
