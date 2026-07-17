Harry's Happy Vending — marketing site. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form setup (required before launch)

The form on `/contact` posts to `app/api/contact/route.ts`, which sends an email via [Resend](https://resend.com).
Without an API key it returns a friendly "not configured yet" error instead of crashing.

1. Sign up at resend.com (free tier: 3,000 emails/month).
2. Verify a sending domain, or use their shared test domain to start.
3. Create an API key and copy `.env.local.example` to `.env.local`, pasting the key in as `RESEND_API_KEY`.

## Content

Nearly all copy lives in typed data files under `content/` (services, industries, cities, FAQ, location landing pages,
site-wide facts like phone/email/hours). Edit those rather than the page files to update copy — the pages read from them.

## Structure

- `app/` — routes (App Router)
- `components/sections/` — full-width page sections (Hero, TrustBar, FAQ, etc.)
- `components/domain/` — content-specific cards (ServiceCard, IndustryCard, MapAreas, ...)
- `components/ui/` — generic design-system primitives (Button, Card, Accordion, ...)
- `content/` — typed data (edit here for copy changes)
- `lib/` — metadata/schema/util helpers

## Notes for launch

- **Imagery**: the site currently uses abstract gradient/graphic treatments in place of photography (no licensed
  photography was available at build time). Swapping in real photos of your facilities/equipment is a natural next step.
- **LinkedIn**: no link is shown in the footer yet — add the real URL in `content/site-config.ts` (`social.linkedin`).
- **Address**: no physical address is shown (service-area business, no public storefront) — add one in
  `content/site-config.ts` and `lib/schema.ts` if you'd like one listed.

## Build

```bash
npm run build
npm start
```
