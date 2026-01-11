import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "project";
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
}: Props) {
  const isProject = variant === "project";

  const ringColor = isProject
    ? "rgba(150,160,170,0.35)"
    : "rgba(0,173,204,0.6)";

  const glowColor = isProject
    ? "rgba(150,160,170,0.18)"
    : "rgba(0,173,204,0.25)";

  const baseClasses =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 transition";

  const variantClasses = isProject
    ? "bg-[rgba(10,10,10,0.85)] border border-white/15"
    : "bg-[rgba(6,6,6,0.9)] border border-[var(--primary)]";

  const content = (
    <>
      {/* Spinning ring */}
      <span className="pointer-events-none absolute inset-0 [container-type:inline-size]">
        <span
          className="absolute size-[100cqw] animate-spin-slow opacity-0 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, ${ringColor} 0deg, transparent 60deg, transparent 300deg, ${ringColor} 360deg)`,
          }}
        />
      </span>

      {/* Inner glass surface */}
      <span className="absolute inset-[2px] rounded-md bg-[rgba(6,6,6,0.95)] backdrop-blur-md" />

      {/* Bottom glow */}
      <span
        className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-md blur-md opacity-40 transition-all duration-500 group-hover:h-2/3 group-hover:opacity-80"
        style={{ background: glowColor }}
      />

      {/* Text */}
      <span
        className={`relative text-sm font-medium tracking-wide ${
          isProject
            ? "text-white/80 group-hover:text-white"
            : "fg-gradient"
        }`}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses}`}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${variantClasses}`}>
      {content}
    </button>
  );
}
