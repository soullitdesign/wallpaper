"use client";

import { useMemo, useState } from "react";
import { collections, wallpapers, type Wallpaper } from "@/lib/wallpapers";
import { WallpaperCard } from "./WallpaperCard";

type Sort = "curated" | "new" | "price";

export function CollectionGrid() {
  const [active, setActive] = useState<(typeof collections)[number]>("All");
  const [sort, setSort] = useState<Sort>("curated");

  const list = useMemo(() => {
    let out: Wallpaper[] =
      active === "All" ? [...wallpapers] : wallpapers.filter((w) => w.collection === active);
    if (sort === "price") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "new") out = [...out].reverse();
    return out;
  }, [active, sort]);

  return (
    <section id="collection" className="relative scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">The collection · {wallpapers.length} pieces</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5.2vw,3.9rem)] leading-[0.98]">
              Nights worth
              <br />
              <em className="italic text-amber-soft">living in</em>
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-cream-dim">
              Each piece is painted, colour-graded and exported by hand — then cut for every
              screen you own. Nothing generated, nothing recycled.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by collection">
              {collections.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  data-active={active === c}
                  className="chip"
                  aria-pressed={active === c}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-cream-muted">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-cream/15 bg-ink-850 px-3 py-2 text-[0.7rem] uppercase tracking-[0.12em] text-cream-dim outline-none transition-colors hover:border-amber-glow/50"
              >
                <option value="curated">Curated</option>
                <option value="new">Newest</option>
                <option value="price">Price</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((art, i) => {
            // A collection with an odd number of pieces opens with a wide, cinematic tile.
            const wide = i === 0 && list.length % 2 === 1;
            return (
              <div key={art.slug} className={wide ? "sm:col-span-2" : ""}>
                <WallpaperCard
                  art={art}
                  index={i}
                  priority={i < 2}
                  ratio={wide ? "wide" : "tall"}
                />
              </div>
            );
          })}
        </div>

        {list.length === 0 && (
          <p className="mt-16 text-center text-cream-muted">No pieces in this collection yet.</p>
        )}
      </div>
    </section>
  );
}
