"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Scroll-driven block enter: left rail “grows” + content slides up once ~8% of the
 * block is visible (IntersectionObserver). No opacity wipe (that was reading as “no motion”).
 */
export function SectionTransition({ children, className = "", id }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries[0];
        if (!hit?.isIntersecting) return;
        if (hit.intersectionRatio >= 0.08) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.04, 0.08, 0.12, 0.2] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} id={id} className={`relative ${className}`}>
      <div
        aria-hidden
        className={`pointer-events-none absolute bottom-12 left-3 top-12 z-[1] w-[3px] origin-top rounded-full bg-[var(--accent-soft)] shadow-[0_0_16px_rgba(107,140,255,0.35)] transition-transform duration-700 ease-out motion-reduce:scale-y-100 max-sm:left-2 ${
          entered ? "scale-y-100" : "scale-y-[0.18]"
        }`}
      />
      <div
        className={`transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 ${
          entered ? "translate-y-0" : "translate-y-20"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
