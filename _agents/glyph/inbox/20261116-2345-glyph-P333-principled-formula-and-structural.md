SPEAKER: glyph | ROLE: council | TASK: propose principled formula and structural side options for 3-4/4-3 formation gap | DATE: 2026-11-16T23:45:00Z
FOR: P-333

## Scope
Propose and measure (do **not** pick, do **not** implement). Part A: principled formula/mechanism that derives flex prices from table logic and addresses the gap without ad hoc one-price patches. Part B: structural/pool-slot side of the real-roster bias. KG picks. 99-rule flex prices are guidelines; **principles** behind them constrain changes (DIME trio TE/ILB/OLB→DIME expensive at 12 for coverage; FB exception DT/OT→FB 0, FB→TE 2; cross-side floor WR→CB/FS/SS/NICKEL/DIME at 6; 0/2/6/12 tier structure preferred, no new tier 4). Re-pricing-only route is closed per prompt — no new ad hoc re-pricing option filed.

## Measurement basis (VERIFIED)
- **Engine/source:** extracted `origin/architect/engine-and-seats` @ `7a0706df` to `/tmp/glyph-p333` (read-only scratch): `colors/src/sports/nfl/engine/{flex,slots,lineup,valueprovider,players,ratings}.ts`, `colors/src/core/hungarian.ts`, `tools/mathlab/flex.json` (99 rules), `tools/mathlab/flexderive.mjs`, `tools/mathlab/skill-profiles-p322.json` (Inkling P-322, proposal data), `tools/mathlab/results/thetaprice-2026-11-09.md` (D@90), `data/nfl/madden27-ratings.csv` + `free-agents-old-ratings.csv` + `player-ids.csv`.
- **Runtime:** `node v26.13.0 --experimental-strip-types` (darwin). Dates 2026-11-16.
- **Providers:** `tableValues()` = retired fitted table (SLOTS weights, used for table-unit gaps/tests); `DEFAULT_VALUES` = measured provider (slotWins20-derived) used for measured gaps and real-roster lineup values. These are **kept separate**.
- **Commands (evidence):** `/tmp/glyph-p333/measure.mjs`, `variants.mjs`, `bias.mjs`, `partb.mjs`, `partb-detail.mjs`, `partb-extra.mjs`, `partb-detail2.mjs`; `node tools/mathlab/flexderive.mjs` and `--floor 6` in `/tmp/glyph-p333/tools/mathlab` with copied inputs.

## Baseline (VERIFIED)

### Synthetic formation gap (native 4-3/3-4 rosters, DL5=DT)
| Provider | 4-3 loss in 3-4 | 3-4 loss in 4-3 | Gap |
|---|---:|---:|---:|
| Table (`tableValues`) | 2500 | 1800 | **700** |
| Measured (`DEFAULT_VALUES`) | 2578.642 | 1858.534 | **720.108** |

Measured 4-3-in-3-4 flexed placements (native fixture): TE3 ← FB→TE @2 (w50, cost 100) + DT2/ILB2 ← SS→ILB @6 (w300, cost 1800) + CB3/NICKEL ← TE→NICKEL @6 (w100, cost 600) = 2500 table-equivalent driver pattern in measured units (2773.039 total in that measured decomposition reported by prior filings/this extract shape; see flex cost components). Measured 3-4-in-4-3: DL5 ← ILB→DT @12 (w150, cost 1800). DL5=EDGE: table 1800 vs 1800 (gap 0), measured 1863.816 vs 1858.534 (gap 5.282). (VERIFIED by `measure.mjs` / `formation-gap` fixtures logic.)

