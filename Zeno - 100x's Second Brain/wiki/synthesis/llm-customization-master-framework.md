---
title: "LLM Customization Master Framework (L18–22 Synthesis)"
type: synthesis
sources: [100x-l18-22-llm-finetuning, connecting-llm-dots, 100x-cohort7-module2-llm]
tags: [ai, llm, fine-tuning, rag, context, behaviour, decision-framework, mcp, synthesis, 100x-cohort7, module2]
---

## Question / Framing
What is the complete framework for choosing how to customize LLM behavior — and where does fine-tuning fit relative to RAG, prompting, and agents?

## Analysis

### The Master Binary: Context vs Behaviour
Siddhant's L22 framework reduces every LLM failure to one of two root causes:

```
LLM failure
  ├── Context problem (uncertainty): model lacks the right information
  │     Solutions: prompt engineering, tool calling, RAG, memory
  │
  └── Behaviour problem (forced response): model has info but responds wrong
        Solutions: better prompting first → fine-tuning if prompting fails
```

This directly extends the [[hallucination-formula]] (f(Uncertainty × Forced Response)) from Module 2. Uncertainty = context problem. Forced response = behaviour problem. The formula was always pointing at two separate solution paths.

### Tejas's Five-Lever Escalation (L18)
A more granular version of the same principle with explicit ordering:
1. Prompting
2. Better context
3. RAG
4. Workflow design
5. Fine-tuning (last resort)

These map cleanly:
- Levers 1–4 = addressing context and task clarity problems
- Lever 5 = addressing behaviour problems that survive levers 1–4

### The Critical Non-Confusion: RAG vs Fine-Tuning
The modules are explicit that this is a COMMON mistake:
> "RAG fetches external facts into the prompt at inference time. Fine-tuning changes weights permanently. Don't fine-tune to compensate for missing knowledge — that's a RAG opportunity."

| | RAG | Fine-tuning |
|---|-----|-------------|
| Solves | Context problem (missing facts, real-time data) | Behaviour problem (wrong format, wrong tone, inconsistent response pattern) |
| When applied | At inference time (per query) | Before deployment (training phase) |
| Effect | Injects information | Changes how model responds |
| Reversible | Yes (don't retrieve) | No (weights changed) |
| Cost | Per-query retrieval cost | One-time training + all inference savings |

### The "Format You Train On" Principle (L22 Failure Story)
The $140K failure: company fine-tuned GPT-3.5 on 140K Slack messages to write blog posts. Model learned to respond like a Slack coworker ("Sure, I'll get to it in the morning."). 

**Principle**: Training data format = output format. The model doesn't extract intent — it reproduces pattern. This is why data preparation ([[fine-tuning-data-prep]]) is the single most critical fine-tuning step.

### The MCP Generative UI Connection (L22)
L22 also introduced a fundamentally new interface layer: Generative UI in MCP. This completes the architecture picture:

```
Old: LLM → text response → user reads/acts
New: LLM → MCP → app renders interactive UI inside chat window
```

MCP now under Linux Foundation (Anthropic + OpenAI + Google). This makes it the de facto standard. Same network effect logic as HTTP for the web.

MCP context efficiency solutions directly address the scale problem:
1. **Tool Search Tool**: RAG for tool definitions. Load only the tool you need, just-in-time.
2. **Programmatic tool calling**: LLM writes code, execution env runs APIs, only result returns. See [[programmatic-tool-calling]].

These are platform-agnostic patterns — apply to any LLM, not just Claude.

### Decision Flowchart (Complete)
```
Start → In-context learning (zero-shot, few-shot)
      → Evaluate gap

Context gap, static data:
  → Improve prompt / examples in system prompt

Context gap, dynamic/real-time:
  → Tool calling (fetch → augment prompt via MCP)

Context gap, too large for context window:
  → RAG (chunk → index → semantic search → retrieve)

Behaviour gap:
  → Try prompting with behaviour instructions first
  → Still failing? → Fine-tuning (LoRA / SFT)

Both gaps:
  → Fine-tuned model (behaviour) + RAG (knowledge) → production system
```

## Conclusions

1. **Fine-tuning is the end of an escalation path, not the beginning.** Every team that jumped to fine-tuning without working through levers 1–4 wasted resources on the wrong solution.

2. **The context/behaviour diagnosis is the most important question.** Get this right and the rest follows. Get it wrong and you spend weeks on the wrong intervention.

3. **MCP Generative UI represents the next interface layer.** Just as RAG expanded what LLMs could know, Generative UI expands what LLMs can do within a conversation — render and interact with real application UIs, not just text.

4. **The complete curriculum is now visible**: Module 1 (what to generate) → Module 2 (how to build full-stack LLM apps, when to use what tool) → Module 3 (agents, multi-agent systems, production pillars). L18–22 bridges Module 2 and Module 3 — fine-tuning is the last piece of model customization before you add the reasoning loop.

## Contradictions
None. Tejas (5-lever escalation) and Siddhant (context/behaviour binary) are complementary framings. Both explicitly agree: fine-tuning is last resort; RAG and fine-tuning solve different problems.

## Further Research
- Practical benchmark: at what dataset size and task complexity does LoRA reliably outperform extended few-shot prompting?
- How does the Generative UI MCP spec evolve — what component primitives will be available?
