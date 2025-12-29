/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  output: 'standalone',
  
  // Move these outside experimental in Next.js 16+
  serverExternalPackages: ['@prisma/client', 'prisma'],
  
  outputFileTracingIncludes: {
    "/*": ["./node_modules/.prisma/**", "./node_modules/@prisma/client/**"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // allow all https (quick fix)
    ],
  },
};

export default nextConfig;
