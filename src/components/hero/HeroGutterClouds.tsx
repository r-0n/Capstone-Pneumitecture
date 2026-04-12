"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Suspense,
  useMemo,
  useRef,
  type RefObject,
} from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

type BlobProps = {
  basePosition: [number, number, number];
  scale: number;
  phase: number;
  color?: string;
};

function SoftCloudBlob({ basePosition, scale, phase, color = "#cfefff" }: BlobProps) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothed = useRef(
    new THREE.Vector3(basePosition[0], basePosition[1], basePosition[2]),
  );
  const base = useMemo(() => new THREE.Vector3().fromArray(basePosition), [basePosition]);
  const target = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);
  const { pointer } = useThree();

  useFrame((state) => {
    const mesh = groupRef.current;
    if (!mesh) return;

    const t = state.clock.elapsedTime;
    const px = pointer.x;
    const py = pointer.y;

    const floatX = Math.sin(t * 0.1 + phase) * 0.08;
    const floatY = Math.cos(t * 0.088 + phase * 1.15) * 0.07;
    const floatZ = Math.sin(t * 0.072 + phase * 0.8) * 0.05;

    const pullX = px * 0.28;
    const pullY = py * 0.18;
    const pullZ = (px + py) * 0.025;

    offset.set(floatX + pullX, floatY + pullY, floatZ + pullZ);
    target.copy(base).add(offset);
    smoothed.current.lerp(target, 0.038);
    mesh.position.copy(smoothed.current);
  });

  return (
    <group ref={groupRef}>
      <mesh scale={scale} renderOrder={-1}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.52}
          roughness={0.18}
          metalness={0}
          transmission={0.62}
          thickness={2.2}
          ior={1.38}
          emissive={color}
          emissiveIntensity={0.14}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Local coords — each strip canvas is narrow; blobs stay near center of that strip. */
const LEFT_BLOBS: BlobProps[] = [
  { basePosition: [-0.4, 1.8, 0], scale: 3.2, phase: 0.4, color: "#cfefff" },
  { basePosition: [-1.2, -1.2, 0.8], scale: 2.6, phase: 1.2, color: "#aee3ff" },
  { basePosition: [0.6, 3.2, -0.4], scale: 2.1, phase: 2.0, color: "#d8f2ff" },
];

const RIGHT_BLOBS: BlobProps[] = [
  { basePosition: [0.5, 1.7, 0], scale: 3.1, phase: 0.9, color: "#aee3ff" },
  { basePosition: [1.1, -1.4, 0.6], scale: 2.5, phase: 1.7, color: "#cfefff" },
  { basePosition: [-0.5, 3.0, -0.3], scale: 2.0, phase: 2.4, color: "#d8f2ff" },
];

function GutterBloom() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom luminanceThreshold={0.18} intensity={0.38} mipmapBlur radius={0.45} />
    </EffectComposer>
  );
}

function GutterSideScene({ blobs }: { blobs: BlobProps[] }) {
  return (
    <>
      <ambientLight intensity={0.72} />
      <pointLight position={[-4, 6, 8]} intensity={0.95} color="#b8dcff" />
      <pointLight position={[4, 5, 6]} intensity={0.85} color="#a8d4ff" />
      <group>
        {blobs.map((cfg) => (
          <SoftCloudBlob key={`${cfg.basePosition.join(",")}`} {...cfg} />
        ))}
      </group>
      <Suspense fallback={null}>
        <GutterBloom />
      </Suspense>
    </>
  );
}

/** Matches centered `max-w-[1200px]` column; each gutter gets real width on the canvas. */
const GUTTER_WIDTH_STYLE = {
  width: "max(0px, calc((100% - min(100%, 1200px)) / 2))",
} as const;

type StripProps = {
  side: "left" | "right";
  eventSource: RefObject<HTMLElement | null>;
};

function GutterStrip({ side, eventSource }: StripProps) {
  const position = side === "left" ? "left-0" : "right-0";

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 ${position} z-[2] overflow-hidden`}
      style={GUTTER_WIDTH_STYLE}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          filter: "blur(22px)",
          opacity: 1,
        }}
      >
        <Canvas
          className="h-full w-full"
          camera={{ position: [0, 1.2, 11], fov: 50, near: 0.1, far: 80 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.75]}
          eventSource={eventSource as RefObject<HTMLElement>}
        >
          <GutterSideScene blobs={side === "left" ? LEFT_BLOBS : RIGHT_BLOBS} />
        </Canvas>
      </div>
    </div>
  );
}

type Props = {
  /** Section (or other ancestor) so pointer updates while interacting with hero content. */
  eventSource: RefObject<HTMLElement | null>;
};

/**
 * Soft clouds in the hero side margins — one WebGL canvas per gutter so blobs are never
 * clipped by a full-width perspective frustum.
 */
export function HeroGutterClouds({ eventSource }: Props) {
  return (
    <>
      <GutterStrip side="left" eventSource={eventSource} />
      <GutterStrip side="right" eventSource={eventSource} />
    </>
  );
}
