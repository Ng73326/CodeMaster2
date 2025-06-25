/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode to help with hydration
  // Disable font optimization to avoid hydration issues
  optimizeFonts: false,
  // Disable static generation for all pages
  // This helps avoid hydration mismatches with dynamic content
  experimental: {
    // Disable partial pre-rendering
    ppr: false,
  },
  // Add this to help with hydration issues
  compiler: {
    styledComponents: true,
  },
  // Completely disable static optimization for all pages
  // This ensures everything is rendered at request time
  staticPageGenerationTimeout: 0,
  // Add custom webpack config to handle style issues
  webpack: (config, { isServer }) => {
    // Ignore style-related issues during SSR
    if (isServer) {
      config.ignoreWarnings = [{ module: /node_modules\/next-themes/ }]
    }
    return config
  },
}

module.exports = nextConfig

