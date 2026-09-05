// Hero section animations
export function initHero() {
  // Hero text reveal on scroll
  const heroText = document.querySelector('.hero-text');
  if (!heroText) return;
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroText,
      start: 'top 80%',
      scrub: 1,
    }
  });
  
  tl.from(heroText, {
    opacity: 0,
    y: 40,
    duration: 1,
  });
  
  // Parallax orbs on mousemove
  const orbs = document.querySelectorAll('.parallax-orb');
  if (orbs.length) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const maxMove = 20;
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.5;
        orb.style.transform = `translate(${ (clientX - window.innerWidth / 2) / 10 * speed }px, ${ (clientY - window.innerHeight / 2) / 10 * speed }px)`;
      });
    });
  }
  
  // Reduced motion fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.to(heroText, { opacity: 1, y: 0, duration: 0.5 });
  }
}