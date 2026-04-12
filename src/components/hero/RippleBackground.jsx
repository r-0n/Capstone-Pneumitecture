"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBase;
uniform vec2 uResolution;

varying vec2 vUv;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= uResolution.x / max(uResolution.y, 1.0);
  float d = length(uv);

  float waves = sin(d * 20.0 - uTime * 0.42);
  waves = smoothstep(0.2, 0.8, waves * 0.5 + 0.5);

  float fade = smoothstep(0.8, 0.2, d);

  float intensity = waves * fade * 0.15;

  vec2 nUv = vUv * uResolution * 0.08 + uTime * 0.015;
  float grain = (hash(nUv) - 0.5) * 0.018;

  vec3 color = mix(uBase, uColor, intensity);
  color += grain;

  float vig = smoothstep(0.95, 0.32, d);
  color = mix(uBase, color, vig);

  float dith = (hash(gl_FragCoord.xy + uTime * 60.0) - 0.5) * 0.0035;
  color += dith;

  gl_FragColor = vec4(color, 1.0);
}
`;

const BASE = "#f7f7f7";
const ACCENT = "#ff6a3d";

function RipplePlane() {
  const meshRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const viewport = useThree((s) => s.viewport);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(ACCENT) },
      uBase: { value: new THREE.Color(BASE) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state) => {
    const mat = meshRef.current?.material;
    if (!mat) return;
    const dpr = state.viewport.dpr;
    mat.uniforms.uResolution.value.set(state.size.width * dpr, state.size.height * dpr);
    if (!reduceMotion) {
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[viewport.width / 2, viewport.height / 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={true}
        toneMapped={false}
      />
    </mesh>
  );
}

function RippleScene() {
  return <RipplePlane />;
}

/**
 * Soft fullscreen radial ripple — shader background for hero (minimal motion).
 */
export function RippleBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 8], fov: 38, near: 0.1, far: 80 }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <RippleScene />
      </Canvas>
    </div>
  );
}
