import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { type FC, useRef } from "react";
import { ContentHeader } from "@/components/dynamic/common/content-header";
import type { NoteApiData } from "@/components/dynamic/notes-page/types";
import { ProjectCard } from "./project-card";

type Props = {
  projects: NoteApiData[];
};

export const WorkContent: FC<Props> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(headerRef.current, { opacity: 0, y: -30 });
    gsap.set(projectsRef.current, { opacity: 0, y: 10 });

    // 1. Header
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // 2. Projects
    tl.to(projectsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);

  const addToProjectsRefs = (el: HTMLDivElement | null) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  const buildSubtitle = (project: NoteApiData) => {
    const items = project.subtitle?.length
      ? project.subtitle
      : (project.tags ?? []).map((t) => ({ title: t, highlight: false }));

    return items.map((item, index) => (
      <span key={item.title}>
        {item.highlight ? (
          <span className="bg-accent/30 text-white">{item.title}</span>
        ) : (
          item.title
        )}
        {index !== items.length - 1 && ", "}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="space-y-8 max-w-full lg:max-w-xl opacity-0">
      <div className="flex flex-col" ref={headerRef}>
        <ContentHeader title="work" subtitle="team and personal projects" />
      </div>

      <div className="flex flex-col font-light">
        {projects.length === 0 && <p className="text-neutral-500 text-sm">No projects yet.</p>}
        {projects.map((project, index) => (
          <div key={project.slug} ref={addToProjectsRefs}>
            <ProjectCard
              title={project.title}
              subtitle={buildSubtitle(project)}
              description={project.preview}
              link={project.link ?? `/work/${project.slug}`}
              linkText={project.linkText ?? "view project >"}
              target={project.link ? "_blank" : "_self"}
            />

            {index < projects.length - 1 && (
              <div className="pb-8">
                <div className="h-px bg-linear-to-r from-transparent via-accent/25 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
