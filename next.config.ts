import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ubfix.com" }],
        destination: "https://ubfix.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;