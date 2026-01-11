"use client";

import Link from 'next/link';
import { HiHome, HiUser, HiDocumentText, HiFolder, HiMail } from 'react-icons/hi';
import ContactModal from './ui/ContactModal';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // If not on homepage, navigate to home and scroll
        window.location.href = `/#${id}`;
      }
    }
  };

  return (
    <nav className="fixed left-1/2 transform -translate-x-1/2 top-6 z-50">
      <div className="bg-[rgba(6,6,6,0.9)] border border-[var(--primary)] rounded-full px-8 py-4 flex items-center gap-8 shadow-lg">

        <button onClick={() => scrollToSection("home")} className="flex items-center gap-3 text-[color:var(--secondary-100)] hover:text-white">
          <HiHome className="w-6 h-6 md:w-8 md:h-8" />
          <span className="hidden md:inline text-base">Home</span>
        </button>

        <button onClick={() => scrollToSection("about")} className="flex items-center gap-3 text-[color:var(--secondary-100)] hover:text-white">
          <HiUser className="w-6 h-6 md:w-8 md:h-8" />
          <span className="hidden md:inline text-base">About me</span>
        </button>

        <Link href="/pages/cv" className="flex items-center gap-3 text-[color:var(--secondary-100)] hover:text-white">
          <HiDocumentText className="w-6 h-6 md:w-8 md:h-8" />
          <span className="hidden md:inline text-base">CV</span>
        </Link>

        <button onClick={() => scrollToSection("projects")} className="flex items-center gap-3 text-[color:var(--secondary-100)] hover:text-white">
          <HiFolder className="w-6 h-6 md:w-8 md:h-8" />
          <span className="hidden md:inline text-base">Projects</span>
        </button>

        <ContactModal />

      </div>
    </nav>
  );
}
