'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Floating torus knot with distortion
function FloatingShape({ position, color, speed = 1, distort = 0.3 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[1, 0.3, 128, 16, 2, 3]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Floating icosahedron
function FloatingIco({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

// Mouse-follow camera
function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  return null;
}

// Ambient particles
function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c45d3e"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main scene
function Scene() {
  return (
    <>
      <CameraController />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f0ebe3" />
      <pointLight position={[-5, 3, -5]} intensity={0.6} color="#c45d3e" />
      <pointLight position={[5, -3, 5]} intensity={0.4} color="#7a8b6f" />

      {/* Main floating shape */}
      <FloatingShape position={[2, 0.5, -2]} color="#c45d3e" speed={0.8} distort={0.4} />

      {/* Secondary shapes */}
      <FloatingIco position={[-3, 1, -3]} color="#7a8b6f" />
      <FloatingShape position={[-1.5, -1, -4]} color="#b8b0a4" speed={0.6} distort={0.2} />

      {/* Sparkles */}
      <Sparkles count={100} scale={15} size={2} speed={0.3} color="#c45d3e" opacity={0.4} />

      {/* Particles */}
      <Particles />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0e0e0e', 5, 20]} />
    </>
  );
}

// Exported canvas component
export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
