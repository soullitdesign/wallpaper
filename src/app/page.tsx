import { Hero } from "@/components/Hero";
import { CollectionGrid } from "@/components/CollectionGrid";
import { HowItWorks, BundleBanner } from "@/components/Sections";
import { Licensing } from "@/components/Licensing";
import { Testimonials, AboutAndFaq } from "@/components/About";
import { Newsletter } from "@/components/Newsletter";
import { Reveal } from "@/components/Reveal";
import { Star, Sunflower } from "@/lib/stickers";

const marqueeWords = [
  "midnight blue",
  "candle crimson",
  "5K master files",
  "eighteen crops",
  "instant download",
  "hand painted",
  "printed in Bengaluru",
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* marquee band */}
      <div className="marquee relative overflow-hidden border-y border-cream/10 bg-ink-850/60 py-3.5">
        <div className="marquee-track items-center gap-8">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-8 pr-8">
              {marqueeWords.map((w) => (
                <span key={w} className="flex shrink-0 items-center gap-8">
                  <span className="whitespace-nowrap text-[0.68rem] uppercase tracking-[0.26em] text-cream-muted">
                    {w}
                  </span>
                  <Star size={9} className="text-amber-glow/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <CollectionGrid />
      <HowItWorks />
      <BundleBanner />
      <Licensing />

      {/* pull quote */}
      <section className="px-5 py-24 sm:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Sunflower className="mx-auto h-6 w-6 text-amber-bright/80" />
          <blockquote className="mt-7 font-display text-[clamp(1.55rem,3.6vw,2.6rem)] leading-[1.25] italic text-cream/95">
            “I always think there is something beautiful about the moment a room empties. All the
            heat leaves, but the light stays a little longer.”
          </blockquote>
          <p className="mt-7 text-[0.66rem] uppercase tracking-[0.26em] text-cream-muted">
            The artist · on Volume I
          </p>
        </Reveal>
      </section>

      <Testimonials />
      <AboutAndFaq />
      <Newsletter />
    </>
  );
}
