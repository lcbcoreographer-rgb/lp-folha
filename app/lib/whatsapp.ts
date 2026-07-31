export const WHATSAPP_PHONE = "5541987970472";

export function buildWhatsAppUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}
