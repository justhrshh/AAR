import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  // Horizontal scatter assembly
  const x = useTransform(scrollYProgress, [0, 0.75], [distanceFromCenter * 85, 0]);
  // Subtle vertical glide into resting position at the top
  const y = useTransform(scrollYProgress, [0, 0.75], [130 + Math.abs(distanceFromCenter) * 10, 0]);
  // 3D perspective rotation
  const rotateX = useTransform(scrollYProgress, [0, 0.75], [distanceFromCenter * 75, 0]);
  // Opacity & scale entrance
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.75], [0.9, 1]);

  return (
    <motion.span
      className={cn("inline-block text-[#c9962c] font-black tracking-tight", isSpace && "w-3 sm:w-5")}
      style={{ x, y, rotateX, opacity, scale }}
    >
      {char}
    </motion.span>
  );
};

export const Skiper31 = () => {
  const headerRef = useRef(null);

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center 0%"],
  });

  const text = "BEYOND THE FRAME";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const containerY = useTransform(headerProgress, [0, 0.8], [120, 0]);

  return (
    <section className="relative w-full bg-[#ede8e1]">
      {/* Animated Headline Block ("BEYOND THE FRAME") with expansive luxury spacing */}
      <div
        ref={headerRef}
        className="relative w-full min-h-[60vh] pt-[65vh] sm:pt-[75vh] pb-[50vh] sm:pb-[60vh] px-6 flex flex-col items-center justify-center bg-[#ede8e1]"
      >
        <motion.div
          className="w-full max-w-5xl text-center text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-[#0d0d0d]"
          style={{ perspective: "800px", y: containerY }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={headerProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { CharacterV1 };
export default Skiper31;
