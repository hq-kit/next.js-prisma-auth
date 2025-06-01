import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    experimental: {
        viewTransition: true
    },
    serverExternalPackages: ['@prisma/client', 'prisma'],
    webpack: (config, { isServer }) => {
        if (isServer) config.plugins = [...config.plugins, new PrismaPlugin()]
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'www.gravatar.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net'
            }
        ]
    }
}

export default nextConfig
