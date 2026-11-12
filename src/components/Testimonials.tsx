import Reveal from "@/components/Reveal";

const quotes = [
  {
    quote:
      "I bought one, then came back for the whole collection the same night. The lock screen gets more compliments than my actual phone.",
    name: "Aarav Mehta",
    handle: "Product designer · Bengaluru",
    initials: "AM",
    gradient: "linear-gradient(140deg,#E9A84C,#8C3B27)",
    featured: true,
  },
  {
    quote:
      "Finally, wallpapers that don't look like a stock photo. The desktop crop is genuinely beautiful on a 5K display.",
    name: "June Park",
    handle: "Illustrator · Seoul",
    initials: "JP",
    gradient: "linear-gradient(140deg,#7C9EC4,#1C3550)",
  },
  {
    quote:
      "Downloaded, set, done. No subscription, no watermark, no nonsense. That's how it should work.",
    name: "Sofia Klein",
    handle: "Photographer · Berlin",
    initials: "SK",
    gradient: "linear-gradient(140deg,#C87A6A,#5A2830)",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="label flex items-center gap-3 text-amber">
              <span className="h-px w-10 bg-amber/50" /> Kind words
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight tracking-[-0.02em]">
              Loved after <em className="italic text-sand/85">dark</em>.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-amber" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg key={index} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1L7.3 14 2.5 9.5l6.6-.9 2.9-6Z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-sand/55">
              <span className="text-cream">4.9 / 5</span> from 1,240 reviews
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((item, index) => (
            <Reveal key={item.name} delay={index * 90} className="h-full">
              <figure
                className={`flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
                  item.featured
                    ? "border-amber/25 bg-gradient-to-br from-amber/[0.09] via-coal to-coal"
                    : "border-cream/10 bg-coal/40"
                }`}
              >
                <svg width="26" height="20" viewBox="0 0 30 24" fill="currentColor" className="text-amber/35" aria-hidden="true">
                  <path d="M0 24V13.6C0 5.4 4.4 1.1 12.6 0l1.2 3.6c-4.1.9-6.1 3.1-6.1 6.5h5V24H0Zm16.6 0V13.6C16.6 5.4 21 1.1 29.2 0l1.2 3.6c-4.1.9-6.1 3.1-6.1 6.5h5V24h-12.7Z" />
                </svg>
                <blockquote className={`mt-5 flex-1 leading-relaxed ${item.featured ? "text-[17px] text-cream/90" : "text-[14px] text-sand/75"}`}>
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-cream/10 pt-5">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-[10px] font-semibold text-white/90"
                    style={{ background: item.gradient }}
                  >
                    {item.initials}
                  </span>
                  <span>
                    <span className="block text-[13px] text-cream">{item.name}</span>
                    <span className="block text-[11px] text-sand/45">{item.handle}</span>
                  </span>
                  <span className="ml-auto flex gap-0.5 text-amber/80" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <svg key={star} width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1L7.3 14 2.5 9.5l6.6-.9 2.9-6Z" />
                      </svg>
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
