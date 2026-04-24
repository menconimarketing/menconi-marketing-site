"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINE_COUNT = 140;
const POINTS_PER_LINE = 220;
const WAVE_WIDTH = 22;

type Ribbon = {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  yBase: number;
  phase: number;
  freqMul: number;
  hueShift: number;
};

function WaveField({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  const ribbons = useMemo<Ribbon[]>(() => {
    const arr: Ribbon[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const positions = new Float32Array(POINTS_PER_LINE * 3);
      const colors = new Float32Array(POINTS_PER_LINE * 3);

      const t = i / (LINE_COUNT - 1);
      // Hue: 0.5 (cyan) → 0.95 (magenta/red) — full premium spectrum
      const baseHue = 0.5 + t * 0.45;

      for (let j = 0; j < POINTS_PER_LINE; j++) {
        positions[j * 3] =
          (j / (POINTS_PER_LINE - 1)) * WAVE_WIDTH - WAVE_WIDTH / 2;
        positions[j * 3 + 1] = 0;
        positions[j * 3 + 2] = 0;

        // Edge fade: 0 at line ends, 1 in the middle
        const u = j / (POINTS_PER_LINE - 1);
        const edgeFade = Math.sin(u * Math.PI);

        // Saturate + add HDR boost in the middle so bloom triggers there
        const c = new THREE.Color().setHSL(baseHue, 0.95, 0.55);
        const intensity = 0.4 + edgeFade * 3.2; // > 1.0 in middle = HDR → bloom
        colors[j * 3] = c.r * intensity;
        colors[j * 3 + 1] = c.g * intensity;
        colors[j * 3 + 2] = c.b * intensity;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.55 + Math.random() * 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);

      arr.push({
        line,
        geometry,
        yBase: (i - LINE_COUNT / 2) * 0.022,
        phase: Math.random() * Math.PI * 2,
        freqMul: 0.65 + Math.random() * 0.55,
        hueShift: t,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    ribbons.forEach((b) => {
      const positions = b.geometry.attributes.position.array as Float32Array;

      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const u = j / (POINTS_PER_LINE - 1);

        // Layered sines = organic non-repeating motion
        const w1 = Math.sin(u * 5 + t * b.freqMul + b.phase) * 0.7;
        const w2 = Math.sin(u * 11 - t * 0.9 + b.phase * 1.7) * 0.32;
        const w3 = Math.sin(u * 19 + t * 0.55) * 0.16;
        const w4 = Math.sin(u * 31 - t * 0.4 + b.phase) * 0.08;

        // Slow envelope creates random-looking peak zones
        const envelope =
          (Math.sin(u * 4.2 + t * 0.2) * 0.5 + 0.5) * 0.8 + 0.2;

        // Cross modulation between lines for organic group feel
        const crossMod = Math.sin(t * 0.18 + b.hueShift * Math.PI * 2) * 0.25;

        // Mouse bulge — wave rises toward cursor x, scaled by cursor y
        const normX = u * 2 - 1;
        const distToMouse = Math.abs(normX - mx);
        const mouseEffect = Math.max(0, 1 - distToMouse * 1.4) * my * 1.4;

        const y =
          (w1 + w2 + w3 + w4) * envelope +
          crossMod +
          b.yBase +
          mouseEffect -
          1.4;
        positions[j * 3 + 1] = y;
      }
      b.geometry.attributes.position.needsUpdate = true;
    });

    if (groupRef.current) {
      // Very subtle group sway
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.02;
    }
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
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  // Listen to window mousemove globally so pointer-events-none on parent doesn't block us
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    let raf = 0;
    const tick = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;
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
      <div className="absolute bottom-[15%] left-0 right-0 h-[200px] pointer-events-none">
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
      <ambientLight intensity={0.2} />
      <WaveField mouseRef={mouseRef} />
      <EffectComposer>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0.35}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.85}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}
