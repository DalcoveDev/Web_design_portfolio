'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

// ─── Infinite horizontal skill marquee (pause on hover) ───
interface SkillMarqueeProps {
  skills: string[];
  speed?: number;
  className?: string;
}

function SkillMarquee({ skills, speed = 0.4, className = '' }: SkillMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    // Duplicate for seamless loop
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth / 2 - window.innerWidth),
      duration: 40 / speed,
      ease: 'none',
      repeat: -1,
    });

    const container = containerRef.current;
    const onEnter = () => tween.pause();
    const onLeave = () => tween.resume();
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      tween.kill();
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative overflow-hidden py-6 border-y border-white/6',
        'before:absolute before:left-0 before:right-0 before:top-0 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:content-[""]',
        className
      )}
    >
      <div ref={trackRef} className="flex gap-16 whitespace-nowrap will-change-transform">
        {skills.map((skill, i) => (
          <span
            key={i}
            className={clsx(
              'inline-block text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-tight',
              'text-[var(--cream)]/8',
              i % 2 === 0 ? 'text-[var(--terracotta)]/10' : 'text-[var(--sage)]/10'
            )}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

const skillData: SkillCategory[] = [
  {
    title: 'Languages',
    color: 'var(--terracotta)',
    skills: [
      { name: 'Python', level: 90, icon: '🐍' },
      { name: 'TypeScript', level: 85, icon: '📘' },
      { name: 'JavaScript', level: 88, icon: '⚡' },
      { name: 'SQL', level: 80, icon: '🗄️' },
    ],
  },
  {
    title: 'Frontend',
    color: 'var(--sage)',
    skills: [
      { name: 'React / Next.js', level: 85, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 90, icon: '🎨' },
      { name: 'HTML / CSS', level: 92, icon: '🌐' },
      { name: 'GSAP / Animations', level: 75, icon: '✨' },
    ],
  },
  {
    title: 'Backend & AI',
    color: '#d4a574',
    skills: [
      { name: 'FastAPI', level: 85, icon: '🚀' },
      { name: 'NestJS', level: 78, icon: '🏗️' },
      { name: 'PostgreSQL', level: 82, icon: '🐘' },
      { name: 'AI / ML Integration', level: 76, icon: '🤖' },
    ],
  },
  {
    title: 'Tools & Cloud',
    color: '#8b9dc3',
    skills: [
      { name: 'Git / GitHub', level: 88, icon: '📦' },
      { name: 'n8n / Automation', level: 80, icon: '⚙️' },
      { name: 'Lightning Network', level: 70, icon: '⚡' },
      { name: 'Linux / CLI', level: 82, icon: '🐧' },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;

    const categories = gridRef.current.querySelectorAll('.skill-category');

    // Category cards slide in
    gsap.from(categories, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate each skill bar fill on scroll (width growth)
    const bars = gridRef.current.querySelectorAll('.skill-bar-fill');
    bars.forEach((bar) => {
      const width = bar.getAttribute('data-width');
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.0,
          ease: 'back.out(1.4)',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: bar,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Skill name + icon: spring pop-in (staggered, slight rotation settle)
    const skillItem = gridRef.current.querySelectorAll('.skill-item');
    gsap.from(skillItem, {
      opacity: 0,
      scale: 0.92,
      rotation: -8,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: 0.09,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    });

    // Category title: slide in from left
    const catTitles = gridRef.current.querySelectorAll('.skill-category-title');
    gsap.from(catTitles, {
      opacity: 0,
      x: -30,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--bg-warm)] border-y border-white/6">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline gap-6 mb-12">
          <span className="font-serif italic text-[var(--terracotta)] text-lg">🛠️</span>
          <h2 className="text-sm font-semibold tracking-widest uppercase">Tech Stack & Skills</h2>
        </div>

        {/* Infinite skill marquee — pause on hover */}
        <SkillMarquee
          skills={[
            'PYTHON',
            'TYPESCRIPT',
            'REACT',
            'NEXT.JS',
            'FASTAPI',
            'POSTGRESQL',
            'NESTJS',
            'AI/ML',
            'BLOCKCHAIN',
            'GIT',
            'TAILWIND',
            'GSAP',
            'PYTHON',
            'TYPESCRIPT',
            'REACT',
            'NEXT.JS',
            'FASTAPI',
            'POSTGRESQL',
            'NESTJS',
            'AI/ML',
            'BLOCKCHAIN',
            'GIT',
            'TAILWIND',
            'GSAP',
          ]}
          speed={0.35}
          className="mb-16"
        />

        {/* Skills grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillData.map((category) => (
            <div
              key={category.title}
              className="skill-category bg-[var(--surface)] border border-white/6 rounded-2xl p-6 hover:border-white/10 transition-colors"
            >
              {/* Category title */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="skill-category-title text-sm font-semibold tracking-widest uppercase text-[var(--cream-dim)]">
                  {category.title}
                </h3>
              </div>

              {/* Skills list — spring pop-in items */}
              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item group">
                    {/* Label row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{skill.icon}</span>
                        <span className="skill-name text-sm font-medium text-[var(--cream)]">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[var(--cream-dim)] skill-level">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Bar — width growth animation */}
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full rounded-full group-hover:brightness-110"
                        data-width={skill.level}
                        style={{
                          width: '100%',
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
                          transformOrigin: 'left center',
                          willChange: 'transform',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
