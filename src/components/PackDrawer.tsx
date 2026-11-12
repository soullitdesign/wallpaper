"use client";

import { useEffect, useState } from "react";
import { usePack } from "@/lib/pack-context";
import { money } from "@/lib/wallpapers";

export default function PackDrawer({ lastAdded }: { lastAdded: string | null }) {
  const { items, total, isOpen, close, remove } = usePack();
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (items.length === 0) setPlaced(false);
  }, [items.length]);

  return (
    <div
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`fixed inset-0 z-[80] ${isOpen ? "" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label="Close pack"
        onClick={close}
        tabIndex={isOpen ? 0 : -1}
        className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your pack"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[27rem] flex-col border-l border-cream/10 bg-[#0b0b0f] shadow-[-30px_0_80px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5">
          <div>
            <p className="label text-amber">Your pack</p>
            <p className="mt-1 font-display text-xl">
              {items.length === 0
                ? "Nothing here yet"
                : `${items.length} ${items.length === 1 ? "item" : "items"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition hover:border-cream/40 hover:text-cream"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-amber/40 bg-amber/10 text-amber">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="mt-6 font-display text-3xl">Order confirmed.</h3>
            <p className="mt-3 text-sm leading-relaxed text-sand/70">
              This is a demo checkout, but a real one would land here: your download
              link and a receipt, delivered in seconds.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-8 rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber"
            >
              Back to the gallery
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-cream/15 text-sand/60">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
            <h3 className="mt-6 font-display text-2xl">Your pack is empty</h3>
            <p className="mt-2 text-sm text-sand/60">
              Add a single piece, or take the whole collection for $19.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-7 rounded-full border border-cream/20 px-6 py-3 text-sm text-cream transition hover:border-amber hover:text-amber"
            >
              Browse the works
            </button>
          </div>
        ) : (
          <>
            {lastAdded && (
              <p className="border-b border-cream/5 bg-amber/[0.06] px-6 py-2.5 text-xs text-amber/90">
                “{lastAdded}” added to your pack
              </p>
            )}
            <ul className="flex-1 divide-y divide-cream/[0.07] overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <img
                    src={item.image}
                    alt=""
                    className="h-20 w-16 shrink-0 rounded-md object-cover ring-1 ring-cream/10"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg leading-tight">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-sand/55">{item.meta}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-cream">{money(item.price)}</span>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-[11px] uppercase tracking-[0.14em] text-sand/45 transition hover:text-ember"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-cream/10 px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-sand/70">Subtotal</span>
                <span className="font-display text-2xl">{money(total)}</span>
              </div>
              <p className="mt-2 text-xs text-sand/45">
                Instant download · 4K &amp; 5K files · lifetime updates
              </p>
              <button
                type="button"
                onClick={() => setPlaced(true)}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-amber"
              >
                Checkout — {money(total)}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  <path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="mt-3 text-center text-[11px] text-sand/35">
                Demo checkout — no payment is taken.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
