---
title: "LLM Evaluation Methods"
type: concept
tags: [ai, llm, evaluation, evals, fine-tuning, rubric, benchmark, 100x-cohort7, module2]
source_count: 1
---

## Definition
LLM evaluation is the systematic process of measuring whether a fine-tuned (or prompted) model produces correct, high-quality outputs. It is the most underrated step in the fine-tuning cycle — and the one even major labs (OpenAI, Anthropic, Google) are still solving. Without evaluation, you cannot know if your model improved or degraded.

## Why It Matters
"Testing on 2-3 good examples and calling it done is equivalent to saying your software works because it didn't crash once." Generative AI has no fixed ground truth — multiple outputs can all be "correct." Without a rubric and systematic evaluation, you can't distinguish a better model from a worse one.

## How It Works

### Why LLM Evaluation is Hard
- Traditional ML: binary labels (spam vs not), easy accuracy computation
- Generative AI: multiple correct answers, variable tone/detail/structure, outputs vary run-to-run
- "LLMs are unpredictable. Same input → 10 different outputs. Performance drifts as context gets longer."

### The Four Evaluation Methods

**1. Public Benchmarks** (HLE, SWE-Bench, MMLU, CodeForce, Chatbot Arena)
- Use for: selecting a base model before fine-tuning
- NOT useful for: evaluating your fine-tuned model
- "Too generic. Doesn't reflect your specific task, your prompting style, your output criteria."

**2. LLM-as-Judge (Auto-eval)**
- Use a stronger LLM (GPT-5, Claude Opus) to score outputs against your rubric
- Scalable: runs automatically at any volume
- Known biases:
  - Prefers longer outputs (longer = higher score even if worse)
  - Distillation bias: open-source models trained on GPT outputs get favored by GPT judge
  - Can't reliably differentiate 4.0 from 4.5 on a 1–5 scale
  - Misses context-specific nuance (your specific writing style, brand voice)
- See [[llm-as-judge]] for original framing from Module 3

**3. Human Evaluation**
- Gold standard for creative/subjective tasks
- Problems: subjective, slow, expensive
- "One human gives 5/5 to dramatic script, another gives 3/5. Different taste."

**4. User Testing**
- Real users in production-like conditions
- Closest to actual use. Most valid signal for deployment decisions.

### The Rubric (required before any evaluation)
Define dimensions before running evals. Example rubric for script generator:
| Dimension | What it measures |
|-----------|-----------------|
| Hook strength | Does it grab attention in first 3 seconds? |
| Tone fit | Matches brand/style? |
| Clarity | Message easy to understand? |
| Specificity | Uses actual product details, not filler? |
| Factual accuracy | No made-up claims? |
| CTA quality | Clear, relevant call to action? |

Score each dimension 1–5. "The tags you used in data annotation = the dimensions you evaluate on."

### Recommended Workflow: Human-Verified LLM Eval Loop
1. Create 10–20 high-quality gold standard prompt-output pairs (include edge cases NOT in training data)
2. Optional: LLM-generate slight variations of test prompts for coverage → human-verify
3. Run fine-tuned model on eval set → collect outputs
4. LLM-as-Judge: send outputs + rubric to GPT-5/Opus → get dimension scores
5. Human spot-check: subject matter expert reviews subset → correct where biased
6. Identify failure patterns (model always weak on hook strength → add more hook examples to data)
7. Retrain → repeat

"This loop keeps going until you're happy. It's a cycle — data → train → eval → back to data."

### Tools
- **LLM Evaluation Harness** (EleutherAI): Python. Axolotl has built-in integration.
- **Auto Evaluator**: Python-based auto-eval tool
- **RAGAS**: RAG-specific eval metrics (Faithfulness, Answer Relevancy, Context Precision, Context Recall) — see [[retrieval-augmented-generation]]

## Connections
Related concepts: [[llm-fine-tuning]], [[fine-tuning-data-prep]], [[llm-as-judge]], [[retrieval-augmented-generation]], [[agent-production-pillars]]
Entities: [[axolotl]]
Introduced by: [[100x-l18-22-llm-finetuning]]

## Open Questions / Unknowns
- What is the minimum gold standard set size before LLM-as-Judge scores become reliable?
- Is there a method to correct for LLM-as-Judge's length bias systematically?
