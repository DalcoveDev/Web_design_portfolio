# Dalcove Portfolio — Full Build Prompt

Build a modern, dark-themed personal portfolio website for "Dalcove" (Ingabire Dalcove), a Software Engineer & Full Stack Developer based in Kigali, Rwanda.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP (ScrollTrigger, Flip, Draggable) + @gsap/react
- **Smooth Scroll:** Lenis
- **Database:** Neon PostgreSQL (serverless)
- **Package manager:** npm

## Design System
- **Dark theme** with warm earth tones: background `#0e0e0e`, cream text `#f0ebe3`, terracotta accent `#c45d3e`, sage green `#7a8b6f`
- **Fonts:** Space Grotesk (sans), Instrument Serif (italic accents)
- **CSS custom properties** for all colors, easing curves, and durations
- **Light mode** via `[data-theme="light"]` with inverted palette
- **Grain texture overlay** (SVG noise filter, fixed position, z-9999)
- **Reduced motion** support via `prefers-reduced-motion`

## Pages & Sections (single-page homepage)

### 1. Hero Section
- Full-viewport cinematic dark hero with parallax background image
- Tagline: "Software Engineer & Full Stack Developer"
- Three-line title: "I design / *digital* / experiences" (italic serif on "digital")
- Description paragraph with backdrop blur
- Two CTAs: "View Projects" (filled terracotta) + "Let's Talk" (outlined)
- Scroll indicator pulse animation
- Background marquee of skills: PYTHON • TYPESCRIPT • REACT • NEXT.JS • etc.
- Mouse-reactive parallax orbs, camera-pull zoom-out on scroll

### 2. Image Strip
- Horizontal auto-scrolling carousel of portfolio photos (GSAP infinite loop)
- Pauses when scrolled out of viewport
- Layered parallax wrapper

### 3. About Section
- Section label: "01 — About"
- Heading: "A software engineer who thinks in *systems*, not just screens"
- Body text with **keyword highlight underlines** on: software engineer, systems, full stack, API, cloud
- CV download button
- **Stats counters** (animated on scroll): 3+ Years, 10+ Projects, ∞ Curiosity
- **Sticky image scroll** — split-screen editorial: pinned photo on right, text scrolls past on left
- Profile card: Name, Role, Location, Focus
- Decorative SVG line art with draw-on-scroll animation
- Floating orbs + glow divider

### 4. Services Section
- Section label: "02 — Services"
- Three services with slide-in animation:
  1. UX / UI Design
  2. Frontend Development
  3. Branding & Identity
- Each row: number, title, description, arrow hover effect
- Forest/sage color theme

### 5. Skills Section
- Infinite horizontal skill marquee (pause on hover)
- 4 category cards in 2-column grid:
  - Languages (Python, TypeScript, JavaScript, SQL)
  - Frontend (React/Next.js, Tailwind, HTML/CSS, GSAP)
  - Backend & AI (FastAPI, NestJS, PostgreSQL, AI/ML)
  - Tools & Cloud (Git, n8n, Lightning Network, Linux)
- Animated skill bars (width growth on scroll)
- Spring pop-in for skill items

### 6. Behind the Scenes
- 4 polaroid-style photos with slight rotation
- Hover: straighten + scale + caption reveal

### 7. Horizontal Text Marquee
- Scrub-linked scrolling tech keywords: PYTHON • TYPESCRIPT • REACT • etc.

### 8. Projects Section
- Section label: "03 — Selected Work"
- **Horizontal scroll-jacking reel** (md+): vertical scroll → horizontal card movement
- Mobile: vertical grid fallback
- 8 project cards, each wrapped in: CardReveal → CursorMagnetic2D → TiltCard
- Card layout: image with gradient overlay + status badge + hover play button, title, description, tech tags, GitHub/Live Demo buttons
- Projects:
  1. MOBIBIT-AFRICA (Fintech, Python/FastAPI/React, Production Ready, featured)
  2. EjoFlow (n8n automation, TypeScript/Node.js)
  3. WandaWise (AI tourism, JavaScript)
  4. Next.js AI Chatbot (multi-LLM, TypeScript/Next.js)
  5. INKINGI Rescue (emergency API, NestJS/PostgreSQL)
  6. GOV Guide AI (government, Vite/Tailwind)
  7. Bible Guide (wellness, HTML/UX)
  8. PYTHON-FOR-AI (education, Python)
