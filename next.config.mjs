/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: [],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: false,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    // Optimize production builds
    swcMinify: true,
    // Enable compression
    compress: true,
    // Optimize fonts
    optimizeFonts: true,
    // React strict mode for better development
    reactStrictMode: true,
    // Optimize framer-motion bundle
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Tree-shake framer-motion for better performance
            config.resolve.alias = {
                ...config.resolve.alias,
            };
        }
        return config;
    },
};

export default nextConfig;
