"use client";

import { useCallback, useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { collectionItem } from "@/components/Nav";
import { usePack } from "@/lib/pack-context";
import {
  collectionPrice,
  collections,
  imagePath,
  money,
  wallpapers,
  type Wallpaper,
} from "@/lib/wallpapers";

type Filter = (typeof collections)[number];

export default function Collection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible =
    filter === "All"
      ? wallpapers
      : wallpapers.filter((piece) => piece.collection === filter);

  return (
    <section id="works" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="label flex items-center gap-3 text-amber">
              <span className="h-px w-10 bg-amber/50" /> The collection · Vol. 04
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.9rem)] leading-[1.02] tracking-[-0.025em] text-balance">
              Eight nights, <em className="italic text-sand/85">eight moods</em>.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-sand/65 sm:text-[15px]">
              Painted in one midnight palette, so any two of them sit together.
              Preview a piece full-screen, read its story, take it home for {money(4)}.
            </p>
          </Reveal>

          <Reveal delay={120} className="flex flex-wrap items-center gap-2">
            {collections.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={filter === option}
                className={`rounded-full border px-4 py-2 text-[12px] transition-all duration-300 ${
                  filter === option
                    ? "border-amber bg-amber text-ink"
                    : "border-cream/15 text-sand/70 hover:border-cream/40 hover:text-cream"
                }`}
              >
                {option}
                <span className={`ml-1.5 text-[10px] ${filter === option ? "text-ink/50" : "text-sand/35"}`}>
                  {option === "All"
                    ? wallpapers.length
                    : wallpapers.filter((piece) => piece.collection === option).length}
                </span>
              </button>
            ))}
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((piece, index) => (
            <Reveal key={piece.slug} delay={(index % 4) * 70}>
              <WallpaperCard
                wallpaper={piece}
                index={index}
                onOpen={() => setOpenIndex(index)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-cream/10 bg-gradient-to-r from-cream/[0.04] to-transparent p-5 sm:flex-row sm:px-7">
          <p className="text-center text-sm text-sand/70 sm:text-left">
            Can&apos;t choose? Take all eight plus every future volume for{" "}
            <span className="text-cream">{money(collectionPrice)}</span>.
          </p>
          <BuyCollectionButton />
        </Reveal>
      </div>

      {openIndex !== null && (
        <Lightbox
          list={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={(next) => setOpenIndex(next)}
        />
      )}
    </section>
  );
}

function WallpaperCard({
  wallpaper,
  index,
  onOpen,
}: {
  wallpaper: Wallpaper;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-xl text-left ring-1 ring-cream/10 transition-all duration-500 hover:ring-cream/30"
    >
      <span className="relative block aspect-[3/4] overflow-hidden">
        <img
          src={imagePath(wallpaper.slug, "card")}
          alt={wallpaper.title}
          loading={index > 3 ? "lazy" : "eager"}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />
        <span className="absolute inset-0 bg-gradient-to-b from-black/35 to-transparent opacity-60" />

        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/30 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
          {wallpaper.collection}
        </span>
        <span className="absolute right-3 top-3 text-[10px] tabular-nums text-white/45">
          0{index + 1}
        </span>

        <span className="absolute inset-x-0 bottom-0 p-4">
          <span className="flex items-end justify-between gap-2">
            <span>
              <span className="block font-display text-[19px] leading-tight text-cream sm:text-[21px]">
                {wallpaper.title}
              </span>
              <span className="mt-1 block max-w-[95%] text-[11px] leading-snug text-sand/55 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:translate-y-1.5 sm:group-hover:translate-y-0">
                {wallpaper.blurb}
              </span>
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-cream/80 backdrop-blur-md transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d=" M3 13 13 3M13 3H6m7 0v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
          <span className="mt-3 flex items-center gap-1.5">
            {wallpaper.palette.map((swatch) => (
              <span
                key={swatch.hex}
                className="h-1.5 w-1.5 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: swatch.hex }}
              />
            ))}
            <span className="ml-auto text-[11px] text-cream/70">{money(wallpaper.price)}</span>
          </span>
        </span>
      </span>
    </button>
  );
}

function BuyCollectionButton() {
  const { add } = usePack();
  return (
    <button
      type="button"
      onClick={() => add(collectionItem())}
      className="group flex shrink-0 items-center gap-2 rounded-full bg-cream px-6 py-3 text-[13px] font-medium text-ink transition hover:bg-amber"
    >
      Get all 8
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        <path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function Lightbox({
  list,
  index,
  onClose,
  onNavigate,
}: {
  list: Wallpaper[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const piece = list[index];
  const { add, items } = usePack();
  const inPack = items.some(
    (item) => item.id === piece.slug || item.id === "collection" || item.id === "studio",
  );

  const step = useCallback(
    (direction: number) => {
      onNavigate((index + direction + list.length) % list.length);
    },
    [index, list.length, onNavigate],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, step]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${piece.title}`}
      className="fixed inset-0 z-[85] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl animate-[rise_.4s_cubic-bezier(0.22,1,0.36,1)_both] flex-col overflow-y-auto rounded-2xl border border-cream/12 bg-[#0b0b0f] shadow-2xl lg:flex-row lg:overflow-hidden">
        <div className="relative shrink-0 bg-black/40 lg:flex-1">
          <img
            key={piece.slug}
            src={imagePath(piece.slug, "full")}
            alt={piece.title}
            className="mx-auto max-h-[44vh] w-full animate-[fade-in_.35s_ease_both] object-contain lg:max-h-[88vh] lg:h-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous piece"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/45 text-cream/80 backdrop-blur transition hover:bg-white/15 hover:text-cream"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[10px] tabular-nums tracking-[0.16em] text-white/70 backdrop-blur">
              {index + 1} / {list.length}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next piece"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/45 text-cream/80 backdrop-blur transition hover:bg-white/15 hover:text-cream"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col overflow-y-auto p-6 sm:p-8 lg:w-[24rem]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label text-[10px] text-amber">{piece.collection}</p>
              <h3 className="mt-2.5 font-display text-4xl leading-none tracking-tight">
                {piece.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/60 transition hover:border-cream/40 hover:text-cream"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-sand/70">{piece.story}</p>

          <div className="mt-6">
            <p className="label text-[9px] text-sand/40">Palette</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {piece.palette.map((swatch) => (
                <span
                  key={swatch.hex}
                  title={`${swatch.name} ${swatch.hex}`}
                  className="flex items-center gap-1.5 rounded-full border border-cream/10 py-1 pl-1 pr-2.5"
                >
                  <span className="h-4 w-4 rounded-full ring-1 ring-white/10" style={{ backgroundColor: swatch.hex }} />
                  <span className="text-[10px] text-sand/60">{swatch.name}</span>
                </span>
              ))}
            </div>
          </div>

          <ul className="mt-6 space-y-2 border-t border-cream/10 pt-5 text-[12px] text-sand/60">
            {["4K phone + 5K desktop files", "Tablet crops included", "Personal licence"].map((line) => (
              <li key={line} className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-amber" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-2 pt-7">
            <button
              type="button"
              disabled={inPack}
              onClick={() =>
                add({
                  id: piece.slug,
                  title: piece.title,
                  meta: `${piece.collection} · 4K & 5K · personal licence`,
                  price: piece.price,
                  image: imagePath(piece.slug, "thumb"),
                })
              }
              className="flex w-full items-center justify-center gap-2 rounded-full bg-cream px-5 py-3 text-[13px] font-medium text-ink transition hover:bg-amber disabled:cursor-default disabled:bg-cream/15 disabled:text-cream/60"
            >
              {inPack ? "Already in your pack" : "Add this piece"}
              {!inPack && <span className="text-ink/45">{money(piece.price)}</span>}
            </button>
            <button
              type="button"
              onClick={() => add(collectionItem())}
              className="w-full rounded-full border border-cream/15 px-5 py-3 text-[13px] text-sand/80 transition hover:border-cream/35 hover:text-cream"
            >
              Or take all 8 for {money(collectionPrice)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
