SPEAKER: vl | ROLE: council advisor | TASK: P-322 derivation E5 verify (task A) | DATE: 2026-11-10T07:10Z
FOR: P-322
VERDICT: ok — E5 independently confirmed at 97/99; E5 + EDGE>OLB override = 98/99

## 1. What I did (task A)

Independently re-implemented the E5 hybrid derivation from Inkling's P-322 formula + cross-side floor + same-group discount + re-fit cuts, and scored it rule-by-rule against the live 99-rule Owner flex table. My own code, not a re-run of MUSE's script.

Script: _agents/vl/deliveries/vl-derive-E5-verify-2026-11-10/vl-derive-E5-verify.mjs (read-only; reads via `git show 678bb06:<path>`; flex.json byte-identical to 97d7e9d, diff-verified).

Formula (E5):
- Base: Inkling P-322 tier(max(0,D_bumped) + gate(A) + U), D_bumped = thetaprice D@90 with OLB>ILB/OLB>SS at 6.7; gate A=0 if D>=5, *0.5 if 4<=D<5; U deltas; override dict; fbFree; SAM alias.
- Cross-side floor: offense<->defense (K<->P not cross-side) price < 6 raised to 6; dst==FB exempt. Classes per prompt (offense QB/RB/FB/WR/TE/OT/OG/C; defense DT/EDGE/ILB/OLB/SS/FS/CB/NICKEL/DIME).
- Same-group discount: halve A when src,dst both in DB {CB,FS,SS,NICKEL,DIME} / LB {ILB,OLB} / DL {DT,EDGE}.
- Cuts: 1.5, 4, 9.

## 2. Results (VERIFIED — literal command output)

### E5: `node vl-derive-E5-verify.mjs`
```
E5: Inkling + sameGroup(halve A) + floor 6 + cuts 1.5/4/9: exact 97/99 | off1 2 | hard 0
  residuals: EDGE>OLB: 0->2 (formula); FS>SS: 2->0 (formula+sameGroup)
```
**Matches prediction exactly** (REPORTED: exact 97, off-by-one 2, hard 0; residuals EDGE>OLB 0->2, FS>SS 2->0).

### E5 + EDGE>OLB override -> 0 (predicted 98/99)
```
E5 + EDGE>OLB override -> 0 (predicted 98/99): exact 98/99 | off1 1 | hard 0
  residuals: FS>SS: 2->0 (formula+sameGroup)
```
**Matches MUSE's prediction exactly** — adding EDGE>OLB to the override dict (price 0) reaches 98/99; only FS>SS remains.

### Controls (confirm my implementation reproduces REPORTED baselines)
- E3 control (Inkling + floor 6 + cuts 1.5/4/9, no same-group term): exact 96/99, off1 3, hard 0 — matches REPORTED 96/99 "breaks NOTHING"
- floor-6 control (cuts 1/4/9): exact 93/99, off1 6, hard 0 — matches REPORTED 93/99

## 3. EDGE>OLB: override or rush-equivalence term?

**Recommendation: override.** Evidence:
- EDGE>OLB is directional: EDGE>OLB = 0 but OLB>EDGE = 12 in the Owner table. A symmetric rush-equivalence term can't represent a directional ruling; an override can.
- The Owner already uses overrides for EDGE pairs (EDGE>RB: 6, EDGE>ILB: 6 are in the override dict). Adding EDGE>OLB: 0 is consistent with that pattern.
- A rush-equivalence term (e.g. DT/EDGE/ILB/OLB all cheap to each other) risks breaking priced pairs like ILB>EDGE (12) or OLB>EDGE (12) — broader, more dangerous.

So EDGE>OLB belongs as an explicit override row (price 0), not a general rush-equivalence term. E5 + override = 98/99, with FS>SS (owner 2, model 0) as the last residual — that's task B's refinement (same-group discount breaks FS>SS because FS/SS are both DB).

## 4. Comparison to alternatives (REPORTED unless noted)
- Inkling P-322 base: 88/99 (VERIFIED by me, task B earlier)
- Inkling + floor 6: 93/99 (VERIFIED by me)
- E3 (no same-group): 96/99 (VERIFIED by me as control)
- E5: 97/99 (VERIFIED by me)
- E5 + EDGE>OLB override: 98/99 (VERIFIED by me)
- Super's pure directional gap: 59/99; OR's destination requirements: 55/99 — neither competitive

## 5. How to check

```
cd /Users/kosi/Desktop/wt/vl   # council/vl, tree clean
node _agents/vl/deliveries/vl-derive-E5-verify-2026-11-10/vl-derive-E5-verify.mjs
```
Expected: E5 exact 97/off1 2/hard 0 with residuals EDGE>OLB, FS>SS; E5+override exact 98/off1 1/hard 0 with residual FS>SS; E3 control 96/3/0; floor control 93/6/0.

Evidence label: VERIFIED (all runs executed by me, output quoted above). Comparison figures for Inkling/Super/OR are REPORTED (council prompt E5) except Inkling base which I VERIFIED in an earlier run.

Push: committing and pushing to origin council/vl; ./.council_tool.mjs deleted before push.
