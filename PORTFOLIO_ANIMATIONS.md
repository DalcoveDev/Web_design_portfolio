# Dalcove — Animation Implementation Addendum

This extends the existing build prompt with concrete GSAP mechanics for each named component, so the site reads as "cinematically edited" rather than "elements fade in on scroll." Drop this alongside the main prompt when generating code.

## Global Motion Rules (apply everywhere)

- **Easing:** define once in `lib/scroll.ts` or a `motion.ts` constants file — `EASE.out = "power3.out"`, `EASE.inOut = "power2.inOut"`, `EASE.spring = "back.out(1.4)"`. Never mix ad-hoc easing per component.
- **Stagger:** default `stagger: 0.08` for text/word groups, `0.12` for cards. Staggered reveal is what separates "edited" from "just appeared."
- **Only animate `transform`/`opacity`/`clip-path`.** No `top/left/width/height` tweens — kills performance and causes jank that breaks the illusion.
- **ScrollTrigger defaults:** `start: "top 80%"`, `toggleActions: "play none none reverse"` for most reveals; use `scrub: true` only for parallax/pin sections (hero, projects reel, timeline line).
- **Batching:** use `ScrollTrigger.batch()` for repeated card grids (blog, services, skills) instead of one trigger per card — cheaper and keeps stagger timing consistent as user scrolls fast.

## 1. Hero

- `HeroAnimations`: build one GSAP timeline on mount — split each title line into words (SplitText or manual span wrap), animate `yPercent: 120 → 0` + `opacity: 0 → 1` with `clipPath: inset(100% 0 0 0) → inset(0% 0 0 0)` per word, stagger 0.06s. This is the "subtitle drop" effect that reads as edited, not typed.
- `HeroCameraPull`: pin hero for first 100vh of scroll; scrub-tween `scale: 1 → 0.92` and `opacity: 1 → 0.4` on the whole hero container — mimics a camera dolly-out into the next scene.
- `HeroParallaxMouse`: orbs move on `mousemove` via `gsap.quickTo(orb, "x", {duration: 0.6, ease: "power3"})` at different multipliers per orb (0.02, 0.04, 0.06) for depth layering — this is the actual "2D layers moving like an edited video" effect you're after.
- `HeroMarquee`: `gsap.to(track, {xPercent: -50, repeat: -1, ease: "none", duration: 40})` — pause on hover by tweening the tween's `timeScale` to 0, not by pausing globalTimeline.

## 2. Scroll Progress

- `ScrollProgressBar`: `gsap.to(bar, {scaleX: 1, scrollTrigger: {trigger: section, start: "top top", end: "bottom bottom", scrub: 0.3}})` — thin gradient bar (terracotta → sage), `transformOrigin: "left center"`. This is the visual "timeline" that tells users how far they've scrolled.

## 3. About Section

- `ClipPathWipe` on section label: `clipPath: inset(0 100% 0 0) → inset(0 0% 0 0%)` scrub-linked to scroll — curtain reveal, not opacity fade.
- `TextRevealByWord` on heading: each word slides up from `yPercent: 100` with `clipPath` mask, stagger 0.04s. This is the "subtitle reveal" effect.
- `HighlightKeywords`: wraps keyword phrases in `KeywordUnderline` — a span with `scaleX: 0 → 1` underline that draws on scroll enter. `transformOrigin: "left center"`.
- `AnimatedCounter` for stats: `gsap.to({value: 0}, {value: target, duration: 2, ease: "power2.out", onUpdate: el.textContent = Math.round(v) + suffix})` — triggered on scroll enter.
- `StickyImageScroll`: pin image with `ScrollTrigger.pin`, Ken Burns zoom `scale: 1.05 → 1.15` scrub-linked. Text children stagger in from `y: 40, opacity: 0`.

## 4. Services Section

- `ScrollTrigger.batch('.service-item', {onEnter: batch => gsap.from(batch, {opacity: 0, x: -40, stagger: 0.08})})` — items slide in from left as user scrolls, not just fade.
- Each service row: number (terracotta serif), title, description, arrow. Arrow translates `x: 0 → 6px` on hover via CSS.

## 5. Skills Section

- `SkillMarquee`: duplicate track children, `gsap.to(track, {xPercent: -50, repeat: -1, ease: "none"})` — pause on hover via `timeScale` tween, NOT globalTimeline.
- `ScrollTrigger.batch('.skill-category')` for category cards — stagger 0.15s.
- Skill bars: `gsap.fromTo(bar, {scaleX: 0}, {scaleX: 1, transformOrigin: "left center", ease: "back.out(1.4)"})` — bars grow from left with spring ease.
- Skill items: spring pop-in `scale: 0.92 → 1, rotation: -8 → 0, opacity: 0 → 1`.