- Cosmos dark theme with floating orbs + scroll morph

### 9. Experience Timeline
- Vertical SVG line that draws on scroll
- 4 timeline entries alternating left/right:
  - 2025–Present: Founding Engineer
  - 2024–2025: Full Stack Developer
  - 2023–2024: Backend & AI Engineer
  - 2022–2023: Software Engineer (Early Career)
- Each entry slides in from its side with rotation

### 10. Blog Section
- Section label: "📝 Blog"
- 3-column grid of blog cards
- Each card: image with gradient overlay, category badge (color-coded), date, read time, title, excerpt, tags
- GSAP scroll-triggered staggered entrance
- 6 blog posts covering fintech, AI, automation, backend, education

### 11. Testimonials
- Horizontal draggable carousel with auto-advance (5s)
- Dot indicators
- Depth-stack visual: active card full opacity, others receded
- 3 testimonials from: Jean-Pierre Habimana, Claudine Uwimana, Eric Mugisha

### 12. Testimonial Form
- Name, role, company, message fields
- Client-side validation
- POST to /api/testimonials

### 13. Photo Gallery
- Masonry-style grid (2-col mobile, 3-col desktop)
- Each photo slightly rotated, draggable with GSAP
- Click opens Flip-animated lightbox
- 15 photos

### 14. Contact Section
- Two-column: left = heading + social links, right = contact form
- Heading: "Let's create something extraordinary" (letter-by-letter animation)
- Social links: GitHub, Instagram, LinkedIn, Devpost (with SVG icons)
- Form: name, email, subject, message → POST to /api/contact
- Ambient blob background, floating orbs, SVG corner art

### 15. Footer
- Brand logo, copyright year, "Designed & Built with care"
- Fade-in-up on scroll (end-credits style)

## Admin Dashboard (`/admin`)
- Password-protected (localStorage-based auth, 24h expiry)
- Login page with lock icon card
- Sidebar navigation with sections
- Pages: Dashboard, Hero, About, Services, Projects, Blog, Testimonials, Contact, Data (import/export)
- Dashboard shows: project count, services count, featured count, live count
- Database status indicator (connected vs localStorage fallback)
- Each section page: edit form that saves via PUT /api/portfolio

## API Routes
- `GET/PUT /api/portfolio` — read/write portfolio data (Neon DB with JSONB)
- `POST /api/contact` — store contact messages
- `POST /api/testimonials` — store testimonials (with approval flag)
- `POST /api/setup` — initialize database tables
- `POST /api/upload` — file upload (converts to base64 data URL, max 5MB)

## Animation Components (all GSAP-based)
- `HeroAnimations` — staggered text reveal timeline
- `HeroMarquee` — infinite looping skill ribbon
- `HeroCameraPull` — hero zooms out on scroll
- `ParallaxHero` / `HeroParallaxMouse` — scroll + mouse parallax
- `ScrollRevealSection` — generic fade-up on scroll
- `ScrollProgressBar` — thin terracotta→sage gradient bar
- `MagneticHover` — element follows cursor subtly
- `CTACursorBlob` — glowing blob appears on CTA hover
- `AnimatedCounter` — counts up to target number
- `ClipPathWipe` / `ClipReveal` — curtain mask reveals
- `StickyImageScroll` — pinned image + scrolling text
- `HighlightKeywords` — wraps keywords with underline animation
- `SVGDraw` — path draw animation
- `TiltCard` / `CursorMagnetic2D` — 3D tilt + cursor follow
- `CardReveal` — clip-path reveal + Ken Burns zoom
- `HorizontalScrollReel` — vertical scroll → horizontal cards
- `TimelineSection` — SVG line draw + alternating slide-in
- `AmbientBlob` / `FloatingOrbs` — ambient background motion
- `PageLoadIntro` — brand name fade-out on load
- `FooterCredits` — end-credits fade-in
- `CursorTrail` — custom cursor dot that follows mouse
- `CustomCursor` — cursor grow on interactive elements
- `useSmoothScroll` — Lenis + ScrollTrigger integration
- `useReducedMotion` — respects `prefers-reduced-motion`

