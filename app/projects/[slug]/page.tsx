import AnimatedCard from '@/components/ui/AnimatedCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { projects } from '@/data/projects';
import ProjectCarousel from '@/components/ui/ProjectCarousel';
import ParticlesBackground from '@/components/ui/ParticlesBackground';

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((p) => p.id === slug);

  if (!project)
    return <p className="text-white text-center mt-20">Project not found</p>;

  return (
    <main className="relative min-h-screen text-white">
      <ParticlesBackground />

      <div className="pt-24 pb-20 flex flex-col gap-24">

        {/* ================= HERO ================= */}
        <section className="px-6">
          <AnimatedCard>
            <div className="max-w-5xl mx-auto flex flex-col gap-8 p-6 md:p-10">

              {/* Title */}
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[color:var(--primary)] mb-4">
                  {project.title}
                </h1>
                <p className="text-gray-300 text-base md:text-lg">
                  {project.description}
                </p>
              </div>

              {/* Image */}
              <div className="w-full aspect-video glass overflow-hidden rounded-md">
                <img
                  src={project.carouselImages[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass p-4 text-center">
                  <p className="font-extrabold text-[color:var(--primary)]">ROLE</p>
                  <p className="mt-2 text-[color:var(--secondary-100)]">
                    {project.role}
                  </p>
                </div>

                <div className="glass p-4 text-center">
                  <p className="font-extrabold text-[color:var(--primary)]">TIMELINE</p>
                  <p className="mt-2 text-[color:var(--secondary-100)]">
                    {project.timeline}
                  </p>
                </div>

                <div className="glass p-4 text-center">
                  <p className="font-extrabold text-[color:var(--primary)]">TOOLS</p>
                  <p className="mt-2 text-[color:var(--secondary-100)]">
                    {project.tools}
                  </p>
                </div>
              </div>

            </div>
          </AnimatedCard>
        </section>

        {/* ================= OVERVIEW ================= */}
        <section className="px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8">

            <AnimatedCard>
              <div className="p-6 md:p-8">
                <h4 className="font-bold text-lg text-[color:var(--secondary-100)] mb-2">
                  Project Overview
                </h4>
                <p className="text-[color:var(--secondary-100)]">
                  {project.overview}
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard>
              <div className="p-6 md:p-8">
                <h4 className="font-bold text-lg text-[color:var(--secondary-100)] mb-2">
                  Realizations & What I Learned
                </h4>
                <p className="text-[color:var(--secondary-100)]">
                  {project.realizations}
                </p>
              </div>
            </AnimatedCard>

          </div>
        </section>

        {/* ================= VISUAL SHOWCASE ================= */}
        <section className="px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-[color:var(--secondary-100)]">
            Visual Showcase
          </h2>

          <div className="max-w-5xl mx-auto">
            <ProjectCarousel images={project.carouselImages} />
          </div>
        </section>

        {/* ================= BACK BUTTON ================= */}
        <section className="flex justify-center px-6">
          <MagneticButton href="/#projects" variant="project">
            Back to Projects
          </MagneticButton>
        </section>

      </div>
    </main>
  );
}
