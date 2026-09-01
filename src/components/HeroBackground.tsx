'use client';

import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (ref.current) {
        const scroll = window.scrollY;
        ref.current.style.transform = `translateY(${scroll * 0.3}px)`;
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Parallax background photo */}
      <div ref={ref} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src="/images/1001028563.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.07]"
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/80 to-[var(--bg)]" />
      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(196,93,62,0.08)_0%,transparent_70%)]" />
    </div>
  );
}
