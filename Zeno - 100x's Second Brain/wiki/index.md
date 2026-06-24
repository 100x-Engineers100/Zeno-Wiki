# Wiki Index
Master content catalog. Updated on every ingest.
Format: `- [[page-name]] — one-line description`

---

## Sources
- [[karpathy-llm-wiki-pattern]] — Karpathy's pattern for building persistent, compounding knowledge bases with LLMs instead of RAG
- [[rsarver-ai-chief-of-staff]] — VC builds AI chief of staff "Stella" with memory architecture and Kaizen self-improvement loop
- [[100x-cohort7-module1-diffusion]] — 100x Cohort 7 Module 1 early lectures (L01–L04, L07 only): orientation, GenAI history, diffusion mechanics, SDXL, video models in ComfyUI
- [[100x-l05-controlnet-ip-adapters]] — L05: ControlNet (8 preprocessor types, Union model), IP Adapters (structural vs semantic), inpainting, seed locking
- [[100x-l06-flux-lora-training]] — L06: FLUX 3-node setup (fp8, dual CLIP, VAE), LoRA training on JavasLabs, dataset specs, live CUDA debug, Redux/ControlNet in FLUX
- [[100x-l08-comfyui-nodes-to-money]] — L08: ComfyUI as pipeline engine not image tool, 9-vs-6 scorecard vs proprietary, 10 buildable products, AI films as biggest opportunity
- [[100x-l09-intro-freepik-spaces]] — L09: FreePik as AI aggregator, model roster (Imagen/Kling/CDance/VO3), video pricing, data privacy, live UGC demo
- [[100x-l10-branding-marketing-freepik-spaces]] — L10: FreePik Spaces node-based pipeline, UGC workflow automation, prompt strategy, when Spaces vs ComfyUI
- [[100x-l11-ai-influencer-ugc-product-ads]] — L11: AI influencer creation (9-image reference set, 4-column pipeline), product ad assembly, @ syntax, credit strategy
- [[100x-l12-filmmaking-storyboarding-interpolations]] — L12: 6-phase filmmaking process, Cinematic Shot node, storyboarding, interpolation vs direct prompting, Video Combiner
- [[100x-l13-freepik-3d-motion-upscaling]] — L13: FreePik 3D Scenes (Gaussian Splat), Motion Control (Kling), Precision/Creative upscaling, Kling 4K
- [[100x-l14-heygen-elevenlabs-content-pipeline]] — L14: HeyGen avatar pipeline, ElevenLabs voice clone, AI content production stack (AVTV workflow)
- [[100x-cohort7-module2-llm]] — 100x Cohort 7 Module 2 (C7): module overview + lecture table (L01–L10); links to detail pages
- [[100x-cohort7-module2-l01-l03]] — C7 L01–L03 detailed notes: IDEA2App V2, AI adoption gap, FDE role, interface fundamentals
- [[100x-cohort7-module2-l04-l06]] — C7 L04–L06: Gradio UI, HF Spaces deploy, HTTP/REST/JSON from first principles, FastAPI backend pattern
- [[100x-cohort7-module2-l07-l10]] — C7 L07–L10 detailed notes: amnesia problem, ACID, domain modeling, Supabase integration, eval-first design, live MVP build + Render deploy
- [[100x-l18-22-llm-finetuning]] — L18–22: LLM fine-tuning from first principles — 5 levers, 3 SFT techniques, data prep, hyperparameters, evaluation, MCP Generative UI
- [[100x-cohort7-module3-agents]] — 100x Cohort 7 Module 3: AI agents — ReAct, multi-agent systems, MCP, production patterns, deployment
- [[six-easy-pieces-for-llms]] — First-principles guide to full-stack LLM apps: UI/server split, HTTP, APIs, databases, RLS, complete architecture
- [[connecting-llm-dots]] — Two-lever LLM optimization framework: hallucination formula, context optimization path, behaviour optimization path

---

## Concepts

