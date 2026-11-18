/**
 * Número do comercial da Folha — o único lugar do site onde ele existe.
 *
 * Formato do WhatsApp: DDI + DDD + número, só dígitos.
 */
export const WHATSAPP_PHONE = "554184236033";

export function buildWhatsAppUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}
