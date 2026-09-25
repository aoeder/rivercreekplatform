import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ErrorPage from "@/app/error";

describe("error page", () => {
  const error = Object.assign(new Error("connect ECONNREFUSED 10.0.0.5:5432 at db.internal"), {
    digest: "4130958734",
  });
  const markup = renderToStaticMarkup(<ErrorPage error={error} retry={() => {}} />);

  it("explains the failure in plain language and offers a retry", () => {
    expect(markup).toContain("Something went wrong");
    expect(markup).toContain("Try again");
  });

  it("does not expose internal error details", () => {
    expect(markup).not.toContain(error.message);
    expect(markup).not.toContain("ECONNREFUSED");
    expect(markup).not.toContain(error.digest);
    expect(markup).not.toContain("at db.internal");
  });
});
