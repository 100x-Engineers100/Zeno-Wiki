# Zeno Wiki — A Plug-and-Play Second Brain for AI

> A persistent, compounding knowledge base that travels with you — plug it into Claude, a voice AI agent, a Discord bot, or any project that needs a brain.

---

## What Is This?

Zeno Wiki is a **file-based second brain** built on the LLM Wiki Pattern. Instead of dumping documents into a RAG pipeline and re-deriving answers every time, Zeno compiles knowledge once into a structured, interlinked wiki of markdown files — then exposes that wiki as an MCP server that any AI can call.

The result: knowledge that **compounds**. Every new source makes every existing answer richer. Cross-references are pre-built. Synthesis already happened. You ask a question and the answer draws on everything you've ever learned — not just the top-k chunks that matched your query.

This repo contains two things:
1. **The Obsidian vault** — the knowledge base itself (`Zeno - 100x's Second Brain/`)
2. **The MCP server** — a Cloudflare Worker that exposes the wiki as tools any AI can use (`zeno-mcp-server/`)

---

## The Problem with RAG

Most AI knowledge pipelines work like this:

```
Question → Embed query → Find top-k chunks → Stuff into context → Answer
```

Every question starts from zero. The LLM re-discovers the same facts from raw documents on every call. Ask something that needs synthesis across five sources and it has to piece together fragments on the fly — and probably misses some.

**Zeno does something different.**

```
New source → LLM reads + synthesizes → Updates wiki pages → Knowledge persists

Question → LLM reads index → Reads relevant pages → Answers from compiled knowledge
```

Knowledge is compiled once. Contradictions are flagged when they're discovered. Cross-references are wired up. The wiki grows smarter with every source you add — not just bigger.

---

## The OPT Framework — Why This Exists

Zeno was built using the **OPT Framework** (Operating Model → Processes → Tasks) — a method for systematically identifying what to automate with AI before you build anything.

| Level | Definition | This Project |
|---|---|---|
| **Operating Model** | What is the mission? | Carry the full knowledge of a cohort, company, and philosophy — everywhere |
| **Processes** | What functions serve it? | Knowledge ingestion, synthesis, querying, maintenance |
| **Tasks** | What can be automated? | Summarizing sources, cross-referencing concepts, answering questions, building diagrams |

The operating model for Zeno: **build a knowledge base that contains everything — cohort notes, company philosophy, product decisions, frameworks — and make it available to any AI project without rebuilding it each time.**

The traditional approach would be a heavy RAG pipeline: embed everything, spin up a vector DB, write retrieval logic per project. Zeno replaces all of that with a growing wiki + one MCP server. Any AI that speaks MCP gets the whole brain — voice agent, Discord bot, coding assistant, customer support agent — plug and play.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Obsidian Vault                      │
│                                                      │
│  raw/              ← Immutable source documents      │
│  ├── courses/      ← Course notes, transcripts       │
│  ├── clippings/    ← Web articles (markdown)         │
│  └── assets/       ← Images                         │
│                                                      │
│  wiki/             ← LLM-maintained knowledge base   │
│  ├── index.md      ← Master catalog (read first)     │
│  ├── overview.md   ← Current state + thesis          │
│  ├── log.md        ← Append-only history             │
│  ├── sources/      ← One page per ingested source    │
│  ├── concepts/     ← Frameworks, ideas, techniques   │
│  ├── entities/     ← People, companies, tools        │
│  └── synthesis/    ← Cross-source analysis           │
│                                                      │
│  CLAUDE.md         ← The schema (LLM operating manual)│
│  templates/        ← Page templates for each type   │
└──────────────────────┬──────────────────────────────┘
                       │ sync.js pushes to KV
                       ▼
