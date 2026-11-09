SPEAKER: VL | ROLE: council seat | TASK: P-317 build flexrebuild.mjs + flexcheck.mjs to 0/2/6/12 (Owner D decision 2026-11-09) | DATE: 2026-11-09T15:30:00Z
FOR: P-317 (proposed; PRIORITIES.md at push ceiling, not yet added there)

## What was done

Built `tools/mathlab/flexrebuild.mjs` (new) — a deterministic flex-table rebuild script per the Owner's 2026-11-09 D decision (claude-reply-owner-picks-D-2026-11-09.md, council/muse 913d025f):

- Takes `--d-values <file.json>` (map of "ROLE>DEST" -> post-bump D number) as input.
- Rounds theta = 1.0 to nearest tier {0, 2, 6, 12} with cutoffs 1 / 4 / 9: D in [0,1)->0, [1,4)->2, [4,9)->6, [9,inf)->12.
- Applies the complete Owner override list hardcoded in the script (15 rules at 2, 22 at 6, 14 at 12), which beat the rounding rule.
- Deletes the 7 removed rules entirely (FB>EDGE, FB>DT, FB>ILB, FB>OLB, CB>RB, DT>TE, EDGE>FS) — not even at 0.
- Enforces "QB flexes ONLY to FS" (Owner REV 4): QB row is {QB:0, FS:12} regardless of D input.
- Writes `flex.json` (mathlab format, diffable against any prior table) and `flex.ts` (typed engine rendering matching the 67-cakepanz flex.ts shape).
- `--check` self-validates: penalties in {0,2,6,12}, every role has a row, QB only FS, removed rules absent, overrides exact.
- Writes only its outputs; never touches the product HTML or any protected constant. Fails loudly on malformed input.

Also updated `tools/mathlab/flexcheck.mjs` (modified) to the new tier system: allowed penalties {0,2,6,12} with QB->FS at 12 (was {0,2,4,6} with QB->FS at 10, the pre-rebuild REV 4 system). Keeps the diff against the product's current Pre-Colors table plus tier counts and one-way asymmetries.

## Verification (VERIFIED against command output)

Test D input (synthetic, NOT post-bump real values) at /tmp/flexrebuild-test-d.json, output to /tmp/flexrebuild-out:

```
$ node tools/mathlab/flexrebuild.mjs --d-values /tmp/flexrebuild-test-d.json --out /tmp/flexrebuild-out --check
roles 17  rules 57
tiers: 0:1 2:17 6:24 12:15
FLEXREBUILD OK
```

All 20 targeted assertions PASS: TE>EDGE=12, RB>WR=12, TE>OT=12, DT>EDGE=6, C>DT=12, WR>TE=6, OLB>SS=6, OLB>ILB=6, DT>OG=2, QB>FS=12; rounding OT>OG=0 (D=0.3), RB>FB=2 (D=1.0), TE>WR=6 (D=4.0), WR>FB=12 (D=9.0), DT>ILB=2 (D=2.5); removals FB>EDGE/CB>RB/EDGE>FS absent; QB>WR absent; QB row {QB:0,FS:12}.

flexcheck on the generated (new-format) table:
```
$ node tools/mathlab/flexcheck.mjs   (temporarily with rebuilt flex.json in tools/mathlab/)
rows 17 rules 74
...
FLEXCHECK OK
exit=0
```
(The original tools/mathlab/flex.json was restored afterward — see "Blocked" below.)

## What this reproduces / does not reproduce

The script mechanically reproduces every Owner-specified override (all 51 override rules, independent of D) and the rounding rule for any D values supplied. It does NOT yet produce the final Owner table, because the post-bump D values do not exist:

**BLOCKED — post-bump D values not available.** The Owner's WILL 150->200 and C 150->200 engine changes have not landed (Claude's latest engine-and-seats commit is still 3ed03627; his D-rebuild timed out). D = (X-Y)(1 - slope_a/slope_b) with X=90, Y=70, theta=1.0 requires the engine's slot weights, so D cannot be recomputed post-bump until those engine changes land. The pre-bump thetaprice file (`tools/mathlab/results/thetaprice-2026-11-09.md`) does not exist in this tree either. Until real post-bump D values are supplied via `--d-values`, flexrebuild emits a table whose Owner-overridden rules are correct but whose rounding-only rules reflect whatever D input is given (synthetic in my test).

**BLOCKED — flexeval.mjs does not exist** in this tree (P-310 ran a scratch-tree variant `flexeval-built.mjs` from `git archive 2039c89 colors data tools`). The draft-scan replay (`flexeval` on the rebuilt table, same seeds as P-310: tune 1001-1016 + 3001-3016, fresh 4001-4016) cannot run until flexeval exists and the rebuilt table is in place.

## Next steps (unblocked by this delivery)

1. Claude lands the WILL/C engine changes + the D-based flex-table rebuild on architect/engine-and-seats.
2. Any seat runs `flexrebuild.mjs --d-values <post-bump D values>` and diffs its `flex.json`/`flex.ts` against Claude's rebuilt table (script-vs-Claude disagreement is a finding, not a tie).
3. Run `flexcheck.mjs` on the rebuilt flex.json -> expect FLEXCHECK OK.
4. Run flexeval (once it exists/ported) on the rebuilt table, same seeds as P-310, compare pick counts to the P-310 baseline (fresh 626/112, tune 1212).
5. P-311 verification: table matches Owner decisions rule by rule; D recomputed post-bump; draft scan replay; test suite (290/290 or new count).

Labels: figures VERIFIED against command output above. Blocked status and engine-commit claim INFERRED from the council/zai prompt and git log (3ed03627 is the latest engine-and-seats commit named there).

## Patch form (flexcheck.mjs)

WHERE: `tools/mathlab/flexcheck.mjs` line 8 penalty validator and the QB check.
old -> new: allowed penalties `[0, 2, 4, 6]` with `!(f === 'QB' && p === 10)` -> `[0, 2, 6, 12]` with `!(f === 'QB' && p === 12)`.
WHY: the Owner's D decision uses tiers 0/2/6/12; the old checker rejected every 12 penalty, so it cannot validate the rebuilt table.
SAFE ALONE?: yes — touches only the mathlab validation script, no product file, no protected constant.
HOW TO CHECK: `node tools/mathlab/flexcheck.mjs` on a flex.json using 0/2/6/12 tiers -> FLEXCHECK OK; on the old REV 4 table -> expected FAIL (4/10 penalties now rejected).
