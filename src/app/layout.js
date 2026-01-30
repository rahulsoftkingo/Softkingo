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
  manifest: '/manifest.json',
  
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
}
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}