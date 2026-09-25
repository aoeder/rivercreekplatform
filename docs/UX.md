# Rivercreek UX

## 1. Purpose

This document defines the canonical user-experience principles for Rivercreek.

`PRODUCT.md` defines what Rivercreek is.

`BUSINESS_RULES.md` defines how Rivercreek must behave.

This document defines how Rivercreek should feel and function for the people using it.

Rivercreek should make sophisticated agricultural market and transaction infrastructure feel understandable, trustworthy, and operationally useful.

The interface should reduce complexity without hiding economically important information.

The objective is not to make Rivercreek appear simple by removing necessary information.

The objective is to organize complexity so users encounter the right information at the right time.

---

# 2. Core UX Principle

## Simple by default. Powerful on demand.

Rivercreek may eventually contain sophisticated:

- market mechanics
- transaction logic
- processing coordination
- logistics coordination
- settlement
- market data
- analytics
- financial infrastructure

The default user should not need to understand the complexity underneath the system.

Advanced users should not be prevented from accessing it.

The interface should progressively reveal sophistication as it becomes useful.

---

# 3. Agricultural Expertise Is Not Software Expertise

Rivercreek users may be extremely sophisticated agricultural operators without being sophisticated software users.

The product must respect that distinction.

A cattle producer should not need to understand:

- market microstructure
- database concepts
- enterprise software conventions
- financial-market jargon
- API concepts
- software architecture

to successfully transact.

The system should speak primarily in terms of the user's real-world activity.

Prefer:

- Your cattle
- Available cattle
- Buyers interested
- Current offers
- Estimated proceeds
- Processing
- Transportation
- Expected net
- Accept offer

over unnecessary technical terminology.

---

# 4. Market Mechanics Underneath, Plain Language on Top

Rivercreek may eventually support sophisticated market mechanics.

The default interface should translate those mechanics into ordinary commercial language.

Examples:

Use:

> You received an offer.

Rather than:

> A bid has been entered against your ask.

Use:

> Make these cattle available.

Rather than:

> Submit sell-side liquidity.

Use:

> 30 head available.

Rather than:

> Remaining executable quantity: 30.

Specialized terminology may be appropriate for sophisticated market participants or advanced interfaces.

It should not be required for ordinary use.

---

# 5. The User Should Think in Outcomes

Users should primarily think about what they are trying to accomplish.

A producer may think:

> I have cattle. What can I get for them?

A buyer may think:

> I need cattle that meet these requirements.

A processor may think:

> I have capacity available on these dates.

A hauler may think:

> I have equipment available on this route.

Rivercreek should translate these real-world objectives into structured transactions.

The system should not force users to mentally reconstruct Rivercreek's internal data model.

---

# 6. One Continuous Transaction

A core Rivercreek transaction should feel like one continuous workflow.

It should not feel like unrelated applications stitched together.

The user should understand the progression:

SUPPLY

→ MARKET

→ OFFER

→ AGREEMENT

→ PROCESSING

→ TRANSPORTATION

→ FULFILLMENT

→ RECONCILIATION

→ SETTLEMENT

At every point, Rivercreek should make clear:

1. What has happened?
2. What is happening now?
3. What needs attention?
4. What happens next?

---

# 7. Transaction as the UX Anchor

Once a transaction exists, the transaction should become the primary organizing object for its lifecycle.

The transaction experience should bring together relevant:

- commercial terms
- participants
- inventory
- processing
- logistics
- documents
- fulfillment
- adjustments
- settlement
- history

Users should not need to visit several unrelated modules to reconstruct what is happening.

Modules may provide specialized views.

The transaction remains the connecting thread.

---

# 8. The Rivercreek Home Experience

The home experience should answer:

> What requires my attention?

before attempting to show everything Rivercreek knows.

The dashboard should prioritize:

- actionable items
- current transactions
- meaningful market activity
- exceptions
- upcoming obligations
- important changes

The dashboard should not become a dumping ground for charts.

Information without a clear decision or operational purpose should generally have lower priority.

---

# 9. Role-Aware Experience

Rivercreek should adapt to the participant's role.

