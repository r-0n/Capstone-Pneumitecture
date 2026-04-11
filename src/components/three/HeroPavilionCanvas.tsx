"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ProceduralPavilion } from "@/components/three/ProceduralPavilion";

type Props = {
  className?: string;
};

/**
 * WebGL hero strip — no SSR (Three.js / WebGL context).
 */
export function HeroPavilionCanvas({ className = "" }: Props) {
  return (
    <div className={`relative h-full min-h-[200px] w-full md:min-h-[280px] ${className}`}>
      <Canvas
        className="!absolute inset-0 touch-none"
        camera={{ position: [0, 5, 25], fov: 45, near: 0.1, far: 200 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.75]}
      >
        <color attach="background" args={["#0c1016"]} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          makeDefault
        />
        <ProceduralPavilion />
      </Canvas>
    </div>
  );
}