### AI / Machine Learning
- [[generative-ai-history]] — 80-year arc from McCulloch-Pitts neurons (1940s) to ChatGPT (2022) and why now is different
- [[hallucination-and-grounding]] — Hallucination = Uncertainty × Forced Response; three-layer grounding architecture; liability implications
- [[structured-io-llm]] — Bridging probabilistic LLM outputs to deterministic systems via JSON; clean separation of concerns
- [[retrieval-augmented-generation]] — RAG: augmenting LLM context with retrieved documents; three levels; five-level spectrum; when to use vs. tool calling
- [[retrieval-spectrum]] — Five retrieval levels: keyword → semantic/vector → PageIndex (98.7%) → knowledge graph → RLMs
- [[context-economy]] — Context window as scarce resource; three token costs; domain modeling first; routing architecture
- [[ai-agents-react]] — ReAct loop, hard problems (infinite loops, compounding errors), AAA progression, multi-agent patterns
- [[multi-agent-systems]] — Multiple specialized agents working together; 6 coordination patterns; when to use over single-agent
- [[aaa-agent-progression]] — Assisted → Accelerated → Autonomous; increase autonomy only as reliability increases
- [[mcp-model-context-protocol]] — Stateless protocol for LLM-tool and agent-to-agent communication; REST for AI

### Knowledge Management & Productivity
- [[llm-wiki-pattern]] — LLM-maintained persistent wiki vs. RAG; three layers (raw/wiki/schema); three operations (ingest/query/lint)
- [[ai-memory-architecture]] — Two-layer memory (daily notes + curated long-term); flat markdown; read on startup
- [[opt-framework]] — Operating Model → Processes → Tasks: three-level framework for identifying AI automation opportunities
- [[deterministic-vs-generative-separation]] — LLMs handle judgment; scripts handle everything deterministic; mixing layers breaks trust

### Cross-Module Frameworks (100x Cohort 7)
- [[ppt-framework]] — Principle→Process→Tool: meta-learning framework; tools change, principles don't; the single most important concept of the cohort
- [[llm-decision-tree]] — Diagnose context vs behaviour failure first; complete escalation ladder for both levers
- [[hallucination-formula]] — f(Uncertainty × Forced Response); hallucination is a system design problem, not a model bug
- [[six-easy-pieces-philosophy]] — First-principles chain: physical separation → HTTP → API → database → RLS → complete architecture

### Module 1 — Diffusion (100x Cohort 7)
- [[gaussian-splat-3d-scenes]] — FreePik 3D Scenes; Gaussian Splat from any image; fixed spatial reference solving environment inconsistency
- [[image-upscaling-ai]] — Precision (Magnific, pixel-accurate) vs Creative (diffusion-based) upscaling; Topaz for video; workflow timing rule
- [[motion-control-video]] — Kling Motion Control; real actor motion transfer to AI character; vs CDance 2.0 for physics
- [[voice-cloning]] — ElevenLabs Voice Design/Instant/Professional Clone types; key settings; multilingual; Voice Changer
- [[ai-avatar-system]] — HeyGen avatar training and pipeline; Avatar 3 vs 5; never use HeyGen's built-in voice
- [[ai-content-pipeline]] — Complete AVTV production stack: Script→HeyGen+ElevenLabs→FreePik Spaces→Edit→Suno
- [[diffusion-models]] — Forward/reverse diffusion; latent space; VAE; CLIP; KSampler; SDXL vs FLUX architecture
- [[comfyui-workflow-system]] — DAG node architecture; KSampler; core nodes; SDXL vs FLUX loading; commercial framing; transferable node-thinking skill
- [[comfyui-vs-proprietary]] — ComfyUI 9 vs Proprietary 6 scorecard; decision rules; 10 buildable products; transferable node-based skill
- [[controlnet]] — 8 preprocessor types; Union model; multi-ControlNet chaining; FLUX ControlNet as LoRA; inpainting connection
- [[flux-architecture]] — Unbundled 3-node setup (fp8, clip_l+t5xxl, VAE); Dev vs Schnell; Guidance node; Redux; ControlNets as LoRAs
- [[lora-training]] — Trigger words, rank, LR by use case; AI Toolkit (FLUX) vs KohyaSS (SDXL); dataset specs; JavasLabs setup; CUDA debug
- [[ip-adapter]] — Style transfer via image encoder; Instant ID; Image Batch Multi (5-image blending); FLUX Redux equivalent
- [[inpainting-workflow]] — VAE Encode for Inpainting; mask editor; grow_mask; segmentation auto-masking
- [[video-generation-models]] — WAN 2.1/2.2 (1.3B/14B/5B); T2V vs I2V; frame math; FP16/FP8; CDance/Kling/VO3 proprietary ecosystem; pricing
- [[freepik-platform]] — AI aggregator; Imagen/Kling/CDance/VO3 model roster; navigation; data privacy; commercial licensing
- [[freepik-spaces-workflows]] — Node-based pipeline in FreePik; UGC pipeline; AI influencer pipeline; prompt strategy; credit optimization
- [[ai-influencer-pipeline]] — Fictional digital persona creation; 9-image reference set; 4-column Spaces pipeline; @ syntax; product ad assembly
- [[ai-filmmaking-workflow]] — 6-phase process (narrative→character→storyboard→scenes→video→combine); interpolation vs direct prompting
- [[cinematic-shot-node]] — Camera/Lens/Focal Length/Aperture controls; shot-type cheat sheet; cinematography vocabulary for AI

