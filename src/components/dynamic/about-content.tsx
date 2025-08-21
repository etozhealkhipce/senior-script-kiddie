import { useRef, type FC } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ContentHeader } from "./common/content-header";
import { Link } from "./common/link";

export const AboutContent: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const highlightWordsRef = useRef<HTMLSpanElement[]>([]);
  const textRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(headerRef.current, { opacity: 0, y: -30 });
    gsap.set(highlightWordsRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(textRefs.current, { opacity: 0, y: 10 });
    gsap.set(socialLinksRef.current?.children || [], {
      opacity: 0,
      scale: 0.8,
    });
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
    tl.to(highlightWordsRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: "back.out(1.7)",
    });
    tl.to(textRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });
    tl.to(
      socialLinksRef.current?.children || [],
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      ">-0.2"
    );
  }, []);

  const addToHighlightRefs = (el: HTMLSpanElement | null) => {
    if (el && !highlightWordsRef.current.includes(el)) {
      highlightWordsRef.current.push(el);
    }
  };
  const addToTextRefs = (el: HTMLSpanElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="space-y-8 max-w-full lg:max-w-xl opacity-0"
      >
        <div className="flex flex-col" ref={headerRef}>
          <ContentHeader title="about me" subtitle="and my expirience" />
        </div>
        <div className="flex flex-col space-y-4 font-light">
          <p>
            <span ref={addToTextRefs}>My name is </span>
            <span
              ref={addToHighlightRefs}
              className="bg-accent/30 text-white px-1 rounded"
            >
              Ilya
            </span>
            <span ref={addToTextRefs}>.</span>
          </p>
          <p>
            <span ref={addToTextRefs}>I'm a </span>
            <span
              ref={addToHighlightRefs}
              className="bg-accent/30 text-white px-1 rounded"
            >
              frontend developer
            </span>
            <span ref={addToTextRefs}> with over </span>
            <span
              ref={addToHighlightRefs}
              className="font-medium bg-accent/20 text-white px-1 rounded"
            >
              6 years of commercial experience
            </span>
            <span ref={addToTextRefs}>
              . In addition to coding, I have experience leading teams and
              setting up processes. I've been involved in designing
              architecture, making technical decisions, and helping my team
              grow.
            </span>
          </p>
          <p ref={addToTextRefs}>
            <span>My current stack includes </span>
            <span className="font-medium">
              <a
                href="https://react.dev"
                target="_blank"
                className="hover:underline transition-all duration-300 hover:text-accent"
              >
                React
              </a>
              ,{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                className="hover:underline transition-all duration-300 hover:text-accent"
              >
                Next.js
              </a>
              ,{" "}
              <a
                href="https://effector.dev"
                target="_blank"
                className="hover:underline transition-all duration-300 hover:text-accent"
              >
                Effector
              </a>
              ,{" "}
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                className="hover:underline transition-all duration-300 hover:text-accent"
              >
                shadcn/ui
              </a>
              , and{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                className="hover:underline transition-all duration-300 hover:text-accent"
              >
                Tailwind CSS
              </a>
            </span>
            <span ref={addToTextRefs}>
              . I've also worked with many other technologies and am always open
              to learning new tools.
            </span>
          </p>
        </div>
        <div
          ref={socialLinksRef}
          className="flex flex-row items-center space-x-4 text-secondary text-sm flex-wrap"
        >
          {[
            {
              title: "@github",
              href: "https://github.com/etozhealkhipce",
            },
            {
              title: "@linkedin",
              href: "https://www.linkedin.com/in/alkhipce/",
            },
            {
              title: "@telegram",
              href: "https://t.me/alkhipce",
            },
          ].map((item) => (
            <Link key={item.title} target="_blank" href={item.href}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
