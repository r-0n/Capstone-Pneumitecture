/**
 * World layout for the System schematic (Y-up). **No imports** from other config files
 * so `systemSchematicControls.ts` can safely import/re-export these values.
 */

export const SYSTEM_SCHEMATIC_Y_GROUND = 216;

export const SYSTEM_SCHEMATIC_LAYOUT = {
  cellWall: {
    x: 1140,
  },
  valveGrid: {
    originX: 828,
    originZ: 166,
    spacingX: 66,
    spacingZ: 66,
  },
  supply: {
    pumpX: 586,
    pumpZ: 290,
    manifoldOffsetX: 170,
    manifoldOffsetZ: 0,
    controllerOffsetX: 412,
    controllerOffsetZ: 32,
  },
} as const;

/** Manifold → valve air lanes (world Z offset scaling). */
export const SYSTEM_SCHEMATIC_MANIFOLD_VALVE_LANE_STEP = 0.5;
export const SYSTEM_SCHEMATIC_MANIFOLD_VALVE_LANE_BASE = 0.12;

/** Legacy snapshot; live schematic uses `systemSchematicControls` (frame tracks cell 5 + offset). */
export const SYSTEM_SCHEMATIC_FRAME_Y = 402;
export const SYSTEM_SCHEMATIC_FRAME_Z = 382;
