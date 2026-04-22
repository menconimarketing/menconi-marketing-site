"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINE_COUNT = 80;
const POINTS_PER_LINE = 200;
const WAVE_WIDTH = 16;

type Ribbon = {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  yBase: number;
  phase: number;
  freq: number;
};

function WaveRibbons() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Build all line objects once
  const ribbons = useMemo<Ribbon[]>(() => {
    const bundles: Ribbon[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const positions = new Float32Array(POINTS_PER_LINE * 3);
      for (let j = 0; j < POINTS_PER_LINE; j++) {
        positions[j * 3] =
          (j / (POINTS_PER_LINE - 1)) * WAVE_WIDTH - WAVE_WIDTH / 2;
        positions[j * 3 + 1] = 0;
        positions[j * 3 + 2] = 0;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      // Color gradient across the bundle: cyan \u2192 blue \u2192 purple \u2192 magenta \u2192 pink
      const t = i / (LINE_COUNT - 1);
      const hue = 0.55 + t * 0.4; // 0.55 cyan \u2192 0.95 pink
      const color = new THREE.Color().setHSL(hue, 0.9, 0.55);

      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);

      bundles.push({
        line,
        geometry,
        yBase: (i - LINE_COUNT / 2) * 0.022,
        phase: Math.random() * Math.PI * 2,
        freq: 0.7 + Math.random() * 0.5,
      });
    }
    return bundles;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Smooth cursor trailing
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;

    ribbons.forEach((b) => {
      const positions = b.geometry.attributes.position.array as Float32Array;

      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const u = j / (POINTS_PER_LINE - 1);

        // Layered sines = organic non-repeating motion
        const w1 = Math.sin(u * 7 + t * b.freq + b.phase) * 0.55;
        const w2 = Math.sin(u * 13 - t * 1.2 + b.phase * 1.8) * 0.28;
        const w3 = Math.sin(u * 21 + t * 0.6) * 0.14;

        // Slow-moving envelope creates random-looking peak zones
        const envelope =
          (Math.sin(u * 5.2 + t * 0.28) * 0.5 + 0.5) * 0.75 + 0.25;

        // Mouse bulge \u2014 wave rises toward cursor x
        const normX = u * 2 - 1;
        const distToMouse = Math.abs(normX - mouse.current.x);
        const mouseEffect =
          Math.max(0, 1 - distToMouse * 1.6) * mouse.current.y * 1.3;

        const y = (w1 + w2 + w3) * envelope + b.yBase + mouseEffect - 1.6;
        positions[j * 3 + 1] = y;
      }
      b.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef}>
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
      <div className="absolute bottom-[15%] left-0 right-0 h-[200px] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(94, 106, 210, 0.3) 25%, rgba(168, 85, 247, 0.45) 50%, rgba(236, 72, 153, 0.3) 75%, transparent)",
            filter: "blur(50px)",
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
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
    >
      <ambientLight intensity={0.3} />
      <WaveRibbons />
    </Canvas>
  );
}
