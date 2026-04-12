"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Plane } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useCallback, useRef } from "react";
const SEGMENTS = 150;

function createPillowOnBeforeCompile(material) {
  return (shader) => {
    shader.uniforms.uTime = { value: 0 };
    shader.uniforms.uPillowFreq = { value: 14.0 };
    shader.uniforms.uPillowAmp = { value: 0.14 };
    shader.uniforms.uPillowPhaseX = { value: 0.4 };
    shader.uniforms.uPillowPhaseY = { value: 0.32 };

    material.userData.pillowUniforms = shader.uniforms;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>
uniform float uTime;
uniform float uPillowFreq;
uniform float uPillowAmp;
uniform float uPillowPhaseX;
uniform float uPillowPhaseY;`,
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <beginnormal_vertex>",
      `float wx_n = position.x * uPillowFreq + uTime * uPillowPhaseX;
float wy_n = position.y * uPillowFreq + uTime * uPillowPhaseY;
float pf = sin(wx_n) * sin(wy_n);
float dfdx = cos(wx_n) * uPillowFreq * sin(wy_n);
float dfdy = sin(wx_n) * cos(wy_n) * uPillowFreq;
float ps = pf >= 0.0 ? 1.0 : -1.0;
vec3 objectNormal = normalize(vec3(-ps * dfdx * uPillowAmp, -ps * dfdy * uPillowAmp, 1.0));

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif`,
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
	float wx = position.x * uPillowFreq + uTime * uPillowPhaseX;
	float wy = position.y * uPillowFreq + uTime * uPillowPhaseY;
	float h = abs(sin(wx) * sin(wy)) * uPillowAmp;
	transformed.z += h;`,
    );
  };
}

function PillowScene() {
  const matRef = useRef(null);
  const viewport = useThree((s) => s.viewport);
  const reduceMotion = useReducedMotion();

  const attachMaterial = useCallback((m) => {
    matRef.current = m;
    if (!m) return;
    m.onBeforeCompile = createPillowOnBeforeCompile(m);
    m.customProgramCacheKey = () => "pillow_membrane_v1";
    m.needsUpdate = true;
  }, []);

  useFrame((state) => {
    const u = matRef.current?.userData?.pillowUniforms;
    if (!u) return;
    if (!reduceMotion) {
      u.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <>
      <color attach="background" args={["#ebecef"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 6]} intensity={0.52} />
      <directionalLight position={[-4, 3, -2]} intensity={0.2} color="#b8c4d8" />

      <Plane
        args={[2, 2, SEGMENTS, SEGMENTS]}
        position={[0, 0, -5]}
        scale={[viewport.width / 2, viewport.height / 2, 1]}
      >
        <meshPhysicalMaterial
          ref={attachMaterial}
          color="#e8eaed"
          roughness={0.3}
          metalness={0}
          transmission={0.1}
          thickness={0.35}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={0.85}
        />
      </Plane>

      <Suspense fallback={null}>
        <Environment preset="apartment" environmentIntensity={0.4} />
      </Suspense>
    </>
  );
}

/**
 * Full-bleed pneumatic membrane: drei's Plane (150×150) + MeshPhysicalMaterial
 * with onBeforeCompile displacement abs(sin(x)·sin(y)) and soft Environment lighting.
 */
export function PillowBackground({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
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
        <PillowScene />
      </Canvas>
    </div>
  );
}