A producer should not see the same default experience as a processor.

A processor should not see the same default experience as a buyer.

Core infrastructure remains shared.

Presentation and workflows may differ.

Primary participant experiences include:

- Producer
- Buyer
- Processor
- Logistics Provider
- Rivercreek Administrator

Users belonging to multiple organizations or roles should be able to understand clearly which context they are operating within.

---

# 10. Organization Context

Users must always be able to understand which organization they are acting on behalf of when that distinction matters.

Actions that economically bind an organization should not occur under ambiguous organization context.

Where a user belongs to multiple organizations, switching context should be:

- obvious
- deliberate
- persistent enough to avoid confusion
- visible around important actions

---

# 11. Producer Golden Question

The producer experience should increasingly answer:

> What can I get for what I have?

This question connects:

- inventory
- market conditions
- buyer demand
- offers
- processing economics
- transportation economics
- expected proceeds

Rivercreek should make the answer increasingly immediate as network data improves.

---

# 12. Producer Golden Path

The initial producer experience should feel approximately like:

1. Tell Rivercreek who you are.
2. Create your farm.
3. Tell Rivercreek what cattle you have.
4. Group cattle into a transaction-ready lot.
5. Make the lot available.
6. See market activity.
7. Receive interest or offers.
8. Compare the economics.
9. Accept an offer.
10. See the transaction created.
11. Coordinate processing.
12. Coordinate transportation.
13. Track physical progress.
14. Reconcile what actually happened.
15. Review settlement.
16. See the completed transaction.

The experience should preserve continuity throughout this lifecycle.

---

# 13. Adding Cattle

Adding cattle should be extremely easy.

The default workflow should ask only for information necessary to create useful inventory.

Potential information may include:

- number of head
- approximate weight
- breed or type
- sex where relevant
- location
- expected availability
- production attributes
- certifications where relevant

Advanced fields should appear only when:

- necessary
- requested
- economically useful
- relevant to the transaction

Do not turn inventory creation into a compliance questionnaire.

---

# 14. Progressive Data Collection

Rivercreek should collect information when it becomes useful.

Do not ask for every possible attribute during initial setup merely because the system may eventually need it.

Example:

A producer creating cattle inventory may initially provide:

- 30 head
- Angus
- approximately 1,350 lb
- available in Warren County
- available October 15

If additional information becomes necessary to:

- list
- match
- process
- transport
- settle

Rivercreek can request it at that point.

Progressive data collection reduces friction and improves data relevance.

---

# 15. Creating a Lot

Creating a transaction-ready lot should feel like selecting cattle and describing how they should be sold.

The user should clearly understand:

- what inventory is included
- quantity
- estimated characteristics
- location
- availability
- what remains outside the lot

The interface should prevent accidental over-allocation.

---

# 16. Making Supply Available

Publishing supply should feel like a deliberate but straightforward action.

Before activation, Rivercreek should summarize:

- what is being made available
- quantity
- location
- timing
- pricing information if applicable
- important conditions

The primary action should use plain language such as:

> Make Available

or

> List Cattle

depending on the final product terminology.

The interface should not imply that publishing a listing means the cattle have been sold.

---

# 17. Buyer Discovery

The buyer experience should make relevant supply easy to discover.

Buyers should eventually be able to search or filter using relevant dimensions such as:

- product
- quantity
- location
- availability
- weight
- grade
- production attributes
- processing requirements
- delivery implications

The interface should prioritize economically meaningful distinctions.

Do not create filters merely because attributes exist in the database.

---

# 18. Buyer Golden Question

The buyer experience should answer:

> Can I obtain what I need, when I need it, at an acceptable total cost?

That means purchase price alone may be insufficient.

Rivercreek should increasingly help the buyer understand:

PRODUCT

+

PRICE

+

LOCATION

+

PROCESSING

+

TRANSPORTATION

+

TIMING

=

REAL TRANSACTION ECONOMICS

---

# 19. Listing Detail

A listing detail page should allow a buyer to quickly understand:

- what is available
- how much is available
- where it is
- when it is available
- important characteristics
- relevant pricing information
- fulfillment implications
- seller information where appropriate
- what action can be taken

