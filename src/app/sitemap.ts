import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://soullitdesign.github.io/wallpaper/", lastModified: new Date("2026-11-12"), changeFrequency: "monthly", priority: 1 }];
}
