import { forwardRef, type ReactNode } from "react";
import { Link } from "@/components/dynamic/common/link";

type Props = {
  title: string;
  subtitle?: string | ReactNode;
  description?: string;
  date: string;
  slug: string;
};

export const NoteCard = forwardRef<HTMLDivElement, Props>(
  ({ title, subtitle, description, date, slug }, ref) => (
    <div ref={ref} className="mb-6">
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
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-neutral-500">{date}</span>
        <Link
          href={`/notes/${slug}`}
          className="underline underline-offset-2 !text-base"
        >
          read more {">"}
        </Link>
      </div>
    </div>
  )
);
