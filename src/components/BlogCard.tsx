'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { BlogPost } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.7,
      ease: 'power3.out',
      delay: index * 0.1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: cardRef });

  const categoryColors: Record<string, string> = {
    Fintech: 'bg-[var(--terracotta)]/10 text-[var(--terracotta)] border-[var(--terracotta)]/20',
    AI: 'bg-[var(--sage)]/10 text-[var(--sage)] border-[var(--sage)]/20',
    Automation: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Backend: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <article
      ref={cardRef}
      className="group relative bg-[var(--surface)] border border-white/6 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[post.category] || 'bg-white/10 text-[var(--cream)] border-white/10'}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-[var(--cream-dim)]">{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--cream-dim)]/30" />
          <span className="text-xs text-[var(--cream-dim)]">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-[var(--terracotta)] transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[var(--cream-dim)] leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] font-medium px-2 py-0.5 rounded-md bg-white/5 text-[var(--cream-dim)] border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--terracotta)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Read more
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </article>
  );
}
