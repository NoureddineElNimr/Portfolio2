"use client";

interface ShineBorderProps {
  duration?: number;
  borderWidth?: number;
  className?: string;
}

export default function ShineBorder({
  duration = 6,
  borderWidth = 1.5,
  className = "",
}: ShineBorderProps) {
  const style = {
    "--shine-duration": `${duration}s`,
    "--shine-border": `${borderWidth}px`,
  } as React.CSSProperties;

  return (
    <>
      {/* Beam 1 — starts at 0deg */}
      <span aria-hidden="true" className={`shine-border-beam ${className}`} style={style} />
      {/* Beam 2 — starts at 180deg, own @property so it's truly independent */}
      <span aria-hidden="true" className={`shine-border-beam-2 ${className}`} style={style} />
    </>
  );
}