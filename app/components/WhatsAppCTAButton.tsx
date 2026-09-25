"use client";
import { useSyncExternalStore } from "react";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { codigoDaVisita, mensagemComCodigo } from "../lib/origem";
import { trackEvent, trackConversion } from "../lib/gtag";

const semAviso = () => () => {};

/**
 * Link do WhatsApp com o código de origem da visita no fim da mensagem.
 * No servidor e na hidratação o código é null (o HTML sai igual nos dois
 * lados); logo depois de montar, o navegador completa o link.
 */
export function useLinkWhatsApp(mensagem: string) {
  const codigo = useSyncExternalStore(semAviso, codigoDaVisita, () => null);
  return buildWhatsAppUrl(mensagemComCodigo(mensagem, codigo));
}

interface WhatsAppCTAButtonProps {
  className?: string;
  children: React.ReactNode;
  eventLabel?: string;
  message?: string;
}

const DEFAULT_MESSAGE =
  "Olá, vi o site da Folha e preciso saber quais licenças o meu caso exige. Minha operação: ";

export default function WhatsAppCTAButton({
  className = "",
  children,
  eventLabel = "cta_button",
  message = DEFAULT_MESSAGE,
}: WhatsAppCTAButtonProps) {
  const href = useLinkWhatsApp(message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackEvent("click_button", { button_label: eventLabel });
        trackConversion(eventLabel);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
