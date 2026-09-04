'use client';

import React from 'react';
import { useRef, type ReactNode, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { getLenis, startLenis } from '@/lib/scroll';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger, Flip, Draggable);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GSAPTween = gsap.core.Tween;

// Re-export Lenis so other modules can import the package from here if needed.
export { default as Lenis } from 'lenis';
export { getLenis, startLenis } from '@/lib/scroll';

/* ─── Hero text reveal animation — staggered mask-clip subtitle-style reveal ─── */
export function HeroAnimations({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!container.current) return;
    const el = container.current;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });



    const tag = el.querySelector('.hero-tag');
    const line1 = el.querySelector('.hero-line-1');
    const line2 = el.querySelector('.hero-line-2');
    const line3 = el.querySelector('.hero-line-3');
    const desc = el.querySelector('.hero-desc');
    const actions = el.querySelector('.hero-actions');
    const scroll = el.querySelector('.hero-scroll');

    // Tag: fade + rise
    if (tag) {
      if (reducedMotion) {
        gsap.set(tag, { opacity: 1, y: 0 });
      } else {
        tl.from(tag, { opacity: 0, y: 30, duration: 0.8 });
      }
    }

    // Line 1: rise from below
    if (line1) {
      if (reducedMotion) {
        gsap.set(line1, { opacity: 1, y: 0 });
      } else {
        tl.from(line1, { opacity: 0, y: 60, duration: 0.9 }, '-=0.4');
      }
    }

    // Line 2: slide from left (subtitle-style)
    if (line2) {
      if (reducedMotion) {
        gsap.set(line2, { opacity: 1, x: 0 });
      } else {
        tl.from(line2, { opacity: 0, x: -80, duration: 1 }, '-=0.6');
      }
    }

    // Line 3: rise from below
    if (line3) {
      if (reducedMotion) {
        gsap.set(line3, { opacity: 1, y: 0 });
      } else {
        tl.from(line3, { opacity: 0, y: 60, duration: 0.9 }, '-=0.6');
      }
    }

    // Description: fade + rise
    if (desc) {
      if (reducedMotion) {
        gsap.set(desc, { opacity: 1, y: 0 });
      } else {
        tl.from(desc, { opacity: 0, y: 30, duration: 0.8 }, '-=0.4');
      }
    }

    // Actions: fade + rise
    if (actions) {
      if (reducedMotion) {
        gsap.set(actions, { opacity: 1, y: 0 });
      } else {
        tl.from(actions, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3');
      }
    }

    // Scroll indicator: scaleY reveal
    if (scroll) {
      if (reducedMotion) {
        gsap.set(scroll, { opacity: 1, scaleY: 1 });
      } else {
        tl.from(scroll, { opacity: 0, scaleY: 0, transformOrigin: 'top', duration: 0.8 }, '-=0.2');
      }
    }
  }, { scope: container });

  return <div ref={container} className={className}>{children}</div>;
}

