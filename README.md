# Sharma & Kapoor — Premium CA Website

Production marketing site for Sharma & Kapoor, Chartered Accountants
(FRN 012345W, est. 1998). Built to the locked Project Constitution,
Product Vision and Design System — those documents govern every visual,
motion and UX decision. [`ARCHITECTURE.md`](ARCHITECTURE.md) is the
engineering map; this README covers setup, structure and handover notes.

## Stack

React 19 · TypeScript (strict) · Vite 7 · Tailwind CSS v4 · shadcn/ui
(new-york) · Framer Motion · GSAP (reserved — not yet imported; the dep
is carried for upcoming 3D accents) · Lenis smooth scroll · Lucide icons
· React Hook Form + Zod · React Router 7.

## Quick start

```bash
npm ci            # install (lockfile-pinned)
npm run dev       # dev server
npm run build     # type-check (tsc -b) + production build to dist/
npm run preview   # serve the production build locally
npm run lint      # eslint — zero warnings policy
```

## Where things live

```
public/               favicon · og-image.jpg · robots.txt · sitemap.xml
  fonts/              self-hosted WOFF2 (Fraunces + Inter, 2 variable files) · resources/ (client PDFs)
src/
  app/                main.tsx · App.tsx · routes.tsx (lazy routes) · providers/
  components/
    layout/           RootLayout · SiteHeader · SiteFooter · FloatingActions ·
                      StickyCta · Breadcrumbs · SkipLink · Container/Section
    sections/         homepage sections — one folder each: hero · trust ·
                      services · industries · why · process · stats · team ·
                      testimonials · faq · insights · cta
    forms/            ConsultationForm · ConsultationFormFields · NewsletterForm ·
                      BookingProvider (the booking dialog host) · useConsultationForm
    ui/               shadcn/ui primitives, vetted in per feature (button,
                      dialog, navigation-menu, SectionHeader, tooltip)
    seo/              Seo component (title/meta/OG/Twitter/canonical/JSON-LD)
  hooks/              usePrefersReducedMotion · useLockBodyScroll · useScrollPast · useLenis
  lib/                site.ts (brand/nav/contact — single source of truth)
                      utils.ts (cn) · motion.ts (one choreography system)
                      downloads.ts · practices.ts · insights.ts
  pages/              16 routes — see src/app/routes.tsx
  styles/globals.css  ALL design tokens (@theme) + base layer
```

Rules enforced project-wide: tokens only (no raw hex/px/ms in
components) · animations are transform/opacity-only, expo-out,
reduced-motion aware · pages orchestrate sections, they don't build UI
inline.

## Motion

One system in `src/lib/motion.ts` (durations, expo-out easing, shared
variants). Infinite loops are limited to two hero accents; everything
degrades to opacity-only under `prefers-reduced-motion`. Lenis smooth
scroll is initialized in `src/app/providers/`.

## Forms — status before launch

`ConsultationForm` / `BookingDialog` and `NewsletterForm` are fully
validated client-side (React Hook Form + Zod) and currently **simulate
submission** (~900 ms) — there is no backend. Wire the marked `// TODO`
intake points to the firm's provider (Formspree / Resend / Buttondown)
before going live.

## Client placeholders to replace

- `src/lib/site.ts` — real phone (`+91 22 4890 1200`), email, address,
  social URLs.
- `src/components/layout/FloatingActions.tsx` — WhatsApp `wa.me` number
  must match the phone above.
- `src/lib/downloads.ts` — resources ship `ready: false` and render
  "Available shortly". Drop real PDFs into `public/resources/`, set the
  file path and flip `ready: true`.
- Team cards use monogram initials — swap in partner photos if desired.
- `public/og-image.jpg` is a generated 1200×630 brand card (locked
  ink/brass palette, self-hosted fonts); regenerate if the brand changes.

Design tokens: `src/styles/globals.css`. Deployment: [`DEPLOYMENT.md`](DEPLOYMENT.md).
