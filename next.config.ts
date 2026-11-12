import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["@fontsource-variable/fraunces"],
  },
};

export default nextConfig;
