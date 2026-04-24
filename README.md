# Zeno — 100x Engineers Second Brain

A persistent, compounding knowledge base for the 100x Engineers Cohort 7 AI program, served as an MCP (Model Context Protocol) server so any Claude-powered AI can query it directly.

---

## What this is

Two things in one repo:

| Component | What it does |
|---|---|
| `Zeno - 100x's Second Brain/` | Obsidian-style wiki — ~60+ structured knowledge pages covering Diffusion, Full-Stack LLM, and AI Agents |
| `zeno-mcp-server/` | Cloudflare Worker that exposes the wiki via MCP so Claude can query it in real-time |

---

## The Wiki

Covers all 3 modules of 100x Engineers Cohort 7:

- **Module 1 — Diffusion** (14 lectures): ComfyUI, SDXL, FLUX, LoRA training, ControlNet, IP-Adapters, video generation, Replicate deployment
- **Module 2 — Full Stack LLM** (17 lectures): FastAPI, Supabase, RAG (3 levels), tool calling, MCP, memory, production stack (Next.js + FastAPI + Supabase + Pinecone + Redis)
- **Module 3 — AI Agents** (8 lectures): Agentic loop, ReAct, 6 agentic patterns, guardrails, PII handling, multi-agent systems, production best practices

Plus cross-module synthesis: the PPT Framework, OPT Framework, LLM Decision Tree, hallucination formula, agent vs workflow economics, and production failure analysis (Devin + Air Canada case studies).

Wiki page types:
- `wiki/sources/` — raw lecture summaries
- `wiki/concepts/` — deep-dive concept pages
- `wiki/entities/` — tools and frameworks (LangChain, CrewAI, LangGraph, Lovable, etc.)
- `wiki/synthesis/` — cross-module analysis and decision frameworks

---

## The MCP Server

Built on Cloudflare Workers with Durable Objects. Exposes 6 tools:

| Tool | What it does |
|---|---|
| `get_index` | Returns full wiki catalog |
| `get_overview` | Returns current knowledge domains and gaps |
| `list_pages` | Lists pages, filterable by type |
| `get_page` | Fetches full markdown for any page |
| `search_wiki` | Full-text search across all pages |
| `visualize` | Renders interactive Mermaid diagrams in chat |

### Auth
Google OAuth. Users authenticate via Google — the server issues a 24-hour access token (30-day refresh).

### Security
- Prompt injection sanitization on all wiki content
- Path traversal guard on `get_page`
- Body size limit (1MB)
- IP rate limiting on `/mcp`
- Security headers on every response (`X-Content-Type-Options`, `X-Frame-Options`, `CSP`)

### Analytics
PostHog tracking on every tool call — event name, duration, success/fail, user identity.

---

## Stack

- **Runtime**: Cloudflare Workers + Durable Objects
- **MCP SDK**: `@modelcontextprotocol/sdk`
- **Auth**: `@cloudflare/workers-oauth-provider` (Google OAuth 2.0)
- **Storage**: Cloudflare KV (wiki pages)
- **Rate limiting**: Cloudflare Rate Limiter
- **Analytics**: PostHog HTTP API
- **Diagrams**: Mermaid.js (rendered in iframe-safe HTML)
- **Language**: TypeScript

---

## Setup

```bash
cd zeno-mcp-server
npm install
```

Copy `.dev.vars.example` to `.dev.vars` and fill in:

```
POSTHOG_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

Run locally:
```bash
npx wrangler dev
```

Deploy:
```bash
npx wrangler deploy
```

Sync wiki pages to KV:
```bash
node sync.js
```

---

## Knowledge Source

All wiki content is synthesized from three primary documents:
- `Data_Doc_main.txt` — master curriculum (~9,760 lines across all 3 modules)
- `Six Easy Pieces for Full-Stack LLM Applications` — philosophical spine of Module 2
- `Connecting the LLM Dots with First Principles` — the LLM decision-making framework

---

## Core Concepts Documented

`diffusion-models` · `flux-architecture` · `lora-training` · `controlnet` · `comfyui-workflow-system` · `video-generation-models` · `full-stack-llm-architecture` · `fastapi-patterns` · `domain-modeling` · `retrieval-augmented-generation` · `tool-calling-architecture` · `mcp-model-context-protocol` · `agentic-loop` · `react-framework` · `agentic-patterns` · `multi-agent-systems` · `guardrails-architecture` · `llm-as-judge` · `ppt-framework` · `opt-framework` · `llm-decision-tree` · `hallucination-formula` · `llm-cost-economics` · `95-percent-rule`
