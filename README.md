# Rivercreek Platform

The Rivercreek application: market and transaction infrastructure for agriculture.

This repository is a modular monolith built with Next.js (App Router), React, and TypeScript.
What Rivercreek is and how it must behave are defined in [`AGENTS.md`](AGENTS.md) and
[`docs/`](docs). Ticket specifications live in [`specs/`](specs).

## Prerequisites

- **Node.js 24 LTS.** The version is pinned in [`.nvmrc`](.nvmrc) and `package.json` `engines`,
  and CI uses the same file. With nvm or fnm, run `nvm use` / `fnm use`.
- **npm** (bundled with Node). npm is the only package manager; commit `package-lock.json`.

No environment variables or external credentials are required to run the application today.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

| Command                | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Start the local development server                    |
| `npm run lint`         | ESLint (fails on any warning)                         |
| `npm run typecheck`    | Generate Next.js route types, then run `tsc --noEmit` |
| `npm run test`         | Unit and integration tests (Vitest)                   |
| `npm run test:watch`   | Vitest in watch mode                                  |
| `npm run test:e2e`     | Production build, then Playwright browser tests       |
| `npm run build`        | Production build                                      |
| `npm run start`        | Serve the production build                            |
| `npm run format`       | Format code with Prettier                             |
| `npm run format:check` | Check formatting (run in CI)                          |

Before running E2E tests for the first time, install the Playwright browser:

```bash
npx playwright install chromium
```

E2E tests start their own production server on port 3100 and run in a desktop and a mobile
viewport.

## Repository structure

```text
src/
├── app/              Routing and application composition only — no business logic
├── components/
│   ├── ui/           Reusable visual primitives (design-system components)
│   └── domain/       Reusable Rivercreek-specific UI components
├── modules/          Business domains (inventory, offers, transactions, …)
├── lib/              Genuinely shared application utilities
├── integrations/     Adapters for external systems
└── db/               Database infrastructure (added in RC-002)
tests/
├── unit/             Vitest — pure logic, no browser or React
├── integration/      Vitest — module and database behavior (added with persistence)
└── e2e/              Playwright — real browser workflows
```

Each boundary directory has a short README describing what belongs there. ESLint enforces the
layer direction (a unit test guards the rules):

- `src/modules` may not import routes, UI components, React, or Next.js.
- `src/integrations` and `src/db` may not import routes or UI components.
- `src/lib` may not import routes, UI components, or domain modules.

Design tokens (color, radius) live in [`src/app/globals.css`](src/app/globals.css). Tailwind's
default color palette and radius scale are removed so every color and radius comes from those tokens.

## Security baseline

The application sends baseline security headers (see [`next.config.ts`](next.config.ts)); an E2E
test verifies them. The following are intentionally deferred because they depend on the hosting
platform or repository settings rather than application code:

- **HSTS** — set by the production hosting platform once one is chosen.
- **Script Content-Security-Policy** — requires nonce support; added once the application has
  real interactive surface area (`docs/SECURITY.md` §82).
- **Secret scanning, push protection, and Dependabot alerts** — enabled in the GitHub repository
  settings by a repository administrator (`docs/SECURITY.md` §98–§99).

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every pull request and on pushes
to `main`: format check, lint, typecheck, unit tests, production build, and the Playwright smoke
tests. It uses a read-only token and needs no secrets.
