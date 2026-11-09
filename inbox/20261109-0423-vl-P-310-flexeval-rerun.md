SPEAKER: VL | ROLE: reviewer | TASK: P-310 flexeval rerun on built table with cache fix | DATE: 2026-11-09T04:23:03Z
FOR: P-310

VERDICT: ok

## What I did

Re-ran flexeval on the BUILT −2/−6/−12 table (flex.json at architect/engine-and-seats tip 2039c89) WITH the draft-cache fix (draft.ts keyed on `st.pos === st.replAt` instead of `st.pos - st.replAt < 6`), on the same seeds as Claude's evidence: tune 1001-1016 + 3001-3016 (2,048 lineups), fresh 4001-4016 (1,024 lineups), measured weights (`measuredDisplayWeights('4-3')`).

Command: `node --experimental-strip-types tools/mathlab/flexeval-built.mjs --seeds=1001-1016,3001-3016 --fresh=4001-4016 --tables=built --weights=measured --out=/tmp/p310-scratch/results/flexeval-built.json`, run from `/tmp/p310-scratch/colors` (scratch tree extracted from `git archive 2039c89 colors data tools`; flexeval-built.mjs is a read-only variant of flexeval.mjs that loads `tools/mathlab/flex.json` directly as the "built" table — no product file or protected constant touched).

The script imports `colors/src/sports/nfl/engine/value.ts`, `slots.ts`, `lineup.ts`, `draft.ts`, `players.ts`, `rng.ts`, `flex.ts` from the 2039c89 tree (fix already in draft.ts), reads `data/nfl/*` and `tools/mathlab/flex.json`.

## Result (built table, measured weights, cache fix applied)

| | tune (2,048 lineups) | fresh (1,024 lineups) |
|---|---|---|
| total encouraged | 1212 (high 299, small 713, second 200) | 626 (high 119, small 393, second 114) |
| via −12 rule ("high") | 299 | 119 |
| flex moves / lineup | 4.296 | 4.251 |

Top −12 placements (fresh): RB>WR1 x23 (Jahmyr Gibbs 97), TE>OT1 x19 (George Kittle 97), TE>DE1 x16 (Trey McBride 99).
Top −6/-2 residuals (fresh): OLB>MIKE x81 (-2), C>OG1 x80 (-6), OLB>DT2 x62 (-2), DT>OG1 x28 (-6).

## Comparison to pre-fix-cache numbers (from offload prompt)

| | fresh | tune |
|---|---|---|
| total encouraged | 607 → **626** (+19, +3%) | 1253 → **1212** (−41, −3%) |
| via −12 (high) | 117 → **119** (+2) | 282 → **299** (+17) |
| flex/lineup | 4.251 → **4.251** (identical) | 4.272 → **4.296** |

## Finding

The counts did NOT move materially on the out-of-sample fresh seeds (607→626, flex/lineup identical 4.251). The tune column shifted modestly (1253→1212) but that is in-sample. The −12 rules still concentrate on RB>WR, TE>OT, TE>DE (the four proposed rules dominate the high column), and the −2/−4 residuals persist (OLB>MIKE -2, C>OG1 -6, OLB>DT2 -2) — consistent with Claude's reading that no 10/12 rule fixes those leaks; they need a weight change or to be left as designed.

This run does NOT block Claude (his theta pricing, guard passes, P-308 do not depend on it); it runs in parallel.

## Caveat

This is a measurement on the built table at 2039c89, not a change to flex.json or any protected constant. FLEX is unchanged. Evidence figures VERIFIED against the command output above; comparison to pre-fix numbers INFERRED from the offload prompt's quoted figures.
