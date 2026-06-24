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

## [2026-04-30] ingest | 100x L13+L14 (Diffusion Module final) + L18–22 (LLM Fine-tuning)
Source files: raw/courses/L13_Notes_Short.txt, L14_Notes_Short.txt, L18_22_Notes_Detailed_C6.txt

### Module 1 — L13 + L14 (Diffusion Module complete)
Created: wiki/sources/100x-l13-freepik-3d-motion-upscaling.md — 3D Scenes/Gaussian Splat, Motion Control, Upscaling, Kling 4K, GPT Image 2
Created: wiki/sources/100x-l14-heygen-elevenlabs-content-pipeline.md — HeyGen+ElevenLabs pipeline, AI content stack, AI news summary
Created: wiki/concepts/gaussian-splat-3d-scenes.md — 3D Scenes feature, spatial reference, character placement workflow, camera controls
Created: wiki/concepts/image-upscaling-ai.md — Precision vs Creative (Magnific), Topaz for video, workflow timing rule
Created: wiki/concepts/motion-control-video.md — Kling Motion Control, real actor motion transfer, CDance 2.0 comparison
Created: wiki/concepts/voice-cloning.md — ElevenLabs 3 clone types, key settings, multilingual, Voice Changer, open-source alts
Created: wiki/concepts/ai-avatar-system.md — HeyGen avatar training, Avatar 3 vs 5, full production pipeline
Created: wiki/concepts/ai-content-pipeline.md — AVTV complete stack: Script→HeyGen+ElevenLabs→FreePik Spaces→Edit→Suno
Created: wiki/entities/pranay.md — Diffusion Module instructor, Module 1 L01–L14
Created: wiki/entities/heygen.md — AI avatar platform
Created: wiki/entities/elevenlabs.md — Voice cloning platform
Updated: wiki/concepts/freepik-platform.md — source_count 2→4; added 3D Scenes, Upscaling, Motion Control, Kling 4K, GPT Image 2, Audio sections
Updated: wiki/sources/100x-cohort7-module1-diffusion.md — added L13 + L14 to individual source table; Module 1 now complete (L01–L14)

### Module 2 Extension — L18–22 (LLM Fine-tuning)
Created: wiki/sources/100x-l18-22-llm-finetuning.md — all 5 lectures: fine-tuning levers, SFT techniques, data prep, hyperparameters, eval, Siddhant master framework + MCP Generative UI
Created: wiki/concepts/llm-fine-tuning.md — 5-lever escalation, when right/wrong, training lifecycle (pre-train/SFT/alignment), cost model
Created: wiki/concepts/sft-techniques.md — Full fine-tuning, LoRA (~2%), QLoRA (4-bit); VRAM table; base model selection
Created: wiki/concepts/fine-tuning-data-prep.md — 4 pillars, 5-step recipe, JSON annotation format, Distilabel
Created: wiki/concepts/fine-tuning-hyperparameters.md — all hyperparams, Axolotl YAML reference, log reading guide
Created: wiki/concepts/llm-evaluation-methods.md — 4 eval methods, rubric design, human-verified eval loop, LLM-judge biases
Created: wiki/entities/axolotl.md — YAML-based fine-tuning framework
Created: wiki/entities/llama-factory.md — GUI-based fine-tuning, Windows-friendly

### Synthesis Pages
Created: wiki/synthesis/diffusion-module-complete-stack.md — Full Module 1 (L08–L14) production pipeline synthesis
Created: wiki/synthesis/llm-customization-master-framework.md — context vs behaviour framework, fine-tuning decision tree, RAG vs fine-tune, MCP Generative UI synthesis

### Concept Page Updates
Updated: wiki/concepts/mcp-model-context-protocol.md — source_count 2→3; added Linux Foundation governance, Generative UI (Ajax moment), Tool Search Tool, Programmatic Tool Calling details, MCP vs CLI debate
Updated: wiki/concepts/llm-as-judge.md — source_count 1→2; added fine-tuning eval loop context, known biases in fine-tuning eval, link to new llm-evaluation-methods
Updated: wiki/concepts/lora-training.md — source_count 2→3; added LLM LoRA section (rank/alpha conventions, portability, ~2% params, tools)
Updated: wiki/concepts/programmatic-tool-calling.md — source_count 1→2; added L22 recursive architecture detail, Claude Skills mechanism
Updated: wiki/sources/100x-cohort7-module2-llm.md — added Fine-Tuning Extension section (L18–22 summary)
Updated: wiki/index.md — all new source/concept/entity/synthesis pages added

