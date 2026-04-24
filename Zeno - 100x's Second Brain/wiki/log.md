# Wiki Log
Append-only. Every entry: `## [YYYY-MM-DD] action | description`
Parse last 5 entries: `grep "^## \[" wiki/log.md | tail -5`

---

## [2026-04-09] ingest | Karpathy — LLM Wiki Pattern (gist)
Pages created: wiki/sources/karpathy-llm-wiki-pattern.md
Pages created: wiki/concepts/llm-wiki-pattern.md
Pages created: wiki/entities/andrej-karpathy.md
Pages updated: wiki/index.md, wiki/log.md, wiki/overview.md

## [2026-04-09] ingest | rsarver — How I Built a Chief of Staff on OpenClaw
Pages created: wiki/sources/rsarver-ai-chief-of-staff.md
Pages created: wiki/concepts/ai-memory-architecture.md
Pages created: wiki/concepts/deterministic-vs-generative-separation.md
Pages updated: wiki/index.md, wiki/log.md

## [2026-04-09] ingest | 100x Engineers Cohort 7 — Module 1: Diffusion & GenAI
Source: raw/courses/100x-cohort7-data-doc.txt (lines 1-~1400)
Pages created: wiki/sources/100x-cohort7-module1-diffusion.md
Pages created: wiki/concepts/generative-ai-history.md
Pages created: wiki/concepts/opt-framework.md
Pages created: wiki/entities/sridev.md, wiki/entities/100x-engineers.md
Pages updated: wiki/index.md, wiki/log.md

## [2026-04-09] ingest | 100x Engineers Cohort 7 — Module 2: Full Stack LLM
Source: raw/courses/100x-cohort7-data-doc.txt (Module 2 section)
Pages created: wiki/sources/100x-cohort7-module2-llm.md
Pages created: wiki/concepts/retrieval-augmented-generation.md, wiki/concepts/mcp-model-context-protocol.md
Pages created: wiki/entities/siddhant.md
Pages updated: wiki/index.md, wiki/log.md, wiki/concepts/opt-framework.md

## [2026-04-09] ingest | 100x Engineers Cohort 7 — Module 3: AI Agents
Source: raw/courses/100x-cohort7-data-doc.txt (Module 3 section)
Pages created: wiki/sources/100x-cohort7-module3-agents.md
Pages created: wiki/concepts/ai-agents-react.md
Pages updated: wiki/index.md, wiki/log.md, wiki/concepts/mcp-model-context-protocol.md

## [2026-04-09] query | Initial synthesis — AI knowledge management patterns
Pages created: wiki/synthesis/ai-knowledge-management.md
Answered: How do Karpathy and rsarver's approaches compare?
Filed as synthesis page.

## [2026-04-09] ingest | Five Easy Pieces for LLMs
Source: raw/courses/five Easy Pieces for LLMs.md
Pages created: wiki/sources/five-easy-pieces-for-llms.md
Pages updated: wiki/index.md, wiki/log.md

## [2026-04-09] ingest | Six Easy Pieces for LLMs
Source: raw/courses/Six Easy Pieces for LLMs.md
Pages created: wiki/sources/six-easy-pieces-for-llms.md
Pages created: wiki/concepts/structured-io-llm.md, wiki/concepts/context-economy.md
Pages updated: wiki/index.md, wiki/log.md

## [2026-04-09] ingest | Seven Easy Pieces for LLMs — Siddhant Goswami, 100xEngineers
Source: raw/courses/Seven Easy Pieces for LLMs.md
Pages created: wiki/sources/seven-easy-pieces-for-llms.md
Pages created: wiki/concepts/hallucination-and-grounding.md, wiki/concepts/retrieval-spectrum.md, wiki/concepts/aaa-agent-progression.md
Pages updated: wiki/concepts/retrieval-augmented-generation.md (source_count 2→5, retrieval spectrum added)
Pages updated: wiki/concepts/ai-agents-react.md (source_count 2→5, hard problems + multi-agent patterns added)
Pages created: wiki/synthesis/easy-pieces-framework-evolution.md
Pages updated: wiki/index.md, wiki/log.md

