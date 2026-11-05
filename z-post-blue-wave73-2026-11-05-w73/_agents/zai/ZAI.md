# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs` (chat-management Task 6).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites v8..v11 in `tools/`); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook; **w71: Outcome Lab (440-season sweep + Model Report), debt inventory v1/v2a + storage dump harness, Svelte 5 scaffold + strategy answers; w72: the executor answers with measured receipts (save sizes, determinism proof, Math.random classification, OAuth sync re-spec); w73: the draft board pass (dropdown order, chip state machine, ALL/CLEAR separation) + THE FIX-IT BOARD on the season review + the 551af1b contract review (12 findings, verdict: buildable).**

## Current work
- **w73 shipped** (this zip): the shell product build `Football-Sim-Z-post-blue-w73.html` (base: the Owner's w70 anchor 79c4a934…, verified) with the Owner's four asks built whole; battery 33/33, w69 owner suite 33/33 and w69 dropdown sweep 14/14 as regressions, zero page errors.
- **The 551af1b contract review is delivered** — `20261105-zai-contract-review-551af1b.md` in this zip: 12 findings (two structural: the twin AppState unions; the season-review data with no payload home), verdict **buildable — N1 drafting is clear to start**.
- Awaiting: Kosi's ADR rulings (w72) + the envelope discrepancies posed back to Claude; Claude's reconciliation of the fictional-league fallback against the real-names ruling (my review F11).

## What the next session needs
- **Read first:** `20261105-zai-contract-review-551af1b.md` (the flags Claude must answer: F1 twin unions, F2 review data home, F3 StorageModule enumeration, F4 dataset-changed notice, F5 build-scoped determinism sentence); the w73 build report + intake ledger (veto flags at the tail).
- **Likely next builds:** (1) the N1 six-file drafts — **unblocked, verdict delivered**; (2) the w70 parity batteries re-pointed at the Colors build — still blocked on Claude's frozen VMs; (3) if Kosi rules on ADR-8/envelope, this seat verifies, the Architect patches; (4) the Fix-It Board's inputs are documented in the review F2 in case the Colors summary screen adopts it.
- **Do not redo:** the determinism proof (w72 `tools/size/prove_determinism.ts`); the save-size measurements (w72 `tools/size/measure_saves.ts`); the Math.random classification (w72 answers §7); the w70 geometry measurement that forced the flex-break design (w73 build report).
- **Rules that changed since REV 16:** none new — the two-tracks law stands (START-OF-CHAT REV 17 §0); the w73 session added no workflow, only the quote-parity + cascade-sentinel post-checks to the patch pattern (build report).

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 13, style guide, playbook, reweight brief, governance, wisdom, build report, start-here)
- `tools/` build scripts, CSS/JS parts, verify suites, logo scripts; `tools/size/` (w72) the three measurement/proof scripts; **`tools/w73/` (this zip root): `zpb_w73.py` (the generator) + `verify_w73.js` (the 33-assert battery)**
- `builds/` the two Z-post-blue HTML files (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog; **the w73 intake ledger, build report and contract review ride the zip root**
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
