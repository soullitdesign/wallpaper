from PIL import Image
import os

SRC = {
  "the-last-waltz": "assets/wallpapers/seedream-5.0-pro_a_{__task____image_t (2).jpeg",
  "sunflowers-at-midnight": "assets/wallpapers/watermark-removed-a_{__task____image_t.webp",
  "neon-promenade": "assets/img/gen-neon-promenade.jpg",
  "rooftop-reverie": "assets/img/gen-rooftop-reverie.jpg",
  "the-last-train": "assets/img/gen-last-train.jpg",
  "candlelight-waltz": "assets/img/gen-slow-dance.jpg",
  "blue-hour": "assets/img/gen-blue-hour.jpg",
  "paper-moon": "assets/img/gen-paper-moon.jpg",
}

os.makedirs("public/img/wallpapers", exist_ok=True)
for slug, src in SRC.items():
    im = Image.open(src).convert("RGB")
    w, h = im.size
    # full: 1600px on the long edge for lightbox
    for name, target in (("full", 1600), ("card", 900), ("thumb", 320)):
        r = target / max(w, h)
        resized = im.resize((round(w * r), round(h * r)), Image.LANCZOS)
        out = f"public/img/wallpapers/{slug}-{name}.webp"
        resized.save(out, "WEBP", quality=86 if name == "full" else 82, method=6)
        print(out, resized.size, round(os.path.getsize(out)/1024), "KB")
