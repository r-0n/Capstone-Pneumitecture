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

/** Organic seam between top (bone) and lower band — tune shape from the section via `waveShape`. */
export const PARADIGM_WAVE_BACKDROP_SHAPES = {
  default: {
    top: "M0,0 L1440,0 L1440,432 C1240,448 1040,522 780,492 C520,462 280,548 0,518 L0,0 Z",
    bottom: "M0,518 C280,548 520,462 780,492 C1040,522 1240,448 1440,432 L1440,1000 L0,1000 Z",
    /** Lower-band fill: user-space TL → BR (viewBox 0 0 1440 1000). */
    lowerGrad: { x1: 0, y1: 518, x2: 1440, y2: 1000 },
  },
  subtle: {
    top: "M0,0 L1440,0 L1440,490 C1260,494 1020,510 780,501 C540,492 260,522 0,506 L0,0 Z",
    bottom: "M0,506 C260,522 540,492 780,501 C1020,510 1260,494 1440,490 L1440,1000 L0,1000 Z",
    lowerGrad: { x1: 0, y1: 506, x2: 1440, y2: 1000 },
  },
  bold: {
    top: "M0,0 L1440,0 L1440,418 C1230,428 1040,525 780,485 C520,445 300,575 0,532 L0,0 Z",
    bottom: "M0,532 C300,575 520,445 780,485 C1040,525 1230,428 1440,418 L1440,1000 L0,1000 Z",
    lowerGrad: { x1: 0, y1: 532, x2: 1440, y2: 1000 },
  },
} as const;

export type ParadigmWaveBackdropShape = keyof typeof PARADIGM_WAVE_BACKDROP_SHAPES;

type WaveBackdropProps = {
  boneFill: string;
  /** Lower band: first stop (e.g. cream / bone at top-left of lower region). */
  lowerBandFrom: string;
  /** Lower band: second stop (e.g. light blue toward bottom-right). */
  lowerBandTo: string;
  /** Which seam curve to use — change in ParadigmShiftSection. */
  waveShape?: ParadigmWaveBackdropShape;
  className?: string;
};

/**
 * Full-section background: bone above an organic wave, lower band with its own fill gradient.
 * Lower fill runs user-space top-left → bottom-right with eased color stops.
 */
export function ParadigmWaveBackdrop({
  boneFill,
  lowerBandFrom,
  lowerBandTo,
  waveShape = "default",
  className = "",
}: WaveBackdropProps) {
  const uid = useId().replace(/:/g, "");
  const bottomGrad = `paradigm-wbd-bottom-${uid}`;
  const geom = PARADIGM_WAVE_BACKDROP_SHAPES[waveShape] ?? PARADIGM_WAVE_BACKDROP_SHAPES.default;
  const { top, bottom, lowerGrad } = geom;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full min-h-[36rem] ${className}`}
      viewBox="0 0 1440 1000"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={bottomGrad}
          gradientUnits="userSpaceOnUse"
          x1={lowerGrad.x1}
          y1={lowerGrad.y1}
          x2={lowerGrad.x2}
          y2={lowerGrad.y2}
        >
          <stop offset="0%" stopColor={lowerBandFrom} />
          <stop offset="40%" stopColor={lowerBandFrom} />
          <stop offset="100%" stopColor={lowerBandTo} />
        </linearGradient>
      </defs>
      <path fill={boneFill} d={top} />
      <path fill={`url(#${bottomGrad})`} d={bottom} />
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
