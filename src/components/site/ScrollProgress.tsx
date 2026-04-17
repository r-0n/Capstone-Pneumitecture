"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE_SECTIONS } from "@/config/navigation";
import { scrollToSection } from "@/lib/scrollToSection";

/** Right-rail dots in exact on-page visual order */
const PROGRESS_STEPS = [
  { id: "pavilion-lead", label: "01 · Pavilion Premise" },
  { id: "paradigm-shift", label: "02 · Concept" },
  { id: "design-process", label: "03 · Design Process" },
  { id: "system", label: "04 · System Design" },
  { id: "materials", label: "05 · Material Exploration" },
  { id: "prototyping", label: "06 · Prototype Iterations" },
  { id: "behavior", label: "07 · Human Interaction" },
  { id: "pavilion", label: "08 · The Pavilion" },
  { id: "concept", label: "09 · Design Concept" },
  { id: "archive", label: "10 · Media / Archive" },
] as const;

const PROGRESS_IDS = PROGRESS_STEPS.map((s) => s.id);

function labelFor(id: string) {
  return (
    PROGRESS_STEPS.find((step) => step.id === id)?.label ??
    SITE_SECTIONS.find((s) => s.id === id)?.label ??
    id.replace(/-/g, " ")
  );
}

export function ScrollProgress() {
  const [active, setActive] = useState<string | null>(null);
  /** Document Y of each section top (same order as PROGRESS_IDS) — avoids layout reads every wheel tick. */
  const topsRef = useRef<number[] | null>(null);

  useEffect(() => {
    const measureTops = () => {
      const y = window.scrollY;
      const next: number[] = [];
      for (const id of PROGRESS_IDS) {
        const el = document.getElementById(id);
        next.push(el ? el.getBoundingClientRect().top + y : Number.POSITIVE_INFINITY);
      }
      topsRef.current = next;
    };

    let didRemeasurePastHero = false;
    const getCurrentSection = () => {
      const scrollY = window.scrollY;
      if (scrollY < 120) return null;
      if (!didRemeasurePastHero && scrollY > window.innerHeight * 0.85) {
        didRemeasurePastHero = true;
        measureTops();
      }
      const scanLineY = scrollY + window.innerHeight * 0.3;
      let tops = topsRef.current;
      if (!tops || tops.length !== PROGRESS_IDS.length) {
        measureTops();
        tops = topsRef.current;
      }
      if (!tops || tops.length !== PROGRESS_IDS.length) return null;
      let currentId: string | null = null;
      for (let i = 0; i < PROGRESS_IDS.length; i++) {
        const top = tops[i]!;
        if (!Number.isFinite(top)) continue;
        if (top <= scanLineY) currentId = PROGRESS_IDS[i]!;
        else break;
      }
      return currentId;
    };

    let raf = 0;
    const tick = () => {
      raf = 0;
      const next = getCurrentSection();
      setActive((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      didRemeasurePastHero = false;
      measureTops();
      schedule();
    };

    measureTops();
    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    if ("fonts" in document && document.fonts?.ready) {
      void document.fonts.ready.then(measureTops).catch(() => {});
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    setActive(id);
    scrollToSection(id);
  }, []);

  return (
    <aside
      className="pointer-events-auto fixed top-1/2 z-[190] hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
      style={{
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
      aria-label="Section progress"
    >
      {PROGRESS_STEPS.map(({ id }) => {
        const isActive = active !== null && active === id;
        return (
          <button
            key={id}
            type="button"
            title={labelFor(id)}
            aria-label={labelFor(id)}
            aria-current={isActive ? "true" : undefined}
            onClick={() => scrollTo(id)}
            className={`group flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
              isActive
                ? "border-[var(--accent-soft)] bg-white/95 shadow-[0_0_22px_rgba(99,140,255,0.22)]"
                : "border-[var(--hairline)] bg-white/50 hover:bg-white/85"
            }`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2 w-2 bg-[var(--accent-soft)]"
                  : "h-1.5 w-1.5 bg-[var(--ink-muted)] opacity-45 group-hover:opacity-90"
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
