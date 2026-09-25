# Rivercreek Architecture

## 1. Purpose

This document defines the canonical software architecture for Rivercreek.

`PRODUCT.md` defines what Rivercreek is.

`BUSINESS_RULES.md` defines how Rivercreek must behave.

`UX.md` defines how Rivercreek should work for users.

`DESIGN_SYSTEM.md` defines how Rivercreek should look.

`DATA_MODEL.md` defines the canonical domain model.

This document defines how Rivercreek software should be structured so those requirements can be implemented safely, quickly, and coherently.

The architecture should optimize for:

- correctness
- transaction integrity
- development speed
- simplicity
- maintainability
- testability
- security
- observability
- API readiness
- future integration
- future scale

The initial architecture should remain deliberately boring.

Rivercreek does not need distributed-systems complexity before the product requires it.

---

## 2. Architectural Principle

Rivercreek is infrastructure with applications built on top of it.

The first-party Rivercreek application is Client #1.

It must not become the architecture itself.

Core business behavior belongs in reusable server-side domain capabilities that can eventually serve:

- Rivercreek web
- Rivercreek mobile
- public APIs
- partner APIs
- embedded experiences
- processor integrations
- logistics integrations
- farm software
- buyer procurement systems
- financial institutions
- approved automated systems

The same underlying business rules should govern every authorized interface.

---

## 3. Initial Architecture

Rivercreek should begin as a:

### Modular Monolith

with:

- TypeScript
- Next.js
- React
- PostgreSQL
- relational persistence
- explicit domain modules
- server-side business logic
- transactional database operations
- external-service adapters
- asynchronous jobs where necessary
- strong automated testing

Do not begin with microservices.

---

## 4. Why a Modular Monolith

Rivercreek contains multiple domains.

Examples:

- identity
- organizations
- inventory
- market
- offers
- transactions
- processing
- logistics
- fulfillment
- settlement

These domains need clear boundaries.

They do not initially require separate deployable services.

A modular monolith provides:

- simple deployment
- simple local development
- easy database transactions
- easier refactoring
- fewer network failure modes
- faster agent development
- lower infrastructure overhead

while preserving internal domain boundaries that can support future extraction if genuinely necessary.

---

## 5. Architecture Shape

Conceptually:

```text
CLIENTS

   ↓

APPLICATION INTERFACE

   ↓

APPLICATION / DOMAIN SERVICES

   ↓

DOMAIN MODULES

   ↓

PERSISTENCE

   ↓

POSTGRESQL SYSTEM OF RECORD
```

External systems connect through adapters rather than being embedded directly into domain logic.

---

## 6. Recommended Initial Stack

Initial technical direction:

### Language

TypeScript

### Application Framework

Next.js

### UI

React

### Database

PostgreSQL

### ORM / Query Layer

Prisma or Drizzle.

One should be selected before application implementation begins.

Do not maintain two competing persistence layers.

### Validation

A shared schema validation library such as Zod may be used.

### Authentication

Use a proven managed or established authentication solution rather than building authentication cryptography from scratch.

### Testing

- unit tests
- integration tests
- browser end-to-end tests

### Browser Testing

Playwright is preferred unless implementation provides a strong reason otherwise.

### Hosting

A straightforward managed application deployment plus managed PostgreSQL is preferred initially.

Exact providers should remain replaceable.

---

## 7. Stack Freeze

Once the initial stack is approved, agents should not independently replace major technologies.

Examples requiring approval:

- Next.js replacement
- database replacement
- ORM replacement
- authentication provider replacement
- deployment platform replacement
- introduction of major infrastructure dependencies

Technical novelty is not itself a reason to change the stack.

---

## 8. Repository Strategy

V1 should use one primary repository.

The repository should contain:

- application
- domain modules
- database schema and migrations
- shared UI components
- tests
- documentation
- scripts
- infrastructure configuration where appropriate

Do not create separate repositories for each domain.

---

## 9. Conceptual Repository Structure

A possible structure:

```text
src/
├── app/
├── components/
│   ├── ui/
│   └── domain/
├── modules/
│   ├── identity/
│   ├── organizations/
│   ├── inventory/
│   ├── market/
│   ├── offers/
│   ├── transactions/
│   ├── processing/
│   ├── logistics/
│   ├── fulfillment/
│   └── settlement/
├── lib/
├── integrations/
├── jobs/
└── db/

tests/
├── unit/
├── integration/
└── e2e/
```

This is conceptual.

Implementation may refine names and structure.

The important rule is separation of concerns.

---

## 10. Domain Modules

Each important Rivercreek domain should have a clear home.

