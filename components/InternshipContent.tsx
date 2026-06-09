"use client";

import AnimatedCard from "@/components/ui/AnimatedCard";
import Highlighter from "@/components/ui/Highlighter";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

const pills = [
  "Microsoft Dynamics 365 Business Central",
  "ForNAV",
  "Insight Works",
  "Power Platform",
  "AL Extension Development",
  "GS1 / Barcode Parsing",
  "C# / .NET",
  "Azure DevOps",
  "Python / pandas",
];

const downloadCards = [
  {
    label: "Project Plan",
    desc: "Project charter covering scope, objectives, milestones and risk analysis for the Luxilon BC implementation.",
    icon: "📋",
    file: "/Documents/Projectplaning.pdf",
    name: "ProjectPlan_LXN.pdf",
  },
  {
    label: "Realization Document",
    desc: "Full thesis-style document — analysis, implementation results, tools, and reflection on the internship period.",
    icon: "📄",
    file: "/Documents/realisatiedocument.pdf",
    name: "Realisatiedocument_NoureddineElNimr.pdf",
  },
  {
    label: "Reflection",
    desc: "Personal reflection on learning outcomes, challenges faced, and professional growth during the internship.",
    icon: "💭",
    file: "/Documents/Noureddine_ElNimr_reflectie.pdf",
    name: "Reflection_NoureddineElNimr.pdf",
  },
];

const highlights = [
  {
    title: "Business Central Implementation",
    body: "Configured Microsoft Dynamics 365 Business Central for Luxilon's unique production workflows — including lot/package number tracking, warehouse operations, and custom quality control flows. Developed a full fictional client case (Sauzen Lauwels) to master the complete BC implementation process from scratch.",
  },
  {
    title: "Custom Quality Control Module",
    body: "Tested and evaluated BC v28's Quality Management module against existing custom extensions for Luxilon. Documented two critical limitations — bin-specific transfer restrictions for blocked lots and per-lot vs per-package check creation — and presented findings to both the production and full application team.",
  },
  {
    title: "ForNAV Document Development",
    body: "Designed and built multiple professional document layouts in ForNAV for client use — pick lists, packing documents, and production order reports. Applied conditional logic (if-statements) and FIFO-value integration, working directly with BC's underlying data table relationships.",
  },
  {
    title: "GS1 Barcode Tool (C# / WinForms)",
    body: "Built a standalone system-tray utility in C# that intercepted Honeywell scanner output and restored GS1 Application Identifier separators lost in keyboard-wedge mode, polling a local HPA service to correctly parse fields like lot number, package number, expiry date, and weight.",
  },
  {
    title: "Testing & Bug Reporting",
    body: "Carried out structured end-to-end testing of Luxilon's custom maatwerk flows — including bobbin booking, wikkelen via Tasklet, pack flows, and lot/package quality checks. Documented and reported all bugs systematically, including a wave of regressions introduced by a new Tasklet release.",
  },
  {
    title: "External File Storage — BC v28",
    body: "Configured the External File Storage SharePoint connector in a CDX demo environment from scratch — including Azure App Registration, API permissions, S2S certificate authentication, and Business Central connector settings. Compared it against the Eric Hougaard connector via a weighted ranking analysis.",
  },
];

