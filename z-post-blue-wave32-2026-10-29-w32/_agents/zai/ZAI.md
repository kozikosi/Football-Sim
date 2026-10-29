# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat-only, no git push; work reaches GitHub via the Owner or `tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…` on `council/zai`. · **State:** High Councillor (below the Architect, above advisors).
- **First seen:** 2026-10-24 · Built Z-post-blue wave by wave from the Owner's verbatim directives (now at **wave 32**).

## Current work
- **Wave 32 SHIPPED (2026-10-29):** `Football-Sim-Z-post-blue-w32.html` · md5 `fa6d9fb8…` · 1,398,985 B.
  Built on the Owner-pushed w30 (`8d8e1a4b…`) because the **w31 zip never reached the sandbox** —
  the round-31 list was rebuilt from the Owner's verbatim message, then round-32 landed on top.
  Six asserted patch stages (`_agents/zai/tools/w32_patch1..6.py`), verify 97/97, stress 20/20,
  zero console errors, 9 evidence screenshots (desktop + iPhone 14, 0 px horizontal overflow).
- **NEW DELIVERABLE the Owner ordered:** `_agents/zai/deliveries/HANDOFF-TO-CLAUDE.md` +
  `WAVE-HISTORY.md` — every Owner directive since wave 1 + the UI/engine seam guide for
  Claude's V23 (his engine block into this shell). Claude's own stated plan: shell = w30 UI,
  swap math via named entry points, one seeded rng() through the 61 Math.random sites,
  engine stays DOM-free, then extract to TS.

## What the next session needs
- Read `_agents/zai/START-OF-CHAT-ZAI.md` §3 first (state pin).
- The Owner will play w32 next and send round-33 critiques; intake-ledger first, always.
- The current product bytes + the full patch/verify chain are in `builds/` and `tools/`.

## Do not redo
- The w31-rebuild decision (documented in W32-INTAKE-LEDGER.md header) — if the Owner ever
  attaches the true w31 zip, diff it against the w31-equivalent stages, don't rebuild.
- The display-artifact lesson: the chat tool can drop `[x` byte sequences in echoed files —
  byte-verify every patch old-string (three false "syntax errors" burned time in w32).

## Files in this lane
- `deliveries/` — HANDOFF-TO-CLAUDE.md, WAVE-HISTORY.md, style guide, REWEIGHT-BRIEF (older docs on main)
- `builds/` — the w32 product HTML
- `tools/` — w32_patch1..6.py, w32_verify.js, w32_stress.js (+ older suites on main)
- `notes/` — W32-INTAKE-LEDGER.md, W32-BUILD-REPORT.md, evidence/

## Rules that changed / were re-affirmed this session
- Pink anchor chips (was sage-teal); homepage pinker than brown, both themes.
- Integers everywhere except PRTG — now enforced on the rankings score + advanced cards too.
- Unit Report Card = letter-grade badges (no hover); game reports are two-line (score over @ TEAM).
- Mobile is first-class: no horizontal scroll anywhere; swipe strips on coarse pointers.
