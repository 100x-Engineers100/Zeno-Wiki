---
title: "FastAPI Patterns"
type: concept
tags: [fastapi, python, api, backend, 100x-cohort7]
source_count: 3
---

## Definition
FastAPI is a modern Python web framework for building APIs with automatic data validation (via Pydantic), async support, and auto-generated interactive documentation. It is the standard backend framework for production GenAI applications in the 100x cohort.

## Why It Matters
FastAPI handles concurrent LLM API calls efficiently via `async def`, enforces type-safe request/response contracts via Pydantic, and auto-generates Swagger/ReDoc docs — reducing boilerplate and catching errors before they reach production.

## How It Works

### Core Anatomy of a FastAPI App
```python
from fastapi import FastAPI
from pydantic import BaseModel

# 1. Define request/response models (Pydantic)
class InputData(BaseModel):
    query: str
    max_results: int = 5

class OutputData(BaseModel):
    status: str
    results: list = []

# 2. Create app instance
app = FastAPI()

# 3. Define endpoints with decorators
@app.post("/process-data/", response_model=OutputData)
async def process_data_endpoint(data: InputData):
    return OutputData(status="success", results=["result1", "result2"])

@app.get("/")
async def root():
    return {"message": "Welcome"}

# Run: uvicorn main:app --reload
```

### L06 Minimal Pattern (First Principles Entry)

Before Pydantic and async, L06 introduced the simplest possible FastAPI backend — `body: dict`, OS-level env vars, Groq SDK:

```python
from fastapi import FastAPI
from groq import Groq
import os

app = FastAPI()
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.get("/")
def root():
    return {"message": "Hello Builder"}

@app.post("/diagnose")
def diagnose(body: dict):
    workflow_description = body["workflow_description"]
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a workflow diagnosis assistant."},
            {"role": "user", "content": workflow_description}
        ],
        max_tokens=1024
    )
    return {"result": completion.choices[0].message.content}
```

Key choices for L06:
- `body: dict` instead of Pydantic BaseModel — intentional; reduces cognitive load for beginners
- `os.environ.get("GROQ_API_KEY")` via `export GROQ_API_KEY=gsk_...` in terminal — no `.env` file needed locally
- Plain `def` not `async def` — simplest path; upgrade to async when scaling LLM calls
- Return plain `{"key": value}` dict — FastAPI converts to JSON automatically

Pedagogy: function first → test manually → expose as API. Never wire up FastAPI before the core function works.

### Message Roles — System / User / Assistant

Every LLM API call uses a `messages` array with three roles:

| Role | Purpose |
|---|---|
| `system` | Persistent instructions for the session; overrides model defaults; equivalent to ChatGPT's "Custom Instructions" |
| `user` | The actual input from the human or upstream system |
| `assistant` | Previous LLM responses; enables multi-turn conversation history |

For the workflow diagnosis app: `system` sets the assistant's persona and constraints; `user` receives the Gradio chat input.

### Three Key Patterns

**1. Pydantic for Data Validation**
- Define input/output shapes as Python classes extending `BaseModel`
- FastAPI automatically validates incoming requests against the model
- Returns structured, informative errors on mismatch
- Powers auto-generated API documentation
- Why not plain dicts: Pydantic gives type safety, auto-validation, and clean error messages

**2. Decorators for Routing**
- `@app.post("/path")` — maps HTTP POST requests to Python function
- `@app.get("/path")` — maps HTTP GET
- `@app.put("/path")` and `@app.delete("/path")` for update/delete
- URL path parameters: `@app.get("/item/{item_id}")`

**3. Async Def for Non-Blocking I/O**
- `async def` + `await` enables non-blocking behavior
- Critical for LLM API calls (high latency, often parallel)
- Server continues handling other requests while waiting for OpenAI/Claude response
- Synchronous endpoints block the server thread — bad at scale

### CRUD Mapping to HTTP
| CRUD Action | HTTP Method | Use Case |
|-------------|------------|----------|
| Create | POST | Add new record |
| Read | GET | Fetch data |
| Update | PUT / PATCH | Modify record |
| Delete | DELETE | Remove record |

### Running FastAPI
```bash
uvicorn main:app --reload
# main → filename (main.py)
# app → FastAPI instance variable name
# --reload → hot reload on code change
```

Auto-generated docs available at:
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

### Supabase Integration Pattern
```python
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()
supabase_client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")  # service_role key — server only
)

# Insert: supabase_client.table("customers").insert(data).execute()
# Read: supabase_client.table("customers").select("*").execute()
```

### Environment Variable Pattern
- Store secrets in `.env` file locally
- Never commit `.env` to version control
- On deployment platforms (Render, Railway): set as environment secrets
- Use `python-dotenv` to load: `from dotenv import load_dotenv; load_dotenv()`

### Deployment Pattern (Render/Railway)
```bash
# Start command for deployment
uvicorn main:app --host 0.0.0.0 --port $PORT
# $PORT (not hardcoded 8000) — platform assigns dynamic port
```

## Key Variants / Extensions
- **LLM endpoint pattern** — POST endpoint receives query, calls LLM API, returns structured response
- **RAG endpoint pattern** — adds vector DB lookup before LLM call
- **Streaming responses** — `StreamingResponse` for real-time token output
- **Authentication middleware** — JWT validation via Supabase Auth before processing

## Examples
**Lead qualification endpoint (100x AI CRM):**
```python
@app.post("/qualify_lead")
async def qualify_lead(data: LeadInput):
    # Build prompt with few-shot examples
    # Call Groq API
    # Parse JSON response
    # Return score + reasoning
```

## Connections
Related concepts: [[full-stack-llm-architecture]], [[domain-modeling]], [[production-genai-stack]], [[six-easy-pieces-philosophy]]
Introduced by: [[100x-cohort7-module2-llm]], [[100x-cohort7-module2-l04-l06]], [[100x-cohort7-module2-l07-l10]]

## Open Questions / Unknowns
- When to use FastAPI vs Django? — FastAPI for API-first apps; Django when you need full ORM + admin panel out of the box.
- How does FastAPI compare to tRPC for Next.js-first stacks?