The primary action should be obvious.

Potential actions include:

- Make Offer
- Express Interest
- Request Information

depending on the listing state and approved business rules.

---

# 20. Interest vs. Offer

The UX must make the distinction between non-binding interest and executable offers unmistakable.

Interest should feel exploratory.

An offer should feel consequential.

Interest might say:

> I'm interested.

An offer should require explicit terms and communicate:

> You are proposing these transaction terms.

Users should never accidentally create an executable commitment when they believe they are merely expressing interest.

---

# 21. Making an Offer

The offer workflow should minimize unnecessary inputs while making material terms explicit.

Before submission, the buyer should understand:

- product
- quantity
- price
- pricing unit
- estimated total value
- expiration
- important conditions
- processing assumptions where relevant
- logistics assumptions where relevant

Immediately before submission, Rivercreek should clearly indicate that the user is creating an offer rather than merely saving information.

---

# 22. Reviewing an Offer

Offer review is one of Rivercreek's most important experiences.

A producer should be able to understand the economics within seconds.

The default hierarchy should emphasize:

1. Offered price
2. Quantity
3. Estimated gross proceeds
4. Estimated processing cost
5. Estimated transportation cost
6. Rivercreek fees
7. Estimated net proceeds
8. Timing
9. Important conditions
10. Buyer

The precise ordering may evolve through user testing.

The economic consequence must remain obvious.

---

# 23. Net Economics

Rivercreek should make net economics more visible than traditional fragmented agricultural commerce.

Where appropriate:

SALE VALUE

− PROCESSING

− TRANSPORTATION

− RIVERCREEK FEES

± AUTHORIZED ADJUSTMENTS

= EXPECTED NET

The interface should not force users to perform arithmetic across several screens.

Estimated values must be clearly labeled.

Final values must be clearly distinguished.

---

# 24. Acceptance

Accepting an offer is a high-consequence action.

The interface should clearly show what is being accepted.

Immediately before acceptance, the producer should see the material transaction terms.

The primary action may read:

> Accept Offer

The interface should communicate the consequence.

Example:

> Accepting this offer will commit 30 head to this transaction.

The exact legal language requires approved business and legal rules.

The UX must not invent legal consequences.

---

# 25. High-Consequence Actions

Actions with meaningful economic, operational, legal, or destructive consequences should receive stronger confirmation than routine actions.

Examples may include:

- accepting an offer
- cancelling a transaction
- confirming final settlement
- approving a material adjustment
- releasing reserved inventory
- initiating payment
- deleting important information

Confirmation should explain the consequence.

Avoid meaningless confirmation dialogs for ordinary low-risk actions.

Too many confirmations train users to ignore them.

---

# 26. Transaction Workspace

After acceptance, Rivercreek should create a transaction workspace.

This should become the primary place for understanding the transaction.

A transaction workspace may include:

## Overview

- status
- buyer
- seller
- product
- quantity
- agreed price
- expected economics
- next action

## Processing

- processor
- facility
- date
- reservation status
- expected cost
- final cost

## Transportation

- origin
- destination
- carrier
- pickup
- delivery
- booking status
- expected cost
- final cost

## Fulfillment

- expected quantity
- actual quantity
- expected weight
- actual weight
- delivery
- exceptions

## Settlement

- gross
- charges
- adjustments
- net
- status

## History

- important transaction events

These may be implemented through sections, tabs, panels, or another coherent structure.

The architecture should not be dictated by the visual implementation.

---

# 27. Transaction Status

Users should not need to interpret technical state-machine names.

Internal states may be precise.

User-facing states should be understandable.

Examples might include:

- Offer accepted
- Processing being arranged
- Processing confirmed
- Transportation being arranged
- Ready for pickup
- In transit
- Delivered
- Final details being reconciled
- Settlement ready
- Complete

Exact wording should be refined during implementation and testing.

The underlying state must remain explicit.

---

# 28. What Happens Next

Every active transaction should clearly communicate the next meaningful action.

Examples:

> Processing needs to be confirmed.

> Transportation has not yet been arranged.

> Pickup is scheduled for October 18.

