# Knowledge graph setup guide

Goal: build a reusable `graphify` knowledge graph for a project once, then keep it current so the assistant can navigate the graph instead of rereading raw files.

## 1. One-time machine setup

Install the official package:

```powershell
python -m pip install --user -U graphifyy
```

If `graphify` is not on PATH on Windows, use the full executable path:

```powershell
& "$env:APPDATA\Python\Python313\Scripts\graphify.exe" --help
```

If that path differs on your machine, locate it with:

```powershell
python -c "import site; print(site.getusersitepackages())"
```

For Codex parallel extraction, enable this once in `~/.codex/config.toml`:

```toml
[features]
multi_agent = true
```

## 2. Per-project setup

Run this inside the project root:

```powershell
graphify codex install
```

What it should do:

- write `AGENTS.md` in the project root
- register `.codex/hooks.json`
- make Codex check `graphify-out/GRAPH_REPORT.md` before raw-file search

Verify the install:

```powershell
Get-Content .\AGENTS.md
Get-Content .\.codex\hooks.json
```

## 3. Build the graph

Use the assistant skill workflow for the first full corpus build:

- Codex: `$graphify .`
- Claude Code: `/graphify .`
- Other supported assistants: use their matching `graphify` skill command

Use this from the actual project root, not a parent folder.

Expected outputs:

- `graphify-out/graph.json`
- `graphify-out/GRAPH_REPORT.md`
- `graphify-out/graph.html`
- optional `graphify-out/wiki/` or Obsidian vault output if enabled

## 4. Update rules

Use the right command for the type of change:

### Code-only changes

Use the fast AST-only refresh:

```powershell
graphify update .
```

Use this when only source code changed. It does not do the expensive docs semantic pass.

### Docs, notes, wiki pages, screenshots, papers, images

Rerun the full corpus build through the assistant skill:

- Codex: `$graphify .`
- Claude Code: `/graphify .`

That is the path that rebuilds the knowledge graph from non-code content.

### Add a new URL

```powershell
graphify add <url> --dir .\raw
```

Then rebuild the graph with the full corpus command.

## 5. Reuse on any future project

For a new project, repeat this sequence:

1. Install `graphifyy` once on the machine.
2. Run `graphify <platform> install` for that assistant.
3. Confirm `AGENTS.md` and hook files were written.
4. Run the full graph build from the project root.
5. Commit `graphify-out/` if you want the graph to persist for teammates and future sessions.
6. Use `graphify update <path>` only for code-only changes.

## 6. Mistakes to avoid

- Do not run `graphify .` in a shell and expect a build. In this package, `.` is not a valid CLI command.
- Do not use `graphify update .` for markdown-heavy projects. It is code-only.
- Do not assume `graphify` is on PATH after install on Windows.
- Do not forget `multi_agent = true` in `~/.codex/config.toml` when using Codex.
- Do not run the build from the wrong folder. The graph should be generated from the actual project root.
- Do not delete `graphify-out/` if you want the assistant to reuse the graph later.

## 7. What to keep

Keep these outputs:

- `graphify-out/graph.json`
- `graphify-out/GRAPH_REPORT.md`
- `graphify-out/graph.html`
- `AGENTS.md`
- `.codex/hooks.json`

Those files are what let the assistant navigate the project without rereading every raw file.
