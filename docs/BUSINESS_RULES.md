# Rivercreek Business Rules

## 1. Purpose

This document defines the canonical business rules governing Rivercreek transactions and network behavior.

`PRODUCT.md` defines what Rivercreek is.

This document defines how Rivercreek must behave.

These rules apply regardless of whether an action originates from:

- Rivercreek web
- Rivercreek mobile
- an internal administrative interface
- an API
- a partner integration
- an approved automated agent
- another future authorized interface

These rules should inform:

- product behavior
- database constraints
- application services
- APIs
- authorization
- state machines
- tests
- audit history
- integrations
- user experience

Agents must not silently invent exceptions to these rules.

When a material commercial, legal, regulatory, or product rule remains unresolved, this document marks it:

**DECISION REQUIRED**

Until resolved, agents must not implement irreversible behavior based on an assumption.

---

# 2. Core Principle

Rivercreek coordinates physical agricultural transactions.

The system must preserve the integrity of:

- identity
- authority
- ownership
- inventory
- quantity
- price
- commitments
- capacity
- fulfillment
- settlement
- transaction history
- economic history

Rivercreek should never represent a transaction as being in a state that is not supported by the underlying facts.

When convenience conflicts with transaction integrity, transaction integrity wins.

---

# 3. One Network, Multiple Interfaces

Rivercreek may eventually have many interfaces.

The underlying business rules must remain consistent.

An action initiated through the Rivercreek application must obey the same core rules as an equivalent action initiated through an authorized API or partner integration.

The user interface must not contain a separate version of Rivercreek's business logic.

Core business behavior should belong to the Rivercreek domain and application layers.

Interfaces may present information differently.

They must not create different versions of transaction truth.

---

# 4. Organizations

Users participate in Rivercreek through organizations where appropriate.

Organizations may represent:

- producers
- buyers
- processors
- logistics providers
- storage providers
- other approved market participants

A user may eventually belong to multiple organizations.

Organization membership does not automatically grant permission to perform every action.

Permissions must be explicit.

Server-side authorization is required for protected actions.

---

# 5. Ownership and Authority

A user may only perform economically or operationally meaningful actions when authorized to do so on behalf of the relevant organization.

Examples include:

- listing inventory
- making offers
- accepting offers
- reserving capacity
- modifying transactions
- confirming fulfillment
- approving adjustments
- initiating settlement actions

UI visibility is not authorization.

Authorization must be enforced server-side.

An API credential or integration must not receive greater authority than the organization or user it represents.

---

# 6. Rivercreek's Role

Rivercreek is initially transaction infrastructure connecting market participants.

Rivercreek must not automatically be assumed to:

- take title to agricultural products
- become merchant of record
- act as principal
- guarantee participant performance
- hold customer funds
- extend credit
- assume commodity risk

Any such behavior requires explicit human approval and appropriate legal, regulatory, financial, and technical review.

Agents must not create these relationships through implementation assumptions.

---

# 7. Products and Units

Every transactable agricultural product must use explicit units.

Examples include:

- head
- pounds
- hundredweight
- bushels
- tons

Quantities must never be stored or interpreted without sufficient unit context.

Prices must also identify their pricing unit.

Examples include:

- dollars per head
- dollars per pound
- dollars per hundredweight
- dollars per bushel
- flat transaction amount

A numeric quantity or price without sufficient unit context is not authoritative.

---

# 8. Inventory

Inventory represents agricultural goods that exist or are reasonably expected to exist.

Inventory must have an owning organization.

Inventory must have an explicit quantity and unit.

Where applicable, Rivercreek must distinguish between:

- estimated quantity
- measured quantity
- verified quantity
- final quantity

The system must never silently convert an estimate into a verified or final value.

---

# 9. Inventory Availability

Rivercreek must be able to determine how much inventory is:

- available
- reserved
- committed
- fulfilled
- cancelled
- otherwise unavailable

Available inventory cannot become negative.

The same unit of inventory must not be unknowingly committed to conflicting transactions.

