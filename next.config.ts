import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old duplicate URLs point to one canonical page, so search engines don't split ranking between them
  async redirects() {
    return [
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
