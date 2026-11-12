"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { collectionItem } from "@/components/Nav";
import { usePack } from "@/lib/pack-context";
import { collectionPrice, money } from "@/lib/wallpapers";

export default function Closing() {
  const { add } = usePack();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  return (
    <section className="relative px-3 pb-16 pt-6 sm:px-5">
      <Reveal>
        <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[1.75rem] border border-cream/12">
          <img
            src="/img/wallpapers/neon-promenade-full.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover object-[60%_35%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07070a]/96 via-[#07070a]/85 to-[#07070a]/35" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#07070a] via-transparent to-[#07070a]/50" />

          <div className="grid gap-10 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-14 lg:py-20">
            <div className="max-w-xl">
              <p className="label flex items-center gap-3 text-amber">
                <span className="h-px w-10 bg-amber/60" /> One last thing
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.3rem)] leading-[0.98] tracking-[-0.03em] text-balance">
                Stay up a little
                <br />
                <em className="italic text-amber">longer</em>.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-sand/70 sm:text-[15px]">
                Eight painted nights, ready for every screen you own. One
                payment, instant download, and every future volume on the house.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => add(collectionItem())}
                  className="group flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-amber"
                >
                  Get the collection · {money(collectionPrice)}
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    <path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <a
                  href="#works"
                  className="flex items-center justify-center rounded-full border border-cream/25 px-7 py-3.5 text-sm text-cream/90 backdrop-blur transition hover:border-cream/50 hover:bg-white/5"
                >
                  Keep browsing
                </a>
              </div>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-cream/12 bg-black/35 p-6 backdrop-blur-md sm:p-7 lg:ml-auto">
              <p className="font-display text-xl leading-snug">
                Or take a free wallpaper, on the house.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-sand/60">
                One new piece lands in your inbox every new moon. No spam — just
                the occasional beautiful thing.
              </p>

              {status === "done" ? (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber/30 bg-amber/10 px-4 py-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-amber" aria-hidden="true">
                    <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-[13px] text-cream/90">
                    You&apos;re in. Your first piece is on its way.
                  </p>
                </div>
              ) : (
                <form onSubmit={subscribe} className="mt-5" noValidate>
                  <div className="flex items-center gap-2 rounded-full border border-cream/20 bg-black/30 p-1.5 pl-4 transition focus-within:border-amber/60">
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setStatus("idle");
                      }}
                      placeholder="you@wherever.com"
                      aria-label="Email address"
                      className="min-w-0 flex-1 bg-transparent py-2 text-[13px] text-cream placeholder:text-sand/35 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-ink transition hover:bg-amber"
                      aria-label="Subscribe"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="mt-2 pl-1 text-[11px] text-ember">
                      That address doesn&apos;t look quite right — mind checking it?
                    </p>
                  )}
                  <p className="mt-3 pl-1 text-[10px] text-sand/35">
                    Unsubscribe whenever. We never share your address.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
