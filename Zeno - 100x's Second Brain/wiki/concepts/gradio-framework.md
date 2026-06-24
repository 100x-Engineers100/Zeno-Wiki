---
title: "Gradio Framework"
type: concept
tags: [gradio, ui, python, frontend, deployment, 100x-cohort7]
source_count: 2
---

## Definition
Gradio is a Python library for building browser-based UIs in ~4 lines. It wraps a Python function in a web interface, allowing any function to be accessible via a browser without HTML/CSS/JavaScript knowledge. Used in 100x Module 2 as the Level 1 UI layer for AI applications.

## Why It Matters
The fastest path from "Python function that does something" to "shareable app a user can interact with." For prototyping and learning, this eliminates the entire frontend engineering problem — deploy a working UI before you've built any backend.

## How It Works

### Two Interface Patterns

**Form Interface (`gr.Interface`):**
```python
import gradio as gr

def greet(name):
    return f"Hello, {name}"

demo = gr.Interface(fn=greet, inputs="text", outputs="text")
demo.launch()
```
Single input field → button → output field. Stateless. Best for one-shot tasks.

**Chat Interface (`gr.ChatInterface`):**
```python
import gradio as gr

def chat_fn(message, history):
    return f"Echo: {message}"

demo = gr.ChatInterface(fn=chat_fn)
demo.launch()
```
Function signature changes to `fn(message, history)`. History is automatically maintained. Best for iterative, conversational interactions.

**Simulating token streaming:**
```python
def stream_fn(message, history):
    response = ""
    for char in message:
        response += char
        yield response  # yield instead of return = streaming
```
The `yield` in a loop outputs progressively — simulates LLM token-by-token behavior.

### Deployment on Hugging Face Spaces

1. huggingface.co/spaces → profile → New Space → name → Gradio SDK → free hardware → Create
2. Click "create app.py" hyperlink
3. Paste Gradio code into browser editor → Commit
4. Switch to "App" tab → build runs → app is live at public URL

HF Spaces behavior:
- Free hardware (CPU tier)
- Cold start: server spins down when idle; first request after idle takes ~30–60s
- Public URL shareable with anyone
- Embeddable as iframe in any website

### Frontend-Backend Split Pattern

In production, Gradio handles only the UI. Business logic and API keys live in a separate backend:
```python
import gradio as gr
import requests

def diagnose(message, history):
    response = requests.post(
        "http://backend-url/diagnose",
        json={"workflow_description": message},
        timeout=30
    )
    return response.json()["result"]

demo = gr.ChatInterface(fn=diagnose)
demo.launch()
```
The frontend knows: receive input → POST to backend → show result. Nothing else.

## Key Variants / Extensions
- `gr.Interface` — form-style, stateless, single input/output
- `gr.ChatInterface` — chat-style, stateful, message + history
- Streaming — `yield` inside function body; compatible with ChatInterface
- Multiple inputs — `gr.Interface(fn=f, inputs=["text", "slider"], outputs="text")`
- Custom components — sliders, image upload, audio, video, dataframes

## Examples
- 100x Module 2 (L04): chat UI for workflow diagnosis (Arav's problem)
- Hello World equivalent: `gr.Interface(fn=lambda x: f"Hello {x}", inputs="text", outputs="text")`

## Connections
Related concepts: [[interface-types]], [[full-stack-llm-architecture]], [[fastapi-patterns]], [[http-rest-api]]
Introduced by: [[100x-cohort7-module2-l04-l06]], [[100x-cohort7-module2-llm]]

## Open Questions / Unknowns
- When does Gradio become insufficient as a UI? (Rough answer from lectures: when you need auth, custom branding, or a mobile-native feel → move to Next.js)
- Is HF Spaces suitable for production backend APIs, or only for Gradio frontends?
