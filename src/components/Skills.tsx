'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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

    // Animate each skill bar on scroll
    const bars = gridRef.current.querySelectorAll('.skill-bar-fill');
    bars.forEach((bar) => {
      const width = bar.getAttribute('data-width');
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${width}%`,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Animate skill names
    const names = gridRef.current.querySelectorAll('.skill-name');
    gsap.from(names, {
      opacity: 0,
      x: -20,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.05,
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
        <div className="flex items-baseline gap-6 mb-16">
          <span className="font-serif italic text-[var(--terracotta)] text-lg">🛠️</span>
          <h2 className="text-sm font-semibold tracking-widest uppercase">Tech Stack & Skills</h2>
        </div>

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
                <h3 className="text-sm font-semibold tracking-widest uppercase text-[var(--cream-dim)]">
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    {/* Label row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{skill.icon}</span>
                        <span className="skill-name text-sm font-medium text-[var(--cream)]">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[var(--cream-dim)]">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Bar */}
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full rounded-full transition-all duration-300 group-hover:brightness-110"
                        data-width={skill.level}
                        style={{
                          width: '0%',
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
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
