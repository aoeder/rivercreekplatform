# Domain components

Reusable Rivercreek-specific interface components (for example a transaction
status, economics summary, or quantity display) belong here once the same
pattern is needed in more than one place.

These components render domain data and invoke application capabilities. They
must not contain canonical business logic such as availability, pricing,
settlement, authorization, or state-transition rules — those live in
`src/modules`.

Generic visual primitives (buttons, inputs, layout) belong in
`src/components/ui`.
