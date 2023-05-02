const { parsed: localEnv } = require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: localEnv.API_URL,
  },
}

module.exports = nextConfig
