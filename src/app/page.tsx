'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import PhotoGallery from '@/components/PhotoGallery';
import ImageStrip from '@/components/ImageStrip';
import HeroBackground from '@/components/HeroBackground';
import BehindTheScenes from '@/components/BehindTheScenes';
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
          <HeroBackground />
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

        {/* Image Strip */}
        <ImageStrip />

        {/* About */}
        <section id="about" className="py-40 border-t border-white/6">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-[160px_1fr_300px] gap-12 items-start">
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
                  <p className="text-lg text-[var(--cream-dim)] leading-[1.8] max-w-[58ch] mb-8">{data.about.text}</p>
                </ScrollRevealSection>
                <ScrollRevealSection delay={0.3}>
                  <a href={data.cv} download className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--surface)] border border-white/10 rounded-lg text-sm font-medium text-[var(--cream)] hover:bg-white/5 hover:border-[var(--terracotta)]/30 transition mb-12">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download CV
                  </a>
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
              {/* Profile Photo */}
              <ScrollRevealSection delay={0.4}>
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[var(--terracotta)]/20 to-[var(--sage)]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={data.profileImage}
                    alt="Dalcove — Web Designer"
                    className="relative w-full aspect-[3/4] object-cover rounded-xl border border-white/10 group-hover:border-[var(--terracotta)]/30 transition-all duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[var(--bg)]/80 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <p className="text-xs font-medium text-[var(--cream)]">Ingabire Dalcove</p>
                    <p className="text-xs text-[var(--cream-dim)]">Web Designer & Frontend Developer</p>
                  </div>
                </div>
              </ScrollRevealSection>
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

        {/* Behind the Scenes */}
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <ScrollRevealSection>
              <div className="flex items-baseline gap-6 mb-12">
                <span className="font-serif italic text-[var(--terracotta)] text-lg">🎬</span>
                <h2 className="text-sm font-semibold tracking-widest uppercase">Behind the Scenes</h2>
              </div>
            </ScrollRevealSection>
            <ScrollRevealSection delay={0.1}>
              <BehindTheScenes />
            </ScrollRevealSection>
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

        {/* Photo Gallery */}
        <section className="py-24 bg-[var(--bg-warm)] border-y border-white/6">
          <div className="max-w-[1200px] mx-auto px-6">
            <ScrollRevealSection>
              <div className="flex items-baseline gap-6 mb-12">
                <span className="font-serif italic text-[var(--terracotta)] text-lg">📸</span>
                <h2 className="text-sm font-semibold tracking-widest uppercase">Gallery</h2>
              </div>
            </ScrollRevealSection>
            <ScrollRevealSection delay={0.1}>
              <PhotoGallery />
            </ScrollRevealSection>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-40 border-t border-white/6">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <ContactAnimation>
                <div>
                  <span className="font-serif italic text-[var(--terracotta)] text-lg block mb-8">04</span>
                  <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-tight mb-6">
                    Let&apos;s create something<br /><em className="serif-accent">extraordinary</em>
                  </h2>
                  <p className="text-lg text-[var(--cream-dim)] max-w-[40ch] leading-relaxed mb-8">Have a project in mind or just want to say hello? I&apos;m always open to new ideas and collaborations.</p>
                  <div className="flex gap-6">
                    <a href={data.contact.github} target="_blank" rel="noopener" className="flex items-center gap-2 text-sm font-medium text-[var(--cream-dim)] hover:text-[var(--terracotta)] transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </a>
                    <a href={data.contact.instagram} target="_blank" rel="noopener" className="flex items-center gap-2 text-sm font-medium text-[var(--cream-dim)] hover:text-[var(--terracotta)] transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </ContactAnimation>
              <ContactAnimation>
                <ContactForm />
              </ContactAnimation>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
