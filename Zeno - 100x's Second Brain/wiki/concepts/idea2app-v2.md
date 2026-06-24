---
title: "IDEA2App V2 — Scientific Discovery Method"
type: concept
tags: [product, startup, validation, mvp, 100x-cohort7, methodology]
source_count: 2
---

## Definition

IDEA2App V2 is Siddhant's product validation framework that replaces the PRD-first approach. It applies the scientific method to MVP development — forcing a falsifiable hypothesis before writing any code. The goal: validate the problem is real before building anything.

Three phases: **Discovery → Stress Test → Manual MVP.**

## Why It Matters

Most builders jump from "I have an idea" to "let me build it." The Arav Problem (31 ideas, 6 months of AI tutorials, zero shipped products) is the failure mode this addresses. The issue isn't lack of tools or knowledge — it's the absence of a validated problem statement.

PRD-first fails because it optimizes for internal coherence, not external reality. IDEA2App V2 forces external validation before any internal planning begins.

## How It Works

### Phase 1: Discovery — Build a Falsifiable Hypothesis

Five sequential steps:

1. **Observation** — What pattern or behavior did you notice in the world? Must be specific and grounded ("I noticed freelancers spend 40% of client meetings justifying past decisions" not "I think people need better project management").

2. **Subject** — Demographic AND behavioral profile of who has this problem. Two dimensions: who they are + what they do that makes this problem real for them. Example: "ambitious early-career professionals in urban India, AI-aware, zero shipped products, actively in AI education programs."

3. **Evidence audit** — What data exists to confirm the observation? Rank evidence from weakest to strongest. Identify the single most load-bearing piece. If the evidence chain breaks here, the whole hypothesis breaks.

4. **Causal chain** — Why does the problem persist? What structural, behavioral, or environmental forces keep the problem in place despite people wanting to solve it? No causal chain = no moat once you solve it.

5. **Falsifiable hypothesis** — A testable prediction with specific kill conditions. Format: "[X% of Y will Z within W days; if <X%, hypothesis fails]." Must have explicit falsification conditions — if there's no way to fail, it's not a hypothesis.

### Phase 2: Stress Test — MOM Test Simulation

MOM Test = the interviewing methodology from Rob Fitzpatrick's book (ask about their life, not your idea).

In IDEA2App V2, an LLM acts as your target customer persona. You conduct a user interview. The LLM then grades your interview:
- Questions asked vs questions that should have been asked
- Assumptions tested vs assumptions left untested
- Signals missed (the customer revealed something you didn't follow up on)

Output: scorecard of which assumptions strengthened, which weakened, which remain untested.

### Phase 3: Manual MVP — 21-Day Pilot

No code. No app. An experiment with real people.
- Design a manual version of the value proposition (spreadsheet, email, phone call, physical process)
- Run it for 21 days with real target users
- Collect signal: do they come back? Do they pay? Do they refer others?

First proof of whether the hypothesis holds. Only after this does technical building begin.

## Discovery to MVP Coach (Claude Skill)

Siddhant encoded the full IDEA2App V2 process as a `.skill` file for Claude. Installed via Claude → Settings → Capabilities → Skills. Invoked via slash command. Runtime: 90 minutes to 3 hours. The skill runs all three phases interactively, asking questions, challenging assumptions, and producing:
- Discovery document (all five Phase 1 elements)
- Stress test scorecard
- 21-day MVP plan

Intentionally rigorous — designed to surface low-quality hypotheses early.

## Key Variants / Extensions

- **OPT Coach**: Alternative entry point for students without a problem statement. See [[opt-framework]].
- **PRD-first approach (deprecated)**: Old method — start with requirements, then validate. IDEA2App V2 inverts this.
- **Lean Startup connection**: Similar to Build→Measure→Learn but puts the measurement BEFORE the build.

## Examples

- **100x Engineers itself**: Siddhant and Sridev didn't start with a platform plan. Started with observation (ambitious Indian developers drowning in AI hype), validated through interviews, manual cohort before any tech build.
- **L01 live demo**: Siddhant ran the Discovery skill on the Arav problem live during the lecture. Produced a complete hypothesis in the session: 60% of active students will identify one real user and build a credible demo in 90 days; kill condition: <40% rate.
- **Arav case**: The anti-example — 31 ideas saved, no discovery phase, no evidence, nothing shipped.

## Connections
Related concepts: [[opt-framework]], [[ship-cycle]], [[vibe-coding]]
Introduced by: [[100x-cohort7-module2-l01-l03]], [[100x-cohort7-module2-llm]]

## Open Questions / Unknowns
- What's the right evidence quality threshold for moving from Phase 1 to Phase 2?
- Can the MOM Test simulation replace real user interviews, or is it only a rehearsal tool?
- How does the 21-day manual MVP connect back to the technical build (L04–L10)?
