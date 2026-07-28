# VMAVIX — Design • Develop • Grow

Marketing site for VMAVIX, a digital design, engineering and growth studio.
Single-page React application with a cinematic video intro, animated canvas
background and an accessible multi-step enquiry flow.

![VMAVIX](public/brand/og-image.jpg)

---

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript 5.9 (strict) |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| Icons | lucide-react |
| Effects | Canvas 2D particles, Web Audio, canvas-confetti |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Typecheck only |

---

## Connecting the enquiry form

The form works out of the box: with no configuration it opens the visitor's
mail client with the enquiry pre-filled, so **a lead is never lost**.

To POST to a real endpoint instead, copy `.env.example` to `.env` and set:

```bash
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-id
VITE_NEWSLETTER_ENDPOINT=https://formspree.io/f/your-other-id
```

Any service accepting a JSON `POST` works — Formspree, Web3Forms, Basin, or
your own API route. The payload shape is:

```json
{
  "name": "...", "email": "...", "company": "...",
  "scope": "...", "budget": "...", "timeline": "...",
  "message": "...", "submittedAt": "ISO-8601", "source": "..."
}
```

---

## Project structure

```
public/
├── brand/          logo, favicons, OG image
├── media/          vmavix-intro.mp4  (cinematic loader)
├── robots.txt · sitemap.xml · site.webmanifest
└── _headers · _redirects            (Netlify/Cloudflare)

src/
├── App.tsx                 composition root
├── index.css               design tokens (@theme) + keyframes
├── data/vmavixData.ts      ALL content + nav/goal config
├── types/                  shared interfaces
├── hooks/
│   ├── useActiveSection    rAF-throttled scroll spy
│   ├── useModalA11y        ESC · focus trap · scroll lock
│   └── useScrollReveal     IntersectionObserver reveal
├── utils/audio.ts          Web Audio singleton (muted by default)
└── components/
    ├── common/   LoadingScreen · BackgroundCanvas · CustomCursor · Logo
    ├── layout/   Navbar · Footer
    ├── modals/   ProjectBuilderModal · LegalModal
    └── sections/ Hero · About · Services · WhyUs · Portfolio ·
                  TechStack · Industries · Statistics · Testimonials ·
                  FAQ · CTA
```

### Editing content

Almost all copy lives in **`src/data/vmavixData.ts`** — services, case studies,
tech stack, testimonials, FAQs, industries, stats, nav links and contact
details. You rarely need to touch JSX to change wording.

`SECTION_IDS` and `NAV_LINKS` in that file are the single source of truth for
the navbar, footer and scroll spy, so those can never drift out of sync.

---

## Accessibility

- Skip-to-content link
- All interactive elements are real `<button>` / `<a>` — full keyboard support
- Modals: `role="dialog"`, `aria-modal`, Escape to close, focus trap, focus
  restore, background scroll lock
- Visible `:focus-visible` outlines throughout
- `aria-expanded` / `aria-controls` on the FAQ accordion
- Full `prefers-reduced-motion` support — disables the aurora, particles,
  confetti, gradient shine and skips the video intro
- Custom cursor and hover sounds disabled on touch devices; audio muted by default

---

## SEO

- Unique title + meta description, canonical URL
- Open Graph and Twitter card tags with a 1200×630 image
- JSON-LD structured data (`Organization`, `WebSite`, `ProfessionalService`)
- `robots.txt` and `sitemap.xml`
- Semantic landmarks and a single `<h1>`
- `site.webmanifest` + full favicon set

---

## Performance

- Route-level code splitting (`react`, `icons`, `index` chunks)
- Single rAF-throttled passive scroll listener for the whole page
- Scroll reveals via `IntersectionObserver`, unobserved after firing
- Images lazy-loaded with explicit dimensions to avoid layout shift
- WebP logo with PNG fallback; source art optimised 5 MB → 264 KB
- Particle count scales with viewport width

Production build: **~112 KB gzipped** JS + CSS.

---

## Deploying

The build is fully static and `base` is relative, so it works anywhere.

```bash
npm run build     # outputs dist/
```

| Host | Setting |
|---|---|
| Netlify / Cloudflare Pages | build `npm run build`, publish `dist` (`_headers` and `_redirects` are picked up automatically) |
| Vercel | framework Vite, output `dist` |
| GitHub Pages | push `dist/` to `gh-pages` |

Remember to set your environment variables in the host's dashboard.

---

## Licence

© VMAVIX. All rights reserved.
