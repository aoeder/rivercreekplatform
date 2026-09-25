# Rivercreek Data Model

## 1. Purpose

This document defines the canonical conceptual data model for Rivercreek.

`PRODUCT.md` defines what Rivercreek is.

`BUSINESS_RULES.md` defines how Rivercreek must behave.

`UX.md` defines how Rivercreek should work for users.

`DESIGN_SYSTEM.md` defines how Rivercreek should look.

This document defines the durable business objects, relationships, states, identifiers, quantities, economics, history, and integrity constraints underneath those experiences.

This is not yet a database schema.

It should guide:

- database design
- application services
- APIs
- domain logic
- state machines
- validation
- authorization
- integrations
- audit history
- testing

The implementation may evolve.

The business meaning of canonical objects should remain stable.

---

# 2. Modeling Principle

Rivercreek should model the physical and economic reality of agricultural commerce.

The data model should not be designed around individual screens.

The same underlying objects should eventually support:

- Rivercreek web
- Rivercreek mobile
- internal administration
- APIs
- partner integrations
- embedded experiences
- approved automated systems
- future data products

The application is an interface to the Rivercreek network.

It is not the data model.

---

# 3. Core Model

The initial Rivercreek model centers on:

ORGANIZATION

→ INVENTORY

→ LOT

→ LISTING

→ OFFER

→ ACCEPTANCE

→ TRANSACTION

→ PHYSICAL CLEARING

→ FULFILLMENT

→ RECONCILIATION

→ SETTLEMENT

→ LEDGER / HISTORY

Processing, logistics, storage, documents, provenance, and events connect to this lifecycle.

---

# 4. Transaction as the Central Economic Object

The transaction is the central durable object once commercial terms have been accepted.

Before acceptance, Rivercreek coordinates:

- inventory
- lots
- listings
- interest
- offers
- negotiations

After acceptance, Rivercreek coordinates around the transaction:

- accepted commercial terms
- committed inventory
- processing
- transportation
- storage
- fulfillment
- reconciliation
- settlement
- payment status
- provenance
- audit history

A transaction must remain understandable even if upstream objects later change.

---

# 5. Entity Identity

Durable Rivercreek entities should use stable identifiers.

Identifiers must not depend on mutable:

- names
- titles
- labels
- addresses
- external display values

Internal identifiers may use UUIDs, UUIDv7, ULIDs, or another approved durable strategy.

Exact implementation belongs in `ARCHITECTURE.md`.

Human-facing identifiers may additionally exist.

Examples:

- RC-1042
- LOT-0024
- SHP-0182

Human-readable IDs are references.

They do not replace canonical internal identity.

---

# 6. Common Entity Fields

Many durable entities will likely include:

- id
- created_at
- updated_at

Where appropriate:

- created_by
- updated_by
- organization_id
- status
- version
- archived_at

Not every entity requires every field.

Do not add fields mechanically.

---

# 7. Organization

`Organization` represents a participant operating within Rivercreek.

Potential organization types include:

- PRODUCER
- BUYER
- PROCESSOR
- LOGISTICS_PROVIDER
- STORAGE_PROVIDER
- OTHER

An organization may eventually perform multiple roles.

Do not assume organization type must permanently be a single mutually exclusive enum if the product requires multi-role organizations.

An organization may have:

- members
- facilities
- farms
- inventory
- listings
- offers
- transactions
- integrations

---

# 8. User

`User` represents an authenticated human identity.

A user is not automatically equivalent to an organization.

A user may belong to:

- one organization
- multiple organizations
- no organization during onboarding

A user should not directly own commercial inventory merely because they created the record.

Commercial ownership should generally resolve through the relevant organization.

---

# 9. Membership

`Membership` connects:

USER

to

ORGANIZATION.

A membership may contain:

- user_id
- organization_id
- role
- status
- permissions or permission profile
- created_at

Authorization must not rely solely on the existence of membership.

The system must determine whether the user has authority for the requested action.

---

# 10. Role

Roles may initially include concepts such as:

- OWNER
- ADMIN
- MEMBER
- VIEWER

Operational roles may later require more specificity.

Avoid creating dozens of roles prematurely.

Permission logic should remain capable of becoming more granular.

---

# 11. Farm

`Farm` represents a producer-associated agricultural operating location or identity where useful to the product.

A farm belongs to or is controlled by an organization.

Potential fields may include:

- id
- organization_id
- name
- description
- location
- contact information
- operational attributes

A farm should not become a substitute for `Organization`.

An organization may control multiple farms.

---

# 12. Facility