### Module 2 — Product Methodology + Full-Stack LLM (100x Cohort 7 C7)
- [[idea2app-v2]] — Scientific Discovery Method for MVP validation: 5-step falsifiable hypothesis + MOM Test simulation + 21-day manual pilot
- [[ai-adoption-gap]] — GenAI Value Paradox: 80% adopted, 80% no value; only 20% frontier model utilization; trillion-dollar deployment opportunity
- [[fde-forward-deployed-engineer]] — Forward Deployed Engineer: domain expertise × AI system design; 4 skills (workflow diagnosis, self-improving systems, evals, guardrails)
- [[interface-types]] — Interface hierarchy from first principles: UI (human↔machine) vs API (machine↔machine); frontend ≠ UI; LLM as SafeTensor files; Gradio form vs chat
- [[gradio-framework]] — Python library for browser UIs in 4 lines; gr.Interface (form) vs gr.ChatInterface (chat); HF Spaces deploy
- [[http-rest-api]] — HTTP from first principles: URL+method+JSON+response; GET/POST/PUT/DELETE; CRUD; JSON as universal language
- [[database-fundamentals]] — Amnesia problem → storage hierarchy (RAM/file/DB) → ACID guarantees → relational vs NoSQL decision heuristic
- [[eval-first-design]] — Define "what good looks like" before building: golden I/O pairs, eval rubric via LLM-as-judge, spec-driven dev (CLAUDE.md)
- [[mvp-build-cycle]] — Function-first → eval → FastAPI endpoint → Render deploy → Gradio/HF Spaces UI → auth + rate limiting

