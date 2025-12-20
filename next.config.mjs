/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  // Important: Standalone output for Docker
  output: 'standalone',

  experimental: {
    // Prisma files ko trace karne ke liye
    outputFileTracingIncludes: {
      "/*": ["./node_modules/.prisma/**", "./node_modules/@prisma/client/**"],
    },
    // Prisma ko external package mark karo
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },

  // If you ever want to force webpack in dev, keep it commented as you had.
  // turbopack: false,
};

export default nextConfig;
