import React, { useEffect, useRef, useCallback, memo } from 'react';
import gsap from 'gsap';

/**
 * HeroObject — The Interactive 3D CSS Cube
 *
 * Uses CSS preserve-3d perspective cube with:
 * - Warm concrete textured faces via CSS gradients
 * - Gold glowing edge strips (bottom + right of front face)
 * - Embossed AAR VISUALS logo text on front face
 * - Ambient shadow underneath
 * - Floating spheres surrounding the cube
 * - Thin orbital rings in perspective
 *
 * Mouse interaction: spring-damped rotation and translation
 * driven by the parent container's mouse tracking.
 */

// Spring physics interpolation
function lerp(a, b, t) {
  return a + (b - a) * t;
}

const HeroObject = memo(({ mouseX, mouseY }) => {
  const stageRef = useRef(null);
  const cubeRef = useRef(null);
  const shadowRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const sphereBlackRef = useRef(null);
  const sphereWhiteRef = useRef(null);
  const sphereGoldRef = useRef(null);
  const sphereDarkRef = useRef(null);
  const sphereBlackSmRef = useRef(null);
  const sphereGoldSmRef = useRef(null);

  // Internal spring state
  const spring = useRef({
    rotX: 18,
    rotY: -28,
    rotXVel: 0,
    rotYVel: 0,
    translateX: 0,
    translateY: 0,
    txVel: 0,
    tyVel: 0,
    floatY: 0,
    floatPhase: 0,
    ringRot: 0,
    ring2Rot: 0,
    ring3Rot: 0
  });

  const rafRef = useRef(null);
  const isVisible = useRef(true);

  // Handle page visibility to pause on hidden tab
  useEffect(() => {
    const handleVisibility = () => {
      isVisible.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Main RAF animation loop
  const animate = useCallback(() => {
    if (!isVisible.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const s = spring.current;

    // Target rotation from mouse (-8 to 8 degrees)
    const targetRotX = 18 - mouseY.current * 8;
    const targetRotY = -28 + mouseX.current * 10;

    // Target translation from mouse
    const targetTX = mouseX.current * 12;
    const targetTY = mouseY.current * 8;

    // Spring physics for rotation
    const stiffness = 0.07;
    const damping = 0.75;

    s.rotXVel = s.rotXVel * damping + (targetRotX - s.rotX) * stiffness;
    s.rotYVel = s.rotYVel * damping + (targetRotY - s.rotY) * stiffness;
    s.rotX += s.rotXVel;
    s.rotY += s.rotYVel;

    // Spring physics for translation
    s.txVel = s.txVel * damping + (targetTX - s.translateX) * stiffness;
    s.tyVel = s.tyVel * damping + (targetTY - s.translateY) * stiffness;
    s.translateX += s.txVel;
    s.translateY += s.tyVel;

    // Continuous floating animation
    s.floatPhase += 0.008;
    s.floatY = Math.sin(s.floatPhase) * 8;

    // Orbital ring rotation
    s.ringRot += 0.12;
    s.ring2Rot -= 0.07;
    s.ring3Rot += 0.09;

    // Apply to cube
    if (cubeRef.current) {
      cubeRef.current.style.transform = `rotateX(${s.rotX}deg) rotateY(${s.rotY}deg)`;
    }

    if (stageRef.current) {
      stageRef.current.style.transform = `translate3d(${s.translateX}px, ${s.translateY + s.floatY}px, 0)`;
    }

    // Shadow shifts with cube tilt
    if (shadowRef.current) {
      const shadowX = (s.rotY - (-28)) * 0.5;
      const shadowScale = 1 - Math.abs(s.floatY) * 0.004;
      shadowRef.current.style.transform = `translateX(calc(-50% + ${shadowX}px)) scaleX(${shadowScale})`;
      shadowRef.current.style.opacity = 0.7 + s.floatY * 0.01;
    }

    // Orbital rings — slightly different parallax
    if (ring1Ref.current) {
      ring1Ref.current.style.transform = `rotateX(72deg) rotateZ(${s.ringRot}deg) translate3d(${mouseX.current * -4}px, ${mouseY.current * -3}px, 0)`;
    }
    if (ring2Ref.current) {
      ring2Ref.current.style.transform = `rotateX(72deg) rotateZ(${s.ring2Rot + 30}deg) translate3d(${mouseX.current * -6}px, ${mouseY.current * -4}px, 0)`;
    }
    if (ring3Ref.current) {
      ring3Ref.current.style.transform = `rotateX(65deg) rotateZ(${s.ring3Rot - 20}deg) translate3d(${mouseX.current * -3}px, ${mouseY.current * -2}px, 0)`;
    }

    // Spheres — each at slightly different depth / parallax
    if (sphereBlackRef.current) {
      const sx = Math.sin(s.floatPhase * 0.7 + 1) * 4;
      const sy = Math.cos(s.floatPhase * 0.7 + 1) * 5;
      sphereBlackRef.current.style.transform = `translate3d(${sx + mouseX.current * -10}px, ${sy + mouseY.current * -8}px, 0)`;
    }
    if (sphereWhiteRef.current) {
      const sx = Math.sin(s.floatPhase * 0.5 + 2) * 6;
      const sy = Math.cos(s.floatPhase * 0.5 + 2) * 4;
      sphereWhiteRef.current.style.transform = `translate3d(${sx + mouseX.current * -8}px, ${sy + mouseY.current * -6}px, 0)`;
    }
    if (sphereGoldRef.current) {
      const sx = Math.sin(s.floatPhase * 0.9 + 3) * 3;
      const sy = Math.cos(s.floatPhase * 0.9 + 3) * 6;
      sphereGoldRef.current.style.transform = `translate3d(${sx + mouseX.current * -14}px, ${sy + mouseY.current * -10}px, 0)`;
    }
    if (sphereDarkRef.current) {
      const sx = Math.sin(s.floatPhase * 0.6 + 4) * 5;
      const sy = Math.cos(s.floatPhase * 0.6 + 4) * 3;
      sphereDarkRef.current.style.transform = `translate3d(${sx + mouseX.current * -6}px, ${sy + mouseY.current * -5}px, 0)`;
    }
    if (sphereBlackSmRef.current) {
      const sx = Math.sin(s.floatPhase * 0.8 + 5) * 4;
      const sy = Math.cos(s.floatPhase * 0.8 + 5) * 7;
      sphereBlackSmRef.current.style.transform = `translate3d(${sx + mouseX.current * -12}px, ${sy + mouseY.current * -9}px, 0)`;
    }
    if (sphereGoldSmRef.current) {
      const sx = Math.sin(s.floatPhase * 1.1 + 6) * 5;
      const sy = Math.cos(s.floatPhase * 1.1 + 6) * 4;
      sphereGoldSmRef.current.style.transform = `translate3d(${sx + mouseX.current * -18}px, ${sy + mouseY.current * -14}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [mouseX, mouseY]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    // NO perspective here — .hero-center (CSS) owns the single perspective source
    <div className="hero-object-stage" ref={stageRef}>
      {/* Orbital Rings */}
      <div className="orbital-ring orbital-ring--1" ref={ring1Ref} />
      <div className="orbital-ring orbital-ring--2" ref={ring2Ref} />
      <div className="orbital-ring orbital-ring--3" ref={ring3Ref} />

      {/* Floating Spheres */}
      <div className="sphere sphere--black" ref={sphereBlackRef} />
      <div className="sphere sphere--white" ref={sphereWhiteRef} />
      <div className="sphere sphere--gold" ref={sphereGoldRef} />
      <div className="sphere sphere--darkgrey" ref={sphereDarkRef} />
      <div className="sphere sphere--black-sm" ref={sphereBlackSmRef} />
      <div className="sphere sphere--gold-sm" ref={sphereGoldSmRef} />

      {/* 3D CSS Cube */}
      <div className="cube-wrapper" style={{ perspectiveOrigin: '50% 50%' }}>
        <div className="cube" ref={cubeRef}>
          {/* Front Face */}
          <div className="cube__face cube__face--front">
            {/* Concrete texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.01) 3px, rgba(0,0,0,0.01) 6px)
              `,
              opacity: 0.8
            }} />
            {/* Engraved AAR Logo */}
            <div className="cube__logo">
              <span className="cube__logo-aar">AAR</span>
              <span className="cube__logo-visuals">VISUALS</span>
            </div>
            {/* Gold Edge Strips */}
            <div className="cube__gold-edge-bottom" />
            <div className="cube__gold-edge-right" />
          </div>

          {/* Top Face */}
          <div className="cube__face cube__face--top" />

          {/* Right Face */}
          <div className="cube__face cube__face--right">
            {/* Gold edge on right face left edge */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '5px',
              background: 'linear-gradient(180deg, #8a6010 0%, #f5d06a 30%, #c9962c 60%, #f5af19 80%, #c9962c 100%)',
              boxShadow: '0 0 12px 2px rgba(245,175,25,0.35)'
            }} />
          </div>

          {/* Left Face */}
          <div className="cube__face cube__face--left" />

          {/* Back Face */}
          <div className="cube__face cube__face--back" />

          {/* Bottom Face */}
          <div className="cube__face cube__face--bottom" />
        </div>
      </div>

      {/* Ambient Shadow */}
      <div className="cube-shadow" ref={shadowRef} />
    </div>
  );
});

HeroObject.displayName = 'HeroObject';
export default HeroObject;
