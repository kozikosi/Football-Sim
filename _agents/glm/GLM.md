# GLM — lane file (rewritten 2026-11-06 ~03:5xZ, end of session)

Identity: council seat `glm` — analytics / scribe lane. IK realm; direct runs against primary
sources preferred. Labels on every claim: VERIFIED (ran/fetched) · REPORTED (named source) ·
INFERRED (shown math) · UNKNOWN.

Worktree: `/Users/kosi/Desktop/wt/glm` · branch `council/glm` · merge-base with
`origin/council/base` = `1b91f50e` · session-end HEAD: see bulletin entry (pushed).

## Current work and state (this session)

1. **ASK 20261105-0105 (outcome-based CI gate) — ANSWERED** `inbox/20261106-0310-glm-ANSWER-outcome-ci-gate.md`
   (committed `5ca6c747`, knob-combo update `010db8a3`, N-400-cancelled fix in final commit).
   Contents: (a) regression bands anchored at measured anchors + target-gap column, power rule
   tol = depth + 1.28·SE(N), P(20-0) capability-limited band [0.5, 3.0], favorites separation
   gate; (b) DraftConfig knob structural map + MEASURED knob-combo run finding: the four taste
   knobs are a user-strength channel, NOT a bottom-widening channel (≤2-win share 6.7% vs 7.0%
   unchanged; rule intact max gap 5); (c) three-tier CI job + stamp rule (commit/PIN_DATA/
   PIN_ENGINE/node), bands.json shape, refuse-to-evaluate on stamp mismatch.
2. **P-261 — DONE** `DATA-LICENSE.md` at repo root (committed `ac1b9e12`) + verification file
   `inbox/20261106-0207-glm-P-261-data-license-cbc-verified.md`. **CBC citation verified against
   the opinion** (OpenJurist fetch): cite 505 F.3d 818 right; my 5 Nov reasoning-from-memory was
   WRONG IN DIRECTION and is retracted there — court declined the copyright-preemption question;
   actual grounds = First Amendment supersedes publicity + breached warranty §8(a). nflverse
   LICENSE.md re-fetched fresh (§2(a)(1), §3(a)(1), §4(a), §2(b)(1)-(2)).
3. **P-263 review — POSTED** `inbox/20261106-0310-glm-P-263-review.md` (verdict improved): stamps
   VERIFIED in versions.test.ts:16; byte-identity 425f72a↔tip VERIFIED (engine+harness+data) so
   the 53/11+47/6 cluster is UNANCHORED, not engine-state; **NEW catch: `skilled` CLI literal
   falls through userChoose to favorites silently** (my probe hit it; reject unknown policies).
4. **Tip-side N=100 discriminator (VERIFIED, committed `010db8a3`)**: reproduces the ASK exactly
   (greedy 90/20 appear 33.0; skilled 38/3 appear 6.0; favorites 20/0 appear 2.0; tail 6–9%;
   gaps median 3/p90 5/max 5). ASK's 38/3 anchor + MUSE's N=1000 line are the same build family
   as the tip. File: `_agents/glm/tests/bands-2026-11-06-tipN100.txt`.
5. **Knob-combo N=120 (VERIFIED, committed `010db8a3`)**: `tests/bands-knob-combo-N120.txt`.
6. **P-262 retire op filed** (BUILT at `90dcd6e1`, read on tip; commit `83079d6c`) — needs a
   second seat or the Architect to complete.
7. **Owner-letter small items — DONE** (`ac1b9e12`): cache-coherence defenses
   (`inbox/20261106-0207-glm-cache-coherence-defenses.md`) and governance staleness
   (`inbox/20261106-0207-glm-governance-staleness-letter-mechanics.md`). Vite test: npm ci
   clean, `vite/8.3.6` runs; `vite build` FAILS on architect-tip layout (`/src/main.ts` missing
   from index.html vs src tree) — mid-flight reorg artifact at the time of extraction, REPORTED
   to nobody needing action until the w74 tree settles.
8. Probe tool: `_agents/glm/tests/outcome-band-probe.mts` (committed; identical RNG streams to
   stock calibrate VERIFIED at N=3 both directions; adds appear/20-0/CPU-tail metrics).

## What the next session needs

- **Rerun command for the cancelled N=400** (Owner stopped it at ~17 CPU-min of ~26; expected
  ~40 min wall uncontended):
  `git archive origin/architect/engine-and-seats colors | tar -x` (only if colors out of sync —
  it is TRACKED here now; instead `git checkout 90dcd6e1 -- colors data` or `git fetch` first),
  then `node --experimental-strip-types _agents/glm/tests/outcome-band-probe.mts 400 greedy,top30,favorites
  > _agents/glm/tests/bands-2026-11-06-N400.txt`
  → fill the one reserved row in the ANSWER file's snapshot table.
- **P-255 (Z.ai's CALIBRATION.md) review when it lands**: check bands are stated as
  *policy → target ± tolerance → N required*; the N column missing is the finding. My ANSWER
  file supplies the band rows to paste beside the Muse P-263 protocol.
- **P-262 retirement needs quorum** (owner P0): second seat with proof or the Architect.
- The knob ladder for (b) if the Owner wants the measured response curves:
  `...probe.mts 120 greedy hyperP=0.25` etc. (~6 min each uncontended).

## Open questions

- Does the Owner accept "regression-band vs target-gap" split, or wants target-centred gates?
- Skilled-average target interpretation: average-of-class ≈48.5% (REPORTED MUSE N=1000) vs
  target 90% — tune engine (compress class spread?) or retarget? Owner's call (P-250).
- Bottom-tail lever family: my measured evidence points to the season/matchup spread side,
  not DraftConfig — P-250's tuner should measure there first.

## Environment receipt

- `node v24.22.0`, `npm 11.19.1`; `colors/node_modules` installed (deleted with the extraction
  this session end; `cd colors && npm ci` rebuilds in ~1 min).
- Context frame (5 Nov): brand 76 Pancakes; targets 90/35/25 + P(20-0) 1–2%; skilled locked.
- `data/` + `colors/` are TRACKED on this branch; to refresh to the architect tip:
  `git checkout origin/architect/engine-and-seats -- colors data` — do NOT `rm -rf` the dirs
  (they carry tracked files; this session's rm mistake was caught and restored from HEAD).
- Council tool copy: `/private/tmp/council.mjs` (original `tools/council.mjs`); use `--no-fetch`
  before board/show (default fetch times out under CPU load).
