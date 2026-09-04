import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Palette,
  Cpu,
  Layers,
  Sparkles,
  Camera,
  Eye,
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";
import "./TeamSection.css";

const TEAM_MEMBERS = [
  {
    id: "anand",
    name: "Anand Chauhan",
    role: "Founder & Creative Director",
    chipRole: "Founder",
    icon: Compass,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    description:
      "Directs the studio's aesthetic conviction, orchestrating multidisciplinary brand universes across physical and digital space.",
    location: "New Delhi, India"
  },
  {
    id: "manthan",
    name: "Manthan Gupta",
    role: "Head of Marketing & Growth",
    chipRole: "Marketing Head",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Drives high-impact brand positioning, audience architecture, and bespoke marketing campaigns that command cultural attention.",
    location: "New Delhi, India"
  },
  {
    id: "harsh",
    name: "Harsh Gupta",
    role: "Full Stack Web Developer",
    chipRole: "Full Stack Developer",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
    description:
      "Architects fluid 60fps web experiences, custom interactive GLSL engines, and scalable modern web architectures.",
    location: "New Delhi, India"
  },
  {
    id: "dushyant",
    name: "Dushyant Gupta",
    role: "VFX, Motion & Video Editing",
    chipRole: "VFX & Motion Lead",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    description:
      "Crafts cinematic motion narratives, photorealistic visual effects, and high-energy post-production edits for modern brands.",
    location: "New Delhi, India"
  },
  {
    id: "aditya",
    name: "Aditya Mishra",
    role: "Creative Strategy & Operations",
    chipRole: "Creative Strategy",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop",
    description:
      "Aligns multidisciplinary creative execution with operational precision and long-term brand strategy.",
    location: "New Delhi, India"
  }
];