> Final weight is needed before settlement can be completed.

> Settlement is ready for review.

The user should not need to inspect several pages to determine what is blocking completion.

---

# 29. Timeline

Transactions should have a clear chronological representation.

The timeline may include:

- listing created
- offer received
- offer accepted
- transaction created
- processor requested
- processor confirmed
- shipment requested
- shipment booked
- pickup
- processor receipt
- delivery
- final quantity recorded
- settlement calculated
- settlement finalized
- payment completed

The timeline should derive from authoritative events.

It should not invent events merely for visual continuity.

---

# 30. Processing UX

Processing should feel like part of the transaction rather than an external administrative task.

Where data exists, users should be able to understand:

- available processors
- distance
- capability
- availability
- date
- estimated price
- reservation status

Rivercreek must clearly distinguish:

AVAILABLE

REQUESTED

HELD

CONFIRMED

The visual treatment should make these differences obvious.

---

# 31. Logistics UX

Transportation should also feel integrated with the transaction.

Where data exists, users should understand:

- origin
- destination
- distance
- equipment
- pickup window
- delivery window
- estimated cost
- carrier
- booking status

The interface must distinguish:

ESTIMATED

from

BOOKED.

A freight estimate must never visually imply a truck has been reserved.

---

# 32. Physical Context

Agricultural transactions occur in physical space.

Location should be used where it improves decision-making.

Maps may help users understand:

- farm
- buyer
- processor
- storage
- route
- distance
- transportation implications

Maps should not be added merely for decoration.

The map should answer an operational or economic question.

---

# 33. Fulfillment UX

Fulfillment should show what was expected and what actually happened.

Where appropriate, display:

| Expected | Actual |
|---|---|
| 30 head | 30 head |
| 40,500 lb | 40,180 lb |
| $X freight | $Y freight |
| October 18 delivery | October 18 delivery |

Differences should be understandable.

Material differences should link to their effect on settlement.

---

# 34. Reconciliation UX

Reconciliation should never feel like Rivercreek silently changed the transaction.

The interface should show:

ORIGINAL

→ ACTUAL

→ ECONOMIC EFFECT

Example:

> Estimated weight  
> 40,500 lb

> Final weight  
> 40,180 lb

> Difference  
> -320 lb

> Settlement effect  
> -$X

Where appropriate, explain the source of the final value.

---

# 35. Settlement UX

Settlement should answer:

> How did Rivercreek arrive at this number?

A settlement view should clearly separate:

- gross transaction value
- processing
- transportation
- storage
- Rivercreek fees
- authorized adjustments
- final amount

The final net should be visually prominent.

Users should be able to inspect the components without losing sight of the total.

---

# 36. Settlement Is Not Payment

The UX must distinguish:

SETTLEMENT CALCULATED

from

PAYMENT COMPLETED.

Do not use language such as:

> Paid

unless payment has actually been confirmed according to the authoritative payment system.

Potential states may include:

- Settlement estimated
- Settlement pending
- Settlement finalized
- Payment pending
- Payment processing
- Paid
- Payment failed
- Refunded

---

# 37. Trust Through Explicit State

Rivercreek should communicate certainty accurately.

Never visually imply:

- an indicative price is executable
- interest is an offer
- an offer is accepted when it is not
- capacity is confirmed when it is estimated
- transportation is booked when it is estimated
- estimated weight is final
- settlement is paid when only calculated
- self-reported information is independently verified

Trust depends partly on refusing to imply more certainty than exists.

---

# 38. Confidence and Source Labels

Where useful, information should communicate its source or confidence.

Potential labels include:

- Estimated
- Reported by producer
- Confirmed by processor
- Carrier confirmed
- Verified
- Final
- Rivercreek calculated

Do not overwhelm every value with badges.

Use source and confidence indicators where misunderstanding would materially affect a decision.

---

# 39. Error Prevention

Prevent errors before explaining them.

Examples:

Do not allow a producer to accept an expired offer.

Do not allow unavailable inventory to appear executable.

Do not allow a buyer to submit a quantity greater than permitted.

Do not allow unauthorized organization actions.

