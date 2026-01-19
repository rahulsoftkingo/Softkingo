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
    unoptimized: true, 
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // allow all https (quick fix)
    ],
  },
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate, max-age=0' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' }
        ]
      }
    ]
  },
   async redirects() {
    return [
      // ========== SERVICES PAGES ==========
      {
        source: '/mobile-app-development-company',
        destination: '/services/mobile-app-development',
        permanent: true,
      },
      {
        source: '/ios-app-development-company',
        destination: '/services/ios-app-development',
        permanent: true,
      },
      {
        source: '/android-app-development-company',
        destination: '/services/android-app-development',
        permanent: true,
      },
      {
        source: '/ipad-app-development-company',
        destination: '/services/ipad-app-development',
        permanent: true,
      },
      {
        source: '/web-application-development-company',
        destination: '/services/web-application-development',
        permanent: true,
      },
      {
        source: '/software-development-company',
        destination: '/services/software-development',
        permanent: true,
      },
      {
        source: '/mobile-app-design-development-services',
        destination: '/services/mobile-app-design',
        permanent: true,
      },
      {
        source: '/logo-design',
        destination: '/services/logo-design',
        permanent: true,
      },
      {
        source: '/iphone-mockup-wireframes-services',
        destination: '/services/iphone-mockup-wireframes',
        permanent: true,
      },
      {
        source: '/mobile-app-prototyping-services',
        destination: '/services/mobile-app-prototyping',
        permanent: true,
      },
      {
        source: '/custom-mobile-app-development',
        destination: '/services/mobile-app-development',
        permanent: true,
      },
      {
        source: '/web-development-company',
        destination: '/services/web-development',
        permanent: true,
      },
      {
        source: '/php-web-development',
        destination: '/services/php-web-development',
        permanent: true,
      },
      {
        source: '/wordpress-web-development',
        destination: '/services/wordpress-web-development',
        permanent: true,
      },
      {
        source: '/joomla-web-development',
        destination: '/services/joomla-web-development',
        permanent: true,
      },
      {
        source: '/ruby-on-rails-development',
        destination: '/services/ruby-on-rails-development',
        permanent: true,
      },
      {
        source: '/custom-cms-development',
        destination: '/services/custom-cms-development',
        permanent: true,
      },
      {
        source: '/on-demand-developers',
        destination: '/services/on-demand-developers',
        permanent: true,
      },

      // ========== HIRE DEVELOPERS ==========
      {
        source: '/hire-iphone-developer',
        destination: '/services/hire-iphone-developer',
        permanent: true,
      },
      {
        source: '/hire-android-developer',
        destination: '/services/hire-android-developer',
        permanent: true,
      },
      {
        source: '/hire-swift-developer',
        destination: '/services/hire-swift-developer',
        permanent: true,
      },
      {
        source: '/hire-ai-developer',
        destination: '/services/hire-ai-developer',
        permanent: true,
      },
      {
        source: '/hire-ui-ux-developer-designer',
        destination: '/services/hire-ui-ux-designer',
        permanent: true,
      },

      // ========== NEW SOLUTIONS PAGES ==========
      {
        source: '/hrms-software-development',
        destination: '/solutions/hrms-software-development',
        permanent: true,
      },
      {
        source: '/learning-management-system-development',
        destination: '/solutions/learning-management-system-development',
        permanent: true,
      },
      {
        source: '/custom-erp-crm-mobile-development-company',
        destination: '/solutions/custom-erp-crm-mobile-development',
        permanent: true,
      },
      {
        source: '/on-demand-app-solutions-services',
        destination: '/solutions/on-demand-app-development',
        permanent: true,
      },
      {
        source: '/grocery-delivery-app-development',
        destination: '/solutions/grocery-delivery-app-development',
        permanent: true,
      },
      {
        source: '/medicine-app-development',
        destination: '/solutions/medicine-app-development',
        permanent: true,
      },
      {
        source: '/car-wash-app-development',
        destination: '/solutions/car-wash-app-development',
        permanent: true,
      },
      {
        source: '/ewallet-app-development',
        destination: '/solutions/ewallet-app-development',
        permanent: true,
      },
      {
        source: '/dating-app-development',
        destination: '/solutions/dating-app-development',
        permanent: true,
      },
      {
        source: '/navigation-app-development',
        destination: '/solutions/navigation-app-development',
        permanent: true,
      },
      {
        source: '/transportation-app-development',
        destination: '/solutions/transportation-app-development',
        permanent: true,
      },
      {
        source: '/laundry-app-development',
        destination: '/solutions/laundry-app-development',
        permanent: true,
      },
      {
        source: '/agriculture-app-development',
        destination: '/solutions/agriculture-app-development',
        permanent: true,
      },
      {
        source: '/ecommerce-app-development',
        destination: '/solutions/ecommerce-app-development',
        permanent: true,
      },
      {
        source: '/mhealth-healthcare-app-development',
        destination: '/solutions/mhealth-healthcare-app-development',
        permanent: true,
      },
      {
        source: '/taxi-booking-app-development',
        destination: '/solutions/taxi-booking-app-development',
        permanent: true,
      },
      {
        source: '/elearning-app-development',
        destination: '/solutions/elearning-app-development',
        permanent: true,
      },
      {
        source: '/fitness-app-development',
        destination: '/solutions/fitness-app-development',
        permanent: true,
      },
      {
        source: '/food-delivery-app-development',
        destination: '/solutions/food-delivery-app-development',
        permanent: true,
      },
      {
        source: '/realestate-app-development',
        destination: '/solutions/realestate-app-development',
        permanent: true,
      },
      {
        source: '/astrology-app-development',
        destination: '/solutions/astrology-app-development',
        permanent: true,
      },
      {
        source: '/diet-planner-app-development',
        destination: '/solutions/diet-planner-app-development',
        permanent: true,
      },
      {
        source: '/social-networking-app-development',
        destination: '/solutions/social-networking-app-development',
        permanent: true,
      },

      // ========== CLONE APPS ==========
      {
        source: '/amazon-clone-app-development',
        destination: '/solutions/amazon-clone-app-development',
        permanent: true,
      },
      {
        source: '/zomato-clone-app-development',
        destination: '/solutions/zomato-clone-app-development',
        permanent: true,
      },
      {
        source: '/uber-clone-app-development',
        destination: '/solutions/uber-clone-app-development',
        permanent: true,
      },
      {
        source: '/udemy-clone-app-development',
        destination: '/solutions/udemy-clone-app-development',
        permanent: true,
      },
      {
        source: '/urban-company-clone-app-development',
        destination: '/solutions/urban-company-clone-app-development',
        permanent: true,
      },
      {
        source: '/tinder-clone-app-development',
        destination: '/solutions/tinder-clone-app-development',
        permanent: true,
      },
      {
        source: '/instagram-clone-app-development',
        destination: '/solutions/instagram-clone-app-development',
        permanent: true,
      },
      {
        source: '/quora-clone-app-development',
        destination: '/solutions/quora-clone-app-development',
        permanent: true,
      },
      {
        source: '/soundcloud-clone-app-development',
        destination: '/solutions/soundcloud-clone-app-development',
        permanent: true,
      },
      {
        source: '/spotify-clone-app-development',
        destination: '/solutions/spotify-clone-app-development',
        permanent: true,
      },
      {
        source: '/ghost-lens-clone-app-development',
        destination: '/solutions/ghost-lens-clone-app-development',
        permanent: true,
      },
      {
        source: '/olx-clone-app-development',
        destination: '/solutions/olx-clone-app-development',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