### Module 2 — Full-Stack LLM + Fine-Tuning (100x Cohort 7)
- [[full-stack-llm-architecture]] — 5-component structure (UI/API/AI/DB/Deploy), 3 interface types, 3-level stack evolution
- [[domain-modeling]] — Entities/attributes/relationships; 1:1/1:N/M:N; PKs/FKs; ERD before code; Supabase RLS
- [[fastapi-patterns]] — Pydantic validation, decorators, async def, CRUD mapping, Uvicorn, auto-docs
- [[ship-cycle]] — 9-step PRD→Lovable→GitHub→Cursor→tests→deploy workflow; GIGO principle; tool specialization
- [[llm-wrappers]] — App built on LLM APIs; defensibility via UX/prompting/integration; Perplexity/Cursor as examples
- [[vibe-coding]] — PRD-driven AI code generation; GIGO principle; Lovable/Cursor/Claude Code tool roles
- [[production-genai-stack]] — Next.js + FastAPI + Supabase + Pinecone + Redis + Langfuse/Sentry full stack
- [[cost-optimization-patterns]] — Redis caching, model tiering, prompt efficiency, rate limiting, streaming
- [[embedding-model-selection]] — MTEB/RTEB leaderboard; start small (384-dim), scale up; indexing=querying model rule
- [[tool-calling-architecture]] — 3-layer arch (LLM→Execution Env→Tool); dual-call pattern; JSON schema; MCP as M+N standardization; context pollution
- [[llm-fine-tuning]] — 5 levers (prompting→context→RAG→workflow→fine-tuning); when right/wrong; 3-stage training lifecycle; cost model
- [[sft-techniques]] — Full fine-tuning, LoRA (~2% weights, portable), QLoRA (4-bit, 1/4 VRAM); VRAM table; base model selection
- [[fine-tuning-data-prep]] — 4 pillars (accuracy/diversity/consistency/complexity); 5-step recipe; JSON annotation format; Distilabel tool
- [[fine-tuning-hyperparameters]] — Learning rate, warmup, epochs, batch size, LoRA rank/alpha, gradient accumulation; Axolotl YAML reference
- [[llm-evaluation-methods]] — 4 eval methods (benchmarks/LLM-judge/human/user-testing); rubric design; human-verified eval loop; known LLM-judge biases

### Architecture & Systems
- [[agentic-workflows]] — Agentic vs deterministic pipelines; 95% rule; production pillars; when agent loops are justified
- [[agent-deployment]] — Serverless inference; ComfyUI→Replicate deployment; API-first pattern; Jarvis Labs vs Replicate
- [[llm-cost-economics]] — 64.9% savings (agent→workflow); cost calculator methodology; Jevons Paradox applied to AI; model tiering strategy
- [[replicate-deployment]] — Serverless GPU inference; ComfyUI→Replicate full workflow; per-second billing; Jarvis Labs vs Replicate; monetization path

### AI Agents (Module 3 — 100x Cohort 7)
- [[agentic-loop]] — 6-step SPAORL cycle (Sense→Plan→Act→Observe→Reflect→Adapt); the loop is what makes an agent vs a workflow
- [[augmented-llm]] — LLM + Knowledge + Capabilities + Controller; prerequisite state before adding the reasoning loop
- [[react-framework]] — Thought→Action→Observation triplet; primary agent design pattern; basis for ReAct agents
- [[agentic-patterns]] — 6 multi-agent coordination patterns: Manager-Worker, Handoff, Routing, Parallelization, Orchestrator-Worker, Evaluator-Optimizer
- [[agent-production-pillars]] — 5 pillars: Patterns / Sessions+Memory / Tracing / Debugging / Evaluation+Guardrails
- [[guardrails-architecture]] — Deterministic layer before LLM; LlamaGuard (22M params, 7 categories); intent classification; Air Canada lesson
- [[pii-handling]] — 3-step pipeline: Identify → Anonymize/Encrypt → Decrypt; LLM never sees real PII
- [[llm-as-judge]] — Evaluation pattern; encode expert criteria as rubric; 50 QA pairs ground truth exercise
- [[agent-failure-modes]] — Devin (context anxiety, broken HITL, broken sensing) + Air Canada (hallucinated policy, LLM enforcing rules); mapped to SPAORL
- [[95-percent-rule]] — When NOT to use agents; test: can you define all steps in advance?
- [[programmatic-tool-calling]] — Execution env as primary orchestrator; LLM for intent only; context pollution problem; Tool Search Tool

---

## Entities

### People
- [[andrej-karpathy]] — Former VP AI Tesla / OpenAI researcher; creator of LLM Wiki pattern; influential AI educator
- [[sridev]] — CEO/Co-founder 100x Engineers; teaches Diffusion module; first-principles educator
- [[siddhant]] — CTO/Co-founder 100x Engineers; teaches LLM + Agents modules; 2 prior exits
- [[pranay]] — Instructor for Diffusion Module (L01–L14); ComfyUI + FreePik expert; 100x core team

