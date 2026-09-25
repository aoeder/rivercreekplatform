# RC-002 — Database Foundation

Status: Draft
Owner: Rivercreek
Type: Foundation
Depends on: RC-001
Implementation target: PostgreSQL + Drizzle ORM

## 1. Objective

Establish Rivercreek's production-oriented relational persistence foundation using PostgreSQL and Drizzle ORM.

RC-002 creates the database infrastructure, conventions, migration workflow, transaction primitives, and test infrastructure required by later Rivercreek domain work.

This ticket does not introduce business-domain tables.

The result should be intentionally boring, explicit, testable, and difficult to misuse.

## 2. Product Context

Rivercreek is building market, transaction, physical clearing, and data infrastructure for agriculture.

The database will ultimately become part of the system of record for objects including:

- organizations
- farms and facilities
- inventory
- lots
- listings
- offers
- transactions
- processing reservations
- shipments
- fulfillment
- reconciliation
- settlements
- ledger records
- audit events

Correctness is therefore more important than ORM convenience.

Database design must preserve Rivercreek's ability to enforce transaction integrity through PostgreSQL constraints, transactions, locking, isolation, and other relational guarantees where appropriate.

## 3. Architecture Decision

Use:

- PostgreSQL as the relational database
- Drizzle ORM
- Drizzle Kit for schema/migration tooling
- TypeScript
- the existing Next.js application architecture

Do not introduce a second ORM.

Do not introduce:

- Prisma
- MongoDB
- Redis as a database substitute
- event sourcing
- Kafka
- microservices
- distributed databases
- database abstraction layers intended to support multiple database engines
- production infrastructure that is not required by this ticket

PostgreSQL is the authoritative relational database.

## 4. Architectural Boundaries

Database infrastructure belongs under the existing persistence boundary.

Application routes and UI components must not directly implement database business logic.

The intended direction remains:

UI
→ Application
→ Domain
→ Persistence / Adapters
→ PostgreSQL

Drizzle is a persistence tool. It must not become the domain model.

Future Rivercreek business rules must remain explicit in domain/application code and database constraints where appropriate.

## 5. Required Deliverables

RC-002 must provide:

1. PostgreSQL-compatible Drizzle configuration.
2. A canonical database client/connection module.
3. Environment-variable handling for database configuration.
4. A migration workflow.
5. An initial migration proving the migration system functions.
6. Database naming conventions.
7. Stable identifier conventions.
8. Timestamp conventions.
9. Exact numeric conventions for future money and quantity fields.
10. Transaction primitives/helpers suitable for later atomic business operations.
11. Test-database infrastructure.
12. Automated database tests.
13. CI validation for database-related work.
14. Local database setup documentation.
15. Migration/recovery documentation appropriate to this stage.

## 6. Environment Configuration

Database configuration must come from environment variables.

At minimum, support:

DATABASE_URL

Requirements:

- no credentials committed to Git
- `.env` files containing secrets remain ignored
- provide `.env.example` only with safe placeholder values if needed
- malformed or missing required configuration must fail clearly
- server-only database configuration must not leak into client bundles
- tests must be able to use an isolated database configuration

Do not expose DATABASE_URL through any `NEXT_PUBLIC_*` variable.

## 7. Database Client

Create one canonical database access path.

Requirements:

- avoid ad hoc connection creation throughout the repository
- connection behavior must be appropriate for development and production runtimes
- importing UI modules must not implicitly establish database connections
- database access must remain server-side
- connection failures must surface useful server-side errors without exposing credentials
- the implementation should remain compatible with a conventional managed PostgreSQL deployment

Do not choose a specific production hosting vendor in this ticket unless technically required.

## 8. Schema Location

Create a clear canonical location for Drizzle schema definitions.

The structure should support later domain growth without requiring all Rivercreek tables to live permanently in one giant file.

However, do not prematurely split the schema into excessive files.

The structure should be obvious to another engineer.

## 9. Naming Conventions

Establish and document conventions before business tables are introduced.

Database identifiers should use a consistent PostgreSQL-friendly naming convention.

Preferred database convention:

snake_case

TypeScript may use idiomatic TypeScript naming where appropriate.

Mapping between application names and database names must remain predictable.

Avoid ambiguous abbreviations.

## 10. Identifier Convention

Rivercreek requires stable identifiers suitable for future:

- web applications
- mobile applications
- APIs
- integrations
- audit records
- external references

Use UUID-based identifiers unless implementation research identifies a material reason not to.

IDs must:

