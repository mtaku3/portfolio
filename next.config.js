/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: "/assets/**",
      },
    ],
  },
  i18n: {
    locales: ["ja"],
    defaultLocale: "ja",
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
