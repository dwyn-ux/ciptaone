# Cipta One — ciptaone.site

Editorial portfolio for **Cipta One**. Astro + TypeScript + Tailwind, no JS framework runtime, SVG-only visuals.

## Stack

- Astro 4
- TypeScript
- Tailwind CSS (layout/spacing) + custom CSS (animation, orbital, cursor)
- Vanilla TS for animation logic (IntersectionObserver, requestAnimationFrame)
- Inline SVG assets (no stock images, no WebGL)

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # ./dist
npm run preview
```

## Project structure

```
src/
  components/   Navigation, Hero, OrbitalSystem, ProjectList/Item, TechIndex, Process, Notes, About, Contact, Footer, ...
  layouts/      Layout.astro
  pages/        index.astro
  data/         projects.ts, stack.ts, site.ts
  styles/       global.css, typography.css, animations.css
  scripts/      reveal, cursor, scroll-progress, project-tilt, magnetic, orbital, chapter
public/
  assets/       orbital-system.svg, project-*.svg, favicon.svg, og-image.svg
```

## Accessibility / motion

- `prefers-reduced-motion` short-circuits every animation, cursor, tilt, and orbital motion.
- Custom cursor is disabled on coarse-pointer / touch / reduced-motion devices.
- Skip-to-content link, semantic landmarks, visible `:focus-visible` outlines.
- Project interactions never gate content; hover-only styling is decorative.
