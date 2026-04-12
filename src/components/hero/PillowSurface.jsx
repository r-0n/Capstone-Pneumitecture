"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

const PLANE_W = 20;
const PLANE_H = 10;
const SEG = 200;

function PillowDunesMesh() {
  const meshRef = useRef(null);
  const baseZ = useRef(null);
  const viewport = useThree((s) => s.viewport);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const geo = meshRef.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position;
    const arr = pos.array;
    const n = arr.length / 3;
    const zCopy = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      zCopy[i] = arr[i * 3 + 2];
    }
    baseZ.current = zCopy;
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const z0arr = baseZ.current;
    if (!mesh || !z0arr) return;

    const posAttr = mesh.geometry.attributes.position;
    const arr = posAttr.array;
    const n = arr.length / 3;
    const time = reduceMotion ? 0 : clock.elapsedTime;

    for (let i = 0; i < n; i++) {
      const ix = i * 3;
      const x = arr[ix];
      const y = arr[ix + 1];
      const zBase = z0arr[i];

      const waveX = Math.sin(x * 1.2 + time * 0.2);
      const waveY = Math.sin(y * 0.8 + time * 0.2);
      let elevation = waveX * waveY;
      elevation = Math.pow(elevation, 2.0);
      arr[ix + 2] = zBase + elevation * 0.6;
    }

    posAttr.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  });

  const cover = Math.max(viewport.width / PLANE_W, viewport.height / PLANE_H) * 1.12;

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -5.5]}
      rotation={[-Math.PI / 3.2, 0, 0]}
      scale={[cover, cover, 1]}
    >
      <planeGeometry args={[PLANE_W, PLANE_H, SEG, SEG]} />
      <meshStandardMaterial
        color="#e6eaf0"
        roughness={0.95}
        metalness={0}
        flatShading={false}
      />
    </mesh>
  );
}

function PillowScene() {
  return (
    <>
      <color attach="background" args={["#f5f7fa"]} />
      <fog attach="fog" args={["#f5f7fa", 6, 20]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#d8e0ed" />
      <PillowDunesMesh />
    </>
  );
}

/**
 * Large soft “pillow dunes” — low-frequency sin waves, squared for calm peaks, fog depth.
 */
export function PillowSurface({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] min-h-full w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <Canvas
        className="h-full min-h-full w-full"
        camera={{
          position: [0, 2.5, 6],
          fov: 42,
          near: 0.1,
          far: 60,
        }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, -4);
        }}
      >
        <PillowScene />
      </Canvas>
    </div>
  );
}
