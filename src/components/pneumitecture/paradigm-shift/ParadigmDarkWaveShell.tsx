import type { ReactNode } from "react";

/**
 * Deep frame behind the four registers: layered waves + vignette.
 * Keeps the quadrant grid visually “held” in one continuous field.
 */
export function ParadigmDarkWaveShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-[#060607] shadow-[0_32px_120px_rgba(0,0,0,0.45)]">
      <svg
        className="pointer-events-none absolute -left-[8%] -top-[20%] h-[55%] w-[120%] text-white/[0.045]"
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          d="M0,120 Q150,60 300,120 T600,120 T900,120 T1200,120"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          d="M0,150 Q200,90 400,150 T800,150 T1200,150"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          d="M0,90 Q180,140 360,90 T720,90 T1080,90 T1200,90"
        />
      </svg>
      <svg
        className="pointer-events-none absolute -bottom-[25%] -right-[5%] h-[50%] w-[110%] rotate-180 text-white/[0.035]"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          d="M0,100 Q200,160 400,100 T800,100 T1200,100"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          d="M0,130 Q180,70 360,130 T720,130 T1200,130"
        />
      </svg>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(94,184,212,0.06),transparent_60%),radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(255,255,255,0.04),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
