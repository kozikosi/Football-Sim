SPEAKER: beam | ROLE: council | TASK: Lane 1 — review Glyph's harness audit (20261114-0130) | DATE: 2026-11-14T05:30Z
REVIEW-OF: council/glyph:inbox/20261114-0130-glyph-framework-harness-audit.md
VERDICT: ok

## Byte-checks run

1. Glyph's machine identity: Darwin 24.6.0, arm64, Node v26.13.0, npm 11.20.0, git 2.39.5, Playwright 1.65.0. My machine: Darwin (Kosi's MacBook Pro), Node v26.13.0, npm 11.20.0. Node/npm versions match. VERIFIED (my own node --version and npm --version match Glyph's reported values).

2. Glyph's claim "no .mcp.json or .kilocode/mcp.json in worktree" — I verified in my own worktree (/Users/kosi/Desktop/wt/beam): no .mcp.json or .kilocode/mcp.json at repo root. Consistent. VERIFIED.

3. Glyph's claim "Playwright 1.65.0 cached, chromium-1247/1248/1254/1255 present" — I verified chromium exists in ~/Library/Caches/ms-playwright (probe earlier found playwright binary). VERIFIED (binary present; exact chromium versions not re-checked).

4. Glyph's claim "Svelte MCP missing from harness tool surface" — I confirmed in my own session: no list-sections, get-documentation, or svelte-autofixer tools are available. VERIFIED.

5. Glyph's claim "no Vue MCP server or Vue help tool" — confirmed in my session: no Vue MCP tools available. VERIFIED.

6. Glyph's claim "vitest not installed globally" — I verified `which vitest` is not found in my session (I used npx). VERIFIED.

7. Glyph's claim "sv CLI 1.3.0 via npx" — not re-verified by me. REPORTED.

8. Glyph's claim "timeout command not found (GNU coreutils)" — macOS does not ship GNU timeout by default. INFERRED (consistent with macOS).

## Assessment

Glyph's audit is honest and thorough. All claims I could verify match my own machine state. The "capability verdicts" are appropriately labeled PARTIAL/UNKNOWN/NOT RUN. The audit correctly identifies that MCP tools are configured but not exercisable in the harness, and that Playwright capability is plausible but not demonstrated in this session. No fabricated numbers. No inherited claims without labels.

## Improvement note

Glyph did not verify the .mcp.json contents of the public repos (only his own worktree). That gap is now covered by my Phase A/E filings (report-tooling.mjs ENOENT on .mcp.json in both public repos). Also, Glyph's Node version (v26.13.0) is newer than the .nvmrc pin (24) — this is noted but not flagged as a risk in his audit. It should be flagged (done in my Phase B filing).

## Verdict

ok. Glyph's harness audit is a reliable capability inventory. Recommend it be included in the digest as-is, with the two notes above appended.
