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
  title: "Softkingo – Mobile App & Web Development Company in India, New Delhi, Noida",
  description: "Softkingo helps businesses grow with custom mobile apps, modern websites, and effective digital marketing. We make tech easy and results-focused.",
  keywords: [
    "software development company In India", "Mobile App development", "Web development Company", 
    "hire developers", "Mobile App development Company In New Delhi"
    , "Mobile App development Company In New Noida"
    , "Mobile App development Company In India"
  ],
  openGraph: {
    title: "Softkingo - Digital Transformation Partner",
    description: "Transform business with custom software solutions across mobile, web, AI/ML & blockchain.",
    url: "https://www.softkingo.com",
    images: ["/images/og/public-home.jpg"]
  },
  alternates: { canonical: "https://www.softkingo.com" }
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
