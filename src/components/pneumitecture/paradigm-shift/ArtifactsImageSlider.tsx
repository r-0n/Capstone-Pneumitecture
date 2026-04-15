"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { publicAssetPath } from "@/lib/publicAssetPath";

const SLIDES = [
  {
    chapter: "I",
    src: publicAssetPath("/images/artifacts/spatial-light-concept.png"),
    alt: "Concept sketch: perspective room with spotlights, figures, and floating cube cluster",
    caption: "Spatial light study — pavilion concept",
    tag: "Spatial",
  },
  {
    chapter: "II",
    src: publicAssetPath("/images/artifacts/motion-sketch-sheet.png"),
    alt: "Digital sketch sheet with motion studies, hand gesture, and free drawing notes",
    caption: "Motion studies — free drawing sheet",
    tag: "Motion",
  },
  {
    chapter: "III",
    src: publicAssetPath("/images/artifacts/hex-module-study.png"),
    alt: "Ink sketch of hexagonal modules and structural diagram on paper",
    caption: "Hex module study — structural diagram",
    tag: "Structure",
  },
] as const;

type ArtifactsTone = "dark" | "light";

type ArtifactsImageSliderProps = {
  tone: ArtifactsTone;
};

export function ArtifactsImageSlider({ tone }: ArtifactsImageSliderProps) {
  const [index, setIndex] = useState(0);
  const n = SLIDES.length;
  const isLight = tone === "light";

  const go = useCallback(
    (delta: number) => {
      setIndex((prev) => (prev + delta + n) % n);
    },
    [n],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const mat = isLight
    ? "border-neutral-400/50 bg-[linear-gradient(165deg,#f6f4ef_0%,#ebe8e0_45%,#f2efe8_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_18px_48px_rgba(20,22,26,0.08)]"
    : "border-white/[0.12] bg-[linear-gradient(165deg,#141416_0%,#0a0a0c_50%,#121214_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_22px_60px_rgba(0,0,0,0.5)]";

  const reel = isLight
    ? "border-neutral-500/25 bg-white ring-1 ring-black/[0.04]"
    : "border-white/10 bg-neutral-950 ring-1 ring-white/[0.06]";

  const btn =
    "group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[15px] font-light leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/45";
  const btnIdle = isLight
    ? "border-neutral-400/60 bg-white/90 text-neutral-700 hover:border-neutral-500 hover:bg-white"
    : "border-white/15 bg-white/[0.05] text-white/85 hover:border-white/28 hover:bg-white/[0.1]";

  const chip = isLight
    ? "border-neutral-300/70 bg-white/90 text-neutral-700 shadow-sm"
    : "border-white/15 bg-black/55 text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.35)]";

  const gridPaper = isLight
    ? "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-[0.35] before:[background-image:linear-gradient(rgba(20,22,26,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(20,22,26,0.04)_1px,transparent_1px)] before:[background-size:14px_14px]"
    : "";

  return (
    <div className="mb-5 w-full">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <p
          className={`font-display text-[10px] font-light uppercase tracking-[0.38em] ${
            isLight ? "text-neutral-500" : "text-white/40"
          }`}
        >
          Sketch reel
        </p>
        <p className={`font-sans text-[9px] font-light tracking-wide ${isLight ? "text-neutral-400" : "text-white/35"}`}>
          ← → keys · click segments
        </p>
      </div>

      <div className={`relative rounded-xl border p-2.5 sm:p-3 md:p-3.5 ${mat} ${gridPaper}`}>
        {/* Drafting corner ticks */}
        <span
          className={`pointer-events-none absolute left-1.5 top-1.5 h-4 w-4 border-l border-t ${isLight ? "border-neutral-800/25" : "border-white/20"}`}
          aria-hidden
        />
        <span
          className={`pointer-events-none absolute right-1.5 top-1.5 h-4 w-4 border-r border-t ${isLight ? "border-neutral-800/25" : "border-white/20"}`}
          aria-hidden
        />
        <span
          className={`pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 border-b border-l ${isLight ? "border-neutral-800/25" : "border-white/20"}`}
          aria-hidden
        />
        <span
          className={`pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 border-b border-r ${isLight ? "border-neutral-800/25" : "border-white/20"}`}
          aria-hidden
        />

        <div className="relative -rotate-[0.4deg] sm:-rotate-[0.25deg]">
          <div className={`relative overflow-hidden rounded-lg border shadow-lg ${reel}`}>
            {/* Film perforation strip (top) */}
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 z-10 flex h-2.5 items-center justify-center gap-[5px] border-b px-2 ${
                isLight ? "border-neutral-200/80 bg-neutral-100/90" : "border-white/10 bg-black/40"
              }`}
              aria-hidden
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-1 rounded-[1px] ${isLight ? "bg-neutral-400/50" : "bg-white/25"}`}
                />
              ))}
            </div>

            <div className="relative aspect-[16/10] w-full pt-2.5">
              <div
                className="flex h-full ease-out [transition-duration:480ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: `${n * 100}%`,
                  transform: `translateX(-${(100 * index) / n}%)`,
                }}
              >
                {SLIDES.map((slide, i) => (
                  <div
                    key={slide.src}
                    className="relative h-full shrink-0"
                    style={{ flex: `0 0 ${100 / n}%` }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className={`object-contain px-1 pb-1 pt-0.5 ${isLight ? "bg-[#faf9f7]" : "bg-[#080808]"}`}
                      sizes="(max-width:1024px) 92vw, 520px"
                      priority={i === 0}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              <div
                className={`pointer-events-none absolute right-2 top-5 z-20 flex items-center gap-2 rounded-md border px-2 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm ${chip}`}
              >
                <span
                  className={`font-display text-[11px] font-extralight tracking-[0.15em] ${
                    isLight ? "text-cyan-800/90" : "text-cyan-300/90"
                  }`}
                >
                  {SLIDES[index].chapter}
                </span>
                <span className={isLight ? "text-neutral-400" : "text-white/40"}>/</span>
                <span className={isLight ? "text-neutral-500" : "text-white/45"}>{String(n).padStart(2, "0")}</span>
              </div>

              <motion.div
                className={`pointer-events-none absolute left-2 top-5 z-20 rounded px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-[0.28em] backdrop-blur-sm ${chip}`}
                key={SLIDES[index].tag}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {SLIDES[index].tag}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Segmented rail */}
        <div className="mt-3 flex gap-1.5 px-0.5" role="tablist" aria-label="Sketch slides">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${slide.tag} — slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative h-1 flex-1 overflow-hidden rounded-full ${
                isLight ? "bg-neutral-300/50" : "bg-white/10"
              }`}
            >
              <motion.span
                layout
                className={`absolute inset-y-0 left-0 rounded-full ${
                  isLight ? "bg-neutral-800" : "bg-white"
                }`}
                initial={false}
                animate={{
                  width: i === index ? "100%" : "22%",
                  opacity: i === index ? 1 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-stretch gap-3">
          <button type="button" className={`${btn} ${btnIdle}`} aria-label="Previous sketch" onClick={() => go(-1)}>
            <span className="transition group-hover:-translate-x-0.5">‹</span>
          </button>

          <div
            className={`min-w-0 flex-1 overflow-hidden rounded-md border px-3 py-2 ${
              isLight
                ? "border-neutral-800/[0.08] bg-neutral-900/[0.03]"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={SLIDES[index].caption}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p
                  className={`font-display text-[11px] font-light italic leading-snug sm:text-xs ${
                    isLight ? "text-neutral-800" : "text-white/88"
                  }`}
                >
                  {SLIDES[index].caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button type="button" className={`${btn} ${btnIdle}`} aria-label="Next sketch" onClick={() => go(1)}>
            <span className="transition group-hover:translate-x-0.5">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
