import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    alt: "Spatial Dynamics 3D System"
  },
  {
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    alt: "Light Dispersion Exploration"
  },
  {
    src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    alt: "Volumetric Grid Kerning"
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    alt: "Minimalist Architectural Form"
  },
  {
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop",
    alt: "Tactile Packaging Obsidian"
  },
  {
    src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    alt: "Digital Kinetic Guidelines"
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
    alt: "Refractive Optical Physics"
  }
];

export function ZoomParallax({ images = DEFAULT_IMAGES }) {
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
      {images.map(({ src, alt }, index) => {
        return (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`absolute top-0 flex h-full w-full items-center justify-center will-change-transform ${
              index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''
            } ${
              index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''
            } ${
              index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''
            } ${
              index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''
            } ${
              index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''
            } ${
              index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''
            }`}
          >
            <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-xl shadow-2xl">
              <img
                src={src || '/placeholder.svg'}
                alt={alt || `Parallax image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { ZoomParallax as CraftingTransition };
export default ZoomParallax;
