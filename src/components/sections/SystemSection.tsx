"use client";

import { motion } from "framer-motion";

function SystemSchematic() {
  const nodes = [
    { x: 90, label: "Reservoir" },
    { x: 250, label: "Pump" },
    { x: 410, label: "Manifold" },
    { x: 570, label: "Valves" },
    { x: 780, label: "TPU Cells" },
  ];
  const r = 26;

  return (
    <svg
      viewBox="0 0 900 190"
      className="mx-auto h-auto w-full max-w-4xl text-[var(--ink)]"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="s-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6b8cff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5eb8d4" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {nodes.slice(0, -1).map((n, i) => {
        const next = nodes[i + 1];
        return (
          <line
            key={`${n.x}-${next.x}`}
            x1={n.x + r}
            y1="95"
            x2={next.x - r}
            y2="95"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1.5"
            strokeDasharray="5 7"
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle
            cx={n.x}
            cy="95"
            r={r + 6}
            stroke="url(#s-glow)"
            strokeWidth="3"
            opacity={i === nodes.length - 1 ? 0.85 : 0.35}
          />
          <circle
            cx={n.x}
            cy="95"
            r={r}
            className="fill-white"
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          <text
            x={n.x}
            y="152"
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontSize="11"
            fontWeight="600"
            letterSpacing="0.14em"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function SystemSection() {
  return (
    <section
      id="system"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-blueprint py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1100px] px-5 md:px-10">
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            System Dynamics
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            System Design
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--ink-muted)]">
            From reservoir to cellular output — pressure, routing, and timed release shape the
            wall&apos;s behavior.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card mt-16 rounded-2xl px-4 py-10 md:px-10 md:py-12"
        >
          <SystemSchematic />
          <p className="mt-8 text-center text-xs text-[var(--ink-muted)]">
            Pumps → Valves → Inflatable cells — schematic abstraction for portfolio narrative.
          </p>
        </motion.div>

        <div className="mt-14 flex justify-center">
          <a
            href="#behavior"
            className="rounded-full border border-[var(--hairline-strong)] bg-white/80 px-8 py-3 text-sm font-medium text-[var(--ink)] shadow-sm transition hover:border-[var(--accent-soft)] hover:shadow-md"
          >
            View Responsive Behaviors
          </a>
        </div>
      </div>
    </section>
  );
}
