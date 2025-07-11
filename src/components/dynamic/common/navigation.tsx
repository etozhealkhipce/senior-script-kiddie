import { useEffect, useState } from "react";
import { ALL_ROUTES } from "../../../lib/available-routes";
import { Link } from "./link";

type Props = {
  className?: string;
  initialPath: string;
};

export function Navigation({ className = "", initialPath }: Props) {
  const [currentPath, setCurrentPath] = useState(initialPath);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav
      className={`fixed bottom-14 right-14 flex flex-row lg:flex-col items-center lg:items-end space-y-2 max-w-[129px] ${className} hidden lg:flex`}
    >
      {ALL_ROUTES.map((link) => {
        const isActive = currentPath === link.href;
        return (
          <Link
            href={link.href}
            isActive={isActive}
            className="!py-0"
            key={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
