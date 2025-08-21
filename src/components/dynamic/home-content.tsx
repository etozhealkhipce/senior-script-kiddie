import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/dist/SplitText";
import { Link } from "./common/link";
gsap.registerPlugin(SplitText);

export const HomeContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    tl.set(containerRef.current, { opacity: 1 });
    const split = SplitText.create(textRef.current, { type: "words" });
    gsap.set(linkRef.current, { opacity: 0, y: -30 });
    tl.from(split.words, {
      opacity: 0,
      duration: 0.7,
      stagger: 0.05,
      ease: "power2.out",
    });
    tl.to(linkRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <>
      <div ref={containerRef} className="space-y-8 opacity-0">
        <div className="flex flex-col space-y-4 font-light">
          <p className="w-fit split" ref={textRef}>
            Hi there, I'm Ilya. I design and code for the web.
          </p>
        </div>
        <div className="flex flex-col lg:ml-48" ref={linkRef}>
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
    </>
  );
};
