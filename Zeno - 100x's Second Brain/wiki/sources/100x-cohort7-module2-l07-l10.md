---
title: "100x Engineers C7 Module 2 — L07–L10: Databases, Supabase, MVP Build & Deploy"
type: source
source_type: course_notes
author: "Siddhant (100x Engineers)"
date: 2026-06-06
raw_path: raw/courses/
tags: [database, supabase, postgresql, sql, domain-modeling, mvp, deploy, fastapi, eval, 100x-cohort7]
---

## Summary

L07–L10 of Module 2 completes the full-stack LLM development sequence by adding the persistent data layer and deploying a working MVP. The lectures move from conceptual (why databases exist) through practical (Supabase setup + FastAPI integration) to applied (live MVP sprint from hypothesis to deployed app in ~3 hours).

The central teaching arc: every app built before L07 had amnesia — state lived in RAM and died on browser close. L07 establishes why that fails at scale. L08 shows how to connect Supabase (managed Postgres) to the FastAPI backend. L10 demonstrates a complete live build: function-first, eval-first, deploy on Render, Gradio frontend on HF Spaces.

L09 was not recorded/released — it is absent from the curriculum.

## Key Ideas

### L07 — Introduction to Databases and Domain Modeling (2026-06-06)

**The Amnesia Problem**
Every app built without a database has amnesia — data lives in RAM, disappears when browser/tab closes. As apps scale, this fails: multiple users can't share in-memory state; no persistence across sessions; no audit trail.

**Data Storage Hierarchy**
- **In-memory (RAM)** — fastest, volatile; dies on process close
- **File (CSV/text)** — cheap, persistent; no backup, no atomicity, no security, no querying
- **Database** — file system with a guard; enforces ACID; handles concurrent access; secure by default

**ACID — the database guarantee**
- **Atomicity** — all or nothing; no half-written transactions
- **Consistency** — data always meets schema rules
- **Isolation** — concurrent transactions don't interfere
- **Durability** — committed data survives crashes

**Domain Modeling from First Principles**
Three building blocks: **entities** (nouns = things to store), **attributes** (columns = qualities of the thing), **relationships** (how entities link).

CRUD test for entity vs attribute: *Can you independently Create, Read, Update, Delete it in the app?*
- If yes → entity (its own table)
- If no → attribute (column in parent table)

Applied to chat app:
| Thing | Entity or Attribute? | Reason |
|---|---|---|
| User | Entity | CRUD independently |
| Conversation | Entity | CRUD independently |
| Message | Entity | CRUD independently |
| Email | Attribute | Belongs to User, not standalone |
| Plan | Entity | Independently manageable |

**Primary Key vs Foreign Key**
- **Primary Key (PK)** — auto-generated unique ID per row; `id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY`
- **Foreign Key (FK)** — column in "many" table pointing to PK in "one" table; e.g., `conversation_id` in messages references `conversations.id`

**One-to-many relationship (most common)**
One conversation → many messages. One user → many conversations.

**Google Sheets analogy**: each entity = one tab; columns = attributes; rows = sample records; foreign keys = "VLOOKUP between tabs"

### L08 — Connecting the Dots: Databases + Supabase (2026-06-12)

**Structured vs Unstructured Database Decision**
Use **relational (Supabase/Postgres)** when:
- Entities, attributes, and relationships are well-defined
- More read than write
- Need joins across tables

Use **NoSQL/key-value** when:
- Write-heavy, read-light (live chat, Zoom sessions, sensor streams)
- Schema is still evolving
- No relationships needed

**Read/Write Ratio as first decision variable**: sketch expected reads/writes before choosing DB.

**Supabase**
Managed Postgres with: built-in ORM/REST bridge, Table Editor GUI (no raw SQL needed for setup), Auth module, free tier (~50K MAU), open source / self-hostable. Underlying tech is identical to what ChatGPT uses at 800M+ user scale.

**SQL as interface layer**
SQL = the language between FastAPI (Python) and Supabase (Postgres). CRUD maps directly:
| Operation | SQL | FastAPI method |
|---|---|---|
| Create | INSERT | POST |
| Read | SELECT | GET |
| Update | UPDATE | PUT |
| Delete | DELETE | DELETE |

`.execute()` in the Supabase Python client translates Python dict → SQL statement. No raw SQL needed in code.

**Connection pattern**
```python
from supabase import create_client
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
```
Keys stored in `.env`, loaded via `python-dotenv`. Service role key bypasses RLS — server-only, never expose to frontend.

**Table structure (chat app)**
- `conversations(id PK, user_id FK, created_at, title)`
- `messages(id PK, conversation_id FK, role, content, created_at)`

RLS mentioned but deferred — covered separately.

**Groq Cloud** (introduced here)
Fastest LLM inference; open-source models (Llama 3.1); free tier: 30 req/min, 14,400 req/day. Used as the inference provider for the MVP.

### L10 — Live MVP Build & Deploy (2026-06-19)

**The Live MVP Sprint**
Complete workflow from idea → deployed app in ~2.5 hours of live coding. The playbook:
1. Define hypothesis and identify the "Arav" persona (user with a real workflow pain)
2. Write golden input-output pair before any code
3. Build `diagnose()` function (core business logic only)
4. Write eval prompt to codify "what good looks like"
5. Wire to FastAPI POST endpoint
6. Deploy backend on Render
7. Build Gradio frontend on HF Spaces
8. Connect frontend → backend URL

**Function-first approach**
Start with the core function, not the UI, not the API, not the database. Validate the input-output works manually before building anything else. "I can just take this function, paste a workflow description, and manually send the plan to Arav — the input-output is manual but the diagnosis is automated."

