"use client";

/**
 * System schematic (Section 05). **Tunables** (layout, camera, zoom, etc.):
 * `src/config/systemSchematicControls.ts`
 */
import SectionLabel from "@/components/pneumitecture/SectionLabel";
import {
  SYSTEM_SCHEMATIC_AXIS_EXT,
  SYSTEM_SCHEMATIC_AXIS_ORIGIN_XZ,
  SYSTEM_SCHEMATIC_CAMERA_DEFAULT,
  SYSTEM_SCHEMATIC_CELL_GRID_ORIGIN_Y,
  SYSTEM_SCHEMATIC_CELL_GRID_ORIGIN_Z,
  SYSTEM_SCHEMATIC_CELL_GRID_SPACING_Y,
  SYSTEM_SCHEMATIC_CELL_GRID_SPACING_Z,
  SYSTEM_SCHEMATIC_CONTROLLER_X,
  SYSTEM_SCHEMATIC_CONTROLLER_Y,
  SYSTEM_SCHEMATIC_CONTROLLER_Z,
  SYSTEM_SCHEMATIC_FRAME_OFFSET_X,
  SYSTEM_SCHEMATIC_FRAME_Y,
  SYSTEM_SCHEMATIC_FRAME_Z,
  SYSTEM_SCHEMATIC_FOCAL_LENGTH,
  SYSTEM_SCHEMATIC_GRAPH_H,
  SYSTEM_SCHEMATIC_GRAPH_W,
  SYSTEM_SCHEMATIC_LAYOUT,
  SYSTEM_SCHEMATIC_MANIFOLD_BOX_FACE_ALPHA,
  SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_X,
  SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_Y,
  SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_Z,
  SYSTEM_SCHEMATIC_MANIFOLD_NODE_HIT_R,
  SYSTEM_SCHEMATIC_MANIFOLD_VALVE_LANE_BASE,
  SYSTEM_SCHEMATIC_MANIFOLD_VALVE_LANE_STEP,
  SYSTEM_SCHEMATIC_NODE_CHIP_VIEWBOX,
  SYSTEM_SCHEMATIC_ORBIT_PITCH_MAX,
  SYSTEM_SCHEMATIC_ORBIT_PITCH_MIN,
  SYSTEM_SCHEMATIC_ORBIT_PITCH_SENS,
  SYSTEM_SCHEMATIC_ORBIT_YAW_SENS,
  SYSTEM_SCHEMATIC_PERSPECTIVE_NEAR_CLAMP,
  SYSTEM_SCHEMATIC_WORLD_CENTER,
  SYSTEM_SCHEMATIC_Y_GROUND,
  SYSTEM_SCHEMATIC_ZOOM_ANIM_DURATION,
  SYSTEM_SCHEMATIC_ZOOM_ANIM_EASE,
  SYSTEM_SCHEMATIC_ZOOM_MAX,
  SYSTEM_SCHEMATIC_ZOOM_MIN,
  SYSTEM_SCHEMATIC_ZOOM_STEP_BUTTON,
  SYSTEM_SCHEMATIC_ZOOM_STEP_WHEEL,
} from "@/config/systemSchematicControls";
import { animate, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  type: "air" | "electrical";
};

const GRAPH_W = SYSTEM_SCHEMATIC_GRAPH_W;
const GRAPH_H = SYSTEM_SCHEMATIC_GRAPH_H;
const Y_GROUND = SYSTEM_SCHEMATIC_Y_GROUND;
const SCH = SYSTEM_SCHEMATIC_LAYOUT;
const X_WALL = SCH.cellWall.x;
const WORLD_CENTER = SYSTEM_SCHEMATIC_WORLD_CENTER;
const AXIS_ORIGIN = {
  x: SYSTEM_SCHEMATIC_AXIS_ORIGIN_XZ.x,
  y: Y_GROUND,
  z: SYSTEM_SCHEMATIC_AXIS_ORIGIN_XZ.z,
};
const AXIS_EXT = SYSTEM_SCHEMATIC_AXIS_EXT;
const BASE_FOCAL_LENGTH = SYSTEM_SCHEMATIC_FOCAL_LENGTH;
const GRID_SIZE = 3;