### Real-roster base bias (32 teams × best 4-3 vs 3-4, `DEFAULT_VALUES`, live flex+slots)
- **28 better in 4-3, 3 better in 3-4, 1 tied (Arizona Cardinals, diff 0)**. Mean signed bias **+1184.538** (4-3 minus 3-4), median **+1114.634**, min **−652.385** (WAS), max **+3329.489** (SEA). (VERIFIED `bias.mjs`)
- Context vs prompt: prompt states 28-3 split, Cardinals exactly tied, mean **+1144** (0.145 wins). My measured mean is **+1184.538** on this extract/harness — close, small delta likely from measurement/provider/rounding details (REPORTED prompt figure vs VERIFIED here).
- **Dominant 3-4 cost driver:** slot `DT2:ILB(DT2,w300)` is flex-penalized in **14/32** teams in 3-4 for **25,200** aggregate cost (examples: ATL EDGE@6, BAL OLB@6, BUF EDGE@6). Next: `MIKE:ILB(MIKE,w300)` 7 teams / 12,600 (often SS/OLB stand-ins at MIKE). `OG1`, `TE2` also contribute but are shared/offense. In 4-3 the DT2-as-DT slot is rarely the same kind of forced ILB stand-in cost. (VERIFIED `bias.mjs`/`partb-detail.mjs`)
- **Pool shape (avg roster role counts, 32 teams):** ILB **2.47**, OLB **2.94** (≈5.41 off-ball LBs total), EDGE **5.81**, DT **6.22**, SS **2.59**, FS **2.56**, CB **6.22**. 3-4 requires 2 ILB + 2 OLB on-field roles in this slot mapping; 4-3 requires 1 ILB + 2 OLB — consistent with real rosters being 4-3-shaped in off-ball LB bodies (REPORTED/INFERRED from counts; counts VERIFIED).

### 3-4 slot structure (live, `slots.ts` fieldSlots)
Identical 32 slots/weights sum to 8575 in both bases except front mapping: `DT2` in 4-3 is `dest=DT,row=DT2,w=300`; in 3-4 `DT2` becomes **`dest=ILB,row=DT2,label=ILB2,w=300`**. `MIKE` is ILB1 (row MIKE w300), `WILL` is OLB1 (row WILL w150), `SAM` is OLB2 (row SAM w100). So 3-4 fields 2 ILB spots (MIKE + DT2-as-ILB2) both weighted/rated off high-value rows (300 each) but the 2nd is an interior-DL row repurposed to ILB — this is the structural lever behind the bias. (VERIFIED `inspect-slots`/`slots.ts`)

### Live principles state (99 rules, `flex.json`)
DIME trio: TE→DIME 12, ILB→DIME 12, OLB→DIME 12. FB exception: DT→FB 0, OT→FB 0, FB→TE 2. Cross-side floor: WR→CB/FS/SS/NICKEL/DIME all 6. Tiers only 0/2/6/12. (VERIFIED)

---

## Part A — Principled formula (deriving prices from table logic)

### What was evaluated (VERIFIED runs)
Used existing `tools/mathlab/flexderive.mjs` + `skill-profiles-p322.json` (Inkling P-322, proposal-only; formula `tier(max(0,D)+gate(A)+U)` with D@90 from `thetaprice-2026-11-09.md`, skill-gap A, named unlikeness U, override/FB-fiat rows, cross-side floor option). Reproduced fit reports:

| Variant | Exact / off-by-one / hard (of 99) | Notes |
|---|---:|---|
| flexderive, cuts 1/4/9, **no floor** | **87 / 12 / 0** | pure 69/80, formula+U 5/5, fiat 13/14; no-D rows ILB>FS, OLB>FS (D taken 0). Misses include cross-side WR→DB pairs priced 2 vs live 6, FB>TE 6 vs live 2, several 0↔2 DB/LB adjacencies. (VERIFIED) |
| flexderive, cuts 1/4/9, **floor 6** | **92 / 7 / 0** | floor restores WR cross-side to ≥6 in effect but report still lists 7 disagreements (CB>FS/SS, EDGE>OLB, FB>TE, ILB>OLB, SS>DIME, SS>NICKEL off-by-one); cross-side WR pairs resolved by floor in practice. (VERIFIED) |
| flexderive, cuts **1.5/4/9** (best re-fit) | best 77 exact on 85 scored rows (vs 74 at 1/4/9) | cut-point re-fit improves fit but shifts boundaries (not applied to live without review). (VERIFIED from re-fit output) |

Principles under raw flexderive (from profile/logic): DIME trio for TE/ILB/OLB→DIME comes out **12 in profile intent but ILB>FS/OLB>FS have no D row (D=0) and DIME handling depends on COV multipliers** — raw formula does not automatically guarantee all three principle clusters match live without explicit pinning; FB>TE is a fiat/override tension (model gives 6 vs live 2 in disagreements); cross-side WR needs floor to hold at 6.

