---
title: "MVP Build Cycle"
type: concept
tags: [mvp, deploy, fastapi, render, gradio, function-first, 100x-cohort7]
source_count: 2
---

## Definition
The MVP Build Cycle is a sequenced approach to going from hypothesis to deployed app: function-first (core business logic) → eval (what good looks like) → API (expose the function) → deploy (Render backend) → UI (Gradio/HF Spaces frontend). This reverses the common mistake of starting with UI before the core problem is solved.

## Why It Matters
Most beginners build in the wrong order: spend time on UI, database schema, and deployment setup before validating that the core function actually solves the problem. By the time the UI looks good, the logic is often wrong. Starting from the function forces validation of the hypothesis before any scaffolding is built.

## How It Works

### Stage 1 — Function (Core Business Logic)
Write the single Python function that does the thing. No UI. No API. No database.

```python
def diagnose(workflow_description: str) -> str:
    # Call LLM with system prompt + user input
    # Return structured plan
```

Test it by running `python main.py` locally. Pass a real workflow description. Read the output. Decide if it solves the problem. Iterate on the prompt until it does.

This is the only stage that requires deep thinking. Everything else is scaffolding.

### Stage 2 — Eval (Codify What Good Looks Like)
Before adding an API, write the eval. See [[eval-first-design]].

### Stage 3 — API (Expose the Function)
Wrap the function in FastAPI:

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class DiagnoseRequest(BaseModel):
    workflow_description: str

@app.post("/diagnose")
def diagnose_endpoint(req: DiagnoseRequest):
    plan = diagnose(req.workflow_description)
    return {"plan": plan}
```

Use `POST` for operations that generate/create (diagnosis creates a plan). Write tests immediately: health check, happy path, empty input, missing fields.

### Stage 4 — Deploy Backend (Render)
1. Push to GitHub (public repo)
2. Add `.env` to `.gitignore` before first push
3. Run `pip freeze > requirements.txt` and commit
4. Create Render Web Service → connect GitHub repo
5. Build command: `pip install -r requirements.txt`
6. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Add API keys as environment variables in Render dashboard
8. Deploy → Render auto-deploys on every commit to main

**Render vs Serverless (AWS Lambda / Vercel Functions):**
- Serverless has timeout limits (~15-30s) — LLM calls can exceed this
- Render gives a full machine to control
- Render free tier: one service, auto-sleep on inactivity (cold start ~30-40s on resume)
- For multi-LLM call workflows: always use Render or similar persistent server

**Branch strategy:** use `dev` branch for active development; merge to `main` only when stable (main = what Render deploys).

### Stage 5 — UI (Gradio on HF Spaces)
Build the frontend only after the backend is live and working.

```python
import gradio as gr
import requests
import os

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

def chat(message, history):
    response = requests.post(f"{BACKEND_URL}/diagnose", 
                             json={"workflow_description": message})
    return response.json()["plan"]

gr.ChatInterface(fn=chat).launch()
```

Deploy to HF Spaces → set `BACKEND_URL` secret = Render deployed URL → Spaces calls the backend from its own machine.

### Stage 6 — Auth + Rate Limiting (Scale Preparation)
Add Supabase Auth once the core product is validated with real users.
- Enable email provider in Supabase Auth
- Each authenticated user gets a user ID → FK root for all their data
- Rate limit per user (e.g., 10 req/min) before hitting Groq's 30 req/min limit
- Calculate unit economics: tokens per request × model price × expected users

## Key Variants / Extensions
- **Napkin math before auth**: estimate tokens per request (use TikToken), multiply by model price, calculate cost at expected scale before committing to paid tiers
- **Code Rabbit**: automated code review tool, free for public repos; add to GitHub before production
- **CLAUDE.md plan-review mode**: forces Claude to document its plan before implementing; prevents the "Claude deployed to AWS instead of Render" failure mode
- **Function decomposition**: as functions grow, extract sub-functions. `diagnose()` → `evaluate()` → each becomes its own API endpoint; modular backend built incrementally

## Examples
**100x C7 L10 live build (Workflow Diagnosis App):**
- Total time: ~2.5 hours from blank terminal to live deployed app
- Function: `diagnose(workflow_description)` via Groq Llama 3.1 8B
- Eval: 15-criteria rubric written by Claude Opus
- API: `POST /diagnose`, `POST /evaluate` — 2 endpoints
- Deploy: Render Web Service, Singapore region
- UI: Gradio ChatInterface on HF Spaces
- Auth: Supabase email auth (demo only — not completed live due to time)
- Final: authenticated user submits workflow → backend diagnoses → plan returned with eval score

**Rule of thumb from Siddhant:** if you can manually do the input→output yourself (copy-paste workflow description, run function, send plan to user), that's enough for an MVP. The UI/API/DB layer is just exposing that manual process to the world.

## Connections
Related concepts: [[eval-first-design]], [[fastapi-patterns]], [[database-fundamentals]], [[supabase]], [[gradio-framework]], [[deterministic-vs-generative-separation]]
Introduced by: [[100x-cohort7-module2-l07-l10]], [[100x-cohort7-module2-llm]]

## Open Questions / Unknowns
- When does the free Render tier become a constraint (memory, CPU, concurrent requests)?
- How to handle cold start problem for production UX — ping service every N minutes?
- When to move from Gradio to a proper frontend (React/Next.js)?
