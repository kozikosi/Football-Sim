# P-311 review: Claude's flex rebuild (35ce4e98)

REVIEW-OF: architect/engine-and-seats @ 35ce4e98, "Architect: flex table rebuilt from the Owner's D picks (97 rules, 19/32/16/30)"
VERDICT: improved

## What I ran (all against origin/architect/engine-and-seats)

- `git log` — tip is 35ce4e98, parent 3ed03627 (P-309 theta pricing).
- Parsed `tools/mathlab/flex.json` rule by rule and checked it against the Owner's D picks (relay `claude-flex-rebuild-2026-11-09.md`, `913d025f` + correction `f0dc5eff`).
- Parsed `colors/src/sports/nfl/engine/flex.ts` and compared it to flex.json rule by rule.
- `git diff 3ed03627 35ce4e98 --stat` and `--name-only` for the guard rails; checked the PIN_ENGINE move in `colors/test/nfl/versions.test.ts` and the base-total re-pin in `colors/test/nfl/lineup.test.ts`.

## VERIFIED

- **Table matches the Owner's picks exactly.** 97 rules; tiers {0: 30, 2: 16, 6: 32, 12: 19}. All 7 removed rules absent (FB>EDGE, FB>DT, FB>ILB, FB>OLB, CB>RB, DT>TE, EDGE>FS). All 14 at-12, all 24 at-6, all 15 at-2 rules at their Owner tier — zero mismatches.
- **Borderline rounding cases correct.** OG>OT (D 3.99) lands at 2; TE>SS (4.19) and TE>FS (4.2) land at 6. The nearest-tier rule with cut points 1/4/9 reproduces 19/32/16/30 exactly, as Claude reports.
- **EDGE>TE is 6, NOT removed.** Correct per the Owner's clarification.
- **flex.ts = flex.json.** 97 rules each, no missing, no extra, no value mismatches. The file itself notes a test compares the two rule by rule, so they cannot drift.
- **Guard rails held.** The diff touches 7 files (flex.json, flex.ts, flex-dl5.json, lineup.test.ts, versions.test.ts, the ruling, NOW.md). Neither `slots.ts` nor the thetaprice results are in the diff — SLOTS[].weight was not touched and D was not recomputed, exactly as the correction prompt required.
- **Re-pins are as stated.** PIN_ENGINE is now `nfl1.1f467e8a89710d` (was `nfl1.042b4efe83dcad`). The 3-4 base total is now 1800 (was 1850); the test explains why (EDGE>ILB is free in the new table, so only DT>EDGE −6 on DE2 costs anything: 6 × 300 = 1800). The flex test now asserts n=97 and tiers {0: 30, 2: 16, 6: 32, 12: 19}.
- **EDGE flex is nearly free, as Claude flags.** EDGE>DT, OLB, ILB, OG, OT, RB, FB, NICKEL are all 0 in the built table. This is the table working as specified (those D values round to 0), not a build error — but it is a real property of the Owner's table worth the Owner seeing.

## REPORTED (not re-run here)

- Claude reports npm test 290/290 and flexcheck + flexdl5 OK. I did not re-run the suite from this seat in this review (the table and the pins are verified above; the suite count matches the 290/290 from the measured-display landing).

## Next

- P-311 is verified on the table. The draft-scan comparison vs the P-310 baseline (fresh 626 / tune 1212) is the remaining P-311 step and belongs to the council's test run, not this table check.
- Claude's next job is the guard passes (`claude-guard-passes-2026-11-09.md`).
