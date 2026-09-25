# Rivercreek Design System

## 1. Purpose

This document defines the canonical visual and interface system for Rivercreek.

`PRODUCT.md` defines what Rivercreek is.

`BUSINESS_RULES.md` defines how Rivercreek behaves.

`UX.md` defines how Rivercreek should work for humans.

This document defines how Rivercreek should look, communicate hierarchy, and remain visually consistent across the product.

The design system applies to:

- first-party web applications
- mobile-responsive interfaces
- administrative interfaces
- embedded Rivercreek experiences where appropriate
- future first-party applications

The objective is not visual decoration.

The objective is to create a coherent interface for serious market and transaction infrastructure.

---

# 2. Design Philosophy

Rivercreek should feel:

- serious
- restrained
- precise
- trustworthy
- modern
- durable
- calm
- operational
- premium without being luxurious
- sophisticated without being intimidating

Rivercreek should not feel like:

- generic farm-management software
- a commodity trading casino
- a crypto exchange
- a consumer social network
- a cartoon agricultural application
- an outdated ERP
- a generic SaaS dashboard
- a collection of unrelated AI-generated components

The product should visually communicate:

> Important real-world commerce happens here.

---

# 3. Infrastructure, Not Decoration

Rivercreek's visual system should reflect its role as infrastructure.

Design should emphasize:

- information
- state
- economics
- actions
- relationships
- physical movement
- transaction progression

Decorative elements should remain subordinate.

Avoid unnecessary:

- gradients
- glass effects
- glowing elements
- oversized illustrations
- decorative animation
- novelty interactions
- visual noise

A screen should look sophisticated because the information is exceptionally well organized, not because effects were added to it.

---

# 4. Agriculture Without Agricultural Clichés

Rivercreek is an agricultural company.

That does not mean every interface needs:

- barns
- tractors
- wheat icons
- cow silhouettes
- rustic textures
- wood grain
- excessive green
- western typography

Agriculture should appear naturally through:

- cattle
- crops
- farms
- geography
- facilities
- trucks
- processors
- physical inventory
- real transaction data
- maps
- provenance

The interface itself should remain modern infrastructure.

---

# 5. Visual Hierarchy

Every screen should establish clear hierarchy.

The user should be able to identify quickly:

1. Where am I?
2. What am I looking at?
3. What is its current state?
4. What matters most?
5. What requires action?
6. What happens next?

Hierarchy should be created primarily through:

- typography
- spacing
- grouping
- alignment
- scale
- restrained semantic color

Avoid relying on decorative containers to create hierarchy.

---

# 6. Density

Rivercreek should support increasing information density as users become more sophisticated.

Default experiences should be relatively calm.

Advanced market and operational experiences may become denser.

Conceptually:

SIMPLE WORKFLOW

→ OPERATIONAL WORKFLOW

→ ADVANCED MARKET VIEW

The design system must support all three without becoming visually inconsistent.

Do not confuse density with clutter.

---

# 7. Design Tokens

Visual decisions should be implemented through reusable design tokens rather than repeated arbitrary values.

Tokens should eventually cover:

- color
- typography
- spacing
- radius
- border
- shadow
- sizing
- breakpoints
- motion
- z-index where necessary

Agents should use established tokens before introducing new values.

If a new token is necessary, it should represent a reusable design decision rather than one screen-specific exception.

---

# 8. Color Philosophy

Rivercreek should use a restrained neutral foundation.

The primary interface should rely heavily on:

- white
- near-white
- charcoal
- dark neutral
- middle neutral
- light neutral
- borders

Brand and semantic colors should be used intentionally.

The interface should not become predominantly green merely because Rivercreek operates in agriculture.

---

# 9. Initial Color Direction

Until final brand tokens are approved, use a restrained neutral system.

Conceptual roles:

## Background

Warm or neutral near-white.

## Surface

White or subtly differentiated neutral.

## Primary Text

Near-black charcoal.

## Secondary Text

Medium neutral.

## Border

Light neutral.

## Brand Accent

A restrained Rivercreek brand tone.

## Positive

Reserved for genuinely positive or successful states.

## Warning

Reserved for conditions requiring attention.

## Error

Reserved for failure, destructive actions, or material problems.

