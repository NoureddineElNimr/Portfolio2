"use client";

import { useEffect, useRef } from "react";

export default function SmoothCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // All mutable state lives in refs — zero re-renders
  const dotPos  = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const target  = useRef({ x: -100, y: -100 });
  const prevDot = useRef({ x: -100, y: -100 });
  const angle   = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let raf: number;

    const tick = () => {
      dotPos.current.x = lerp(dotPos.current.x, target.current.x, 0.18);
      dotPos.current.y = lerp(dotPos.current.y, target.current.y, 0.18);

      const dx = dotPos.current.x - prevDot.current.x;
      const dy = dotPos.current.y - prevDot.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 0.5) angle.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

      const scaleX = Math.max(0.5, 1 - speed * 0.025);
      const scaleY = Math.min(1.6, 1 + speed * 0.025);

      // Ring lerps toward dot using its own ref — no regex parsing
      ringPos.current.x = lerp(ringPos.current.x, dotPos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, dotPos.current.y, 0.12);

      if (dotRef.current)
        dotRef.current.style.transform = `translate(${dotPos.current.x}px,${dotPos.current.y}px) rotate(${angle.current}deg) scale(${scaleX},${scaleY})`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringPos.current.x}px,${ringPos.current.y}px)`;

      prevDot.current.x = dotPos.current.x;
      prevDot.current.y = dotPos.current.y;
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
      <div ref={ringRef} className="smooth-cursor-ring" />
      <div ref={dotRef}  className="smooth-cursor-dot"  />
    </div>
  );
}