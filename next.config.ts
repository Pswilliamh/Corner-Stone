
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      // Allow requests from the Firebase Studio Cloud Workstation origin
      'https://9003-firebase-studio-1747193779037.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
