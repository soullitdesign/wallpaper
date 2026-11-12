"use client";

import Link from "next/link";
import { useEffect } from "react";
import { wallpapers } from "@/lib/wallpapers";
import { hydrateStore, useCartReady, useWishlist } from "@/lib/store";
import { WallpaperCard } from "@/components/WallpaperCard";
import { Crescent, Star } from "@/lib/stickers";

export default function WishlistPage() {
  const saved = useWishlist();
  const ready = useCartReady();

  useEffect(() => {
    hydrateStore();
  }, []);

  const items = wallpapers.filter((w) => saved.includes(w.slug));

  return (
    <div className="mx-auto min-h-[70vh] max-w-[1240px] px-5 pb-24 pt-12 sm:px-8">
      <p className="eyebrow">Your shortlist</p>
      <h1 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,3.9rem)] leading-[0.98]">
        Saved for <em className="italic text-amber-soft">later</em>
      </h1>
      <p className="mt-4 max-w-md text-[0.94rem] leading-relaxed text-cream-dim">
        The pieces you hovered over a little too long. They stay here on this device until you are
        ready.
      </p>

      {!ready ? (
        <div className="mt-16 h-40 animate-pulse rounded-2xl border border-cream/8 bg-ink-850/40" />
      ) : items.length === 0 ? (
        <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-cream/15 py-20 text-center">
          <Crescent className="h-10 w-10 text-cream/25" />
          <h2 className="mt-5 font-display text-2xl">Nothing saved yet</h2>
          <p className="mt-2 max-w-xs text-[0.88rem] leading-relaxed text-cream-muted">
            Tap the small star on any piece and it will wait for you here.
          </p>
          <Link href="/#collection" className="btn btn-primary mt-7">
            Find something to love
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-amber-soft">
            <Star size={11} /> {items.length} piece{items.length > 1 ? "s" : ""} saved
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((art, i) => (
              <WallpaperCard key={art.slug} art={art} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
