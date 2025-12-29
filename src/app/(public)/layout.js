import Navbar from "@/components/HeaderNavbar";
import MobileNavbar from "@/components/Mobilenave";
import InquirySection from "@/components/footer/Footer";
import EventPopup from "@/components/public/EventPopup";
import ChatWidget from "@/components/public/ChatWidget";
import WhatsAppButton from "@/components/public/WhatsAppButton";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildMetadata(); // Softkingo defaults
}

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <MobileNavbar />
      <InquirySection />
      <EventPopup />
      <ChatWidget />
      <WhatsAppButton />
    </>
  );
}
