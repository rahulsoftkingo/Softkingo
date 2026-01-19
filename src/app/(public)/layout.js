// app/(public)/layout.jsx - Main Public Pages
import Navbar from "@/components/HeaderNavbar";
import MobileNavbar from "@/components/Mobilenave";
import InquirySection from "@/components/footer/Footer";
import EventPopup from "@/components/public/EventPopup";
import ChatWidget from "@/components/public/ChatWidget";
import WhatsAppButton from "@/components/public/WhatsAppButton";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Softkingo - Digital Transformation & Software Solutions",
  description: "Custom software development services - Mobile apps, Web platforms, AI/ML, Blockchain, Cloud solutions for global businesses.",
  keywords: [
    "software company India", "app development", "web development", 
    "hire developers", "digital transformation"
  ],
  openGraph: {
    title: "Softkingo - Digital Transformation Partner",
    description: "Transform business with custom software solutions across mobile, web, AI/ML & blockchain.",
    url: "https://softkingo.com",
    images: ["/images/og/public-home.jpg"]
  },
  alternates: { canonical: "https://softkingo.com" }
};

export default function PublicLayout({ children }) {
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
