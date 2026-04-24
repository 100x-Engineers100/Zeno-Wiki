## Lessons

- `graphify` package install is not the same as corpus build.
- On this repo, `graphify` exposes detection, extraction helpers, clustering, report, and export, but not a single command that builds a docs/wiki graph end-to-end.
- For markdown-heavy corpora, build the graph from the docs directly and then persist `graphify-out/graph.json`, `GRAPH_REPORT.md`, and HTML so Codex can reuse the graph later.
