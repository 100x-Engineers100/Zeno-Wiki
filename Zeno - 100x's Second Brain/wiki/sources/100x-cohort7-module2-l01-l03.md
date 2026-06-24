---
title: "100x Cohort 7 Module 2 — L01, L02, L03: Product Thinking + Interface Fundamentals"
type: source
source_type: course_notes
author: "Siddhant (100x Engineers)"
date: 2026-05-23
raw_path: raw/courses/
tags: [ai, llm, 100x-cohort7, product-methodology, fde, interfaces, idea2app]
---

## Summary

First three lectures of Module 2 (C7). Covers product thinking before any code: validating problems scientifically (L01), the AI systems race and FDE role (L02), and interface fundamentals from first principles — what an interface actually is, and how UI → API → Backend → LLM chain works (L03).

Part of [[100x-cohort7-module2-llm]] (module overview).

---

## L01 — Orientation: Idea to App Workshop (2026-05-16)

**Instructor:** Siddhant  
**Track:** Combined

### Key Concepts

**The Arav Problem (cohort archetype)**  
Arav Deshpande is a composite persona: 31 saved project ideas, 6 months of AI tutorials, zero shipped products. Smart, ambitious, informed — but stuck in consumption over execution. Siddhant's core diagnostic: it's not a tool gap, it's a **navigation method** gap. The issue is absence of evidence, not absence of knowledge.

**Why action-first fails without validation**  
When students were given Arav's case and asked for solutions, they jumped immediately to "slow down, make a plan, use Claude." Siddhant's pushback: none of them asked to *talk to Arav first*. That's the pattern to break — don't build a solution until you've validated the problem with the actual person facing it.

**IDEA2App V2 — Scientific Discovery Method**  
Replaces the old PRD-first approach. The framework has three phases:

1. **Discovery Phase** — Build a falsifiable hypothesis with five kill conditions:
   - Observation (what you noticed)
   - Subject (demographic + behavior profile of who has the problem)
   - Evidence audit (what data exists; which is the most load-bearing piece)
   - Causal chain (why the problem persists)
   - Falsifiable hypothesis (testable prediction with clear pass/fail conditions)

2. **Stress Test Phase** — MOM Test simulation:
   - LLM acts as your target customer persona
   - You conduct a user interview
   - LLM grades your interview performance: questions asked, signals missed, assumptions tested
   - Output: scorecard of which assumptions weakened vs held

3. **Manual MVP Phase** — 21-day pilot experiment:
   - No app is built yet
   - An experiment is run with real people
   - First proof of whether the hypothesis holds

**Discovery to MVP Coach — Claude Skill**  
Siddhant built a `.skill` file encoding his 10 years of product-building knowledge. Installed via Claude → Settings → Capabilities → Skills. Invoked with slash command. Runs the full discovery process interactively. Takes 90 minutes to 3 hours. Output: discovery document (observation/subject/evidence/causal chain/hypothesis) + 21-day MVP plan.

The skill is intentionally hard — designed to filter out low-agency students early.

**OPT Coach — Fallback**  
For students without a problem statement: OPT (Operating Model → Process → Task) Coach. Asks 5 questions about your current role. Outputs 3 candidate tasks worth automating. See [[opt-framework]].

**Key insight: Code is no longer a moat**  
Technology is commoditized. The moat is now: specific knowledge (Nawal Ravikant) + validated problem statement + working proof. Siddhant's 3D framework for defensibility: Data, Distribution, Design.

**Meta-lesson**  
Siddhant ran the Discovery skill on the Arav problem himself during the lecture to model it. The process produced: observation → subject (ambitious early-career professionals in urban India, AI-aware, zero ship proof) → falsifiable hypothesis (60% of active students will identify one real user and build a credible demo in 90 days; falsification: <40% rate). This was the lecture's own content.

### Frameworks Introduced
[[idea2app-v2]], [[opt-framework]]

### Examples Used
- Arav Deshpande (composite persona)
- Omhar Walker's answer: "Give Claude one project idea, break into 7-day tasks, find the simplest MVP"
- Akash's answer: "Stop consuming, open an abandoned project, map broad strokes, finish one step at a time"
- 100x Engineers itself as product of this framework (started with observation, not a tool)

---

## L02 — State of AI 2026 (2026-05-22)

**Instructor:** Siddhant  
**Track:** Combined

### Key Concepts

**The AI Adoption Gap**  
Gartner graph: AI capability (y-axis) vs time (x-axis). Innovation curve from Frontier Labs has far outpaced adoption. Current utilization of frontier models in large enterprises: ~20%. The gap between what models can do and what businesses actually use is the trillion-dollar opportunity.

Sources cited:
- McKinsey GenAI Value Paradox report (2025): 80% of companies adopted new-gen AI; 80% saw no significant revenue increase or cost reduction
- AI Transformation Gap Index (Feb 2026 paper): industry AI susceptibility score, AI frontier coefficient, value creation bridge, disruption risk index

**What's changing: From intelligence race to systems race**  
AI 2026 is no longer about which model is smartest. It's about who can build better systems — tools, protocols, agents, deployment infrastructure — that close the adoption gap. Five shifts:
1. Models converging into systems
2. AI now operates inside work (search, code, memory, tool use expected by default)
3. Adoption is the bottleneck, not capability
4. Frontier Labs are pivoting to deployment (OpenAI deployment company + Anthropic/BlackRock consultancy)
5. FDE as a new standardized role

**OpenAI + Anthropic deployment pivot**  
May 11, 2026: OpenAI launches a deployment company to help businesses build around intelligence. Anthropic partners with BlackRock for similar enterprise consultancy. Combined raised ~$5.5B for deployment work. Google started inbounding engineers for FDE roles.

