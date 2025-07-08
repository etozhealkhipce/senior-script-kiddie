import { Link } from "./link";

interface BreadcrumbsProps {
  currentPath: string;
  className?: string;
}

export function Breadcrumbs({ currentPath, className = "" }: BreadcrumbsProps) {
  const pathSegments = currentPath
    .split("/")
    .filter((segment) => segment !== "");

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

  if (currentPath === "/") {
    return (
      <nav
        className={`flex items-center space-x-2 text-xs lg:text-sm text-neutral-400 ${className}`}
      >
        <Link href="/" className="text-accent" isActive>
          index
        </Link>
      </nav>
    );
  }

  return (
    <nav
      className={`flex items-center space-x-2 text-xs lg:text-sm text-neutral-400 ${className}`}
    >
      <Link href="/">index</Link>

      {breadcrumbItems.map((item) => (
        <div key={item.href} className="flex items-center space-x-2">
          <span className="text-neutral-600">/</span>
          {item.isLast ? (
            <Link href={item.href} className="text-accent" isActive>
              {item.label}
            </Link>
          ) : (
            <Link href={item.href}>{item.label}</Link>
          )}
        </div>
      ))}
    </nav>
  );
}
