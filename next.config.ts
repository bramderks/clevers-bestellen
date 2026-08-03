import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  experimental: {
    optimizePackageImports: [
      "jspdf",
      "pdf-lib",
      "react-chartjs-2",
    ],
  },
};

export default nextConfig;