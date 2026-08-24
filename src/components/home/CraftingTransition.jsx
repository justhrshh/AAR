import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_IMAGES = [
  {
    category: "MOTION",
    num: "04",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    alt: "Motion Abstract Fluid System"
  },
  {
    category: "DIGITAL",
    num: "01",
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    alt: "Digital Fluid Wave Topology"
  },
  {
    category: "BRANDING",
    num: "02",
    src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    alt: "Branding Tactile Color Diffusion"
  },
  {
    category: "ARCHITECTURE",
    num: "03",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    alt: "Architectural Pavilion Forms"
  },
  {
    category: "PRODUCT",
    num: "06",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop",
    alt: "Product Industrial Hardware"
  },
  {
    category: "ILLUSTRATION",
    num: "05",
    src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    alt: "Classical Botanical Illustration"
  },
  {
    category: "EXPERIMENTS",
    num: "07",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
    alt: "Experimental Atmospheric Architecture"
  }
];

export function CraftingTransition({ images = DEFAULT_IMAGES }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scales = [4.8, 5.5, 6.5, 5.5, 6.5, 8.5, 9.5];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // When animation starts, all text overlays and taglines smoothly fade out
      tl.to(
        "[data-parallax-fade]",
        {
          opacity: 0,
          y: -10,
          ease: "power2.out",
          duration: 0.15,
        },
        0
      );

      cardsRef.current.forEach((el, index) => {
        if (el) {
          const targetScale = scales[index % scales.length];
          tl.to(
            el,
            {
              scale: targetScale,
              ease: "none",
              force3D: true,
            },
            0
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#ede8e1]"
    >
      {/* ----------------- PERIPHERAL HUD OVERLAYS ----------------- */}
      {/* Top Left: Selected Work Title */}
      <div className="absolute top-8 left-8 sm:top-10 sm:left-12 flex items-center gap-3 pointer-events-none z-20">
        <span className="w-2 h-2 rounded-full bg-[#c9962c]" />
        <span className="text-xs font-bold tracking-widest text-[#0d0d0d] uppercase">SELECTED WORK</span>
        <span className="text-xs font-medium tracking-wider text-[#0d0d0d]/40">01 — 07</span>
      </div>

      {/* Top Right: Category Filters with expanded gap and positioned clear of corner */}
      <div
        data-parallax-fade
        className="hidden lg:flex absolute top-32 right-24 sm:top-36 sm:right-98 flex-col items-start gap-2.5 pointer-events-none z-20 text-[10px] font-bold tracking-widest uppercase will-change-transform"
      >
        <span className="text-[#c9962c] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9962c]" /> ALL
        </span>
        <span className="text-[#0d0d0d]/40">BRANDING</span>
        <span className="text-[#0d0d0d]/40">DIGITAL</span>
        <span className="text-[#0d0d0d]/40">MOTION</span>
        <span className="text-[#0d0d0d]/40">ARCHITECTURE</span>
        <span className="text-[#0d0d0d]/40">ILLUSTRATION</span>
        <span className="text-[#0d0d0d]/40">EXPERIMENTS</span>
      </div>

      {/* Left Mid: Philosophy Badge with Vertical Line & Dot */}
      <div
        data-parallax-fade
        className="hidden md:flex absolute left-8 sm:left-12 lg:left-24 top-[40%] -translate-y-1/2 flex-col items-start gap-4 pointer-events-none z-20 will-change-transform"
      >
        <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#0d0d0d]/55 leading-[1.65] uppercase">
          IDEAS<br />
          TURNED<br />
          INTO VISIONS
        </div>
        <div className="flex flex-col items-center gap-2 pl-0.5">
          <div className="w-[1px] h-14 sm:h-16 bg-[#0d0d0d]/25" />
          <span className="w-2 h-2 rounded-full bg-[#c9962c]" />
        </div>
      </div>

      {/* Bottom Left: Scroll Cue */}
      <div
        data-parallax-fade
        className="absolute bottom-8 left-8 sm:bottom-50 sm:left-22 lg:left-24 flex flex-col items-start gap-2.5 pointer-events-none z-20 will-change-transform"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#0d0d0d]/30 flex items-center justify-center text-[#0d0d0d]/70">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-[#0d0d0d]/50 uppercase leading-tight">
          SCROLL TO<br />EXPLORE
        </div>
      </div>

      {/* Bottom Horizontal Bar: Socials & Coordinates */}
      <div
        data-parallax-fade
        className="hidden sm:flex absolute bottom-2 right-8 sm:bottom-10 sm:right-12 left-48 lg:left-52 items-center justify-between pointer-events-none z-20 text-[10px] font-semibold tracking-[0.4em] text-[#0d0d0d]/50 uppercase will-change-transform"
      >
        <div className="flex items-center gap-5">
          <span>IG</span>
          <span>BE</span>
          <span>LI</span>
          <span>DR</span>
        </div>
        <div className="flex items-center gap-6">
          <span>NEW DELHI, INDIA</span>
          <span className="text-[#0d0d0d]/25">|</span>
          <span>28.6139° N, 77.2090° E</span>
        </div>
        <div className="flex items-center gap-2">
          <span>EST. 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9962c]" />
        </div>
      </div>

      {/* ----------------- PARALLAX CARD MATRIX ----------------- */}
      {images.map(({ src, alt, category, num }, index) => {
        return (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`absolute top-0 flex h-full w-full items-center justify-center will-change-transform ${
              index === 1 ? '[&>div]:!-top-[29vh] [&>div]:!left-[5vw] [&>div]:!h-[26vh] [&>div]:!w-[32vw]' : ''
            } ${
              index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[24vw] [&>div]:!h-[38vh] [&>div]:!w-[18vw]' : ''
            } ${
              index === 3 ? '[&>div]:!left-[26vw] [&>div]:!h-[22vh] [&>div]:!w-[23vw]' : ''
            } ${
              index === 4 ? '[&>div]:!top-[26vh] [&>div]:!left-[4vw] [&>div]:!h-[22vh] [&>div]:!w-[18vw]' : ''
            } ${
              index === 5 ? '[&>div]:!top-[26vh] [&>div]:!-left-[21vw] [&>div]:!h-[22vh] [&>div]:!w-[26vw]' : ''
            } ${
              index === 6 ? '[&>div]:!top-[22vh] [&>div]:!left-[25vw] [&>div]:!h-[14vh] [&>div]:!w-[14vw]' : ''
            }`}
          >
            <div className="relative h-[22vh] w-[22vw] group cursor-pointer">
              {/* Heading Tagline Above Card — 100% Seamless Transparent Background */}
              <div
                data-parallax-fade
                className="absolute -top-6 left-0 flex items-center gap-1.5 pointer-events-none z-10 will-change-transform"
              >
                <span className="w-3.5 h-[2px] bg-[#c9962c]" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#0d0d0d] uppercase">
                  {category}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#0d0d0d]/40">
                  / {num}
                </span>
              </div>

              {/* Offset Architectural Outline Frame */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-xl border-[1.5px] border-[#0d0d0d]/40 pointer-events-none -z-10 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4"
              />

              {/* Foreground Image Card with 3D Shadow & Hover Zoom */}
              <div
                className="relative w-full h-full overflow-hidden rounded-xl bg-[#ede8e1] transition-all duration-500 ease-out group-hover:shadow-[0_45px_90px_-15px_rgba(13,13,13,0.55)]"
                style={{
                  boxShadow: "0 35px 70px -12px rgba(13, 13, 13, 0.4), 0 18px 36px -8px rgba(13, 13, 13, 0.28)",
                }}
              >
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Arrow Action Button (↗) */}
                <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-md text-[#0d0d0d] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300 pointer-events-none">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { CraftingTransition as ZoomParallax };
export default CraftingTransition;
