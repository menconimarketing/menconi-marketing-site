"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINE_COUNT = 190;
const POINTS_PER_LINE = 280;
const WAVE_WIDTH = 26;
const MAX_PEAK = 0.55;

// Simplex noise — organic, non-periodic. The wave never exactly repeats.
const noise3D = createNoise3D();

type Ribbon = {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  yBase: number;
  phaseOffset: number;
  ampMul: number;
  fiberSeed: number;
};

function WaveField() {
  const groupRef = useRef<THREE.Group>(null);
  const startOffset = useMemo(() => Math.random() * 1000, []);

  const ribbons = useMemo<Ribbon[]>(() => {
    const arr: Ribbon[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const positions = new Float32Array(POINTS_PER_LINE * 3);
      const colors = new Float32Array(POINTS_PER_LINE * 3);

      // Smoke → amber gradient (Menconi signature gradient)
      // smoke #A8B0C4 = (168, 176, 196) at left
      // amber #E8D49A = (232, 212, 154) at right
      const smoke = new THREE.Color(0xA8B0C4);
      const amber = new THREE.Color(0xE8D49A);
      for (let j = 0; j < POINTS_PER_LINE; j++) {
        positions[j * 3] =
          (j / (POINTS_PER_LINE - 1)) * WAVE_WIDTH - WAVE_WIDTH / 2;
        positions[j * 3 + 1] = 0;
        positions[j * 3 + 2] = 0;

        const u = j / (POINTS_PER_LINE - 1);
        const c = smoke.clone().lerp(amber, u);
        const hdr = 1.4; // slightly toned-down HDR — brand says muted, not neon
        colors[j * 3] = c.r * hdr;
        colors[j * 3 + 1] = c.g * hdr;
        colors[j * 3 + 2] = c.b * hdr;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const distFromCenter = Math.abs(i - LINE_COUNT / 2) / (LINE_COUNT / 2);
      const centerFade = 1 - Math.pow(distFromCenter, 1.4);
      const opacity = 0.2 + centerFade * 0.55;

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);

      arr.push({
        line,
        geometry,
        // Very tight bundle (≈ LINE_COUNT * 0.0035 ≈ 0.66 units total height)
        // Bloom blurs adjacent fibers into a single thick neon strand
        yBase: (i - LINE_COUNT / 2) * 0.0035,
        // Constrained spread: ±7% phase, ±6% amp = controlled fan-out during peaks
        phaseOffset: (Math.random() - 0.5) * 0.14,
        ampMul: 0.94 + Math.random() * 0.12,
        fiberSeed: Math.random() * 100,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = (state.clock.elapsedTime + startOffset) * 0.55;

    ribbons.forEach((b) => {
      const positions = b.geometry.attributes.position.array as Float32Array;

      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const x =
          (j / (POINTS_PER_LINE - 1)) * WAVE_WIDTH - WAVE_WIDTH / 2;

        // Higher spatial frequency = ~3 visible peaks across the screen
        const mainWave = Math.sin((x - t * 1.2) * 1.3 + b.phaseOffset) * 0.4;
        // Mid-scale simplex noise — organic non-repeating undulation
        const midNoise = noise3D(x * 0.55 - t * 0.22, t * 0.12, 0) * 0.18;
        // Tiny fiber-specific noise so adjacent fibers have subtle individuality
        const fiberNoise =
          noise3D(x * 0.85, t * 0.08, b.fiberSeed) * 0.06;

        let dynamicY = (mainWave + midNoise + fiberNoise) * b.ampMul;

        // Smooth tanh clamp at MAX_PEAK — wave bends naturally when it hits the cap
        dynamicY = MAX_PEAK * Math.tanh(dynamicY / MAX_PEAK);

        positions[j * 3 + 1] = dynamicY + b.yBase;

        // Subtle Z depth using noise for organic 3D feel
        positions[j * 3 + 2] =
          noise3D(x * 0.2 - t * 0.1, t * 0.04, b.fiberSeed * 0.5) * 0.18 +
          b.yBase * 1.5;
      }
      b.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef} position={[0, -2.1, 0]}>
      {ribbons.map((b, i) => (
        <primitive key={i} object={b.line} />
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="absolute bottom-[10%] left-0 right-0 h-[200px] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(94, 106, 210, 0.4) 25%, rgba(168, 85, 247, 0.55) 50%, rgba(236, 72, 153, 0.4) 75%, transparent)",
            filter: "blur(40px)",
          }}
        />
      </div>
    );
  }

  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <fog attach="fog" args={["#08090A", 6, 22]} />
      <WaveField />
      <EffectComposer>
        <Bloom
          intensity={0.95}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.7}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}
