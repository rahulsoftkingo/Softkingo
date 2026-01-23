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
    { source: '/mobile-app-development-company', destination: '/services/mobile-app-development', permanent: true },
    { source: '/ios-app-development-company', destination: '/services/ios-app-development', permanent: true },
    { source: '/android-app-development-company', destination: '/services/android-app-development', permanent: true },
    { source: '/ipad-app-development-company', destination: '/services/ipad-app-development', permanent: true },
    { source: '/web-application-development-company', destination: '/services/web-application-development', permanent: true },
    { source: '/software-development-company', destination: '/services/software-development', permanent: true },
    { source: '/mobile-app-design-development-services', destination: '/services/mobile-app-design', permanent: true },
    { source: '/logo-design', destination: '/services/logo-design', permanent: true },
    { source: '/iphone-mockup-wireframes-services', destination: '/services/iphone-mockup-wireframes', permanent: true },
    { source: '/mobile-app-prototyping-services', destination: '/services/mobile-app-prototyping', permanent: true },
    { source: '/custom-mobile-app-development', destination: '/services/mobile-app-development', permanent: true },
    { source: '/web-development-company', destination: '/services/web-development', permanent: true },
    { source: '/php-web-development', destination: '/services/php-web-development', permanent: true },
    { source: '/wordpress-web-development', destination: '/services/wordpress-web-development', permanent: true },
    { source: '/joomla-web-development', destination: '/services/joomla-web-development', permanent: true },
    { source: '/ruby-on-rails-development', destination: '/services/ruby-on-rails-development', permanent: true },
    { source: '/custom-cms-development', destination: '/services/custom-cms-development', permanent: true },

    // ========== DIGITAL MARKETING / SEO SERVICES ==========
    { source: '/local-seo-services', destination: '/services/local-seo', permanent: true },
    { source: '/seo-services', destination: '/services/seo', permanent: true },
    { source: '/international-seo-services', destination: '/services/international-seo', permanent: true },
    { source: '/multilingual-seo', destination: '/services/multilingual-seo', permanent: true },
    { source: '/enterprise-seo-services', destination: '/services/enterprise-seo', permanent: true },
    { source: '/ecommerce-seo-services', destination: '/services/ecommerce-seo', permanent: true },
    { source: '/youtube-video-marketing-services', destination: '/services/youtube-video-marketing', permanent: true },
    { source: '/google-penguin-recovery-services', destination: '/services/google-penguin-recovery', permanent: true },
    { source: '/seo-ppc-reseller-services', destination: '/services/ppc-reseller', permanent: true },
    { source: '/online-reputation-management', destination: '/services/online-reputation-management', permanent: true },
    { source: '/brand-reputation-management', destination: '/services/brand-reputation-management', permanent: true },
    { source: '/corporate-reputation-management', destination: '/services/corporate-reputation-management', permanent: true },
    { source: '/celebrity-reputation-management-services', destination: '/services/celebrity-reputation-management', permanent: true },
    { source: '/hotel-restaurant-online-reputation-management', destination: '/services/hotel-restaurant-online-reputation-management', permanent: true },
    { source: '/mobile-app-marketing-services', destination: '/services/mobile-app-marketing', permanent: true },
    { source: '/app-store-optimization-services', destination: '/services/app-store-optimization', permanent: true },
    { source: '/ppc-services-company-india', destination: '/services/ppc-services', permanent: true },
    { source: '/search-advertising', destination: '/services/search-advertising', permanent: true },
    { source: '/google-product-listing-pla', destination: '/services/google-product-listing-pla', permanent: true },
    { source: '/lead-based-marketing', destination: '/services/lead-based-marketing', permanent: true },
    { source: '/search-display-remarketing', destination: '/services/search-display-remarketing', permanent: true },
    { source: '/social-media-advertising', destination: '/services/social-media-advertising', permanent: true },
    { source: '/mobile-ads-advertising', destination: '/services/mobile-ads-advertising', permanent: true },
    { source: '/campaign-email-services', destination: '/services/email-campaign', permanent: true }, // Fixed: compaign → campaign
    { source: '/content-marketing-services', destination: '/services/content-marketing', permanent: true },
    { source: '/quora-seo-marketing', destination: '/services/quora-marketing', permanent: true },
    { source: '/seo-copywriting', destination: '/services/seo-copywriting', permanent: true },
    { source: '/guest-posting-services', destination: '/services/guest-posting', permanent: true },
    { source: '/digital-marketing-services', destination: '/services/digital-marketing', permanent: true },

    // ========== HIRE DEVELOPERS ==========
    { source: '/hire-iphone-developer', destination: '/hire/iphone-developers', permanent: true }, // Fixed
    { source: '/hire-android-developer', destination: '/hire/android-developers', permanent: true },
    { source: '/hire-swift-developer', destination: '/hire/swift-developers', permanent: true },
    { source: '/hire-ai-developer', destination: '/hire/ai-developers', permanent: true },
    { source: '/hire-ui-ux-developer-designer', destination: '/hire/ui-ux-developers', permanent: true },
    { source: '/on-demand-developers', destination: '/hire/on-demand-developers', permanent: true }, // Fixed: hire/ not services/

    // ========== SOLUTIONS PAGES ==========
    { source: '/hrms-software-development', destination: '/solutions/hrms-software-development', permanent: true },
    { source: '/learning-management-system-development', destination: '/solutions/learning-management-system-development', permanent: true },
    { source: '/custom-erp-crm-mobile-development-company', destination: '/solutions/custom-erp-crm-mobile-development', permanent: true },
    { source: '/on-demand-app-solutions-services', destination: '/solutions/on-demand-app-development', permanent: true },
    { source: '/grocery-delivery-app-development', destination: '/solutions/grocery-delivery-app-development', permanent: true },
    { source: '/medicine-app-development', destination: '/solutions/medicine-app-development', permanent: true },
    { source: '/car-wash-app-development', destination: '/solutions/car-wash-app-development', permanent: true },
    { source: '/ewallet-app-development', destination: '/solutions/ewallet-app-development', permanent: true },
    { source: '/dating-app-development', destination: '/solutions/dating-app-development', permanent: true },
    { source: '/navigation-app-development', destination: '/solutions/navigation-app-development', permanent: true },
    { source: '/transportation-app-development', destination: '/solutions/transportation-app-development', permanent: true },
    { source: '/laundry-app-development', destination: '/solutions/laundry-app-development', permanent: true },
    { source: '/agriculture-app-development', destination: '/solutions/agriculture-app-development', permanent: true },
    { source: '/ecommerce-app-development', destination: '/solutions/ecommerce-app-development', permanent: true },
    { source: '/mhealth-healthcare-app-development', destination: '/solutions/mhealth-healthcare-app-development', permanent: true },
    { source: '/taxi-booking-app-development', destination: '/solutions/taxi-booking-app-development', permanent: true },
    { source: '/elearning-app-development', destination: '/solutions/elearning-app-development', permanent: true },
    { source: '/fitness-app-development', destination: '/solutions/fitness-app-development', permanent: true },
    { source: '/food-delivery-app-development', destination: '/solutions/food-delivery-app-development', permanent: true },
    { source: '/realestate-app-development', destination: '/solutions/realestate-app-development', permanent: true },
    { source: '/astrology-app-development', destination: '/solutions/astrology-app-development', permanent: true },
    { source: '/diet-planner-app-development', destination: '/solutions/diet-planner-app-development', permanent: true },
    { source: '/social-networking-app-development', destination: '/solutions/social-networking-app-development', permanent: true },

    // ========== ADDITIONAL SOLUTIONS ==========
    { source: '/ecommerce-solutions', destination: '/solutions/digital-marketing-for-ecommerce', permanent: true },
    { source: '/conversion-rate-optimization', destination: '/solutions/conversion-rate-optimization', permanent: true },
    { source: '/internet-of-things-development-company', destination: '/solutions/iot-app-development', permanent: true },
    { source: '/custom-database-development-services', destination: '/solutions/custom-database-development', permanent: true },
    { source: '/convert-your-website-into-mobile-apps', destination: '/solutions/convert-your-website-into-mobile-apps', permanent: true },
    { source: '/converting-php-web-app-to-mobile-app', destination: '/solutions/converting-php-web-app-to-mobile-app', permanent: true },
    { source: '/turn-your-excel-spreadsheet-into-iphone-ipad-application', destination: '/solutions/turn-your-excel-spreadsheet-into-ios-app', permanent: true },
    { source: '/convert-vb-application-to-mobile-app', destination: '/solutions/convert-vb-application-to-mobile-app', permanent: true },

    // ========== AI/ML + CLOUD + SALESFORCE ==========
    { source: '/ai-machine-learning-development-services', destination: '/services/machine-learning-development', permanent: true },
    { source: '/amazon-cloud-services', destination: '/services/amazon-cloud', permanent: true },
    { source: '/salesforce-consulting-services', destination: '/services/salesforce-consulting', permanent: true },

    // ========== CLONE APPS ==========
    { source: '/amazon-clone-app-development', destination: '/solutions/amazon-clone-app-development', permanent: true },
    { source: '/zomato-clone-app-development', destination: '/solutions/zomato-clone-app-development', permanent: true },
    { source: '/uber-clone-app-development', destination: '/solutions/uber-clone-app-development', permanent: true },
    { source: '/udemy-clone-app-development', destination: '/solutions/udemy-clone-app-development', permanent: true },
    { source: '/urban-company-clone-app-development', destination: '/solutions/urban-company-clone-app-development', permanent: true },
    { source: '/tinder-clone-app-development', destination: '/solutions/tinder-clone-app-development', permanent: true },
    { source: '/instagram-clone-app-development', destination: '/solutions/instagram-clone-app-development', permanent: true },
    { source: '/quora-clone-app-development', destination: '/solutions/quora-clone-app-development', permanent: true },
    { source: '/soundcloud-clone-app-development', destination: '/solutions/soundcloud-clone-app-development', permanent: true },
    { source: '/spotify-clone-app-development', destination: '/solutions/spotify-clone-app-development', permanent: true },
    { source: '/ghost-lens-clone-app-development', destination: '/solutions/ghost-lens-clone-app-development', permanent: true },
    { source: '/olx-clone-app-development', destination: '/solutions/olx-clone-app-development', permanent: true },
    { source: '/naukri-clone-app-development', destination: '/solutions/naukri-clone-app-development', permanent: true }, // Added
  ];
}


};

export default nextConfig;
