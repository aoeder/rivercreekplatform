# Database

Database infrastructure — the persistence client, schema, and migrations — will
live here once persistence is introduced (RC-002 — Database Foundation).

PostgreSQL is the intended system of record. The ORM/query layer has not been
selected yet (`docs/ARCHITECTURE.md` §6), and no schema exists. The canonical
conceptual model is `docs/DATA_MODEL.md`.

Domain modules own their persistence access. Components and route files must
not query the database directly for economically meaningful operations.
