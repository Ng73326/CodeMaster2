/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable caching to prevent build issues
  experimental: {
    webpackBuildWorker: false,
    parallelServerBuildTraces: false,
    parallelServerCompiles: false,
  },
  // Fix hydration issues
  reactStrictMode: false,
  swcMinify: false,
  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Disable caching in development
    if (dev) {
      config.cache = false;
    }
    
    // Handle style-related issues during SSR
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas', 'jsdom'];
    }
    
    return config;
  },
}

export default nextConfig