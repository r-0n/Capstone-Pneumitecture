"use client";

import { motion, useSpring } from "framer-motion";
import { useCursor } from "@/contexts/CursorContext";

/** Soft “instrument” cursor tuned for the light, clinical UI */
export function AirCursor() {
  const { mouseX, mouseY, finePointer, reducedMotion } = useCursor();

  const springConfig = reducedMotion
    ? { stiffness: 800, damping: 60, mass: 0.2 }
    : { stiffness: 320, damping: 28, mass: 0.55 };

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
          className="absolute h-12 w-12 rounded-full opacity-35 blur-md"
          style={{
            background:
              "radial-gradient(circle, rgba(107,140,255,0.45) 0%, rgba(94,184,212,0.2) 50%, transparent 70%)",
          }}
        />
        <div
          className="relative h-2.5 w-2.5 rounded-full border border-slate-400/70 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.12)]"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.9), 0 4px 20px rgba(107,140,255,0.25)",
          }}
        />
        <div className="absolute h-9 w-9 rounded-full border border-slate-300/40" />
      </div>
    </motion.div>
  );
}
