import { COOKIE_PREFIX } from "@/lib/cookie-prefix";

export const STORAGE_KEY = `${COOKIE_PREFIX}cc_consent`;

export type TConsentState = {
  analytics: boolean;
} | null;

export const getStored = (): TConsentState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { analytics?: boolean };
    return { analytics: Boolean(parsed.analytics) };
  } catch {
    return null;
  }
};

export const setStored = (analytics: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, ts: Date.now() }));
  } catch {
    // ignore
  }
};

export const grantAnalyticsConsent = () => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
