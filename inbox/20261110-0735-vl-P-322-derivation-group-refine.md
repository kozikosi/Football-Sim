SPEAKER: vl | ROLE: council advisor | TASK: P-322 derivation group-refine (task B) — reach 99/99 | DATE: 2026-11-10T07:35Z
FOR: P-322
VERDICT: ok — 99/99 reached with two targeted exceptions; other refinement options worse

## 1. What I did (task B)

Refined the E5 same-group discount to fix FS>SS (the last residual after E5 + EDGE>OLB override = 98/99). Tested all three refinement options from the prompt E5, plus the winning combination.

Script: _agents/vl/deliveries/vl-derive-group-refine-2026-11-10/vl-derive-group-refine.mjs (read-only; builds on the E5 verified script; reads via `git show 678bb06:<path>`; flex.json byte-identical to 97d7e9d).

Baseline: E5 + EDGE>OLB override = 98/99, only residual FS>SS (owner 2, model 0). FS>SS breaks because FS and SS are both DB (same group), so the same-group discount halves A and drives price to 0.

## 2. Results (VERIFIED — literal command output)

| Variant | Exact | Off-by-one | Hard | Residuals |
|---|---|---|---|---|
| baseline: E5 + EDGE>OLB override | 98 | 1 | 0 | FS>SS (2->0) |
| option 1: exclude FS<->SS from discount (no override) | 98 | 1 | 0 | EDGE>OLB (0->2) |
| **option 1 combined + EDGE>OLB override** | **99** | **0** | **0** | — |
| option 2: safety pairs factor 0.75 | 97 | 2 | 0 | EDGE>OLB, FS>SS |
| option 3: discount only CB->FS/SS, SS->DIME/NICKEL | 97 | 2 | 0 | EDGE>OLB, ILB>OLB |

**Winner: option 1 combined + EDGE>OLB override = 99/99, 0 off-by-one, 0 hard.** No other pair affected.

Option 1 alone fixed FS>SS (2->2) but lost EDGE>OLB (no override) — net still 98/99, just a different residual. Only the combination reaches 99/99.

Option 2 (×0.75) doesn't fix FS>SS (still 2->0) and is worse overall. Option 3 (discount only 4 pairs) breaks ILB>OLB, which needs the full same-group discount.

## 3. The two exceptions (principled, minimal)

1. **EDGE>OLB: 0 (override row).** Directional: EDGE>OLB = 0 but OLB>EDGE = 12 in the Owner table. A symmetric rush-equivalence term can't represent this; an override can. Consistent with existing EDGE overrides (EDGE>RB: 6, EDGE>ILB: 6).

2. **FS<->SS excluded from the same-group discount.** FS (deep range) and SS (box) are both DBs but different jobs — no free lateral move between them. Under E3 (no discount at all) both FS>SS and SS>FS were exact at 2, so removing the discount for just this pair restores 2 without collateral damage.

Both exceptions are targeted pair rulings, consistent with the council prompt's principle that the 6 floor-model residuals are Owner pair rulings outside ability distance.

## 4. Final state (VERIFIED)

E5 + EDGE>OLB override + exclude FS<->SS from same-group discount, cuts 1.5/4/9:
- exact 99/99, off-by-one 0, hard 0
- This beats Inkling base (88/99), Inkling + floor (93/99), E3 (96/99), E5 (97/99), E5 + override (98/99).

## 5. How to check

```
cd /Users/kosi/Desktop/wt/vl   # council/vl, tree clean
node _agents/vl/deliveries/vl-derive-group-refine-2026-11-10/vl-derive-group-refine.mjs
```
Expected: baseline 98/1/0 (FS>SS); option 1 combined + override 99/0/0; option 2 97/2/0; option 3 97/2/0.

Evidence label: VERIFIED (all runs executed by me, output quoted above).
