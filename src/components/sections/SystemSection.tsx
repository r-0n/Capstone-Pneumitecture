"use client";

import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type NodeDef = {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: string;
  color: string;
  description: string;
};

type EdgeDef = {
  a: string;
  b: string;
  type: "air" | "electrical" | "mount" | "mesh";
};

const GRAPH_W = 1100;
const GRAPH_H = 620;

const BASE_NODES: NodeDef[] = [
  {
    id: "pump",
    x: 120,
    y: 300,
    label: "Air Pump (Main Source)",
    icon: "◉",
    color: "#9eff7a",
    description: "Primary air source. A single tube carries pressurized air from the pump into the manifold inlet.",
  },
  {
    id: "manifold",
    x: 320,
    y: 300,
    label: "Manifold (9 Outputs)",
    icon: "▤",
    color: "#7dc3ff",
    description: "Air distribution hub. One inlet from the pump splits into 9 dedicated output lines.",
  },
  {
    id: "controller",
    x: 470,
    y: 520,
    label: "Control Logic",
    icon: "</>",
    color: "#d983ff",
    description: "Sends electrical control states to each solenoid valve to allow/stop airflow per channel.",
  },
  {
    id: "frame",
    x: 980,
    y: 300,
    label: "Mounting Frame",
    icon: "▥",
    color: "#f2dc65",
    description: "Physical frame supporting all 9 TPU cells in a 3×3 spatial array.",
  },
];

const VALVE_POSITIONS = [
  [560, 150],
  [660, 150],
  [760, 150],
  [560, 300],
  [660, 300],
  [760, 300],
  [560, 450],
  [660, 450],
  [760, 450],
] as const;

const CELL_POSITIONS = [
  [840, 150],
  [910, 150],
  [980, 150],
  [840, 300],
  [910, 300],
  [980, 300],
  [840, 450],
  [910, 450],
  [980, 450],
] as const;

const VALVE_NODES: NodeDef[] = VALVE_POSITIONS.map(([x, y], i) => ({
  id: `valve-${i + 1}`,
  x,
  y,
  label: `Solenoid Valve ${i + 1}`,
  icon: "◌",
  color: "#73f2da",
  description: `Control point ${i + 1}/9. Opens or closes to regulate whether air passes to TPU Cell ${i + 1}.`,
}));

const CELL_NODES: NodeDef[] = CELL_POSITIONS.map(([x, y], i) => ({
  id: `cell-${i + 1}`,
  x,
  y,
  label: `TPU Cell ${i + 1}`,
  icon: "⬡",
  color: "#ffb36b",
  description: `Inflatable membrane chamber ${i + 1}/9 mounted on frame. Expands when Valve ${i + 1} is opened.`,
}));

const NODES: NodeDef[] = [...BASE_NODES, ...VALVE_NODES, ...CELL_NODES];

const EDGES: EdgeDef[] = [
  { a: "pump", b: "manifold", type: "air" },
  ...VALVE_NODES.flatMap((v, i) => [
    { a: "manifold", b: v.id, type: "air" as const },
    { a: "controller", b: v.id, type: "electrical" as const },
    { a: v.id, b: `cell-${i + 1}`, type: "air" as const },
    { a: "frame", b: `cell-${i + 1}`, type: "mount" as const },
  ]),
  // Delaunay-style mesh links to reinforce network readability.
  ...VALVE_NODES.filter((_, i) => i % 3 !== 2).map((v, i) => ({
    a: v.id,
    b: VALVE_NODES[i + 1].id,
    type: "mesh" as const,
  })),
  ...CELL_NODES.filter((_, i) => i % 3 !== 2).map((c, i) => ({
    a: c.id,
    b: CELL_NODES[i + 1].id,
    type: "mesh" as const,
  })),
];