A module may contain:

- domain types
- validation
- commands
- queries
- services
- state transitions
- authorization rules
- repository/persistence access
- tests

Modules should expose deliberate interfaces.

Do not allow every part of the application to directly manipulate every domain table.

---

## 11. Dependency Direction

Higher-level interfaces should depend on domain capabilities.

Domain logic should not depend on UI components.

Conceptually:

```text
UI
  ↓
APPLICATION
  ↓
DOMAIN
  ↓
PERSISTENCE / ADAPTERS
```

Avoid:

```text
UI
  ↓
DATABASE
```

for economically meaningful operations.

---

## 12. Server Authority

Authoritative business operations must execute server-side.

Examples:

- create listing
- submit offer
- accept offer
- reserve inventory
- create transaction
- confirm processing
- book shipment
- record fulfillment
- finalize settlement
- initiate payment

Client-side validation may improve UX.

It is never the final authority.

---

## 13. No Business Logic Trapped in React

React components should primarily handle:

- rendering
- user interaction
- local presentation state
- invoking application capabilities

They should not become the canonical location for:

- transaction rules
- inventory availability
- pricing authority
- settlement calculations
- authorization
- state-machine validation

If business logic would also be needed by a future API, it probably does not belong in a React component.

---

## 14. Application Layer

The application layer coordinates user or system intentions.

Examples:

- CreateInventory
- CreateListing
- SubmitOffer
- AcceptOffer
- RequestProcessing
- ConfirmProcessing
- RequestShipment
- ConfirmFulfillment
- CalculateSettlement
- FinalizeSettlement

Application services coordinate domain behavior and persistence.

They should not become giant unstructured service classes.

---

## 15. Commands and Queries

Where useful, distinguish:

### Commands

Operations that change authoritative state.

Examples:

- AcceptOffer
- ConfirmProcessing

### Queries

Operations that retrieve state.

Examples:

- GetTransaction
- SearchListings

This distinction does not require implementing a complex CQRS framework.

Use the conceptual separation without unnecessary infrastructure.

---

## 16. Domain Services

Domain services should contain business behavior that does not naturally belong to one simple entity.

Examples:

- inventory reservation
- offer acceptance
- transaction creation
- processor-capacity reservation
- settlement calculation

Domain services should be testable without rendering UI.

---

## 17. Persistence

PostgreSQL should be the initial authoritative system of record.

Core transactional state should live in relational structures.

Do not use:

- browser storage
- caches
- search indexes
- event streams
- third-party systems

as the canonical source of transaction truth.

---

## 18. Database Access

Database access should occur through deliberate server-side boundaries.

Avoid arbitrary database calls scattered across:

- components
- route handlers
- background jobs
- integration code

without domain coordination.

Persistence access should remain understandable and testable.

---

## 19. Database Transactions

Operations that must succeed or fail together should use database transactions.

Critical example:

OFFER ACCEPTANCE.

Conceptually:

```text
BEGIN

1. Validate actor authorization.
2. Load authoritative offer.
3. Validate offer state.
4. Validate expiration.
5. Load and protect relevant inventory.
6. Validate available quantity.
7. Transition offer.
8. Reserve inventory.
9. Create transaction.
10. Capture accepted terms.
11. Record authoritative history/event.

COMMIT
```

If any required step fails:

```text
ROLLBACK
```

No partial accepted transaction should remain.

---

## 20. Transaction Boundaries

Database transaction boundaries should follow business invariants.

Do not make every HTTP request one enormous database transaction.

Do not split a single economic invariant across several independent commits merely for code convenience.

The question is:

> Which state changes must be atomic for Rivercreek to remain economically correct?

Those changes belong together.

---

## 21. Concurrency

Rivercreek must assume simultaneous users and integrations.

Critical concurrency scenarios include:

- multiple offers against limited inventory
- simultaneous offer acceptance
- simultaneous processor reservations
- simultaneous shipment changes
- settlement finalization
- payment initiation

Concurrency safety should use appropriate:

- database transactions
- row-level locking where appropriate
- optimistic concurrency where appropriate
- unique constraints
- conditional writes
- idempotency

Do not rely on frontend button disabling.

---

## 22. Inventory Integrity

Inventory is a high-integrity domain.

Rivercreek must prevent:

- negative availability
- duplicate reservation
- double sale
- commitment above available quantity

Availability calculations must have one authoritative implementation.

Do not independently calculate authoritative availability in multiple interfaces.

---

## 23. State Machines

Important business objects should transition through explicit domain operations.

Examples:

