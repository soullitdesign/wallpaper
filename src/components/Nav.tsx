"use client";

import { useEffect, useState } from "react";
import { usePack } from "@/lib/pack-context";
import { collectionPrice, imagePath } from "@/lib/wallpapers";

const links = [
  { label: "The works", href: "#works" },
  { label: "Every screen", href: "#screens" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#faq" },
];

export function collectionItem() {
  return {
    id: "collection",
    title: "The Midnight Collection",
    meta: "All 8 pieces · 4K & 5K · lifetime updates",
    price: collectionPrice,
    image: imagePath("the-last-waltz", "thumb"),
  };
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open, add } = usePack();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-cream/10 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Nocturne home">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="text-amber transition-transform duration-500 group-hover:-rotate-12">
            <path d="M20.8 3.2a12.4 12.4 0 1 0 7.5 16.6A10.2 10.2 0 0 1 20.8 3.2Z" fill="currentColor" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[19px] tracking-[0.02em]">Nocturne</span>
            <span className="mt-0.5 text-[8px] uppercase tracking-[0.32em] text-sand/50">Studio</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[13px] text-sand/75 transition hover:text-cream"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-amber transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={open}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition hover:border-cream/35 hover:text-cream"
            aria-label={`Open pack, ${count} items`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-amber px-1 text-[10px] font-semibold text-ink">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => add(collectionItem())}
            className="hidden items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-[13px] font-medium text-ink transition hover:bg-amber sm:flex"
          >
            Get the collection
            <span className="text-ink/50">${collectionPrice}</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-cream/10 bg-ink/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          menuOpen ? "max-h-[420px]" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="px-6 py-5" aria-label="Mobile">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline justify-between border-b border-cream/[0.07] py-4 font-display text-2xl text-cream/90 transition hover:text-amber"
            >
              {link.label}
              <span className="text-[10px] tracking-[0.2em] text-sand/35">0{index + 1}</span>
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              add(collectionItem());
            }}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-cream px-5 py-3.5 text-sm font-medium text-ink"
          >
            Get the collection · ${collectionPrice}
          </button>
        </nav>
      </div>
    </header>
  );
}
