# UPDATE-README — z-post-blue-wave20-2026-10-28

## What this package is

Wave 20: the Owner's six-point fix round (name rendering, tier law, selector
sizes, rankings name size, zero horizontal scroll, Brave/Chromium hardening).
View-layer only — **no simulation math was touched**, and the draft engine
byte-paths are untouched; all changes are render/CSS/boot-hardening.

## The product

`Football-Sim-Z-post-blue.html` — md5 stated in `CHECKSUMS.txt` (root) — must
verify with `md5sum -c CHECKSUMS.txt` after extraction.

## Contents

| Path | Status |
|---|---|
| `_agents/zai/deliveries/OWNER-ROUND-8-INTAKE.md` | §G added — the six Owner lines mapped to what shipped + 4 interpretations to veto |
| `_agents/zai/deliveries/HANDOFF-FOR-CLAUDE.md` | §0g added (latest wave-delta) |
| `_agents/zai/deliveries/Football-Sim-Z-post-blue.html` | the w20 product build |
| `_agents/zai/tools/w20_patch.py` | NEW — 17 asserted replacements + payloads + post-checks + `node --check` gate |
| `_agents/zai/tools/w20_verify.js` | NEW — 27-check Playwright suite (tier law, scroll law, sizes, hardening) |
| `_agents/zai/evidence/w20/*.png` | NEW — 12 screenshots (home/draft/groups/players at 1280 + 390, boot probe, setback chip) |
| `_agents/zai/START-OF-CHAT-ZAI.md` | §3 LAST-KNOWN-STATE rewritten (2026-10-28, wave 20) |
| `_agents/zai/ZAI.md` | lane file rewritten (council format) |
| `_agents/zai/END-OF-CHAT-ZAI.md` | unchanged copy (law: always included) |

## 4 · Changelog

- **2026-10-28 (advisory)** — stack advisory under the free + portfolio laws (no product change; separate zip).
- **2026-10-28 (wave 20)** — six-point fix round: name-tier law enforced everywhere (90+/85+/neutral in team color, 4 call sites fixed, row palette via `zpbRowVars`); shimmer can never render invisible (`@supports` fallback); draft board contained scroller + `scrollbar-gutter:stable` (Brave/Chromium edge-column clipping gone); preseason/season selector compaction; position-rankings names `.8rem` + wrapping; zero horizontal page scroll asserted at 1280/390; `visibilitychange` draft resume; gold `SETBACK` error chip. 27-check suite ALL PASS, zero console errors.

## 5 · Integrity

`CHECKSUMS.txt` (zip root) carries the md5 of every packed file at packing time.
Verify with `md5sum -c CHECKSUMS.txt`. Run `node tools/w20_verify.js` (needs
`playwright`) to reproduce the full 27-check green run.

— Z.ai · ship link first, talk second.
