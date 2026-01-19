// app/layout.jsx - BASE SEO (All Pages Inherit)
import "./globals.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === 'production' ? 'https://softkingo.com' : 'http://localhost:3000')
  ),
  title: {
    default: "Softkingo - Top Software Development Company",
    template: "%s | Softkingo"
  },
  description: "Leading software development company in India delivering mobile apps, web development, AI/ML, blockchain & enterprise solutions.",
  keywords: [
    "software development", "mobile app development", "web development", 
    "hire developers", "AI ML", "blockchain", "Softkingo India"
  ],
  authors: [{ name: "Softkingo" }],
  creator: "Softkingo",
  publisher: "Softkingo",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Softkingo",
    images: [{ url: "/images/og/default.jpg", width: 1200, height: 630 }]
  },
  twitter: { card: "summary_large_image", images: ["/images/og/default.jpg"] },
  alternates: { canonical: "https://softkingo.com" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://softkingo.com" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
