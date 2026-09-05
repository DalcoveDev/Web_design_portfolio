// About section animations
export function initAbout() {
  // Staggered text reveal
  const aboutText = document.querySelector('.about-text');
  if (!aboutText) return;
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutText,
      start: 'top 80%',
      scrub: 1,
    }
  });
  
  tl.from(aboutText, {
    opacity: 0,
    y: 30,
    duration: 0.8,
  });
  
  // Reduced motion fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.to(aboutText, { opacity: 1, duration: 0.5 });
  }
}