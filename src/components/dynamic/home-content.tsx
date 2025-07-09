// import { useRef } from "react";

import { Link } from "./common/link";

// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";

// import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// gsap.registerPlugin(ScrambleTextPlugin);

export const HomeContent = () => {
  // const textRefFirst = useRef<HTMLDivElement>(null);
  // const worksLinkRef = useRef<HTMLAnchorElement>(null);

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

  // const arrowContainerRef = useRef<HTMLParagraphElement>(null);

  // useGSAP(() => {
  //   if (arrowContainerRef.current) {
  //     gsap.to(arrowContainerRef.current, {
  //       duration: 1,
  //       opacity: 1,
  //     });
  //   }
  // }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4 font-light">
        <p className="w-fit">
          Hi there, I'm Ilya. I design and code for the web.
        </p>
      </div>

      <div className="flex flex-col lg:ml-48">
        <div className="flex flex-col items-start space-y-2">
          <Link
            href="/about"
            className="font-secondary !text-3xl lg:!text-5xl font-medium !p-0"
          >
            about me {">"}
          </Link>

          <span className="text-secondary font-secondary text-sm">
            little more info
          </span>
        </div>
      </div>
    </div>
  );
};
