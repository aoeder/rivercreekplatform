import type { ButtonHTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Primary action button. Additional variants (secondary, ghost, destructive)
 * are added when a screen needs them (DESIGN_SYSTEM.md §27).
 */
export function Button({ className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        "inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-on-accent hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
