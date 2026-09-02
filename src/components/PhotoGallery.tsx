'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Flip, Draggable);

const photos = [
  { src: '/images/1001028563.jpg', alt: 'Portrait', span: 'md:row-span-2' },
  { src: '/images/1G4A4069.jpg', alt: 'At work', span: '' },
  { src: '/images/1G4A4070.jpg', alt: 'Coding session', span: '' },
  { src: '/images/4N0A9807.JPG', alt: 'Creative moment', span: 'md:row-span-2' },
  { src: '/images/1001028575.jpg', alt: 'Professional', span: '' },
  { src: '/images/1001028579.jpg', alt: 'Design thinking', span: '' },
  { src: '/images/4N0A9745.JPG', alt: 'Deep focus', span: '' },
  { src: '/images/4N0A9747.JPG', alt: 'Collaboration', span: 'md:row-span-2' },
  { src: '/images/4N0A9519.JPG', alt: 'Exploring ideas', span: '' },
  { src: '/images/4N0A9548.JPG', alt: 'Building something', span: '' },
  { src: '/images/4N0A9359.JPG', alt: 'Presenting work', span: '' },
  { src: '/images/4N0A9385.JPG', alt: 'Problem solving', span: '' },
  { src: '/images/4N0A9732.JPG', alt: 'In the zone', span: '' },
  { src: '/images/4N0A9733.JPG', alt: 'Getting it done', span: 'md:row-span-2' },
  { src: '/images/d2.jpg', alt: 'Headshot', span: '' },
];

export default function PhotoGallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Draggable gallery items
  useGSAP(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.gallery-item');
    const draggables: Draggable[] = [];

    items.forEach((item, i) => {
      // Slight random rotation for visual interest
      const rotation = ((i % 5) - 2) * 0.8;
      gsap.set(item, { rotation });

      const drag = Draggable.create(item, {
        type: 'x,y',
        edgeResistance: 0.5,
        bounds: gridRef.current,
        onDrag: function () {
          gsap.to(item, {
            rotation: (this.getDirection() === 'left' ? -1 : 1) * 3,
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out',
          });
        },
        onDragEnd: function () {
          gsap.to(item, {
            x: 0,
            y: 0,
            rotation,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          });
        },
      })[0];

      draggables.push(drag);
    });

    // Staggered entrance
    gsap.from(items, {
      opacity: 0,
      y: 40,
      rotation: 0,
      scale: 0.9,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.06,
    });

    return () => {
      draggables.forEach((d) => d.kill());
    };
  }, { scope: gridRef });

  // Lightbox Flip animation
  const openLightbox = (src: string, e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const state = Flip.getState(target);

    setSelected(src);

    // Animate from grid position to center
    requestAnimationFrame(() => {
      if (!lightboxRef.current) return;
      Flip.from(state, {
        target: lightboxRef.current.querySelector('.lightbox-img') as Element,
        duration: 0.6,
        ease: 'power3.inOut',
        absolute: true,
      });
    });
  };

  const closeLightbox = () => {
    setSelected(null);
  };

  return (
    <>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className={`gallery-item relative overflow-hidden rounded-xl cursor-grab active:cursor-grabbing group ${photo.span}`}
            onClick={(e) => openLightbox(photo.src, e)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-xs text-white/80">{photo.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <img
            className="lightbox-img max-w-full max-h-[90vh] object-contain rounded-lg"
            src={selected}
            alt="Full size"
          />
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
            onClick={closeLightbox}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
