# Nocturne Studio

A fresh, responsive landing page for an illustrated digital wallpaper collection.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Next.js exports the site as static files in `out/`. The project is configured for GitHub Pages at:

https://soullitdesign.github.io/wallpaper/

## Structure

- `src/app/page.tsx` — complete landing page and interactive gallery
- `src/app/globals.css` — responsive visual system
- `public/img/wallpapers/` — original wallpaper artwork and previews

The gallery supports mood filters, full artwork previews, and direct wallpaper downloads.
