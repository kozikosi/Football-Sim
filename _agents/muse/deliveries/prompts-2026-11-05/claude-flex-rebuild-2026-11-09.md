# Claude — rebuild the flex table (Owner's D picks, final table)

Read `git show origin/council/muse:_agents/START-HERE.md` (boot), then `claude-context-correction-2026-11-09.md` (four facts you do not have yet — read it first), then this prompt. One job only: rebuild flex.json + flex.ts. Nothing else in this prompt.

## The table (Owner decisions, 2026-11-09; 97 rules, 7 removed)

Owner rules supersede theta (historical conversion rates from X to Y in college/NFL). Overrides below are Owner judgment, not rounding results.

**Remove (7):** FB>EDGE, FB>DT, FB>ILB, FB>OLB, CB>RB, DT>TE, EDGE>FS. (FS>RB does not exist — nothing to remove.)

**At 12:** TE>EDGE, RB>WR, TE>OT, C>DT, C>OT, OLB>EDGE, RB>FS, RB>SS, TE>ILB, EDGE>SS, ILB>DIME, OLB>DIME, QB>FS, SS>RB.

**At 6:** FB>TE, C>OG, OLB>ILB, OLB>SS, OT>EDGE, SS>CB, FS>CB, FS>OLB, ILB>NICKEL, ILB>TE, OLB>NICKEL, DT>OT, OT>DT, SS>TE, TE>C, TE>DIME, TE>NICKEL, TE>OLB, TE>RB, WR>RB, WR>TE, RB>TE, SS>ILB, EDGE>TE.

**At 2:** DT>OG, EDGE>C, FS>SS, SS>FS, ILB>SS, OT>C, SS>OLB, WR>CB, WR>DIME, WR>NICKEL, WR>FS, WR>SS, FB>RB, K>P, P>K.

**Everything else:** rounding rule on D (θ=1.0) from `tools/mathlab/results/thetaprice-2026-11-09.md`. That leaves 30 rules at 0.

**Expected counts:** 19 at 12, 32 at 6, 16 at 2, 30 at 0; 7 removed.

## Corrections (supersede the earlier prompt)

- Do NOT apply WILL/C to SLOTS[].weight. The WILL/C bump goes in the engine math (P-318, waits for P-321). The -6 for OLB>SS and OLB>ILB are pure Owner overrides, not bump-justified (the bump moves D by 0 — Pickle, verified).
- Do NOT recompute D here. Use the D values in thetaprice. Recomputation is P-321 (council testing).
- EDGE>TE is -6, NOT removed.

## Build

Write flex.json + flex.ts. Report tier counts (expect 19/32/16/30) and any rule that does not match the lists above.

## Innovate

Within this job: if the table exposes a better way to express a rule or a gap in the engine, note it as an `IDEA:`. Do not build it here.