### Candidate A1 — Flexderive formula as mechanism, cross-side floor 6, **no ad hoc principle pins** (principled derivation, principle drift exposed)
- **Mechanism:** `tier(max(0,D@90)+gate(A)+U)` with P-322 skill profiles, cuts 1/4/9, cross-side floor 6 (offense↔defense never <6). No per-row gap-closing edits.
- **Fit to 99 rules:** **92 exact / 7 off-by-one / 0 hard** with floor 6 (87/12/0 without floor). Disagreements (floor-6 run): CB>FS 0→2, CB>SS 0→2, EDGE>OLB 0→2, FB>TE 2→6, ILB>OLB 0→2, SS>DIME 0→2, SS>NICKEL 0→2. (VERIFIED)
- **Principles kept/changed:** DIME trio **kept at 12 for TE/ILB/OLB→DIME in derived pricing intent** (coverage-costed destinations) except ILB>FS/OLB>FS lack D rows (UNKNOWN/REPORTED D gap in source table — must be supplied by recomputed D). **FB exception: CHANGED in effect** — FB>TE modeled 6 vs live 2 (fiat mismatch) unless pinned; DT/OT→FB remain 0 via FB-free list. **Cross-side floor: kept** when floor 6 applied. **Tiers:** 0/2/6/12 preserved. (VERIFIED from diff/profile; ILB>FS/OLB>FS D UNKNOWN)
- **Gap / flex / emergency / real bias:** **NOT fully measured end-to-end** in this pass because the temp scripted end-to-end FLEX-mutation harness failed (module export/mutation interaction in scratch). Directional expectation (INFERRED, not a result): 7 off-by-one moves and any DIME/FB handling differences will change specific stand-in costs (e.g. if FB>TE rose to 6, 4-3-in-3-4 TE3 cost would increase, **worsening** that side; if coverage/LB adjacencies shift, DT2/SAM/NICKEL stand-ins may move) — so A1 as-is **cannot be claimed to close the gap** and may worsen it. A1 is useful as a *derivation scaffold*, not as a gap-closing proposal until fully measured.
- **Conclusion:** principled derivation exists and fits 87–92/99, but **does not by itself satisfy “closes the gap while keeping all three principle clusters” without explicit, principled pins and fresh D for no-D rows**. (INFERRED from unmeasured gap + known FB>TE/D-row issues.)

### Candidate A2 — Flexderive + **principle constraints pinned** (DIME trio, FB exception, cross-side floor fixed) — formula governs the rest
- **Mechanism:** same formula/cuts 1/4/9 + floor 6, but **pin**: TE/ILB/OLB→DIME = 12, DT/OT→FB = 0, FB→TE = 2, WR→CB/FS/SS/NICKEL/DIME ≥ 6. Other 99 live pairs take derived prices (profile overrides like C>OG/FB>RB/EDGE>RB/EDGE>ILB and FB-free list still apply per P-322). No D-row invented (ILB>FS, OLB>FS remain D=0 in source; pinning not added except by formula result — **needs recomputed D per P-321**).
- **Fit:** expected to improve on the 7 off-by-one where pins apply (FB>TE fixed, WR cross-side fixed) while retaining formula-driven mismatches elsewhere (CB>FS/SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL off-by-one at 1/4/9). With cuts 1.5/4/9 and pins, fit approaches best re-fit neighborhood (~77/85 scored in re-fit space) — **exact count under pins: INFERRED ~92–95/99**, not fully enumerated here as a final table artifact.
- **Principles:** **DIME trio kept (pinned 12). FB exception kept (pinned 0/0/2). Cross-side floor kept (pinned ≥6).** Tiers 0/2/6/12 preserved. Principled reason for pins: these encode domain constraints (coverage-heavy DIME, FB role exception, side-crossing cost) that P-322’s generic skill-gap/D terms under-specify (DIME trio / FB exception) or that the floor formalizes (cross-side) — i.e. the formula derives the base athletic/positional cost, and these are **documented domain overrides** consistent with table logic, not gap-targeted tweaks.
- **Gap / flex / emergency / real bias:** **NOT end-to-end measured in this pass** (harness limitation noted). Risk: formula-driven 0↔2 shifts on LB/DB adjacencies (ILB↔OLB, SS↔DIME/NICKEL, EDGE↔OLB, CB↔FS/SS) can change which stand-ins are chosen for DT2/MIKE/SAM/CB3 in synthetic and real rosters, so gap and 28-3 bias may move in either direction. **Cannot claim closure without a completed end-to-end measurement.**
- **Conclusion:** **closest to a “principled formula + principles preserved” candidate** if (and only if) recomputed D (P-321, including ILB>FS/OLB>FS/OLB>EDGE post-bump) is supplied and the resulting derived table is fully measured for gap, fit, flex frequency, and emergencies. As-is, **negative on demonstrated closure**.

