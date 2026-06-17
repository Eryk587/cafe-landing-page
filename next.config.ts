import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'd8j0ntlcm91z4.cloudfront.net' },
    ],
  },
};

export default nextConfig;
