import type { ReactNode } from "react";

import { classNames } from "@/lib/class-names";

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={classNames("max-w-2xl", className)}>
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {description ? <p className="mt-3 text-lg text-ink-muted">{description}</p> : null}
    </header>
  );
}
