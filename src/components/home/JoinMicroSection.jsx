import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SplitText } from '../ui/SplitText';
import { TypewriterText } from '../ui/TypewriterText';
import './JoinMicroSection.css';

export function JoinMicroSection() {
  const navigate = useNavigate();

  const handleJoinClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/join');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="join-editorial-section" id="join-teaser" aria-label="Join Our Talent">
      <div className="join-editorial-container">
        <motion.div 
          initial={{ opacity: 0, y: 45, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="join-editorial-card"
          onClick={handleJoinClick}
          role="region"
          aria-label="Atelier Talent Invitation"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleJoinClick(e); }}
        >
          {/* Subtle Ambient Artwork: Flowing Contour Waves + Faint AAR Architectural Monogram */}
          <div className="join-editorial-bg-art" aria-hidden="true">
            <svg
              className="join-editorial-contour-svg"
              viewBox="0 0 1200 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Flowing curvilinear strands mimicking AAR's bespoke golden curves */}
              <path
                d="M -120,520 C 180,480 340,190 620,250 C 900,310 980,100 1340,160"
                stroke="#c9962c"
                strokeWidth="1.2"
                opacity="0.22"
              />
              <path
                d="M -120,560 C 200,520 370,230 650,290 C 930,350 1010,140 1340,200"
                stroke="#c9962c"
                strokeWidth="1.1"
                opacity="0.18"
              />
              <path
                d="M -120,600 C 220,560 400,270 680,330 C 960,390 1040,180 1340,240"
                stroke="#c9962c"
                strokeWidth="1"
                opacity="0.15"
              />
              <path
                d="M -120,640 C 240,600 430,310 710,370 C 990,430 1070,220 1340,280"
                stroke="#c9962c"
                strokeWidth="0.9"
                opacity="0.12"
              />
              <path
                d="M -120,680 C 260,640 460,350 740,410 C 1020,470 1100,260 1340,320"
                stroke="#c9962c"
                strokeWidth="0.8"
                opacity="0.09"
              />
              {/* Architectural AAR watermark positioned low in negative space */}
              <text
                x="96%"
                y="86%"
                textAnchor="end"
                className="join-editorial-watermark-text"
                fill="#c9962c"
                opacity="0.04"
              >
                AAR
              </text>
            </svg>
            <div className="join-editorial-glow" />
          </div>

          {/* Top Row: Chapter-style eyebrow + Network status badge */}
          <div className="join-editorial-top">
            <div className="join-editorial-eyebrow">
              <span className="join-editorial-eyebrow-dash" />
              <span className="join-editorial-eyebrow-text">ATELIER INVITATION • TALENT NETWORK</span>
            </div>
            <div className="join-editorial-status">
              <span className="join-editorial-status-dot" />
              <span className="join-editorial-status-label">GLOBAL COLLABORATION</span>
            </div>
          </div>

          {/* Main Content: Asymmetrical Headline + Body on Left, Refined CTA on Right */}
          <div className="join-editorial-main">
            <div className="join-editorial-narrative">
              <h2 className="join-editorial-headline">
                <SplitText text="THE ATELIER IS OPEN." type="chars" delay={0.15} stagger={0.03} />
              </h2>
              <p className="join-editorial-subline">
                <TypewriterText
                  text="For people who make things that matter."
                  speed={40}
                  loop={false}
                  cursorChar="|"
                  triggerInView={true}
                  startDelay={500}
                />
              </p>
              <p className="join-editorial-copy">
                Designers, developers, filmmakers, animators, strategists and obsessive makers — we're building a network for people who care about the work as much as the idea.
              </p>
            </div>

            {/* Right: Tactile Rounded-Rectangle CTA Area */}
            <div className="join-editorial-action">
              <button
                type="button"
                className="join-editorial-btn"
                onClick={handleJoinClick}
                aria-label="Join Our Talent (redirects to join page)"
              >
                <span className="join-editorial-btn-text">JOIN OUR TALENT</span>
                <span className="join-editorial-btn-arrow" aria-hidden="true">↗</span>
              </button>

              <div className="join-editorial-meta">
                <span className="join-editorial-meta-dot" />
                <span className="join-editorial-meta-text">09 OPEN POSITIONS</span>
              </div>
            </div>
          </div>

          {/* Center / Lower Signature: MAKE. MOVE. CREATE. Integrated Typographic Baseline */}
          <div className="join-editorial-footer">
            <div className="join-editorial-rule" />
            <div className="join-editorial-signature" aria-hidden="true">
              <span className="join-sig-word">MAKE.</span>
              <span className="join-sig-sep">•</span>
              <span className="join-sig-word">MOVE.</span>
              <span className="join-sig-sep">•</span>
              <span className="join-sig-word join-sig-word--gold">CREATE.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default JoinMicroSection;