`Facility` represents a physical operating location.

Potential facility types include:

- FARM
- PROCESSOR
- STORAGE
- BUYER
- DISTRIBUTION
- OTHER

Potential fields:

- id
- organization_id
- facility_type
- name
- address
- geographic coordinates
- timezone
- capabilities
- status

The final model may determine whether `Farm` is a specialized facility or separate domain entity.

**DECISION REQUIRED:** Final relationship between Farm and Facility.

---

# 13. Location

Physical location is important to Rivercreek.

Location should be modeled deliberately.

Potential information includes:

- address
- locality
- administrative region
- postal code
- country
- latitude
- longitude
- timezone

Do not use formatted address strings as authoritative geographic identity.

Geocoded values may come from external systems and should retain appropriate source information where relevant.

---

# 14. Product

`Product` defines the type of agricultural good represented by inventory.

Initial V1:

CATTLE

Future products may include:

- hogs
- poultry
- corn
- soybeans
- wheat
- eggs
- produce
- seafood
- honey
- other agricultural goods

The model should support expansion without pretending all agricultural products have identical attributes.

---

# 15. Product-Specific Attributes

Common transaction concepts should remain shared.

Product-specific attributes should be modeled separately where appropriate.

For cattle, attributes may include:

- breed/type
- sex
- approximate weight
- production method
- certifications
- age class
- grade where applicable

Do not create hundreds of nullable columns on a universal inventory table for every future agricultural product.

Prefer a shared core plus intentional product-specific modeling.

Exact strategy belongs in architecture and implementation design.

---

# 16. Unit

Quantities must have explicit units.

Potential units include:

- HEAD
- POUND
- HUNDREDWEIGHT
- BUSHEL
- TON

Units should use canonical machine-readable representations.

Display labels may differ.

Do not store authoritative quantity without sufficient unit context.

---

# 17. Quantity

A quantity conceptually consists of:

VALUE + UNIT.

Example:

30 HEAD

40,180 POUND

Quantity values should use numeric representations appropriate to the unit.

The model must define whether fractional quantities are valid for each unit.

Example:

30.5 head should generally not be valid.

40,180.5 lb may be valid depending on measurement precision.

Unit validation belongs in domain logic.

---

# 18. Measurement

Physical commerce frequently depends on measurements.

A `Measurement` may eventually represent:

- weight
- quantity
- grade
- moisture
- yield
- temperature
- other product-specific measurements

Measurements should be able to retain:

- value
- unit
- measurement type
- source
- measured_at
- verification status

Do not silently replace estimates with measured values.

---

# 19. Measurement Confidence

Where relevant, Rivercreek should distinguish:

- ESTIMATED
- REPORTED
- MEASURED
- VERIFIED
- FINAL

The exact vocabulary may evolve.

The underlying distinction must remain possible.

---

# 20. Inventory

`Inventory` represents agricultural goods owned or controlled by a participant and available or expected to become available for commerce.

Potential fields include:

- id
- organization_id
- farm_id or facility_id
- product_id
- total_quantity
- quantity_unit
- available_quantity
- status
- expected_availability
- product-specific attributes

Inventory is not itself a transaction.

---

# 21. Inventory State

Conceptually, inventory quantity may be:

TOTAL

minus

RESERVED

minus

COMMITTED

minus

FULFILLED

minus

OTHER UNAVAILABLE

equals

AVAILABLE.

Implementation may derive some values rather than storing all of them.

The database must not permit authoritative availability to become inconsistent.

---

# 22. Inventory Status

Potential inventory states may include:

- EXPECTED
- AVAILABLE
- PARTIALLY_COMMITTED
- COMMITTED
- FULFILLED
- CANCELLED
- UNAVAILABLE
- ARCHIVED

Exact states require implementation review.

Quantity state and record status should not be conflated unnecessarily.

---

# 23. Inventory Reservation

`InventoryReservation` represents quantity temporarily or durably unavailable because of an economic workflow.

Potential fields:

- id
- inventory_id or lot_id
- transaction_id where applicable
- quantity
- unit
- reservation_type
- status
- expires_at where applicable
- created_at

Reservations must prevent conflicting commitments.

The exact reservation architecture should favor transaction integrity over convenience.

---

# 24. Lot

`Lot` represents a transaction-ready grouping of agricultural inventory.

Potential fields:

- id
- organization_id
- product_id
- quantity
- unit
- location
- availability
- status
- product-specific attributes

A lot may reference:

- one inventory record
- multiple inventory records

depending on final product requirements.

---

# 25. Lot Composition

If a lot can contain multiple inventory records, composition should be explicit.

