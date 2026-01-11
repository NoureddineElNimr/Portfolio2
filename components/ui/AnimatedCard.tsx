type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <svg width="0" height="0" aria-hidden="true">
        <filter id="border-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer result="box">
            <feFuncA type="table" tableValues="0 0 1" />
          </feComponentTransfer>
          <feComponentTransfer in="SourceGraphic" result="border">
            <feFuncA type="table" tableValues="0 1 0" />
          </feComponentTransfer>
          <feBlend in="box" result="full" />
          <feMorphology in="border" operator="dilate" radius="12" />
          <feComposite in2="full" operator="in" />
          <feGaussianBlur stdDeviation="12" />
          <feBlend in="full" />
        </filter>
      </svg>

      <div className="animated-card p-8">
        {children}
      </div>
    </>
  );
}
