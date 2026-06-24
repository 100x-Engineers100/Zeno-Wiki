---
title: "SFT Techniques: Full Fine-Tuning, LoRA, QLoRA"
type: concept
tags: [ai, llm, fine-tuning, lora, qlora, sft, vram, 100x-cohort7, module2]
source_count: 1
---

## Definition
Supervised Fine-tuning (SFT) techniques are the three main approaches to updating LLM weights using labeled training data. They differ in which weights are updated, GPU memory requirements, and performance trade-offs.

## Why It Matters
Choosing the wrong technique wastes GPU resources or produces inferior results. The decision is primarily driven by available VRAM and task complexity. For most narrow use cases, LoRA provides 95% of full fine-tuning performance at 10% of the cost.

## How It Works

### Full Fine-tuning
- Updates ALL parameters (floating point numbers) across the entire model
- "The model goes through the entire LLM and refreshes how it thinks"
- Performance: best possible
- Cost: very expensive, high VRAM, even for 1–3B parameter models
- Risk: **catastrophic forgetting** — if training data has bad samples, wrong patterns propagate across the entire model. A model that could write essays can become bad at writing entirely.
- Use when: budget is serious and task complexity demands it

### LoRA (Low-Rank Adaptation)
- Trains only ~2% of total weights as a detachable adapter layer
- Base model weights are frozen; LoRA adds a small overlay
- Inference: "it asks both the base layer and the LoRA layer for the output. They combine and give one single answer."
- Portability: LoRA adapter trained on Llama 3 can be placed on Llama 3.1 if they share the same architecture (`LlamaForCausalLM`) and tokenizer
- Performance: "spend 10% of the cost, get 95% of the outcome for narrow tasks"
- Default choice for most fine-tuning tasks

### QLoRA (Quantized LoRA)
- Same as LoRA but quantizes weights from 32-bit/16-bit floats down to 4-bit precision
- Result: ~1/4 the GPU memory required compared to standard LoRA
- "Originally sold as: train 7B, 20B LLMs on a single GPU. Even a 30B or 70B on one A100 or H100."
- Trade-off: slight performance drop on complex tasks. On simple narrow tasks, LoRA and QLoRA are on par.
- Use when: LoRA on target base model exceeds GPU budget, but need a larger base model

## VRAM Requirements (from LLaMA Factory)
| Method | Precision | Model size | VRAM minimum |
|--------|-----------|------------|--------------|
| LoRA | 16-bit | 7B | ~16 GB |
| QLoRA | 8-bit | 7B | ~10 GB |
| LoRA | 16-bit | 14B | ~24 GB |

Rule: whatever the table says, plan for more. Batch size, sequence length, and dataset size all affect actual usage.

## Base Model Selection
- "We're talking fine-tuning sub-100B parameter models. Realistically 8B to 30B."
- Good open-weight options: Qwen, Llama, KimiK 2.5, DeepSeek
- Test 2–3 base models on your task first. Pick the one already closest to expected output.
- Size trade-off: "7B vs 15B — if there's a big leap in base quality, go 15B. 15B is roughly double the cost to run."
- "Smaller model = trained on less data = weaker general language understanding. If the foundation is bad, fine-tuning won't save it."
- Llama commercial caveat: open weights, but >1 million users requires a Meta license

## Note: LLM LoRA vs Diffusion LoRA
This concept covers LLM LoRA. Diffusion LoRA (for image models like FLUX and SDXL) shares the same principle but has different rank/alpha/step conventions. See [[lora-training]] for diffusion-specific details.

## Connections
Related concepts: [[llm-fine-tuning]], [[fine-tuning-hyperparameters]], [[lora-training]], [[fine-tuning-data-prep]]
Entities: [[axolotl]], [[llama-factory]]
Introduced by: [[100x-l18-22-llm-finetuning]]

## Open Questions / Unknowns
- Is LoRA portability between Llama 3 and Llama 4 confirmed if they share the same architecture type?
- What is the crossover point where QLoRA performance gap becomes significant vs LoRA on complex tasks?
