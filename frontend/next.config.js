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
        source: '/api/auth/login', // 修正: 特定のエンドポイントに対する設定
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://tokotokoj-219o0k6yx-kumaaa1212.vercel.app',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'OPTIONS, POST, GET, PUT, DELETE', // 修正: HTTPメソッドの間にスペースを追加
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
