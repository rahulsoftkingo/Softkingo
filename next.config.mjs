/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Disable Turbopack for build/runtime (use webpack instead)
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
