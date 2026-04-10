"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValueEvent, useSpring } from "framer-motion";
import { useCursor } from "@/contexts/CursorContext";

type AirSensitiveProps = {
  children: React.ReactNode;
  /** Max displacement in px when cursor is at edge of radius */
  strength?: number;
  /** Falloff distance in px */
  radius?: number;
  className?: string;
};

/**
 * Repels content slightly from the cursor, as if air pressure is pushing it away.
 */
export function AirSensitive({
  children,
  strength = 10,
  radius = 140,
  className,
}: AirSensitiveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY, finePointer, reducedMotion } = useCursor();

  const dx = useSpring(0, { stiffness: 380, damping: 32 });
  const dy = useSpring(0, { stiffness: 380, damping: 32 });

  const update = useCallback(() => {
    if (!finePointer || reducedMotion) {
      dx.set(0);
      dy.set(0);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const mx = mouseX.get();
    const my = mouseY.get();

    const vx = cx - mx;
    const vy = cy - my;
    const dist = Math.hypot(vx, vy);

    if (dist > radius || dist < 0.5) {
      dx.set(0);
      dy.set(0);
      return;
    }

    const falloff = 1 - dist / radius;
    const nx = vx / dist;
    const ny = vy / dist;
    const f = falloff * falloff * strength;

    dx.set(nx * f);
    dy.set(ny * f);
  }, [dx, dy, finePointer, mouseX, mouseY, radius, reducedMotion, strength]);

  useMotionValueEvent(mouseX, "change", update);
  useMotionValueEvent(mouseY, "change", update);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: dx, y: dy }}
    >
      {children}
    </motion.div>
  );
}
