'use client';

const scenes = [
  { src: '/images/4N0A9732.JPG', caption: 'Late night coding sessions', rotate: -3 },
  { src: '/images/1G4A4069.jpg', caption: 'Collaborating with the team', rotate: 2 },
  { src: '/images/4N0A9733.JPG', caption: 'Building something new', rotate: -1 },
  { src: '/images/4N0A9807.JPG', caption: 'Design thinking in action', rotate: 3 },
];

export default function BehindTheScenes() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {scenes.map((scene) => (
        <div
          key={scene.src}
          className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:rotate-0"
          style={{ transform: `rotate(${scene.rotate}deg)` }}
        >
          <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg border-2 border-white/10 group-hover:border-[var(--terracotta)]/30 transition-colors">
            <img
              src={scene.src}
              alt={scene.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-2 left-2 right-2 bg-[var(--surface)] rounded-lg px-3 py-1.5 text-center shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <p className="text-xs text-[var(--cream-dim)]">{scene.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
