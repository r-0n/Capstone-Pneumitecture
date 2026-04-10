"use client";

import { motion, useReducedMotion } from "framer-motion";

const CYCLE_SEC = 5; // matches --hero-breath-cycle (12 breaths/min)
const HALF = CYCLE_SEC / 2;

type BalloonTextProps = {
  text: string;
  /** Stagger offset so a second line can pulse slightly after the first */
  lineDelay?: number;
  className?: string;
};

/**
 * Each character is its own soft cell: scales from the glyph center (no sliding layout)
 * with a little extra vertical stretch so it reads like pressure, not a zoom.
 */
export function BalloonLine({ text, lineDelay = 0, className }: BalloonTextProps) {
  const reduceMotion = useReducedMotion();
  const chars = text.split("");

  return (
    <span className={className}>
      {chars.map((ch, i) => (
        <motion.span
          key={`${text}-${i}-${ch}`}
          className="inline-block text-white will-change-transform"
          style={{ transformOrigin: "50% 58%" }}
          initial={{ scaleX: 1, scaleY: 1 }}
          animate={
            reduceMotion
              ? { scaleX: 1, scaleY: 1 }
              : { scaleX: 1.1, scaleY: 1.2 }
          }
          transition={{
            duration: HALF,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.45, 0, 0.35, 1],
            delay: lineDelay + i * 0.042,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
