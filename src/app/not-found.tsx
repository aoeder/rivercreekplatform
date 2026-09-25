import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" description="This page doesn't exist or has moved." />
      <p className="mt-6">
        <Link href="/" className="rounded-sm font-medium text-accent underline underline-offset-4">
          Go to Rivercreek home
        </Link>
      </p>
    </>
  );
}
