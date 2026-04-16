"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { publicAssetPath } from "@/lib/publicAssetPath";

const REEF_IMG = publicAssetPath("/images/reef-rob-ley-joshua-stein.png");
const ALLOPLASTIC_IMG = publicAssetPath("/images/alloplastic-architecture-behnaz-farahi-bouzanjani.png");
const SLINKYBOT_IMG = publicAssetPath("/images/slinkybot-aya-riad.png");
const EPIPHYTE_CHAMBER_IMG = publicAssetPath("/images/epiphyte-chamber-philip-beesley.png");

const AUTO_MS = 5200;

const SLIDES = [
  {
    id: "reef",
    src: REEF_IMG,
    alt: "REEF — large-scale installation by Rob Ley and Joshua G. Stein",
    caption: "REEF (Rob Ley & Joshua G. Stein)",
  },
  {
    id: "slinkybot",
    src: SLINKYBOT_IMG,
    alt: "Slinkybot — illuminated flexible prototype by Aya Riad",
    caption: "Slinkybot by Aya Riad",
  },
  {
    id: "epiphyte",
    src: EPIPHYTE_CHAMBER_IMG,
    alt: "Epiphyte Chamber — immersive installation by Philip Beesley",
    caption: "Epiphyte Chamber by Philip Beesley",
  },
  {
    id: "alloplastic",
    src: ALLOPLASTIC_IMG,
    alt: "Alloplastic Architecture — experimental mesh structure by Behnaz Farahi Bouzanjani",
    caption: "Alloplastic Architecture by Behnaz Farahi Bouzanjani",
  },
] as const;

type SlideId = (typeof SLIDES)[number]["id"];

/** Stack order: back → front (last item is on top). REEF starts in front. */
const INITIAL_STACK: SlideId[] = ["slinkybot", "epiphyte", "alloplastic", "reef"];

function orderToStack(order: SlideId[]) {
  return order.map((id, stackIndex) => {
    const slide = SLIDES.find((s) => s.id === id)!;
    const depth = stackIndex;
    const n = order.length;
    const t = n > 1 ? depth / (n - 1) : 1;
    return { slide, depth, t };
  });
}

type InspirationWallProps = {
  /** When true, stretches to fill a grid cell (e.g. Paradigm bento). */
  fillContainer?: boolean;
  /** Light: bone/canvas band (top row). Dark: obsidian band (legacy). */
  tone?: "light" | "dark";
};

export function InspirationWall({ fillContainer = false, tone = "dark" }: InspirationWallProps) {
  const [order, setOrder] = useState<SlideId[]>(() => [...INITIAL_STACK]);
  const [paused, setPaused] = useState(false);
  /** Next allowed auto-advance time (ms); primed on first interval tick or on interaction. */
  const nextAutoAt = useRef<number | null>(null);

  const bringToFront = useCallback((id: SlideId) => {
    setOrder((prev) => [...prev.filter((x) => x !== id), id]);
    nextAutoAt.current = Date.now() + AUTO_MS;
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (nextAutoAt.current === null) {
        nextAutoAt.current = Date.now() + AUTO_MS;
        return;
      }
      if (Date.now() < nextAutoAt.current) return;
      setOrder((prev) => {
        if (prev.length < 2) return prev;
        const withoutFront = prev.slice(0, -1);
        const front = prev[prev.length - 1];
        return [front, ...withoutFront];
      });
      nextAutoAt.current = Date.now() + AUTO_MS;
    }, 380);
    return () => window.clearInterval(id);
  }, [paused]);

  const frontId = order[order.length - 1];
  const stack = orderToStack(order);

  const isLight = tone === "light";
  const labelClass = isLight ? "text-structural" : "text-white/50";
  const hintClass = isLight ? "text-[var(--ink-muted)]" : "text-white/35";
  const thumbActive = isLight ? "border-neutral-800/70 ring-2 ring-cyan-600/35" : "border-cyan-400/50 ring-2 ring-cyan-400/25";
  const thumbIdle = isLight ? "border-neutral-300/90 opacity-80 hover:border-neutral-500" : "border-white/15 opacity-70 hover:border-white/30 hover:opacity-100";
  const cardBorderFront = isLight ? "border-neutral-300/90 ring-1 ring-black/[0.06] shadow-[0_24px_50px_rgba(15,23,42,0.12)]" : "border-white/25 ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]";
  const cardBorderBack = isLight ? "border-neutral-300/60 cursor-pointer hover:border-neutral-500/80" : "border-white/12 cursor-pointer hover:border-white/22";

  return (
    <div
      className={
        fillContainer
          ? "relative flex h-full min-h-0 flex-1 flex-col"
          : "relative flex min-h-[300px] flex-col lg:min-h-[340px]"
      }
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        nextAutoAt.current = Date.now() + AUTO_MS;
      }}
    >
      <div className="mb-2 flex items-start justify-between gap-4">
        <p className={`font-sans text-[11px] font-semibold uppercase tracking-[0.26em] md:text-[12px] ${labelClass}`}>
          2. The inspiration
        </p>
        <p className={`max-w-[10rem] text-right font-sans text-[9px] font-light leading-snug ${hintClass}`}>
          Click a card or dot to bring it forward · pauses on hover
        </p>
      </div>

      <div className="relative mt-2 flex min-h-0 flex-1 flex-col gap-4">
        <div
          className={
            fillContainer
              ? "relative mx-auto aspect-[16/11] w-full min-h-[200px] max-h-[min(48vh,380px)] max-w-xl flex-1 lg:mx-0"
              : "relative mx-auto aspect-[16/11] w-full max-w-xl flex-1 lg:mx-0"
          }
          style={{ perspective: 1600 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-sm bg-[radial-gradient(ellipse_at_30%_20%,rgba(94,184,212,0.08),transparent_55%)]" />

          {stack.map(({ slide, depth, t }) => {
            const isFront = depth === stack.length - 1;
            return (
              <motion.button
                key={slide.id}
                type="button"
                layout
                aria-pressed={isFront}
                aria-label={`Show ${slide.caption}`}
                className={`absolute inset-x-[4%] top-[6%] aspect-[16/11] overflow-hidden rounded-xl border text-left outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
                  isFront ? cardBorderFront : cardBorderBack
                }`}
                style={{ transformOrigin: "90% 88%" }}
                initial={false}
                animate={{
                  zIndex: depth + 1,
                  x: depth * 22,
                  y: (stack.length - 1 - depth) * 6,
                  scale: 0.88 + t * 0.12,
                  rotate: (depth - (stack.length - 1) / 2) * -1.4,
                  filter: isFront ? "grayscale(0)" : "grayscale(0.35)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.85 }}
                onClick={() => bringToFront(slide.id)}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 92vw, 420px"
                  draggable={false}
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                    isLight ? "from-black/25" : "from-black/55"
                  } ${isFront ? "opacity-90" : "opacity-100"}`}
                />
                {isFront && (
                  <motion.p
                    layout
                    className={`absolute inset-x-0 bottom-0 px-3 py-2 text-center font-sans text-[9px] font-medium uppercase tracking-[0.2em] ${isLight ? "text-neutral-800" : "text-white/90"}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {slide.caption}
                  </motion.p>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 px-1" role="tablist" aria-label="Inspiration slides">
          {SLIDES.map((s) => {
            const active = s.id === frontId;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => bringToFront(s.id)}
                  className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-md border transition ${
                  active ? thumbActive : thumbIdle
                }`}
              >
                <Image src={s.src} alt="" fill className="object-cover" sizes="44px" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