Potential entity:

`LotInventory`

Fields may include:

- lot_id
- inventory_id
- allocated_quantity
- unit

This prevents lot composition from becoming hidden inside unstructured data.

**DECISION REQUIRED:** Whether V1 cattle lots may combine multiple inventory records.

---

# 26. Listing

`Listing` represents supply made visible to potential buyers.

Potential fields:

- id
- seller_organization_id
- lot_id
- status
- available_quantity
- quantity_unit
- pricing_mode
- asking_price where applicable
- price_unit where applicable
- currency
- activated_at
- expires_at
- withdrawn_at

A listing references supply.

It does not itself represent a completed transaction.

---

# 27. Listing State

Potential states:

DRAFT

→ ACTIVE

→ PARTIALLY_COMMITTED

→ COMPLETED

Other states may include:

- PAUSED
- WITHDRAWN
- EXPIRED

State transitions must be explicit.

---

# 28. Pricing Mode

Listings may eventually use pricing modes such as:

- UNPRICED
- INDICATIVE
- DESIRED
- EXECUTABLE

Final V1 support depends on approved business decisions.

Do not implement all modes merely because the data model can represent them.

---

# 29. Interest

`Interest` represents non-binding buyer interest.

Potential fields:

- id
- listing_id
- buyer_organization_id
- message
- indicative_quantity
- indicative_price
- created_at
- status

Interest must never be interpreted as an executable offer.

---

# 30. Offer

`Offer` represents proposed commercial terms.

Potential fields:

- id
- listing_id
- buyer_organization_id
- seller_organization_id
- quantity
- quantity_unit
- price
- price_unit
- currency
- expires_at
- status
- parent_offer_id where applicable
- created_at

Material terms must be represented explicitly.

Do not hide authoritative commercial terms exclusively inside free-form text.

---

# 31. Offer Conditions

Some offers may contain conditions.

Conditions should eventually be represented in a manner that allows Rivercreek to determine whether they are:

- informational
- required before acceptance
- required before fulfillment
- economic adjustment conditions
- external conditions

Do not build a generalized contract-expression language in V1.

Use explicit supported conditions.

---

# 32. Offer State

Potential states include:

- DRAFT
- ACTIVE
- COUNTERED
- ACCEPTED
- REJECTED
- WITHDRAWN
- EXPIRED
- INVALIDATED

Exact transitions belong in the state-machine specification.

An accepted offer cannot simultaneously remain executable.

---

# 33. Offer Lineage

Counteroffers should preserve negotiation history.

Potential relationship:

Offer B
`parent_offer_id` → Offer A.

Do not mutate Offer A into Offer B.

The lineage should make negotiation reconstructable.

---

# 34. Acceptance

Acceptance is an economic action rather than merely a UI event.

The implementation may represent acceptance through:

- offer state transition
- transaction creation
- audit event
- inventory reservation

rather than requiring a separate permanent `Acceptance` table.

The operation itself must be atomic.

Conceptually:

VALIDATE OFFER

→ VALIDATE AUTHORITY

→ VALIDATE INVENTORY

→ ACCEPT OFFER

→ RESERVE INVENTORY

→ CREATE TRANSACTION

→ RECORD EVENT

All succeed or the operation fails safely.

---

# 35. Transaction

`Transaction` represents an accepted commercial arrangement.

Potential fields include:

- id
- human_reference
- seller_organization_id
- buyer_organization_id
- product_id
- source_listing_id
- source_offer_id
- status
- agreed_quantity
- quantity_unit
- agreed_price
- price_unit
- currency
- accepted_at
- created_at

The transaction should preserve material accepted terms independently of mutable source objects.

---

# 36. Transaction Snapshot

A transaction should preserve the accepted commercial reality at the time of agreement.

A snapshot may include:

- seller identity
- buyer identity
- product
- lot description
- agreed quantity
- agreed pricing
- material product attributes
- relevant location
- timing
- agreed conditions

Implementation may use:

- dedicated immutable fields
- structured snapshot records
- versioned terms

Avoid storing the entire transaction as an opaque JSON blob.

Core queryable commercial fields should remain structured.

---

# 37. Transaction Parties

V1 may store buyer and seller directly on the transaction.

Long-term infrastructure may require more flexible participant modeling.

Potential future concept:

`TransactionParty`

with:

- transaction_id
- organization_id
- role

Possible roles:

- SELLER
- BUYER
- PROCESSOR
- CARRIER
- STORAGE_PROVIDER
- OTHER

Do not prematurely generalize V1 unless implementation benefits.

