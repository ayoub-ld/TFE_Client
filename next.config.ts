import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  },
  reactStrictMode: true,
  
};

export default nextConfig;
