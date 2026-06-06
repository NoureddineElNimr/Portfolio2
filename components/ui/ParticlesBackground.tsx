/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export const THEME_CHANGE_EVENT = "portfolio-theme-change";

const DARK_BG         = "#0a0a0a";
const LIGHT_BG        = "#f0f4f8";
const DARK_PARTICLE   = "#00adcc";
const LIGHT_PARTICLE  = "#0099bb";

/** Read the saved theme synchronously — no React needed */
function getSavedDark(): boolean {
  if (typeof window === "undefined") return true;
  return (localStorage.getItem("portfolio-theme") ?? "dark") !== "light";
}

function applyColorsToContainer(c: any, dark: boolean) {
  if (!c) return;
  const color = dark ? DARK_PARTICLE : LIGHT_PARTICLE;
  const bg    = dark ? DARK_BG       : LIGHT_BG;

  if (c.canvas?.element) {
    (c.canvas.element as HTMLCanvasElement).style.background = bg;
  }
  try {
    c.options.particles.color.value  = color;
    c.options.particles.links.color  = color;
    c.options.background.color.value = bg;
    c.refresh();
  } catch (_) {
    /* ignore */
  }
}

export default function ParticlesBackground() {
  const containerRef = useRef<any>(null);
  // Read the correct theme right away so every mount starts with the right colors
  const initialDark  = getSavedDark();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    containerRef.current = container;
    // Apply the current theme the moment particles are ready
    applyColorsToContainer(container, getSavedDark());
  }, []);

  // Keep listening for live toggle events
  useEffect(() => {
    const handler = (e: Event) => {
      const dark = (e as CustomEvent<{ dark: boolean }>).detail.dark;
      applyColorsToContainer(containerRef.current, dark);
    };
    window.addEventListener(THEME_CHANGE_EVENT, handler);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handler);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        background: { color: { value: initialDark ? DARK_BG : LIGHT_BG } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            push: { quantity: 4 },
          },
        },
        particles: {
          color: { value: initialDark ? DARK_PARTICLE : LIGHT_PARTICLE },
          links: {
            enable: true,
            distance: 150,
            color: initialDark ? DARK_PARTICLE : LIGHT_PARTICLE,
            opacity: 0.15,
            width: 1,
          },
          collisions: { enable: false },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
          },
          number: { value: 100, density: { enable: true, area: 800 } },
          opacity: { value: { min: 0.05, max: 0.20 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
      }}
    />
  );
}