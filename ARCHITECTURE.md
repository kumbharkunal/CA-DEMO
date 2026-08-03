# CA Premium — Architecture

Production React application for Sharma & Kapoor, Chartered Accountants.
This document is the map. The visual/UX source of truth is the locked
Design System (executed in `src/styles/globals.css`) — never improvised
in components.

## Stack

React 19 · TypeScript (strict) · Vite 7 · Tailwind CSS v4 · shadcn/ui
(new-york) · Framer Motion · GSAP · Lenis · Lucide · React Hook Form ·
Zod · React Router 7.

## Folder structure

```
public/
  fonts/            self-hosted WOFF2 — Fraunces + Inter only (asset step)
  favicon.svg
src/
  app/
    App.tsx           composition root
    main.tsx          bootstrap (entry: src/app/main.tsx)
    routes.tsx        route table (React Router, lazy boundaries)
    providers/        AppProviders (MotionConfig → Tooltip → Lenis)
  components/
    layout/           SkipLink · RootLayout · SiteHeader · SiteFooter ·
                      Container/Section primitives
    sections/         homepage sections — one folder per locked section
    ui/               shadcn/ui primitives (added per feature, no dead code)
  hooks/              usePrefersReducedMotion · useLockBodyScroll
  lib/
    site.ts           brand & navigation config — single source of truth
    utils.ts          cn()
    motion.ts         one choreography system: durations, easing, variants
  pages/              HomePage · NotFoundPage (more per route)
  styles/
    globals.css       tokens (@theme) · base layer · layout utilities
```

## Layering rules

1. `app/` composes. `components/` renders. `lib/` informs. `pages/` orchestrate sections.
2. Components import tokens via utilities (`bg-background`, `text-h2`,
   `shadow-e2`, `ease-out`, `duration-base`). Raw hex/px/ms in components
   violates Constitution #1.
3. Every animation: `transform`/`opacity` only, ≤ 500ms, expo-out
   entrances, reduced-motion falls back to opacity-only.
4. New sections go in `components/sections/<name>/` and are registered
   on the page — pages stay thin.
5. Content strings for navigation/brand live in `lib/site.ts`, section
   copy lives with the section.
6. shadcn primitives are vetted into `components/ui/` only when a real
   feature needs them (first: Radix NavigationMenu for the navbar).

## Performance gates (per release)

LCP ≤ 2.0s · INP ≤ 200ms · CLS ≤ 0.02 · initial JS ≤ 150KB gzip.
Fonts: 4 files max, self-hosted, `font-display: swap`, hero weights
preloaded in `index.html`.
