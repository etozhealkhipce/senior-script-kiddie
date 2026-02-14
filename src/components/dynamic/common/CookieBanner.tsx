import { useState, useEffect, type FC } from "react";
import { Button } from "../../ui/Button";
import { COOKIE_PREFIX } from "../../../lib/cookie-prefix";

const STORAGE_KEY = `${COOKIE_PREFIX}cc_consent`;

type TConsentState = {
  analytics: boolean;
} | null;

const getStored = (): TConsentState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { analytics?: boolean };
    return { analytics: Boolean(parsed.analytics) };
  } catch {
    return null;
  }
};

const setStored = (analytics: boolean) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ analytics, ts: Date.now() })
    );
  } catch {
    // ignore
  }
};

const grantAnalyticsConsent = () => {
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

export type TProps = {
  text?: React.ReactNode;
  acceptLabel?: string;
};

export const CookieBanner: FC<TProps> = ({
  text = (
    <>
      We use{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline hover:no-underline"
      >
        cookies
      </a>{" "}
      and similar technologies.
    </>
  ),
  acceptLabel = "Ok",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStored();
    setVisible(stored === null);
  }, []);

  const handleAccept = () => {
    setStored(true);
    grantAnalyticsConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="pointer-events-auto flex fixed w-[180px] lg:w-auto lg:relative bottom-6 lg:bottom-auto left-4 lg:left-auto right-4 lg:right-auto"
    >
      <p className="text-xs font-extralight text-neutral-300">{text}</p>
      <Button
        variant="primary"
        onClick={handleAccept}
        className="shrink-0 !py-1 !text-xs cursor-pointer"
      >
        {acceptLabel}
      </Button>
    </div>
  );
};
