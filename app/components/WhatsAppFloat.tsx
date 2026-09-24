"use client";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { trackEvent, trackConversion } from "../lib/gtag";
import { useLinkWhatsApp } from "./WhatsAppCTAButton";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const href = useLinkWhatsApp("Olá, vim pelo site, quero mais informações");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={() => {
        trackEvent("click_button", { button_label: "whatsapp_float" });
        trackConversion();
      }}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all duration-400 hover:scale-110 hover:shadow-xl ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}
