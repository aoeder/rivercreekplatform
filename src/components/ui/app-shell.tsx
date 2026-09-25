import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site-config";

const MAIN_CONTENT_ID = "main-content";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only rounded-sm bg-surface px-3 py-2 text-sm font-medium text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
      >
        Skip to main content
      </a>

      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center px-4 sm:px-6">
          <Link href="/" className="rounded-sm text-base font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </Link>
        </div>
      </header>

      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-ink-muted sm:px-6">
          The Rivercreek Company
        </div>
      </footer>
    </div>
  );
}
