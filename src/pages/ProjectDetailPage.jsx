import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/common/Footer';
import { getProjectById, getNextProject } from '../data/projects';
import './ProjectDetailPage.css';

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);
  const nextProject = getNextProject(id);

  useEffect(() => {
    if (!project) {
      navigate('/work', { replace: true });
    }
  }, [project, navigate]);

  if (!project) return null;

  return (
    <div className="aar-project-detail-page">
      <Navbar />

      {/* ── 01. OPENING / HERO ── */}
      <section className="proj-hero">
        <div className="proj-hero__container">
          
          <div className="proj-hero__top-nav">
            <Link to="/work" className="proj-hero__back-link">
              <span>←</span>
              <span>ALL CASE STUDIES</span>
            </Link>
            <span className="proj-hero__num">PROJ / {project.number}</span>
          </div>

          <h1 className="proj-hero__title">{project.title}</h1>
          <p className="proj-hero__subtitle">{project.subtitle}</p>

          {/* Metadata Grid */}
          <div className="proj-meta-grid">
            <div className="proj-meta-item">
              <span className="proj-meta-item__label">CLIENT</span>
              <span className="proj-meta-item__value">{project.client}</span>
            </div>
            <div className="proj-meta-item">
              <span className="proj-meta-item__label">DISCIPLINE</span>
              <span className="proj-meta-item__value">{project.category}</span>
            </div>
            <div className="proj-meta-item">
              <span className="proj-meta-item__label">TIMELINE</span>
              <span className="proj-meta-item__value">{project.year} • {project.duration}</span>
            </div>
            <div className="proj-meta-item">
              <span className="proj-meta-item__label">SERVICES</span>
              <div className="proj-meta-services">
                {project.services.map((s, i) => (
                  <span key={i} className="proj-service-pill">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Media Visual */}
          <div className="proj-hero__media">
            <img src={project.heroImage} alt={project.title} className="proj-hero__img" />
          </div>

        </div>
      </section>

      {/* ── 02. CONTEXT & CHALLENGE ── */}
      <section className="proj-context-section">
        <div className="proj-context-container">
          
          <div className="proj-section-header">
            <span className="proj-section-header__dash" />
            <span className="proj-section-header__title">01 / BRIEF & CHALLENGE</span>
          </div>

          <div className="proj-context-grid">
            <div className="proj-context-col">
              <h3 className="proj-context-heading">THE OVERVIEW</h3>
              <p className="proj-context-text">{project.context.overview}</p>
            </div>

            <div className="proj-context-col">
              <h3 className="proj-context-heading">THE CORE CHALLENGE</h3>
              <p className="proj-context-text">{project.context.challenge}</p>
            </div>

            <div className="proj-context-col proj-context-col--highlight">
              <h3 className="proj-context-heading">AAR CONTRIBUTION</h3>
              <p className="proj-context-text">{project.context.contribution}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 03. CREATIVE DIRECTION & PHILOSOPHY ── */}
      <section className="proj-direction-section">
        <div className="proj-direction-container">
          
          <div className="proj-section-header">
            <span className="proj-section-header__dash" />
            <span className="proj-section-header__title">02 / ART DIRECTION PHILOSOPHY</span>
          </div>

          <div className="proj-direction-statement">
            <h2 className="proj-direction-headline">{project.creativeDirection.headline}</h2>
            <p className="proj-direction-desc">{project.creativeDirection.philosophy}</p>
          </div>

          {/* Color Palette Swatches */}
          <div className="proj-palette-wrap">
            <span className="proj-palette-label">CALIBRATED PALETTE:</span>
            <div className="proj-palette-swatches">
              {project.creativeDirection.palette.map((color, idx) => (
                <div key={idx} className="proj-swatch-item">
                  <div className="proj-swatch-color" style={{ backgroundColor: color }} />
                  <span className="proj-swatch-hex">{color}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 04. MULTI-LAYOUT VISUAL GALLERY ── */}
      <section className="proj-gallery-section">
        <div className="proj-gallery-container">

          {project.gallery.map((item, idx) => {
            if (item.type === 'full-bleed') {
              return (
                <div key={idx} className="proj-gallery-item proj-gallery-item--full">
                  <div className="proj-gallery-full-media">
                    <img src={item.image} alt={project.title} className="proj-gallery-img" loading="lazy" />
                  </div>
                  {item.caption && <span className="proj-gallery-caption">{item.caption}</span>}
                </div>
              );
            }

            if (item.type === 'split-2') {
              return (
                <div key={idx} className="proj-gallery-item proj-gallery-item--split">
                  <div className="proj-gallery-split-col">
                    <div className="proj-gallery-split-media">
                      <img src={item.imageLeft} alt={project.title} className="proj-gallery-img" loading="lazy" />
                    </div>
                    {item.captionLeft && <span className="proj-gallery-caption">{item.captionLeft}</span>}
                  </div>

                  <div className="proj-gallery-split-col">
                    <div className="proj-gallery-split-media">
                      <img src={item.imageRight} alt={project.title} className="proj-gallery-img" loading="lazy" />
                    </div>
                    {item.captionRight && <span className="proj-gallery-caption">{item.captionRight}</span>}
                  </div>
                </div>
              );
            }

            if (item.type === 'quote-image') {
              return (
                <div key={idx} className="proj-gallery-item proj-gallery-item--quote">
                  <blockquote className="proj-gallery-quote">
                    <span className="proj-quote-mark">“</span>
                    {item.quote}
                  </blockquote>
                  <div className="proj-gallery-quote-media">
                    <img src={item.image} alt={project.title} className="proj-gallery-img" loading="lazy" />
                  </div>
                </div>
              );
            }

            return null;
          })}

        </div>
      </section>

      {/* ── 05. OUTCOME & DELIVERABLES ── */}
      <section className="proj-outcome-section">
        <div className="proj-outcome-container">
          
          <div className="proj-section-header">
            <span className="proj-section-header__dash" />
            <span className="proj-section-header__title">03 / OUTCOME & DELIVERABLES</span>
          </div>

          <div className="proj-outcome-grid">
            <div className="proj-outcome-left">
              <h2 className="proj-outcome-title">MEASURED IMPACT</h2>
              <p className="proj-outcome-summary">{project.outcome.summary}</p>
            </div>

            <div className="proj-outcome-right">
              <h3 className="proj-deliverables-title">DELIVERABLES INCLUDED</h3>
              <ul className="proj-deliverables-list">
                {project.outcome.deliverables.map((item, i) => (
                  <li key={i} className="proj-deliverable-item">
                    <span className="proj-deliverable-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── 06. NEXT PROJECT LINK ── */}
      <section className="proj-next-section">
        <div className="proj-next-container">
          <span className="proj-next-eyebrow">CONTINUE TO NEXT CASE STUDY</span>
          
          <Link to={`/work/${nextProject.id}`} className="proj-next-link">
            <div className="proj-next-content">
              <span className="proj-next-num">PROJ / {nextProject.number}</span>
              <h2 className="proj-next-title">{nextProject.title}</h2>
              <span className="proj-next-cat">{nextProject.category}</span>
            </div>
            <div className="proj-next-arrow-box">
              <span className="proj-next-arrow">→</span>
            </div>
          </Link>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
}

export default ProjectDetailPage;