### Companies / Programs
- [[100x-engineers]] — Applied AI education cohort; Cohort 7 (March-September 2026)
- [[aeos-labs]] — AEOS Labs: AI consulting/FDE firm; domain expertise + AI system design; Amazon Prime, Netflix, Ogilvy contracts

### Tools
- [[supabase]] — Managed PostgreSQL + Auth + REST API; open source / self-hostable; 50K MAU free tier; backbone of 100x C7 Module 2 backend
- [[lovable]] — AI UI prototyping tool; greenfield MVP generation from PRD; step 1 of ship cycle
- [[cursor-ai]] — AI code editor for codebase refinement; step 5 of ship cycle; pairs with Lovable
- [[langchain]] — LLM application framework; chains/agents/memory/retrieval abstractions; produces LangGraph
- [[langraph]] — Stateful graph-based agent workflows (by LangChain); nodes as actions, shared state
- [[crewai]] — Role-based multi-agent framework; crew metaphor with defined agent roles and goals
- [[autogen-microsoft]] — Microsoft Research conversable agent framework; code execution + HITL support
- [[llamaindex]] — Data framework for RAG pipelines; document indexing/retrieval; PageIndex pattern
- [[openai-swarm]] — Lightweight OpenAI framework for Handoff pattern; educational, not production
- [[langflow]] — Visual node-based LLM/agent builder (no-code); compiles to LangChain; used in Module 3 no-code track
- [[llama-guard]] — Meta's 22M param safety classifier; 7 harm categories; deterministic guardrail layer
- [[cognition-devin]] — World's first AI SWE; 3/20 task completion; documents 3 agent failure modes (context anxiety, broken HITL, broken sensing)
- [[heygen]] — AI avatar platform; trains digital clone from video; HeyGen+ElevenLabs = full A-roll automation
- [[elevenlabs]] — Voice cloning platform; Professional Clone, Voice Changer, multilingual TTS; backbone of AVTV pipeline
- [[axolotl]] — YAML-based LLM fine-tuning framework; LoRA/QLoRA/full; JarvisLabs template; single command train/merge
- [[llama-factory]] — GUI-based LLM fine-tuning (Windows-friendly); same controls as Axolotl via dropdowns; VRAM table
- [[groq-cloud]] — Fastest open-source LLM inference; Llama 3.3 70B; free tier; OpenAI-compatible API; primary inference provider for Module 2

---

## Synthesis
- [[diffusion-module-complete-stack]] — Full Module 1 production pipeline synthesis (L08–L14): ComfyUI vs FreePik, environment consistency, A-roll automation, complete AI content stack
- [[llm-customization-master-framework]] — Complete LLM customization framework: context vs behaviour binary, fine-tuning decision, MCP Generative UI, RAG vs fine-tuning non-confusion
- [[ai-knowledge-management]] — How Karpathy's wiki and rsarver's chief-of-staff patterns converge; implications for this vault
- [[module2-architecture-philosophy]] — Six Easy Pieces mapped to Module 2 lectures; philosophical justification for every layer of the full-stack
- [[llm-optimization-decision-tree]] — Two-lever framework fully synthesized; Lever 1 + Lever 2 escalation ladders; complete Module 2+3 curriculum map
- [[agent-vs-workflow-economics]] — 65% cost premium; 95% rule applied; failure statistics; decision framework with cost calculator
- [[production-failure-analysis]] — Devin (3 SPAORL failure modes) + Air Canada (LLM liability); deterministic layer mandate; builder liability
- [[full-cohort-decision-framework]] — Complete OPT→PRD→MVP→Full-Stack→LLM Decision Tree→Augmented LLM→Agents→Multi-Agent→MCP chain

---

## Navigation
- [[overview]] — Current state of the wiki, active knowledge domains, core thesis, priority gaps
- [[log]] — Full chronological history of ingests, queries, and updates
- [[persona]] — Zeno LLM persona instructions: how Siddhant's voice and teaching style should be embodied in query responses
