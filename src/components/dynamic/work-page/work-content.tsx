import { ContentHeader } from "../common/content-header";
import { ProjectCard } from "./project-card";

export const WorkContent = () => {
  return (
    <div className="space-y-8 max-w-full lg:max-w-xl">
      <div className="flex flex-col">
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