## [2026-04-11] ingest | Phase 2 Batch B — Module 3 agent concepts (11 pages)
Created: wiki/concepts/agentic-loop.md — 6-step SPAORL cycle
Created: wiki/concepts/augmented-llm.md — LLM+Knowledge+Capabilities+Controller (pre-agent state)
Created: wiki/concepts/react-framework.md — Thought→Action→Observation pattern
Created: wiki/concepts/agentic-patterns.md — all 6 multi-agent coordination patterns with decision guide
Created: wiki/concepts/agent-production-pillars.md — 5 production pillars
Created: wiki/concepts/guardrails-architecture.md — deterministic layer + LlamaGuard + intent classification
Created: wiki/concepts/pii-handling.md — 3-step pipeline
Created: wiki/concepts/llm-as-judge.md — evaluation pattern + 50 QA pairs
Created: wiki/concepts/agent-failure-modes.md — Devin + Air Canada case studies mapped to SPAORL
Created: wiki/concepts/95-percent-rule.md — when NOT to use agents
Created: wiki/concepts/programmatic-tool-calling.md — execution env as orchestrator; context pollution
Updated: wiki/index.md — added AI Agents section

## [2026-04-11] ingest | Phase 2 Batch A — Cross-module framework concepts
Created: wiki/concepts/ppt-framework.md — Principle→Process→Tool meta-framework
Created: wiki/concepts/llm-decision-tree.md — two-lever diagnosis + escalation ladder
Created: wiki/concepts/hallucination-formula.md — f(Uncertainty × Forced Response)
Created: wiki/concepts/six-easy-pieces-philosophy.md — 6-piece full-stack philosophy
Updated: wiki/concepts/opt-framework.md — corrected definition (Operating Model→Processes→Tasks, not "One Prompt Task")
Updated: wiki/index.md — added Cross-Module Frameworks section, fixed opt-framework description

## [2026-04-11] lint | Phase 1 rebuild — source pages cleanup and new ingests
Deleted (noise): wiki/sources/five-easy-pieces-for-llms.md, wiki/sources/seven-easy-pieces-for-llms.md
Deleted (noise): wiki/synthesis/easy-pieces-framework-evolution.md
Updated: wiki/sources/six-easy-pieces-for-llms.md — rewritten for actual document (full-stack architecture), corrected raw_path
Created: wiki/sources/connecting-llm-dots.md — two-lever LLM optimization framework ingested for first time
Updated: wiki/sources/100x-cohort7-module1-diffusion.md — corrected raw_path, verified lecture table
Updated: wiki/sources/100x-cohort7-module2-llm.md — corrected raw_path, verified lecture table
Updated: wiki/sources/100x-cohort7-module3-agents.md — corrected raw_path, verified lecture table with tracks
Updated: wiki/concepts/hallucination-and-grounding.md — removed dead source refs (five/seven), added connecting-llm-dots
Updated: wiki/concepts/structured-io-llm.md — removed seven-easy-pieces ref
Updated: wiki/concepts/context-economy.md — removed seven-easy-pieces ref, added connecting-llm-dots
Updated: wiki/concepts/aaa-agent-progression.md — reattributed from seven-easy-pieces to module3-agents
Updated: wiki/concepts/ai-agents-react.md — removed dead source refs, removed "(from Seven Easy Pieces)" label
Updated: wiki/index.md — removed dead entries, added connecting-llm-dots entry

## [2026-04-11] ingest | Phase 2 Batch C — Module 2 full-stack LLM concepts (9 pages)
Source: raw/courses/Data_Doc_main.txt lines 2704–7069
Created: wiki/concepts/full-stack-llm-architecture.md — 5-component stack, 3 interface types, 3-level evolution
Created: wiki/concepts/domain-modeling.md — entities/attributes/relationships; 1:1/1:N/M:N; ERD; RLS
Created: wiki/concepts/fastapi-patterns.md — Pydantic, decorators, async def, CRUD mapping, Uvicorn
Created: wiki/concepts/ship-cycle.md — 9-step PRD→Lovable→GitHub→Cursor→tests→deploy
Created: wiki/concepts/llm-wrappers.md — LLM wrapper business model; Perplexity/Cursor examples; defensibility
Created: wiki/concepts/vibe-coding.md — GIGO principle, PRD-driven dev, Lovable/Cursor/Claude Code roles
Created: wiki/concepts/production-genai-stack.md — Next.js+FastAPI+Supabase+Pinecone+Redis+Langfuse/Sentry
Created: wiki/concepts/cost-optimization-patterns.md — Redis caching, model tiering, prompt efficiency, rate limiting
Created: wiki/concepts/embedding-model-selection.md — MTEB leaderboard, start-small strategy, indexing=querying rule
Updated: wiki/index.md — added Module 2 section with 9 new entries

