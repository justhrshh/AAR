import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Skiper31 = () => {
  const headerRef = useRef(null);

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center 0%"],
  });

  const containerY = useTransform(headerProgress, [0, 0.8], [40, 0]);
  const opacity = useTransform(headerProgress, [0, 0.35], [0, 1]);
  const scale = useTransform(headerProgress, [0, 0.8], [0.96, 1]);

  return (
    <section className="relative w-full bg-[#ede8e1] overflow-hidden">
      {/* Background delicate radial gold warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] bg-gradient-to-r from-transparent via-[#c9962c]/[0.05] to-transparent pointer-events-none blur-3xl" />

      <div
        ref={headerRef}
        className="relative w-full min-h-[28vh] sm:min-h-[36vh] pt-32 sm:pt-44 lg:pt-[26vh] pb-16 sm:pb-28 lg:pb-[20vh] px-6 flex flex-col items-center justify-center bg-[#ede8e1]"
      >
        <motion.div
          className="relative w-full max-w-[88vw] sm:max-w-[78vw] lg:max-w-[840px] flex flex-col items-center select-none"
          style={{ y: containerY, opacity, scale }}
        >
          <h2 className="sr-only">Our Creative Capabilities — Chapter 01 / Service Disciplines</h2>
          <img
            src="/images/our-creative-capabilities.png"
            alt="Our Creative Capabilities"
            className="w-full h-auto object-contain select-none pointer-events-none"
            draggable="false"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Skiper31;
