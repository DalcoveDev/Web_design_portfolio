'use client';

import { motion } from 'framer-motion';

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
  return (
    <div className="py-12 overflow-hidden border-y border-white/6 bg-[var(--bg)]">
      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
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
      </motion.div>
    </div>
  );
}
