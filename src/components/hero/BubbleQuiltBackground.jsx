"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform vec2 uGrid;

varying vec2 vUv;
varying float vHeight;
varying vec3 vViewPos;

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float pillowHeight(vec2 uv) {
  vec2 g = uv * uGrid;
  vec2 id = floor(g);
  vec2 cell = fract(g) - 0.5;

  if (mod(id.y, 2.0) > 0.5) {
    cell.x += 0.5;
  }
  cell.x = fract(cell.x + 0.5) - 0.5;

  float cellAspect = uGrid.x / max(uGrid.y, 1.0);
  vec2 gv = vec2(cell.x / (0.48 * max(cellAspect, 0.4)), cell.y / 0.5);
  float r = length(gv);

  float dome = 1.0 - smoothstep(0.22, 0.98, r);
  dome = pow(max(dome, 0.0), 1.22);

  float vari = hash2(id + vec2(3.1, 9.7)) * 0.14 + 0.93;
  dome *= vari;

  float breathe = sin(uTime * 0.1 + dot(id, vec2(0.63, 0.97))) * 0.018;
  dome += breathe;

  return dome * uAmp;
}

void main() {
  vUv = uv;
  vec3 pos = position;
  float h = pillowHeight(uv);
  pos.z = h;
  vHeight = h;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPos = mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

uniform float uAmp;
uniform vec2 uGrid;

varying vec2 vUv;
varying float vHeight;
varying vec3 vViewPos;

void main() {
  vec3 dx = dFdx(vViewPos);
  vec3 dy = dFdy(vViewPos);
  vec3 N = normalize(cross(dy, dx));

  vec3 L = normalize(vec3(0.38, 0.84, 0.45));
  float diff = max(dot(N, L), 0.0);
  float amb = 0.36;
  float shade = amb + (1.0 - amb) * diff;

  float ao = mix(0.44, 1.0, smoothstep(0.0, 0.52, vHeight / max(uAmp, 0.0001)));
  shade *= ao;

  vec3 hi = vec3(0.95, 0.96, 0.97);
  vec3 mid = vec3(0.78, 0.79, 0.8);
  vec3 lo = vec3(0.34, 0.35, 0.37);

  float t = shade;
  vec3 color = mix(lo, mid, smoothstep(0.25, 0.55, t));
  color = mix(color, hi, smoothstep(0.5, 0.95, t));

  vec2 g = vUv * uGrid;
  vec2 cell = fract(g) - 0.5;
  float seamH = smoothstep(0.028, 0.0, abs(cell.y - 0.14));
  seamH += smoothstep(0.028, 0.0, abs(cell.y + 0.1));
  float seamV = smoothstep(0.022, 0.0, abs(cell.x));
  float seams = clamp(seamH * 0.11 + seamV * 0.06, 0.0, 0.22);
  color *= 1.0 - seams * (0.55 + 0.45 * (1.0 - shade));

  float topDark = 1.0 - smoothstep(0.02, 0.24, vUv.y);
  vec3 sky = vec3(0.11, 0.115, 0.12);
  color = mix(color, sky, topDark * 0.94);

  float grain = fract(sin(dot(gl_FragCoord.xy * 0.008, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.01;

  gl_FragColor = vec4(color, 1.0);
}
`;

const SEG_X = 180;
const SEG_Y = 135;

function BubbleQuiltMesh() {
  const meshRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const viewport = useThree((s) => s.viewport);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.22 },
      uGrid: { value: new THREE.Vector2(26, 19) },
    }),
    [],
  );

  useFrame((state) => {
    const mat = meshRef.current?.material;
    if (!mat) return;
    if (!reduceMotion) {
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group rotation={[-0.31, 0.16, 0]}>
      <mesh ref={meshRef} position={[0, 0.15, -5]} scale={[viewport.width / 2, viewport.height / 2, 1]}>
        <planeGeometry args={[2, 2, SEG_X, SEG_Y]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          depthWrite={true}
          depthTest={true}
          toneMapped={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Fullscreen staggered pneumatic “pillow” field — matte grayscale, soft light, dark top band.
 */
export function BubbleQuiltBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0.35, 8], fov: 40, near: 0.1, far: 80 }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <BubbleQuiltMesh />
      </Canvas>
    </div>
  );
}
