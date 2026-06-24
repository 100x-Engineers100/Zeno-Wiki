---
title: "AI Avatar System (HeyGen)"
type: concept
tags: [heygen, ai-avatar, video, content-creation, lip-sync, 100x-cohort7, module1]
source_count: 1
---

## Definition
An AI avatar is a photorealistic digital clone of a real person trained from video footage. Given any audio input, the avatar generates a video of the person appearing to speak that audio — with synchronized lip movement, facial expressions, and body language derived from training footage.

## Why It Matters
Content creators, educators, and businesses need to produce high volumes of video without recording every session. An AI avatar makes the person's appearance infinitely reusable. Combined with a voice clone, the full A-roll production becomes automated — the human only provides the script.

## How It Works (HeyGen)

### Training
1. Record 2–5 minutes of yourself speaking directly to camera
2. Maintain constant eye contact; no hands in front of face; good lighting
3. Upload via HeyGen → Avatars → Clone a Real Person → Upload → Create Avatar

### Avatar Model Versions
| Version | Behavior | When to use |
|---------|----------|-------------|
| Avatar 3 | Fixes lip sync only, preserves original footage expression/movement | Training footage imperfect; most reliable |
| Avatar 4 | Downgrade (avoid) | — |
| Avatar 5 | Better overall quality, but can distort expressions | Training footage was clean and high-quality |

### Full Production Pipeline
1. Write script
2. Generate audio in ElevenLabs with cloned voice → download .mp3/.wav
3. HeyGen → your avatar → Add Script → Upload (the ElevenLabs audio file)
4. **Do NOT select a voice in HeyGen** — it will use the uploaded audio as-is
5. Select Avatar 3 or 5, set resolution 1080p, choose landscape/portrait
6. Submit → download output → send to human editor

### AI Studio
- Timeline editor with B-roll support and media library
- Used by Sridev for structured content production

## Key Variants / Extensions
- **Avatar Shorts**: HeyGen's short-form video feature (similar to CDance)
- **Human editor still required**: AI generates A-roll only. Human editor adds B-rolls, cuts, effects in After Effects + Premiere Pro.

## Examples
- AVTV / 100x content: Sridev and Varun use this pipeline to post content without being on camera
- Educational content: instructor records training footage once → avatar generates course video content on demand

## Connections
Related concepts: [[voice-cloning]], [[ai-content-pipeline]], [[freepik-spaces-workflows]]
Entities: [[heygen]], [[elevenlabs]]
Introduced by: [[100x-l14-heygen-elevenlabs-content-pipeline]]

## Open Questions / Unknowns
- Why is Avatar 4 a downgrade vs Avatar 3? What changed architecturally?
- What is the generation cost per minute for Avatar 3 vs Avatar 5 at 1080p?
