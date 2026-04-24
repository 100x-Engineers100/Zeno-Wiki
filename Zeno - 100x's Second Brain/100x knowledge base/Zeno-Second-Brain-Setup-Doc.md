# Zeno Second Brain — Setup Documentation

**Created:** 2026-04-09  
**Built by:** Claude Code (claude-sonnet-4-6) in collaboration with Vishal  
**Pattern:** Andrej Karpathy's LLM Wiki Pattern  
**Vault:** `C:\Users\visha\Downloads\Zeno - 100x's Second Brain`

---

## 1. What Was Built and Why

### The Problem This Solves

Most people use AI for knowledge by uploading files and asking questions — the LLM re-discovers the answer every time from raw documents. Nothing compounds. Ask a question that needs synthesis across five sources and the LLM has to find and piece together fragments on every query. That's RAG (Retrieval-Augmented Generation), and it's the default.

**This vault does something different.**

Instead of raw retrieval, the LLM incrementally builds and maintains a **persistent wiki** — a structured, interlinked collection of markdown files that sits between you and your raw sources. When a new source is added, the LLM reads it, extracts key ideas, and integrates them into the existing wiki: updating entity pages, revising concept summaries, flagging contradictions. Knowledge is **compiled once and kept current**, not re-derived on every query.

The wiki compounds. Cross-references are pre-built. Contradictions have already been flagged. The synthesis already reflects everything you've read. The more sources you add, the richer every answer becomes.

**Your job:** Add sources, ask questions, direct the analysis.  
**The LLM's job:** Everything else — summarizing, cross-referencing, filing, maintaining consistency.

This is based directly on Andrej Karpathy's LLM Wiki pattern (published April 2026), extended with the AI memory architecture from rsarver's AI Chief of Staff system.

---

## 2. Full Directory Structure

```
Zeno - 100x's Second Brain/
│
├── CLAUDE.md                          ← THE SCHEMA FILE (most important file)
│
├── raw/                               ← Immutable source documents. Never edit.
│   ├── courses/                       ← Course notes, transcripts
│   │   └── 100x-cohort7-data-doc.txt ← Full 100x Cohort 7 notes (9,759 lines)
│   ├── clippings/                     ← Web articles clipped to markdown
│   │   └── rsarver-ai-chief-of-staff.md
│   └── assets/                        ← Downloaded images from articles
│
├── wiki/                              ← LLM-owned. All synthesized knowledge lives here.
│   ├── index.md                       ← Master content catalog
│   ├── log.md                         ← Append-only chronological history
│   ├── overview.md                    ← High-level synthesis + current state
│   ├── sources/                       ← One summary page per ingested source
│   ├── concepts/                      ← Idea pages: frameworks, techniques, theories
│   ├── entities/                      ← People, companies, tools, products
│   └── synthesis/                     ← Cross-source analysis and comparisons
│
├── templates/                         ← Page templates (do not modify)
│   ├── source.md
│   ├── concept.md
│   ├── entity.md
│   └── synthesis.md
│
└── 100x knowledge base/               ← Original folder (raw course data)
    ├── Data_Doc_main.txt              ← Original source (kept here, copied to raw/)
    └── Zeno-Second-Brain-Setup-Doc.md ← This file
```

---

## 3. What Each Folder Does

### `CLAUDE.md` — The Schema (Root Level)
The single most important file in the vault. It is the **operating manual** for the LLM — it defines:
- The wiki's purpose and domain scope
- The full directory structure and what lives where
- The exact format for each type of page (source, concept, entity, synthesis)
- The exact format for index.md and log.md entries
- Step-by-step instructions for the three operations: Ingest, Query, Lint
- Conventions (naming, linking, dates, tags)
- A guide for future ingestion by source type

Every time you open a new Claude session to work with this vault, **Claude reads CLAUDE.md first**. It is what makes Claude a disciplined wiki maintainer rather than a generic chatbot. Without it, Claude has no memory of how this vault is structured.

**Think of it as: the LLM's job description for this vault.**

---

### `raw/` — Immutable Source Documents
The source of truth. The LLM reads these files but **never modifies them**. They are your original documents exactly as they arrived.

