---
title: "HTTP / REST API Fundamentals"
type: concept
tags: [api, http, rest, backend, networking, 100x-cohort7, first-principles]
source_count: 2
---

## Definition
HTTP (Hypertext Transfer Protocol) is the universal communication protocol for the web — the agreed-upon rules for how any two machines on the internet exchange data. A REST (Representational State Transfer) API uses HTTP as its transport, JSON as its language, and defined endpoints + methods as its contract.

## Why It Matters
Every API on the internet follows this protocol. Understanding it from first principles means you can: connect to any service (LLM API, weather API, payment gateway), design your own backend, debug failures between systems, and reason about the security implications of machine-to-machine communication.

## How It Works

### The Four-Field Contract

Every API call on Earth compresses to four things:

| Field | What it is | Example |
|---|---|---|
| **Endpoint (URL)** | Location of the machine / service | `https://api.groq.com/openai/v1/chat/completions` |
| **Method** | The action you want | `POST` |
| **Headers** | Metadata: auth, content type | `Authorization: Bearer gsk_...` |
| **Body** | The data payload (JSON) | `{"model": "llama-3.3", "messages": [...]}` |

Response follows the same structure: status code + headers + JSON body.

### HTTP Methods

| Method | Meaning | Association |
|---|---|---|
| GET | Read / fetch existing data | "Give me the weather in Bangalore" |
| POST | Create / generate something | "Generate a diagnosis from this workflow" |
| PUT | Replace an entire resource | "Update the weather record (overwrite)" |
| PATCH | Modify part of a resource | "Change just the temperature field" |
| DELETE | Remove a resource | "Delete this workflow" |

CRUD mapping: **C**reate=POST / **R**ead=GET / **U**pdate=PUT (or PATCH) / **D**elete=DELETE

Tricky case: sending a message to ChatGPT uses POST, not GET. The server is **generating** a new response — creating something — not reading existing data.

### JSON — The Common Language

JSON = JavaScript Object Notation. Key-value pairs in curly braces. Universally parseable by every programming language.

```json
{
  "workflow_description": "I open Jira, check high priority tasks, pick one, create report, assign to manager on Slack",
  "user_id": "arav_001"
}
```

Nested structures, arrays, strings, numbers, booleans — all valid. Extracting values in Python: `response.json()["result"]`.

### HTTP — Historical Origin

Designed for the early web, which was only "hypertext" — clickable text linking pages. Tim Berners-Lee's team needed a protocol for documents to reference each other across machines. The protocol they designed became the standard for all internet communication.

"We replicated in this lecture exactly what HTTP designers did 50–60 years ago. We found: where's the machine, what language do they speak, what rules do we follow. That's the whole of it." — Siddhant

### Status Codes

| Code | Meaning |
|---|---|
| 200 | OK — everything worked |
| 400 | Bad Request — your input was malformed |
| 401 | Unauthorized — missing or bad API key |
| 404 | Not Found — endpoint doesn't exist |
| 500 | Internal Server Error — backend crashed |

### API Authentication

Most APIs require authentication. Instead of username/password on every call, a **API key** acts as a persistent credential:
- Generated in the service's dashboard
- Passed in the `Authorization: Bearer <key>` header
- Set expiry dates (90 days recommended) — if key leaks, it auto-expires
- Never commit API keys to version control

### Python: Making API Calls

```python
import requests

response = requests.post(
    "http://127.0.0.1:8000/diagnose",
    json={"workflow_description": "Open Jira, check tasks..."},
    timeout=30
)
print(response.status_code)  # 200
print(response.json())        # {"result": "..."}
```

`requests.post()` = POST method. `json=` parameter auto-serializes dict to JSON and sets Content-Type header.

### Browsers vs Programs

Browsers can only make **GET** requests from the URL bar. To test POST endpoints:
- Use `curl` in terminal
- Use FastAPI's built-in Swagger UI (`/docs`)
- Use Postman or httpbin.org (for learning)

httpbin.org = simple HTTP echo server; any request you send comes back as the response. Used in L05 to demonstrate GET vs POST hands-on.

## Key Variants / Extensions
- **REST** — architectural style using HTTP; stateless; resource-oriented URLs
- **GraphQL** — query language alternative to REST; single endpoint, flexible queries
- **WebSockets** — persistent bidirectional connection; used for streaming/real-time
- **gRPC** — binary protocol; faster than REST; used in internal microservices

## Examples
- ChatGPT DevTools inspection: POST to `/v1/chat/completions` with JSON body; response is JSON with `choices[0].message.content`
- Groq Cloud API: same contract; URL = `api.groq.com/openai/v1/chat/completions`; POST with model + messages array
- httpbin.org/get?text=hello — GET request; echoes back your input as JSON
- WeatherAPI.com — GET `/current.json?key=...&q=Bangalore` — fetches existing weather data

## Connections
Related concepts: [[interface-types]], [[fastapi-patterns]], [[full-stack-llm-architecture]], [[deterministic-vs-generative-separation]], [[six-easy-pieces-philosophy]]
Introduced by: [[100x-cohort7-module2-l04-l06]], [[100x-cohort7-module2-llm]]

## Open Questions / Unknowns
- When does REST become insufficient (high frequency, streaming, bidirectional)? → WebSockets or gRPC
- What is the difference between API versioning (/v1/, /v2/) and why does it matter for consumers?
