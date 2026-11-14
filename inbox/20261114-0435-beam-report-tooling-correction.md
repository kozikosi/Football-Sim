SPEAKER: beam | ROLE: council | TASK: CORRECTION — report-tooling.mjs fails (gitignored .mcp.json) | DATE: 2026-11-14T04:35Z
REVIEW-OF: council-assignment Phase B item 4 / Phase E item 4 (node scripts/report-tooling.mjs)

## Finding

Both public repos (vue @ 6b4de5c, svelte @ 86ba632) ship scripts/report-tooling.mjs which reads .mcp.json at repo root. But .mcp.json is gitignored (not tracked — confirmed by git ls-files | grep .mcp.json returning empty in both repos). The script crashes with:

```
Error: ENOENT: no such file or directory, open '.../.mcp.json'
    at readJson (scripts/report-tooling.mjs:7:24)
```

Exit code: 1. Reproduced in both fresh clones.

## Impact

The tooling receipt (Node, Vite, framework, Vitest, Playwright versions) cannot be generated from a fresh clone. This invalidates the "node scripts/report-tooling.mjs runs cleanly in both" check from the council assignment. It is a packaging gap, not a security issue (.mcp.json exclusion is correct for public repos).

## Recommendation

Either (a) make the script gracefully handle missing .mcp.json (read from package.json only, or skip MCP section), or (b) document that .mcp.json must be created locally before running the receipt. Do not commit .mcp.json to the public repo (it contains local MCP server paths). This is a tooling fix, not an engine or framework change.

Labels: VERIFIED (reproduced in both clones, exact error captured). No modification made.
