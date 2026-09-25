# External integrations

Adapters for external systems (authentication, payments, mapping, messaging,
object storage, processor systems, logistics systems) live here, one directory
per provider or capability.

Adapters isolate provider semantics, credentials, retries, timeouts, error
mapping, and provider-specific identifiers, and translate provider state into
Rivercreek domain terms. Domain modules depend on an adapter's interface, not
on a vendor SDK directly (`docs/ARCHITECTURE.md` §32–§35).

No integrations exist yet. Providers are selected in their own tickets.
