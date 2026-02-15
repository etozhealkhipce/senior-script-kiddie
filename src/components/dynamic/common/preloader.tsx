// @ts-expect-error: no types for fontfaceobserver
import FontFaceObserver from "fontfaceobserver";
import { type FC, useEffect, useState } from "react";
import { LogoSVG } from "./logo-svg";

const FONT_TIMEOUT = 4000; // ms
const MIN_SHOW_TIME = 1500; // ms
const FONT_FAMILIES = ["Montserrat", "Inter"];

export const Preloader: FC = () => {
  const [visible, setVisible] = useState(true);

  // Font loading logic
  useEffect(() => {
    let cancelled = false;
    const minShowPromise = new Promise((resolve) => setTimeout(resolve, MIN_SHOW_TIME));
    const fontPromise = Promise.all(
      FONT_FAMILIES.map((family) => new FontFaceObserver(family).load(null, FONT_TIMEOUT)),
    );
    Promise.race([
      Promise.all([minShowPromise, fontPromise]),
      new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT + 500)),
    ]).then(() => {
      if (!cancelled) hidePreloader();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function hidePreloader() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800 transition-opacity duration-500"
      style={{ pointerEvents: "all" }}
    >
      <div className="w-full max-w-[180px] md:max-w-[220px] lg:max-w-[253px] h-auto">
        <LogoSVG animate={true} />
      </div>
    </div>
  );
};
