/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/auth/login',
        destination: '/auth',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth',
        permanent: true,
      },
    ];
  },
};
