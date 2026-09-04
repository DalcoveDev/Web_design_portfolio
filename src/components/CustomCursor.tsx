'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function animate() {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      gsap.set(cursor, { x: mouse.x, y: mouse.y, xPercent: -50, yPercent: -50 });
      gsap.set(trail, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 });
      requestAnimationFrame(animate);
    }

    function onEnter() {
      gsap.to(cursor, { scale: 2, duration: 0.3 });
      gsap.to(trail, { scale: 1.5, opacity: 0.3, duration: 0.3 });
    }

    function onLeave() {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(trail, { scale: 1, opacity: 0.6, duration: 0.3 });
    }

    function attachListeners() {
      const els = document.querySelectorAll<HTMLElement>('a, button, [role="button"], input, textarea');
      els.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      return els;
    }

    function detachListeners(els: HTMLElement[]) {
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    }

    let tracked: HTMLElement[] = attachListeners();

    window.addEventListener('mousemove', onMouseMove);
    const raf = requestAnimationFrame(animate);

    const interval = setInterval(() => {
      detachListeners(tracked);
      tracked = attachListeners();
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      clearInterval(interval);
      detachListeners(tracked);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--terracotta)] pointer-events-none z-[99999] mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--terracotta)]/40 pointer-events-none z-[99998] opacity-60 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