- Listing
- Offer
- Transaction
- ProcessingReservation
- Shipment
- Settlement
- Payment

Do not allow arbitrary:

```text
status = "whatever"
```

updates throughout the application.

State transition functions should validate:

- current state
- requested transition
- actor authority
- required conditions

---

## 24. Accepted Terms

Accepted commercial terms must be preserved.

After acceptance, mutable listing or organization data must not silently redefine the transaction.

The transaction should preserve an appropriate snapshot of accepted terms.

Amendments should be explicit.

---

## 25. Exact Financial Arithmetic

Authoritative money calculations must not use binary floating point.

Use:

- fixed-precision decimal

or

- integer minor units

according to approved implementation.

Prices must retain:

- amount
- currency
- pricing unit

Quantities must retain:

- amount
- unit

Settlement rounding rules must be deterministic and tested.

---

## 26. Units

Units are domain data.

Do not treat units as display decoration.

The domain must understand distinctions such as:

- HEAD
- POUND
- HUNDREDWEIGHT
- BUSHEL
- TON

Conversions must be explicit.

Do not silently convert authoritative quantities without known conversion rules.

---

## 27. API-Ready Domain Design

Internal domain capabilities should be designed so they can later support APIs.

This does not mean Rivercreek needs a public API in V1.

It means business behavior should not depend on:

- browser state
- page structure
- React
- first-party-only assumptions

A future API request to accept an offer should invoke the same underlying acceptance behavior as the Rivercreek UI.

---

## 28. Interface Adapters

Different interfaces may translate requests into shared application commands.

Examples:

```text
WEB
  ↓
AcceptOffer command

FUTURE PUBLIC API
  ↓
AcceptOffer command

PROCESSOR INTEGRATION
  ↓
ConfirmProcessing command

APPROVED AUTOMATION
  ↓
supported command
```

All pass through the same authorization, validation, and domain rules.

---

## 29. Internal API

The first-party application may use:

- server actions
- route handlers
- internal HTTP APIs
- another approved Next.js server mechanism

The choice should favor clarity and testability.

Do not create an elaborate public-style REST API merely because Rivercreek may eventually expose external APIs.

---

## 30. Public API

Public API infrastructure is not required for V1.

When introduced, it should have:

- explicit authentication
- scopes
- organization context
- authorization
- idempotency
- stable identifiers
- rate limiting
- versioning
- audit attribution
- documentation

External APIs must not bypass domain rules.

---

## 31. API Versioning

Externally supported APIs should eventually use deliberate compatibility policies.

Do not expose internal implementation structures as permanent public contracts accidentally.

Internal APIs may evolve more rapidly.

Public contracts should evolve deliberately.

---

## 32. External Integrations

External services should be accessed through adapters.

Examples:

- payment provider
- mapping provider
- geocoding
- messaging
- email
- object storage
- processor systems
- logistics systems
- accounting systems
- data providers

Domain logic should not directly depend on provider-specific SDK behavior where avoidable.

---

## 33. Adapter Principle

Prefer:

```text
ShipmentService
      ↓
CarrierAdapter
      ↓
External Provider
```

over:

```text
TransactionComponent
      ↓
Random external SDK call
```

Adapters isolate:

- provider semantics
- authentication
- retries
- errors
- mapping
- provider-specific IDs

---

## 34. External Failure

External systems will fail.

Assume:

- timeout
- rate limit
- malformed response
- temporary outage
- duplicate callback
- delayed callback
- out-of-order callback
- partial response

External failure must not corrupt Rivercreek transaction integrity.

---

## 35. External Truth

An external system may be authoritative for a specific external fact.

Example:

A payment provider may be authoritative for provider-confirmed payment completion.

Rivercreek remains authoritative for Rivercreek's canonical interpretation of transaction state.

Provider-specific statuses should be translated into Rivercreek domain states.

---

## 36. Idempotency

Economically meaningful commands should be idempotent where retries are plausible.

Examples:

- accept offer
- create transaction
- reserve processing
- book shipment
- initiate payment
- finalize settlement

A repeated identical request should not create duplicate economic effects.

---

## 37. Idempotency Scope

Idempotency may be enforced through:

- request keys
- unique constraints
- operation records
- conditional transitions
- provider idempotency mechanisms

The strategy may vary by operation.

The invariant does not.

---

## 38. Domain Events

Important business actions should be capable of producing domain events.

Examples:

- InventoryCreated
- ListingActivated
- OfferCreated
- OfferAccepted
- InventoryReserved
- TransactionCreated
- ProcessingConfirmed
- ShipmentBooked
- ShipmentDelivered
- FulfillmentConfirmed
- SettlementFinalized
- PaymentCompleted

