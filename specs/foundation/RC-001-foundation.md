# RC-001 — Application Foundation

## Status

READY FOR IMPLEMENTATION

## Priority

P0

## Owner

Implementation agent

## Review

Independent engineering review required before merge.

---

## 1. Objective

Create the initial production-oriented Rivercreek application foundation.

This ticket establishes the technical base on which the Rivercreek V1 cattle transaction workflow will be built.

The result should be a working application that:

- runs locally
- builds successfully
- has a clear repository structure
- has an initial design-system foundation
- supports automated testing
- supports CI
- preserves the architectural boundaries defined in Rivercreek documentation
- is ready for database, authentication, organizations, and domain modules to be added next

This ticket does not implement the Rivercreek marketplace or transaction workflow.

It establishes the foundation correctly once so future agents can build quickly without repeatedly restructuring the application.

---

## 2. Required Reading

Before implementation, read:

1. `/AGENTS.md`
2. `/docs/PRODUCT.md`
3. `/docs/BUSINESS_RULES.md`
4. `/docs/UX.md`
5. `/docs/DESIGN_SYSTEM.md`
6. `/docs/DATA_MODEL.md`
7. `/docs/ARCHITECTURE.md`
8. `/docs/SECURITY.md`

These documents are authoritative according to the precedence rules in `AGENTS.md`.

Do not implement assumptions that conflict with them.

If a material conflict exists, stop and document the conflict rather than silently resolving it.

---

## 3. Product Context

Rivercreek is building:

> market, transaction, physical clearing, and data infrastructure for agriculture.

The first application is the first-party interface to that infrastructure.

The application itself is not the infrastructure.

The architecture must therefore avoid trapping core future business capabilities inside:

- React components
- pages
- browser state
- UI-specific handlers

The long-term system must be capable of serving additional interfaces such as APIs and integrations.

RC-001 should preserve that direction without prematurely building public API infrastructure.

---

## 4. Initial Product Wedge

Rivercreek V1 begins with cattle.

The eventual first complete vertical transaction should support:

```text
PRODUCER
    ↓
CATTLE INVENTORY
    ↓
LOT
    ↓
LISTING
    ↓
BUYER OFFER
    ↓
ACCEPTANCE
    ↓
TRANSACTION
    ↓
PROCESSING
    ↓
TRANSPORTATION
    ↓
FULFILLMENT
    ↓
SETTLEMENT
```

RC-001 does not implement this workflow.

It creates the application foundation required to implement it cleanly.

---

## 5. Architectural Direction

Use the architecture defined in `docs/ARCHITECTURE.md`.

The initial application should be a:

> modular monolith

Do not introduce microservices.

Do not introduce unnecessary distributed infrastructure.

The expected technology direction is:

- TypeScript
- Next.js
- React
- PostgreSQL later through the approved persistence layer
- server-side authoritative business logic
- explicit domain modules
- automated tests
- managed infrastructure where appropriate

---

## 6. Application Framework

Initialize the Rivercreek application using a current stable Next.js version compatible with the repository and selected dependencies.

Use:

- TypeScript
- App Router
- ESLint
- appropriate modern Next.js defaults

Do not use the legacy Pages Router for the primary application.

---

## 7. Package Manager

Use one package manager consistently.

Prefer `npm` unless the existing repository already establishes another package manager.

Commit the appropriate lockfile.

Do not create multiple lockfiles.

---

## 8. Source Directory

Use a `src` directory.

The application should establish a structure conceptually similar to:

```text
src/
├── app/
├── components/
│   ├── ui/
│   └── domain/
├── modules/
├── lib/
├── integrations/
└── db/
```

Do not create empty architecture theater merely to make the directory tree look sophisticated.

Create directories when they have an immediate purpose or include an appropriate placeholder/readme if necessary.

---

## 9. Application Layer

The `src/app` directory should contain routing and application composition.

It should not become the permanent home of Rivercreek business logic.