**Golden Input-Output Pairs**
Before coding: define the ideal input (workflow description) and ideal output (structured plan) for the core function. These become the ground truth for both the eval prompt and test cases.

Example:
- Input: *"Every morning I download a CSV sales report, remove duplicates, calculate totals per region, paste into spreadsheet, email to manager — takes 1 hour"*
- Output: workflow summary + pain points + automation opportunities + recommended first automation + suggested tools + step-by-step build plan

**Spec-Driven Development with CLAUDE.md**
Create CLAUDE.md with plan-review mode: Claude documents its plan before implementing. Prevents assumption drift. Key lesson: "Claude once deployed to AWS instead of Render because nobody reviewed the plan."

**Multi-Model Strategy**
- Smart model (Claude Opus) for prompt writing and planning — smarter, scarcer, expensive
- Cheaper model (Llama 3.1 8B via Groq) for production inference — follows the plan, fast, cheap
- Analogy: senior engineer writes the strategy, junior executes; keep senior bandwidth for planning

**LLM as Judge (eval function)**
After `diagnose()` returns a plan, an eval function uses another LLM (via a rubric prompt) to score the output against 15 criteria. The rubric was generated by Opus; Llama follows it at inference. This is the deterministic/probabilistic bridge — golden I/O pairs = deterministic test cases; eval prompt = probabilistic quality check.

**Render Deployment (FastAPI backend)**
1. Push to GitHub (public repo)
2. Create Render Web Service, connect GitHub repo
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add env vars (GROQ_API_KEY) in Render dashboard — never push `.env`
6. Auto-deploy on every commit to main branch
7. Free tier: cold start after inactivity (~30-40s spin-up)

**.gitignore pattern**: always add `.env` to `.gitignore` before first push. `pip freeze > requirements.txt` before deploy.

**Gradio Frontend (HF Spaces)**
- Create new Space on HF Spaces with Gradio template
- `app.py` reads `BACKEND_URL` environment variable, falls back to localhost
- Set `BACKEND_URL` = Render deployed URL in Space secrets
- Any workflow description → POST to `/diagnose` → formatted plan returned

**Authentication (Supabase Auth)**
- Enable email provider in Supabase Auth → Sign-in providers
- Turn off "Confirm email" toggle for development (email limit on free plan)
- `supabase.auth` manages user table; PII masked — developer cannot see passwords
- ER diagram extends: User → Conversations → Messages (auth user ID ties to conversation)
- Alternatives: Clerk (managed auth with prebuilt UI components)

**Unit Economics / Napkin Math**
- Groq Llama 3.1: $0.005 per 20M tokens → ~$0 at cohort scale (250 users × 451 tokens/plan)
- Supabase free tier: 50K MAU — well above C7 cohort size
- Groq free tier limit: 30 req/min → real bottleneck; cap users at 10 req/min each
- Token counting: TikToken library (OpenAI) or model-specific tokenizer for cost estimation
- Decision: rate limit per authenticated user before hitting paid tier

**Deployment Decision: Render vs Serverless**
Render chosen over AWS Lambda / Vercel Functions because:
- Serverless functions have timeout limits (~15-30s); LLM calls can take longer
- Need full machine control for running tests
- Free tier, one instance to control completely
- Self-contained: no cold-start concerns beyond free tier limitation

**Hackathon Announced (C7 Sprint 1)**
- 24-hour individual hackathon: 10PM June 19 IST → 10PM June 20 IST
- Three tracks: (A) Concept Check, (B) Eval Co-pilot, (C) AI Bottleneck Diagnostic
- Minimum: validate with 2 real users from 100x cohort (any cohort)
- Mandatory: hand-drawn domain model + system design diagrams
- Check-ins every 6 hours on Discord

## Notable Quotes / Moments

> "Your app has amnesia. Every time you close the tab, everything you've built in memory just disappears." — L07 framing the amnesia problem

> "A database is just a file system with a guard. The guard enforces ACID." — L07 on why databases beat flat files

> "Can you independently Create, Read, Update, Delete this thing in your app? If yes, it's an entity. If no, it's an attribute." — CRUD test for domain modeling

> "SQL is just the language — like English — that your Python code and your Supabase database use to talk to each other." — L08

> "Don't go beyond this part and start building everything else. Start with the core function. Solve the problem first." — L10 function-first principle

> "What makes this output good? Domain knowledge is more important than the model or the code — because only a domain expert can tell whether the eval system is working." — L10 on evals

> "Claude once deployed to AWS instead of Render because nobody reviewed the plan. That's why you use plan-review mode." — L10 on CLAUDE.md

## Concepts Introduced
[[database-fundamentals]], [[domain-modeling]], [[supabase]], [[eval-first-design]], [[mvp-build-cycle]], [[deterministic-vs-generative-separation]], [[llm-as-judge]], [[fastapi-patterns]]

## Entities Mentioned
[[siddhant]], [[100x-engineers]], [[aeos-labs]]

## Contradictions / Tensions
> [!warning] Contradiction: L07/L08 recommend Supabase (relational) as the default starting point, but the underlying principle is "relational when relationships are clear; NoSQL when write-heavy." Teams building real-time features (live chat, presence) should evaluate Redis or Firestore instead — Supabase is not the universal answer, it's the right answer for the specific chat-app domain model taught here.

## Open Questions
- When does Supabase RLS need to be set up vs delegated to application logic?
- How do you structure the eval prompt iteration cycle without losing the original eval quality?
- What is the recommended token cap per user per request for cost-efficient free-tier apps?
- How does Render's cold start problem affect user experience in real MVP launches?
