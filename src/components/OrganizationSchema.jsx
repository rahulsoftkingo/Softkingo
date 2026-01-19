// app/components/OrganizationSchema.jsx
export default function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Softkingo Technologies",
          url: "https://www.softkingo.com",
          logo: "https://www.softkingo.com/logo.png",
          description: "Top mobile app development company India",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
            addressLocality: "Noida",
            addressRegion: "UP"
          },
          sameAs: [
            "https://www.linkedin.com/company/softkingo",
            "https://twitter.com/softkingo"
          ]
        }),
      }}
    />
  );
}