## [2026-04-11] update | Phase 5 — Final index, overview, log update (rebuild complete)
Updated: wiki/overview.md — post-rebuild state, page counts, synthesis links, complete domain coverage
Updated: wiki/index.md — synthesis section, entity section, Module 1 section all finalized
Updated: wiki/log.md — this entry

## [2026-04-11] ingest | Phase 4 — Synthesis pages (5 pages)
Created: wiki/synthesis/module2-architecture-philosophy.md — Six Easy Pieces → Module 2 lectures; philosophical justification per layer
Created: wiki/synthesis/llm-optimization-decision-tree.md — two-lever synthesis; full escalation ladders; Module 2+3 map
Created: wiki/synthesis/agent-vs-workflow-economics.md — 65% cost premium; 95% rule; failure statistics; decision framework
Created: wiki/synthesis/production-failure-analysis.md — Devin (3 SPAORL failure modes) + Air Canada (LLM liability); structural lessons
Created: wiki/synthesis/full-cohort-decision-framework.md — complete OPT→PRD→MVP→Full-Stack→LLM→Augmented LLM→Agents→Multi-Agent→MCP chain
Updated: wiki/index.md — synthesis section updated

## [2026-04-11] ingest | Phase 3 — Entity pages (11 pages)
Created: wiki/entities/lovable.md — AI UI prototyping, step 1 of ship cycle
Created: wiki/entities/cursor-ai.md — AI code editor, step 5 of ship cycle, pairs with Lovable
Created: wiki/entities/langchain.md — LLM framework; chains/agents/memory/retrieval
Created: wiki/entities/langraph.md — stateful graph-based agent workflows
Created: wiki/entities/crewai.md — role-based multi-agent framework
Created: wiki/entities/autogen-microsoft.md — Microsoft Research conversable agent framework
Created: wiki/entities/llamaindex.md — RAG/retrieval data framework, PageIndex pattern
Created: wiki/entities/openai-swarm.md — lightweight Handoff pattern reference implementation
Created: wiki/entities/langflow.md — visual node-based LLM/agent builder (no-code track)
Created: wiki/entities/llama-guard.md — Meta's 22M param safety classifier, 7 categories
Created: wiki/entities/cognition-devin.md — AI SWE case study, 3 failure modes documented
Updated: wiki/index.md — entities section expanded with 11 new entries

## [2026-04-11] ingest | Phase 2 Batch D — Module 1 diffusion concepts (5 pages) + phantom fixes (4 pages)
Source: raw/courses/Data_Doc_main.txt lines 1–2703 (Module 1)
Created: wiki/concepts/lora-training.md — trigger words, rank/LR by use case, AI Toolkit vs KohyaSS, FLUX vs SDXL, steps/overfitting
Created: wiki/concepts/controlnet.md — 6 types (Canny/Depth/OpenPose/Scribble/MLSD/SAM), multi-ControlNet chaining, strength/start-end
Created: wiki/concepts/flux-architecture.md — unbundled loading, Dev vs Schnell, Guidance node, ControlNets as LoRAs
Created: wiki/concepts/video-generation-models.md — Wan 2.1/2.2 (1.3B/5B/14B), T2V vs I2V, frame math, FP16/FP8, Hunyuan World
Created: wiki/concepts/ip-adapter.md — style transfer via image encoder, Instant ID, Outfit Anyone workflow
Fixed phantoms (in index but no file):
Created: wiki/concepts/multi-agent-systems.md — 6 coordination patterns, framework overview
Created: wiki/concepts/diffusion-models.md — full pipeline, latent space, all components, SDXL vs FLUX
Created: wiki/concepts/agentic-workflows.md — agentic vs deterministic, 95% rule, production pillars
Created: wiki/concepts/agent-deployment.md — serverless inference, ComfyUI→Replicate workflow, API-first pattern
Updated: wiki/index.md — added Module 1 section (7 entries), updated phantom page descriptions, removed duplicate diffusion-models from AI/ML section

