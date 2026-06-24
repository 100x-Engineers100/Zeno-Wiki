---
title: "100x Cohort 7 — Module 2 L04–L06: UI Code Path, HTTP/API Fundamentals, FastAPI"
type: source
source_type: course_notes
author: "Siddhant (100x Engineers)"
date: 2026-05-29
raw_path: raw/courses/
tags: [ai, llm, full-stack, api, gradio, fastapi, http, 100x-cohort7, interfaces, product-building]
---

← Module overview: [[100x-cohort7-module2-llm]]

## Summary

L04–L06 form the core practical arc of Module 2: from choosing a UI pattern, to understanding how machines talk to each other via HTTP/JSON, to wiring up a Python backend that hides sensitive API keys. The three lectures build a single working mini-application — a Gradio chat interface → FastAPI backend → Groq Cloud Llama 3.3 — through first-principles reasoning at every step, never jumping to a framework before establishing why it exists.

The pedagogical frame throughout: understand the interface contract before touching the library. Every tool (Gradio, requests, FastAPI, uvicorn) is introduced only after the problem it solves has been made visceral.

---

## L04 — Working with UI (Code Path) — 2026-05-29

### Interface Selection

Choosing an interface type is a design decision, not a technical one. The four available patterns:

| Type | When to use |
|---|---|
| Form | Structured input → single output; one-shot interaction |
| Chat | Open-ended, iterative, conversational; history matters |
| Voice | Hands-free; ambient environment |
| Video | Requires visual context; higher bandwidth |

For Arav's workflow diagnosis problem: **chat chosen**. Reasoning: the interaction is more "conversational than a form" — user describes a workflow, gets a multi-step plan, can follow up. No right or wrong choice; different interfaces serve different audiences.

### Gradio Framework

Gradio is a Python library for building browser-based UIs in ~4 lines. Acquired by Hugging Face; 42K+ GitHub stars. Level 1 (easiest path to browser UI); Streamlit = Level 2 (more customization but more code).

**Basic interface (form):**
```python
import gradio as gr

def greet(name):
    return f"Hello {name}"

demo = gr.Interface(fn=greet, inputs="text", outputs="text")
demo.launch()
```
`gr.Interface` = form-style UI; input field + button + output field. Default if no interface type specified.

**Chat interface:**
```python
import gradio as gr

def chat_fn(message, history):
    response = ""
    for character in message:
        response += character
        yield response  # simulates token streaming

demo = gr.ChatInterface(fn=chat_fn)
demo.launch()
```
`gr.ChatInterface` accepts a function with signature `fn(message, history)`. The `yield` inside a for loop simulates LLM token streaming — outputs character by character. Chat interface saves conversation history automatically.

Key difference from form interface: function signature changes from `fn(input_text)` to `fn(message, history)`.

### Deploying to Hugging Face Spaces

Step-by-step (simplest path — web UI only, no git):
1. Go to huggingface.co/spaces
2. Profile icon → New Space → name the space → keep Gradio default → free hardware → Create Space
3. Click the "create app.py" hyperlink in the empty space dashboard
4. Paste Gradio code directly in browser editor → Commit new file
5. Switch to "App" tab → build process runs → app goes live

HF Spaces gives free hardware (CPU). Cold start: if app idle, HF shuts down the server; next visit takes a few seconds to warm up. No manual management needed. App accessible at public URL; can also be embedded as iframe anywhere.

This is the Hello World equivalent: "took me 3 months to first deploy something live when I learned engineering. You did it in 5 minutes."

### app_frontend.py Pattern

