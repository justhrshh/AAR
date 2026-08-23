import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './BubbleMenu.css';

/* ─────────────────────────────────────────────────────────────
   Minimal Crafted Line Icons matching Reference Design
───────────────────────────────────────────────────────────── */
const WorkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="bubble-icon-svg">
    <rect x="2" y="7" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M2 12h20" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
    <rect x="10" y="11" width="4" height="3" rx="0.75" stroke="#d99e1f" strokeWidth="1.6" fill="#ffffff" />
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="bubble-icon-svg">
    <path d="M19 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 5 19.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="7.5" r="4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ServicesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="bubble-icon-svg">
    <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <rect x="14" y="3" width="7" height="7" rx="2" stroke="#d99e1f" strokeWidth="1.8" />
    <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ProcessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="bubble-icon-svg">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" stroke="#d99e1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 16h5v5" stroke="#d99e1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TestimonialsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="bubble-icon-svg">
    <path d="M5.5 13c-1.5 0-2.5-1-2.5-2.5 0-2 1.5-4.5 4.5-5.5l.5 1c-2 .5-3 2-3 3h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1z" fill="#d99e1f" />
    <path d="M15.5 13c-1.5 0-2.5-1-2.5-2.5 0-2 1.5-4.5 4.5-5.5l.5 1c-2 .5-3 2-3 3h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1z" fill="currentColor" />
  </svg>
);

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="bubble-icon-svg">
    <path d="m22 2-7 20-4-9-9-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M22 2 11 13" stroke="#d99e1f" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Menu Items Configuration matching Reference Composition
───────────────────────────────────────────────────────────── */
const ART_DIRECTED_ITEMS = [
  {
    id: 'work',
    label: 'work',
    subtitle: 'selected projects',
    href: '#work',
    ariaLabel: 'Work — Selected Projects',
    icon: <WorkIcon />,
    rotation: -9,
    offsetX: -14,
    offsetY: -24,
    hasSpark: true,
    hasUnderglow: false,
    hoverStyles: { bgColor: '#ffffff', textColor: '#0e0e11', accentColor: '#d99e1f' }
  },
  {
    id: 'about',
    label: 'about',
    subtitle: 'who we are',
    href: '#about',
    ariaLabel: 'About — Who We Are',
    icon: <AboutIcon />,
    rotation: 4,
    offsetX: 0,
    offsetY: -36,
    hasSpark: false,
    hasUnderglow: false,
    hoverStyles: { bgColor: '#ffffff', textColor: '#0e0e11', accentColor: '#d99e1f' }
  },
  {
    id: 'services',
    label: 'services',
    subtitle: 'what we do',
    href: '#services',
    ariaLabel: 'Services — What We Do',
    icon: <ServicesIcon />,
    rotation: 9,
    offsetX: 16,
    offsetY: -16,
    hasSpark: true,
    hasUnderglow: false,
    hoverStyles: { bgColor: '#ffffff', textColor: '#0e0e11', accentColor: '#d99e1f' }
  },
  {
    id: 'process',
    label: 'process',
    subtitle: 'our approach',
    href: '#services',
    ariaLabel: 'Process — Our Approach',
    icon: <ProcessIcon />,
    rotation: -8,
    offsetX: -18,
    offsetY: 28,
    hasSpark: false,
    hasUnderglow: false,
    hoverStyles: { bgColor: '#ffffff', textColor: '#0e0e11', accentColor: '#d99e1f' }
  },
  {
    id: 'testimonials',
    label: 'testimonials',
    subtitle: 'kind words',
    href: '#services',
    ariaLabel: 'Testimonials — Kind Words',
    icon: <TestimonialsIcon />,
    rotation: 3,
    offsetX: 2,
    offsetY: 38,
    hasSpark: false,
    hasUnderglow: false,
    hoverStyles: { bgColor: '#ffffff', textColor: '#0e0e11', accentColor: '#d99e1f' }
  },
  {
    id: 'contact',
    label: 'contact',
    subtitle: "let’s connect",
    href: '#contact',
    ariaLabel: 'Contact — Let’s Connect',
    icon: <ContactIcon />,
    rotation: 9,
    offsetX: 18,
    offsetY: 22,
    hasSpark: false,
    hasUnderglow: true,
    hoverStyles: { bgColor: '#ffffff', textColor: '#0e0e11', accentColor: '#d99e1f' }
  }
];

