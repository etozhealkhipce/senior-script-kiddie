import { forwardRef, type FC } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  target?: "_blank" | "_self";
};

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, className = "", isActive, target = "_self" }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel="noopener noreferrer"
        className={`hover:text-neutral-300 transition-colors duration-200 text-sm py-4 lg:-0 ${
          isActive ? "text-accent" : "text-neutral-400"
        } ${className}`}
      >
        {children}
      </a>
    );
  }
);