## [2026-04-11] ingest | Phase 2 Batch D (partial) — comfyui-workflow-system
Source: raw/courses/Data_Doc_main.txt lines 1–2703
Created: wiki/concepts/comfyui-workflow-system.md — DAG architecture, all core nodes, SDXL vs FLUX loading, KSampler params
Updated: wiki/index.md, wiki/log.md

## [2026-04-09] ingest | Wiki initialization — structure, CLAUDE.md, templates
Infrastructure created: CLAUDE.md, templates/, wiki/ directory structure
This is the founding entry for this knowledge base.

## [2026-04-11] update | BONUS PHASE — 3 remaining concept pages
Source: raw/courses/Data_Doc_main.txt (Module 1 L14, Module 2 L11/L12, Module 3 L8)
Created: wiki/concepts/tool-calling-architecture.md — 3-layer arch (LLM→Execution Env→Tool), dual-call pattern, JSON schema, MCP as M+N standardization, context pollution problem
Created: wiki/concepts/llm-cost-economics.md — agent vs workflow cost calculator, 64.9% savings data (₹75K/day → ₹26K/day), Jevons Paradox applied to AI, model tiering, cost per task methodology
Created: wiki/concepts/replicate-deployment.md — serverless GPU inference, ComfyUI→Replicate full workflow, per-second billing by GPU type, Jarvis Labs vs Replicate, monetization path
Updated: wiki/index.md — added 3 entries under Module 2 and Architecture sections
Updated: wiki/overview.md — "What's Missing" cleared; rebuild marked fully complete
REBUILD STATUS: ALL PHASES COMPLETE — ~38 pages created across 2 sessions

## [2026-04-21] ingest | 100x L05 — ControlNets, IP Adapters & Flux Intro (2026-03-27)
Source: raw/courses/Lecture_05_ControlNets_IP_Adapters_Flux.txt
Created: wiki/sources/100x-l05-controlnet-ip-adapters.md
Created: wiki/concepts/inpainting-workflow.md — VAE Encode for Inpainting, grow_mask, mask editor, segmentation auto-masking
Updated: wiki/concepts/controlnet.md — source_count 1→2, added inpainting connection, updated Introduced by
Updated: wiki/concepts/ip-adapter.md — source_count 1→2, added Image Batch Multi (5-image blending), updated Introduced by
Updated: wiki/index.md — marked old module1-diffusion source as replaced, added L05 source entry, added inpainting-workflow concept entry
Note: 100x-cohort7-module1-diffusion.md marked [REPLACED] — individual lecture sources now supersede the old combined page

## [2026-04-21] ingest | 100x L06 — Flux LoRA Training (2026-03-28)
Source: raw/courses/Lecture_06_Flux_LoRA_Training.txt
Created: wiki/sources/100x-l06-flux-lora-training.md
Updated: wiki/concepts/lora-training.md — source_count 1→2, dataset specs corrected (face 15-25, product 15-20), JavasLabs setup + CUDA debug section added, Introduced by → L06
Updated: wiki/concepts/flux-architecture.md — source_count 1→2, fp8_e4m3fn_fast weight_type, dual CLIP specifics (clip_l + t5xxl), Introduced by → L06
Updated: wiki/index.md — added L06 source entry

## [2026-04-21] ingest | 100x L08 — ComfyUI Nodes to Money (2026-04-04)
Source: raw/courses/Lecture_08_ComfyUI_Nodes_to_Money.txt
Created: wiki/sources/100x-l08-comfyui-nodes-to-money.md
Created: wiki/concepts/comfyui-vs-proprietary.md — 9-vs-6 scorecard, 10 products, decision rules, transferable node-thinking skill
Updated: wiki/concepts/comfyui-workflow-system.md — source_count 1→2, commercial framing added, filmmaking role clarified, Introduced by → L08
Updated: wiki/index.md — added L08 source entry, added comfyui-vs-proprietary concept entry

## [2026-04-21] ingest | 100x L09 — Intro to FreePik Spaces (2026-04-10)
Source: raw/courses/Lecture_09_Intro_FreePik_Spaces.txt
Created: wiki/sources/100x-l09-intro-freepik-spaces.md
Created: wiki/concepts/freepik-platform.md — AI aggregator model roster, navigation, data privacy, commercial licensing
Updated: wiki/concepts/video-generation-models.md — source_count 1→2, proprietary video ecosystem (CDance/Kling/VO3) added with pricing, Introduced by → L07 (old) + L09
Updated: wiki/index.md — added L09 source entry, added freepik-platform concept entry

