/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/', // リダイレクト元のURL
        destination: '/mypage', // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
    ]
  },
}

module.exports = nextConfig
