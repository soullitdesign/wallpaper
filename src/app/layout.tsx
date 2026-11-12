import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nocturne.studio"),
  title: "Nocturne — Wallpapers painted for after dark",
  description:
    "Original night-lit illustrations for your phone, tablet and desktop. 4K & 5K, instant download, one payment, yours forever.",
  keywords: [
    "digital wallpapers",
    "phone wallpaper",
    "desktop wallpaper",
    "illustrated wallpaper",
    "4K wallpapers",
    "art wallpaper pack",
  ],
  authors: [{ name: "Nocturne Studio" }],
  openGraph: {
    title: "Nocturne — Wallpapers painted for after dark",
    description:
      "Original night-lit illustrations for your phone, tablet and desktop. 4K & 5K, instant download.",
    type: "website",
    siteName: "Nocturne Studio",
    images: [{ url: "/img/wallpapers/the-last-waltz-card.webp", width: 900, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nocturne — Wallpapers painted for after dark",
    description:
      "Original night-lit illustrations for your phone, tablet and desktop. 4K & 5K, instant download.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain">{children}</body>
    </html>
  );
}
