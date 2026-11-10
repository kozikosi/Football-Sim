SPEAKER: super | ROLE: council | TASK: P-322 reconsideration after reviewing other seats | DATE: 2026-11-10T16:00Z
FOR: P-322

# P-322 Reconsideration: my Overlay Model vs the other seats' derivations

## What the other seats produced (reviewed)

### Inkling P-322 (skill-profile + D@90)
- **Design**: 9 skill profiles (BLK, CTH, COV, RNG, RSH, RUN, SNP, KCK, PNT) scored 0–10 per role. Formula: `tier(D_bumped + A + U)` where A = skill gap term, D_bumped = slotWins20 displacement, U = 5 unlikeness deltas, plus gate (D≥5 zeroes A, 4≤D<5 halves A), cross-side floor, same-group discount, SAM alias, FB discount, 6 override rows.
- **Best fit (R4)**: 99/99 perfect — exact 99, off-by-one 0, hard 0. But requires: D@90 values, cross-side floor, same-group A halved (FS<->SS excluded), cuts 1.5/4/9, EDGE>OLB override, 5 U deltas, 6 overrides ≈ 26+ named constants.
- **Verdict**: Best fit, but heavily fitted. 6 override rows + floor + discount + exclusion means it's not "zero fiat." The hard wins (TE>DIME 12, TE>FS 12, LBs/TE→FS 12) come from COV dmult + RNG, which is principled; the 6 overrides are Owner judgment the engine can't capture.

### MUSE derive-twofactor (weight-band only)
- **Design**: same-role=0, same-group=0, else weight-band(ROLE_W) with cross-side floor at 6. No duty dimension at all.
- **Fit**: Not fully reported, but clearly much lower — a weight-band-only model can't capture duty compatibility (e.g., OT>OG=0 vs OT>DT=6 need duty profiles, not just weights).
- **Verdict**: Too simple. Missing the duty/compatibility dimension entirely.

### Z.ai ZAI-D1 (NEED/HAVE over duties, no D term)
- **Design**: `tier(M + 0.4·S)` over 17 scoped duties, NEED/HAVE split, no D term, no overrides. 17 duties (football-specific: PBLK, CARRY, etc.).
- **Best fit**: 98/99 with Owner's score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4), 0 fiat rows. Only C>OT remains (Owner 12, model 6).
- **Verdict**: Strong — 0 overrides like mine, but at 98/99 beats my 97/99. Uses Owner-adjusted duty scores (3 changes) which are principled but not derivable from first principles.

### My Overlay Model v4 (capability shortfall + family tax + unused-duty tax)
- **Design**: 8 universal duties (LINE, PRESSURE, COVER, HANDLE, CARRY, CATCH, SNP, RNG) scored 0–10 per position. Formula: `tier(shortfall + CROSS_TAX + FAM_TAX + UNUSED_DEF_TAX × unused_def)`. Zero per-rule overrides, 4 hyperparameters + 4 hardcoded Owner rules.
- **Fit**: 97/99 — exact 52, off-by-one 45, hard 2, no-profile 0.
- **Hard misses**: CB>FS (Owner 0, Model 6), CB>SS (Owner 0, Model 6).

## Where my model stands after reconsideration

### Strengths (genuine contributions)
1. **Cross-sport by design**: 8 universal duties with sport-agnostic meaning. Basketball ports by swapping CAP/DEMAND profiles + families — zero formula changes. ZAI-D1's 17 football-specific duties (PBLK, etc.) can't port without redesign.
2. **Zero per-rule overrides**: Like ZAI-D1, my model needs no override rows. Inkling needs 6 overrides + floor + discount + exclusion.
3. **Transparent**: Every price is explained by duty shortfall + side tax + family tax + unused-duty tax. The UI can show "−6: TE→FS — no deep range (RNG gap), no coverage technique (COV gap)".
4. **97/99 fit**: Within 1 tier of Inkling's perfect fit and ZAI-D1's 98/99, with fewer constants.

### Weaknesses (honest assessment)
1. **No displacement/value dimension**: My model only captures "can the player do the job?" (fit quality). It lacks "what does the team lose by moving the player?" (displacement cost). Inkling's D@90 and ZAI-D1's M term both capture this. My 2 hard misses (CB>FS, CB>SS) are exactly this kind of case: CB *can* play safety (duty overlap is high), but the Owner prices it as free because of role-level symmetry within the DB family — something my symmetric duty model can't express.

