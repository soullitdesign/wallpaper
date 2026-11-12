import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";
const siteUrl="https://soullitdesign.github.io/wallpaper";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:"Nocturne Studio — Wallpapers for the in-between",description:"Illustrated worlds for the spaces you look at most. Explore eight original atmospheric digital wallpapers by Nocturne Studio.",alternates:{canonical:"/"},openGraph:{title:"Nocturne Studio — Wallpapers for the in-between",description:"Eight original illustrated wallpapers, thoughtfully made for your everyday.",url:siteUrl,siteName:"Nocturne Studio",type:"website",images:["/wallpaper/img/wallpapers/the-last-waltz-card.webp"]},twitter:{card:"summary_large_image",title:"Nocturne Studio — Wallpapers for the in-between",description:"Eight original illustrated wallpapers, thoughtfully made for your everyday.",images:["/wallpaper/img/wallpapers/the-last-waltz-card.webp"]},robots:{index:true,follow:true}};
export const viewport:Viewport={themeColor:"#eae8e1",width:"device-width",initialScale:1};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
