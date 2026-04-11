"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { AirSensitive } from "@/components/air/AirSensitive";

const HeroPavilionCanvas = dynamic(
  () =>
    import("@/components/three/HeroPavilionCanvas").then((m) => m.HeroPavilionCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 flex items-center justify-center bg-[#0c1016]"
        aria-hidden
      >
        <div className="h-px w-16 animate-pulse bg-[var(--accent-cyan)]/50" />
      </div>
    ),
  },
);

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[var(--canvas)] pb-20 pt-8 md:pb-28"
    >
      <div className="ethereal-layer pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="ethereal-layer ethereal-layer--lag pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card mt-4 overflow-hidden rounded-[1.35rem] shadow-[var(--shadow-soft)]"
        >
          <div className="relative aspect-[21/9] min-h-[200px] w-full md:min-h-[280px]">
            <HeroPavilionCanvas className="h-full w-full" />
            {/* Light scrim so typography below stays legible; pointer-events none so OrbitControls work */}
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-[var(--canvas)] via-[var(--canvas)]/20 to-transparent"
              aria-hidden
            />
          </div>
        </motion.div>

        <div className="mt-12 flex flex-1 flex-col items-center text-center md:mt-16">
          <AirSensitive strength={10} radius={200} className="max-w-4xl">
            <h1 className="font-display text-[clamp(2.75rem,9vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--ink)]">
              Pneumitecture
            </h1>
          </AirSensitive>
          <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--ink-muted)] md:text-xl">
            Inflatable Systems for Adaptive Spaces
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)] md:text-[15px]">
            Cellular modules using pneumatic logic to adapt and react to human presence —
            soft, deployable, and metabolically responsive.
          </p>

          <motion.a
            href="#concept"
            className="mt-auto flex flex-col items-center gap-2 pb-4 pt-16 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--ink-muted)]"
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Scroll Down
            <span className="inline-block h-8 w-px bg-linear-to-b from-[var(--accent-soft)] to-transparent" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
