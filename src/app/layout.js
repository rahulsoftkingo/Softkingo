// app/layout.jsx - BASE SEO (All Pages Inherit)
import "./globals.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softkingo.com'
  ),
  title: {
    default: "Softkingo – Mobile App & Web Development Company in India, New Delhi, Noida",
    template: "%s | Softkingo"
  },
  description: "Softkingo helps businesses grow with custom mobile apps, modern websites, and effective digital marketing. We make tech easy and results-focused.",
  keywords: [
    "software development", "mobile app development", "web development",
    "hire developers", "AI ML", "blockchain", "Softkingo India"
  ],
  authors: [{ name: "Softkingo", url: "https://www.softkingo.com" }],
  creator: "Softkingo Team",
  publisher: "Softkingo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.softkingo.com',
    siteName: 'Softkingo',
    title: 'Softkingo – Mobile App & Web Development Company',
    description: 'Premier software development company in India specializing in custom mobile apps and web solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Softkingo - Excellence in Tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Softkingo – Mobile App & Web Development',
    description: 'Custom mobile apps and web development solutions that drive business growth.',
    images: ['/og-image.png'],
    creator: '@softkingo',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Softkingo - Top Mobile App & Web Development Company in India, Delhi, NCR",
    "image": "https://www.softkingo.com/og-image.png",
    "@id": "https://www.softkingo.com",
    "url": "https://www.softkingo.com/",
    "telephone": "+91-7428750870",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "a179, Block ED, New Ashok Nagar",
      "addressLocality": "New Delhi",
      "postalCode": "110096",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.5981795,
      "longitude": 77.3113186
    },
    "areaServed": ["IN", "US", "UK", "UAE", "CA"],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/softkingo",
      "https://in.linkedin.com/company/softkingo",
      "https://instagram.com/softkingotechnologies",
      "https://twitter.com/softkingo",
      "https://www.youtube.com/channel/UCFiVxuCrteF5cmyvcIx-Idw"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}



// const jsonLd = [
//     // --- BRANCH 1: DELHI ---
//     {
//       "@context": "https://schema.org",
//       "@type": "LocalBusiness",
//       "@id": "https://www.softkingo.com/#delhi", // Unique ID for Delhi
//       "name": "Softkingo (Delhi Branch)",
//       "image": "https://www.softkingo.com/_next/static/media/softkingo-logo.d4fc7414.png",
//       "url": "https://www.softkingo.com/",
//       "telephone": "074287 50870",
//       "address": {
//         "@type": "PostalAddress",
//         "streetAddress": "a179, Block ED, New Ashok Nagar",
//         "addressLocality": "New Delhi",
//         "postalCode": "110096",
//         "addressCountry": "IN"
//       },
//       "geo": {
//         "@type": "GeoCoordinates",
//         "latitude": 28.5981795,
//         "longitude": 77.3113186
//       },
//       "openingHoursSpecification": {
//         "@type": "OpeningHoursSpecification",
//         "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
//         "opens": "09:00",
//         "closes": "18:00"
//       },
//       "sameAs": [
//         "https://www.facebook.com/softkingo",
//         "https://in.linkedin.com/company/softkingo",
//         // Yahan Delhi wale Google Business Profile ka link dalein agar alag hai
//       ]
//     },

//     // --- BRANCH 2: NOIDA (Isko Fill Karein) ---
//     {
//       "@context": "https://schema.org",
//       "@type": "LocalBusiness",
//       "@id": "https://www.softkingo.com/#noida", // Unique ID for Noida
//       "name": "Softkingo (Noida Branch)",
//       "image": "https://www.softkingo.com/_next/static/media/softkingo-logo.d4fc7414.png",
//       "url": "https://www.softkingo.com/", // Agar Noida ka alag contact page hai to wo link dalein, nahi to home page hi rahne dein
//       "telephone": "YOUR_NOIDA_PHONE_NUMBER", // Noida Branch Phone
//       "address": {
//         "@type": "PostalAddress",
//         "streetAddress": "YOUR_NOIDA_ADDRESS", // Noida Address
//         "addressLocality": "Noida",
//         "addressRegion": "Uttar Pradesh",
//         "postalCode": "YOUR_NOIDA_PINCODE",
//         "addressCountry": "IN"
//       },
//       "geo": {
//         "@type": "GeoCoordinates",
//         "latitude": 00.000000, // Noida Latitude (Google Maps se lein)
//         "longitude": 00.000000 // Noida Longitude
//       },
//       "openingHoursSpecification": {
//         "@type": "OpeningHoursSpecification",
//         "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
//         "opens": "09:00",
//         "closes": "18:00"
//       },
//       "sameAs": [
//         "https://www.facebook.com/softkingo",
//         "https://in.linkedin.com/company/softkingo",
//         // Yahan Noida wale Google Business Map ka link zaroor dalein
//       ]
//     }
//   ];