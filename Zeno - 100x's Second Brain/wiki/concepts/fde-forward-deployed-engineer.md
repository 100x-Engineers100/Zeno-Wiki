---
title: "FDE — Forward Deployed Engineer"
type: concept
tags: [career, ai, enterprise, fde, deployment, domain-expertise, 100x-cohort7]
source_count: 2
---

## Definition

Forward Deployed Engineer (FDE) is an emerging role that sits at the intersection of domain expertise and AI system design. An FDE embeds with a specific company or team, diagnoses their workflows, and builds self-improving AI systems that close the adoption gap. Not a traditional software engineer — not primarily a model researcher. The FDE is the person who makes AI work in real organizational context.

Salary range: $50K–$500K+. Google compressing hiring cycle to 2 days, 2 interviews (as of May 2026).

## Why It Matters

AI capability is abundant. AI deployment is scarce. The bottleneck is not building better models — it's deploying existing ones inside real workflows at real organizations. The FDE is the role designed to remove that bottleneck.

The FDE thesis: domain expertise (which takes 5–10 years to build) + AI system design (which can be learned in months) = the highest-leverage profile in the AI economy right now.

Contrast with a traditional software engineer who builds general systems. The FDE builds AI systems specific to a domain's definition of "good output." That specificity is the moat.

## Four Skills of an FDE

### 1. Workflow Diagnosis
Sit with teams. Map what they actually do (not what the org chart says they do). Identify: what gets automated, what stays as code, what stays human. The org chart and the actual workflow almost never match. You can't build an effective AI system from the org chart.

### 2. Self-Improving Intelligence System Design
Don't build one-off automations. Build systems that accumulate knowledge over time and compound:
- Company brain / wiki (institutional knowledge)
- Skills registry (reusable Claude skills)
- MCP servers for legacy systems
- Generative UI (interface layer that adapts to context)
- Agent auth (identity and permissions for AI agents)

The system gets smarter the longer it runs. Contrast with a chatbot that doesn't learn.

### 3. Evals (Evaluation Systems)
Encoding domain expertise as scoring criteria. The question is: "What does good look like in this domain?" Then: build a quantification method an LLM can use to verify its own output quality.

Key properties of good evals:
- Built from real golden examples of ideal output (NOT synthetically generated)
- Encode actual domain expert judgment (not generic quality metrics)
- Produce actionable scores (not binary pass/fail)

Reference: Ogilvy copy-reviewer prompt (mentioned in L02) — encoding what great advertising copy looks like as a rubric the LLM grades against.

Evals are the mechanism that lets AI improve over time. Without evals, you can't tell if the system is getting better or worse.

### 4. Guardrails (AI Policy Design)
Defining what the system must NOT do. Harder than defining what it should do. Requires:
- Enumerating failure modes upfront
- Setting hard constraints (not just soft guidelines)
- Testing adversarially

**Ola Krutrim example (2025):** Krutrim's company LLM recommended Ather (a competitor's scooter) when asked for vehicle recommendations. The LLM was accurate — Ather was a good choice. But it violated the company's obvious business interest. Went viral as a meme. No guardrails on the base model.

Guardrails are AI policy. They encode organizational rules, brand guidelines, legal/regulatory constraints, and business priorities as hard constraints the LLM respects.

## Domain Expertise is the Lever

The FDE profile is not replicable by someone who only has AI skills. The evals are worthless without domain knowledge to define what "good" means. The workflow diagnosis is superficial without having worked in the domain.

Siddhant's 2023 failure case: built AI content workflows for a media company without media domain expertise. Evals were generic. Output quality consistently below human editors. Project paused after 8 months.

**AEOS Labs counter-example:** Tejas (engineering) + Varun (marketing domain expertise) secured Amazon Prime, Netflix, Ogilvy contracts. Prime did not choose TCS or Accenture. They chose AEOS Labs because of marketing domain depth.

You cannot fake domain expertise. The 5–10 years of career experience a cohort student already has is the moat. The AI system design is the skill being added on top.

## Market Context

- OpenAI deployment company launched May 11, 2026
- Anthropic / BlackRock enterprise consultancy (similar mandate)
- Combined raise: ~$5.5B for deployment work
- Google inbounding engineers for FDE roles; compressing hiring to 2 days / 2 interviews
- YC GP Tom Bloomfield: "How to Build a Self-Improving Company" video (May 21, 2026)

Media coverage is 3–4 months behind actual enterprise deployment reality. The opportunity window is 12–24 months.

## Connections
Related concepts: [[ai-adoption-gap]], [[guardrails-architecture]], [[llm-as-judge]], [[opt-framework]], [[self-improving-intelligence-system]]
Introduced by: [[100x-cohort7-module2-l01-l03]], [[100x-cohort7-module2-llm]]
Related entities: [[aeos-labs]], [[siddhant]]

## Open Questions / Unknowns
- What is the hiring funnel for FDE roles? Is it mostly inbound at Frontier Labs or also at traditional enterprises?
- How does the FDE role differ from "AI consultant" or "ML engineer" in practice at hiring companies?
- Is $500K ceiling realistic for non-US markets, or is that specific to US enterprise contracts?
