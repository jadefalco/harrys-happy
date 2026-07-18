# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for Harry's Happy Vending (family-owned vending/coffee/micro-market service company, Golden
Horseshoe/Greater Hamilton Area, Ontario). Next.js App Router + TypeScript + Tailwind CSS v4 + Framer Motion
(`motion` package). No test suite exists in this repo.

## Commands

```bash
npm run dev      # start dev server (Turbopack) — localhost:3000, or next available port
npm run build    # production build (also type-checks via `next build`)
npm start        # run the production build
npm run lint     # eslint (eslint-config-next core-web-vitals + typescript)
```

There is no test runner configured — don't invent test commands. Verify changes by running `npm run build`
(catches type errors) and `npm run lint`, and by checking rendered output in a browser for UI changes.

### Contact form

`/contact` posts to `app/api/contact/route.ts`, which sends email via [Resend](https://resend.com). Requires
`RESEND_API_KEY` in `.env.local` (copy from `.env.local.example`); without it the endpoint returns a friendly
"not configured yet" error instead of crashing — this is intentional, not a bug.

## Architecture

**Content/presentation split is the core convention.** Nearly all copy — services, industries, cities, FAQ,
programmatic location landing pages, site-wide facts (phone, email, hours, founded year, tagline) — lives in
typed data files under `content/`, not in the page components. To change copy, edit `content/*.ts`; to change
layout/structure, edit `components/` or `app/`. `content/site-config.ts` is the single source of truth for
business facts (phone, email, hours, founded year, tagline/description, service area cities) and is imported
throughout rather than hardcoded per-page.

**Component layers** (`components/`):
- `ui/` — generic design-system primitives with no business meaning (`Button`, `Card`, `Container`, `Reveal`,
  `SectionHeading`, `Accordion`, `Badge`, `CountUp`, `GridPattern`). `Reveal` is the scroll-in-view animation
  wrapper (IntersectionObserver-based) used throughout for the fade/slide-up entrance effect.
- `domain/` — content-aware but reusable cards (`ServiceCard`, `IndustryCard`, `CityList`, `MapAreas`,
  `GalleryLightbox`).
- `sections/` — full-width, page-specific sections composed on `app/*/page.tsx` routes (`Hero`, `TrustBar`,
  `ServicesGrid`, `FinalCTA`, `OurMachines`, etc.). Pages are thin: they mostly just assemble a list of
  `sections/` components in order.
- `layout/` — `Nav`, `Footer`, `Logo`, `MobileMenu` (site chrome, not per-page).

**Programmatic SEO pages**: `app/services/[slug]` and `app/locations/[slug]` are statically generated
(`generateStaticParams`) from `content/services.ts` and `content/locations.ts` respectively — adding a new
service or location page means adding an entry to the content file, not creating a new route file. Both use
`lib/metadata.ts` (`buildMetadata`, wraps Next `Metadata` with OG/Twitter/canonical defaults) and
`lib/schema.ts` (JSON-LD builders: `localBusinessSchema`, `serviceSchema`, `faqSchema`, `breadcrumbSchema`)
injected via inline `<script type="application/ld+json">`.

**Images**: real on-site/product photos live in `public/images/`. `content/gallery.ts` auto-detects every
supported image file in that directory at build time via `fs.readdirSync` (server-only — don't import it from
a client component) and maps known filenames to hand-written, accurate alt text/captions via the `knownImages`
lookup; unrecognized files fall back to a generated caption. The homepage "Our Machines" section
(`components/sections/OurMachines.tsx` + `components/domain/GalleryLightbox.tsx`) renders this gallery with a
lightbox. **Only use real company photos with alt text that accurately describes what's actually in the
image** — don't caption a generic snack machine as a specific service line (e.g. "AI Smart Coolers") just to
fill a slot; several source photos are EXIF-rotated and Next's built-in image optimizer corrects this
automatically, so don't pre-rotate files.

**Styling**: Tailwind v4 (CSS-first config via `@theme inline` in `app/globals.css`, no `tailwind.config.ts`).
Design tokens (colors like `navy-950`, `cream`, `accent-400`, fonts `--font-display`/`--font-sans`) are defined
as CSS custom properties in `globals.css`. Use the existing `cn()` helper (`lib/utils.ts`, clsx + tailwind-merge)
for conditional/merged class names, consistent with the rest of the codebase.
