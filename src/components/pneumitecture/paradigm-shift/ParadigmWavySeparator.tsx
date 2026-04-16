"use client";

import { useId } from "react";

type WaveVariant = 1 | 2 | 3 | 4;

/** Seam at y≈46, viewBox height 100 — matches proven wave ribbon geometry */
const FILL_PATHS: Record<WaveVariant, { top: string; bottom: string }> = {
  1: {
    top: "M0,0 L1440,0 L1440,46 C1200,88 960,18 720,38 C480,58 240,78 0,42 L0,0 Z",
    bottom: "M0,100 L1440,100 L1440,46 C1200,88 960,18 720,38 C480,58 240,78 0,42 L0,100 Z",
  },
  2: {
    top: "M0,0 L1440,0 L1440,50 C1080,8 720,92 360,44 C180,22 0,58 0,48 L0,0 Z",
    bottom: "M0,100 L1440,100 L1440,50 C1080,8 720,92 360,44 C180,22 0,58 0,48 L0,100 Z",
  },
  3: {
    top: "M0,0 L1440,0 L1440,42 C1320,96 840,-4 480,48 C240,78 0,52 0,44 L0,0 Z",
    bottom: "M0,100 L1440,100 L1440,42 C1320,96 840,-4 480,48 C240,78 0,52 0,44 L0,100 Z",
  },
  4: {
    top: "M0,0 L1440,0 L1440,48 C960,0 480,96 0,40 L0,0 Z",
    bottom: "M0,100 L1440,100 L1440,48 C960,0 480,96 0,40 L0,100 Z",
  },
};

const LINE_PATHS: Record<WaveVariant, string> = {
  1: "M0,52 C240,22 480,86 720,46 C960,6 1200,74 1440,48",
  2: "M0,44 C360,84 720,-4 1080,54 C1200,42 1320,62 1440,38",
  3: "M0,50 C480,10 720,90 1200,34 C1280,26 1360,58 1440,46",
  4: "M0,54 Q360,18 720,50 T1440,42",
};

type WaveFillProps = {
  topFill: string;
  bottomFill: string;
  variant?: WaveVariant;
  className?: string;
};

/**
 * Full-bleed wave that blends two section background colors (e.g. bone → obsidian).
 */
export function ParadigmWaveFill({
  topFill,
  bottomFill,
  variant = 1,
  className = "h-14 sm:h-16 md:h-20 lg:h-24",
}: WaveFillProps) {
  const { top, bottom } = FILL_PATHS[variant];
  return (
    <svg
      className={`block w-full shrink-0 ${className}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path fill={topFill} d={top} />
      <path fill={bottomFill} d={bottom} />
    </svg>
  );
}

type WaveLineProps = {
  variant?: WaveVariant;
  className?: string;
};

type WaveBackdropProps = {
  boneFill: string;
  obsidianFill: string;
  className?: string;
};

/**
 * Full-section background: bone above an organic wave, obsidian below.
 * Stretches with the section (preserveAspectRatio none).
 */
export function ParadigmWaveBackdrop({ boneFill, obsidianFill, className = "" }: WaveBackdropProps) {
  const uid = useId().replace(/:/g, "");
  const strokeGrad = `paradigm-wbd-stroke-${uid}`;
  // Boundary: dips near the left column, rises toward the right.
  const boundary =
    "M0,518 C280,548 520,462 780,492 C1040,522 1240,448 1440,432";
  const top =
    "M0,0 L1440,0 L1440,432 C1240,448 1040,522 780,492 C520,462 280,548 0,518 L0,0 Z";
  const bottom =
    "M0,518 C280,548 520,462 780,492 C1040,522 1240,448 1440,432 L1440,1000 L0,1000 Z";
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full min-h-[36rem] ${className}`}
      viewBox="0 0 1440 1000"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path fill={boneFill} d={top} />
      <path fill={obsidianFill} d={bottom} />
      <path
        d={boundary}
        fill="none"
        stroke={`url(#${strokeGrad})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={strokeGrad} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-soft)" stopOpacity="0.35" />
          <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--accent-soft)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Gradient wavy stroke using site accent tokens — separates bands without boxes. */
export function ParadigmWavyLine({ variant = 1, className = "h-9 sm:h-11 md:h-12" }: WaveLineProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `paradigm-wl-${uid}`;
  const d = LINE_PATHS[variant];
  return (
    <svg
      className={`block w-full shrink-0 ${className}`}
      viewBox="0 0 1440 88"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-soft)" stopOpacity="0.45" />
          <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent-soft)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
