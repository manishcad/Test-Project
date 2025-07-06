/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client'],
  webpack: (config) => {
    config.externals = [...(config.externals || []), '@prisma/client'];
    return config;
  },
};

export default nextConfig;
