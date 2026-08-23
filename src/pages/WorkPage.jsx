import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/common/Footer';
import { PROJECTS } from '../data/projects';
import './WorkPage.css';

const CATEGORIES = ['ALL', 'BRANDING', 'DIGITAL', 'MOTION', 'ART DIRECTION'];

export function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.categoryFilter === activeCategory || p.services.some(s => s.toUpperCase().includes(activeCategory)));

  return (
    <div className="aar-work-page">
      <Navbar />

      {/* Hero: Editorial Introduction */}
      <section className="work-hero">
        <div className="work-hero__container">
          
          <div className="work-hero__eyebrow">
            <span className="work-hero__eyebrow-dash" />
            <span className="work-hero__eyebrow-text">CREATIVE ARCHIVE / 2024 — 2026</span>
          </div>

          <div className="work-hero__headline-row">
            <h1 className="work-hero__title">
              SELECTED<br />
              <span className="work-hero__title--italic">WORK</span>
              <span className="work-hero__title-dot">.</span>
            </h1>

            <div className="work-hero__statement-col">
              <p className="work-hero__statement">
                A curated body of identity systems, digital platforms, and sensorial motion pieces crafted for visionaries worldwide.
              </p>
              <div className="work-hero__stats">
                <div className="work-stat">
                  <span className="work-stat__num">{PROJECTS.length.toString().padStart(2, '0')}</span>
                  <span className="work-stat__label">ARCHIVED CASES</span>
                </div>
                <div className="work-stat">
                  <span className="work-stat__num">100%</span>
                  <span className="work-stat__label">BESPOKE SYSTEMS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Navigation */}
          <div className="work-filter-bar">
            <span className="work-filter-bar__label">FILTER BY DISCIPLINE:</span>
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
      </section>

      {/* Featured Projects: Asymmetric Editorial Gallery */}
      <section className="work-archive-section">
        <div className="work-archive-container">

          {filteredProjects.map((project, index) => {
            // Distinct editorial compositions based on index
            const compType = index % 5;

            // Composition 0: Horizontal wide visual with vertical typography lockup
            if (compType === 0) {
              return (
                <article key={project.id} className="work-comp work-comp--horizontal">
                  <Link to={`/work/${project.id}`} className="work-comp__link">
                    <div className="work-comp__media-wrap">
                      <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                      <div className="work-comp__tag-badge">{project.category}</div>
                    </div>

                    <div className="work-comp__meta-side">
                      <div className="work-comp__index">PROJ / {project.number}</div>
                      <h2 className="work-comp__title">{project.title}</h2>
                      <p className="work-comp__excerpt">{project.excerpt}</p>
                      
                      <div className="work-comp__services-list">
                        {project.services.map((s, i) => (
                          <span key={i} className="work-comp__service-tag">{s}</span>
                        ))}
                      </div>

                      <div className="work-comp__cta">
                        <span>EXPLORE CASE</span>
                        <span className="work-comp__cta-arrow">→</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            }

            // Composition 1: Split composition with overlapping title
            if (compType === 1) {
              return (
                <article key={project.id} className="work-comp work-comp--split">
                  <Link to={`/work/${project.id}`} className="work-comp__link">
                    <div className="work-comp__split-left">
                      <div className="work-comp__index">PROJ / {project.number} • {project.year}</div>
                      <h2 className="work-comp__title work-comp__title--overlap">{project.title}</h2>
                      <div className="work-comp__client-tag">{project.client}</div>
                      <p className="work-comp__excerpt">{project.excerpt}</p>
                      
                      <div className="work-comp__cta">
                        <span>VIEW ARCHIVE</span>
                        <span className="work-comp__cta-arrow">→</span>
                      </div>
                    </div>

                    <div className="work-comp__split-right">
                      <div className="work-comp__media-wrap work-comp__media-wrap--tall">
                        <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                      </div>
                    </div>
                  </Link>
                </article>
              );
            }

            // Composition 2: Editorial stacked composition with lateral metadata
            if (compType === 2) {
              return (
                <article key={project.id} className="work-comp work-comp--stacked">
                  <Link to={`/work/${project.id}`} className="work-comp__link">
                    <div className="work-comp__top-bar">
                      <span className="work-comp__index">PROJ / {project.number}</span>
                      <h2 className="work-comp__title">{project.title}</h2>
                      <span className="work-comp__year">{project.year}</span>
                    </div>

                    <div className="work-comp__media-wrap work-comp__media-wrap--wide">
                      <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                    </div>

                    <div className="work-comp__bottom-meta">
                      <span className="work-comp__category-text">{project.category}</span>
                      <p className="work-comp__excerpt">{project.excerpt}</p>
                      <div className="work-comp__cta">
                        <span>READ BRIEF</span>
                        <span className="work-comp__cta-arrow">→</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            }

            // Composition 3: Full-width cinematic takeover visual
            if (compType === 3) {
              return (
                <article key={project.id} className="work-comp work-comp--takeover">
                  <Link to={`/work/${project.id}`} className="work-comp__link">
                    <div className="work-comp__takeover-media">
                      <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                      <div className="work-comp__takeover-overlay" />
                    </div>

                    <div className="work-comp__takeover-content">
                      <div className="work-comp__index">PROJ / {project.number} • {project.year}</div>
                      <h2 className="work-comp__takeover-title">{project.title}</h2>
                      <p className="work-comp__takeover-subtitle">{project.subtitle}</p>
                      <div className="work-comp__cta work-comp__cta--light">
                        <span>EXPLORE CASE STUDY</span>
                        <span className="work-comp__cta-arrow">→</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            }

            // Composition 4: Minimal archival grid layout
            return (
              <article key={project.id} className="work-comp work-comp--minimal">
                <Link to={`/work/${project.id}`} className="work-comp__link">
                  <div className="work-comp__min-col work-comp__min-col--meta">
                    <div className="work-comp__index">PROJ / {project.number}</div>
                    <h2 className="work-comp__title">{project.title}</h2>
                    <span className="work-comp__sub">{project.subtitle}</span>
                    <div className="work-comp__client-tag">{project.client}</div>
                    <div className="work-comp__cta">
                      <span>OPEN ARCHIVE</span>
                      <span className="work-comp__cta-arrow">→</span>
                    </div>
                  </div>

                  <div className="work-comp__min-col work-comp__min-col--media">
                    <div className="work-comp__media-wrap">
                      <img src={project.heroImage} alt={project.title} className="work-comp__img" loading="lazy" />
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}

        </div>
      </section>

      {/* Inquiry Callout Banner */}
      <section className="work-inquiry-banner">
        <div className="work-inquiry-banner__wrap">
          <div className="work-inquiry-banner__left">
            <span className="work-inquiry-banner__eyebrow">HAVE A SPECIFIC COMMISSION IN MIND?</span>
            <h3 className="work-inquiry-banner__title">WE ACCEPT A SELECT NUMBER OF PROJECTS EACH QUARTER.</h3>
          </div>
          <Link to="/contact" className="work-inquiry-banner__btn">
            <span>GET IN TOUCH</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
}

export default WorkPage;