const AUTO_PLAY_INTERVAL = 3500;
const ITEM_HEIGHT = 68;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function TeamSection() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % TEAM_MEMBERS.length) + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = TEAM_MEMBERS.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section id="team" className="aar-team-section">
      {/* Ambient Flow Artwork Background */}
      <div className="team-bg-flow-layer" aria-hidden="true">
        <img
          src="https://res.cloudinary.com/hspt0e7x/image/upload/v1788497047/a8b3e134-3bfb-4e28-b9c9-83980c641fed-Picsart-AiImageEnhancer_j6fbqw.png"
          alt=""
          className="team-bg-flow-img"
        />
      </div>

      <div className="team-section-container">
        {/* ── 01. SECTION EDITORIAL HEADER ── */}
        <div className="team-header">
          <div className="team-header__eyebrow">
            <span className="team-header__eyebrow-dash" />
            <span className="team-header__eyebrow-text">
              CHAPTER 05 / THE ATELIER & LEADERSHIP
            </span>
          </div>

          <div className="team-header__main-row">
            <div className="team-lockup-container">
              {/* Row 1: THE + Minds */}
              <div className="team-lockup-row1">
                <span className="team-lockup-the">THE</span>
                <span className="team-lockup-script">Minds</span>
              </div>

              {/* Row 2: BEHIND THE + VISION (framed in vector box) */}
              <div className="team-lockup-row2">
                <span className="team-lockup-behind">BEHIND THE</span>
                <div className="team-lockup-vision-box">
                  <span className="team-lockup-vision-gold">VISION</span>
                  
                  {/* Exact Vector Pen Tool & Bézier Handles Graphic */}
                  <svg className="team-vector-overlay-precision" viewBox="0 0 240 160" fill="none" aria-hidden="true">
                    {/* Construction guidelines */}
                    <line x1="32" y1="12" x2="32" y2="155" stroke="#c9962c" strokeWidth="1.2" opacity="0.75" />
                    <line x1="18" y1="34" x2="235" y2="34" stroke="#c9962c" strokeWidth="1.2" opacity="0.75" />
                    <line x1="230" y1="34" x2="230" y2="148" stroke="#c9962c" strokeWidth="1.2" opacity="0.75" />
                    <line x1="32" y1="148" x2="230" y2="148" stroke="#c9962c" strokeWidth="1.2" opacity="0.75" />
                    
                    {/* Top-Left Corner Vertex Anchor Point */}
                    <rect x="28" y="30" width="8" height="8" fill="#ede8e1" stroke="#c9962c" strokeWidth="1.4" />
                    
                    {/* Bézier curve arcs originating at vertex (32, 34) */}
                    <path d="M 32 34 C 22 14, 8 10, 2 22" stroke="#c9962c" strokeWidth="1.3" fill="none" />
                    <path d="M 32 34 C 20 56, 10 74, 4 58" stroke="#c9962c" strokeWidth="1.3" fill="none" />
                    
                    {/* Tangent Handles & Control Nodes */}
                    <line x1="2" y1="22" x2="-2" y2="26" stroke="#c9962c" strokeWidth="1" />
                    <circle cx="-2" cy="26" r="2.2" fill="#c9962c" />
                    <rect x="-1" y="19" width="6" height="6" fill="#ede8e1" stroke="#c9962c" strokeWidth="1.2" />

                    <line x1="4" y1="58" x2="0" y2="54" stroke="#c9962c" strokeWidth="1" />
                    <circle cx="0" cy="54" r="2.2" fill="#c9962c" />
                    <rect x="1" y="55" width="6" height="6" fill="#ede8e1" stroke="#c9962c" strokeWidth="1.2" />

                    {/* Classic Illustrator Pen Nib pointing directly at vertex (32, 34) */}
                    <g transform="translate(32, 34) rotate(45)">
                      <path d="M 0 0 L -8 -18 L -5 -26 L -12 -38 L 12 -38 L 5 -26 L 8 -18 Z" fill="#c9962c" />
                      <circle cx="0" cy="-16" r="2" fill="#ede8e1" />
                      <line x1="0" y1="0" x2="0" y2="-16" stroke="#ede8e1" strokeWidth="1.2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div className="team-header__desc-col">
              <p className="team-header__desc">
                A monastic collective of obsessive designers, creative technologists, and visual sculptors operating at the intersection of taste and computational rigor.
              </p>
              <div className="team-header__meta-box">
                <span className="team-meta-label">ATELIER ROSTER</span>
                <span className="team-meta-val">05 CORE DISCIPLINARY LEADS • ATELIER ROSTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 02. INTERACTIVE FEATURE CAROUSEL ── */}
        <div className="team-carousel-wrapper">
          <div className="team-carousel-card">
            {/* Left Column: Rolling Navigation Rail */}
            <div className="team-rail-left">
              <div className="team-rail-badge">
                <span className="team-rail-dot" />
                <span>DIRECTORS & LEADS</span>
              </div>
              <div className="team-rail-gradient-top" />
              <div className="team-rail-gradient-bottom" />

              <div className="team-rail-track-area">
                {TEAM_MEMBERS.map((member, index) => {
                  const isActive = index === currentIndex;
                  const distance = index - currentIndex;
                  const wrappedDistance = wrap(
                    -(TEAM_MEMBERS.length / 2),
                    TEAM_MEMBERS.length / 2,
                    distance
                  );
                  const Icon = member.icon;

                  return (
                    <motion.div
                      key={member.id}
                      style={{
                        height: ITEM_HEIGHT,
                        width: "fit-content",
                      }}
                      animate={{
                        y: wrappedDistance * ITEM_HEIGHT,
                        opacity: 1 - Math.abs(wrappedDistance) * 0.28,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 22,
                        mass: 1,
                      }}
                      className="absolute flex items-center justify-start"
                    >
                      <button
                        onClick={() => handleChipClick(index)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className={cn(
                          "team-chip-btn",
                          isActive
                            ? "team-chip-btn--active"
                            : "team-chip-btn--inactive"
                        )}
                      >
                        <div className="team-chip-icon-box">
                          <Icon size={16} strokeWidth={2} />
                        </div>

                        <div className="flex flex-col text-left">
                          <span className="team-chip-name">
                            {member.name}
                          </span>
                          <span className="team-chip-role-tag">
                            {member.chipRole || member.role}
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: 3D Stacked Card Deck */}
            <div className="team-deck-right">
              <div className="team-deck-ambient-glow" aria-hidden="true" />

              <div className="team-card-frame-stage">
                {TEAM_MEMBERS.map((member, index) => {
                  const status = getCardStatus(index);
                  const isActive = status === "active";
                  const isPrev = status === "prev";
                  const isNext = status === "next";

                  return (
                    <motion.div
                      key={member.id}
                      initial={false}
                      animate={{
                        x: isActive ? 0 : isPrev ? -95 : isNext ? 95 : 0,
                        scale: isActive ? 1 : isPrev || isNext ? 0.86 : 0.72,
                        opacity: isActive ? 1 : isPrev || isNext ? 0.42 : 0,
                        rotate: isPrev ? -3.5 : isNext ? 3.5 : 0,
                        zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 25,
                        mass: 0.8,
                      }}
                      className={cn(
                        "team-member-3d-card",
                        isActive
                          ? "team-member-3d-card--active"
                          : "team-member-3d-card--ambient"
                      )}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className={cn(
                          "team-member-img",
                          isActive
                            ? "grayscale-0 brightness-100 scale-100"
                            : "grayscale brightness-60 scale-105"
                        )}
                        loading="lazy"
                      />

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="team-member-overlay-content"
                          >
                            <div className="team-member-badge">
                              {index + 1} • {member.role}
                            </div>
                            <h3 className="team-member-name">
                              {member.name}
                            </h3>
                            <p className="team-member-bio">
                              {member.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div
                        className={cn(
                          "team-live-marker",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      >
                        <div className="team-live-dot" />
                        <span className="team-live-text">
                          {member.location}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Deck Footer with Live Index & Controls */}
              <div className="team-deck-footer">
                <div className="team-deck-counter">
                  <span className="team-deck-counter-curr">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="team-deck-counter-sep">/</span>
                  <span className="team-deck-counter-total">
                    {String(TEAM_MEMBERS.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="team-deck-controls">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="team-deck-btn"
                    aria-label="Previous member"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="team-deck-btn"
                    aria-label="Next member"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
