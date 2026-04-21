"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron, Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function MorphingOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer; // normalized -1..1

    // Mouse-driven rotation (smoothed)
    groupRef.current.rotation.x += (y * 0.3 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (x * 0.5 - groupRef.current.rotation.y) * 0.05;

    // Continuous Y drift on top of mouse
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.15;
      innerRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Outer wireframe shell */}
        <Icosahedron args={[2.3, 2]} ref={innerRef}>
          <MeshDistortMaterial
            color="#5E6AD2"
            attach="material"
            distort={0.35}
            speed={1.8}
            roughness={0.4}
            metalness={0.8}
            emissive="#4A54B0"
            emissiveIntensity={0.15}
            wireframe
            transparent
            opacity={0.35}
          />
        </Icosahedron>
        {/* Inner solid core */}
        <Icosahedron args={[1.4, 6]}>
          <MeshDistortMaterial
            color="#0F1012"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.95}
            emissive="#5E6AD2"
            emissiveIntensity={0.4}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

export default function HeroCanvas() {
  const reduced = useReducedMotion();

  if (reduced) {
    // Lightweight static fallback for reduced-motion / mobile
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        <div
          className="w-[360px] h-[360px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(94, 106, 210, 0.4) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>
    );
  }

  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#7B85E8" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#5E6AD2" />
      <Suspense fallback={null}>
        <MorphingOrb />
      </Suspense>
    </Canvas>
  );
}
