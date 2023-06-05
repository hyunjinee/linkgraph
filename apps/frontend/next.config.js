/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'd1wdpf820bqp3t.cloudfront.net',
      'link-graph.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

module.exports = nextConfig;
