import { useRef } from "react";
import { ContentHeader } from "../common/content-header";
import { ProjectCard } from "./project-card";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const WorkContent = () => {
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

  return (
    <div
      ref={containerRef}
      className="space-y-8 max-w-full lg:max-w-xl opacity-0"
    >
      <div className="flex flex-col" ref={headerRef}>
        <ContentHeader title="work" subtitle="team and personal projects" />
      </div>

      <div className="flex flex-col space-y-4 font-light">
        {[
          {
            title: "Block Forge",
            subtitle: [
              {
                title: "typescript",
                highlight: false,
              },
              {
                title: "react",
                highlight: false,
              },
              {
                title: "editorjs",
                highlight: false,
              },
              {
                title: "open source",
                highlight: true,
              },
            ],
            description:
              "A powerful article builder for React based on EditorJS and built with shadcn/ui and Tailwind CSS. Create beautiful, structured content with a modern block-based editor.",
            link: "https://github.com/block-forge-editor/block-forge-editor",
            target: "_blank" as const,
            linkText: "view project >",
          },
          {
            title: "Finansly",
            subtitle: [
              {
                title: "react",
                highlight: false,
              },
              {
                title: "typescript",
                highlight: false,
              },
              {
                title: "effector",
                highlight: false,
              },
              {
                title: "golang",
                highlight: false,
              },
              {
                title: "team project",
                highlight: true,
              },
              {
                title: "wip",
                highlight: true,
              },
            ],
            description:
              "A mobile-focused web budget app that helps users track income, expenses, and savings with real-time insights and simple visual summaries.",
            link: "https://finansly.space/",
            target: "_blank" as const,
            linkText: "website link >",
          },
        ].map((project) => (
          <ProjectCard
            ref={addToProjectsRefs}
            key={project.title}
            {...project}
            subtitle={project.subtitle?.map((item, index) => (
              <span key={item.title}>
                {item.highlight ? (
                  <span className="bg-accent/30 text-white">{item.title}</span>
                ) : (
                  item.title
                )}
                {index !== project.subtitle.length - 1 && ", "}
              </span>
            ))}
          />
        ))}
      </div>
    </div>
  );
};
