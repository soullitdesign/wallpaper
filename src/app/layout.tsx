import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoreHydrator } from "@/components/StoreHydrator";

export const metadata: Metadata = {
  metadataBase: new URL("https://nocturne.studio"),
  title: {
    default: "Nocturne Studio — Hand-painted wallpapers for after dark",
    template: "%s · Nocturne Studio",
  },
  description:
    "Cinematic, hand-painted wallpapers in midnight blue, candle crimson and lamplight amber. 5K files and eighteen crops for every screen. Instant download.",
  keywords: [
    "wallpapers",
    "phone wallpaper",
    "desktop wallpaper",
    "midnight blue",
    "hand-painted",
    "digital art",
    "wallpaper pack",
  ],
  openGraph: {
    title: "Nocturne Studio — Wallpaper for the hours after everyone leaves",
    description:
      "Hand-painted wallpapers in midnight blue and candle crimson. 5K files, every crop, instant download.",
    type: "website",
    images: [{ url: "/img/wallpapers/the-last-waltz-card.webp", width: 720, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nocturne Studio",
    description: "Hand-painted wallpapers for after dark.",
    images: ["/img/wallpapers/the-last-waltz-card.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070b1c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="grain antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-900"
        >
          Skip to content
        </a>
        <StoreHydrator />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
