---
title: "100x Cohort 7 — L18–22: LLM Fine-Tuning, Data Prep, Evaluation, and Module Recap"
type: source
source_type: course_notes
author: "Tejas, Siddhant Goswami (100x Engineers)"
date: 2026-03-28
raw_path: raw/courses/L18_22_Notes_Detailed_C6.txt
tags: [ai, llm, fine-tuning, lora, qlora, data-prep, evaluation, mcp, 100x-cohort7, module2]
---

## Summary

Five-lecture sequence covering LLM customization from first principles. L18 (Tejas) establishes fine-tuning as the last resort in a five-lever escalation ladder. L19–20 cover data preparation and the full training workflow using Axolotl. L21 covers LLM evaluation — the most underrated part of fine-tuning. L22 (Siddhant) closes the module with the master context-vs-behaviour framework, a real fine-tuning failure story, and the MCP Generative UI announcement.

Central argument: fine-tuning solves behaviour problems, not knowledge problems. Reaching for fine-tuning before exhausting prompting, RAG, and workflow design is almost always the wrong move.

## Key Ideas

### L18 — When to Fine-Tune

- **Five levers in order**: Prompting → Better context → RAG → Workflow design → Fine-tuning (last resort)
- **Fine-tuning teaches the model to reproduce repeated behaviour more reliably from examples** — not to add new knowledge
- **When fine-tune is right**: outputs vary 2-out-of-5 despite good prompting; consistent JSON schema needed; long prompts to eliminate; smaller/cheaper model for one specific job
- **When fine-tune is wrong**: need real-time data (that's RAG); instructions are unclear; dataset is small or low quality
- **LLM training lifecycle — 3 stages**: Pre-training (base model, next-token predictor, millions$), SFT (instruction-input-output pairs, far cheaper), Preference Alignment (RLHF / DPO, big labs only)

### L18 — Three SFT Techniques
- **Full fine-tuning**: Update ALL parameters. Best performance. Risk: catastrophic forgetting. High VRAM.
- **LoRA**: Train ~2% of weights as detachable adapter. 10% of cost, 95% of outcome for narrow tasks. Portable across architecture versions.
- **QLoRA**: Same as LoRA but 4-bit quantization. ~1/4 the GPU memory. Slight performance trade-off on complex tasks.

### L19 — Data Preparation
- **Four pillars**: Accuracy (wrong data → model learns wrong), Diversity (even distribution across styles/audiences), Consistency (within a style, structure must be uniform), Complexity (train on hard inputs, not just easy ones)
- **Five-step recipe**: Collect (tag each sample) → Clean (remove PII, normalize terminology) → Deduplicate + Decontaminate (no near-duplicates in eval set) → Annotate (instruction/input/output JSON) → Quality review (checklist, remove hype language)
- **JSON annotation format**: `{"instruction": "...", "input": "...", "output": "..."}`
- **Decontamination rule**: eval set must not contain near-duplicates of training data — otherwise eval scores are meaningless
- **Tool: Distilabel** (Python) for automated data structuring. Google Sheets + Gemini for no-code small datasets.

### L20 — Training Workflow
- **Five-step training workflow**: Choose task+dataset → Choose base model → Choose method (LoRA/QLoRA/Full) → Prepare YAML config → Run training
- **Base model selection**: Test 2–3 models first. Good open-weight options: Qwen, Llama, KimiK 2.5, DeepSeek. Use what's already closest to expected output.
- **Key hyperparameters**: Learning rate (1e-4 to 2e-5), warmup steps, epochs (3–5 typical), batch size (as large as GPU allows), LoRA rank (size of adapter), LoRA alpha (influence strength, alpha = 2× rank typical), max sequence length, gradient accumulation
- **Tool: Axolotl** — YAML-based fine-tuning framework. JarvisLabs template available. Single command to train/inference/merge.
- **Loss pattern**: "Loss starts low and stays flat → data is bad." Good pattern: loss ramps up then comes down steadily.
- **Tool: LLaMA Factory** — GUI-based alternative, good for Windows.

### L21 — Evaluation
- **Why hard**: Multiple correct answers, no fixed ground truth, LLMs are unpredictable at longer contexts
- **Four evaluation methods**: Public benchmarks (base model selection only), LLM-as-Judge (auto-eval with rubric, known biases), Human evaluation (gold standard, subjective/slow), User testing (closest to reality)
- **LLM-as-Judge biases**: Prefers long outputs, distillation bias, can't differentiate 4 from 4.5, misses context-specific nuance
- **Rubric example**: Hook strength, Tone fit, Clarity, Specificity, Factual accuracy, CTA quality — each scored 1–5
- **Human-verified eval loop**: Create gold standard pairs → run model → LLM-as-Judge → human spot-check → identify failure patterns → fix data → retrain → repeat
- **Deployment**: Replicate for GPU API layer. cog.yaml + predict.py structure.

### L22 — Master Framework (Siddhant)
- **Real failure story**: Company fine-tuned GPT-3.5 on 140,000 Slack messages to write blog posts. Result: model responded like a Slack coworker, not a writer. Lesson: the format you train on is the format you get.
- **Master framework**: Every LLM failure = context problem OR behaviour problem. Context problem → prompt engineering / tool calling / RAG / memory. Behaviour problem → better prompting first, then fine-tuning.
- **Siddhant's decision flowchart**: Start with in-context learning → evaluate gap → context gap (static: improve prompt, dynamic: tool calling, too large: RAG) → behaviour gap (try prompting first, then fine-tuning)
- **MCP under Linux Foundation**: Anthropic + OpenAI + Google all signed on. "When three competitors agree on a standard, it becomes the standard."
- **Generative UI (MCP)**: Apps render interactive UI inside Claude's chat window. Bidirectional — clicking calls the real app server, not Claude's. Canva demo shown: full design flow inside Claude.
- **MCP context efficiency**: Tool Search Tool (RAG index of tool definitions) + Programmatic tool calling (LLM writes code, execution env calls APIs, only final result returns to context)
- **Ajax moment analogy**: Before Generative UI = text link. After = actual app embedded in chat, interactive.

## Notable Quotes / Moments

> "Fine-tuning teaches the model to reproduce repeated behavior more reliably, from examples you showed it. That is what fine-tuning does." — Tejas

> "Data is probably the single biggest thing in fine-tuning. If you don't have the data, fine-tuning isn't even a question." — Tejas

> "If you don't have high-quality data to study for an exam, you're not going to pass." — Tejas

> "The format you train on is the format you get." — Siddhant (Slack fine-tuning failure story)

> "When three competitors agree on a standard, it becomes the standard. Like HTTP for the web." — Siddhant on MCP + Linux Foundation

> "This is the Ajax moment." — Siddhant on Generative UI in MCP

## Concepts Introduced
[[llm-fine-tuning]], [[sft-techniques]], [[fine-tuning-data-prep]], [[fine-tuning-hyperparameters]], [[llm-evaluation-methods]], [[mcp-model-context-protocol]], [[programmatic-tool-calling]], [[llm-decision-tree]]

## Entities Mentioned
[[siddhant]], [[100x-engineers]], [[axolotl]], [[llama-factory]], [[replicate-deployment]]

## Contradictions / Tensions
- L18 (Tejas) defines fine-tuning as a 5-lever escalation. L22 (Siddhant) gives a cleaner context-vs-behaviour binary. These are complementary framings, not contradictions.
- RAG and fine-tuning explicitly called out as non-comparable by Tejas: "Don't fine-tune to compensate for missing knowledge — that's a RAG opportunity." This reinforces the [[llm-decision-tree]] lever distinction.

## Open Questions
- What is the minimum high-quality dataset size for LoRA to reliably outperform extended prompt engineering?
- Does Axolotl support LoRA portability between Llama 3 and Llama 4 out-of-the-box?
- What is the full spec for Generative UI MCP — which components/primitives does it support?
