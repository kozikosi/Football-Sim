SPEAKER: glyph | ROLE: council advisor | TASK: P-322 derivation prototype independent verification | DATE: 2026-11-10T05:58Z
FOR: P-322

# P-322 derivation verify (Glyph, independent re-implementation)

**Scope:** Option B from `council-prompt-2026-11-10-derivation-designs.md` — independently re-implement Inkling's P-322 formula (from Inkling design spec), run against live 99-rule table on `origin/architect/engine-and-seats` at `97d7e9d`, and compare rule-by-rule to reported prototype numbers (MUSE 88/11/0, Claude same per prompt). Read-only analysis; no product/engine/flex-value edits.

## Inputs read (VERIFIED)

- `git show 97d7e9d:tools/mathlab/flex.json` → 99 rules, counts `{0:23, 2:10, 6:43, 12:23}`.
- `git show 97d7e9d:tools/mathlab/results/thetaprice-2026-11-09.md` → 104 rows, D@90 parsed (40 nonzero).
- Inkling design: `git show origin/council/inkling:inbox/20261110-0104-inkling-P-322-skill-profile-design.md` (formula, profiles, gate, U, overrides, FB discount, SAM alias, COV/RNG modifiers, BLK elite-line note).
- MUSE prototype reference: `git show origin/council/muse:_agents/muse/deliveries/derive-prototype-2026-11-10.py`.
- `git show --format=%H -s origin/architect/engine-and-seats` → `678bb06e393d283f987051fb446ade2217a5769a` (tip newer than 97d7e9d; flex.json at 97d7e9d used as prompt requested).

## Independent implementation (VERIFIED)

Implemented from Inkling spec in scratch script `/tmp/glyph_p322_verify2.py` (not committed) with:
- `D_bumped = D@90` plus `OLB>ILB=6.7`, `OLB>SS=6.7`.
- Skill profiles/betas/dmults/U/overrides/FB whitelist exactly per design.
- `tier(x): x<1→0, x<4→2, x<9→6, else 12`.
- RUN only for `dst==RB`; SNP only for `dst==C`; KCK/PNT only for K/P dests.
- COV weight × {NICKEL:1.7, DIME:3.6, FS:2.0}; if `src.CTH>=9` halve COV/RNG betas.
- Gate: `Dv>=5 => A_eff=0`, `4<=Dv<5 => A_eff=A*0.5`, else `A_eff=A`.
- `x = clamp(max(0,Dv)+A_eff+u, 0, 12)`.

Ran two BLK interpretations because spec text and MUSE prototype differ slightly:
- **A (spec-literal):** BLK gap zeroed if `dst=='C'` and both `BLK>=8` (per "dst==C: BLK gap zeroed if both src,dst BLK ≥ 8").
- **B (MUSE prototype behavior):** BLK gap zeroed if both `BLK>=8` (any destination), matching `derive-prototype-2026-11-10.py` line `if skill == 'BLK' and ps.get('BLK',0) >= 8 and pd.get('BLK',0) >= 8: gap = 0`.

## Results vs live 99-rule table (VERIFIED)

Command/output summary:
```
$ python3 /tmp/glyph_p322_verify2.py
REF 97d7e9d
RULES 99 TIER_COUNTS {0: 23, 2: 10, 6: 43, 12: 23}
THETAPRICE_ROWS 104 nonzero_D 40

=== A_spec_literal_blk_dstC_only ===
exact=87 off_by_one=12 hard=0
off_by_one: CB>FS 0→2, CB>SS 0→2, EDGE>OLB 0→2, ILB>OLB 0→2, OG>OT 2→6, SS>DIME 0→2, SS>NICKEL 0→2, WR>CB 6→2, WR>DIME 6→2, WR>FS 6→2, WR>NICKEL 6→2, WR>SS 6→2

=== B_muse_prototype_blk_any_dst ===
exact=88 off_by_one=11 hard=0
off_by_one: CB>FS 0→2, CB>SS 0→2, EDGE>OLB 0→2, ILB>OLB 0→2, SS>DIME 0→2, SS>NICKEL 0→2, WR>CB 6→2, WR>DIME 6→2, WR>FS 6→2, WR>NICKEL 6→2, WR>SS 6→2

B residuals set == 5 floor + 6 Inkling? True
floor present: WR>CB, WR>DIME, WR>FS, WR>NICKEL, WR>SS
inkling present: CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL
other: []
```

Cross-check: running MUSE's own script logic (patched only for local cwd) produced `exact 88, off-by-one 11, hard 0` with the same 11 residuals. Direct trace of `OG>OT` under MUSE logic: `owner=2, Dv=3.99, A(before gate)=0.0, A(after gate)=0.0, x=3.99 -> tier 2` (so OG>OT is **not** a residual in B/MUSE). Under spec-literal BLK-to-C-only, `OG>OT` becomes `A=0.75 (BLK gap 1*0.75), Dv=3.99 in [4,5) => A_eff=0.375, x=4.365 -> tier 6` (off-by-one).

## Confirmation against prompt claims

- **MUSE prototype fit:** prompt claims 88 exact / 11 off-by-one / 0 hard on live 99-rule table. **Confirmed** for MUSE prototype behavior (B) — independently reproduced with same 11 residuals. **VERIFIED** (command above).
- **11 residual composition:** prompt states "5 floor rules + 6 Inkling residuals". **Confirmed** exactly for B: floor = `WR>CB/DIME/FS/NICKEL/SS` (all owner 6, model 2); Inkling residuals = `CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL` (all owner 0, model 2). No other residuals. **VERIFIED**.
- **Claude got same numbers:** prompt reports MUSE and Claude both got 88/11/0 (and `tools/mathlab/flexderive.mjs` on architect `678bb06`). I could not execute Claude's script in this worktree (not present locally). I **did** re-run the Inkling formula independently and reproduced the reported 88/11/0/0-profile behavior and residual set; this supports the reported Claude/MUSE parity but is not a direct run of Claude's `flexderive.mjs`. **REPORTED/INFERRED parity support, not direct Claude-script execution**.

## Discrepancy found (important for derivation work)

Inkling spec text says BLK gap is zeroed for elite-line swaps **to C slot** (`dst==C`), but MUSE's prototype zeros BLK gap for any elite-line pair where both `BLK>=8` regardless of destination. This single interpretation choice moves `OG>OT` (owner 2, D@90 3.99): spec-literal gives tier 6 (miss), prototype behavior gives tier 2 (exact). All other 98 rules are identical under A/B in this run. Any derivation/build that claims "Inkling P-322 formula" must pin this BLK condition explicitly.

## Notes

- No cross-side floor term added in this verification run (floor was not part of the base Inkling formula as implemented; prompt's 5 floor residuals are the WR>DB cross-side rules priced at 6 by Owner floor but 2 by base model).
- No 15-skill extension, no re-fit cut points, no Option B landing, no flex price changes.
- Evidence label for this report: **VERIFIED** for commands/runs/tables above; **REPORTED** for Claude's `flexderive.mjs` result (not executed here); **INFERRED** only where noted.

