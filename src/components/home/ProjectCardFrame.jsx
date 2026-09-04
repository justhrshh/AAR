import React, { useRef, useCallback, useState } from 'react';
import { ViewportVideo } from '../common/ViewportVideo';

/**
 * ProjectCardFrame
 * 
 * - WHOLE CARD moves magnetically on cursor (±16px X, ±14px Y)
 * - Above card: Clean CATEGORY / NUMBER tagline
 * - Inside card: Supports ViewportVideo or high-res Image with graceful fallback
 * - Inside card: Project Name and Arrow (↗) appear on hover
 * - 100% Sharp (Zero blur filters, crisp typography, clean gradient scrim)
 */
export function ProjectCardFrame({ project = {}, index = 0, className = '' }) {
  const cardRef = useRef(null);
  const wireframeRef = useRef(null);
  const isTouchRef = useRef(false);
  const [imgError, setImgError] = useState(false);

  // Magnetic cursor effect on the WHOLE CARD
  const handleMouseMove = useCallback((e) => {
    if (isTouchRef.current) return;
    if (!cardRef.current) return;

    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const yRel = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    const moveX = xRel * 16;
    const moveY = yRel * 14;

    cardRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    if (wireframeRef.current) {
      wireframeRef.current.style.transform = `translate3d(${moveX * 0.55}px, ${moveY * 0.55}px, 0)`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';
    }
    if (wireframeRef.current) {
      wireframeRef.current.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      cardRef.current.style.transform = 'translate3d(0px, 0px, 0)';
    }
    if (wireframeRef.current) {
      wireframeRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      wireframeRef.current.style.transform = 'translate3d(0px, 0px, 0)';
    }
  }, []);

  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
  }, []);

  const name = project.title || project.name || 'Project';
  const category = project.category || 'PROJECT';
  const number = project.number || (index + 1).toString().padStart(2, '0');
  const video = project.video || project.heroVideo;
  const image = project.heroImage || project.thumbImage || project.image || project.src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';
  const alt = project.alt || name;
  const link = project.link || `/work/${project.id || ''}`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      className={`relative w-full h-full group ${className}`}
    >
      {/* ── 01. Heading Tagline Above Card (Category / Number Only) ── */}
      <div
        data-parallax-fade
        className="absolute -top-4 sm:-top-6 left-0 flex items-center gap-1 sm:gap-1.5 pointer-events-none z-10 will-change-transform select-none whitespace-nowrap"
      >
        <span className="w-2 sm:w-3.5 h-[1.5px] sm:h-[2px] bg-[#c9962c]" />
        <span className="text-[7.5px] sm:text-[9.5px] md:text-[11px] font-bold tracking-widest text-[#0d0d0d] uppercase">
          {category}
        </span>
        <span className="text-[7px] sm:text-[8.5px] md:text-[10px] font-semibold tracking-wider text-[#0d0d0d]/40">
          / {number}
        </span>
      </div>

      {/* ── 02. Offset Architectural Outline Frame (Tactile Layering) ── */}
      <div
        ref={wireframeRef}
        data-parallax-fade
        className="absolute inset-0 translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3 rounded-xl sm:rounded-2xl border-[1px] sm:border-[1.5px] border-[#0d0d0d]/30 pointer-events-none -z-10 transition-colors duration-500 ease-out group-hover:border-[#c9962c]/60"
        style={{ willChange: 'transform' }}
      />

      {/* ── 03. WHOLE CARD MOVES MAGNETICALLY (Pure Tactile Artwork Frame) ── */}
      <div
        ref={cardRef}
        aria-label={`${name} — ${category} / ${number}`}
        className="project-frame block relative w-full h-full rounded-xl sm:rounded-2xl bg-[#faf7f2] p-1 sm:p-1.5 md:p-2 border border-[#0d0d0d]/15 transition-all duration-500 ease-out group-hover:border-[#0d0d0d]/35 group-hover:shadow-[0_35px_70px_-15px_rgba(13,13,13,0.48)] cursor-default select-none"
        style={{
          boxShadow: '0 24px 50px -12px rgba(13, 13, 13, 0.35), 0 8px 20px -6px rgba(13, 13, 13, 0.18)',
          willChange: 'transform'
        }}
      >
        {/* ── 04. Inner Artwork Viewport (Video or Image) ── */}
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#141416] border border-[#0d0d0d]/10">
          {video ? (
            <ViewportVideo
              src={video}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] select-none pointer-events-none"
            />
          ) : (
            <img
              src={imgError ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop' : image}
              alt={alt}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] select-none"
            />
          )}

          {/* Delicate micro-inner border overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-xl border border-white/10 z-10" />
        </div>
      </div>
    </div>
  );
}

export default ProjectCardFrame;
