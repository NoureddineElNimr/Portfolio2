import HomeSections from "@/components/HomeSections";
import ParticlesBackground from "@/components/ui/ParticlesBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Particles go behind content */}
      <ParticlesBackground />

      {/* All page content */}
      <div className="relative z-10">
        <HomeSections />
        

      </div>
    </main>
  );
}
