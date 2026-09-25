export const GTAG_ID = "AW-18311470957";
export const META_PIXEL_ID = "1689730238985356";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackMeta(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params);
}

/** Lead: clique no WhatsApp ou formulário enviado. Google Ads (conversão) + Meta (Lead). */
export function trackConversion(origem?: string) {
  trackEvent("conversion", { send_to: "AW-18311470957/wq-pCOaMudMcEO2-y5tE" });
  trackMeta("Lead", origem ? { content_name: origem } : undefined);
}
