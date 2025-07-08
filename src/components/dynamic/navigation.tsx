type Props = {
  className?: string;
  currentPath: string;
};

export function Navigation({ className = "", currentPath }: Props) {
  const links = [
    { href: "/", label: "index" },
    { href: "/about", label: "about" },
    // { href: "/work", label: "works" },
    // { href: "/notes", label: "notes" },
  ];

  return (
    <nav
      className={`flex flex-row lg:flex-col items-center lg:items-end space-x-6 lg:space-x-0 lg:space-y-2 max-w-[129px] ${className}`}
    >
      {links.map((link) => {
        const isActive = currentPath === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            className={`hover:text-neutral-300 transition-colors duration-200 text-sm ${
              isActive ? "text-accent" : "text-neutral-400"
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
