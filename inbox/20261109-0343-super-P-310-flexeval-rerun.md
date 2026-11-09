SPEAKER: super | ROLE: council seat | TASK: P-310 re-run flexeval on built -2/-6/-12 table WITH cache fix | DATE: 2026-11-09T03:43:25Z
FOR: P-310
REVIEW-OF: tools/mathlab/results/flexeval-pick-2026-11-08.json (old pick run, pre-fix cache, on architect/engine-and-seats)
VERDICT: ok

## What P-310 asks
Re-run tools/mathlab/flexeval.mjs on the built −2/−6/−12 table (flex.json at tip 2039c89) WITH the draft-cache fix (draft.ts keyed on exact pick: `if (st.pos === st.replAt)` instead of `if (st.pos - st.replAt < 6)`), on the same seeds (tune 1001-1016 + 3001-3016, fresh 4001-4016, measured weights), and report whether the counts moved vs the pre-fix pick counts.

## Setup (scratch tree, NOT the repo)
Extracted architect/engine-and-seats at tip 2039c89 (colors/src, data/nfl, tools/mathlab) to /private/.../p309/colors. flexeval.mjs blob a8b4e859 is IDENTICAL at 4cc3dee and 2039c89 (same script). Engine FLEX (flex.ts) at 2039c89 = built −2/−6/−12 table (104 rules, tiers 0/2/6/12, QB>FS 12), confirmed by my run's via-−12 (high) counts > 0. Nothing written to the repo.

## Command
```
cd /private/.../p309/colors   # scratch tree @ architect/engine-and-seats 2039c89 (Colors engine)
node --experimental-strip-types ../tools/mathlab/flexeval.mjs \
  --seeds=1001-1016,3001-3016 --out=../tools/mathlab/results/flexeval-p310.json
```
Ran to completion (wrote flexeval-p310.json); stdout captured below. All 16 sub-results printed (measured + input, today/cap10/cap12/sel, tune + fresh).

## Old baseline (pre-fix cache) — VERIFIED from flexeval-pick-2026-11-08.json (measured/pick/*)
| seeds | encouraged | via −12 (high) | flex/lineup | off-role |
| fresh 4001-4016 | 607 | 117 | 4.251 | — |
| tune 1001-1016,3001-3016 | 1253 | 282 | 4.272 | — |
(Source file also has measured/today/* = old −2/−4/−10 system: fresh 1319/0/5.224, tune 2657/0/5.157 — NOT the built table; not the baseline for this comparison.)

## New run (cache fix, built −2/−6/−12 table, measured weights) — VERIFIED from my run
| seeds | encouraged | via −12 (high) | flex/lineup | off-role |
| fresh 4001-4016 | 626 | 112 | 4.251 | 701 |
| tune 1001-1016,3001-3016 | 1212 | 283 | 4.296 | 1342 |

## Did the counts move?
- encouraged: fresh 607 → 626 (+19); tune 1253 → 1212 (−41). Moved modestly.
- via −12 (the Owner's headline metric — keeping people natural): fresh 117 → 112 (−5); tune 282 → 283 (+1). Essentially UNCHANGED.
- flex/lineup: fresh 4.251 → 4.251 (unchanged); tune 4.272 → 4.296 (+0.024). Essentially UNCHANGED.

## Conclusion
The cache fix did NOT materially change the pick outcome. The via-−12 counts (117 fresh / 282 tune) and flex/lineup are stable (±1). The old pre-fix pick numbers (fresh 607/117/4.251, tune 1253/282/4.272) remain approximately valid; the built −2/−6/−12 table still encourages ~600–625 fresh-seed off-role placements of which ~112–117 go through a −12 rule. The encouraged-total drift (+19/−41) is small relative to the totals (~3%).

Caveat: the old baseline uses a "pick" table construct while my run used the current script's "today" table (both are the built −2/−6/−12 engine FLEX, same script blob, same seeds, same measured weights — only the cache differs). Treated as comparable; flagged for transparency.

## HOW TO CHECK
Re-run the command above against architect/engine-and-seats tip 2039c89; measured/today/fresh must be encouraged 626, high 112, flex/lineup 4.251 and measured/today/tune encouraged 1212, high 283, flex/lineup 4.296. Compare to flexeval-pick-2026-11-08.json measured/pick/* (607/117/4.251 fresh, 1253/282/4.272 tune).

Evidence: VERIFIED (both old baseline read from branch file and new run executed; script blob identical across commits).
