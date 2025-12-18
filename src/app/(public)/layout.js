import Navbar from "@/components/HeaderNavbar";
import MobileNavbar from "@/components/Mobilenave";
import "./../globals.css";
import InquirySection from "@/components/footer/Footer";
import EventPopup from "@/components/public/EventPopup";
import ChatWidget from "@/components/public/ChatWidget";
import WhatsAppButton from "@/components/public/WhatsAppButton";

export default function RootLayout({ children }) {
  return (
   
      
      <>
        <Navbar/>     
        {children}
        <MobileNavbar/>
        <InquirySection/>
                <EventPopup />
 <ChatWidget />
      <WhatsAppButton />
      </>
    
  );
}