┌─────────────────────────────────────────────────────┐
│            Cloudflare Worker (MCP Server)            │
│                                                      │
│  KV Store: all wiki pages stored as key-value pairs  │
│  Durable Objects: one per MCP session (stateful)     │
│  OAuth: Google login gates access                    │
│                                                      │
│  Tools:                                              │
│  • get_index      → full wiki catalog                │
│  • get_overview   → current state + gaps             │
│  • list_pages     → filter by type                   │
│  • get_page       → fetch any page by key            │
│  • search_wiki    → full-text search                 │
│  • visualize      → render Mermaid diagrams in chat  │
└──────────────────────┬──────────────────────────────┘
                       │ MCP protocol
                       ▼
        ┌──────────────────────────────┐
        │  Any AI that speaks MCP      │
        │  Claude · Voice AI · Discord │
        │  Support agent · Cursor      │
        └──────────────────────────────┘
```

---

## How the Wiki Works

### The Three Layers

**Layer 1 — `raw/`** (you own this)
Original documents exactly as they arrived. Course transcripts, clipped articles, book notes. The LLM reads these but never modifies them. Truth lives here.

**Layer 2 — `wiki/`** (the LLM owns this)
Synthesized knowledge. Every source gets a summary page. Every idea gets a concept page. People, tools, companies get entity pages. Cross-source insights get synthesis pages. The LLM writes and maintains all of this.

**Layer 3 — `CLAUDE.md`** (the schema)
The operating manual for the LLM. Defines every page format, every naming convention, every operation. When you open a new Claude session, it reads this file and knows exactly how to behave — what folder structure to use, how to format pages, how to do an ingest vs. a query vs. a lint pass.

### The Three Operations

**Ingest** — add a new source:
```
"Ingest raw/courses/my-lecture.md. Follow the ingest workflow in CLAUDE.md."
```
Claude reads the source, creates a source summary page, creates or updates concept and entity pages, updates the index, appends to the log.

**Query** — ask anything:
```
"What is the ReAct pattern and how does it differ from a standard chatbot?"
```
Claude reads the index, fetches relevant pages, answers with citations. If the answer is valuable, say "file this as a synthesis page" and it persists.

**Lint** — health check:
```
"Run a lint pass on the wiki."
```
Claude scans for orphan pages, missing cross-references, contradictions between sources, and concepts mentioned but lacking their own page.

### How Knowledge Compounds

When you first start: a handful of source pages, a few concepts.

After 10 sources: every concept has `source_count: 3+`, multiple cross-references, synthesis pages comparing perspectives.

After 50 sources: asking "what do we know about RAG?" returns a fully-compiled answer drawing on 12 different sources, with contradictions already flagged, and a synthesis page already written.

That's the compounding effect. RAG doesn't do this. RAG re-derives it every time.

---

## The MCP Server

### What It Does

The MCP server exposes the wiki as six tools. Any MCP-compatible AI client can call them:

| Tool | What it returns |
|---|---|
| `get_index` | Full catalog of all wiki pages by category |
| `get_overview` | Current state of the wiki — what's covered, what's missing |
| `list_pages` | All pages of a given type (concepts / sources / entities / synthesis) |
| `get_page` | Full markdown of any page by key |
| `search_wiki` | Full-text search across all pages with excerpts |
| `visualize` | Renders a Mermaid diagram interactively in the chat |

### How to Add It to Claude

Once deployed, add the MCP server to Claude's config:

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "zeno-wiki": {
      "url": "https://your-worker.workers.dev/mcp"
    }
  }
}
```

**Claude Code** (`.claude/settings.json`):
```json
{
  "mcpServers": {
    "zeno-wiki": {
      "type": "url",
      "url": "https://your-worker.workers.dev/mcp"
    }
  }
}
```

Authentication is handled via Google OAuth — Claude will prompt you to log in on first use.

### Plug It Into Any Project

The same MCP URL works anywhere that supports MCP:
- A voice AI agent (Bolna, Vapi, LiveKit) that needs to answer cohort questions
- A Discord support bot that needs company knowledge
- A Cursor / Claude Code session that needs project context
- An internal tool that needs company philosophy baked in

One wiki. One server. Infinite connections.

---

## Cloudflare Deployment

The MCP server runs as a **Cloudflare Worker** with:
- **KV Namespace** — stores all wiki pages as key-value pairs. Keys mirror the file paths (`concepts/mcp-model-context-protocol`, `sources/karpathy-llm-wiki-pattern`, etc.)
- **Durable Objects** — one instance per MCP session, holds session state
- **OAuth Provider** — Google login gates all `/mcp` requests. Tokens last 24h, refresh tokens 30 days
- **Rate Limiter** — 30 requests per 60 seconds per IP

