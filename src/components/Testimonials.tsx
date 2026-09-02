'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { defaultData } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.testimonial-card');

    // Staggered card reveal
    gsap.from(cards, {
      opacity: 0,
      y: 80,
      rotateX: 8,
      scale: 0.95,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Quote mark animation
    const quotes = cardsRef.current.querySelectorAll('.quote-mark');
    gsap.from(quotes, {
      opacity: 0,
      scale: 0,
      duration: 0.6,
      ease: 'back.out(2)',
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Horizontal line grow
    const line = sectionRef.current?.querySelector('.testimonial-line');
    if (line) {
      gsap.from(line, {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-40 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline gap-6 mb-4">
          <span className="font-serif italic text-[var(--terracotta)] text-lg">💬</span>
          <h2 className="text-sm font-semibold tracking-widest uppercase">What People Say</h2>
        </div>
        <div className="testimonial-line h-px bg-gradient-to-r from-[var(--terracotta)]/40 via-[var(--terracotta)]/10 to-transparent mb-16 w-full" />

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {defaultData.testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card group relative bg-[var(--surface)] border border-white/6 rounded-2xl p-8 hover:border-[var(--terracotta)]/20 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Quote mark */}
              <div className="quote-mark absolute -top-4 left-6 text-5xl font-serif text-[var(--terracotta)]/30 leading-none select-none">
                &ldquo;
              </div>

              {/* Quote text */}
              <p className="text-[var(--cream-dim)] leading-relaxed mb-8 mt-2 text-sm">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/6">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[var(--terracotta)]/20 group-hover:border-[var(--terracotta)]/40 transition-colors">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--cream)]">{t.name}</p>
                  <p className="text-xs text-[var(--cream-dim)]">{t.role}</p>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--terracotta)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
