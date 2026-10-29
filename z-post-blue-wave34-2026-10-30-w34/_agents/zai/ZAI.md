# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built Z-post-blue waves 1–34 (headless verify suites v8..v11 then the per-wave suites); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` §7b); style guide and Owner playbook.

## Current work
- **w34 SHIPPED (session 26, 2026-10-30)** — all seven round-34 directives: the footer-attached theme button on every page (incl. the `.wrap` relocation bug the verify suite caught), the guide 0/5 numbers with PRTG 158.3, the ADJUST THE WEIGHTS dropdown, the neutral dropdown ink on browser + draft board, the 3-4/4-3 toggle at the top of the Lineups screen with the repaint fixed, the staged lineup editor behind APPLY THE CHANGES, and the finishDraft2 auto-flex removed (audited 0/31).
- Verify 70/0 · stress 35/0 · mobile 0 px · 16 shots. Package: `z-post-blue-wave34-2026-10-30-w34.zip`.
- Waiting on: the Owner's verdicts on the SEVEN interpretations in `notes/W34-INTAKE-LEDGER.md` §Interpretations (and the ten w33 ones, still open).

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the state pin) → the newest wave's INTAKE LEDGER → its BUILD REPORT → `deliveries/HANDOFF-TO-CLAUDE-w34.md` §1 (the LAWS — read them every session).
- **Do not redo:** the R7 diagnosis (the auto-flex lived in `finishDraft2` — removed, audited); the R1 relocation (the theme block was trapped in `#viewDraft` by the w32 IIFE — `zpbSeatFooter` now seats nav + theme at `.wrap` level, re-run by the boot and the render observer).
- **Harness knowledge:** the stress suite must NOT call `processUntilUserTurn`/`makeUserPick2` per pick (jsdom drowns in repaints — use the engine's own `executePick` loop, one `finishDraft2` at the end); MODEL weights auto-apply at boot, so the weights drill targets a non-700 badge; shot scripts must clear `.zpb-prematch` veils before photographing.

## Files in this lane (as of w34)
- `_agents/zai/notes/` — the per-wave intake ledgers, build reports, evidence shots
- `_agents/zai/tools/` — the per-wave patch stages + verify/stress/shot suites
- `_agents/zai/builds/`, `_agents/zai/deliveries/`, `_agents/zai/notes/` history — untouched from w33
- Not copied (still on `main`): evidence screenshots older than w33 and the 67 MB duplicate package
