import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { ContentHeader } from "@/components/dynamic/common/content-header";
import { Link } from "@/components/dynamic/common/link";
import { EditorJsRenderer } from "./editorjs-renderer";
import type { EditorData, SubtitleItem } from "./types";

type Props = {
  title: string;
  content: EditorData | null;
  date: string;
  tags?: string[] | null;
  subtitle?: SubtitleItem[] | null;
};

export const NoteContent = ({ title, content, date, tags, subtitle }: Props) => {
  const items: SubtitleItem[] = subtitle?.length
    ? subtitle
    : (tags ?? []).map((t) => ({ title: t, highlight: false }));

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const backLinkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(headerRef.current, { opacity: 0, y: -30 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });
    gsap.set(tagsRef.current, { opacity: 0, y: 10 });
    gsap.set(backLinkRef.current, { opacity: 0, x: -20 });

    // 1. Header
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // 2. Content
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // 3. Tags
    tl.to(
      tagsRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      ">-0.2",
    );

    // 4. Back link
    tl.to(
      backLinkRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      ">-0.1",
    );
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 max-w-full lg:max-w-2xl opacity-0">
      <div className="mb-4">
        <Link ref={backLinkRef} href={`/notes`} className="underline underline-offset-2 !text-base">
          {"<"} back to notes
        </Link>
      </div>

      <div className="flex flex-col" ref={headerRef}>
        <ContentHeader title={title} subtitle={`published on ${date}`} />
      </div>

      <div ref={tagsRef} className={items.length > 0 ? "flex flex-wrap gap-2" : undefined}>
        {items.map((item) => (
          <span
            key={item.title}
            className={`px-2 py-1 text-xs rounded ${
              item.highlight ? "bg-accent/30 text-white" : "bg-accent/20 text-white"
            }`}
          >
            {item.title}
          </span>
        ))}
      </div>

      <div
        ref={contentRef}
        className="prose prose-invert prose-sm max-w-none font-light leading-relaxed [&_mark]:bg-accent/30 [&_mark]:text-white [&_mark]:not-italic [&_mark]:rounded [&_mark]:px-0.5"
      >
        {content ? (
          <EditorJsRenderer content={content} />
        ) : (
          <p className="text-neutral-500">No content yet.</p>
        )}
      </div>
    </div>
  );
};
