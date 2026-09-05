import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../data/projects';
import { ProjectShowcase } from './ProjectShowcase';
import { ViewportVideo } from '../common/ViewportVideo';
import './WorkSection.css';

export function WorkSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openCaseStudy = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="work" className="aar-work-section">
      <div className="work-section-container">

        {/* ── 01. EDITORIAL WORK HEADER ── */}
        <div className="work-header">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="work-header__eyebrow"
          >
            <span className="work-header__eyebrow-dash" />
            <span className="work-header__eyebrow-text">CHAPTER 02 / SELECTED WORK ARCHIVE</span>
          </motion.div>

          <div className="work-header__main-row">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="work-header__title-wrap"
            >
              <h2 className="sr-only">Selected Projects</h2>
              <img
                src="/images/selected-projects-title.png"
                alt="Selected Projects"
                className="work-header__title-img"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="work-header__desc-col"
            >
              <p className="work-header__desc">
                A curated body of identity systems, digital platforms, and sensorial motion pieces crafted for visionaries worldwide.
              </p>
              <div className="work-header__stats">
                <div className="work-stat">
                  <span className="work-stat__num">{PROJECTS.length.toString().padStart(2, '0')}</span>
                  <span className="work-stat__label">ACTIVE CASES</span>
                </div>
                <div className="work-stat">
                  <span className="work-stat__num">100%</span>
                  <span className="work-stat__label">BESPOKE SYSTEMS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 02. SHOWCASE ZONE (WITH CUSTOM BG BELOW THE DIVIDER) ── */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="work-showcase-zone"
        >
          <div className="work-showcase-bg-layer" />

          {/* Draggable Card Presentation Showcase */}
          <ProjectShowcase
            projects={PROJECTS}
            onSelectProject={openCaseStudy}
          />
        </motion.div>

      </div>

      {/* ── 03. INLINE EXPANDABLE CASE STUDY MODAL ── */}
      {selectedProject && (
        <div className="case-study-overlay" onClick={closeCaseStudy}>
          <div className="case-study-modal" onClick={e => e.stopPropagation()}>
            
            {/* Modal Close Header */}
            <div className="case-study-modal-header">
              <div className="case-study-modal-brand">
                <span className="case-study-modal-num">PROJ / {selectedProject.number}</span>
                <span className="case-study-modal-title">{selectedProject.title}</span>
              </div>

              <button className="case-study-close-btn" onClick={closeCaseStudy} aria-label="Close Case Study">
                <span>CLOSE</span>
                <span className="case-study-close-icon">✕</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="case-study-modal-body">
              
              {/* Top Hero */}
              <div className="modal-hero-block">
                <h1 className="modal-hero-title">{selectedProject.title}</h1>
                <p className="modal-hero-subtitle">{selectedProject.subtitle}</p>
                
                <div className="modal-meta-grid">
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">CLIENT</span>
                    <span className="modal-meta-val">{selectedProject.client}</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">DISCIPLINE</span>
                    <span className="modal-meta-val">{selectedProject.category}</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">TIMELINE</span>
                    <span className="modal-meta-val">{selectedProject.year} • {selectedProject.duration}</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">SERVICES</span>
                    <div className="modal-services-wrap">
                      {(selectedProject.services || []).map((s, i) => (
                        <span key={i} className="modal-service-pill">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-hero-img-wrap">
                  {selectedProject.heroVideo || selectedProject.video ? (
                    <ViewportVideo
                      src={selectedProject.heroVideo || selectedProject.video}
                      loop
                      muted
                      playsInline
                      controls
                      className="modal-hero-video"
                    />
                  ) : (
                    <img src={selectedProject.heroImage} alt={selectedProject.title} className="modal-hero-img" />
                  )}
                </div>
              </div>

              {/* Context & Challenge */}
              <div className="modal-context-block">
                <div className="modal-section-tag">01 / BRIEF & CHALLENGE</div>
                <div className="modal-context-grid">
                  <div className="modal-context-card">
                    <h4>THE OVERVIEW</h4>
                    <p>{selectedProject.context?.overview}</p>
                  </div>
                  <div className="modal-context-card">
                    <h4>THE CORE CHALLENGE</h4>
                    <p>{selectedProject.context?.challenge}</p>
                  </div>
                  <div className="modal-context-card modal-context-card--gold">
                    <h4>AAR CONTRIBUTION</h4>
                    <p>{selectedProject.context?.contribution}</p>
                  </div>
                </div>
              </div>

              {/* Art Direction Philosophy */}
              <div className="modal-direction-block">
                <div className="modal-section-tag">02 / ART DIRECTION PHILOSOPHY</div>
                <h2 className="modal-direction-headline">{selectedProject.creativeDirection?.headline}</h2>
                <p className="modal-direction-desc">{selectedProject.creativeDirection?.philosophy}</p>

                <div className="modal-palette-row">
                  <span className="modal-palette-label">CALIBRATED PALETTE:</span>
                  <div className="modal-palette-swatches">
                    {(selectedProject.creativeDirection?.palette || []).map((c, i) => (
                      <div key={i} className="modal-swatch-item">
                        <div className="modal-swatch-box" style={{ backgroundColor: c }} />
                        <span className="modal-swatch-hex">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery Media */}
              <div className="modal-gallery-block">
                {(selectedProject.gallery || []).map((item, idx) => {
                  if (item.type === 'video-full' || (item.video && item.type !== 'video-split')) {
                    return (
                      <div key={idx} className="modal-gallery-item modal-gallery-item--video-full">
                        <div className="modal-video-container">
                          <ViewportVideo
                            src={item.video}
                            loop
                            muted
                            playsInline
                            controls
                            className="modal-gallery-video"
                          />
                        </div>
                        {item.caption && <span className="modal-gallery-caption">{item.caption}</span>}
                      </div>
                    );
                  }
                  if (item.type === 'video-trio' || item.type === 'video-3' || item.type === 'video-quad' || item.type === 'video-grid' || (item.videos && Array.isArray(item.videos))) {
                    const count = item.videos.length;
                    const gridClass = count === 2 
                      ? 'modal-gallery-item--video-split'
                      : count === 4 
                      ? 'modal-gallery-item--video-quad'
                      : 'modal-gallery-item--video-trio';

                    return (
                      <div key={idx} className={`modal-gallery-item ${gridClass}`}>
                        {item.videos.map((vid, vIdx) => (
                          <div key={vIdx} className="modal-trio-col">
                            <div className="modal-video-container">
                              <ViewportVideo
                                src={typeof vid === 'string' ? vid : vid.src}
                                loop
                                muted
                                playsInline
                                controls
                                className="modal-gallery-video modal-trio-video"
                              />
                            </div>
                            {(vid.caption || item.captions?.[vIdx]) && (
                              <span className="modal-gallery-caption">
                                {vid.caption || item.captions[vIdx]}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (item.type === 'video-split') {
                    return (
                      <div key={idx} className="modal-gallery-item modal-gallery-item--video-split">
                        <div className="modal-video-col">
                          <div className="modal-video-container">
                            <ViewportVideo
                              src={item.videoLeft}
                              loop
                              muted
                              playsInline
                              controls
                              className="modal-gallery-video"
                            />
                          </div>
                          {item.captionLeft && <span className="modal-gallery-caption">{item.captionLeft}</span>}
                        </div>
                        <div className="modal-video-col">
                          <div className="modal-video-container">
                            <ViewportVideo
                              src={item.videoRight}
                              loop
                              muted
                              playsInline
                              controls
                              className="modal-gallery-video"
                            />
                          </div>
                          {item.captionRight && <span className="modal-gallery-caption">{item.captionRight}</span>}
                        </div>
                      </div>
                    );
                  }
                  if (item.type === 'full-bleed') {
                    return (
                      <div key={idx} className="modal-gallery-item modal-gallery-item--full">
                        <img src={item.image} alt={selectedProject.title} loading="lazy" />
                        {item.caption && <span className="modal-gallery-caption">{item.caption}</span>}
                      </div>
                    );
                  }
                  if (item.type === 'split-2') {
                    return (
                      <div key={idx} className="modal-gallery-item modal-gallery-item--split">
                        <div>
                          <img src={item.imageLeft} alt={selectedProject.title} loading="lazy" />
                          {item.captionLeft && <span className="modal-gallery-caption">{item.captionLeft}</span>}
                        </div>
                        <div>
                          <img src={item.imageRight} alt={selectedProject.title} loading="lazy" />
                          {item.captionRight && <span className="modal-gallery-caption">{item.captionRight}</span>}
                        </div>
                      </div>
                    );
                  }
                  if (item.type === 'quote-image') {
                    return (
                      <div key={idx} className="modal-gallery-item modal-gallery-item--quote">
                        <blockquote>“{item.quote}”</blockquote>
                        <img src={item.image} alt={selectedProject.title} loading="lazy" />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Outcome */}
              <div className="modal-outcome-block">
                <div className="modal-section-tag">03 / MEASURED OUTCOME</div>
                <div className="modal-outcome-grid">
                  <div>
                    <h3>MEASURED IMPACT</h3>
                    <p>{selectedProject.outcome.summary}</p>
                  </div>
                  <div>
                    <h4>DELIVERABLES INCLUDED</h4>
                    <ul>
                      {selectedProject.outcome.deliverables.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default WorkSection;
