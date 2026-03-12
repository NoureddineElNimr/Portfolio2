"use client";

import { useEffect, useRef } from "react";

/**
 * SmoothCursor — a teal teardrop cursor that lags behind the real mouse
 * with lerp (linear interpolation) for a liquid feel.
 * Only renders on desktop (hidden on touch devices).
 */
export default function SmoothCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -100, y: -100 });
  const target  = useRef({ x: -100, y: -100 });
  const angle   = useRef(0);
  const prev    = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Dot follows cursor tightly
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18);

      const dx = pos.current.x - prev.current.x;
      const dy = pos.current.y - prev.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 0.5) {
        angle.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      }

      // Squish/stretch based on speed
      const scaleX = Math.max(0.5, 1 - speed * 0.025);
      const scaleY = Math.min(1.6, 1 + speed * 0.025);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${angle.current}deg) scale(${scaleX}, ${scaleY})`;
      }

      // Ring lags further behind
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${lerp(
            parseFloat(ringRef.current.style.transform?.match(/translate\(([^,]+)/)?.[1] ?? String(pos.current.x)) || pos.current.x,
            pos.current.x, 0.12
          )}px, ${lerp(
            parseFloat(ringRef.current.style.transform?.match(/,\s*([^)]+)/)?.[1] ?? String(pos.current.y)) || pos.current.y,
            pos.current.y, 0.12
          )}px)`;
      }

      prev.current = { ...pos.current };
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="smooth-cursor-root" aria-hidden="true">
      {/* Trailing ring */}
      <div ref={ringRef} className="smooth-cursor-ring" />
      {/* Main teardrop dot */}
      <div ref={dotRef} className="smooth-cursor-dot" />
    </div>
  );
}