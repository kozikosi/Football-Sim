SPEAKER: inkling | ROLE: council | TASK: P-347 lambda tie-break — 0.40 (Pickle, tip-grounded) vs 0.3967 (VL, midpoint of the originally-measured band) | DATE: 2026-11-18T02:53Z
FOR: P-347

**Recommendation the Owner can lock, one line up front: ship 0.40 as the labelled convention — binding no measurement claim, bound to the tip table's sha256 in the same sentence. VL's 0.3967 is tier-identical to 0.40 at the tip (zero rows flip, same 89/97, same 87 floor, same tier-vector digest) and survives as an admissible value; it does not survive as "in-band", because there is no band at the tip — Pickle's empty-set finding verifies end to end, and the authority VL cites is a midpoint of a measurement against a table that no longer exists.**

## The receipts, every band claim bound to its table sha

| Claim | Value | Table it was measured on |
|---|---|---|
| The "admissible band [0.3902, 0.4032)", midpoint 0.3967 | a measurement of the 2026-11-14 cached 99-rule flex | **`flex-99-live.json` sha256 `0a26d7c225cb7ec8`** (pre-`fe611cbd`, pre-`9c3a7701`) |
| The tip table (65673a00, current) | sha256 **`76c02c659880e218`** — 99 rows, **7 value diffs vs the cached table**: `CB>FS 0→2`, `CB>SS 0→2`, `EDGE>DT 0→2`, `EDGE>OLB 0→2`, `ILB>OLB 0→2`, `OT>OG 0→2`, `FB>TE 6→2` | verified by my own structural diff this sitting (7 diffs, named pairs, both files 99 rows) |

**The tip table's feasible set is EMPTY** (re-derived by my re-run this sitting): the two binding edges are WR>NICKEL (needs λ ≥ 0.3902 to keep raw ≥ 4.0) and FB>TE (Owner 2, `fe611cbd`: needs λ < 0.2195 to keep raw < 4.0) — the intersection over the remaining 90 rows is [0.3902, 0.2195), width −0.1707, **no λ satisfies the table**; 7 rows unsatisfiable at any λ (the six zero-ability tier-2 rows + C>OG, guard-overshoots at 12.50 vs owner 6); minimum dial count 2 (addresses 0.220, 1.000).

**The two conventions, head-to-head on the tip table (`76c02c659880e218`; V2 `raw = max(m + λ·s, E·guard)`; tier cuts at 1/4/9):**

| Metric at the tip | λ = 0.3967 | λ = 0.40 | λ = 0.3902 | λ = 0.4032 |
|---|---|---|---|---|
| exact/97 | **89** | **89** | 88 | 89 |
| maximin floor over ±0.025 | **87** (worst at 0.3717) | **87** (worst at 0.3750) | — | — |
| rows whose tier flips vs the other | **zero** vs 0.40 | — | one row vs 0.40 (WR>NICKEL, at the 4.0 cut) | zero vs 0.40 |
| tier-vector digest (sha-truncated) | **af10a50ee1b3** | **af10a50ee1b3** | 09e17649ab0d | **af10a50ee1b3** |
| misses ≥ 2 tiers | 2 (FB>TE + C>OG) | 2 | 2 | 2 |

**Both are below the FB>TE cliff regardless** (raw(0.40) = 4.74 → tier 6 vs Owner 2; raw(0.3967) = 4.726 → same): the "in-band" reading of 0.3967 was never satisfiable even when the band existed — the band was a two-constraint intersection on the *cached* table (WR>NICKEL 4.0-edge vs FB>TE former tier-6, where 0.3967 kept FB>TE at exactly the tier-2 cut inside the cached table's constraints). The FB>TE 6→2 ruling is what silently killed the whole construction; `fe611cbd` (Owner, 2026-11-15) re-priced FB>TE and the band died with it.

**So, does VL's 0.3967 survive Pickle's finding?** Functionally, yes — it and 0.40 are the same instrument at the tip (tier-vector digest identical; zero rows flip; identical 89/97; identical 87 floor). Epistemically, no — its origin story is "midpoint of the admissible band", and there is no band to midpoint at the tip; shipping it under that story re-imports a dead measurement as if it were a live constraint, which is precisely the D-3 defect (a document naming numbers the tool does not print). **And is 0.40 "the only tip-grounded convention"? No — nor is it unique in any measurable sense; a flat neighborhood around 0.40 scores ≥87 and is tier-identical. 0.40 is tip-grounded as the argmax** (the printed surface: 0.35→85, 0.40→89, 0.45→84), as the shipped default (Z.ai), and as the 2026-11-11 ratified council position (VL himself was for 0.40 — his 05:00Z pivot to the dead-band midpoint is unexplained and I flag it rather than smooth it). **The honest sentence to ship: "0.40 is a labelled convention chosen for provenance (shipped default; argmax at the tip), not a measurement; it is tier-identical to any λ inside ≈[0.37, 0.43]; the band it was anchored to no longer exists at the tip's table @ 76c02c659880e218."**

**The estimator question (unchanged, and now with receipts):** SE(λ̂) = 0.438 ≈ 12.7% relative, acceptance d_λ = 0.0032 ≈ 0.81% relative → **15.7× short** (12.7/0.81 — VERIFIED as a ratio of relative figures; my earlier "does not reproduce" was wrong and is withdrawn in my 0155 self-correction). Resolving in-band would need ≈248 independent team-units; the question is discrete, not statistical. Building the pooled partial-pooling estimator is **not worth a round for the flex λ** (R-6 names the estimator as the open work; it remains open work, and it remains unfunded by this tie-break).

**Recommendation the Owner can lock:** **ship 0.40 as the convention**, with the ratification text amended to: (i) the tip table sha256 `76c02c659880e218` and the dead band's sha `0a26d7c225cb7ec8` in the same sentence as any band figure; (ii) "convention, not measurement", argmax + shipped-default provenance; (iii) no "in-band" language anywhere until a table-shaed band is re-measured; (iv) the seven-rule diff named as the event that killed the band (`9c3a7701` + `fe611cbd`). **If the Owner prefers 0.3967 anyway, it is admissible — it is tier-identical at the tip — but then the text must not claim it midpoints anything; it will midpoints a measurement that died on 2026-11-16.**

BLOCKED: none. (The seven MUSE drafts unpushed — no bearing on this tie-break.)
OPEN (Owner): lock 0.40 (recommended) or 0.3967-with-corrected-framing; the framing rules (i–iv) ride with whichever you lock.
NEXT (1–3): (1) Architect: one line in the design doc / MERGE-README naming the shipped convention with the tip sha, replacing "inside the admissible band [0.3902, 0.4032)" everywhere it appears. (2) MUSE: strike the dead band from the next round prompt's evidence block; substitute the empty-set sentence with both shas. (3) Whoever holds the λ work next: re-measure the feasible set on any future flex.json sha; bind the band claim to the sha in the same sentence, forever.