Events should describe completed domain facts.

---

## 39. Events Are Not V1 Event Sourcing

Rivercreek should not initially use full event sourcing.

PostgreSQL relational state remains authoritative.

Domain events support:

- audit
- notifications
- asynchronous work
- integrations
- analytics
- future webhooks

They do not replace current relational state.

---

## 40. Reliable Event Publication

Where an event must eventually be delivered asynchronously, avoid:

1. committing business state
2. attempting external publication
3. losing the event if publication fails

A transactional outbox pattern may be introduced when asynchronous event delivery becomes necessary.

Conceptually:

```text
DATABASE TRANSACTION

- update business state
- create outbox record

COMMIT

BACKGROUND WORKER

- publish/process event
- mark delivery result
```

Do not implement infrastructure before an actual use case requires it.

---

## 41. Background Jobs

Use background jobs for work that does not need to complete synchronously.

Potential examples:

- notifications
- webhook delivery
- external synchronization
- document generation
- expensive data processing
- retryable external operations

Do not move critical synchronous invariants into background jobs.

Offer acceptance should not eventually become correct.

It must be correct when accepted.

---

## 42. Job Architecture

Begin with the simplest reliable job mechanism compatible with the deployment platform.

Do not introduce Kafka or a complex distributed queue merely to run a few background tasks.

Jobs should support where necessary:

- retry
- idempotency
- failure visibility
- structured logging

---

## 43. Cache

Caching is not authoritative state.

Caches may eventually improve:

- market reads
- search
- dashboards
- reference data

Critical economic writes must validate against the authoritative database.

Never allow stale cache data alone to authorize an economic commitment.

---

## 44. Search

PostgreSQL capabilities may initially be sufficient for search.

Do not introduce Elasticsearch or another search cluster until actual requirements justify it.

Future market scale may justify dedicated search infrastructure.

That is not a V1 assumption.

---

## 45. Object Storage

Files should use object storage rather than database binary blobs where practical.

Examples:

- contracts
- receipts
- weight tickets
- certificates
- images
- settlement documents

The database should retain:

- metadata
- ownership
- references
- access controls

---

## 46. Authentication

Authentication should answer:

> Who is this human or system?

Use a proven authentication implementation.

Do not implement password cryptography manually.

Authentication is distinct from authorization.

---

## 47. Authorization

Authorization should answer:

> Is this actor allowed to perform this action on this object for this organization?

Authorization must execute server-side.

It should consider:

- user
- membership
- organization
- role
- object ownership
- transaction participation
- action
- integration scope where relevant

---

## 48. Authorization Architecture

Prefer explicit authorization helpers or policies.

Examples conceptually:

```text
canViewTransaction(actor, transaction)

canCreateListing(actor, organization)

canAcceptOffer(actor, offer)

canConfirmProcessing(actor, reservation)
```

Avoid scattered ad hoc authorization conditionals.

---

## 49. Multi-Organization Transactions

A transaction may involve:

- seller
- buyer
- processor
- carrier

Authorization must support multi-party participation.

Do not assume every record has exactly one organization allowed to see it.

Different participants may have different visibility into the same transaction.

---

## 50. Administrative Access

Rivercreek administrative access should be explicit.

Admin capabilities should not be implemented as:

> admins can bypass everything.

Administrative actions should still be:

- authorized
- logged
- attributable
- constrained

High-impact admin operations should require deliberate implementation.

---

## 51. Audit

Important actions should produce durable audit history.

Examples:

- offer creation
- acceptance
- cancellation
- transaction amendment
- processing confirmation
- fulfillment confirmation
- settlement finalization
- admin intervention
- permission changes

Audit history should answer:

- who
- what
- when
- organization
- source

and where useful:

- previous state
- resulting state

---

## 52. Logging

Application logs should be structured.

Logs should help diagnose:

- request failures
- domain errors
- external-provider failures
- background-job failures
- unexpected state transitions

Do not log:

- passwords
- authentication secrets
- API keys
- sensitive payment credentials

Avoid unnecessary personal or commercially sensitive data in logs.

---

## 53. Correlation

Important workflows should support request or correlation identifiers where useful.

This helps trace:

```text
USER ACTION

→ APPLICATION COMMAND

→ DATABASE OPERATION

→ EXTERNAL CALL

→ BACKGROUND JOB
```

without exposing internal details to ordinary users.

---

## 54. Observability

Initial observability should include:

- application errors
- server logs
- deployment health
- database health
- job failures where jobs exist

