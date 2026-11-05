# CALIBRATION-TARGETS — the product's outcome goals (the numbers the Owner set)
Source of truth for "how often should the user reach the playoffs / win the Super Bowl". Saved 5 Nov 2026 because the Owner could not find where it lived (it was only in an owner note).

## The Owner's words (verbatim note: `_agents/owner-notes/2026-10-31-cpu-draft-targets-verbatim.txt`, 31 Oct 2026)
- A **fairly optimal** user team: reach the playoffs **about 90%** of the time, win the Super Bowl **10% to 25%**.
- An **extremely suboptimal** team (favourite players only, no regard to wins or priority): these numbers do NOT hold; punish it.
- A user **consistently picking within the top 30 of wins/priority**: "we want them to have fun" (no number given: see Open).
- CPU teams may draft badly in later rounds; in the **first few rounds** (where the user sees how the CPU picks) the CPU pick stays **within about 5 OVR of the top-OVR player on the board**.
## Refinement (Owner, 5 Nov 2026, in chat)
League parity and home-win rate are NOT goals. The user should have a much better chance at the playoffs than an average NFL team. **More losers at the bottom** of the league are wanted, as long as the draft board looks realistic in the first rounds.

## Measured (VERIFIED 5 Nov 2026, `node --experimental-strip-types colors/tools/calibrate-draft.ts 100`, 100 drafts per policy, DEFAULT_CONFIG: topFloor 5 for rounds 1-4, midFloor 10 for rounds 5-8, noiseMax 1.5, missMax 0.6, biasSd 0.5, hyperP 0.15, replFloor 72)
| Policy | User wins | Playoffs | Title | Target |
|---|---|---|---|---|
| greedy (fairly optimal) | 11.20 | 90% | 20% | 90% / 10-25%: MET |
| top30 | 8.74 | 38% | 3% | OPEN (no number from the Owner) |
| favorites-only | 6.67 | 20% | 0% | punished: OK |
CPU average 8.41 to 8.56 wins. CPU rounds 1-4 gap to the best on the board: median 3, p90 5, max 5 (rule: about 5: MET). With N=100 the playoff rates carry about +-3 to +-5 points of sampling error (INFERRED, binomial); a gate needs N>=300.
Outcome Lab (Z.ai, 440 seasons): league win SD 2.2 (real NFL about 3), a 2-win-or-fewer team in only 8% of seasons. This is the "not enough losers at the bottom" the Owner describes; the levers are in the draft layer (later-round CPU quality and between-team spread), not the game model.

## Open (Owner)
1. top30 target. Recommended default: playoffs 60-70%, title 5-10% (today 38% / 3%).
## Rule for models and gates
Outcome rates above are the product's hard gate; parity SD and home-win rate are report-only. Any change to the draft or game model re-runs `calibrate-draft.ts` at N>=300 and attaches the table.
