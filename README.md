# Blue Ridge Communications — Authorized Retailer Landing Site

A single-page, strictly frontend landing site for an independent authorized
retailer of Blue Ridge Communications. No backend, no API routes, no database.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 ·
Framer Motion · Lenis

---

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build
```

`npm run build` produces a static site in `out/` — plain HTML, CSS and JS
with no Node process required. To preview it exactly as it will be served:

```bash
npx serve out
```

## Deploying to Vercel

The project is configured for static export (`output: 'export'` in
`next.config.mjs`), which Vercel detects automatically.

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Leave every build setting on its default — the framework preset resolves
   to Next.js, the build command to `npm run build`, and the output
   directory to `out`.
3. Deploy. No environment variables are required; there is no backend, no
   API route and no database.

Because the export is static, Vercel serves it straight from the edge
cache. The image optimizer is not used, so the WebP files in
`public/images/` are delivered as-is — which is deliberate, see the
Motion section below.

> Do not run `npm run build` while `next dev` is running — both write to
> `.next`, and the dev server's client manifest gets corrupted. Stop the dev
> server first.

---

## The one file you edit for pricing

Everything on this site — every price, speed, feature bullet, FAQ answer,
fine-print row, section heading and legal page — is read from
**`lib/content.ts`**. No component hard-codes copy or pricing.

To change a rate, edit the `PlanItem` and nothing else:

```ts
{
  id: 'cable-500',
  name: '500 Mbps Internet',
  serviceLine: 'cable',
  speedDown: 500,
  speedUp: 12,
  price: 50,          // whole dollars
  cents: '00',        // rendered as muted superscript
  promoQualifier: 'With AutoPay and Paperless Billing',
  contractTerm: '36-month rate',
  dataPolicy: 'Unlimited data',
  equipmentFee: 'HomeFi℠ included',
  isPopular: true,
  features: [ /* ... */ ],
}
```

**Omit `price`** and the card automatically switches to the
"Quoted for your address" lockup and its button becomes **"Call for pricing"**
instead of **"Call to order"**. That rule lives in `ctaLabel()` and is not
duplicated anywhere.

### Before launch

`site.phoneDisplay` and `site.phoneHref` in `lib/content.ts` currently hold
`(855) 555-0143` — from the `555-01xx` range reserved for fictional use, so
the build never dials a live third-party line. Replace both with your tracked
sales number and every CTA across the site updates.

---

## Architecture

```
app/
  layout.tsx              fonts, metadata, Lenis mount, skip link, noscript guard
  page.tsx                section order + surface assignment
  globals.css             brand tokens, section surfaces, utilities
  legal/[slug]/page.tsx   8 statically generated legal pages
  not-found.tsx
components/
  Surfaces.ts             the four section backgrounds + light/dark flag
  HeroBackdrop.tsx        hero photograph + legibility scrims
  AuroraField.tsx         drifting gradient blobs, on every section
  CountUp.tsx             the featured price, counting up
  Faq.tsx                 accordion
  FinePrintGrid.tsx       inclusions table / mobile card stack
  Footer.tsx              footer, call band, legal links, disclosure
  Header.tsx              sticky header, scroll-spy nav, mobile sheet
  Hero.tsx                featured offer, H1, ZIP checker
  Icons.tsx               inline SVG glyphs + ServiceGlyph set
  MagneticButton.tsx      cursor-following CTA
  Marquee.tsx             CSS-only infinite ticker
  PlanCard.tsx            3D tilt pricing card
  PriceLockup.tsx         THE price formatter
  Reveal.tsx              scroll reveals, text reveal, stagger
  SectionMedia.tsx        framed section photograph
  SectionWipe.tsx         clip-path wipes + parallax
  ServiceBlock.tsx        renders any ServiceSection
  SmoothScroll.tsx        Lenis
  TopDisclosureBar.tsx
lib/
  content.ts              SINGLE SOURCE OF TRUTH
