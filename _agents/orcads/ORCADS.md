# ORCADS — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ORCADS · **Model / how reached:** ORCADS / API · **State:** advisor
- **First seen:** 2026-11-19 (admitted by the Owner) · **Sessions:** 2026-11-20 (sitting v2: C29, C24), 2026-11-20 (sitting v3: A1, A2)
- **Strengths shown so far (evidence, not claims):** pin/ancestry forensics (C29, A1 — `git ls-tree` blob joins, `merge-base`, pin-watch runs); running an engine law against adversarial providers (A2 — Node 26 type-stripping against the extracted tree, raw stdout in the file); repo-wide provenance search (C24).
- **Worktree:** `../wt/orcads` · **Branch:** `council/orcads` · **Base:** `origin/council/base`

## Current work
- **In progress:** none. Session closed at `b899d617d` (plus this lane commit).
- **Order v4 received at session end, no item taken** (`council/pickle:_agents/pickle/deliveries/council-sitting-order-2026-11-20-v4-pickle.md`, `d27c1cf6`). v4's top item is **A1 · C12 ring synthesis** (three conflicting filings: porca → B `rawSort`, hy4orca → A + rawSort, beam → adjudication; one law: expectations from the engine on raw keys, never the component's parse). Second: **A3 · C8b third-seat confirm** — my A2 file already carries the run and the `week: 6` fix, so A3 is a review of my A2, not a re-run (a different seat must do it; I cannot review my own).
- **Done this session (v3):**
  - `inbox/20261120-0355-orcads-A1-pin-watch.md` — self-test 8/8 exit 0; live Architect tree 69/69 exit 0; order's npm scripts do not exist; gh-pages `--strict` exits 4 on five stale pin lines.
  - `inbox/20261120-0402-orcads-A2-q7-adversarial.md` — Q7 gap real; shipped law blind to week/season/pack/engine readers; one-test two-line fix; production unaffected (no call site passes a snapshot).
- **Done earlier (v2):**
  - `inbox/20261120-0342-orcads-C29-snapshot-pin.md` — four pins; gh-pages README stale; c10 pins `5c808472`/`65673a00` on the pre-re-root preserve ref; tip `408410477` = 68 files + `snapshot.ts` with 7 changed.
  - `inbox/20261120-0348-orcads-C24-part0-provenance.md` — Part 0 = REPORTED (relay only, no owner-note).
- **Blocked / waiting on:** C15/C16/C22 need the c10 app tree (only `SHELL-STATUS.md` + build report are in git).

## What the next session needs
- **Read first:**
  1. `origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20-v3.md` (§1 settled, §2 corrections, §3 four tracks).
  2. `origin/council/muse:_agents/QUEUE.md`.
  3. My A1 + A2 files above (they correct two order items and carry the receipts).
- **Open questions:**
  1. Who fixes the five gh-pages pin lines — Z.ai or the Owner? (I did not edit gh-pages.)
  2. Does plan v3 §3.3's context-aware provider intend to read `week`? If yes, Q7 and the plan disagree and the Architect must pick.
  3. Where is the c10 zip? Without `src/` the c10 review items cannot be run from git.
- **Do not redo:** c10 repair rehearsal (three seats), doc-fix md5s (four seats), the four gates (Pickle), passGap numbers, pin-watch self-test (mine, exit 0), Q7 adversarial run (mine).
- **Next best for this seat:** A3 (`?seed=` store seam — design), A8 (contrast pairs), C27 (item-6 vs passGap numbers), C30 (Owner-owes as a runnable checklist).

## Files in this lane
- `_agents/orcads/ORCADS.md` — this file.
- Deliverables live in `inbox/` (four files so far); no `deliveries/` directory needed yet.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items — four filed (C29, C24, A1, A2), all measurements, all pushed.
