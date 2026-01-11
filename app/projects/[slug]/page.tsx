import AnimatedCard from '@/components/ui/AnimatedCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { projects } from '@/data/projects';
import ProjectCarousel from '@/components/ui/ProjectCarousel';
interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((p) => p.id === slug);

  if (!project)
    return <p className="text-white text-center mt-20">Project not found</p>;

  return (
    <div className="text-white">
      {/* Title + Image Section */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
        <AnimatedCard>
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[color:var(--primary)] mb-4">
              {project.title}
            </h1>
            <p className="text-gray-300 text-base">{project.description}</p>
          </div>

          <div className="flex-1 flex items-center justify-center mt-8">
            <div className="glass h-64 w-full max-w-5xl overflow-hidden rounded-md">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Role / Timeline / Tools Section */}
          <section className="flex items-center justify-center px-6 py-8">
            
              <div className="max-w-5xl w-full text-center grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 text-[color:var(--secondary-100)]">
                  <p className="text-base font-extrabold text-[color:var(--primary)]">ROLE</p>
                  <p className="mt-2">{project.role}</p>
                </div>
                <div className="glass p-6 text-[color:var(--secondary-100)]">
                  <p className="text-base font-extrabold text-[color:var(--primary)]">TIMELINE</p>
                  <p className="mt-2">{project.timeline}</p>
                </div>
                <div className="glass p-6 text-[color:var(--secondary-100)]">
                  <p className="text-base font-extrabold text-[color:var(--primary)]">TOOLS</p>
                  <p className="mt-2">{project.tools}</p>
                </div>
              </div>
            
          </section>
        </AnimatedCard>
      </section>

      

      {/* Overview + Realizations Section */}
      <section className="min-h-screen flex flex-1 items-center justify-center px-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-5xl mx-auto w-full auto-rows-fr">
          
          {/* Project Overview Card */}
          <div className="h-full">
            <AnimatedCard>
              <div className="h-full p-8 flex flex-col">
                <h4 className="font-bold text-[color:var(--secondary-100)] text-lg mb-2">
                  Project Overview
                </h4>
                <p className="text-base text-[color:var(--secondary-100)] flex-1">
                  {project.overview}
                </p>
              </div>
            </AnimatedCard>
          </div>

          {/* Realizations & Learnings Card */}
          <div className="h-full">
            <AnimatedCard>
              <div className="h-full p-8 flex flex-col">
                <h4 className="font-bold text-[color:var(--secondary-100)] text-lg mb-2">
                  Realizations & What I Learned
                </h4>
                <p className="text-base text-[color:var(--secondary-100)] flex-1">
                  {project.realizations}
                </p>
              </div>
            </AnimatedCard>
          </div>

        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[color:var(--secondary-100)]">
          Visual Showcase
        </h2>

        <ProjectCarousel images={project.carouselImages} />
      </section>
      

      {/* Back Button */}
      <section className="flex justify-center my-12 px-6">
        <MagneticButton href="/#projects" variant="project">
          Back to Projects
        </MagneticButton>
      </section>
    </div>
  );
}
