---
title: "Axolotl"
type: entity
entity_type: tool
tags: [fine-tuning, lora, qlora, llm, training, 100x-cohort7]
---

## Overview
YAML-based LLM fine-tuning framework. Primary tool taught in 100x Cohort 7 for supervised fine-tuning of open-weight LLMs. Used by Tejas in the L18–22 module. JarvisLabs has a pre-configured Axolotl template.

## Key Contributions / Role
- Handles LoRA, QLoRA, and full fine-tuning via YAML config
- Single command to train: `axolotl train config.yml`
- Single command to test with Gradio UI: `axolotl inference config.yml --gradio`
- Merge LoRA into base for production: `axolotl merge_lora config.yml --output-dir ./merged`
- Has built-in LLM Evaluation Harness (EleutherAI) integration
- Requires 24GB VRAM minimum GPU on JarvisLabs

## Connections
Related entities: [[llama-factory]]
Appears in sources: [[100x-l18-22-llm-finetuning]]

## Notes
Key config fields: `base_model`, `model_type`, `load_in_4bit` (QLoRA), `lora_r`, `lora_alpha`, `learning_rate`, `warmup_steps`, `num_epochs`, `gradient_accumulation_steps`. The `val_set_size: 0.05` (5% eval split) is typical. Most common runtime error: OOM — lower batch size or sequence length.
