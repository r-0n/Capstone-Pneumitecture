/**
 * =============================================================================
 * SYSTEM DESIGN SCHEMATIC — CONTROL SURFACE (single file)
 * =============================================================================
 *
 * This file holds **every tunable** used by `SystemSection.tsx` for the
 * interactive 3D-style schematic (Section 05 · System). Change values here;
 * avoid scattering magic numbers in the component.
 *
 * IMPORTS
 * -------
 * - `SystemSection.tsx` → import constants from this file.
 * - `systemSchematicLayout.ts` → thin re-export for older paths; prefer this file.
 *
 * WORLD AXES (Y-up)
 * -----------------
 * - **+Y** = up. The **floor** is the **XZ** plane at `SYSTEM_SCHEMATIC_Y_GROUND` (constant Y).
 * - **+X** / **+Z** span the floor (length / depth). Pump, manifold, controller, valves share that Y.
 * - **TPU wall** uses **constant X** = `cellWall.x` for cells; the **mounting frame** sits at
 *   `cellWall.x + SYSTEM_SCHEMATIC_FRAME_OFFSET_X` with its own **Y / Z** (`FRAME_Y`, `FRAME_Z`).
 *
 * WHAT THE COMPONENT STILL OWNS
 * -----------------------------
 * - React state, pointer handlers, Framer Motion.
 * - **Edge graph** (`EDGES`) and **routing** (`getEdgeWorldWaypoints`) — logic lives in the component;
 * only numeric knobs used *inside* those are exported here where applicable.
 * - **Node labels / copy / icons** for each id — still in `BASE_NODES` / maps in the component
 * (search `BASE_NODES`, `VALVE_NODES`). To change text or glyphs, edit there unless you move
 * copy into this file later.
 *
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// 1) FLOOR HEIGHT (world Y — all “ground” equipment uses this exact Y)
// -----------------------------------------------------------------------------

/**
 * World **Y** of the **XZ floor plane** for pump, manifold, valves, and manifold box base.
 * Control Logic may use its own **Y** via `SYSTEM_SCHEMATIC_CONTROLLER_Y`.
 */
export const SYSTEM_SCHEMATIC_Y_GROUND = 216;

// -----------------------------------------------------------------------------
// 2) LAYOUT (world X / Z positions — supply, valve grid, wall X)
// -----------------------------------------------------------------------------

/**
 * Physical placement in **world units** (same space as projection).
 * - **supply**: explicit pump/manifold XZ anchors (on `Y_GROUND`). Control Logic uses
 *   `SYSTEM_SCHEMATIC_CONTROLLER_*` below (full world X/Y/Z).
 * - **valveGrid**: lower-left of the 3×3; `spacingX` along +X, `spacingZ` along +Z.
 * - **cellWall.x**: world X of the YZ wall (cells + wall tint). Frame uses this + `SYSTEM_SCHEMATIC_FRAME_OFFSET_X`.
 */
export const SYSTEM_SCHEMATIC_PUMP_X = 300;
export const SYSTEM_SCHEMATIC_PUMP_Z = 180;
export const SYSTEM_SCHEMATIC_MANIFOLD_X = 550;
export const SYSTEM_SCHEMATIC_MANIFOLD_Z = 180;

export const SYSTEM_SCHEMATIC_LAYOUT = {
  cellWall: {
    x: 1400, // Pushed wall further out to give lines room to travel
  },
  valveGrid: {
    originX: 800,
    originZ: 50,
    spacingX: 160, // Huge spacing for a clear map-like grid
    spacingZ: 120,
  },
  supply: {
    pumpX: SYSTEM_SCHEMATIC_PUMP_X,
    pumpZ: SYSTEM_SCHEMATIC_PUMP_Z,
    manifoldX: SYSTEM_SCHEMATIC_MANIFOLD_X,
    manifoldZ: SYSTEM_SCHEMATIC_MANIFOLD_Z,
  },
} as const;

/**
 * **Control Logic** — explicit **world X / Y / Z** (same space as projection). Independent of
 * `supply.pumpX` / `pumpZ`. With **+Y = up**, **decrease Y** to move the node “down”.
 */
export const SYSTEM_SCHEMATIC_CONTROLLER_X = 550;
export const SYSTEM_SCHEMATIC_CONTROLLER_Y = -8;
export const SYSTEM_SCHEMATIC_CONTROLLER_Z = 130;

// -----------------------------------------------------------------------------
// 3) SVG “graph” canvas (viewBox pixel size — projection maps into this box)
// -----------------------------------------------------------------------------

