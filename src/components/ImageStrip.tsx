'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  '/images/4N0A9359.JPG',
  '/images/1001028563.jpg',
  '/images/4N0A9548.JPG',
  '/images/1G4A4069.jpg',
  '/images/4N0A9732.JPG',
  '/images/1001028575.jpg',
  '/images/4N0A9385.JPG',
  '/images/1001028579.jpg',
  '/images/4N0A9807.JPG',
  '/images/1G4A4070.jpg',
];

export default function ImageStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    // Duplicate items for seamless loop
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));

    const totalWidth = track.scrollWidth;
    const tween = gsap.to(track, {
      x: -totalWidth / 2,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });

    // Pause only this tween when scrolled out of viewport, resume when visible
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => tween.play(),
      onLeave: () => tween.pause(),
      onEnterBack: () => tween.play(),
      onLeaveBack: () => tween.pause(),
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-12 overflow-hidden border-y border-white/6 bg-[var(--bg)]">
      <div ref={trackRef} className="flex gap-4">
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[280px] h-[180px] rounded-xl overflow-hidden group"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
