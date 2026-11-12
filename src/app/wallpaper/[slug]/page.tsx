import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWallpaper, wallpapers } from "@/lib/wallpapers";
import { ProductDetail } from "@/components/ProductDetail";

export function generateStaticParams() {
  return wallpapers.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const art = getWallpaper(slug);
  if (!art) return { title: "Not found" };
  return {
    title: art.title,
    description: `${art.subtitle}. ${art.story}`,
    openGraph: {
      title: `${art.title} · Nocturne Studio`,
      description: art.subtitle,
      images: [{ url: `/img/wallpapers/${art.slug}-card.webp`, width: 720, height: 900 }],
    },
  };
}

export default async function WallpaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const art = getWallpaper(slug);
  if (!art) notFound();

  const related = wallpapers.filter((w) => w.slug !== art.slug && w.collection === art.collection);
  const filler = wallpapers.filter(
    (w) => w.slug !== art.slug && w.collection !== art.collection,
  );

  return <ProductDetail art={art} related={[...related, ...filler].slice(0, 3)} sameCollection={related.length} />;
}
