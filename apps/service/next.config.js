/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const nextConfig = {
  experimental: {
    // serverActions: true,
    // esmExternals: 'loose',
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'd1wdpf820bqp3t.cloudfront.net',
      'link-graph.s3.ap-northeast-2.amazonaws.com',
      'lh3.googleusercontent.com',
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
