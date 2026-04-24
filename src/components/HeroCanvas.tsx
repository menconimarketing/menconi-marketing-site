"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINE_COUNT = 160;
const POINTS_PER_LINE = 280;
const WAVE_WIDTH = 26;

type Ribbon = {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  yBase: number;
  phaseOffset: number;
};

function WaveField() {
  const groupRef = useRef<THREE.Group>(null);
  // Randomize the wave's starting frame on every page load so it's never the same scene twice
  const startOffset = useMemo(() => Math.random() * 200, []);

  const ribbons = useMemo<Ribbon[]>(() => {
    const arr: Ribbon[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const positions = new Float32Array(POINTS_PER_LINE * 3);
      const colors = new Float32Array(POINTS_PER_LINE * 3);

      // Per-vertex color: gradient by X position so all lines share the same
      // cyan → blue → purple → magenta → pink rainbow across the wave.
      for (let j = 0; j < POINTS_PER_LINE; j++) {
        positions[j * 3] =
          (j / (POINTS_PER_LINE - 1)) * WAVE_WIDTH - WAVE_WIDTH / 2;
        positions[j * 3 + 1] = 0;
        positions[j * 3 + 2] = 0;

        const u = j / (POINTS_PER_LINE - 1);
        const hue = 0.5 + u * 0.45;
        const c = new THREE.Color().setHSL(hue, 0.95, 0.55);
        const hdr = 1.6; // baseline HDR boost so bloom catches every fiber
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

      // Lines closer to center are brighter; edges fade out softly.
      const distFromCenter = Math.abs(i - LINE_COUNT / 2) / (LINE_COUNT / 2);
      const centerFade = 1 - Math.pow(distFromCenter, 1.4);
      const opacity = 0.18 + centerFade * 0.55;

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
        // Tight bundle — total bundle height ~= LINE_COUNT * 0.012 ≈ 1.92 units
        yBase: (i - LINE_COUNT / 2) * 0.012,
        // Tiny phase offset per line — gives fiber texture without breaking the
        // unified wave shape. ALL lines still flow with the same core function.
        phaseOffset: (Math.random() - 0.5) * 0.12,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    // Slow time multiplier + random start offset
    const t = (state.clock.elapsedTime + startOffset) * 0.45;

    ribbons.forEach((b) => {
      const positions = b.geometry.attributes.position.array as Float32Array;

      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const x =
          (j / (POINTS_PER_LINE - 1)) * WAVE_WIDTH - WAVE_WIDTH / 2;

        // Dominant base wave (low freq, strong) — gives the structured rhythm
        const wave1 = Math.sin((x - t * 1.0) * 0.42 + b.phaseOffset) * 0.42;
        // Secondary modulation (mid freq, lighter) — keeps it unpredictable
        const wave2 = Math.sin((x - t * 0.55) * 0.85 + 1.3) * 0.14;
        // Tiny detail layer (slight, just enough to keep it from being mechanical)
        const wave3 = Math.sin((x - t * 0.35) * 1.7 + 2.1) * 0.05;

        // Tighter envelope so peaks vary less wildly (reduces overall spread)
        const envelope = Math.sin(x * 0.2 + t * 0.11) * 0.22 + 0.78;

        const y = (wave1 + wave2 + wave3) * envelope + b.yBase;
        positions[j * 3 + 1] = y;

        // Z depth — slightly reduced too
        positions[j * 3 + 2] =
          Math.sin((x - t * 0.45) * 0.25) * 0.25 + b.yBase * 3.5;
      }
      b.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef} position={[0, -1.4, 0]}>
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
      <div className="absolute bottom-[18%] left-0 right-0 h-[200px] pointer-events-none">
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
          intensity={1.3}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.8}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}
