SPEAKER: ernie | ROLE: council | TASK: P-347 lambda tie-break | DATE: 2026-11-18T02:52Z
FOR: P-347

# Recommendation: ship λ = 0.40 as a labelled convention. VL's 0.3967 does NOT survive — it is the midpoint of a band measured against a table that no longer exists at the tip. Every band claim below names its table sha256.

**Re-run this session (VERIFIED, python3, Pickle's own `axis-bounds.py` + `dial-feasibility.py` on the shipped `merge_prototype.py`).** Two tables, two shas, never conflated:

| table | sha256 (first 16) | band | survives? |
|---|---|---|---|
| **OLD** (14 Nov, `flex-99-live.json`) | **`0a26d7c225cb7ec8`** | **[0.3902, 0.4032)** — width 0.0130, NON-EMPTY | yes (for this table only) |
| **TIP** (`origin/architect/engine-and-seats@65673a00`, `tools/mathlab/flex.json`) | **`76c02c659880e218`** | **[0.3902, 0.2195)** — width −0.1707, **EMPTY** | **no** |

## The re-run (commands + output)
```
$ git show origin/architect/engine-and-seats:tools/mathlab/flex.json | shasum -a 256 | cut -c1-16
76c02c659880e218        # tip
$ shasum -a 256 flex-99-live.json | cut -c1-16
0a26d7c225cb7ec8        # old (Pickle's cached input)

$ python3 axis-bounds.py merge_prototype.py flex-old.json
   window [lo, hi) = [0.3902, 0.4032)   width 0.0130
   lower edge WR>NICKEL  -> lambda >= 0.3902 ; upper edge TE>SS -> lambda < 0.4032
   (0.40 sits inside -> passes every reproducible row)

$ python3 axis-bounds.py merge_prototype.py flex-tip.json
   window [lo, hi) = [0.3902, 0.2195)   width -0.1707   <-- lo > hi: EMPTY
   lower edge WR>NICKEL -> lambda >= 0.3902 ; upper edge FB>TE -> lambda < 0.2195
```
**The tip's upper edge is FB>TE (owner 2, m 3.100, s 4.100), which forces λ < 0.2195 — below the lower edge WR>NICKEL's λ ≥ 0.3902.** The two cannot both hold, so the feasible set is empty. `FB>TE` moved 6→2 (the Owner's scarcity ruling); that is the load-bearing change between the two shas (7 values differ: EDGE>OLB, EDGE>DT, OT>OG, ILB>OLB, CB>SS, CB>FS 0→2, and FB>TE 6→2).

## What the tip does to each convention (dial-feasibility on `76c02c659880e218`)
```
## 2. rows no lambda in [0,1] can satisfy: 7
   OT>OG, EDGE>DT, EDGE>OLB, ILB>OLB, CB>FS, CB>SS  (m≈0 s=0 cap=0 -> raw 0 -> tier 0, table says 2)
   C>OG  (guard-overshoots: cap 12.50 vs tier 6)
## 3. intersection over the other 90 rows: [0.3902, 0.2195)   EMPTY
## 4. minimum dial count: 2   (addresses 0.220, 1.000)
## 6. exact/97 at lambda 0.40: 89   (stale table gave 96)
## 7. maximin +/-0.025: lambda 0.40, floor 87 rows
```

## Verdict
- **VL's 0.3967 does NOT survive.** 0.3967 is the midpoint of [0.3902, 0.4032), which is the band of the **OLD** table (`0a26d7c225cb7ec8`). At the **TIP** (`76c02c659880e218`) that band is empty and 0.3967 is not in any feasible set — no λ is. VL's number is a stale-band midpoint; it is not tip-grounded. (VL's own filing says "band [0.3902, 0.4032)" without a table sha — that is the D-3 defect: a band is a measurement of a table, not a property of the design.)
- **0.40 is the only tip-grounded convention.** It is not "in-band" (the tip band is empty), but it is the best single address on the tip table: **89/97 exact, maximin floor 87 at ±0.025**. The 8 misses are spec choices about which rows to miss, not a fit — say so plainly.
- **The 6 zero-ability underivable rows are a formula-coverage gap, not a λ problem.** They belong to the Owner's "99 is a guide, one beautiful portable formula" work (the Architect's design brief), not to this ratification.

## Recommendation for the Owner to lock
1. **Ship λ = 0.40, labelled "convention, not measurement."** It is the tip-grounded value (table `76c02c659880e218`), 89/97 exact, maximin 87.
2. **Strike VL's 0.3967** as a stale-band midpoint (band `0a26d7c225cb7ec8` no longer exists at the tip).
3. **Amend the ratification text**: replace "admissible band [0.3902, 0.4032), midpoint 0.3967" with "on tip `76c02c659880e218` the feasible set is EMPTY (7 rows; FB>TE and WR>NICKEL incompatible); 0.40 is a convention scoring 89/97, not a fit." Bind every future band claim to its table sha256 in the same sentence.
4. **Re-scope P-347** from "estimate λ in-band" to the discrete unsatisfiable-row count (the cheap, fold-free question the Owner's doctrine actually needs).

---

BLOCKED: none.
OPEN:
- Owner locks λ = 0.40 (convention). The estimator question is settled NO (Pickle §2b: the needed d_λ = 0.0032 = 0.81% relative is 15.7× beyond the only receipted route's SE).
- The 6 zero-ability rows → the Architect's "one portable formula" work (not λ).
NEXT:
1. Owner: lock 0.40; strike 0.3967; amend the ratification text + table sha.
2. Architect: the six underivable rows are a formula-coverage item, not a dial item.
3. MUSE: bind every band claim in P-347–P-353 to a table sha256.