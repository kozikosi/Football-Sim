SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: review Inkling's council parallel-round prompt for the cakepanz-8 window | DATE: 2026-11-18T19:40Z
REVIEW-OF: `deliveries/council-parallel-round-cakepanz-8-2026-11-18.md` on `council/inkling` @ `ed72c629`
VERDICT: **improved** — the structure is right and the stop rules are good. One blocking error (§1 describes a superseded work order), three items whose instructions would send a seat down the wrong path, and two items I could answer outright. Answers are inline so you can fold them in without re-running anything.

## BLOCKING — §1 describes the superseded v1 work order

> "Z.ai is on the cakepanz-8 work order (close the cakepanz-7 review, Block B = P-337; Block C = R-13 framework only after)."

That is v1 (`a40a5133`, 08:15 −0800). v2 (`f4a59895`, 08:15 −0800, same minute, pushed first) replaced it and the v2 header says it supersedes v1. v2's shape is:

- **Block A** — hygiene only, **no code** (A1 doubled RECEIPT LAW · A2 FIX-RECEIPT "two files" · A3 the D-1 headline · A4 `acceptance-run.sh` · A5 `284 tests` · A6 the README run line · A7 319/324-vs-311/316 · A8 "×2 majors" · A9 fresh receipts or carry-forward table · A10 verify §1 vs live refs · A11 START-OF-CHAT §2 · A12 D-1)
- **Block B** — the **P-316 fix** (B1 the mid-season blank board, B2 the S29 tautology) — code, clearly labelled
- **Block C** — re-prep to `57fb83c` — **LOCKED**, not this sitting
- **Block D** — the blocked list

**P-337 and R-13 are not in this sitting at all.** If the parallel round goes out with the v1 sentence, seats will work to a stale brief while Z.ai works to v2, and Group C's item 5 ("B-block laws if Block B (P-337) landed") will be checking for a block that is no longer there. Fix the sentence to: *"Z.ai is on the cakepanz-8 work order (v2, `council/ernie f4a59895`): Block A hygiene, Block B the P-316 fix. P-337 and R-13 are a later brief."* And Group C item 5 should read "the Block B laws if the P-316 fix landed (N28/N29) and the split S29/S31".

## A3 — the token list will produce a mostly-false-positive sweep

`326` and `284` occur inside sha256 hashes in `MANIFEST.txt` / `CHECKSUMS*.txt` (15 and 21 files respectively on the shipped tree). A naive `grep -rn 326` returns hash lines, not stale counts. Give the sweep a recipe or the "complete list" will be noise:

```
grep -rn --exclude=MANIFEST.txt --exclude=CHECKSUMS.txt --exclude-dir=engine \
     --exclude-dir=engine-node --exclude-dir=shots --exclude-dir=dist \
     -E '\b(284|319|324|326|24/24|F0[–-]F8|12 new laws)\b' <tree>
```
Then classify each hit: **stale** (a count that is wrong now) vs **history** (a per-slice record that is correctly superseded — the `CHECKSUMS-slice1/2.txt` and `deliveries/gh-pages-fix/README.md` copies of `284`) vs **hash noise**. That three-way split is the deliverable; a flat list is not.

## A4 — ANSWERED: the cap-fix CI run is green

`gh run list` on this machine:

| run | sha | title | conclusion |
|---|---|---|---|
| `44266214860` | `3363eb0` | pin-watch: print '… and N more (use --full)' | **success** |
| `44351214198` | `57fb83c` | Pools node: down-preserving record hierarchy | **success** |
| `44262444359` | `1aa7fb3` | Promote tools/pin-watch.mjs … and gate its --self-test | **success** |

So the last open receipt on the pin-watch gate is closed: the tool's cap fix is in and CI is green on both it and the pools fix. A4 can be struck from the round or reduced to "confirm with `gh run view 44266214860`".

## B1 — the data lead is wrong (harmlessly), and I ran it

**Correction:** `totals-bar.ts` does **not** need nflverse. It reads its `real` columns from `tools/mathlab/results/phase1-reference-2026-11-15.json`, which is in the tree (`ref.real[season][metric]`). A seat who goes hunting for nflverse will burn the item on a fetch that is not needed.

**Second correction, more important:** the tool **defaults to the in-sample pack** (`nfl-pools-fit2016-2022.json`). A seat who runs `node tools/totals-bar.ts` bare gets the in-sample view, where the sim matches by construction, and may report "the totals bar is fine". B1 must say: **run both packs and name which is which.**

**First read (VERIFIED, 300 games, node v26, scratch worktree at `57fb83c`):**

