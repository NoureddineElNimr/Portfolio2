/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine"; // ✅ correct import
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine); // load all features
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    // optional: you can use the container
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        background: { color: { value: "#0a0a0a" } },
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
          color: { value: "#00adcc" }, // your portfolio blue
          links: {
            enable: true,
            distance: 150,
            color: "#00adcc",
            opacity: 0.4,
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
          opacity: { value: { min: 0.1, max: 0.5 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
      }}
    />
  );
}
