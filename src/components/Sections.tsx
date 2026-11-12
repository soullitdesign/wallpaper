import { money, wallpapers } from "@/lib/wallpapers";
import { Reveal } from "./Reveal";
import { Ribbon, Squiggle, Star, Sunflower } from "@/lib/stickers";

const steps = [
  {
    n: "I",
    title: "Pick your night",
    body: "Browse the collection or the bundle. Every piece comes with its story and full colour palette.",
  },
  {
    n: "II",
    title: "Pay once, own it",
    body: "Secure checkout by card, Apple Pay or UPI. No subscription, no watermark, no fine print.",
  },
  {
    n: "III",
    title: "Download in seconds",
    body: "A zipped 5K pack lands instantly — phone, tablet, desktop and print-ready crops, all included.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 overflow-hidden border-y border-cream/8 px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_80%_10%,rgba(21,29,67,0.9),transparent_70%)]" />
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">The ritual</p>
            <h2 className="mt-4 font-display text-[clamp(2.3rem,4.6vw,3.5rem)] leading-[1.02]">
              Three minutes
              <br />
              from browsing
              <br />
              <em className="italic text-amber-soft">to owning.</em>
            </h2>
            <p className="mt-6 max-w-sm text-[0.93rem] leading-relaxed text-cream-dim">
              Built for people who want the art on their screen tonight, not a licence agreement
              to read first.
            </p>
            <div className="mt-8 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-cream-muted">
              <Star size={11} className="text-amber-glow" />
              Instant delivery, worldwide
            </div>
          </Reveal>

          <div className="relative">
            <ol className="space-y-0">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 110}>
                  <li className="group grid grid-cols-[36px_1fr] gap-4 border-t border-cream/10 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[72px_1fr] sm:gap-8">
                    <span className="font-display text-[1.6rem] leading-none text-amber-glow/70 transition-colors group-hover:text-amber-glow">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.55rem] leading-tight">{s.title}</h3>
                      <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed text-cream-dim">
                        {s.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Ribbon className="mt-6 h-4 w-full text-crimson-500/45" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function BundleBanner() {
  const picks = ["candlelight-waltz", "the-last-train", "rooftop-reverie"];
  const arts = picks.map((p) => wallpapers.find((w) => w.slug === p)!);
  const singles = arts.reduce((n, a) => n + a.price, 0);
  const saving = money(singles - 1200);

  return (
    <section id="bundle" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-28">
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-[1.4rem] border border-cream/12 bg-ink-800">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 120% at 88% 50%, rgba(217,156,117,0.16), transparent 60%), radial-gradient(60% 100% at 0% 100%, rgba(136,42,39,0.4), transparent 65%)",
            }}
          />
          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:p-16">
            <div>
              <div className="flex items-center gap-3">
                <Sunflower className="h-5 w-5 text-amber-bright" />
                <p className="eyebrow">The Triptych bundle</p>
              </div>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[1]">
                Three nights,
                <br />
                one <em className="italic text-amber-soft">long look.</em>
              </h2>
              <p className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-cream-dim">
                Choose any three pieces and pay {money(1200)} instead of {money(singles)} — a{" "}
                <span className="text-amber-soft">{saving} saving</span>, plus every crop in the pack.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#collection" className="btn btn-primary">
                  Build my bundle
                </a>
                <span className="text-[0.72rem] uppercase tracking-[0.16em] text-cream-muted">
                  Applied automatically at checkout
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {arts.map((a, i) => (
                <div
                  key={a.slug}
                  className={`relative w-1/3 overflow-hidden rounded-[4px] border border-cream/15 shadow-[0_24px_50px_-22px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:-translate-y-2 ${
                    i === 1 ? "translate-y-4" : ""
                  }`}
                  style={{ aspectRatio: "4 / 5" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/img/wallpapers/${a.slug}-card.webp`}
                    alt={a.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <Squiggle className="absolute inset-x-0 bottom-3 mx-auto h-3 w-40 text-cream/15" />
        </div>
      </Reveal>
    </section>
  );
}
