SPEAKER: vl | ROLE: Council Advisor | TASK: Task 1 baseline reproduction — Lab baseline N=1000 + midFloor ladder | DATE: 20261106-0410Z
FOR: Task-1 / Q10

## Reproduction environment
Base 425f72a extracted to /tmp/repro-base (git archive). w74's colors/tools/outcomelab/calibration-curve.ts copied in (base has calibrate-draft.ts only). Seed formula makeRng(1000+i), paired across policies — identical to w74.

## Tool equivalence — CONFIRMED
My midFloor rung repro matches w74 byte-for-byte:
- midFloor 14: 46.7% playoffs (w74: 46.7%)
- midFloor 18: 44.2% (w74: 44.2%)
- midFloor 24: 50.8% (w74: 50.8%)
- favorites@24: 17.5% (w74: 17.5%)
Same argv (--midFloor=14 equals-form; space-form ignored per FINDINGS-P-250), same seed scheme. My harness is tool-identical to Z.ai's.

## Baseline N=1000 numbers — VERIFIED by direct read of baseline-n1000.json
greedy: 89.5% playoffs / 33.0% SB / 21.6% title / meanWins 11.43
top30: 48.5% / 7.1% / 3.0% / meanWins 8.72
favorites: 17.4% / 2.0% / 0.7% / meanWins 6.72
Win-SD ~2.17-2.23 all arms (below 3.0-3.5 band; report-only parity).
Shards b-*.json corroborate within z=±0.19 (greedy 86.6/91.3/91.3; top30 45.8/51.1).
CONFIRM every number in w74's FINDINGS-P-250 table. No rejection.

## Ladder conclusion — CONFIRMED FLAT
midFloor lever cannot reach 80/25/10 (best rung 50.8%, 29.2pp short; every rung within own CI ±6.3pp). Per pre-registered rule: NO parameter value proposed. Gap is draft-quality, not league-strength (greedy proves 41pp edge expressible).

## P-263 cluster (N=100 skilled) — COMPLETE (see inbox/20261106-0340-vl-P-263-cluster.md)
VL top30 N=100: 38% playoffs / 3% title = "38/3" ✓ reproduces VL+MUSE.
greedy N=100: 90% playoffs / 20% title — NOT 53/11, so OR/VLOC/Beam did not run greedy.
"53/11" = noisy N=100 sample of top30-random (true 48.5/3.0 at N=1000; N=100 CI ±9.8pp/±10.8pp).
Both clusters are N=100 sampling noise — NOT slot handling (draft.ts:140-149 uses one slot-aware candidates() for all policies). Do NOT tune against either until N=1000.

## Baseline N=1000 shard repro — IN FLIGHT
8 shards (seeds 0-999) running at /tmp/repro-base/results/baseline-s{0..7}.json (~95-100%, slow machine). Will corroborate the VERIFIED baseline numbers above; appended as receipt when complete. Does not block any verdict.

EVIDENCE: VERIFIED (baseline-n1000.json + tune2-*.json read at origin/gh-pages:w74/03-lab-calibration/results/; my midFloor repro read from /tmp/repro-base/results/; draft.ts read at 425f72a). PENDING (baseline shard files).
