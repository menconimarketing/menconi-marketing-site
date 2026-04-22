"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function OrbGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;

    if (groupRef.current) {
      groupRef.current.rotation.x +=
        (y * 0.25 - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y +=
        (x * 0.4 - groupRef.current.rotation.y) * 0.04;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.08;
      shellRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1}>
        {/* Solid glowing core */}
        <Icosahedron args={[1.8, 6]} ref={coreRef}>
          <MeshDistortMaterial
            color="#5E6AD2"
            attach="material"
            distort={0.45}
            speed={2}
            roughness={0.15}
            metalness={0.9}
            emissive="#7B85E8"
            emissiveIntensity={0.7}
          />
        </Icosahedron>
        {/* Wireframe outer shell */}
        <Icosahedron args={[2.6, 3]} ref={shellRef}>
          <meshBasicMaterial
            color="#7B85E8"
            wireframe
            transparent
            opacity={0.5}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

export default function HeroCanvas() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        <div
          className="w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(94, 106, 210, 0.5) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </div>
    );
  }

  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#7B85E8" />
      <pointLight position={[-5, -5, -5]} intensity={1.2} color="#5E6AD2" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#FFFFFF" />
      <Suspense fallback={null}>
        <OrbGroup />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
