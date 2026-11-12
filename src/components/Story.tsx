import Reveal from "@/components/Reveal";
import { imagePath } from "@/lib/wallpapers";

const stats = [
  { value: "08", label: "pieces in Vol. 04" },
  { value: "03", label: "crops per piece" },
  { value: "∞", label: "future updates" },
];

export default function Story() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-[440px]">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[1.4rem] border border-cream/10"
            />
            <div className="relative overflow-hidden rounded-[1.1rem]">
              <img
                src={imagePath("candlelight-waltz", "full")}
                alt="Candlelight Waltz — two figures walking through a lamplit city in the rain"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-xl border border-white/10 bg-black/35 p-4 backdrop-blur-md">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-amber/90">Plate 03</p>
                  <p className="mt-1 font-display text-lg leading-tight">Candlelight Waltz</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">Vol. 04</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <p className="label flex items-center gap-3 text-amber">
            <span className="h-px w-10 bg-amber/50" /> From the studio
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.1rem,4.3vw,3.7rem)] leading-[1.03] tracking-[-0.025em] text-balance">
            We paint the hours
            <br />
            <em className="italic text-sand/85">nobody photographs</em>.
          </h2>
          <div className="mt-6 max-w-lg space-y-4 text-sm leading-relaxed text-sand/65 sm:text-[15px]">
            <p>
              Nocturne began as a folder of private sketches — the walk home
              after the last train, a rooftop at 2 a.m., a party that refused to
              end. Scenes that feel more like memory than photography.
            </p>
            <p>
              Every volume is painted around a single palette: midnight blues,
              sodium lamplight, a little crimson. That is why any two pieces can
              share a screen without fighting each other.
            </p>
            <p className="text-cream/85">
              We keep the collection small on purpose. Eight nights a season —
              each one worth looking at a thousand times.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-cream/10 pt-7">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl leading-none tracking-tight text-cream">{stat.value}</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-sand/40">{stat.label}</p>
              </div>
            ))}
            <div className="ml-auto hidden items-center gap-3 sm:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-amber/30 bg-amber/10 font-display text-sm italic text-amber">
                N
              </span>
              <p className="text-[11px] leading-relaxed text-sand/40">
                Painted in Bengaluru,
                <br />
                between midnight and 3 a.m.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
