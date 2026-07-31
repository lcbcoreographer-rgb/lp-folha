"use client";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { trackEvent, trackConversion } from "../lib/gtag";

interface WhatsAppCTAButtonProps {
  className?: string;
  children: React.ReactNode;
  eventLabel?: string;
  message?: string;
}

const DEFAULT_MESSAGE =
  "Olá, quero solicitar um orçamento de licenciamento ambiental";

export default function WhatsAppCTAButton({
  className = "",
  children,
  eventLabel = "cta_button",
  message = DEFAULT_MESSAGE,
}: WhatsAppCTAButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackEvent("click_button", { button_label: eventLabel });
        trackConversion();
      }}
      className={className}
    >
      {children}
    </a>
  );
}
