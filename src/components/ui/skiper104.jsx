import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Skiper104 — Scroll Reveal Grid Cards with GSAP Scroll Pinning
 * Pins the section in place until the 3-step animation completes.
 */
export function Skiper104({ items }) {
  const pinSectionRef = useRef(null);
  const lineFillRef = useRef(null);
  const cardRefs = useRef([]);
  const badgeRefs = useRef([]);
  const textRefs = useRef([]);

  cardRefs.current = [];
  badgeRefs.current = [];
  textRefs.current = [];

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };
  const addToBadgeRefs = (el) => {
    if (el && !badgeRefs.current.includes(el)) badgeRefs.current.push(el);
  };
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  const defaultItems = [
    {
      bgSrc: "https://i.pinimg.com/1200x/7f/f1/79/7ff1790a8ee1baa01f236eaf11ff7c56.jpg",
      title: "MAKE IT CLEAR.",
      lead: "COMPLEXITY IS SIMPLE. ABSOLUTE CLARITY IS THE ULTIMATE LUXURY.",
      desc: "We strip away decorative excess until only the purest essence remains. In a world saturated with digital noise, unmistakable clarity is the most potent differentiator.",
    },
    {
      bgSrc: "https://i.pinimg.com/1200x/ed/f0/26/edf026fc24297432a2502bf280db885b.jpg",
      title: "MAKE IT DISTINCT.",
      lead: "IF IT RESEMBLES EVERYTHING ELSE, IT FAILS TO EXIST.",
      desc: "We reject template-driven uniformity and generic algorithm aesthetics. Every identity system and digital architecture we build possesses a singular, recognizable soul.",
    },
    {
      bgSrc: "https://i.pinimg.com/1200x/d8/f1/fa/d8f1fa8bde3860818dc978b3ae692891.jpg",
      title: "MAKE IT MATTER.",
      lead: "DESIGN WITH PHYSICAL GRAVITY, PERMANENCE, AND ENDURING WEIGHT.",
      desc: "We build for longevity. Whether constructing a physical monograph or a 60fps WebGL interactive canvas, we ensure the work commands respect today and in decades to come.",
    },
  ];

  const data = items || defaultItems;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop pinning (> 1024px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Initially ensure all cards, badges, and text blocks are COMPLETELY OUT (0 opacity, offset)
        gsap.set(cardRefs.current, { y: -50, opacity: 0 });
        gsap.set(badgeRefs.current, { scale: 0, opacity: 0 });
        gsap.set(textRefs.current, { y: 50, opacity: 0 });
        if (lineFillRef.current) gsap.set(lineFillRef.current, { scaleX: 0 });

        // Master scroll-pinned timeline — shifted up so cards, line, badges, and text are comfortably inside viewport
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top 20%",
            end: "+=75%",
            pin: true,
            pinSpacing: true,
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });

        // 1. Progress timeline line scales from 0 to 1 across scroll
        if (lineFillRef.current) {
          tl.to(
            lineFillRef.current,
            { scaleX: 1, ease: "none" },
            0
          );
        }

        // 2. Step 1 (reveals immediately: 0.00 -> 0.12)
        if (cardRefs.current[0]) {
          tl.to(
            cardRefs.current[0],
            { y: 0, opacity: 1, ease: "power2.out", duration: 0.12 },
            0
          );
        }
        if (badgeRefs.current[0]) {
          tl.to(
            badgeRefs.current[0],
            { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 0.12 },
            0
          );
        }
        if (textRefs.current[0]) {
          tl.to(
            textRefs.current[0],
            { y: 0, opacity: 1, ease: "power2.out", duration: 0.12 },
            0
          );
        }

        // 3. Step 2 (starts early at 0.15, fully visible by 0.36)
        if (cardRefs.current[1]) {
          tl.to(
            cardRefs.current[1],
            { y: 0, opacity: 1, ease: "power2.out", duration: 0.21 },
            0.15
          );
        }
        if (badgeRefs.current[1]) {
          tl.to(
            badgeRefs.current[1],
            { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 0.18 },
            0.17
          );
        }
        if (textRefs.current[1]) {
          tl.to(
            textRefs.current[1],
            { y: 0, opacity: 1, ease: "power2.out", duration: 0.21 },
            0.17
          );
        }

        // 4. Step 3 (starts early at 0.45, fully visible by 0.68)
        if (cardRefs.current[2]) {
          tl.to(
            cardRefs.current[2],
            { y: 0, opacity: 1, ease: "power2.out", duration: 0.23 },
            0.45
          );
        }
        if (badgeRefs.current[2]) {
          tl.to(
            badgeRefs.current[2],
            { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 0.20 },
            0.47
          );
        }
        if (textRefs.current[2]) {
          tl.to(
            textRefs.current[2],
            { y: 0, opacity: 1, ease: "power2.out", duration: 0.23 },
            0.47
          );
        }
      });
    }, pinSectionRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <div className="relative w-full" ref={pinSectionRef}>
      {/* ── DESKTOP PINNED VIEWPORT (≥ 1024px) ── */}
      <div className="hidden lg:block w-full min-h-[500px] xl:min-h-[540px] pt-0">
        {/* Pinned Card Grid */}
        <div
          className="grid w-full gap-8 xl:gap-12 relative pt-0 pb-4"
          style={{
            gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
          }}
        >
          {data.map((item, index) => (
            <div key={index} className="relative z-10 flex flex-col gap-5">
              {/* Top Visual Card Graphic */}
              <div
                ref={addToCardRefs}
                className="group relative flex h-72 xl:h-80 w-full items-center justify-center overflow-hidden rounded-2xl border border-[#0d0d0d]/12 bg-[#faf7f2] shadow-[0_20px_45px_-15px_rgba(13,13,13,0.18)] transition-all duration-500 hover:border-[#c9962c]/50 hover:shadow-[0_25px_55px_-12px_rgba(201,150,44,0.22)]"
              >
                {/* Full large artwork fitted edge-to-edge */}
                <img
                  src={item.bgSrc}
                  alt={item.title || ""}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {item.overlaySrc && (
                  <img
                    src={item.overlaySrc}
                    alt=""
                    className="pointer-events-none absolute z-10 h-[50%] w-fit object-contain transition-all duration-500 ease-out group-hover:scale-110 drop-shadow-md"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 z-20" />
              </div>

              {/* Step Badge */}
              <div className="relative flex items-center h-9">
                <div
                  ref={addToBadgeRefs}
                  className="relative z-20 flex size-9 items-center justify-center rounded-md bg-gradient-to-b from-[#2e2e36] via-[#1a1a1f] to-[#0a0a0d] text-[#f5f2ed] border border-white/15 shadow-[0_4px_14px_rgba(0,0,0,0.32)] text-[13px] font-bold font-mono tracking-wider"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Text Info Block — with generous breathing room and modern atelier typography */}
              <div ref={addToTextRefs} className="mt-6 pt-1 space-y-4">
                <h3 className="text-[20px] xl:text-[23px] font-bold tracking-[0.02em] text-[#0d0d0d] leading-[1.3] font-['Cinzel','Playfair_Display',serif]">
                  {item.title}
                </h3>
                {item.lead && (
                  <h4 className="text-[11.5px] xl:text-[12px] font-bold tracking-[0.06em] text-[#9e7623] uppercase leading-[1.6] font-['Plus_Jakarta_Sans',sans-serif]">
                    {item.lead}
                  </h4>
                )}
                <p className="text-[13px] xl:text-[13.5px] leading-[1.85] text-[#55524c] font-normal tracking-[0.015em] font-['Plus_Jakarta_Sans',sans-serif]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Background Track Line behind badges */}
          <div className="absolute left-4 top-[326px] xl:top-[358px] h-[2px] w-[calc(100%-32px)] bg-[#0d0d0d]/10 pointer-events-none z-0" />

          {/* Dynamic Active Progress Fill Line (Black Gradient) */}
          <div
            ref={lineFillRef}
            className="absolute left-4 top-[326px] xl:top-[358px] h-[3px] w-[calc(100%-32px)] origin-left bg-gradient-to-r from-[#2e2e36] via-[#1a1a1f] to-[#0a0a0d] shadow-sm pointer-events-none z-0"
            style={{ transformOrigin: "left center" }}
          />
        </div>
      </div>

      {/* ── MOBILE / TABLET LAYOUT (< 1024px) ── */}
      <div className="relative my-10 flex w-full flex-col gap-12 pl-12 pr-2 lg:hidden">
        {/* Vertical Connecting Guide Line (Black Gradient) */}
        <div className="absolute left-[19px] top-6 bottom-6 w-[2.5px] bg-gradient-to-b from-[#2e2e36] via-[#1a1a1f] to-[#0a0a0d]" />

        {data.map((item, index) => (
          <div key={index} className="relative z-10 flex flex-col gap-4">
            {/* Step Badge */}
            <div className="absolute -left-[43px] top-0 flex size-8 items-center justify-center rounded-md bg-gradient-to-b from-[#2e2e36] via-[#1a1a1f] to-[#0a0a0d] text-[#f5f2ed] border border-white/15 shadow-md text-xs font-bold font-mono tracking-wider">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Visual Graphic */}
            <div className="relative flex h-64 sm:h-72 w-full items-center justify-center overflow-hidden rounded-2xl border border-[#0d0d0d]/10 bg-[#faf7f2] shadow-sm">
              <img
                src={item.bgSrc}
                alt={item.title || ""}
                className="h-full w-full object-cover object-center"
              />
              {item.overlaySrc && (
                <img
                  src={item.overlaySrc}
                  alt=""
                  className="pointer-events-none absolute z-10 h-[50%] w-fit object-contain drop-shadow-md"
                />
              )}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 z-20" />
            </div>

            {/* Content */}
            <div className="mt-3 space-y-3.5">
              <h3 className="text-[19px] font-bold tracking-[0.02em] text-[#0d0d0d] leading-[1.3] font-['Cinzel','Playfair_Display',serif]">
                {item.title}
              </h3>
              {item.lead && (
                <h4 className="text-[11.5px] font-bold tracking-[0.06em] text-[#9e7623] uppercase leading-[1.6] font-['Plus_Jakarta_Sans',sans-serif]">
                  {item.lead}
                </h4>
              )}
              <p className="text-[13px] leading-[1.85] text-[#55524c] font-normal font-['Plus_Jakarta_Sans',sans-serif]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skiper104;