Concurrency must be handled server-side and, where appropriate, at the database level.

---

# 10. Lots

A lot is a transaction-ready grouping of inventory.

A lot must identify sufficient information to transact, including:

- owner
- product
- quantity
- quantity unit
- location
- relevant availability information

Additional attributes depend on the agricultural product.

A lot cannot expose more available quantity than its underlying inventory permits.

---

# 11. Lot Changes

Changes to a lot must not invalidate an existing commitment.

Once quantity has been reserved or committed, the system must preserve the quantity necessary to satisfy that commitment unless an authorized cancellation or amendment changes the obligation.

Material information associated with an accepted transaction must not be silently rewritten by later edits to the original lot.

The transaction must preserve its own durable record of relevant agreed information.

---

# 12. Listings

A listing makes defined supply visible to potential buyers.

A listing must reference valid inventory or a valid lot.

A listing should identify sufficient information for the intended transaction, including where applicable:

- product
- available quantity
- pricing information
- location
- availability
- material product attributes

A conceptual listing lifecycle may include:

- draft
- active
- paused
- partially committed
- completed
- withdrawn
- expired

Exact technical states will be defined in the data model.

Equivalent behavior must exist.

---

# 13. Listing Availability

A listing cannot offer more quantity than remains available.

When underlying inventory availability changes, executable listing availability must reflect that change.

A listing must not continue to appear executable for inventory that is no longer available.

Availability must be validated again when an economically binding action occurs.

---

# 14. Listing Price

A listing may eventually support:

- no stated price
- indicative price
- desired price
- executable seller price

These concepts must not be treated as equivalent.

The user interface must clearly communicate the difference.

**DECISION REQUIRED:** Which listing pricing modes are supported in initial cattle V1.

---

# 15. Indicative Information

Indicative information communicates information without creating an executable commitment.

Examples may include:

- estimated price
- market indication
- buyer interest
- estimated freight
- estimated processor cost
- estimated weight
- estimated availability

Indicative information must not be presented as guaranteed or executable.

---

# 16. Interest

Interest is non-binding.

Examples include:

- buyer expresses interest
- buyer requests additional information
- buyer indicates approximate demand
- buyer communicates an indicative price

Interest must never:

- reserve inventory
- create a transaction
- create a binding commitment
- be presented as an executable offer

---

# 17. Offers

An offer represents proposed commercial terms.

An executable offer must include sufficient information to determine what occurs if it is accepted.

At minimum, this generally requires:

- buyer
- seller or relevant listing
- product or lot
- quantity
- quantity unit
- price
- pricing unit
- validity or expiration
- material conditions

An offer must identify where relevant whether values are:

- fixed
- estimated
- subject to final measurement
- subject to an explicitly defined adjustment mechanism

---

# 18. Offer Expiration

An offer may not be accepted after expiration.

Expiration must be enforced server-side.

The UI should clearly communicate whether an offer:

- is active
- is nearing expiration where useful
- has expired

Expired offers should remain part of the appropriate audit and negotiation history.

They should not simply disappear.

---

# 19. Offer Quantity

An executable offer cannot be accepted for more inventory than remains available.

Availability must be checked again at acceptance.

It is not sufficient to rely on availability when the offer was created.

---

# 20. Counteroffers

A counteroffer proposes modified commercial terms.

A counteroffer must not silently rewrite the previous offer.

It creates a new set of proposed terms linked to the negotiation history.

Rivercreek should preserve prior offers and counteroffers where appropriate for auditability.

**DECISION REQUIRED:** Whether creating a counteroffer automatically prevents acceptance of the immediately preceding offer in V1.

---

# 21. Acceptance

Acceptance is a critical economic state transition.

Acceptance must occur server-side through an atomic operation.

Before acceptance succeeds, Rivercreek must verify:

- offer exists
- offer is valid
- offer has not expired
- actor is authorized
- inventory remains available
- requested quantity remains valid
- offer has not already been accepted
- offer is in an acceptable state
- relevant transaction conditions remain satisfiable

