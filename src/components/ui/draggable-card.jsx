import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const DraggableCardBody = ({
  className,
  children,
  onSwipe,
  onClick,
  isTopCard = false,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);
  const controls = useAnimationControls();
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);

  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  // Physics calculations (Aceternity UI)
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = {
    stiffness: 120,
    damping: 22,
    mass: 0.5,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [20, -20]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-20, 20]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(mouseX, [-400, 0, 400], [0.85, 1, 0.85]),
    springConfig
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.15, 0, 0.15]),
    springConfig
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight,
          left: -window.innerWidth,
          right: window.innerWidth,
          bottom: window.innerHeight,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => {
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!isTopCard) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag={isTopCard}
      dragConstraints={constraints}
      dragElastic={0.8}
      onDragStart={() => {
        isDraggingRef.current = true;
        dragDistanceRef.current = 0;
        document.body.style.cursor = "grabbing";
      }}
      onDrag={(event, info) => {
        dragDistanceRef.current = Math.hypot(info.offset.x, info.offset.y);
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = "default";
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 80);

        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();
        const offsetX = info.offset.x;
        const offsetY = info.offset.y;
        const speed = Math.hypot(currentVelocityX, currentVelocityY);
        const distance = Math.hypot(offsetX, offsetY);

        // Check if card is thrown / swiped away past threshold
        const isSwiped = distance > 130 || speed > 450;

        if (isSwiped && onSwipe) {
          const dir = offsetX > 0 ? "right" : "left";
          onSwipe(dir);
        } else {
          // Snap back to origin with spring physics
          controls.start({
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            transition: {
              type: "spring",
              ...springConfig,
            },
          });

          const bounce = Math.min(0.7, speed / 1000);

          animate(info.point.x, info.point.x + currentVelocityX * 0.2, {
            duration: 0.6,
            ease: [0.2, 0, 0, 1],
            bounce,
            type: "spring",
            stiffness: 70,
            damping: 18,
            mass: 0.6,
          });

          animate(info.point.y, info.point.y + currentVelocityY * 0.2, {
            duration: 0.6,
            ease: [0.2, 0, 0, 1],
            bounce,
            type: "spring",
            stiffness: 70,
            damping: 18,
            mass: 0.6,
          });
        }
      }}
      onClick={(e) => {
        // Only trigger click if not dragged
        if (!isDraggingRef.current && dragDistanceRef.current < 8 && onClick) {
          onClick(e);
        }
      }}
      style={{
        rotateX: isTopCard ? rotateX : 0,
        rotateY: isTopCard ? rotateY : 0,
        opacity: isTopCard ? opacity : 1,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={isTopCard ? { scale: 1.02 } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[#faf7f2] p-2.5 sm:p-3 shadow-[0_24px_60px_-15px_rgba(13,13,13,0.3)] border border-[#0d0d0d]/15 select-none touch-none",
        isTopCard ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
        className
      )}
    >
      {children}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-white/20 select-none rounded-2xl"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = ({ className, children }) => {
  return (
    <div className={cn("[perspective:3000px] relative w-full", className)}>
      {children}
    </div>
  );
};
