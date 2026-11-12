"use client";

import Link from "next/link";
import { useState } from "react";
import { money, type Wallpaper } from "@/lib/wallpapers";
import { addToCart, toggleWish, useWishlist } from "@/lib/store";
import { Star } from "@/lib/stickers";

export function WallpaperCard({
  art,
  index = 0,
  priority = false,
  ratio = "tall",
}: {
  art: Wallpaper;
  index?: number;
  priority?: boolean;
  /** "wide" gives a cinematic 16:9 crop for the first tile of a sparse collection. */
  ratio?: "tall" | "wide";
}) {
  const wishlist = useWishlist();
  const saved = wishlist.includes(art.slug);
  const [added, setAdded] = useState(false);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(art.slug, "personal");
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function wish(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWish(art.slug);
  }

  return (
    <Link href={`/wallpaper/${art.slug}`} className="group relative block">
      <div className="art-frame">
        <div className="relative overflow-hidden" style={{ aspectRatio: ratio === "wide" ? "16 / 9" : "4 / 5" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/img/wallpapers/${art.slug}-card.webp`}
            alt={`${art.title} — ${art.subtitle}`}
            width={720}
            height={900}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />

          {/* focus vignette so white type stays legible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/5 to-ink-950/25" />

          {/* top row */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5">
            <span className="rounded-full border border-cream/25 bg-ink-950/45 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-cream/90 backdrop-blur-md">
              {art.collection}
            </span>
            <button
              onClick={wish}
              aria-label={saved ? `Remove ${art.title} from saved` : `Save ${art.title}`}
              aria-pressed={saved}
              className={`grid h-8 w-8 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                saved
                  ? "border-amber-bright/60 bg-amber-bright/15 text-amber-bright"
                  : "border-cream/25 bg-ink-950/40 text-cream/80 hover:border-cream/60 hover:text-cream"
              }`}
            >
              <Star size={11} />
            </button>
          </div>

          {/* bottom info */}
          <div className={`absolute inset-x-0 bottom-0 ${ratio === "wide" ? "p-6 sm:p-7" : "p-4"}`}>
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0 translate-y-0 transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className={`truncate font-display leading-tight text-cream ${ratio === "wide" ? "text-[1.7rem] sm:text-[2.1rem]" : "text-[1.32rem]"}`}>
                  {art.title}
                </h3>
                <p className="mt-1 truncate text-[0.72rem] text-cream/65">{art.subtitle}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="font-display text-[1.1rem] text-cream">{money(art.price)}</span>
                {art.compareAt && (
                  <span className="ml-1.5 text-[0.7rem] text-cream/45 line-through">
                    {money(art.compareAt)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={quickAdd}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-all duration-400 ${
                added
                  ? "bg-amber-glow text-ink-900"
                  : "translate-y-1 bg-cream/10 text-cream opacity-0 backdrop-blur-md group-hover:translate-y-0 group-hover:opacity-100 hover:bg-cream hover:text-ink-900"
              }`}
            >
              {added ? "Added to cart" : "Quick add"}
            </button>
          </div>
        </div>
      </div>

      <span className="sr-only">
        Wallpaper {index + 1}: {art.title}, {money(art.price)} for personal licence.
      </span>
    </Link>
  );
}
