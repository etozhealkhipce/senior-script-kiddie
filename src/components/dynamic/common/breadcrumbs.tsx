import { type FC, useEffect, useState } from "react";
import { ALL_ROUTES } from "@/lib/available-routes";
import { Link } from "./link";

type Props = {
  className?: string;
  initialPath: string;
};

export const Breadcrumbs: FC<Props> = ({ className = "", initialPath }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const pathSegments = currentPath.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment === "" ? "index" : segment;
    const isLast = index === pathSegments.length - 1;

    return {
      href,
      label: label,
      isLast,
    };
  });

  return (
    <>
      <nav
        className={`flex items-center space-x-2 text-xs text-neutral-400 lg:hidden ${className} flex-wrap`}
      >
        {ALL_ROUTES.map((route, index) => (
          <div key={route.href} className="flex items-center space-x-2">
            {index > 0 && <span className="text-neutral-600">/</span>}
            <Link
              href={route.href}
              className={currentPath === route.href ? "text-accent" : ""}
              isActive={
                currentPath === route.href ||
                (currentPath.includes(route.href) && route.href !== "/")
              }
            >
              {route.label}
            </Link>
          </div>
        ))}
      </nav>

      <nav
        className={`hidden lg:flex items-center space-x-2 text-sm text-neutral-400 ${className}`}
      >
        {currentPath === "/" ? (
          <Link href="/" className="text-accent" isActive>
            index
          </Link>
        ) : (
          <>
            <Link href="/">index</Link>
            {breadcrumbItems.map((item) => (
              <div key={item.href} className="flex items-center space-x-2">
                <span className="text-neutral-600">/</span>
                {item.isLast ? (
                  <Link href={item.href} className="text-accent" isActive>
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    isActive={currentPath.includes(item.href) && item.href !== "/"}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </>
        )}
      </nav>
    </>
  );
};
