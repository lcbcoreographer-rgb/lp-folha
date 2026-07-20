export const GTAG_ID = "AW-18311470957";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackConversion() {
  trackEvent("conversion", { send_to: "AW-18311470957/wq-pCOaMudMcEO2-y5tE" });
}
