import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Choose your night",
    body: "Preview every piece full-screen, read its story, and pick the ones that feel like yours.",
  },
  {
    number: "02",
    title: "Checkout in a minute",
    body: "One payment, no subscription. Cards, UPI, Apple Pay and PayPal through a secure checkout.",
  },
  {
    number: "03",
    title: "Download & set",
    body: "Your files arrive instantly — phone, tablet and desktop crops, sorted into tidy folders.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 border-t border-cream/10 pt-10 sm:flex-row sm:items-end">
          <div>
            <p className="label flex items-center gap-3 text-amber">
              <span className="h-px w-10 bg-amber/50" /> How it works
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.9rem)] leading-tight tracking-[-0.02em]">
              From browsing to lock screen in <em className="italic text-sand/80">three minutes</em>.
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-sand/45">
            No account required, no app to install, no files locked behind a
            subscription.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 100} className="group bg-ink">
              <div className="relative h-full p-6 transition-colors duration-500 hover:bg-coal/80 sm:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl leading-none tracking-tight text-cream/15 transition-colors duration-500 group-hover:text-amber/50">
                    {step.number}
                  </span>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="text-sand/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-amber" aria-hidden="true">
                    <path d="M2 8h11m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-sand/55">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
