'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';gsap.registerPlugin(ScrollTrigger, Flip, Draggable);

/* ─── Hero text reveal animation ─── */
export function HeroAnimations({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

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

    if (tag) tl.from(tag, { opacity: 0, y: 30, duration: 0.8 });
    if (line1) tl.from(line1, { opacity: 0, y: 60, duration: 0.9 }, '-=0.4');
    if (line2) tl.from(line2, { opacity: 0, x: -80, duration: 1 }, '-=0.6');
    if (line3) tl.from(line3, { opacity: 0, y: 60, duration: 0.9 }, '-=0.6');
    if (desc) tl.from(desc, { opacity: 0, y: 30, duration: 0.8 }, '-=0.4');
    if (actions) tl.from(actions, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3');
    if (scroll) tl.from(scroll, { opacity: 0, scaleY: 0, transformOrigin: 'top', duration: 0.8 }, '-=0.2');
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}

/* ─── Parallax hero backgrounds ─── */
export function ParallaxHero({ children }: { children?: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const orbs1 = container.current.querySelectorAll('.parallax-orb-1');
    const orbs2 = container.current.querySelectorAll('.parallax-orb-2');

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
  }, { scope: container });

  return <div ref={container}>{children}</div>;
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
      y: 60,
      scale: 0.95,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
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
      x: -60,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
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
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.15,
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
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

/* ─── Smooth scroll setup ─── */
export function useSmoothScroll() {
  useGSAP(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

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
        <span key={i} className="reveal-word inline-block mr-[0.3em]">
          {word}
        </span>
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
    if (!ref.current) return;
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
