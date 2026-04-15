/**
 * Center “axes” where the four registers meet (desktop): two soft sine ribbons crossing.
 */
export function ParadigmGridWaveCross() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden h-[min(100%,520px)] w-[min(100%,520px)] -translate-x-1/2 -translate-y-1/2 lg:block"
      aria-hidden
    >
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pgwc-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="pgwc-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.11)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.11)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#pgwc-h)"
          strokeWidth="0.85"
          vectorEffect="non-scaling-stroke"
          d="M8,50 Q22,38 36,50 T64,50 T92,50"
        />
        <path
          fill="none"
          stroke="url(#pgwc-v)"
          strokeWidth="0.75"
          vectorEffect="non-scaling-stroke"
          d="M50,8 Q38,24 50,38 T50,64 T50,92"
        />
      </svg>
    </div>
  );
}
