/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  serverExternalPackages: ['@prisma/client', 'prisma']
}

module.exports = nextConfig