The actual frontend code used in this cohort (sends to backend, doesn't call LLM directly):
```python
import gradio as gr
import requests

def diagnose(message, history):
    response = requests.post(
        "http://127.0.0.1:8000/diagnose",
        json={"workflow_description": message},
        timeout=30
    )
    return response.json()["result"]

demo = gr.ChatInterface(fn=diagnose)
demo.launch()
```
The frontend only knows: send user input to backend URL, get result back. API key lives only in backend.

---

## L05 — Intro to API: The Second Interface — 2026-05-30

### API from First Principles

API = Application Programming Interface = the second interface (UI is first). If UI = human↔machine, API = machine↔machine.

Building block exercise: how do two machines communicate when they don't share a native language? Need three things:
1. **Location (URL/endpoint)** — where is the other machine? What address can I reach it at?
2. **Common language (JSON)** — what format does the data travel in that both sides understand?
3. **Rules (HTTP protocol)** — what are the agreed behaviors? What methods exist?

Every API call on Earth compresses down to these four fields:
```
endpoint:  https://api.example.com/chat/completions
method:    POST
headers:   { Authorization: Bearer <key>, Content-Type: application/json }
body:      { "model": "llama-3.3", "messages": [...] }
```

### HTTP Methods (CRUD)

| Method | Meaning | Use case |
|---|---|---|
| GET | Read / fetch | Get weather data, fetch a list |
| POST | Create / generate | Send a message, generate a report |
| PUT | Replace entire resource | Update a workflow (overwrite) |
| PATCH | Partial modification | Update one field of a record |
| DELETE | Remove | Delete an item |

CRUD = Create/Read/Update/Delete = POST/GET/PUT/DELETE.

Immutability preference (Siddhant): prefer PUT over PATCH because replacing avoids partial-state bugs; "I don't want anything in my software that has history or trauma."

**Quiz answers from the lecture:**
- "Give me weather for Bangalore" → GET (fetching existing data)
- "Update weather to 24°C" → PUT (replacing existing data)
- "Send a message to ChatGPT" → POST (creating/generating a response)

The ChatGPT example is deliberately tricky: sending a message feels like "fetching a response" but it's POST because you're asking the server to **generate** something, not read existing data.

### HTTP — Where the Protocol Comes From

HTTP = Hypertext Transfer Protocol. Hypertext = clickable text on a web page. The original internet was just linked pages; the entire communication protocol was designed for that — and it became the standard for everything.

"We replicated exactly what Tim Berners-Lee and the HTTP designers did 50–60 years ago. We found: where's the machine, what language, what rules. That's the whole of it."

### JSON — The Universal API Language

JSON = JavaScript Object Notation. Key-value pairs in curly braces. Universal data format because every programming language can parse it — Python, JavaScript, Java, Go, everything.

```json
{
  "model": "llama-3.3",
  "messages": [
    { "role": "user", "content": "What is the weather?" }
  ]
}
```

Live demo: Siddhant opens Chrome DevTools → Network tab → XHR → sends a message in ChatGPT → shows exact JSON payload going to ChatGPT's backend endpoint. Confirms: same URL + same method + same JSON format for all API calls.

### API as Design Skill

The theoretical part of this lecture (URL, method, body, response) is "actually a well-paid job at a senior level — API design, understanding the input/output contract and connecting different resources."

The key insight: every backend service (weather, ChatGPT, Groq, your own FastAPI) is just a machine waiting for the right URL + method + JSON body. Once you know the contract, you can connect anything to anything.

### Groq Cloud

Groq Cloud = fastest open-source model inference available publicly. Free API keys (prefix: `gsk_`). Models available: Llama 3.1, Llama 3.3 (70B), GPT OSS, and others. Used throughout Module 2 because of speed + cost.

Setup: consolegrok.com → sign in with Google/GitHub → API keys → Create New API key → set 90-day expiry → copy key.

Why set expiry: if key leaks (accidentally committed to GitHub), it expires automatically.

---

## L06 — Building APIs with FastAPI (Code Path) — 2026-06-05

### Why Backend Needed

Recap problem: if Groq API key lives in `app_frontend.py` deployed on Hugging Face, anyone can read it from the source. Solution: move the key to a separate backend file that never gets deployed to HF Spaces.

The rule: **sensitive information → backend. UI code → frontend. Never mix.**

### Backend = A Python Function

Siddhant's framing: backend is just a Python function. Nothing more.
```python
def diagnose(workflow_description):
    # call LLM with workflow description
    # return diagnosis
    return llm_output
```
Once you have this function working (tested manually, returning good output for your target user), THEN you expose it as an API. Not before.

Recommended workflow:
1. Write the function
2. Test it manually — take input from target user (Arav) via WhatsApp, paste into function, verify output
3. When user is happy with output: convert to API
4. Once API works locally: deploy to cloud

This "service before software" approach (run it manually first) = the skeleton/pseudocode pattern. Focus on whether the logic is right before worrying about the plumbing.

### FastAPI — The Minimal Pattern

L06 repo structure:
```
app_frontend.py   ← Gradio chat UI
main.py           ← FastAPI backend
requirements.txt  ← fastapi, groq, gradio, uvicorn
README.md
```

Opened in Cursor IDE (available at cursor.sh).

Minimal FastAPI backend (`main.py`):
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
            {
                "role": "system",
                "content": "You are a workflow diagnosis assistant. Analyze the described workflow and respond in plain text with repeatable steps, automation opportunities, and a suggested MVP."
            },
            {
                "role": "user",
                "content": workflow_description
            }
        ],
        max_tokens=1024
    )
    
    return {"result": completion.choices[0].message.content}
