import Reveal from "@/components/Reveal";
import { DesktopMock, PhoneMock, TabletMock } from "@/components/DeviceMocks";
import { wallpapers } from "@/lib/wallpapers";

const features = [
  {
    title: "Cropped, not squashed",
    body: "Every piece ships with phone, tablet and desktop crops composed for each aspect ratio.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    title: "Sharp on any display",
    body: "4K for your pocket, 5K for the desk. Files stay crisp on OLED and Retina alike.",
    icon: (
      <>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="3.4" />
      </>
    ),
  },
  {
    title: "Quiet on the eyes",
    body: "Deep blacks and low-contrast corners, designed to disappear behind your icons.",
    icon: (
      <>
        <path d="M20.5 15.2A8.6 8.6 0 0 1 9 3.5a8.8 8.8 0 1 0 11.5 11.7Z" />
      </>
    ),
  },
];

export default function Showcase() {
  return (
    <section id="screens" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(28,53,80,0.5),transparent)] blur-[80px]" />
      </div>

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <Reveal>
          <p className="label flex items-center gap-3 text-amber">
            <span className="h-px w-10 bg-amber/50" /> Fits what you own
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.7rem)] leading-[1.03] tracking-[-0.025em] text-balance">
            One artwork.
            <br />
            <em className="italic text-sand/85">Every screen</em> you own.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-sand/65 sm:text-[15px]">
            Buy once and dress the whole room — lock screen, tablet, laptop,
            the spare monitor. No subscriptions, no watermarks, no “pro” upsell.
          </p>

          <ul className="mt-9 space-y-5">
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/12 bg-cream/[0.04] text-amber">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {feature.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-medium text-cream">{feature.title}</p>
                  <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-sand/55">{feature.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative mx-auto h-[430px] w-full max-w-[620px] sm:h-[500px]">
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-1/2 h-24 w-[86%] -translate-x-1/2 rounded-[50%] bg-amber/15 blur-[60px]"
            />

            <div
              className="absolute left-0 top-2 w-[86%] animate-float"
              style={{ "--tilt": "-3deg" } as React.CSSProperties}
            >
              <DesktopMock wallpaper={wallpapers[4]} />
            </div>

            <div
              className="absolute bottom-0 left-[3%] z-20 w-[31%] max-w-[180px] animate-float"
              style={{ "--tilt": "4deg", animationDelay: "-3s" } as React.CSSProperties}
            >
              <TabletMock wallpaper={wallpapers[5]} />
            </div>

            <div
              className="absolute bottom-[4%] right-[2%] z-30 w-[25%] max-w-[150px] animate-float"
              style={{ "--tilt": "7deg", animationDelay: "-6s" } as React.CSSProperties}
            >
              <PhoneMock wallpaper={wallpapers[3]} compact />
            </div>

            <div className="absolute -right-1 top-0 flex items-center gap-2 rounded-full border border-cream/15 bg-ink/70 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-sand/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              3 crops included
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
