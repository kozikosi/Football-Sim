# PORCA — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor
- **ID block:** none filed · **First seen:** 2026-11-19 (admitted by the Owner)
- **Worktree:** `/Users/kosi/Desktop/wt/porca` · **Branch:** `council/porca` · `git merge-base HEAD origin/council/base` → `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **Evidence standard:** receipts come from fresh `git show`/`git grep`/`md5sum`/node runs or real file reads. No shared tree, product file, engine, pin or other seat's file touched. A wrong claim is kept in the record with a superseding correction: C8 week overclaim, A1 pin claim, A3 mirror critique, C1 ancestry claim.

## Current work — session 5 (Owner's cakepanz relay, closed 2026-11-20)
- **Relay pushed verbatim:** `_agents/porca/deliverables/zip-root-cakepanz-10/` (41 files, 424 KB, 0 source-vs-copy byte mismatches), commit `97308ac8a`, ls-remote verified. Same convention as Pickle's mirror at `_agents/pickle/`.
- **Full package review filed:** `inbox/20261120-0447-porca-P-317-cakepanz10-package-review.md`, `VERDICT: improved`. Four packaging defects, two minor nits, one false-dispute clarification, each with drop-in replacement text. Headline: bootstrap/report disagree about the one open 13b gate item; `SHELL-STATUS.md` is stale because step 13d never ran; the 13b F20 TAUTOLOGY stdout is absent from the receipts; `md5 -c CHECKSUMS.txt` is a silent no-op on macOS and the manifest self-line is the empty-string hash.
- **Eight shell ideas filed:** `inbox/20261120-0452-porca-IDEA-cakepanz-shell-next.md` — re-pin tool, ring-format falsifier, URL seed, local undo affordance, desktop DOM bound, generated-file input hashes, sport adapter, relay mirror. None were built (advisor role).
- **Svelte code pass appended to the same review** (commit `bd914f82f`): S1 seed-code round-trip (700/9000 of the random draw range replays a different seed; `1296 → "100" → 100`), S2 one-click pick leaves the staged confirm banner armed, S3 gone% a11y (effect INFERRED, no screen reader run), S4 restore-replay copy gated off exactly on restore, S5 only 1180×900 / 390×320 tested, S6 a pre-existing unkeyed each. `draftOrder(i, i+1)` vs `snakeOrder()` is UNKNOWN — store source is not in the zip.
- **C1 ancestry correction filed** (commit `c91397c06`): my earlier "06d89724 is NOT an ancestor of the pin" was a shallow-clone artifact. Full-history clone: `merge-base --is-ancestor 06d89724 408410477` → yes; `06d89724 → origin/architect/engine-and-seats` → yes; `06d89724 → d3bd81d2` → no (expected). 06d89724 is the true pickSlot introduction (parent store.ts 0 hits, commit 10, 560b8364f 10); 560b8364f only carries the lines. Original wrong measurement retained with a superseding CORRECTION block.
- **Later relays:** two MUSE prompts addressed to the Architect (Contract B, NOW.md to 15, red suite/PIN_ENGINE/Q7, plan-M additions) and to the four c10 hosts (landing script + prepared `dist/` restoration) were left untouched — not PORCA items. No files changed for them.
- **End state:** HEAD `c91397c0678e1b8ff77477364075521e8eca2434`, pushed and ls-remote verified; worktree `0 dirty / 0 unpushed OK` at the end-of-chat preservation gate.

## Corrections carried in the record
- Ring verdict: **B** (`rawSort`), not A. Re-pin is owed even for a view-only change.
- Q7: plain week/season readers are already caught by the no-snapshot QB assertion; the real gap is unpopulated keys and non-QB-only metadata reads. The relay reports `week: 6` as the confirmed fix.
- **Pin provenance (CORRECTED):** 06d89724 is the true pickSlot introduction and IS an ancestor of pin 408410477 and the live Architect tip. 560b8364f carries identical lines but is a different commit. Neither is an ancestor of the frozen d3bd81d2 (2026-11-14) — expected. This was the fourth shallow-clone artifact in the council; verify ancestry in full history, never in `/Users/kosi/Desktop/wt/porca` (its common repo has `.git/shallow`).
- Part 0 is REPORTED, not accepted. `d3bd81d2` = Colors engine pin; `4ca9a071` = 67-cakepanz snapshot pin; `408410477` = plan-M docs pin (REPORTED from the relay).

## What the next session needs
- **Read first:** the two session-5 inbox files above, then the relay at `_agents/porca/deliverables/zip-root-cakepanz-10/deliverables/sitting-report-2026-11-20.md`.
- **Do not redo:** all C1–C11, C12, A1, A2, A3, C18/B8, the c10 re-measurement, `hosted-c9.diff`, passGap, the 18-provider Q7 probe, the cakepanz-10 package review, the Svelte pass, or the ancestry re-check.
- **Still open (not mine, no claim):** the falsify-board stale-server guard; the C′1 ring contract (council consensus B, awaiting Architect ruling); the six AA holes; the Owner's Part 0 and sport-two rulings; Z.ai's cakepanz-12 fix round; the c10 landing on four hosts.
- **Unanswered brainstorm question to the Owner:** is the shell's main frustration the slow loop around the engine (re-pins, receipts, generators going stale), or the player-facing board on a phone? A ranked shortlist of the eight ideas waits on that answer.
- **End-of-chat gate:** `node tools/preserve.mjs check` exits 1 for OTHER worktrees only (shared Football Sim tree, council-ds/super, architect-colors, boc, dsd, flint, GH, glm, hy4, mimo, q, vloc; local-only commit on council/vlorca). My `council/porca` reported `0 dirty / 0 unpushed OK`. Do not touch another seat's worktree.

## Files in this lane
- `_agents/porca/PORCA.md` — this file.
- `_agents/porca/deliverables/zip-root-cakepanz-10/` — the pushed relay (verbatim).
- No build copies, images or lane code (advisor role). Work lives in `inbox/` plus one bulletin file per session.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Propose, test, dissent, measure; never build or rule.
