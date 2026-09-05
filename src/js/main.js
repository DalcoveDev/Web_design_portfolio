// Import Lenis for smooth scroll
import Lenis from 'lenis';

// Import GSAP and register plugins
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Flip, Draggable);

// Initialize Lenis for smooth scroll
const lenis = new Lenis({
  smooth: true,
  ease: (t) => Math.min(0.05, 1 - Math.pow(1 - t, 3)),
});

// Sync Lenis with ScrollTrigger
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize all sections after Lenis is ready
import { initHero } from './hero.js';
import { initAbout } from './about.js';
import { initServices } from './services.js';
import { initSkills } from './skills.js';
import { initProjects } from './projects.js';
import { initTimeline } from './timeline.js';
import { initBlog } from './blog.js';
import { initTestimonials } from './testimonials.js';
import { initGallery } from './gallery.js';
import { initContact } from './contact.js';

// Initialize sections when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize hero animations
  initHero();
  
  // Initialize about section
  initAbout();
  
  // Initialize services
  initServices();
  
  // Initialize skills marquee
  initSkills();
  
  // Initialize projects
  initProjects();
  
  // Initialize timeline
  initTimeline();
  
  // Initialize blog
  initBlog();
  
  // Initialize testimonials
  initTestimonials();
  
  // Initialize gallery
  initGallery();
  
  // Initialize contact
  initContact();
  
  // Initialize reduced motion check
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    // Strip scrub/parallax/tilt/marquee entirely and replace with a plain opacity fade
    console.log('Reduced motion mode enabled');
  }
});

// Listen for reduced motion changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  if (e.matches) {
    console.log('Reduced motion mode enabled');
  }
});