Do not allow confirmed capacity to be double-booked where Rivercreek controls capacity.

Validation should happen server-side even when the UI also prevents the action.

---

# 40. Error Messages

Errors should explain:

1. What happened.
2. Why, when safely knowable.
3. What the user can do next.

Bad:

> Error 409.

Better:

> These cattle are no longer fully available.

> 20 of the 30 head have already been committed. You can update the quantity and try again.

Do not expose sensitive internal information through errors.

---

# 41. Empty States

Empty states should help users move forward.

Bad:

> No inventory.

Better:

> You haven't added any cattle yet.

> Add your first cattle to start tracking availability and preparing them for market.

Where appropriate, provide one obvious action.

---

# 42. Loading States

Loading should preserve context.

Avoid unnecessarily blank screens.

Where useful, use:

- skeleton states
- localized loading indicators
- optimistic UI only when transaction integrity permits it

Do not optimistically display a high-consequence economic action as complete before authoritative confirmation.

For example, do not visually confirm offer acceptance before the server confirms successful acceptance.

---

# 43. Success States

Success feedback should communicate what happened and what comes next.

Bad:

> Success.

Better:

> Offer accepted.

> 30 head are now committed to Transaction RC-XXXX.

> Next: confirm processing.

---

# 44. Mobile First-Class Support

Many Rivercreek participants may operate away from a desk.

Mobile must be treated as a first-class experience.

Core V1 workflows must work on mobile, including:

- reviewing inventory
- reviewing listings
- reviewing offers
- understanding economics
- accepting offers
- checking transaction status
- reviewing processing
- reviewing transportation
- reviewing settlement

Desktop may expose more information simultaneously.

Mobile must preserve the essential workflow.

---

# 45. Mobile Action Design

Important mobile actions should be easy to reach and difficult to trigger accidentally.

Primary actions may use persistent bottom action areas where appropriate.

Examples:

> Make Offer

> Accept Offer

> Confirm Processing

Do not place economically consequential actions in tiny menus when they are the primary purpose of the screen.

---

# 46. Desktop Experience

Desktop should take advantage of additional space without becoming unnecessarily dense.

Desktop may support:

- split views
- side panels
- richer tables
- maps
- market depth
- transaction timelines
- economics panels

Density should increase only when it improves comprehension or operational speed.

---

# 47. Advanced Mode

Advanced market information may eventually include:

- market depth
- recent transactions
- comparable transactions
- historical pricing
- geographic basis
- processor economics
- freight economics
- advanced filters
- market analytics

This information should be available without overwhelming the default experience.

Potential patterns include:

- expandable sections
- advanced tabs
- optional panels
- role-specific dashboards

Do not build two separate transaction systems for simple and advanced users.

---

# 48. Tables

Tables should be used when comparison matters.

Potential examples:

- inventory
- lots
- offers
- transactions
- processor availability
- shipments
- settlements

Tables should prioritize the fields needed to make the associated decision.

Avoid exposing every database column.

On mobile, tables should transform appropriately rather than simply shrinking beyond usability.

---

# 49. Search and Filtering

Search and filters should reflect how users think about agricultural transactions.

Useful filters may eventually include:

- product
- geography
- quantity
- weight
- availability
- price
- grade
- processing capability
- delivery period

Filters should be added because they improve discovery, not because the underlying data exists.

---

# 50. Navigation

Navigation should reflect user objectives rather than technical architecture.

Potential top-level concepts may include:

- Home
- Market
- Inventory
- Transactions
- Processing
- Logistics
- Data

Exact navigation is not permanently defined by this document.

The important rule is:

Users should not need to understand Rivercreek's software architecture to navigate Rivercreek.

---

# 51. Cross-Module Continuity

When a user moves from:

Market

to

Transaction

to

Processing

to

Logistics

to

Settlement

the relevant transaction context should persist.

Users should not repeatedly search for the same transaction.

Deep links should preserve meaningful context where appropriate.

---

# 52. Notifications

Notifications should direct users toward meaningful actions.

Examples:

> New offer received for Lot 24.

> Offer expires in 2 hours.

> Processing confirmed for October 18.

