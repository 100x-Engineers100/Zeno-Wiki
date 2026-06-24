---
title: "Database Fundamentals"
type: concept
tags: [database, sql, acid, postgresql, supabase, 100x-cohort7]
source_count: 2
---

## Definition
A database is a file system with a guard — persistent, structured storage that enforces ACID guarantees, handles concurrent access, and provides secure querying through a standard interface (SQL). Databases solve the amnesia problem that all in-memory apps face.

## Why It Matters
Every app that stores state only in RAM has amnesia: data disappears when the browser tab closes, multiple users can't share state, and there's no audit trail. The moment an app needs to remember anything across sessions or users, a database is required.

## How It Works

### The Storage Hierarchy
| Layer | Speed | Persistence | Use case |
|---|---|---|---|
| In-memory (RAM) | Fastest | Volatile — dies on close | Active session state, caches |
| File (CSV, text) | Medium | Persistent | Simple exports, no querying |
| Database | Managed | Durable, ACID | Production app data |

Files are cheap but broken as a production store: no concurrent access, no atomicity, no security, no queryability. A database adds a guard layer over the same underlying file system.

### ACID — The Database Guarantee
| Principle | Meaning |
|---|---|
| **Atomicity** | All-or-nothing; no half-written transactions |
| **Consistency** | Data always satisfies schema rules |
| **Isolation** | Concurrent transactions don't interfere with each other |
| **Durability** | Committed data survives crashes and restarts |

ACID is what makes databases better than flat files. Without it: a payment that debits one account but fails before crediting another leaves the system in a broken state.

### Relational vs Non-Relational (NoSQL)

**Choose relational (PostgreSQL, Supabase) when:**
- Entities, attributes, and relationships are known up front
- More reads than writes
- Need to join across tables
- Compliance or audit requirements

**Choose NoSQL / key-value (Redis, Firestore, DynamoDB) when:**
- Write-heavy, read-light (live chat, sensor streams, Zoom session state)
- Schema is still evolving
- Need horizontal scaling before relationships are defined

**Decision heuristic**: sketch expected read/write ratio first. If reads dominate → relational. If writes dominate → NoSQL.

### SQL as Interface
SQL (Structured Query Language) is the language between application code and a relational database. CRUD maps directly:

| App operation | SQL statement |
|---|---|
| Create | `INSERT INTO table (...) VALUES (...)` |
| Read | `SELECT ... FROM table WHERE ...` |
| Update | `UPDATE table SET ... WHERE ...` |
| Delete | `DELETE FROM table WHERE ...` |

Modern ORMs (Supabase Python client, SQLAlchemy) translate Python method calls to SQL. The `.execute()` method is the bridge between Python dict and SQL statement.

### Read/Write Ratio Analysis
Before selecting a database, estimate:
- How many reads per second at expected scale?
- How many writes per second?
- What is the read:write ratio?

High read ratio → optimize for query performance → relational + indexes + caching.
High write ratio → optimize for write throughput → NoSQL or write-optimized stores.

## Key Variants / Extensions
- **Supabase** — managed PostgreSQL with REST API, GUI table editor, Auth, and free tier; see [[supabase]]
- **PostgreSQL** — industry-standard relational DB; same underlying tech as Supabase; used by ChatGPT at 800M+ user scale
- **Redis** — in-memory key-value store; used for caching, rate limiting, real-time pub/sub
- **Row-Level Security (RLS)** — policy layer in Postgres; users only access their own rows; `anon key` enforces RLS, `service_role key` bypasses it

## Examples
**Chat app domain model (100x C7 case study):**
- `conversations(id PK, user_id FK, created_at, title)` → one per session
- `messages(id PK, conversation_id FK, role, content, created_at)` → many per conversation
- ACID ensures: if a message write fails halfway, it either fully commits or fully rolls back

**Live Zoom session state:**
- Use case: track who's in a call, their cursor position, audio state
- Extreme write-heavy (update every second per user), minimal reads
- → NoSQL / Redis, not Postgres

## Connections
Related concepts: [[domain-modeling]], [[supabase]], [[fastapi-patterns]], [[deterministic-vs-generative-separation]]
Introduced by: [[100x-cohort7-module2-l07-l10]], [[100x-cohort7-module2-llm]]

## Open Questions / Unknowns
- At what scale does Supabase free tier become a constraint (storage, API requests, connections)?
- When should connection pooling (PgBouncer) be added to a Supabase project?
- How does vector storage (pgvector) fit into the relational vs NoSQL decision for RAG apps?
