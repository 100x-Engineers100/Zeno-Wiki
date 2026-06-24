---
title: "100x Cohort 7 — L14: HeyGen & ElevenLabs — AI Content Clone Pipeline"
type: source
source_type: course_notes
author: "Pranay Prajapati (100x Engineers)"
date: 2026-04-25
raw_path: raw/courses/L14_Notes_Short.txt
tags: [diffusion, heygen, elevenlabs, voice-cloning, ai-avatar, content-pipeline, ugc, 100x-cohort7, module1]
---

## Summary

Final session of the Diffusion Module. Covered how the 100x team produces video content without being on camera using HeyGen (AI avatar) and ElevenLabs (voice cloning). Also covered the full AI content production stack used by AVTV. Lighter session — no ComfyUI or FreePik deep dives. Also included AI news updates and capstone project details for the module.

Key insight: AI handles execution. Human handles creative direction and editing. A YouTube channel cannot be fully automated — idea, structure, and perspective remain human.

## Key Ideas

### ElevenLabs
- **Three voice clone types**: Voice Design (text → new unique voice), Instant Clone (short audio), Professional Clone (2+ hours → near-identical)
- **Key settings**: Multilingual V2 model (most used), Stability 50% default, Similarity 70–75% (100% breaks output), Style Exaggeration 35–40
- **Multilingual output**: Paste any language text → model speaks it in your cloned voice
- **Voice Changer**: Upload any video → replaces audio with cloned voice (doesn't change accent, changes voice texture)
- **Open-source alternatives**: FITTS, Chatterbox, Index TTS
- **Custom voice without copyright issues**: Use Voice Design, describe characteristics without naming the celebrity

### HeyGen
- **What it does**: Record yourself → train AI avatar → avatar speaks any script
- **Recording requirements**: 2–5 minutes to camera, constant eye contact, no hands in front of face
- **Avatar versions**: Avatar 3 (fixes lip sync only, best when training footage imperfect), Avatar 5 (better overall but can distort expressions)
- **Full pipeline**: Write script → ElevenLabs audio (cloned voice) → HeyGen avatar → upload audio (don't select HeyGen voice) → download output → human editor
- **AI Studio**: Timeline editor, B-roll support, media library

### Production Stack (AVTV / 100x team)
Script (human) → A-roll (HeyGen + ElevenLabs) → B-roll (FreePik Spaces) → Edit (After Effects + Premiere Pro) → Music (Suno)

### AI News (high-impact items)
- Tesla Optimus Gen 3 deployed in Tesla factories (logistics/packing)
- MCP under Linux Foundation: Anthropic + OpenAI + Google signed on
- DeepSeek V4: open source, beats Claude Opus on CodeForce, too large to run locally
- Best model for agentic loops: GPT-5.5 (closed), GLM 5.1 (open/code)

## Notable Quotes / Moments

> "You cannot fully automate a YouTube channel — idea, structure, perspective are still human."

> "AI handles execution. Human handles creative direction and editing."

> "AI content detection: Google SynthID watermarks AI content. Clients: be upfront. For ads, detection is fine — viewers don't see it."

## Concepts Introduced
[[voice-cloning]], [[ai-avatar-system]], [[ai-content-pipeline]], [[freepik-spaces-workflows]]

## Entities Mentioned
[[pranay]], [[heygen]], [[elevenlabs]], [[freepik-platform]], [[sridev]]

## Contradictions / Tensions
ElevenLabs music: not great (use Suno instead). FreePik audio also powered by 11 Labs — consistent finding across L13 and L14.

## Open Questions
- Avatar 4 described as a "downgrade" — why? Technical regression or feature tradeoff?
- When will HeyGen enable direct FreePik Spaces integration?
- What is the production cost per minute for the full AVTV pipeline?
