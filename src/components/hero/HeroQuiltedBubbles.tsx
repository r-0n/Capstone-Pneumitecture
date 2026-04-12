"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ExtrudeGeometry, Shape } from "three";
import { toCreasedNormals } from "three-stdlib";

const EPS = 0.00001;

function createRoundedRectShape(width: number, height: number, radius0: number) {
  const shape = new Shape();
  const radius = radius0 - EPS;
  shape.absarc(EPS, EPS, EPS, -Math.PI / 2, -Math.PI, true);
  shape.absarc(EPS, height - radius * 2, EPS, Math.PI, Math.PI / 2, true);
  shape.absarc(width - radius * 2, height - radius * 2, EPS, Math.PI / 2, 0, true);
  shape.absarc(width - radius * 2, EPS, EPS, 0, -Math.PI / 2, true);
  return shape;
}

function createPillowGeometry(
  width: number,
  height: number,
  depth: number,
  radius: number,
): THREE.ExtrudeGeometry {
  const shape = createRoundedRectShape(width, height, radius);
  const extrudeDepth = depth - radius * 2;
  const geom = new ExtrudeGeometry(shape, {
    depth: Math.max(0.08, extrudeDepth),
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: radius - EPS,
    bevelThickness: radius,
    curveSegments: 3,
  });
  geom.center();
  toCreasedNormals(geom, 0.45);
  return geom;
}

function buildStaggeredGrid(
  cols: number,
  rows: number,
  stepX: number,
  stepY: number,
): THREE.Matrix4[] {
  const matrices: THREE.Matrix4[] = [];
  const halfX = ((cols - 1) * stepX) / 2;
  const halfY = ((rows - 1) * stepY) / 2;
  const offset = stepX * 0.5;
  const dummy = new THREE.Object3D();

  for (let r = 0; r < rows; r++) {
    const rowShift = (r % 2) * offset;
    for (let c = 0; c < cols; c++) {
      const x = c * stepX - halfX + rowShift;
      const y = r * stepY - halfY;
      const z = Math.sin(r * 1.7 + c * 2.1) * 0.04;
      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.sin(c * 0.31) * 0.02,
        Math.cos(r * 0.27) * 0.02,
        Math.sin((r + c) * 0.19) * 0.015,
      );
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());
    }
  }
  return matrices;
}

function QuiltMesh() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e4e7ec",
        roughness: 0.94,
        metalness: 0.02,
        envMapIntensity: 0.35,
      }),
    [],
  );

  const { geometry, matrices, count } = useMemo(() => {
    const geo = createPillowGeometry(2.05, 1.48, 0.92, 0.32);
    const cols = 18;
    const rows = 14;
    const stepX = 2.02;
    const stepY = 1.38;
    const mats = buildStaggeredGrid(cols, rows, stepX, stepY);
    return { geometry: geo, matrices: mats, count: mats.length };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.count = count;
    for (let i = 0; i < count; i++) {
      mesh.setMatrixAt(i, matrices[i]!);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [count, matrices]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const tx = pointer.x * 0.06;
    const ty = pointer.y * 0.04;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.14 + tx, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.11 + ty * 0.5, 0.04);
  });

  return (
    <group
      ref={groupRef}
      position={[0, viewport.height * 0.06, -1.2]}
      rotation={[0.11, -0.14, 0]}
    >
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, count]}
        frustumCulled={false}
      />
    </group>
  );
}

function QuiltScene() {
  return (
    <>
      <color attach="background" args={["#e8ebf0"]} />
      <ambientLight intensity={0.58} color="#f5f6f8" />
      <directionalLight position={[-10, 22, 14]} intensity={1.05} color="#ffffff" />
      <directionalLight position={[14, 8, -6]} intensity={0.24} color="#c8d4e8" />
      <QuiltMesh />
    </>
  );
}

type Props = {
  eventSource: React.RefObject<HTMLElement | null>;
};

/**
 * Full-bleed quilted cushion field behind hero content (matte, staggered pillows).
 */
export function HeroQuiltedBubbles({ eventSource }: Props) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 1.2, 13.5], fov: 48, near: 0.1, far: 120 }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        eventSource={eventSource as React.RefObject<HTMLElement>}
      >
        <QuiltScene />
      </Canvas>
    </div>
  );
}
