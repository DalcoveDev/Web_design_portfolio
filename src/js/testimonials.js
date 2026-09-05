// Testimonials section animations
export function initTestimonials() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (!testimonialCards.length) return;
  
  testimonialCards.forEach((card, i) => {
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
      y: 30,
      duration: 0.5,
    });
  });
  
  // Reduced motion fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from(testimonialCards, { opacity: 1, duration: 0.3, stagger: 0.1 });
  }
}