## Informational

Reserved for neutral information requiring distinction.

Exact hexadecimal values should be centralized in tokens and may evolve.

Agents must not introduce arbitrary new colors independently.

---

# 10. Semantic Color

Color should communicate meaning consistently.

Examples:

Positive:
- successful completion
- confirmed state where appropriate

Warning:
- action required
- approaching expiration
- operational exception

Error:
- failed action
- invalid state
- destructive consequence
- critical exception

Neutral:
- draft
- inactive
- historical
- informational

Do not use green merely because a number increased.

Do not use red merely because a number decreased.

Context determines meaning.

---

# 11. Color Is Never the Only Signal

State must never depend exclusively on color.

Use combinations of:

- text
- icons where appropriate
- labels
- shape
- position
- semantic color

Example:

Do not display only a green dot.

Display:

> Confirmed

with appropriate supporting visual treatment.

---

# 12. Typography

Typography should feel modern, highly legible, and restrained.

Use a professional sans-serif interface typeface unless brand direction later specifies otherwise.

The system should support clear differentiation between:

- page titles
- section titles
- body copy
- labels
- metadata
- financial figures
- quantities
- table values
- statuses

Avoid excessive font families.

A single strong interface family is preferred for most application UI.

---

# 13. Numeric Typography

Numbers are unusually important in Rivercreek.

Examples include:

- prices
- weights
- quantities
- fees
- dates
- distances
- capacity
- settlement values

Numeric presentation should optimize scanability.

Where supported, use tabular numerals for:

- tables
- aligned financial values
- market data
- settlement calculations

Do not use decorative typography for authoritative numbers.

---

# 14. Type Hierarchy

Use a limited hierarchy.

Conceptually:

## Display / Page Title

Used sparingly.

## Section Heading

Defines major content regions.

## Subsection Heading

Defines local hierarchy.

## Body

Primary explanatory text.

## Label

Field and metadata identification.

## Caption / Metadata

Secondary context.

Avoid creating many nearly identical text sizes.

Hierarchy should be obvious.

---

# 15. Writing and Capitalization

Use sentence case for most interface language.

Prefer:

> Review settlement

over:

> REVIEW SETTLEMENT

Avoid excessive uppercase.

Uppercase may be used sparingly for compact metadata or specialized market displays where it improves scanning.

Buttons should generally use concise sentence-case language.

---

# 16. Spacing

Spacing should follow a consistent scale.

Use spacing to communicate relationships.

Elements that belong together should be closer.

Different conceptual groups should have greater separation.

Do not use borders when spacing alone can communicate grouping clearly.

Avoid arbitrary one-off margins and padding.

---

# 17. Grid

Desktop interfaces should use a consistent responsive grid.

The grid should support:

- primary content
- secondary contextual panels
- data tables
- maps
- transaction summaries
- market views

Content width should be appropriate to the task.

A transaction workspace may use broad application width.

A simple form should not unnecessarily stretch across a large monitor.

---

# 18. Responsive Breakpoints

Responsive behavior should be intentional.

Do not simply shrink desktop layouts.

At smaller widths:

- columns may stack
- tables may transform
- secondary panels may collapse
- actions may become persistent
- navigation may change form
- nonessential information may move behind progressive disclosure

Core transaction information must remain available.

---

# 19. Page Structure

A standard Rivercreek application page may contain:

1. Global navigation
2. Page header
3. Status or contextual information
4. Primary content
5. Secondary contextual information
6. Primary action
7. Supporting actions

Not every screen requires every region.

Consistency should come from reusable layout patterns.

---

# 20. Application Shell

The application shell should feel stable.

Navigation should not dramatically change from feature to feature.

The shell may eventually include:

- Rivercreek identity
- primary navigation
- organization context
- global search
- notifications
- account controls

Avoid excessive navigation depth.

---

# 21. Navigation

Navigation should be quiet and functional.

Active location should be obvious.

Potential primary concepts include:

- Home
- Market
- Inventory
- Transactions
- Processing
- Logistics
- Data

Final information architecture remains subject to product development.

Do not create navigation items merely because backend modules exist.

---

# 22. Page Headers

Page headers should establish context quickly.

They may include:

- page title
- short supporting description
- important status
- primary action
- secondary actions