ai.wing                   structural changelog
```

`ServiceBlock` picks one of three layouts from the data itself — a split
panel for single-plan lines (Fiber, Home Phone), a card grid for multi-tier
lines (Cable, Bundles, Mobile), and a platform-plus-ladder layout for TV.
Adding a service line means adding an entry to `serviceSections`.

---

## Brand

Every colour was read off [brctv.com](https://www.brctv.com) — from the
computed stylesheet and from the section background gradients themselves.
Nothing here is invented.

| Token                 | Hex       | Where it comes from                  |
| --------------------- | --------- | ------------------------------------ |
| `--color-br-electric` | `#0866FF` | their primary button blue            |
| `--color-br-azure`    | `#0077DD` | top stop of the hero-deal gradient   |
| `--color-br-cyan`     | `#00A7E1` | the mountain-motif fill              |
| `--color-br-deep`     | `#00368C` | bottom stop of the deal gradient     |
| `--color-br-navy`     | `#002F8C` | deep corporate blue                  |
| `--color-br-royal`    | `#1E398D` | their footer background              |
| `--color-br-abyss`    | `#021562` | darkest navy in the ramp             |
| `--color-br-sky`      | `#B2ECFF` | bottom stop of the speeds gradient   |
| `--color-br-aqua`     | `#CDF9FD` | bottom stop of the products gradient |
| `--color-br-ice`      | `#F2FCFF` | their flat light section fill        |
| `--color-br-ink`      | `#414042` | charcoal body text                   |
| `--color-br-coral`    | `#F25648` | error states only                    |

Section surfaces reuse their gradients verbatim:

```css
surface-light   linear-gradient(#FFFFFF 0%, #F2FCFF 50%, #B2ECFF 100%)
surface-white   linear-gradient(0deg, #CDF9FD 0%, #FFFFFF 100%)
surface-vibrant linear-gradient(#0077DD 0%, #00368C 99%)
surface-royal   #1E398D
```

`surface-hero` is the one deviation: it runs the same three brand stops but
reaches the deep end faster, because their deal band carries one line of text
while this hero carries a headline, a paragraph, a form and a stat rail —
starting at `#0077DD` left white body copy under 4.5:1.

brctv.com sets **Avenir Next LT Pro**, which is licensed and not
redistributable. **Plus Jakarta Sans** (display) and **Inter** (body) are the
closest geometric-humanist pairing available through `next/font/google`, and
are self-hosted at build time.

---

## Motion

Lenis smooth scrolling, a blue-hour ridge photograph with scroll parallax in
the hero, per-word headline reveals with a panning gradient, drifting aurora
fields on every section, magnetic CTAs, clip-path section wipes, 3D tilt on
plan cards, staggered grid entrances, a conic border sweep and light sheen on
the featured offer, and a CSS-only infinite marquee.

`AuroraField` and `HeroBackdrop` are **server components** — zero JS shipped.
Their motion is CSS keyframes on transform and opacity only, so it is
GPU-composited and runs no rAF loop. Blue Ridge's own peak motif
(`mtns-lt-blue.svg`) is reused on the light sections as `ridge-motif`.

The hero photograph is served unoptimized and at full resolution on purpose.
`object-cover` crops the sides and scales to fill the container height, so it
needs more pixels than the viewport width — a downscaled variant gets
stretched and goes soft.

Other guards:

- the marquee is pure CSS, so it costs no main-thread work
- reveals use a `useSafeInView` hook that falls back to visible if the
  observer never reports (hidden tab, prerender, screenshot pass), so the
  page can never be stranded blank
- a `<noscript>` stylesheet forces every reveal visible if the bundle never
  executes
- `prefers-reduced-motion` is honoured globally and per component

---

## Accessibility

Skip link, semantic landmarks, `focus-visible` rings, `aria-expanded` on the
accordion and mobile menu, `aria-live` on the ZIP result, and scoped table
headers in the fine-print grid.

The header carries a scrim when transparent, because it otherwise sits over
the lightest stop of the hero gradient where white nav text falls below AA.

---

## Responsive

Every section is built mobile-first and verified at 375px with no horizontal
overflow. Type, spacing and card padding step up at `sm`; the aurora blobs
and their blur radius scale down on phones, where a 38rem blob would flood
the viewport and a 150px blur is disproportionately expensive to composite.

The hero scrim switches axis: left-to-right on desktop where the copy sits in
a column, top-to-bottom on phones where it spans the full width.
