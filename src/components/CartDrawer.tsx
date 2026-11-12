"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bundlePrice, licences, money, wallpapers } from "@/lib/wallpapers";
import { cartCount, clearCart, removeLine, useCart } from "@/lib/store";
import { Crescent, Squiggle, Star } from "@/lib/stickers";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lines = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const [promo, setPromo] = useState("");
  const [promoState, setPromoState] = useState<"idle" | "ok" | "bad">("idle");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);

  const detailed = lines.map((l) => {
    const art = wallpapers.find((w) => w.slug === l.slug);
    const lic = licences.find((x) => x.id === l.licence)!;
    const unit = Math.round((art?.price ?? 0) * lic.priceMultiplier);
    return { ...l, art, lic, unit, total: unit * l.qty };
  });

  const count = cartCount(lines);
  const subtotal = detailed.reduce((n, l) => n + l.total, 0);

  // Bundle rule: every complete set of three *personal* pieces costs bundlePrice.
  // Extended-licence pieces always stay at their own price.
  const personalUnits = detailed
    .filter((l) => l.licence === "personal")
    .flatMap((l) => Array.from({ length: l.qty }, () => l.unit))
    .sort((a, b) => b - a);
  const bundleGroups = Math.floor(personalUnits.length / 3);
  let bundleSavingsCents = 0;
  for (let g = 0; g < bundleGroups; g++) {
    const group = personalUnits.slice(g * 3, g * 3 + 3);
    bundleSavingsCents += Math.max(0, group.reduce((n, p) => n + p, 0) - bundlePrice);
  }
  const bundleSavings = bundleGroups > 0 ? money(bundleSavingsCents) : null;
  const promoDiscount = promoState === "ok" ? Math.round((subtotal - bundleSavingsCents) * 0.15) : 0;
  const discount = bundleSavingsCents + promoDiscount;
  const payable = Math.max(0, subtotal - discount);
  const personalCount = personalUnits.length;
  const toNextBundle = 3 - (personalCount % 3);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    if (!code) return;
    setPromoState(code === "NOCTURNE15" ? "ok" : "bad");
  }

  async function checkout() {
    setPlacing(true);
    // Demo checkout — swap this for Stripe Checkout / Lemon Squeezy / Gumroad.
    await new Promise((r) => setTimeout(r, 1500));
    const id = `NCT-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setPlaced(id);
    clearCart();
    setPlacing(false);
  }

  function close() {
    onClose();
    setTimeout(() => setPlaced(null), 400);
  }

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-400 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-ink-950/75 backdrop-blur-[3px]"
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-cream/12 bg-ink-900 shadow-[-40px_0_80px_-40px_rgba(0,0,0,0.9)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5">
          <div>
            <p className="eyebrow">Your night</p>
            <h2 className="mt-1 font-display text-2xl">
              {placed ? "Order in" : count > 0 ? `${count} piece${count > 1 ? "s" : ""}` : "Cart"}
            </h2>
          </div>
          <button
            onClick={close}
            className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream-dim transition-colors hover:border-cream/40 hover:text-cream"
            aria-label="Close cart"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="relative mb-6 grid h-16 w-16 place-items-center rounded-full border border-amber-glow/40 bg-amber-glow/10">
              <Crescent className="h-7 w-7 text-amber-glow" />
            </div>
            <h3 className="font-display text-2xl">Goodnight, art lover.</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-dim">
              Order <span className="text-amber-soft">{placed}</span> is confirmed. A download
              link and your licence certificate are on the way to your inbox.
            </p>
            <p className="mt-6 rounded-lg border border-cream/12 bg-ink-850 px-4 py-3 text-[0.7rem] uppercase tracking-[0.16em] text-cream-muted">
              Demo checkout — no payment taken
            </p>
            <button onClick={close} className="btn btn-ghost mt-8">
              Keep browsing
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <Crescent className="h-10 w-10 text-cream/25" />
            <h3 className="mt-5 font-display text-xl text-cream">Nothing here yet</h3>
            <p className="mt-2 max-w-[260px] text-sm text-cream-muted">
              Add a piece you keep coming back to. Three or more unlocks the bundle price.
            </p>
            <Link href="/#collection" onClick={close} className="btn btn-primary mt-7">
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {detailed.map((line) => (
                  <li key={`${line.slug}-${line.licence}`} className="flex gap-4">
                    <Link
                      href={`/wallpaper/${line.slug}`}
                      onClick={close}
                      className="relative block h-[92px] w-[72px] shrink-0 overflow-hidden rounded-[5px] border border-cream/12"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/img/wallpapers/${line.slug}-thumb.webp`}
                        alt={line.art?.title ?? ""}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-display text-[1.05rem] leading-tight">
                            {line.art?.title}
                          </p>
                          <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.16em] text-amber-glow/80">
                            {line.lic.name}
                          </p>
                        </div>
                        {line.licence === "extended" && (
                          <span className="shrink-0 rounded-full bg-amber-glow/12 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.12em] text-amber-soft">
                            Commercial
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          onClick={() => removeLine(line.slug, line.licence)}
                          className="link-underline text-[0.68rem] uppercase tracking-[0.14em] text-cream-muted transition-colors hover:text-crimson-400"
                        >
                          Remove
                        </button>
                        <span className="text-sm tabular-nums text-cream">{money(line.total)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-xl border border-dashed border-cream/15 p-4">
                {bundleSavings ? (
                  <p className="flex items-start gap-2 text-[0.78rem] leading-relaxed text-amber-soft">
                    <Star size={12} className="mt-1 shrink-0 text-amber-bright" />
                    Bundle applied — you are paying {money(bundlePrice)} per three instead of{" "}
                    {money(bundlePrice + bundleSavingsCents)}. Saving {bundleSavings}.
                  </p>
                ) : (
                  <p className="flex items-start gap-2 text-[0.78rem] leading-relaxed text-cream-dim">
                    <Star size={12} className="mt-1 shrink-0 text-amber-glow" />
                    Add {toNextBundle} more personal{" "}
                    {toNextBundle === 1 ? "piece" : "pieces"} and any three cost{" "}
                    {money(bundlePrice)} — that is {money(3 * 600 - bundlePrice)} off.
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="promo"
                  className="mb-2 block text-[0.68rem] uppercase tracking-[0.16em] text-cream-muted"
                >
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    value={promo}
                    onChange={(e) => {
                      setPromo(e.target.value);
                      setPromoState("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                    placeholder="Try NOCTURNE15"
                    className="field"
                  />
                  <button onClick={applyPromo} className="btn btn-ghost shrink-0 px-5">
                    Apply
                  </button>
                </div>
                {promoState === "bad" && (
                  <p className="mt-2 text-[0.72rem] text-crimson-400">
                    That code is not on the guest list.
                  </p>
                )}
                {promoState === "ok" && (
                  <p className="mt-2 text-[0.72rem] text-amber-soft">15% off applied — nicely done.</p>
                )}
              </div>
            </div>

            <div className="border-t border-cream/10 bg-ink-850/80 px-6 py-5">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-cream-dim">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-cream">{money(subtotal)}</span>
                </div>
                {bundleSavingsCents > 0 && (
                  <div className="flex justify-between text-amber-soft">
                    <span>
                      Triptych bundle{bundleGroups > 1 ? ` ×${bundleGroups}` : ""}
                    </span>
                    <span className="tabular-nums">−{money(bundleSavingsCents)}</span>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-amber-soft">
                    <span>Promo · NOCTURNE15</span>
                    <span className="tabular-nums">−{money(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-cream-dim">
                  <span>Delivery</span>
                  <span className="text-amber-glow">Instant download</span>
                </div>
                <Squiggle className="my-2 h-3 w-full text-cream/20" />
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cream-muted">
                    Total
                  </span>
                  <span className="font-display text-2xl tabular-nums">{money(payable)}</span>
                </div>
              </div>
              <button
                onClick={checkout}
                disabled={placing}
                className="btn btn-crimson mt-4 w-full disabled:opacity-70"
              >
                {placing ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border border-cream/40 border-t-cream" />
                    Placing order…
                  </>
                ) : (
                  <>Checkout · {money(payable)}</>
                )}
              </button>
              <p className="mt-3 text-center text-[0.66rem] leading-relaxed text-cream-muted">
                Demo checkout · connect Stripe or Lemon Squeezy to take real payments
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