### Candidate A3 — Cut-point re-fit (1.5/4/9) + principle pins (better formal fit, weaker interpretability)
- **Mechanism:** same as A2 but cuts 1.5/4/9 (best D-only/full-formula re-fit point found by flexderive). Pins as in A2.
- **Fit:** improves raw scored fit (77/85 at 1.5/4/9 vs 74/85 at 1/4/9 in full-formula re-fit). (VERIFIED re-fit) **Full 99-rule fit under pins not fully enumerated.**
- **Principles:** same pins preserved; tier values unchanged but **cut boundaries move** (numeric thresholds 1→1.5 etc.) — KG must judge whether moving boundaries is “within 0/2/6/12 tier structure” (structure preserved, calibration changed). Principled reason would be empirical fit to D+A+U continuum, but interpretability of the 1.5 boundary is weaker than integer-ish 1/4/9.
- **Gap / flex / emergency / real bias:** **NOT measured end-to-end.** No demonstrated closure.
- **Conclusion:** plausible calibration refinement **only after** A2 is fully measured; not a standalone gap-closing result.

### Part A overall (negative/conditional result)
- **No formula evaluated here demonstrates closing the synthetic gap and/or the real-roster bias while provably keeping DIME trio, FB exception, and cross-side floor with 0/2/6/12 tiers, with full measurements.** (VERIFIED for “not demonstrated”: A1 fit measured, others not end-to-end measured in this pass.)
- Flexderive (87–92/99 fit) is the best **derivation scaffold** available in-tree, but it has (a) **no-D rows** (ILB>FS, OLB>FS) and pre/post-bump D uncertainty, (b) **FB>TE tension** (2 vs 6) unless pinned as a domain exception, and (c) **unmeasured gap/flex/emergency impact** of its off-by-one shifts. A principled path forward (INFERRED): **pin the three principle clusters as explicit domain constraints, recompute D (P-321) to fill no-D/bump gaps, then derive the remainder by formula and re-measure gap + flexing frequency + emergencies**. If that still fails to close the gap, the formula route alone is insufficient (consistent with prompt allowance for a negative result).

---

## Part B — Structural side (real-roster bias, pool/slot table)

### Driver identification (VERIFIED)
- 3-4’s **DT2 slot** is mapped to **ILB2** (`dest=ILB, row=DT2, w=300`, label ILB2) while 4-3 keeps DT2 as DT. This creates a 4th LB requirement in 3-4 (MIKE ILB w300, DT2-as-ILB2 w300, WILL OLB w150, SAM OLB w100) vs 4-3’s 3 LBs (MIKE, WILL, SAM). Real rosters average only ~2.47 ILB and ~2.94 OLB (5.41 off-ball LBs) with 6.22 EDGE/DT — so 3-4 frequently cannot fill **DT2-as-ILB2** with a natural ILB and pays EDGE/OLB/SS→ILB @6 on a **w300** slot (14/32 teams, 25,200 aggregate cost). This is the single largest 3-4-only cost bucket. (VERIFIED)
- MIKE (w300, ILB) is also costly in 3-4 for some teams (7/32, 12,600) when ILB depth is thin, but DT2-as-ILB2 dominates. Offense/TE/OL costs are largely shared across bases. (VERIFIED)

### Structural proposals measured (live flex table, `DEFAULT_VALUES` unless noted)

