# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`). Z.ai's end-of-chat block can instead be saved with `tools/seat-save.mjs` (chat-management Task 6).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites v8..v11 in `tools/`); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook; **w71: Outcome Lab (440-season sweep + Model Report), debt inventory v1/v2a + storage dump harness, Svelte 5 scaffold + strategy answers; w72: the executor answers with measured receipts (save sizes, determinism proof, Math.random classification, OAuth sync re-spec).**

## Current work
- The Colors rebuild briefing (nine questions) is **answered in full** — `20261105-zai-to-muse-executor-answers.md` in the w72 zip. ADR-1..12 tabled; awaiting Kosi's rulings (framework freeze, envelope now/defer split, substrate, OAuth shape).
- Claude's contract work (AppState/Action, VM boundary, Draft Board slice, freeze) is the gate for the §6 "needs from Claude" list; his Q8–Q11 are pushed (aa6b561); his "not yet done" list stands as written there.
- N1 council exhibit: Kosi's four answers received (role names; archive links ours; full story incl. 20-0 + message-loss as incident handling; cadence by long-term goals) — build plan in the w72 answers §8; **unblocked, one session of drafting**.

## What the next session needs
- **Read first:** the w72 answers doc (esp. §6 needs-from-Claude and the ADR table); `_agents/owner-notes/` on `architect/engine-and-seats` for any NEWER Owner rulings; the intake ledger `20261105-w72-intake-ledger.md` (veto flags).
- **Likely next builds:** (1) N1 six-file drafts + metrics generator; (2) the w70 parity batteries re-pointed at the Colors build — blocked on Claude's frozen VM contract, not on this seat; (3) Kosi's ADR rulings → if ADR-8 passes, patch `envelope.ts` (+`saveRevision`, `datasetId`) is HIS (Architect) to make; this seat verifies.
- **Do not redo:** the determinism proof (w72 `tools/size/prove_determinism.ts`); the save-size measurements (w72 `tools/size/measure_saves.ts`); the Math.random classification (w72 answers §7); Outcome Lab findings (ruled: home win rate fine, parity compression by design — both dropped).
- **Rules that changed since REV 15:** the project has two tracks (shell waves vs Colors rebuild) — see START-OF-CHAT REV 16 §0; the Colors-track law lives in owner-notes + inbox on the architect branch.

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 13, style guide, playbook, reweight brief, governance, wisdom, build report, start-here)
- `tools/` build scripts, CSS/JS parts, verify suites, logo scripts; **`tools/size/` (w72): the three measurement/proof scripts**
- `builds/` the two Z-post-blue HTML files (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog; **`notes/W72-INTAKE-LEDGER.md` rides the zip root**
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
