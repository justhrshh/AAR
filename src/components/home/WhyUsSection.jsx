import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { cn } from "../../lib/utils";

const config = {
  marqueeScrollSpeed: 180, // Increased for a faster, dynamic feel
  stripFollowEase: 0.05,
  stripEdgeInset: 175,
  contentRiseRate: 0.85,
  risenTopGap: 100,
  liftHeadStart: 125,
  wakeStrength: 2.5,
  wakeReach: 125,
  lineSettleEase: 0.09,
};

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=800&auto=format&fit=crop",
];

const DEFAULT_EYEBROW = "BUILT TO BE";
const DEFAULT_TITLE = ["SEEN."];
const DEFAULT_SUBTITLE = ["BUILD FASTER", "SHIP BETTER"];
const DEFAULT_PARAGRAPHS = [
  [
    "Vengeance UI is a premium component library",
    "specializing in smooth animations, interactive",
    "interfaces, and modern design.",
  ],
  [
    "We prioritize developer experience and aesthetics.",
    "Our components span across complex interactions,",
    "3D elements, and smooth animations built",
    "for React and modern frameworks. Our library is tailored",
    "to distinct challenges within modern web development."
  ]
];

export function MagneticSpotlightMarquee({
  className,
  images = DEFAULT_IMAGES,
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  paragraphs = DEFAULT_PARAGRAPHS,
  navEmail = "hello@vengeance.ui",
  navLinks = "Documentation, Components, GitHub",
  footerText = "We navigate in no-nonsense environments pushing the boundaries of web design. Whether you're a startup or a global leader, building a new identity or interactive platform, Vengeance UI is your partner in innovation. Our premium components ensure that every project feels magical, collaborative, and smooth.",
}) {
  const containerRef = useRef(null);
  const marqueeStripRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const contentWrapperRef = useRef(null);

  // State to hold cloned images to fill width
  const [clonedImages, setClonedImages] = useState(images);

  useEffect(() => {
    if (!marqueeTrackRef.current || !marqueeStripRef.current || !containerRef.current || !contentWrapperRef.current) return;

    const marqueeTrack = marqueeTrackRef.current;

    // 1. Setup infinite horizontal marquee with GSAP
    // Calculate width statically to avoid issues with unloaded images
    const isMobile = window.innerWidth < 768;
    const itemWidth = isMobile ? 140 : 180; // Smaller, square width
    const gap = 16; // 1rem gap
    const oneSetWidth = images.length * (itemWidth + gap);
    const setsNeeded = Math.ceil(window.innerWidth / oneSetWidth) + 2;
    
    const newImages = [];
    for (let i = 0; i < setsNeeded; i++) {
      newImages.push(...images);
    }
    setClonedImages(newImages);

    // Wait for React to render clones, then animate
    const ctx = gsap.context(() => {
      setTimeout(() => {
         gsap.to(marqueeTrack, {
           x: `-${oneSetWidth}px`,
           duration: oneSetWidth / 600, // Hardcoded even faster speed (600)
           ease: "none",
           repeat: -1,
           modifiers: {
             x: (x) => `${gsap.utils.wrap(-oneSetWidth, 0, parseFloat(x))}px`
           }
         });
      }, 100);
    }, marqueeTrack);

    return () => ctx.revert();
  }, [images]);

  // Wake effect logic
  useEffect(() => {
    if (!containerRef.current || !marqueeStripRef.current || !contentWrapperRef.current) return;

    const spotlightSection = containerRef.current;
    const marqueeStrip = marqueeStripRef.current;

    let stripBaseTop = 0;
    let stripHeight = 0;
    let sectionHeight = 0;
    let stripRestCenterY = 0;
    let contentTopAtRest = 0;

    let stripTargetY = 0;
    let stripCurrentY = 0;
    let stripPrevY = 0;
    let hasPointerMoved = false;

    let targets = [];
    let rafId;

    const measureGeometry = () => {
      sectionHeight = spotlightSection.getBoundingClientRect().height;
      stripBaseTop = marqueeStrip.offsetTop;
      stripHeight = marqueeStrip.offsetHeight;
      
      stripRestCenterY = config.stripEdgeInset;
      
      const elements = Array.from(spotlightSection.querySelectorAll('.wake-target'));
      
      let blockTop = Infinity;
      targets = elements.map(el => {
        let y = 0;
        let node = el;
        while (node && node !== spotlightSection) {
          y += node.offsetTop;
          node = node.offsetParent;
        }
        const restCenterY = y + el.offsetHeight / 2;
        blockTop = Math.min(blockTop, restCenterY - el.offsetHeight / 2);
        
        return {
          el,
          restCenterY,
          currentY: 0
        };
      });

      contentTopAtRest = isFinite(blockTop) ? blockTop : sectionHeight * 0.4;
      
      if (!hasPointerMoved) {
        const restY = config.stripEdgeInset - stripHeight / 2;
        stripTargetY = restY;
        stripCurrentY = restY;
        stripPrevY = restY;
        gsap.set(marqueeStrip, { y: stripCurrentY });
      }
    };

    setTimeout(measureGeometry, 100);
    window.addEventListener('resize', measureGeometry);

    const handlePointerMove = (e) => {
      hasPointerMoved = true;
      const rect = spotlightSection.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      stripTargetY = pointerY - stripHeight / 2;
    };

    const handlePointerLeave = () => {
      hasPointerMoved = false;
      stripTargetY = config.stripEdgeInset - stripHeight / 2;
    };

    spotlightSection.addEventListener('mousemove', handlePointerMove);
    spotlightSection.addEventListener('mouseleave', handlePointerLeave);

    const render = () => {
      stripCurrentY += (stripTargetY - stripCurrentY) * config.stripFollowEase;
      gsap.set(marqueeStrip, { y: stripCurrentY });

      const stripCenterY = stripBaseTop + stripCurrentY + stripHeight / 2;
      const stripVelocityY = stripCurrentY - stripPrevY;
      stripPrevY = stripCurrentY;

      const descentBelowRest = Math.max(0, stripCenterY - stripRestCenterY);
      const maxRise = Math.max(0, contentTopAtRest - config.risenTopGap);
      const contentRise = -Math.min(
        descentBelowRest * config.contentRiseRate,
        maxRise
      );

      targets.forEach(line => {
        const gapToStrip = line.restCenterY - stripCenterY;
        const reachedLine = stripCenterY + config.liftHeadStart >= line.restCenterY;
        
        const wakeInfluence = Math.exp(
          -(gapToStrip * gapToStrip) / (2 * config.wakeReach * config.wakeReach)
        );
        const wakeOffset = stripVelocityY * wakeInfluence * config.wakeStrength;
        
        const lineTarget = (reachedLine ? contentRise : 0) + wakeOffset;
        
        line.currentY += (lineTarget - line.currentY) * config.lineSettleEase;
        gsap.set(line.el, { y: line.currentY });
      });

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', measureGeometry);
      spotlightSection.removeEventListener('mousemove', handlePointerMove);
      spotlightSection.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="whyus"
      className={cn(
        "spotlight relative w-full h-[100vh] min-h-[800px] overflow-hidden bg-white dark:bg-[#0f0f0f] text-white font-sans",
        className
      )}
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {/* Top Nav - Centered layout as seen in screenshot */}
      <div className="absolute top-0 left-0 w-full p-6 flex flex-col items-center justify-center z-50 text-[10px] md:text-xs font-medium tracking-wide opacity-90 mix-blend-difference pointer-events-none">
        <div>{navEmail}</div>
        <div>{navLinks}</div>
      </div>

      {/* Marquee Strip */}
      <div 
        ref={marqueeStripRef} 
        className="spotlight-marquee absolute left-0 w-full z-20 h-[160px] md:h-[200px] pointer-events-none"
        style={{ top: 0 }} 
      >
        <div 
          ref={marqueeTrackRef} 
          className="spotlight-marquee-track flex gap-4 h-full items-center absolute top-0 left-0"
        >
          {clonedImages.map((img, idx) => (
            <div key={idx} className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] shrink-0 rounded-[20px] overflow-hidden shadow-sm bg-neutral-100 dark:bg-neutral-900">
              <img
                src={img}
                alt="Marquee item"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div 
        ref={contentWrapperRef}
        className="spotlight-content-wrapper relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 z-30 pointer-events-none mix-blend-difference"
      >
        {/* Main Hero Row: Left Paragraph Block | Center: BUILT TO BE SEEN. | Right: Statement & CTA */}
        <div className="w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 xl:gap-10 px-4 md:px-8 mb-8 md:mb-12">
          
          {/* 1. Left Paragraph Block with Split Vertical Accent Line */}
          <div className="flex items-stretch gap-5 max-w-xs flex-shrink-0">
            {/* Split Vertical Line (Gold Top, White Bottom + Dot) */}
            <div className="flex flex-col items-center flex-shrink-0 pt-1">
              <div className="w-[1.5px] h-12 bg-[#d99e1f]" />
              <div className="w-[1.5px] h-16 bg-white/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 shadow-sm" />
            </div>

            {/* Paragraphs */}
            <div className="flex flex-col gap-4 text-left">
              <p className="wake-target text-xs md:text-sm text-white/75 font-sans leading-[1.55]">
                We don’t just design.<br />
                We build visuals that<br />
                demand attention.
              </p>
              <p className="wake-target text-xs md:text-sm font-bold text-white font-sans leading-[1.55]">
                Crafted to be seen.<br />
                Built to be remembered.
              </p>
            </div>
          </div>

          {/* 2. Center: Eyebrow & SEEN Title Display with Gold Dot */}
          <div className="flex flex-col items-start xl:items-center flex-shrink-0">
            {eyebrow && (
              <div className="wake-target text-[10px] md:text-xs font-mono font-bold tracking-[0.35em] text-[#d99e1f] uppercase mb-2">
                {eyebrow}
              </div>
            )}
            <h1 
              className="text-[17vw] md:text-[11rem] lg:text-[13rem] font-bold leading-[0.82] tracking-tight uppercase flex items-baseline"
              style={{ fontFamily: "'Playfair Display', 'Cinzel', 'Instrument Serif', serif" }}
            >
              <span className="wake-target text-white">SEEN</span>
              <span className="wake-target inline-block w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#d99e1f] ml-2 mb-2 md:mb-4 shadow-sm" />
            </h1>
          </div>

          {/* 3. Right: Impact Statement & EXPLORE OUR WORK CTA */}
          <div className="flex flex-col items-start text-left max-w-xs flex-shrink-0 gap-5">
            <p className="wake-target text-xs md:text-sm text-white/75 font-sans leading-[1.6]">
              Every frame. Every detail.<br />
              Every decision is made to cut through<br />
              the noise and leave a lasting impact.
            </p>

            <a 
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="wake-target group flex flex-col gap-2 pointer-events-auto cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.22em] text-white uppercase group-hover:text-[#d99e1f] transition-colors">
                <span>EXPLORE OUR WORK</span>
                <span className="text-[#d99e1f] text-base group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <div className="w-11 h-[2px] bg-[#d99e1f]" />
            </a>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-40 flex justify-center pointer-events-none mix-blend-difference">
        <p className="text-[8px] md:text-[10px] text-white/70 max-w-2xl text-center leading-[1.6]">
          {footerText}
        </p>
      </div>
    </section>
  );
}

export const WhyUsSection = MagneticSpotlightMarquee;
export default MagneticSpotlightMarquee;
