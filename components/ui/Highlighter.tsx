"use client";

import { useRef, useEffect, useState } from "react";

interface HighlighterProps {
  children: React.ReactNode;
  action?: "highlight" | "underline";
  color?: string;
}

/**
 * Highlighter — animates a highlight or underline on first render.
 * Defaults to the portfolio teal (#00adcc).
 */
export default function Highlighter({
  children,
  action = "highlight",
  color = "#00adcc",
}: HighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (action === "underline") {
    return (
      <span ref={ref} className="relative inline-block">
        {children}
        <span
          className="absolute left-0 bottom-0 h-[3px] rounded-full transition-all duration-700 ease-out"
          style={{
            background: color,
            width: visible ? "100%" : "0%",
            boxShadow: `0 0 8px ${color}`,
            opacity: 0.85,
          }}
        />
      </span>
    );
  }

  // highlight
  return (
    <span ref={ref} className="relative inline whitespace-nowrap">
      <span
        className="absolute inset-0 -mx-1 rounded-sm transition-all duration-700 ease-out"
        style={{
          background: `${color}33`, // ~20% opacity
          boxShadow: `inset 0 0 0 1px ${color}55`,
          borderRadius: "4px",
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
        }}
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
    </span>
  );
}