import MagneticButton from '@/components/ui/MagneticButton';
import { projects } from '@/data/projects';
import ProjectCarousel from '@/components/ui/ProjectCarousel';
import ParticlesBackground from '@/components/ui/ParticlesBackground';
import SmoothCursor from '@/components/ui/SmoothCursor';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project)
    return <p className="text-white text-center mt-20">Project not found</p>;

  return (
    /* z-index stack:
       - ParticlesBackground: z-index 0  (fullScreen canvas)
       - SmoothCursor:        z-index 9999
       - page content:        z-index 10  ← this fixes the buried content bug
    */
    <div className="relative min-h-screen text-white bg-[var(--background)]">
      <ParticlesBackground />
      <SmoothCursor />

      {/* All page content sits above the particles canvas */}
      <div className="relative z-10 pt-24 pb-20 px-6 flex flex-col gap-24 max-w-5xl mx-auto md:pr-28">

        {/* ── HERO ── */}
        <section>
          <AnimatedCard>
            <div className="flex flex-col gap-8 p-6 md:p-10">
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[color:var(--primary)] mb-4">
                  {project.title}
                </h1>
                <p className="text-[color:var(--secondary-100)] opacity-70 text-base md:text-lg max-w-2xl mx-auto">
                  {project.description}
                </p>
              </div>

              <div className="w-full aspect-video overflow-hidden rounded-xl glass">
                <img
                  src={project.carouselImages?.[0] ?? project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "ROLE",     value: project.role },
                  { label: "TIMELINE", value: project.timeline },
                  { label: "TOOLS",    value: project.tools },
                ].map(({ label, value }) => (
                  <div key={label} className="glass p-4 text-center rounded-xl">
                    <p className="font-extrabold text-[color:var(--primary)] text-sm">{label}</p>
                    <p className="mt-2 text-[color:var(--secondary-100)] text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="flex flex-col gap-6">
          <AnimatedCard>
            <div className="p-6 md:p-8">
              <h4 className="font-bold text-lg text-[color:var(--secondary-100)] mb-3">Project Overview</h4>
              <p className="text-[color:var(--secondary-100)] opacity-70 leading-relaxed">{project.overview}</p>
            </div>
          </AnimatedCard>

          <AnimatedCard>
            <div className="p-6 md:p-8">
              <h4 className="font-bold text-lg text-[color:var(--secondary-100)] mb-3">Realizations & What I Learned</h4>
              <p className="text-[color:var(--secondary-100)] opacity-70 leading-relaxed">{project.realizations}</p>
            </div>
          </AnimatedCard>
        </section>

        {/* ── VISUAL SHOWCASE ── */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-[color:var(--secondary-100)]">
            Visual Showcase
          </h2>
          <ProjectCarousel images={project.carouselImages ?? []} />
        </section>

        {/* ── BACK BUTTON ── */}
        <div className="flex justify-center">
          <MagneticButton href="/#projects" variant="project">← Back to Projects</MagneticButton>
        </div>

      </div>
    </div>
  );
}