> Transportation needs confirmation.

> Final weight received.

> Settlement ready for review.

Avoid notification noise.

Not every database event deserves a user notification.

---

# 53. Attention Hierarchy

Rivercreek should distinguish between:

## Requires Action

The user must do something.

## Important Update

Something meaningful changed.

## Informational

Useful but non-urgent information.

## Historical

Already completed activity.

The product should not make everything appear equally urgent.

---

# 54. Exceptions

Physical transactions do not always proceed perfectly.

Exceptions should be surfaced clearly.

Examples:

- processor unavailable
- carrier cancelled
- quantity changed
- weight discrepancy
- delivery delayed
- settlement adjustment required
- payment failed

An exception should communicate:

- what happened
- transaction impact
- what needs to happen next
- who is responsible where known

---

# 55. Destructive Actions

Destructive actions should be difficult to perform accidentally.

Examples include:

- deleting draft inventory
- withdrawing a listing
- cancelling a transaction
- removing an organization member
- reversing an administrative action

The UX should distinguish reversible and irreversible actions.

Economically meaningful history should not appear deletable when business rules require preservation.

---

# 56. Accessibility

Rivercreek should be usable without relying exclusively on:

- color
- hover states
- tiny text
- precise pointer movement

Interactive controls should have clear labels and usable target sizes.

Keyboard navigation should be supported where practical.

Contrast should remain readable in real operational environments.

---

# 57. Color

Color should communicate meaning deliberately.

Potential semantic uses include:

- positive
- warning
- error
- informational
- inactive
- confirmed

Do not rely on color alone to communicate transaction state.

Detailed visual tokens belong in `DESIGN_SYSTEM.md`.

---

# 58. Typography

Typography should prioritize:

- readability
- hierarchy
- numeric clarity
- economic information
- operational status

Financial values, quantities, weights, dates, and statuses should be easy to scan.

Detailed typography rules belong in `DESIGN_SYSTEM.md`.

---

# 59. Numbers

Numbers should be formatted consistently.

Examples:

- 30 head
- 1,350 lb
- 40,500 lb
- $2.35/lb
- $95,175 estimated gross
- October 18, 2026

The system should avoid ambiguous units.

Important numbers should always carry sufficient context.

---

# 60. Dates and Times

Dates and times should be understandable in the user's operating context.

Avoid exposing raw technical timestamps when ordinary dates are sufficient.

Where time zones materially affect an operation, the relevant time zone should be explicit.

Transaction history should preserve authoritative timestamps internally.

---

# 61. Status Language

Status labels should describe meaningful business state.

Avoid vague labels such as:

- Processing
- Pending
- Active

when more specific language is available.

Prefer:

- Waiting for processor confirmation
- Transportation requested
- Ready for pickup
- Settlement ready for review

The user should understand what the status means.

---

# 62. Primary Actions

Each screen should generally have one obvious primary action.

Examples:

Inventory:

> Add Cattle

Listing:

> Make Offer

Offer:

> Accept Offer

Transaction:

> Confirm Processing

Settlement:

> Review Settlement

Secondary actions should remain available without competing visually with the primary task.

---

# 63. Decision Density

Rivercreek should minimize the number of simultaneous decisions required from a user.

Do not ask users to configure ten optional settings before completing a common task.

Use:

- sensible defaults
- progressive disclosure
- contextual options
- remembered preferences where appropriate

Complexity should appear when the user needs it.

---

# 64. Defaults

Defaults should reduce effort without creating hidden commitments.

Safe defaults are encouraged.

Defaults that materially affect:

- economics
- legal obligations
- inventory commitments
- payment
- processing reservations
- transportation bookings

require greater care.

A default should never trick a user into an economic commitment.

---

# 65. Forms

Forms should be as short as reasonably possible.

Group related information.

Use appropriate controls.

Avoid requiring users to re-enter information Rivercreek already knows.

Explain unusual fields.

Optional fields should be clearly distinguishable where useful.

Validation should occur near the relevant input.

---

# 66. Saved Progress

Longer workflows should preserve progress where practical.

A user should not lose substantial work because:

