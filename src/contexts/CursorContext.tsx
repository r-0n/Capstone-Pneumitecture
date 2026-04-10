"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

type CursorContextValue = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  /** True when fine pointer (mouse) — show custom cursor + pressure effects */
  finePointer: boolean;
  reducedMotion: boolean;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [finePointer, setFinePointer] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const onMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setFinePointer(mqFine.matches);
      setReducedMotion(mqReduce.matches);
    };

    sync();
    mqFine.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mqFine.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
      window.removeEventListener("mousemove", onMove);
    };
  }, [onMove]);

  const value = useMemo(
    () => ({ mouseX, mouseY, finePointer, reducedMotion }),
    [mouseX, mouseY, finePointer, reducedMotion],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursor must be used within CursorProvider");
  }
  return ctx;
}