## [2026-04-21] update | Post-ingest audit — stale data cleanup
Fixed 9 issues found by audit across concept and source pages:
- concepts/controlnet.md: removed old module1 from Introduced by (L05 only)
- concepts/ip-adapter.md: removed old module1 from Introduced by (L05 only); added face consistency warning (LoRA required for 1:1 accuracy, per L05)
- concepts/video-generation-models.md: renamed stale "Advanced video workflows (Lecture 12)" header → "Advanced WAN/Hunyuan techniques (from L07)"; added L10/L11/L12 to Introduced by
- sources/100x-cohort7-module1-diffusion.md: updated Summary to only describe L01-L04+L07 scope; removed LoRA training bullet (L06, not in this page); removed Replicate deployment bullet (L14, not in this page)

## [2026-06-24] update | Source file split — module2-llm refactored for scalability
Problem: 100x-cohort7-module2-llm.md was becoming too long (9 lectures remaining = ~700+ lines projected).
Fix: Split into 4 files — overview + 3 lecture-group detail pages.
Updated: wiki/sources/100x-cohort7-module2-llm.md — stripped to module overview only (summary, lecture table, key ideas, entity/concept links)
Created: wiki/sources/100x-cohort7-module2-l01-l03.md — full L01/L02/L03 detail (moved from overview)
Stub entries added to index: 100x-cohort7-module2-l04-l06 and 100x-cohort7-module2-l07-l10 (pending ingest)
Updated: wiki/index.md — 4 entries replacing 1

## [2026-06-24] update | Entity rename: EOS Labs → AEOS Labs (Vishal correction)
Correct name confirmed: AEOS Labs (not EOS Labs / AOS Labs as appeared in transcripts).
Created: wiki/entities/aeos-labs.md — canonical page with corrected name throughout
Updated: wiki/entities/eos-labs.md — now redirect stub pointing to [[aeos-labs]]
Updated 6 files: wiki/entities/100x-engineers.md, wiki/concepts/fde-forward-deployed-engineer.md, wiki/concepts/production-genai-stack.md, wiki/sources/100x-cohort7-module2-l01-l03.md, wiki/sources/100x-cohort7-module2-llm.md, wiki/index.md
Added: CLAUDE.md §10 Known Entity Name Corrections — future sessions will use AEOS Labs automatically

## [2026-06-24] ingest | 100x Cohort 7 Module 2 (C7) — L01, L02, L03 live transcripts
Source files: raw/courses/Live_Lecture_01-_Orientation__Idea_to_App_Workshop_Combined(...).VTT, Live_Lecture_02_-_State_of_AI_2026_Combined(...).VTT, Live_Lecture_03_-_The_First_Interface_Combined(...).VTT
Note: C7 is a complete curriculum redesign. Old C6 content (17 lectures: Gradio/FastAPI/Supabase/RAG/MCP) deleted and replaced.

### Pages rewritten
Updated: wiki/sources/100x-cohort7-module2-llm.md — FULL REWRITE. Deleted all C6 content. New C7 content: module summary, lecture table (L01–L10), L01/L02/L03 full sections.

### New concept pages
Created: wiki/concepts/idea2app-v2.md — IDEA2App V2 / Scientific Discovery Method: 5-step hypothesis, MOM Test simulation, 21-day manual MVP, Discovery to MVP Coach skill
Created: wiki/concepts/ai-adoption-gap.md — GenAI Value Paradox (McKinsey 80/80), AI Transformation Gap Index, intelligence race → systems race shift
Created: wiki/concepts/fde-forward-deployed-engineer.md — FDE role: domain expertise × AI system design; 4 skills (workflow diagnosis, self-improving systems, evals, guardrails)
Created: wiki/concepts/interface-types.md — Interface definition from first principles; UI vs frontend vs API; LLM as SafeTensor files; meme as highest-compression interface