- be globally unique for practical purposes
- not depend on sequential business meaning
- be generated safely
- remain stable for the lifetime of the record
- not encode sensitive information

Document the exact UUID strategy selected.

Do not invent domain-specific human-readable IDs in RC-002.

## 11. Timestamp Convention

Establish consistent timestamps.

At minimum, future persistent records should have conventions for:

- created_at
- updated_at

Requirements:

- store timestamps in a timezone-safe manner
- PostgreSQL should use an appropriate timezone-aware timestamp type
- application code must not rely on local machine timezone for authoritative persistence
- document whether timestamps are database-generated or application-generated

Business-event timestamps such as accepted_at, fulfilled_at, or settled_at will be defined by later tickets.

## 12. Money Convention

Do not create money columns yet.

Document the rule future domain tickets must follow.

Money must never use binary floating-point arithmetic for authoritative economic values.

Future monetary data must use an exact representation such as:

- integer minor units when appropriate, or
- PostgreSQL NUMERIC/DECIMAL with explicit precision and scale when required

The specific representation may vary by domain requirement but must be explicit.

JavaScript `number` must not silently become the authoritative representation for high-integrity monetary calculations where precision could be lost.

Currency must be explicit whenever monetary values are persisted.

## 13. Quantity Convention

Do not create agricultural quantity tables yet.

Document the rule future tickets must follow.

Agricultural quantities may include:

- head
- pounds
- hundredweight
- bushels
- tons
- acres
- gallons
- other commodity-specific units

Future quantity fields must:

- distinguish amount from unit
- avoid ambiguous unitless values
- use exact numeric representations where precision matters
- document conversion behavior
- preserve original measurements when economically or operationally material

Do not build a generalized unit-conversion engine in RC-002.

## 14. Transaction Support

Provide a clear mechanism for executing atomic PostgreSQL transactions through the persistence layer.

This is foundational for later operations such as offer acceptance.

Future logic must be able to perform operations conceptually equivalent to:

BEGIN

verify current state
lock/read authoritative records where required
validate availability
create transaction
reserve inventory
persist accepted terms
write audit/event information

COMMIT

or fully:

ROLLBACK

RC-002 does not implement this business workflow.

It only establishes and tests the database transaction capability required for it.

## 15. Concurrency Philosophy

Document that application-level checks alone are insufficient for critical economic invariants.

Future tickets must use appropriate combinations of:

- PostgreSQL transactions
- constraints
- unique constraints
- row-level locking
- isolation behavior
- idempotency controls

when concurrent requests could violate an invariant.

Do not implement speculative concurrency infrastructure before a concrete domain requirement exists.

## 16. Migration System

Drizzle migrations must be the canonical schema-change mechanism.

Requirements:

- migrations are committed to Git
- schema changes must be reproducible
- migrations must be reviewable
- CI must be capable of validating migration correctness
- developers must not rely on undocumented manual production schema changes

Provide scripts for the required migration workflow.

Script naming should be clear and conventional.

The README must explain the normal workflow for:

1. modifying schema
2. generating a migration
3. reviewing the generated migration
4. applying the migration locally
5. testing it
6. committing schema and migration together

## 17. Initial Migration

Create the minimum initial migration needed to prove the system works.

Do not introduce Rivercreek business-domain tables merely to populate the migration.

A migration metadata/foundation construct may be used if technically appropriate.

If Drizzle does not require an application table to establish the migration system, do not invent one solely for appearance.

## 18. Migration Safety

Document migration principles:

- prefer backward-compatible changes where practical
- destructive migrations require explicit human review
- do not silently drop economically meaningful data
- schema and application deployment ordering matters
- production migration execution must be observable
- production backup/recovery strategy must exist before material production data is stored

Do not build sophisticated zero-downtime migration orchestration in RC-002.

## 19. Test Database

Automated database tests must not depend on production data.

Provide a repeatable approach for an isolated PostgreSQL test database.

Tests must be able to verify at minimum:

- connection
- migration application
- basic database query execution
- transaction commit
- transaction rollback

Tests must clean up after themselves or operate against disposable state.

Do not mock PostgreSQL for tests whose purpose is verifying PostgreSQL behavior.

## 20. Test Isolation

Database tests must not:

- connect to production
- depend on developer-specific data
- depend on execution order
- leave persistent business records
- expose credentials in logs

Include safeguards appropriate to the current stage against accidentally running destructive test operations against production.

## 21. CI

Extend the existing GitHub Actions workflow appropriately.

CI should validate database-related implementation without requiring production credentials.

