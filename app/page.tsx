import HomeSections from "@/components/HomeSections";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import SmoothCursor from "@/components/ui/SmoothCursor";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-white">
      <ParticlesBackground />
      <SmoothCursor />
      <div className="relative z-10">
        <HomeSections />
      </div>
    </div>
  );
}