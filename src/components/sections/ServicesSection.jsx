import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextRevealCard } from '../ui/text-reveal-card';
import './ServicesSection.css';

const SERVICES_DATA = [
  {
    number: '01',
    id: 'branding',
    title: 'BRANDING & IDENTITY',
    tagline: 'Forming enduring visual universes that command cultural authority.',
    description: 'We build comprehensive identity systems from foundational strategy to bespoke typographic creation. Our approach avoids trend-chasing in favor of distinctive mathematical and sensorial resonance.',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    alt: 'Branding & Identity Architecture',
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
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    alt: 'Digital Experiences & Web Engineering',
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
    src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
    alt: 'Motion & 3D Visual Direction',
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
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    alt: 'Art Direction & Editorial Curation',
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
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    alt: 'Creative Technology & Volumetric Systems',
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
  const [activeService, setActiveService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  const hoverTimerRef = useRef(null);
  const leaveTimerRef = useRef(null);

  const openService = hoveredService !== null ? hoveredService : activeService;

  const toggleService = (id) => {
    setActiveService(prev => prev === id ? null : id);
  };

  const handleItemMouseEnter = (id) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }

    if (openService) {
      // Direct instant transfer between rows without any null-gap flicker
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      setHoveredService(id);
    } else {
      // Gentle intent buffer so rapid passing doesn't trigger open
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        setHoveredService(id);
      }, 70);
    }
  };

  const handleAccordionMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    // Graceful close delay so it doesn't snap shut abruptly
    leaveTimerRef.current = setTimeout(() => {
      setHoveredService(null);
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="aar-services-section">
      {/* Ambient Flow Artwork Background in Strict Original Ratio */}
      <div className="services-bg-flow-layer" aria-hidden="true">
        <img
          src="https://res.cloudinary.com/hspt0e7x/image/upload/v1788497047/a8b3e134-3bfb-4e28-b9c9-83980c641fed-Picsart-AiImageEnhancer_j6fbqw.png"
          alt=""
          className="services-bg-flow-img"
        />
      </div>

      <div className="services-section-container">

        {/* ── 01. SERVICES HERO STATEMENT ── */}
        <div className="services-header">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="services-header__eyebrow"
          >
            <span className="services-header__eyebrow-dash" />
            <span className="services-header__eyebrow-text">CHAPTER 03 / CAPABILITIES & METHODOLOGY</span>
          </motion.div>

          <div className="services-header__main-row">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="services-header__title"
            >
              WHAT WE DO<br />
              <span className="services-header__title-line2">
                <span className="services-header__title-for">FOR</span>
                <span className="services-header__title-brands-wrap">
                  <span className="services-header__title--gold">Brands</span>
                  <span className="services-header__title-dot">.</span>
                  
                  {/* Decorative Vector Pen Tool Accent */}
                  <span className="services-header__pen-accent select-none" aria-hidden="true">
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <path d="M 28 32 L 58 32 L 58 60" stroke="currentColor" strokeWidth="1" opacity="0.45" />
                      <path d="M 4 38 C 8 18, 28 12, 42 16" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
                      <path d="M 4 38 C 14 48, 34 46, 50 36" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
                      <rect x="2" y="36" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1" />
                      <rect x="40" y="14" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1" />
                      <rect x="48" y="34" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="1" cy="42" r="1.5" fill="currentColor" />
                      <line x1="4" y1="38" x2="1" y2="42" stroke="currentColor" strokeWidth="1" />
                      <g transform="translate(24, 4) rotate(42)">
                        <path d="M 0 0 L 16 0 L 20 12 L 8 26 L -4 12 Z" fill="currentColor" />
                        <circle cx="8" cy="12" r="1.8" fill="#ede8e1" />
                        <line x1="8" y1="12" x2="8" y2="26" stroke="#ede8e1" strokeWidth="1" />
                      </g>
                    </svg>
                  </span>
                </span>
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="services-header__desc-col"
            >
              <p className="services-header__desc">
                We operate at the precise intersection of brand architecture, sensory digital craft, and kinetic storytelling.
              </p>
              <div className="services-header__meta-box">
                <span className="services-meta-label">CAPABILITY MATRIX</span>
                <span className="services-meta-val">05 SPECIALIZED CREATIVE PILLARS</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 02. TYPOGRAPHY-LED CAPABILITIES ACCORDION (HOVER-EXPAND & ROLLING TEXT) ── */}
        <div className="services-accordion-wrap">
          <div
            className="services-accordion"
            onMouseLeave={handleAccordionMouseLeave}
          >
            {SERVICES_DATA.map((svc, sIdx) => {
              const isOpen = openService === svc.id;

              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: sIdx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className={`service-card ${isOpen ? 'service-card--open' : ''}`}
                  onMouseEnter={() => handleItemMouseEnter(svc.id)}
                >
                  {/* Floating active card background that smoothly glides / transfers between rows */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        layoutId="service-active-card-pill"
                        className="service-card-active-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          layout: { type: 'spring', stiffness: 350, damping: 35 },
                          opacity: { duration: 0.2, ease: 'easeOut' }
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <button
                    className="service-card-trigger"
                    onClick={() => toggleService(svc.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="service-card-title-group">
                      <span className="service-card-num">{svc.number}</span>

                      {/* ── ROLLING TEXT CONTAINER ── */}
                      <div className="service-card-rolling-box">
                        <div className="service-card-rolling-track">
                          {/* State 1: Normal */}
                          <div className="service-card-roll-item">
                            <h3 className="service-card-name">{svc.title}</h3>
                          </div>

                          {/* State 2: Hover (Italic + Gold) */}
                          <div className="service-card-roll-item service-card-roll-item--hover">
                            <h3 className="service-card-name">{svc.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="service-card-meta-right">
                      <span className="service-card-tagline-preview">{svc.tagline}</span>
                      <span className="service-card-toggle-icon">{isOpen ? '—' : '+'}</span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="drawer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.28, delay: 0.05, ease: 'easeOut' }
                          }
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.16, ease: 'easeIn' }
                          }
                        }}
                        className="service-card-drawer"
                      >
                        <motion.div
                          className="service-card-drawer-inner"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
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

                          {/* Visual preview column */}
                          <div className="service-drawer-col-image">
                            <div className="relative w-full h-[125px] rounded-xl overflow-hidden shadow-md border border-black/10 group/img">
                              <img
                                src={svc.src}
                                alt={svc.alt}
                                className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover/img:grayscale-0 group-hover/img:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-[#c9962c]/10 mix-blend-overlay pointer-events-none" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── 03. 5-STEP CREATIVE PROCESS ── */}
        <div className="services-process-block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="services-process-intro"
          >
            <span className="services-process-tag">HOW WE WORK</span>
            <h3 className="services-process-title">A DELIBERATE, HUMAN PROCESS.</h3>
            <p className="services-process-desc">
              Every project follows an uncompromising trajectory from deep discovery through radical design and rigorous technical execution.
            </p>
          </motion.div>

          <div className="services-process-grid">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="process-node"
              >
                <div className="process-node__top">
                  <span className="process-node__num">{step.num}</span>
                  <span className="process-node__phase">{step.phase}</span>
                </div>
                <h4 className="process-node__headline">{step.headline}</h4>
                <p className="process-node__text">{step.text}</p>
                <div className="process-node__line" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 04. TEXT REVEAL CARD CTA (CONTAINER WIDTH, PRESERVING GLOBAL PADDING) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block w-full bg-[#0E0E10] border border-white/[0.08] rounded-2xl py-8 sm:py-12 px-4 sm:pl-12 sm:pr-8 lg:pl-14 lg:pr-10 relative overflow-hidden shadow-2xl mt-12 sm:mt-20"
        >
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Text Reveal Interaction with generous left clearance */}
            <div className="w-full lg:w-auto flex-1 flex items-center justify-start overflow-hidden">
              <TextRevealCard
                text="You know the business"
                revealText="I know the chemistry "
                className="bg-transparent border-none p-0 w-full max-w-none shadow-none pl-1 sm:pl-4 lg:pl-6"
              />
            </div>

            {/* Cleanly Aligned Action Button */}
            <div className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center sm:justify-end">
              <button onClick={scrollToContact} className="services-cta-btn w-full sm:w-auto justify-center">
                <span>INITIATE PROJECT</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default ServicesSection;
