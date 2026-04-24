"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINE_COUNT = 160;
const POINTS_PER_LINE = 280;
const WAVE_WIDTH = 26;
// Approximate visible half-width on screen for camera (z=7, fov=42, 16:9)
const VISIBLE_HALF_WIDTH = 5.0;

type Ribbon = {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  yBase: number;
  phaseOffset: number;
  ampMul: number; // per-fiber amplitude variation breaks up convergence clumps
};

function WaveField({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; yProx: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const startOffset = useMemo(() => Math.random() * 200, []);

  const ribbons = useMemo<Ribbon[]>(() => {
    const arr: Ribbon[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const positions = new Float32Array(POINTS_PER_LINE * 3);
      const colors = new Float32Array(POINTS_PER_LINE * 3);

      for (let j = 0; j < POINTS_PER_LINE; j++) {
        positions[j * 3] =
          (j / (POINTS_PER_LINE - 1)) * WAVE_WIDTH - WAVE_WIDTH / 2;
        positions[j * 3 + 1] = 0;
        positions[j * 3 + 2] = 0;

        const u = j / (POINTS_PER_LINE - 1);
        const hue = 0.5 + u * 0.45;
        const c = new THREE.Color().setHSL(hue, 0.95, 0.55);
        const hdr = 1.6;
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
        // Tighter bundle — total bundle height ~= LINE_COUNT * 0.009 ≈ 1.44 units
        yBase: (i - LINE_COUNT / 2) * 0.009,
        phaseOffset: (Math.random() - 0.5) * 0.14,
        // Tighter per-fiber amp variation (±5%) — keeps wave uniform, still kills clumps
        ampMul: 0.95 + Math.random() * 0.1,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = (state.clock.elapsedTime + startOffset) * 0.45;

    // Map cursor X (normalized -1..+1 on screen) to wave world coords
    const cursorWaveX = mouseRef.current.x * VISIBLE_HALF_WIDTH;
    const cursorIntensity = mouseRef.current.yProx; // 0..1

    ribbons.forEach((b) => {
      const positions = b.geometry.attributes.position.array as Float32Array;

      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const x =
          (j / (POINTS_PER_LINE - 1)) * WAVE_WIDTH - WAVE_WIDTH / 2;

        // Thinner wave — amplitudes ~50% smaller for a slim, uniform ribbon
        const wave1 = Math.sin((x - t * 1.0) * 0.55 + b.phaseOffset) * 0.26;
        const wave2 = Math.sin((x - t * 0.6) * 1.05 + 1.3) * 0.08;
        const wave3 = Math.sin((x - t * 0.35) * 1.9 + 2.1) * 0.025;

        // Tighter envelope so peaks are closer to the same height (more uniform)
        const envelope = Math.sin(x * 0.2 + t * 0.11) * 0.1 + 0.9;

        // Magnetic cursor peak — way more subtle (max ~0.3 vs prior 1.1)
        const dist = x - cursorWaveX;
        const cursorPeak =
          Math.exp(-(dist * dist) / 4) * cursorIntensity * 0.3;

        const y =
          (wave1 + wave2 + wave3) * envelope * b.ampMul +
          cursorPeak +
          b.yBase;

        positions[j * 3 + 1] = y;
        // Reduced Z depth so the bundle is visually thinner front-to-back too
        positions[j * 3 + 2] =
          Math.sin((x - t * 0.45) * 0.25) * 0.15 + b.yBase * 2;
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
  const mouseRef = useRef({ x: 0, yProx: 0 });
  const targetRef = useRef({ x: 0, yProx: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      // Cursor proximity to wave area: 0 in upper 30% of screen, ramps to 1 at bottom
      const yNorm = e.clientY / window.innerHeight;
      targetRef.current.yProx = Math.max(0, (yNorm - 0.3) / 0.7);
    };
    let raf = 0;
    const tick = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.yProx +=
        (targetRef.current.yProx - mouseRef.current.yProx) * 0.08;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

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
      <WaveField mouseRef={mouseRef} />
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