### New entity pages
Created: wiki/entities/eos-labs.md — AOS/EOS Labs (Tejas + Varun + Pranay); Amazon Prime/Netflix/Ogilvy contracts; FDE model case study

### Updated existing pages
Updated: wiki/concepts/opt-framework.md — added C7 extension: OPT Coach skill, FDE workflow diagnosis connection
Updated: wiki/concepts/deterministic-vs-generative-separation.md — source_count 2→3, added 100x-cohort7-module2-llm to Introduced by, added interface-types to Connections
Updated: wiki/entities/siddhant.md — updated C7 module descriptions, added Discovery to MVP Coach skill credit
Updated: wiki/index.md — module2-llm entry updated; new Module 2 C7 concept section added (4 entries); eos-labs entity added

### Contradiction flagged
> [!warning] C7 curriculum is NOT a continuation of C6 — it is a complete redesign. The old source page described 17 C6 lectures (Gradio/FastAPI/Supabase/RAG/MCP). C7 L01–L03 have entirely different content (product methodology, FDE role, interface fundamentals). The 100x-cohort7-module2-llm source page has been completely rewritten to reflect C7 content only.

## [2026-06-24] ingest | 100x Cohort 7 Module 2 — L04, L05, L06
Source: raw/courses/ (3 VTT transcripts: L04 Working with UI Code Path, L05 Intro to API The Second Interface, L06 Building APIs with FastAPIs Code Path)

### New source pages
Created: wiki/sources/100x-cohort7-module2-l04-l06.md — L04 (Gradio UI, HF Spaces deploy), L05 (HTTP/API from first principles, JSON, HTTP methods, Groq Cloud), L06 (FastAPI backend, messages roles, uvicorn, local dev, cloud deploy)

### New concept pages
Created: wiki/concepts/gradio-framework.md — gr.Interface vs gr.ChatInterface; streaming; HF Spaces deploy pattern; frontend-backend split
Created: wiki/concepts/http-rest-api.md — HTTP from first principles; URL+method+JSON+response; GET/POST/PUT/DELETE; CRUD; API keys; JSON

### Updated source pages
Updated: wiki/sources/100x-cohort7-module2-llm.md — filled in L04-L06 Concepts Introduced (was "pending ingest")

### Updated concept pages
Updated: wiki/concepts/fastapi-patterns.md — source_count 2→3; added l04-l06 to Introduced by
Updated: wiki/concepts/interface-types.md — source_count 1→2; added l04-l06 to Introduced by

### Updated index
Updated: wiki/index.md — l04-l06 entry description updated; gradio-framework and http-rest-api entries added under Module 2 concepts; interface-types description updated

## [2026-06-24] ingest | 100x Cohort 7 Module 2 — L07, L08, L10
Source: raw/courses/ (3 VTT transcripts: L07 Introduction to Databases and Domain Modeling, L08 Connecting the Dots + Databases + Supabase Code Path, L10 Live MVP Build + Deploy Code Path)
Note: L09 not recorded/released — absent from curriculum.

### New source pages
Created: wiki/sources/100x-cohort7-module2-l07-l10.md — L07 (amnesia problem, ACID, domain modeling, CRUD test, PKs/FKs), L08 (relational vs NoSQL, Supabase setup, SQL interface, FastAPI+Supabase connection), L10 (function-first approach, golden I/O pairs, eval-first design, Render deploy, Gradio frontend, Supabase Auth, unit economics, hackathon announcement)

### New concept pages
Created: wiki/concepts/database-fundamentals.md — amnesia problem, storage hierarchy (RAM/file/DB), ACID guarantees, relational vs NoSQL decision heuristic, read/write ratio analysis
Created: wiki/concepts/eval-first-design.md — golden I/O pairs, eval rubric via LLM-as-judge, spec-driven dev (CLAUDE.md plan-review mode), multi-model eval strategy
Created: wiki/concepts/mvp-build-cycle.md — function-first sequence, FastAPI endpoint, Render Web Service deploy, Gradio/HF Spaces frontend, auth + rate limiting, unit economics

### New entity pages
Created: wiki/entities/supabase.md — managed PostgreSQL + Auth + REST API; open source; 50K MAU free; RLS; PII masking; alternatives (Clerk)