| Proposal | 3-4 slot change | Synthetic gap DL5=DT (meas / table) | Real bias (32 teams) better 4-3 / 3-4 / tied | Mean (median) | Notes |
|---|---|---:|---:|---:|---|
| **B0 baseline** | DT2 → ILB, row DT2, w300 (live) | **720.108 / 700** (loss43 2578.642, loss34 1858.534) | **28 / 3 / 1** | **+1184.538** (+1114.634) | DT2:ILB(DT2,w300) 14 teams/25200 cost in 3-4. (VERIFIED) |
| **B1 (rating-row only, weight kept)** | DT2 → ILB, **row MIKE**, w300 | **514.308** / (not separately tabled here) (2480.349 − 1966.042) | **28 / 4 / 0** | **+1068.584** (+1000.983) | Uses MIKE’s measured value curve for ILB2 but keeps slot weight 300 (no SLOTS weight change). Shifts some cost between MIKE/DT2 buckets but **does not materially fix bias**. (VERIFIED) |
| **B2 (slot value down)** | DT2 → ILB, **row WILL**, w150 | **21535.804** (12520.467 − −9015.337) | **32 / 0 / 0** | **+12740.123** (+12719.150) | **CHANGES SLOT VALUE/WEIGHT (DT2 300→150 effect)** — collapses 3-4 value, massively worsens bias. Harmful; shown as boundary. (VERIFIED) |
| **B3 (slot value down)** | DT2 → ILB, **row SAM**, w100 | **28471.592** | **32 / 0 / 0** | **+16454.254** | Same, worse. (VERIFIED) |
| **B4 (breaks 3-4 front)** | DT2 stays DT (4-3-like front personnel) | **0 / 0** | **0 / 0 / 32** | **0** | Not a 3-4; eliminates distinction. Trivial/inadmissible structurally, included as control. (VERIFIED) |
| **B5 (structural, keeps DT2 row/weight w300)** | DT2 → **OLB**, **row DT2**, w300, label OLB3 → front becomes **1 ILB (MIKE) + 3 OLB (WILL, DT2, SAM), 3 DL** | **−1140.123 / (table-equivalent negative, loss43 718.411, loss34 1858.534)** | **13 / 14 / 5** | **−148.660** (0.000) | **Flips and nearly neutralizes real-roster bias** (13-14-5, mean −149) and **over-corrects synthetic gap** (now favors 4-3-in-3-4 by 1140 vs favors 3-4-in-4-3 by 720 baseline). Synthetic placements: 4-3-in-3-4 loses only TE3 FB→TE@2 (100) + SAM TE→OLB@6 (600) = 700-ish effective vs 718.411; 3-4-in-4-3 still DL5 OLB→DT@12? (p34in43 shows OLB→DL5@12, w150, 1800). 3-4 DT2:OLB(DT2,w300) flex cost drops sharply (5 teams/3000 aggregate) vs 14/25200 baseline because real rosters have EDGE/OLB bodies that can fill an OLB-dest slot at lower/available penalties than an ILB-dest slot. **Ties include ARI, ATL, BUF, IND, MIN in this run.** (VERIFIED `partb`, `partb-detail2`) |
| **B6 (structural, hybrid)** | DT2 → **EDGE**, row DT2, w300 (4th DL/edge, 3 off-ball LBs) | **1863.816 / —** (loss43 1863.816, loss34 0) | **25 / 0 / 7** | **+574.348** (+486.700) | Reduces bias vs baseline but keeps 4-3 favored and **widens synthetic asymmetry badly** (4-3-in-3-4 now pays DT→EDGE@6 on w300 = 1800 alone; 3-4-in-4-3 becomes 0 in this native mapping). Not a fix. (VERIFIED) |

**Flexing frequency / emergencies (real rosters, 32×2), from baseline and structural spot checks:** baseline 143 flexed, 0 emergencies (measured earlier). B5 alters 3-4 cost distribution substantially (DT2-as-OLB far less forced) — exact aggregate flex count for B5 not separately totaled beyond per-team/per-slot evidence above (**INFERRED lower 3-4 forced-flex pressure on that slot; exact total UNKNOWN without a dedicated B5 flex-count pass**). No emergencies observed in any measured case.