As Rivercreek grows, add:

- metrics
- traces
- business-event monitoring
- integration health

Do not build an enterprise observability platform before there is a system to observe.

---

## 55. Domain Errors

Domain errors should be explicit.

Examples:

- OFFER_EXPIRED
- OFFER_NOT_ACTIVE
- INVENTORY_UNAVAILABLE
- INSUFFICIENT_QUANTITY
- UNAUTHORIZED_ACTION
- INVALID_STATE_TRANSITION
- PROCESSING_CAPACITY_UNAVAILABLE

The UI may translate these into plain language.

Do not make clients parse arbitrary error strings.

---

## 56. Error Boundary

Differentiate:

### Validation Error

Input is invalid.

### Domain Conflict

The requested action conflicts with current business state.

### Authorization Error

Actor lacks authority.

### External Failure

A dependency failed.

### Internal Failure

Unexpected Rivercreek error.

Do not expose internal stack traces to users.

---

## 57. Validation

Validation should occur at multiple appropriate layers.

Client:

Fast feedback.

Server boundary:

Reject malformed or unsupported input.

Domain:

Enforce business invariants.

Database:

Enforce structural integrity and critical constraints where possible.

No single layer replaces all others.

---

## 58. Schema Validation

Shared validation schemas may be useful for:

- commands
- API inputs
- forms
- external payload normalization

Do not confuse shape validation with business-rule validation.

A syntactically valid offer can still be economically invalid.

---

## 59. Database Migrations

Schema changes require migrations.

Migrations should be:

- committed
- reviewable
- reproducible
- tested

Agents must not make untracked production schema changes.

---

## 60. Destructive Migrations

Destructive migrations require explicit human approval.

Examples:

- dropping columns
- dropping tables
- destructive type changes
- bulk irreversible transformations

Prefer safe staged migrations.

---

## 61. Migration Strategy

For risky production changes, prefer patterns such as:

1. add new structure
2. deploy compatible code
3. migrate/backfill data
4. verify
5. switch usage
6. remove obsolete structure later

Do not combine every step into one irreversible deployment without reason.

---

## 62. Environments

At minimum, Rivercreek should distinguish:

- local development
- test
- staging
- production

Production credentials and data must not be used casually in local development.

---

## 63. Staging

Staging should approximate production behavior sufficiently for:

- feature review
- browser QA
- integration testing
- mobile testing
- agent testing
- founder acceptance testing

Staging should not automatically receive production secrets.

---

## 64. Seed Data

Development and staging should have realistic synthetic seed data.

Examples:

- producer
- buyer
- processor
- carrier
- cattle inventory
- active listing
- offer
- transaction
- processing reservation
- shipment
- settlement

Seed data must not use real sensitive customer information without authorization.

---

## 65. Testing Strategy

Rivercreek should use multiple test layers.

### Unit

Pure domain behavior.

### Integration

Database and module interaction.

### End-to-End

Real user workflows through the application.

Each layer protects different failure modes.

---

## 66. Unit Tests

Unit tests should emphasize business logic.

Examples:

- price calculations
- quantity rules
- state transitions
- settlement calculations
- authorization policies
- domain validation

Do not spend disproportionate effort testing trivial framework behavior.

---

## 67. Integration Tests

Integration tests should cover important database behavior.

Examples:

- offer acceptance
- inventory reservation
- concurrent acceptance
- transaction creation
- processor capacity
- idempotency
- settlement persistence

Use a real test database where database semantics matter.

Do not mock away the behavior being tested.

---

## 68. Concurrency Tests

Critical concurrency invariants require explicit tests.

Example:

Two buyers attempt to accept offers against the same remaining inventory simultaneously.

Expected result:

- one valid commitment if only one can be satisfied
- no negative inventory
- no duplicate reservation
- no impossible transaction state

This should eventually be tested rather than assumed.

---

## 69. End-to-End Tests

Playwright or equivalent should cover the V1 golden path.

Example:

Producer:

1. signs in
2. creates farm
3. adds cattle
4. creates lot
5. lists cattle

Buyer:

6. discovers listing
7. makes offer

Producer:

8. reviews economics
9. accepts offer

System:

10. creates transaction

Then:

11. processing coordinated
12. transportation coordinated
13. fulfillment recorded
14. settlement displayed

The first complete transaction is the primary E2E target.

---

## 70. Test Invariants

Tests should explicitly protect:

- no double sale
- no negative inventory
- expired offers cannot accept
- unauthorized users cannot bind organizations
- accepted terms remain durable
- confirmed capacity differs from estimated capacity
- duplicate requests do not duplicate economic effects
- settlement calculations are deterministic
- payment is not implied by settlement
- external failures do not corrupt core state

