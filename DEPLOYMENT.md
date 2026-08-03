# Deployment Guide

`npm run build` outputs a static SPA to `dist/` — host it on Vercel,
Netlify, Cloudflare Pages or any static host / CDN. There are no
server components and no environment secrets.

## 1. SPA fallback (required)

Client routes like `/services/:slug`, `/contact`, `/search` must serve
`index.html`. Configure a catch-all rewrite, otherwise deep links 404:

- **Vercel** — `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Netlify** — `public/_redirects`: `/* /index.html 200`
- **Nginx** — `try_files $uri $uri/ /index.html;`

## 2. Headers & caching

Vite fingerprints everything under `/assets/`, so cache it hard:

- `/assets/*` and `/fonts/*` → `Cache-Control: public, max-age=31536000, immutable`
- `index.html` → `Cache-Control: public, max-age=0, must-revalidate`
- Ensure WOFF2 files are served as `Content-Type: font/woff2` (or
  `application/font-woff2`) — wrong MIME blocks font loading.
- Enable Brotli/gzip at the edge (Vercel/Netlify do this automatically).

## 3. SEO go-live

- Domain is configured as `https://www.sharmakapoor.in` — verify the
  canonical URLs in `index.html` / `src/components/seo/` match the
  final domain before DNS cutover.
- Submit `public/sitemap.xml` to Google Search Console after launch.
- `public/robots.txt`, per-route metadata, OG/Twitter cards and
  JSON-LD (AccountingService + FAQPage + BreadcrumbList) are already
  in place — nothing to configure server-side.
- Verify `public/og-image.jpg` renders correctly in a link-preview
  debugger after deploy.

## 4. Pre-launch checklist (needs client input)

1. Real phone / email / address / social URLs in `src/lib/site.ts`,
   and the matching `wa.me` number in
   `src/components/layout/FloatingActions.tsx`.
2. Wire form submissions to a real intake endpoint — both forms
   currently simulate success. See "Forms" in `README.md`, and the
   `// TODO` markers in `src/components/forms/useConsultationForm.ts`
   and `NewsletterForm.tsx`.
3. Supply the real resource PDFs → `public/resources/`, then flip
   `ready: true` in `src/lib/downloads.ts`.
4. Confirm partner names / details on About/Team.
5. Legal review of Privacy Policy, Terms and Disclaimer copy.
6. Optional: partner photographs replacing the monogram avatars.

## 5. Verify after deploy

- `curl -sI https://www.sharmakapoor.in/services/audit-assurance` →
  `200` with HTML (SPA fallback works).
- Load `/` in Lighthouse → targets: LCP ≤ 2.0s, INP ≤ 200ms,
  CLS ≤ 0.02, Accessibility ≥ 95, SEO ≥ 95.
- Test phone/WhatsApp links, the consultation dialog, newsletter
  signup, search, and the 404 page on a real mobile device.