## 6. Projects Section

- `HorizontalScrollReel`: pin container, scrub-tween track `x: 0 → -(trackWidth - containerWidth)`. Auto-snap to nearest card after 280ms idle via `gsap.delayedCall`. Uses Lenis `scrollTo()` for smooth snap.
- Per card: `CardReveal` (clip-path curtain + Ken Burns zoom) → `CursorMagnetic2D` (element follows cursor with 3D rotation) → `TiltCard` (hover tilt with perspective 1000px).
- `ScrollMorph` on decorative blob: translates + rotates + scales scrub-linked for organic movement.

## 7. Experience Timeline

- SVG vertical line: `strokeDashoffset: length → 0` scrub-linked from `start: 'top 80%'` to `end: 'bottom 30%'`.
- Entries: alternate `x: ±60, rotation: ±3°` slide-in, each with own ScrollTrigger at `start: 'top 85%'`.
- Dot on line: absolute positioned, scales up on scroll enter.

## 8. Blog Section

- `ScrollTrigger.batch('.blog-card')` — cards stagger in from `y: 50, opacity: 0` with 0.12s stagger.
- Category badge: color-coded (Fintech=terracotta, AI=sage, Automation=amber, Backend=blue).
- Hover: card lifts `translateY(-4px)`, border glows, "Read more" fades in.

## 9. Testimonials

- `Draggable.create(track, {type: 'x', bounds: {minX: 0, maxX: 0}})` — snap to nearest card on drag end.
- Auto-advance: `setInterval` every 5s, paused during drag.
- Depth-stack: active card `opacity: 1, scale: 1, y: 0`, others `opacity: 0.6, scale: 0.92, y: ±20px`.
- Scroll-triggered entrance: depth-stack cards fade + rise with stagger.

## 10. Photo Gallery

- Masonry grid: `grid-cols-2 md:grid-cols-3, auto-rows-[200px]` with row-span variations.
- Each photo slightly rotated via inline style, draggable with `gsap.to(item, {rotation: ±3°})` on drag.
- Click opens Flip-animated lightbox: `Flip.getState(target) → setSelected → Flip.from(state)`.

## 11. Contact Section

- `AnimatedHeading`: letter-by-letter reveal with `rotation: 6 → 0, y: 40 → 0, opacity: 0 → 1`, stagger 0.03s.
- Social links: `MagneticHover` wrapper for cursor-follow effect.
- `AmbientBlob`: slow-looping gradient `backgroundPosition` animation, yoyo, repeat -1.
- `FloatingOrbs`: random orbs drift on scroll via ScrollTrigger scrub.

## 12. Footer

- `FooterCredits`: `gsap.from(ref, {opacity: 0, y: 40, duration: 1.2})` on scroll enter — end-credits style fade.

## 13. Custom Cursor

- Two elements: dot (12px terracotta) + trail ring (32px border).
- Dot follows mouse directly via `gsap.set` per frame.
- Trail follows with lerp: `pos += (mouse - pos) * 0.15`.
- On hover of interactive elements: dot scales to 2x, trail to 1.5x with opacity 0.3.
- Hidden on touch devices (`hidden md:block`).
- Event listeners: attach to specific elements via `querySelectorAll`, re-scan every 2s for dynamic elements. Never use `document` delegation with `.closest()` on event targets (Text nodes crash).

## 14. PageLoadIntro

- Fixed overlay with brand name, `z-[99999]`.
- On mount: `gsap.to(ref, {opacity: 0, duration: 0.8, delay: 0.6, onComplete: () => ref.style.display = 'none'})`.
- Reduced motion: duration 0.3, no delay.

## 15. CSS Keyframes (non-GSAP)

```css
@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.3); }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Anti-Patterns

1. **Never `gsap.globalTimeline.pause()`** — always pause individual tweens
2. **Always name listener functions** for proper cleanup
3. **Always check `instanceof Element`** before `.closest()` on event targets
4. **No dynamic Tailwind classes** like `max-md:${variable}` — use full class names
5. **Always provide reduced motion fallback** via `gsap.set()` final state
6. **Always kill tweens in useEffect cleanup** to prevent memory leaks
7. **No `top/left/width/height` tweens** — only `transform`, `opacity`, `clip-path`
