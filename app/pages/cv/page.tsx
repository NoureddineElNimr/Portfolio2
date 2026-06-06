import ParticlesBackground from "@/components/ui/ParticlesBackground";
import React from "react";

export const metadata = {
  title: "CV – Noureddine El Nimr",
  description: "Curriculum Vitae",
};

export default function CVPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <ParticlesBackground />

      <div className="relative z-10 flex flex-col items-center pt-24 pb-20 px-6">
        <div className="max-w-6xl w-full md:pr-28">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[color:var(--primary)]">
            Curriculum Vitae
          </h1>
          <p className="mb-6" style={{ color: "var(--secondary-100)", opacity: 0.7 }}>
            View my CV below. If it doesn&apos;t display, download the PDF.
          </p>

          <div className="glass rounded-xl overflow-hidden h-[75vh]">
            <iframe
              src="/Resume_Noureddine_El_Nimr.pdf"
              className="w-full h-full"
              title="CV PDF"
            />
          </div>

          <div className="mt-6 text-center">
            <a href="/Resume_Noureddine_El_Nimr.pdf" download className="btn-outline-primary inline-block">
              Download CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}