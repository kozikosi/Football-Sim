# PORCA — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor
- **ID block:** none filed · **First seen:** 2026-11-19 (admitted by the Owner)
- **Strengths shown (evidence, not claims):** 21 inbox receipts pushed on `council/porca` across five sessions. All measurements from fresh `git archive`/`git show`/`md5`/real file reads; no shared tree, product file, engine, pin or other seat's file touched. Three self-corrections filed when runs falsified my own earlier claims (C8 week overclaim; A1 pin claim; A3 mirror critique).

## Current work — session 5 (2026-11-20, the Owner's cakepanz relay)
- **Pushed the Owner's folder verbatim:** `_agents/porca/deliverables/zip-root-cakepanz-10/` (41 files, 424 KB, 0 source-vs-copy byte mismatches), commit `97308ac8a`, verified on `origin/council/porca`. Follows Pickle's existing convention at the same path under `_agents/pickle/`.
- **Reviewed the whole relay:** `inbox/20261120-0447-porca-P-317-cakepanz10-package-review.md`, `VERDICT: improved`. Four packaging defects + two minor nits + one clarification, each with a drop-in replacement. Headline: the two delivered status docs disagree about the single open gate item (bootstrap says "still running", report says "STOPPED exit 1"); the delivered SHELL-STATUS.md is stale (says the slot receipt is absent although it is present; omits the pin section its own tool writes) because acceptance step 13d never ran after 13b stopped; the receipts file ends at the 13b command so the F20 TAUTOLOGY has no raw stdout in the record; `md5 -c CHECKSUMS.txt` is a silent no-op on this mac and the manifest's line 1 is a broken self-entry.
- **Filed 8 improvement ideas:** `inbox/20261120-0452-porca-IDEA-cakepanz-shell-next.md` — re-pin tool, ring-format falsifier, URL seed, local undo affordance, desktop DOM bound, generated-file input hashes, sport adapter, relay mirror.
- **Pushed:** `4b9a80039`, matched by `ls-remote`. Worktree clean.

## Corrections carried in the record
- Ring verdict: **B** (`rawSort`), not A. Re-pin is owed even for a view-only change.
- Q7: plain week/season readers are already caught by the no-snapshot QB assertion. The true gap is unpopulated keys and non-QB-only metadata reads.
- **Pin provenance (settled this session):** pickSlot at `560b8364f` IS correct on the pin's lineage (`git merge-base --is-ancestor 560b8364f 408410477` → yes). `06d89724d` is the pre-reroot lineage commit; both carry the same lines. Do not "correct" SNAPSHOT.md to the latter.
- Part 0 is REPORTED, not accepted. `d3bd81d2` = Colors engine pin; `4ca9a071` = 67-cakepanz snapshot pin (both superseded for cakepanz by the 408410477 re-pin, REPORTED from the relay).

## What the next session needs
- **Read first:** the two session-5 inbox files above, then the relay at `_agents/porca/deliverables/zip-root-cakepanz-10/deliverables/sitting-report-2026-11-20.md`.
- **Do not redo:** all C1–C11, C12, A1, A2, A3, C18/B8, the c10 re-measurement, `hosted-c9.diff`, passGap, the 18-provider Q7 probe, or the cakepanz-10 relay review.
- **Still open (not mine, no claim):** the falsify-board stale-server guard (next sitting's FIRST item per the relay); the C′1 ring contract; the six named AA holes; the Owner's Part 0 ruling; plan M's sport-two choice (baseball vs basketball).
- **End-of-chat gate:** `node tools/preserve.mjs check` exits 1 because of OTHER seats' unsaved work (`orcabeam`, `orcaman`, `q`, `vloc`, `vlorca`, shared tree). My `council/porca` reported `0 dirty / 0 unpushed OK`. Do not touch other seats' worktrees.

## Files in this lane
- `_agents/porca/PORCA.md` — this file.
- `_agents/porca/deliverables/zip-root-cakepanz-10/` — the pushed relay (verbatim).
- No build copies elsewhere, no images, no lane code (advisor role). Work lives in `inbox/` plus one bulletin file per session.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Propose, test, dissent, measure; never build or rule.
