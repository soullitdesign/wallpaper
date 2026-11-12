import type { MetadataRoute } from "next";
import { wallpapers } from "@/lib/wallpapers";

const base = "https://nocturne.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/wishlist`, changeFrequency: "monthly", priority: 0.3 },
    ...wallpapers.map((w) => ({
      url: `${base}/wallpaper/${w.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
