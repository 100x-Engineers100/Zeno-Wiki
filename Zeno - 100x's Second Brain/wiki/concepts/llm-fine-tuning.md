---
title: "LLM Fine-Tuning"
type: concept
tags: [ai, llm, fine-tuning, sft, rlhf, dpo, behaviour, 100x-cohort7, module2]
source_count: 1
---

## Definition
LLM fine-tuning is the process of updating a pre-trained model's weights by training it on a curated dataset of examples to make it reliably reproduce a specific behaviour pattern. It is the fifth and last lever in LLM customization — used only after prompting, context improvement, RAG, and workflow design have been exhausted.

## Why It Matters
Fine-tuning solves behaviour problems (the model responds incorrectly despite having the right information) — not knowledge problems (which are solved by RAG). Reaching for fine-tuning too early is one of the most common mistakes: it's expensive, requires high-quality data, and won't fix a RAG problem. When correctly applied, it enables consistent output schemas, eliminates long system prompts (reducing token cost), and allows smaller/cheaper models to handle specific tasks.

## How It Works

### The Five-Lever Escalation (in order)
1. **Prompting** — zero-shot, few-shot, chain-of-thought. Try this first, always.
2. **Better context** — structured inputs, richer brief, clearer constraints
3. **RAG** — fetch external/real-time data into context
4. **Workflow design** — break task into sub-steps; each step more reliable
5. **Fine-tuning** — last resort. Only when 1–4 have been tried and failed.

### When Fine-Tuning IS the Right Answer
- Outputs vary 2-out-of-5 times despite good prompting + workflow
- Need consistent JSON output schema reliably
- Narrow, specific task where the pattern is clear
- Long system prompts you want to eliminate (reduces token cost at inference)
- Running a smaller, cheaper model for one specific job

### When Fine-Tuning is WRONG
- You need real-time or external data → that's RAG, not fine-tuning
- Instructions are unclear → clean up task definition first
- Dataset is small or low quality → "if you don't have high-quality data to study for an exam, you're not going to pass"
- Trying to add new knowledge → fine-tuning changes behaviour, not facts. Model still halluccinates facts it hasn't seen.

> RAG vs fine-tuning: these are NOT comparable. RAG fetches external facts into the prompt at inference time. Fine-tuning changes weights permanently. Don't fine-tune to compensate for missing knowledge.

## LLM Training Lifecycle — 3 Stages

### Stage 1: Pre-training
- Massive dataset (internet-scale, terabytes+)
- Two approaches: masked language modeling (predict hidden tokens) or causal language modeling (predict next token)
- Output: base model — a next-token predictor. No instruction following, no chat.
- Cost: thousands of H100s, months, millions of dollars

### Stage 2: Supervised Fine-tuning (SFT)
- Train base model on labeled instruction-input-output pairs for a specific task
- Transfer learning: start from the base model already closest to expected output
- Far cheaper: "maybe 10 H100s" vs thousands for pre-training
- This is what engineers do. See [[sft-techniques]].

### Stage 3: Preference Alignment (RLHF / DPO)
- **RLHF**: Human picks answer A or B → preference data trains reward model → reward model scores LLM outputs → LLM learns from scores
- **DPO** (Direct Preference Optimization): Feed prompt + chosen answer + rejected answer directly back to LLM for fine-tuning. No separate reward model needed. (Stanford research)
- Done by big labs only — requires massive human feedback data. Not for individual practitioners.

## Cost Model
- Before fine-tuning: large model, long prompts (~900 prompt tokens + ~600 output tokens). Expensive.
- After fine-tuning smaller model: prompt tokens drop (behavior is baked in), output tokens drop (no filler). Total cost significantly lower.
- Strategy: fine-tune a smaller model → cheaper to run, faster inference, one-time training cost amortizes over many calls.

## Connections
Related concepts: [[sft-techniques]], [[fine-tuning-data-prep]], [[fine-tuning-hyperparameters]], [[llm-evaluation-methods]], [[retrieval-augmented-generation]], [[llm-decision-tree]], [[prompt-engineering]]
Introduced by: [[100x-l18-22-llm-finetuning]]

## Open Questions / Unknowns
- What is the practical minimum dataset size for LoRA to outperform extended few-shot prompting?
- When does DPO become accessible to individual practitioners (as distinct from labs)?
