import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Twitter, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export function Footer({ theme = 'light' }) {
  const [timeString, setTimeString] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
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
    } else {
      navigate(`/#${id}`);
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

        {/* Middle Section: Upgraded Directory Grid */}
        <div className="aar-footer-middle-upgrade">
          
          {/* Brand Info Column */}
          <div className="aar-footer-brand-side">
            <div 
              className="aar-footer-logo-wrap" 
              onClick={() => scrollTo('top')} 
              style={{ cursor: 'pointer' }}
            >
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
              An independent creative studio specializing in identity systems, digital architectures, and sensorial motion.
            </p>

            <div className="aar-footer-location-block">
              <span className="aar-footer-location__city">NEW DELHI, INDIA • 28.6139° N, 77.2090° E</span>
              <div className="aar-footer-time-badge">
                <span className="aar-footer-time-dot" />
                <span>{timeString ? `${timeString} IST` : '14:30:00 IST'}</span>
                <span className="aar-footer-time-status">• STUDIO OPEN</span>
              </div>
            </div>

            {/* Interactive Share / Tweet Button */}
            <div className="aar-footer-share-wrap">
              <a
                href="https://x.com/intent/tweet?text=Crafting%20extraordinary%20visuals%20with%20%40AARVISUALS01%20%E2%80%94%20Where%20Vision%20Finds%20Visibility."
                target="_blank"
                rel="noopener noreferrer"
                className="aar-footer-share-btn"
              >
                <span>Share Thoughts On</span>
                <Twitter className="w-3.5 h-3.5 text-[#1da1f2]" />
              </a>
            </div>

            <p className="aar-footer-copy-note">
              © {new Date().getFullYear()} AAR Visuals. All rights reserved.
            </p>
          </div>

          {/* Directory Links Grid: Pages, Disciplines, Socials, Legal */}
          <div className="aar-footer-links-grid">
            
            {/* 01. Pages */}
            <div className="aar-footer-col">
              <h3 className="aar-footer-col__title">PAGES</h3>
              <ul className="aar-footer-nav-list">
                <li>
                  <button onClick={() => scrollTo('work')} className="aar-footer-nav-btn">
                    Selected Work
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('services')} className="aar-footer-nav-btn">
                    Services & Process
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('studio')} className="aar-footer-nav-btn">
                    Studio Philosophy
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('team')} className="aar-footer-nav-btn">
                    Atelier & Team
                  </button>
                </li>
                <li>
                  <Link to="/join" className="aar-footer-nav-btn aar-footer-nav-btn--link">
                    Join Talent <ArrowUpRight className="inline w-3 h-3 ml-0.5 opacity-70" />
                  </Link>
                </li>
                <li>
                  <button onClick={() => scrollTo('contact')} className="aar-footer-nav-btn">
                    Contact & Inquiry
                  </button>
                </li>
              </ul>
            </div>

            {/* 02. Disciplines */}
            <div className="aar-footer-col">
              <h3 className="aar-footer-col__title">DISCIPLINES</h3>
              <ul className="aar-footer-nav-list">
                <li>
                  <button onClick={() => scrollTo('work')} className="aar-footer-nav-btn">
                    AI & Generative
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('work')} className="aar-footer-nav-btn">
                    Video & Motion
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('work')} className="aar-footer-nav-btn">
                    Web Architecture
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('work')} className="aar-footer-nav-btn">
                    Graphic Design
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('work')} className="aar-footer-nav-btn">
                    Digital Marketing
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('work')} className="aar-footer-nav-btn">
                    Social Strategy
                  </button>
                </li>
              </ul>
            </div>

            {/* 03. Socials */}
            <div className="aar-footer-col">
              <h3 className="aar-footer-col__title">SOCIALS</h3>
              <ul className="aar-footer-nav-list">
                <li>
                  <a
                    href="https://www.instagram.com/_aarvisuals/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aar-footer-nav-btn aar-footer-nav-btn--link"
                  >
                    Instagram <ArrowUpRight className="inline w-3 h-3 ml-0.5 opacity-70" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/AARVISUALS01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aar-footer-nav-btn aar-footer-nav-btn--link"
                  >
                    X / Twitter <ArrowUpRight className="inline w-3 h-3 ml-0.5 opacity-70" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.threads.com/@_aarvisuals?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aar-footer-nav-btn aar-footer-nav-btn--link"
                  >
                    Threads <ArrowUpRight className="inline w-3 h-3 ml-0.5 opacity-70" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61593983872811"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aar-footer-nav-btn aar-footer-nav-btn--link"
                  >
                    Facebook <ArrowUpRight className="inline w-3 h-3 ml-0.5 opacity-70" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://web.whatsapp.com/send?phone=917011191450"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aar-footer-nav-btn aar-footer-nav-btn--link"
                  >
                    WhatsApp <ArrowUpRight className="inline w-3 h-3 ml-0.5 opacity-70" />
                  </a>
                </li>
              </ul>
            </div>

            {/* 04. Direct & Legal */}
            <div className="aar-footer-col">
              <h3 className="aar-footer-col__title">DIRECT & LEGAL</h3>
              <ul className="aar-footer-nav-list">
                <li>
                  <a href="mailto:aarvisuals01@gmail.com" className="aar-footer-nav-btn">
                    aarvisuals01@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+917011191450" className="aar-footer-nav-btn">
                    +91 70111 91450
                  </a>
                </li>
                <li>
                  <Link to="/join" className="aar-footer-nav-btn">
                    Careers & Talent
                  </Link>
                </li>
                <li>
                  <button onClick={() => scrollTo('contact')} className="aar-footer-nav-btn">
                    Legal & Terms
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('top')} className="aar-footer-nav-btn text-[#c9962c] font-bold">
                    Back to Top ↑
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Monumental Bottom Watermark */}
        <div className="aar-footer-monumental-wrap">
          <h1 className="aar-footer-monumental-text select-none">
            AAR VISUALS
          </h1>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
