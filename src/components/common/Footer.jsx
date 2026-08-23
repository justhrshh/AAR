import React, { useState, useEffect } from 'react';
import './Footer.css';

export function Footer({ theme = 'light' }) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const now = new Intl.DateTimeFormat('en-GB', options).format(new Date());
      setTimeString(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`aar-editorial-footer aar-footer--${theme}`}>
      <div className="aar-footer-container">
        
        {/* Top Section: Editorial Callout */}
        <div className="aar-footer-top">
          <div className="aar-footer-headline">
            <span className="aar-footer-eyebrow">
              <span className="aar-footer-eyebrow__dash" />
              START A CONVERSATION
            </span>
            <h2 className="aar-footer-title">
              LET’S SHAPE VISIONS<br />
              <span className="aar-footer-title--gold">INTO IMPACT.</span>
            </h2>
          </div>

          <div className="aar-footer-cta-col">
            <p className="aar-footer-body">
              We collaborate with visionary founders, global cultural institutions, and ambitious brands worldwide.
            </p>
            <button onClick={() => scrollTo('contact')} className="aar-footer-cta-btn">
              <span>INITIATE PROJECT</span>
              <span className="aar-footer-cta-btn__arrow">→</span>
            </button>
          </div>
        </div>

        {/* Middle Section: Directory & Coordinates */}
        <div className="aar-footer-middle">
          
          {/* Col 1: Brand Info */}
          <div className="aar-footer-col aar-footer-col--brand">
            <div className="aar-footer-logo-wrap" onClick={() => scrollTo('top')} style={{ cursor: 'pointer' }}>
              <img
                src="/images/aar_logo.png"
                alt="AAR"
                className="aar-footer-logo-img"
              />
              <div className="aar-footer-logo-sub">
                <span>V</span><span>I</span><span>S</span><span>U</span><span>A</span><span>L</span><span>S</span>
              </div>
            </div>
            <p className="aar-footer-brand-desc">
              An independent creative studio specializing in identity systems, digital platforms, and sensorial motion.
            </p>
          </div>

          {/* Col 2: Navigation Directory */}
          <div className="aar-footer-col">
            <span className="aar-footer-col__title">INDEX</span>
            <ul className="aar-footer-nav-list">
              <li><button onClick={() => scrollTo('work')} className="aar-footer-nav-btn">SELECTED WORK</button></li>
              <li><button onClick={() => scrollTo('services')} className="aar-footer-nav-btn">SERVICES & PROCESS</button></li>
              <li><button onClick={() => scrollTo('studio')} className="aar-footer-nav-btn">STUDIO PHILOSOPHY</button></li>
              <li><button onClick={() => scrollTo('contact')} className="aar-footer-nav-btn">CONTACT & INQUIRY</button></li>
            </ul>
          </div>

          {/* Col 3: Direct Channels */}
          <div className="aar-footer-col">
            <span className="aar-footer-col__title">COMMUNICATION</span>
            <ul className="aar-footer-contact-list">
              <li>
                <span className="aar-footer-contact-label">DIRECT INQUIRIES</span>
                <a href="mailto:studio@aarvisuals.com" className="aar-footer-contact-val">studio@aarvisuals.com</a>
              </li>
              <li>
                <span className="aar-footer-contact-label">DIRECT PHONE</span>
                <a href="tel:+911145678900" className="aar-footer-contact-val">+91 (0) 11 4567 8900</a>
              </li>
              <li>
                <span className="aar-footer-contact-label">WHATSAPP DISPATCH</span>
                <a href="https://wa.me/911145678900" target="_blank" rel="noopener noreferrer" className="aar-footer-contact-val">+91 (0) 98110 54321</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Live Clock */}
          <div className="aar-footer-col">
            <span className="aar-footer-col__title">LOCATION & TIME</span>
            <div className="aar-footer-location">
              <span className="aar-footer-location__city">NEW DELHI, INDIA</span>
              <span className="aar-footer-location__coords">28.6139° N, 77.2090° E</span>
              <div className="aar-footer-time-badge">
                <span className="aar-footer-time-dot" />
                <span>{timeString ? `${timeString} IST` : '14:30:00 IST'}</span>
                <span className="aar-footer-time-status">• STUDIO OPEN</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & Back To Top */}
        <div className="aar-footer-bottom">
          <div className="aar-footer-meta-left">
            <span>© {new Date().getFullYear()} AAR VISUALS</span>
            <span className="aar-footer-dot">•</span>
            <span>INDEPENDENT CREATIVE STUDIO</span>
            <span className="aar-footer-dot">•</span>
            <span>EST. 2026</span>
          </div>

          <div className="aar-footer-socials">
            {[
              { label: 'INSTAGRAM', url: 'https://instagram.com' },
              { label: 'BEHANCE', url: 'https://behance.net' },
              { label: 'LINKEDIN', url: 'https://linkedin.com' },
              { label: 'X / TWITTER', url: 'https://x.com' }
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aar-footer-social-link"
              >
                {s.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollTo('top')}
            className="aar-footer-back-top"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <span className="aar-footer-back-top__arrow">↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