## Data Layer
- `defaultData` object with all content (hero, about, services, projects, blog, testimonials, contact)
- `sanitizeImageData()` — fallback empty images to defaults
- `loadData()` — fetch from API → fallback to localStorage → fallback to defaults
- `saveData()` — write to API + localStorage backup
- `exportData()` / `importData()` for JSON backup/restore

## File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, JSON-LD, ThemeWrapper
│   ├── page.tsx            # Homepage ('use client', all sections)
│   ├── globals.css         # Theme tokens, section themes, grain, animations
│   ├── opengraph-image.tsx # OG image generator
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── portfolio/route.ts
│   │   ├── setup/route.ts
│   │   ├── testimonials/route.ts
│   │   └── upload/route.ts
│   └── admin/
│       ├── layout.tsx      # Admin auth layout with sidebar
│       ├── page.tsx        # Dashboard
│       ├── login/page.tsx
│       ├── hero/page.tsx
│       ├── about/page.tsx
│       ├── services/page.tsx
│       ├── projects/page.tsx
│       ├── blog/page.tsx
│       ├── testimonials/page.tsx
│       ├── contact/page.tsx
│       └── data/page.tsx
├── components/
│   ├── ScrollAnimations.tsx # All GSAP animation components (~2700 lines)
│   ├── SectionDivider.tsx   # GlowDivider, FloatingOrbs, DiagonalDivider
│   ├── Header.tsx           # Fixed header with nav + theme toggle
│   ├── Footer.tsx           # Simple footer
│   ├── HeroBackground.tsx   # Parallax hero background
│   ├── CustomCursor.tsx     # Custom cursor with hover scaling
│   ├── ProjectCard.tsx      # Project card with Card3D wrapper
│   ├── BlogCard.tsx         # Blog post card
│   ├── ContactForm.tsx      # Contact form with validation
│   ├── TestimonialForm.tsx  # Testimonial submission form
│   ├── Testimonials.tsx     # Draggable testimonial carousel
│   ├── Skills.tsx           # Skills grid + marquee
│   ├── ImageStrip.tsx       # Infinite scrolling image carousel
│   ├── PhotoGallery.tsx     # Draggable photo grid with lightbox
│   ├── BehindTheScenes.tsx  # Polaroid photo grid
│   ├── FileUpload.tsx       # Drag-and-drop file uploader
│   ├── ErrorBoundary.tsx    # React error boundary
│   ├── ThemeWrapper.tsx     # Theme provider wrapper
│   └── three/
│       └── Card3D.tsx       # 3D tilt card with glare effect
└── lib/
    ├── data.ts              # TypeScript interfaces + default data
    ├── store.ts             # Data loading/saving (API + localStorage)
    ├── db.ts                # Neon PostgreSQL connection
    ├── auth.ts              # Simple password auth (localStorage)
    ├── sanitize.ts          # Image data sanitizer
    ├── scroll.ts            # Lenis smooth scroll setup
    └── theme.tsx            # Dark/light theme context
```

## Key CSS Classes & Animations
- `.grain` — fixed noise texture overlay
- `.serif-accent` — italic serif font with terracotta color
- `.btn-press` — scale(0.97) on active
- `.scroll-line` — animated vertical gradient pulse
- `.input` — styled form inputs
- `.animate-marquee` — infinite horizontal scroll
- Section themes: `.section-hero`, `.section-about`, `.section-services`, `.section-projects`, `.section-blog`, `.section-gallery`, `.section-contact`
- Each section has unique gradient backgrounds and radial glow overlays

## Environment Variables
- `DATABASE_URL` — Neon PostgreSQL connection string
