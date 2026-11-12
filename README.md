# Nocturne Studio — wallpaper landing page

A single-page storefront for selling illustrated digital wallpapers. Built with
Next.js 16, React 19 and Tailwind CSS v4, with zero runtime dependencies beyond
React.

The design is editorial and night-lit: deep ink, warm lamplight amber, a serif
display face (Fraunces) against Inter, film grain over the whole page, and a
live device preview that swaps artwork as you browse.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## What's on the page

| Section | What it does |
| --- | --- |
| Nav | Sticky, blur-on-scroll, mobile sheet, live pack counter |
| Hero | Rotating artwork on a phone + desktop mock, thumbnail selector, ambient glow sampled from the active piece, trust row |
| Marquee | Scrolling spec ticker |
| The collection | Filterable 8-piece grid (All / City Lights / Romance / Solitude) with hover details and palette dots |
| Lightbox | Full preview, story, palette swatches, keyboard ← → / Esc, add single piece or the whole collection |
| Every screen | Desktop + tablet + phone composition and spec list |
| From the studio | Editorial story block with plate caption and studio stats |
| How it works | Three steps from browsing to lock screen |
| Pricing | One piece ($4), The Collection ($19), Studio licence ($59) |
| Testimonials | Rating summary and three quotes |
| FAQ | Accessible accordion with contact link |
| Closing | Full-bleed CTA with working newsletter validation |
| Pack drawer | Slide-over bag, remove items, subtotal, demo checkout confirmation |
| 404 | On-brand not-found page |

Also included: Open Graph/Twitter metadata, `sitemap.xml`, `robots.txt`,
favicon, skip link, `prefers-reduced-motion` support and keyboard-accessible
controls.

## Where things live

```
src/
  app/
    layout.tsx      fonts + metadata
    page.tsx        the landing page composition
    globals.css     design tokens, grain, keyframes, utilities
    icon.svg        favicon
  components/       one file per section, plus DeviceMocks and PackDrawer
  lib/
    wallpapers.ts   the catalogue — titles, prices, stories, palettes
    pack.tsx        pack context (client state for the drawer)
public/img/wallpapers/
  <slug>-full.webp  1600px — lightbox & device previews
  <slug>-card.webp   900px — collection grid
  <slug>-thumb.webp  320px — thumbnail strip / drawer
assets/wallpapers/   original source art
```

## Swapping in your own art

1. Drop originals into `assets/wallpapers/` (or anywhere).
2. Export three WebP sizes per piece into `public/img/wallpapers/`, using the
   same slug and the `-full`, `-card`, `-thumb` suffixes.
3. Edit `src/lib/wallpapers.ts` — title, collection, price, blurb, story and
   palette. Every section, the drawer and the lightbox read from this one file.

A typical export with Pillow:

```python
from PIL import Image
for slug, src in pieces.items():
    img = Image.open(src).convert("RGB")
    for suffix, width in [("full", 1600), ("card", 900), ("thumb", 320)]:
        copy = img.copy()
        copy.thumbnail((width, width * 3), Image.LANCZOS)
        copy.save(f"public/img/wallpapers/{slug}-{suffix}.webp", "WEBP", quality=82)
```

## Taking real payments

Checkout is a demo: `src/components/PackDrawer.tsx` → the checkout button flips a
local `placed` state. The drawer already computes the correct subtotal, so going
live means replacing that handler with a real one:

- **Stripe Checkout** — add `src/app/api/checkout/route.ts`, create line items,
  return `session.url`.
- **Lemon Squeezy / Gumroad** — simplest for digital files, and they handle
  VAT/UPI as merchant of record.
- **Razorpay** — handy if most buyers are in India.

After payment, deliver files from signed URLs (or an email automation) rather
than from a public `/public` path. Move the `hello@nocturne.studio` address,
domain in `layout.tsx`, and the 30-day guarantee copy to your own details before
launching.
