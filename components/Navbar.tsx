"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HiHome, HiUser, HiDocumentText, HiFolder, HiMail } from "react-icons/hi";
import ContactModal from "./ui/ContactModal";

const SCROLL_SECTIONS = ["home", "about", "tech-skills", "projects"];

const NAV_ITEMS = [
  { id: "home",     icon: HiHome,         label: "Home",     type: "scroll" as const },
  { id: "about",    icon: HiUser,         label: "About",    type: "scroll" as const },
  { id: "projects", icon: HiFolder,       label: "Projects", type: "scroll" as const },
  { id: "cv",       icon: HiDocumentText, label: "CV",       type: "link"   as const, href: "/pages/cv" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const pathname = usePathname();

  // CV page detection
  useEffect(() => {
    if (pathname?.startsWith("/pages/cv")) setActive("cv");
    else if (pathname === "/") setActive("home");
  }, [pathname]);

  // Scroll section tracking (only on home page)
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

  return (
    <>
      {/* ── Desktop: right-side vertical pill ── */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
        <div className="
          flex flex-col items-center gap-2 py-4 px-3 rounded-2xl
          bg-[rgba(8,8,8,0.80)] backdrop-blur-2xl
          border border-white/[0.07]
          shadow-[0_0_0_1px_rgba(0,173,204,0.06),0_8px_40px_rgba(0,0,0,0.75)]
        ">
          {NAV_ITEMS.map(({ id, icon: Icon, label, type, href }) => {
            const isActive = active === id;
            const inner = (
              <>
                <span className="nav-active-bar" />
                <Icon className="w-5 h-5 relative z-10" />
                {/* Tooltip to the left */}
                <span className="
                  pointer-events-none
                  absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2
                  px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap
                  bg-[rgba(6,6,6,0.95)] border border-white/10 text-white/90
                  opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-150 shadow-xl
                ">{label}</span>
              </>
            );

            if (type === "link" && href) {
              return (
                <Link key={id} href={href} className={`nav-item group ${isActive ? "active" : ""}`}>
                  {inner}
                </Link>
              );
            }
            return (
              <button key={id} onClick={() => scrollTo(id)} className={`nav-item group ${isActive ? "active" : ""}`}>
                {inner}
              </button>
            );
          })}

          {/* Divider */}
          <span className="w-6 h-px bg-white/[0.07] my-1" />

          {/* Contact */}
          <div className="nav-item group relative">
            <HiMail className="w-5 h-5 pointer-events-none relative z-10" />
            <span className="
              pointer-events-none
              absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2
              px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap
              bg-[rgba(6,6,6,0.95)] border border-white/10 text-white/90
              opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-150 shadow-xl
            ">Contact</span>
            <span className="absolute inset-0 opacity-0 rounded-xl overflow-hidden">
              <ContactModal />
            </span>
          </div>
        </div>
      </nav>

      {/* ── Mobile: bottom dock ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="
          flex items-center justify-around px-2 pt-3 pb-5
          bg-[rgba(6,6,6,0.92)] backdrop-blur-2xl
          border-t border-white/[0.06]
          shadow-[0_-8px_32px_rgba(0,0,0,0.6)]
        ">
          {NAV_ITEMS.map(({ id, icon: Icon, label, type, href }) => {
            const isActive = active === id;
            const cls = `flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 ${
              isActive ? "text-[color:var(--primary)]" : "text-white/38"
            }`;
            const inner = (
              <>
                <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_6px_rgba(0,173,204,0.9)]" : ""}`} />
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
              </>
            );
            if (type === "link" && href) {
              return <Link key={id} href={href} className={cls}>{inner}</Link>;
            }
            return <button key={id} onClick={() => scrollTo(id)} className={cls}>{inner}</button>;
          })}
          <div className="relative flex flex-col items-center gap-1 px-4 py-1.5 text-white/38">
            <HiMail className="w-5 h-5 pointer-events-none" />
            <span className="text-[10px] font-medium tracking-wide pointer-events-none">Contact</span>
            <span className="absolute inset-0 opacity-0"><ContactModal /></span>
          </div>
        </div>
      </nav>
    </>
  );
}