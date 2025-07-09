import type { FC, ReactNode } from "react";
import { Link } from "../common/link";

type Props = {
  title: string;
  subtitle?: string | ReactNode;
  description?: string;
  link?: string;
  linkText?: string;
  target?: "_blank" | "_self";
};

export const ProjectCard: FC<Props> = ({
  title,
  subtitle,
  description,
  link,
  linkText,
  target = "_self",
}) => (
  <div className="mb-6">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-accent inline-block" />
        <span className="font-medium text-lg">{title}</span>
      </div>
      <div className="mb-6 text-secondary font-secondary text-sm font-light">
        {subtitle}
      </div>
    </div>
    <p className="mt-2 text-sm text-secondary">{description}</p>
    <div className="mt-2 text-right">
      <Link
        href={link ?? ""}
        className="underline underline-offset-2 !text-base"
        target={target}
      >
        {linkText}
      </Link>
    </div>
  </div>
);
