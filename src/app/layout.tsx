import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";
const siteUrl="https://soullitdesign.github.io/wallpaper";
export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:"Soullit Design — Wallpaper Library",
  description:"Discover wallpapers and digital illustrations by Soullit Design. Explore atmospheric artwork, find your favourite and download it for your screen.",
  alternates:{canonical:"/"},
  openGraph:{title:"Soullit Design — Wallpaper Library",description:"A curated world of wallpapers and digital illustrations by Soullit Design.",url:siteUrl,siteName:"Soullit Design",type:"website",images:["/wallpaper/img/wallpapers/the-last-waltz-card.webp"]},
  twitter:{card:"summary_large_image",title:"Soullit Design — Wallpaper Library",description:"Discover wallpapers and digital illustrations by Soullit Design.",images:["/wallpaper/img/wallpapers/the-last-waltz-card.webp"]},
  robots:{index:true,follow:true}
};
export const viewport:Viewport={themeColor:"#07142E",width:"device-width",initialScale:1};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
