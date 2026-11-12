"use client";

import { useEffect, useState } from "react";
import { DesktopMock, PhoneMock } from "@/components/DeviceMocks";
import { usePack } from "@/lib/pack-context";
import { collectionPackItem, collectionPrice, imagePath, money, wallpapers } from "@/lib/wallpapers";

const avatars = [
  { initials: "AM", from: "#E9A84C", to: "#8C3B27" },
  { initials: "JR", from: "#5C7CA8", to: "#152441" },
  { initials: "SK", from: "#C87A6A", to: "#5A2830" },
  { initials: "NL", from: "#C9B48C", to: "#4A4436" },
];

export default function Hero() {
  const [index, setIndex] = useState(4);
  const [paused, setPaused] = useState(false);
  const { add } = usePack();
  const active = wallpapers[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % wallpapers.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section id="top" className="relative isolate overflow-hidden pb-10 pt-[104px] sm:pt-[126px] lg:pb-14">
      {/* ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[22rem] left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full opacity-70 blur-[110px] transition-colors duration-[1200ms]"
          style={{ background: `radial-gradient(closest-side, ${active.palette[1].hex}40, transparent)` }}
        />
        <div className="absolute -right-32 top-24 h-[26rem] w-[26rem] rounded-full bg-ember/10 blur-[130px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/15 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
        {/* ── copy ───────────────────────────────────────────── */}
        <div className="relative z-10 max-w-2xl">
          <div
            className="inline-flex animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both] items-center gap-2.5 rounded-full border border-cream/12 bg-cream/[0.03] py-1.5 pl-2 pr-4 text-[11px] text-sand/80 backdrop-blur"
            style={{ animationDelay: "60ms" }}
          >
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-amber/15">
              <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-amber/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            New — Midnight Collection, Vol. 04
          </div>

          <h1
            className="mt-6 animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_both] font-display text-[clamp(2.9rem,6.4vw,5.4rem)] leading-[0.94] tracking-[-0.03em] text-balance"
            style={{ animationDelay: "140ms" }}
          >
            Wallpapers painted
            <br className="hidden sm:block" /> for the{" "}
            <em className="relative whitespace-nowrap text-amber italic">
              quiet hours
              <svg
                className="absolute -bottom-2 left-0 w-full text-amber/40"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M2 8c60-6 130-6 200-2 34 2 68 3 96 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </em>
            .
          </h1>

          <p
            className="mt-7 max-w-xl animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_both] text-[15px] leading-relaxed text-sand/75 sm:text-base"
            style={{ animationDelay: "220ms" }}
          >
            Eight original illustrations for your phone, tablet and desktop —
            deep midnight blues, warm lamplight, and a story in every scene.
            One payment. Yours forever.
          </p>

          <div
            className="mt-9 flex animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_both] flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "300ms" }}
          >
            <button
              type="button"
              onClick={() => add(collectionPackItem())}
              className="group flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-amber"
            >
              Get the collection
              <span className="text-ink/45 transition-colors group-hover:text-ink/60">
                {money(collectionPrice)}
              </span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#works"
              className="flex items-center justify-center gap-2 rounded-full border border-cream/20 px-7 py-3.5 text-sm text-cream/90 transition hover:border-cream/45 hover:bg-cream/[0.04]"
            >
              Explore the works
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div
            className="mt-9 flex animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_both] flex-wrap items-center gap-x-5 gap-y-3"
            style={{ animationDelay: "380ms" }}
          >
            <div className="flex -space-x-2.5">
              {avatars.map((avatar) => (
                <span
                  key={avatar.initials}
                  className="grid h-8 w-8 place-items-center rounded-full border border-ink text-[9px] font-semibold tracking-wide text-white/90"
                  style={{ background: `linear-gradient(140deg, ${avatar.from}, ${avatar.to})` }}
                >
                  {avatar.initials}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="flex gap-0.5 text-amber" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <svg key={star} width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1L7.3 14 2.5 9.5l6.6-.9 2.9-6Z" />
                    </svg>
                  ))}
                </span>
                <span className="text-xs font-medium text-cream">4.9</span>
                <span className="text-xs text-sand/50">· 1,240 night owls</span>
              </div>
              <p className="mt-0.5 text-[11px] text-sand/40">Instant download · 4K &amp; 5K · lifetime updates</p>
            </div>
          </div>
        </div>

        {/* ── device stage ───────────────────────────────────── */}
        <div
          className="relative animate-[rise_1s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "260ms" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto h-[440px] w-full max-w-[540px] sm:h-[510px] lg:h-[540px]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[62%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[70px] transition-colors duration-1000"
              style={{ background: active.palette[1].hex }}
            />

            <div
              className="absolute right-0 top-[2%] z-10 w-[82%] animate-float sm:w-[84%]"
              style={{ "--tilt": "-4deg" } as React.CSSProperties}
            >
              <DesktopMock wallpaper={active} priority />
              <div className="mt-4 flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.2em] text-sand/40">
                <span className="h-px w-8 bg-cream/20" /> desktop · 5K
              </div>
            </div>

            <div className="absolute bottom-0 left-0 z-20 w-[47%] max-w-[212px] rotate-[3deg] sm:left-[2%] sm:w-[39%]">
              <PhoneMock wallpaper={active} compact priority />
              <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-sand/40">
                <span className="h-px w-8 bg-cream/20" /> phone · 4K
              </div>
            </div>

            {/* preview caption */}
            <div className="absolute bottom-0 right-0 z-30 w-[50%] max-w-[232px]">
              <div className="rounded-2xl border border-cream/12 bg-[#0c0c10]/85 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <p className="label text-[9px] text-amber/90">Now previewing</p>
                <p className="mt-1.5 font-display text-lg leading-tight text-cream">{active.title}</p>
                <div className="mt-2.5 flex items-center justify-between border-t border-cream/10 pt-2.5">
                  <span className="text-[11px] text-sand/50">{active.collection}</span>
                  <span className="text-[12px] text-cream">{money(active.price)}</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  {active.palette.map((swatch) => (
                    <span
                      key={swatch.hex}
                      className="h-1.5 flex-1 rounded-full ring-1 ring-white/10"
                      style={{ backgroundColor: swatch.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* thumbnail selector */}
          <div className="mt-1 flex items-center justify-center gap-2 sm:mt-0">
            <div className="no-scrollbar flex max-w-full items-center gap-2 overflow-x-auto px-1 py-1">
              {wallpapers.map((wallpaper, thumbIndex) => (
                <button
                  key={wallpaper.slug}
                  type="button"
                  onClick={() => {
                    setIndex(thumbIndex);
                    setPaused(true);
                  }}
                  aria-label={`Preview ${wallpaper.title}`}
                  aria-pressed={thumbIndex === index}
                  className={`relative h-11 w-9 shrink-0 overflow-hidden rounded-[5px] transition-all duration-300 ${
                    thumbIndex === index
                      ? "scale-105 ring-2 ring-amber ring-offset-2 ring-offset-ink"
                      : "opacity-45 hover:opacity-90"
                  }`}
                >
                  <img
                    src={imagePath(wallpaper.slug, "thumb")}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <p className="mt-2.5 text-center text-[10px] uppercase tracking-[0.24em] text-sand/30">
            08 pieces — tap to preview
          </p>
        </div>
      </div>
    </section>
  );
}
