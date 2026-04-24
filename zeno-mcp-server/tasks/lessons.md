## Lessons

- For graphify on this repo, ignore generated and vendor files first.
- `node_modules/` must be excluded or detection becomes noisy and slow.
- `graphify update .` is the right path for this repo's TypeScript code because it is code-only.
- Keep `AGENTS.md` and `.codex/hooks.json` in the project root so Codex reuses the graph on future sessions.
