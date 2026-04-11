"use client";

import { useCallback, useEffect, useState } from "react";
import { SITE_SECTIONS } from "@/config/navigation";

/** Right-rail dots — one per major narrative block (matches mockup rhythm) */
const PROGRESS_IDS = [
  "concept",
  "system",
  "material",
  "prototyping",
  "behavior",
  "pavilion",
] as const;

function labelFor(id: string) {
  return SITE_SECTIONS.find((s) => s.id === id)?.label ?? id;
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
