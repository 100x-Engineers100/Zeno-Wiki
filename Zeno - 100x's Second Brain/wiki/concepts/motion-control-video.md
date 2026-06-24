---
title: "Motion Control for AI Video"
type: concept
tags: [diffusion, freepik, kling, motion-control, video, acting, 100x-cohort7, module1]
source_count: 1
---

## Definition
Motion Control is the technique of transferring real human motion (recorded via video) onto an AI character in generated video. Instead of relying on model interpretation of text prompts, real actor performance is used as a motion reference — enabling precise, nuanced character performance in AI video.

## Why It Matters
Text prompt acting ("walk toward camera, scream and cry") is limited by model interpretation. The model approximates the motion — inconsistent and often wrong. Motion Control bypasses this by using real motion data, making AI character performance as precise as live-action direction.

## How It Works

### Method 1 — Prompt Acting (basic)
- Use Kling 3.0 with start image
- Add text prompt describing action: "walk toward camera, scream and cry"
- Limited by model interpretation; unpredictable results

### Method 2 — Kling Motion Control (recommended)
Path: FreePik → All Tools → Kling 3.0 Motion Control

1. Record a real actor performing the desired motion (4–5 second video)
2. Upload video as **motion reference**
3. Upload AI character image as **start frame**
4. Kling transfers real human motion onto the AI character
5. Result: AI character performs the exact motion captured in reference video

**Tips:**
- Exaggerate lip movement in reference video for better lip sync transfer
- Credits: ~550 for 4 seconds
- Start with Google Video 3.1 Lite (~160 credits) to test before spending on Kling

## Key Variants / Extensions
- **CDance 2.0**: Stronger for physics-based motion and VFX. Better if the shot involves physics simulation (cloth, hair, dynamic objects).
- **Kling 4K**: Kling 3.0 now supports 4K output (~2000 credits). Test at lower res first.

## Examples
- Character performance in a dramatic film scene: record actor, transfer to AI character → precise emotional performance without AI model guessing the movement
- Dance sequence: record dancer → transfer to AI influencer character → consistent motion with character appearance

## Connections
Related concepts: [[freepik-platform]], [[ai-filmmaking-workflow]], [[video-generation-models]], [[gaussian-splat-3d-scenes]]
Introduced by: [[100x-l13-freepik-3d-motion-upscaling]]

## Open Questions / Unknowns
- What is the upper limit of motion complexity that Kling Motion Control can reliably transfer?
- Does CDance 2.0 support motion reference input or only style/physics enhancement?