Do not make page headers excessively tall.

Operational applications benefit from keeping important content visible.

---

# 23. Cards

Cards should be used when they represent a meaningful conceptual unit.

Examples:

- transaction summary
- offer
- lot
- processor option
- shipment
- settlement summary

Do not put every section inside a card.

Excessive cards create visual fragmentation.

Cards should generally use:

- restrained borders
- modest radius
- minimal or no shadow
- consistent padding

---

# 24. Borders

Borders should be subtle.

Use them to distinguish:

- controls
- tables
- containers
- selected states
- meaningful boundaries

Avoid heavy outlines around every object.

The interface should not look like a spreadsheet made entirely of boxes.

---

# 25. Radius

Corner radius should be modest.

Rivercreek should not feel aggressively rounded or toy-like.

Use a small, consistent set of radii.

Do not independently choose different radii for every component.

---

# 26. Shadows

Shadows should be minimal.

Use shadows primarily when communicating:

- elevation
- overlays
- menus
- modals
- floating controls

Static content containers should generally rely on layout, background, and borders rather than dramatic shadows.

---

# 27. Buttons

Button hierarchy should be obvious.

Use conceptual levels such as:

## Primary

The main action.

## Secondary

Important alternative action.

## Tertiary / Ghost

Low-emphasis supporting action.

## Destructive

Actions with destructive consequences.

A screen should generally avoid several equally prominent primary buttons.

---

# 28. Button Language

Buttons should describe actions.

Prefer:

> Add cattle

> Make offer

> Accept offer

> Confirm processing

> Review settlement

Avoid vague labels such as:

> Submit

> Continue

> Proceed

when a more specific action can be stated.

---

# 29. Destructive Buttons

Destructive actions require distinct visual treatment.

Examples:

- Cancel transaction
- Withdraw listing
- Remove member
- Delete draft

Do not use destructive styling for ordinary negative or secondary actions.

Destructive styling should retain its significance.

---

# 30. Forms

Forms should be clean and vertically understandable.

Each field should have:

- clear label
- appropriate input
- contextual help only when useful
- nearby validation

Avoid excessive placeholder dependence.

A placeholder is not a substitute for a label.

---

# 31. Form Grouping

Group fields according to the user's mental model.

Example cattle inventory form:

## Cattle

- head count
- approximate weight
- breed/type

## Location

- farm
- physical location

## Availability

- available date

Do not group fields according to database tables.

---

# 32. Input Units

Inputs involving quantities must show units clearly.

Examples:

> Head

> lb

> $ / lb

> miles

Never require users to infer units from surrounding context.

Where the unit can vary, make the selected unit explicit.

---

# 33. Validation

Validation should appear near the relevant control.

Use clear language.

Prefer:

> Enter at least 1 head.

over:

> Invalid quantity.

For server-side transaction conflicts, explain the updated reality rather than implying the user's input was malformed.

---

# 34. Tables

Tables are a major Rivercreek interface primitive.

Use tables for structured comparison and operational scanning.

Potential uses:

- inventory
- listings
- offers
- transactions
- processor capacity
- shipments
- settlement history
- market data

Tables should feel precise without becoming visually oppressive.

---

# 35. Table Design

Tables should generally include:

- clear column labels
- consistent alignment
- appropriate numeric alignment
- restrained row separators
- useful hover/focus state
- selected state where relevant
- clear actions

Avoid unnecessary vertical padding in high-density operational tables.

Avoid excessive density in beginner workflows.

---

# 36. Numeric Alignment

Numeric values should generally align consistently.

Financial and quantity columns often benefit from right alignment.

Text values generally align left.

Status may align according to context.

Consistency is more important than arbitrary symmetry.

---

# 37. Mobile Tables

Do not compress complex desktop tables until they become unreadable.

At narrow widths, transform information into:

- stacked rows
- cards
- priority columns
- expandable detail
- horizontally scrollable data only when appropriate

The most important information and action should remain obvious.

---

# 38. Status Components

Statuses should use a consistent component system.

A status may include:

- text
- subtle semantic color
- icon where useful

Examples:

- Draft
- Available
- Offer received
- Accepted
- Processing requested
- Processing confirmed
- Transportation booked
- Delivered
- Settlement pending
- Complete
- Cancelled
- Disputed

