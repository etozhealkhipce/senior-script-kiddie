import { useRef } from "react";

// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";

// import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// gsap.registerPlugin(ScrambleTextPlugin);

export const HomeContent = () => {
  const textRefFirst = useRef<HTMLDivElement>(null);
  const worksLinkRef = useRef<HTMLAnchorElement>(null);

  // useGSAP(() => {
  //   if (typeof window === "undefined") return;

  //   if (textRefFirst.current) {
  //     gsap.to(textRefFirst.current, {
  //       duration: 2,
  //       scrambleText:
  //         "Corem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget condimentum velit, sit amet feugiat lectus.",
  //       chars: "01",
  //       speed: 0.4,
  //     });
  //   }
  // }, []);

  return (
    <div className="max-w-[460px] space-y-8">
      <div className="flex flex-col space-y-4 font-light">
        <div className="flex items-start">
          <p ref={textRefFirst} className="max-w-fit">
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            eget condimentum velit, sit amet feugiat lectus.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex flex-col items-start space-y-2">
          <a
            ref={worksLinkRef}
            href="/about"
            className="font-secondary text-5xl font-medium hover:text-neutral-300 cursor-pointer transition-colors"
          >
            works
          </a>
          <span className="text-secondary font-secondary text-sm">4 items</span>
        </div>
      </div>
    </div>
  );
};
