---
title: "ElevenLabs"
type: entity
entity_type: tool
tags: [voice-cloning, tts, audio, ai, 100x-cohort7]
---

## Overview
AI voice platform specializing in voice cloning, text-to-speech, and audio generation. Used by the 100x/AVTV team as the primary voice source for HeyGen avatar content. Produces the cloned voice audio that HeyGen avatars lip-sync to.

## Key Contributions / Role
- Three clone types: Voice Design (text → unique voice), Instant Clone (quick), Professional Clone (2+ hours → near-identical)
- Multilingual V2 model: paste any language text → speaks in your cloned voice
- Voice Changer: swap audio in any video to your cloned voice (texture, not accent)
- Sound effects: prompt + duration, ~10 credits/second
- Flows: node-based workflow builder
- 11 Agents: LLM-based agent feature (covered in LLM module)
- Music: weak; use Suno instead

## Connections
Related entities: [[heygen]], [[pranay]]
Appears in sources: [[100x-l14-heygen-elevenlabs-content-pipeline]]

## Notes
FreePik's audio/sound effects feature is also powered by ElevenLabs under the hood. Key setting: Similarity at 70–75% (100% breaks output). Open-source alternatives: FITTS, Chatterbox, Index TTS.
