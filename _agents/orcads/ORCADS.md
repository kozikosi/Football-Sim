# ORCADS — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ORCADS · **Model / how reached:** ORCADS / API · **State:** advisor
- **First seen:** 2026-11-19 (admitted by the Owner) · **First work:** 2026-11-20 (council sitting v2)
- **Strengths shown so far (evidence, not claims):** pin/ancestry forensics with `git ls-tree` + `merge-base` (C29); repo-wide provenance search (C24). Both are measurements with raw stdout in the files.
- **Worktree:** `../wt/orcads` · **Branch:** `council/orcads` · **Base:** `origin/council/base`

## Current work
- **Claimed / in progress:** none. Session 2026-11-20 closed at `df9b10b6a`.
- **Done this session:**
  - `inbox/20261120-0342-orcads-C29-snapshot-pin.md` — four engine hashes in circulation; gh-pages README pin line is stale; c10 pins are `5c808472`/`65673a00`; none of the four is on `architect/engine-and-seats` (re-rooted). Command receipts in the file.
  - `inbox/20261120-0348-orcads-C24-part0-provenance.md` — Part 0 = REPORTED (relay only); no owner-note exists; exact replacement wording proposed.
  - Governance docs refreshed from `origin/council/muse` (START-HERE step 0), commit `0aa41893f`.
- **Blocked / waiting on:** nothing. C15/C16/C22 need the c10 app tree, which is not in the repo — see below.

## What the next session needs
- **Read first:**
  1. `origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20-v2.md` (C12–C34; take the top item you can do).
  2. `origin/council/muse:_agents/QUEUE.md` (the live queue; P-315/P-316/P-317 are the cakepanz items).
  3. `inbox/20261120-0342-orcads-C29-snapshot-pin.md` (the pin table — every c10 review depends on it).
- **Open questions:**
  1. Is `67-cakepanz/README.md:4` going to be fixed by Z.ai, or does the Owner want a patch from a seat? (I did not edit gh-pages.)
  2. Where is the c10 zip kept? The repo has only `SHELL-STATUS.md` + the build report; C15/C16/C22 are un-runnable without `src/`.
  3. Does `SNAPSHOT.md` (the prepared copy's contract) name `65673a00`? It is not in the repo either.
- **Do not redo:** the c10 repair rehearsal (three seats agree: 49 OK / 0 failed / 52 files), the doc-fix md5s (Ernie + Porca), the four gates (Pickle), the passGap numbers. See the v2 order §1.
- **Next best items for this seat** (measurement-shaped, cheap): C27 (item-6 vs passGap numbers), C31 (Z.ai order errata — mostly collection), C26/C34 (risk register / cutover checklist — need the state table I already built for C29).

## Files in this lane
- `_agents/orcads/ORCADS.md` — this file.
- (No deliveries/ directory yet; both files this session live in `inbox/`.)

## Role
General advisor. Admitted by the Owner on 2026-11-19. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items — currently 2 filed (C29, C24), both measurements, both pushed.
