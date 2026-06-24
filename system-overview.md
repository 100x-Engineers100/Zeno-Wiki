# 100x Second Brain Systems — Overview

Two AI systems built on the same architecture: a compounding knowledge base exposed as an MCP server. One for internal knowledge, one for sales execution.

---

## The Problem Both Systems Solve

**Traditional approach:** Every AI project rebuilds context from scratch. Dump documents into a RAG pipeline, re-derive answers every query, nothing compounds. For sales: reps prep calls manually, give generic responses, forget alumni stories, miss domain angles.

**The shift:** Compile knowledge once into a structured wiki. Expose it as an MCP server. Any AI — Claude, voice agent, Discord bot, sales rep's Claude — plugs in and gets the full brain instantly.

---

## OPT Framework Applied

| Level | Zeno Wiki | Sales Wiki |
|---|---|---|
| **Operating Model** | Carry the full knowledge of 100x cohort and company — available to any AI project, anywhere | Equip every sales rep with precise domain knowledge and their own selling personality |
| **Processes** | Knowledge ingestion → synthesis → querying → maintenance | Call preparation → objection handling → follow-up drafting |
| **Tasks (automated)** | Ingest source, update wiki pages, answer cross-source queries, render diagrams | Get call brief, handle objections in 3 modes, draft WhatsApp follow-up, persona interview |

---

## System 1 — Zeno Wiki

**What it is:** Persistent knowledge base of 100x cohort content — all 3 modules, frameworks, concepts, synthesis — served as an MCP server.

### Input → Processing → Output

```
Input:  Raw source (lecture notes, articles, clippings)
          ↓
Processing: LLM reads source → creates wiki page → cross-references
            existing concepts → updates index → flags contradictions
            Knowledge compounds: 10 sources → richer than 10 isolated docs
          ↓
Output: Structured wiki (sources / concepts / entities / synthesis)
        + MCP server with 6 tools Claude calls directly
```

### Tools
`get_index` · `get_page` · `search_wiki` · `get_overview` · `list_pages` · `visualize`

### Use Cases
- Claude Code session needs full cohort context → connects MCP, has everything
- Voice AI agent needs to answer AI education questions → same MCP
- Discord support bot needs company knowledge → same MCP
- New AI project needs a brain without rebuilding RAG → same MCP

### Impact

| Metric | How |
|---|---|
| **Time saving** | Context that took days to compile is available in seconds to any Claude session, voice agent, or AI tool — no research phase per project. |
| **Reduced development cycle** | Any new app or tool built on top of 100x knowledge skips the entire RAG setup — no vector DB, no embedding pipeline, no per-project knowledge work. Plug in the MCP, full brain is available. |

---

## System 2 — Sales Wiki

**What it is:** Sales-specific knowledge base (curriculum, objection playbooks, 70+ alumni success stories) + 3 sales-action tools + a persona skill that personalizes Claude to each rep.

### Input → Processing → Output

```
Input:  Prospect domain + role + years of experience
          ↓
Processing: Wiki lookup (relevant modules, success stories, objection pages)
            + Live web search (current AI disruption stat in that domain)
            + Persona layer (adapts response to how this rep sells)
          ↓
Output: Structured call brief — hook angle, exact lecture names,
        likely objections, closest alumni story, FOMO angle
        OR 3-mode objection response (Warm / Pressure / Straightforward)
        OR one personalized WhatsApp follow-up message
```

### Tools
`get_call_brief` · `get_objection_response` · `draft_followup` · `search_wiki` · `get_page` · `get_index` · `visualize`

### The Persona Skill

Each rep does an 8-question interview once. Claude generates a persona skill file — that rep's strengths, weak domains, mid-call needs, conversion blockers. Add persona skill + Sales Wiki MCP to Claude → every response adapts to how that rep actually sells. Scales to large teams without one-on-one training.

### Use Cases
- Rep preparing for a call with a finance CTO → call brief in seconds, grounded in real curriculum + live stats
- Rep mid-call facing "too expensive" objection → 3 ready-to-say responses, pick the mode
- Rep after a call → one WhatsApp message, specific, grounded, not generic
- New rep onboards → runs persona interview, gets best-quality pitches from day one — no ramp-up period
- Each lead gets personalized content tied to their domain, role, and context → increases credibility of the cohort

### Impact

| Metric | How |
|---|---|
| **Team efficiency** | Every rep operates with the same depth of knowledge as the best rep on the team. No weak calls from underprepared reps. |
| **New hire ramp-up** | New rep runs persona interview once → gets domain-aware, personalized pitches immediately. Training time to first quality call drops significantly. |
| **Time saving** | Call prep: 30+ min → under 2 min. Follow-up drafting: 15-20 min → instant. Research per lead: eliminated. |
| **Indirect revenue effect** | Better-prepared reps, domain-specific pitches, grounded objection handling, personalized follow-ups → higher conversion rate across the team. |

---

## How It's Built — The Full Stack

Both systems run on identical infrastructure. Here's every layer and what it does:

### Obsidian — The Knowledge Editor
Obsidian is a markdown-based note-taking app used as the editor for the knowledge base. Every wiki page is just a markdown file. The folder opens as an Obsidian vault — giving a graph view of how pages connect, which pages are hubs (highly referenced), and which are orphans (need fixing). No proprietary format, no lock-in. Files are plain text, work with any tool.

Used specifically for: editing wiki pages, viewing the knowledge graph, clipping web articles directly into `raw/clippings/` via the Web Clipper browser extension.

### CLAUDE.md — The Operating Schema
The single most important file in each vault. It is the LLM's job description — defines the folder structure, page formats, naming conventions, and exact steps for every operation (ingest a source, answer a query, run a health check). When Claude Code opens the vault, it reads this file first. Without it, Claude is a generic chatbot. With it, Claude is a disciplined wiki maintainer.

### Claude Code — The Knowledge Worker
Claude Code runs inside the vault folder and does all the knowledge work: reads raw sources, writes wiki pages, cross-references concepts, updates the index, flags contradictions. The human adds sources and asks questions. Claude does everything else.

### sync.js — The Bridge
A Node.js script that walks the `wiki/` folder, reads every markdown file, and pushes them to Cloudflare KV as key-value pairs. Run after every ingest session. This is what keeps the live MCP server in sync with the local vault.

### Cloudflare Workers + KV + Durable Objects — The Server
The MCP server runs as a Cloudflare Worker (serverless, zero cold start). Wiki pages live in Cloudflare KV (key-value store). Durable Objects give each MCP session its own stateful instance — one per connected Claude session. No traditional server, no database to manage.

### Google OAuth — Identity Layer
Every user authenticates with Google before accessing any tool. The server issues a 24-hour access token tied to that Google account (name, email, permanent user ID). Every tool call carries this identity. No anonymous usage. Tokens expire and refresh automatically.

### PostHog — Usage Analytics
Every tool call fires a PostHog event: which tool, which user (by email + Google ID), which domain was passed, how long it took, success or fail. Gives real-time visibility into adoption, knowledge gaps (what people search for most), and which reps are using the system vs. not.

### MCP Protocol — The Connector
MCP (Model Context Protocol) is the standard that lets Claude call external tools mid-conversation. Both servers expose their tools over MCP. Any MCP-compatible client — Claude Desktop, Claude Code, voice AI agents, Discord bots — connects with one URL and gets the full brain.

---

## MCP Endpoints

| System | URL |
|---|---|
| Zeno Wiki | `https://zeno-wiki-mcp.cohort-c62.workers.dev/mcp` |
| Sales Wiki | `https://sales-wiki-mcp.cohort-c62.workers.dev/mcp` |
