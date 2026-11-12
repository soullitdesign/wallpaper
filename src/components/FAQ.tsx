"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    question: "What exactly do I get when I buy?",
    answer:
      "A tidy folder per piece with three crops — 4K phone, tablet, and 5K desktop — supplied as high-quality WebP and PNG. Everything is named by collection so it stays organised on your device.",
  },
  {
    question: "Will these fit my phone or monitor?",
    answer:
      "They are composed for the formats most people actually own: 9:19.5 phones (iPhone and Android), 3:4 tablets, and 16:10 / 21:9 desktops. Every crop is reframed by hand, not stretched from a single file.",
  },
  {
    question: "Can I use the wallpapers commercially?",
    answer:
      "The Collection comes with a personal licence — great for your own devices, gifts and personal posts. If you want to use them in client work, streams, thumbnails or products, the Studio licence covers commercial use.",
  },
  {
    question: "Do future volumes cost extra?",
    answer:
      "Not with The Collection. Every new volume we release is added to your library automatically and free — you pay for the collection once. Studio licences include future volumes as well.",
  },
  {
    question: "How do I set a wallpaper?",
    answer:
      "On iPhone: Photos → share → Use as Wallpaper. On Android: Gallery → three dots → Set as wallpaper. On desktop, right-click the file and choose Set as desktop background. Sizes are documented in the download note.",
  },
  {
    question: "What if it isn't for me?",
    answer:
      "Write to us within 30 days and we'll refund you in full, no interrogation. You keep whichever files you already downloaded; we'd rather have a happy night owl than a reluctant one.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="label flex items-center gap-3 text-amber">
            <span className="h-px w-10 bg-amber/50" /> Questions
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.03] tracking-[-0.025em]">
            Everything else,
            <br />
            <em className="italic text-sand/85">answered</em>.
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/60">
            Still unsure about something? We answer every message ourselves,
            usually within a day.
          </p>
          <a
            href="mailto:hello@nocturne.studio"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-cream/20 px-5 py-2.5 text-[13px] text-cream transition hover:border-amber hover:text-amber"
          >
            hello@nocturne.studio
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>

        <Reveal delay={100}>
          <ul className="border-t border-cream/10">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <li key={faq.question} className="border-b border-cream/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="flex gap-4">
                      <span className="mt-0.5 text-[10px] tabular-nums tracking-[0.16em] text-sand/30">
                        0{index + 1}
                      </span>
                      <span className={`text-[15px] leading-snug transition-colors ${isOpen ? "text-cream" : "text-sand/85 group-hover:text-cream"}`}>
                        {faq.question}
                      </span>
                    </span>
                    <span
                      className={`relative mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-amber/60 bg-amber/10 text-amber"
                          : "border-cream/15 text-sand/50 group-hover:border-cream/35"
                      }`}
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 pl-9 pr-10 text-[13.5px] leading-relaxed text-sand/60">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
