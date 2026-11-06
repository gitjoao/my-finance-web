import type { NextConfig } from "next";

const API_URL = 'https://my-finance-un8m.onrender.com'

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.0.102"],
  async rewrites() {
    if (!API_URL) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;