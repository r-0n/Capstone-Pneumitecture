"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

/**
 * Tunables (see brief):
 * - ICOSA_DETAIL: subdivision depth. Three.js grows face count ~4^n; 12 is not viable in-browser.
 *   5–6 matches “thousands of triangles”; increase on desktop if GPU allows.
 * - noise frequency: lower = larger, slower “cells”
 * - EdgesGeometry threshold (degrees): lower = more lines, higher = only sharpest creases
 */
const ICOSA_DETAIL = 5;
const RADIUS = 10;
const ARCH_WAVES = 3;
const ARCH_LIFT = 8;
const FLOOR_CLIP = -5;
const NOISE_FREQ = 0.2;
const NOISE_AMP = 1.5;
const EDGE_THRESHOLD_DEG = 12;

export function ProceduralPavilion() {
  const lineMeshRef = useRef<THREE.LineSegments>(null);

  const pavilionGeometry = useMemo(() => {
    const baseGeo = new THREE.IcosahedronGeometry(RADIUS, ICOSA_DETAIL);
    const posAttribute = baseGeo.attributes.position;
    const vertex = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const noise3D = createNoise3D();

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);

      // Carving arches (pavilion legs) — sine lobes around Y
      const angle = Math.atan2(vertex.x, vertex.z);
      let archMask = Math.sin(angle * ARCH_WAVES);
      archMask = (archMask + 1) / 2;

      if (vertex.y < 0) {
        vertex.y += archMask * ARCH_LIFT;
        if (vertex.y < FLOOR_CLIP) vertex.y = FLOOR_CLIP;
      }

      // Cellular bumps — push along normal (do not mutate a reused normal incorrectly)
      const noiseVal = noise3D(
        vertex.x * NOISE_FREQ,
        vertex.y * NOISE_FREQ,
        vertex.z * NOISE_FREQ,
      );
      normal.copy(vertex).normalize();
      vertex.addScaledVector(normal, noiseVal * NOISE_AMP);

      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    posAttribute.needsUpdate = true;
    baseGeo.computeVertexNormals();

    const edgesGeo = new THREE.EdgesGeometry(baseGeo, EDGE_THRESHOLD_DEG);
    baseGeo.dispose();
    return edgesGeo;
  }, []);

  useEffect(() => {
    return () => pavilionGeometry.dispose();
  }, [pavilionGeometry]);

  useFrame((_, delta) => {
    const mesh = lineMeshRef.current;
    if (mesh) mesh.rotation.y += delta * 0.05;
  });

  return (
    <lineSegments ref={lineMeshRef} geometry={pavilionGeometry}>
      <lineBasicMaterial
        color="#5eb8d4"
        transparent
        opacity={0.42}
        depthWrite={false}
      />
    </lineSegments>
  );
}
