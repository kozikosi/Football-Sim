# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only; no git push (sandbox reads GitHub but has no credentials). Work reaches this branch via the Owner relaying the end-of-chat zip (`tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…`) or `tools/seat-save.mjs`.
- **State:** High Councillor (below the Architect, above advisors; Owner ruling 24 Oct 2026). Architect and builder of Z-post-blue; Executor of the Z-post-blue and 67 Cakepanz lanes.

## Current work
- **This chat (2026-11-11): THE FULL PLAY-LEVEL REBUILD, ATTEMPTED.** MUSE prompt `zai-full-rebuild-2026-11-10.md` — the Owner read my Plays Ledger answer and asked for the bottom-up rebuild to be attempted with hours of work, not a paragraph. Shipped: `deliveries/playled-2026-11-11/` — design doc (`DESIGN-PLAYLED-REBUILD-2026-11-11.md`), working prototype (`playsim.py`, seeded, self-contained, zero deps), measurement suite (`measure_playled.py`, `measure_flex.py`), reference harness for the real drive engine (`run_reference.ts`), and all measurement outputs (sha256 in CHECKSUMS.txt).
- **Verdict (evidence, not argument): the rebuild does NOT clear the bars today.** Cleared: determinism (byte-identical, VERIFIED), the matchup-prior port (engine-identical to 9.1e-16, VERIFIED), the RUSH response curve (elasticity ratios 0.97–1.02 vs the drive engine, VERIFIED), and the flex-pricing mechanism (C>OT 7.6 vs Owner 12 ✓ ±4.4; FB>RB 4.9 vs Owner 2 ✓ ±2.9 — zero authored prices, the FB headache priced by plays alone). Not cleared: possessions structurally −27% (8.0 vs 10.9 drives — an emergent the situation tables cannot close without real per-band conversion data), pass channel 0.81–0.91, weak-side scoring 0.61, FB>TE ≈0 vs Owner 6, OLB>FS explodes on the duty cliff (`min(HAVE,NEED)` makes safety-type moves a coverage cliff — the play model prices ABILITY, not market worth). Hand-translation surface: ~134 authored numbers + 11 rules net-new vs the Ledger's ~47 (≈2.9×) — evidence against, stated plainly.
- **The proposal that follows from the evidence:** the Play Ledger powered by this prototype as its staging engine (drive engine stays authoritative; the play engine stages the plays inside each drive). Phase 1 = FB fix (days), Phase 2 = validate staged plays vs nflverse conversion bands, Phase 3 = gravity/advanced stats. If the Owner wants the full rebuild anyway: chain-length calibration FIRST (weeks, needs data), pass response second, then the 99-row harness.
- **Product:** UNCHANGED — wave 19, md5 `1215639c9529882f685037ecd765f81f`. No engine file touched (the Architect's tree was read via `git archive` + the reference harness only).

## What the next session needs
- **Read first:** `deliveries/playled-2026-11-11/DESIGN-PLAYLED-REBUILD-2026-11-11.md` (the verdict + the Phase 1-3 path); then `deliveries/ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md` (the Ledger answer this builds on).
- **Owner decision owed:** Ledger-with-play-engine vs full-rebuild path; if the latter, the chain-length calibration program (needs nflverse per-band conversion data — same source `dl5-snaps.py` uses) comes before everything.
- **Do not redo:** the flex slope-probe method (measure points-per-OVR INSIDE the engine — generic tool for any value layer, no Owner weights needed); the possession-gap diagnosis (chain length, not per-play efficiency).

## Rules that changed / stand
- Owner Q&A law stands: no gates/floor/named exceptions; 99 a guide; OVR+position only; dual positions free; socialism emerges (measured: FB>RB ≈ free from per-play performance, no exposure term written); gravity NOW. NEW finding to carry: the play model prices ability; the value ladder stays outside plays — `max(ability_from_plays, guard_from_values)` is what the measurements support.
- Council chain (QUEUE.md on council/muse): work → 3 reviews → Architect builds. Write only `_agents/zai/**` and `inbox/`. Never push.

## Files in this lane
- `deliveries/playled-2026-11-11/` — THIS chat: the rebuild attempt (design, prototype, measurements, checksums)
- `deliveries/ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md` — the Ledger answer (previous chat)
- `deliveries/` — earlier: style guide, playbook, reweight brief, governance, wisdom, handoff, build report
- `tools/` — build scripts, verify suites (v8..v13) · `builds/` — the two Z-post-blue HTML files · `notes/` — prompts, corrections, worklog