---

## 71. CI

Every pull request should run automated checks.

At minimum as applicable:

- install
- formatting check
- lint
- typecheck
- unit tests
- integration tests
- build

End-to-end tests may run according to practical CI cost and speed.

Critical workflows should eventually be gated.

---

## 72. Main Branch

`main` should represent accepted working code.

Once application development begins:

Do not develop directly on `main`.

Use branches and pull requests as defined in `AGENTS.md`.

Initial repository documentation setup may have occurred directly on main.

That does not establish the development workflow for production code.

---

## 73. Integration Branch

An `integration` branch may be used during high-parallelism agent development if useful.

Potential flow:

```text
AGENT FEATURE BRANCHES

→ PR

→ INTEGRATION

→ combined validation

→ MAIN
```

Do not add an integration branch merely for ceremony.

Use it when concurrent agent work makes it valuable.

---

## 74. Agent Branches

Agent work should use isolated branches or worktrees.

Examples:

```text
claude/RC-010-cattle-inventory
codex/RC-011-offer-engine
claude/RC-012-processing
codex/RC-013-transaction-workspace
```

Avoid multiple agents editing the same working tree.

---

## 75. Worktrees

Git worktrees are encouraged when several agents operate simultaneously against the same repository.

Each agent can receive:

- isolated branch
- isolated working directory
- specific ticket
- defined file/module scope

This reduces accidental interference.

---

## 76. Ticket Scope

Every coding assignment should identify:

- ticket ID
- objective
- relevant spec
- dependencies
- expected module
- acceptance criteria
- tests required
- prohibited scope changes where useful

Agents should not infer an entire product roadmap from one ticket.

---

## 77. Parallel Agent Boundaries

Parallelism should follow domain or feature boundaries.

Good parallelism:

Agent A:
inventory

Agent B:
offer workflow

Agent C:
processing UI

Agent D:
test infrastructure

Risky parallelism:

Four agents independently refactoring the same transaction service.

Coordination matters more than raw agent count.

---

## 78. Agent Communication

Agents should communicate primarily through durable repository artifacts:

- code
- tests
- specs
- documentation
- PR descriptions
- review comments

Do not rely on one model's private conversational memory to communicate critical architecture to another model.

The repository is the shared memory.

---

## 79. Architecture Changes

Material architectural changes require deliberate review.

Examples:

- new database
- new service boundary
- new queue
- new cache infrastructure
- new authentication architecture
- new event system
- new public API strategy
- new deployment architecture

An agent should explain:

- problem
- current limitation
- proposed change
- alternatives
- operational cost
- migration impact

before introducing significant complexity.

---

## 80. Dependency Discipline

Every dependency creates:

- security surface
- upgrade burden
- compatibility risk
- conceptual overhead

Prefer mature, widely used dependencies with clear purpose.

Do not install packages for functionality easily implemented with existing platform capabilities.

---

## 81. No Premature Microservices

Do not split Rivercreek into separate network services merely because domains exist.

A module boundary is not automatically a service boundary.

Service extraction should require demonstrated reasons such as:

- independent scaling
- independent deployment
- isolation requirement
- team ownership boundary
- substantially different infrastructure
- reliability requirement

Until then:

keep the network simple.

---

## 82. No Premature Event Streaming

Do not introduce:

- Kafka
- Pulsar
- complex streaming infrastructure

without demonstrated requirements.

Domain events do not imply Kafka.

A database-backed outbox and simple worker can support substantial early scale.

---

## 83. No Premature Kubernetes

Do not introduce Kubernetes simply because Rivercreek may become large.

Use managed infrastructure and simple deployment until operational requirements justify more complexity.

Engineering time should initially improve the transaction network.

---

## 84. No Premature Multi-Region Architecture

Do not build active-active global infrastructure before Rivercreek has the requirement.

Design clean boundaries.

Scale deliberately.

Do not solve hypothetical global distributed consistency problems during cattle V1.

---

## 85. Performance

Correctness comes first.

Obvious performance problems should still be avoided.

Watch for:

- N+1 database queries
- unbounded reads
- enormous client bundles
- unnecessary client rendering
- repeated external calls
- missing indexes
- inefficient market queries

Optimize based on measurement rather than imagination.

---

## 86. Database Indexing

Indexes should follow actual query and integrity needs.

Likely future indexed concepts include:

- organization
- product
- listing status
- geography
- transaction status
- offer expiration
- facility
- external reference

Do not create speculative indexes on every field.

