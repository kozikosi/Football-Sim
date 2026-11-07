# GLM — lane file (rewritten 2026-11-07 ~02:1xZ, end of session)

Identity: council seat `glm` — analytics / scribe lane. IK realm; direct runs against primary
sources preferred. Labels on every claim: VERIFIED (ran/fetched) · REPORTED (named source) ·
INFERRED (shown math) · UNKNOWN.

Worktree: `/Users/kosi/Desktop/wt/glm` · branch `council/glm` · merge-base with
`origin/council/base` = `1b91f50e` · latest pushed HEAD: `099561e1` (ls-remote verified 7 Nov).

## Current work and state (7 Nov session — Owner weights directive)

**Owner's 7 Nov salary-weights directive: verified, tested, reported — DONE, pushed `099561e1`.**
- The Owner's 32-slot table == the engine already (`SLOTS` at tip, design.json, salary-reference.json —
  three-way 32/32 exact; landed 6 Nov as `6cccf293`, ruling at `claude/rulings/2026-11-06-owner-salary-weights.md`).
- Salaries never displayed: `salary-reference.json` internal-only; `grep -rn salary colors/src` empty — VERIFIED.
- Reveal test (the Owner's ask): `_agents/glm/tests/owner-weights-verify.mts` — 32/32 inside the ±50 room on
  both formations; max err DE1 +23.3; WR1 −18; no inversions; unit 0.00254 wins/pt; draft priority
  QB → DE1/WR1 650 → DT1/OT1 500 → CB1/OG1/WR2 400 …; **DT2 10M→300 is +50 over the salary×25 rule**
  (his other 10M rows are 250) — flagged for the Owner's call (taste or typo).
- Test receipts on my bench: lineup.test 34/34, matchup.test 19/19, versions.test 7/7 (my stale root
  design.json synced from the tip in the same commit to let the lineup test run — noted there).
- `slots.ts` line 1 still says "error at most 2.5" (retired contract; live one is ≤50 per the ruling) —
  one-line Architect fix flagged in the report, not edited by me (engine file).
- Report: `inbox/20261107-0200-glm-OWNER-WEIGHTS-report.md`.

## Prior session (6 Nov) — condensed

1. **ASK 20261105-0105 (outcome-based CI gate) — ANSWERED** `inbox/20261106-0310-glm-ANSWER-outcome-ci-gate.md`
   (commits `5ca6c747`, `010db8a3`): (a) regression bands anchored at measured + target-gap column, power rule
   tol = depth + 1.28·SE(N), P(20-0) coarse band [0.5, 3.0], favorites separation gate; (b) DraftConfig knob map
   + MEASURED finding: the four taste knobs are a user-strength channel, NOT bottom-widening (≤2-win share 6.7%
   vs 7.0% unchanged; rule intact max gap 5) — bottom levers likely on the season/matchup side; (c) three-tier
   CI job + stamp rule (commit/PIN_DATA/PIN_ENGINE/node), bands.json shape, refuse-to-evaluate on stamp mismatch.
2. **P-261 — DONE** (`ac1b9e12`): `DATA-LICENSE.md` at repo root + `inbox/20261106-0207-glm-P-261-data-license-cbc-verified.md`
   (CBC verified against the opinion — cite right, my 5 Nov reasoning retracted as wrong-in-direction; nflverse
   clauses re-fetched fresh; layer table).
3. **P-263 review — POSTED** `inbox/20261106-0310-glm-P-263-review.md` (stamps VERIFIED versions.test.ts:16;
   425f72a↔tip byte-identity VERIFIED → 53/11+47/6 cluster UNANCHORED; NEW catch: `skilled` CLI literal falls
   through userChoose to favorites silently — reject unknown policies).
4. Tip-side N=100 (VERIFIED, `010db8a3`): reproduces the ASK exactly — greedy 90.0/20.0 (appear 33.0),
   skilled 38.0/3.0 (appear 6.0), favorites 20.0/0.0 (appear 2.0), CPU avg 8.41/8.49/8.56, tail 6–9%,
   gaps median 3/p90 5/max 5 (`tests/bands-2026-11-06-tipN100.txt`). ASK + MUSE N=1000 = tip build family.
5. Knob-combo N=120 (VERIFIED, `010db8a3`): `tests/bands-knob-combo-N120.txt`.
6. **P-262 retire op** (BUILT at `90dcd6e1`, read on tip; `83079d6c`) — needs second seat/Architect.
7. Owner-letter smalls (`ac1b9e12`): cache-coherence defenses; governance staleness; Vite test
   (npm ci clean, `vite 8.3.6` runs; `vite build` failed on tip layout at that moment — mid-flight reorg).
8. Owner stopped the N=400 probe mid-run (~17/26 CPU-min) — not restarted; exact command below.
9. Probe tool: `_agents/glm/tests/outcome-band-probe.mts` (committed; identical RNG streams to stock
   calibrate VERIFIED at N=3 both directions; adds appear/20-0/CPU-tail metrics).

## What the next session needs

- The un-run **N=400 probe** (needs colors + data/nfl on disk; ~40 min wall uncontended):
  extract work copies (`git archive origin/architect/engine-and-seats colors | tar -x` and
  `git archive origin/architect/engine-and-seats data/nfl | tar -x`; `cd colors && npm ci`), then
  `node --experimental-strip-types _agents/glm/tests/outcome-band-probe.mts 400 greedy,top30,favorites >
   _agents/glm/tests/bands-2026-11-07-N400.txt` → fill the reserved row in the ANSWER snapshot table.
- **P-255 (Z.ai's CALIBRATION.md) review when it lands** (bands as policy → target ± tolerance → N required).
- **P-262 retire needs quorum**; knob ladder for (b) if the Owner wants per-knob curves (~6 min each).
- Watch (not mine to edit): `skilled` harness literal, `slots.ts` line-1 stale comment, DT2 +50 call.

## Open questions

- DT2 salary deviation (10M → 300): Owner's taste or a typo?
- Owner OK with the reveal's hot pass-rush / cold WR1–2 pattern (max 23.3) as final, or wants a spec refit?

## Environment receipt

- `node v24.22.0`, `npm 11.19.1`; `cd colors && npm ci` rebuilds node_modules (~1 min).
- `colors/` + `data/nfl/` are extracted work copies in this worktree (untracked; parts are tracked on my
  branch — hence **never `rm -rf` the dirs**: yesterday's rm mistake was caught and restored from HEAD).
  Refresh with `git checkout origin/architect/engine-and-seats -- colors data tools/mathlab/design.json`.
- Council tool per START-HERE §3: `git show origin/architect/engine-and-seats:tools/council.mjs > ./.council_tool.mjs`,
  run from the worktree (a /tmp run produces no output), delete before pushing; use `--no-fetch` on slow CPU.
- Context frame (5 Nov): brand 76 Pancakes; targets 90/35/25 + P(20-0) 1–2%; skilled locked.
