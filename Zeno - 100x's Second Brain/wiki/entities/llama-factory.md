---
title: "LLaMA Factory"
type: entity
entity_type: tool
tags: [fine-tuning, lora, llm, training, gui, 100x-cohort7]
---

## Overview
GUI-based LLM fine-tuning platform. Alternative to Axolotl with a web UI interface instead of YAML config. Good for Windows machines. Covers same LoRA/QLoRA/full fine-tuning methods but through dropdown menus.

## Key Contributions / Role
- Web UI: `llamafactory-cli webui`
- Same hyperparameter controls as Axolotl (learning rate, rank, alpha, epochs, batch size) via dropdowns
- Shows VRAM requirements table for each model+method combination
- No JarvisLabs template — more manual setup than Axolotl

## Connections
Related entities: [[axolotl]]
Appears in sources: [[100x-l18-22-llm-finetuning]]

## Notes
Install: `git clone https://github.com/hiyouga/LLaMA-Factory && pip install -e .`. Tejas showed the VRAM table live: LoRA 16-bit 7B → 16GB minimum; QLoRA 8-bit 7B → ~10GB.
