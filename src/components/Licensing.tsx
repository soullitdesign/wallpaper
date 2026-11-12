import { licences, money } from "@/lib/wallpapers";
import { Reveal } from "./Reveal";
import { Star } from "@/lib/stickers";

const formats = [
  { name: "iPhone", detail: "9:16 · 1290×2796", w: 34, h: 68 },
  { name: "Android", detail: "9:20 · 1440×3200", w: 32, h: 66 },
  { name: "Desktop", detail: "16:9 · 5120×2880", w: 62, h: 36 },
  { name: "iPad", detail: "4:3 · 2732×2048", w: 52, h: 40 },
];

export function Licensing() {
  return (
    <section
      id="licensing"
      className="relative scroll-mt-24 border-y border-cream/8 bg-ink-850 px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Licensing</p>
          <h2 className="mt-4 font-display text-[clamp(2.3rem,4.8vw,3.6rem)] leading-[1.02]">
            Buy it for your phone.
            <br />
            Or for your <em className="italic text-amber-soft">whole brand.</em>
          </h2>
          <p className="mt-5 max-w-lg text-[0.94rem] leading-relaxed text-cream-dim">
            Two simple licences, no hidden clauses. Personal keeps it on your own screens —
            Extended lets it work in yours.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {licences.map((lic, i) => (
            <Reveal key={lic.id} delay={i * 120}>
              <div
                className={`relative h-full overflow-hidden rounded-2xl border p-8 sm:p-10 ${
                  lic.id === "extended"
                    ? "border-amber-glow/35 bg-[linear-gradient(155deg,#151d43_0%,#0a0d1f_65%)]"
                    : "border-cream/12 bg-ink-900"
                }`}
              >
                {lic.id === "extended" && (
                  <span className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-amber-glow/35 bg-amber-glow/10 px-3 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-amber-soft">
                    <Star size={9} /> Most flexible
                  </span>
                )}
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-cream-muted">
                  {lic.name} licence
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[3rem] leading-none">{money(600)}</span>
                  <span className="text-sm text-cream-muted">
                    {lic.id === "extended" ? "base × 2.4" : "per piece"}
                  </span>
                </div>
                <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed text-cream-dim">
                  {lic.blurb}
                </p>
                <ul className="mt-7 space-y-3 border-t border-cream/10 pt-6">
                  {lic.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[0.87rem] text-cream-dim">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-0.5 h-4 w-4 shrink-0 text-amber-glow"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 8.6l3.2 3.2L13.4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-[0.68rem] uppercase tracking-[0.16em] text-cream-muted">
                  Scope · {lic.maxSeats}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* formats strip */}
        <Reveal delay={160} className="mt-16">
          <div className="flex flex-col gap-8 rounded-2xl border border-cream/10 bg-ink-900/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="max-w-xs">
              <p className="eyebrow">Every screen</p>
              <h3 className="mt-3 font-display text-[1.7rem] leading-tight">
                One purchase, eighteen crops.
              </h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-cream-muted">
                Re-cropped by hand so nothing important ends up behind your clock.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {formats.map((f) => (
                <div
                  key={f.name}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-cream/10 bg-ink-850/80 p-4 transition-colors hover:border-amber-glow/40"
                >
                  <div className="flex h-[74px] items-end">
                    <div
                      className="rounded-[4px] border border-cream/35 bg-gradient-to-br from-ink-600 to-ink-800 shadow-[inset_0_0_18px_rgba(217,156,117,0.18)] transition-colors group-hover:border-amber-glow/60"
                      style={{ width: f.w, height: f.h }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[0.72rem] font-medium text-cream">{f.name}</p>
                    <p className="mt-0.5 text-[0.6rem] tabular-nums text-cream-muted">{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
