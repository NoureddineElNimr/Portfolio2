/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

const imgRectangle35 = "https://www.figma.com/api/mcp/asset/08a79da4-747a-47a8-9ee7-89499214abdd";
const imgSkillReact = "https://www.figma.com/api/mcp/asset/96327f6e-803c-4548-8e32-5f0edf3a33b5";
const imgSkillTailwind = "https://www.figma.com/api/mcp/asset/67235ebc-9ace-4598-aeab-ef0787ca01b9";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { projects } from '@/data/projects';
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function HomeSections() {
  const [category, setCategory] = useState('All');

    const skills = [
    { id: 'dotnet', name: '.NET', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/dotnet.svg', color: '#6C2DA8', categories: ['Programming'], bubble: { left: '15%', top: '20%', duration: 9, delay: 0 } },
    { id: 'csharp', name: 'C#', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/csharp.svg', color: '#C2C9E4', categories: ['Programming'], bubble: { left: '34%', top: '43%', duration: 10, delay: 0.8 } },
    { id: 'python', name: 'Python', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/python.svg', color: '#3776AB', categories: ['Programming'], bubble: { left: '53%', top: '66%', duration: 11, delay: 1.6 } },
    { id: 'react', name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/react.svg', color: '#61DAFB', categories: ['Programming','Tools'], bubble: { left: '72%', top: '29%', duration: 9.5, delay: 0.4 } },
    { id: 'html5', name: 'HTML5', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/html5.svg', color: '#E34F26', categories: ['Programming'], bubble: { left: '84%', top: '33%', duration: 12, delay: 1.2 } },
    { id: 'php', name: 'PHP', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/php.svg', color: '#777BB4', categories: ['Programming'], bubble: { left: '78%', top: '61%', duration: 11.5, delay: 0.6 } },
    { id: 'java', name: 'Java', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/java.svg', color: '#007396', categories: ['Programming'], bubble: { left: '21%', top: '52%', duration: 10.5, delay: 0.9 } },
    { id: 'mysql', name: 'MySQL', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/mysql.svg', color: '#00758F', categories: ['Tools','Programming'], bubble: { left: '33%', top: '56%', duration: 12.5, delay: 0.2 } },
    { id: 'git', name: 'Git', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/git.svg', color: '#F05032', categories: ['Tools'], bubble: { left: '46%', top: '47%', duration: 9.8, delay: 1.9 } },
    { id: 'flutter', name: 'Flutter', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/flutter.svg', color: '#02569B', categories: ['Tools'], bubble: { left: '40%', top: '75%', duration: 11.8, delay: 2.4 } },
    // Soft skills (displayed under 'Social')
    { id: 'soft-social', name: 'Social', icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f465.png', color: '#2D6A8F', categories: ['Social'], bubble: { left: '20%', top: '18%', duration: 10, delay: 0.2 } },
    { id: 'soft-team', name: 'Team-driven', icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f91d.png', color: '#2B7A6B', categories: ['Social'], bubble: { left: '50%', top: '12%', duration: 11, delay: 0.8 } },
    { id: 'soft-stress', name: 'Good under stress', icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4aa.png', color: '#6A3D9A', categories: ['Social'], bubble: { left: '80%', top: '20%', duration: 10.5, delay: 0.4 } },
  ];

  // Helper: split an array into columns of max `size`
  const chunkArray = (arr: any[], size: number) => {
    const cols = [] as any[];
    for (let i = 0; i < arr.length; i += size) cols.push(arr.slice(i, i + size));
    return cols;
  };

  // Helper: clamp bubble positions so they never leave the container (clamp center percent)
  const clampPercent = (val: string, min = 8, max = 92) => {
    if (!val) return '10%';
    const n = Number(String(val).replace('%', ''));
    if (Number.isNaN(n)) return '10%';
    return Math.min(max, Math.max(min, n)) + '%';
  };

  // refs + state for collision avoidance
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [computedPos, setComputedPos] = useState<Record<string, {left: number; top: number}>>({});

  // Collision resolution: run after mount and on resize
  useEffect(() => {
    const resolve = () => {
      const cont = containerRef.current;
      if (!cont) return;
      const rect = cont.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const minDist = 56; // px between centers

      // prepare nodes with initial positions (px)
      const nodes = skills.map(s => {
        const leftPct = Number(String(s.bubble.left).replace('%','')) || 10;
        const topPct = Number(String(s.bubble.top).replace('%','')) || 10;
        return {
          id: s.id,
          x: (leftPct/100) * W,
          y: (topPct/100) * H,
        };
      });

      // simple iterative repulsion
      const maxIter = 200;
      for (let it = 0; it < maxIter; it++) {
        let moved = false;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i+1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            // eslint-disable-next-line prefer-const
            let dist = Math.sqrt(dx*dx + dy*dy) || 0.001;
            if (dist < minDist) {
              const overlap = (minDist - dist) / 2;
              // normalize
              dx /= dist; dy /= dist;
              a.x -= dx * overlap;
              a.y -= dy * overlap;
              b.x += dx * overlap;
              b.y += dy * overlap;
              moved = true;
            }
          }
        }
        // clamp to container with margin
        for (const n of nodes) {
          const margin = 28; // half bubble size
          const nx = Math.max(margin, Math.min(W - margin, n.x));
          const ny = Math.max(margin, Math.min(H - margin, n.y));
          if (nx !== n.x || ny !== n.y) moved = true;
          n.x = nx; n.y = ny;
        }
        if (!moved) break;
      }

      const map: Record<string,{left:number;top:number}> = {};
      for (const n of nodes) map[n.id] = { left: n.x, top: n.y };
      setComputedPos(map);
    };

    resolve();
    const onResize = () => resolve();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [skills]);

  // Ambient background motion: animate CSS variables in a circular path
  useEffect(() => {
    let raf = 0;
    let t = 0;
    const speed = 0.0008; // radians per ms
    const radiusX = 12; // percent offset
    const radiusY = 8;
    const radiusX2 = 18;
    const radiusY2 = 10;
    const startX = 50;
    const startY = 40;
    const startX2 = 20;
    const startY2 = 70;

    function step(now: number) {
      t += now ? now * speed : 16 * speed;
      const angle = t;
      const x = startX + Math.cos(angle) * radiusX;
      const y = startY + Math.sin(angle) * radiusY;
      const x2 = startX2 + Math.cos(angle * 0.7) * radiusX2;
      const y2 = startY2 + Math.sin(angle * 0.9) * radiusY2;
      document.documentElement.style.setProperty('--bg-pos-x', `${x}%`);
      document.documentElement.style.setProperty('--bg-pos-y', `${y}%`);
      document.documentElement.style.setProperty('--bg-pos-x-2', `${x2}%`);
      document.documentElement.style.setProperty('--bg-pos-y-2', `${y2}%`);
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <section className="min-h-screen flex items-center" id="home">
        <div className="max-w-3xl mx-auto pt-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 fg-gradient">Beautiful in Form.<br/>Powerful in Function.</h1>
          <p className="text-xl text-gray-300 mb-6">I craft Webflow sites built for storytelling, growth, and real-world conversions.</p>
          <div className="flex gap-4">
            <MagneticButton href="#about">
                About me
            </MagneticButton>
            <MagneticButton href="/project" variant="project">
                View Project →
            </MagneticButton>
          </div>
        </div>
      </section>
        
      

      {/* About */}
      <section className="min-h-screen flex items-center justify-center" id="about">
        <AnimatedCard>
          <div className="flex flex-col md:flex-row items-center gap-12 p-8  rounded-lg">
            
            {/* Profile Image */}
            <img src={imgRectangle35} alt="profile" className="w-48 h-48 rounded-full object-cover" />

            {/* About Text */}
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold mb-2 text-[color:var(--secondary-100)]">About me</h2>
              <p className="text-gray-300 text-base">
                You’re looking at someone who doesn’t just write code. He experiments, builds, breaks, and rebuilds until things feel right. Noureddine El Nimr is entering his final year at Thomas More in Geel, driven by a love for C#, C++, and creating small games. He works best with people around him, asking questions, sharing ideas, and learning from every challenge.
              </p>
              <div className="mt-4">
                <Link href="/pages/cv">
                  <MagneticButton>
                    Check out my CV
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>


      {/* What I Build */}
      <section className="min-h-screen flex flex-col">
        <div className="pt-20 w-full">
          <div className="max-w-3xl text-center mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-2 text-[color:var(--secondary-100)]">What I Build</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">What starts as an idea becomes a clean, scalable website, designed thoughtfully and built to endure.</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-6 auto-rows-fr">
            <div className="h-full">
            <AnimatedCard >
            <div className="h-full p-8 flex flex-col">
                <h4 className="font-bold text-[color:var(--secondary-100)] text-lg">
                Web Design & UI/UX
                </h4>
                <p className="text-base text-[color:var(--secondary-100)] flex-1">
                Clean, intuitive interfaces designed to convert.
                </p>
            </div>
            </AnimatedCard>
            </div>

            <div className="h-full">
            <AnimatedCard >
            <div className="h-full p-8 flex flex-col">
                <h4 className="font-bold text-[color:var(--secondary-100)] text-lg">
                Webflow Development
                </h4>
                <p className="text-base text-[color:var(--secondary-100)] flex-1">
                High-performance Webflow sites built with scalable structure.
                </p>
            </div>
            </AnimatedCard>
            </div>

            <div className="h-full">
            <AnimatedCard>
            <div className="h-full p-8 flex flex-col">
                <h4 className="font-bold text-[color:var(--secondary-100)] text-lg">
                Performance & Optimization
                </h4>
                <p className="text-base text-[color:var(--secondary-100)] flex-1">
                Speed-focused, SEO-ready builds optimized for discoverability.
                </p>
            </div>
            </AnimatedCard>
            </div>
        </div>
        </div>

      </section>

      {/* Skills card - list + bubble layout */}
      <section id="tech-skills" className="flex items-center justify-center min-h-screen" style={{height: '520px'}}>
        <div className="w-full max-w-6xl px-4">
          <div className="skills-card bg-[color:var(--secondary-900)]/60 glass p-6 rounded-lg h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-none">
              <h3 className="text-lg font-bold text-[color:var(--secondary-100)]">Skills</h3>
              <div className="hidden md:flex gap-3">
                {['All','Programming','Tools','Social'].map((c)=> (
                  <button
                    key={c}
                    className={`btn-skill px-3 py-1 rounded-md text-sm ${category===c? 'active': ''}`}
                    onClick={() => setCategory(c)}
                    aria-pressed={category===c}
                  >{c}</button>
                ))}
              </div>
              <div className="md:hidden">
                <select className="select-skill text-sm" value={category} onChange={(e)=>setCategory(e.target.value)}>
                  {['All','Programming','Tools','Social'].map((c)=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-6 items-stretch">
              <div className="skills-list w-full md:w-1/3 h-full overflow-hidden">
                <div className="flex gap-4 h-full overflow-y-auto pr-2">
                  {(() => {
                    // Render all skills in columns but hide non-matching ones so the list keeps its height
                    const cols = chunkArray(skills, 8);
                    return cols.map((col, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        {col.map((s: any) => {
                          const visible = category === 'All' || s.categories.includes(category);
                          return (
                            <div
                              key={s.id}
                              className={`skills-list-item flex items-center gap-3 p-2 rounded-md hover:bg-[color:var(--secondary-800)] ${visible ? '' : 'dimmed pointer-events-none'}`}
                                aria-hidden={!visible}
                            >
                              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: s.color}}>
                                {s.icon ? (
                                  <img src={s.icon} alt={s.name} className="w-4 h-4" style={{filter:'invert(1)'}} />
                                ) : (
                                  <span className="text-xs text-[color:var(--secondary-100)]">{s.name}</span>
                                )}
                              </span>
                              <span className="text-[color:var(--secondary-100)]">{s.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div className="flex-1 relative hidden md:block">
                <div className="skills-bubble-container w-full h-full relative rounded-md bg-[color:var(--secondary-900)]/30 overflow-hidden">
                  {skills.filter(s=> category==='All' || s.categories.includes(category)).map((s)=> {
                    // compute left/top in px from computedPos if available, otherwise fall back to percent clamped
                    const computed = computedPos[s.id];
                    const leftStyle = computed ? `${Math.round(computed.left)}px` : clampPercent(s.bubble.left, 8, 92);
                    const topStyle = computed ? `${Math.round(computed.top)}px` : clampPercent(s.bubble.top, 8, 92);
                    // slow movement slightly by multiplying duration
                    const duration = (s.bubble?.duration || 12) * 1.25;
                    const delay = s.bubble?.delay || 0;
                    return (
                      <div key={s.id} className="skill-bubble absolute transition-transform" style={{left: leftStyle, top: topStyle}}>
                        <div
                          className="bubble-dot w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                          style={{background: s.color, animationDuration: `${duration}s`, animationDelay: `${delay}s`}}
                        >
                          {s.icon ? (
                            <img src={s.icon} alt={s.name} className="w-5 h-5" style={{filter:'invert(1)'}} />
                          ) : (
                            <span className="text-xs text-[color:var(--secondary-100)] text-center px-1">{s.name}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="min-h-screen flex flex-col">
        <div className="pt-20 w-full">
          <div className="max-w-3xl text-center mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-2 text-[color:var(--secondary-100)]">Projects</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              What starts as an idea becomes a clean, scalable website, designed thoughtfully and built to endure.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 auto-rows-fr w-full h-full">
            {projects.map((project) => (
              <div key={project.id} className="h-full">
                <AnimatedCard>
                  <article className="p-6 h-full flex flex-col">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-56 w-full object-cover mb-4 rounded-md flex-shrink-0"
                    />

                    <h4 className="font-bold text-[color:var(--secondary-100)] text-lg mb-2">
                      {project.title}
                    </h4>

                    <p className="text-base text-[color:var(--secondary-100)] flex-1">
                      {project.description}
                    </p>

                    <div className="mt-4">
                      <MagneticButton href={`/projects/${project.id}`}>
                        View Project
                      </MagneticButton>
                    </div>
                  </article>
                </AnimatedCard>
              </div>
            ))}
          </div>
        </div>

      </section>


      {/* footer is rendered globally in the layout */}
    </div>
  );
}