### Updated concept pages
Updated: wiki/concepts/domain-modeling.md — source_count 1→2; added CRUD test table for entity vs attribute; added database-fundamentals + supabase to Connections; added l07-l10 to Introduced by

### Updated source pages
Updated: wiki/sources/100x-cohort7-module2-llm.md — filled in L07–L10 Concepts Introduced (was "pending ingest")

### Updated index
Updated: wiki/index.md — l07-l10 entry description updated; 3 new concept entries added; supabase entity description updated

## [2026-06-24] lint | Full wiki audit post-Module-2 ingest

### Check 1 — Stale concept pages
Updated: wiki/concepts/fastapi-patterns.md — added L06 Minimal Pattern section (dict body, OS env vars, Groq SDK, message roles); added l07-l10 to Introduced by
Updated: wiki/concepts/interface-types.md — added Interface Selection Decision Framework (L04 form-vs-chat table); source_count 2→3; added l01-l03 to Introduced by

### Check 2 — Orphan pages
Fixed: wiki/persona.md — was unreferenced; added to wiki/index.md under Navigation section
No true orphans found in concepts/entities/synthesis directories.

### Check 3 — source_count accuracy
Fixed (systematic gap: module2-llm overview added to Concepts Introduced after detail pages existed without backfilling):
- wiki/concepts/idea2app-v2.md: 1→2; added l01-l03 to Introduced by
- wiki/concepts/ai-adoption-gap.md: 1→2; added l01-l03 to Introduced by
- wiki/concepts/fde-forward-deployed-engineer.md: 1→2; added l01-l03 to Introduced by
- wiki/concepts/gradio-framework.md: 1→2; added module2-llm to Introduced by
- wiki/concepts/http-rest-api.md: 1→2; added module2-llm to Introduced by
- wiki/concepts/database-fundamentals.md: 1→2; added module2-llm to Introduced by
- wiki/concepts/eval-first-design.md: 1→2; added module2-llm to Introduced by
- wiki/concepts/mvp-build-cycle.md: 1→2; added module2-llm to Introduced by
- wiki/concepts/opt-framework.md: 2→3; added l01-l03 to Introduced by
- wiki/concepts/deterministic-vs-generative-separation.md: 3→5; added l01-l03 and l07-l10 to Introduced by
- wiki/concepts/llm-as-judge.md: 2→4; added module2-llm and l07-l10 to Introduced by

### Check 4 — Outdated/conflicting claims
Fixed: wiki/sources/100x-cohort7-module2-l01-l03.md — "EOS/AOS Labs as case study" → "AEOS Labs as case study"
Fixed: wiki/concepts/fde-forward-deployed-engineer.md — "EOS/AOS Labs counter-example:" → "AEOS Labs counter-example:"; "chose EOS because" → "chose AEOS Labs because"
No C6 curriculum framing found in concept pages (C7 rewrite already handled in prior sessions).
No contradictions found beyond the Supabase warning already present in l07-l10 source page.

### Check 5 — Missing concept pages
Created: wiki/entities/groq-cloud.md — Groq Cloud inference platform; mentioned in l04-l06 and l07-l10 without entity page

### Check 6 — Index completeness
Removed phantom entries (in index, no file):
- [[prompt-engineering]] (AI/ML section)
- [[ai-chief-of-staff-pattern]] (Knowledge Management section)
- [[llm-application-architecture]] (Architecture & Systems section)
- [[anthropic]] (Companies/Programs section)
- [[obsidian]] (Tools section)
- [[n8n]] (Tools section)
Removed duplicates:
- [[vibe-coding]] second entry (Knowledge Management; canonical is Module 2 Full-Stack LLM)
- [[inpainting-workflow]] second entry (duplicate in Module 1 Diffusion section)
Added: [[groq-cloud]] under Tools
Added: [[persona]] under Navigation

### Summary
Pages updated: 16 (12 source_count fixes + 2 stale content + 2 EOS Labs)
Pages created: 1 (groq-cloud entity)
Index entries removed: 8 (6 phantoms + 2 duplicates)
Index entries added: 2 (groq-cloud + persona)
Open contradictions for Vishal's judgment: none (Supabase-vs-NoSQL contradiction already documented in l07-l10 source page)
