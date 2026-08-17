import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/archive",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