If these conditions are not satisfied, acceptance must fail safely.

---

# 22. Concurrent Acceptance

Two buyers must not successfully acquire the same unavailable inventory because requests arrived at nearly the same time.

Rivercreek must protect against concurrent acceptance.

Correctness must not depend on:

- which browser loaded first
- which screen displays stale availability
- which request happens to finish first

Database transactions, constraints, locks, or equivalent mechanisms should enforce the invariant.

---

# 23. Inventory Reservation

When an executable offer is validly accepted, the quantity associated with that transaction should become unavailable to conflicting transactions.

Conceptually:

AVAILABLE
→ RESERVED / COMMITTED

The exact technical state model belongs in `DATA_MODEL.md`.

Reservation should occur atomically with transaction creation where practical.

Rivercreek must not:

1. create a valid transaction,
2. fail to reserve the associated inventory,
3. leave both records inconsistent.

---

# 24. Partial Transactions

A lot may support partial transactions if explicitly permitted.

Example:

30 head available.

Buyer A acquires 20.

10 remain available.

The system must correctly preserve:

- original quantity
- committed quantity
- remaining quantity

**DECISION REQUIRED:** Whether V1 cattle listings permit partial offers by default or whether the seller explicitly enables them.

---

# 25. Transaction Creation

Valid acceptance creates a durable transaction.

The transaction should capture a snapshot of the material accepted terms.

Later edits to:

- listing
- lot
- farm
- organization profile
- processor pricing
- freight estimates
- market information

must not silently rewrite the original agreement.

---

# 26. Transaction Identity

Every transaction must have a unique durable identifier.

Transaction identity must not depend on a mutable display name.

All transaction-related records should be traceable to the relevant transaction.

Identifiers intended for external use should be stable and designed deliberately.

---

# 27. Transaction State

Transactions must use explicit states.

A conceptual lifecycle may include:

AGREED
→ CLEARING
→ SCHEDULED
→ IN FULFILLMENT
→ RECONCILING
→ SETTLED
→ COMPLETED

Other terminal or exceptional states may include:

- CANCELLED
- DISPUTED
- FAILED

The final state machine belongs in `DATA_MODEL.md`.

Arbitrary state jumps must not be allowed.

---

# 28. Accepted Commercial Terms

Accepted commercial terms must be durable.

They must not be silently edited.

If agreed terms change after acceptance, Rivercreek should preserve:

- original terms
- amended terms
- actor
- timestamp
- reason where appropriate

Material changes should be represented as explicit amendments or adjustments rather than historical rewriting.

---

# 29. Price

Every price must have an explicit pricing unit.

Examples:

- dollars per head
- dollars per pound
- dollars per hundredweight
- dollars per bushel
- flat amount

A numeric value without its pricing unit is not sufficient.

The system must not silently reinterpret one pricing unit as another.

---

# 30. Money

Authoritative monetary calculations must use exact representations.

Binary floating-point values must not be used for authoritative financial arithmetic.

Rounding rules must be deterministic.

Rounding must be tested.

Currency must be explicit where ambiguity is possible.

---

# 31. Estimated vs. Final Economics

Rivercreek must distinguish estimated economics from final economics.

Before fulfillment, a participant may see:

- estimated gross value
- estimated processing
- estimated freight
- estimated fees
- estimated net proceeds

After reconciliation, Rivercreek may calculate:

- final gross value
- final processing
- final freight
- final fees
- authorized adjustments
- final net proceeds

An estimate must never be presented as final merely because the transaction progressed.

---

# 32. Processing

A transaction requiring processing may be associated with a processor and processing reservation.

Processor information may include:

- facility
- capability
- date
- capacity
- pricing
- requirements
- reservation status

Rivercreek must distinguish between:

- discovered capacity
- requested capacity
- held capacity
- confirmed capacity

These states must not be presented as equivalent.

---

# 33. Processor Capacity

When Rivercreek controls authoritative processor scheduling, confirmed reservations must not exceed available capacity.

Capacity should be protected against concurrent booking.