Do not create a unique visual style for every status.

Statuses should map into a smaller semantic system.

---

# 39. Status vs. Action

Do not visually confuse current state with an available action.

Example:

Status:

> Processing requested

Action:

> View request

or:

> Confirm processing

They should not look identical.

---

# 40. Transaction Status

Transaction status should be visually prominent but not overpower the transaction itself.

Users should immediately understand:

- current stage
- whether action is required
- next expected step

A transaction status system should remain consistent across:

- transaction lists
- transaction detail
- notifications
- mobile
- administrative interfaces

---

# 41. Transaction Timeline

Timeline design should prioritize chronology and meaningful events.

Each event may include:

- event name
- timestamp
- actor/source where relevant
- supporting information

Important exceptions should stand out.

Routine events should remain visually quieter.

Do not make every event equally prominent.

---

# 42. Economics Components

Rivercreek should have reusable components for economic summaries.

Potential structure:

Gross value                 $95,175

Processing                  -$3,200

Transportation              -$1,450

Rivercreek fee                -$950
                              ───────
Estimated net               $89,575

The exact values are illustrative only.

The component should support:

- estimated economics
- final economics
- adjustments
- explanatory detail

---

# 43. Financial Hierarchy

The final or estimated net amount should generally be visually prominent.

Supporting calculations should remain easy to inspect.

Do not hide costs behind tooltips.

Do not make fees visually insignificant relative to other transaction components.

Transparency is part of the design system.

---

# 44. Estimated Values

Estimated values require clear treatment.

Use explicit language such as:

> Estimated net

rather than displaying a number that visually appears final.

Do not rely solely on an icon or color to communicate estimation.

---

# 45. Adjustments

Adjustment components should communicate:

- original value
- final value
- difference
- reason where available
- economic effect

Adjustments should visually explain reconciliation rather than make the user feel the transaction mysteriously changed.

---

# 46. Market Views

Market interfaces may require greater density than ordinary workflows.

They may include:

- listings
- offers
- market depth
- recent transactions
- price history
- geographic information
- filters

Market views should remain understandable to non-traders by default.

Advanced data may be progressively disclosed.

---

# 47. Market Depth

If market depth is introduced, it should be visually structured and numerically precise.

The default experience should not assume the user knows financial-market terminology.

Plain-language labels may accompany specialized market concepts.

Avoid creating a visual imitation of a stock or crypto trading terminal unless that interaction genuinely improves agricultural commerce.

---

# 48. Charts

Charts must answer a question.

Examples:

- How has price changed?
- What have comparable transactions cleared at?
- Where is demand?
- How much processor capacity remains?
- What is the freight impact?

Every chart should have a clear reason to exist.

Avoid dashboard decoration charts.

---

# 49. Chart Design

Charts should use:

- restrained color
- clear axes
- readable labels
- appropriate units
- minimal decoration
- meaningful tooltips where useful

Avoid:

- unnecessary 3D effects
- excessive grid lines
- rainbow palettes
- unexplained abbreviations
- chart junk

---

# 50. Maps

Maps should communicate physical context.

Potential uses include:

- farm locations
- processors
- buyers
- storage
- transportation routes
- geographic demand
- basis
- capacity

Maps should integrate with surrounding transaction information.

Do not use a large map merely because location data exists.

---

# 51. Map Markers

Markers should distinguish important entity types without creating visual chaos.

Potential types:

- farm
- buyer
- processor
- storage
- pickup
- delivery

Use a coherent marker system.

Avoid many arbitrary marker colors.

---

# 52. Icons

Icons should support comprehension.

They should not replace clear language for important actions.

Use a consistent icon library.

Avoid mixing unrelated icon styles.

Do not create custom icons unless the concept genuinely requires one.

---

# 53. Photography

When photography is used, prefer authentic imagery of:

- farms
- cattle
- crops
- processors
- trucks
- facilities
- landscapes
- people working

Avoid generic stock imagery that makes Rivercreek feel promotional rather than operational.

Application workflows should not depend on photography.

---

# 54. Imagery and Provenance

Images associated with farms, products, or transactions may eventually contribute to provenance.

