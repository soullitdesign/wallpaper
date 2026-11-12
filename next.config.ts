import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/wallpaper",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
};
export default nextConfig;
