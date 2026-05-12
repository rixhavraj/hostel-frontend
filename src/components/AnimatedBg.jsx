/* AnimatedBg.jsx — Pure CSS animated background canvas */
import { useEffect, useRef } from "react";

/* Generates floating particles with CSS */
export default function AnimatedBg() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const PARTICLE_COUNT = 40;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement("span");
      const size = Math.random() * 4 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 20;
      const opacity = Math.random() * 0.5 + 0.1;

      p.className = "particle";
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        opacity: 0;
        background: ${
          Math.random() > 0.5
            ? `rgba(129,140,248,${opacity})`
            : `rgba(236,72,153,${opacity})`
        };
      `;
      container.appendChild(p);
      particles.push(p);
    }

    return () => particles.forEach((p) => p.remove());
  }, []);

  return (
    <>
      {/* Moving grid */}
      <div className="grid-overlay" aria-hidden="true" />

      {/* Animated gradient orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* Particle container */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true" />
    </>
  );
}
