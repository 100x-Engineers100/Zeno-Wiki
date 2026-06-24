---
title: "MCP — Model Context Protocol"
type: concept
tags: [ai, agents, mcp, protocol, tool-calling, 100x-cohort7]
source_count: 3
---

## Definition
Model Context Protocol (MCP) is a stateless protocol for LLM-tool and agent-to-agent communication. Analogous to HTTP for web — it defines the rules for how LLMs, agents, and external systems should interact, without prescribing implementation details.

## Why It Matters
Before MCP, every LLM-tool integration was custom. MCP standardizes the interface so tools can be written once and used with any compatible LLM or agent. It enables an ecosystem: one tool server, many LLM clients.

## How It Works
- **Stateless**: Like HTTP, the protocol itself maintains no state between requests. Each call is independent.
- **Stateless ≠ stateless application**: The stateless protocol does not prevent developers from building stateful applications on top. State is managed at the application layer.
- **Tool definition**: MCP defines how tools expose their capabilities (name, description, parameters) to LLMs.
- **Agent communication**: In multi-agent systems, MCP can be used for agent-to-agent communication, not just LLM-to-tool.

**How it fits in the stack:**
```
LLM (agent) → MCP → Tool server → result back via MCP → LLM
```

**In multi-agent context:**
```
Orchestrator agent → MCP → Specialist agent A
                   → MCP → Specialist agent B
```

## Key Variants / Extensions
- **MCP server**: A process that exposes tools over MCP. Can be local or remote.
- **MCP client**: Any LLM or agent that calls tools via MCP.
- **qmd MCP server**: Local search engine for markdown with MCP interface (relevant to this wiki)

## Examples
- 100x Module 2 & 3: function/tool calling evolved into MCP standard
- Claude Code: uses MCP for tool integrations (filesystem, bash, etc.)
- qmd: MCP server for wiki search

## Connections
Related concepts: [[ai-agents-react]], [[multi-agent-systems]], [[retrieval-augmented-generation]]
Introduced by: [[100x-cohort7-module2-llm]], [[100x-cohort7-module3-agents]], [[100x-l18-22-llm-finetuning]]

## MCP Governance Update (March 2026, L22)
MCP is now under the **Linux Foundation**. Anthropic, OpenAI, and Google have all signed on.
"When three competitors agree on a standard, it becomes the standard. Like HTTP for the web."
This resolves any uncertainty about MCP becoming the de facto protocol — the network effect is now locked in.

## Generative UI (MCP, March 25, 2026)
New capability: apps render interactive UI inside Claude's chat window. Bidirectional — clicking the UI calls the real app server, not Claude's server.

**How it works:**
- App provider builds an MCP server (e.g., Canva)
- Claude calls the MCP server
- The UI (iframe) renders inside Claude's chat window
- User interaction → real app API calls via MCP
- Result rendered back in Claude

**The Ajax analogy**: Before Ajax, web pages reloaded on every action. After Ajax, pages became apps. Before Generative UI, LLM gives a text link. After Generative UI, LLM renders the actual interactive app inside chat.

**Why it matters**: No traditional integration needed. App provider builds one MCP server. Claude (or any MCP client) can render and interact with it natively.

## MCP Context Efficiency Solutions (L22)
Problem: connecting many MCPs loads all tool definitions into context window — potentially 72,000+ tokens just for tool definitions.

**Solution 1 — Tool Search Tool:**
- RAG index of tool definitions
- LLM searches for the tool it needs just-in-time
- Only the relevant tool definition enters context
- Same principle as PageIndex in RAG — index first, load only what's needed

**Solution 2 — Programmatic Tool Calling:**
- LLM writes Python code to call APIs
- Code runs in execution environment
- Only final result returns to LLM context
- Intermediate data never pollutes context window
- See [[programmatic-tool-calling]]

Both are platform-agnostic patterns — work with any LLM, not Anthropic-specific.

## MCP vs CLI (common debate)
"MCP is overkill, just use CLI to call APIs directly." True for a one-off API call. For an M×N problem — many models, many tools — MCP is the solution. Security and scale of bidirectional UI cannot be handled with just CLI.

## Open Questions / Unknowns
- Full component/primitive specification for Generative UI MCP (what UI elements are supported?)
- Authentication standards for MCP tool servers
- Performance characteristics vs direct API calls at scale
