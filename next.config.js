/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/smart/kango',
  eslint: {
    dirs: ['src'],
  },
  skipMiddlewareUrlNormalize: false,
  reactStrictMode: true,
  swcMinify: true,

  pageExtensions: ['page.tsx', 'api.ts', 'page.ts', 'api.tsx'],

  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