/** 3×3 in the XZ plane (“ground”): fixed Y, columns along +X, rows along +Z. */
function buildGrid3x3XZ(
  origin: { x: number; y: number; z: number },
  spacing: { x: number; z: number },
) {
  const out: Array<[number, number, number]> = [];
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      out.push([origin.x + col * spacing.x, origin.y, origin.z + row * spacing.z]);
    }
  }
  return out;
}

/** 3×3 in the YZ plane (“wall”): fixed X, columns along +Y, rows along +Z. */
function buildGrid3x3YZ(
  origin: { x: number; y: number; z: number },
  spacing: { y: number; z: number },
) {
  const out: Array<[number, number, number]> = [];
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      out.push([origin.x, origin.y + col * spacing.y, origin.z + row * spacing.z]);
    }
  }
  return out;
}

// TPU cells: grid in YZ, single X (vertical wall parallel to world YZ).
const CELL_POSITIONS = buildGrid3x3YZ(
  {
    x: X_WALL,
    y: SYSTEM_SCHEMATIC_CELL_GRID_ORIGIN_Y,
    z: SYSTEM_SCHEMATIC_CELL_GRID_ORIGIN_Z,
  },
  { y: SYSTEM_SCHEMATIC_CELL_GRID_SPACING_Y, z: SYSTEM_SCHEMATIC_CELL_GRID_SPACING_Z },
) as ReadonlyArray<[number, number, number]>;

const BASE_NODES: NodeDef[] = (() => {
  const y = Y_GROUND;
  const s = SCH.supply;
  return [
    {
      id: "pump",
      x: s.pumpX,
      y,
      z: s.pumpZ,
      label: "Air Pump (Main Source)",
      icon: "◉",
      color: "#9eff7a",
      description: "Primary air source. Feeds compressed air into the manifold.",
    },
    {
      id: "manifold",
      x: s.pumpX + s.manifoldOffsetX,
      y,
      z: s.pumpZ + s.manifoldOffsetZ,
      label: "Manifold (9 Outputs)",
      icon: "▤",
      color: "#7dc3ff",
      description: "Distribution hub. Splits one inlet into 9 output channels.",
    },
    {
      id: "controller",
      x: SYSTEM_SCHEMATIC_CONTROLLER_X,
      y: SYSTEM_SCHEMATIC_CONTROLLER_Y,
      z: SYSTEM_SCHEMATIC_CONTROLLER_Z,
      label: "Control Logic",
      icon: "</>",
      color: "#d983ff",
      description: "Software timing logic for valve order, duration, and grouping.",
    },
    {
      id: "frame",
      x: X_WALL + SYSTEM_SCHEMATIC_FRAME_OFFSET_X,
      y: SYSTEM_SCHEMATIC_FRAME_Y,
      z: SYSTEM_SCHEMATIC_FRAME_Z,
      label: "Mounting Frame",
      icon: "▥",
      color: "#f2dc65",
      description: "Physical support for the 3×3 TPU cell array.",
    },
  ];
})();

// Solenoid valves: 3×3 on the XZ floor at Y_GROUND.
const VALVE_POSITIONS = buildGrid3x3XZ(
  { x: SCH.valveGrid.originX, y: Y_GROUND, z: SCH.valveGrid.originZ },
  { x: SCH.valveGrid.spacingX, z: SCH.valveGrid.spacingZ },
) as ReadonlyArray<[number, number, number]>;