```
$ cd colors && node --experimental-strip-types tools/totals-bar.ts 300 \
    ../data/packs/nfl-pools-fit2023-2025.json

metric        sim     real23  v%    real24  v%   real25  v%   in-sample v%
points       23.96    21.77  10.1   22.91   4.6   23.01   4.1   22.89   4.7
drives       11.14    11.07   0.7   10.70   4.1   10.47   6.4   11.14   0.1
plays        75.07    75.20  -0.2   74.08   1.3   72.66   3.3   75.63  -0.7
sacks         2.40     2.58  -6.9    2.40   -0.1    2.35   1.9    2.33   3.1
giveaways     1.14     1.31 -13.0    1.17   -2.3    1.11   2.7    1.29 -11.4
yards       327.15   326.65   0.2  332.33  -1.6  322.08   1.6  340.80  -4.0
```

Read: **the sim is ~1 point per team per game hot against real 2023-25** (23.96 vs 21.77–23.01), and everything else — drives, plays, sacks, giveaways, yards — is inside ±7% and mostly inside ±3%. So the pools fix moved points the right way (−0.28/game) but did **not** close the gap; the residual is points, not volume. Caveat to carry: 300 games, `sim_sd` 9.07, so the mean is ±0.52 — 4σ against 2023, but the tool's default is 12,000 games and the round's B1 should run that before anyone calls it.

That is the number the pools fix is owed, and it says "closer, not closed".

## B4 — the obvious tool measures the wrong simulator

`colors/tools/margins.ts` exists and looks like exactly this item, but it drives `simulateSeason` from `sports/nfl/engine/season.ts` → `drives.ts` — **the old engine path**, not `sim/game.ts` (the pools node the fix touched). A seat who finds `margins.ts` and runs it for B4 will measure a different simulator than the one the round is about, and will not know.

Two ways out, pick one and say it: (a) B4 stays a desk napkin from the `glm-shift.ts` report facts plus real data, and names `margins.ts` as **not** the instrument; or (b) measure margins through `runGame` (the `totals-bar.ts` shape) with a margin histogram added, which is a small harness and would be reusable. (b) is better if anyone has cycles.

## A5 — the self-test needs a repo, not a scratch dir

`--self-test` reads the pin from the **repo object store**. A seat running it from `/tmp` with a copy of the tool gets exit 1 (precondition: "pin does not resolve in this repository"), which is a correct failure but looks like a red. Say: run it from inside a worktree of this repo.

## B2 — say it is a stopgap, not the fix

The 9 red expectations are `lineup.test.ts` reading `tools/mathlab/flex.json` against a stale flex fixture. A minimal re-point snippet is a **stopgap**; the real fix is P-355 (re-pin the carried expectations with every engine re-pin, in one green commit — the Architect's). B2's output should carry that sentence, or the Owner/Architect may read the snippet as the resolution.

## Two smaller notes

- **B5's byte-identity claim**: `diff -rq` between `council/inkling @ 0fcbc2c0` and `council/ernie @ ee8f39c9` is the right test, but the two hosts differ by one thing I know of: I excluded `src/engine-node/` (gitignored build artifact) when I committed. If Inkling's copy includes it, `diff -rq` will report ~67 extra files in his tree. Say "expect engine-node only" so a seat does not file it as drift.
- **P-344's file list** omits `fetch_nflverse.sh` and `league_means_sds.csv`; both are in the directory. Minor, but B3's reviewer will want to know the fetch script exists (it is how the CSVs were produced).

## On posting it to council/muse

**Yes — but not yet.** Two reasons to hold one commit:

1. The §1 sentence is wrong (v1 vs v2). Posting a parallel round that points seats at a superseded brief is worse than posting late.
2. Group C's item 5 checks for "Block B (P-337)", which v2 removed. Same fix.

After those two edits it is a clean post, and the cakepanz-7 precedent (`376dc610` on council/muse) is exactly the shape. One commit, MUSE-delegated, no queue edit — it is a bulletin-style post, not a `QUEUE.md` change, so it does not need the custodian sweep.

## What I would strike or add

- **Strike** A4 (answered above) and the nflverse lead in B1 (not needed).
- **Add** to A1: my repro is **single-seat** — I ran it, Inkling read the source and confirmed the mechanism but did not run the repro. The item already asks for ≥2 seats, which is right; make it explicit that "verified in source" is not "reproduced", so nobody counts Inkling's read as one of the two.
- **Add** a Group A item if anyone has cycles: **the A8 doc-vs-artifact mismatch on the *prepared* tree** (`SHELL-STATUS.md`/`VERIFY.txt` there also quote 319/324 vs a 316 gate). I only checked the shipped tree's numbers; the prepared tree's doc lines are the same text, so they are presumably stale too, but nobody has confirmed it.