Operational imagery should be clearly associated with the relevant object.

Do not use decorative imagery in ways that could imply false provenance or verification.

---

# 55. Empty States

Empty states should be visually quiet and useful.

They may include:

- concise explanation
- subtle icon or illustration where appropriate
- one primary action

Avoid oversized illustrations that dominate operational screens.

---

# 56. Loading States

Loading states should resemble the structure that will appear.

Use:

- skeletons
- localized indicators
- progress indicators for genuinely long operations

Avoid excessive global spinners.

Do not display successful economic state before authoritative confirmation.

---

# 57. Success Feedback

Success feedback should be concise.

Example:

> Offer accepted

> 30 head are now committed to Transaction RC-1042.

Then surface the next action.

Avoid celebratory animation for routine economic transactions.

---

# 58. Error Feedback

Errors should be visible without being visually theatrical.

Use stronger visual treatment for:

- transaction failure
- payment failure
- security issues
- destructive-action failure
- material operational exceptions

Ordinary form validation should remain local and restrained.

---

# 59. Alerts

Alerts should have clear semantic hierarchy.

Potential levels:

- Information
- Success
- Warning
- Error

Alerts should include:

- concise title where useful
- clear message
- action when appropriate

Do not use alerts for ordinary content.

---

# 60. Modals

Use modals sparingly.

Appropriate uses may include:

- focused confirmation
- small contained task
- destructive action
- high-consequence acceptance

Complex workflows should generally receive a full page or dedicated panel rather than an enormous modal.

---

# 61. Drawers and Side Panels

Side panels may be useful for:

- quick transaction context
- filters
- secondary details
- offer review
- event details

Do not place critical workflows inside narrow panels when the task requires substantial context.

---

# 62. Tooltips

Tooltips should clarify unfamiliar concepts.

They should not contain information necessary to understand a transaction.

Material terms and costs must remain visible without requiring hover.

---

# 63. Badges

Badges should be used for compact categorical information.

Examples:

- Estimated
- Confirmed
- Organic
- Grass-fed
- Processor verified

Do not create badge overload.

A screen containing dozens of colored pills becomes difficult to scan.

---

# 64. Chips and Filters

Chips may be appropriate for:

- active filters
- compact attributes
- removable selections

They should not replace structured information when precise values matter.

---

# 65. Organization Switcher

Where users belong to multiple organizations, organization context should be visible in the application shell.

The switcher should communicate:

- current organization
- role where useful

Economically consequential actions should occur under an obvious organization context.

---

# 66. Notifications

Notification design should prioritize actionability.

Visually distinguish:

- requires action
- meaningful update
- informational

Unread status alone should not determine importance.

---

# 67. Search

Search should feel like an infrastructure tool.

Results should clearly identify object type.

Examples:

> Transaction RC-1042

> Lot 24

> Anderson Farms

> Processing reservation PR-184

Search should not present ambiguous objects without context.

---

# 68. IDs

Human-facing identifiers should be readable where possible.

Examples:

- RC-1042
- LOT-0024
- SHP-0182

Database identifiers may remain different internally.

Do not expose long technical UUIDs as the primary human reference unless necessary.

The final identifier scheme belongs in `DATA_MODEL.md`.

---

# 69. Accessibility

Components should meet reasonable accessibility standards.

Design must support:

- keyboard interaction
- visible focus
- screen-reader labeling
- sufficient contrast
- appropriate target size
- semantic markup

Color alone cannot communicate meaning.

Accessibility is part of component correctness.

---

# 70. Focus States

Interactive elements require visible focus states.

Do not remove browser focus behavior without replacing it with an accessible alternative.

Focus styling should be visually consistent across the application.

---

# 71. Hover States

Hover may enhance desktop interaction.

Important functionality must not depend exclusively on hover.

Touch users must retain equivalent access.

---

# 72. Motion

Motion should be restrained.

Appropriate uses include:

- panel transitions
- expanding content
- state changes
- contextual feedback

Avoid motion that slows frequent operational tasks.

Respect reduced-motion preferences where practical.

---

# 73. Responsive Action Hierarchy

On desktop, primary actions may appear in headers or contextual panels.

On mobile, primary actions may move to:

- sticky bottom action area
- prominent full-width control
- contextually persistent location

The action's importance should remain consistent across screen sizes.

---

# 74. Mobile Navigation

Mobile navigation should prioritize the most important participant workflows.

Do not attempt to expose every desktop navigation item simultaneously.

Secondary functionality may move into menus or contextual navigation.

Transaction context should remain easy to recover.

---

# 75. Mobile Information Hierarchy

Mobile should prioritize:

1. object identity
2. state
3. most important economics
4. next action
5. essential supporting information

Advanced information may move behind expansion.

Do not simply stack every desktop panel into an extremely long page without prioritization.

---

# 76. Desktop Information Hierarchy

Desktop may display related information simultaneously.

Example transaction layout:

MAIN CONTENT

Transaction lifecycle and current task.

RIGHT CONTEXT PANEL

Economics, participants, key terms, next action.

This is conceptual rather than mandatory.

Use additional width to improve comprehension.

---

# 77. Data Freshness

Where freshness matters, the interface may communicate:

- updated time
- live state
- delayed state
- last confirmed state

Do not imply real-time information when data is materially delayed.

---

# 78. External Data

Information from external systems should fit the Rivercreek design system.

Do not reproduce the external provider's interface inside Rivercreek unless necessary.

Where source matters, identify it discreetly.

Examples:

> Carrier confirmed

> Processor reported

> Updated through partner integration

---

# 79. System-of-Record State

Authoritative Rivercreek state should receive clear visual treatment.

Local optimistic state must not visually override authoritative failure.

When authoritative state is uncertain, communicate that uncertainty.

Do not fabricate confidence for visual smoothness.

---

# 80. Admin Design

Administrative interfaces may be denser than participant interfaces.

They should remain consistent with Rivercreek's component system.

Admin design should emphasize:

- state
- history
- authority
- exceptions
- auditability

Avoid building an entirely unrelated internal visual system unless justified.

---

# 81. Component Reuse

Before creating a new component, determine whether an existing component can satisfy the need.

Common primitives should include over time:

- Button
- Input
- Select
- Checkbox
- Radio
- Textarea
- Date control
- Status
- Badge
- Alert
- Card
- Table
- Modal
- Drawer
- Tabs
- Tooltip
- Menu
- Pagination
- Empty state
- Skeleton
- Economics summary
- Timeline
- Object header

Agents should not create slightly different copies of the same primitive.

---

# 82. Domain Components

Rivercreek should develop reusable domain components where repeated product patterns emerge.

Potential examples:

- LotSummary
- OfferSummary
- TransactionStatus
- TransactionEconomics
- ProcessingReservation
- ShipmentSummary
- SettlementBreakdown
- ProvenanceRecord
- MarketPrice
- QuantityDisplay

Create domain components when repetition is real.

Do not prematurely create abstractions based solely on speculation.

---

# 83. Component Ownership

Reusable visual primitives should live in a predictable shared location.

Domain-specific components should live near the relevant domain or within a clearly defined shared domain layer.

Exact code organization belongs in `ARCHITECTURE.md`.

The design principle is:

One concept should not have five unrelated implementations.

---

# 84. Component States

Reusable components should explicitly support applicable states.

Examples:

- default
- hover
- focus
- active
- disabled
- loading
- error
- selected

Domain components may additionally require:

- estimated
- confirmed
- expired
- cancelled
- disputed

States should be intentional rather than accidental CSS side effects.

---

# 85. Design Consistency

Agents should not independently redesign existing patterns while implementing unrelated features.

If an established pattern exists, use it.

If it is insufficient, improve the shared pattern deliberately.

Do not create visual forks.

---

# 86. No Screen-Specific Mini Design Systems

A new feature must not introduce its own:

- color palette
- typography
- button style
- spacing system
- status style
- card style

without an approved reason.

Rivercreek should look like one product.

---

# 87. No Premature Pixel Lock

This document establishes visual direction and system behavior.

It does not permanently freeze every:

- pixel
- font size
- color
- radius
- breakpoint

before implementation.

Exact tokens should be refined through:

- implementation
- visual review
- real device testing
- user testing

Once established, they should become canonical.

---

# 88. Visual Review

Significant frontend work should be visually reviewed.

