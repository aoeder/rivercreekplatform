import { PageHeader } from "@/components/ui/page-header";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <PageHeader title={siteConfig.name} description={siteConfig.description} />

      <section
        aria-labelledby="application-status"
        className="mt-10 max-w-2xl border-t border-line pt-6"
      >
        <h2 id="application-status" className="text-sm font-medium text-ink-muted">
          Application status
        </h2>
        <p className="mt-2 text-base text-ink">The Rivercreek application is running.</p>
        <p className="mt-1 text-base text-ink-muted">
          Farms, cattle, listings, offers, and transactions are not available yet.
        </p>
      </section>
    </>
  );
}
