"use client";

import { motion, useSpring } from "framer-motion";
import { useCursor } from "@/contexts/CursorContext";

/** Soft “instrument” cursor tuned for the light, clinical UI */
export function AirCursor() {
  const { mouseX, mouseY, finePointer, reducedMotion } = useCursor();

  /** Snappy spring — high stiffness / tuned damping so the cursor tracks with minimal lag */
  const springConfig = reducedMotion
    ? { stiffness: 2400, damping: 72, mass: 0.12 }
    : { stiffness: 4200, damping: 58, mass: 0.09 };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  if (!finePointer || reducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10000]"
      style={{ x, y }}
    >
      <div className="relative flex h-0 w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div
          className="absolute h-10 w-10 rounded-full opacity-40 blur-sm"
          style={{
            background:
              "radial-gradient(circle, rgba(107,140,255,0.45) 0%, rgba(94,184,212,0.2) 50%, transparent 70%)",
          }}
        />
        <div
          className="relative h-2 w-2 rounded-full border border-slate-500/80 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.18)]"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.95), 0 2px 14px rgba(107,140,255,0.22)",
          }}
        />
        <div className="absolute h-8 w-8 rounded-full border border-slate-400/55" />
      </div>
    </motion.div>
  );
}
