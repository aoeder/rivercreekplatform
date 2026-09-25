# Rivercreek Engineering Constitution

## 1. Mission

Rivercreek is building digital market infrastructure for agriculture.

The platform connects farms, buyers, processors, logistics providers, and eventually other agricultural participants through a common system for:

- inventory
- price discovery
- bids and offers
- transactions
- contracts
- processing
- logistics
- settlement
- traceability
- operational data

The immediate objective is not to build every possible Rivercreek feature.

The immediate objective is to build a reliable, exceptionally simple end-to-end agricultural transaction platform, beginning with livestock.

---

## 2. Source of Truth

Before making material changes, agents must read the relevant repository documentation.

Authority order:

1. `AGENTS.md`
2. `docs/PRODUCT.md`
3. `docs/BUSINESS_RULES.md`
4. approved specifications under `/specs`
5. `docs/DATA_MODEL.md`
6. `docs/ARCHITECTURE.md`
7. `docs/SECURITY.md`
8. `docs/UX.md`
9. `docs/DESIGN_SYSTEM.md`
10. existing implementation

If documents conflict, do not silently choose an interpretation.

Flag the conflict.

Do not invent product requirements.

Do not silently redefine Rivercreek.

---

## 3. Human Authority

Humans retain final authority over:

- product behavior
- business rules
- architecture changes
- security policy
- financial logic
- production releases
- destructive database changes
- regulatory interpretations

AI agents may recommend changes but must not silently make material product or architectural decisions.

---

## 4. Multi-Agent Development

Rivercreek is intentionally developed using multiple AI engineering systems.

Agents should assume other agents may be working simultaneously.

Therefore:

- keep changes scoped
- avoid unrelated refactors
- avoid unnecessary formatting changes
- respect module boundaries
- use isolated branches/worktrees
- make small, reviewable commits
- document assumptions
- never overwrite another agent's work merely because you prefer another implementation

Parallelism is encouraged when dependencies permit it.

Coordination is more important than maximizing the number of simultaneous agents.

---

## 5. Branch Policy

Never develop directly on `main`.

Feature branches should use:

`agent/ticket-description`

Examples:

`claude/RC-010-cattle-inventory`

`codex/RC-014-bid-engine`

`grok/review-RC-014`

One feature or clearly related group of changes per branch.

Do not merge your own work unless explicitly authorized.

---

## 6. Ticket Contract

Before implementing a feature, identify:

- ticket ID
- objective
- relevant specification
- dependencies
- files/modules likely affected
- acceptance criteria

If requirements are materially ambiguous, stop and surface the ambiguity rather than inventing business logic.

---

## 7. Implementation Workflow

For each implementation task:

1. Read `AGENTS.md`.
2. Read relevant `/docs`.
3. Read the ticket/specification.
4. Inspect the existing implementation.
5. Identify dependencies.
6. Produce a short implementation plan.
7. Implement the smallest complete vertical slice.
8. Add/update tests.
9. Run required checks.
10. Review the diff for unrelated changes.
11. Report assumptions and limitations.
12. Open a reviewable PR.

---

## 8. Definition of Done

A feature is not complete merely because code was generated.

Where applicable, completion requires:

- database implementation
- server/business logic
- API/interface
- frontend
- authorization
- validation
- loading state
- empty state
- error state
- success state
- desktop behavior
- mobile behavior
- automated tests
- documentation updates

Before completion, run applicable:

- lint
- formatting checks
- type checking
- unit tests
- integration tests
- end-to-end tests
- production build

Never claim a check passed unless it was actually executed successfully.

---

## 9. UX Standard

Rivercreek must be usable by people who are experts in agriculture but may not be experts in software.

Every screen should prioritize:

1. What is happening?
2. What matters financially or operationally?
3. What action should the user take?
4. What happens after that action?

Prefer:

- plain language
- obvious primary actions
- minimal required input
- sensible defaults
- progressive disclosure
- visible economics
- clear status
- immediate feedback

Avoid:

- unnecessary dashboards
- excessive configuration
- unexplained technical terminology
- hidden fees
- unnecessary clicks
- ambiguous buttons
- dense forms when information can be inferred

Simple by default.

Powerful when requested.

---

## 10. Design Consistency

Do not invent new visual patterns when an appropriate existing component exists.

Use the Rivercreek design system.

Reusable primitives should be preferred for:

- buttons
- inputs
- cards
- tables
- money
- prices
- quantities
- statuses
- confirmations
- timelines
- market data

Every significant UI feature must be evaluated on both desktop and mobile.

---

## 11. Transaction Integrity

Agricultural inventory and financial transactions require stronger guarantees than ordinary CRUD operations.

Never rely exclusively on frontend validation for transaction integrity.

Critical rules must be enforced server-side and, where appropriate, at the database level.

Pay particular attention to:

- duplicate transactions
- double-selling inventory
- race conditions
- stale data
- partial failures
- retries
- idempotency
- unauthorized state transitions
- concurrent acceptance
- inventory reservation
- settlement consistency

Transactions must fail safely.

---

## 12. Money and Quantities

Never use binary floating-point arithmetic for authoritative monetary calculations.

Use appropriate exact numeric representations.

Units must always be explicit.

Examples include:

- dollars
- cents
- price per pound
- pounds
- hundredweight
- head
- bushels
- tons
- miles

Never silently convert units.

Rounding behavior must be deterministic and tested.

---

## 13. State Machines

Important Rivercreek workflows should use explicit states and permitted transitions.

Examples:

- listings
- bids
- transactions
- processor bookings
- shipments
- contracts
- settlements

