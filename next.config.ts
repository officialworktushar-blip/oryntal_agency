import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    // Lint errors (like no-explicit-any) will not block production builds.
    ignoreDuringBuilds: true,
  },
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

