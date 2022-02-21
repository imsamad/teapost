/** @type {import('next').NextConfig} */
const path = require('path');
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
  webpack: (config) => {
    config.resolve.alias['#axios'] = path.join(__dirname, 'lib/axios');
    return config;
  },
};