| Subfolder | What goes here |
|---|---|
| `raw/courses/` | Course notes, lecture transcripts, module data docs |
| `raw/clippings/` | Web articles converted to markdown (via Obsidian Web Clipper) |
| `raw/assets/` | Downloaded images referenced in articles |

**Rule:** Never edit files in `raw/`. If a source is wrong, note it in the wiki page, not in the raw file.

Currently contains:
- `100x-cohort7-data-doc.txt` — The full 100x Cohort 7 notes across all 3 modules (copied from the original `100x knowledge base/` folder)
- `rsarver-ai-chief-of-staff.md` — Web article on building an AI chief of staff (copied from `Clippings/`)

---

### `wiki/` — The LLM-Maintained Knowledge Base
Everything in this folder is **written and maintained by the LLM**. You read it; the LLM writes it. This is the actual second brain.

#### `wiki/index.md` — Master Content Catalog
The LLM reads this **first** on every query to find relevant pages. Lists every wiki page under categorized headings with a one-line description. Updated on every ingest. Think of it as a table of contents for the entire knowledge base.

Current entries: 5 sources, 8+ concepts, 4 entities, 1 synthesis.

#### `wiki/log.md` — Chronological History
An **append-only** record of everything that has happened to this wiki. Every ingest, every query that produced a synthesis page, every lint pass. Each entry starts with `## [YYYY-MM-DD] action | description` — making it grep-parseable.

Use it to: see what was added when, understand the wiki's evolution, orient yourself after a gap.

#### `wiki/overview.md` — Current State + Thesis
A high-level snapshot of the wiki's current state: what domains are covered, what the core thesis is, what sources have been ingested, and what gaps remain. Updated whenever a source materially changes the big picture.

Read this when starting a new session for quick orientation.

#### `wiki/sources/` — One Page Per Ingested Source
Every source that has been ingested gets its own summary page here. Each page follows the source template: summary, key ideas, notable quotes, concepts/entities introduced, contradictions, and open questions.

**Currently contains:**
| File | What it summarizes |
|---|---|
| `karpathy-llm-wiki-pattern.md` | Karpathy's LLM Wiki gist — the pattern this vault is built on |
| `rsarver-ai-chief-of-staff.md` | rsarver's article on building AI chief of staff "Stella" |
| `100x-cohort7-module1-diffusion.md` | 100x Module 1: Diffusion models, SDXL, ComfyUI, FLUX, LoRA, video |
| `100x-cohort7-module2-llm.md` | 100x Module 2: Full stack LLM — APIs, RAG, MCP, memory |
| `100x-cohort7-module3-agents.md` | 100x Module 3: AI agents — ReAct, multi-agent, production |

#### `wiki/concepts/` — Idea Pages
One page per idea, framework, or technique. Each concept page is independent of any single source — it synthesizes what multiple sources say about that concept, tracks how the definition evolved, and maintains cross-references.

**Currently contains:**
| File | What it covers |
|---|---|
| `llm-wiki-pattern.md` | The persistent wiki approach vs. RAG — three layers, three operations |
| `ai-memory-architecture.md` | Two-layer memory (daily notes + curated MEMORY.md); flat markdown |
| `ai-agents-react.md` | What makes an agent; ReAct loop; stop conditions; state management |
| `mcp-model-context-protocol.md` | MCP stateless protocol for LLM-tool communication |
| `retrieval-augmented-generation.md` | RAG: how it works, three levels, limitations vs. wiki |
| `generative-ai-history.md` | 80-year AI arc from McCulloch-Pitts to ChatGPT; why now is different |
| `opt-framework.md` | One Prompt Task: identify + automate single-prompt tasks |
| `deterministic-vs-generative-separation.md` | LLMs handle judgment; scripts handle everything deterministic |

#### `wiki/entities/` — People, Companies, Tools
One page per named thing that appears repeatedly across sources: a person, company, tool, or product. Entities are the nodes in the knowledge graph — they link sources and concepts together.

**Currently contains:**
| File | Who/what it covers |
|---|---|
| `andrej-karpathy.md` | Creator of LLM Wiki pattern; former Tesla VP AI / OpenAI |
| `sridev.md` | CEO of 100x Engineers; teaches Diffusion module |
| `siddhant.md` | CTO of 100x Engineers; teaches LLM + Agents modules |
| `100x-engineers.md` | The company running Cohort 7 |

