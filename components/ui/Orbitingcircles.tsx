"use client";

import { useEffect, useRef } from "react";

interface OrbitItem {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface OrbitRingProps {
  items: OrbitItem[];
  radius: number;
  iconSize: number;
  duration: number;
  reverse?: boolean;
  angleOffset?: number;
  containerSize: number;
}

function OrbitRing({ items, radius, iconSize, duration, reverse = false, angleOffset = 0, containerSize }: OrbitRingProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleRef = useRef(angleOffset);
  const lastRef  = useRef(0);
  const rafRef   = useRef(0);

  useEffect(() => {
    const center     = containerSize / 2;
    const half       = iconSize / 2;
    const count      = items.length;
    const degsPerMs  = 360 / (duration * 1000);

    const step = (now: number) => {
      const delta = now - (lastRef.current || now);
      lastRef.current = now;
      angleRef.current = (angleRef.current + (reverse ? -1 : 1) * degsPerMs * delta) % 360;

      for (let i = 0; i < count; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const rad = (angleRef.current + (360 / count) * i) * (Math.PI / 180);
        const x = center + Math.cos(rad) * radius - half;
        const y = center + Math.sin(rad) * radius - half;
        el.style.transform = `translate(${x}px,${y}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, reverse, radius, iconSize, containerSize, items.length]);

  return (
    <>
      {/* Orbit track ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  radius * 2,
          height: radius * 2,
          top:    containerSize / 2 - radius,
          left:   containerSize / 2 - radius,
          border: "1px solid rgba(0,173,204,0.25)",
          boxShadow: "0 0 8px rgba(0,173,204,0.08) inset",
        }}
      />

      {/* Icons */}
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="absolute top-0 left-0 group"
          style={{ width: iconSize, height: iconSize, willChange: "transform" }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-125"
            style={{
              background: item.color,
              boxShadow: `0 0 0 2px rgba(255,255,255,0.08), 0 4px 16px ${item.color}55`,
            }}
          >
            <img
              src={item.icon}
              alt={item.name}
              width={iconSize / 2}
              height={iconSize / 2}
              className="object-contain"
              style={{ filter: "invert(1)" }}
              loading="lazy"
            />
          </div>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap bg-black/90 border border-white/10 text-white/90 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-xl">
            {item.name}
          </span>
        </div>
      ))}
    </>
  );
}

interface OrbitingCirclesProps {
  outerItems: OrbitItem[];
  innerItems: OrbitItem[];
  center?: React.ReactNode;
  size?: number;
}

export default function OrbitingCircles({ outerItems, innerItems, center, size = 340 }: OrbitingCirclesProps) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,173,204,0.10) 0%, transparent 65%)" }}
      />

      <OrbitRing items={outerItems} radius={size * 0.44} iconSize={40} duration={22} angleOffset={0}   containerSize={size} />
      <OrbitRing items={innerItems} radius={size * 0.27} iconSize={32} duration={14} angleOffset={30}  containerSize={size} reverse />

      {/* Center dot */}
      <div className="absolute" style={{ top: size / 2 - 24, left: size / 2 - 24 }}>
        {center ?? (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,173,204,0.15)",
              border: "1.5px solid rgba(0,173,204,0.40)",
              boxShadow: "0 0 24px rgba(0,173,204,0.30)",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-[#00adcc] shadow-[0_0_12px_rgba(0,173,204,0.9)]" />
          </div>
        )}
      </div>
    </div>
  );
}