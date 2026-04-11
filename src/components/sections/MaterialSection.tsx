"use client";

import { motion } from "framer-motion";

const materials = [
  { name: "TPU Film 0.5mm", note: "Primary bladder skin" },
  { name: "Clear PVC", note: "Early comparative trials" },
  { name: "Mesh Reinforced TPU", note: "Tear propagation control" },
];

const rows = [
  { mat: "TPU 0.5mm", flex: "High", seal: "Good", dur: "B+" },
  { mat: "PVC", flex: "Med", seal: "Varies", dur: "B" },
  { mat: "Mesh TPU", flex: "Med–High", seal: "Very Good", dur: "A-" },
];

export function MaterialSection() {
  return (
    <section
      id="material"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-[var(--canvas)] py-24 md:py-32"
    >
      <div className="ethereal-layer pointer-events-none absolute inset-0 opacity-35" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            Material &amp; Early Exploration
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Material Concept
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--ink-muted)] md:text-[15px]">
            Soft responsive architecture — evaluating flexibility, seal integrity, and durability
            before scaling cellular arrays.
          </p>
        </header>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="grid gap-4 sm:grid-cols-3">
            {materials.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="glass-card overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/5] bg-linear-to-br from-slate-800 via-slate-700 to-slate-900" />
                <div className="border-t border-[var(--hairline)] px-4 py-4">
                  <p className="text-xs font-semibold text-[var(--ink)]">{m.name}</p>
                  <p className="mt-1 text-[11px] text-[var(--ink-muted)]">{m.note}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="flex flex-wrap justify-center gap-8 border-b border-[var(--hairline)] pb-8">
              {["Flexibility", "Seal integrity", "Durability"].map((t) => (
                <div key={t} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--hairline)] bg-white/70 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                    {t.slice(0, 3)}
                  </div>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
                    {t}
                  </p>
                </div>
              ))}
            </div>
            <table className="mt-8 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--hairline)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                  <th className="pb-3 pr-4 font-medium">Material</th>
                  <th className="pb-3 pr-4 font-medium">Flex</th>
                  <th className="pb-3 pr-4 font-medium">Seal</th>
                  <th className="pb-3 font-medium">Durability</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-muted)]">
                {rows.map((r) => (
                  <tr key={r.mat} className="border-b border-[var(--hairline)]/70">
                    <td className="py-3 pr-4 font-medium text-[var(--ink)]">{r.mat}</td>
                    <td className="py-3 pr-4">{r.flex}</td>
                    <td className="py-3 pr-4">{r.seal}</td>
                    <td className="py-3">{r.dur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-16 text-center text-sm font-medium text-[var(--ink-muted)]">
          <a href="#prototyping" className="inline-flex items-center gap-2 hover:text-[var(--ink)]">
            Navigate to Prototyping
            <span aria-hidden className="text-[var(--accent-soft)]">
              ✦
            </span>
          </a>
        </p>
      </div>
    </section>
  );
}
