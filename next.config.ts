import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'newcdn.amanata.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
