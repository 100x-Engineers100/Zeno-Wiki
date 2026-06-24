---
title: "Voice Cloning"
type: concept
tags: [voice, tts, elevenlabs, ai-content, audio, 100x-cohort7, module1]
source_count: 1
---

## Definition
Voice cloning creates a digital replica of a person's voice from audio recordings. The clone can then speak any text in the original person's voice, enabling content creation without the person being present for every recording session.

## Why It Matters
Content creators who want to produce high-volume video content — tutorials, explainers, product demos — cannot record every script session. A professional-quality voice clone records once, then generates audio for any future script in minutes. Combined with an AI avatar, this enables fully automated A-roll production.

## How It Works (ElevenLabs)

### Three Clone Types
| Type | Input | Quality | Use case |
|------|-------|---------|----------|
| Voice Design | Text description of vocal characteristics | New unique voice | When you don't want to use your own voice; custom persona |
| Instant Clone | Short audio clip | Good | Quick testing |
| Professional Clone | 2+ hours of varied speech | Near-identical | Production use, long-term content creation |

### Key Settings (for speech generation)
| Setting | Value | Notes |
|---------|-------|-------|
| Model | Multilingual V2 | Most used by 100x team |
| Speed | Reduce from fast | More natural pace |
| Stability | 50% | Higher = more variability on unfamiliar words |
| Similarity | 70–75% | 100% breaks output |
| Style Exaggeration | 35–40 | Higher = over-dramatization |

### Special Features
- **Multilingual**: Paste any language text → model speaks in your cloned voice (Spanish, Russian, Japanese, etc.)
- **Voice Changer**: Upload any video → replaces audio track with your cloned voice. Changes voice texture, not accent.
- **Sound Effects**: Prompt + duration → 4 variations (~10 credits/second)

### Copyright-safe custom voice
Use Voice Design: describe characteristics (warm, baritone, American English accent) without naming a celebrity. ElevenLabs generates a new voice with those traits — no copyright issue.

## Key Variants / Extensions
- **Open-source alternatives**: FITTS, Chatterbox, Index TTS — for self-hosted/private voice generation
- **ElevenLabs Flows**: Node-based workflow builder (similar to FreePik Spaces) for complex audio pipelines
- **11 Agents**: LLM-based conversational agent feature (covered in LLM module)

## Examples
- 100x/AVTV pipeline: Sridev/Varun record 2+ hours → Professional Clone → generate A-roll audio for all content → HeyGen avatar lip-syncs to that audio
- Multi-language content: Record once in English → generate Spanish, Japanese, Russian versions of same script from single clone

## Connections
Related concepts: [[ai-avatar-system]], [[ai-content-pipeline]], [[freepik-platform]]
Entities: [[elevenlabs]]
Introduced by: [[100x-l14-heygen-elevenlabs-content-pipeline]]

## Open Questions / Unknowns
- What is the quality degradation over time as the speaker's voice naturally changes (age, health)?
- How does Voice Changer perform on heavily edited or music-overlaid audio?
