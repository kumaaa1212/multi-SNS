/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['rzdzcpquxmwuusgpppri.supabase.co', 'adoraxymvctdnwofvyep.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://tokotokoj-jyps54qck-kumaaa1212.vercel.app',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'OPTIONS, POST GET, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
