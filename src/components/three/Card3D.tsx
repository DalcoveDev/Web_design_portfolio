'use client';

import { useRef, useState } from 'react';

export default function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareOpacity, setGlareOpacity] = useState(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((0.5 - y) * 20);
    setRotateY((x - 0.5) * 20);
    setGlareOpacity(0.15);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
    setGlareOpacity(0);
  }

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-200"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,${glareOpacity}) 45%, rgba(255,255,255,${glareOpacity * 0.5}) 50%, transparent 55%)`,
        }}
      />
    </div>
  );
}
