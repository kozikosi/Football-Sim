SPEAKER: glyph | ROLE: council advisor | TASK: P-322 derivation E5 hybrid independent verification | DATE: 2026-11-10T06:12Z
FOR: P-322

# P-322 E5 hybrid verify (Glyph, independent re-implementation)

**Scope:** Option A from `council-prompt-2026-11-10-derivation-E5.md`. Independent re-implementation (not running MUSE's script): Inkling P-322 base + cross-side floor + same-group A halved (DB/LB/DL) + re-fit cuts (1.5,4,9), tested as E5 and E5+EDGE>OLB override. Read-only derivation analysis; no product/engine/flex changes.

## Inputs read (VERIFIED)

- `git show 97d7e9d:tools/mathlab/flex.json` (origin/architect/engine-and-seats): 99 rules, tier counts {0:23, 2:10, 6:43, 12:23}.
- `git show 97d7e9d:tools/mathlab/results/thetaprice-2026-11-09.md`: 104 rows, D@90 parsed, 40 nonzero.
- Inkling base spec: `origin/council/inkling:inbox/20261110-0104-inkling-P-322-skill-profile-design.md` (profiles/betas/dmults/U/overrides/FB discount/SAM alias/gate/tier).
- MUSE E5 definitions/results: `origin/council/muse:_agents/muse/deliveries/derive-improve-2026-11-10.py`, `origin/council/muse:inbox/20261110-0545-muse-P-322-derivation-floor.md`.
- Prompt-defined classifications applied exactly: offense `{QB,RB,FB,WR,TE,OT,OG,C}`, defense `{DT,EDGE,ILB,OLB,SS,FS,CB,NICKEL,DIME}`, K/P special same-side (not cross-side). Same-group groups: DB `{CB,FS,SS,NICKEL,DIME}`, LB `{ILB,OLB}`, DL `{DT,EDGE}`.

## Script filed (VERIFIED)

- `_agents/glyph/deliveries/derive-e5-verify-2026-11-10.py` — standalone script + run output embedded in note below. Re-runnable from repo root with `python3 _agents/glyph/deliveries/derive-e5-verify-2026-11-10.py`.

## Implementation notes (INFERRED mapping choices, stated)

- Base uses MUSE-prototype BLK elite-line behavior (`BLK` gap zeroed when both `BLK>=8`, any destination). Prior glyph verify (`inbox/20261110-0558-glyph-P-322-derivation-verify.md`) showed spec-literal `dst==C` gives 87/99 and prototype behavior gives 88/99 (OG>OT); this matches MUSE baseline and prompt state.
- Cross-side floor: if `is_cross_side(src,dst)` and model `<6` and `dst != 'FB'`, set to 6 (minimum, not cap). K↔P unaffected.
- Same-group discount: after D gate (`Dv>=5 => A_eff=0`, `4<=Dv<5 => A*0.5`, else A; no `gate_d2`), if src/dst in same DB/LB/DL group, `A_eff *= 0.5`.
- E5 = `cuts=(1.5,4,9)` + floor + `same_group='half'`.

## Results vs live 99-rule table (VERIFIED)

Command: `python3 _agents/glyph/deliveries/derive-e5-verify-2026-11-10.py`

```
REF=97d7e9d
RULES=99 TIER_COUNTS={0: 23, 2: 10, 6: 43, 12: 23}
THETAPRICE_ROWS=104 NONZERO_D=40 BUMPED_OLB>ILB=6.7 OLB>SS=6.7

BASELINE floor cuts(1,4,9): EXACT=93 OFF_BY_ONE=6 HARD=0
  residuals: CB>FS 0→2, CB>SS 0→2, EDGE>OLB 0→2, ILB>OLB 0→2, SS>DIME 0→2, SS>NICKEL 0→2

E3 floor cuts(1.5,4,9), no same-group: EXACT=96 OFF_BY_ONE=3 HARD=0
  residuals: CB>SS 0→2, EDGE>OLB 0→2, ILB>OLB 0→2
  broke 0; fixed CB>FS, SS>DIME, SS>NICKEL

E5 floor cuts(1.5,4,9), same-group half (DB/LB/DL): EXACT=97 OFF_BY_ONE=2 HARD=0
  residuals: EDGE>OLB owner=0 model=2, FS>SS owner=2 model=0
  broke 1: FS>SS (2→0)
  fixed 5: CB>FS, CB>SS, ILB>OLB, SS>DIME, SS>NICKEL

E5 + EDGE>OLB override=0: EXACT=98 OFF_BY_ONE=1 HARD=0
  residuals: FS>SS owner=2 model=0
  broke 1: FS>SS (2→0)
  fixed 6: CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL
```

Checks: `E5_matches_prompt_claim_97_2_0_residuals_EDGE>OLB_FS>SS: True`, `E5_with_EDGE>OLB_override_matches_98_1_0: True`.

## Prompt claims — confirmation/correction

- **E5 exact 97 / off-by-one 2 / hard 0, residuals EDGE>OLB (0→2) and FS>SS (2→0): CONFIRMED** (independent re-implementation, VERIFIED).
- **E5 with EDGE>OLB added as explicit override (price 0) → 98/99:** **CONFIRMED** (98 exact, 1 off-by-one FS>SS, 0 hard). VERIFIED.
- **E3 96/99, breaks nothing:** **CONFIRMED** (96/3/0, broke 0). VERIFIED.
- **Floor baseline 93/99 (6 residuals):** **CONFIRMED** in this run (93/6/0, same 6). VERIFIED.

## EDGE>OLB: override vs rush-equivalence term (INFERRED recommendation)

**Recommend explicit override (price 0), not a new rush-equivalence formula term, for now.**
- Evidence fit: `OVERRIDE` already encodes Owner/role-convention exceptions for EDGE (`EDGE>RB`, `EDGE>ILB`) and others (`C>OG`, `FB>RB/TE`); EDGE>OLB is the same kind of exception — a rush-equivalence convention (EDGE/OLB share rush job) that the skill/D model currently prices at 2 under E5. Adding `('EDGE','OLB'):0` yields 98/99 with no new mechanics and no collateral breaks in this 99-rule test.
- Principle fit: keeps "ability distance" derivation intact while isolating an Owner convention/slot-equivalence case (analogous to existing explicit EDGE exceptions), rather than introducing a new term whose scope (all rush pairs? EDGE↔OLB only?) could overgeneralize and needs separate validation.
- Risk: an override is less general than a term; if more rush-equivalence pairs appear, a term may become cleaner. But with current evidence (single stubborn residual, no product/engine change authorized), override is the smallest, auditable change.
- Not a product/flex change by this report — design recommendation only.

## Labels

VERIFIED: script executed, table counts, baseline/E3/E5/E5+EDGE>OLB fits and residual sets, broke/fixed sets, EDGE>OLB/FS>SS detail values. REPORTED: prompt/MUSE/Claude prior numbers (used as claims checked). INFERRED: BLK behavior mapping choice noted above, EDGE>OLB override-vs-term recommendation.