Route handlers, pages, layouts, and server actions should call reusable application/domain capabilities as those capabilities are introduced.

---

## 10. Components

Establish:

```text
src/components/ui
```

for reusable visual primitives.

Establish:

```text
src/components/domain
```

for reusable Rivercreek-specific interface components when those components begin to exist.

Do not put canonical business logic inside components.

---

## 11. Modules

Establish the architectural convention that Rivercreek business domains belong under:

```text
src/modules
```

Future modules are expected to include concepts such as:

```text
identity
organizations
inventory
market
offers
transactions
processing
logistics
fulfillment
settlement
```

RC-001 does not need to implement those modules.

Do not generate fake domain implementations merely to populate folders.

---

## 12. Shared Library

Use:

```text
src/lib
```

for genuinely shared application infrastructure and utilities.

Do not turn `lib` into an unstructured dumping ground.

Domain-specific logic belongs with its domain.

---

## 13. Integrations

Reserve:

```text
src/integrations
```

for external-system adapters as integrations are introduced.

Examples later may include:

- authentication
- payments
- mapping
- messaging
- object storage
- processor systems
- logistics systems

RC-001 should not implement speculative integrations.

---

## 14. Database Boundary

Reserve:

```text
src/db
```

for database-related infrastructure once persistence is introduced.

RC-001 should not invent the production schema.

The canonical conceptual model already exists in:

```text
docs/DATA_MODEL.md
```

Database implementation will be handled by a separate ticket.

---

## 15. Styling

Establish a maintainable styling foundation consistent with `DESIGN_SYSTEM.md`.

The implementation should support:

- reusable design tokens
- responsive layouts
- accessible states
- restrained visual design
- future reusable components

Do not build a large custom styling framework in RC-001.

If Tailwind CSS is selected as part of the current Next.js stack, use it consistently and keep design decisions centralized.

---

## 16. Design Direction

The initial shell should feel:

- serious
- restrained
- precise
- trustworthy
- modern
- calm
- operational

It should not look like:

- generic green farm software
- crypto
- a trading casino
- a social network
- a cartoon agricultural application
- a generic AI-generated SaaS dashboard

Agriculture should not be communicated through excessive visual clichés.

Avoid unnecessary:

- gradients
- glass effects
- glow
- animation
- decorative illustrations

---

## 17. Initial Application Shell

Create a minimal Rivercreek application shell sufficient to demonstrate that the application foundation works.

The shell should include:

- Rivercreek identity/name
- basic application layout
- primary content region
- responsive behavior

Do not attempt to design the entire final navigation system in this ticket.

The purpose is foundation validation.

---

## 18. Initial Page

Create a restrained initial application page.

It should communicate that the Rivercreek application is running.

It may include language such as:

> Rivercreek

> Market and transaction infrastructure for agriculture.

Do not create fake marketplace statistics.

Do not create fake transactions.

Do not create fake customer claims.

Do not invent product functionality that has not been implemented.

---

## 19. Responsive Foundation

The initial application shell must work at both:

- desktop width
- mobile width

There should be no obvious horizontal overflow or unusable layout.

Future Rivercreek core workflows must be capable of functioning on mobile.

---

## 20. Accessibility Foundation

Use semantic HTML.

Ensure:

- keyboard-accessible interactive elements
- visible focus behavior
- appropriate labels
- reasonable contrast
- meaningful page structure

Do not defer basic accessibility until later.

---

## 21. TypeScript

Use TypeScript strictly enough to provide meaningful safety.

Avoid unnecessary `any`.

Do not disable important compiler checks merely to make the application build.

---

## 22. Formatting

Establish a consistent formatting approach.

Use the framework/repository's existing formatting configuration where present.

If a formatter is added, it should be standard and minimally configured.

Do not create elaborate formatting rules.

---

## 23. Linting

The repository must have a working lint command.

Example expected command:

```bash
npm run lint
```

The exact command may follow the chosen package setup.

Lint should fail CI on meaningful violations.

---

