import ParticlesBackground from "@/components/ui/ParticlesBackground";
import React from "react";

export const metadata = {
  title: "CV",
  description: "Curriculum Vitae",
};

export default function CVPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-20 text-white">
      <ParticlesBackground />
      <div className="max-w-6xl w-full px-6 z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[color:var(--primary)]">Curriculum Vitae</h1>
        <p className="text-gray-300 mb-6">View my CV below. If it doesn&apos;t display, download the PDF.</p>

        <div className="bg-[rgba(6,6,6,0.6)] border border-[rgba(255,255,255,0.04)] rounded shadow h-[75vh] overflow-hidden">
          <iframe src="/cv.pdf" className="w-full h-full" title="CV PDF" />
        </div>

        <div className="mt-6 text-center">
          <a href="/cv.pdf" download className="btn-outline-primary inline-block">Download CV (PDF)</a>
        </div>
      </div>
    </main>
  );
}
