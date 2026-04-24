"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINE_COUNT = 110;
const POINTS_PER_LINE = 280;
const WAVE_WIDTH = 26;
// Hard cap on how high any peak can rise above the bundle baseline
const MAX_PEAK = 0.55;
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
        // Very tight bundle — total bundle height ~= LINE_COUNT * 0.005 ≈ 0.55 units
        // Fibers nearly overlap → reads as a single neon-highlighter strand under bloom
        yBase: (i - LINE_COUNT / 2) * 0.005,
        phaseOffset: (Math.random() - 0.5) * 0.1,
        // Tight per-fiber amp variation (±4%)
        ampMul: 0.96 + Math.random() * 0.08,
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

        // Wave layers — bumped back up so it actually flows
        const wave1 = Math.sin((x - t * 1.0) * 0.55 + b.phaseOffset) * 0.55;
        const wave2 = Math.sin((x - t * 0.6) * 1.05 + 1.3) * 0.18;
        const wave3 = Math.sin((x - t * 0.35) * 1.9 + 2.1) * 0.06;

        // Envelope variation back up so peaks have drama, but capped below
        const envelope = Math.sin(x * 0.2 + t * 0.11) * 0.18 + 0.82;

        const cursorDist = x - cursorWaveX;
        const cursorPeak =
          Math.exp(-(cursorDist * cursorDist) / 4) * cursorIntensity * 0.22;

        let dynamicY =
          (wave1 + wave2 + wave3) * envelope * b.ampMul + cursorPeak;

        // Hard ceiling on peak height — smooth tanh clamp so it bends naturally
        // rather than chopping flat. Wave can't go higher than MAX_PEAK above bundle.
        dynamicY = MAX_PEAK * Math.tanh(dynamicY / MAX_PEAK);

        positions[j * 3 + 1] = dynamicY + b.yBase;
        // Tight Z depth — barely-there 3D feel
        positions[j * 3 + 2] =
          Math.sin((x - t * 0.45) * 0.25) * 0.1 + b.yBase * 1.5;
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
