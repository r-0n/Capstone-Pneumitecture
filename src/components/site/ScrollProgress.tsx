"use client";

import { useCallback, useEffect, useState } from "react";
import { SITE_SECTIONS } from "@/config/navigation";
import { scrollToSection } from "@/lib/scrollToSection";

/** Right-rail dots — document order (see `siteLayout.ts`) */
const PROGRESS_IDS = [
  "pavilion-lead",
  "paradigm-shift",
  "concept",
  "design-process",
  "system",
  "materials",
  "prototyping",
  "behavior",
  "pavilion-walkthrough",
  "pavilion",
  "archive",
] as const;

const DOT_LABELS: Record<string, string> = {
  "pavilion-lead": "01 · Pavilion premise",
  "paradigm-shift": "Paradigm shift",
  concept: "02 · Design concept",
  "design-process": "03 · Design process",
  system: "04 · System",
  materials: "05 · Materials",
  prototyping: "06 · Prototyping",
  behavior: "07 · Behavior",
  "pavilion-walkthrough": "08 · Walkthrough",
  pavilion: "09 · The Pavilion",
  archive: "10 · Media archive",
};

function labelFor(id: string) {
  return (
    DOT_LABELS[id] ?? SITE_SECTIONS.find((s) => s.id === id)?.label ?? id.replace(/-/g, " ")
  );
}

export function ScrollProgress() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 140) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = PROGRESS_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: [0.12, 0.28] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <aside
      className="pointer-events-auto fixed right-4 top-1/2 z-[190] hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
      aria-label="Section progress"
    >
      {PROGRESS_IDS.map((id) => {
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
