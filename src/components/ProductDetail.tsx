"use client";

import Link from "next/link";
import { useState } from "react";
import { licences, money, type Wallpaper } from "@/lib/wallpapers";
import { addToCart, toggleWish, useWishlist } from "@/lib/store";
import { Star } from "@/lib/stickers";
import { WallpaperCard } from "./WallpaperCard";

export function ProductDetail({
  art,
  related,
  sameCollection,
}: {
  art: Wallpaper;
  related: Wallpaper[];
  sameCollection: number;
}) {
  const [licence, setLicence] = useState<"personal" | "extended">("personal");
  const [added, setAdded] = useState(false);
  const wishlist = useWishlist();
  const saved = wishlist.includes(art.slug);

  const lic = licences.find((l) => l.id === licence)!;
  const price = Math.round(art.price * lic.priceMultiplier);

  function add() {
    addToCart(art.slug, licence);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-8 sm:px-8">
        <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-cream-muted">
          <Link href="/" className="transition-colors hover:text-cream">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#collection" className="transition-colors hover:text-cream">
            Collection
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-cream-dim">{art.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* ---------- gallery ---------- */}
          <div>
            <div className="relative overflow-hidden rounded-[6px] border border-cream/12 bg-ink-950 shadow-[0_50px_100px_-45px_rgba(0,0,0,0.95)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/img/wallpapers/${art.slug}-full.webp`}
                alt={`${art.title} — ${art.subtitle}`}
                width={1280}
                height={1600}
                className="h-auto w-full"
                fetchPriority="high"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/10"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1fr] sm:gap-4">
              <PhoneMock art={art} />
              <div className="flex flex-col justify-center gap-3 rounded-lg border border-cream/10 bg-ink-850/60 p-4">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream-muted">
                  Palette
                </p>
                <div className="flex gap-1.5">
                  {art.palette.map((c) => (
                    <span
                      key={c}
                      title={c}
                      className="h-7 flex-1 rounded-[3px] border border-cream/15"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <p className="mt-1 text-[0.7rem] leading-snug text-cream-muted">
                  Sampled from the original painting.
                </p>
              </div>
              <div className="col-span-2 flex flex-col justify-center gap-2 rounded-lg border border-cream/10 bg-ink-850/60 p-4 sm:col-span-1">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream-muted">
                  Included
                </p>
                <p className="font-display text-2xl leading-none">18</p>
                <p className="text-[0.7rem] leading-snug text-cream-muted">
                  crops across phone, tablet, desktop and print.
                </p>
              </div>
            </div>
          </div>

          {/* ---------- buy panel ---------- */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-amber-glow/30 bg-amber-glow/8 px-3 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-amber-soft">
                {art.collection}
              </span>
              {art.compareAt && (
                <span className="rounded-full bg-crimson-600/25 px-3 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-crimson-400">
                  Save {money((art.compareAt ?? 0) - art.price)}
                </span>
              )}
            </div>

            <h1 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,3.4rem)] leading-[0.98]">
              {art.title}
            </h1>
            <p className="mt-2 text-[0.95rem] text-cream-dim italic">{art.subtitle}</p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex gap-1 text-amber-bright">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} />
                ))}
              </div>
              <span className="text-[0.72rem] tracking-wide text-cream-muted">
                Volume I · launch release
              </span>
            </div>

            <p className="mt-6 text-[0.92rem] leading-[1.78] text-cream-dim">{art.story}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {art.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-cream/12 px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-cream-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* licence selector */}
            <fieldset className="mt-9">
              <legend className="text-[0.62rem] uppercase tracking-[0.2em] text-cream-muted">
                Choose your licence
              </legend>
              <div className="mt-3 space-y-2.5">
                {licences.map((l) => (
                  <label
                    key={l.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                      licence === l.id
                        ? "border-amber-glow/55 bg-amber-glow/[0.06]"
                        : "border-cream/12 hover:border-cream/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="licence"
                      value={l.id}
                      checked={licence === l.id}
                      onChange={() => setLicence(l.id)}
                      className="sr-only"
                    />
                    <span
                      className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ${
                        licence === l.id ? "border-amber-glow" : "border-cream/35"
                      }`}
                    >
                      {licence === l.id && (
                        <span className="h-2 w-2 rounded-full bg-amber-glow" />
                      )}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[0.92rem] font-medium text-cream">{l.name}</span>
                        <span className="font-display text-[1.05rem] tabular-nums">
                          {money(Math.round(art.price * l.priceMultiplier))}
                        </span>
                      </span>
                      <span className="mt-1 block text-[0.76rem] leading-relaxed text-cream-muted">
                        {l.blurb}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* price + actions */}
            <div className="mt-7 flex items-baseline gap-3">
              <span className="font-display text-[2.6rem] leading-none tabular-nums">
                {money(price)}
              </span>
              {licence === "personal" && art.compareAt && (
                <span className="text-[0.9rem] text-cream-muted line-through">
                  {money(art.compareAt)}
                </span>
              )}
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-cream-muted">
                one-time
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={add}
                className={`btn flex-1 ${added ? "btn-primary" : "btn-crimson"}`}
                aria-live="polite"
              >
                {added ? (
                  <>
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                      <path
                        d="M2.5 8.6l3.2 3.2L13.4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Added to cart
                  </>
                ) : (
                  <>Add to cart · {money(price)}</>
                )}
              </button>
              <button
                onClick={() => toggleWish(art.slug)}
                aria-pressed={saved}
                className={`btn shrink-0 ${saved ? "btn-primary" : "btn-ghost"}`}
              >
                <Star size={12} /> {saved ? "Saved" : "Save"}
              </button>
            </div>

            <ul className="mt-7 grid gap-2.5 border-t border-cream/10 pt-6 text-[0.82rem] text-cream-dim">
              {[
                "Instant download — no waiting on email chains",
                "5K master + 18 hand-cut crops",
                "Colour-matched for phone and desktop displays",
                "Lifetime access, free re-downloads",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-glow"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 8.6l3.2 3.2L13.4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-cream/15 px-4 py-3">
              <Star size={12} className="shrink-0 text-amber-bright" />
              <p className="text-[0.74rem] leading-relaxed text-cream-muted">
                Add two more pieces and the{" "}
                <Link href="/#bundle" className="text-amber-soft underline underline-offset-2">
                  $12 triptych bundle
                </Link>{" "}
                kicks in automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="border-t border-cream/8 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Keep the night going</p>
                <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,2.7rem)]">
                  {sameCollection >= 2 ? `More from ${art.collection}` : "More after dark"}
                </h2>
              </div>
              <Link
                href="/#collection"
                className="hidden text-[0.7rem] uppercase tracking-[0.16em] text-cream-dim transition-colors hover:text-amber-soft sm:block"
              >
                View all →
              </Link>
            </div>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <WallpaperCard key={r.slug} art={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function PhoneMock({ art }: { art: Wallpaper }) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-cream/10 bg-ink-850/60 p-4">
      <div className="relative h-full w-[74px] overflow-hidden rounded-[12px] border-[3px] border-ink-600 bg-ink-950 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.9)]">
        <div style={{ aspectRatio: "9 / 19" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/img/wallpapers/${art.slug}-thumb.webp`}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
          <div className="absolute left-1/2 top-2 h-1 w-7 -translate-x-1/2 rounded-full bg-ink-950/80" />
          <div className="absolute inset-x-0 bottom-2 text-center">
            <p className="font-display text-[0.68rem] leading-none text-cream/95">11:47</p>
            <p className="mt-0.5 text-[0.42rem] text-cream/60">Monday, 4 Nov</p>
          </div>
        </div>
      </div>
    </div>
  );
}