---

# 38. Transaction State

Conceptual transaction lifecycle:

AGREED

→ CLEARING

→ SCHEDULED

→ IN_FULFILLMENT

→ RECONCILING

→ SETTLED

→ COMPLETED

Exceptional or terminal states may include:

- CANCELLED
- DISPUTED
- FAILED

Exact transitions must be explicitly specified before implementation.

---

# 39. Transaction State History

Current transaction status alone is insufficient.

Important state changes should be recorded.

Potential entity:

`TransactionStateHistory`

Fields:

- id
- transaction_id
- from_status
- to_status
- actor
- source
- reason where appropriate
- occurred_at

This may overlap with a broader audit/event architecture.

Avoid unnecessary duplicate history systems.

---

# 40. Commercial Terms

Material transaction terms should be explicit and durable.

If terms are amended after acceptance, Rivercreek should preserve:

- original terms
- amendment
- changed terms
- actor
- timestamp
- reason
- approval state where applicable

Do not update the original agreement in place without history.

---

# 41. Amendment

Potential entity:

`TransactionAmendment`

may include:

- id
- transaction_id
- amendment_type
- proposed_changes
- status
- proposed_by
- approved_by where applicable
- reason
- created_at
- approved_at

V1 may not require sophisticated amendment workflows.

The model must not prevent explicit historical amendments later.

---

# 42. Money

Money must use exact arithmetic.

Conceptually:

AMOUNT + CURRENCY.

Examples:

95175.00 USD

Do not use binary floating point for authoritative monetary calculations.

Implementation should use:

- integer minor units where appropriate
- fixed precision decimal

according to the final architecture.

---

# 43. Price

Price is not the same as money.

A price includes:

AMOUNT

+

CURRENCY

+

PRICING UNIT.

Examples:

2.35 USD / POUND

235.00 USD / HUNDREDWEIGHT

1,900.00 USD / HEAD

The pricing unit must be explicit.

---

# 44. Currency

V1 may support only USD.

The model should not make future currency support unnecessarily difficult.

Do not build foreign exchange infrastructure into V1 without requirement.

Currency should still be explicit in authoritative financial records.

---

# 45. Processing Reservation

`ProcessingReservation` represents processor capacity associated with a transaction.

Potential fields:

- id
- transaction_id
- processor_organization_id
- facility_id
- requested_date
- confirmed_date
- quantity
- unit
- status
- estimated_cost
- quoted_cost
- final_cost
- currency

---

# 46. Processing State

Potential states include:

- DISCOVERED
- REQUESTED
- HELD
- CONFIRMED
- IN_PROCESS
- COMPLETED
- CANCELLED
- FAILED

Not every conceptual state must exist in V1.

Confirmed capacity must remain distinguishable from discovered or requested capacity.

---

# 47. Processing Capacity

Processor capacity may require its own durable model.

Potential entity:

`ProcessingCapacity`

Fields may include:

- facility_id
- date or time window
- capacity
- unit
- reserved_capacity
- status

The model must support preventing overbooking when Rivercreek is authoritative.

External processor capacity may require source and freshness metadata.

---

# 48. Shipment

`Shipment` represents physical transportation associated with a transaction.

Potential fields:

- id
- transaction_id
- carrier_organization_id
- origin_facility_id
- destination_facility_id
- pickup_window
- delivery_window
- quantity
- unit
- equipment_type
- status
- estimated_cost
- confirmed_cost
- final_cost
- currency

A transaction may eventually have multiple shipments.

---

# 49. Shipment State

Potential states:

- ESTIMATED
- REQUESTED
- ASSIGNED
- CONFIRMED
- READY_FOR_PICKUP
- IN_TRANSIT
- DELIVERED
- COMPLETED
- CANCELLED
- FAILED

The system must not represent estimated transportation as confirmed transportation.

---

# 50. Storage Reservation

Future transactions may require storage.

Potential entity:

`StorageReservation`

Fields may include:

- id
- transaction_id
- storage_organization_id
- facility_id
- product_id
- quantity
- unit
- start_at
- end_at
- status
- estimated_cost
- final_cost

This is not required for initial cattle V1 unless product scope changes.

---

# 51. Fulfillment

`Fulfillment` records what actually happened physically.

Potential fields:

- id
- transaction_id
- status
- expected_quantity
- expected_unit
- actual_quantity
- actual_unit
- fulfilled_at
- source
- confirmed_by

Additional product-specific measurements may connect separately.

---

# 52. Fulfillment Event

Physical fulfillment may involve multiple events.

Potential examples:

- PICKED_UP
- RECEIVED_AT_PROCESSOR
- PROCESSING_STARTED
- PROCESSING_COMPLETED
- DELIVERED
- QUANTITY_CONFIRMED
- WEIGHT_CONFIRMED

Potential entity:

`FulfillmentEvent`

Fields:

- id
- transaction_id
- event_type
- facility_id
- occurred_at
- source
- actor
- metadata

Do not store important authoritative values exclusively in unstructured metadata.

---

# 53. Expected vs. Actual

Expected and actual values must remain distinct.

Example:

expected_weight = 40,500 lb

actual_weight = 40,180 lb

The final value must not overwrite the estimate if the estimate is economically or historically meaningful.

---

# 54. Reconciliation

`Reconciliation` represents the process of comparing expected and actual transaction outcomes.

Potential fields:

- id
- transaction_id
- status
- started_at
- completed_at
- created_by

Individual differences should be represented through explicit adjustments or measurements.

---

# 55. Adjustment

`Adjustment` represents an authorized change to transaction economics or reconciled values.

Potential fields:

- id
- transaction_id
- adjustment_type
- original_value
- final_value
- financial_effect
- currency
- reason
- source
- status
- created_by
- approved_by where required
- created_at

Do not allow arbitrary adjustments without authority.

---

# 56. Settlement

`Settlement` represents calculated final transaction economics.

Potential fields:

- id
- transaction_id
- status
- gross_amount
- processing_amount
- logistics_amount
- storage_amount
- rivercreek_fee_amount
- adjustment_amount
- net_amount
- currency
- calculated_at
- finalized_at

Settlement calculations must be deterministic.

---

# 57. Settlement Components

Long-term flexibility may favor explicit settlement components.

Potential entity:

`SettlementLine`

Fields:

- id
- settlement_id
- type
- description
- amount
- currency
- source_reference
- sort_order

Potential types:

- GROSS_PRODUCT_VALUE
- PROCESSING
- LOGISTICS
- STORAGE
- RIVERCREEK_FEE
- ADJUSTMENT
- TAX
- OTHER

V1 implementation should balance flexibility with simplicity.

---

# 58. Settlement State

Potential states:

- ESTIMATED
- PENDING
- FINAL
- PAID
- CANCELLED

However, payment state should not be unnecessarily conflated with settlement state.

A cleaner implementation may keep:

SETTLEMENT STATUS

separate from

PAYMENT STATUS.

This is preferred conceptually.

---

# 59. Payment

`Payment` represents actual or recorded movement of money.

Potential fields:

- id
- transaction_id
- settlement_id
- payer_organization_id
- payee_organization_id
- amount
- currency
- status
- external_provider
- external_reference
- initiated_at
- completed_at

V1 may not move real money.

Do not implement real payment behavior until explicitly approved.

---

# 60. Payment State

Potential states:

- OWED
- PENDING
- INITIATED
- COMPLETED
- FAILED
- REFUNDED
- CANCELLED

Exact payment provider states should be translated into Rivercreek domain states rather than leaked directly throughout the application.

---

# 61. Ledger Entry

`LedgerEntry` represents a durable financial event.

Potential fields:

- id
- transaction_id
- organization_id
- entry_type
- amount
- currency
- direction
- reference_type
- reference_id
- occurred_at

Ledger design requires careful architecture before real funds move.

Ledger history should be append-oriented.

Corrections should generally use compensating entries rather than mutation.

---

# 62. Contract

`Contract` may represent the durable commercial agreement or generated agreement associated with a transaction.

Potential fields:

- id
- transaction_id
- version
- status
- document_reference
- effective_at
- created_at

**DECISION REQUIRED:** Exact legal role of generated contracts and signatures in V1.

Do not infer legal enforceability from the existence of a database record.

---

# 63. Document

`Document` represents a file associated with a Rivercreek object.

Potential document types:

- contract
- processing receipt
- weight ticket
- bill of lading
- certificate
- invoice
- settlement statement
- image
- other

Potential fields:

- id
- organization_id
- document_type
- storage_reference
- filename
- content_type
- size
- uploaded_by
- created_at

Documents should be linked to domain objects through explicit relationships.

---

# 64. Provenance Record

`ProvenanceRecord` represents information about the origin or history of agricultural goods.

Potential fields:

- id
- product or inventory reference
- transaction reference where applicable
- provenance_type
- value
- source_type
- source_reference
- verification_status
- recorded_at

Provenance must distinguish reported information from verified information.

---

# 65. Verification

Where claims require verification, the model should support:

