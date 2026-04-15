/** Shared organic boundary: light field above the curve, dark field below. */
export function OrganicWaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`block w-full shrink-0 ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path fill="#f4f4f2" d="M0,0 L1440,0 L1440,50 Q1080,88 720,38 Q360,-8 0,46 Z" />
      <path fill="#0a0a0a" d="M0,120 L1440,120 L1440,50 Q1080,88 720,38 Q360,-8 0,46 Z" />
    </svg>
  );
}