**FDE — Forward Deployed Engineer**  
Emerging standardized role. Combines domain expertise + AI system design to close the adoption gap at specific companies. Not a traditional software engineer. Packages range from $50K to $500K+. Google compressing hiring cycle to 2 days + 2 interviews.

What an FDE does (the 4 skills):
1. **Workflow diagnosis** — sit with teams, map what they actually do (not org chart), decide what gets automated vs stays as code vs stays human
2. **Self-improving intelligence system design** — not one-off workflows; systems that accumulate knowledge, compound over time (company brain, wiki, skills registry, MCP servers for legacy systems, generative UI, agent auth)
3. **Evals** — encode domain expertise as scoring criteria; "what does good look like in this domain?" → quantification method LLM can use to verify output quality. Ogilvy copy-reviewer prompt as reference
4. **Guardrails** — what you DON'T want AI to do (OLA Krutrim example: company LLM recommended competitor's scooter because guardrails were absent; went viral as meme)

**Domain expertise is the lever**  
Can't be taught in 6 months. Must come from prior career experience. The only way AI consulting/FDE delivers real value is when the person deploying AI already understands what "great output" looks like in that domain. Siddhant's 2023 media company failure: built AI content workflows without media domain expertise, so evals were bad, output quality was below human editors, project was paused after 8 months.

**AEOS Labs as case study**  
Tejas (CTO), Varun (content/marketing), Pranay: secured Amazon Prime (MedZap S3 campaign), Netflix, Ogilvy contracts because of marketing domain expertise + AI system design. Prime didn't choose TCS/Accenture — chose EOS because of domain depth.

**12–24 month window**  
The deployment wave is happening now. Media is 3–4 months behind industry reality. Early movers get the first-mover advantage. YC General Partner Tom Bloomfield released a video ("How to Build a Self-Improving Company") 23 hours before this lecture — referenced live.

### Frameworks Introduced
[[ai-adoption-gap]], [[fde-forward-deployed-engineer]]

### Entities Mentioned
[[aeos-labs]], [[siddhant]], [[sridev]]

---

## L03 — The First Interface (2026-05-23)

**Instructor:** Siddhant  
**Track:** Combined

### Key Concepts

**Three-system model (from L02 recap)**  
All AI systems involve three types of components:
1. **Deterministic systems** — software, zeros and ones, precise instructions only
2. **Probabilistic systems** — LLMs, uses probability to predict next token
3. **Human in the loop** — judgment, intent, domain expertise

Understanding how to orchestrate all three is the core skill of the FDE.

**Interface: definition from first principles**  
Opening exercise: Siddhant acts as a machine; students give instructions via Zoom chat to make him draw a smiley face on paper. Result: chaos — conflicting instructions, ambiguous commands, no coordination.

**Key lesson:** Machines cannot read intent. They execute instructions exactly as given. Debugging is hard because you can't explain ambiguity to a machine — the machine never understands "what you meant."

Definition derived: *An interface is a shared agreement between two systems about how they will talk to each other when neither natively shares a language.*  
Professional definition: *The boundary, bridge, or point of interaction where two separate systems, components, or entities meet and communicate.*

**Types of interfaces studied in class:**
- **Telephone handset + cord** — mechanical interface between two humans; language is still required separately
- **Postal service** — system-level interface (envelope + stamp + address + delivery); address is INPUT not interface
- **Meme** — highest-compression human cognitive interface; compresses context/emotion/ideology/humor into one transmissible unit; "a meme is a high-bandwidth cognitive interface"; CJP cockroach party (22M followers in 5 days) as real example
- **ChatGPT frontend** — interface between human and LLM; UI = User Interface

**How interface is established (two prerequisites):**
1. Establish common language
2. Establish set of rules (protocols)

**Interface hierarchy in a web app:**
- Human → Machine: **UI (User Interface)** — text boxes, buttons, the visual layer
- Frontend ≠ UI: frontend is the full system running in the browser; UI is the subset that handles human-machine interaction specifically
- Machine → Machine: **API (Application Programming Interface)** — how two different machines talk to each other; what your frontend sends to Claude's servers
- Frontend sends multiple simultaneous API requests (shown live via Chrome DevTools → Network → XHR): completions, settings, memory fetch, skills load

**LLM architecture (demystified)**  
Showed OpenAI GPT OSS on HuggingFace: 120B parameter model = ~510 SafeTensor files, each 4GB. Needs 240GB RAM to run. The LLM file itself can ONLY predict next tokens — it cannot search, browse, or take actions. Everything else (tool calling, memory, web search) is handled by the **backend** layer wrapping it.

Backend = second system on the server, alongside the LLM files. Backend exposes APIs that the frontend calls.

**Interface chain for a full AI app:**
```
Human → UI → (browser/frontend sends API call) → Backend → LLM → Backend → API response → UI
```

**Hallucination introduced (first mention)**  
Asked the GPT OSS model to search top news today → it hallucinated, said "Given this difficulty, I'll fall back to my training data." Machine is good at predicting; if it lacks correct data, it predicts wrongly. Hallucination = predicting wrong things when knowledge is absent.

**What's next:** Starting next week, code track builds the first interface (UI layer) in code.

### Frameworks Introduced
[[interface-types]], [[deterministic-vs-generative-separation]]

### Examples Used
- Smiley face exercise (machine simulation with Zoom chat)
- Telephone handset/cord photo
- Envelope/postal service photo
- CJP cockroach party meme (22M Instagram followers)
- ChatGPT interface dissected via Chrome DevTools
- GPT OSS on HuggingFace (SafeTensor files, hallucination demo)
