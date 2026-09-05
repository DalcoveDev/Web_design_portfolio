// Projects section animations
export function initProjects() {
  const projectCards = document.querySelectorAll('.project-card');
  if (!projectCards.length) return;
  
  projectCards.forEach((card, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        delay: i * 0.1,
        scrub: 1,
      }
    });
    
    tl.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.6,
    });
  });
  
  // Hover tilt effect
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(card.querySelector('.project-image'), {
        x: (x - rect.width / 2) / 20,
        y: (y - rect.height / 2) / 20,
        duration: 0.5,
      });
    });
  });
  
  // Reduced motion fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from(projectCards, { opacity: 1, duration: 0.5, stagger: 0.1 });
  }
}