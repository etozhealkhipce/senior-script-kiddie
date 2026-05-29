import type { FC } from "react";
import { ContentHeader } from "./common/content-header";
import { Link } from "./common/link";

export const NotFoundContent: FC = () => {
  return (
    <div className="space-y-8 max-w-full lg:max-w-xl">
      <ContentHeader title="not found" subtitle="the page you're looking for doesn't exist" />

      <div className="flex flex-col space-y-4 font-light">
        <p>
          either it was deleted, moved, or{" "}
          <span className="bg-accent/30 text-white px-1 rounded">never existed</span> in the first
          place.
        </p>
        <p>
          <span className="bg-accent/30 text-white px-1 rounded">happens</span> to the best of us.
        </p>
      </div>

      <Link href="/">{"<"} go home</Link>
    </div>
  );
};
