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
        <span className="text-accent">index</span>
      </nav>
    );
  }

  return (
    <nav
      className={`flex items-center space-x-2 text-xs lg:text-sm text-neutral-400 ${className}`}
    >
      <a
        href="/"
        className="hover:text-neutral-300 transition-colors duration-200"
      >
        index
      </a>
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <span className="text-neutral-600">/</span>
          {item.isLast ? (
            <span className="text-accent">{item.label}</span>
          ) : (
            <a
              href={item.href}
              className="hover:text-neutral-300 transition-colors duration-200"
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
}
