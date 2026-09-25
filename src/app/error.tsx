"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

// Error details are intentionally not rendered. In production, Next.js replaces
// server error messages with a digest that matches the server-side log entry.
export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <>
      <PageHeader
        title="Something went wrong"
        description="Rivercreek couldn't load this page. Try loading it again."
      />
      <div className="mt-6">
        <Button onClick={() => retry()}>Try again</Button>
      </div>
    </>
  );
}
