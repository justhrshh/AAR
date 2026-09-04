import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAPABILITIES } from "../../data/capabilities";
import { ProjectCardFrame } from "./ProjectCardFrame";

gsap.registerPlugin(ScrollTrigger);

export function ZoomParallax({ items = CAPABILITIES }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Calibrated sweet spot so center card (index 0) just covers screen cleanly (5.8x)
      const scales = [5.8, 6.6, 7.5, 6.6, 7.5, 9.5, 10.5];

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

      // When animation starts, all text overlays, wireframes, and taglines smoothly fade out
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
      id="capabilities"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#ede8e1]"
    >
      {/* Dynamic Gradient Wave Background Graphic Layer with seamless edge blending */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-20 overflow-hidden">
        <img
          src="/images/parallax-bg.jpg"
          alt="Abstract Gradient Waves"
          className="w-full h-full object-cover select-none"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 6%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.7) 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 6%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.7) 90%, transparent 100%)',
          }}
        />
        {/* Soft atmospheric gradient transitions that dissolve seamlessly into #ede8e1 */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#ede8e1] via-[#ede8e1]/70 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f1e9e2] via-[#f1e9e2]/70 to-transparent pointer-events-none" />
      </div>

      {/* ----------------- PERIPHERAL HUD OVERLAYS ----------------- */}
      {/* Top Right: Category Filters */}
      <div
        data-parallax-fade
        className="hidden lg:flex absolute top-28 right-12 sm:top-32 sm:right-20 lg:right-24 flex-col items-start gap-2 pointer-events-none z-20 text-[10px] font-bold tracking-widest uppercase will-change-transform"
      >
        <span className="text-[#c9962c] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9962c]" /> ALL
        </span>
        <span className="text-[#0d0d0d]/40">WEB DEVELOPMENT</span>
        <span className="text-[#0d0d0d]/40">DIGITAL MARKETING</span>
        <span className="text-[#0d0d0d]/40">SOCIAL MEDIA MANAGEMENT</span>
        <span className="text-[#0d0d0d]/40">AI VIDEOS</span>
        <span className="text-[#0d0d0d]/40">VIDEO EDITING & MOTION</span>
        <span className="text-[#0d0d0d]/40">UI/UX DESIGN</span>
        <span className="text-[#0d0d0d]/40">GRAPHIC DESIGN</span>
      </div>

      {/* Left Mid: Philosophy Badge with Vertical Line & Dot */}
      <div
        data-parallax-fade
        className="hidden md:flex absolute left-8 sm:left-12 lg:left-14 top-[40%] -translate-y-1/2 flex-col items-start gap-3.5 pointer-events-none z-20 will-change-transform"
      >
        <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#0d0d0d]/55 leading-[1.65] uppercase">
          IDEAS<br />
          TURNED<br />
          INTO VISIONS
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-[1.5px] h-10 bg-[#0d0d0d]/25" />
          <div className="w-2 h-2 rounded-full bg-[#c9962c]" />
        </div>
      </div>

      {/* Bottom Center: Coordinates & Location Bar */}
      <div
        data-parallax-fade
        className="hidden sm:flex absolute bottom-6 right-8 sm:bottom-8 sm:right-12 left-44 sm:left-48 lg:left-52 items-center justify-between pointer-events-none z-20 text-[10px] font-semibold tracking-[0.2em] text-[#0d0d0d]/50 uppercase will-change-transform"
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

      {/* ----------------- PARALLAX CARD MATRIX (7 SERVICES) ----------------- */}
      {items.map((project, index) => {
        return (
          <div
            key={project.id || index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`absolute top-0 flex h-full w-full items-center justify-center pointer-events-none will-change-transform ${
              index === 1 ? '[&>div]:!-top-[20vh] md:[&>div]:!-top-[30vh] [&>div]:!left-[2vw] md:[&>div]:!left-[5vw] [&>div]:!w-[34vw] md:[&>div]:!w-[29vw] md:[&>div]:!h-[23vh]' : ''
            } ${
              index === 2 ? '[&>div]:!-top-[7vh] md:[&>div]:!-top-[8vh] [&>div]:!-left-[28vw] md:[&>div]:!-left-[24vw] [&>div]:!w-[30vw] md:[&>div]:!w-[22vw] md:[&>div]:!h-[26vh]' : ''
            } ${
              index === 3 ? '[&>div]:!-top-[2vh] md:[&>div]:!-top-[2vh] [&>div]:!left-[28vw] md:[&>div]:!left-[24.5vw] [&>div]:!w-[28vw] md:[&>div]:!w-[18.5vw] md:[&>div]:!h-[19vh]' : ''
            } ${
              index === 4 ? '[&>div]:!top-[17vh] md:[&>div]:!top-[29vh] [&>div]:!left-[2vw] md:[&>div]:!left-[4vw] [&>div]:!w-[28vw] md:[&>div]:!w-[17vw] md:[&>div]:!h-[19vh]' : ''
            } ${
              index === 5 ? '[&>div]:!top-[17vh] md:[&>div]:!top-[29vh] [&>div]:!-left-[28vw] md:[&>div]:!-left-[17vw] [&>div]:!w-[28vw] md:[&>div]:!w-[19.5vw] md:[&>div]:!h-[19vh]' : ''
            } ${
              index === 6 ? '[&>div]:!top-[16vh] md:[&>div]:!top-[27vh] [&>div]:!left-[28vw] md:[&>div]:!left-[24.5vw] [&>div]:!w-[28vw] md:[&>div]:!w-[19.5vw] md:[&>div]:!h-[17.5vh]' : ''
            }`}
          >
            <div className="relative w-[28vw] aspect-[16/10] h-auto md:aspect-auto md:w-[20vw] md:h-[19vh] pointer-events-auto">
              <ProjectCardFrame project={project} index={index} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { ZoomParallax as CraftingTransition };
export default ZoomParallax;
