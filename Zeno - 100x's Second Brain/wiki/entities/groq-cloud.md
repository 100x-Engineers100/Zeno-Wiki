---
title: "Groq Cloud"
type: entity
entity_type: tool
tags: [llm, inference, api, backend, 100x-cohort7]
---

## Overview

Groq Cloud is the fastest publicly available open-source LLM inference service. Used throughout 100x Cohort 7 Module 2 as the default inference provider for all backend exercises because of speed, cost (free tier), and OpenAI-compatible API surface.

API key prefix: `gsk_`. Setup: console.groq.com → API Keys → Create key → set 90-day expiry (limits blast radius if key is leaked to GitHub).

## Key Details

- **Free tier**: 30 req/min, 14,400 req/day (main bottleneck for production apps)
- **Models available**: Llama 3.1 8B, Llama 3.3 70B Versatile (primary), GPT OSS, and others
- **SDK**: `from groq import Groq` — interface identical to OpenAI SDK; drop-in replacement for `openai.OpenAI()`
- **Pricing**: Near-zero at cohort scale; Llama 3.1 much cheaper than GPT-4

## Typical Usage (Module 2 Pattern)

```python
from groq import Groq
import os

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": "You are a workflow diagnosis assistant."},
        {"role": "user", "content": workflow_description}
    ],
    max_tokens=1024
)
result = completion.choices[0].message.content
```

## Why Chosen Over OpenAI in Module 2

1. Free tier removes payment barrier for 250+ cohort students
2. Speed matters for live coding — Groq's inference is significantly faster
3. Llama 3.3 70B quality sufficient for all Module 2 exercises
4. Key expiry best practice teachable moment (set 90-day expiry by default)

## Connections

Related entities: [[siddhant]], [[100x-engineers]]
Appears in sources: [[100x-cohort7-module2-l04-l06]], [[100x-cohort7-module2-l07-l10]]
Related concepts: [[fastapi-patterns]], [[http-rest-api]], [[mvp-build-cycle]]
