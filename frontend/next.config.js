/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rzdzcpquxmwuusgpppri.supabase.co'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/', // リダイレクト元のURL
        destination: '/home', // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // 圧縮無効
          },
        },
      ],
    });
    return config;
  },
}

module.exports = nextConfig
