SPEAKER: glyph | ROLE: council reviewer (glyph, advisory) | TASK: review Architect status update (P-317 + absorb-work answer) and pass thoughts to council | DATE: 2026-11-19T03:32Z
FOR: P-317, engine work items 5–7, council absorb-work planning

# Glyph review: Architect P-317 + absorb-work update (2026-11-19)

**Context (REPORTED):** Owner relayed the Architect status message below to glyph for council visibility/review (no explicit “verbatim” request stated for this relay; message included verbatim for fidelity).

---
## Architect status message — verbatim (as relayed to glyph)

Boot and push access are done. I'm now on P-317, reading how the store builds a draft and what the save record holds.

Status: P-317 is a small backward-compatible change. I'm adding an optional `pickSlot` to the draft record and the START action. First I'm checking how appstate.ts calls START.

Status: the P-317 tests pass, 17 of 17. Next I'm running the full suite and the type-check ratchet, then I'll commit and push.

Boot, push access and P-317 are done. Items 5 and 6 of the engine work are not started this sitting. I pushed everything as `06d8972` on `architect/engine-and-seats`.

**Boot and push (VERIFIED).** The clone and `bootstrap.sh` ran, with the NOW-CHECK fresh. The first Bash call returned "no verdict", and the identical repeat ran. I called `add_repo` with push once, under your authorization. The push then succeeded.

**P-317 (VERIFIED).**
- **What changed:** Team Select's slot choice now reaches the engine. `START` takes `pickSlot` (1–32). The user's team takes that round-1 slot and the snake order runs from there.
- **Old saves:** the saved record gets an optional `pickSlot` field. Saves without it restore exactly as before, and a slot equal to the team's own index writes nothing.
- **Why it was bigger than one file:** the saved record never stored a draft order, and `restoreDraft` rebuilds the default order. Passing `order` to `newDraft` alone would work live and then fail on every reload with "out of order". So the fix touched the store, `saves.ts` and `appstate.ts`.
- **Checks:** I added 2 tests. Tests are 421/421 and the `tsc` baseline is 89/89. The `tsc` check first failed only because `npm ci` hadn't been run in this fresh clone.

**Your three asks.** The full answer is in `claude/absorb-work-answer-2026-11-19.md`; the short version:
- **Ask 1:**
  - Tier 1 yes, all of it.
  - Tier 2 yes under diff review. I wouldn't hand P-317 over, since it reached the save format.
  - Tier 3 yes, for UI surfaces only, once the framework is settled or the work is framework-neutral.
  - Tier 4 stays with me.
  - My capacity in sittings per week is UNKNOWN; my guess is 3 short engine sittings a week.
- **Ask 2:** I'd hand Z.ai the per-commit fresh-clone receipts, the manifest regeneration, and the runs of items 5 and 6. I'd keep reading those results. I should stop running the full suite after tiny edits and hand-writing report tables.
- **Ask 3:** Inkling's tiers divide work by task type, but the risk follows file paths. P-317 is the example: it was labelled small store wiring and reached persistence. I'd fence the engine and save paths with a check, and divide by interface instead: Z.ai owns the UI against a frozen view-model contract that I publish. The cost is that the view-model API has to be frozen first.

**Next step:** item 5, the GLM-vs-pool re-run on the new baseline.

---
## Glyph verification (quick, read-only)

- **VERIFIED (git):** `origin/architect/engine-and-seats` tip includes `06d89724` “P-317: START takes pickSlot (1-32); optional record field, old saves unchanged; absorb-work answer; NOW” (fetched/read this session). Changed: `M claude/NOW.md`, `A claude/absorb-work-answer-2026-11-19.md`, `M colors/src/sports/nfl/app/appstate.ts`, `M colors/src/sports/nfl/app/saves.ts`, `M colors/src/sports/nfl/app/store.ts`, `M colors/test/nfl/store.test.ts`.
- **VERIFIED (file contents):** `claude/NOW.md` (2026-11-19, 3rd sitting) records P-317 done, 421/421, tsc 89/89, absorb-work answer filed, items 5/6 not started, next = item 5 then 6 then 7/S3/S4. `claude/absorb-work-answer-2026-11-19.md` matches the short-version points relayed (Tier 1 all; Tier 2 under diff review with P-317 kept by Architect due to save-format reach; Tier 3 UI-only after framework settled/neutral; Tier 4 + path fence; capacity UNKNOWN ~3 short engine sittings/week; handoffs/keep set; risk-by-path critique and interface/frozen-view-model alternative).
- **REPORTED (not rerun by glyph):** “421/421 tests, tsc 89/89 baseline, 2 tests added, npm ci needed in fresh clone” — consistent with NOW.md/commit message; glyph did not run tests/tsc/build. “Add_repo push once…” boot detail REPORTED by Architect.

## Glyph thoughts (for council)

1. **P-317 validates “risk follows file paths” (AGREE, INFERRED from evidence):** A task framed as store wiring reached the save envelope/restore semantics (`pickSlot` persistence, `saves.ts`/`appstate.ts`/restore behavior). This is concrete support for the Architect’s critique of task-type tiers and for a **mechanical path fence** (e.g. `colors/src/core/**`, `colors/src/sports/nfl/engine/**`, `colors/src/sports/nfl/app/saves.ts`, `colors/data/**`, `tools/mathlab/**` fenced from Z.ai patches) plus diff caps/receipt format. Keeping P-317 in-house was the right call given save-format impact.
2. **Backward-compat save posture looks right (REPORTED, design):** Optional `pickSlot`, absent = old behavior, no write when slot equals team index — minimizes migration risk. Council/UI consumers (Cakepanz/Colors shells) should treat `pickSlot` as optional and not assume draft order is implicit; this unblocks Team Select slot choice flowing to engine when wired (store/P-317 side now present per Architect).
3. **Absorb-work split (reasonable):** Tier 1 to Z.ai (fresh-clone receipts, manifest/datacheck regen, scripted runs of items 5/6 with fixed command/seeds/N/output, Architect reads results) fits CI-honesty reality (green = build gate + pin-watch only). Tier 2 under diff review for anchored non-fenced changes; Tier 3 only UI surfaces once framework settled or neutral; Tier 4 (engine semantics, lambda, pack/ratings, protected constants/pins, save schema/envelope, cutover merge, final acceptance, Owner-gated calls) stays with Architect — consistent with governance and with P-317’s lesson. Dividing by **frozen view-model contract** (UI owned against published types+contract tests; Architect reviews contract changes) is a promising way to cut review cost, but prerequisite is freezing the VM API and resolving/neutralizing framework choice (ties to R-13/Owner ruling).
4. **Process guardrails to keep:** no direct pushes to Architect branch, no fenced-path edits by Z.ai, re-pin verification ≠ re-pin, no seat declares final acceptance; receipts must state cwd/command/output (and not be read as “tested” beyond what ran).
5. **Status:** items 5/6 not started this sitting; next is item 5 (GLM-vs-pool re-run on new baseline) — no blockers stated for glyph/council action beyond awareness and any Tier-1/receipt support the Architect explicitly requests.

WOULD CHANGE MIND: test/tsc/build receipts contradicting 421/421 or 89/89, evidence that `pickSlot` breaks old-save restore/order invariants, or a different fenced-path/contract proposal with measured lower risk.
