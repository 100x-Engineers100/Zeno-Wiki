---
title: "AI Image & Video Upscaling"
type: concept
tags: [diffusion, freepik, upscaling, magnific, topaz, image, video, 100x-cohort7, module1]
source_count: 1
---

## Definition
AI upscaling increases the resolution of images or videos beyond the original generated resolution. Two paradigms: precision (pixel-accurate enlargement, no creative change) and creative (diffusion-based enhancement that adds texture/detail but can drift the subject).

## Why It Matters
AI-generated images are often produced at lower resolutions for speed and cost, then upscaled only when approved. Upscaling at the wrong stage wastes credits. The correct workflow is: generate low-res → iterate until approved → upscale only the final.

## How It Works

### Precision Upscaling (Magnific — FreePik)
- Pixel-accurate: no character drift, no prompt needed
- Models: V2 Photo, Sublime
- Scale: 2X (~90 credits), 4X (~360 credits), 8X (~1440 credits)
- Use when: character/face must remain identical; product shots; any content where drift is unacceptable

### Creative Upscaling (Magnific — FreePik)
- Diffusion-based: adds texture, grain, realism — can drift character appearance
- Key settings:
  - Creativity: 2–3 (sweet spot). Higher = more creative changes, more drift.
  - Similarity: ~70. Inverse relationship with creativity.
  - Resemblance: inverse of creativity. Raise = stay closer to original.
  - Fractality: 0 (default). Avoid increasing.
  - Optimized for: Films & Photography mode
  - Prompt: describe what you want enhanced (e.g., "skin texture, fabric detail")
- Use when: adding photorealism to rendered/illustrated content where some drift is acceptable

### Video Upscaling
- Available in FreePik → All Tools → Video Upscaler
- Instructor preference: **Topaz** over Magnific for video (better temporal consistency)
- Same precision/creative paradigm applies

## Key Variants / Extensions
- **Topaz Video AI**: External tool (not FreePik-native). Better than Magnific for video — smoother temporal consistency, less flickering between frames.
- **Workflow principle**: Never upscale during iteration. Upscale only the final approved output.

## Examples
- Character LoRA outputs: generate at 512px or 768px → iterate → approve → upscale 4X with Magnific Precision
- Cinematic frame: generate scene → creative upscale at Creativity 2 → adds film grain and texture without losing composition

## Connections
Related concepts: [[freepik-platform]], [[gaussian-splat-3d-scenes]], [[ai-filmmaking-workflow]]
Introduced by: [[100x-l13-freepik-3d-motion-upscaling]]

## Open Questions / Unknowns
- When is Topaz Video AI directly integrated into the FreePik/ComfyUI pipeline?
- What is the actual quality difference between Magnific 8X and Topaz for video content?
