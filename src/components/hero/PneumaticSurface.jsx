"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useLayoutEffect, useRef } from "react";

function hash2(r, c) {
  return Math.sin(r * 127.1 + c * 311.7) * 43758.5453123 - Math.floor(Math.sin(r * 127.1 + c * 311.7) * 43758.5453123);
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * ETFE-style staggered cushions: ~4–5 domes across width, smooth bulging tops, sharp shared valleys.
 */
function pillowElevation(x, y, t) {
  const w = 2.48;
  const h = 2.05;
  const row = Math.floor((y + 3) / h + 1e-7);
  const rowShift = (row % 2) * (w * 0.5);
  const col = Math.floor((x + 5 + rowShift) / w + 1e-7);
  const localX = x + 5 + rowShift - col * w;
  const localY = y + 3 - row * h;

  const pu = (localX / w - 0.5) * 2;
  const pv = (localY / h - 0.5) * 2;

  const ax = 0.88;
  const ay = 0.9;
  const r = Math.sqrt((pu / ax) * (pu / ax) + (pv / ay) * (pv / ay));

  const breathe = 1 + 0.024 * Math.sin(t * 0.085 + row * 0.33 + col * 0.27);

  let dome = Math.max(0, 1 - Math.pow(Math.min(r / 0.94, 1.12), 2.75));
  dome = Math.pow(dome, 0.82);

  const seam = smoothstep(0.72, 1.02, r);
  dome *= 1 - seam * 0.92;

  const cellHash = hash2(row, col);
  const fine =
    Math.sin(x * 47.2 + y * 31.4) * 0.012 +
    Math.sin(x * 89.1 - y * 52.3 + t * 0.04) * 0.008 +
    (cellHash - 0.5) * 0.028;

  return (dome * 0.56 + fine * dome) * breathe;
}

const PLANE_W = 10;
const PLANE_H = 6;
const SEG = 110;

function PneumaticMesh() {
  const meshRef = useRef(null);
  const basePositions = useRef(null);
  const viewport = useThree((s) => s.viewport);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const geo = meshRef.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position;
    basePositions.current = new Float32Array(pos.array);
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const base = basePositions.current;
    if (!mesh || !base) return;

    const posAttr = mesh.geometry.attributes.position;
    const arr = posAttr.array;
    const n = arr.length / 3;
    const t = reduceMotion ? 0 : clock.elapsedTime;

    for (let i = 0; i < n; i++) {
      const ix = i * 3;
      const x = base[ix];
      const y = base[ix + 1];
      const z0 = base[ix + 2];

      const el = pillowElevation(x, y, t);
      arr[ix] = x;
      arr[ix + 1] = y;
      arr[ix + 2] = z0 + el * 0.56;
    }

    posAttr.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  });

  const cover =
    Math.max(viewport.width / PLANE_W, viewport.height / PLANE_H) * 1.38;

  return (
    <mesh
      ref={meshRef}
      position={[0, -0.55, -4.65]}
      rotation={[-0.82, 0.025, 0]}
      scale={[cover, cover, 1]}
    >
      <planeGeometry args={[PLANE_W, PLANE_H, SEG, SEG]} />
      <meshPhysicalMaterial
        color="#eceef1"
        roughness={0.76}
        metalness={0.03}
        transmission={0.11}
        thickness={0.48}
        ior={1.45}
        clearcoat={0.07}
        clearcoatRoughness={0.55}
        envMapIntensity={0.58}
      />
    </mesh>
  );
}

function PneumaticScene() {
  return (
    <>
      <color attach="background" args={["#8fc4ea"]} />
      <hemisphereLight args={["#d8ecff", "#5c6068", 0.52]} position={[0, 1, 0]} />
      <ambientLight intensity={0.16} color="#eef2f8" />
      <directionalLight position={[9, 11, 8]} intensity={1.38} color="#fffaf4" />
      <directionalLight position={[-8, 4, -7]} intensity={0.3} color="#9ebfe8" />

      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.36} />
      </Suspense>

      <PneumaticMesh />
    </>
  );
}

/**
 * Full-viewport ETFE cushion field — large staggered domes, sharp valleys, grazing camera, membrane material.
 */
export function PneumaticSurface({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] min-h-full w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <Canvas
        className="h-full min-h-full w-full"
        camera={{
          position: [0, 0.08, 6.35],
          fov: 36,
          near: 0.1,
          far: 100,
        }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        onCreated={({ camera }) => {
          camera.lookAt(0, -0.95, -4.55);
        }}
      >
        <PneumaticScene />
      </Canvas>
    </div>
  );
}
