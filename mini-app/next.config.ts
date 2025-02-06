import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ...require(`./config/${process.env.APP_ENV || 'develop'}.json`)
  },
};

export default nextConfig;
