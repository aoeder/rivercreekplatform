import { ESLint } from "eslint";
import { beforeAll, describe, expect, it } from "vitest";

// Runs the repository's real ESLint configuration against sample imports so the
// layer boundaries in eslint.config.mjs cannot silently stop being enforced.
let eslint: ESLint;

beforeAll(() => {
  eslint = new ESLint();
});

async function boundaryViolations(filePath: string, importPath: string): Promise<number> {
  const code = `import * as dependency from "${importPath}";\nexport const probe = dependency;\n`;
  const [result] = await eslint.lintText(code, { filePath });
  return (result?.messages ?? []).filter((message) => message.ruleId === "no-restricted-imports")
    .length;
}

describe("architecture boundaries", { timeout: 30_000 }, () => {
  it.each([
    ["@/components/ui/button"],
    ["../../components/ui/button"],
    ["@/app/page"],
    ["react"],
    ["next/headers"],
  ])("domain modules cannot import %s", async (importPath) => {
    expect(await boundaryViolations("src/modules/example/service.ts", importPath)).toBe(1);
  });

  it("domain modules may use shared utilities", async () => {
    expect(await boundaryViolations("src/modules/example/service.ts", "@/lib/class-names")).toBe(0);
  });

  it.each([["src/integrations/example/adapter.ts"], ["src/db/client.ts"]])(
    "%s cannot import UI components",
    async (filePath) => {
      expect(await boundaryViolations(filePath, "@/components/ui/button")).toBe(1);
    },
  );

  it("shared utilities cannot import domain modules", async () => {
    expect(await boundaryViolations("src/lib/example.ts", "@/modules/example/service")).toBe(1);
  });

  it("routes may import domain modules", async () => {
    expect(await boundaryViolations("src/app/page.tsx", "@/modules/example/service")).toBe(0);
  });
});
