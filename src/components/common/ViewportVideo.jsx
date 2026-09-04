import React, { useRef, useEffect } from 'react';

export function ViewportVideo({
  src,
  className = '',
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  autoPlay = false,
  isTop = undefined, // boolean when used in stacked cards, undefined for regular gallery
  threshold = 0.15,
  preload = 'auto',
  ...props
}) {
  const videoRef = useRef(null);
  const isInViewportRef = useRef(false);

  // IntersectionObserver for viewport auto play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewportRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // If in card stack, only play if on top
          if (isTop === undefined || isTop === true) {
            video.muted = true;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          }
        } else {
          video.pause();
        }
      },
      {
        threshold,
        rootMargin: '100px 0px 100px 0px'
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [threshold, isTop, src]);

  // Immediately react when card comes on top in the stack
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isTop === true) {
      video.muted = true;
      try {
        video.currentTime = 0;
      } catch (e) {}
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else if (isTop === false) {
      video.pause();
    }
  }, [isTop, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      autoPlay={autoPlay || isTop === true}
      controls={controls}
      preload={preload}
      className={className}
      {...props}
    />
  );
}

export default ViewportVideo;
