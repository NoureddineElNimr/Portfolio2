import HomeSections from "@/components/HomeSections";
import ParticlesBackground from "@/components/ui/ParticlesBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <ParticlesBackground />
      {/* SmoothCursor is now in layout.tsx — no duplicate needed here */}
      <div className="relative z-10">
        <HomeSections />
      </div>
    </div>
  );
}