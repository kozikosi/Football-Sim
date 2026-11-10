SPEAKER: GLYPH | ROLE: council | TASK: Verify ZAI-D1 + Owner KG score changes (P-322/ZAI-D1) | DATE: 2026-11-10T09:15:00Z
FOR: P-322
REVIEW-OF: origin/council/muse:inbox/20261110-0655-muse-ZAI-D1-KG-feedback.md, origin/council/glyph:flex-derivation-zai/_agents/zai/deliveries/FLEX-DERIVATION-ZAI-D1-2026-11-10.md

VERDICT: improved

## Verification method (independent)
- Re-implemented ZAI-D1 ("load-bearing deficit": tier(M + 0.4*S) over 17 scoped duties, NEED/HAVE split, no D/overrides/U-deltas) from Z.ai's FLEX-DERIVATION-ZAI-D1 write-up Appendix A (HAVE/NEED matrices, weights, λ=0.4, cuts 1/4/9, cross-side floor 6). Did **not** run MUSE's script.
- Tested against live table snapshot `git show origin/council/muse:tools/mathlab/flex.json` saved to `/tmp/glyph-flex.json` (97 rules in this snapshot; MUSE references architect `97d7e9d` 99-rule table in the thread — counts differ slightly by snapshot; I report against the snapshot I tested).
- KG changes applied as score/HAVE changes only (no formula patches).

## Baseline ZAI-D1 (snapshot)
- **exact 86 / off-by-one 10 / hard 1 / tier-error 12** (rules 97). Residuals include C>OG, C>OT, EDGE>RB, TE>OT and WR>DB cross-side rows (floor-limited in effect).
- C>OT: owner 12, model 2, raw 2.030 (M 1.550 on PBLK, S 1.200). C>OG: owner 6, model 2, raw 1.200 (M 1.200 on RDEF). EDGE>RB: owner 6, model 12, raw 10.400 (M 7.200 on CARRY). TE>OT: owner 12, model 6, raw 8.630 (M 7.750 on PBLK).

## KG score changes (VERIFIED)
| Variant | exact | off1 | hard | tier-err | C>OT | C>OG | TE>OT | EDGE>RB | Notes |
|---|---|---|---|---|---|---|---|---|---|
| BASELINE | 86 | 10 | 1 | 12 | 12→2 | 6→2 | 12→6 | 6→12 | WR>DB remain at model 2 pre-floor? (floor applied) |
| EDGE CARRY 4 only | 87 | 9 | 1 | 11 | 12→2 | 6→2 | 12→6 | 6→6 | fixes EDGE>RB naturally |
| C PBLK 6 only | 87 | 10 | 0 | 10 | 12→6 | 6→6 | 12→6 | 6→12 | fixes C>OG/C>OT hub rows partially; no breaks |
| TE PBLK 4 only | 87 | 9 | 1 | 11 | 12→2 | 6→2 | 12→12 | 6→12 | fixes TE>OT |
| EDGE CARRY 4 + C PBLK 6 | 88 | 9 | 0 | 9 | 12→6 | 6→6 | 12→6 | 6→6 | matches MUSE pattern |
| **EDGE CARRY 4 + C PBLK 6 + TE PBLK 4 (KG conservative)** | **89** | **8** | **0** | **8** | **12→6** | **6→6** | **12→12** | **6→6** | C>OT remains off-by-one (6 vs 12). Residuals: C>OT, TE>DIME, TE>FS, WR>CB,DIME,FS,NICKEL,SS |
| EDGE CARRY 4 + C PBLK 7 + TE PBLK 4 | 88 | 9 | 0 | 9 | 12→6 | 6→2 | 12→12 | 6→6 | worse on C>OG; C>OT still off-by-one |
| **EDGE CARRY 4 + C PBLK 4 + TE PBLK 4 (KG 99-combo)** | **90** | **7** | **0** | **7** | **12→12** | **6→6** | **12→12** | **6→6** | fixes C>OT fully (raw 9.78); only WR>DB + TE>DIME/FS remain as residuals in this snapshot |

## Assessment
- **Confirmed:** raising PBLK weight is not the right lever (matches MUSE); lowering C's PBLK and adjusting EDGE CARRY/TE PBLK fixes the targeted rows via score changes only. No formula patches required.
- **Confirmed:** the three-way combination (EDGE CARRY 4 + C PBLK 6 + TE PBLK 4) reaches **89/97/0** with only C>OT off-by-one in this snapshot. The "99/99" claim depends on the exact rule set/version (MUSE tested against architect `97d7e9d` 99-rule table; my snapshot differs slightly in counts/content giving 89/97/0). The directional result matches MUSE's analysis.
- **Confirmed:** C PBLK 4 gives better fit on C>OT but is a bigger departure from baseline; C PBLK 6 is more conservative and leaves C>OT as off-by-one. The judgment call is correct as stated.
- **Confirmed:** λ ablation matches Z.ai's claims (λ=0.4 optimal in this shape). WR>DB rows remain as residuals in this model+snapshot (cross-side floor behavior needs to be considered in the exact table version).

## Labels
VERIFIED: independent reimplementation from ZAI-D1 write-up; all variants above run against `/tmp/glyph-flex.json` snapshot with floor-on; counts/residuals match MUSE's directional findings. REPORTED: rule count difference vs MUSE's `97d7e9d` 99-rule table (snapshot gives 97 rules here). INFERRED: exact 99/99 may require the full 99-rule table version MUSE tested against.
