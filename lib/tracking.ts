// ============================================================
// Google Ads Conversion Tracking — Silversands (Silver Walk & Silver Bay)
// ============================================================
// TODO: تأكد من الـ tag — آخر tag مستخدم لمشروع Silver Sands كان: AW-18216441738
// لو هتستخدم أكونت جديد، غيّر AW_ID هنا وفي app/layout.tsx
// وبعد إنشاء الـ Conversion Actions في Google Ads، حط الـ labels تحت.
// ============================================================

export const AW_ID = "AW-XXXXXXXXXX"; // TODO: ضع رقم الـ Google Ads tag

const LABELS = {
  formLead: "TODO_FORM_LABEL", // TODO: label تحويل الفورم
  whatsapp: "TODO_WA_LABEL", // TODO: label تحويل الواتساب
  call: "TODO_CALL_LABEL", // TODO: label تحويل المكالمات
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function fire(label: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && !AW_ID.includes("X")) {
    window.gtag("event", "conversion", {
      send_to: `${AW_ID}/${label}`,
    });
  }
}

export function trackFormLead() {
  fire(LABELS.formLead);
}

export function trackWhatsApp() {
  fire(LABELS.whatsapp);
}

export function trackCall() {
  fire(LABELS.call);
}