## 24. Type Checking

Provide an explicit type-check command if not already covered adequately.

Preferred:

```bash
npm run typecheck
```

It should perform TypeScript validation without emitting production artifacts.

---

## 25. Build

The application must successfully build for production.

Expected:

```bash
npm run build
```

The implementation agent must actually execute this command before declaring the ticket complete.

---

## 26. Development Command

The application must run locally using a straightforward command.

Expected:

```bash
npm run dev
```

Document anything unusual required for local startup.

RC-001 should not require external production credentials to display the application shell.

---

## 27. Test Foundation

Establish an automated test foundation.

At minimum support:

- unit testing
- future integration testing

Use a mature TypeScript-compatible testing tool appropriate for the stack.

Do not write large numbers of meaningless tests merely to increase coverage.

---

## 28. Initial Unit Test

Include at least one small legitimate test proving the test runner works.

Do not test trivial framework internals.

A simple Rivercreek-owned utility or application behavior may be used.

The purpose is validating the test infrastructure.

---

## 29. End-to-End Foundation

Establish Playwright unless a material compatibility problem exists.

The repository should be prepared for browser end-to-end testing.

Include a minimal smoke test that confirms the application loads successfully.

Example intent:

```text
Given the Rivercreek application is running
When a user opens the root application
Then the Rivercreek identity is visible
```

---

## 30. Test Commands

Provide clear scripts for tests.

Prefer understandable commands such as:

```bash
npm run test
npm run test:e2e
```

Exact implementation may vary.

---

## 31. CI

Create an initial GitHub Actions CI workflow.

CI should run on appropriate pull requests and/or pushes.

At minimum it should verify:

1. dependency installation
2. lint
3. typecheck
4. unit tests
5. production build

E2E may be included if reliable and reasonably fast.

If E2E is not included in the first CI workflow, document why and ensure it remains runnable locally.

---

## 32. CI Security

CI must not require production secrets for RC-001.

Do not expose secrets to untrusted pull-request contexts.

Use least privilege for workflow permissions.

Use maintained official or reputable actions.

---

## 33. Environment Configuration

Provide an appropriate example environment file if environment variables are required.

Example:

```text
.env.example
```

It must contain placeholders only.

Never commit real secrets.

If RC-001 requires no environment variables, do not invent unnecessary ones.

---

## 34. Git Ignore

Verify `.gitignore` excludes appropriate local/generated files such as:

- dependencies
- build output
- local environment secrets
- test artifacts where appropriate
- local IDE/runtime files where appropriate

Do not ignore files that should be version controlled.

---

## 35. README

Update `README.md` enough to explain:

- what the repository is
- prerequisite runtime
- installation
- local development
- lint
- typecheck
- unit tests
- E2E tests
- production build

Keep it concise.

The canonical product definition remains in `/docs`.

Do not duplicate thousands of lines of product documentation into README.

---

## 36. Runtime Version

Specify or document the expected Node.js runtime version using an appropriate standard mechanism.

Use a currently supported stable/LTS version compatible with the selected Next.js version.

CI and local expectations should align.

---

## 37. No Database Yet

Do not implement the Rivercreek production database schema in RC-001.

Database implementation belongs in a subsequent ticket.

Do not create placeholder tables.

---

## 38. No Authentication Yet

Do not implement production authentication in RC-001.

Authentication belongs in a subsequent ticket.

Do not create fake authentication architecture that later has to be removed.

---

## 39. No Marketplace Yet

Do not implement:

- cattle inventory
- lots
- listings
- offers
- transactions
- processing
- logistics
- settlement

in RC-001.

This ticket is intentionally narrow.

---

## 40. No Public API Yet

Do not build:

- public REST API
- GraphQL API
- API keys
- developer portal
- SDK
- public webhooks

The architecture must remain capable of supporting these later.

---

## 41. No Microservices

Do not create:

- separate services
- service mesh
- message broker
- Kafka
- Kubernetes
- distributed workflow system