At minimum, CI must be able to:

- provision or access an ephemeral PostgreSQL service
- apply migrations
- run database tests
- continue running the existing format/lint/typecheck/unit/build/E2E gates as appropriate

Do not weaken existing RC-001 checks.

No production database credentials may be stored in the workflow.

## 22. Health Verification

Provide a minimal server-side mechanism or test utility capable of verifying database connectivity.

Do not expose sensitive database information.

A health response must not reveal:

- DATABASE_URL
- usernames
- passwords
- internal hostnames unnecessarily
- raw database errors

A public production health endpoint is not required by this ticket unless implementation makes one useful and safe.

## 23. Logging and Errors

Database errors must not expose secrets to users.

Server-side diagnostics should remain useful to developers.

Do not log:

- connection strings containing credentials
- passwords
- secret tokens

Later domain-specific error translation belongs in later tickets.

## 24. Security Requirements

Follow `docs/SECURITY.md`.

Specifically:

- database credentials remain server-side
- secrets never enter source control
- CI uses ephemeral test credentials
- production access must not be required for development/tests
- agents must not receive production database credentials
- database failures must fail safely
- SQL injection risks must be addressed through parameterized/query-builder usage
- raw SQL requires justification and careful review

Raw SQL is allowed where PostgreSQL behavior requires it, but it must not become the default for ordinary persistence.

## 25. Dependency Discipline

Add only dependencies required for RC-002.

Expected categories include:

- Drizzle ORM
- Drizzle Kit
- PostgreSQL driver
- environment validation if justified

Do not add unrelated infrastructure libraries.

Any dependency added must have a clear purpose.

## 26. Local Developer Experience

A new engineer should be able to determine from repository documentation:

- what database Rivercreek uses
- how to provide DATABASE_URL
- how to start or obtain a local PostgreSQL instance
- how to apply migrations
- how to generate migrations
- how to run database tests
- how to reset disposable local/test state safely
- what not to do against production

Avoid requiring hidden tribal knowledge.

## 27. Docker

A minimal Docker Compose PostgreSQL service may be added if it materially improves repeatable local development and CI parity.

If added:

- keep it minimal
- use PostgreSQL only
- use safe development credentials
- persist or discard local volumes intentionally
- document commands

Do not containerize the entire Rivercreek application merely because PostgreSQL is containerized.

If Docker is not needed, do not add it.

## 28. Production Hosting

Do not select or provision the production database vendor in RC-002.

The implementation should remain compatible with mainstream managed PostgreSQL services.

Hosting selection is a separate operational decision.

## 29. Backups and Recovery

No production backup system is required because Rivercreek does not yet contain material production data.

However, document the requirement that before material production transaction data exists, Rivercreek must establish:

- automated backups
- point-in-time recovery where appropriate
- restoration testing
- retention policy
- access controls
- recovery objectives

Do not claim backup/recovery is implemented if it is not.

## 30. Data Retention

RC-002 must not invent domain retention periods.

Retention/deletion policy for transaction, settlement, audit, user, and regulatory records requires later product/legal/security decisions.

The persistence architecture must not make future retention enforcement unnecessarily difficult.

## 31. Observability

Sophisticated database observability is outside RC-002.

The implementation should nevertheless preserve the ability to later observe:

- connection health
- query latency
- migration status
- transaction failures
- pool exhaustion
- database capacity

Do not introduce a full observability stack.

## 32. Performance

Do not prematurely optimize.

RC-002 should establish conventions that allow future indexing and query optimization.

No business-domain indexes are required because no business-domain tables are being introduced.

Correctness and clarity take priority.

## 33. API Impact

None.

RC-002 must not create Rivercreek's public API.

Future APIs must use the same application/domain rules as the first-party application.

Database tables are not the public API contract.

## 34. UI Impact

None expected.

Do not build database administration UI.

Do not expose database implementation details in the Rivercreek application interface.

The existing RC-001 shell should continue functioning.

## 35. Required Scripts

Provide clear package scripts for database operations.

Exact names may follow ecosystem conventions, but should cover:

- schema/migration generation
- migration application
- database tests
- normal existing quality gates

Scripts must be documented.

Do not add scripts that imply production deployment behavior that has not been designed.

## 36. Required Automated Tests

At minimum, automated tests must cover:

1. database configuration validation
2. successful PostgreSQL connection in test environment
3. migrations apply successfully
4. a transaction can commit
5. a transaction can roll back
6. database errors do not expose credentials through application-facing behavior where applicable
7. existing architecture-boundary tests remain passing