#### `wiki/synthesis/` — Cross-Source Analysis
Pages that answer a specific question by synthesizing across multiple sources. These are the most valuable pages — they represent insights that don't exist in any single source.

**Currently contains:**
| File | What it synthesizes |
|---|---|
| `ai-knowledge-management.md` | How Karpathy's wiki and rsarver's chief-of-staff converge; implications for this vault |

---

### `templates/` — Page Templates
Four blank templates matching the four wiki page types. Use these as the starting point when Claude creates new pages. The LLM is instructed to follow these formats exactly.

| Template | Used for |
|---|---|
| `source.md` | New ingested source pages |
| `concept.md` | New concept/idea pages |
| `entity.md` | New person/company/tool pages |
| `synthesis.md` | New cross-source analysis pages |

**Do not modify these** — they are the structural contract between you and the LLM.

---

## 4. How Pages Connect (The Graph)

In Obsidian's graph view, you will see the shape of the knowledge base:
- **Source pages** → link to concepts and entities they introduce
- **Concept pages** → link to related concepts and back to sources
- **Entity pages** → link to sources they appear in and related entities
- **Synthesis pages** → link to the sources they synthesize
- **index.md** → links to everything (the hub)

Pages with many inbound links are hubs — high-value, well-connected concepts. Pages with no inbound links are orphans — flagged during lint passes for cleanup.

---

## 5. How to Use Going Forward

### 5.1 Starting a New Session
Open a Claude Code session in this vault. Claude will load CLAUDE.md automatically. If it does not, paste this at the start:  
*"Please read CLAUDE.md first — this is a structured wiki vault and CLAUDE.md is the operating schema."*

Then say: *"Read wiki/overview.md and wiki/log.md to orient yourself."*

---

### 5.2 Adding a New Source (Ingest)
**Step 1:** Put the raw file in the right `raw/` subfolder:
- Course notes → `raw/courses/`
- Web article → `raw/clippings/` (use Obsidian Web Clipper extension to convert to markdown)
- Book chapter / PDF notes → `raw/books/` (create folder if needed)

**Step 2:** Tell Claude:
> "Ingest `raw/courses/[filename]`. Follow the ingest workflow in CLAUDE.md."

Claude will:
1. Read the source
2. Create `wiki/sources/[name].md`
3. Create or update relevant `wiki/concepts/` pages
4. Create or update relevant `wiki/entities/` pages
5. Update `wiki/index.md`
6. Update `wiki/overview.md` if needed
7. Append to `wiki/log.md`
8. Flag any contradictions with existing pages

**For new 100x lectures specifically:**
> "New 100x lecture added. File is `raw/courses/100x-cohort7-lecture-[name].md`. Ingest it and update the Module 2 / Module 3 source pages as needed."

---

### 5.3 Asking Questions (Query)
Just ask naturally. Claude will:
1. Read `wiki/index.md` to find relevant pages
2. Read those pages
3. Synthesize an answer with `[[wiki page]]` citations
4. Offer to save the answer as a synthesis page if it's valuable

Example queries:
- *"What is the ReAct pattern and how does it differ from a chatbot?"*
- *"Summarize everything we know about RAG so far."*
- *"What did Sridev say about the code path vs no-code path?"*
- *"What are the gaps in our knowledge of MCP?"*

---

### 5.4 Lint (Wiki Health Check)
Periodically (monthly or when the wiki feels disorganized):
> "Run a lint pass on the wiki. Find: orphan pages, missing cross-references, concepts mentioned but lacking their own page, contradictions between pages, open questions worth investigating."

Claude will scan the wiki and report issues with suggested fixes.

---

### 5.5 Adding Other Domains (Company, Personal, etc.)
The vault is designed to expand. When you want to add a new domain:
1. Tell Claude what the new domain is
2. Claude will suggest new `raw/` subfolders and wiki categories
3. Update CLAUDE.md's domain section and source ingestion table
4. Start adding sources to that domain

Examples of future domains:
- `raw/decisions/` — company decisions, retrospectives
- `raw/meetings/` — meeting notes
- `raw/books/` — book chapter notes
- `wiki/company/` — team, operations, strategy pages

---

## 6. How This Was Created (Session Walkthrough)

