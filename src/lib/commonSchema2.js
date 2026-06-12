// lib/commonSchema.js
// Common schemas shared across ALL pages

export const commonSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://softkingo.com/#organization",
    "name": "Softkingo",
    "url": "https://softkingo.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.softkingo.com/_next/static/media/softkingo-logo.d4fc7414.png",
      "width": 200,
      "height": 60
    },
    "description":
      "Softkingo is a global IT services company specializing in mobile app development, web development, AI solutions, and digital transformation services.",
    "telephone": "+91-7428750870",
    "email": "sales@softkingo.com",
    "foundingDate": "2020",
    "areaServed": "Worldwide",
    "sameAs": [
      "https://www.facebook.com/softkingo/",
      "https://in.linkedin.com/company/softkingo",
      "https://www.instagram.com/softkingotechnologies"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+91-7428750870",
        "email": "sales@softkingo.com",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "Worldwide"
      }
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "B-148, Block B, Sector 63",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201301",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "A-179, Block ED, New Ashok Nagar",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110096",
        "addressCountry": "IN"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "name": "Outstanding Mobile App Development",
        "author": { "@type": "Person", "name": "James Carter" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "datePublished": "2024-11-10",
        "reviewBody": "Softkingo delivered our mobile app on time and exceeded our expectations. Highly recommend!"
      }
    ]
  }
];

