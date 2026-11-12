const phrases = [
  "4K & 5K retina files",
  "Original illustrations",
  "Phone · tablet · desktop",
  "OLED-ready contrast",
  "One payment, forever",
  "Lifetime updates",
  "Instant download",
];

export default function Marquee() {
  return (
    <div className="relative border-y border-cream/[0.08] bg-coal/40 py-4">
      <div className="edge-fade overflow-hidden">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {phrases.map((phrase) => (
                <Item key={`${copy}-${phrase}`} label={phrase} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Item({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-8 whitespace-nowrap px-8 text-[11px] uppercase tracking-[0.26em] text-sand/50">
      {label}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-amber/70" aria-hidden="true">
        <path d="M15.4 2.4a9.6 9.6 0 1 0 6.2 13.2A7.9 7.9 0 0 1 15.4 2.4Z" />
      </svg>
    </span>
  );
}
