"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const PLANE_W = 20;
const PLANE_H = 12;
const SEG = 200;
const CELL_SIZE = 3.2;
const SEAM_WIDTH = 0.08;

/**
 * Rounded-square pillows: broad flat tops, soft stitched channel seams (not radial peaks).
 */
function pillowGridElevation(x, y) {
  const gx = x / CELL_SIZE;
  const gy = y / CELL_SIZE;

  const fx = gx - Math.floor(gx) - 0.5;
  const fy = gy - Math.floor(gy) - 0.5;

  const d = Math.max(Math.abs(fx), Math.abs(fy));

  let pillow = 1.0 - d * 2.0;
  pillow = Math.max(pillow, 0);
  pillow = Math.pow(pillow, 1.2);

  let elevation = pillow * 0.6;

  if (Math.abs(fx) > 0.5 - SEAM_WIDTH || Math.abs(fy) > 0.5 - SEAM_WIDTH) {
    elevation -= 0.25;
  }

  elevation = Math.min(elevation, 0.55);

  const noise =
    Math.sin(x * 22.4 + y * 15.1) * 0.002 + Math.sin(x * 6.2 - y * 4.8) * 0.0015;

  return elevation + noise;
}

function SkyGradientBackground() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 4;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const grd = ctx.createLinearGradient(0, 0, 0, 512);
    grd.addColorStop(0, "#e9edf3");
    grd.addColorStop(0.45, "#dde3ec");
    grd.addColorStop(1, "#cfd8e4");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 4, 512);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const scene = useThree((s) => s.scene);
  useLayoutEffect(() => {
    if (!texture) return;
    const prev = scene.background;
    scene.background = texture;
    return () => {
      scene.background = prev;
      texture.dispose();
    };
  }, [scene, texture]);

  return null;
}

function PillowGridMesh() {
  const meshRef = useRef(null);
  const viewport = useThree((s) => s.viewport);

  // Static height field (same idea as a vertex shader, but keeps MeshPhysicalMaterial + correct normals).
  // No useFrame: sin-based shader samples are a different shape (sine quilt) than rounded-square pillows.
  useLayoutEffect(() => {
    const geo = meshRef.current?.geometry;
    if (!geo) return;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array;
    const n = arr.length / 3;
    for (let i = 0; i < n; i++) {
      const ix = i * 3;
      const x = arr[ix];
      const y = arr[ix + 1];
      arr[ix + 2] = pillowGridElevation(x, y);
    }
    posAttr.needsUpdate = true;
    geo.computeVertexNormals();
  }, []);

  const cover = Math.max(viewport.width / PLANE_W, viewport.height / PLANE_H) * 1.28;

  return (
    <mesh
      ref={meshRef}
      position={[0, -0.45, -5.9]}
      rotation={[-0.72, 0.02, 0]}
      scale={[cover, cover, 1]}
    >
      <planeGeometry args={[PLANE_W, PLANE_H, SEG, SEG]} />
      <meshPhysicalMaterial
        color="#f0f2f4"
        roughness={0.92}
        metalness={0}
        clearcoat={0.25}
        clearcoatRoughness={0.95}
        envMapIntensity={0.38}
      />
    </mesh>
  );
}

function PillowGridScene() {
  return (
    <>
      <SkyGradientBackground />
      <fog attach="fog" args={["#e9edf3", 6, 18]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 4, 2]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-5, 2, -3]} intensity={0.3} />

      <Suspense fallback={null}>
        <Environment preset="apartment" environmentIntensity={0.22} />
      </Suspense>

      <PillowGridMesh />
    </>
  );
}

/**
 * Pneumatic pillow grid — rounded-square cells, wide soft seams, grazing side light, sky gradient + fog.
 */
export function PillowGrid({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] min-h-full w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <Canvas
        className="h-full min-h-full w-full"
        camera={{
          position: [0, 2.2, 6],
          fov: 40,
          near: 0.1,
          far: 90,
        }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        onCreated={({ camera }) => {
          camera.position.set(0, 2.2, 6);
          camera.lookAt(0, -0.55, -5.2);
        }}
      >
        <PillowGridScene />
      </Canvas>
    </div>
  );
}
