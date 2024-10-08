/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: '@import "/styles/mixins.scss";',
  },
  output: 'standalone',
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'image.openmoviedb.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'avatars.mds.yandex.net',
        port: ''
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;