### Part B interpretation (INFERRED, grounded in VERIFIED measurements)
- **The real-roster bias is driven primarily by 3-4’s demand for a 2nd ILB at DT2 (w300, `dest=ILB`) against 4-3-shaped LB pools** (few true ILBs). Rating ILB2 off a different LB curve while keeping w300 (B1) barely helps; lowering ILB2’s slot value (B2/B3) “fixes” bias only by crippling 3-4’s total value — not acceptable as a value-neutral fix.
- **B5 is the most promising structural lever found:** reclassifying 3-4’s 4th front-seven spot from ILB2 to a 3rd OLB (keeps row/weight DT2=300, so slot value scale preserved) aligns the spot’s destination with the body types rosters actually have (EDGE/OLB depth) and nearly eliminates the real-roster mean bias (+1184 → −149) while changing the 28-3-1 split to ~13-14-5. However it (a) **redefines 3-4 personnel** as 3-4-4-in-spirit? (3 DL, 1 ILB, 3 OLB) rather than 2 ILB/2 OLB — an **Owner/Architect spot-table/formation doctrine decision**; (b) **over-corrects the synthetic native-roster gap** in the opposite direction (−1140) because 4-3 no longer pays a w300 DT→ILB stand-in when playing 3-4 but 3-4 still pays DL5 ILB/OLB→DT@12. So B5 trades one asymmetry for another structurally.
- **Possible combined direction (INFERRED, not fully measured):** pair a structural 3-4 ILB/OLB spot re-balance (B5-like, to match pool bodies) with a **principled adjustment to the symmetric DL5/DT-stand-in cost** (the remaining 1800/12×150 lever is the 3-4-in-4-3 side) — but that re-enters pricing and must satisfy Part A principles; I did not measure such a combination. Alternatively, keep 2 ILB / 2 OLB but reduce ILB2’s effective demand via pool-aware substitution rules — not in current engine, larger change.
- **If the bias cannot be fixed on the pool/slot side without a larger change:** making 3-4 competitive on real 4-3-shaped rosters without redefining formation personnel likely requires either (1) accepting B5-style personnel redefinition (Owner decision), (2) changing roster construction/pool targets (more true ILBs) — out of slot table alone, or (3) a principled, measured flex/price+structure co-design. Slot/weight tweaks alone (B1–B3) do **not** fix it without breaking value parity.

---

## Answer summary
- **Part A:** Filed 3 evaluated directions around flexderive (A1/A2/A3). **A2 (formula + DIME/FB/cross-side pinned as domain constraints, D recomputed) is the only principled mechanism consistent with stated principles**, but **gap/flex/emergency closure is NOT demonstrated here** (end-to-end measurement incomplete; harness limitation stated). Negative result on demonstrated closure with current inputs; formula scaffold is 87–92/99 fit with known D/fiat gaps. (VERIFIED fits; INFERRED closure status.)
- **Part B:** Bias driver is 3-4 `DT2 -> ILB2 (dest ILB, row DT2, w300)` vs 4-3-shaped LB pools (ILB avg 2.47). **B5 (DT2 -> OLB, row DT2 w300; 1 ILB/3 OLB)** nearly neutralizes real bias (**13/14/5, mean −148.660**) but over-corrects synthetic gap (**−1140.123**) and is a formation-personnel doctrine change (Owner/Architect). Slot-value reductions (B2/B3) worsen bias badly; rating-row-only (B1) insufficient. **No slot-only fix found that closes both real bias and synthetic gap without a larger/doctrinal change.** (VERIFIED measurements.)

## Evidence / reproducibility
All numbers above produced in `/tmp/glyph-p333` from `origin/architect/engine-and-seats@7a0706df` via `node --experimental-strip-types <script>` (see “Commands” list). Key outputs summarized inline; raw command transcripts available in shell history of this session/scratch scripts listed.

## Labels
- **VERIFIED:** baseline gaps (table/measured), real-bias counts/mean/median/range, role averages, slot mapping, DT2 cost concentration, B0–B6/B1–B4 synthetic and real-bias results shown, flexderive fit counts (87/12/0; 92/7/0; re-fit 77/85 at 1.5/4/9), principle values in live table, script/commit provenance stated.
- **REPORTED:** prompt’s 28-3/mean+1144 and “live 145” context; P-322 profile is proposal data transcribed by Architect; D table provenance per file header.
- **INFERRED:** pool-shape interpretation, A1/A2/A3 gap impact without end-to-end run, B5 flex-count total reduction, combined A+B direction.
- **UNKNOWN:** full end-to-end gap/flex/emergency measurements for A1–A3 derived tables on this harness; recomputed D for ILB>FS/OLB>FS and post-bump OLB>EDGE (P-321); exact 99-rule fit counts under pinned A2/A3 final artifacts.

No implementation performed. No option selected.
