SPEAKER: muse | ROLE: council advisor | TASK: P-263 — pin the calibration measurement protocol (CALIBRATION.md draft) | DATE: 2026-11-05T21:13Z

FOR: P-263

## What this is

A draft of the measurement protocol for `CALIBRATION.md` (the file P-255 creates). It pins everything a calibration number depends on, so two seats running the same command on the same commit get the same number — and so a number that disagrees can be traced to a changed input instead of argued about.

Source of every fact below: `colors/tools/calibrate-draft.ts` at `origin/architect/engine-and-seats` 425f72a (read in full this session), `colors/test/nfl/versions.test.ts:16` (PIN_DATA, read), and the four independent calibrate runs reported 2026-11-05 (OR, Beam, VL, VLOC bulletins/inbox). Labels: VERIFIED = read or ran it; REPORTED = another seat's run.

## The protocol (draft for CALIBRATION.md)

### 1. Dataset (pinned)

- Player pool: `data/nfl/madden27-ratings.csv` + `data/nfl/free-agents-old-ratings.csv` + `data/nfl/player-ids.csv`, loaded by `buildPool` (calibrate-draft.ts:16).
- Dataset stamp: `PIN_DATA = 'sha256:e583aec0d21078e8827d7a1efdc5c8c1e06ae518ca783ebb4b3cdfd3b2dcf2d3'` (VERIFIED: versions.test.ts:16 at 425f72a). Engine stamp at the same commit: `PIN_ENGINE = 'nfl1.0a5c8e4358a1f5'`.
- Rule: a calibration number is only comparable to another number measured on the same `PIN_DATA` + `PIN_ENGINE`. If either stamp differs, the numbers are from different worlds — say so in the report, do not compare them directly. Recompute both stamps after any dataset or rules change (versions.ts: `stamps()`).

### 2. Seed scheme (pinned)

- Per draft index `i` (0-based): `rng = makeRng(1000 + i)` (calibrate-draft.ts:36).
- Forks, in order: `rng.fork('draft')` → draft pool order; `rng.fork('slot')` → user slot; `rng.fork('run')` → draft execution; `rng.fork('season')` → season simulation.
- The harness runs policies **paired**: for a given `i`, every policy in the run gets the same `rng` (same draft seed, same user slot, same season seed); only the user policy differs (calibrate-draft.ts:35-36). Report paired differences (policy A minus policy B at the same `i`) alongside the absolute rates — the pairing is what makes small N meaningful.
- Command seeds are therefore reproducible: re-running the same command on the same commit reproduces the same drafts, slots, and seasons byte-for-byte (determinism is the engine's property, not the harness's).

### 3. User-slot handling (pinned — this is the variable that caused the top30 discrepancy)

- The user slot is **randomized per draft**: `user = rng.fork('slot').int(0, TEAMS_N - 1)` (calibrate-draft.ts:36). It is deterministic given `i` (same `i` → same slot), but it varies across `i`.
- Consequence: a reported rate is a rate **averaged over the slot sequence for that N**, not a rate for a fixed team. Two runs with different N average over different slot sequences.
- Rule: always report N alongside the rate, and never compare rates measured at different N without stating the N. If a future run fixes the slot (e.g. always the same team), that is a different protocol — name it (e.g. `slot=fixed:<team>`) and do not mix its numbers with slot-randomized numbers.
- The ASK's 38%/3% vs the four-seat cluster (53%/11% at N=100, 47%/6% at N=300) is most plausibly a different data version or engine state, not slot noise: three independent N=100 runs agree exactly and two independent N=300 runs agree exactly, which a slot artifact would not produce. The protocol pins the stamps (§1) so the next such disagreement is traceable instead of argued.

### 4. N per policy and the anchor

- Exact command (from the colors/ directory):
  `node --experimental-strip-types tools/calibrate-draft.ts [N] [policies] [key=value DraftConfig overrides]`
  Defaults: N=40, policies `greedy,top30,favorites`.
- Anchor (VERIFIED by agreement, not by my own run): **N=300, top30 = 47% playoffs / 6% title** — OR (47%/6%) and VLOC (47%/6%) agree exactly. N=100: top30 = 53%/11% (OR, Beam, VLOC agree exactly). Do NOT tune against the ASK's 38%/3%.
- N ladder (purpose, not just size):
  - N=40 (~40 s): smoke / PR gate — checks the harness runs and policies separate grossly. NOT a measurement.
  - N=100 (~5 min): separation gate — the smallest N where the three policies' bands separate (OR's rationale). Use for CI gating.
  - N=300 (~14 min): the anchor — report calibration claims at N=300 or higher.
  - N=1000 (~35 min per policy set, GLM's math): precision — required before claiming a rate to ±3pp (SE 4.0pp at p=0.80, N=100). Nightly, not per-PR.
- Metrics reported per policy (calibrate-draft.ts:44-47): mean wins (w + t/2), CPU average wins, playoffs % (seeded in either conference), title % (champion === user team), CPU rounds 1–4 gap to best on board (median / p90 / max of ovrGap).

### 5. Calibration targets (Owner, locked)

- Skilled drafters ("top-30 pickers" = top 30% by draft skill, policy `top30`): **80% playoffs, 25% Super Bowl appearance, 10% title.**
- Current anchor (N=300): top30 47% / 6% — the game is too hard for skilled drafters; the gap is the tuning problem P-250 owns.
- Bands for the Lab (DS, re-derived 2026-11-05, P-262): home win 54.0% ± 2.5pp (2021–24); parity SD 3.07 ± 0.35; teams with ≤4 wins 4.6/season. Finding 1 FAIL withdrawn (band artifact); parity FAIL stands.

### 6. What a calibration report must contain

1. Commit hash + `PIN_DATA` + `PIN_ENGINE` (all three, every time).
2. Exact command (N, policies, config overrides).
3. Per-policy table: N, wins, CPU wins, playoffs %, title %, CPU r1–4 gap (median/p90/max).
4. Paired differences between policies at the same `i` (at least top30 minus greedy).
5. Slot note: "slot randomized per draft, seed scheme 1000+i" (or the fixed-slot variant name).
6. Wall time.

### 7. Open decision points (Architect / Owner)

- Whether the slot should stay randomized per draft or be fixed/stratified for the anchor runs (MIMO's point; the protocol above pins the current behavior and requires the variant to be named — it does not decide).
- Whether N=300 stays the anchor once nightly N=1000 CI exists (VLOC's recommendation: tighten to N=1000 when affordable).
- The CI-gate N pick (OR N=100, Beam PR N=40 + nightly N=100, VL N=100 + sweep, VLOC N=300) — the Architect picks one; this protocol only requires the choice to be recorded here with its rationale.

## HOW TO CHECK

- `grep -n "1000 + i\|fork('slot')\|fork('draft')" colors/tools/calibrate-draft.ts` → seed scheme lines (VERIFIED this session, 425f72a).
- `grep -n "PIN_DATA" colors/test/nfl/versions.test.ts` → `sha256:e583aec0d21078e8827d7a1efdc5c8c1e06ae518ca783ebb4b3cdfd3b2dcf2d3` (VERIFIED this session).
- Reproduce the anchor: `node --experimental-strip-types tools/calibrate-draft.ts 300` from colors/ at 425f72a → expect top30 47% / 6% (REPORTED: OR + VLOC; I did not run it — the N=300 run takes ~14 min).

## SAFE ALONE?

Yes — a doc proposal. It creates no code, changes no bands, and decides nothing: it pins the measurement so future disagreements are traceable. The Architect (or P-255's author) folds it into CALIBRATION.md; the slot-fixing and CI-gate-N questions stay open until ruled.
