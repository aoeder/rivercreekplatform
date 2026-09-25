import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Import restrictions that keep the modular-monolith layers pointing one way:
// app → components → modules → lib (docs/ARCHITECTURE.md §9–§13, §27).
// Patterns match both the "@/" alias and relative paths.
const noAppOrComponents = {
  group: ["@/app", "@/app/**", "@/components", "@/components/**", "**/app/**", "**/components/**"],
  message: "Routes and UI components may depend on this layer, not the other way around.",
};

const noModules = {
  group: ["@/modules", "@/modules/**", "**/modules/**"],
  message: "Shared utilities in src/lib must not depend on domain modules.",
};

const noReactOrNext = {
  group: ["react", "react/**", "react-dom", "react-dom/**", "next", "next/**"],
  message: "Domain modules must not depend on React or Next.js.",
};

function restrictImports(...patterns) {
  return { "no-restricted-imports": ["error", { patterns }] };
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Domain logic must be reusable by future APIs and integrations.
    files: ["src/modules/**/*.{ts,tsx}"],
    rules: restrictImports(noAppOrComponents, noReactOrNext),
  },
  {
    files: ["src/integrations/**/*.{ts,tsx}", "src/db/**/*.{ts,tsx}"],
    rules: restrictImports(noAppOrComponents),
  },
  {
    files: ["src/lib/**/*.{ts,tsx}"],
    rules: restrictImports(noAppOrComponents, noModules),
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
