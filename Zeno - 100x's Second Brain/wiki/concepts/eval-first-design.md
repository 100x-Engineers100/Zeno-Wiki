---
title: "Eval-First Design"
type: concept
tags: [eval, llm, golden-io, spec-driven, quality, 100x-cohort7]
source_count: 2
---

## Definition
Eval-first design is the practice of defining what "good output" looks like — in writing, as explicit criteria — before building the system that produces it. The eval (evaluation rubric) is written before the function, not after. This forces clarity on success criteria and creates the ground truth for testing.

## Why It Matters
LLM output is probabilistic — it cannot be unit-tested like a deterministic function. Without an explicit eval, "does this work?" is a judgment call that degrades over time as models change, prompts drift, and team intuition diverges. Encoding the eval early:
- Makes quality objective and repeatable
- Enables automated regression testing when models are swapped
- Forces the builder to apply domain knowledge before code
- Surfaces the real problem: "what makes a good workflow diagnosis plan?"

## How It Works

### Step 1 — Golden Input-Output Pairs
Before writing any code, write down:
- A real example input (as specific and realistic as possible)
- The ideal output for that input

Example (workflow diagnosis app):
- **Input**: *"Every morning I download a CSV sales report, remove duplicates, calculate totals per region, paste into a new spreadsheet, email it to my manager. Takes about 1 hour each day."*
- **Ideal Output**: workflow summary, pain points identified, automation opportunities ranked, recommended first automation, suggested tools, step-by-step build plan

The golden pair becomes:
1. The test case for the deterministic layer (assert output structure is valid)
2. The training example for the eval prompt

### Step 2 — Eval Prompt (LLM as Judge)
Write a rubric that an LLM can use to score outputs. Use a smarter model (Claude Opus) to write the rubric — it produces higher-quality criteria than you would write manually.

Structure:
- Role: "You are an automation quality evaluator for non-technical business analysts"
- Rubric: 10–15 scoring criteria (e.g., workflow understanding, pain point identification, tool appropriateness, actionability, beginner feasibility, quick wins, scope clarity)
- Scoring: numerical or pass/fail per criterion

### Step 3 — Wire Eval into Production
The eval function becomes its own API endpoint (`POST /evaluate`). This enables:
- Automated quality checks after every `diagnose()` call
- A separate "eval API" that external users can call to assess their own plans
- Decomposition: `diagnose()` produces a plan; `evaluate()` judges it independently

### Step 4 — Use Eval to Improve
Run the eval 15–20 times on the same system to understand whether the rubric is working. Add or remove criteria based on domain judgment. This is where domain expertise compounds — anyone can write a generic prompt; only a domain expert can tell whether the eval rubric actually captures what matters.

## Key Variants / Extensions
- **Golden I/O pairs as test cases**: use golden pairs to write deterministic test cases (assert plan is not empty, assert required fields are present). Deterministic tests cover the code layer; eval prompts cover the quality layer.
- **Spec-driven development**: CLAUDE.md with plan-review mode — Claude documents its plan before implementing. Prevents assumption drift. The spec is the eval for the coding agent.
- **Ogilvy prompt pattern**: domain-specific eval frameworks inspired by expert rubrics (e.g., Ogilvy's copywriting principles mapped to workflow automation output criteria)
- **Multi-model eval**: use a different (smarter or domain-specific) model to run the eval than the model that generated the output — avoids self-grading bias

## Examples
**Workflow Diagnosis App (100x C7 L10 live build):**
- `diagnose(workflow_description)` → produces automation plan using Llama 3.1 8B via Groq
- Eval prompt (written by Claude Opus): 15 criteria including workflow understanding, automation prioritization, beginner feasibility, tool appropriateness, actionability, step sequence, scope, clarity, quick wins
- Test cases: `test_diagnose_success`, `test_diagnose_empty_string`, `test_diagnose_missing_field`
- Each run shows the plan + eval score; iterate rubric until quality converges

**The distinction that matters:**
- Probabilistic system (LLM): evaluated with eval prompt → qualitative, not binary
- Deterministic system (Python functions, APIs): evaluated with test cases → binary pass/fail
- Both layers are needed; neither replaces the other

## Connections
Related concepts: [[llm-as-judge]], [[deterministic-vs-generative-separation]], [[mvp-build-cycle]], [[domain-modeling]]
Introduced by: [[100x-cohort7-module2-l07-l10]], [[100x-cohort7-module2-llm]]

## Open Questions / Unknowns
- How many golden pairs are needed before the eval rubric converges?
- When does the eval itself need to be evaluated (meta-eval)?
- How do you prevent rubric drift as the product evolves and the user persona changes?
