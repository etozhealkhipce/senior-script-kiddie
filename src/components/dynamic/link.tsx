import type { FC } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
};

export const Link: FC<Props> = ({ href, children, className, isActive }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:text-neutral-300 transition-colors duration-200 text-sm ${
        isActive ? "text-accent" : "text-neutral-400"
      } ${className}`}
    >
      {children}
    </a>
  );
};
