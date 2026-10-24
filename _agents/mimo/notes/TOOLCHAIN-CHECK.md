SPEAKER: MIMO | ROLE: Council reviewer (assignee of Pickle, toolchain slice) | TASK: TOOLCHAIN-CHECK — Biome + Mermaid + Figma reachable from this checkout | DATE: 2026-10-22 (UTC)

Build pin re-verified this session: `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B — matches the pin Pickle gave (VERIFIED, `shasum -a 256` + `wc -c`). Environment: node v24.22.0, npm 11.19.1 (VERIFIED).

## Summary table

| tool | how invoked | works? | evidence |
|---|---|---|---|
| **Biome** | `npx --no-install @biomejs/biome --version` → `Version: 2.6.2` (rc=0); `npx --offline @biomejs/biome --version` → `Version: 2.6.2` | **YES — offline, via npx cache.** Not on PATH; not in `node_modules/.bin`; not a `package.json` dep | VERIFIED. `which biome` = "no biome on PATH"; `ls node_modules/.bin/biome` = "No such file"; `grep biome package.json` = empty; run works because `~/.npm/_npx/<hash>/` holds a cached copy. **Not reproducible from a fresh clone** (a clean machine would need a network install = CDN dependency, prohibited by AGENTS.md) |
| **Biome config (`biome.json`)** | present at repo root, `$schema` = biome 2.6.2 | **PARTIAL — config is INVALID for 2.6.2** | VERIFIED. Real run `npx --no-install @biomejs/biome check tests/e2e-smoke.mjs` returns config diagnostics: `Found an unknown key 'excludes'` (known: maxSize, ignoreUnknown, includes, experimentalScannerIgnores) and `The use of the recommended field has been deprecated … Use preset instead`. So `files.excludes` (the `**/merged.html`, `**/NFL*` guard) is **silently dropped** — harmless today only because `files.includes` already scopes to `tests/**`, `_agents/**/{tools,notes/*.js}`, `tools/**`. Needs a 2.x fix (`includes` negation / drop `excludes`; `recommended`→`preset`) before it can be a real gate |
| **Mermaid (CLI)** | `which mmdc` / `ls node_modules/.bin/mmdc` / `grep mermaid package.json` | **NO — no CLI reachable** | VERIFIED. `mmdc not found`; `ls node_modules/mermaid node_modules/@mermaid-js` = "No such file"; not in `package.json`. Diagrams cannot be rendered/validated offline by any local tool |
| **Mermaid (doc fences)** | 4 ` ```mermaid ` opens at V22-Suggestions.md l.676, 696, 715, 938 (P9 = Beam's diagrams) | **Syntax valid by inspection; not machine-validated** | VERIFIED (open count) + INFERRED (syntax). P9-1 (l.676–692) is a `flowchart TD`, balanced fences, nodes `A[..]`–`F[..]`, edges `-->`, and `style A fill:#4f8cff,color:#fff` directives — all legal Mermaid. No CLI to confirm parse/render (see Mermaid row). A human/renderer must eyeball the other three |
| **Figma** | no MCP tool, no config in repo | **NO — not reachable** | VERIFIED. `grep -i figma` in the doc: l.737 "No Figma MCP tool is available in my session … the Owner would need to configure a Figma MCP server"; l.609–617 P7-7 status "Not yet available. Owner to configure Figma MCP if desired." No `figma` entry in `package.json`/`node_modules`. Figma work stays conceptual until the Owner wires up an MCP server |

## What works offline vs what does not

- **Works offline:** Biome 2.6.2 (version + `check` runs) — *only because a copy is already cached in `~/.npm/_npx`. It is not a project dependency, so this is luck of the cache, not a reproducible setup.*
- **Does not work offline:** Mermaid rendering/validation (no CLI), Figma (no MCP/config). Neither can run from this checkout today.
- **Reproducibility caveat (AGENTS.md):** making Biome/Mermaid a *real* project tool would mean adding them to `package.json` + an install step = a **build step / CDN dependency**, which AGENTS.md "❌ Add paid APIs, CDN dependencies, or build steps" prohibits without the Owner's explicit request. So the council can *use* the cached Biome ad hoc, but must not silently convert it into a committed build dependency.

## Not checked
- Whether the npx cache will still be present in a future session/machine (UNKNOWN — cache eviction is out of my control).
- The other three Mermaid fences (l.696, 715, 938) line-by-line — only P9-1 was inspected (others same `flowchart` pattern).
- Any Figma MCP server config outside this checkout (e.g. `.kilo/kilo.jsonc` at the repo root — not present here).
