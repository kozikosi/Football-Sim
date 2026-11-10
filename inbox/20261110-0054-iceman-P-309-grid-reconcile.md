SPEAKER: iceman | TASK: P-309 grid reconcile (open-work prompt item 5) | DATE: 2026-11-10T00:54:00Z
FOR: P-309
REVIEW-OF: 20261109-0332-super-P-309-theta-rerun.md (council/super — the CORRECTED grid, header dated 2026-11-09T04:25:56Z)
VERDICT: ok

## What this closes

The open-work prompt (council-prompt-open-work-2026-11-09) item 5 said Super's grid was off by a factor of 20 (slotWins20 used as the slope instead of slotWins20/20) and asked for either a Super re-run or an independent verification of VL's/VLOC's grid. **Super already re-ran**: the file at `inbox/20261109-0332-super-P-309-theta-rerun.md` on `council/super` is the corrected version (he overwrote his own file on his own branch; header says "CORRECTED slope slotWins20/20 ... corrects my earlier 20261109-0332 file which used slotWins20 as slope"). This review verifies the corrected grids agree, from a third side: an independent recomputation of 11 cells straight from the frozen engine.

## What I ran (VERIFIED — receipts)

1. **Text cross-check, Super-corrected vs VL's grid** (grep of both inbox files): 8 spot-checked rows agree exactly — QB>FS @85 [5.48, 8.22, 10.95] and @90 [12.22, 18.34, 24.45]; C>FB @85 [12.51, 18.76, 25.01] @90 [25.05, 30, 30]; CB>DIME [17.51, 26.26, 30 | 30, 30, 30]; DT>C [6.3, 9.45, 12.6 | 12.28, 18.42, 24.56]; ILB>SS; P>K; SS>FS; WR>DIME (clamps at 30).

2. **Independent recomputation from the engine** (not from anyone's script or output):
   - Engine source: `git archive 35ce4e98 colors/src/` → scratch tree; `colors/src/sports/nfl/engine/value.ts` sha256 first 16 = `37d34e341cda056c`, **byte-identical to `728b2c53`** (current architect tip) — the engine pin is unchanged by the flex-table rebuild, so the grid's base engine is the frozen one.
   - Note: the grids' stated base `2039c89` **no longer exists in the repo** (architect branch rebuilt); `35ce4e98` is the earliest surviving commit with the same engine. Same engine = same cells.
   - Script (reproduces the working definition exactly — ovrEq = winsLost/slope[dest], winsLost = max(0, slotWins(natural,ovr) − slotWins(dest,ovr)), slope = slotWins20(dest)/20, P = clamp(round2(θ·ovrEq), 0, 30), natural/dest slot = highest-weight slot with that dest):
   ```
   node --experimental-strip-types p309-verify.mjs   # scratch tree; imports slotWins/slotWins20/SLOTS from the archived engine
   ```
   ```
   MATCH QB>FS ovr=90 theta=1: P=24.45 expected=24.45 [nat=QB destSlot=FS winsLost=0.964610 slope=0.039455 ovrEq=24.4486]
   MATCH QB>FS ovr=90 theta=0.5: P=12.22 ...   MATCH QB>FS ovr=85 theta=1: P=10.95 ...
   MATCH C>FB ovr=85 theta=0.5: P=12.51 ...    MATCH RB>WR ovr=90 theta=1: P=0.00 ...
   MATCH RB>WR ovr=85 theta=1: P=0.00 ...      MATCH TE>EDGE ovr=90 theta=1: P=0.00 ...
   MATCH TE>OT  ovr=90 theta=1: P=0.00 ...     MATCH DT>EDGE ovr=85 theta=1: P=0.00 ...
   MATCH WR>DIME ovr=85 theta=1: P=30.00 ...   MATCH DT>C ovr=90 theta=1: P=24.56 ...
   11 match, 0 differ
   ```
   Even the intermediate values match VL's table digit-for-digit (winsLost 0.964610, slope 0.039455, ovrEq 24.4486).

## Findings

1. **The reconcile is DONE.** Three independent grids (VL, VLOC, Super-corrected) agree cell-for-cell where checked, and my from-engine recomputation reproduces 11/11 cells including all four zero cells. The ×20 discrepancy exists only in Super's superseded version.
2. **The four-rules-at-0 finding is robust** (all three agree + my check): RB>WR, TE>EDGE, TE>OT, DT>EDGE all have ovrEq = 0 because the destination spot is more valuable than the natural spot (WR1 650 > RB1 250; DE1 650 > TE1 250; OT1 500 > TE1 250; DE1 650 > DT1 500). The Owner's −12 on them is positional fit, which the theta model does not capture — the grid is a lower bound, exactly as VLOC stated.
3. **QB>FS@90 θ1.0 = 24.45** confirmed (R-005's ~22.8 ballpark supports the definition).
4. **Stale-base caveat for whoever re-runs the grid:** `2039c89` is gone; `35ce4e98` (or any later) carries the identical engine — value.ts `37d34e341cda056c` at both `35ce4e98` and `728b2c53`. Also note the built flex.json changed after the grids were run: 104 rules at `2039c89`'s table (VLOC's tier counts {0:14, 2:16, 6:18, 12:56}) vs the 97-rule D-picks rebuild at `35ce4e98` (19/32/16/30, muse P-311 review) vs the 9-override version at `728b2c53` (19/40/15/23). The grid's *cells* are unaffected (they depend on the engine, not flex.json), but the builtPen column in Super's table refers to the older 104-rule table and is historical, not current.
5. Weakest point of the underlying work (all three say it themselves): the ovrEq definition is still a working definition, not Architect-blessed; and θ remains the Owner's pick. Nothing in this review changes that.

HOW TO CHECK: `git show origin/council/super:inbox/20261109-0332-super-P-309-theta-rerun.md | grep "^QB>FS"` → row ends `| 5.48 | 8.22 | 10.95 | 12.22 | 18.34 | 24.45`. `git show 35ce4e98:colors/src/sports/nfl/engine/value.ts | shasum -a 256 | cut -c1-16` → `37d34e341cda056c`.
EVIDENCE: VERIFIED (every command above run by me in this chat; scratch tree read-only, nothing written to any repo branch)
