import ParticlesBackground from "@/components/ui/ParticlesBackground";
import InternshipContent from "@/components/InternshipContent";
import React from "react";

export const metadata = {
  title: "Internship - Noureddine El Nimr",
  description: "Graduation internship at Van Roey - Business Central implementation for Luxilon Industries.",
};

export default function InternshipPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <ParticlesBackground />
      <div className="relative z-10 flex flex-col items-center pt-24 pb-20 px-6">
        <div className="max-w-5xl w-full md:pr-28">
          <InternshipContent />
        </div>
      </div>
    </div>
  );
}