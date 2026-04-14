"use client";

import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { motion } from "framer-motion";

const versions = [
  {
    id: "V1",
    title: "Early sealing",
    copy: "Square pillow geometry — crude heat sealing, limited articulation.",
  },
  {
    id: "V2",
    title: "Modularity",
    copy: "Cell clusters with proximity response — hand-scale sensing and first valve choreography.",
  },
  {
    id: "V3",
    title: "Full module",
    copy: "Transparent cellular module with refined logic — exhibition-ready responsiveness.",
  },
];

export function PrototypingSection() {
  return (
    <section
      id="prototyping"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-[var(--canvas)] py-24 md:py-32"
    >
      <div className="ethereal-layer pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionLabel number="06" text="Prototyping" />
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            Prototyping
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Prototype Iterations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--ink-muted)]">
            Soft responsive architecture — from first seal tests to a full-scale cellular module.
          </p>
        </header>

        <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-stretch md:justify-between md:gap-6">
          {versions.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card relative flex-1 rounded-2xl p-8 text-center md:p-10"
            >
              {i < versions.length - 1 ? (
                <span
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-lg text-[var(--ink-muted)] md:block"
                  aria-hidden
                >
                  →
                </span>
              ) : null}
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                {v.id}
              </span>
              <h3 className="font-display mt-3 text-lg font-semibold text-[var(--ink)]">{v.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">{v.copy}</p>
              <div className="mt-8 aspect-video w-full rounded-xl bg-linear-to-br from-white to-slate-200/80 shadow-inner" />
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="glass-card aspect-[4/3] overflow-hidden rounded-2xl bg-linear-to-br from-slate-100 to-slate-200/90"
            />
          ))}
          <div className="glass-card flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--hairline-strong)] bg-white/50 text-center">
            <span className="rounded-full border border-[var(--ink)]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-muted)]">
              GIF
            </span>
            <p className="px-4 text-xs font-medium text-[var(--ink)]">V3 in Action — responsive sequence</p>
          </div>
        </div>

        <p className="mt-16 text-center text-sm font-medium text-[var(--ink-muted)]">
          <a href="#system" className="inline-flex items-center gap-2 hover:text-[var(--ink)]">
            Go to System Design
            <span aria-hidden className="text-[var(--accent-soft)]">
              ✦
            </span>
          </a>
        </p>
      </div>
    </section>
  );
}
