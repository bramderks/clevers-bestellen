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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-App-Name",
            value: "Clevers Bestellen",
          },
          {
            key: "X-App-Version",
            value: "0.1.0",
          },
          {
            key: "X-Copyright",
            value: "© 2026 B. Derks Holding",
          },
          {
            key: "X-License",
            value: "Proprietary",
          },
        ],
      },
    ];
  },
};

export default nextConfig;