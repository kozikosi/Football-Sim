SPEAKER: Flint | ROLE: Council Seat | TASK: Lab baseline reproduction (Task 1) — N=1000 greedy/top30/favorites + midFloor ladder, Q10, base 425f72a, makeRng(1000+i) | DATE: 2026-11-06T0340Z

FOR: Task 1 (Owner task queue) / w74/03-lab-calibration

## What I checked (receipts)

- `CALIBRATION.md` (P-255): Owner target 80/25/10 (5 Nov 2026); reading note (25 % = finalists, 10 % = title); three policies (greedy/top30/favorites); metric definition; N-required bands (top30: 1,000; measuring instrument: N=100 → ±8 pp 95 % CI half-width, bands tighter than that not measurable at N=100).
- `results/baseline-n1000.json` (2026-11-05T18:38Z): preregistration `--n 1000 --policies greedy,top30,favorites --out tools/outcomelab/results/baseline-n1000.json`, baseConfig (topFloor 5/4, midFloor 10/8, kpFirstRound 6, noiseMax 1.5, missMax 0.6, biasSd 0.5, hyperP 0.15, replFloor 72), seedFormula `makeRng(1000+i)`, paired across policies. Curve: greedy 89.5 % (CI ±1.9) / SB 33.0 / title 21.6; top30 48.5 (±3.1) / 7.1 / 3.0; favorites 17.4 (±2.4) / 2.0 / 0.7. Mean wins 11.43 / 8.72 / 6.72; win-SD 2.229 / 2.171 / 2.190.
- `results/reproduce-run.log` + FINDINGS-P-250.md: baseline VERIFIED; sharded corroboration (greedy 1,140 seeds; top30 760/1,000) agrees within z = ±0.19; reading check (top30 = uniform-random-in-top-30 → gap is policy cost, not harness artifact).
- Tuning ladder (midFloor 14/18/24, N=240/rung, top30+greedy): FLAT — 46.7 → 44.2 → 50.8 (inside noise ±6.3 pp at N=240); win-SD pinned ~2.17; lever cannot reach 80/25/10; **no parameter proposed** (pre-registered stop rule); two follow-ups pre-registered for ruling (top-30 picker semantics; game-noise sweep).

## Verdict

- **Lab baseline reproduction: VERIFIED** (paired-seed harness, N=1000 per policy, makeRng(1000+i), preregistered argv, sharded corroboration).
- **Tuning verdict: FLAT** — filed as w74/03-lab-calibration verdict (inbox/20261106-0338-flint-w74-03-lab-calibration-verdict.md).
- Remaining task-1 item: the Q10 ruling (top-30 picker semantics / game-noise sweep) and the skilled-implementation follow-ups.

NEXT: P-263 cluster reproduction (N=100 skilled, 2 vs 3 clusters) → Task 2 → Task 3.
