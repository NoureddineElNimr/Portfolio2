"use client";

import Link from 'next/link';
import { HiHome, HiUser, HiDocumentText, HiFolder } from 'react-icons/hi';
import ContactModal from './ui/ContactModal';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/#${id}`;
      }
    }
  };

  const itemClasses =
    "group relative flex items-center gap-2 px-4 py-2 rounded-full text-[color:var(--secondary-100)] transition-all duration-300 hover:bg-white/10 hover:text-white";

  const iconClasses =
    "w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:scale-110";

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="
        flex items-center gap-2 md:gap-4
        rounded-full
        px-4 md:px-6 py-3
        backdrop-blur-xl
        bg-black/60
        border border-white/10
        shadow-[0_0_30px_rgba(0,0,0,0.6)]
      ">
        <button onClick={() => scrollToSection("home")} className={itemClasses}>
          <HiHome className={iconClasses} />
          <span className="hidden md:inline text-sm font-medium">Home</span>
        </button>

        <button onClick={() => scrollToSection("about")} className={itemClasses}>
          <HiUser className={iconClasses} />
          <span className="hidden md:inline text-sm font-medium">About</span>
        </button>

        <Link href="/pages/cv" className={itemClasses}>
          <HiDocumentText className={iconClasses} />
          <span className="hidden md:inline text-sm font-medium">CV</span>
        </Link>

        <button onClick={() => scrollToSection("projects")} className={itemClasses}>
          <HiFolder className={iconClasses} />
          <span className="hidden md:inline text-sm font-medium">Projects</span>
        </button>

        {/* Contact keeps its own modal logic */}
        <ContactModal />
      </div>
    </nav>
  );
}
