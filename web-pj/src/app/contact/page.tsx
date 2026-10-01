import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactExperience from "@/components/ContactExperience";

export const metadata: Metadata = {
  title: "Contact Us — PJ Holdings",
  description: "Start a conversation with PJ Holdings. Connect by email or WhatsApp, explore our work on GitHub, or send a thoughtful inquiry.",
};

export default function ContactPage() {
  return (
    <div id="top" className="contact-page min-h-screen bg-[#08080a] text-zinc-100 selection:bg-[#c8b58b] selection:text-black">
      <Navbar />
      <main>
        <ContactExperience />
      </main>
      <Footer />
    </div>
  );
}
