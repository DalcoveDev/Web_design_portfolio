import Lenis from 'lenis';

let lenis: Lenis | null = null;

/**
 * Returns the shared Lenis smooth-scroll instance.
 * Creates one on first call so the same instance is reused everywhere.
 */
export function getLenis(): Lenis {
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
  }
  return lenis;
}

/**
 * Starts the Lenis rAF loop so smooth scrolling is active.
 * Safe to call multiple times — only the first call starts the loop.
 */
export function startLenis(): void {
  const instance = getLenis();

  function raf(time: number) {
    instance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
