import React, { useState } from 'react';
import { PROJECTS } from '../../data/projects';
import './WorkSection.css';

const CATEGORIES = ['ALL', 'BRANDING', 'DIGITAL', 'MOTION', 'ART DIRECTION'];

export function WorkSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.categoryFilter === activeCategory || p.services.some(s => s.toUpperCase().includes(activeCategory)));

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
          <div className="work-header__eyebrow">
            <span className="work-header__eyebrow-dash" />
            <span className="work-header__eyebrow-text">CHAPTER 02 / SELECTED WORK ARCHIVE</span>
          </div>

          <div className="work-header__main-row">
            <h2 className="work-header__title">
              SELECTED<br />
              <span className="work-header__title--gold">PROJECTS</span>
              <span className="work-header__title-dot">.</span>
            </h2>

            <div className="work-header__desc-col">
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
            </div>
          </div>

          {/* Filter Bar */}
          <div className="work-filter-bar">
            <span className="work-filter-bar__label">FILTER DISCIPLINE:</span>
            <div className="work-filter-pills">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`work-filter-pill ${activeCategory === cat ? 'work-filter-pill--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                  {activeCategory === cat && <span className="work-filter-pill__dot" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 02. ASYMMETRIC PROJECT COMPOSITIONS ── */}
        <div className="work-gallery-feed">
          {filteredProjects.map((project, index) => {
            const compType = index % 5;

            // Comp 0: Horizontal wide visual with vertical text lockup
            if (compType === 0) {
              return (
                <article key={project.id} className="work-comp work-comp--horizontal" onClick={() => openCaseStudy(project)}>
                  <div className="work-comp__media-wrap">
                    <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                    <div className="work-comp__tag-badge">{project.category}</div>
                  </div>

                  <div className="work-comp__meta-side">
                    <div className="work-comp__index">PROJ / {project.number}</div>
                    <h3 className="work-comp__title">{project.title}</h3>
                    <p className="work-comp__excerpt">{project.excerpt}</p>
                    
                    <div className="work-comp__services-list">
                      {project.services.map((s, i) => (
                        <span key={i} className="work-comp__service-tag">{s}</span>
                      ))}
                    </div>

                    <button type="button" className="work-comp__cta-btn">
                      <span>VIEW CASE STUDY</span>
                      <span className="work-comp__cta-arrow">→</span>
                    </button>
                  </div>
                </article>
              );
            }

            // Comp 1: Split composition with overlapping title
            if (compType === 1) {
              return (
                <article key={project.id} className="work-comp work-comp--split" onClick={() => openCaseStudy(project)}>
                  <div className="work-comp__split-left">
                    <div className="work-comp__index">PROJ / {project.number} • {project.year}</div>
                    <h3 className="work-comp__title work-comp__title--overlap">{project.title}</h3>
                    <div className="work-comp__client-tag">{project.client}</div>
                    <p className="work-comp__excerpt">{project.excerpt}</p>
                    
                    <button type="button" className="work-comp__cta-btn">
                      <span>VIEW CASE STUDY</span>
                      <span className="work-comp__cta-arrow">→</span>
                    </button>
                  </div>

                  <div className="work-comp__split-right">
                    <div className="work-comp__media-wrap work-comp__media-wrap--tall">
                      <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                    </div>
                  </div>
                </article>
              );
            }

            // Comp 2: Editorial stacked composition
            if (compType === 2) {
              return (
                <article key={project.id} className="work-comp work-comp--stacked" onClick={() => openCaseStudy(project)}>
                  <div className="work-comp__top-bar">
                    <span className="work-comp__index">PROJ / {project.number}</span>
                    <h3 className="work-comp__title">{project.title}</h3>
                    <span className="work-comp__year">{project.year}</span>
                  </div>

                  <div className="work-comp__media-wrap work-comp__media-wrap--wide">
                    <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                  </div>

                  <div className="work-comp__bottom-meta">
                    <span className="work-comp__category-text">{project.category}</span>
                    <p className="work-comp__excerpt">{project.excerpt}</p>
                    <button type="button" className="work-comp__cta-btn">
                      <span>VIEW CASE STUDY</span>
                      <span className="work-comp__cta-arrow">→</span>
                    </button>
                  </div>
                </article>
              );
            }

            // Comp 3: Full-width takeover visual
            if (compType === 3) {
              return (
                <article key={project.id} className="work-comp work-comp--takeover" onClick={() => openCaseStudy(project)}>
                  <div className="work-comp__takeover-media">
                    <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                    <div className="work-comp__takeover-overlay" />
                  </div>

                  <div className="work-comp__takeover-content">
                    <div className="work-comp__index">PROJ / {project.number} • {project.year}</div>
                    <h3 className="work-comp__takeover-title">{project.title}</h3>
                    <p className="work-comp__takeover-subtitle">{project.subtitle}</p>
                    <button type="button" className="work-comp__cta-btn work-comp__cta-btn--light">
                      <span>VIEW CASE STUDY</span>
                      <span className="work-comp__cta-arrow">→</span>
                    </button>
                  </div>
                </article>
              );
            }

            // Comp 4: Minimal archival presentation
            return (
              <article key={project.id} className="work-comp work-comp--minimal" onClick={() => openCaseStudy(project)}>
                <div className="work-comp__min-col work-comp__min-col--meta">
                  <div className="work-comp__index">PROJ / {project.number}</div>
                  <h3 className="work-comp__title">{project.title}</h3>
                  <span className="work-comp__sub">{project.subtitle}</span>
                  <div className="work-comp__client-tag">{project.client}</div>
                  <button type="button" className="work-comp__cta-btn">
                    <span>VIEW CASE STUDY</span>
                    <span className="work-comp__cta-arrow">→</span>
                  </button>
                </div>

                <div className="work-comp__min-col work-comp__min-col--media">
                  <div className="work-comp__media-wrap">
                    <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

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
                      {selectedProject.services.map((s, i) => (
                        <span key={i} className="modal-service-pill">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-hero-img-wrap">
                  <img src={selectedProject.heroImage} alt={selectedProject.title} className="modal-hero-img" />
                </div>
              </div>

              {/* Context & Challenge */}
              <div className="modal-context-block">
                <div className="modal-section-tag">01 / BRIEF & CHALLENGE</div>
                <div className="modal-context-grid">
                  <div className="modal-context-card">
                    <h4>THE OVERVIEW</h4>
                    <p>{selectedProject.context.overview}</p>
                  </div>
                  <div className="modal-context-card">
                    <h4>THE CORE CHALLENGE</h4>
                    <p>{selectedProject.context.challenge}</p>
                  </div>
                  <div className="modal-context-card modal-context-card--gold">
                    <h4>AAR CONTRIBUTION</h4>
                    <p>{selectedProject.context.contribution}</p>
                  </div>
                </div>
              </div>

              {/* Art Direction Philosophy */}
              <div className="modal-direction-block">
                <div className="modal-section-tag">02 / ART DIRECTION PHILOSOPHY</div>
                <h2 className="modal-direction-headline">{selectedProject.creativeDirection.headline}</h2>
                <p className="modal-direction-desc">{selectedProject.creativeDirection.philosophy}</p>

                <div className="modal-palette-row">
                  <span className="modal-palette-label">CALIBRATED PALETTE:</span>
                  <div className="modal-palette-swatches">
                    {selectedProject.creativeDirection.palette.map((c, i) => (
                      <div key={i} className="modal-swatch-item">
                        <div className="modal-swatch-box" style={{ backgroundColor: c }} />
                        <span className="modal-swatch-hex">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="modal-gallery-block">
                {selectedProject.gallery.map((item, idx) => {
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
