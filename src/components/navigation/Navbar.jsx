import React, { useState, useEffect } from 'react';
import './Navbar.css';

export function Navbar({ onReplay, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(item);
    } else {
      if (item === 'WORK') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (item === 'SERVICES' || item === 'WHY US') {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (item === 'ABOUT') {
        window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
      } else {
        const el = document.getElementById(item.toLowerCase());
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('TOP');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`aar-fixed-navbar ${isScrolled ? 'aar-fixed-navbar--scrolled' : ''}`}>
      {/* Official AAR Logo */}
      <a href="#" className="aar-navbar-logo" onClick={handleLogoClick}>
        <img
          src="/images/aar_logo.png"
          alt="AAR"
          className="aar-navbar-logo__img"
        />
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

      {/* Nav Links */}
      <nav className="aar-navbar-nav">
        {['WORK', 'SERVICES', 'STUDIO', 'ABOUT', 'CONTACT'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="aar-navbar-nav__link"
            onClick={(e) => handleLinkClick(e, item)}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Right Menu Button */}
      <button className="aar-navbar-menu-btn" onClick={onReplay} aria-label="Menu">
        <span>MENU</span>
        <div className="aar-navbar-menu-dots">
          {[...Array(9)].map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </button>
    </header>
  );
}

export default Navbar;