**Prerequisites:** Node.js 18+, a Cloudflare account (free tier works), a Google Cloud project with OAuth credentials.

**Deploy:**
```bash
cd zeno-mcp-server
npm install

# Create KV namespaces on Cloudflare and update wrangler.jsonc with the IDs
wrangler kv namespace create ZENO_WIKI
wrangler kv namespace create OAUTH_KV

# Set secrets
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
wrangler secret put COOKIE_ENCRYPTION_KEY    # any random 32-char string
wrangler secret put POSTHOG_API_KEY          # optional — for analytics

# Deploy the worker
npm run deploy

# Push your wiki files to KV
npm run sync
```

**Local dev:**
```bash
cp .dev.vars.example .dev.vars   # fill in your secrets
npm run dev                       # starts wrangler dev server
```

The `sync.js` script reads all files from `wiki/` and pushes them to Cloudflare KV. Run it after every ingest session to keep the live server in sync.

---

## Obsidian Setup

The wiki lives in Obsidian — a markdown-based knowledge base app. You can use any text editor, but Obsidian's graph view shows wiki health: highly-connected pages are your most valuable knowledge hubs; isolated pages are orphans to fix.

**Install Obsidian:** [obsidian.md](https://obsidian.md) — open the `Zeno - 100x's Second Brain/` folder as a vault.

**Recommended plugins:**

| Plugin | Purpose |
|---|---|
| Obsidian Web Clipper | Convert web articles to markdown for `raw/clippings/` |
| Dataview | Query wiki frontmatter — list concepts by source count |
| Graph Analysis | Better graph view for wiki topology |

**Adding web articles:** Install the Obsidian Web Clipper browser extension. Clip any article and it saves as markdown directly into `raw/clippings/`. Then tell Claude to ingest it.

**Image downloads:** Obsidian Settings → Files and links → Set attachment folder path to `raw/assets/`.

---

## How to Build Your Own

Fork this repo and replace the knowledge base with your own domain. The architecture is fully domain-agnostic.

### Step 1 — Define your operating model

What knowledge do you want to carry everywhere? Examples:
- A startup's product decisions, philosophy, and customer insights
- A research team's paper summaries and experiment results  
- A course cohort's notes and frameworks
- A personal library of books, articles, and ideas

### Step 2 — Update `CLAUDE.md`

This is the only file that needs significant changes. Update:
- **Section 1** — the purpose and domain description
- **Section 8** — current state (your starting point)
- **Section 9** — source ingestion table (your source types)

Everything else — three-layer structure, page formats, operations — stays the same.

### Step 3 — Add your first sources

Put raw files into the right folder:
```
raw/courses/     ← lecture notes, transcripts
raw/clippings/   ← articles clipped with Obsidian Web Clipper
raw/books/       ← book chapter notes (create as needed)
raw/notes/       ← meeting notes, decisions
```

Open a Claude Code session:
```
Read CLAUDE.md first. Then ingest raw/[your-file]. Follow the ingest workflow.
```

### Step 4 — Deploy the MCP server

Follow the Cloudflare deployment steps above. The only code change you may need: update the server name in `src/index.ts` line `new McpServer({ name: "Zeno Wiki" ... })`.

### Step 5 — Sync and connect

```bash
npm run sync
```

Add the MCP URL to Claude, Cursor, your voice agent, or whatever AI you're building.

---

## Use the Live Server

The Zeno Wiki MCP server is publicly accessible. Add it to any MCP-compatible AI client and start querying the knowledge base directly — no setup required.

**MCP Server URL:** `https://zeno-wiki-mcp.cohort-c62.workers.dev/mcp`

Authentication is Google OAuth — you'll be prompted to log in with your Google account on first use.

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "zeno-wiki": {
      "url": "https://zeno-wiki-mcp.cohort-c62.workers.dev/mcp"
    }
  }
}
```

**Claude Code** (`.claude/settings.json`):
```json
{
  "mcpServers": {
    "zeno-wiki": {
      "type": "url",
      "url": "https://zeno-wiki-mcp.cohort-c62.workers.dev/mcp"
    }
  }
}
```

Once connected, Claude can call `get_index`, `search_wiki`, `get_page`, and `visualize` directly in your conversation — no copy-paste, no file uploads.

---

## How to Contribute

There are three ways to contribute to Zeno Wiki:

### 1. Add a Concept or Wiki Page

If you know something that belongs in this knowledge base — a framework, a technique, a tool, a case study — you can contribute it directly as a wiki page.

1. Fork the repo
2. Write your page following the templates in `Zeno - 100x's Second Brain/templates/`
   - Concept → `wiki/concepts/your-concept-name.md`
   - Entity (tool/person/company) → `wiki/entities/your-entity-name.md`
   - Synthesis (cross-concept analysis) → `wiki/synthesis/your-topic.md`