/** Width / height of the internal SVG coordinate system (also used for HTML % positions). */
export const SYSTEM_SCHEMATIC_GRAPH_W = 1360;
export const SYSTEM_SCHEMATIC_GRAPH_H = 780;

// -----------------------------------------------------------------------------
// 4) Projection (fake perspective — not Three.js; math is in SystemSection)
// -----------------------------------------------------------------------------

/**
 * Scene rotates around this world point before perspective divide.
 * Nudging this moves the whole diagram in the view without moving individual nodes.
 */
export const SYSTEM_SCHEMATIC_WORLD_CENTER = { x: 780, y: 308, z: 268 } as const;

/** Larger → “flatter” / less dramatic perspective. */
export const SYSTEM_SCHEMATIC_FOCAL_LENGTH = 800; // Flatter perspective helps the map look

/**
 * `persp = focal / max(CLAMP, focal + yzZ)` — stops divide-by-near-zero when geometry goes “behind”.
 * Only edit if you know the projection math in `coreProjection`.
 */
export const SYSTEM_SCHEMATIC_PERSPECTIVE_NEAR_CLAMP = 180;

// -----------------------------------------------------------------------------
// 5) Default camera (orbit: yaw about vertical, pitch tilt, zoom scale)
// -----------------------------------------------------------------------------

/** Initial view when the page loads or user hits Reset. All angles in radians. */
export const SYSTEM_SCHEMATIC_CAMERA_DEFAULT = {
  /** ~π/2 faces the YZ wall from −X. */
  yaw: Math.PI / 2 + 0.1,
  /** Steep negative pitch gives a top-down, "map navigation" feel. */
  pitch: -0.65, 
  zoom: 0.8,
};

/** Pointer drag sensitivity: radians of yaw per pixel of horizontal drag. */
export const SYSTEM_SCHEMATIC_ORBIT_YAW_SENS = 0.0055;

/** Pointer drag sensitivity: radians of pitch per pixel of vertical drag. */
export const SYSTEM_SCHEMATIC_ORBIT_PITCH_SENS = 0.0042;

/** Pitch clamps (radians) so the view never flips upside-down. */
export const SYSTEM_SCHEMATIC_ORBIT_PITCH_MIN = -1.2; // Allow steeper top-down viewing
export const SYSTEM_SCHEMATIC_ORBIT_PITCH_MAX = 0.2;

// -----------------------------------------------------------------------------
// 6) Zoom (buttons + wheel — values are multipliers on projection scale)
// -----------------------------------------------------------------------------

export const SYSTEM_SCHEMATIC_ZOOM_MIN = 0.3;
export const SYSTEM_SCHEMATIC_ZOOM_MAX = 3.0;

/** +/- buttons: each click nudges zoom by this amount. */
export const SYSTEM_SCHEMATIC_ZOOM_STEP_BUTTON = 0.1;

/** Mouse wheel: delta applied per wheel tick (sign handled in component). */
export const SYSTEM_SCHEMATIC_ZOOM_STEP_WHEEL = 0.055;

/** Framer Motion animate() duration (seconds) when zoom animates. */
export const SYSTEM_SCHEMATIC_ZOOM_ANIM_DURATION = 0.44;

/** Framer Motion easing cubic-bezier. */
export const SYSTEM_SCHEMATIC_ZOOM_ANIM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// -----------------------------------------------------------------------------
// 7) XYZ reference trihedral (right-handed, +Y up — world units)
// -----------------------------------------------------------------------------
//
// The schematic draws **three quarter-planes** meeting at one corner: +X, +Y, +Z
// (first octant). **Y** is vertical; **XZ** is the horizontal floor plane at `Y_GROUND`.
//
// - `AXIS_ORIGIN_XZ`: world **x** and **z** of the corner; **y** = `Y_GROUND` in code.
// - `AXIS_EXT`: lengths along **+X**, **+Y**, **+Z** from that corner. Keep these
//   moderate so the frame reads as a diagram inset, not a second full scene.

/** Corner (world x, z); component pins **y = Y_GROUND** so the XZ patch lies on the floor plane. */
export const SYSTEM_SCHEMATIC_AXIS_ORIGIN_XZ = { x: 248, z: 78 } as const;

/** Span of the trihedral along +X, +Y, +Z from the corner (world units). */
export const SYSTEM_SCHEMATIC_AXIS_EXT = { x: 260, y: 240, z: 220 } as const;