const VALVE_NODES: NodeDef[] = VALVE_POSITIONS.map(([x, y, z], i) => ({
  id: `valve-${i + 1}`,
  x,
  y,
  z,
  label: `Solenoid Valve ${i + 1}`,
  icon: "▭",
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

const SCHEMATIC_NODES: NodeDef[] = [...BASE_NODES, ...VALVE_NODES, ...CELL_NODES];

const EDGES: EdgeDef[] = [
  { a: "pump", b: "manifold", type: "air" },
  ...VALVE_NODES.flatMap((v, i) => [
    { a: "manifold", b: v.id, type: "air" as const },
    { a: "controller", b: v.id, type: "electrical" as const },
    { a: v.id, b: `cell-${i + 1}`, type: "air" as const },
  ]),
];

function coreProjection(x: number, y: number, z: number, yaw: number, pitch: number) {
  const cx = x - WORLD_CENTER.x;
  const cy = y - WORLD_CENTER.y;
  const cz = z - WORLD_CENTER.z;

  const cosy = Math.cos(yaw);
  const siny = Math.sin(yaw);
  const cosx = Math.cos(pitch);
  const sinx = Math.sin(pitch);

  const xzX = cx * cosy - cz * siny;
  const xzZ = cx * siny + cz * cosy;
  const yzY = cy * cosx - xzZ * sinx;
  const yzZ = cy * sinx + xzZ * cosx;

  const focal = BASE_FOCAL_LENGTH;
  const persp = focal / Math.max(SYSTEM_SCHEMATIC_PERSPECTIVE_NEAR_CLAMP, focal + yzZ);
  return { xzX, yzY, yzZ, persp };
}

function projectCoords(x: number, y: number, z: number, yaw: number, pitch: number, zoom: number) {
  const { xzX, yzY, yzZ, persp } = coreProjection(x, y, z, yaw, pitch);
  const px = GRAPH_W / 2 + xzX * persp * zoom;
  const py = GRAPH_H / 2 - yzY * persp * zoom;
  return { x: px, y: py, depth: yzZ };
}

/** Pump / manifold / controller / valves share the “floor equipment” chip sizing (controller Y may differ from `Y_GROUND`). */
function isFloorStyleSchematicChip(n: NodeDef) {
  return (
    n.id === "pump" ||
    n.id === "manifold" ||
    n.id === "controller" ||
    n.id.startsWith("valve-")
  );
}

function projectWithCamera(node: NodeDef, yaw: number, pitch: number, zoom: number) {
  return projectCoords(node.x, node.y, node.z, yaw, pitch, zoom);
}

function valveNumberFromId(id: string): number {
  const m = /^(?:valve|cell)-(\d+)$/.exec(id);
  return m ? parseInt(m[1], 10) : 0;
}

/**
 * Axis-aligned L / U routes in world space (orthogonal “duct” runs), then projected to SVG.
 *
 * Story: **pump → manifold** is a **straight** run in the XZ floor plane; **manifold → valves** use offset bus lanes;
 * **valve → cell** (riser to wall then up YZ). **Controller → valve** (electrical): +X at controller **Y**, then along **Z**
 * to the valve column, then **+Y** to the valve on the floor plane.
 */
function getEdgeWorldWaypoints(edge: EdgeDef, m: Record<string, NodeDef>): Array<[number, number, number]> {
  const a = m[edge.a];
  const b = m[edge.b];
  if (!a || !b) return [[0, 0, 0], [0, 0, 0]];

  const ax = a.x;
  const ay = a.y;
  const az = a.z;
  const bx = b.x;
  const by = b.y;
  const bz = b.z;

  const idA = edge.a;
  const idB = edge.b;

  /** Pump → manifold: straight along world +X (same Y and Z on the floor). */
  if (idA === "pump" && idB === "manifold") {
    return [
      [ax, ay, az],
      [bx, by, bz],
    ];
  }

  /**
   * Manifold → valve (air): short Z “bus lane” per port so nine runs do not share one pixel stack,
   * then +X along that lane, then Z into the valve (still axis-aligned).
   */
  if (idA === "manifold" && idB.startsWith("valve-")) {
    const n = valveNumberFromId(idB);
    const lane = (Math.max(1, n) - 1) * SYSTEM_SCHEMATIC_MANIFOLD_VALVE_LANE_STEP + SYSTEM_SCHEMATIC_MANIFOLD_VALVE_LANE_BASE;
    return [
      [ax, ay, az],
      [ax, ay, az + lane],
      [bx, ay, az + lane],
      [bx, ay, bz],
    ];
  }

  /**
   * Controller → valve (electrical): +X at controller **Y** and Z, then **Z** to the valve’s Z (same as manifold→valve
   * turn style), then **+Y** from that point up to the solenoid (floor plane).
   */
  if (idA === "controller" && idB.startsWith("valve-")) {
    return [
      [ax, ay, az],
      [bx, ay, az],
      [bx, ay, bz],
      [bx, by, bz],
    ];
  }

  /** Valve → cell (air): along +X at valve Z to the wall, along the wall base in Z, then up in Y into the cell. */
  if (idA.startsWith("valve-") && idB.startsWith("cell-")) {
    return [
      [ax, ay, az],
      [bx, ay, az],
      [bx, ay, bz],
      [bx, by, bz],
    ];
  }

  return [[ax, ay, az], [bx, by, bz]];
}

function worldWaypointsToSvgPath(
  pts: Array<[number, number, number]>,
  yaw: number,
  pitch: number,
  zoom: number,
) {
  if (pts.length === 0) return "";
  const proj = pts.map(([x, y, z]) => projectCoords(x, y, z, yaw, pitch, zoom));
  const [p0, ...rest] = proj;
  return `M ${p0.x} ${p0.y}` + rest.map((p) => ` L ${p.x} ${p.y}`).join("");
}

/** SVG stroke style per logical connection. */
function getEdgeLineStyle(edge: EdgeDef, active: boolean) {
  const w = (n: number) => (active ? n * 1.22 : n);
  if (edge.type === "air") {
    if (edge.a === "pump" && edge.b === "manifold") {
      return {
        stroke: active ? "#e4fdff" : "#c2f6ff",
        width: w(3),
        opacity: active ? 1 : 0.95,
        dash: "0",
        filter: "drop-shadow(0 0 4px rgba(0,28,48,0.55))",
      };
    }
    if (edge.a === "manifold" && edge.b.startsWith("valve-")) {
      const n = valveNumberFromId(edge.b);
      const hue = 158 + (n % 9) * 11 + Math.floor((n - 1) / 9) * 3;
      return {
        stroke: active ? "#d8fffb" : `hsl(${hue} 88% 68%)`,
        width: w(2.35),
        opacity: active ? 1 : 0.9,
        dash: "0",
        filter: "drop-shadow(0 0 2px rgba(0,32,44,0.45))",
      };
    }
    if (edge.a.startsWith("valve-") && edge.b.startsWith("cell-")) {
      return {
        stroke: active ? "#b8e8ff" : "#86d6f5",
        width: w(2.05),
        opacity: active ? 0.98 : 0.88,
        dash: "0",
        filter: "drop-shadow(0 0 2px rgba(0,36,52,0.4))",
      };
    }
  }
  if (edge.type === "electrical") {
    return {
      stroke: active ? "#fceaff" : "#f0c8ff",
      width: w(1.95),
      opacity: active ? 1 : 0.9,
      dash: "8 7",
      filter: "drop-shadow(0 0 2px rgba(36,0,48,0.45))",
    };
  }
  return {
    stroke: active ? "#d0d8e8" : "#a8b0c4",
    width: w(1.2),
    opacity: 0.45,
    dash: "4 4",
    filter: "none",
  };
}

/** Lower numbers paint first (underneath). */
function edgePaintPriority(edge: EdgeDef): number {
  if (edge.type === "electrical") return 20;
  if (edge.type === "air") {
    if (edge.a.startsWith("valve-") && edge.b.startsWith("cell-")) return 40;
    if (edge.a === "manifold") return 60;
    if (edge.a === "pump") return 80;
  }
  return 30;
}

function avgFaceDepth(
  corners: ReadonlyArray<[number, number, number]>,
  yaw: number,
  pitch: number,
  zoom: number,
) {
  let s = 0;
  for (const [x, y, z] of corners) s += projectCoords(x, y, z, yaw, pitch, zoom).depth;
  return s / corners.length;
}

function worldQuadToSvgPoints(
  corners: ReadonlyArray<[number, number, number]>,
  yaw: number,
  pitch: number,
  zoom: number,
) {
  return corners
    .map(([x, y, z]) => projectCoords(x, y, z, yaw, pitch, zoom))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");
}

function hexToRgba(hex: string, alpha: number) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return `rgba(125,195,255,${alpha})`;
  const v = parseInt(m[1], 16);
  const r = (v >> 16) & 255;
  const g = (v >> 8) & 255;
  const b = v & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

type ManifoldFaceDef = {
  key: string;
  corners: ReadonlyArray<[number, number, number]>;
  fillAlpha: number;
};

/** Six faces of the manifold prism (world coords); caller sorts by projected depth. */
function manifoldBoxFaceDefs(n: NodeDef): ManifoldFaceDef[] {
  const mx = n.x;
  const my = n.y;
  const mz = n.z;
  const hx = SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_X / 2;
  const hz = SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_Z / 2;
  const h = SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_Y;
  const b0: [number, number, number] = [mx - hx, my, mz - hz];
  const b1: [number, number, number] = [mx + hx, my, mz - hz];
  const b2: [number, number, number] = [mx + hx, my, mz + hz];
  const b3: [number, number, number] = [mx - hx, my, mz + hz];
  const t0: [number, number, number] = [b0[0], my + h, b0[2]];
  const t1: [number, number, number] = [b1[0], my + h, b1[2]];
  const t2: [number, number, number] = [b2[0], my + h, b2[2]];
  const t3: [number, number, number] = [b3[0], my + h, b3[2]];
  const a = SYSTEM_SCHEMATIC_MANIFOLD_BOX_FACE_ALPHA;
  return [
    { key: "bottom", corners: [b0, b1, b2, b3], fillAlpha: a * 0.35 },
    { key: "top", corners: [t3, t2, t1, t0], fillAlpha: a * 1.15 },
    { key: "x-", corners: [b0, b3, t3, t0], fillAlpha: a * 0.78 },
    { key: "x+", corners: [b1, b2, t2, t1], fillAlpha: a * 0.92 },
    { key: "z-", corners: [b0, b1, t1, t0], fillAlpha: a * 0.68 },
    { key: "z+", corners: [b3, b2, t2, t3], fillAlpha: a * 1.0 },
  ];
}

function SystemSchematic() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [camera, setCamera] = useState(() => ({ ...SYSTEM_SCHEMATIC_CAMERA_DEFAULT }));
  const nodes = SCHEMATIC_NODES;
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef(camera);
  const zoomAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  cameraRef.current = camera;
  const orbitRef = useRef<{
    startX: number;
    startY: number;
    startYaw: number;
    startPitch: number;
  } | null>(null);
  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const projectedMap = useMemo(
    () =>
      Object.fromEntries(
        nodes.map((n) => [n.id, projectWithCamera(n, camera.yaw, camera.pitch, camera.zoom)]),
      ) as Record<string, { x: number; y: number; depth: number }>,
    [camera.pitch, camera.yaw, camera.zoom, nodes],
  );
  const nodesSortedByDepth = useMemo(
    () => [...nodes].sort((a, b) => projectedMap[a.id]!.depth - projectedMap[b.id]!.depth),
    [nodes, projectedMap],
  );
  const hovered = activeId ? nodeMap[activeId] : null;
  const hoveredProjected = activeId ? projectedMap[activeId] : null;

  const axisRef = useMemo(() => {
    const ox = AXIS_ORIGIN.x;
    const oy = AXIS_ORIGIN.y;
    const oz = AXIS_ORIGIN.z;
    const lx = AXIS_EXT.x;
    const ly = AXIS_EXT.y;
    const lz = AXIS_EXT.z;
    const { yaw, pitch, zoom } = camera;

    const xy: [number, number, number][] = [
      [ox, oy, oz],
      [ox + lx, oy, oz],
      [ox + lx, oy + ly, oz],
      [ox, oy + ly, oz],
    ];
    const xz: [number, number, number][] = [
      [ox, oy, oz],
      [ox + lx, oy, oz],
      [ox + lx, oy, oz + lz],
      [ox, oy, oz + lz],
    ];
    const yz: [number, number, number][] = [
      [ox, oy, oz],
      [ox, oy + ly, oz],
      [ox, oy + ly, oz + lz],
      [ox, oy, oz + lz],
    ];

    /** Quarter-planes: XY = vertical slice at fixed Z (magenta), XZ = floor (green), YZ = wall slice (cyan). */
    const faces = [
      { key: "xy" as const, corners: xy, fill: "rgba(255, 120, 160, 0.11)", stroke: "rgba(255, 150, 185, 0.55)" },
      { key: "xz" as const, corners: xz, fill: "rgba(90, 255, 170, 0.12)", stroke: "rgba(120, 255, 200, 0.5)" },
      { key: "yz" as const, corners: yz, fill: "rgba(110, 200, 255, 0.11)", stroke: "rgba(140, 215, 255, 0.52)" },
    ].sort(
      (a, b) => avgFaceDepth(a.corners, yaw, pitch, zoom) - avgFaceDepth(b.corners, yaw, pitch, zoom),
    );

    const xTip = projectCoords(ox + lx, oy, oz, yaw, pitch, zoom);
    const yTip = projectCoords(ox, oy + ly, oz, yaw, pitch, zoom);
    const zTip = projectCoords(ox, oy, oz + lz, yaw, pitch, zoom);
    const o = projectCoords(ox, oy, oz, yaw, pitch, zoom);
    const nudge = (from: { x: number; y: number }, to: { x: number; y: number }, d: number) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      return { x: to.x + (dx / len) * d, y: to.y + (dy / len) * d };
    };

    return {
      faces,
      origin: o,
      xAxis: worldWaypointsToSvgPath(
        [
          [ox, oy, oz],
          [ox + lx, oy, oz],
        ],
        yaw,
        pitch,
        zoom,
      ),
      yAxis: worldWaypointsToSvgPath(
        [
          [ox, oy, oz],
          [ox, oy + ly, oz],
        ],
        yaw,
        pitch,
        zoom,
      ),
      zAxis: worldWaypointsToSvgPath(
        [
          [ox, oy, oz],
          [ox, oy, oz + lz],
        ],
        yaw,
        pitch,
        zoom,
      ),
      labels: [
        { text: "+X", ...nudge(o, xTip, 18), fill: "#ff9aa8" },
        { text: "+Y", ...nudge(o, yTip, 18), fill: "#7dffb3" },
        { text: "+Z", ...nudge(o, zTip, 18), fill: "#9fd4ff" },
      ],
    };
  }, [camera.pitch, camera.yaw, camera.zoom]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const orbit = orbitRef.current;
      if (!orbit) return;

      const dx = e.clientX - orbit.startX;
      const dy = e.clientY - orbit.startY;
      const nextYaw = orbit.startYaw + dx * SYSTEM_SCHEMATIC_ORBIT_YAW_SENS;
      const nextPitch = Math.min(
        SYSTEM_SCHEMATIC_ORBIT_PITCH_MAX,
        Math.max(SYSTEM_SCHEMATIC_ORBIT_PITCH_MIN, orbit.startPitch - dy * SYSTEM_SCHEMATIC_ORBIT_PITCH_SENS),
      );
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

  const zoomBy = useCallback((delta: number) => {
    zoomAnimRef.current?.stop();
    const from = cameraRef.current.zoom;
    const to = Math.min(SYSTEM_SCHEMATIC_ZOOM_MAX, Math.max(SYSTEM_SCHEMATIC_ZOOM_MIN, from + delta));
    zoomAnimRef.current = animate(from, to, {
      duration: SYSTEM_SCHEMATIC_ZOOM_ANIM_DURATION,
      ease: SYSTEM_SCHEMATIC_ZOOM_ANIM_EASE,
      onUpdate: (v) => setCamera((c) => ({ ...c, zoom: v })),
    });
  }, []);

  useEffect(() => {
    return () => zoomAnimRef.current?.stop();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050a18] px-5 py-6 shadow-[0_48px_96px_rgba(2,6,18,0.62)] md:px-9 md:py-9">
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
            Hover a node to highlight its connections and read its role.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/45">
            Hover nodes · drag the canvas to orbit · zoom +/− or scroll wheel
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
            </ul>
          </div>
        </aside>

        <div
          ref={canvasRef}
          onPointerDown={startOrbit}
          onWheel={(e) => {
            e.preventDefault();
            zoomBy(e.deltaY > 0 ? -SYSTEM_SCHEMATIC_ZOOM_STEP_WHEEL : SYSTEM_SCHEMATIC_ZOOM_STEP_WHEEL);
          }}
          className="relative min-h-[680px] cursor-grab rounded-2xl border border-white/10 bg-[#060f22]/90 lg:min-h-[720px] active:cursor-grabbing"
        >
          <div className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/14 bg-[#081227]/85 px-2.5 py-1.5 text-[11px] text-white/85 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => zoomBy(-SYSTEM_SCHEMATIC_ZOOM_STEP_BUTTON)}
              className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/12"
              aria-label="Zoom out"
            >
              -
            </button>
            <span className="min-w-[44px] text-center tabular-nums">{Math.round(camera.zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => zoomBy(SYSTEM_SCHEMATIC_ZOOM_STEP_BUTTON)}
              className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/12"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                zoomAnimRef.current?.stop();
                setCamera({ ...SYSTEM_SCHEMATIC_CAMERA_DEFAULT });
              }}
              className="rounded-full border border-white/20 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] transition hover:bg-white/12"
            >
              Reset
            </button>
          </div>
          <p className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[16rem] text-[10px] leading-snug text-white/48">
            <span className="font-semibold uppercase tracking-[0.16em] text-white/60">World axes</span>
            : right-handed · +Y up · horizontal floor = XZ (constant Y)
          </p>
          <svg
            viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <radialGradient id="pulseGlow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#d58bff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d58bff" stopOpacity="0" />
              </radialGradient>
              <marker
                id="sys-axis-arrow-x"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5.5"
                markerHeight="5.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#ff9aa8" />
              </marker>
              <marker
                id="sys-axis-arrow-y"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5.5"
                markerHeight="5.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#7dffb3" />
              </marker>
              <marker
                id="sys-axis-arrow-z"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5.5"
                markerHeight="5.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#9fd4ff" />
              </marker>
            </defs>
            <g className="pointer-events-none" aria-hidden>
              {axisRef.faces.map((f) => (
                <polygon
                  key={f.key}
                  points={worldQuadToSvgPoints(f.corners, camera.yaw, camera.pitch, camera.zoom)}
                  fill={f.fill}
                  stroke={f.stroke}
                  strokeWidth={1.15}
                  strokeLinejoin="round"
                />
              ))}
            </g>
            <g className="pointer-events-none" aria-hidden role="img" aria-label="World axes: plus Y up, plus X and plus Z span the floor plane">
              <path
                d={axisRef.xAxis}
                stroke="#ff9aa8"
                strokeWidth={2.35}
                strokeLinecap="round"
                fill="none"
                opacity={0.92}
                markerEnd="url(#sys-axis-arrow-x)"
              />
              <path
                d={axisRef.yAxis}
                stroke="#7dffb3"
                strokeWidth={2.35}
                strokeLinecap="round"
                fill="none"
                opacity={0.92}
                markerEnd="url(#sys-axis-arrow-y)"
              />
              <path
                d={axisRef.zAxis}
                stroke="#9fd4ff"
                strokeWidth={2.35}
                strokeLinecap="round"
                fill="none"
                opacity={0.92}
                markerEnd="url(#sys-axis-arrow-z)"
              />
              <circle
                cx={axisRef.origin.x}
                cy={axisRef.origin.y}
                r={4.2}
                fill="#f4f9ff"
                fillOpacity={0.95}
                stroke="rgba(6,14,32,0.55)"
                strokeWidth={1.2}
              />
            </g>
            {[...EDGES]
              .sort((a, b) => edgePaintPriority(a) - edgePaintPriority(b))
              .map((edge) => {
                const active = activeId === edge.a || activeId === edge.b;
                const line = getEdgeLineStyle(edge, active);
                const waypoints = getEdgeWorldWaypoints(edge, nodeMap);
                const d = worldWaypointsToSvgPath(waypoints, camera.yaw, camera.pitch, camera.zoom);
                return (
                  <path
                    key={`${edge.a}-${edge.b}`}
                    d={d}
                    stroke={line.stroke}
                    strokeOpacity={line.opacity}
                    strokeWidth={line.width}
                    strokeDasharray={line.dash}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    style={{ filter: line.filter }}
                  />
                );
              })}
            <g className="pointer-events-none" aria-hidden>
              {axisRef.labels.map((L) => (
                <text
                  key={L.text}
                  x={L.x}
                  y={L.y}
                  fill={L.fill}
                  fontSize={14}
                  fontWeight={700}
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  letterSpacing="0.04em"
                  stroke="rgba(6,15,34,0.78)"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {L.text}
                </text>
              ))}
            </g>
            {nodesSortedByDepth.map((n) => {
              const p = projectedMap[n.id]!;
              const isActive = activeId === n.id;
              if (n.id === "manifold") {
                const faces = manifoldBoxFaceDefs(n).sort(
                  (a, b) =>
                    avgFaceDepth(a.corners, camera.yaw, camera.pitch, camera.zoom) -
                    avgFaceDepth(b.corners, camera.yaw, camera.pitch, camera.zoom),
                );
                return (
                  <g
                    key={n.id}
                    data-node-btn="true"
                    className="pointer-events-auto outline-none"
                    onMouseEnter={() => setActiveId(n.id)}
                    onMouseLeave={() => setActiveId(null)}
                    style={{ cursor: "pointer" }}
                    aria-label={n.label}
                  >
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={SYSTEM_SCHEMATIC_MANIFOLD_NODE_HIT_R * 1.35}
                      fill="url(#pulseGlow)"
                      pointerEvents="none"
                      animate={{ opacity: isActive ? 0.45 : 0 }}
                      transition={{ duration: 0.24 }}
                    />
                    {faces.map((f) => (
                      <polygon
                        key={f.key}
                        points={worldQuadToSvgPoints(f.corners, camera.yaw, camera.pitch, camera.zoom)}
                        fill={hexToRgba(n.color, Math.min(1, f.fillAlpha))}
                        stroke={n.color}
                        strokeOpacity={isActive ? 0.95 : 0.55}
                        strokeWidth={isActive ? 2.1 : 1.15}
                        strokeLinejoin="round"
                        pointerEvents="none"
                      />
                    ))}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={SYSTEM_SCHEMATIC_MANIFOLD_NODE_HIT_R}
                      fill="transparent"
                      pointerEvents="all"
                    />
                  </g>
                );
              }
              const floorChip = isFloorStyleSchematicChip(n);
              const chip = SYSTEM_SCHEMATIC_NODE_CHIP_VIEWBOX;
              const baseR = (chip / 2) * (floorChip ? 1.06 : 0.9);
              return (
                <g
                  key={n.id}
                  data-node-btn="true"
                  transform={`translate(${p.x},${p.y})`}
                  className="pointer-events-auto outline-none"
                  onMouseEnter={() => setActiveId(n.id)}
                  onMouseLeave={() => setActiveId(null)}
                  style={{ cursor: "pointer" }}
                  aria-label={n.label}
                >
                  <motion.circle
                    cx={0}
                    cy={0}
                    r={baseR * 1.65}
                    fill="url(#pulseGlow)"
                    pointerEvents="none"
                    animate={{ opacity: isActive ? 0.62 : 0 }}
                    transition={{ duration: 0.24 }}
                  />
                  <circle
                    cx={0}
                    cy={0}
                    r={baseR}
                    fill="rgba(10,16,30,0.94)"
                    stroke={n.color}
                    strokeOpacity={isActive ? 1 : 0.72}
                    strokeWidth={isActive ? 2.45 : 1.35}
                    filter={isActive ? `drop-shadow(0 0 8px ${n.color}77)` : undefined}
                  />
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={n.color}
                    fillOpacity={isActive ? 1 : 0.9}
                    fontSize={baseR * 1.02}
                    fontFamily="ui-sans-serif,system-ui,sans-serif"
                    pointerEvents="none"
                  >
                    {n.icon}
                  </text>
                </g>
              );
            })}
          </svg>

          {hovered && hoveredProjected ? (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="pointer-events-none absolute z-[4] max-w-[230px] rounded-xl border border-white/15 bg-[#0a1429]/90 px-3 py-2.5 text-white/90 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
              style={{
                left: `${Math.min(82, Math.max(18, (hoveredProjected.x / GRAPH_W) * 100))}%`,
                top: `${Math.max(14, (hoveredProjected.y / GRAPH_H) * 100 - 10)}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: hovered.color }}>
                {hovered.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/76">{hovered.description}</p>
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
      <div className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-10">
        <SectionLabel number="05" text="System" textFirst />
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
            Hover a node for details. Airflow, control, and structure are visualized as one network.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
