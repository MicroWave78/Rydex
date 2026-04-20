import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.129'],
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
