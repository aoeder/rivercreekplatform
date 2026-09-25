# Domain modules

Rivercreek business domains live here, one directory per domain (for example
`identity`, `organizations`, `inventory`, `market`, `offers`, `transactions`,
`processing`, `logistics`, `fulfillment`, `settlement`).

A module owns its domain types, validation, commands, queries, state
transitions, authorization rules, persistence access, and tests. Other code
uses a module through its deliberate public interface, not its internals.

Rules (see `docs/ARCHITECTURE.md` §10–§16):

- Modules must not import from `src/app` or `src/components`.
- Business rules belong here, never in React components or route files.
- Create a module when a ticket introduces that domain — not before.
