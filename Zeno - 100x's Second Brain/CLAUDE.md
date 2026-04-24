# CLAUDE.md — Zeno Second Brain Schema
> This file is the operating manual for maintaining this wiki. Read it at the start of every session. It tells you how this knowledge base is structured, what the conventions are, and exactly how to behave when ingesting sources, answering queries, and maintaining the wiki.

---

## 1. WIKI PURPOSE

This is a **persistent, compounding knowledge base** for Vishal's company and personal learning. It is not a RAG system. It is a structured wiki where knowledge is compiled once, cross-referenced, and kept current — not re-derived on every query.

Primary domains (will expand over time):
- AI/GenAI tools and techniques (100x Engineers Cohort 7)
- AI agent architecture and production patterns
- Business operations and team building
- Personal productivity and decision-making

The wiki gets richer with every source added. Cross-references should already exist when answering questions. That is the whole point.

---

## 2. DIRECTORY STRUCTURE

```
CLAUDE.md                    ← this file (schema + operating manual)
raw/                         ← IMMUTABLE. LLM reads, never modifies.
  courses/                   ← course notes, transcripts
  clippings/                 ← web articles, clipped markdown
  assets/                    ← downloaded images
wiki/                        ← LLM-owned. All wiki pages live here.
  index.md                   ← master catalog (update on every ingest)
  log.md                     ← append-only chronological record
  overview.md                ← high-level synthesis of everything
  sources/                   ← one summary page per ingested source
  concepts/                  ← idea pages: frameworks, techniques, theories
  entities/                  ← people, companies, tools, products
  synthesis/                 ← cross-source analysis, comparisons, insights
templates/                   ← page templates (do not modify during sessions)
  source.md
  concept.md
  entity.md
  synthesis.md
```

**The law of two layers:**
- `raw/` is truth. Never edit files there.
- `wiki/` is synthesis. You own it completely.

---

## 3. PAGE FORMATS

### 3.1 Source Page (`wiki/sources/`)
One page per ingested source. Filename: `kebab-case-title.md`.

```markdown
---
title: "Full Source Title"
type: source
source_type: [course_notes | article | book | podcast | video | paper]
author: "Author Name"
date: YYYY-MM-DD
raw_path: raw/[path/to/file]
tags: [tag1, tag2]
---

## Summary
2-4 paragraph synthesis of the source's core argument or content.

## Key Ideas
- Bullet list of the most important points, claims, or frameworks

## Notable Quotes / Moments
> Direct quotes or specific examples worth preserving

## Concepts Introduced
Links to concept pages this source contributes to: [[concept-name]], [[concept-name]]

## Entities Mentioned
Links to entity pages: [[entity-name]], [[entity-name]]

## Contradictions / Tensions
Note anything that contradicts existing wiki pages.

## Open Questions
Questions raised but not answered by this source.
```

### 3.2 Concept Page (`wiki/concepts/`)
One page per idea, framework, or technique. Filename: `kebab-case-name.md`.

```markdown
---
title: "Concept Name"
type: concept
tags: [tag1, tag2]
source_count: N
---

## Definition
Clear 1-3 sentence definition.

## Why It Matters
What problem does this solve? Why should we care?

## How It Works
Mechanism, steps, or structure.

## Key Variants / Extensions
Variations, related patterns, or extensions of this concept.

## Examples
Concrete applications or case studies.

## Connections
Related concepts: [[concept-name]], [[concept-name]]
Introduced by: [[source-name]]

## Open Questions / Unknowns
What is still unclear or debated?
```

### 3.3 Entity Page (`wiki/entities/`)
One page per person, company, tool, or product. Filename: `kebab-case-name.md`.

```markdown
---
title: "Entity Name"
type: entity
entity_type: [person | company | tool | product | community]
tags: [tag1, tag2]
---

## Overview
Who/what is this and why does it matter to this knowledge base?

## Key Contributions / Role
What have they done or built that's relevant?

## Connections
Related entities: [[entity-name]]
Appears in sources: [[source-name]]

## Notes
Anything notable that doesn't fit above.
```

### 3.4 Synthesis Page (`wiki/synthesis/`)
Cross-source analysis. Filename: `kebab-case-topic.md`.

