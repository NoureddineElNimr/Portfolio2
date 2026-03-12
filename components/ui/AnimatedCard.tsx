"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ShineBorder from "@/components/ui/Shineborder";

export default function AnimatedCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="magic-card w-full"
    >
      {/* Rotating shine border beam */}
      <ShineBorder duration={6} borderWidth={1.5} />
      {/* Card content */}
      <div className="magic-card-content">
        {children}
      </div>
    </motion.div>
  );
}