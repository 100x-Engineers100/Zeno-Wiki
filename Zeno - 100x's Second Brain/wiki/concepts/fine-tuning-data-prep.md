---
title: "Fine-Tuning Data Preparation"
type: concept
tags: [ai, llm, fine-tuning, data, dataset, annotation, quality, 100x-cohort7, module2]
source_count: 1
---

## Definition
Fine-tuning data preparation is the process of transforming raw domain content into structured, high-quality labeled examples suitable for supervised fine-tuning. It is the most important determinant of fine-tuning success — poor data cannot be rescued by any training technique.

## Why It Matters
"Data is probably the single biggest thing in fine-tuning. If you don't have the data, fine-tuning isn't even a question." A model cannot learn a pattern you didn't show it. The format you train on is the format you get — the $140K Slack-message failure story (see [[100x-l18-22-llm-finetuning]]) is the canonical example.

## How It Works

### The Four Pillars of Good Data
| Pillar | What it means | Common mistake |
|--------|---------------|----------------|
| **Accuracy** | Each example shows the truly correct output | Training on vague/wrong examples → model learns wrong pattern |
| **Diversity** | Even distribution across tones, audiences, formats, complexity | 80% same style → model only learns that style |
| **Consistency** | Within each style group, structure is uniform | Punchy scripts with 5 different structures → mixed signals |
| **Complexity** | Train on hard inputs, not just easy ones | Only easy examples → model fails on real-world complex inputs |

> Diversity and consistency are not contradictory. Diversity = across groups. Consistency = within each group.

### Five-Step Data Recipe

**Step 1 — Collect**
- Gather from real domain sources
- Tag each sample: topic, style, audience, complexity
- "At 5 samples it seems trivial. At 500, without tags, you lose track."
- Common mistake: collecting domain-related but not task-related data

**Step 2 — Clean**
- Remove PII, fix bad punctuation, normalize terminology ("UGC people" vs "creators" → pick one)
- LLMs can assist with bulk cleaning, but manual spot-checks are required
- Don't over-clean: "don't make examples stop looking like real prompts"

**Step 3 — Deduplicate + Decontaminate**
- Dedup: remove near-identical entries. "If 5 samples all discuss Google TextFX, you're teaching that pattern too hard."
- Decontaminate: 70–80% training / 20–30% eval split. No near-duplicates across both sets.
- "If the eval set looks like training data, your eval scores are meaningless — model memorized the answer, not learned the pattern."

**Step 4 — Annotate (hardest step)**
Convert cleaned samples into structured JSON:

```json
{
  "instruction": "Write a 25-second Instagram Reel script for creators",
  "input": "Product: AI video editor. Features: fast exports, autocaptions. Tone: punchy. Avoid: corporate language.",
  "output": "Editing used to take forever... [full script]"
}
```
- `instruction`: what to do (required)
- `input`: context/constraints (optional)
- `output`: ideal answer (required)

**Conversational format** (for chatbot behavior):
```json
{"role": "system", "content": "..."},
{"role": "user", "content": "..."},
{"role": "assistant", "content": "..."}
```

**Reasoning/decision format**: instruction asks model to choose A or B and explain why. Output includes reasoning ("Hook B stronger because it starts with a familiar pain point.").

**Step 5 — Quality Review**
- Build a checklist per sample
- Remove hype language ("this revolutionary product will transform creators forever")
- "Every sample matters"

### Tools
- **Distilabel** (Python): takes raw data → structured examples → multiple output drafts → saves as dataset file ready for trainer
- **Google Sheets + Gemini**: no-code option for small datasets (<500 samples)

### Key Technical Note
One training run = one consistent data format. Cannot mix instruction format and conversational format in a single run (Axolotl).

## Connections
Related concepts: [[llm-fine-tuning]], [[sft-techniques]], [[fine-tuning-hyperparameters]], [[llm-evaluation-methods]]
Introduced by: [[100x-l18-22-llm-finetuning]]

## Open Questions / Unknowns
- What is the minimum sample count per style category for Diversity to meaningfully generalize?
- How does Distilabel handle quality control vs purely manual annotation?
