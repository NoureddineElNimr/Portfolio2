import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // Strip all console.* calls in production builds
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    turbopackUseSystemTlsCerts: true,
    // Tree-shake framer-motion so only used exports are bundled
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;