SPEAKER: ernie | ROLE: council | TASK: P-333 round 2 — review of the other seats' proposals, with my own measurements (Parts A + B) | DATE: 2026-11-17T00:05Z
FOR: P-333

**Reviewed:** `inkling/20261116-2340` (formula + structure), `vl/20261116-2320` (+ their `2330` correction), `beam/20261116-2330`. **I file my own measurements, not corrections to their files.** Harness: `deliveries/p333-gap-options-2026-11-16/` (`options.mjs`, `ilb.mjs`, `receipt-review-round2.txt`, `receipt-ilb-count.txt`). Engine `7a0706df` unless stated.

# First, a correction to my own Part B filing (23:40Z)

**My mechanism was wrong. Inkling's is right, and I verified it.** I wrote that the real-roster bias is a *body count* problem — that 4-3-shaped rosters lack ILB bodies for the 3-4's two inside spots. The count says otherwise:

```
ILB players per roster: {1: 1 team, 2: 16, 3: 14, 4: 1}  ->  31 / 32 teams carry >= 2 ILBs
Seattle: ILB 85, 57 | OLB 76, 75, 64 | EDGE 87, 77, 76, 75, 64
Kansas City: ILB 82, 64 | OLB 89, 67, 62 | EDGE 83, 77, 74, 72, 65, 63
```

The bodies exist. On Seattle the optimiser puts a **76-OVR OLB at MIKE at −6 = 70** rather than the **57-OVR ILB at 0**. That is not a shortage; it is **value shape** — the better athlete wins even at a 6 penalty, and the 6 lands on a 300-weight ledger row. Inkling's census (`OLB→ILB` 10, `SS→ILB` 9, `EDGE→ILB` 2 ≈ 22 misfits into ILB2's dest) matches what I see. **My "missing bodies" framing should be struck; the bias is a value-shape effect at ILB2.** The B3 measurement below still stands as a measurement, but its justification changes (see the last section).

# Part A — VL's `DT→ILB = 6` is the first candidate that survives independent replication

VL proposed adding the **missing** rule `DT→ILB = 6` (mirroring the existing `OLB→ILB = 6`) rather than re-pricing an existing one. They measured gap 0 on their fixture. **I rebuilt it on my own per-base fixture and got the same answer:**

| | my base | + `DT→ILB = 6` |
|---|---|---|
| 4-3 → 3-4 loss | 2500 | **1800** |
| 3-4 → 4-3 loss | 1800 | 1800 |
| **gap** | 700 | **0** |
| stand-ins, 4-3 side | `FB>TE3@2`, `SS>DT2@6`, `TE>CB3@6` | **`DT>MIKE@6` only** |
| stand-ins, 3-4 side | `ILB>DL5@12` | `ILB>DL5@12` |
| flexed spots (32×2) | 147 | **146** |
| emergency fills | 0 | **0** |
| real-roster bias | +1144.5 | **+1014.8** |

This is the **only proposal in the round that reaches exactly 0 while keeping the DIME trio (12), the FB exception (2), the cross-side floor (6) and the 0/2/6/12 tier structure** — and it does it by adding a rule the table's own logic implies (DT already sits at 6 to EDGE/C/OG/OT; ILB is already reachable at 6 from OLB), not by changing a price to hit a number. **I supply the measurement VL left undone:** flexing frequency moves 147 → 146 spots and emergency fills stay 0, so their "minimal, not measured" flag is confirmed minimal.

Two things it does **not** do, and one question:
- **It does not close the real bias** (1144 → 1015, still 0.129 wins). It is a Part A answer, not a Part B one.
- **Directionality:** `DT→ILB = 6` without `ILB→DT = 6`. VL is right that adding the reverse would drop DL5 to 6 and reopen the gap to 900. The table does carry directional rules (`TE→FB 0` vs `FB→TE 2`), so this is defensible, but it is the weakest point of an otherwise clean proposal and the Architect should confirm it is intended.
- **Version:** VL measured on `d3bd81d2`, where `FB→TE = 6`, so their baseline is **900** (2700/1800). On `7a0706df`, where the Owner's 15 Nov `FB→TE = 2` has landed, the baseline is **700** (2500/1800). Both are correct; **the prompt's 700 is the tip's number.** Any comparison that does not name the pin will confuse the two.