RC-001 should remain a simple modular application foundation.

---

## 42. No Premature Infrastructure

Do not add:

- Redis
- Elasticsearch
- data warehouse
- event-streaming platform
- machine-learning infrastructure
- complex observability platform

unless required to make the foundation function, which is not expected.

---

## 43. No Fake Complexity

Do not create abstractions solely because Rivercreek may become large.

Do not create:

- generic repository factories
- generic workflow engines
- universal event frameworks
- universal permissions engines
- universal commodity engines

without a current requirement.

---

## 44. Dependency Discipline

Keep dependencies minimal.

Before adding a dependency, ask:

> Does the platform or existing stack already solve this adequately?

Do not install packages for trivial functionality.

---

## 45. Security Requirements

Follow `docs/SECURITY.md`.

In particular:

- no secrets in Git
- no unsafe dynamic execution
- no unnecessary raw HTML
- no production credentials
- no weakened compiler/security settings
- no hidden security bypasses

AI-generated code is not trusted merely because it compiles.

---

## 46. Error Handling

The initial shell should fail cleanly.

Do not expose internal stack traces in user-facing production UI.

Framework development diagnostics are acceptable during local development.

---

## 47. Logging

Do not introduce elaborate logging infrastructure.

Use straightforward server logging where necessary.

Do not log secrets or sensitive credentials.

Structured logging can be expanded when meaningful application behavior exists.

---

## 48. Performance

The initial page should be lightweight.

Avoid unnecessary:

- client-side JavaScript
- huge dependencies
- large images
- animation libraries
- data-fetching frameworks

Use server rendering appropriately.

---

## 49. Server and Client Components

Use Next.js server components by default where appropriate.

Use client components only where browser interactivity requires them.

Do not mark the entire application as client-side unnecessarily.

---

## 50. Metadata

Add appropriate basic application metadata.

At minimum:

- title
- description

Keep claims accurate.

---

## 51. Branding

Use the Rivercreek name consistently.

Do not invent alternate product names.

Do not introduce unapproved logos or brand assets merely to decorate the shell.

If no canonical asset is available in the repository, use a restrained text treatment.

---

## 52. Comments

Use comments to explain non-obvious reasoning.

Do not narrate obvious code line by line.

Important architectural decisions should live in documentation rather than scattered comments.

---

## 53. File Naming

Use consistent, predictable naming conventions.

Avoid vague names such as:

- helper2
- utils-new
- final-component
- stuff
- misc

Names should communicate purpose.

---

## 54. Dead Code

Do not leave:

- unused generated examples
- sample Next.js marketing content
- unused imports
- placeholder tutorial code
- abandoned components

Remove scaffold content that does not belong to Rivercreek.

---

## 55. Generated Scaffold Review

Framework-generated code is not automatically accepted.

Review generated files.

Remove unnecessary scaffold content.

Keep only what supports Rivercreek.

---

## 56. Required Scripts

At completion, the repository should expose straightforward commands for:

```text
development
linting
type checking
unit testing
end-to-end testing
production build
```

Exact script names should be obvious and documented.

---

## 57. Required Checks

Before declaring RC-001 complete, the implementation agent must actually run the applicable commands.

Expected:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

And where configured:

```bash
npm run test:e2e
```

Do not claim a command passed unless it was executed.

---

## 58. Browser Review

The implementation must be visually inspected at:

- desktop width
- mobile width

Check:

- layout
- typography
- spacing
- overflow
- focus behavior
- basic responsiveness

---

## 59. Required Evidence

The implementation PR should include:

- summary of changes
- architecture decisions made
- dependencies added
- commands executed
- test results
- known limitations
- desktop screenshot
- mobile screenshot

If screenshots cannot be attached through the agent environment, clearly state that manual visual review is still required.

---

## 60. Acceptance Criteria

RC-001 is complete when all of the following are true:

