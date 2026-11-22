# ORCADS — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ORCADS · **Model / how reached:** ORCADS / API · **State:** advisor
- **First seen:** 2026-11-19 (admitted by the Owner) · **Sessions:** 2026-11-20 (sitting v2: C29, C24), 2026-11-20 (sitting v3: A1, A2), 2026-11-22 (council ask 0250), 2026-11-22 (76Pancakes cutover ask)
- **Strengths shown so far (evidence, not claims):** pin/ancestry forensics (C29, A1 — `git ls-tree` blob joins, `merge-base`, pin-watch runs); running an engine law against adversarial providers (A2 — Node 26 type-stripping against the extracted tree, raw stdout in the file); repo-wide provenance search (C24).
- **Worktree:** `../wt/orcads` · **Branch:** `council/orcads` · **Base:** `origin/council/base`

## Current work
- **In progress:** none. Session closed at the cutover-ask commit (see below).
- **Done this session (2026-11-22):**
  - `inbox/20261122-1731-orcads-76pancakes-cutover-ask.md` — four cutover answers: ship-first-then-move (conditional), keep `gh` drop `GH` but record P-132, exhibit in its own commit after inauguration, one blocker (hiding the ratings CSV breaks `npm test` but not the build; 6 test files + 3 tools read it).
  - `bulletin/20261122-1731-orcads.md` — five `FACT:` lines for MUSE.
  - `inbox/20261122-1116-orcads-council-ask-20261122-0250.md` — answered Pickle's ask with three deep answers (B1 CSRF, E2 mutation counts, D1 Vite) + nine short where I have a byte. Headline findings: hoisting the origin check cannot break the GET callback (the guard already excludes GET/HEAD), so Pickle's "C is ruled out" is wrong on the code; no mutation harness exists at `5d10336`; `vite ^8.3.6` vs plugin `^7.3.1` means the S15 "7.3.6" is probably the plugin.
  - `bulletin/20261122-1116-orcads.md` — six `FACT:` lines for MUSE.
- **Pickle's council ask is now answered** (`council/pickle:inbox/20261122-0250-…`, `69d6807b4`). Pickle collects; I do not need to re-file unless a seat contests a fact.
- **Order v4 still untaken** (`council/pickle:_agents/pickle/deliveries/council-sitting-order-2026-11-20-v4-pickle.md`, `d27c1cf6`). v4's top item is **A1 · C12 ring synthesis** (three conflicting filings: porca → B `rawSort`, hy4orca → A + rawSort, beam → adjudication; one law: expectations from the engine on raw keys, never the component's parse). Second: **A3 · C8b third-seat confirm** — my A2 file already carries the run and the `week: 6` fix, so A3 must be a *different* seat's review; I cannot review my own.
- **Done this session (v3):**
  - `inbox/20261120-0355-orcads-A1-pin-watch.md` — self-test 8/8 exit 0; live Architect tree 69/69 exit 0; order's npm scripts do not exist; gh-pages `--strict` exits 4 on five stale pin lines.
  - `inbox/20261120-0402-orcads-A2-q7-adversarial.md` — Q7 gap real; shipped law blind to week/season/pack/engine readers; one-test two-line fix; production unaffected (no call site passes a snapshot).
- **Done earlier (v2):**
  - `inbox/20261120-0342-orcads-C29-snapshot-pin.md` — four pins; gh-pages README stale; c10 pins `5c808472`/`65673a00` on the pre-re-root preserve ref; tip `408410477` = 68 files + `snapshot.ts` with 7 changed.
  - `inbox/20261120-0348-orcads-C24-part0-provenance.md` — Part 0 = REPORTED (relay only, no owner-note).
- **Blocked / waiting on:** C15/C16/C22 need the c10 app tree (only `SHELL-STATUS.md` + build report are in git).

## What the next session needs
- **Read first:**
  1. `origin/council/pickle:inbox/20261122-0250-pickle-council-ask-how-would-you-decide-all-open-questions.md` (§G asks for three deep answers; my reply is filed, so read it only to see which rows are still unanswered by anyone).
  2. `origin/council/pickle:_agents/pickle/deliveries/council-sitting-order-2026-11-20-v4-pickle.md` (§1 settled, §2 corrections, §4 ranked work).
  3. `origin/council/muse:_agents/QUEUE.md`.
  4. My A1 + A2 files (they correct two v3 order items and carry the receipts).
- **Open questions:**
  1. Who fixes the five gh-pages pin lines — Z.ai or the Owner? (I did not edit gh-pages.)
  2. Does plan v3 §3.3's context-aware provider intend to read `week`? If yes, Q7 and the plan disagree and the Architect must pick.
  3. Where is the c10 zip? Without `src/` the c10 review items cannot be run from git.
  4. Does `better-auth@1.7.27` reject a foreign Origin on its own? One read of the library settles B1 between "hoist" and "test only".
- **Do not redo:** c10 repair rehearsal (three seats), doc-fix md5s (four seats), the four gates (Pickle), passGap numbers, pin-watch self-test (mine, exit 0), Q7 adversarial run (mine), the council ask (mine, filed).
- **Next best for this seat:** v4 **A1** (C12 ring synthesis — one recommendation for the Architect), then A3 (`?seed=` store seam), A8 (contrast pairs), C27 (item-6 vs passGap numbers), C30 (Owner-owes as a runnable checklist).

## Files in this lane
- `_agents/orcads/ORCADS.md` — this file.
- Deliverables live in `inbox/` (five files so far); no `deliveries/` directory needed yet.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items — four filed (C29, C24, A1, A2), all measurements, all pushed.
