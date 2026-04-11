"use client";

import { motion } from "framer-motion";

const scenarios = [
  {
    title: "Scenario 1 — Subtle response",
    tag: "Approach",
    before: "Flat cellular array at rest — distance sensing armed at the corner.",
    after: "Slow inflation along an inviting spatial curve — air routed to lift the field toward the visitor.",
  },
  {
    title: "Scenario 2 — Dynamic movement",
    tag: "React",
    before: "Uniform resting pressure across the grid.",
    after: "Accelerated articulation — valve pattern redirects attention along a choreographed ridge.",
  },
  {
    title: "Scenario 3 — Playful interaction",
    tag: "Interact",
    before: "Partially inflated dynamic state.",
    after: "High-contrast, game-like pulses when hands meet the surface — tactile reward loop.",
  },
];

export function BehaviorSection() {
  return (
    <section
      id="behavior"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-blueprint py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1100px] px-5 md:px-10">
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            Responsive Behavior
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Human Interaction
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--ink-muted)]">
            Intelligent environment, real-time adaptability, intuitive interaction — three calibrated
            modes of pneumatic expression.
          </p>
        </header>

        <div className="mt-16 flex flex-col gap-16">
          {scenarios.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.06 }}
              className="glass-card overflow-hidden rounded-2xl"
            >
              <div className="border-b border-[var(--hairline)] bg-white/40 px-6 py-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                  {s.tag}
                </p>
                <h3 className="font-display mt-1 text-lg font-semibold text-[var(--ink)]">{s.title}</h3>
              </div>
              <div className="grid gap-px bg-[var(--hairline)] md:grid-cols-2">
                <div className="bg-white/55 p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                    Before
                  </p>
                  <div className="mt-6 aspect-[16/10] rounded-xl bg-linear-to-br from-slate-100 to-slate-200/80" />
                  <p className="mt-6 text-sm leading-relaxed text-[var(--ink-muted)]">{s.before}</p>
                </div>
                <div className="bg-white/70 p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                    After
                  </p>
                  <div className="mt-6 aspect-[16/10] rounded-xl bg-linear-to-br from-sky-50 via-white to-indigo-100/80 shadow-inner" />
                  <p className="mt-6 text-sm leading-relaxed text-[var(--ink-muted)]">{s.after}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#pavilion"
            className="rounded-full border border-[var(--hairline-strong)] bg-white/85 px-10 py-3.5 text-sm font-medium text-[var(--ink)] shadow-sm transition hover:border-[var(--accent-soft)] hover:shadow-md"
          >
            Scale Up: Pavilion Vision
          </a>
        </div>
      </div>
    </section>
  );
}