- claim
- source
- verifier
- status
- verified_at
- evidence

Do not represent participant-submitted information as verified merely because Rivercreek stored it.

---

# 66. Audit Event

`AuditEvent` records security-sensitive or economically meaningful actions.

Potential fields:

- id
- actor_user_id
- organization_id
- action
- object_type
- object_id
- source_type
- source_id
- previous_state where appropriate
- new_state where appropriate
- occurred_at

Audit history should be durable.

Sensitive data should not be unnecessarily duplicated into audit records.

---

# 67. Domain Event

`DomainEvent` represents a meaningful business event.

Potential examples:

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

Domain events describe what happened.

They are not merely application logs.

---

# 68. Domain Event Fields

A domain event may contain:

- id
- event_type
- aggregate_type
- aggregate_id
- organization_id where relevant
- actor_id where relevant
- occurred_at
- schema_version
- payload

The payload should contain sufficient event information without becoming the only authoritative storage of current state.

---

# 69. Event Authority

The database state is authoritative unless architecture explicitly defines an event-sourced domain.

V1 should not use full event sourcing without strong justification.

Domain events should complement the relational system of record.

They should not create two competing transaction truths.

---

# 70. Integration

`Integration` represents an external system connected to Rivercreek.

Potential fields:

- id
- organization_id
- integration_type
- provider
- status
- configuration_reference
- created_at

Secrets must not be stored directly in ordinary configuration fields.

Security architecture will define secret handling.

---

# 71. Integration Credential

Credentials require security-specific implementation.

Conceptually, Rivercreek must know:

- which integration
- which organization
- permitted scopes
- status
- creation
- revocation

Do not expose credential secrets after creation where avoidable.

Detailed design belongs in `SECURITY.md`.

---

# 72. External Reference

Rivercreek objects may correspond to records in external systems.

Potential entity:

`ExternalReference`

Fields:

- id
- integration_id
- rivercreek_object_type
- rivercreek_object_id
- external_object_type
- external_object_id

This supports synchronization without using external IDs as Rivercreek's canonical identity.

---

# 73. Idempotency Record

Economically meaningful API actions may require explicit idempotency tracking.

Potential fields:

- key
- organization_id or credential_id
- operation
- request fingerprint where appropriate
- resulting_object_id
- response reference
- created_at
- expires_at where appropriate

The final strategy belongs in architecture.

The data model must support preventing duplicate economic effects.

---

# 74. Webhook Subscription

Future external integrations may subscribe to Rivercreek events.

Potential entity:

`WebhookSubscription`

Fields:

- id
- organization_id
- endpoint
- event_types
- status
- signing configuration reference
- created_at

Not required for V1.

---

# 75. Webhook Delivery

Potential entity:

`WebhookDelivery`

may track:

- event_id
- subscription_id
- attempt
- status
- response code
- attempted_at
- next_retry_at

Webhook delivery is not authoritative transaction state.

---

# 76. Source

Important data may originate from different sources.

Potential source types:

- USER
- RIVERCREEK
- PROCESSOR
- CARRIER
- PARTNER_INTEGRATION
- EXTERNAL_DATA_PROVIDER
- ADMIN

Where source materially affects trust, it should be retained.

---

# 77. Data Freshness

External information may require freshness metadata.

Examples:

- processor capacity
- freight quote
- external inventory
- market information

Potential fields:

- observed_at
- received_at
- expires_at
- source

Stale external information should not silently appear current.

---

# 78. Soft Deletion

Economically meaningful records should generally not be hard-deleted.

Potential approaches:

- status
- archived_at
- cancelled_at
- revoked_at

Draft or non-economic records may be eligible for deletion according to product rules.

Do not use soft deletion mechanically for every table.

---

# 79. Versioning

Some entities may require optimistic concurrency control.

Potential field:

`version`

This may be useful for:

- inventory
- listings
- offers
- transactions
- processor capacity

Exact use should be determined by concurrency requirements.

Database-level transactional protections remain necessary for critical economic operations.

---

# 80. Time

Authoritative timestamps should be stored in a consistent machine representation.

Display should use relevant user or facility time zones.

Physical operations may depend on local time.

Facility timezone should therefore be explicit where scheduling depends on it.

Do not store ambiguous local timestamps without timezone context.

---

# 81. State Machines

Important economic objects require explicit state machines.

At minimum, consider:

- Listing
- Offer
- Transaction
- ProcessingReservation
- Shipment
- Settlement
- Payment

State transitions should be enforced through domain logic.

Direct arbitrary database state mutation should not become normal application behavior.

---

# 82. Listing State Machine

