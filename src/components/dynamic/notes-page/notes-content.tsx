import { useRef, type FC } from "react";
import { ContentHeader } from "../common/content-header";
import { NoteCard } from "./note-card";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const NotesContent: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(headerRef.current, { opacity: 0, y: -30 });
    gsap.set(notesRef.current, { opacity: 0, y: 10 });

    // 1. Header
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // 2. Notes
    tl.to(notesRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);

  const addToNotesRefs = (el: HTMLDivElement | null) => {
    if (el && !notesRef.current.includes(el)) {
      notesRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="space-y-8 max-w-full lg:max-w-xl opacity-0"
    >
      <div className="flex flex-col" ref={headerRef}>
        <ContentHeader
          title="notes"
          subtitle="thoughts, tutorials, and technical notes"
        />
      </div>

      <div className="flex flex-col space-y-4 font-light">
        {[
          {
            title: "effector useful links",
            subtitle: [
              {
                title: "effector",
                highlight: false,
              },
              {
                title: "links",
                highlight: true,
              },
            ],
            description: "полезные ссылки для работы с effector",
            date: "22.08.2025",
            slug: "effector-useful-links",
          },
        ].map((note) => (
          <NoteCard
            ref={addToNotesRefs}
            key={note.title}
            {...note}
            subtitle={note.subtitle?.map((item, index) => (
              <span key={item.title}>
                {item.highlight ? (
                  <span className="bg-accent/30 text-white">{item.title}</span>
                ) : (
                  item.title
                )}
                {index !== note.subtitle.length - 1 && ", "}
              </span>
            ))}
          />
        ))}
      </div>
    </div>
  );
};
