"use client";

import { useRef, useCallback } from "react";
import ShineBorder from "@/components/ui/Shineborder";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagicCard({ children, className = "" }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
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
      <ShineBorder duration={6} borderWidth={1.5} />
      <div className="magic-card-content">
        {children}
      </div>
    </div>
  );
}