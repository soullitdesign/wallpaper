"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { Squiggle, Star } from "@/lib/stickers";

const quotes = [
  {
    body: "I have bought wallpaper packs before. This is the first one where the lock screen made a stranger ask what album it was from.",
    name: "Ayaan R.",
    role: "Bengaluru",
  },
  {
    body: "The midnight blue is not flat black at all. On an OLED it glows like the painting is lit from inside.",
    name: "Mira K.",
    role: "Designer, Berlin",
  },
  {
    body: "Ordered the triptych for a studio wall. Printed at A2 and not a single banding issue. Genuinely beautiful work.",
    name: "Tomas L.",
    role: "Photographer, Lisbon",
  },
];

const faqs = [
  {
    q: "What exactly do I get after paying?",
    a: "A download link with a master 5K file plus eighteen hand-made crops — iPhone, Android, iPad, desktop and a print-ready A2 PDF. Delivered instantly, valid forever.",
  },
  {
    q: "How are the pieces made?",
    a: "Each wallpaper is painted, composited and colour-graded in-studio using a mix of traditional digital brushwork and AI-assisted passes — then hand-cropped, sharpened and profiled for every screen. Either way, a human signs off on the light.",
  },
  {
    q: "Can I use it commercially?",
    a: "Pick the Extended licence at checkout and yes — social, print, video, merchandise, as long as you are not reselling the files as wallpaper. Personal covers your own devices only.",
  },
  {
    q: "Refunds?",
    a: "Digital files cannot be un-sent, so sales are final. If a file is broken or the download fails, write to us and it is fixed or refunded the same day.",
  },
];

export function Testimonials() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">On their screens</p>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,4.2vw,3.1rem)] leading-tight">
                Quietly obsessed, <em className="italic text-amber-soft">they said.</em>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-amber-bright">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} />
              ))}
              <span className="ml-1 text-[0.74rem] tracking-wider text-cream-dim">
                Early reader notes from Volume I
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 110}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-cream/10 bg-ink-850/70 p-7 transition-colors hover:border-cream/20">
                <blockquote className="text-[0.94rem] leading-[1.7] text-cream/90">
                  “{q.body}”
                </blockquote>
                <figcaption className="mt-7 border-t border-cream/10 pt-5">
                  <p className="font-display text-[1.05rem]">{q.name}</p>
                  <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.16em] text-cream-muted">
                    {q.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutAndFaq() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-cream/8 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">The studio</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4.4vw,3.3rem)] leading-[1.02]">
              Painted at night,
              <br />
              for people who
              <br />
              <em className="italic text-amber-soft">stay up too.</em>
            </h2>
            <div className="mt-7 space-y-4 text-[0.93rem] leading-[1.8] text-cream-dim">
              <p>
                Nocturne is a one-person studio. Every wallpaper starts as a rough sketch, then a
                block of blue, then an argument with the light until the room feels lived in.
              </p>
              <p>
                The palette never leaves midnight navy, candle crimson and lamplight amber. It is
                restrictive on purpose — a family of pictures that look like they belong on the same
                wall, and on the same phone.
              </p>
            </div>
            <Squiggle className="mt-8 h-4 w-40 text-crimson-500/60" />
            <div className="mt-8 flex flex-wrap gap-3">
              {["Midnight navy", "Candle crimson", "Lamplight amber"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-cream/15 px-3.5 py-1.5 text-[0.66rem] uppercase tracking-[0.14em] text-cream-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 flex gap-1.5">
              {["#04060E", "#070B1C", "#151D43", "#1C274B", "#882A27", "#B0433C", "#D99C75", "#F0C86A", "#F6EFE4"].map(
                (hex) => (
                  <div key={hex} className="group/swatch relative">
                    <div
                      className="h-11 w-11 rounded-full border border-cream/15 transition-transform duration-400 group-hover/swatch:-translate-y-1 sm:h-12 sm:w-12"
                      style={{ background: hex }}
                    />
                    <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.52rem] tracking-[0.1em] text-cream-muted opacity-0 transition-opacity group-hover/swatch:opacity-100">
                      {hex}
                    </span>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h3 className="mt-4 font-display text-[1.9rem]">The small print, in plain words</h3>
          </Reveal>
          <div className="mt-8 divide-y divide-cream/10 border-y border-cream/10">
            {faqs.map((f) => (
              <Faq key={f.q} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="font-display text-[1.1rem] leading-snug transition-colors group-hover:text-amber-soft">
          {q}
        </span>
        <span
          className={`relative grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cream/20 transition-all duration-300 ${
            open ? "rotate-45 border-amber-glow text-amber-glow" : "text-cream-muted"
          }`}
          aria-hidden="true"
        >
          <span className="absolute h-px w-2.5 bg-current" />
          <span className="absolute h-2.5 w-px bg-current" />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-lg pb-6 pr-8 text-[0.89rem] leading-[1.75] text-cream-dim">{a}</p>
        </div>
      </div>
    </div>
  );
}
