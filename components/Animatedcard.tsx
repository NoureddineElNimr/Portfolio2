import MagicCard from "@/components/ui/MagicCard";

export default function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <MagicCard className="w-full h-full">
      {children}
    </MagicCard>
  );
}