function SystemSchematic() {
  const [activeId, setActiveId] = useState<string | null>("pump");
  const [lockedId, setLockedId] = useState<string | null>(null);

  const nodeMap = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), []);
  const selectedId = lockedId ?? activeId;
  const selected = selectedId ? nodeMap[selectedId] : null;

  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#070e1f] px-4 py-5 shadow-[0_40px_80px_rgba(2,6,18,0.55)] md:px-7 md:py-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(84,143,255,0.18),transparent_46%),radial-gradient(circle_at_85%_15%,rgba(109,224,209,0.14),transparent_42%),radial-gradient(circle_at_75%_80%,rgba(236,116,255,0.10),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0)_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative grid gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="text-white/90">
          <p className="font-display text-[clamp(1.45rem,2.1vw,1.85rem)] uppercase tracking-[0.18em]">
            System Design
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
            Pneumatic Responsive Architecture
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/64">
            Air pump is the main source. One tube feeds the manifold, manifold splits to 9 outputs,
            each output feeds one solenoid valve, and each valve gates airflow into one TPU cell on
            the frame.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/45">
            Hover or click a node to learn more
          </p>

          <div className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/72">
              Connection Types
            </p>
            <ul className="mt-3 space-y-2 text-[11px] text-white/60">
              <li className="flex items-center gap-2">
                <span className="h-px w-7 bg-cyan-300/80" />
                Air Flow
              </li>
              <li className="flex items-center gap-2">
                <span className="h-px w-7 border-t border-dashed border-fuchsia-300/65" />
                Electrical Signal
              </li>
              <li className="flex items-center gap-2">
                <span className="h-px w-7 border-t border-dashed border-amber-300/65" />
                Frame Mount Link
              </li>
            </ul>
          </div>
        </aside>

        <div className="relative min-h-[560px] rounded-2xl border border-white/8 bg-black/20">
          <svg
            viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <radialGradient id="pulseGlow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#d58bff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d58bff" stopOpacity="0" />
              </radialGradient>
            </defs>
            {EDGES.map((edge) => {
              const na = nodeMap[edge.a];
              const nb = nodeMap[edge.b];
              if (!na || !nb) return null;
              const active = selectedId === edge.a || selectedId === edge.b;
              const styleByType = {
                air: {
                  stroke: active ? "#9fe7ff" : "#89b7d4",
                  opacity: active ? 0.82 : 0.35,
                  width: active ? 1.85 : 1.25,
                  dash: "0",
                },
                electrical: {
                  stroke: active ? "#f1a0ff" : "#ce9be6",
                  opacity: active ? 0.84 : 0.42,
                  width: active ? 1.6 : 1.1,
                  dash: "4 5",
                },
                mount: {
                  stroke: active ? "#ffd98e" : "#e0c48a",
                  opacity: active ? 0.66 : 0.26,
                  width: active ? 1.45 : 1.0,
                  dash: "2 6",
                },
                mesh: {
                  stroke: active ? "#b9ecff" : "#9cb7d5",
                  opacity: active ? 0.62 : 0.16,
                  width: active ? 1.15 : 0.9,
                  dash: "2 8",
                },
              } as const;
              const s = styleByType[edge.type];
              return (
                <line
                  key={`${edge.a}-${edge.b}`}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke={s.stroke}
                  strokeOpacity={s.opacity}
                  strokeWidth={s.width}
                  strokeDasharray={s.dash}
                />
              );
            })}
            {NODES.map((n) => (
              <circle key={`point-${n.id}`} cx={n.x} cy={n.y} r="2.4" fill="#e7f1ff" fillOpacity="0.85" />
            ))}
          </svg>

          {NODES.map((n) => {
            const isActive = selectedId === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onMouseEnter={() => setActiveId(n.id)}
                onMouseLeave={() => setActiveId((curr) => (lockedId ? curr : null))}
                onClick={() => setLockedId((curr) => (curr === n.id ? null : n.id))}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                style={{ left: `${(n.x / GRAPH_W) * 100}%`, top: `${(n.y / GRAPH_H) * 100}%` }}
                aria-label={n.label}
              >
                <motion.span
                  className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(184,132,255,0.22), transparent 64%)" }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                />
                <span
                  className="relative grid h-9 w-9 place-items-center rounded-full border text-[13px] transition-all duration-300"
                  style={{
                    borderColor: isActive ? n.color : "rgba(255,255,255,0.22)",
                    color: isActive ? n.color : "rgba(238,244,255,0.92)",
                    background: isActive ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.03)",
                    boxShadow: isActive ? `0 0 16px ${n.color}55` : "none",
                  }}
                >
                  {n.icon}
                </span>
              </button>
            );
          })}

          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="pointer-events-none absolute max-w-[230px] rounded-xl border border-white/15 bg-[#0a1429]/90 px-3 py-2.5 text-white/90 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
              style={{
                left: `${Math.min(82, Math.max(18, (selected.x / GRAPH_W) * 100))}%`,
                top: `${Math.max(14, (selected.y / GRAPH_H) * 100 - 10)}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: selected.color }}>
                {selected.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/76">{selected.description}</p>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function SystemSection() {
  return (
    <section
      id="system"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] bg-blueprint py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1100px] px-5 md:px-10">
        <SectionLabel number="05" text="System" />
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            System Dynamics
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            System Design
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--ink-muted)]">
            1 air pump feeds 1 manifold. The manifold branches into 9 output tubes, each routed through
            a dedicated solenoid valve into 1 of 9 TPU cells mounted on the frame.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card mt-16 rounded-2xl px-2 py-3 md:px-4 md:py-4"
        >
          <SystemSchematic />
          <p className="mt-6 text-center text-xs text-[var(--ink-muted)]">
            Click a node to pin details. Click again to release and keep exploring.
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
