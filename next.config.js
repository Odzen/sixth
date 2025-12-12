/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  // Enable React 19 features
  experimental: {
    reactCompiler: false, // Set to true if you want to use React Compiler
  },
};

module.exports = nextConfig;
