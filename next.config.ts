import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    qualities: [100],
  },
}

export default nextConfig
