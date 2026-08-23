import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/common/Footer';
import './ServicesPage.css';

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
    ],
    relatedProject: { name: 'ATELIER SOL', link: '/work/atelier-sol' }
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
    ],
    relatedProject: { name: 'CHROMA SYNTHESIS', link: '/work/chroma-synthesis' }
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
    ],
    relatedProject: { name: 'KINETIC TEMPO', link: '/work/kinetic-tempo' }
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
    ],
    relatedProject: { name: 'NORDIC HORIZON', link: '/work/nordic-horizon' }
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
    ],
    relatedProject: { name: 'SPATIAL DYNAMICS', link: '/work/spatial-dynamics' }
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

export function ServicesPage() {
  const [openService, setOpenService] = useState('branding');

  const toggleService = (id) => {
    setOpenService(prev => prev === id ? null : id);
  };

  return (
    <div className="aar-services-page">
      <Navbar />

      {/* ── 01. HERO STATEMENT ── */}
      <section className="services-hero">
        <div className="services-hero__container">
          
          <div className="services-hero__eyebrow">
            <span className="services-hero__eyebrow-dash" />
            <span className="services-hero__eyebrow-text">CAPABILITIES & METHODOLOGY</span>
          </div>

          <div className="services-hero__headline-wrap">
            <h1 className="services-hero__title">
              WE TURN IDEAS<br />
              INTO VISUAL<br />
              <span className="services-hero__title--gold">EXPERIENCES</span>
              <span className="services-hero__title-dot">.</span>
            </h1>

            <div className="services-hero__side-col">
              <p className="services-hero__body">
                We operate at the precise intersection of brand architecture, sensory digital craft, and kinetic storytelling.
              </p>
              <div className="services-hero__meta-box">
                <span className="services-hero__meta-label">PRIMARY DISCIPLINES</span>
                <span className="services-hero__meta-val">05 SPECIALIZED CREATIVE PILLARS</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 02. INTERACTIVE CAPABILITIES ACCORDION ── */}
      <section className="services-list-section">
        <div className="services-list-container">

          <div className="services-section-header">
            <span className="services-section-header__dash" />
            <span className="services-section-header__title">01 / CAPABILITIES BREAKDOWN</span>
          </div>

          <div className="services-accordion">
            {SERVICES_DATA.map((svc) => {
              const isOpen = openService === svc.id;

              return (
                <div
                  key={svc.id}
                  className={`service-item-card ${isOpen ? 'service-item-card--open' : ''}`}
                >
                  <button
                    className="service-item-trigger"
                    onClick={() => toggleService(svc.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="service-item-title-group">
                      <span className="service-item-num">{svc.number}</span>
                      <h2 className="service-item-name">{svc.title}</h2>
                    </div>

                    <div className="service-item-status">
                      <span className="service-item-tagline-preview">{svc.tagline}</span>
                      <span className="service-item-toggle-icon">{isOpen ? '—' : '+'}</span>
                    </div>
                  </button>

                  {/* Expanded Content Drawer */}
                  <div className="service-item-drawer">
                    <div className="service-item-drawer-inner">
                      
                      <div className="service-drawer-left">
                        <h3 className="service-drawer-lead">{svc.tagline}</h3>
                        <p className="service-drawer-desc">{svc.description}</p>
                        
                        {svc.relatedProject && (
                          <div className="service-drawer-project-link">
                            <span className="service-drawer-proj-label">FEATURED CASE STUDY:</span>
                            <Link to={svc.relatedProject.link} className="service-drawer-proj-btn">
                              <span>{svc.relatedProject.name}</span>
                              <span>→</span>
                            </Link>
                          </div>
                        )}
                      </div>

                      <div className="service-drawer-right">
                        <span className="service-drawer-deliverables-title">WHAT WE DELIVER</span>
                        <ul className="service-drawer-deliverables-list">
                          {svc.deliverables.map((item, i) => (
                            <li key={i} className="service-deliverable-node">
                              <span className="service-deliverable-dash" />
                              <span>{item}</span>
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
      </section>

      {/* ── 03. 5-STEP CREATIVE PROCESS ── */}
      <section className="services-process-section">
        <div className="services-process-container">

          <div className="services-section-header">
            <span className="services-section-header__dash" />
            <span className="services-section-header__title">02 / HOW WE WORK</span>
          </div>

          <div className="services-process-intro">
            <h2 className="services-process-main-title">A DELIBERATE, HUMAN PROCESS.</h2>
            <p className="services-process-main-desc">
              Every project follows an uncompromising trajectory from deep discovery through radical design and rigorous technical execution.
            </p>
          </div>

          <div className="services-process-grid">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="process-card">
                <div className="process-card__top">
                  <span className="process-card__num">{step.num}</span>
                  <span className="process-card__phase">{step.phase}</span>
                </div>
                <h3 className="process-card__headline">{step.headline}</h3>
                <p className="process-card__text">{step.text}</p>
                <div className="process-card__line" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 04. CLOSING CTA BANNER ── */}
      <section className="services-cta-section">
        <div className="services-cta-wrap">
          <div className="services-cta-content">
            <span className="services-cta-eyebrow">BEGIN A PARTNERSHIP</span>
            <h2 className="services-cta-title">
              READY TO BRING SHAPE<br />
              <span className="services-cta-title--gold">TO YOUR AMBITION?</span>
            </h2>
            <p className="services-cta-desc">
              Tell us about your upcoming identity, digital platform, or motion initiative.
            </p>
          </div>
          <Link to="/contact" className="services-cta-action-btn">
            <span>START A PROJECT</span>
            <span className="services-cta-arrow">→</span>
          </Link>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
}

export default ServicesPage;
