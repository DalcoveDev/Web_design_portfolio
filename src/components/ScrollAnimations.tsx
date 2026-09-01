'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Hero text reveal animation
export function HeroAnimations() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.from('.hero-tag', { opacity: 0, y: 30, duration: 0.8 })
      .from('.hero-line-1', { opacity: 0, y: 60, duration: 0.9 }, '-=0.4')
      .from('.hero-line-2', { opacity: 0, x: -80, duration: 1 }, '-=0.6')
      .from('.hero-line-3', { opacity: 0, y: 60, duration: 0.9 }, '-=0.6')
      .from('.hero-desc', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
      .from('.hero-actions', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('.hero-scroll', { opacity: 0, scaleY: 0, transformOrigin: 'top', duration: 0.8 }, '-=0.2');
  }, { scope: container });

  return <div ref={container} />;
}

// Parallax hero backgrounds
export function ParallaxHero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    gsap.to('.parallax-orb-1', {
      y: -150,
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    });

    gsap.to('.parallax-orb-2', {
      y: -100,
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      }
    });
  }, { scope: container });

  return <div ref={container} />;
}

// Section scroll reveals
export function ScrollRevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
      }
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Project cards stagger animation
export function ProjectCardsAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from('.project-card-item', {
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
      }
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

// Services slide-in animation
export function ServicesAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from('.service-item', {
      opacity: 0,
      x: -60,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

// Stats counter animation
export function StatsAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from('.stat-item', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

// Contact section reveal
export function ContactAnimation({ children }: { children: React.ReactNode }) {
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
      }
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}

// Smooth scroll hook
export function useSmoothScroll() {
  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
