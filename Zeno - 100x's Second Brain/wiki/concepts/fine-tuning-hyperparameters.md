---
title: "Fine-Tuning Hyperparameters"
type: concept
tags: [ai, llm, fine-tuning, hyperparameters, lora, training, axolotl, 100x-cohort7, module2]
source_count: 1
---

## Definition
Hyperparameters are the configuration settings that control how the fine-tuning process runs. Unlike model weights (which are learned), hyperparameters are set before training and govern training speed, stability, resource usage, and final model quality.

## Why It Matters
Wrong hyperparameters cause two failure modes: underfitting (model doesn't learn the pattern) or overfitting (model memorizes training data, fails on new inputs). Hyperparameter issues are secondary to data quality — if fine-tuned results are bad, check data and base model first.

## Key Hyperparameters

### Learning Rate
- Controls how aggressively the model updates weights per training step
- Too small: very slow learning, may get stuck
- Too large: overshoots minimum on loss curve → unstable, higher final loss
- **Typical range**: 1e-4 to 2e-5. QLoRA can handle slightly higher.
- Think of it as step size on a U-shaped loss curve. Precise steps = slow but accurate. Large steps = fast but may overshoot the valley.

### Warmup Steps
- At start of training, ramps learning rate from near-zero up to target value over N steps
- Prevents the model from making large weight updates before it has "seen" enough data
- Visible in training logs: "learning rate starts low, climbs gradually, then stays flat"

### Epochs
- One epoch = one full pass through the entire dataset
- Typical: 3–5 epochs. Up to 10 for complex tasks.
- **Overfitting risk**: small dataset + many epochs → model memorizes rather than generalizes

### Batch Size
- Number of training examples processed before each weight update
- Larger batch = more stable weight updates, but more VRAM
- **Rule**: make batch size as large as your GPU allows before OOM errors. Start at 4, increase until OOM.

### LoRA Rank (`lora_r`)
- Size/capacity of the LoRA adapter layer
- Higher rank = more parameters in adapter = more expressive, but more memory
- Don't set rank too high for simple tasks — forces the model to fill capacity it doesn't need → overfitting risk
- Same concept as rank in diffusion LoRA (see [[lora-training]]) but applied to LLMs

### LoRA Alpha (`lora_alpha`)
- Controls how much the LoRA layer influences final output relative to the base model
- High alpha = LoRA layer dominates
- Low alpha = base model dominates, LoRA adds specialization
- **Common starting point**: alpha = 2× rank (e.g., rank 32 → alpha 64)
- Analogous to the LoRA strength slider in ComfyUI

### Max Sequence Length (`cutoff_len`)
- Maximum tokens for instruction + input + output combined
- If samples exceed this, they get truncated → model learns a truncated version
- Increasing this uses more VRAM

### Gradient Accumulation (`gradient_accumulation_steps`)
- Simulates a larger batch size without the VRAM cost
- Accumulates gradients over N batches before updating weights
- Example: batch_size=4, accumulation_steps=4 → effect of batch_size=16 at memory cost of 4
- Use when VRAM limits batch size but stability requires larger effective batch

### TF32
- Ampere architecture GPUs (A100, H100) support TF32 precision mode
- `tf32: true` → faster training, more accurate than FP16 without FP32 memory cost

## Reference: Axolotl YAML Template
```yaml
base_model: meta-llama/Meta-Llama-3-8B
model_type: LlamaForCausalLM
tokenizer_type: AutoTokenizer

load_in_8bit: false    # LoRA
load_in_4bit: false    # set true for QLoRA

datasets:
  - path: account/dataset-name
    type: alpaca

val_set_size: 0.05

adapter: lora
lora_r: 32
lora_alpha: 64

num_epochs: 4
micro_batch_size: 2
learning_rate: 0.0002
warmup_steps: 10
gradient_accumulation_steps: 4
gradient_checkpointing: true
tf32: true
```

## Reading Training Logs
- **Bad sign**: "loss starts low and stays flat" → data is bad (model already knows the answers)
- **Good pattern**: loss ramps up (model recognizes there's something to learn) → steadily comes down (weights updating)
- **OOM error**: most common runtime error. Fix: lower batch size or sequence length.
- Output: only the small LoRA adapter file saved to `output_dir` — not the full model

## Connections
Related concepts: [[sft-techniques]], [[llm-fine-tuning]], [[fine-tuning-data-prep]]
Entities: [[axolotl]], [[llama-factory]]
Introduced by: [[100x-l18-22-llm-finetuning]]

## Open Questions / Unknowns
- What alpha/rank ratio works best for instruction-following tasks vs style-adaptation tasks?
- Is gradient checkpointing always beneficial, or does it slow training enough to be a trade-off decision?
