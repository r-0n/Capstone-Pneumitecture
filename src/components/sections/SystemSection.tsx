"use client";

import SectionLabel from "@/components/pneumitecture/SectionLabel";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type NodeDef = {
  id: string;
  x: number;
  y: number;
  z: number;
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
const WORLD_CENTER = { x: 760, y: 330, z: 210 };
const DEFAULT_CAMERA = { yaw: -0.34, pitch: 0.18, zoom: 1 };
const BASE_FOCAL_LENGTH = 520;

const BASE_NODES: NodeDef[] = [
  {
    id: "pump",
    x: 120,
    y: 470,
    z: 40,
    label: "Air Pump (Main Source)",
    icon: "◉",
    color: "#9eff7a",
    description: "Primary air source. Feeds compressed air into the manifold.",
  },
  {
    id: "manifold",
    x: 330,
    y: 455,
    z: 55,
    label: "Manifold (9 Outputs)",
    icon: "▤",
    color: "#7dc3ff",
    description: "Distribution hub. Splits one inlet into 9 output channels.",
  },
  {
    id: "controller",
    x: 470,
    y: 540,
    z: 30,
    label: "Control Logic",
    icon: "</>",
    color: "#d983ff",
    description: "Software timing logic for valve order, duration, and grouping.",
  },
  {
    id: "frame",
    x: 960,
    y: 300,
    z: 420,
    label: "Mounting Frame",
    icon: "▥",
    color: "#f2dc65",
    description: "Physical support for the 3×3 TPU cell array.",
  },
];

const VALVE_POSITIONS = [
  [560, 430, 90],
  [660, 430, 90],
  [760, 430, 90],
  [560, 430, 220],
  [660, 430, 220],
  [760, 430, 220],
  [560, 430, 350],
  [660, 430, 350],
  [760, 430, 350],
] as const;

const CELL_POSITIONS = [
  [900, 420, 90],
  [970, 420, 90],
  [1040, 420, 90],
  [900, 300, 220],
  [970, 300, 220],
  [1040, 300, 220],
  [900, 180, 350],
  [970, 180, 350],
  [1040, 180, 350],
] as const;

const VALVE_NODES: NodeDef[] = VALVE_POSITIONS.map(([x, y, z], i) => ({
  id: `valve-${i + 1}`,
  x,
  y,
  z,
  label: `Solenoid Valve ${i + 1}`,
  icon: "◌",
  color: "#73f2da",
  description: `Valve ${i + 1}/9. Opens/closes airflow into TPU Cell ${i + 1}.`,
}));

const CELL_NODES: NodeDef[] = CELL_POSITIONS.map(([x, y, z], i) => ({
  id: `cell-${i + 1}`,
  x,
  y,
  z,
  label: `TPU Cell ${i + 1}`,
  icon: "⬡",
  color: "#ffb36b",
  description: `TPU Cell ${i + 1}/9. Inflates on command, then deflates when flow is cut.`,
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

function projectNode(node: NodeDef) {
  return { x: node.x, y: node.y };
}

function projectWithCamera(node: NodeDef, yaw: number, pitch: number, zoom: number) {
  const cx = node.x - WORLD_CENTER.x;
  const cy = node.y - WORLD_CENTER.y;
  const cz = node.z - WORLD_CENTER.z;

  const cosy = Math.cos(yaw);
  const siny = Math.sin(yaw);
  const cosx = Math.cos(pitch);
  const sinx = Math.sin(pitch);

  const xzX = cx * cosy - cz * siny;
  const xzZ = cx * siny + cz * cosy;
  const yzY = cy * cosx - xzZ * sinx;
  const yzZ = cy * sinx + xzZ * cosx;

  const focal = BASE_FOCAL_LENGTH * zoom;
  const persp = focal / Math.max(180, focal + yzZ);
  const px = GRAPH_W / 2 + xzX * persp;
  const py = GRAPH_H / 2 + yzY * persp;

  return { x: px, y: py, depth: yzZ };
}

function buildWavyPath(a: { x: number; y: number }, b: { x: number; y: number }, amplitude: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / len;
  const ny = dx / len;

  const c1x = a.x + dx * 0.33 + nx * amplitude;
  const c1y = a.y + dy * 0.33 + ny * amplitude;
  const c2x = a.x + dx * 0.66 - nx * amplitude;
  const c2y = a.y + dy * 0.66 - ny * amplitude;

  return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
}

function SystemSchematic() {
  const [activeId, setActiveId] = useState<string | null>("pump");
  const [lockedId, setLockedId] = useState<string | null>(null);
  const [camera, setCamera] = useState(DEFAULT_CAMERA);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<{
    startX: number;
    startY: number;
    startYaw: number;
    startPitch: number;
  } | null>(null);

  const nodeMap = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), []);
  const projectedMap = useMemo(
    () =>
      Object.fromEntries(
        NODES.map((n) => [n.id, projectWithCamera(n, camera.yaw, camera.pitch, camera.zoom)]),
      ) as Record<string, { x: number; y: number; depth: number }>,
    [camera.pitch, camera.yaw, camera.zoom],
  );
  const selectedId = activeId ?? lockedId;
  const selected = selectedId ? nodeMap[selectedId] : null;
  const selectedProjected = selectedId ? projectedMap[selectedId] : null;

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const orbit = orbitRef.current;
      if (!orbit) return;

      const dx = e.clientX - orbit.startX;
      const dy = e.clientY - orbit.startY;
      const nextYaw = orbit.startYaw + dx * 0.0055;
      const nextPitch = Math.min(0.68, Math.max(-0.62, orbit.startPitch + dy * 0.0042));
      setCamera((curr) => ({ ...curr, yaw: nextYaw, pitch: nextPitch }));
    };

    const handlePointerUp = () => {
      orbitRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const startOrbit = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-node-btn='true']")) return;
    orbitRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startYaw: camera.yaw,
      startPitch: camera.pitch,
    };
  };

  const zoomBy = (delta: number) => {
    setCamera((curr) => ({
      ...curr,
      zoom: Math.min(2.2, Math.max(0.55, curr.zoom + delta)),
    }));
  };

  const handleWheelZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? -0.08 : 0.08;
    zoomBy(direction);
  };

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
            A compact pneumatic pipeline: air source, distribution, control, and soft actuation.
            Hover or click any node to inspect its role in the system.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/45">
            Hover or click a node to learn more
          </p>

          <div className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/72">
              System Layers
            </p>
            <ul className="mt-3 space-y-1.5 text-[11px] text-white/64">
              <li>01 · Air Generation</li>
              <li>02 · Distribution & Control</li>
              <li>03 · Computational Logic</li>
              <li>04 · Soft Robotic Actuation</li>
            </ul>

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

        <div
          ref={canvasRef}
          onPointerDown={startOrbit}
          onWheel={handleWheelZoom}
          className="relative min-h-[560px] cursor-grab rounded-2xl border border-white/8 bg-black/20 active:cursor-grabbing"
        >
          <div className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/14 bg-[#081227]/85 px-2.5 py-1.5 text-[11px] text-white/85 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => zoomBy(-0.1)}
              className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/12"
              aria-label="Zoom out"
            >
              -
            </button>
            <span className="min-w-[44px] text-center tabular-nums">{Math.round(camera.zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => zoomBy(0.1)}
              className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/12"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setCamera(DEFAULT_CAMERA)}
              className="rounded-full border border-white/20 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] transition hover:bg-white/12"
            >
              Reset
            </button>
          </div>
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
            <polygon
              points="420,440 845,440 990,330 560,330"
              fill="rgba(126, 193, 255, 0.08)"
              stroke="rgba(126, 193, 255, 0.22)"
              strokeDasharray="5 8"
            />
            <polygon
              points="830,170 1088,170 1088,432 830,432"
              fill="rgba(255, 183, 112, 0.06)"
              stroke="rgba(255, 183, 112, 0.22)"
              strokeDasharray="5 8"
            />
            {EDGES.map((edge) => {
              const na = projectedMap[edge.a];
              const nb = projectedMap[edge.b];
              if (!na || !nb) return null;
              const active = selectedId === edge.a || selectedId === edge.b;
              const styleByType = {
                air: {
                  stroke: active ? "#9fe7ff" : "#89b7d4",
                  opacity: active ? 0.82 : 0.35,
                  width: active ? 1.85 : 1.25,
                  dash: "0",
                  amp: active ? 13 : 9,
                },
                electrical: {
                  stroke: active ? "#f1a0ff" : "#ce9be6",
                  opacity: active ? 0.84 : 0.42,
                  width: active ? 1.6 : 1.1,
                  dash: "4 5",
                  amp: active ? 12 : 8,
                },
                mount: {
                  stroke: active ? "#ffd98e" : "#e0c48a",
                  opacity: active ? 0.66 : 0.26,
                  width: active ? 1.45 : 1.0,
                  dash: "2 6",
                  amp: active ? 10 : 7,
                },
                mesh: {
                  stroke: active ? "#b9ecff" : "#9cb7d5",
                  opacity: active ? 0.62 : 0.16,
                  width: active ? 1.15 : 0.9,
                  dash: "2 8",
                  amp: active ? 7 : 5,
                },
              } as const;
              const s = styleByType[edge.type];
              const d = buildWavyPath(na, nb, s.amp);
              return (
                <path
                  key={`${edge.a}-${edge.b}`}
                  d={d}
                  stroke={s.stroke}
                  strokeOpacity={s.opacity}
                  strokeWidth={s.width}
                  strokeDasharray={s.dash}
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
            {NODES.map((n) => (
              <circle
                key={`point-${n.id}`}
                cx={projectedMap[n.id].x}
                cy={projectedMap[n.id].y}
                r="2.4"
                fill="#e7f1ff"
                fillOpacity="0.85"
              />
            ))}
          </svg>

          {NODES.map((n) => {
            const isActive = selectedId === n.id;
            return (
              <button
                key={n.id}
                type="button"
                data-node-btn="true"
                onMouseEnter={() => setActiveId(n.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setLockedId((curr) => (curr === n.id ? null : n.id))}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                style={{
                  left: `${(projectedMap[n.id].x / GRAPH_W) * 100}%`,
                  top: `${(projectedMap[n.id].y / GRAPH_H) * 100}%`,
                }}
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

          {selected && selectedProjected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="pointer-events-none absolute max-w-[230px] rounded-xl border border-white/15 bg-[#0a1429]/90 px-3 py-2.5 text-white/90 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
              style={{
                left: `${Math.min(82, Math.max(18, (selectedProjected.x / GRAPH_W) * 100))}%`,
                top: `${Math.max(14, (selectedProjected.y / GRAPH_H) * 100 - 10)}%`,
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
        <SectionLabel number="04" text="System" />
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            System Dynamics
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            System Design
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--ink-muted)]">
            1 Air Pump → 1 Manifold (9 outputs) → 9 Solenoid Valves → 9 TPU Cells on a frame.
            Digital control sets timing, sequence, and behavior.
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

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {[
              {
                t: "Air Generation",
                b: "Pump + regulator create stable compressed airflow.",
              },
              {
                t: "Distribution & Control",
                b: "Manifold splits to 9 lines; solenoids gate each line.",
              },
              {
                t: "Computational Control",
                b: "Microcontroller runs choreography: order, timing, duration.",
              },
              {
                t: "Soft Robotic Actuation",
                b: "9 TPU cells inflate/deflate to form spatial motion.",
              },
            ].map((card) => (
              <div key={card.t} className="rounded-xl border border-[var(--hairline)] bg-white/75 px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink)]">
                  {card.t}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">{card.b}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-[var(--hairline)] bg-white/75 px-3 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink)]">
              System Flow Summary
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">
              Air Pump → Pressure Regulator → Manifold (9 outputs) → Solenoid Valves (9) →
              Pneumatic Tubing → TPU Cells (9) → Grid Motion
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">
              Microcontroller + software choreography drive valve timing and pattern behavior.
            </p>
          </div>

          <p className="mt-3 text-center text-xs text-[var(--ink-muted)]">
            Click to pin node details. Airflow, control, and structure are visualized as one network.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