```

Key patterns:
- `@app.post("/diagnose")` = decorator that links URL + method to function
- `body: dict` = accepts JSON as Python dictionary
- Extract from body: `body["workflow_description"]`
- LLM call via Groq SDK: `client.chat.completions.create(model=..., messages=[...])`
- Response extraction: `choices[0].message.content`
- Return JSON: `{"result": ...}` — key-value pair, the common language
- `@app.get("/")` = hello world endpoint; browsers show something when hitting the root URL

### Message Roles — System / User / Assistant

Every LLM API call has a `messages` array with three possible roles:

| Role | What it contains |
|---|---|
| `system` | Custom instructions / system prompt; overrides LLM behavior for entire session |
| `user` | The actual input from the human or upstream system |
| `assistant` | The LLM's previous responses (for multi-turn conversations) |

In ChatGPT: "custom instructions" = role system. Every message you type = role user. ChatGPT's replies = role assistant.

For the workflow diagnosis app: system prompt sets behavior ("you are a workflow diagnosis assistant..."), user content is what RF types into the Gradio interface.

### Running Locally

```bash
# Set API key (OS-level; no .env file needed for local testing)
export GROQ_API_KEY=gsk_your_key_here

# Start backend server
uvicorn main:app --reload
# → server at http://127.0.0.1:8000
# --reload: auto-restart on code changes

# In a second terminal: start frontend
python app_frontend.py
# → Gradio app at http://127.0.0.1:7860
```

Two processes running simultaneously: backend on port 8000, frontend on port 7860. The frontend's `requests.post` call hits `127.0.0.1:8000/diagnose`.

### Testing with FastAPI Docs

Browsers can only make GET requests from the URL bar. To test POST endpoints without curl:
- Navigate to `http://127.0.0.1:8000/docs`
- FastAPI auto-generates Swagger UI with every endpoint
- Click endpoint → "Try it out" → paste request body → "Execute"
- Shows: curl command, request URL, response status code, response body

Status 200 = success. This is how to verify the backend works before connecting the frontend.

### .env vs OS-Level Environment Variables

Both approaches inject secrets without hardcoding them:
- **OS-level** (`export VAR=value`): simpler for local testing; no extra files; must re-set if terminal closes
- **.env file** + `python-dotenv`: persistent across sessions; never commit the `.env` file to GitHub

L06 used OS-level to reduce cognitive load. Real production apps use .env or cloud platform secret management.

### Cloud Deployment — Frontend vs Backend

| Component | Deploy to | Reason |
|---|---|---|
| Frontend (Gradio) | Hugging Face Spaces | Built for Gradio; free; simple |
| Backend (FastAPI) | Railway / Render | Proper API hosting; persistent server; scalable |

HF Spaces is not designed for production backend APIs — it works for Gradio UIs but isn't the right tool for a FastAPI server Arav's users would call.

Railway / Render = "one-click" platforms: connect GitHub repo → auto-detect Python → deploy. No DevOps knowledge required. Start command for deployment: `uvicorn main:app --host 0.0.0.0 --port $PORT` (platform assigns port dynamically).

Legacy enterprise cloud: AWS/GCP/Azure = powerful but steep learning curve; certifications used to be a full job ("DevOps engineer").

### The Complete System — After L06

What's been built across L04–L06:
```
Gradio Chat UI (HF Spaces)
    ↓  POST /diagnose  {workflow_description: "..."}
FastAPI Backend (local / Railway)
    ↓  client.chat.completions.create(...)
Groq Cloud → Llama 3.3 70B
    ↑  {"result": "Here are the repeatable steps..."}
```

"A mini full-stack application without storage." Missing piece deliberately deferred: databases (L07+).

---

## Key Ideas (L04–L06)

- Interface selection is a design decision, not a technical one; no right/wrong, only fit-to-interaction-pattern
- Gradio lets you build a browser UI in 4 lines; `gr.Interface` = form, `gr.ChatInterface` = chat
- HF Spaces = free hosting for Gradio apps; deploy by editing app.py in browser
- Every API = URL + HTTP method + JSON body + JSON response; this compresses all of HTTP
- GET = read; POST = create/generate; CRUD maps directly to HTTP methods
- JSON = universal common language; key-value pairs; every language can read it
- Backend exists to hide secrets (API keys) from frontend code
- FastAPI: `@app.post("/endpoint")` decorator + dict body + return dict = complete API endpoint
- Messages array roles: system (instructions), user (input), assistant (LLM response)
- uvicorn = process that runs FastAPI locally; `/docs` = free Swagger UI for testing
- Write function first → test manually with real user → expose as API → deploy; never reverse this order

## Concepts Introduced
[[gradio-framework]], [[http-rest-api]], [[interface-types]], [[fastapi-patterns]]

## Entities Mentioned
[[siddhant]], [[100x-engineers]]

## Contradictions / Tensions
None with existing wiki pages.

## Open Questions
- At what user scale should HF Spaces + Railway be replaced with a more serious infrastructure?
- How does the frontend→backend connection change when the backend goes to Railway (URL changes from 127.0.0.1:8000 to cloud URL)?
- L06 used `body: dict` instead of Pydantic BaseModel — when should you graduate to Pydantic for input validation?
