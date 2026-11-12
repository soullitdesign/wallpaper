import Link from "next/link";
import { Moon } from "@/lib/stickers";

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink-950 px-5 pb-8 pt-16 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Moon className="h-5 w-5 text-amber-glow" />
              <span className="font-display text-[1.35rem] leading-none">
                Nocturne
                <span className="ml-1.5 align-super font-sans text-[0.55rem] tracking-[0.3em] text-amber-glow/90">
                  STUDIO
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[0.85rem] leading-relaxed text-cream-muted">
              Hand-painted wallpapers for the hours after everyone leaves. Made in Bengaluru,
              delivered everywhere.
            </p>
            <div className="mt-6 flex gap-2">
              {["Instagram", "Pinterest", "Behance"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-cream/12 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.12em] text-cream-muted transition-colors hover:border-amber-glow/50 hover:text-amber-soft"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { label: "All wallpapers", href: "/#collection" },
              { label: "Triptych bundle", href: "/#bundle" },
              { label: "Saved pieces", href: "/wishlist" },
              { label: "Gift cards", href: "/#bundle" },
            ]}
          />
          <FooterCol
            title="Studio"
            links={[
              { label: "About", href: "/#about" },
              { label: "Licensing", href: "/#licensing" },
              { label: "Contact", href: "mailto:hello@nocturne.studio" },
              { label: "Press kit", href: "#" },
            ]}
          />
          <FooterCol
            title="Fine print"
            links={[
              { label: "Terms", href: "#" },
              { label: "Privacy", href: "#" },
              { label: "Refunds", href: "/#about" },
              { label: "Artist terms", href: "#" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/8 pt-7 pb-2 sm:flex-row">
          <p className="text-[0.7rem] tracking-wide text-cream-muted">
            © {new Date().getFullYear()} Nocturne Studio. Every pixel painted by hand.
          </p>
          <div className="flex items-center gap-4 text-[0.7rem] text-cream-muted">
            <span>Visa</span>
            <span className="h-3 w-px bg-cream/15" />
            <span>Mastercard</span>
            <span className="h-3 w-px bg-cream/15" />
            <span>UPI</span>
            <span className="h-3 w-px bg-cream/15" />
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-sans text-[0.62rem] uppercase tracking-[0.22em] text-cream-muted">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-[0.85rem] text-cream-dim transition-colors hover:text-amber-soft"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
