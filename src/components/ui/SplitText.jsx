import React from 'react';
import { motion } from 'framer-motion';

/**
 * SplitText - Splits a string into words or characters with staggered mask-reveals.
 * Supports fluid reverse animations: when scrolling out of view, characters/words
 * reverse-stagger back down into the clipping mask, and re-animate when scrolling back.
 */
export function SplitText({
  text = '',
  type = 'chars', // 'chars' | 'words'
  delay = 0,
  stagger = 0.025,
  duration = 0.7,
  className = '',
  as: Component = 'span',
  once = false, // false by default for full bidirectional reverse animations on scroll
  trigger = 'inView', // 'inView' | 'mount'
}) {
  if (!text) return null;

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  // Split into words first to preserve natural line wrapping
  const words = text.split(' ');

  const containerVariants = {
    hidden: {
      transition: {
        staggerChildren: stagger * 0.6,
        staggerDirection: -1, // Reverse cascade order on scroll out
      },
    },
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '115%',
      opacity: 0,
      transition: {
        duration: duration * 0.55,
        ease: [0.36, 0, 0.66, -0.04], // Smooth reverse departure
      },
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const motionProps = trigger === 'inView'
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once, amount: 0.15 },
      }
    : {
        initial: 'hidden',
        animate: 'visible',
      };

  let globalCharIndex = 0;

  return (
    <Component className={`split-text-root ${className}`} style={{ display: 'inline' }}>
      <motion.span
        variants={containerVariants}
        {...motionProps}
        style={{ display: 'inline', willChange: 'transform' }}
      >
        {words.map((word, wordIdx) => {
          if (type === 'words') {
            return (
              <React.Fragment key={wordIdx}>
                <span
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    verticalAlign: 'bottom',
                    paddingBottom: '0.08em',
                    marginBottom: '-0.08em',
                  }}
                >
                  <motion.span
                    variants={itemVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                </span>
                {wordIdx < words.length - 1 && ' '}
              </React.Fragment>
            );
          }

          // Characters mode
          const chars = Array.from(word);
          return (
            <React.Fragment key={wordIdx}>
              <span
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'bottom',
                }}
              >
                {chars.map((char, charIdx) => {
                  const idx = globalCharIndex++;
                  return (
                    <span
                      key={charIdx}
                      style={{
                        display: 'inline-block',
                        overflow: 'hidden',
                        verticalAlign: 'bottom',
                        paddingBottom: '0.08em',
                        marginBottom: '-0.08em',
                      }}
                    >
                      <motion.span
                        variants={itemVariants}
                        style={{ display: 'inline-block' }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
              {wordIdx < words.length - 1 && (
                <span style={{ display: 'inline-block', width: '0.28em' }}>&nbsp;</span>
              )}
            </React.Fragment>
          );
        })}
      </motion.span>
    </Component>
  );
}

export default SplitText;