Do not create hidden state through arbitrary combinations of booleans when an explicit state model is appropriate.

Invalid transitions must be rejected.

---

## 14. Authorization

Authorization must be enforced server-side.

Never assume that hiding a UI element prevents access.

Users should only access data and actions appropriate to their organization and role.

Pay special attention to:

- farms
- buyers
- processors
- logistics providers
- administrators
- private transaction data
- pricing data
- contracts
- settlement information

---

## 15. Security

Never:

- commit secrets
- expose credentials
- hardcode production keys
- log sensitive credentials
- trust unvalidated client input
- weaken security controls simply to make a feature work

Use environment variables and documented secret-management practices.

Security-sensitive changes require additional review.

---

## 16. Database Changes

Schema changes must be intentional.

For every material schema change:

- explain why it is necessary
- create a migration
- consider existing data
- consider rollback/recovery
- update `docs/DATA_MODEL.md` when appropriate
- add constraints when they protect business invariants

Do not perform destructive production migrations without explicit human approval.

---

## 17. Testing Philosophy

Tests should protect Rivercreek business behavior, not merely implementation details.

Important invariants should receive explicit tests.

Examples:

- inventory cannot be sold twice
- unauthorized users cannot modify another organization's assets
- invalid state transitions fail
- accepted prices cannot silently change
- processor capacity cannot be overbooked
- settlement calculations are deterministic
- retries do not duplicate transactions

Every discovered production or QA defect should receive a regression test when practical.

---

## 18. Adversarial Review

Important work should be reviewed by a different model or human than the one that implemented it.

Reviewers should actively search for:

- business logic errors
- race conditions
- authorization failures
- security vulnerabilities
- financial calculation errors
- data leakage
- invalid state transitions
- missing tests
- unnecessary complexity
- poor UX
- mobile failures

Review is adversarial, not ceremonial.

---

## 19. Research vs. Product Truth

External research may inform Rivercreek but does not automatically become product truth.

Regulatory, market, processor, logistics, pricing, or competitor research should be stored under `/research` when appropriate.

Material conclusions should retain their sources.

Do not convert uncertain external information into a hardcoded business rule without review.

---

## 20. External Services

Third-party integrations must be isolated behind clear interfaces when practical.

Do not tightly couple core Rivercreek business logic to a vendor unnecessarily.

External calls must account for:

- timeouts
- failures
- retries
- duplicate responses
- unavailable services
- malformed responses

---

## 21. Observability

Important actions should be observable.

Where appropriate, record:

- transaction state changes
- failures
- external integration failures
- security-relevant events
- background job failures

Logs must help diagnose problems without exposing sensitive information.

---

## 22. Performance

Optimize for correctness and simplicity before premature scale optimization.

Avoid obvious:

- N+1 queries
- unbounded database reads
- unnecessary client payloads
- blocking external calls
- repeated expensive computations

Do not introduce complex infrastructure without evidence it is necessary.

---

## 23. Architecture Philosophy

Prefer boring, understandable technology.

Prefer a modular monolith until scale or organizational boundaries justify additional services.

Avoid unnecessary:

- microservices
- queues
- distributed systems
- abstractions
- frameworks
- dependencies

Rivercreek's business domain is already complex.

The technical architecture should reduce complexity, not add to it.

---

## 24. Code Quality

Prefer:

- explicit code
- small modules
- strong typing
- descriptive names
- clear boundaries
- testable business logic
- reusable primitives

Avoid:

- giant components
- hidden side effects
- unnecessary abstractions
- clever code
- duplicated business logic
- unexplained magic values

Comments should explain why, not restate what the code obviously does.

---

## 25. Pull Request Requirements

Every meaningful PR should explain:

### What
What changed?

### Why
Why was it necessary?

### Product impact
What does the user experience differently?

### Technical impact
What architecture, schema, API, or dependencies changed?

### Security impact
Does this affect authentication, authorization, sensitive data, or financial behavior?

### Tests
What was executed and what passed?

### UX evidence
For significant UI work, include screenshots or equivalent evidence for desktop and mobile where practical.

### Known limitations
What remains incomplete or uncertain?

---

## 26. Agent Roles

These roles describe the preferred workflow, not capability limitations.

### Claude Code
Primary feature implementation and substantial codebase work.

### Codex
Cross-system implementation, architecture-heavy engineering, integration, debugging, testing, and independent review.

### Grok
Adversarial engineering review, alternative approaches, edge-case discovery, and red-team analysis.

### Perplexity Computer
External research, browser workflows, competitive research, structured data gathering, and staging usability testing.

No agent's output is authoritative merely because of which model produced it.

Repository documentation and approved product decisions remain authoritative.

---

## 27. Escalation

Stop and request human/product clarification when a task requires an unresolved decision involving:

- pricing
- fees
- matching rules
- transaction economics
- settlement behavior
- regulatory interpretation
- legal requirements
- permissions
- destructive data changes
- major architecture changes
- production infrastructure
- security tradeoffs

Do not hide uncertainty.

---

## 28. Primary Build Objective

The first major Rivercreek milestone is a coherent livestock transaction:

Farm
→ Inventory
→ Listing
→ Market
→ Bid/Offer
→ Acceptance
→ Contract
→ Processing
→ Logistics
→ Fulfillment
→ Settlement
→ Ledger

Build outward from a working transaction rather than building disconnected dashboards.

---

## 29. Final Principle

Optimize for:

Correctness
→ clarity
→ user experience
→ maintainability
→ speed

Speed matters enormously.

But rework caused by inconsistent architecture, broken business logic, or poor UX is not speed.

Build Rivercreek as one coherent system.