import { useState, useEffect, type FC } from "react";
import { Button } from "@/components/ui/Button";
import { getStored, setStored, grantAnalyticsConsent } from "@/lib/consent";

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
      className="pointer-events-auto p-2 gap-2 rounded-lg bg-neutral-800 lg:p-0 lg:gap-0 lg:bg-transparent flex fixed w-[200px] lg:w-auto lg:relative lg:mt-4 bottom-6 lg:bottom-auto left-4 lg:left-auto right-4 lg:right-auto z-50"
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
