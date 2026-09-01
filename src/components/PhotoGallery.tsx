'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.src}
            className={`relative overflow-hidden rounded-xl cursor-pointer group ${photo.span}`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelected(photo.src)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs text-white/80">{photo.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selected}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