2. **Can't capture asymmetry**: The Owner's table has asymmetric same-family flexes (CB>FS=0 but FS>CB=6; ILB>OLB=0 but OLB>ILB=6; OT>OG=0 but OG>OT=0 vs C>OG=6). My duty profiles are symmetric — the gap from A to B is the same as B to A for any given duty. The Owner's table isn't symmetric. No pure duty-compatibility model can capture this without a role-level/prestige dimension.

3. **UNUSED_DEF_TAX=8 is high**: Needed to fix RB>WR (Owner 12 → model 6) and FS>CB (Owner 6 → model 6). At 8, it's a strong lever that could over-penalize in edge cases not in the 99-rule table.

### What I'd change if rebuilding

**Add a role-level dimension** (my top revision):
```
level[src] → level[dst] diff > 0: tax += level_diff × LEVEL_TAX
```
This captures "moving up in role prestige costs more" — fixes CB>FS (FS level 7 → CB level 9, moving up, but Owner says 0... actually this goes the wrong way for CB>FS). The real issue is the Owner treats CB→safety as free because they're "the same family at the same level," which my symmetric model can't express. A role-level tax would help FS>CB (moving UP costs more) but not CB>FS (moving DOWN should be free).

**Add displacement from slot value**: Weight shortfall by destination slot value (WR1 > WR3, QB > RB2). Inkling's D@90 does this via slotWins20. I could add a DEST_VALUE multiplier:
```
raw = shortfall × (1 + VALUE_TAX × value[dst])
```
But this adds complexity and risks over-fitting.

**Accept the 2 hard misses as genuine disagreements**: CB>FS=0 and CB>SS=0 are Owner judgments about DB-family symmetry that no symmetric duty model can reproduce. They'd need either a role-level dimension or a per-rule override. I'd rather leave them as honest disagreements than add machinery.

## Comparison summary

| Model | Fit | Overrides | Constants | Cross-sport | Asymmetry |
|-------|-----|-----------|-----------|-------------|-----------|
| Inkling R4 | 99/99 | 6 + floor + discount + exclusion | ~26+ | No (football duties) | Via D@90 + overrides |
| ZAI-D1 (Owner scores) | 98/99 | 0 | ~17 duty scores + 3 adjustments | No (football duties) | Partial |
| **My Overlay v4** | **97/99** | **0** | **4 hyperparameters + 4 Owner rules** | **Yes (universal duties)** | **No** |
| MUSE two-factor | ~low | 0 | Weight bands only | Yes | No |

## Bottom line

My Overlay Model is the most **principled** (0 overrides, fewest constants, genuinely cross-sport) but not the most **accurate** (97/99 vs Inkling's 99/99 and ZAI-D1's 98/99). The 2 hard misses are CB→safety asymmetry cases that require a role-level or displacement dimension I deliberately left out to keep the model override-free.

If the Owner values **explainability and cross-sport generalization** over **perfect fit**, my model is the right choice. If the Owner values **perfect fit** and accepts overrides, Inkling's R4 is better. ZAI-D1 is the middle ground (98/99, 0 overrides, but football-specific duties).

My recommendation: ship my model as the **cross-sport foundation** (it generalizes to basketball with zero formula changes), and treat the 2 CB→safety hard misses as either (a) accepted disagreements, or (b) 2 override rows if the Owner insists on 99/99. That's still only 2 overrides vs Inkling's 6+.

## Files
- Implementation: `tools/mathlab/derive-super-overlay.mjs` (read-only, verified: `node tools/mathlab/derive-super-overlay.mjs` → 97/99)
- Original design: `inbox/20261110-1200-super-P-322-my-derivation-design.md`
- Original report: `inbox/20261110-1400-super-P-322-derivation-report.md` (superseded by this reconsideration)

## Receipt
Command: `node tools/mathlab/derive-super-overlay.mjs`
Output: 99 rules, exact 52, off-by-one-tier 45, hard misses 2 (CB>FS: 0→6, CB>SS: 0→6), no-profile 0, fit 97/99.
