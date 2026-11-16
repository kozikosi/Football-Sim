SPEAKER: ernie | ROLE: council | TASK: close the 4-3 / 3-4 formation gap — options, measured (Part: P-333) | DATE: 2026-11-16T23:05Z
FOR: P-333

# What I measured first: the gap is real, and it is not the number that matters

Engine: `colors/src` at `7a0706df` (the Architect's tip — the value layer with `valueprovider.ts`; the 99-rule table with FB>TE = 2). Harness: `deliveries/p333-gap-options-2026-11-16/` (`gap.mjs`, `options.mjs`), node `--experimental-strip-types`.

**Synthetic ideal rosters (one natural player per spot, all 80 OVR)** reproduce the Owner's number exactly:

| | table units | measured units | wins |
|---|---|---|---|
| 4-3 roster forced into 3-4 | 2500 | 2578.6 | 0.0655 |
| 3-4 roster forced into 4-3 | 1800 | 1858.5 | 0.0472 |
| **gap** | **700** | **720.1** | **0.089** |

Stand-ins, priced (penalty × destination weight): `FB>TE3` 2×50=100, `SS>DT2` 6×300=1800, `TE>CB3` 6×100=600 — total 2500. Against `ILB>DL5` 12×150=1800.

**But the same measurement on the 32 real rosters does not show a symmetric gap — it shows a one-sided base bias:**

| | value |
|---|---|
| teams worth more in 4-3 | **28** |
| teams worth more in 3-4 | **3** |
| mean signed (V4-3 − V3-4) over 32 teams | **+1144.5 table units = 0.145 wins** |
| mean loss when forced, 4-3-built teams | 1343 (0.171 wins) |
| mean loss when forced, 3-4-built teams | 325 (0.041 wins) |
| flexed spots across 32 teams × 2 bases | 147 / 2048 |
| emergency fills across the same | **0** |

**The finding that should shape the Owner's decision:** the 700 is an artefact of comparing two *idealised* rosters. On real personnel the 4-3 base is worth more for 28 of 32 clubs, and the mean advantage is 1144 units — larger than the gap the prompt asks to close. **Re-pricing the flex table moves the real bias only from 1144 to ~946 (all options below), because the bias is driven by the shape of the player pool (real rosters are 4-3-shaped bodies), not by a penalty rule.** Closing the synthetic 700 cosmetically will not make 3-4 and 4-3 equally valuable in the only sense that matters — what a real team can field.

# The three options, measured

All three keep the DIME trio at 12, the FB exception at 2 (except where stated), and the cross-side floor at 6.

## Option 1 — one rule: `SS>ILB` 6 → 4 (minimal)

| | value |
|---|---|
| rules changed | **1** (`SS: { …, ILB: 6 }` → `ILB: 4`) |
| new gap, table units | **100** (was 700) |
| new gap, measured | 120.1 (was 720.1) |
| new gap, wins | **0.013** (was 0.089) |
| 4-3 → 3-4 stand-ins | `FB>TE3@2`, `SS>DT2@4`, `TE>CB3@6` (1900) |
| 3-4 → 4-3 stand-ins | `ILB>DL5@12` (1800, unchanged) |
| flexed spots (32×2) | **148** / 2048 (was 147) |
| emergency fills | 0 (was 0) |
| DIME trio / FB / cross-side floor | **all kept** |
| real-roster bias | 1144.5 → **946.9** (0.120 wins) |

**Why acceptable:** `SS>ILB` is the single dominant term of the 4-3-side loss (1800 of 2500). Dropping it one tier to 4 removes 600 units and leaves the gap inside one tier. Nothing else moves.

## Option 2 — two rules: `SS>ILB` 6 → 4 and `TE>NICKEL` 6 → 4

| | value |
|---|---|
| rules changed | **2** |
| new gap, table | **−100** (slight overcorrection) |
| new gap, measured | −80.1 |
| new gap, wins | **−0.013** |
| 4-3 → 3-4 stand-ins | `FB>TE3@2`, `SS>DT2@4`, `TE>CB3@4` (1700) |
| flexed spots | **148** / 2048 |
| emergency fills | 0 |
| DIME trio / FB / cross-side floor | **all kept** |
| real-roster bias | 1144.5 → **946.9** |

**Why acceptable:** the second rule removes a further 200. The overshoot is 100 units — 0.013 wins, well inside a rounding tier.

## Option 3 — a derived price for the DL5 stand-in (mechanism, not a table edit)

The DL5 column is already derived: `dl5Penalty(role) = min(role→DT, role→EDGE)` (`flex.ts:42-48`), so `ILB>DL5` = the ILB→EDGE price = 12. Pricing DL5 at `min(role→DT, 1.5 × role→EDGE)` raises it to 18:

| | value |
|---|---|
| rules changed | 0 (a derived rule) |
| new gap, table | **600** (was 700) — **does not close** |
| 3-4 → 4-3 stand-ins | `FB>TE3@2`, `TE>DL5@12` — the optimiser re-routes instead of paying more |
| flexed spots | 147 / 2048 |
| real-roster bias | 1144.5 (unchanged) |

**This is a negative result worth recording:** raising the price of the *expensive* side does not close the gap, because the optimiser simply chooses a different expensive stand-in (here a TE at DL5 instead of an ILB). A derived formula that only re-prices one direction cannot close a gap whose two sides are asymmetric in *structure*, not in price. **Any formula-based proposal should be tested the same way before it is filed as an option.**

# A mechanism nobody named — and why I am not proposing it as a fix

**Base-par normalisation** (score each base against its own all-natural par, so neither base starts with an advantage) is a no-op here: `par(4-3) = par(3-4) = 690,284` at 80 OVR, because the same position carries the same weight in both bases (the Owner's 2 Nov ruling, `lineup.ts:96-98`). The asymmetry is entirely in *legal assignments*, so normalising by par changes nothing. I file it so it is not re-proposed.

The mechanism that would move the real bias is on the **pool side, not the flex side**: 28 of 32 rosters are 4-3-shaped, so the 3-4 base has fewer natural bodies to fill its two OLB spots and its ILB2 (rated DT2, weight 300). The honest lever is the *slot set* (e.g. whether 3-4's ILB2 should be rated off DT2 at all), which is an Owner/Architect decision about the 3-4 spot table, not a flex-table tweak.

# Recommendation (KG picks — I do not)

**Option 1** if the goal is the smallest change that brings the synthetic gap inside a tier (700 → 100, one rule, everything else untouched, flexed spots essentially unchanged). **Option 2** if the Owner wants the gap at zero rather than inside a tier, accepting a 100-unit overshoot. **Option 3 should not be adopted** — it does not close the gap. And whichever is chosen, **the 28-3 real-roster bias should be recorded as the next problem**, because none of the three reduces it below 946 units (0.12 wins).

# What I did not measure

- Only the `80 OVR` ideal roster and the 32 real rosters. **I did not sweep OVR** (the gap may narrow at 90 or 70 — the penalties are flat, the values are not).
- I did not test a *new* slot table for the 3-4 (the ILB2/OLB1/OLB2 weights), which the real-roster bias points at.
- I did not check another seat's option — none had been filed when I measured.

**Falsifier for my own numbers:** the real-roster bias is sensitive to how "built for" is defined (I used the sign of V4-3 − V3-4 per club). If the Owner means "rosters *drafted* for a base" rather than "rosters that score better in a base", the 28-3 split is the wrong statistic and the bias should be recomputed on draft history.