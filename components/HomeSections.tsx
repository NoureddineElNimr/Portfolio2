"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedCard from "@/components/ui/AnimatedCard";
import Highlighter from "@/components/ui/Highlighter";
import { projects } from "@/data/projects";
import { skills, type Skill } from "@/data/skills";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface BubblePosition { left: number; top: number; }

function chunkArray<T>(arr: T[], size: number): T[][] {
  const cols: T[][] = [];
  for (let i = 0; i < arr.length; i += size) cols.push(arr.slice(i, i + size));
  return cols;
}
function clampPercent(val: string, min = 8, max = 92): string {
  const n = Number(String(val).replace("%", ""));
  if (Number.isNaN(n)) return "10%";
  return Math.min(max, Math.max(min, n)) + "%";
}

export default function HomeSections() {
  const [category, setCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [computedPos, setComputedPos] = useState<Record<string, BubblePosition>>({});

  useEffect(() => {
    const resolve = () => {
      const cont = containerRef.current;
      if (!cont) return;
      const { width: W, height: H } = cont.getBoundingClientRect();
      const minDist = 60;
      const nodes = skills.map((s) => ({
        id: s.id,
        x: (Number(String(s.bubble.left).replace("%","")) / 100) * W,
        y: (Number(String(s.bubble.top).replace("%",""))  / 100) * H,
      }));
      for (let it = 0; it < 200; it++) {
        let moved = false;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            let dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx*dx + dy*dy) || 0.001;
            if (dist < minDist) {
              const o = (minDist - dist) / 2;
              dx /= dist; dy /= dist;
              a.x -= dx*o; a.y -= dy*o;
              b.x += dx*o; b.y += dy*o;
              moved = true;
            }
          }
        }
        for (const n of nodes) {
          const m = 30;
          const nx = Math.max(m, Math.min(W-m, n.x));
          const ny = Math.max(m, Math.min(H-m, n.y));
          if (nx !== n.x || ny !== n.y) moved = true;
          n.x = nx; n.y = ny;
        }
        if (!moved) break;
      }
      const map: Record<string, BubblePosition> = {};
      for (const n of nodes) map[n.id] = { left: n.x, top: n.y };
      setComputedPos(map);
    };
    resolve();
    window.addEventListener("resize", resolve);
    return () => window.removeEventListener("resize", resolve);
  }, []);

  useEffect(() => {
    let raf = 0, t = 0;
    const speed = 0.0006;
    function step(now: number) {
      t += (now || 16) * speed;
      document.documentElement.style.setProperty("--bg-pos-x",   `${50 + Math.cos(t) * 12}%`);
      document.documentElement.style.setProperty("--bg-pos-y",   `${40 + Math.sin(t) * 8}%`);
      document.documentElement.style.setProperty("--bg-pos-x-2", `${20 + Math.cos(t*0.7)*18}%`);
      document.documentElement.style.setProperty("--bg-pos-y-2", `${70 + Math.sin(t*0.9)*10}%`);
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

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

        {/* About card */}
        <div>
          <div className="section-divider" />
          <AnimatedCard>
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 rounded-full bg-[color:var(--primary)] opacity-15 blur-2xl scale-125" />
                <img
                  src="/profile.jpg"
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

        {/* What I Build */}
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
              { title: "Full-Stack Development", desc: "End-to-end apps with .NET, Angular, React and PHP.", accent: "Code" },
              { title: "Performance & SEO",       desc: "Speed-focused, SEO-ready builds that get found.", accent: "Speed" },
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

        <div className="glass skills-card p-6 md:p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="hidden md:flex gap-2">
              {["All","Programming","Tools","Social"].map((c) => (
                <button key={c} className={`btn-skill ${category===c?"active":""}`} onClick={()=>setCategory(c)} aria-pressed={category===c}>{c}</button>
              ))}
            </div>
            <div className="md:hidden w-full">
              <select className="select-skill text-sm w-full" value={category} onChange={(e)=>setCategory(e.target.value)}>
                {["All","Programming","Tools","Social"].map((c)=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 flex-1">
            <div className="skills-list w-full md:w-1/3 overflow-hidden">
              <div className="flex gap-3 h-full overflow-y-auto pr-1">
                {chunkArray(skills, 8).map((col: Skill[], i: number) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    {col.map((s: Skill) => {
                      const visible = category==="All" || s.categories.includes(category);
                      return (
                        <div key={s.id} aria-hidden={!visible}
                          className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-200 ${visible?"hover:bg-white/[0.05]":"dimmed pointer-events-none"}`}>
                          <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center shadow" style={{background:s.color}}>
                            <img src={s.icon} alt={s.name} className="w-3.5 h-3.5" style={{filter:"invert(1)"}} />
                          </span>
                          <span className="text-white/70 text-sm font-medium">{s.name}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative hidden md:block min-h-[300px]">
              <div ref={containerRef} className="w-full h-full absolute inset-0 rounded-xl overflow-hidden" style={{background:"rgba(0,0,0,0.2)"}}>
                {skills.filter(s=>category==="All"||s.categories.includes(category)).map((s)=>{
                  const computed = computedPos[s.id];
                  return (
                    <div key={s.id} className="skill-bubble absolute" style={{
                      left: computed ? `${Math.round(computed.left)}px` : clampPercent(s.bubble.left),
                      top:  computed ? `${Math.round(computed.top)}px`  : clampPercent(s.bubble.top),
                    }}>
                      <div className="bubble-dot w-11 h-11 rounded-full flex items-center justify-center"
                        style={{background:s.color, animationDuration:`${(s.bubble.duration||12)*1.25}s`, animationDelay:`${s.bubble.delay||0}s`}}>
                        <img src={s.icon} alt={s.name} className="w-5 h-5" style={{filter:"invert(1)"}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
                      style={{background:"rgba(0,173,204,0.10)", color:"rgba(0,200,230,0.9)", border:"1px solid rgba(0,173,204,0.20)"}}>
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