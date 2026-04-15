/**
 * Full-width SVG seam — smooth wave between two flat fills.
 */
type ParadigmWaveRibbonProps = {
  topFill: string;
  bottomFill: string;
  className?: string;
};

export function ParadigmWaveRibbon({
  topFill,
  bottomFill,
  className = "h-14 md:h-20 lg:h-24",
}: ParadigmWaveRibbonProps) {
  return (
    <svg
      className={`block w-full shrink-0 ${className}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill={topFill}
        d="M0,0 L1440,0 L1440,46 C1200,88 960,18 720,38 C480,58 240,78 0,42 L0,0 Z"
      />
      <path
        fill={bottomFill}
        d="M0,100 L1440,100 L1440,46 C1200,88 960,18 720,38 C480,58 240,78 0,42 L0,100 Z"
      />
    </svg>
  );
}