## [2026-04-21] ingest | 100x L10 — Branding & Marketing FreePik Spaces (2026-04-11)
Source: raw/courses/Lecture_10_Branding_Marketing_FreePik_Spaces.txt
Created: wiki/sources/100x-l10-branding-marketing-freepik-spaces.md
Created: wiki/concepts/freepik-spaces-workflows.md — all Spaces nodes, UGC pipeline, AI influencer pipeline architecture, credit optimization
Updated: wiki/index.md — added L10 source entry, added freepik-spaces-workflows concept entry

## [2026-04-21] ingest | 100x L11 — AI Influencer & UGC Product Ads (2026-04-17)
Source: raw/courses/Lecture_11_AI_Influencer_UGC_Product_Ads.txt
Created: wiki/sources/100x-l11-ai-influencer-ugc-product-ads.md
Created: wiki/concepts/ai-influencer-pipeline.md — character design principles, 9-image reference set, 4-column pipeline, @ syntax, credit strategy
Updated: wiki/index.md — added L11 source entry, added ai-influencer-pipeline concept entry

## [2026-04-21] ingest | 100x L12 — Filmmaking, Storyboarding & Interpolations (2026-04-18)
Source: raw/courses/Lecture_12_Filmmaking_Storyboarding_Interpolations.txt
Created: wiki/sources/100x-l12-filmmaking-storyboarding-interpolations.md
Created: wiki/concepts/ai-filmmaking-workflow.md — 6-phase filmmaking process, two video strategies, storyboarding method, live ad breakdown
Created: wiki/concepts/cinematic-shot-node.md — Camera/Lens/Focal Length/Aperture controls, shot cheat sheet
Updated: wiki/index.md — added L12 source entry, added ai-filmmaking-workflow and cinematic-shot-node concept entries

## [2026-04-21] update | Module 1 source restructure — individual lectures replace combined page
Updated: wiki/sources/100x-cohort7-module1-diffusion.md — scope narrowed to L01-L04 + L07 only; L05-L12 now in individual source pages; lecture table updated to show which lectures moved where
Updated: wiki/concepts/comfyui-workflow-system.md — Introduced by updated from old module1 → L08
Updated: wiki/concepts/lora-training.md — Introduced by updated from old module1 → L06 (done in earlier batch)
Updated: wiki/concepts/flux-architecture.md — Introduced by updated from old module1 → L06 (done in earlier batch)
Updated: wiki/concepts/controlnet.md — Introduced by updated to include L05 (done in earlier batch)
Updated: wiki/concepts/ip-adapter.md — Introduced by updated to include L05 (done in earlier batch)
Updated: wiki/concepts/diffusion-models.md — Introduced by clarified to early lectures (L01-L03), points to old module1 page for L01-L04 content
Updated: wiki/concepts/video-generation-models.md — Introduced by updated to include L09 alongside old module1 (L07)
Module 1 concept pages with new individual lecture sources: 8 pages updated
New concept pages created this session: comfyui-vs-proprietary, freepik-platform, freepik-spaces-workflows, ai-influencer-pipeline, ai-filmmaking-workflow, cinematic-shot-node, inpainting-workflow (7 total)
New source pages created this session: L05, L06, L08, L09, L10, L11, L12 (7 total)

## [2026-04-21] update | Post-ingest audit — stale data cleanup
Fixed 9 issues found by audit across concept and source pages:
- concepts/controlnet.md: removed old module1 from Introduced by (L05 only)
- concepts/ip-adapter.md: removed old module1 from Introduced by (L05 only); added face consistency warning (LoRA required for 1:1 accuracy, per L05)
- concepts/video-generation-models.md: renamed stale "Advanced video workflows (Lecture 12)" header → "Advanced WAN/Hunyuan techniques (from L07)"; added L10/L11/L12 to Introduced by
- sources/100x-cohort7-module1-diffusion.md: updated Summary to only describe L01-L04+L07 scope; removed LoRA training bullet (L06, not in this page); removed Replicate deployment bullet (L14, not in this page)