// -----------------------------------------------------------------------------
// 8) Nodes not driven by LAYOUT alone (frame + TPU cell grid)
// -----------------------------------------------------------------------------

/** Mounting frame node world position (X/Y/Z). */
export const SYSTEM_SCHEMATIC_FRAME_X = 1580;
export const SYSTEM_SCHEMATIC_FRAME_Y = 620;
export const SYSTEM_SCHEMATIC_FRAME_Z = 160;

/**
 * **TPU cell** 3×3 grid: lower-left on the wall (world Y, Z), then spacing along +Y and +Z.
 * **X** is always `cellWall.x` in the component.
 */
export const SYSTEM_SCHEMATIC_CELL_GRID_ORIGIN_Y = 300;
export const SYSTEM_SCHEMATIC_CELL_GRID_ORIGIN_Z = 50;
export const SYSTEM_SCHEMATIC_CELL_GRID_SPACING_Y = 120; // Spread out cells to match valves
export const SYSTEM_SCHEMATIC_CELL_GRID_SPACING_Z = 120;

/**
 * Node chip **width/height in SVG viewBox units** (same space as `SYSTEM_SCHEMATIC_GRAPH_W/H`).
 * Keeps chips scaling with the diagram like edges and the XYZ trihedral (unlike fixed CSS px).
 */
export const SYSTEM_SCHEMATIC_NODE_CHIP_VIEWBOX = 48;

/**
 * **Manifold** is drawn as a **3D box** in world space (bottom face on the floor plane at the
 * manifold node’s **Y**, centered on its **X / Z**). Sizes are **full spans** along each axis.
 */
export const SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_X = 72;
export const SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_Z = 250;
export const SYSTEM_SCHEMATIC_MANIFOLD_BOX_SIZE_Y = 48;

/** Face fill alpha (0–1); sides use multiples of this for a simple light/dark read. */
export const SYSTEM_SCHEMATIC_MANIFOLD_BOX_FACE_ALPHA = 0.26;

/** Invisible hover target in **SVG viewBox units** (circle under pointer capture). */
export const SYSTEM_SCHEMATIC_MANIFOLD_NODE_HIT_R = 44;

// -----------------------------------------------------------------------------
// 9) Dragging nodes (world units clamped while pointer moves)
// -----------------------------------------------------------------------------

/**
 * `worldDelta = (pointerDeltaPx) * (DRAG_WORLD_FACTOR / zoom)` — higher = faster drag.
 */
export const SYSTEM_SCHEMATIC_DRAG_WORLD_FACTOR = 1.25;

/** Floor equipment (XZ drag): clamps on world X and Z (Y stays locked to Y_GROUND). */
export const SYSTEM_SCHEMATIC_DRAG_FLOOR_X_MIN = 200;
export const SYSTEM_SCHEMATIC_DRAG_FLOOR_X_MAX = 1300;
export const SYSTEM_SCHEMATIC_DRAG_FLOOR_Z_MIN = -50;
export const SYSTEM_SCHEMATIC_DRAG_FLOOR_Z_MAX = 600;

/** TPU cells (YZ drag at wall X): clamps on world Y and Z. */
export const SYSTEM_SCHEMATIC_DRAG_CELL_Y_MIN = 200;
export const SYSTEM_SCHEMATIC_DRAG_CELL_Y_MAX = 700;
export const SYSTEM_SCHEMATIC_DRAG_CELL_Z_MIN = -50;
export const SYSTEM_SCHEMATIC_DRAG_CELL_Z_MAX = 550;

// -----------------------------------------------------------------------------
// 10) Manifold → valve air routing (world-space “bus lane” offset in Z)
// -----------------------------------------------------------------------------

/** * Increased per-valve index scaling to create wide, highly distinct lanes 
 * that act like roads on a map.
 */
export const SYSTEM_SCHEMATIC_MANIFOLD_VALVE_LANE_STEP = 15;

/** Base offset to center the lane highway relative to the manifold. */
export const SYSTEM_SCHEMATIC_MANIFOLD_VALVE_LANE_BASE = -60;

/**
 * Distinct colors for manifold -> valve air lines (valve-1..valve-9).
 * Add more entries if you ever expand beyond 9 valves.
 */
export const SYSTEM_SCHEMATIC_MANIFOLD_TO_VALVE_COLORS = [
  "#22d3ee",
  "#3b82f6",
  "#8b5cf6",
  "#d946ef",
  "#f43f5e",
  "#fb923c",
  "#facc15",
  "#84cc16",
  "#14b8a6",
] as const;