- the browser closed
- mobile connectivity dropped
- they navigated away
- an external service temporarily failed

Drafts must remain distinguishable from submitted or executable records.

---

# 67. Connectivity

Some agricultural users may operate in environments with inconsistent connectivity.

Rivercreek should avoid unnecessary network dependency for purely presentational interactions.

Where an authoritative server action is required, the interface must not falsely represent completion while offline.

Future offline capabilities may be considered where operationally valuable.

V1 does not require full offline transaction support.

---

# 68. Trust Before Delight

Rivercreek should feel polished.

But trust is more important than visual novelty.

Prefer:

- clear state
- reliable actions
- visible economics
- consistent behavior
- understandable history

over:

- decorative animation
- novelty interactions
- excessive motion
- clever terminology
- visual complexity

Delight should emerge from making difficult transactions feel unexpectedly straightforward.

---

# 69. Visual Character

Rivercreek should feel like serious infrastructure.

The visual character should be:

- restrained
- confident
- clear
- durable
- modern
- precise
- calm

It should not feel like:

- a generic farm-themed website
- a consumer social network
- a crypto trading interface
- a casino
- a cartoon agricultural app
- an overly sterile enterprise ERP

Agriculture should appear through real products, geography, operations, and data rather than decorative clichés.

Detailed visual rules belong in `DESIGN_SYSTEM.md`.

---

# 70. Market Data UX

Market data should help users make decisions.

Data visualizations should answer specific questions.

Examples:

- What are comparable cattle selling for?
- Where is demand strongest?
- How has price changed?
- What processor capacity exists?
- What will freight do to economics?
- What have similar transactions actually cleared at?

Avoid charts that exist primarily to make the product appear sophisticated.

---

# 71. Provenance UX

Provenance should communicate the underlying history of a product without overstating verification.

Users should be able to distinguish:

- reported information
- recorded transaction events
- third-party verification
- Rivercreek verification
- inferred information

Consumer-facing provenance may eventually simplify presentation while preserving accurate underlying source information.

---

# 72. API and Integration UX

External integrations are part of the Rivercreek network.

The first-party application should make externally initiated actions understandable where relevant.

Example:

> Processing reservation confirmed through Processor XYZ integration.

or:

> Inventory updated through Farm Management System.

Users should be able to understand the origin of economically meaningful actions where that information matters.

---

# 73. System-of-Record UX

When Rivercreek is authoritative for a transaction state, the UI must represent that canonical state.

The frontend must not maintain a conflicting version of transaction truth merely because local state is stale.

Important actions should refresh or reconcile authoritative state when necessary.

If the system cannot confidently determine authoritative state, it should communicate uncertainty rather than fabricate completion.

---

# 74. Real-Time Behavior

Some Rivercreek information may change while a user is viewing it.

Examples include:

- inventory availability
- offers
- offer expiration
- processor capacity
- shipment status

Where stale information could create an invalid economic action, Rivercreek must revalidate before completion.

Real-time visual updates are useful.

Server-side validation remains authoritative.

---

# 75. Multi-User Behavior

Multiple users may act on behalf of the same organization.

The product should anticipate simultaneous activity.

Examples:

- one employee changes inventory
- another reviews an offer
- another schedules processing

Where relevant, Rivercreek should surface recent authoritative changes.

The product must not assume one human is the only person interacting with an organization's records.

---

# 76. Administrative UX

Administrative tools should prioritize:

- clarity
- auditability
- controlled authority
- exception resolution

Admin interfaces must not encourage silent manipulation of transaction history.

Sensitive actions should show:

- what will change
- why
- who initiated the action
- resulting impact

Administrative convenience does not override business rules.

---

# 77. V1 UX Scope

V1 should focus on making the cattle transaction coherent.

Priority experiences:

1. Account and organization
2. Farm
3. Cattle inventory
4. Lots
5. Listings
6. Market discovery
7. Buyer offer
8. Producer offer review
9. Acceptance
10. Transaction workspace
11. Processing
12. Transportation
13. Fulfillment
14. Reconciliation
15. Settlement
16. Transaction history

Do not allow peripheral features to degrade these experiences.

---

