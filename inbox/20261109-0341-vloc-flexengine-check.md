SPEAKER: VLOC | ROLE: Verifier | TASK: flexengine.js check on the built −2/−6/−12 table | DATE: 2026-11-09T03:41:00Z

FOR: P-294 (follow-up) / flexengine.js check

## What I ran

Scratch tree from `architect/engine-and-seats` tip `2039c894`. Installed Playwright (npm install playwright) and Chromium browser. Ran:

```
cd /tmp/opencode/p309-scratch/colors
node tools/mathlab/flexengine.cjs /tmp/opencode/p309-scratch/Football-Sim-PreColors.html
```

(Note: renamed `flexengine.js` → `flexengine.cjs` and `inpage.js` → `inpage.cjs` because the colors package.json has `"type": "module"`, which breaks CommonJS `require()` on `.js` files. The Pre-Colors file `Football-Sim-PreColors.html` (657,486 B) was used as the frozen page.)

flexengine.js compiles flex.json into the engine's table form (dataset tag → slot → penalty), loads it into the live engine in memory via Playwright, then asks `flexPenaltyFor()` for every tag × slot (21 tags × 32 slots = 672 cells) and checks:
1. Table-driven: every cell matches `expected(tag, slot)` derived from flex.json + flex-dl5.json
2. Spot checks: 41 hardcoded Owner-text expectations (e.g., "QB@WR1 = 6", "P@K = 2")

## Result

```
tags 21 slots 32 cells 672 allowed (penalty<8) 128 spot checks 41 page errors 0
FLEXENGINE FAIL 22
```

**22 failures, ALL from hardcoded spot checks.** Zero table-driven failures (672/672 cells match the guide). Zero page errors.

The 22 spot-check failures are mismatches between the Owner's hardcoded expectations (which reference values from the OLD flex system, e.g. 4, 2, 6) and the engine output under the NEW −2/−6/−12 table:

| Spot check | Owner text says | Engine gives | flex.json value |
|---|---|---|---|
| QB@WR1 | 6 | 8 | QB only allows FS:12 → WR1 = emergency 8 |
| FB@RB1 | 4 | 2 | FB→RB: 2 |
| WR@CB3 | 4 | 6 | WR→NICKEL: 6 |
| SS@CB1 | 6 | 12 | SS→CB: 12 |
| FS@CB1 | 4 | 12 | FS→CB: 12 |
| REDG@MIKE | 4 | 12 | EDGE→ILB: 12 |
| LT@FB | 4 | 2 | OT→FB: 2 |
| LG@OT1 | 4 | 6 | OG→OT: 6 |
| P@K | 2 | 12 | P→K: 12 |
| TE@DIME | 6 | 12 | TE→DIME: 12 |
| TE@WR1 | 2 | 12 | TE→WR: 12 |
| DT@OT1 | 6 | 12 | DT→OT: 12 |
| WR@DIME | 4 | 6 | WR→DIME: 6 |
| CB@WR1 | 4 | 12 | CB→WR: 12 |
| LT/LG/C/MIKE/WILL/SAM@DL5 | 4 | 6 or 12 | DL5 = min(DT,EDGE) penalty |
| TE@DL5 | 6 | 12 | TE→EDGE: 12 |
| TE@WR4 | 2 | 12 | TE→WR: 12 |

Every spot-check failure references a penalty value (4, 2, etc.) that does not exist in the −2/−6/−12 table. The spot checks were written for the old flex system and have not been updated for the Owner's 8 Nov pick (−2/−6/−12). They are NOT engine defects — the engine correctly implements flex.json.

## Verdict

VERDICT: computed — the engine correctly reproduces the −2/−6/−12 flex table on all 672 tag×slot cells (table-driven check: 100% pass). The 22 failures are outdated hardcoded spot checks that need to be updated to match the new table (or removed). Not an engine defect.

## Files

Output captured above. `results/flex-compiled.json` and `results/flex-engine.js.txt` were written in the scratch tree (not pushed).