Review should consider:

- desktop
- mobile
- hierarchy
- spacing
- typography
- state
- actions
- economics
- responsiveness
- accessibility
- consistency

A passing unit test does not prove visual quality.

---

# 89. Screenshot Standard

Significant UI pull requests should include screenshots where practical.

At minimum:

- desktop
- mobile

For important workflows, include relevant:

- populated
- empty
- error
- success
- exception

states.

This allows agents and humans to review the actual product rather than only code.

---

# 90. Visual Regression

As Rivercreek matures, important interfaces may use automated visual regression testing.

Potential targets include:

- application shell
- inventory
- market
- offer review
- transaction workspace
- settlement

Visual regression should complement rather than replace human review.

---

# 91. Design Review Questions

Before approving a screen, ask:

1. Is the primary purpose obvious?
2. Is the primary action obvious?
3. Is the current state obvious?
4. Are important economics obvious?
5. Are estimates distinguishable from final values?
6. Does the screen use established components?
7. Is anything unnecessarily decorative?
8. Is anything unnecessarily dense?
9. Is anything unnecessarily hidden?
10. Does mobile preserve the essential workflow?
11. Could color create ambiguity?
12. Could a user misunderstand an economic consequence?
13. Does this look like Rivercreek?

---

# 92. V1 Visual Priorities

For V1, prioritize excellent design for:

1. Application shell
2. Home
3. Farm
4. Cattle inventory
5. Lot creation
6. Market
7. Listing detail
8. Offer creation
9. Offer review
10. Offer acceptance
11. Transaction workspace
12. Processing
13. Logistics
14. Fulfillment
15. Settlement

Do not spend disproportionate time designing peripheral settings while the core transaction remains weak.

---

# 93. V1 Component Priorities

Initial shared components should focus on actual V1 needs.

Likely priorities include:

- Button
- Input
- Select
- Checkbox
- Date control
- Status
- Badge
- Alert
- Card
- Table
- Modal
- Drawer
- Tabs
- EmptyState
- Skeleton
- PageHeader
- ObjectHeader
- EconomicsSummary
- Timeline
- QuantityDisplay
- MoneyDisplay

Do not build a giant component library before the application needs it.

---

# 94. Visual Performance

Design should not unnecessarily degrade application performance.

Avoid:

- enormous decorative assets
- excessive animation libraries
- unnecessary client-side rendering
- oversized image payloads
- complex visualizations where simple ones suffice

Operational speed is part of perceived design quality.

---

# 95. Dark Mode

Dark mode is not a V1 requirement unless explicitly prioritized.

The initial system should avoid architectural choices that make future theming unnecessarily difficult.

Do not delay the core transaction to implement dark mode.

---

# 96. Brand vs. Product UI

Rivercreek's marketing website and product application may use different levels of visual expression.

Marketing may use:

- stronger imagery
- storytelling
- larger typography
- brand moments

The application should prioritize:

- information
- operations
- economics
- state
- speed

They should still clearly belong to the same company.

---

# 97. AI-Generated UI Rule

AI coding agents must not treat generated UI as finished merely because it is functional.

Generated interfaces must be evaluated against:

- `UX.md`
- this design system
- existing application patterns
- responsive behavior
- actual screenshots

Agents should prefer improving shared patterns over generating isolated new ones.

---

# 98. The Rivercreek Visual Test

A Rivercreek interface should pass this test:

> Does this look like infrastructure people could trust with a real physical transaction?

> Can the user understand the important number?

> Can the user understand the current state?

> Can the user see what happens next?

> Is the primary action obvious?

> Are uncertainty and estimation represented honestly?

> Does the design reduce complexity without hiding truth?

> Does it feel modern without feeling trendy?

> Does it feel agricultural without relying on agricultural clichés?

> Does it feel like the same Rivercreek as every other screen?

If not, revise it.

---

# 99. Final Design Principle

Rivercreek should look as disciplined as the system underneath it.

The visual system exists to make:

- markets understandable
- transactions clear
- physical operations visible
- economics transparent
- state trustworthy
- complex infrastructure approachable

The interface should be quiet enough for the information to matter.

Serious infrastructure.

Plain agricultural language.

Visible economics.

Clear state.

One coherent system.