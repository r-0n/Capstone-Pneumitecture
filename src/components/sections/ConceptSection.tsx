"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Softness",
    copy:
      "Contrast with rigid architecture — emotional and spatial qualities that invite empathy and gradual adaptation.",
  },
  {
    title: "Inflatables",
    copy:
      "Lightweight, deployable, transformable geometries that fold for transit and expand for occupation.",
  },
  {
    title: "Pneumatics",
    copy:
      "Control through air — real-time responsiveness and clear actuation logic across cellular arrays.",
  },
];

function CellOrb({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-square w-full max-w-[220px]"
    >
      <div
        className="absolute inset-0 rounded-full opacity-90 shadow-[inset_0_-20px_40px_rgba(255,255,255,0.5)]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, rgba(220,235,255,0.75) 28%, rgba(180,210,240,0.55) 52%, rgba(160,180,210,0.35) 100%)",
        }}
      />
      <div className="absolute inset-[12%] rounded-full bg-white/25 blur-xl" />
    </motion.div>
  );
}

export function ConceptSection() {
  return (
    <section
      id="concept"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-[var(--canvas)] py-24 md:py-32"
    >
      <div className="ethereal-layer pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            Design Concept
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Soft Responsive Architecture
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)] md:text-base">
            Inflatable systems for adaptive spatial design — cellular modules using pneumatic
            logic to adapt and react to human presence.
          </p>
        </header>

        <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className="glass-card flex flex-col rounded-2xl p-8 md:p-10"
            >
              <CellOrb delay={i * 0.12} />
              <h3 className="font-display mt-10 text-center text-xl font-semibold text-[var(--ink)]">
                {p.title}
              </h3>
              <p className="mt-4 text-center text-sm leading-relaxed text-[var(--ink-muted)]">
                {p.copy}
              </p>
              <p className="mt-8 border-t border-[var(--hairline)] pt-6 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                Adaptive &amp; Air Controlled
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
