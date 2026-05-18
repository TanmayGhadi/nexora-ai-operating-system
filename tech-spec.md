# Nexora — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI framework |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `vite` | ^6.3.0 | Build tool |
| `@vitejs/plugin-react` | ^4.4.0 | Vite React plugin |
| `tailwindcss` | ^4.1.0 | Utility CSS framework |
| `@tailwindcss/vite` | ^4.1.0 | Tailwind Vite integration |
| `typescript` | ^5.8.0 | Type safety |
| `@types/react` | ^19.0.0 | React type definitions |
| `@types/react-dom` | ^19.0.0 | React DOM type definitions |
| `gsap` | ^3.12.0 | Core animation engine, timelines |
| `lenis` | ^1.3.0 | Smooth scroll with inertia |
| `three` | ^0.175.0 | 3D engine for hero scene |
| `@types/three` | ^0.175.0 | Three.js type definitions |
| `lucide-react` | ^0.469.0 | Icon library |

**devDependencies**: `@types/react`, `@types/react-dom`, `@types/three`, `typescript`

GSAP plugins used (free, bundled with gsap package): ScrollTrigger, SplitText. No additional installs needed.

## Component Inventory

### Layout Components

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| Navigation | Custom | Single | Fixed top bar, glassmorphic on scroll, mobile hamburger drawer |
| Footer | Custom | Single | Multi-column link grid + newsletter CTA |

### Section Components

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Contains 3D scene canvas + text overlay. 100vh. |
| LogoWallSection | Custom | Marquee on desktop, static grid on mobile |
| FeaturesGridSection | Custom | 8-card grid with scroll-triggered stagger |
| WorkflowHubSection | Custom | Two-column with sticky left tabs |
| DashboardShowcaseSection | Custom | 3D perspective dashboard mockup |
| PricingSection | Custom | Toggle + 3-tier cards with counting animation |
| FAQSection | Custom | Two-column with accordion |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| PrimaryButton | Custom | Hero, Pricing, FAQ, Footer | Gradient bg, glow shadow, arrow icon |
| SecondaryButton | Custom | Hero, Dashboard, FAQ, Footer | Frosted outline style |
| GlassCard | Custom | Features, Pricing, Footer | Glassmorphism base with hover lift |
| SectionLabel | Custom | All sections | Uppercase tag/badge pattern |
| SectionHeadline | Custom | Features, Workflow, Dashboard, Pricing, FAQ | Wraps SplitText animation, accepts size variant |
| FeatureCard | Custom | FeaturesGridSection | Extends GlassCard with icon + description |
| PricingCard | Custom | PricingSection | Extends GlassCard with gradient border variant |
| PricingToggle | Custom | PricingSection | Monthly/yearly switch with 20% badge |
| FAQAccordion | Custom | FAQSection | Single-open accordion with chevron rotation |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollAnimation | GSAP ScrollTrigger setup with fade-up pattern, configurable stagger/duration/delay. Used by all sections. |
| useSplitText | GSAP SplitText initialization with char/word split, auto-trigger on scroll. Used by all SectionHeadline instances. |

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| **Hero 3D Scene** | Three.js + custom GLSL | 🔒 Imperative `requestAnimationFrame` loop. Custom ShaderMaterial for glassmorphism cards (Fresnel + edge glow). Icosphere wireframe brain with per-vertex pulse wave. BufferGeometry particle streams along parametric curves. Floor Plane with metalness/roughness. Post-processing via EffectComposer: UnrealBloomPass + ACES tone mapping. Mouse parallax via lerp on camera offset. | **High** |
| **Scene entrance timeline** | GSAP | Single `gsap.timeline()`: camera dolly z=8→5 (2s), then stagger card scale-in with `back.out(1.2)` (0.8s each, 0.2s stagger), brain scale+spin-up (1s), particles fade+flow (1.5s). Orchestrates 3D objects via refs. | **High** |
| **Hero text sequence** | GSAP + SplitText | Chained timeline: tag fade+scale (0.6s, delay 0.3s), SplitText char reveal `translateY(100%)→0` (0.6s/char, 0.03s stagger), description fade-up (0.8s, 0.9s delay), CTA stagger (0.6s, 1.0s delay), trust microcopy (0.6s, 1.2s delay). | **Medium** |
| **Global scroll entrance** | GSAP ScrollTrigger | `useScrollAnimation` hook: ScrollTrigger with `start: "top 85%"`, animates `opacity: 0→1, y: 30→0`, 0.8s, `power2.out`, configurable stagger. Applied to all section content elements. | **Low** |
| **Section headline reveal** | GSAP + SplitText | `useSplitText` hook: SplitText splits into words/chars, ScrollTrigger at 15%, each word/char `translateY(100%)→0` from overflow-hidden container, 0.6s, stagger 0.03s char/0.1s word, `power3.out`. | **Medium** |
| **Counter animations** | GSAP | `gsap.to` with `snap` modifier on a proxy object, `onUpdate` writes formatted value to DOM. 2s duration, `power2.out`. Triggered by ScrollTrigger. Used for dashboard stats and pricing toggle. | **Medium** |
| **Logo marquee** | CSS animation | `@keyframes translateX(-50%)` 30s linear infinite. Logo set duplicated for seamless loop. No JS needed. | **Low** |
| **Feature cards stagger** | GSAP ScrollTrigger | Batch pattern via `ScrollTrigger.batch`: 8 cards, stagger 0.08s, `y: 30→0, opacity: 0→1`, 0.6s, `power2.out`. | **Low** |
| **Workflow tab switch** | GSAP | Content crossfade: `opacity: 0→1, y: 10→0`, 0.3s. No library needed — simple React state + CSS transition is sufficient, but GSAP ensures easing consistency. | **Low** |
| **Dashboard 3D perspective** | CSS | `perspective(1200px) rotateY(5deg) rotateX(2deg)` on container. Hover shifts to `rotateY(3deg)` via CSS transition. | **Low** |
| **Pricing toggle counting** | GSAP | On toggle change, animate a proxy value from old→new price over 0.4s, `power2.out`, update DOM each frame. Format as currency. | **Low** |
| **Animated gradient border** | CSS | `@property --angle` + `@keyframes` rotating `conic-gradient` from `#3B6AFF` through `#7C3BFF`, masked to 2px border via `background-origin: border-box` + `mask`. 4s linear infinite. | **Medium** |
| **FAQ accordion** | CSS + React state | CSS `grid-template-rows: 0fr→1fr` for smooth height animation (0.3s). Chevron rotation `transform: rotate(180deg)`. Single-open state in parent. | **Low** |
| **Card hover effects** | CSS | `translateY(-4px)`, border color transition, `box-shadow` increase. 0.4s `cubic-bezier(0.4, 0, 0.2, 1)`. Pure CSS transitions on `:hover`. | **Low** |
| **Button glow hover** | CSS | `box-shadow` intensity increase, `scale(1.03)`. Arrow `translateX(4px)` on hover. CSS transitions. | **Low** |
| **Nav glass transition** | CSS | Background + backdrop-filter transition on scroll class. 0.3s ease. Scroll detection via scroll listener (no library needed). | **Low** |
| **Custom cursor** | JS + CSS | 6px dot, expands to 40px circle with `mix-blend-mode: difference` on interactive hover. Position updated via `transform: translate()` on `mousemove` for performance. Desktop only, hidden on touch. | **Medium** |
| **Ambient floating cards** | Three.js | Inside rAF loop: `Math.sin(time * 0.5 + phase) * 0.08` on Y position per card, randomized phase. Continuous after entrance completes. | **Low** |
| **Brain rotation + pulse** | Three.js + GLSL | Y rotation 0.002 rad/frame in rAF. Pulse wave via vertex index + time uniform in fragment shader: `sin(vertexIdx * 0.3 + time * 2.0)`. | **Medium** |
| **Particle stream flow** | Three.js | BufferGeometry positions updated per-frame along parametric curves. Reset at end of path. 200 particles, simple vector math in rAF. | **Medium** |

