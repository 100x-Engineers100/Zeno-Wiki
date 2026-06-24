---
title: "100x Engineers Cohort 7 — Module 2: Full-Stack LLM Development"
type: source
source_type: course_notes
author: "Siddhant (100x Engineers)"
date: 2026-05-16
raw_path: raw/courses/
tags: [ai, llm, full-stack, api, rag, mcp, 100x-cohort7, fastapi, supabase, interfaces, product-building]
---

## Summary

Module 2 teaches full-stack LLM development to build real, deployable AI-powered systems. The cohort runs May–September 2026. Unlike C6, this iteration is redesigned around the **AI adoption gap** — the observation that frontier models are only ~20% utilized, and the real opportunity is in closing that gap, not building AI wrappers.

The pedagogical anchor is domain expertise + AI system design, not tool fluency. The module is structured around the concept of becoming a **Forward Deployed Engineer (FDE)** — someone who can diagnose workflows, build self-improving AI systems, encode domain judgment as evals, and design guardrails.

The lecture sequence moves from product thinking (L01–L02) → interface fundamentals (L03) → building the interfaces in code (L04–L10).

## Lecture Table

| # | Title | Date | Track | Detail Page |
|---|-------|------|-------|-------------|
| L01 | Orientation: Idea to App Workshop | 2026-05-16 | Combined | [[100x-cohort7-module2-l01-l03]] |
| L02 | State of AI 2026 | 2026-05-22 | Combined | [[100x-cohort7-module2-l01-l03]] |
| L03 | The First Interface | 2026-05-23 | Combined | [[100x-cohort7-module2-l01-l03]] |
| L04 | Working with UI (Code Path) | 2026-05-29 | Code Path | [[100x-cohort7-module2-l04-l06]] |
| L05 | Intro to API: The Second Interface | 2026-05-30 | Combined | [[100x-cohort7-module2-l04-l06]] |
| L06 | Building APIs with FastAPI | 2026-06-05 | Code Path | [[100x-cohort7-module2-l04-l06]] |
| L07 | Introduction to Databases and Domain Modeling | 2026-06-06 | Combined | [[100x-cohort7-module2-l07-l10]] |
| L08 | Connecting the Dots: Databases + Supabase | 2026-06-12 | Code Path | [[100x-cohort7-module2-l07-l10]] |
| L09 | Not available — skip | — | — | — |
| L10 | Live MVP Build & Deploy | 2026-06-19 | Code Path | [[100x-cohort7-module2-l07-l10]] |

## Key Ideas (Module 2 Overall)

- AI 2026 = systems race, not intelligence race
- The opportunity is closing the 80% adoption gap, not building AI wrappers
- FDE role: domain expertise × AI system design = the new high-value profile
- Interface thinking = the foundational mental model for building anything; UI → API → Backend → LLM
- Code is no longer a moat; specific knowledge + validated problem + proof is the moat
- Don't build before you've validated (IDEA2App V2 / scientific discovery method)
- "Whoever controls the meme layer controls attention, framing, emotional momentum" — Siddhant on interfaces

## Concepts Introduced

### L01–L03
[[idea2app-v2]], [[ai-adoption-gap]], [[fde-forward-deployed-engineer]], [[interface-types]], [[opt-framework]], [[deterministic-vs-generative-separation]]

### L04–L06
[[gradio-framework]], [[http-rest-api]], [[interface-types]], [[fastapi-patterns]]

### L07–L10
[[database-fundamentals]], [[domain-modeling]], [[supabase]], [[eval-first-design]], [[mvp-build-cycle]], [[llm-as-judge]], [[deterministic-vs-generative-separation]], [[fastapi-patterns]]

## Entities Mentioned
[[siddhant]], [[sridev]], [[aeos-labs]], [[100x-engineers]]

## Contradictions / Tensions
> [!warning] Contradiction: C7 is a complete curriculum redesign vs C6. Old C6 content (17 lectures: Gradio/FastAPI/Supabase/RAG/MCP) was deleted. C7 restructures around product methodology + FDE framing before touching any code. The "OPT framework" acronym persists but meaning changed: C6 = "One Prompt Task"; C7 = Operating Model → Processes → Tasks.

## Open Questions
- What exactly does the no-code track build in L04 while code track builds UI?
- How does the 21-day MVP plan connect to the technical stack built in L04–L10?
- L09 is missing — what was it supposed to cover?
