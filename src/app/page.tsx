'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { defaultData } from '@/lib/data';
import { loadData } from '@/lib/store';
import {
  HeroAnimations,
  ParallaxHero,
  ScrollRevealSection,
  ProjectCardsAnimation,
  ServicesAnimation,
  StatsAnimation,
  ContactAnimation,
  useSmoothScroll,
} from '@/components/ScrollAnimations';

const HeroCanvas = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--bg)] via-[var(--bg-warm)] to-[var(--bg)]" />,
});

export default function Home() {
  useSmoothScroll();
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    loadData().then(setData);
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero with 3D Scene */}
        <section className="min-h-screen flex items-center pt-32 pb-16 relative overflow-hidden">
          <HeroCanvas />
          <ParallaxHero />
          <div className="parallax-orb-1 absolute -top-[30%] -right-[15%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(196,93,62,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="parallax-orb-2 absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(122,139,111,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8 relative z-10 w-full">
            <HeroAnimations />
            <span className="hero-tag inline-block text-xs font-medium tracking-[0.15em] uppercase text-[var(--terracotta)] px-4 py-1.5 border border-[var(--terracotta)]/30 rounded-full w-fit backdrop-blur-sm bg-[var(--bg)]/50">{data.hero.tag}</span>
            <h1 className="hero-lines font-bold leading-[0.95] tracking-tight">
              <span className="hero-line-1 block text-[clamp(3rem,9vw,7.5rem)]">{data.hero.titleLine1}</span>
              <span className="hero-line-2 block text-[clamp(3rem,9vw,7.5rem)] pl-[clamp(2rem,8vw,8rem)]"><em className="serif-accent">{data.hero.titleLine2}</em></span>
              <span className="hero-line-3 block text-[clamp(3rem,9vw,7.5rem)]">{data.hero.titleLine3}</span>
            </h1>
            <div className="hero-bottom flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-4">
              <p className="hero-desc max-w-[38ch] text-lg text-[var(--cream-dim)] leading-relaxed backdrop-blur-sm bg-[var(--bg)]/30 rounded-lg p-3 -m-3">{data.hero.description}</p>
              <div className="hero-actions flex gap-4 shrink-0">
                <a href="#projects" className="px-7 py-3.5 bg-[var(--terracotta)] text-[var(--white)] font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_rgba(196,93,62,0.25)] backdrop-blur-sm">View Projects</a>
                <a href="#contact" className="px-7 py-3.5 border border-white/20 rounded-lg hover:border-[var(--cream)] hover:bg-white/5 transition backdrop-blur-sm">Let&apos;s Talk</a>
              </div>
            </div>
            <div className="hero-scroll hidden md:block mt-8"><span className="scroll-line" /></div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-40 border-t border-white/6">
          <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-[160px_1fr] gap-16">
            <ScrollRevealSection>
              <span className="font-serif italic text-[var(--terracotta)] text-lg block">01</span>
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--cream-dim)] mt-2 block">About</span>
            </ScrollRevealSection>
            <div>
              <ScrollRevealSection delay={0.1}>
                <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tight mb-8">
                  A designer who thinks in <em className="serif-accent">systems</em>, not just screens.
                </h2>
              </ScrollRevealSection>
              <ScrollRevealSection delay={0.2}>
                <p className="text-lg text-[var(--cream-dim)] leading-[1.8] max-w-[58ch] mb-16">{data.about.text}</p>
              </ScrollRevealSection>
              <StatsAnimation>
                <div className="flex gap-16">
                  {data.about.stats.map((s) => (
                    <div key={s.label} className="stat-item flex flex-col">
                      <span className="font-serif italic text-[2.5rem] text-[var(--terracotta)] leading-none">{s.number}</span>
                      <span className="text-xs font-medium text-[var(--cream-dim)] mt-2 uppercase tracking-widest">{s.label}</span>
                    </div>
                  ))}
                </div>
              </StatsAnimation>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 pb-40 bg-[var(--bg-warm)] border-y border-white/6">
          <div className="max-w-[1200px] mx-auto px-6">
            <ScrollRevealSection>
              <div className="flex items-baseline gap-6 mb-16">
                <span className="font-serif italic text-[var(--terracotta)] text-lg">02</span>
                <h2 className="text-sm font-semibold tracking-widest uppercase">Services</h2>
              </div>
            </ScrollRevealSection>
            <ServicesAnimation>
              <div className="flex flex-col">
                {data.services.map((s, i) => (
                  <div key={s.title} className="service-item grid grid-cols-[80px_1fr_60px] items-center gap-8 py-8 border-t border-white/8 hover:bg-white/[0.02] transition group">
                    <span className="font-serif italic text-2xl text-[var(--terracotta)]">0{i + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
                      <p className="text-[var(--cream-dim)] text-sm max-w-[52ch]">{s.description}</p>
                    </div>
                    <span className="text-2xl text-[var(--cream-dim)] group-hover:text-[var(--terracotta)] group-hover:translate-x-1.5 transition-all">→</span>
                  </div>
                ))}
              </div>
            </ServicesAnimation>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-40">
          <div className="max-w-[1200px] mx-auto px-6">
            <ScrollRevealSection>
              <div className="flex items-baseline gap-6 mb-16">
                <span className="font-serif italic text-[var(--terracotta)] text-lg">03</span>
                <h2 className="text-sm font-semibold tracking-widest uppercase">Selected Work</h2>
              </div>
            </ScrollRevealSection>
            <ProjectCardsAnimation>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.projects.map((p) => (
                  <div key={p.id} className={`project-card-item ${p.featured ? 'md:col-span-3' : ''}`}>
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            </ProjectCardsAnimation>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-40 border-t border-white/6">
          <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-24 items-start">
            <ContactAnimation>
              <div>
                <span className="font-serif italic text-[var(--terracotta)] text-lg block mb-8">04</span>
                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-tight">
                  Let&apos;s create something<br /><em className="serif-accent">extraordinary</em>
                </h2>
              </div>
            </ContactAnimation>
            <ContactAnimation>
              <div>
                <p className="text-lg text-[var(--cream-dim)] max-w-[40ch] mb-8 leading-relaxed">Have a project in mind or just want to say hello? I&apos;m always open to new ideas and collaborations.</p>
                <a href={`mailto:${data.contact.email}`} className="inline-flex px-9 py-4 bg-[var(--terracotta)] text-[var(--white)] font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_rgba(196,93,62,0.25)] text-lg">Get in touch</a>
                <div className="flex gap-6 mt-8">
                  <a href={data.contact.github} target="_blank" rel="noopener" className="text-sm font-medium text-[var(--cream-dim)] underline underline-offset-4 hover:text-[var(--terracotta)] transition">GitHub</a>
                  <a href={data.contact.instagram} target="_blank" rel="noopener" className="text-sm font-medium text-[var(--cream-dim)] underline underline-offset-4 hover:text-[var(--terracotta)] transition">Instagram</a>
                </div>
              </div>
            </ContactAnimation>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
