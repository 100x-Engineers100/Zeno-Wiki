---
title: "Supabase"
type: entity
entity_type: tool
tags: [database, postgresql, auth, supabase, backend, 100x-cohort7]
---

## Overview
Supabase is an open-source Firebase alternative built on PostgreSQL. It provides a managed relational database with a REST API, GUI table editor, built-in authentication, and a free tier supporting up to 50,000 monthly active users. Used in 100x Engineers C7 Module 2 as the default database and auth layer for LLM app backends.

The underlying database is identical PostgreSQL technology used by ChatGPT at 800M+ user scale — Supabase adds a managed wrapper with developer ergonomics.

## Key Contributions / Role

### Database Layer
- Managed PostgreSQL — no server provisioning needed
- Table Editor GUI — create tables, add columns, set foreign keys without raw SQL
- Supabase Python client: `.from_('table').select('*').execute()` → translates Python to SQL
- URL + service role key = connection credentials (stored in `.env`, never in code)

### Authentication
- Built-in user management (email, Google, Apple, Discord, and many more providers)
- Auth table auto-managed: UID, display name, email, phone — PII is masked, even from developers
- Email provider: turn off "Confirm email" toggle during development (free plan has email send limit)
- Auth user ID becomes the FK root for user-scoped data: `user_id → conversations → messages`

### Row-Level Security (RLS)
- Policy layer on top of the data model; users only access their own rows
- `anon key` — public key, RLS enforced (safe for client-side)
- `service_role key` — bypasses RLS, server-only, **never expose to frontend**

### Free Tier Limits (as of 2026)
- ~50,000 monthly active users
- 500MB database storage
- Authentication included
- REST API included

### Self-Hosting
Supabase is open source — can be self-hosted on any cloud if free tier constraints become an issue.

## Connections
Related entities: [[100x-engineers]], [[siddhant]]
Related concepts: [[database-fundamentals]], [[domain-modeling]], [[fastapi-patterns]], [[pii-handling]]
Appears in sources: [[100x-cohort7-module2-l07-l10]], [[100x-cohort7-module2-llm]], [[production-genai-stack]]

## Notes
- Alternatives for auth: Clerk (managed auth with prebuilt UI components, handles compliance)
- For write-heavy workloads (live chat, real-time presence): use Redis or Firestore instead — Supabase is read-optimized
- `pip freeze > requirements.txt` before Render deploy — Render needs this to install dependencies
- Cold start on Render free tier (~30-40s) is the main UX issue; Supabase itself has no cold start
