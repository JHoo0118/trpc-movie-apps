import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/trpc/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/trpc/:path*`,
      },
    ];
  },
};

export default nextConfig;
