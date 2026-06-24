---
title: "Gaussian Splat 3D Scenes"
type: concept
tags: [diffusion, freepik, 3d, gaussian-splat, environment-consistency, 100x-cohort7, module1]
source_count: 1
---

## Definition
Gaussian Splat 3D Scenes is FreePik's feature that converts any 2D image into a navigable 3D spatial environment. The 3D representation provides a fixed spatial reference so that all subsequent image/video generations share the same consistent environment — solving the environment inconsistency problem inherent to diffusion.

## Why It Matters
Diffusion re-hallucinates the background on every generation run. Prompting cannot hold an environment consistent across shots. Gaussian Splat gives the model a fixed 3D space: every frame captured from that space shares the same geometry, lighting, and visual context. This is the foundation for consistent multi-shot filmmaking with AI.

## How It Works

1. Generate or upload any environment image (no character — environment only)
2. Upload to FreePik → All Tools → 3D → 3D Scenes
3. FreePik converts image to navigable Gaussian Splat (~2200 credits)
4. Navigate with WASD + mouse; spacebar = capture frame
5. Add cameras: multiple angles without re-generating the environment
6. Add 3D objects: upload reference image → Generate 3D (~1600 credits) → drag into scene

**Camera controls inside 3D Scene:**
| Setting | Values | Use |
|---------|--------|-----|
| Focal length | 35mm | Standard / general |
| | 50mm | Portrait |
| | 200mm | Close-up |
| | Wide | Environment shots |
| Aperture | f/1.4–f/2 | Shallow DOF, background blur |
| | f/11 | Everything in focus |

**Character placement workflow:**
1. Capture frame from desired angle in 3D Scene
2. Take captured frame to Nano Banana Pro
3. Add character reference + prompt: "same pose and composition, dressed as X"
4. Generate — character placed in consistent environment
5. Don't like angle? Reopen scene, reframe, recapture. No full regeneration needed.

## Key Variants / Extensions
- **Blender workaround**: Take viewport screenshot of Blender scene → upload as base image. .obj files supported; .blend import not yet available.
- **3D object generation**: Upload reference image → FreePik generates 3D object using Triple 3D model → drag into scene. Topology not production-ready — reference use only.
- **Prompt variations**: Apply rain/fire/night variations within same spatial reference → visually consistent across all variants.

## Examples
- Multi-shot AI film: Establish environment in 3D Scene → capture 5 angles → use each as consistent background for character shots
- Product photography: Environment (store shelf, outdoor setting) created once → product + variant shots all share same background

## Connections
Related concepts: [[freepik-platform]], [[ai-filmmaking-workflow]], [[cinematic-shot-node]], [[freepik-spaces-workflows]]
Introduced by: [[100x-l13-freepik-3d-motion-upscaling]]

## Open Questions / Unknowns
- When will .blend import be supported? (Currently only .obj)
- What is the quality ceiling vs. manually compositing in ComfyUI with consistent seeds?
