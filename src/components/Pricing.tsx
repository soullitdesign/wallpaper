"use client";

import Reveal from "@/components/Reveal";
import { usePack } from "@/lib/pack-context";
import { collectionPackItem, collectionPrice, imagePath, money, studioPrice } from "@/lib/wallpapers";

const tiers = [
  {
    id: "single",
    name: "One piece",
    price: 4,
    tagline: "For the one you can't scroll past.",
    features: [
      "1 wallpaper of your choice",
      "4K phone + 5K desktop files",
      "Tablet crops included",
      "Personal licence",
      "Instant download",
    ],
    cta: "Browse the pieces",
    href: "#works",
  },
  {
    id: "collection",
    name: "The Collection",
    price: collectionPrice,
    tagline: "All eight nights, plus everything still to come.",
    features: [
      "All 8 pieces in this volume",
      "Every future volume included",
      "Phone, tablet & desktop crops",
      "Personal licence",
      "Lifetime updates",
      "Save $13 versus singles",
    ],
    cta: "Get the collection",
    featured: true,
  },
  {
    id: "studio",
    name: "Studio licence",
    price: studioPrice,
    tagline: "For designers, streamers and small studios.",
    features: [
      "Everything in The Collection",
      "Commercial licence",
      "8K print-resolution files",
      "Use in client & content work",
      "Invoice provided",
      "Priority support",
    ],
    cta: "Get studio access",
  },
] as const;

export default function Pricing() {
  const { add, items } = usePack();

  return (
    <section id="pricing" className="relative scroll-mt-20 py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(233,168,76,0.09),transparent)] blur-[70px]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label flex items-center justify-center gap-3 text-amber">
            <span className="h-px w-8 bg-amber/50" /> Simple pricing <span className="h-px w-8 bg-amber/50" />
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.8rem)] leading-[1.02] tracking-[-0.025em] text-balance">
            Pay once. <em className="italic text-sand/85">Keep the night</em>.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-sand/65">
            No subscriptions, no credits, no watermarks. Buy a single piece or
            take the whole collection — the files are yours either way.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
          {tiers.map((tier, index) => {
            const featured = "featured" in tier && tier.featured;
            const inPack = items.some((item) => item.id === tier.id);
            return (
              <Reveal key={tier.id} delay={index * 100}>
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-6 sm:p-7 ${
                    featured
                      ? "border border-amber/40 bg-gradient-to-b from-amber/[0.10] via-coal to-coal shadow-[0_30px_80px_-30px_rgba(233,168,76,0.25)] lg:-mt-4 lg:pb-9 lg:pt-8"
                      : "border border-cream/10 bg-coal/50"
                  }`}
                >
                  {featured && (
                    <span className="absolute right-6 top-6 rounded-full bg-amber px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Most loved
                    </span>
                  )}

                  <p className="text-[13px] font-medium text-sand/80">{tier.name}</p>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-display text-[3.4rem] leading-none tracking-[-0.03em]">
                      {money(tier.price)}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-sand/40">
                      one time
                    </span>
                  </div>
                  <p className="mt-2 min-h-[2.5rem] text-[13px] leading-relaxed text-sand/55">
                    {tier.tagline}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-cream/10 pt-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px] text-sand/75">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className={`mt-[2px] shrink-0 ${featured ? "text-amber" : "text-sand/40"}`} aria-hidden="true">
                          <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    {tier.id === "single" ? (
                      <a
                        href="#works"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-cream/20 px-5 py-3 text-[13px] text-cream transition hover:border-cream/45 hover:bg-cream/[0.05]"
                      >
                        {tier.cta}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          add(
                            tier.id === "collection"
                              ? collectionPackItem()
                              : {
                                  id: "studio",
                                  title: "Studio Licence",
                                  meta: "Commercial use · 8K files · all volumes",
                                  price: studioPrice,
                                  image: imagePath("neon-promenade", "thumb"),
                                },
                          )
                        }
                        className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-medium transition ${
                          featured
                            ? "bg-amber text-ink hover:bg-amber-soft"
                            : "bg-cream text-ink hover:bg-amber"
                        }`}
                      >
                        {inPack ? "In your pack" : tier.cta}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-sand/45">
          <span className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-amber/80" aria-hidden="true">
              <path d="M12 3 4.5 6v6c0 4.3 3.1 7.6 7.5 9 4.4-1.4 7.5-4.7 7.5-9V6L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Secure checkout
          </span>
          <span className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-amber/80" aria-hidden="true">
              <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Instant delivery
          </span>
          <span className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-amber/80" aria-hidden="true">
              <path d="M20 12a8 8 0 1 1-2.6-5.9M20 3v4h-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            30-day love-it guarantee
          </span>
        </Reveal>
      </div>
    </section>
  );
}
