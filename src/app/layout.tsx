import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";

const siteUrl = "https://soullitdesign.github.io/wallpaper";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Soullit Design — Independent Art Studio",
  description: "An independent art studio creating digital wallpapers and visual stories. Explore the Soullit Design collection and request your next wallpaper.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Soullit Design — Independent Art Studio",
    description: "Digital wallpapers and visual stories, made to make the everyday feel a little less ordinary.",
    url: siteUrl, siteName: "Soullit Design", type: "website",
    images: ["/wallpaper/img/wallpapers/the-last-waltz-card.webp"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Soullit Design — Independent Art Studio",
    description: "Explore original digital wallpapers and visual stories.",
    images: ["/wallpaper/img/wallpapers/the-last-waltz-card.webp"]
  },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { themeColor: "#090909", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
