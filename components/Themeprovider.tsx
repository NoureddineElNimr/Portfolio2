"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { THEME_CHANGE_EVENT } from "@/components/ui/ParticlesBackground";

interface ThemeCtx { dark: boolean; toggle: () => void; }

const Ctx = createContext<ThemeCtx>({ dark: true, toggle: () => {} });
export const useTheme = () => useContext(Ctx);

const STORAGE_KEY = "portfolio-theme";

export function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.setAttribute("data-theme", dark ? "dark" : "light");

  if (dark) {
    root.style.setProperty("--background",    "#080808");
    root.style.setProperty("--foreground",    "#ededed");
    root.style.setProperty("--card-bg",       "rgba(12,12,16,0.75)");
    root.style.setProperty("--secondary-100", "#e2e2e2");
    root.style.setProperty("--secondary-700", "rgba(6,6,6,0.7)");
    document.body.style.background = "#080808";
    document.body.style.color      = "#ededed";
  } else {
    root.style.setProperty("--background",    "#e8f4f8");
    root.style.setProperty("--foreground",    "#7dd3fc");
    root.style.setProperty("--card-bg",       "rgba(224,242,254,0.85)");
    root.style.setProperty("--secondary-100", "#0369a1");
    root.style.setProperty("--secondary-700", "rgba(224,242,254,0.85)");
    document.body.style.background = "#e8f4f8";
    document.body.style.color      = "#7dd3fc";
  }

  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { dark } }));
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start as `true` — matches the server render, no hydration mismatch.
  // useEffect then reads localStorage and corrects it on the client after hydration.
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // Read saved preference after hydration and apply it
    const saved = localStorage.getItem(STORAGE_KEY);
    const isDark = saved !== "light"; // default to dark if not set
    setDark(isDark);
    applyTheme(isDark);
  }, []); // runs once after mount — safe, no SSR mismatch

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      applyTheme(next);
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ dark, toggle }}>{children}</Ctx.Provider>;
}