"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedCard from "@/components/ui/AnimatedCard";
import Highlighter from "@/components/ui/Highlighter";
import OrbitingCircles from "@/components/ui/Orbitingcircles";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import Link from "next/link";
import { useState, useEffect } from "react";

const CATEGORIES = ["All", "Programming", "Tools", "Social"] as const;

function getCategoryCount(cat: string) {
  if (cat === "All") return skills.length;
  return skills.filter((s) => s.categories.includes(cat)).length;
}

// Outer ring: first 7 skills, inner ring: remaining 6
const outerOrbit = skills.slice(0, 7).map(({ id, name, icon, color }) => ({ id, name, icon, color }));
const innerOrbit = skills.slice(7).map(({ id, name, icon, color }) => ({ id, name, icon, color }));

export default function HomeSections() {
  const [category, setCategory] = useState("All");

  // Ambient background animation — throttled to ~20fps (every 3 frames), paused when tab hidden
  useEffect(() => {
    let raf = 0, t = 0, frame = 0;
    const speed = 0.0006;
    function step(now: number) {
      raf = requestAnimationFrame(step);
      if (document.hidden) return; // pause when tab not visible
      if (++frame % 3 !== 0) return; // only update every 3rd frame (~20fps)
      t += (now || 16) * speed * 3; // compensate for skipped frames
      document.documentElement.style.setProperty("--bg-pos-x",   `${50 + Math.cos(t) * 12}%`);
      document.documentElement.style.setProperty("--bg-pos-y",   `${40 + Math.sin(t) * 8}%`);
      document.documentElement.style.setProperty("--bg-pos-x-2", `${20 + Math.cos(t * 0.7) * 18}%`);
      document.documentElement.style.setProperty("--bg-pos-y-2", `${70 + Math.sin(t * 0.9) * 10}%`);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const filtered = category === "All"
    ? skills
    : skills.filter((s) => s.categories.includes(category));

  return (
    <div className="max-w-5xl mx-auto px-6 md:pr-28">

      {/* ══ HERO ══ */}
      <section id="home" className="min-h-screen flex items-center justify-center md:justify-start pt-16 pb-32">
        <div className="max-w-3xl w-full">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[color:var(--primary)] mb-5 opacity-80">
            Noureddine El Nimr
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-[1.06]">
            <span className="fg-gradient">Beautiful</span>{" "}
            <span className="text-white/90">in Form.</span>
            <br />
            <Highlighter action="underline" color="#00adcc">Powerful</Highlighter>
            {" "}<span className="text-white/90">in Function.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 mb-10 max-w-2xl leading-relaxed">
            I build{" "}
            <Highlighter action="highlight" color="#00adcc">full-stack web applications</Highlighter>
            {" "}— clean, scalable, and designed to solve real problems.
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href="#about">About me</MagneticButton>
            <MagneticButton href="#projects" variant="project">View Projects →</MagneticButton>
          </div>
        </div>
      </section>

      {/* ══ ABOUT + WHAT I BUILD ══ */}
      <section id="about" className="min-h-screen flex flex-col justify-center py-32 gap-16">
        <div>
          <div className="section-divider" />
          <AnimatedCard>
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 rounded-full bg-[color:var(--primary)] opacity-15 blur-2xl scale-125" />
                <img
                  src="/profile/profile.png"
                  alt="Noureddine El Nimr"
                  className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-[rgba(0,173,204,0.35)] shadow-[0_0_30px_rgba(0,173,204,0.22)]"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-[color:var(--secondary-100)]">
                  About{" "}
                  <Highlighter action="underline" color="#00adcc">me</Highlighter>
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
                  You&apos;re looking at someone who doesn&apos;t just write code — he experiments, builds, breaks,
                  and rebuilds until things feel right. Final-year Applied Computer Science student at{" "}
                  <Highlighter action="highlight" color="#00adcc">Thomas More, Geel</Highlighter>
                  , driven by a love for C#, .NET, and building things that actually work.
                </p>
                <Link href="/pages/cv">
                  <MagneticButton>Check out my CV</MagneticButton>
                </Link>
              </div>
            </div>
          </AnimatedCard>
        </div>

        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-[color:var(--secondary-100)]">What I Build</h3>
            <p className="text-white/45 max-w-md mx-auto text-base">
              From concept to deployment — turning ideas into working software.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Web Design & UI/UX",     desc: "Clean, intuitive interfaces built around real user needs.", accent: "Design" },
              { title: "Full-Stack Development", desc: "End-to-end apps with .NET, Angular, React and PHP.",       accent: "Code"   },
              { title: "Performance & SEO",       desc: "Speed-focused, SEO-ready builds that get found.",         accent: "Speed"  },
            ].map(({ title, desc, accent }) => (
              <AnimatedCard key={title}>
                <div className="flex flex-col gap-3 h-full">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--primary)] opacity-70">{accent}</span>
                  <h4 className="font-bold text-[color:var(--secondary-100)] text-lg">{title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="tech-skills" className="min-h-screen flex flex-col justify-center py-32">
        <div className="section-divider" />
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-[color:var(--secondary-100)]">Skills</h3>
          <p className="text-white/45 max-w-xs mx-auto text-sm">Technologies and tools I work with every day.</p>
        </div>

        {/* Two-column: left = filters + grid, right = orbiting circles */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Left column ── */}
          <div className="flex-1 min-w-0">
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`skill-filter-pill ${category === c ? "active" : ""}`}
                >
                  {c}
                  <span className="ml-1.5 text-xs font-bold opacity-60">{getCategoryCount(c)}</span>
                </button>
              ))}
            </div>

            {/* Skills grid — pure CSS transitions, no Framer layout measuring */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((skill) => {
                const visible = category === "All" || skill.categories.includes(category);
                return (
                  <div
                    key={skill.id}
                    className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-default overflow-hidden"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
                      transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(4px)",
                      opacity: visible ? 1 : 0,
                      pointerEvents: visible ? "auto" : "none",
                      transition: "opacity 200ms ease, transform 200ms ease",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}22, transparent 70%)`, boxShadow: `0 0 0 1px ${skill.color}44` }}
                    />
                    <div
                      className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: skill.color }}
                    >
                      <img src={skill.icon} alt={skill.name} className="w-6 h-6" style={{ filter: "invert(1)" }} loading="lazy" />
                    </div>
                    <span className="relative text-xs font-semibold text-center leading-tight" style={{ color: "var(--secondary-100)" }}>
                      {skill.name}
                    </span>
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full w-0 group-hover:w-3/4 transition-all duration-300"
                      style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right column: orbiting circles (desktop only) ── */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0 self-center">
            <OrbitingCircles
              outerItems={outerOrbit}
              innerItems={innerOrbit}
              size={340}
            />
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="min-h-screen flex flex-col justify-center py-32 pb-40">
        <div className="section-divider" />
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-[color:var(--secondary-100)]">Projects</h3>
          <p className="text-white/45 max-w-md mx-auto text-base">
            A selection of real projects — each one a different challenge, a different lesson.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <AnimatedCard key={project.id}>
              <article className="flex flex-col h-full gap-4">
                <div className="overflow-hidden rounded-xl -mx-2 -mt-2">
                  <img src={project.image} alt={project.title}
                    className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.split(",").map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide"
                      style={{ background: "rgba(0,173,204,0.10)", color: "rgba(0,200,230,0.9)", border: "1px solid rgba(0,173,204,0.20)" }}>
                      {t.trim()}
                    </span>
                  ))}
                </div>
                <h4 className="font-bold text-[color:var(--secondary-100)] text-lg leading-snug">{project.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{project.description}</p>
                <div className="pt-1">
                  <MagneticButton href={`/projects/${project.id}`}>View Project</MagneticButton>
                </div>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </section>

    </div>
  );
}