/* ─── Hero marquee — looping role/skills ribbon ─── */
export function HeroMarquee({
  items,
  speed = 0.3,
  pauseOnHover = true,
  className = '',
}: {
  items: string[];
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!trackRef.current || !container.current) return;

    if (reducedMotion) {
      gsap.set(trackRef.current, { x: 0 });
      return;
    }

    const track = trackRef.current;
    const totalWidth = track.scrollWidth;
    const moveDistance = -totalWidth;

    // Duplicate items for seamless loop
    const items = Array.from(track.children);
    const duplicate = items.map((item) => item.cloneNode(true));
    duplicate.forEach((clone) => track.appendChild(clone));

    const tween = gsap.to(track, {
      x: moveDistance,
      duration: 40 / speed,
      ease: 'none',
      repeat: -1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    if (pauseOnHover) {
      const containerEl = container.current;
      const onEnter = () => tween.pause();
      const onLeave = () => tween.resume();
      containerEl.addEventListener('mouseenter', onEnter);
      containerEl.addEventListener('mouseleave', onLeave);
      return () => {
        containerEl.removeEventListener('mouseenter', onEnter);
        containerEl.removeEventListener('mouseleave', onLeave);
      };
    }
  }, { scope: container });

  return (
    <div ref={container} className={`overflow-hidden w-full ${className}`}>
      <div ref={trackRef} className="flex gap-16 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-block text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-tight text-[var(--cream)]/10">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Cursor blob on CTA hover — appears beside cursor on CTA hover ─── */
export function CTACursorBlob({
  children,
  color = 'var(--terracotta)',
  className = '',
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!container.current || !blobRef.current || typeof window === 'undefined') return;
    const el = container.current;
    const blob = blobRef.current;

    // Hide blob initially
    gsap.set(blob, { opacity: 0, scale: 0 });

    // Show blob on hover of any child link/button
    const links = el.querySelectorAll('a, button, [role="button"]');
    links.forEach((link) => {
      (link as HTMLElement).addEventListener('mouseenter', () => {
        if (reducedMotion) return;
        gsap.to(blob, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' });
      });
      (link as HTMLElement).addEventListener('mouseleave', () => {
        if (reducedMotion) return;
        gsap.to(blob, { opacity: 0, scale: 0, duration: 0.2, ease: 'power2.in' });
      });
    });

    // Follow mouse while hovering
    function onMouseMove(e: MouseEvent) {
      if (reducedMotion) return;
      gsap.to(blob, {
        x: e.clientX + 12,
        y: e.clientY + 12,
        duration: 0.15,
        ease: 'power2.out',
      });
    }

    el.addEventListener('mousemove', onMouseMove);
    return () => el.removeEventListener('mousemove', onMouseMove);
  }, { scope: container });

  return (
    <>
      <div ref={container} className={className}>
        {children}
      </div>
      <div
        ref={blobRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference rounded-full"
        style={{
          width: 48,
          height: 48,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}

/* ─── Hero camera-pull: hero text scales/fades/slides up on scroll ─── */
export function HeroCameraPull({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      ref.current,
      { opacity: 1, scale: 1, y: 0 },
      {
        opacity: 0,
        scale: 0.85,
        y: -60,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'bottom bottom', // when hero bottom hits viewport bottom
          end: 'bottom top',
          scrub: 1.2,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Parallax hero backgrounds ─── */
export function ParallaxHero({
  children,
  className = '',
  orbs = [
    { className: 'parallax-orb-1', xSpeed: -30, ySpeed: -40 },
    { className: 'parallax-orb-2', xSpeed: 20, ySpeed: -25 },
  ],
}: {
  children?: ReactNode;
  className?: string;
  orbs?: { className: string; xSpeed: number; ySpeed: number }[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!container.current) return;

    const orbs1 = container.current.querySelectorAll('.parallax-orb-1');
    const orbs2 = container.current.querySelectorAll('.parallax-orb-2');

    if (!reducedMotion) {
      orbs1.forEach((orb) => {
        gsap.to(orb, {
          y: -150,
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      orbs2.forEach((orb) => {
        gsap.to(orb, {
          y: -100,
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });
    } else {
      // Reduced motion: just set final position statically
      orbs1.forEach((orb) => gsap.set(orb, { y: -150 }));
      orbs2.forEach((orb) => gsap.set(orb, { y: -100 }));
    }
  }, { scope: container });

  return (
    <div ref={container} className={className}>
      {children}
      {/* Mouse-reactive parallax layer (applied via HeroParallaxMouse below) */}
    </div>
  );
}

/* ─── Hero mouse parallax — 2.5D look: orbs move opposite to cursor ─── */
export function HeroParallaxMouse({
  children,
  orbs,
  sensitivity = 20,
  className = '',
}: {
  children?: ReactNode;
  orbs?: { className: string; xSpeed: number; ySpeed: number }[];
  sensitivity?: number;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!container.current || typeof window === 'undefined') return;
    const el = container.current;

    const orbEls = (orbs ?? [
      { className: 'parallax-orb-1', xSpeed: -30, ySpeed: -40 },
      { className: 'parallax-orb-2', xSpeed: 20, ySpeed: -25 },
    ])
      .map((o) => el.querySelector(`.${o.className}`))
      .filter((e) => e != null) as HTMLElement[];

    if (orbEls.length === 0 || reducedMotion) return;

    const targets = orbEls.map((orb) => ({
      el: orb,
      xSpeed: (orbs ?? [])[orbEls.indexOf(orb)]?.xSpeed ?? -30,
      ySpeed: (orbs ?? [])[orbEls.indexOf(orb)]?.ySpeed ?? -40,
    }));

    function onMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      targets.forEach((t) => {
        gsap.to(t.el, {
          x: deltaX * t.xSpeed * sensitivity,
          y: deltaY * t.ySpeed * sensitivity,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    }

    el.addEventListener('mousemove', onMouseMove);
    return () => el.removeEventListener('mousemove', onMouseMove);
  }, { scope: container });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}

/* ─── Generic scroll reveal wrapper ─── */
export function ScrollRevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.children, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Project cards stagger animation ─── */
export function ProjectCardsAnimation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const cards = ref.current.querySelectorAll('.project-card-item');
    gsap.from(cards, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

/* ─── Services slide-in animation ─── */
export function ServicesAnimation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const items = ref.current.querySelectorAll('.service-item');
    gsap.from(items, {
      opacity: 0,
      x: -40,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

/* ─── Stats counter animation ─── */
export function StatsAnimation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const items = ref.current.querySelectorAll('.stat-item');
    gsap.from(items, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

/* ─── Contact section reveal ─── */
export function ContactAnimation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.children, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

/* ─── useReducedMotion hook ─── */
export function useReducedMotion(): boolean {
  const ref = useRef<boolean>(false);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    ref.current = mq.matches;
  });

  return ref.current;
}

/* ─── Smooth scroll setup ─── */
// Starts the shared Lenis smooth-scroll instance and wires it to ScrollTrigger.
export function useSmoothScroll() {
  useGSAP(() => {
    if (typeof window === 'undefined') return;

    const lenis = getLenis();

    // GSAP ScrollTrigger + Lenis integration:
    // Tell ScrollTrigger to use Lenis as its scroller so scrub/progress follow Lenis.
    ScrollTrigger.getAll().forEach((t) => {
      if ((t.vars.scroller as unknown as boolean | undefined) !== false) {
        (t.vars.scroller as unknown as HTMLElement) = lenis.rootElement;
        t.refresh();
      }
    });

    startLenis();

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
}

/* ─── Horizontal text scroll — text moves left as user scrolls down ─── */
export function HorizontalTextScroll({
  children,
  speed = 1,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: () => -(ref.current!.scrollWidth - window.innerWidth + 100) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Parallax section — children move at different speeds ─── */
export function ParallaxSection({
  children,
  y = -50,
  className = '',
}: {
  children: ReactNode;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Text reveal — splits text into words and reveals them one by one ─── */
export function TextRevealByWord({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll('.reveal-word');
    gsap.from(words, {
      opacity: 0.15,
      y: 15,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.04,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <React.Fragment key={i}>
          <span className="reveal-word">{word}</span>
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Image parallax — image scrolls slower than its container ─── */
export function ImageParallax({
  src,
  alt,
  className = '',
  speed = 0.3,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const img = ref.current.querySelector('img');
    if (!img) return;

    gsap.to(img, {
      yPercent: speed * 40,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover scale-110" />
    </div>
  );
}

/* ─── Stagger reveal — generic wrapper with configurable direction ─── */
export function StaggerReveal({
  children,
  direction = 'up',
  stagger = 0.1,
  className = '',
}: {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger,
    };

    switch (direction) {
      case 'up': fromVars.y = 50; break;
      case 'down': fromVars.y = -50; break;
      case 'left': fromVars.x = 60; break;
      case 'right': fromVars.x = -60; break;
    }

    gsap.from(ref.current.children, {
      ...fromVars,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Scroll progress bar — shows a thin bar at the top of the section ─── */
export function ScrollProgressBar({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current.parentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      }
    );
  }, { scope: ref });

  return (
    <div className={`absolute top-0 left-0 right-0 h-0.5 origin-left ${className}`}>
      <div ref={ref} className="h-full bg-gradient-to-r from-[var(--terracotta)] to-[var(--sage)]" />
    </div>
  );
}

/* ─── Flip animation — smooth layout transitions when state changes ─── */
export function FlipCards({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-triggered Flip: cards flip in on scroll
  useGSAP(() => {
    if (!ref.current) return;

    const items = ref.current.querySelectorAll('.flip-item');
    if (items.length === 0) return;

    // Save initial state
    const state = Flip.getState(items);

    // Set final state (they're already in final position)
    items.forEach((item) => {
      gsap.set(item, { clearProps: 'all' });
    });

    Flip.from(state, {
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className} data-flip-container>
      {children}
    </div>
  );
}

/* ─── Draggable gallery — makes items draggable with rotation physics ─── */
export function DraggableGallery({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const items = ref.current.querySelectorAll('.draggable-item');
    const draggables: Draggable[] = [];

    items.forEach((item) => {
      // Set initial rotation based on index for variety
      const index = Array.from(items).indexOf(item);
      const rotation = (index % 2 === 0 ? 1 : -1) * (1 + index * 0.5);
      gsap.set(item, { rotation, transformOrigin: 'center center' });

      const drag = Draggable.create(item, {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: ref.current,
        inertia: false,
        onDrag: function () {
          // Subtle rotation while dragging
          gsap.to(item, {
            rotation: this.getDirection() === 'left' ? -5 : 5,
            duration: 0.3,
            ease: 'power2.out',
          });
        },
        onDragEnd: function () {
          // Snap back to original position with spring
          gsap.to(item, {
            x: 0,
            y: 0,
            rotation: rotation,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          });
        },
      })[0];

      draggables.push(drag);
    });

    return () => {
      draggables.forEach((d) => d.kill());
    };
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── DrawSVG animation — official GSAP DrawSVGPlugin for SVG path drawing ─── */
export function SVGDraw({
  paths,
  viewBox = '0 0 100 100',
  className = '',
  width = 100,
  height = 100,
  color = 'var(--terracotta)',
  strokeWidth = 1.5,
  delay = 0,
}: {
  paths: string[];
  viewBox?: string;
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  delay?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!svgRef.current) return;

    const svgPaths = svgRef.current.querySelectorAll('path');

    svgPaths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: 'none',
        stroke: color,
        strokeWidth,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        delay,
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: svgRef });

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/* ─── Scroll tint — brightness/saturation shift on scroll (CSS filter based) ─── */
export function ScrollTint({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { filter: 'brightness(1) saturate(1)' },
      {
        filter: 'brightness(1.15) saturate(1.3)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── DevToolsPanel — placeholder (premium GSDevTools removed) ─── */
export function DevToolsPanel(_props?: { name?: string }) {
  return null;
}

/* ─── Scroll-triggered counter — counts from 0 to target number ─── */
export function AnimatedCounter({
  target,
  suffix = '',
  duration = 2,
  className = '',
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value) + suffix;
        }
      },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  return <span ref={ref} className={className}>0{suffix}</span>;
}

/* ─── Magnetic hover — element subtly follows cursor ─── */
export function MagneticHover({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const el = ref.current;

    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    function handleMouseLeave() {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    }

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Text scramble — random characters before revealing real text ─── */
export function TextScramble({
  text,
  className = '',
  duration = 1.5,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const chars = '!<>-_\/[]{}—=+*^?#________';

  useGSAP(() => {
    if (!ref.current) return;
    const el = ref.current;
    let frame = 0;
    const totalFrames = Math.floor(duration * 60);
    const queue: { from: string; to: string; start: number; end: number }[] = [];

    for (let i = 0; i < text.length; i++) {
      queue.push({
        from: chars[Math.floor(Math.random() * chars.length)],
        to: text[i],
        start: Math.floor(Math.random() * 40),
        end: Math.floor(Math.random() * 40) + 40,
      });
    }

    const interval = setInterval(() => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          output += chars[Math.floor(Math.random() * chars.length)];
        } else {
          output += from;
        }
      }
      el.textContent = output;
      frame++;
      if (complete === queue.length) clearInterval(interval);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, { scope: ref });

  return <div ref={ref} className={className}>{text}</div>;
}

/* ─── Scroll counter — counts from 0 to N with easing ─── */
export function ScrollCounter({
  target,
  suffix = '',
  className = '',
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.value) + suffix;
      },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  return <span ref={ref} className={className}>0{suffix}</span>;
}

/* ─── Glow pulse — element glows on scroll ─── */
export function GlowPulse({
  children,
  color = 'var(--terracotta)',
  className = '',
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current, {
      boxShadow: `0 0 0px ${color}`,
    }, {
      boxShadow: `0 0 60px ${color}, 0 0 120px ${color}`,
      duration: 1.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play pause play pause',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── 3D rotate on scroll — element rotates in 3D as you scroll ─── */
export function ScrollRotate3D({
  children,
  className = '',
  maxRotation = 15,
}: {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current, {
      rotateY: -maxRotation,
      rotateX: maxRotation / 2,
      opacity: 0.3,
    }, {
      rotateY: maxRotation,
      rotateX: -maxRotation / 2,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={{ perspective: 1000 }}>
      {children}
    </div>
  );
}

/* ─── Clip reveal — element unclips from center outward ─── */
export function ClipReveal({
  children,
  className = '',
  direction = 'horizontal',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    const from = direction === 'horizontal'
      ? { clipPath: 'inset(0 50% 0 50%)' }
      : { clipPath: 'inset(50% 0 50% 0)' };
    const to = direction === 'horizontal'
      ? { clipPath: 'inset(0 0% 0 0%)' }
      : { clipPath: 'inset(0% 0 0% 0)' };

    if (reducedMotion) {
      gsap.set(ref.current, { clipPath: 'inset(0 0% 0 0%)' });
      return;
    }

    gsap.fromTo(ref.current, from, {
      ...to,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Clip-path wipe — curtain/mask opening reveal, scroll-linked ─── */
export function ClipPathWipe({
  children,
  className = '',
  direction = 'left',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    const clipFrom: Record<string, string> = {
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
      up: 'inset(100% 0 0 0)',
      down: 'inset(0 0 100% 0)',
    };

    if (reducedMotion) {
      gsap.set(ref.current, { clipPath: 'inset(0 0% 0 0%)' });
      return;
    }

    // Use a timeline so the whole reveal can be delayed as a unit.
    const tl = gsap.timeline({ delay });
    tl.fromTo(
      ref.current,
      { clipPath: clipFrom[direction] },
      {
        clipPath: 'inset(0 0% 0 0%)',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Sticky image scroll — split-screen editorial: image pins while text scrolls past ─── */
export function StickyImageScroll({
  image,
  imageAlt = '',
  className = '',
  imageSide = 'right',
  stickyHeight = 500,
  children,
}: {
  image: string;
  imageAlt?: string;
  className?: string;
  imageSide?: 'left' | 'right';
  stickyHeight?: number;
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || !imageRef.current) return;
    const section = sectionRef.current;
    const img = imageRef.current;

    const pinEnd = `+=${stickyHeight}`;

    // Pin the image while text scrolls past
    gsap.fromTo(
      img,
      { opacity: 0.7 },
      {
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: pinEnd,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          scrub: reducedMotion ? 0 : 0.5,
        },
      }
    );

    // Ken Burns subtle zoom on the pinned image
    const imgEl = img.querySelector('img') as HTMLImageElement | null;
    if (!reducedMotion && imgEl) {
      gsap.fromTo(
        imgEl,
        { scale: 1.05 },
        {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: pinEnd,
            scrub: 1,
          },
        }
      );
    } else if (imgEl) {
      gsap.set(imgEl, { scale: 1 });
    }

    // Text slides up as it enters
    if (textRef.current && !reducedMotion) {
      const tz = gsap.timeline();
      tz.from(textRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      });
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 80%',
        end: 'top 20%',
        onEnter: () => tz.play(),
        onLeaveBack: () => tz.reverse(),
      });
    } else if (textRef.current) {
      gsap.set(textRef.current.children, { opacity: 1, y: 0 });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${imageSide === 'left' ? 'md:flex-row-reverse' : ''}`}>
        {/* Sticky image */}
        <div ref={imageRef} className="relative w-full md:sticky top-1/2 md:top-0 -translate-y-1/2 md:-translate-y-0 aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Text side */}
        <div ref={textRef} className="flex flex-col gap-6">
          {children}
        </div>
      </div>
      {/* Spacer so pinned element doesn't overlap scroll */}
      <div className="h-0 md:h-[calc(100vh-500px)]" />
    </section>
  );
}

/* ─── Keyword underline — underline-draw animation triggered on viewport enter ─── */
export function KeywordUnderline({
  children,
  className = '',
  color = 'var(--terracotta)',
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, { backgroundColor: color });
      return;
    }

    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: ref });

  return (
    <span
      ref={ref}
      className={`inline-block h-0.5 align-middle rounded-full ${className}`}
      style={{
        backgroundColor: color,
        transformOrigin: 'left center',
        willChange: 'transform',
      }}
    >
      {children}
    </span>
  );
}

/* ─── Keyword highlight — wraps keywords with underline animation ─── */
export function HighlightKeywords({
  text,
  keywords,
  className = '',
  underlineColor = 'var(--terracotta)',
}: {
  text: string;
  keywords: string[];
  className?: string;
  underlineColor?: string;
}) {
  // Normalize whitespace: collapse multiple spaces, trim.
  const normalized = text.replace(/\s+/g, ' ').trim();

  // Build a list of (phrase, lowercasedWords[]) for matching, longest-first.
  const phraseList = keywords
    .map((k) => ({
      original: k,
      words: k.toLowerCase().trim().split(/\s+/).filter(Boolean),
    }))
    .sort((a, b) => b.words.join(' ').length - a.words.join(' ').length);

  // Tokenize into word tokens only (we'll insert space text nodes between them).
  const wordTokens: { value: string; lowered: string }[] = normalized
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ({ value: w, lowered: w.toLowerCase() }));

  // Mark phrase ranges over word token indices.
  const ranges: { start: number; end: number }[] = [];
  for (const phrase of phraseList) {
    const len = phrase.words.length;
    for (let start = 0; start <= wordTokens.length - len; start++) {
      if (ranges.some((r) => start >= r.start && start + len <= r.end)) continue;
      const slice = wordTokens.slice(start, start + len);
      const match = slice.every((t, i) => t.lowered === phrase.words[i]);
      if (match) {
        ranges.push({ start, end: start + len });
        break;
      }
    }
  }

  // Build output: for each word, either a plain span or a KeywordUnderline.
  // A single space text node separates each consecutive pair of words.
  const output: ReactNode[] = [];
  let rangeCursor = 0;
  for (let i = 0; i < wordTokens.length; i++) {
    const isPhraseStart = ranges[rangeCursor]?.start === i;
    if (isPhraseStart) {
      const end = ranges[rangeCursor].end;
      const phraseWords: ReactNode[] = [];
      for (let j = i; j < end; j++) {
        phraseWords.push(
          <KeywordUnderline key={j} color={underlineColor}>
            {wordTokens[j].value}
          </KeywordUnderline>
        );
        // Space between phrase words (inside the phrase)
        if (j < end - 1) {
          phraseWords.push(<span key={`ps${j}`}>{' '}</span>);
        }
      }
      output.push(<React.Fragment key={i}>{phraseWords}</React.Fragment>);
      // Space AFTER the phrase (between last phrase word and next word)
      if (end < wordTokens.length) {
        output.push(<span key={`s${end}`}>{' '}</span>);
      }
      if (rangeCursor < ranges.length - 1) rangeCursor++;
      // Skip past all phrase words; loop's i++ will land on the next word after the phrase
      i = end - 1;
    } else {
      output.push(<span key={i}>{wordTokens[i].value}</span>);
      // Space between this word and the next
      if (i < wordTokens.length - 1) {
        output.push(<span key={`s${i}`}>{' '}</span>);
      }
    }
  }

  return (
    <span className={className}>
      {output}
    </span>
  );
}

/* ─── Wave text — each character bounces like a wave ─── */
export function WaveText({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.wave-char');

    gsap.from(chars, {
      y: 30,
      opacity: 0,
      rotationZ: 8,
      duration: 0.4,
      ease: 'back.out(1.4)',
      stagger: 0.03,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="wave-char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

/* ─── Stagger scale — children pop in with scale + rotation ─── */
export function StaggerScale({
  children,
  className = '',
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.children, {
      scale: 0.95,
      rotation: -10,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.4)',
      stagger,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DYNAMIC LAYER-BY-LAYER SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════════════════════ */

/* ─── LayerParallax — multiple layers move at different scroll speeds ─── */
export function LayerParallax({
  children,
  className = '',
  layers = [
    { speed: -0.3, rotation: -2 },
    { speed: 0.15, rotation: 1 },
    { speed: 0.5, rotation: 0 },
  ],
}: {
  children: ReactNode;
  className?: string;
  layers?: { speed: number; rotation?: number }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const layerEls = containerRef.current.querySelectorAll('.parallax-layer');

    layerEls.forEach((layer, i) => {
      const config = layers[i] || layers[0];
      gsap.fromTo(
        layer,
        {
          y: -config.speed * 100,
          rotation: -(config.rotation || 0),
          scale: 1 + Math.abs(config.speed) * 0.05,
        },
        {
          y: config.speed * 100,
          rotation: config.rotation || 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ perspective: '1200px' }}>
      {children}
    </div>
  );
}

/* ─── CursorMagnetic2D — element follows cursor with 2D rotation ─── */
export function CursorMagnetic2D({
  children,
  strength = 0.4,
  rotationStrength = 0.08,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  rotationStrength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const el = ref.current;

    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      gsap.to(el, {
        x: deltaX * strength,
        y: deltaY * strength,
        rotationY: deltaX * rotationStrength,
        rotationX: -deltaY * rotationStrength,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    function handleMouseLeave() {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    }

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  });

  return (
    <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

/* ─── ScrollMorph — element transforms 2D on scroll (rotate + scale + translate) ─── */
export function ScrollMorph({
  children,
  className = '',
  from = { x: -100, y: 80, scale: 0.85, rotation: -8 },
  to = { x: 100, y: -80, scale: 1.05, rotation: 8 },
}: {
  children: ReactNode;
  className?: string;
  from?: { x: number; y: number; scale: number; rotation: number };
  to?: { x: number; y: number; scale: number; rotation: number };
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        x: from.x,
        y: from.y,
        scale: from.scale,
        rotation: from.rotation,
      },
      {
        x: to.x,
        y: to.y,
        scale: to.scale,
        rotation: to.rotation,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── DepthStack — overlapping layers that reveal on scroll ─── */
export function DepthStack({
  children,
  className = '',
  offset = 40,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.depth-item');
    const totalItems = items.length;

    items.forEach((item, i) => {
      const isLast = i === totalItems - 1;
      const progress = i / (totalItems - 1);

      gsap.fromTo(
        item,
        {
          y: offset * (totalItems - i),
          scale: 0.92 + progress * 0.08,
          opacity: 0.4 + progress * 0.6,
          rotation: (i % 2 === 0 ? -1 : 1) * 2,
        },
        {
          y: isLast ? 0 : offset * 0.5,
          scale: 1,
          opacity: 1,
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.5,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ perspective: '1000px' }}>
      {children}
    </div>
  );
}

/* ─── RevealOnScroll — clip-path reveal that follows scroll progress ─── */
export function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const clipFrom: Record<string, string> = {
      up: 'inset(100% 0 0 0)',
      down: 'inset(0 0 100% 0)',
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
      center: 'inset(50% 50% 50% 50%)',
    };

    gsap.fromTo(
      ref.current,
      { clipPath: clipFrom[direction] },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── TiltCard — 3D tilt effect on hover following cursor ─── */
export function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const el = ref.current;

    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (-mouseY / (rect.height / 2)) * maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      gsap.to(el, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: perspective,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    function handleMouseLeave() {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    }

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  });

  return (
    <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

/* ─── ScrollWarp — section warps/curves as you scroll through it ─── */
export function ScrollWarp({
  children,
  className = '',
  intensity = 20,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        borderRadius: `${intensity}px ${intensity}px 0 0`,
        y: intensity,
      },
      {
        borderRadius: `0 0 ${intensity}px ${intensity}px`,
        y: -intensity,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── ParallaxReveal — combines parallax with clip-path reveal ─── */
export function ParallaxReveal({
  children,
  className = '',
  parallaxY = -80,
  clipDirection = 'up' as 'up' | 'down' | 'left' | 'right',
}: {
  children: ReactNode;
  className?: string;
  parallaxY?: number;
  clipDirection?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const clipFrom: Record<string, string> = {
      up: 'inset(100% 0 0 0)',
      down: 'inset(0 0 100% 0)',
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
    };

    gsap.fromTo(
      ref.current,
      {
        y: parallaxY,
        clipPath: clipFrom[clipDirection],
      },
      {
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'top 30%',
          scrub: 1.5,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Ambient gradient blob — slow looping ambient motion ─── */
export function AmbientBlob({
  children,
  className = '',
  colorA = 'rgba(196,93,62,0.15)',
  colorB = 'rgba(122,139,111,0.12)',
  duration = 12,
}: {
  children?: ReactNode;
  className?: string;
  colorA?: string;
  colorB?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }

    gsap.to(ref.current, {
      backgroundPosition: '20% 50%',
      ease: 'none',
      duration,
      repeat: -1,
      yoyo: true,
      background: `radial-gradient(ellipse at 50% 50%, ${colorA} 0%, ${colorB} 40%, transparent 70%)`,
      backgroundSize: '200% 200%',
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      {children}
    </div>
  );
}

/* ─── Animated section heading — letter-by-letter reveal with wave/distortion ─── */
export function AnimatedHeading({
  text,
  className = '',
  splitType = 'word' as 'word' | 'letter',
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  splitType?: 'word' | 'letter';
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current.children, { opacity: 1, y: 0, rotation: 0 });
      return;
    }

    const items = ref.current.querySelectorAll('.anim-heading-part');

    gsap.from(items, {
      opacity: 0,
      y: 40,
      rotation: 6,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {splitType === 'letter'
        ? text.split('').map((char, i) => (
            <span
              key={i}
              className="anim-heading-part inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))
        : text.split(' ').map((word, i) => (
            <span
              key={i}
              className="anim-heading-part inline-block"
            >
              {word}
            </span>
          ))
      }
    </div>
  );
}

/* ─── Page load intro — logo/name reveal overlay that fades out ─── */
// Renders the same initial DOM on server and client so hydration matches.
// GSAP then fades it out and removes it from layout on the client.
export function PageLoadIntro({
  brand,
  className = '',
}: {
  brand: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    // Set the initial opacity exactly as the server would render it (visible).
    gsap.set(ref.current, { opacity: 1 });

    if (reducedMotion) {
      gsap.to(ref.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      return;
    }

    gsap.to(ref.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.6,
      onComplete: () => {
        if (ref.current) ref.current.style.display = 'none';
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--bg)] ${className}`}
      aria-hidden="true"
    >
      <span className="text-[clamp(2rem,8vw,6rem)] font-bold tracking-tight text-[var(--terracotta)]">
        {brand}
      </span>
    </div>
  );
}

/* ─── Footer end-credits fade — section fades/slides up like end-credits ─── */
export function FooterCredits({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <footer ref={ref} className={className}>
      {children}
    </footer>
  );
}

/* ─── Timeline section — SVG progress line draw + alternating slide-in entries ─── */
export function TimelineSection({
  items,
  className = '',
  lineColor = 'var(--terracotta)',
  entryColor = 'var(--terracotta)',
}: {
  items: { year: string; title: string; description: string; side?: 'left' | 'right' }[];
  className?: string;
  lineColor?: string;
  entryColor?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || !lineRef.current) return;

    if (reducedMotion) {
      gsap.set(lineRef.current, { strokeDashoffset: 0 });
      gsap.set(sectionRef.current.querySelectorAll('.timeline-entry'), { opacity: 1, y: 0, x: 0, rotation: 0 });
      return;
    }

    // SVG stroke draw
    const path = lineRef.current;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    // Alternating slide-in entries
    const entries = sectionRef.current.querySelectorAll('.timeline-entry');
    entries.forEach((entry, i) => {
      const side = (entry as HTMLElement).dataset.side === 'left' ? -1 : 1;
      gsap.from(entry, {
        opacity: 0,
        x: side * 60,
        rotation: side * 3,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* SVG progress line — full-height vertical line on the left */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={lineRef}
              d="M2 0 V 100"
              className="timeline-line"
              style={{
                stroke: lineColor,
                strokeWidth: 3,
                strokeLinecap: 'round',
                opacity: 0.4,
              }}
            />
          </svg>
        </div>

        {/* Timeline entries */}
        <div className="space-y-16">
          {items.map((item, i) => (
            <div
              key={i}
              className={`timeline-entry relative pl-20 pr-12 ${item.side === 'left' ? 'md:pl-0 md:pr-12 md:text-right md:text-right' : 'md:pl-16 md:pr-0'}`}
              data-side={item.side ?? 'right'}
            >
              {/* Dot on the line */}
              <div className="absolute left-5 md:left-auto md:right-0 top-1 w-3 h-3 rounded-full bg-[var(--terracotta)] border-2 border-[var(--bg)] shadow-md z-10" />

              <span className="text-xs font-mono text-[var(--cream-dim)] mb-2 block tracking-widest">{item.year}</span>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--cream-dim)] leading-relaxed max-w-[38ch]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Card mask reveal + Ken Burns zoom on scroll ─── */
export function CardReveal({
  children,
  className = '',
  direction = 'left',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current) return;

    const clipFrom: Record<string, string> = {
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
      up: 'inset(100% 0 0 0)',
      down: 'inset(0 0 100% 0)',
    };

    if (reducedMotion) {
      gsap.set(ref.current, { clipPath: 'inset(0 0% 0 0%)' });
      if (ref.current.querySelector('img')) {
        gsap.set(ref.current.querySelector('img') as HTMLElement, { scale: 1 });
      }
      return;
    }

    // Mask reveal
    gsap.fromTo(
      ref.current,
      { clipPath: clipFrom[direction] },
      {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Ken Burns: subtle scale-down on scroll (zoom out as it settles)
    const img = ref.current.querySelector('img');
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Horizontal scroll-jacking reel — vertical scroll → horizontal card movement ─── */
export function HorizontalScrollReel({
  children,
  className = '',
  cardGap = 24,
  pinPadding = 120,
  minCardWidth = 340,
}: {
  children: ReactNode;
  className?: string;
  cardGap?: number;
  pinPadding?: number;
  minCardWidth?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const snappedRef = useRef(false);
  const readyRef = useRef(false);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;
    const container = containerRef.current;
    const track = trackRef.current;

    const measure = () => {
      if (!container || !track) return 0;
      return Math.max(0, track.scrollWidth - container.offsetWidth);
    };

    if (reducedMotion) {
      gsap.set(track, { x: 0 });
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (track) {
            track.style.transform = `translateX(${self.progress * measure()}px)`;
          }
        },
      });
      return;
    }

    const hideHint = () => {
      if (hintRef.current) {
        gsap.to(hintRef.current, { opacity: 0, visibility: 'hidden', duration: 0.2, ease: 'power2.out' });
      }
    };


    let snapTimer: GSAPTween | null = null;
    const scheduleSnap = () => {
      if (snapTimer) snapTimer.kill();
      snapTimer = gsap.delayedCall(280, () => {
        snapTimer = null;
        if (snappedRef.current || !readyRef.current) return;
        const st = ScrollTrigger.getById('hsr-reel');
        if (!st || !track) return;
        const currentX = gsap.getProperty(track, 'x') as number;
        const cw = container.offsetWidth;
        const cardEls = Array.from(track.children) as HTMLElement[];
        let nearestX = currentX;
        let nearestDist = Infinity;
        for (const card of cardEls) {
          const targetX = cw / 2 - card.offsetLeft - card.offsetWidth / 2;
          const dist = Math.abs(currentX - targetX);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestX = targetX;
          }
        }
        if (nearestDist > 20) {
          const hd = measure();
          const minX = -hd;
          const maxX = 0;
          const clamped = Math.max(minX, Math.min(maxX, nearestX));
          const targetY = st.start - clamped;
          const lenis = getLenis();
          if (lenis) {
            snappedRef.current = true;
            gsap.delayedCall(800, () => { snappedRef.current = false; });
            lenis.scrollTo(targetY, { duration: 0.4, easing: gsap.parseEase('power3.out') });
          }
        }
      });
    };

    let scrubTween: GSAPTween | null = null;
    let reelST = null as any;

    const createReel = () => {
      const hd = measure();
      if (scrubTween) scrubTween.kill();
      if (reelST && typeof reelST.kill === 'function') reelST.kill();
      reelST = ScrollTrigger.create({
        id: 'hsr-reel',
        trigger: container,
        start: 'top top',
        end: () => `+=${hd}`,
        scrub: 0.5,
        onUpdate: () => {
          if (reelST && reelST.progress > 0.06) hideHint();
          readyRef.current = true;
          scheduleSnap();
        },
        onLeave: () => { if (snapTimer) snapTimer.kill(); },
        onLeaveBack: () => { if (snapTimer) snapTimer.kill(); },
      });
      scrubTween = gsap.to(track, {
        x: -hd,
        ease: 'none',
        scrollTrigger: reelST,
      });
    };

    createReel();

    let resizeTimer: GSAPTween | null = null;
    const onResize = () => {
      if (resizeTimer) resizeTimer.kill();
      resizeTimer = gsap.delayedCall(150, () => {
        resizeTimer = null;
        createReel();
      }) as unknown as GSAPTween;
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeTimer) resizeTimer.kill();
      if (snapTimer) snapTimer.kill();
      if (scrubTween) scrubTween.kill();
      if (reelST && typeof reelST.kill === 'function') reelST.kill();
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={clsx('relative overflow-hidden h-full min-h-[420px]', className)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none z-10" />

      <div
        ref={trackRef}
        className="flex gap-6 w-max will-change-transform"
        style={{ contain: 'layout style paint' }}
      >
        {children}
      </div>

      <div
        ref={hintRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-xs font-medium text-[var(--cream-dim)] tracking-widest uppercase flex items-center gap-2 hidden md:flex"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        Scroll to explore
      </div>
    </div>
  );
}

/* ─── CursorTrail — custom cursor that trails behind with delay ─── */
export function CursorTrail({
  className = '',
  size = 12,
  color = 'var(--terracotta)',
  delay = 0.15,
}: {
  className?: string;
  size?: number;
  color?: string;
  delay?: number;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useGSAP(() => {
    if (!dotRef.current || mountedRef.current) return;
    mountedRef.current = true;
    const dot = dotRef.current;

    // Hide on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      dot.style.display = 'none';
      return;
    }

    // Use gsap.quickTo for high-frequency mousemove — avoids creating new tweens per event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const xTo = (gsap.quickTo as any)(dot, 'x', { duration: delay, ease: 'power2.out' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yTo = (gsap.quickTo as any)(dot, 'y', { duration: delay, ease: 'power2.out' });

    function handleMouseMove(e: MouseEvent) {
      xTo(e.clientX - size / 2);
      yTo(e.clientY - size / 2);
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  });

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        willChange: 'transform',
      }}
    />
  );
}
