import React, { useState, useEffect } from 'react';
import { BubbleMenu } from './BubbleMenu/BubbleMenu';
import './Navbar.css';

export function Navbar({ onReplay, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('HERO');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Section tracking for active state & dark theme detection
      const sections = [
        { id: 'contact', name: 'CONTACT' },
        { id: 'studio', name: 'STUDIO' },
        { id: 'services', name: 'SERVICES' },
        { id: 'whyus', name: 'SERVICES' },
        { id: 'work', name: 'WORK' }
      ];

      // Check dark backgrounds (WhyUs section and Services)
      let isDark = false;
      const whyUsEl = document.getElementById('whyus') || document.getElementById('services');
      if (whyUsEl) {
        const rect = whyUsEl.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 60) {
          isDark = true;
        }
      }
      setIsDarkSection(isDark);

      // Check current visible section
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 0) {
            setActiveSection(sec.name);
            return;
          }
        }
      }

      if (scrollY > window.innerHeight * 1.2) {
        setActiveSection('ABOUT');
      } else {
        setActiveSection('HERO');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Handle locking body scroll when menu overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);

    if (onNavigate) {
      onNavigate(sectionId);
      return;
    }

    if (sectionId === 'TOP') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'ABOUT') {
      const totalScrollHeight = window.innerHeight * 1.4;
      window.scrollTo({ top: totalScrollHeight, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId.toLowerCase());
    if (el) {
      const navOffset = 60;
      const elPos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: elPos, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, item) => {
    if (e && e.preventDefault) e.preventDefault();
    scrollToSection(item);
  };

  const handleLogoClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    scrollToSection('TOP');
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navClasses = [
    'aar-fixed-navbar',
    isScrolled ? 'aar-fixed-navbar--scrolled' : '',
    isDarkSection ? 'aar-fixed-navbar--dark' : 'aar-fixed-navbar--light'
  ].filter(Boolean).join(' ');

  const NAV_ITEMS = [
    { label: 'WORK', target: 'work' },
    { label: 'SERVICES', target: 'services' },
    { label: 'STUDIO', target: 'studio' },
    { label: 'ABOUT', target: 'ABOUT' },
    { label: 'CONTACT', target: 'contact' }
  ];

  return (
    <>
      <header className={navClasses}>
        {/* Official AAR Logo */}
        <a href="#top" className="aar-navbar-logo" onClick={handleLogoClick}>
          <div className="aar-navbar-logo__wrap">
            <img
              src="/images/aar_logo.png"
              alt="AAR"
              className={`aar-navbar-logo__img aar-navbar-logo__img--dark ${isDarkSection ? 'aar-navbar-logo__img--hidden' : ''}`}
            />
            <img
              src="/images/aar_logo_white.png"
              alt="AAR"
              className={`aar-navbar-logo__img aar-navbar-logo__img--light ${isDarkSection ? '' : 'aar-navbar-logo__img--hidden'}`}
            />
          </div>
          <div className="aar-navbar-logo__sub">
            <span>V</span>
            <span>I</span>
            <span>S</span>
            <span>U</span>
            <span>A</span>
            <span>L</span>
            <span>S</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="aar-navbar-nav">
          {NAV_ITEMS.map(({ label, target }) => {
            const isActive = activeSection === label;
            return (
              <a
                key={label}
                href={`#${target.toLowerCase()}`}
                className={`aar-navbar-nav__link ${isActive ? 'aar-navbar-nav__link--active' : ''}`}
                onClick={(e) => handleLinkClick(e, target)}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* Right Menu Button */}
        <button
          className="aar-navbar-menu-btn"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={menuOpen}
        >
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
          <div className="aar-navbar-menu-dots">
            {[...Array(9)].map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </button>
      </header>

      {/* ── ART-DIRECTED BUBBLE PILL MENU OVERLAY ── */}
      <BubbleMenu
        isOpen={menuOpen}
        onMenuClick={setMenuOpen}
        onItemClick={(e, href) => {
          if (e && e.preventDefault) e.preventDefault();
          setMenuOpen(false);
          const target = href.replace('#', '').toUpperCase();
          scrollToSection(target);
        }}
        animationDuration={0.65}
        staggerDelay={0.08}
      />
    </>
  );
}

export default Navbar;
