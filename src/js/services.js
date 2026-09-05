// Services section animations
export function initServices() {
  const serviceCards = document.querySelectorAll('.service-card');
  if (!serviceCards.length) return;
  
  serviceCards.forEach((card, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        scrub: 1,
      }
    });
    
    tl.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
    });
  });
  
  // Hover effect
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -10, duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3 });
    });
  });
  
  // Reduced motion fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from(serviceCards, { opacity: 1, duration: 0.3 });
  }
}