---

## 87. Pagination

Potentially large collections should use pagination.

Examples:

- market listings
- transaction history
- audit events
- notifications

Do not assume Rivercreek datasets will remain small.

Avoid loading entire tables into the browser.

---

## 88. Data Access Patterns

Queries should be shaped around user and domain needs.

Avoid exposing raw persistence models directly throughout the application.

Read models may differ from write models where useful.

This does not require full CQRS.

---

## 89. Read Models

Complex screens may use composed read models.

Example:

Transaction workspace may require:

- transaction
- participants
- processing
- shipment
- fulfillment
- economics
- next action

A dedicated query can compose this efficiently.

Do not force the UI to independently fetch ten objects and reconstruct business meaning.

---

## 90. Write Models

Economic writes should remain explicit.

Prefer:

```text
acceptOffer(...)
```

over generic:

```text
updateRecord(...)
```

for consequential domain operations.

Explicit commands make:

- authorization
- validation
- state transition
- audit
- testing

much safer.

---

## 91. Generic CRUD

Generic CRUD is appropriate for simple low-risk records.

It is not sufficient for high-consequence economic workflows.

Examples that should not become generic CRUD:

- accept offer
- reserve inventory
- finalize settlement
- complete payment
- cancel committed transaction

Business operations deserve explicit domain behavior.

---

## 92. Configuration

Environment-specific configuration should use environment variables or approved configuration systems.

Do not hardcode:

- secrets
- URLs
- API keys
- environment-specific credentials

into source code.

---

## 93. Feature Flags

Feature flags may be introduced when useful for:

- controlled rollout
- unfinished functionality
- experimental workflows

Do not build a sophisticated feature-flag platform before required.

Flags affecting economic behavior require careful testing.

---

## 94. Secrets

Secrets must use appropriate secure storage.

Never commit:

- API keys
- passwords
- database credentials
- signing secrets
- payment secrets

to Git.

If a secret is accidentally committed, assume it is compromised and rotate it.

Removing it from the latest commit is not sufficient.

---

## 95. Security Boundary

The internet-facing application must treat all client input as untrusted.

The same applies to external integrations.

Validate:

- identity
- organization
- authorization
- input
- object state
- economic constraints

before performing authoritative actions.

Detailed security requirements belong in `SECURITY.md`.

---

## 96. Rate Limiting

Rate limiting should be added where abuse or resource protection requires it.

Likely future areas:

- authentication
- public APIs
- offer creation
- search
- webhooks
- expensive operations

Rate limiting is not a substitute for authorization.

---

## 97. Privacy

Data access should follow least-privilege principles.

The architecture should support distinguishing:

- private organization data
- transaction-shared data
- public market data
- aggregated data
- administrative data

Do not assume all marketplace information is public.

---

## 98. Analytics

Product analytics should not become the system of record.

Analytics may track:

- workflow completion
- user behavior
- friction
- conversion

Commercial transaction truth remains in Rivercreek's domain database.

---

## 99. Data Infrastructure

Rivercreek's long-term data products should emerge from the operational system.

The transactional platform may generate structured data around:

- supply
- demand
- prices
- offers
- transactions
- quantities
- weights
- grades
- processor capacity
- processing costs
- freight
- routes
- fulfillment
- settlement

Operational correctness comes first.

---

## 100. Analytics Architecture Later

Do not run every future analytical workload directly against the production transactional database indefinitely.

As scale requires, Rivercreek may introduce:

- replicas
- warehouse
- analytical database
- data pipelines
- streaming
- lakehouse

These are future scaling decisions.

They are not V1 requirements.

---

## 101. API and Data Platform Evolution

Conceptual evolution:

### Stage 1

Rivercreek first-party application uses internal domain capabilities.

### Stage 2

Selected integrations use controlled interfaces.

### Stage 3

Partner APIs and webhooks expose network capabilities.

### Stage 4

Broader API and data products expose approved infrastructure.

### Stage 5

Third-party applications increasingly build on Rivercreek.

The architecture should permit this evolution without building Stage 5 during Stage 1.

---

## 102. System of Record

For objects Rivercreek governs, there should be one canonical authoritative state.

Interfaces may cache or project that state.

They must not create competing truth.

If:

- web
- API
- processor integration
- admin interface

disagree, the Rivercreek system of record determines canonical state according to domain rules.

---

## 103. Consistency Model

Core economic operations should generally favor strong consistency.

Examples:

- inventory commitment
- offer acceptance
- settlement finalization
- payment initiation

Less critical derived experiences may tolerate eventual consistency.

Examples:

