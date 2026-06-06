"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HiHome, HiUser, HiDocumentText, HiFolder, HiMail, HiBriefcase } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "@/components/Themeprovider";

const SCROLL_SECTIONS = ["home", "about", "tech-skills", "projects"];

const NAV_ITEMS = [
  { id: "home",        icon: HiHome,         label: "Home",       type: "scroll" as const },
  { id: "about",       icon: HiUser,         label: "About",      type: "scroll" as const },
  { id: "projects",    icon: HiFolder,       label: "Projects",   type: "scroll" as const },
  { id: "internship",  icon: HiBriefcase,    label: "Internship", type: "link"   as const, href: "/pages/internship" },
  { id: "cv",          icon: HiDocumentText, label: "CV",         type: "link"   as const, href: "/pages/cv" },
];

// ── Animated sliding pill toggle ────────────────────────
function AnimatedThemeToggler({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} aria-label="Toggle theme" className="nav-item group relative" style={{ cursor: "none" }}>
      <span className="nav-active-bar" />
      <span
        className="relative w-8 h-4 rounded-full flex items-center px-0.5 transition-colors duration-500"
        style={{
          background: dark ? "rgba(0,173,204,0.22)" : "rgba(255,200,50,0.28)",
          border: `1px solid ${dark ? "rgba(0,173,204,0.4)" : "rgba(255,200,50,0.55)"}`,
        }}
      >
        <motion.span
          animate={{ x: dark ? 0 : 14 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-3 h-3 rounded-full flex items-center justify-center text-[7px] shadow-md flex-shrink-0"
          style={{ background: dark ? "#00adcc" : "#f5b800" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {dark ? (
              <motion.span key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }} className="leading-none">🌙</motion.span>
            ) : (
              <motion.span key="sun" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.15 }} className="leading-none">☀️</motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </span>
      <span className="
        pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2
        px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap
        nav-tooltip bg-[rgba(6,6,6,0.95)] border border-white/10 text-white/90
        opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
        transition-all duration-150 shadow-xl
      ">{dark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}

export default function Navbar() {
  const [active, setActive]       = useState("home");
  const [contactOpen, setContact] = useState(false);
  const { dark, toggle }          = useTheme();
  const pathname = usePathname();

  useEffect(() => {
  if (pathname?.startsWith("/pages/cv"))         setActive("cv");
  else if (pathname?.startsWith("/pages/internship")) setActive("internship");
  else if (pathname === "/")                     setActive("home");
}, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const observers: IntersectionObserver[] = [];
    SCROLL_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = `/#${id}`;
  };

  const tooltip = (label: string) => (
    <span className="
      nav-tooltip
      pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2
      px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap
      bg-[rgba(6,6,6,0.95)] border border-white/10 text-white/90
      opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
      transition-all duration-150 shadow-xl
    ">{label}</span>
  );

  return (
    <>
      {/* ── Desktop: right-side vertical pill ── */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl bg-[rgba(8,8,8,0.80)] backdrop-blur-2xl border border-white/[0.07] shadow-[0_0_0_1px_rgba(0,173,204,0.06),0_8px_40px_rgba(0,0,0,0.75)]">

          {NAV_ITEMS.map(({ id, icon: Icon, label, type, href }) => {
            const isActive = active === id;
            const inner = (
              <>
                <span className="nav-active-bar" />
                <Icon className="w-5 h-5 relative z-10" />
                {tooltip(label)}
              </>
            );
            if (type === "link" && href) {
              return <Link key={id} href={href} className={`nav-item group ${isActive ? "active" : ""}`}>{inner}</Link>;
            }
            return <button key={id} onClick={() => scrollTo(id)} className={`nav-item group ${isActive ? "active" : ""}`}>{inner}</button>;
          })}

          <span className="w-5 h-px rounded-full bg-white/10 my-0.5" />

          <button onClick={() => setContact(true)} className="nav-item group relative" aria-label="Open contact">
            <span className="nav-active-bar" />
            <HiMail className="w-5 h-5 relative z-10" />
            {tooltip("Contact")}
          </button>

          <span className="w-5 h-px rounded-full bg-white/10 my-0.5" />

          <AnimatedThemeToggler dark={dark} onToggle={toggle} />
        </div>
      </nav>

      {/* ── Mobile: bottom dock ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-around px-2 pt-3 pb-5 bg-[rgba(6,6,6,0.92)] backdrop-blur-2xl border-t border-white/[0.06] shadow-[0_-8px_32px_rgba(0,0,0,0.6)]">
          {NAV_ITEMS.map(({ id, icon: Icon, label, type, href }) => {
            const isActive = active === id;
            const cls = `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${isActive ? "text-[color:var(--primary)]" : "text-white/38"}`;
            const inner = (
              <>
                <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_6px_rgba(0,173,204,0.9)]" : ""}`} />
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
              </>
            );
            if (type === "link" && href) return <Link key={id} href={href} className={cls}>{inner}</Link>;
            return <button key={id} onClick={() => scrollTo(id)} className={cls}>{inner}</button>;
          })}

          <button onClick={() => setContact(true)} className="flex flex-col items-center gap-1 px-3 py-1.5 text-white/38">
            <HiMail className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Contact</span>
          </button>

          <button onClick={toggle} className="flex flex-col items-center gap-1 px-3 py-1.5 text-white/38" aria-label="Toggle theme">
            <span className="relative w-8 h-4 rounded-full flex items-center px-0.5"
              style={{ background: dark ? "rgba(0,173,204,0.22)" : "rgba(255,200,50,0.28)", border: `1px solid ${dark ? "rgba(0,173,204,0.4)" : "rgba(255,200,50,0.55)"}` }}>
              <motion.span animate={{ x: dark ? 0 : 14 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: dark ? "#00adcc" : "#f5b800" }} />
            </span>
            <span className="text-[10px] font-medium tracking-wide">Theme</span>
          </button>
        </div>
      </nav>

      {/* ── Contact Modal ── */}
      <AnimatePresence>
        {contactOpen && (
          <Dialog open={contactOpen} onClose={() => setContact(false)} className="relative z-[9998]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/75" />
            <div className="fixed inset-0 flex items-center justify-center px-4">
              <Dialog.Panel as={motion.div}
                initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="w-full max-w-md rounded-xl bg-[rgba(6,6,6,0.95)] border border-white/10 p-6 text-white shadow-xl"
              >
                <Dialog.Title className="text-xl font-extrabold text-center mb-6 text-[color:var(--secondary-100)]">Get in touch</Dialog.Title>
                <div className="flex flex-col gap-4">
                  <a href="mailto:elnimr.noureddine@gmail.com" className="flex items-center justify-center gap-3 rounded-md bg-black/60 px-4 py-3 hover:bg-black/80 transition">
                    <HiMail className="w-5 h-5" /> Email
                  </a>
                  <a href="https://www.linkedin.com/in/noureddine-elnimr/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-md bg-black/60 px-4 py-3 hover:bg-black/80 transition">
                    <FaLinkedin className="w-5 h-5" /> LinkedIn
                  </a>
                  <a href="https://github.com/NoureddineElNimr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-md bg-black/60 px-4 py-3 hover:bg-black/80 transition">
                    <FaGithub className="w-5 h-5" /> GitHub
                  </a>
                </div>
                <div className="mt-6 text-center">
                  <button onClick={() => setContact(false)} className="text-sm text-white/60 hover:text-white transition">Close</button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}