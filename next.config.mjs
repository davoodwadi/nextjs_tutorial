/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    removeConsole: false,
  },
  experimental: {
    ppr: "incremental",
  },
};

export default nextConfig;