```markdown
---
title: "Synthesis Title"
type: synthesis
sources: [source1, source2]
tags: [tag1, tag2]
---

## Question / Framing
What is this synthesis trying to answer?

## Analysis
The actual synthesis. This is where you connect ideas across sources.

## Conclusions
What can we conclude? What is now clearer?

## Contradictions
Where do sources disagree? What is unresolved?

## Further Research
What sources or questions would strengthen this synthesis?
```

---

## 4. INDEX FORMAT (`wiki/index.md`)

The index is a **content catalog** — organized by category, updated on every ingest.
Format per entry: `- [[page-name]] — one-line description`

Update order: add new entries under the correct category heading. Never rewrite the full index from scratch — append.

---

## 5. LOG FORMAT (`wiki/log.md`)

The log is **append-only**. Every entry starts with: `## [YYYY-MM-DD] action | description`

Valid actions: `ingest`, `query`, `lint`, `update`

Example:
```
## [2026-04-09] ingest | Karpathy - LLM Wiki Pattern
Pages created: wiki/sources/karpathy-llm-wiki-pattern.md
Pages updated: wiki/index.md, wiki/concepts/llm-wiki-pattern.md, wiki/entities/andrej-karpathy.md
```

Never delete log entries. The log is the wiki's history.

---

## 6. OPERATIONS

### 6.1 INGEST (when user adds a new source)
1. Read the source file in `raw/`
2. Discuss key takeaways with user if needed
3. Create `wiki/sources/[name].md` using the source template
4. Create or update relevant `wiki/concepts/` pages
5. Create or update relevant `wiki/entities/` pages
6. Update `wiki/index.md` — add entries for all new/updated pages
7. Update `wiki/overview.md` if the source materially changes the big picture
8. Append an entry to `wiki/log.md`
9. Flag any contradictions with existing wiki pages explicitly

### 6.2 QUERY (when user asks a question)
1. Read `wiki/index.md` to find relevant pages
2. Read those pages
3. Synthesize an answer with [[wiki page]] citations
4. If the answer is valuable (comparison, analysis, new insight): offer to file it as a synthesis page
5. Never answer from raw sources alone — always read the wiki first

### 6.3 LINT (periodic health check)
Ask the LLM to:
- Find concept pages with `source_count: 1` that lack cross-references
- Find orphan pages (mentioned nowhere else)
- Find outdated claims (newer sources contradict them)
- Suggest missing pages for frequently-mentioned concepts without their own page
- Suggest new questions worth investigating

### 6.4 UPDATE (user corrects or adds to existing knowledge)
1. Edit the relevant wiki page(s) directly
2. Add a log entry noting what changed and why
3. Update index if page title/description changed

---

## 7. CONVENTIONS

- All wiki filenames: lowercase, hyphen-separated (kebab-case)
- Links: always use Obsidian `[[wiki-link]]` format
- Dates: always ISO format YYYY-MM-DD
- Tags: lowercase, hyphen-separated. Common tags: `ai`, `llm`, `agents`, `diffusion`, `rag`, `mcp`, `full-stack`, `100x-cohort7`, `company`, `productivity`
- Never write "I" in wiki pages — these are knowledge documents, not conversation
- Contradictions: always flag explicitly with a `> [!warning] Contradiction:` callout
- Source count: update `source_count` in concept pages every time a new source references that concept

---

## 8. CURRENT KNOWLEDGE BASE STATE

- **Initialized:** 2026-04-09
- **Domain:** AI/GenAI (100x Cohort 7) + AI productivity patterns
- **Sources ingested:** 3
- **Wiki pages:** see wiki/index.md
- **Primary ongoing source:** 100x Engineers Cohort 7 (in progress, ~6 months)

---

## 9. GUIDE FOR FUTURE INGESTION

When Vishal adds new sources, here is what to do by type:

| Source type | Where to put raw file | What wiki pages to create/update |
|---|---|---|
| Course lecture notes | `raw/courses/` | `sources/`, relevant `concepts/`, `entities/` |
| Web article (clipping) | `raw/clippings/` | `sources/`, relevant `concepts/` |
| Book chapter | `raw/books/` | `sources/`, `concepts/`, possibly `entities/` |
| Meeting/conversation notes | `raw/notes/` | If it contains decisions: `synthesis/`. If it introduces new knowledge: `concepts/` |
| Podcast transcript | `raw/transcripts/` | Same as articles |

**Recommended next sources to ingest:**
- Remaining 100x Cohort 7 lectures as they are released
- Any articles/podcasts on AI agents, RAG, or MCP that Vishal clips
- Business operation notes (decisions, processes, retrospectives)
