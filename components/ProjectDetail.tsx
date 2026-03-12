'use client';

// FIX #7: replaced useRouter from next/router (Pages Router) with useParams from next/navigation (App Router)
import { useParams } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectCarousel from '@/components/ui/ProjectCarousel';

export default function ProjectDetail() {
  // FIX #7: useParams returns the dynamic segment from the URL — no more crash on App Router
  const params = useParams();
  const slug = params?.slug as string;

  const project = projects.find((p) => p.id === slug);

  if (!project) return <p className="text-white text-center mt-20">Project not found</p>;

  return (
    <div className="text-white">
      {/* Title + Image */}
      <section className="min-h-screen flex flex-col">
        <div className="pt-20 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[color:var(--primary)] mb-4">
              {project.title}
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">{project.description}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="glass h-64 w-full max-w-5xl mx-auto overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Role / Timeline / Tools */}
        <div className="pt-8 w-full">
          <div className="max-w-5xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-6">
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
          </div>
        </div>
      </section>

      {/* Overview + Realizations */}
      <section className="min-h-screen flex flex-col">
        <div className="pt-12 w-full">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-6 mb-6 text-[color:var(--secondary-100)]">
              <h3 className="text-xl font-extrabold mb-2">Project Overview</h3>
              <p>{project.overview}</p>
            </div>

            <div className="glass p-6 text-[color:var(--secondary-100)]">
              <h3 className="text-xl font-extrabold mb-2">Realizations & What I Learned</h3>
              <p>{project.realizations}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FIX #8: Visual Showcase now renders actual project screenshots via the carousel */}
      <section className="min-h-screen flex flex-col pb-20">
        <div className="pt-12 w-full">
          <div className="max-w-3xl text-center mx-auto mb-8">
            <h3 className="text-2xl font-extrabold text-[color:var(--secondary-100)]">
              Visual Showcase
            </h3>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-6">
            {project.carouselImages && project.carouselImages.length > 0 ? (
              <ProjectCarousel images={project.carouselImages}/>
            ) : (
              <p className="text-center text-gray-500">No additional images available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}