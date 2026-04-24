---
title: "Wiki Overview — Zeno Second Brain"
type: overview
last_updated: 2026-04-11
---

## What This Wiki Is

This is the Zeno Second Brain — a persistent, compounding knowledge base for Vishal's company. It is built on Andrej Karpathy's LLM Wiki pattern: instead of re-discovering knowledge on every query (RAG), the LLM incrementally compiles sources into structured, interlinked pages that get richer over time.

The wiki is owned entirely by the LLM. Vishal's job: add sources, ask questions, direct the analysis. The LLM's job: everything else — summarizing, cross-referencing, filing, flagging contradictions.

## Current Knowledge Domains

### AI / GenAI (Primary — 100x Cohort 7)
100x Engineers Cohort 7 is the main ongoing source. The cohort runs ~6 months (March-September 2026) covering 3 modules:
- **Module 1: Diffusion** — Image/video generation, SDXL, FLUX, ComfyUI, LoRA training, ControlNet, IP-Adapter, Wan 2.1/2.2, Hunyuan World, Replicate deployment
- **Module 2: Full Stack LLM** — APIs, FastAPI, Supabase, domain modeling, prompt engineering, MCP, RAG (3 levels + spectrum), memory, full-stack architecture, ship cycle
- **Module 3: AI Agents** — ReAct, agentic loop, 6 multi-agent patterns, programmatic tool calling, production pillars, guardrails, PII, LLM-as-judge, failure modes

All three modules fully ingested. 60+ wiki pages covering every key concept.

### AI Productivity Patterns
How AI systems are built to compound in value over time — memory architectures, self-improvement loops, chief-of-staff patterns. Currently grounded in Karpathy's LLM Wiki and rsarver's Stella chief-of-staff system.

## Core Thesis (evolving)
The most valuable AI systems are not the smartest ones — they are the ones with the best operating models. Intelligence without memory is amnesia. Speed without structure is chaos. The winning pattern across every source so far: **persistent, structured, human-auditable knowledge + explicit separation of what the AI judges vs. what the system executes deterministically.**

The two-lever optimization framework from "Connecting the LLM Dots" formalizes this: hallucination is a system design problem (f(Uncertainty × Forced Response)), and every AI system failure can be diagnosed as either a context problem (Lever 1) or a behavior problem (Lever 2). Fix the system, not the model.

## Key Synthesis Pages
- [[full-cohort-decision-framework]] — the complete OPT→MCP decision chain tying all three modules together
- [[llm-optimization-decision-tree]] — two-lever framework synthesized; all Module 2+3 techniques mapped to levers
- [[module2-architecture-philosophy]] — Six Easy Pieces mapped to Module 2 lectures; philosophical justification for every layer
- [[agent-vs-workflow-economics]] — when agents are worth it; real cost numbers; failure statistics
- [[production-failure-analysis]] — Devin + Air Canada case studies; builder liability; structural lessons
- [[ai-knowledge-management]] — Karpathy's wiki and rsarver's chief-of-staff patterns converge

## Page Count by Category
| Category | Pages |
|----------|-------|
| Sources | 7 |
| Concepts — Cross-module frameworks | 4 |
| Concepts — Module 1 (Diffusion) | 8 |
| Concepts — Module 2 (Full-Stack LLM) | 10 |
| Concepts — Module 3 (AI Agents) | 11 |
| Concepts — Architecture & Systems | 5 |
| Concepts — Other AI/ML | ~8 |
| Entities | ~17 |
| Synthesis | 6 |
| **Total** | **~76** |

## What's Complete (Full Rebuild + Bonus Phase — 2026-04-11)
- All 3 module source pages corrected and fully structured
- All phantom index entries resolved with actual files
- All Module 1 diffusion concepts: diffusion-models, comfyui-workflow-system, controlnet, flux-architecture, lora-training, ip-adapter, video-generation-models
- All Module 2 full-stack concepts: full-stack-llm-architecture, domain-modeling, fastapi-patterns, ship-cycle, llm-wrappers, vibe-coding, production-genai-stack, cost-optimization-patterns, embedding-model-selection, **tool-calling-architecture**
- All Module 3 agent concepts: agentic-loop, augmented-llm, react-framework, agentic-patterns, agent-production-pillars, guardrails-architecture, pii-handling, llm-as-judge, agent-failure-modes, 95-percent-rule, programmatic-tool-calling
- All cross-module frameworks: ppt-framework, llm-decision-tree, hallucination-formula, six-easy-pieces-philosophy, opt-framework
- All entity pages: lovable, cursor-ai, langchain, langraph, crewai, autogen-microsoft, llamaindex, openai-swarm, langflow, llama-guard, cognition-devin
- Bonus phase concepts: **llm-cost-economics**, **replicate-deployment**

## What's Missing (Remaining Gaps)
- Company-specific domain (business operations, team, goals) — not yet started
- Future 100x lectures (cohort still in progress through September 2026) — add as notes become available

## Next Recommended Ingestions
1. Each new 100x lecture as notes are available (Module 2 and 3 remaining lectures)
2. Any articles/podcasts clipped on agents, RAG, or MCP
3. Meeting notes or decisions the company wants to preserve
