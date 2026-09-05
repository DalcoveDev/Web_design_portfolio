// Skills section animations - marquee loop
export function initSkills() {
  const skills = document.querySelectorAll('.skill-item');
  if (!skills.length) return;
  
  // Marquee loop using GSAP
  let y = 0;
  
  function marqueeLoop() {
    y -= 0.5;
    const container = document.querySelector('.marquee-container');
    if (container) {
      container.style.transform = `translateY(${y}px)`;
      // Reset when scrolled out
      if (Math.abs(y) > skills[0].offsetHeight) {
        y = 0;
      }
    }
    requestAnimationFrame(marqueeLoop);
  }
  
  // Only auto-run marquee on hover/no interaction, not on scroll
  // Reduced motion check
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Simple fade-in instead of marquee
    gsap.from('.skill-item', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 });
    return;
  }
  
  marqueeLoop();
}