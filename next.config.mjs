/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./node_modules/.prisma/**", "./node_modules/@prisma/client/**"],
    },
  },

  // If you ever want to force webpack in dev, keep it commented as you had.
  // turbopack: false,
};

export default nextConfig;
