import { Link } from "./link";

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
      className={`fixed bottom-14 right-14 flex flex-row lg:flex-col items-center lg:items-end space-y-2 max-w-[129px] ${className}`}
    >
      {links.map((link) => {
        const isActive = currentPath === link.href;
        return (
          <Link href={link.href} isActive={isActive} className="!py-0">
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
