// lib/commonSchema.js
// Common schemas shared across ALL pages — import and spread into any jsonLd

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
        "description": "Softkingo is a global IT services company specializing in mobile app development, web development, AI solutions, and digital transformation services.",
        "telephone": "+91-7428750870",
        "email": "sales@softkingo.com",
        "foundingDate": "2018",
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
                "addressCountry": "IN",
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 28.6252,
                    "longitude": 77.3700
                }
            },
            {
                "@type": "PostalAddress",
                "streetAddress": "A-179, Block ED, New Ashok Nagar",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110096",
                "addressCountry": "IN",
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 28.6150502,
                    "longitude": 77.3769649
                }
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
                "@context": "https://schema.org",
                "@type": "Review",
                "name": "Outstanding Mobile App Development",
                "author": { "@type": "Person", "name": "James Carter" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "datePublished": "2024-11-10",
                "reviewBody": "Softkingo delivered our mobile app on time and exceeded our expectations. Highly recommend!"
            },
            {
                "@context": "https://schema.org",
                "@type": "Review",
                "name": "Excellent Web Development Partner",
                "author": { "@type": "Person", "name": "Priya Sharma" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "datePublished": "2024-10-22",
                "reviewBody": "Deep technical expertise and delivered a flawless product. Great value for money."
            },
            {
                "@context": "https://schema.org",
                "@type": "Review",
                "name": "Game-changing AI Solution",
                "author": { "@type": "Person", "name": "Michael Thompson" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "datePublished": "2024-09-15",
                "reviewBody": "Their AI solution transformed our business operations. Exceptional work!"
            },
            {
                "@context": "https://schema.org",
                "@type": "Review",
                "name": "Reliable Digital Transformation Partner",
                "author": { "@type": "Person", "name": "Sarah Mitchell" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "datePublished": "2024-08-05",
                "reviewBody": "Thorough and transparent from planning to delivery. A trusted technology partner."
            },
            {
                "@context": "https://schema.org",
                "@type": "Review",
                "name": "Top-notch Flutter App Development",
                "author": { "@type": "Person", "name": "Rahul Verma" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "datePublished": "2024-07-18",
                "reviewBody": "Fast, beautiful, bug-free Flutter app. Top-notch developers and smooth project management."
            }
        ]
    },

    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://softkingo.com/#faq",
        "mainEntity": [
            {
                "@context": "https://schema.org",
                "@type": "Question",
                "name": "What services does Softkingo offer?",
                "acceptedAnswer": {
                    "@context": "https://schema.org",
                    "@type": "Answer",
                    "text": "Softkingo offers mobile app development, web development, AI solutions, UI/UX design, and digital transformation consulting for businesses worldwide."
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "Question",
                "name": "Where is Softkingo located?",
                "acceptedAnswer": {
                    "@context": "https://schema.org",
                    "@type": "Answer",
                    "text": "Softkingo has offices in New Delhi (110096) and Noida (201301), India. We serve clients globally."
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "Question",
                "name": "How can I contact Softkingo?",
                "acceptedAnswer": {
                    "@context": "https://schema.org",
                    "@type": "Answer",
                    "text": "Call +91-7428750870 or email sales@softkingo.com. Available Monday–Friday, 9:00 AM–6:30 PM IST."
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "Question",
                "name": "How long does it take to develop a mobile app?",
                "acceptedAnswer": {
                    "@context": "https://schema.org",
                    "@type": "Answer",
                    "text": "A basic app takes 4–8 weeks; complex enterprise apps take 4–6 months. We provide a detailed estimate after consultation."
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "Question",
                "name": "Does Softkingo provide post-launch support?",
                "acceptedAnswer": {
                    "@context": "https://schema.org",
                    "@type": "Answer",
                    "text": "Yes, we offer post-launch maintenance packages including bug fixes, performance optimization, and feature updates."
                }
            }
        ]
    }
];