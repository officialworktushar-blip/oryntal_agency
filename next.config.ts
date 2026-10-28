import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/services/individual-services",
        destination: "/services/individual-services/software-api-and-system-integration",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