# 78. V1 UX Success Test

A producer unfamiliar with Rivercreek should be able to understand:

> This is what I have.

> This is what buyers are willing to pay.

> This is what it will approximately cost to complete the transaction.

> This is approximately what I will receive.

> This is what I am agreeing to.

> This is what happens next.

> This is where the cattle are in the process.

> This is what actually happened.

> This is how the final number was calculated.

A buyer should similarly understand:

> This is what is available.

> This is what it will cost.

> This is what I am offering.

> This is whether the offer was accepted.

> This is how the transaction will be fulfilled.

> This is where the transaction stands.

> This is what ultimately occurred.

If those questions cannot be answered easily, the UX is not complete.

---

# 79. UX Review Requirements

Material UI work should be reviewed for:

- clarity
- information hierarchy
- primary action
- terminology
- economic transparency
- transaction state
- loading state
- empty state
- error state
- success state
- mobile behavior
- desktop behavior
- authorization implications
- stale-data behavior
- accessibility
- unnecessary complexity

A feature is not complete merely because the happy-path screen renders.

---

# 80. Required UI States

Where applicable, every material interface should consider:

- initial
- loading
- populated
- empty
- error
- unauthorized
- stale
- success
- disabled
- expired
- unavailable

Not every screen requires every state.

Agents must deliberately consider which states apply.

---

# 81. Screenshot Requirement

Material frontend pull requests should include visual evidence where practical.

For significant workflows, this should generally include:

- desktop
- mobile

and relevant states such as:

- normal
- empty
- error
- success

Visual review is part of product review.

---

# 82. UX Testing Personas

V1 should be tested from multiple perspectives.

## Producer

Experienced cattle operator.

Limited patience for software.

Wants to understand:

> What can I get for what I have?

## Buyer

Procurement-oriented.

Wants to quickly compare supply and understand total economics.

## Processor

Operationally focused.

Wants accurate capacity, scheduling, requirements, and transaction context.

## Logistics Provider

Operationally focused.

Wants clear origin, destination, equipment, timing, and load information.

## Rivercreek Administrator

Needs to resolve exceptions without corrupting transaction history.

Agents and reviewers should use these perspectives when evaluating workflows.

---

# 83. UX Metrics

As the product matures, Rivercreek may measure:

- time to create farm
- time to add inventory
- time to create lot
- time to make supply available
- time to understand an offer
- time to make an offer
- time to understand expected net proceeds
- transaction completion rate
- abandonment rate
- error rate
- support requests
- processor confirmation time
- transportation confirmation time
- time from acceptance to fulfillment
- time from fulfillment to settlement

Metrics should help identify friction.

They should not encourage misleading or coercive UX.

---

# 84. No Dark Patterns

Rivercreek must not use UX patterns designed to obscure economic consequences or manipulate users into commitments.

Do not:

- hide fees
- disguise executable actions
- make cancellation intentionally confusing
- preselect consequential commitments deceptively
- create artificial urgency
- obscure material conditions
- visually minimize important costs
- imply verification that does not exist

Trust is strategically important to the network.

---

# 85. First-Party Application Principle

The Rivercreek application is the first major interface to the Rivercreek network.

It should therefore demonstrate the quality of the underlying infrastructure.

However, business rules must not become dependent on the first-party interface.

The application should consume reusable Rivercreek domain capabilities.

The application should not become a second source of transaction truth.

---

# 86. The Rivercreek UX Test

For every important screen, ask:

> What is the user trying to accomplish?

> What do they need to know right now?

> What is the most important action?

> What economic consequence does that action have?

> Is the information authoritative, estimated, or uncertain?

> What happens next?

> Could a reasonable user misunderstand the state?

> Does this feel like one connected transaction?

If the answers are unclear, the interface needs more work.

---

# 87. Final UX Principle

Rivercreek should hide unnecessary complexity.

It must never hide necessary truth.

The best Rivercreek experience should make sophisticated physical agricultural commerce feel unusually straightforward while preserving the precision, transparency, and transaction integrity required underneath it.

Market mechanics underneath.

Plain agricultural language on top.

Simple by default.

Powerful on demand.