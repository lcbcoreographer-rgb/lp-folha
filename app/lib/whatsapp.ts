/**
 * Número do comercial da Folha — o único lugar do site onde ele existe.
 *
 * Já esteve duplicado no FormModal, que é como um dos dois fica para trás na
 * próxima troca. Formato do WhatsApp: DDI + DDD + número, só dígitos.
 */
export const WHATSAPP_PHONE = "554184236033";

export function buildWhatsAppUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}
