require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  env: {
    NEXT_STRAVA_CLIENT_ID: process.env.NEXT_STRAVA_CLIENT_ID,
  },
};

module.exports = nextConfig;
