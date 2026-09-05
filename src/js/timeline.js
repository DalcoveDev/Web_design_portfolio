// Timeline section animations
export function initTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;
  
  timelineItems.forEach((item, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineItems[i],
        start: 'top 80%',
        delay: i * 0.2,
        scrub: 1,
      }
    });
    
    tl.from(timelineItems[i], {
      opacity: 0,
      x: i % 2 === 0 ? -30 : 30,
      duration: 0.6,
    });
  });
  
  // Reduced motion fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from('.timeline-item', { opacity: 1, duration: 0.3, stagger: 0.1 });
  }
}