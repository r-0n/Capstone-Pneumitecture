"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export type DesignProcessSlide =
  | { type: "image"; src: string; caption: string; alt: string }
  | { type: "video"; src: string; caption: string; alt: string; poster?: string }
  /** Google Drive preview, YouTube embed, etc. `src` is the iframe `src` URL. */
  | { type: "iframe"; src: string; caption: string; alt: string; poster?: string };

type DesignProcessPhaseSliderProps = {
  slides: readonly DesignProcessSlide[];
  /** First phase hero LCP */
  priority?: boolean;
};

export function DesignProcessPhaseSlider({ slides, priority = false }: DesignProcessPhaseSliderProps) {
  const [index, setIndex] = useState(0);
  const n = slides.length;
  const current = slides[index]!;

  const go = useCallback(
    (delta: number) => {
      if (n <= 1) return;
      setIndex((prev) => (prev + delta + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (n <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, n]);

  return (
    <div className="w-full">
      {/* Track is absolutely sized so `Image fill` parents keep height (flex row + only absolute children collapses). */}
      <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--hairline)] bg-bone shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        <div
          className="absolute inset-0 flex ease-out [transition-duration:420ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [transition-property:transform]"
          style={{
            width: `${n * 100}%`,
            transform: `translateX(-${(100 * index) / n}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={`${slide.type}-${i}-${"src" in slide ? slide.src : i}`}
              className="relative h-full shrink-0 self-stretch"
              style={{ flex: `0 0 ${100 / n}%` }}
            >
              {slide.type === "image" ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain p-1"
                  sizes="(max-width:768px) 92vw, 33vw"
                  priority={priority && i === 0}
                  draggable={false}
                />
              ) : slide.type === "iframe" ? (
                i === index ? (
                  <iframe
                    key={slide.src}
                    src={slide.src}
                    title={slide.alt}
                    className="absolute inset-0 h-full w-full rounded-sm border-0 bg-bone p-0.5"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : slide.poster ? (
                  <Image src={slide.poster} alt={slide.alt} fill className="object-contain p-1 opacity-80" sizes="(max-width:768px) 92vw, 33vw" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-bone p-4">
                    <span className="font-sans text-[9px] font-light uppercase tracking-widest text-structural/45">Embed</span>
                  </div>
                )
              ) : slide.type === "video" ? (
                i === index ? (
                  <video
                    key={slide.src}
                    className="absolute inset-0 h-full w-full object-contain p-1"
                    controls
                    playsInline
                    preload="metadata"
                    poster={slide.poster}
                    aria-label={slide.alt}
                  >
                    <source src={slide.src} />
                  </video>
                ) : slide.poster ? (
                  <Image src={slide.poster} alt={slide.alt} fill className="object-contain p-1 opacity-80" sizes="(max-width:768px) 92vw, 33vw" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-bone p-4">
                    <span className="font-sans text-[9px] font-light uppercase tracking-widest text-structural/45">Video</span>
                  </div>
                )
              ) : null}
            </div>
          ))}
        </div>

        {n > 1 ? (
          <>
            <div
              className="pointer-events-none absolute bottom-2 right-2 z-20 rounded border border-[var(--hairline)] bg-bone/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-structural backdrop-blur-sm"
              aria-live="polite"
            >
              {index + 1} / {n}
            </div>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="absolute left-1.5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--hairline)] bg-bone/95 text-xl font-light text-obsidian shadow-sm backdrop-blur-sm transition hover:bg-bone"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="absolute right-1.5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--hairline)] bg-bone/95 text-xl font-light text-obsidian shadow-sm backdrop-blur-sm transition hover:bg-bone"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {n > 1 ? (
        <div
          className="mb-2 flex min-h-[2.75rem] w-full flex-col items-center justify-center gap-1.5 px-1"
          role="tablist"
          aria-label="Process media slides"
        >
          <span
            className="pointer-events-none h-px w-[min(100%,18rem)] shrink-0 bg-gradient-to-r from-transparent via-structural/25 to-transparent"
            aria-hidden
          />
          <div className="flex max-h-[4.5rem] max-w-full flex-wrap justify-center gap-x-2 gap-y-2 overflow-y-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {slides.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={`dot-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Slide ${i + 1} of ${n}`}
                  onClick={() => setIndex(i)}
                  className="group relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(107,140,255,0.12) 0%, transparent 70%)",
                    }}
                    aria-hidden
                  />
                  <motion.span
                    layout
                    className={`rounded-full border border-structural/20 bg-bone shadow-inner ${
                      active
                        ? "bg-obsidian ring-2 ring-cyan-400/35 shadow-[0_0_14px_rgba(107,140,255,0.45)]"
                        : "bg-structural/15 group-hover:bg-structural/25"
                    }`}
                    initial={false}
                    animate={{
                      width: active ? 10 : 6,
                      height: active ? 10 : 6,
                    }}
                    transition={{ type: "spring", stiffness: 520, damping: 28 }}
                  />
                  {active ? (
                    <span
                      className="pointer-events-none absolute inset-0 animate-pulse rounded-full border border-cyan-400/20 motion-reduce:animate-none"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex items-stretch gap-2">
        <button
          type="button"
          aria-label="Previous slide"
          disabled={n <= 1}
          onClick={() => go(-1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] bg-bone text-lg font-light text-obsidian transition hover:bg-foreground/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ‹
        </button>

        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-[var(--hairline)] bg-bone/60 px-2.5 py-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.caption}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-center font-display text-[10px] font-light italic leading-snug text-structural sm:text-[11px]"
            >
              {current.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Next slide"
          disabled={n <= 1}
          onClick={() => go(1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] bg-bone text-lg font-light text-obsidian transition hover:bg-foreground/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ›
        </button>
      </div>

      {n > 1 ? (
        <p className="mt-1 text-center font-sans text-[8px] font-light tracking-wide text-structural/50">
          ← → keys · arrows on image · orbit dots
        </p>
      ) : null}
    </div>
  );
}
