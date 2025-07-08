import { Link } from "./link";

export const AboutContent = () => {
  return (
    <div className="space-y-8 max-w-[460px]">
      <div className="flex flex-col">
        <div className="flex flex-col items-start space-y-2">
          <h1 className="font-secondary text-5xl font-medium">about me</h1>
          <span className="text-secondary font-secondary text-sm">
            and my expirience
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-4 font-light">
        <p>
          Hi! My name is{" "}
          <span className="font-medium bg-accent text-neutral-800">Ilya</span>.
        </p>

        <p>
          I’m a{" "}
          <span className="font-medium bg-accent text-neutral-800">
            frontend developer
          </span>{" "}
          with over{" "}
          <span className="font-medium">6 years of commercial experience</span>.
          In addition to coding, I have experience leading teams and setting up
          processes. I've been involved in designing architecture, making
          technical decisions, and helping my team grow.
        </p>

        <p>
          My current stack includes{" "}
          <span className="font-medium">
            <a
              href="https://react.dev"
              target="_blank"
              className="hover:underline"
            >
              React
            </a>
            ,{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              className="hover:underline"
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://effector.dev"
              target="_blank"
              className="hover:underline"
            >
              Effector
            </a>
            ,{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              className="hover:underline"
            >
              shadcn/ui
            </a>
            , and{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              className="hover:underline"
            >
              Tailwind CSS
            </a>
          </span>
          . I've also worked with many other technologies and am always open to
          learning new tools.
        </p>
      </div>

      <div className="flex flex-row items-center space-x-4 text-secondary text-sm">
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
          <Link href={item.href}>{item.title}</Link>
        ))}
      </div>
    </div>
  );
};
