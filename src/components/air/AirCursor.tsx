"use client";

import { motion, useSpring } from "framer-motion";
import { useCursor } from "@/contexts/CursorContext";

/**
 * “Air source” cursor: soft core + translucent pressure ring, follows pointer with spring lag.
 */
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
      className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-screen"
      style={{ x, y }}
    >
      <div className="relative flex h-0 w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div
          className="absolute h-14 w-14 rounded-full opacity-40 blur-md"
          style={{
            background:
              "radial-gradient(circle, rgba(77,173,255,0.55) 0%, rgba(255,107,44,0.15) 55%, transparent 70%)",
          }}
        />
        <div
          className="relative h-3 w-3 rounded-full border border-white/50 bg-white/90"
          style={{
            boxShadow:
              "0 0 20px rgba(77,173,255,0.85), 0 0 24px rgba(77,173,255,0.45), inset 0 0 8px rgba(255,255,255,0.5)",
          }}
        />
        <div className="absolute h-10 w-10 rounded-full border border-[rgba(77,173,255,0.35)]" />
      </div>
    </motion.div>
  );
}
