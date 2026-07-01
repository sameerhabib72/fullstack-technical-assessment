/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
        ],
        // ✅ Force WebP/AVIF format
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        minimumCacheTTL: 86400, // 24 hours cache
        // ✅ Lower quality for better performance
        qualities: [60, 75, 80], // Add lower quality options
    },
    // ✅ Enable compression
    compress: true,
    // ✅ Minify for production
    swcMinify: true,
    // ✅ Remove console logs in production
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },
    // ✅ Optimize for performance
    poweredByHeader: false,
    reactStrictMode: true,
    // ✅ Experimental optimizations
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react', 'axios'],
    },
};

module.exports = nextConfig;