3. Add an entry for it in `wiki/index.md`
4. Submit a PR — describe what the concept is and why it belongs here

Good things to add:
- AI/ML frameworks and techniques not yet covered
- Production architecture patterns
- Tool comparisons and decision frameworks
- Case studies from real deployments

### 2. Improve the MCP Server

The server is `zeno-mcp-server/src/index.ts`. Good areas:
- New tools (e.g., `create_page` for community write access)
- Semantic/embedding-based search to replace full-text
- Support for other OAuth providers
- Performance or caching improvements

```bash
cd zeno-mcp-server
npm install
npm run dev     # local wrangler dev server
```

Open a PR with your change and a short description of why it improves the server.

### 3. Improve the Schema

`CLAUDE.md` is the operating contract for the LLM — it defines page formats, naming conventions, and all three operations (ingest/query/lint). If you find a better format that produces cleaner wiki output, open a PR with the change and a before/after example.

### Reporting Issues

Open a GitHub issue with:
- Which tool or operation the issue is with
- What you expected vs. what happened

---

## Directory Structure

```
100x Wiki/
│
├── README.md                           ← this file
│
├── Zeno - 100x's Second Brain/         ← the Obsidian vault
│   ├── CLAUDE.md                       ← LLM operating schema (most important file)
│   ├── raw/                            ← immutable source documents
│   │   ├── courses/                    ← course notes, transcripts
│   │   ├── clippings/                  ← web articles
│   │   └── assets/                     ← images
│   ├── wiki/                           ← LLM-maintained knowledge base
│   │   ├── index.md                    ← master content catalog
│   │   ├── overview.md                 ← current state + thesis
│   │   ├── log.md                      ← append-only history
│   │   ├── sources/                    ← one page per ingested source
│   │   ├── concepts/                   ← frameworks, ideas, techniques
│   │   ├── entities/                   ← people, companies, tools
│   │   └── synthesis/                  ← cross-source analysis
│   └── templates/                      ← page templates (do not edit)
│
└── zeno-mcp-server/                    ← Cloudflare Worker MCP server
    ├── src/index.ts                    ← main worker (tools, OAuth, rate limiting)
    ├── sync.js                         ← pushes wiki files to Cloudflare KV
    ├── wrangler.jsonc                  ← Cloudflare deployment config
    └── package.json
```

---

## Quick Reference

| Task | What to do |
|---|---|
| Orient Claude to vault | `"Read CLAUDE.md, wiki/overview.md, and wiki/log.md"` |
| Add a new source | `"Ingest raw/[path]. Follow CLAUDE.md ingest workflow."` |
| Ask a question | Just ask. Claude reads the index first. |
| Save a valuable answer | `"File this as a synthesis page."` |
| Health check | `"Run a lint pass on the wiki."` |
| Push wiki to Cloudflare | `cd zeno-mcp-server && npm run sync` |
| Deploy server changes | `cd zeno-mcp-server && npm run deploy` |
| Local dev | `cd zeno-mcp-server && npm run dev` |

---

## Credits

Built by [100x Engineers](https://100xengineers.com) — open-sourced for the AI community.
