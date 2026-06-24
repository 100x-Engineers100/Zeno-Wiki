---
title: "100x Cohort 7 — L13: FreePik 3D Scenes, Motion Control, Upscaling"
type: source
source_type: course_notes
author: "Pranay Prajapati (100x Engineers)"
date: 2026-04-24
raw_path: raw/courses/L13_Notes_Short.txt
tags: [diffusion, freepik, 3d, motion-control, upscaling, kling, 100x-cohort7, module1]
---

## Summary

Last technical session of the Diffusion Module. Introduced FreePik's 3D Scenes feature — the primary solution to environment inconsistency across video/image shots. Covered the full Gaussian Splat workflow, real cinematography controls inside 3D scenes, and the character placement pipeline. Also introduced image and video upscaling tools, Kling Motion Control for real-motion transfer, and GPT Image 2 on FreePik.

The core problem solved: diffusion re-hallucinates the scene on every run, making background consistency impossible with prompting alone. 3D Scenes fix this by giving the model a fixed spatial reference.

## Key Ideas

- **3D Scenes / Gaussian Splat**: Upload any image → FreePik generates a navigable 3D space. WASD + mouse navigation, spacebar to capture frame. Consistent spatial reference = consistent environment across all shots.
- **Camera settings inside 3D**: Focal length (35mm standard, 50mm portrait, 200mm close-up) and aperture (f/1.4–2 = shallow DOF, f/11 = everything sharp) map real cinematography to AI generation.
- **Character placement workflow**: Generate environment → upload to 3D Scenes → navigate + frame → capture frame → Nano Banana Pro → add character reference + prompt → generate. Reframe without full regen.
- **Precision upscaler (Magnific)**: Pixel-accurate, no character change, no prompt. Models: V2 Photo / Sublime. 2X/4X/8X. Credits: ~90/360/1440.
- **Creative upscaler**: Diffusion-based, adds texture/realism, can drift character. Creativity 2–3 sweet spot. Similarity ~70. Fractality = 0.
- **Motion Control (Kling 3.0)**: Record real actor performing motion → upload as motion reference + AI character as start frame → Kling transfers real human motion onto AI character.
- **FreePik vs ComfyUI rule**: Client OK with closed source → FreePik. Client wants open source or app deployment → ComfyUI.
- **GPT Image 2 on FreePik**: Strong prompt following, weak character consistency. Nano Banana Pro still better for consistency.
- **Kling 4K**: New 4K output from Kling 3.0 (~2000 credits). CDance 2.0 better for physics/VFX. Test first with Google Video 3.1 Lite (~160 credits).

## Notable Quotes / Moments

> "Environment inconsistency across shots: prompting can't hold a background consistent because diffusion re-hallucinates the scene every run. Fix: give the model a fixed 3D space to navigate."

> "AI 3D topology is not production-ready — use as reference only."

> "Rule: client is okay with closed source → FreePik. Client wants open source / you're building apps → ComfyUI."

## Concepts Introduced
[[gaussian-splat-3d-scenes]], [[image-upscaling-ai]], [[motion-control-video]], [[cinematic-shot-node]], [[freepik-platform]]

## Entities Mentioned
[[pranay]], [[freepik-platform]], [[kling]], [[heygen]]

## Contradictions / Tensions
Topaz preferred over Magnific for video upscaling (instructor preference). Magnific recommended for images.

## Open Questions
- When will FreePik 3D Scenes support .blend file imports (currently only .obj)?
- What is the credit cost breakdown for CDance 2.0 vs Kling 3.0 for 4K output?
