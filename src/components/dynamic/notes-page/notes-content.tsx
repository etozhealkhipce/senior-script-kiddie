import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { type FC, useRef } from "react";
import { ContentHeader } from "@/components/dynamic/common/content-header";
import { formatDate } from "@/lib/format-date";
import { NoteCard } from "./note-card";
import type { NoteApiData } from "./types";

type TProps = {
  notes: NoteApiData[];
};

export const NotesContent: FC<TProps> = ({ notes }) => {
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
    <div ref={containerRef} className="space-y-8 max-w-full lg:max-w-xl opacity-0">
      <div className="flex flex-col" ref={headerRef}>
        <ContentHeader title="notes" subtitle="thoughts, tutorials, and technical notes" />
      </div>

      <div className="flex flex-col space-y-4 font-light">
        {notes.length === 0 && <p className="text-neutral-500 text-sm">No notes yet.</p>}
        {notes.map((note) => {
          const subtitleItems = note.subtitle?.length
            ? note.subtitle
            : (note.tags ?? []).map((t) => ({ title: t, highlight: false }));

          const subtitleNode = subtitleItems.map((item, index) => (
            <span key={item.title}>
              {item.highlight ? (
                <span className="bg-accent/30 text-white">{item.title}</span>
              ) : (
                item.title
              )}
              {index !== subtitleItems.length - 1 && ", "}
            </span>
          ));

          return (
            <NoteCard
              ref={addToNotesRefs}
              key={note.slug}
              title={note.title}
              subtitle={subtitleNode}
              description={note.preview}
              date={formatDate(note.createdAt)}
              slug={note.slug}
            />
          );
        })}
      </div>
    </div>
  );
};
