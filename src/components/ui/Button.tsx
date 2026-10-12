import { DrawablyButton } from "drawably/react";
import type { ReactNode } from "react";

type TButtonVariant = "primary" | "secondary";

type TProps = {
  variant?: TButtonVariant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

// Hand-drawn button, same library and look as the admin (admin-ui/src/ui/Button.tsx).
// The label sits in its own span: drawably puts its sketch <svg> inside the button,
// and React would wipe it when a bare text child changes.
export const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  onClick,
  disabled,
}: TProps) => (
  <DrawablyButton
    key={variant}
    type={type}
    onClick={onClick}
    disabled={disabled}
    variant={variant === "primary" ? "solid" : "outline"}
    boil={0}
    className={`px-3 py-2 text-sm font-medium ${className}`.trim()}
  >
    <span>{children}</span>
  </DrawablyButton>
);