## State & Logic Plan

### React ↔ Three.js Bridge (Hero 3D Scene)

The hero uses a vanilla Three.js scene managed outside React's render cycle. Pattern:
- A single `useRef<HTMLCanvasElement>` for the canvas mount point
- All Three.js state (renderer, scene, camera, objects, materials) lives in a single ref object initialized in `useEffect`
- `requestAnimationFrame` loop runs independently, reads time and mouse position from refs
- No React state updates during animation — all mutations are imperative on Three.js objects
- Cleanup in useEffect return: dispose geometries, materials, textures, stop rAF, remove event listeners
- Mouse position tracked via a ref updated by a `mousemove` listener (not React state) for zero-overhead parallax

### Pricing Toggle State Flow

```
User clicks toggle → billing state flips (monthly/yearly) →
  1. Price values animate via GSAP counter on all 3 cards simultaneously
  2. "20% OFF" badge visibility toggles
  3. State persists for the session (no URL param needed)
```

### FAQ Accordion State

Single-open pattern managed by parent FAQSection: `activeIndex: number | null`. Clicking a question either sets activeIndex (if closed) or null (if open). Only one answer visible at a time. Height animation via CSS `grid-template-rows` trick, not `max-height`.

### Workflow Hub Tabs

Simple `activeTab: number` state (0-3). Content area crossfades on change. Left tab nav is sticky via CSS `position: sticky; top: 120px`. No scroll-jacking — tabs are clickable, not scroll-linked.

### Mobile Navigation

`isOpen: boolean` state controls slide-in drawer from right. Drawer uses same glassmorphism styling as desktop nav. Clicking a link or overlay closes drawer. Body scroll lock when open.

## Other Key Decisions

### Three.js Over R3F

Three.js is used imperatively (not `@react-three/fiber`) for the hero scene. The design specifies custom ShaderMaterials, post-processing pipelines, and a complex animation timeline that would be awkward to express declaratively. Imperative control gives direct access to the rAF loop for the entrance timeline and continuous ambient animations. This avoids the R3F abstraction overhead and potential React 19 compatibility issues.

### Canvas-Generated Textures

Dashboard and card UI textures are generated at runtime via HTML Canvas API (offscreen canvas, not DOM), then converted to `THREE.CanvasTexture`. This avoids loading external image assets for the 3D scene and ensures perfect color fidelity with the design system. The texture generation functions are pure utilities that take no props.

### No shadcn/ui Components Used

This design is entirely bespoke — no standard form patterns, dialogs, tables, or data display components from shadcn/ui are needed. All components (buttons, cards, inputs, toggles, accordion) are custom-built to match the exact glassmorphism + neon aesthetic. The shadcn/ui base setup remains for potential future extension but is not utilized in the initial build.

### Asset Strategy

- **SVG logos**: Inline React components (logo, logo-icon) — no external files
- **Dashboard card textures**: Generated at runtime via Canvas API (no external images)
- **Company logos in marquee**: Inline SVG wordmarks (Stripe, Linear, Notion, etc.) rendered as React components with currentColor fill
- **Avatar images**: AI-generated headshots saved to `/public/avatars/`
- **Font loading**: Google Fonts via `<link>` in index.html (Inter, Instrument Serif, JetBrains Mono). GSAP entrance animations deferred until `document.fonts.ready` resolves.