Conceptual:

DRAFT
→ ACTIVE

ACTIVE
→ PAUSED
→ ACTIVE

ACTIVE
→ PARTIALLY_COMMITTED

ACTIVE / PARTIALLY_COMMITTED
→ COMPLETED

ACTIVE / PAUSED
→ WITHDRAWN

ACTIVE / PAUSED
→ EXPIRED

Exact transitions require specification.

---

# 83. Offer State Machine

Conceptual:

DRAFT
→ ACTIVE

ACTIVE
→ ACCEPTED

ACTIVE
→ REJECTED

ACTIVE
→ WITHDRAWN

ACTIVE
→ EXPIRED

ACTIVE
→ COUNTERED

A terminal or invalid offer must not become accepted without an explicitly permitted transition.

---

# 84. Transaction State Machine

Conceptual:

AGREED
→ CLEARING
→ SCHEDULED
→ IN_FULFILLMENT
→ RECONCILING
→ SETTLED
→ COMPLETED

Exceptional transitions may lead to:

- CANCELLED
- DISPUTED
- FAILED

The exact allowed transition graph must be specified before production implementation.

---

# 85. Processing State Machine

Conceptual:

DISCOVERED
→ REQUESTED
→ HELD
→ CONFIRMED
→ IN_PROCESS
→ COMPLETED

Exceptional:

→ CANCELLED

→ FAILED

V1 may use a smaller subset.

---

# 86. Shipment State Machine

Conceptual:

ESTIMATED
→ REQUESTED
→ ASSIGNED
→ CONFIRMED
→ READY_FOR_PICKUP
→ IN_TRANSIT
→ DELIVERED
→ COMPLETED

Exceptional:

→ CANCELLED

→ FAILED

---

# 87. Settlement State Machine

Conceptual:

ESTIMATED
→ PENDING
→ FINAL

Payment state should remain separate.

A final settlement should not silently revert to estimated.

Corrections require explicit mechanisms.

---

# 88. Payment State Machine

Conceptual:

OWED
→ PENDING
→ INITIATED
→ COMPLETED

Exceptional:

INITIATED
→ FAILED

COMPLETED
→ REFUNDED

Exact behavior depends on payment architecture.

---

# 89. Core Relationships

Conceptually:

Organization
├── Membership
├── Farm / Facility
├── Inventory
├── Listings
├── Offers
└── Integrations

Inventory
└── Lot

Lot
└── Listing

Listing
├── Interest
└── Offer

Offer
└── Transaction

Transaction
├── InventoryReservation
├── Contract
├── ProcessingReservation
├── Shipment
├── Fulfillment
├── Reconciliation
├── Adjustment
├── Settlement
├── Payment
├── Documents
├── Provenance
├── AuditEvents
└── DomainEvents

Exact foreign-key direction may differ.

Business meaning should remain coherent.

---

# 90. Organization Isolation

Most commercial records belong to or involve organizations.

Queries and authorization must respect organization boundaries.

A user must not access another organization's private data simply by guessing an identifier.

Organization isolation must be enforced server-side.

The data model should make ownership and participation relationships explicit enough to authorize correctly.

---

# 91. Multi-Party Access

Transactions involve multiple organizations.

Therefore, authorization cannot rely only on:

`record.organization_id == current_organization_id`

for every object.

Transaction-related access may depend on:

- seller participation
- buyer participation
- processor participation
- logistics participation
- Rivercreek administrative authority

Access logic must be explicit.

---

# 92. Snapshots vs. References

Rivercreek needs both:

REFERENCES

and

HISTORICAL SNAPSHOTS.

References connect the current network.

Snapshots preserve what was true when an economic action occurred.

Example:

Transaction references seller organization ID.

Transaction also preserves the seller identity information required to understand the agreement at acceptance.

If the seller later changes its display name, the transaction history must remain understandable.

---

# 93. Structured Data vs. JSON

Use relational, typed fields for core business data.

JSON may be appropriate for:

- external provider payload fragments
- non-authoritative metadata
- extensible product attributes
- event payloads

Do not use JSON as an excuse to avoid modeling important business concepts.

Especially avoid burying authoritative:

- quantity
- price
- status
- organization
- transaction
- settlement

inside opaque JSON.

---

# 94. Constraints

Important invariants should be enforced at the strongest practical layer.

Potential database constraints include:

- non-null ownership
- positive quantities
- valid currency
- unique identifiers
- unique external mappings where required
- valid relationship uniqueness
- reservation integrity where possible

Not every business rule can be expressed as a database constraint.

Critical invariants should not rely solely on frontend validation.

