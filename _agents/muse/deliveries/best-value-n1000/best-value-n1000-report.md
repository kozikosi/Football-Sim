# best-value drafter — N=1000 measurement (top of the skilled class)

**Question (Owner):** what is the success rate of a player who drafts #1 by priority overall every time — regular season, playoffs, Super Bowl?

**Answer (VERIFIED, N=1000, paired seeds, base 425f72a):**

| Metric | best-value | 95% CI |
|---|---|---|
| P(playoffs) | **89.5%** (895/1000) | ±1.9pp |
| P(Super Bowl appearance) | **33.0%** (330/1000) | ±2.9pp |
| P(title) | **21.6%** (216/1000) | ±2.6pp |
| Mean wins | **11.43** | — |

## Comparison (N=1000, DEFAULT_CONFIG, paired seeds)

| Policy | Playoffs | SB app | Title | Mean wins |
|---|---|---|---|---|
| **best-value** (VERIFIED, this run) | **89.5%** | **33.0%** | **21.6%** | **11.43** |
| greedy (VERIFIED, same run) | 89.5% | 33.0% | 21.6% | 11.43 |
| skilled / top30 (REPORTED, Z.ai w74) | 48.5% | 7.1% | 3.0% | 8.72 |
| favorites (REPORTED, Z.ai w74) | 17.4% | 2.0% | 0.7% | 6.72 |

Owner targets for the **average** skilled drafter: 90% playoffs, ~35% SB, 25% title. The **best** skilled drafter (always #1 by priority) sits essentially at target on all three (89.5 / 33.0 / 21.6). The gap is between the average of the class (48.5%) and the top of the class (89.5%) — a 41 pp draft-quality spread inside "skilled" — not between the engine and the target.

## The headline finding: best-value IS greedy (VERIFIED)

`best-value` and `greedy` are **identical on every metric** at N=100 (90.0 / 33.0 / 20.0, mean wins 11.20) and at N=1000 (89.5 / 33.0 / 21.6, mean wins 11.43) — same counts, same mean wins, same CPU average (8.41), same rounds 1–4 gap (median 3, p90 5, max 5).

Reason, read in the code (`colors/src/sports/nfl/engine/draft.ts:140`): `greedy` sorts candidates by `wins` (the value metric — `WEIGHT[slot] × (eff − replacement)`) and takes #1, with OVR only as a tiebreak. The task's premise that greedy "takes best OVR" does not hold on this base — the "naive best-OVR" label in the w74 FINDINGS does not match the implementation. The policy that actually takes best OVR is `favorites` (sorts by OVR, no regard to spot worth). The only difference between `best-value` (sort by Wins, take #1, no tiebreak) and `greedy` (same, OVR tiebreak) is the tiebreak, and it never changed an outcome in 1000 drafts.

Consequence: no new policy is needed to measure the top of the class — `greedy` already is it. The Lab's three policies are better read as: **best-value (= greedy), average-skilled (= top30/skilled), deliberately bad (= favorites)**.

## Sanity check (N=100) — reproduces VL, not OR/VLOC/Beam

N=100, paired seeds, same base:

| Policy | This run | VL (REPORTED) | OR/VLOC/Beam (REPORTED) |
|---|---|---|---|
| greedy | 90.0% / 20.0% | 90/20 | 89/21 |
| top30 / skilled | 38.0% / 3.0% | 38/3 | 53/11 |

The harness reproduces VL's independent N=100 run on the same commit **exactly** (greedy 90/20, top30 38/3) and the ASK's cited numbers (90/20, 38/3, 20/0). It does NOT reproduce the OR/VLOC/Beam N=100 cluster (53/11). The harness is deterministic (fresh `makeRng(1000+i)` per (i, policy); `newDraft` copies the pool, so policy order cannot contaminate results) and the dataset PIN verifies, so this is the known P-263 cluster discrepancy — not a broken harness. The N=1000 greedy numbers also match Z.ai's published N=1000 baseline **exactly** (89.5 / 33.0 / 21.6, mean wins 11.43), which anchors the best-value numbers to the published baseline.

## How it was run

- Base: `origin/architect/engine-and-seats` at commit `425f72a8` (clean worktree `/tmp/bestvalue-lab`, detached HEAD; the real worktree/branch untouched).
- Dataset PIN verified: `sha256:e583aec0d21078e8827d7a1efdc5c8c1e06ae518ca783ebb4b3cdfd3b2dcf2d3` (`colors/test/nfl/versions.test.ts:16`; `versions.test.ts` passes, fail 0).
- Seed scheme: `makeRng(1000+i)`, policies paired on the same `i` (same draft seed, same user slot, same season seed). Config: `DEFAULT_CONFIG` (topFloor 5, topFloorRounds 4, midFloor 10, midFloorRounds 8, kpFirstRound 6, noiseMax 1.5, missMax 0.6, biasSd 0.5, hyperP 0.15, replFloor 72).
- Commands:
  - `git worktree add --detach /tmp/bestvalue-lab 425f72a` (from `~/workspace/football-sim-muse`)
  - `cd /tmp/bestvalue-lab/colors && npm ci --no-audit --no-fund`
  - `node --test --experimental-strip-types "test/nfl/versions.test.ts"` (PIN check)
  - `node --experimental-strip-types tools/calibrate-draft.ts 100 top30,greedy,best-value` (sanity, 400 s)
  - `node --experimental-strip-types tools/calibrate-draft.ts 1000 best-value,greedy` (main run, 2651 s)
- SB appearance definition: `s.finalists.includes(userTeamName)`, where `finalists` is the Super Bowl participant pair returned by `simulateSeason`. Z.ai's published greedy SB number (33.0%) matches this run's greedy SB count exactly (330/1000), corroborating the same definition. No perfect-season counter was added (separate work, per instructions).
- Files: `best-value-n1000-results.json` (this directory) holds the structured numbers.

## /tmp-only modifications (nothing pushed, nothing in the real repo)

- `colors/src/sports/nfl/engine/draft.ts`: `UserPolicy` union gained `'best-value'`; `userChoose` gained one branch (`if (policy === 'best-value') { cs.sort((a, b) => b.wins - a.wins); return cs[0]; }`). No existing policy's code or behavior changed.
- `colors/tools/calibrate-draft.ts`: added an `sbApp` counter (Super Bowl appearance) and a more precise print format (1 decimal + raw counts). No draft/season logic changed.

## Labels

VERIFIED = I ran it and saw the output. REPORTED = someone else's number (Z.ai w74, VL, OR/VLOC/Beam). The `best-value ≡ greedy` identity is VERIFIED by measurement at N=100 and N=1000 and by code reading (`draft.ts:140`).
