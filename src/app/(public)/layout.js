// app/(public)/layout.jsx - Main Public Pages
import Navbar from "@/components/HeaderNavbar";
import MobileNavbar from "@/components/Mobilenave";
import InquirySection from "@/components/footer/Footer";
import EventPopup from "@/components/public/EventPopup";
import ChatWidget from "@/components/public/OptimizedChatWidget";
import WhatsAppButton from "@/components/public/WhatsAppButton";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PublicLayout({ children }) {
  // JSON-LD for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Softkingo",
    "url": "https://www.softkingo.com",
    "logo": "https://www.softkingo.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 74287 50870",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/softkingo",
      "https://twitter.com/softkingo",
      "https://www.linkedin.com/company/softkingo"
    ]
  };

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <MobileNavbar />
      <InquirySection />
      <EventPopup />
      <ChatWidget />
      <WhatsAppButton />
    </>
  );
}
