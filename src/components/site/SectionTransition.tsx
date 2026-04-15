"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/** Scroll-driven block enter with subtle, seamless motion. */
export function SectionTransition({ children, className = "", id }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
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
        if (hit.intersectionRatio >= 0.1) {
          setEntered(true);
          io.disconnect();
        }
      },
      { rootMargin: "-6% 0px -10% 0px", threshold: [0, 0.05, 0.1, 0.2] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} id={id} className={`relative ${className}`}>
      <div
        className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
          entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </div>
    </div>
  );
}