---

# 95. Concurrency

The data model must support safe concurrent actions.

High-risk examples include:

- two buyers accepting against the same inventory
- two users reserving the same processor capacity
- duplicate transaction creation
- duplicate payment initiation
- concurrent settlement finalization

Use database transactions and appropriate concurrency controls.

Do not solve concurrency solely with UI disabling.

---

# 96. Derived Values

Avoid storing values that can become inconsistent when they can be safely derived.

However, do not recompute historical economic facts from mutable current data.

The distinction is:

CURRENT DERIVED STATE

versus

HISTORICAL ECONOMIC FACT.

Historical facts should be preserved.

---

# 97. Data Integrity Over Convenience

If a requested operation would leave:

- inventory
- transaction
- processing
- logistics
- fulfillment
- settlement

in mutually inconsistent states, the operation must fail or recover safely.

Partial success must be explicitly handled.

---

# 98. V1 Canonical Objects

The initial cattle V1 should prioritize a relatively small canonical set.

Likely required:

- User
- Organization
- Membership
- Farm / Facility
- Inventory
- Lot
- Listing
- Offer
- Transaction
- InventoryReservation
- ProcessingReservation
- Shipment
- Fulfillment
- Settlement
- AuditEvent

Potentially required depending on implementation:

- Interest
- Measurement
- Adjustment
- SettlementLine
- Document
- DomainEvent
- IdempotencyRecord

Do not implement every future entity before V1 requires it.

---

# 99. V1 Deferred Objects

Unless required by the first complete transaction, defer sophisticated implementations of:

- storage networks
- hedging
- lending
- insurance
- multi-currency
- generalized contracts engine
- public API credentials
- webhook subscriptions
- external developer platform
- complex data licensing
- advanced provenance verification
- generalized commodity attribute engine
- full ledger
- complex dispute engine

The architecture should permit future expansion without building it all now.

---

# 100. V1 Transaction Integrity Test

The data model must be capable of proving:

1. Who owns the cattle?
2. What cattle are available?
3. What lot contains them?
4. What quantity is listed?
5. What quantity remains available?
6. Who made the offer?
7. What exact terms were offered?
8. Was the offer valid when accepted?
9. Who accepted it?
10. What inventory became committed?
11. What transaction was created?
12. What terms were accepted?
13. What processing is required?
14. Is processing actually confirmed?
15. What transportation is required?
16. Is transportation actually confirmed?
17. What physically happened?
18. What differed from expectation?
19. How were final economics calculated?
20. What is the current authoritative state?
21. Who or what caused important state changes?

If the model cannot answer these questions, it is incomplete.

---

# 101. API Readiness Test

For each important domain object, ask:

> Could an authorized external system understand this object without knowing how the Rivercreek UI works?

> Does it have stable identity?

> Are units explicit?

> Are states explicit?

> Is organization authority understandable?

> Are material relationships explicit?

> Can changes be represented through durable events?

> Can economically meaningful writes be made idempotent?

If not, the model may be too tightly coupled to the application interface.

---

# 102. Data Product Readiness

Rivercreek's long-term data advantage should emerge from actual transactions and physical operations.

Potential structured data may include:

- supply
- demand
- offers
- accepted prices
- quantities
- weights
- grades
- geography
- processing capacity
- processing economics
- freight
- routes
- fulfillment
- settlement

The transactional system should capture these accurately as a natural consequence of operating the network.

Do not compromise transaction design merely to produce analytics.

Reliable operational data creates valuable analytics naturally.

---

# 103. Data Model Review Questions

Before approving an entity or relationship, ask:

1. What real-world thing does this represent?
2. Who owns or controls it?
3. Who may see it?
4. Who may modify it?
5. Does it have stable identity?
6. What units apply?
7. What state is it in?
8. What transitions are valid?
9. Does its history matter economically?
10. Can concurrent actions corrupt it?
11. Does it need a snapshot?
12. Does it need an audit trail?
13. Will an external system eventually need to understand it?
14. Are we modeling reality or merely the current screen?
15. Are we introducing complexity before V1 needs it?

---

# 104. Final Data Principle

Rivercreek should maintain one coherent representation of agricultural transaction truth.

The model should be:

- relational where relationships matter
- explicit where economics matter
- historical where agreements matter
- exact where money matters
- unit-aware where quantity matters
- auditable where authority matters
- concurrency-safe where commitments matter
- extensible where the network will grow

Do not model screens.

Model the market.

Model the transaction.

Model the physical movement.

Model the economics.

Preserve the history.

Protect the truth.