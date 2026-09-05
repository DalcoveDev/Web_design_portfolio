// Gallery section animations
export function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;
  
  galleryItems.forEach((item, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        delay: i * 0.08,
        scrub: 1,
      }
    });
    
    tl.from(item, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
    });
  });
  
  // Masonry hover effect
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item.querySelector('.gallery-image'), { scale: 1.05, duration: 0.3 });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item.querySelector('.gallery-image'), { scale: 1, duration: 0.3 });
    });
  });
  
  // Reduced motion fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from(galleryItems, { opacity: 1, duration: 0.3, stagger: 0.1 });
  }
}