Use real PostgreSQL for PostgreSQL-specific integration behavior.

## 37. Existing Quality Gates

The final implementation must run and report:

- format check
- lint
- TypeScript typecheck
- unit tests
- database/integration tests
- production build
- Playwright E2E tests

Do not state that a check passed unless it was actually executed.

## 38. Documentation Updates

Update documentation where implementation creates a new canonical fact.

Likely updates:

- README.md
- docs/ARCHITECTURE.md if needed
- docs/DATA_MODEL.md if a convention is clarified
- docs/SECURITY.md only if implementation reveals a necessary clarification

Do not casually rewrite foundational product decisions.

## 39. Out of Scope

Explicitly out of scope:

- User table
- authentication
- sessions
- Organization
- Membership
- Farm
- Facility
- cattle inventory
- lots
- listings
- offers
- transactions
- processing reservations
- logistics
- fulfillment
- settlements
- ledger implementation
- payments
- public API
- webhooks
- external integrations
- Redis
- queues
- Kafka
- event sourcing
- microservices
- data warehouse
- analytics infrastructure
- search infrastructure
- production database provisioning
- production secrets
- generalized unit conversion
- generalized money library
- admin database UI

These belong to later tickets.

## 40. Acceptance Criteria

RC-002 is complete only when:

- PostgreSQL is the documented canonical relational database.
- Drizzle is the sole ORM.
- Database dependencies are minimal and justified.
- DATABASE_URL configuration exists and is validated safely.
- Database configuration remains server-side.
- A canonical database client exists.
- Drizzle schema organization is established.
- Migration tooling is configured.
- At least one valid migration workflow has been demonstrated.
- Migrations are committed and reviewable.
- Stable identifier conventions are documented.
- Timestamp conventions are documented.
- Exact-money conventions are documented.
- Agricultural quantity conventions are documented.
- Atomic transaction capability exists and is tested.
- Transaction rollback is tested.
- Real PostgreSQL integration testing exists.
- Tests cannot casually target production.
- CI provisions/uses isolated PostgreSQL.
- CI applies migrations successfully.
- CI runs database tests.
- Existing RC-001 CI gates remain intact.
- No database credentials are committed.
- No business-domain tables are prematurely introduced.
- No public API is introduced.
- No authentication implementation is introduced.
- Existing application behavior still works.
- README contains sufficient local database instructions.
- Format check passes.
- Lint passes.
- Typecheck passes.
- Unit tests pass.
- Database/integration tests pass.
- Production build passes.
- Playwright E2E tests pass.
- Working tree contains no generated secrets or unintended artifacts.

## 41. Reviewer Checklist

A reviewer should specifically challenge:

### BLOCKING

- credentials committed to Git
- tests capable of destroying production data
- DATABASE_URL exposed to client code
- migrations not reproducible
- use of floating point as an authoritative money convention
- business tables added outside scope
- existing CI/security controls removed
- second ORM introduced

### HIGH

- weak transaction abstraction
- database tests mocked instead of using PostgreSQL
- missing rollback verification
- undocumented migration process
- application code coupled directly to Drizzle throughout routes/UI
- unsafe raw SQL
- CI database tests depend on external persistent infrastructure

### MEDIUM

- unclear naming conventions
- excessive dependencies
- excessive schema fragmentation
- poor local setup documentation
- unnecessary Docker complexity
- premature production-hosting decisions

### LOW

- minor script naming
- documentation wording
- nonfunctional organizational preferences

## 42. Agent Instructions

Before implementation:

1. Read `AGENTS.md`.
2. Read `docs/PRODUCT.md`.
3. Read `docs/ARCHITECTURE.md`.
4. Read `docs/BUSINESS_RULES.md`.
5. Read `docs/DATA_MODEL.md`.
6. Read `docs/SECURITY.md`.
7. Read this specification.
8. Inspect the current RC-001 implementation.
9. Do not implement beyond RC-002 scope.

If this specification conflicts with a higher-authority repository document, stop and report the conflict rather than guessing.

Do not silently make unresolved product, financial, legal, or regulatory decisions.

## 43. Definition of Done

RC-002 is done when Rivercreek has a small, explicit, tested PostgreSQL + Drizzle persistence foundation capable of safely supporting later domain development without yet pretending that the business domain has been implemented.

The database foundation should make the next tickets easier without constraining Rivercreek to premature abstractions.

The final result should provide confidence that when Rivercreek begins persisting economically meaningful agricultural transactions, the underlying persistence layer has already been deliberately designed for correctness.