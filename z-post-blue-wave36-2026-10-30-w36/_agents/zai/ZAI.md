# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built Z-post-blue waves 1–36 (headless verify suites v8..v11 then the per-wave suites); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` §7b); style guide and Owner playbook.

## Current work
- **w36 SHIPPED (session 27, 2026-10-30)** — the Owner reconciled his w34/w35 (my two w34 ships; the second is cumulative, so the w35 bytes ARE the best of the two) and named the next files w36. Five round-36 directives shipped: R1 the WHERE YOUR PLAYERS LINE UP? field spans its container's inner content edges (`zpb-fm-wide`, was a 560px island) and leads every YOUR ROSTER tab in both states with the pick-order register + the two-way highlight; R2 the top card set (`zpbDraftCardsFirstHTML`) deleted, the breakdown cards under the map inherited its float-in (`zpb-dfc2`, `--beat × 1s`, unique beats); R3 the review's SEASON tab starts the season and lands the preseason page; R4 the lineup pick menus read `POS · OVR` when open (`QB · 91`), name-only at rest; R5 BEGIN THE SEASON lands week 1 behind the SEASON OPENER veil.
- **The diagnosis (both glitches, one disease, reproduced live with instrumentation):** a straggler draft kickoff timer re-ran `finishDraft2` after the draft was done (no re-entry guard) and `startSeason`'s internal review re-render rebuilt `#draftResultsBody` — every captured container painted into a DETACHED div; the cinematic hangs on `document.body` so it always played while the real page sat stale. Cured at three levels: the `finishDraft2` guard (+ `startDraft2` reset), the `renderSeasonTab` dead-container re-target, the null-guarded begin wiring.
- **The R4 lesson:** an `<optgroup>` change on the baseline `lineupEditorHTML` was DEAD CODE — the w33 payload replaces the selects with `zpbPickList` at wire time. The suite caught it (0 selects in the live DOM); patch5 reverted it byte-exact and fixed the REAL surface (the pick-menu items). Always probe the LIVE surface before patching a builder.
- Verify 136/0 (five consecutive greens) · stress 50/0 (seven runs: four seeded, three random) · probe all green in Chromium · mobile 0 px · 6 evidence shots. Package: `z-post-blue-wave36-2026-10-30-w36.zip`.
- Waiting on: the Owner's verdicts on the ELEVEN w36 interpretations (`notes/W36-INTAKE-LEDGER.md` §Interpretations) — and the eleven w34 + ten w33 ones, still open.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the state pin) → the newest wave's INTAKE LEDGER → its BUILD REPORT → the LAWS (`deliveries/HANDOFF-TO-CLAUDE-w34.md` §1 — read them every session).
- **Do not redo:** the R3/R5 stale-container diagnosis (the guard + chokepoint + null-guards are in, audited by the suites); the R4 dead-code lesson (the pick lists own the lineup dropdowns); the w35-over-w34 reconciliation (a ledger section, not a merge).
- **Wave-numbering law:** the Owner renames the last file he holds when a new round starts. Map his wave names onto the md5-pinned packages BEFORE building.
- **Harness knowledge, new this session:** `renderDraftResults` rebuilds `#draftResultsBody` on EVERY call — any test that holds a body reference across a re-render drills a detached div (query the live document each time, or re-render first). The review's auto-expanded detail is the USER's row — `[id^="detailwrap-"]` first match is a CPU row; find the one with content. The pick menus render as `.zpb-pickbtn`/`.zpb-pickrow` (`.zpb-picknum` = the right column); the KR/PR rows carry a return rating, not a position — exclude `[data-zpbret="1"]`. The pool's tags include FB, P, LS. jsdom needs `waitUntil:'domcontentloaded'`-style patience in Chromium for this 1.4 MB file (page `load` can exceed 30 s).
- **Harness knowledge (standing):** the stress must NOT call `processUntilUserTurn`/`makeUserPick2` per pick (use the engine's `executePick` loop, one `finishDraft2` at the end); MODEL weights auto-apply at boot; shot scripts clear `.zpb-prematch` veils before photographing.

## Files in this lane (as of w36)
- `_agents/zai/notes/` — the per-wave intake ledgers, build reports, evidence shots
- `_agents/zai/tools/` — the per-wave patch stages + verify/stress/shot suites
- `_agents/zai/builds/`, `_agents/zai/deliveries/`, `_agents/zai/notes/` history — untouched from w34
- Not copied (still on `main`): evidence screenshots older than w33 and the 67 MB duplicate package
