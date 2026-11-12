const columns = [
  {
    title: "Shop",
    links: ["The collection", "Individual pieces", "Studio licence", "Free wallpaper"],
  },
  {
    title: "Studio",
    links: ["Our story", "The process", "Licensing", "Changelog"],
  },
  {
    title: "Support",
    links: ["FAQ", "Download help", "Refunds", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-cream/10">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="text-amber">
                <path d="M20.8 3.2a12.4 12.4 0 1 0 7.5 16.6A10.2 10.2 0 0 1 20.8 3.2Z" fill="currentColor" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl">Nocturne</span>
                <span className="mt-1 text-[8px] uppercase tracking-[0.3em] text-sand/45">Studio</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-sand/50">
              Original illustrated wallpapers for people who are at their best
              after dark. Painted in Bengaluru, set all over the world.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { label: "Instagram", icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" /></> },
                { label: "X", icon: <path d="M4 4l16 16M20 4 4 20" /> },
                { label: "Dribbble", icon: <><circle cx="12" cy="12" r="8.5" /><path d="M5.5 8.5c5 1.5 9.5 1.5 13-1M4.5 15c4.5-4 9-4.5 14-1M9 4.2c3.5 4 5.5 9.5 5.5 15.6" /></> },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#top"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-cream/12 text-sand/55 transition hover:border-amber/50 hover:text-amber"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="label text-[9px] text-sand/35">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href={column.title === "Support" && link === "FAQ" ? "#faq" : column.title === "Shop" ? "#works" : "#top"}
                        className="text-[13px] text-sand/65 transition hover:text-cream"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-[11px] text-sand/35 sm:flex-row sm:items-center">
          <p>© 2026 Nocturne Studio. All artwork remains the property of the artist.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#top" className="transition hover:text-sand/70">Licence</a>
            <a href="#top" className="transition hover:text-sand/70">Privacy</a>
            <a href="#top" className="transition hover:text-sand/70">Terms</a>
            <span className="flex items-center gap-1.5 text-sand/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" /> All systems quiet
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