export function BubbleMenu({
  isOpen: controlledIsOpen,
  onMenuClick,
  onItemClick,
  className,
  style,
  items,
  animationDuration = 0.65,
  staggerDelay = 0.08
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isMenuOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const contentRef = useRef(null);

  const menuItems = items?.length ? items : ART_DIRECTED_ITEMS;

  const handleLinkClick = (e, href) => {
    if (onItemClick) {
      onItemClick(e, href);
    } else if (href && href.startsWith('#')) {
      e.preventDefault();
      if (controlledIsOpen === undefined) setInternalIsOpen(false);
      onMenuClick?.(false);

      if (href === '#work') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '#services') {
        const target = document.getElementById('services');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '#about') {
        window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
      } else {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Sequence Animation: Staggered spring/overshoot entrance
  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.killTweensOf(bubbles);
      const isDesktop = window.innerWidth >= 768;

      // Initial state: slightly lower, scaled down, 0 opacity
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i] || ART_DIRECTED_ITEMS[i];
        const rot = isDesktop ? (item?.rotation ?? 0) : ((i % 2 === 0 ? -3 : 3));
        const initY = (item?.offsetY || 0) + 50;
        const initX = isDesktop ? (item?.offsetX || 0) : 0;

        gsap.set(bubble, {
          x: initX,
          y: initY,
          scale: 0.72,
          rotation: rot - (i % 2 === 0 ? -8 : 8),
          opacity: 0,
          transformOrigin: '50% 50%'
        });
      });

      // Sequential spring pop-in: 1 by 1
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i] || ART_DIRECTED_ITEMS[i];
        const targetRot = isDesktop ? (item?.rotation ?? 0) : ((i % 2 === 0 ? -3 : 3));
        const targetY = isDesktop ? (item?.offsetY || 0) : 0;
        const targetX = isDesktop ? (item?.offsetX || 0) : 0;
        const delay = i * staggerDelay;

        gsap.to(bubble, {
          x: targetX,
          y: targetY,
          scale: 1,
          rotation: targetRot,
          opacity: 1,
          duration: animationDuration,
          delay: delay,
          ease: 'back.out(1.5)',
        });
      });
    } else {
      gsap.killTweensOf(bubbles);
      gsap.to(bubbles, {
        y: '+=25',
        scale: 0.75,
        opacity: 0,
        duration: 0.22,
        ease: 'power3.in',
        stagger: 0.02
      });
    }
  }, [isMenuOpen, animationDuration, staggerDelay, menuItems]);

  return (
    <div
      ref={overlayRef}
      className={`organic-menu-overlay ${isMenuOpen ? 'is-open' : ''} ${className || ''}`}
      style={style}
      aria-hidden={!isMenuOpen}
      onClick={(e) => {
        if (e.target === overlayRef.current || e.target === contentRef.current) {
          if (controlledIsOpen === undefined) setInternalIsOpen(false);
          onMenuClick?.(false);
        }
      }}
    >
      {/* Top Header Bar inside Menu Overlay */}
      <div className="organic-menu-header-bar">
        {/* Brand Logo */}
        <div className="organic-menu-brand">
          <img src="/images/aar_logo.png" alt="AAR" className="organic-menu-logo-img" />
          <div className="organic-menu-logo-sub">
            <span>V</span><span>I</span><span>S</span><span>U</span><span>A</span><span>L</span><span>S</span>
          </div>
        </div>

        {/* Action button & Close button */}
        <div className="organic-menu-header-actions">
          <a
            href="#contact"
            className="organic-menu-talk-btn"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            <span className="talk-btn-spark">✦</span>
            <span>LET'S TALK</span>
          </a>

          <button 
            className="organic-menu-close-btn"
            onClick={() => {
              if (controlledIsOpen === undefined) setInternalIsOpen(false);
              onMenuClick?.(false);
            }}
            aria-label="Close Menu"
          >
            <div className="organic-menu-close-icon">
              <span className="close-bar close-bar-1" />
              <span className="close-bar close-bar-2" />
            </div>
          </button>
        </div>
      </div>

      {/* ── SUBTLE BACKGROUND DETAILS ── */}
      <div className="menu-bg-artwork" aria-hidden="true">
        
        {/* Left Dotted Grid Matrix */}
        <div className="bg-dots-grid bg-dots-left">
          {[...Array(16)].map((_, idx) => (
            <span key={idx} className="bg-dot" />
          ))}
        </div>

        {/* Right Dotted Grid Matrix */}
        <div className="bg-dots-grid bg-dots-right">
          {[...Array(16)].map((_, idx) => (
            <span key={idx} className="bg-dot" />
          ))}
        </div>

        {/* Thin flowing curved line connecting the composition */}
        <svg viewBox="0 0 1200 600" fill="none" className="bg-curved-flow-svg">
          <path
            d="M 50 320 Q 280 420 540 330 T 1150 260"
            stroke="rgba(255, 255, 255, 0.065)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M 120 280 Q 420 180 720 290 T 1100 380"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1"
          />
        </svg>

        {/* Subtle Squiggle Scribble */}
        <div className="bg-squiggle-mark">
          <svg viewBox="0 0 120 24" fill="none">
            <path
              d="M 4 12 Q 18 2 32 12 T 60 12 T 88 12 T 116 12"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

      </div>

      {/* ── 6 ART-DIRECTED FLOATING PILL BUTTONS (ENLARGED) ── */}
      <div ref={contentRef} className="organic-pills-canvas">
        <div className="pills-composition-wrap">
          {menuItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`pill-item-node pill-node-${item.id || idx} ${item.hasUnderglow ? 'has-glow' : ''}`}
              ref={(el) => {
                if (el) bubblesRef.current[idx] = el;
              }}
            >
              {/* Playful Gold Spark Marks above pill */}
              {item.hasSpark && (
                <div className="pill-spark-accent" aria-hidden="true">
                  <span className="spark-line spark-l" />
                  <span className="spark-line spark-c" />
                  <span className="spark-line spark-r" />
                </div>
              )}

              {/* Contact Warm Glow Backdrop */}
              {item.hasUnderglow && <div className="pill-underglow-orb" aria-hidden="true" />}

              {/* Pill Button Link */}
              <a
                href={item.href}
                className={`pill-card-btn ${item.id === 'contact' ? 'pill-contact-btn' : ''}`}
                onClick={(e) => handleLinkClick(e, item.href)}
                aria-label={item.ariaLabel || item.label}
              >
                {/* Left Minimal Line Icon */}
                <div className="pill-icon-box">
                  {item.icon}
                </div>

                {/* Right Text Block */}
                <div className="pill-text-box">
                  <span className="pill-main-title">{item.label}</span>
                  {item.subtitle && <span className="pill-sub-title">{item.subtitle}</span>}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BubbleMenu;
