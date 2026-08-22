import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/**
 * AAR Visuals — VISION → VISIBILITY Kinetic Studio Loader
 *
 * Full responsive editorial layout across mobile & desktop:
 * - "VISION ────────────>" visible on all screen sizes at ~25vh
 * - "WE CREATE \n VISUALS THAT \n CONNECT." visible on all screen sizes at ~75vh
 * - Scaled Ahsing kinetic wordmark & ghost watermarks
 */
export const AARLoader = ({
  onComplete,
  autoDismiss = false,
  autoDismissDelay = 1.2,
  showControls = true,
  fontFamily = 'Ahsing',
  fontWeight = 'normal',
  letterSpacing = '0.02em',
  className = ''
}) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  // Hidden measurement refs for exact font glyph width calculation
  const measureORef = useRef(null);
  const measureBRef = useRef(null);
  const measureNRef = useRef(null);
  const measureIRef = useRef(null);
  const measureLRef = useRef(null);
  const measureTRef = useRef(null);
  const measureYRef = useRef(null);

  const slot5Ref = useRef(null);
  const slot6Ref = useRef(null);
  const slotLRef = useRef(null);
  const slotI4Ref = useRef(null);
  const slotTRef = useRef(null);
  const slotYRef = useRef(null);

  const playAnimation = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      // Measure natural rendered character widths in Ahsing
      const wO = measureORef.current?.offsetWidth || 110;
      const wB = measureBRef.current?.offsetWidth || 95;
      const wN = measureNRef.current?.offsetWidth || 88;
      const wI = measureIRef.current?.offsetWidth || 34;
      const wL = measureLRef.current?.offsetWidth || 80;
      const wT = measureTRef.current?.offsetWidth || 85;
      const wY = measureYRef.current?.offsetWidth || 88;

      const exitO = containerRef.current.querySelector('#exit-O');
      const exitN = containerRef.current.querySelector('#exit-N');
      const enterB = containerRef.current.querySelector('#enter-B');
      const enterI3 = containerRef.current.querySelector('#enter-I3');
      const enterL = containerRef.current.querySelector('#enter-L');
      const enterI4 = containerRef.current.querySelector('#enter-I4');
      const enterT = containerRef.current.querySelector('#enter-T');
      const enterY = containerRef.current.querySelector('#enter-Y');
      const caption = containerRef.current.querySelector('#caption');

      // ---- Initial States: Perfect "VISION" Layout ----
      gsap.set(slot5Ref.current, { width: wO });
      gsap.set(slot6Ref.current, { width: wN });
      gsap.set([slotLRef.current, slotI4Ref.current, slotTRef.current, slotYRef.current], { width: 0, opacity: 0 });

      gsap.set([exitO, exitN], { y: 0, opacity: 1 });
      gsap.set(enterB, { y: '130%', opacity: 0 });
      gsap.set(enterI3, { y: '-130%', opacity: 0 });
      gsap.set(enterL, { y: '130%', opacity: 0 });
      gsap.set(enterI4, { y: '-130%', opacity: 0 });
      gsap.set(enterT, { y: '130%', opacity: 0 });
      gsap.set(enterY, { y: '-130%', opacity: 0 });
      gsap.set(caption, { opacity: 0, y: 8 });

      const HOLD = 0.55; // Hold on "VISION"
      const tl = gsap.timeline({
        paused: false,
        onComplete: () => {
          setIsFinished(true);
          if (autoDismiss) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.7,
              delay: autoDismissDelay,
              ease: 'power2.inOut',
              onComplete: () => {
                if (onComplete) onComplete();
              }
            });
          } else if (onComplete) {
            onComplete();
          }
        }
      });

      timelineRef.current = tl;

      // 1. O lifts up & Slot 5 adjusts width from O to B
      tl.to(exitO, { y: '-130%', opacity: 0, duration: 0.8, ease: 'power3.in' }, HOLD);
      tl.to(slot5Ref.current, { width: wB, duration: 0.75, ease: 'power2.inOut' }, HOLD + 0.1);
      tl.to(enterB, { y: '0%', opacity: 1, duration: 0.9, ease: 'power2.out' }, HOLD + 0.18);

      // 2. N lifts up & Slot 6 adjusts width from N to I
      tl.to(exitN, { y: '-130%', opacity: 0, duration: 0.8, ease: 'power3.in' }, HOLD + 0.28);
      tl.to(slot6Ref.current, { width: wI, duration: 0.75, ease: 'power2.inOut' }, HOLD + 0.35);
      tl.to(enterI3, { y: '0%', opacity: 1, duration: 0.9, ease: 'power2.out' }, HOLD + 0.46);

      // 3. L expands into place seamlessly
      tl.to(slotLRef.current, { width: wL, opacity: 1, duration: 0.6, ease: 'power2.out' }, HOLD + 0.58);
      tl.to(enterL, { y: '0%', opacity: 1, duration: 0.95, ease: 'power2.out' }, HOLD + 0.62);

      // 4. I expands into place
      tl.to(slotI4Ref.current, { width: wI, opacity: 1, duration: 0.55, ease: 'power2.out' }, HOLD + 0.72);
      tl.to(enterI4, { y: '0%', opacity: 1, duration: 0.95, ease: 'power2.out' }, HOLD + 0.78);

      // 5. T expands into place
      tl.to(slotTRef.current, { width: wT, opacity: 1, duration: 0.6, ease: 'power2.out' }, HOLD + 0.88);
      tl.to(enterT, { y: '0%', opacity: 1, duration: 1.0, ease: 'power2.out' }, HOLD + 0.95);

      // 6. Y expands into place, resolving VISIBILITY
      tl.to(slotYRef.current, { width: wY, opacity: 1, duration: 0.6, ease: 'power2.out' }, HOLD + 1.02);
      tl.to(enterY, { y: '0%', opacity: 1, duration: 1.0, ease: 'power2.out' }, HOLD + 1.1);

      // 7. Caption settles in
      tl.to(caption, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, HOLD + 2.05);
    }, containerRef);

    return () => ctx.revert();
  }, [autoDismiss, autoDismissDelay, onComplete]);

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        playAnimation();
      });
    } else {
      playAnimation();
    }
  }, [playAnimation, fontFamily, fontWeight]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-screen h-screen select-none z-50 overflow-hidden text-white flex flex-col justify-between ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #18181b 0%, #0d0d10 45%, #050507 80%, #000000 100%)',
        paddingTop: 'clamp(28px, 4.5vh, 52px)',
        paddingBottom: 'clamp(28px, 4.5vh, 52px)',
        paddingLeft: 'clamp(24px, 4.5vw, 64px)',
        paddingRight: 'clamp(24px, 4.5vw, 64px)',
        fontFamily: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`,
        boxSizing: 'border-box'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. GHOST WATERMARK BACKGROUND LETTERS ("V" on left, "Y" on right)         */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Giant Ghost "V" */}
        <span
          className="absolute left-[2vw] sm:left-[4vw] top-[8vh] sm:top-[2vh] text-[60vw] sm:text-[54vw] leading-none opacity-[0.05] text-white font-normal"
          style={{ fontFamily: `'${fontFamily}', 'Ahsing', sans-serif` }}
        >
          V
        </span>
        {/* Giant Ghost "Y" */}
        <span
          className="absolute right-[2vw] sm:right-[4vw] bottom-[-2vh] sm:bottom-[-6vh] text-[60vw] sm:text-[54vw] leading-none opacity-[0.045] text-white font-normal"
          style={{ fontFamily: `'${fontFamily}', 'Ahsing', sans-serif` }}
        >
          Y
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP HEADER ROW                                                         */}
      {/* ========================================================================= */}
      <header className="relative z-10 w-full flex items-center justify-between flex-shrink-0 gap-4">
        {/* Top Left: Yellow Accent Bar + Brand Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-[3px] h-4 sm:h-5 md:h-6 bg-[#f5af19]" />
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.26em] uppercase text-white font-mono">
              AAR
            </span>
            <span className="text-[9.5px] sm:text-[10.5px] font-medium tracking-[0.2em] uppercase text-white/80 font-mono">
              VISUALS
            </span>
          </div>
        </div>

        {/* Top Right: Studio Subtitle */}
        <div className="flex items-center">
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.32em] uppercase text-white/60 text-right">
            CREATIVE VISUAL STUDIO
          </span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. MID-LEFT ANNOTATION: "VISION ────────────>" (Visible on all devices)   */}
      {/* ========================================================================= */}
      <div className="absolute left-[clamp(24px,4.5vw,64px)] top-[25vh] -translate-y-1/2 flex items-center gap-2.5 sm:gap-4 z-10">
        <span className="text-[9.5px] sm:text-[11px] md:text-[12px] font-mono tracking-[0.36em] sm:tracking-[0.44em] uppercase text-white/80">
          VISION
        </span>
        <div className="w-16 sm:w-28 md:w-40 lg:w-52 h-[1px] bg-white/25" />
        <span className="text-[#f5af19] text-[10px] sm:text-xs font-mono">→</span>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN CENTER STAGE                                                      */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto">
        {/* Hidden Offscreen Measurers for dynamic glyph width calculation */}
        <div
          className="absolute -top-[9999px] left-0 pointer-events-none opacity-0 flex uppercase"
          style={{
            fontSize: 'clamp(3.1rem, 10.5vw, 11rem)',
            fontFamily: `'${fontFamily}', 'Ahsing', sans-serif`,
            fontWeight: fontWeight,
            letterSpacing: letterSpacing
          }}
        >
          <span ref={measureORef}>O</span>
          <span ref={measureBRef}>B</span>
          <span ref={measureNRef}>N</span>
          <span ref={measureIRef}>I</span>
          <span ref={measureLRef}>L</span>
          <span ref={measureTRef}>T</span>
          <span ref={measureYRef}>Y</span>
        </div>

        {/* Bold Responsive Kinetic Wordmark */}
        <div className="w-full max-w-[1440px] px-1 flex items-center justify-center overflow-hidden py-1">
          <div
            className="flex items-center tracking-tight leading-none uppercase select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(3.1rem, 10.5vw, 11rem)',
              fontFamily: `'${fontFamily}', 'Ahsing', sans-serif`,
              fontWeight: fontWeight,
              letterSpacing: letterSpacing,
              color: '#ffffff',
              textShadow: '0 4px 28px rgba(0,0,0,0.95)'
            }}
          >
            {/* V */}
            <span className="inline-block">V</span>
            {/* I */}
            <span className="inline-block">I</span>
            {/* S */}
            <span className="inline-block">S</span>
            {/* I */}
            <span className="inline-block">I</span>

            {/* SLOT 5: O -> B */}
            <span
              ref={slot5Ref}
              className="relative inline-flex items-center justify-center overflow-hidden h-[1.15em] transition-[width]"
            >
              <span id="exit-O" className="inline-block">O</span>
              <span id="enter-B" className="absolute inset-0 flex items-center justify-center">B</span>
            </span>

            {/* SLOT 6: N -> I */}
            <span
              ref={slot6Ref}
              className="relative inline-flex items-center justify-center overflow-hidden h-[1.15em] transition-[width]"
            >
              <span id="exit-N" className="inline-block">N</span>
              <span id="enter-I3" className="absolute inset-0 flex items-center justify-center">I</span>
            </span>

            {/* SLOTS 7 - 10: L, I, T, Y */}
            <span
              ref={slotLRef}
              className="relative inline-flex items-center justify-center overflow-hidden h-[1.15em]"
            >
              <span id="enter-L" className="inline-block">L</span>
            </span>

            <span
              ref={slotI4Ref}
              className="relative inline-flex items-center justify-center overflow-hidden h-[1.15em]"
            >
              <span id="enter-I4" className="inline-block">I</span>
            </span>

            <span
              ref={slotTRef}
              className="relative inline-flex items-center justify-center overflow-hidden h-[1.15em]"
            >
              <span id="enter-T" className="inline-block">T</span>
            </span>

            <span
              ref={slotYRef}
              className="relative inline-flex items-center justify-center overflow-hidden h-[1.15em]"
            >
              <span id="enter-Y" className="inline-block">Y</span>
            </span>
          </div>
        </div>

        {/* Center Caption & Subtitle */}
        <div id="caption" className="mt-5 sm:mt-8 md:mt-10 text-center opacity-0 px-2">
          <div
            className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.34em] sm:tracking-[0.44em] text-white"
            style={{ fontFamily: `'Plus Jakarta Sans', sans-serif` }}
          >
            AAR VISUALS
          </div>
          <div
            className="mt-1.5 sm:mt-2 text-[9.5px] sm:text-[10px] md:text-[11px] font-normal uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white/50"
            style={{ fontFamily: `'Plus Jakarta Sans', sans-serif` }}
          >
            A VISION BECOMES VISIBLE
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 5. EDITORIAL STATEMENT AT ~75vh ON THE RIGHT                              */}
      {/* ========================================================================= */}
      <div className="absolute right-[clamp(24px,4.5vw,64px)] top-[75vh] -translate-y-1/2 flex flex-col items-end leading-tight sm:leading-relaxed text-right z-10">
        <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.24em] uppercase text-white/70">
          WE CREATE
        </span>
        <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.24em] uppercase text-white/70">
          VISUALS THAT
        </span>
        <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.24em] uppercase text-white/70">
          CONNECT.
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 6. FOOTER ROW                                                             */}
      {/* ========================================================================= */}
      <footer className="relative z-10 w-full flex items-end justify-between flex-shrink-0">
        {/* Bottom Left: Coordinates & Location */}
        <div className="flex items-center sm:items-end gap-2 sm:gap-2.5">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.18em] sm:tracking-[0.2em] text-white/40 hidden sm:inline-block rotate-180 [writing-mode:vertical-rl]">
            28.6139° N
          </span>
          <span className="text-[9.5px] sm:text-[10.5px] md:text-[11px] font-mono tracking-[0.18em] sm:tracking-[0.24em] uppercase text-white/65">
            NEW DELHI, INDIA
          </span>
        </div>
      </footer>
    </div>
  );
};

export default AARLoader;
