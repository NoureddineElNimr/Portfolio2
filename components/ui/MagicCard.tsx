"use client";

import { useRef, useCallback } from "react";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MagicCard — mouse-tracked spotlight effect.
 * A radial gradient follows your cursor across the card surface,
 * lighting up the border and background from within.
 * Colour palette: --primary (#00adcc) teal glow.
 */
export default function MagicCard({ children, className = "" }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    // Reset to center so glow fades gracefully
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${rect.width / 2}px`);
    card.style.setProperty("--mouse-y", `${rect.height / 2}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magic-card ${className}`}
    >
      {/* Spotlight layer — rendered behind content via z-index */}
      <div className="magic-card-spotlight" aria-hidden="true" />
      {/* Actual card content */}
      <div className="magic-card-content">
        {children}
      </div>
    </div>
  );
}