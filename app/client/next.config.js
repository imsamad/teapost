/** @type {import('next').NextConfig} */

const path = require('path');
module.exports = {
  // basePath: "https://www.example.com/docs",
  images: {
    domains: ['res.cloudinary.com', 'source.unsplash.com', '*'],
  },
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