export default function InternshipContent() {
  return (
    <div className="flex flex-col gap-16">

      {/* ── HEADER ── */}
      <FadeIn>
        <div className="section-divider" />
        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[color:var(--primary)] mb-5 opacity-80">
          2025 – 2026 · Van Roey
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-[1.06]">
          <span className="fg-gradient">Internship</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-4">
          Final-year internship at{" "}
          <Highlighter action="highlight" color="#00adcc">Van Roey</Highlighter>
          {" "}in Turnhout, Belgium — working on Microsoft Dynamics 365 Business Central ERP implementations,
          with a primary focus on the Luxilon Industries project.
        </p>
        <div className="flex flex-wrap gap-2 mt-6">
          {pills.map((p) => (
            <span key={p} className="text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide"
              style={{ background: "rgba(0,173,204,0.10)", color: "rgba(0,200,230,0.9)", border: "1px solid rgba(0,173,204,0.20)" }}>
              {p}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* ── SUMMARY ── */}
      <FadeIn delay={0.05}>
        <AnimatedCard>
          <h2 className="text-xl font-extrabold mb-4 text-[color:var(--secondary-100)]">
            <Highlighter action="underline" color="#00adcc">Summary</Highlighter>
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-3">
            During my internship at Van Roey, I was embedded in a real ERP implementation project for
            Luxilon Industries — a world-leading manufacturer of high-tech monofilaments based in Wijnegem. The internship
            ran from <strong className="text-white/80">23 February 2026</strong> to <strong className="text-white/80">22 May 2026</strong>.
          </p>
          <p className="text-white/60 text-base leading-relaxed mb-3">
            My role covered the full spectrum of a Business Central implementation: analyzing client processes, configuring
            the system, developing and testing custom maatwerk, creating ForNAV document layouts, and supporting workshops
            and site visits at the client location. I also carried out independent research assignments on new BC v28 modules
            and tooling, which I presented to the broader application team.
          </p>
          <p className="text-white/60 text-base leading-relaxed">
            Alongside the Luxilon project, I completed a full fictional client case (Sauzen Lauwels) to develop a solid
            end-to-end understanding of Business Central, from master data configuration to production, warehousing, sales,
            and invoicing. I also built a C# utility tool to solve a hardware scanner problem that arose during testing.
          </p>
        </AnimatedCard>
      </FadeIn>

      {/* ── ABSTRACT / SYNOPSIS ── */}
      <FadeIn delay={0.08}>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-[color:var(--secondary-100)]">
            Abstract
          </h2>
          <p className="text-white/40 text-sm mb-6 max-w-xl">
            Synopsis of the internship assignment — what was done and how.
          </p>

          <AnimatedCard>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--primary)] opacity-70 mb-2">What</p>
                <p className="text-white/60 text-base leading-relaxed">
                  The internship assignment centered on the Business Central implementation for Luxilon Industries, with
                  the core objective of digitizing and integrating their quality control, warehouse, and production processes
                  into a single ERP environment. This required both standard BC configuration and custom AL extension
                  development to handle Luxilon's unique lot/package blocking and movement restriction requirements.
                </p>
              </div>

              <div className="w-full h-px bg-white/[0.06]" />

              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--primary)] opacity-70 mb-2">How</p>
                <p className="text-white/60 text-base leading-relaxed">
                  The project followed an iterative approach — bi-weekly workshops with the client were alternated with
                  configuration and implementation sprints. Each workshop introduced new process requirements that were
                  configured in Business Central before the next session, allowing the client to see live results and
                  provide feedback continuously. Progress was tracked in Azure DevOps. Testing was carried out
                  systematically against functional requirements, with all bugs documented and reported to the development team.
                  New BC v28 modules (Quality Management, External File Storage) were researched, tested, and evaluated
                  against existing solutions using weighted ranking analyses.
                </p>
              </div>

              <div className="w-full h-px bg-white/[0.06]" />

              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--primary)] opacity-70 mb-2">Result</p>
                <p className="text-white/60 text-base leading-relaxed">
                  A fully configured Business Central environment tailored to Luxilon's processes, multiple ForNAV
                  document layouts, a GS1 barcode parsing tool, a complete health check suite for go-live readiness,
                  and research reports on BC v28 capabilities — all delivered within the internship period and
                  presented to the Van Roey application team.
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </FadeIn>

      {/* ── HIGHLIGHTS ── */}
      <FadeIn delay={0.05}>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-[color:var(--secondary-100)]">
          Key Deliverables
        </h2>
        <p className="text-white/40 text-sm mb-6 max-w-xl">
          Main areas of work during the internship period.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {highlights.map(({ title, body }) => (
            <AnimatedCard key={title}>
              <div className="flex flex-col gap-3 h-full">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--primary)] opacity-70">
                  Deliverable
                </span>
                <h3 className="font-bold text-[color:var(--secondary-100)] text-base">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{body}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </FadeIn>

      {/* ── DOWNLOADS ── */}
      <FadeIn delay={0.05}>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-[color:var(--secondary-100)]">
          Mandatory Documents
        </h2>
        <p className="text-white/40 text-sm mb-6 max-w-xl">
          Required portfolio documents — available for download below.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {downloadCards.map(({ label, desc, icon, file, name }) => (
            <AnimatedCard key={label}>
              <div className="flex flex-col gap-3 h-full">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-bold text-[color:var(--secondary-100)] text-base">{label}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{desc}</p>
                <div className="pt-2">
                  <MagneticButton href={file} download={name}>
                    Download ↓
                  </MagneticButton>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </FadeIn>

    </div>
  );
}