**What Vishal provided:**
1. The Obsidian vault at `C:\Users\visha\Downloads\Zeno - 100x's Second Brain` (existing, mostly empty)
2. Andrej Karpathy's LLM Wiki gist (the pattern to implement)
3. Instructions: broader company second brain, start with cohort notes, separate raw folder, keep CLAUDE.md, follow Karpathy sincerely

**What Claude did (in order):**

1. **Read existing vault** — found `100x knowledge base/Data_Doc_main.txt` (9,759-line course notes) and one article clipping
2. **Read source files** — extracted the module/lecture structure from the data doc, read the full rsarver article, sampled key sections of the 9,759-line data doc to understand content
3. **Created directory structure** — `raw/courses`, `raw/clippings`, `raw/assets`, `wiki/sources`, `wiki/concepts`, `wiki/entities`, `wiki/synthesis`, `templates/`
4. **Copied source files to `raw/`** — data doc → `raw/courses/`, article → `raw/clippings/`
5. **Wrote CLAUDE.md** — the full schema: structure, page formats, index format, log format, all three operations (ingest/query/lint), conventions, current state, ingestion guide
6. **Wrote four templates** — source, concept, entity, synthesis
7. **Wrote 5 source pages** — Karpathy gist, rsarver article, 3 modules of 100x notes
8. **Wrote 8 concept pages** — LLM wiki pattern, AI memory architecture, AI agents/ReAct, MCP, RAG, GenAI history, OPT framework, deterministic/generative separation
9. **Wrote 4 entity pages** — Karpathy, Sridev, Siddhant, 100x Engineers
10. **Wrote 1 synthesis page** — comparing Karpathy's and rsarver's approaches
11. **Wrote wiki/index.md** — master catalog of all 18 pages
12. **Wrote wiki/log.md** — full history of the session's ingests and queries
13. **Wrote wiki/overview.md** — current state, core thesis, domain map, priority gaps
14. **Wrote this doc**

**Total created in one session:**
- 1 schema file (CLAUDE.md)
- 4 templates
- 5 source pages
- 8 concept pages
- 4 entity pages
- 1 synthesis page
- 3 wiki infrastructure pages (index, log, overview)
- **26 files total**

---

## 7. Key Principles to Remember

1. **Raw is immutable.** Never edit `raw/` files. Corrections go in wiki pages.
2. **Wiki is LLM-owned.** You read it. The LLM writes it. Do not manually edit wiki pages in complex ways — let Claude maintain them.
3. **CLAUDE.md is the contract.** If Claude does something wrong, fix CLAUDE.md first. That is where the rules live.
4. **Index first, then pages.** Claude always reads `wiki/index.md` before diving into individual pages. Keep the index accurate.
5. **Log everything.** The log is the wiki's history. Every ingest and significant query should have a log entry.
6. **File valuable answers.** When Claude gives a rich synthesis answer, say "file this as a synthesis page." Answers that disappear into chat history are wasted.
7. **Obsidian graph view** is your health check — orphan nodes are problems; highly-connected hubs are your most valuable knowledge.

---

## 8. Recommended Obsidian Plugins

| Plugin | What it does | Priority |
|---|---|---|
| **Obsidian Web Clipper** | Converts web articles to markdown for `raw/clippings/` | High |
| **Dataview** | Query wiki frontmatter — e.g., list all concepts by source_count | Medium |
| **Marp** | Generate slide decks from wiki content | Low |
| **Graph Analysis** | Better graph view for seeing wiki topology | Low |

To download images locally after clipping:  
Obsidian Settings → Files and links → Set "Attachment folder path" to `raw/assets/`. Then bind a hotkey to "Download attachments for current file."

---

## 9. Quick Reference

| Task | What to say to Claude |
|---|---|
| Orient Claude | "Read CLAUDE.md, wiki/overview.md, and wiki/log.md" |
| Ingest a source | "Ingest `raw/[path]`. Follow CLAUDE.md ingest workflow." |
| Ask a question | Just ask. Claude reads index first. |
| File an answer | "File this answer as a synthesis page." |
| Health check | "Run a lint pass on the wiki." |
| Add a new domain | "I want to add [domain] to the vault. Suggest how to extend CLAUDE.md." |
| See what's new | "Read wiki/log.md and summarize recent activity." |
