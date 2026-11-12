import Link from "next/link";
import { money } from "@/lib/wallpapers";
import { Crescent, Moon, Star, Sunflower } from "@/lib/stickers";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 lg:pb-24 lg:pt-16">
      {/* back glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 62% 30%, rgba(28,39,75,0.85) 0%, rgba(7,11,28,0) 70%), radial-gradient(45% 40% at 12% 78%, rgba(136,42,39,0.28) 0%, rgba(7,11,28,0) 70%)",
        }}
      />

      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        {/* left: copy */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="flex h-7 items-center gap-2 rounded-full border border-amber-glow/30 bg-amber-glow/8 px-3 text-[0.62rem] uppercase tracking-[0.2em] text-amber-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-bright" />
              Volume I — After Hours
            </span>
          </div>

          <h1 className="mt-7 font-display text-[clamp(3.1rem,7.3vw,5.6rem)] leading-[0.9] tracking-[-0.03em]">
            Wallpaper
            <br />
            for the hours
            <br />
            <span className="relative inline-block italic text-amber-soft">
              after everyone
              <Crescent className="absolute -right-9 -top-2 hidden h-8 w-8 text-amber-glow/60 sm:block" />
            </span>
            <br />
            leaves.
          </h1>

          <p className="mt-7 max-w-[30rem] text-[0.98rem] leading-[1.75] text-cream-dim">
            Cinema-lit wallpapers in midnight blue and candle crimson — painted and colour-graded
            for the quiet people, the late walkers, and anyone whose lock screen deserves a story.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#collection" className="btn btn-primary">
              Explore the collection
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
            <a href="#bundle" className="btn btn-ghost">
              Get the bundle · {money(1200)}
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-cream/10 pt-6">
            {[
              { k: "5K", v: "Master files" },
              { k: "18", v: "Crops included" },
              { k: "Vol. I", v: "First collection" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-[1.6rem] leading-none text-cream">{s.k}</dt>
                <dd className="mt-1.5 text-[0.66rem] uppercase tracking-[0.16em] text-cream-muted">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right: art cluster */}
        <div className="relative mx-auto w-full sm:max-w-[460px] lg:max-w-none">
          <div className="relative">
            {/* main frame */}
            <Link
              href="/wallpaper/the-last-waltz"
              className="group relative block overflow-hidden rounded-[3px] border border-cream/12 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.95)]"
            >
              <div className="relative" style={{ aspectRatio: "4 / 4.7" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/wallpapers/the-last-waltz-card.webp"
                  alt="The Last Waltz — a woman in a red dress dancing at a party under string lights"
                  width={720}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  fetchPriority="high"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/20" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-end gap-1.5 p-4 pl-[42%] text-right sm:gap-2 sm:p-5 sm:pl-[46%]">
                <p className="text-[0.58rem] uppercase tracking-[0.24em] text-amber-glow">
                  Featured piece
                </p>
                <p className="font-display text-xl leading-tight sm:text-2xl">The Last Waltz</p>
                <span className="rounded-full bg-cream/95 px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-900">
                  {money(600)}
                </span>
              </div>
            </Link>

            {/* floating mini card */}
            <Link
              href="/wallpaper/sunflowers-at-midnight"
              className="group absolute -bottom-12 -left-10 w-[30%] overflow-hidden rounded-[3px] border border-cream/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)] sm:-left-12"
            >
              <div style={{ aspectRatio: "4 / 5" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/wallpapers/sunflowers-at-midnight-card.webp"
                  alt="Sunflowers at Midnight — a man in a suit holding a bouquet at night"
                  width={720}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* sticker details */}
            <Star
              size={20}
              className="absolute -right-3 top-6 animate-[spin_18s_linear_infinite] text-amber-bright/80 sm:-right-5"
            />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-cream/20 bg-ink-950/55 px-3 py-2 backdrop-blur-md">
              <Sunflower className="h-4 w-4 text-amber-bright" />
              <span className="text-[0.6rem] uppercase tracking-[0.14em] text-cream/90">
                Painted &amp; colour-graded
              </span>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between gap-4 sm:mt-14">
            <Moon className="h-4 w-4 text-cream/30" />
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-cream-muted">
              Down to the last window
            </p>
            <span className="h-px flex-1 bg-cream/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
