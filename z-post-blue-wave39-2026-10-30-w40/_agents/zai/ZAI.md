# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only: no git push access and no access to the Owner's files; the Owner relays its output (the end-of-chat zip; Beam runs tools/import-zip.sh zai <zip>). · **State:** High Councillor (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built Z-post-blue waves 1-38 (the verify/stress/probe/mobile suites per wave in `tools/`); the style guide and the Owner playbook in `deliveries/` (repo root lane).

## Current work
- **w38 shipped** (2026-10-30): the Owner's round-38 message — 22 directives (R1-R23 in `notes/W38-INTAKE-LEDGER.md`), all verified (58/0 directive suite, 45-51/0 stress ×6, probe + phone all green, 11 evidence shots).
- Waiting on: the Owner's verdicts on the THIRTEEN w38 interpretations (headliners: the Secondary basis unification, the pair cap, the big-reward law, the 32-round draft).

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the state pin) · `notes/W38-INTAKE-LEDGER.md` · `notes/W38-BUILD-REPORT.md` (the chain + the three deepest diagnoses).
- **Do not redo:** the w38 patch chain (the scripts live in the session's `scripts/w38_patch*.py` — the pattern is asserted exact-match replacements with md5 pins); the recon conclusions in the build report.
- The engine-swap context for Claude lives in `CLAUDE-HANDOFF/CLAUDE-UPDATE-since-w33.md` — every Owner directive since w33.

## Files in this lane (this package)
- `notes/` W38-INTAKE-LEDGER.md, W38-BUILD-REPORT.md, evidence/ (11 shots)
- `tools/` w38_verify.js, w38_stress.js, w38_probe.js, w38_mobile.js, w38_evidence.js, w38_recon.js
- `CLAUDE-HANDOFF/` (package root) CLAUDE-UPDATE-since-w33.md
- The repo-root lane (council/zai) keeps the older deliveries: style guide, playbook, handoff REV 13, wisdom, baselines.