When Rivercreek displays third-party capacity that it does not control, the UI must not imply Rivercreek guarantees availability.

---

# 34. Processing Price

Processor pricing may be:

- estimated
- quoted
- confirmed
- final

These values must remain distinguishable.

A final processing charge must not silently replace the original estimate.

The historical economics should remain reconstructable.

---

# 35. Logistics

A transaction requiring transportation may be associated with one or more shipments.

A shipment should eventually identify relevant information such as:

- origin
- destination
- quantity or load
- carrier
- pickup window
- delivery window
- equipment requirements
- estimated price
- confirmed price
- status

---

# 36. Logistics Status

Rivercreek must distinguish between:

- estimated transportation
- requested transportation
- assigned carrier
- confirmed booking
- pickup
- in transit
- delivered
- completed

The system must not imply a truck is booked merely because a freight estimate exists.

---

# 37. Storage

Where storage is required, Rivercreek may coordinate storage as part of the transaction lifecycle.

Storage records may eventually identify:

- facility
- product
- quantity
- capacity
- reservation
- storage period
- pricing
- status

Confirmed storage capacity must not be represented as available to conflicting Rivercreek commitments where Rivercreek is authoritative for that capacity.

---

# 38. Physical Clearing

A commercially agreed transaction is not necessarily physically complete.

Rivercreek must preserve the distinction between:

COMMERCIAL AGREEMENT

and

PHYSICAL FULFILLMENT.

A transaction may be commercially agreed while:

- processing
- transportation
- storage
- delivery
- measurement
- reconciliation

remain incomplete.

---

# 39. Fulfillment

Fulfillment records what actually occurred in the physical world.

Depending on the transaction, relevant facts may include:

- quantity delivered
- actual weight
- processing receipt
- final yield
- grade
- quality
- delivery time
- exceptions

Where applicable, Rivercreek should preserve:

EXPECTED

versus

ACTUAL.

---

# 40. Reconciliation

When actual results differ from estimated transaction information, Rivercreek should reconcile those differences explicitly.

Example:

Estimated weight: 40,500 lb

Actual weight: 40,180 lb

The system should preserve both values.

Adjustments should identify where appropriate:

- original value
- final value
- economic impact
- reason
- source
- actor or system creating the adjustment
- timestamp

---

# 41. Unauthorized Adjustments

A participant must not be able to unilaterally alter final transaction economics unless the transaction rules explicitly permit that action.

Material adjustments should require appropriate authority.

**DECISION REQUIRED:** Which adjustments require bilateral approval in V1.

---

# 42. Settlement

Settlement calculates the final economics of a transaction.

Conceptually:

GROSS PRODUCT VALUE

minus

PROCESSING

minus

LOGISTICS

minus

STORAGE

minus

RIVERCREEK FEES

plus/minus

AUTHORIZED ADJUSTMENTS

equals

NET SETTLEMENT

The actual components depend on the transaction.

Settlement must expose enough information for the participant to understand how the result was calculated.

---

# 43. Settlement Finality

A settlement should not be considered final while required economic inputs remain unresolved.

The system must distinguish between:

- estimated settlement
- pending settlement
- final settlement
- paid settlement

These are different states.

---

# 44. Payments

A settlement record and actual movement of money are different concepts.

Rivercreek must not mark money as paid merely because a settlement was calculated.

Payment states should distinguish concepts such as:

- amount owed
- payment pending
- payment initiated
- payment completed
- payment failed
- refunded

Actual payment architecture requires separate approval.

**DECISION REQUIRED:** Whether V1 moves real funds or simulates or records payment status.

---

# 45. Ledger

Financially meaningful events should be recorded rather than reconstructed solely from current application state.

Ledger-like records should be append-oriented where appropriate.

Historical financial events should not be silently overwritten.

Corrections should generally be represented through compensating or correcting entries rather than deletion of history.

The final ledger architecture will be defined separately.

---

# 46. Fees

Rivercreek fees must be explicit.

The system must not invent fee rates.