# Part A — the rest

- **Inkling F1/F2** (lock the rulings + 10 same-family zeros, then fit two terms): their fit (94/99) and their gap (100) are consistent with my own negative result — a fit that keeps the rulings lands at ~100, bought with **+48–70 % flexed spots**. I did not re-run their fit; **REPORTED by Inkling**, and it matches the shape of my re-routing finding.
- **Beam A1** is explicitly **UNMEASURED** for gap effect (their own label). Their `flexderive` 87/99 is REPORTED. Nothing to break; nothing to rely on.
- **My re-routing finding stands as the reason none of the fitted formulas reach 0**: the loss is an optimum over assignments, so a price change is absorbed (raising ILB→DL5 from 12 to 18 moved the gap 700 → 600, not −200). VL's rule escapes this because it changes *which stand-in is available*, not what an existing one costs — which is exactly the distinction that makes it work.

# Part B — the structural proposals

| proposal | who | split 4-3/3-4 | mean bias | my note |
|---|---|---|---|---|
| base | — | 28 / 3 | +1144.5 | |
| rate ILB2 off MIKE | Inkling B3, me (B2) | **28 / 4** | +1228.0 | **identical to my B2 — "re-pointing to MIKE buys nothing"** |
| rate ILB2 off WILL (150) | Inkling B1, Beam B1 | 7 / 25 | −395.7 | flips to 3-4 (Beam's was INFERRED; now measured) |
| rate ILB2 off SAM (100) | Inkling B2 | 0 / 32 | −2459.7 | far overshoot |
| rate ILB2 off OG2 (250) | Inkling B4 | 7 / 25 | −670.0 | flips |
| **dest ILB → OLB** | **me (B3)** | **13 / 14** | **−142.2** | the only variant that balances the split |

**Inkling's B3 reproduces my B2 exactly** (28/4 vs my 28/3; the one-team difference is the provider). That is a clean independent confirmation that re-rating ILB2 to MIKE does nothing — because MIKE's measured slope ≈ DT2's.

**Beam's B1 (WILL row)** was INFERRED in their filing and is now measured by Inkling (7/25, −395.7). Beam predicted "may reduce real bias but worsens the synthetic gap" — confirmed, and it overshoots rather than landing near zero.

**My B3 (dest ILB → OLB)** remains the only variant that lands the split near even (13/14) and the only one that touches neither a weight nor a flex price. **But my justification is now wrong**: it works not because bodies were missing but because the spot stops competing with the ILB depth — the better OLB body wins *naturally* instead of at −6. That also names its cost honestly: **it redefines the 3-4's second inside spot as an OLB spot**, which is a formation change, not a bias fix. The Architect should treat it as "what if 3-4 had 1 ILB", not as "the bias, fixed".

# What I would tell KG

- **Part A has one survivor: VL's `DT→ILB = 6`.** It is a missing rule derived from the table's own family logic, it closes the synthetic gap to exactly 0 on two independent fixtures, it keeps every principle, and it moves flexing by one spot. Its real-bias effect is +1144 → +1015 (does not close it).
- **Part B has no fix that does not redefine something.** Re-rating ILB2 flips the bias to the other side (7/25 or worse); my dest change balances it (13/14) only by making the 3-4 a one-ILB front. **The bias is a value-shape fact about ILB2 (300-weight row, best filled by a −6 cross-body), and every lever either moves the price of that row or changes what the 3-4 is.**
- **Nobody has yet combined the two.** VL's rule (Part A) and a Part B lever are independent; if KG wants both the synthetic gap at 0 *and* the real bias near 0, the obvious unmeasured candidate is **VL's rule + my dest change**, or **VL's rule + an ILB2 re-rate**. I did not run the combination — it is one command in the harness and I would rather name it than claim it.

**Falsifier for my own review:** if KG's definition of "equal value" is the idealised one, VL's rule is the answer and Part B is a separate question. If it is the real-roster one, VL's rule is necessary but not sufficient, and my B3 is the only measured lever that reaches balance — at the cost of redefining the 3-4.