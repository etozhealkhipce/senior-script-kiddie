import { forwardRef } from "react";

type TButtonVariant = "primary" | "secondary";

type TProps = {
  variant?: TButtonVariant;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

const VARIANT_CLASSES: Record<TButtonVariant, string> = {
  primary:
    "rounded-md bg-accent px-3 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-neutral-800",
  secondary:
    "rounded-md border border-neutral-500 bg-transparent px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-800",
};

export const Button = forwardRef<HTMLButtonElement, TProps>(
  ({ variant = "primary", children, className = "", type = "button", onClick, disabled }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${VARIANT_CLASSES[variant]} ${className}`.trim()}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