Fee configuration must come from approved product and business rules.

Fees should identify:

- basis
- rate or amount
- responsible party
- transaction
- calculation

**DECISION REQUIRED:** Final V1 fee structure.

---

# 47. Cancellation

Transactions may require cancellation workflows.

Cancellation must not be equivalent to deleting the transaction.

The system should preserve:

- original transaction
- cancellation status
- actor
- timestamp
- reason where appropriate
- resulting inventory impact
- resulting processor impact
- resulting logistics impact
- resulting financial impact

**DECISION REQUIRED:** Which participants may cancel at which transaction stages and under what conditions.

---

# 48. Inventory Release After Cancellation

Inventory should only return to available supply when applicable cancellation rules permit it.

The system must not automatically make inventory available if a physical or contractual obligation still exists.

Inventory release should be an explicit consequence of the applicable cancellation state transition.

---

# 49. Disputes

Rivercreek should anticipate that physical transactions can be disputed.

Potential disputes may involve:

- quantity
- weight
- grade
- condition
- delivery
- processing
- freight
- charges
- payment

V1 may not require a sophisticated dispute-resolution system.

However, transaction history must remain sufficiently auditable to support resolution.

---

# 50. Deletion

Important transaction records should generally not be hard-deleted after they become economically meaningful.

Examples include:

- accepted offers
- transactions
- contracts
- fulfillment records
- settlement records
- ledger entries

Where deletion is inappropriate, use:

- status changes
- cancellation
- reversal
- archival

Economic history must not disappear because a user no longer wants to see it.

---

# 51. Audit History

Important events should record where appropriate:

- actor
- organization
- action
- object
- previous state
- new state
- timestamp
- source interface or integration

Important transaction history should be reconstructable.

---

# 52. Idempotency

Actions that may be retried must not unintentionally execute twice.

This is especially important for:

- acceptance
- reservation
- transaction creation
- processor booking
- shipment booking
- settlement
- payments
- API requests creating economic effects

Repeated identical requests should fail safely or return the existing result where appropriate.

---

# 53. External Systems

Rivercreek may depend on external systems for:

- payments
- maps
- logistics
- processor information
- identity
- communications
- financial services
- market information

External success must not be assumed.

The system must account for:

- timeout
- failure
- retry
- duplicate response
- delayed response
- inconsistent response
- malformed response

External failures must not silently corrupt Rivercreek transaction state.

---

# 54. Notifications

Notifications do not define authoritative transaction state.

Email, SMS, push notifications, webhooks, or in-app alerts may fail.

The Rivercreek system of record remains authoritative.

A failed notification must not reverse an otherwise valid transaction.

A successful notification must not create transaction truth that does not exist in the authoritative system.

---

# 55. Provenance

Provenance information must identify its source or verification level where relevant.

Rivercreek should distinguish between:

- participant-reported
- Rivercreek-recorded
- third-party verified
- inferred

Rivercreek must not represent self-reported claims as independently verified.

---

# 56. Published Rules

Where Rivercreek publishes market or matching rules, similarly situated participants should be treated according to those published rules.

Agents must not create:

- hidden preference systems
- undisclosed ranking advantages
- special transaction treatment
- arbitrary matching behavior

unless explicitly approved.

Matching and ranking logic should be explainable and testable.

---

# 57. Price Changes

Indicative market information may change.

Accepted transaction prices may not silently change.

Any post-acceptance economic change must arise from an explicitly permitted mechanism such as:

- final measured quantity
- contractual pricing formula
- authorized adjustment
- amendment
- reversal

The original accepted terms must remain reconstructable.

---

# 58. Data Access

Organizations should retain appropriate access to the data they provide and the transactions in which they participate.

A participant must not gain access to another organization's private information merely because both participate in Rivercreek.

Authorization must apply consistently across:

- first-party applications
- APIs
- integrations
- administrative interfaces

---

# 59. Data Infrastructure

Rivercreek may eventually create data products from activity across its network.

Potential data products may involve:

- supply
- demand
- transaction prices
- quantities
- weights
- grades
- geography
- processor capacity
- processing economics
- logistics capacity
- freight economics
- fulfillment
- settlement outcomes

The existence of underlying data does not automatically mean Rivercreek may expose or commercialize it.

Data products must respect:

- permissions
- contracts
- privacy requirements
- confidentiality obligations
- applicable law
- approved Rivercreek policy

**DECISION REQUIRED:** Detailed data licensing, aggregation, anonymization, and commercialization policy.

---

# 60. Aggregated and Derived Data

Rivercreek may eventually create:

- benchmarks
- indices
- analytics
- forecasts
- market statistics
- derived datasets

Derived information must not be represented as raw participant information when it is not.

Participant-identifiable information must not be exposed merely because it contributes to an aggregate dataset.

The rules governing minimum aggregation, anonymization, licensing, and redistribution require explicit approval.

---

# 61. Administrative Authority

Rivercreek administrators may require elevated privileges for support and operations.

Administrative access must not become an unrestricted bypass around transaction integrity.

Sensitive administrative actions should be:

- permission controlled
- logged
- attributable
- reviewable

Where practical, administrators should correct transactions through explicit mechanisms rather than silently editing history.

---

# 62. API and Integration Principle

Rivercreek business rules apply regardless of interface.

An action initiated through:

- Rivercreek web
- Rivercreek mobile
- public API
- partner API
- partner integration
- internal administration system
- embedded experience
- approved automated agent

must obey the same underlying business rules.

External integrations must never provide a way to bypass transaction integrity.

---

# 63. API Authorization

API and integration requests must be authenticated and authorized.

An API credential must have explicit scope.

Authorization should account for:

- organization
- credential
- role
- permitted action
- relevant resource

Possession of a valid credential does not imply unlimited access.

---

# 64. API Attribution

Economically meaningful actions initiated through external interfaces should be attributable where appropriate to:

- integration
- credential
- organization
- actor when known
- request
- timestamp

Rivercreek should be able to determine how an important economic action entered the system.

---

# 65. Stable External Identifiers

Durable business objects exposed to external systems should use stable identifiers.

External systems must not be required to treat mutable names as authoritative identity.

Examples include:

- organization
- farm
- facility
- inventory
- lot
- listing
- offer
- transaction
- processor reservation
- shipment
- settlement

Identifier design belongs in the architecture and data model.

---

# 66. System of Record

When Rivercreek is authoritative for a transaction state, all Rivercreek interfaces must resolve to the same canonical state.

For example:

If inventory has been committed through the Rivercreek application, the Rivercreek API must not simultaneously represent that inventory as available.

If an offer has expired, an external integration must not be able to accept it.

If processor capacity has been reserved through an integration, Rivercreek's first-party application must reflect that reservation.

If a transaction has settled, another interface must not independently create a conflicting Rivercreek settlement.

Different interfaces may present information differently.

They must not create different versions of transaction truth.

---

# 67. External Writes

External systems may eventually be authorized to create or modify Rivercreek records.

External writes must pass through the same domain validation as first-party writes.

External systems must not directly bypass Rivercreek business rules merely because they are trusted partners.

External inputs should be treated as untrusted until validated.

---

# 68. Domain Events

Important Rivercreek state changes should be representable as explicit domain events.

Examples may include:

- InventoryCreated
- InventoryUpdated
- LotCreated
- ListingActivated
- OfferCreated
- OfferCountered
- OfferAccepted
- InventoryReserved
- TransactionCreated
- ProcessingRequested
- ProcessingConfirmed
- ShipmentRequested
- ShipmentBooked
- ShipmentDelivered
- FulfillmentConfirmed
- SettlementCalculated
- SettlementFinalized
- PaymentCompleted

These names are conceptual until finalized in the data model and architecture.

The objective is to make important changes explicit and reconstructable.

---

# 69. Integration Events and Webhooks

Important domain events may eventually be exposed to authorized external systems.

Webhook and event delivery must anticipate:

- retries
- duplicate delivery
- delayed delivery
- out-of-order delivery
- failed delivery

External consumers should be able to identify events uniquely and process them idempotently.

Delivery of an external event does not itself define transaction truth.

The Rivercreek system of record remains authoritative.

---

# 70. API Compatibility

Externally exposed interfaces should eventually be versioned and changed deliberately.

Internal implementation details should not unnecessarily become permanent public contracts.

Once Rivercreek exposes an interface relied upon by external participants, breaking changes require explicit consideration.

Public API design must be intentional.

V1 does not require a public API.

The architecture should preserve the ability to create one cleanly.

---

# 71. First-Party Application Rule

The Rivercreek first-party application should use the same underlying domain capabilities that can eventually support external interfaces.

This does not require every internal function to be exposed publicly.

It means core business logic should not be trapped inside:

- React components
- individual pages
- browser state
- UI-specific server handlers
- duplicated integration code

The application is an interface to the Rivercreek network.

It is not a separate transaction system.

---

# 72. V1 Cattle Assumptions

The initial build may assume:

- cattle are the initial product
- transactions occur between identifiable organizations
- inventory belongs to a producer organization
- cattle may be grouped into lots
- lots may be listed
- buyers may make offers
- producers may accept valid offers
- acceptance creates a transaction
- accepted quantity becomes unavailable to conflicting transactions
- processing may be associated with the transaction
- transportation may be associated with the transaction
- actual information may differ from estimates
- settlement reconciles final economics

These assumptions exist to make V1 coherent.

They do not imply that every future agricultural market must behave identically.

---

# 73. V1 Decisions Still Required

Before production behavior is finalized, humans must resolve at least:

1. Are listings priced, unpriced, or both?
2. Are seller prices executable or indicative?
3. Are partial offers permitted by default?
4. What happens to an earlier offer when a counteroffer is made?
5. At exactly what event does a transaction become legally binding?
6. What cancellation rights exist after acceptance?
7. Which post-fulfillment adjustments require approval from both parties?
8. Does V1 move real money?
9. What Rivercreek fees apply?
10. Who pays each fee?
11. When does title transfer?
12. When does risk of loss transfer?
13. Who is responsible for processor charges?
14. Who is responsible for freight?
15. What happens when confirmed processing fails?
16. What happens when confirmed transportation fails?
17. What dispute process applies?
18. What data may Rivercreek aggregate or commercialize?
19. What data may be exposed through external APIs?
20. Which external systems may create authoritative Rivercreek records?

Agents must not silently answer these questions through implementation.

---

# 74. Core Transaction Invariants

Regardless of unresolved commercial details, the following are foundational:

1. Inventory cannot be unknowingly sold twice.
2. Available quantity cannot be negative.
3. Expired offers cannot be accepted.
4. Unauthorized users cannot bind organizations.
5. Accepted terms cannot silently change.
6. Estimates and actual values remain distinguishable.
7. Confirmed and unconfirmed physical capacity remain distinguishable.
8. Transaction history remains auditable.
9. Financial arithmetic is deterministic.
10. Retried requests must not unintentionally duplicate economic events.
11. Cancellation does not erase history.
12. Settlement does not imply payment.
13. A displayed estimate does not imply a guarantee.
14. External-system failure must not corrupt transaction integrity.
15. Physical fulfillment and commercial agreement are distinct.
16. Important state transitions occur server-side.
17. External interfaces cannot bypass domain rules.
18. All interfaces must resolve to the same authoritative transaction state.
19. Economically meaningful external actions must be attributable.
20. The system must fail safely when transaction integrity cannot be guaranteed.

---

# 75. Final Rule

When product convenience conflicts with transaction integrity:

Transaction integrity wins.

When implementation speed conflicts with preserving an economically meaningful historical record:

Preserve the record.

When the first-party application and an external interface disagree about authoritative transaction state:

The canonical Rivercreek system of record wins.

When an agent does not know the intended commercial, legal, financial, regulatory, or data rule:

Do not guess.

Surface the decision.