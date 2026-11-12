# Nocturne Studio

A storefront for selling hand-painted wallpapers. Built with Next.js 16, Tailwind CSS v4 and zero runtime dependencies beyond React.

The palette is sampled directly from the artwork — midnight navy, candle crimson and lamplight amber:

| Token | Hex | Sampled from |
| --- | --- | --- |
| Ink / midnight | `#070B1C` → `#1C274B` | night sky + party shadows |
| Crimson | `#882A27` → `#B0433C` | the red dress |
| Lamplight amber | `#D99C75` / `#F0C86A` | string lights, sunflowers |
| Cream | `#F6EFE4` | paper / type |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## What is included

- **Homepage** — hero, scrolling ticker, filterable collection, how-it-works, bundle block, dual licence comparison, testimonials, studio story + FAQ, newsletter.
- **Product pages** — `/wallpaper/[slug]`, eight pieces statically generated, licence selector with live pricing, palette read-out, phone mock, related pieces.
- **Cart drawer** — persists to `localStorage`, promo code `NOCTURNE15` (15% off), automatic **Triptych bundle** (any three personal pieces for $12), demo checkout with an order confirmation state.
- **Wishlist** — `/wishlist`, stars on every card, stored per device.
- **SEO** — metadata, Open Graph cards, `sitemap.xml`, responsive, keyboard accessible, respects `prefers-reduced-motion`.

## Swapping in your own art

1. Drop your originals anywhere (e.g. `assets/wallpapers/`).
2. Re-run the image script — it writes three web sizes per piece (full 1600px, card 900px, thumb 320px) as WebP:

   ```bash
   python3 -m venv .venv && .venv/bin/pip install pillow
   .venv/bin/python scripts/process-images.py
   ```

   Edit the `SRC` dictionary at the top of `scripts/process-images.py` to point at your files and choose slugs.
3. Update the catalogue in `src/lib/wallpapers.ts` — title, subtitle, collection, tags, price (in cents), story and palette.
4. The homepage, product pages, cart and sitemap all read from that one file, so new pieces appear everywhere automatically.

## Taking real payments

Checkout is currently a **demo** (`src/components/CartDrawer.tsx` → `checkout()`). The cart already computes the correct payable amount, bundle discount and promo discount. To go live, replace that function with one of:

- **Stripe Checkout** — create a server route `src/app/api/checkout/route.ts` that builds line items and returns `session.url`.
- **Lemon Squeezy / Gumroad** — simplest for digital files; they also act as merchant of record and handle VAT/UPI.
- **Razorpay** — best if most of your buyers are in India.

After payment, deliver the file pack from a signed URL or an email automation rather than a public path in `/public`.

## Notes

- The eight pieces in the catalogue are demo content: your two originals plus six painted companions in the same palette. Replace them with your own work before launch.
- `NOCTURNE15` is a hard-coded promo for demonstration — move it to an env var or a database before selling.