- notifications
- analytics
- search indexing
- some dashboards
- external webhooks

Choose consistency based on economic consequence.

---

## 104. Failure Philosophy

When Rivercreek cannot safely determine whether an economic operation should proceed:

FAIL SAFE.

Examples:

If inventory availability cannot be verified:

do not accept.

If processor capacity cannot be confirmed:

do not display confirmed.

If payment state cannot be verified:

do not display paid.

Uncertainty must not become false certainty.

---

## 105. Recovery

Important workflows should have recoverable failure behavior.

Ask:

- What if the server crashes after the database commit?
- What if the external provider times out?
- What if the user retries?
- What if a webhook arrives twice?
- What if a job runs twice?
- What if the browser disconnects?
- What if the response is lost after success?

Architecture should assume these failures occur.

---

## 106. Deployment

Deployments should be automated and reproducible.

A typical path:

```text
PULL REQUEST

→ CI

→ REVIEW

→ MERGE

→ STAGING

→ VALIDATION

→ PRODUCTION
```

Exact deployment automation may evolve.

---

## 107. Production Releases

High-risk changes should not reach production merely because CI passed.

Examples:

- authentication
- authorization
- payments
- settlement
- transaction integrity
- destructive migrations
- external credential handling

These require appropriate human review and testing.

---

## 108. Rollback

Deployments should have a reasonable recovery strategy.

Application rollback is easier when schema changes remain backward-compatible.

This is another reason to prefer staged database migrations.

---

## 109. V1 Architecture Scope

V1 needs:

- one repository
- one application
- one relational database
- modular domain boundaries
- authentication
- authorization
- cattle inventory
- lots
- listings
- offers
- transaction engine
- processing
- logistics
- fulfillment
- settlement
- auditability
- tests
- staging
- CI

That is enough to prove the system.

---

## 110. V1 Does Not Need

V1 does not require:

- microservices
- Kubernetes
- Kafka
- event sourcing
- GraphQL federation
- service mesh
- multi-region active-active
- custom authentication cryptography
- custom database
- public developer portal
- public SDK
- generalized workflow engine
- generalized rules engine
- generalized contract language
- large-scale data warehouse
- machine-learning infrastructure

Do not build these without demonstrated requirements.

---

## 111. First Vertical Slice

The first meaningful technical objective should be one complete cattle transaction.

Conceptually:

```text
PRODUCER

creates cattle inventory

↓

creates lot

↓

makes lot available

BUYER

discovers lot

↓

makes offer

PRODUCER

reviews economics

↓

accepts offer

SYSTEM

atomically reserves inventory

↓

creates transaction

↓

preserves accepted terms

↓

coordinates processing

↓

coordinates transportation

↓

records fulfillment

↓

calculates settlement

↓

shows transaction history
```

This vertical slice should drive architecture validation.

---

## 112. Architecture Success Test

The architecture should be able to answer yes to:

> Can we add a second client without rewriting the business rules?

> Can we expose an API later without rebuilding transaction logic?

> Can two users act concurrently without double-selling inventory?

> Can an external system retry without duplicating economic effects?

> Can we determine who caused an important action?

> Can accepted transaction terms survive changes to upstream records?

> Can we distinguish estimates from authoritative facts?

> Can we test important business behavior without rendering React?

> Can we replace an external provider without rewriting the domain?

> Can we add new agricultural products without rewriting the entire platform?

> Can several coding agents work in different modules without constantly colliding?

If not, the architecture needs improvement.

---

## 113. Architecture Review Questions

Before introducing a major technical decision, ask:

1. What problem are we solving?
2. Does that problem exist now?
3. Can the existing architecture solve it simply?
4. Does the proposal improve correctness?
5. Does it improve development speed?
6. What new failure modes does it create?
7. What operational burden does it create?
8. Does it make testing easier or harder?
9. Does it preserve API readiness?
10. Does it preserve transaction integrity?
11. Is this architecture or fashion?
12. Would a simpler approach work?

---

## 114. Final Architecture Principle

Rivercreek should begin technically simple and economically rigorous.

The complexity belongs in understanding the agricultural transaction.

It should not come from unnecessary software infrastructure.

Build one coherent system.

Protect the transaction.

Protect inventory.

Protect money.

Keep domain logic independent of interfaces.

Keep external systems behind adapters.

Use strong relational truth.

Make important writes explicit.

Design for APIs without prematurely building the API platform.

Use events without prematurely becoming event sourced.

Scale when reality requires scale.

The first goal is not distributed systems sophistication.

The first goal is to make one cattle transaction work correctly from beginning to end.