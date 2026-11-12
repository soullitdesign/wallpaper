"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cartCount, hydrateStore, useCart } from "@/lib/store";
import { CartDrawer } from "./CartDrawer";
import { Moon, Star } from "@/lib/stickers";

const nav = [
  { href: "/#collection", label: "Collection" },
  { href: "/#how", label: "How it works" },
  { href: "/#licensing", label: "Licensing" },
  { href: "/#about", label: "Studio" },
];

export function Header() {
  const lines = useCart();
  const count = cartCount(lines);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    hydrateStore();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-cream/10 bg-ink-900/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Nocturne Studio home">
            <Moon className="h-5 w-5 text-amber-glow transition-transform duration-700 group-hover:-rotate-12" />
            <span className="font-display text-[1.32rem] leading-none tracking-tight">
              Nocturne
              <span className="ml-1.5 font-sans text-[0.55rem] align-super tracking-[0.3em] text-amber-glow/90">
                STUDIO
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-[0.8rem] tracking-[0.06em] text-cream-dim transition-colors hover:text-cream"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/wishlist"
              className="hidden items-center gap-2 rounded-full border border-cream/15 px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-cream-dim transition-colors hover:border-amber-glow/50 hover:text-amber-soft sm:flex"
            >
              <Star size={11} /> Saved
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex shrink-0 items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-900 transition-all hover:bg-white"
              aria-label={`Open cart, ${count} items`}
            >
              Cart
              <span
                className={`grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[0.62rem] font-semibold tabular-nums transition-colors ${
                  count > 0 ? "bg-crimson-600 text-cream" : "bg-ink-900/10 text-ink-700"
                }`}
              >
                {count}
              </span>
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/15 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-[9px] w-[17px]">
                <span
                  className={`absolute left-0 h-px w-full bg-cream transition-all duration-300 ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-cream transition-all duration-300 ${
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* mobile sheet */}
        <div
          className={`overflow-hidden border-t border-cream/10 bg-ink-900/97 backdrop-blur-xl transition-[max-height,opacity] duration-500 md:hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-6 pb-8 pt-2" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/8 py-4 font-display text-[1.6rem] text-cream last:border-0"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="py-4 font-display text-[1.6rem] text-amber-glow"
            >
              Saved pieces
            </Link>
          </nav>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
