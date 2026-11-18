import type { NextConfig } from "next";

// Recommended configuration for Vercel deployment.
// - reactStrictMode: surfaces potential React problems during development.
// - No `output: "standalone"` (Vercel handles the Next.js production build).
// - TypeScript errors should be fixed, not ignored.
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
