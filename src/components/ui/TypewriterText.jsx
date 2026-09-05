import React, { useState, useEffect, useRef } from 'react';

/**
 * TypewriterText - Sophisticated editorial typewriter effect with bidirectional reverse animation.
 * Supports:
 * 1. Forward typing and reverse backspacing through rotating phrases.
 * 2. Reverse erasure animation when scrolled out of the viewport, re-typing when scrolled back in.
 */
export function TypewriterText({
  words,
  text,
  speed = 55,
  deleteSpeed = 30,
  pauseTime = 2200,
  loop = true,
  cursorChar = '|',
  cursorColor = '#c9962c',
  className = '',
  startDelay = 200,
  triggerInView = true,
  reverseOnExit = true, // reverse backspace when scrolling out of viewport
}) {
  const wordList = words && words.length > 0 ? words : (text ? [text] : []);
  const shouldLoop = loop && wordList.length > 1;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInView, setIsInView] = useState(!triggerInView);
  const containerRef = useRef(null);

  // In-view observer with bidirectional detection
  useEffect(() => {
    if (!triggerInView) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
          if (reverseOnExit) {
            setIsDeleting(true);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerInView, reverseOnExit]);

  useEffect(() => {
    if (wordList.length === 0) return;

    const currentTargetWord = wordList[currentWordIndex] || '';

    // If out of view and reverseOnExit is active, erase characters back to empty
    if (!isInView && reverseOnExit) {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, Math.max(15, deleteSpeed * 0.7));
        return () => clearTimeout(timeout);
      }
      return;
    }

    if (!isInView) return;

    let timeout;

    if (!isDeleting && displayText === currentTargetWord) {
      // Completed typing current word
      if (shouldLoop) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else if (isDeleting && displayText === '') {
      // Completed deleting current word, move to next
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % wordList.length);
    } else {
      // Step forward or backward
      const nextCharLength = isDeleting ? displayText.length - 1 : displayText.length + 1;
      const targetDelay = isDeleting ? deleteSpeed : speed;

      timeout = setTimeout(() => {
        setDisplayText(currentTargetWord.slice(0, nextCharLength));
      }, displayText.length === 0 && !isDeleting ? startDelay : targetDelay);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    currentWordIndex,
    isInView,
    reverseOnExit,
    wordList,
    speed,
    deleteSpeed,
    pauseTime,
    shouldLoop,
    startDelay,
  ]);

  return (
    <span ref={containerRef} className={`typewriter-wrapper ${className}`} style={{ display: 'inline-block' }}>
      <span>{displayText}</span>
      <span
        className="typewriter-cursor"
        style={{
          color: cursorColor,
          marginLeft: '2px',
          fontWeight: 300,
          display: 'inline-block',
          animation: 'typewriterBlink 0.9s infinite',
        }}
        aria-hidden="true"
      >
        {cursorChar}
      </span>
      <style>{`
        @keyframes typewriterBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

export default TypewriterText;
