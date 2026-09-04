import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DraggableCardContainer, DraggableCardBody } from '../ui/draggable-card';
import { ViewportVideo } from '../common/ViewportVideo';
import './ProjectShowcase.css';

// Rotations for stacked physical print look
const CARD_ROTATIONS = [-3.5, 2.5, -2, 3, -1.5, 2, -3];

export function ProjectShowcase({ projects = [], onSelectProject }) {
  const [cycleIndex, setCycleIndex] = useState(0);

  // Reset to first project whenever active filter changes
  useEffect(() => {
    setCycleIndex(0);
  }, [projects]);

  if (!projects || projects.length === 0) {
    return (
      <div className="project-showcase-empty">
        <p>No projects found in this discipline.</p>
      </div>
    );
  }

  // Active project data (always cyclic over the currently filtered projects)
  const total = projects.length;
  const activeIndex = cycleIndex % total;
  const activeProject = projects[activeIndex];
  const activeProjectNumber = String(activeIndex + 1).padStart(2, '0');
  const totalNumber = String(total).padStart(2, '0');

  // Advance stack on swipe (infinite cyclic loop)
  const handleSwipe = (direction) => {
    setCycleIndex((prev) => prev + 1);
  };

  // Up to 3 visible cards in the physical stack
  const visibleCount = Math.min(3, total);
  const visibleCards = [];
  for (let i = 0; i < visibleCount; i++) {
    const projIndex = (cycleIndex + i) % total;
    visibleCards.push({
      project: projects[projIndex],
      stackOffset: i,
      projIndex,
      // Fresh key on every single swipe so swiped cards never retain off-screen drag positions
      stepKey: `${projects[projIndex].id}-cycle-${cycleIndex + i}`,
    });
  }

  // Directional motion variants:
  // Whatever is on the LEFT enters from left and exits left.
  // Whatever is on the RIGHT enters from right and exits right.
  const leftColVariants = {
    initial: { opacity: 0, x: -45 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -45,
      transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const rightColVariants = {
    initial: { opacity: 0, x: 45 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: 45,
      transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mobileVariants = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // ── BLOCK 1: DOMINANT PROJECT NAME ──
  const renderNameBlock = (alignment = 'left') => (
    <div className={`project-name-block project-name-block--${alignment}`}>
      <div className="project-name-meta">
        <span className="project-meta-dash" />
        <span className="project-meta-index">
          {activeProjectNumber} / {totalNumber}
        </span>
        <span className="project-meta-bullet">•</span>
        <span className="project-meta-year">{activeProject.year}</span>
      </div>

      <h3 className="project-dominant-title">
        {activeProject.title}
      </h3>

      <div className="project-name-subtitle">
        {activeProject.subtitle || activeProject.category}
      </div>
    </div>
  );

  // ── BLOCK 2: SUPPORTING PROJECT DETAILS ──
  const renderDetailsBlock = (alignment = 'right') => (
    <div className={`project-details-block project-details-block--${alignment}`}>
      <div className="project-details-meta">
        <span className="project-meta-dash" />
        <span className="project-meta-year">{activeProject.year}</span>
        <span className="project-meta-bullet">·</span>
        <span className="project-meta-index">
          {activeProjectNumber} / {totalNumber}
        </span>
      </div>

      <div className="project-details-category">
        {activeProject.category || activeProject.categoryFilter}
      </div>

      <p className="project-details-desc">
        {activeProject.excerpt || activeProject.description}
      </p>

      {activeProject.services && (
        <div className="project-details-services">
          {activeProject.services.slice(0, 3).map((service, i) => (
            <span key={i} className="project-details-pill">
              {service}
            </span>
          ))}
        </div>
      )}

      <div className="project-details-cta-wrap">
        <button
          type="button"
          onClick={() => onSelectProject && onSelectProject(activeProject)}
          className="project-details-cta-btn"
          aria-label={`View Case Study for ${activeProject.title}`}
        >
          <span>VIEW PROJECT</span>
          <span className="project-details-cta-arrow">→</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="project-showcase">
      {/* ── DESKTOP 3-COLUMN EDITORIAL COMPOSITION (min-width: 1024px) ── */}
      <div className="project-showcase-desktop">

        {/* ── LEFT COLUMN (PROJECT NAME ALWAYS) ── */}
        <div className="project-showcase-col project-showcase-col--left">
          <AnimatePresence mode="wait">
            <motion.div
              key={`name-left-${activeProject.id}-${cycleIndex}`}
              variants={leftColVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="project-showcase-col-inner"
            >
              {renderNameBlock('left')}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CENTER COLUMN (Centered Draggable Card Stack) ── */}
        <div className="project-showcase-col project-showcase-col--center">
          <DraggableCardContainer className="project-stack-container">
            {visibleCards
              .slice()
              .reverse()
              .map(({ project, stackOffset, projIndex, stepKey }) => {
                const isTop = stackOffset === 0;
                const rotation = CARD_ROTATIONS[(cycleIndex + stackOffset) % CARD_ROTATIONS.length];
                const translateY = stackOffset * 10;
                const scale = 1 - stackOffset * 0.045;
                const zIndex = 20 - stackOffset;

                return (
                  <div
                    key={stepKey}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, calc(-50% + ${translateY}px)) rotate(${rotation}deg) scale(${scale})`,
                      zIndex,
                      transition: isTop
                        ? 'none'
                        : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className="project-stack-card-wrapper"
                  >
                    <DraggableCardBody
                      isTopCard={isTop}
                      onSwipe={handleSwipe}
                      onClick={() => {
                        if (onSelectProject) {
                          onSelectProject(activeProject);
                        }
                      }}
                      className="project-stack-card"
                    >
                      {/* Clean Image / Video Viewport */}
                      <div className="project-stack-media">
                        {project.video ? (
                          <ViewportVideo
                            src={project.video}
                            loop
                            muted
                            playsInline
                            isTop={isTop}
                            draggable="false"
                            className="project-stack-img project-stack-video"
                          />
                        ) : (
                          <img
                            src={project.heroImage || project.thumbImage}
                            alt={project.title}
                            loading={isTop ? 'eager' : 'lazy'}
                            draggable="false"
                            className="project-stack-img"
                          />
                        )}
                        <div className="project-stack-overlay" />
                      </div>

                      {/* Small Bottom Accent Badge inside frame */}
                      <div className="project-stack-card-bottom">
                        <span className="project-stack-card-num">
                          {String((projIndex % total) + 1).padStart(2, '0')}
                        </span>
                        <span className="project-stack-card-hint">
                          {isTop ? 'DRAG / TAP TO EXPAND ↗' : ''}
                        </span>
                      </div>
                    </DraggableCardBody>
                  </div>
                );
              })}
          </DraggableCardContainer>

          {/* Stack Drag Hint Indicator */}
          <div className="project-stack-hint">
            <span className="project-stack-hint-dot" />
            <span className="project-stack-hint-text">
              DRAG OR FLICK CARD TO ADVANCE STACK
            </span>
          </div>
        </div>

        {/* ── RIGHT COLUMN (PROJECT DETAILS ALWAYS) ── */}
        <div className="project-showcase-col project-showcase-col--right">
          <AnimatePresence mode="wait">
            <motion.div
              key={`details-right-${activeProject.id}-${cycleIndex}`}
              variants={rightColVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="project-showcase-col-inner"
            >
              {renderDetailsBlock('left')}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ── MOBILE / TABLET VERTICAL STACK (< 1024px) ── */}
      {/* Strict Mobile Order: NAME -> CARDS -> DETAILS */}
      <div className="project-showcase-mobile">
        {/* Top: Project Number/Year & Project Name */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-name-${activeProject.id}-${cycleIndex}`}
            variants={mobileVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="project-showcase-mobile-top"
          >
            {renderNameBlock('center')}
          </motion.div>
        </AnimatePresence>

        {/* Center: Draggable Cards */}
        <div className="project-showcase-mobile-center">
          <DraggableCardContainer className="project-stack-container">
            {visibleCards
              .slice()
              .reverse()
              .map(({ project, stackOffset, projIndex, stepKey }) => {
                const isTop = stackOffset === 0;
                const rotation = CARD_ROTATIONS[(cycleIndex + stackOffset) % CARD_ROTATIONS.length];
                const translateY = stackOffset * 8;
                const scale = 1 - stackOffset * 0.045;
                const zIndex = 20 - stackOffset;

                return (
                  <div
                    key={`mobile-${stepKey}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, calc(-50% + ${translateY}px)) rotate(${rotation}deg) scale(${scale})`,
                      zIndex,
                    }}
                    className="project-stack-card-wrapper"
                  >
                    <DraggableCardBody
                      isTopCard={isTop}
                      onSwipe={handleSwipe}
                      onClick={() => {
                        if (onSelectProject) {
                          onSelectProject(activeProject);
                        }
                      }}
                      className="project-stack-card"
                    >
                      <div className="project-stack-media">
                        {project.video ? (
                          <ViewportVideo
                            src={project.video}
                            loop
                            muted
                            playsInline
                            isTop={isTop}
                            draggable="false"
                            className="project-stack-img project-stack-video"
                          />
                        ) : (
                          <img
                            src={project.heroImage || project.thumbImage}
                            alt={project.title}
                            loading={isTop ? 'eager' : 'lazy'}
                            draggable="false"
                            className="project-stack-img"
                          />
                        )}
                        <div className="project-stack-overlay" />
                      </div>
                      <div className="project-stack-card-bottom">
                        <span className="project-stack-card-num">
                          {String((projIndex % total) + 1).padStart(2, '0')}
                        </span>
                        <span className="project-stack-card-hint">
                          {isTop ? 'TAP TO EXPAND ↗' : ''}
                        </span>
                      </div>
                    </DraggableCardBody>
                  </div>
                );
              })}
          </DraggableCardContainer>
        </div>

        {/* Bottom: Project Details & View Project */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-details-${activeProject.id}-${cycleIndex}`}
            variants={mobileVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="project-showcase-mobile-bottom"
          >
            {renderDetailsBlock('center')}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProjectShowcase;