- [ ] Next.js application exists
- [ ] TypeScript is configured
- [ ] App Router is used
- [ ] application runs locally
- [ ] application builds successfully
- [ ] `src` architecture exists
- [ ] UI component boundary exists
- [ ] domain module boundary is established
- [ ] shared library boundary is established
- [ ] integration boundary is established
- [ ] database boundary is established
- [ ] initial Rivercreek shell exists
- [ ] shell is responsive
- [ ] shell follows Rivercreek visual direction
- [ ] no fake marketplace data is shown
- [ ] lint works
- [ ] typecheck works
- [ ] unit-test runner works
- [ ] initial legitimate unit test exists
- [ ] Playwright foundation exists
- [ ] basic browser smoke test exists
- [ ] production build works
- [ ] CI workflow exists
- [ ] CI requires no production secrets
- [ ] README contains development instructions
- [ ] runtime version is documented
- [ ] package lockfile is committed
- [ ] `.gitignore` is appropriate
- [ ] no secrets are committed
- [ ] no database schema is prematurely implemented
- [ ] no production authentication is prematurely implemented
- [ ] no marketplace domain is prematurely implemented
- [ ] no public API is prematurely implemented
- [ ] no unnecessary distributed infrastructure exists

---

## 61. Definition of Done

This ticket is done only when:

1. implementation is complete
2. relevant tests pass
3. lint passes
4. typecheck passes
5. production build passes
6. browser smoke test passes
7. desktop presentation has been reviewed
8. mobile presentation has been reviewed
9. documentation is updated
10. implementation respects all canonical Rivercreek documents
11. no unresolved material architectural assumption has been silently introduced
12. changes are ready for independent review

---

## 62. Reviewer Instructions

The reviewer should assume the implementation may contain mistakes.

Review specifically for:

### Architecture

- business logic accidentally placed in UI
- unnecessary abstractions
- premature infrastructure
- inconsistent repository structure
- unnecessary dependencies

### Security

- committed secrets
- insecure configuration
- dangerous HTML or execution
- overly broad CI permissions
- exposed environment variables

### Quality

- TypeScript bypasses
- dead scaffold code
- broken scripts
- missing tests
- misleading README instructions

### UX

- generic AI-generated dashboard appearance
- excessive agricultural clichés
- poor mobile behavior
- inaccessible interactions
- unnecessary visual complexity

### Scope

- database implemented prematurely
- auth implemented prematurely
- marketplace implemented prematurely
- public API implemented prematurely

Report findings using:

```text
BLOCKING
HIGH
MEDIUM
LOW
```

Do not approve solely because the application runs.

---

## 63. Prohibited Decisions

The implementation agent may not independently decide:

- final production database schema
- ORM selection if not separately approved
- authentication provider
- payment provider
- legal transaction semantics
- Rivercreek fee structure
- title transfer rules
- risk-of-loss rules
- public API contract
- production infrastructure architecture beyond what is required for this foundation
- production secrets strategy beyond canonical security requirements

If implementation requires one of these decisions, stop and escalate it.

---

## 64. Expected Result

At the end of RC-001, Rivercreek should have a clean application foundation.

A developer should be able to:

```text
clone repository
↓
install dependencies
↓
run application
↓
run tests
↓
run lint
↓
run typecheck
↓
build production application
```

without understanding hidden setup.

The browser should show a restrained Rivercreek application shell.

The repository should be ready for:

```text
RC-002 — Database Foundation
RC-003 — Authentication
RC-004 — Organizations and Memberships
```

The system should still be simple.

That simplicity is intentional.

---

## 65. Final Implementation Principle

Do not try to build Rivercreek in RC-001.

Build the foundation that allows Rivercreek to be built correctly and quickly.

Prefer:

- boring technology
- explicit structure
- strong typing
- clear boundaries
- automated verification
- restrained design
- minimal dependencies

over:

- novelty
- abstraction
- premature scale
- speculative infrastructure

The success condition is not:

> The repository looks sophisticated.

The success condition is:

> The next Rivercreek feature can be implemented quickly without undoing the foundation.