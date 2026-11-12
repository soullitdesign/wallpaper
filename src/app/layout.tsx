import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";
const siteUrl="https://soullitdesign.github.io/wallpaper";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:"Soullit Design — Wallpapers & Digital Art",description:"Illustrated worlds for the spaces you look at most. Explore eight original atmospheric digital wallpapers by Soullit Design.",alternates:{canonical:"/"},openGraph:{title:"Soullit Design — Wallpapers & Digital Art",description:"Explore original illustrated wallpapers and digital artwork from Soullit Design.",url:siteUrl,siteName:"Soullit Design",type:"website",images:["/wallpaper/img/wallpapers/the-last-waltz-card.webp"]},twitter:{card:"summary_large_image",title:"Soullit Design — Wallpapers & Digital Art",description:"Explore original illustrated wallpapers and digital artwork from Soullit Design.",images:["/wallpaper/img/wallpapers/the-last-waltz-card.webp"]},robots:{index:true,follow:true}};
export const viewport:Viewport={themeColor:"#eae8e1",width:"device-width",initialScale:1};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
