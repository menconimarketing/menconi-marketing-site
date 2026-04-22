"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SPIKE_COUNT = 220;

function ShardStar() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  // Per-spike random params
  const spikes = useMemo(
    () =>
      Array.from({ length: SPIKE_COUNT }, () => {
        // Uniform sphere distribution
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        // Skew toward longer spikes
        const length = 1.6 + Math.pow(Math.random(), 1.6) * 4.2;
        const thickness = 0.012 + Math.random() * 0.04;
        // Color hue: deep purple to violet
        const hue = 0.7 + Math.random() * 0.1; // 0.7 violet \u2192 0.8 magenta
        const lightness = 0.45 + Math.random() * 0.25;
        const color = new THREE.Color().setHSL(hue, 0.8, lightness);
        return { phi, theta, length, thickness, color };
      }),
    []
  );

  // Set per-instance matrix and color once
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);

    spikes.forEach((s, i) => {
      const dir = new THREE.Vector3(
        Math.sin(s.phi) * Math.cos(s.theta),
        Math.cos(s.phi),
        Math.sin(s.phi) * Math.sin(s.theta)
      );
      // Position cone center: offset outward by half its length so base is near center
      const pos = dir.clone().multiplyScalar(s.length / 2 + 0.3);
      dummy.position.copy(pos);
      // Orient: cone default tip is +Y; rotate so tip points along dir
      dummy.quaternion.setFromUnitVectors(up, dir);
      dummy.scale.set(s.thickness, s.length, s.thickness);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, s.color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [spikes]);

  // Listen to scroll for progress (0..1 across the hero)
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / vh));
      scrollProgress.current = p;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sp = scrollProgress.current;

    // Smooth mouse trailing
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04;

    if (groupRef.current) {
      // Continuous orbital rotation \u2014 speeds up on scroll
      const speedMul = 1 + sp * 3;
      groupRef.current.rotation.z = t * 0.06 * speedMul;
      groupRef.current.rotation.y = t * 0.04 * speedMul + mouse.current.x * 0.4;
      groupRef.current.rotation.x = mouse.current.y * 0.3;

      // Scale up on scroll \u2014 spikes get bigger as you scroll past hero
      const scale = 1 + sp * 0.5;
      groupRef.current.scale.setScalar(scale);
    }

    if (coreRef.current) {
      // Core pulses with time + grows with scroll
      const pulse = 1 + Math.sin(t * 1.5) * 0.04;
      const scrollGrow = 1 + sp * 0.6;
      coreRef.current.scale.setScalar(pulse * scrollGrow);
      coreRef.current.rotation.x = t * 0.3;
      coreRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Radial spike field */}
      <instancedMesh
        ref={meshRef}
        args={[undefined as never, undefined as never, SPIKE_COUNT]}
      >
        <coneGeometry args={[0.5, 1, 8, 1, false]} />
        <meshBasicMaterial
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Central crystal core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#5E6AD2"
          emissive="#7B85E8"
          emissiveIntensity={0.7}
          metalness={0.95}
          roughness={0.05}
          flatShading
        />
      </mesh>

      {/* Inner glow point */}
      <pointLight position={[0, 0, 0]} intensity={1.2} color="#7B85E8" distance={6} />
    </group>
  );
}

export default function HeroCanvas() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(123, 133, 232, 0.3) 0%, rgba(94, 106, 210, 0.1) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>
    );
  }

  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 3, 5]} intensity={0.4} color="#7B85E8" />
      <ShardStar />
    </Canvas>
  );
}
