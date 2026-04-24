"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Traveling waves — negative time so peaks move left to right
    float wave1 = sin((pos.x - uTime * 1.4) * 0.55) * 0.6;
    float wave2 = sin((pos.x - uTime * 0.9) * 1.1 + 1.0) * 0.32;
    float wave3 = sin((pos.x - uTime * 0.5) * 2.3 + 2.0) * 0.14;

    // Slow envelope so peaks are uneven
    float envelope = sin(pos.x * 0.28 + uTime * 0.18) * 0.45 + 0.7;

    float displacement = (wave1 + wave2 + wave3) * envelope;

    pos.y += displacement;
    // Subtle Z displacement so the ribbon has 3D depth, not just 2D up/down
    pos.z += sin(pos.x * 0.35 - uTime * 0.6) * 0.45;

    vElevation = displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying float vElevation;

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
    // Hue gradient across the X axis: cyan → blue → purple → magenta → pink
    float hue = 0.5 + vUv.x * 0.45;
    vec3 color = hsl2rgb(vec3(hue, 0.95, 0.55));

    // Vertical center fade — brightest in the middle of the ribbon, fades to soft edges
    float verticalFade = 1.0 - abs(vUv.y - 0.5) * 2.0;
    verticalFade = pow(max(verticalFade, 0.0), 1.4);

    // HDR intensity in the middle (>1.0 triggers bloom)
    float intensity = 0.4 + verticalFade * 3.0;

    // Slight elevation-based brightness boost — high peaks glow a touch brighter
    intensity += abs(vElevation) * 0.5;

    // Edge alpha falloff so the ribbon doesn't have hard top/bottom edges
    float edgeAlpha = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);

    gl_FragColor = vec4(color * intensity, edgeAlpha);
  }
`;

function WaveRibbon() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, -1.4, 0]} rotation={[-0.06, 0, 0]}>
      <planeGeometry args={[28, 2.4, 280, 24]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
      />
    </mesh>
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
      <WaveRibbon />
      <EffectComposer>
        <Bloom
          intensity={1.4}
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
