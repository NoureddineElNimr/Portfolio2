import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "project";
  onClick?: () => void;
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  onClick,
}: Props) {
  const cls = variant === "primary" ? "btn-primary" : "btn-secondary";

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}