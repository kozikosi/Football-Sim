SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: V22-TRUTH-2 slice #12 — the supply arithmetic, re-derived from the build's own data (Owner question: "is this still true?") | DATE: 2026-10-22T01:02Z

**Pins (rulings applied: build named V22; outer root only):**
- `pwd` = `/Users/kosi/Desktop/Football Sim` printed in the receipt shell — every measurement below ran there; nothing came from the stale inner repo.
- Build (the V22 working file): `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b…` (full: `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`), 656,746 B, measured 2026-10-22T01:02Z. Last-committed blob at HEAD: `40233d6be00e987c`. **Both were censused — identical counts** (§5).
- Method: `_agents/glm/tests/supply-census.js` — regex-extracts the literal `PLAYERS` / `ROSTER_SLOTS` arrays and evaluates them with `Function` (parse, **not** pattern-grep; this is what killed my earlier contaminated census). Full parsed output: `_agents/glm/notes/SUPPLY-CENSUS-RECEIPT.txt` (60 lines, this build).

## 1 · The measured pool (VERIFIED — parse)

1,200 records, all width 11; first record `["Ja'Marr Chase","WR","Cincinnati Bengals",99,…,true]`. Histogram (position · total · ovr≥76):

| pos | n | ≥76 | pos | n | ≥76 |
|-----|---|-----|-----|---|-----|
| WR | 151 | 87 | QB | 40 | 24 |
| CB | 141 | 81 | LT | 39 | 29 |
| DT | 125 | 63 | RT | 39 | 22 |
| HB | 89 | 55 | LG | 38 | 17 |
| LEDG | 71 | 42 | K | 32 | 21 |
| REDG | 58 | 34 | P | 32 | 20 |
| SS | 54 | 34 | C | 31 | 18 |
| TE | 53 | 30 | LS | 12 | 6 |
| FS | 53 | 31 | FB | 8 | 3 |
| MIKE | 43 | 29 | SAM | 5 | 1 |
| RG | 43 | 24 | WILL | 43 | 22 |

Column sums = 1,200 exactly. `ROSTER_SLOTS` = the 26 known classes (`QB…K`); post-ruling +FB +P → **28 slots × 32 teams = 896 picks** ✓.

## 2 · Verdicts on the three handed lines — all STILL TRUE

| # | Handoff line | Verdict |
|---|--------------|---------|
| L1 | HB 89 + FB 8 = 97 vs 96 backfield slots (RB1, RB2, FB) → **+1** | **STILL TRUE.** 89+8=97 measured; demand 32×3=96. |
| L2 | TE 53 vs 64 slots (TE1, TE2) → **−11** | **STILL TRUE.** 53 vs 64 − = −11. |
| L3 | K 32 + P 32 = 64 vs 64 slots (K, P) → **0** | **STILL TRUE.** Both exact-fit (+0 slack each). |
| — | "the group nets −10 because of tight end, not the FB slot" | **STILL TRUE for the handed group** (+1−11=−10). **COMPLETED** below: two deficits live outside that group — the LB field −5 and natural C −1. |

**Correction to MOC's earlier arithmetic:** "LB group 86 for 96 → −10" undercounts. SAM's own 5 records are natural at SAM, and MIKE/WILL are natural everywhere (`NATURAL_SLOT_MAP`: all three LB positions list all three LB slots). Family supply = 43+43+5 = **91 vs 96 → −5**, not −10.

## 3 · The 896-pick dry-run census

| class | demand | pool | slack | marginal (demand-th best OVR) | shortfall resolution |
|-------|--------|------|-------|-------------------------------|----------------------|
| QB | 32 | 40 | +8 | 32nd = **73** | none needed; tail rides the floor |
| RB1+RB2 | 64 | HB 89 | +8 | 64th = 74 | none needed |
| FB | 32 | FB 8 | **−24 natural** | pool exhausts at 8 | **all 24 non-FB slots fill from HB at zero cost — this is precisely what the ruling supplies; backfield family nets +1** |
| WR1-3 | 96 | 151 | +55 | 96th = 75 | none needed |
| TE1+TE2 | 64 | 53 | **−11** | TE1 marginal = 75; supply exhausts at 53 | **shortage lands entirely in TE2** (11 teams); resolves WR→TE at −4 (`FLEX.WR.TE=4`; WR surplus +55). **Predates the FB/P ruling** |
| OT1+OT2 | 64 | LT+RT 78 | +14 | — | — |
| OG1+OG2 | 64 | LG+RG 81 | +17 | — | — |
| C | 32 | C 31 | **−1** | pool exhausts at 31 | free: LT/RT play C at 0 and LG/RG play C at 0 (quoted `FLEX` lines) |
| DE1+DE2 | 64 | LEDG+REDG 129 | +65 | 32nd = 76–77 | none needed |
| DT1+DT2 | 64 | DT 125 | +61 | 64th = 75 | none needed |
| MIKE/WILL/SAM | 96 | 91 | **−5** | MIKE 32nd=75, WILL 32nd=74, SAM=5 | naturals at all three slots; inbound CB→LB −4 / SS→SAM −2 lanes |
| CB1-3 | 96 | 141 | +45 | 96th = 74 | none needed |
| SS+FS | 64 | 107 | +43 | 32nd = 76 / 75 | none needed |
| K | 32 | 32 | **+0 EXACT** | 32nd = 71 | none needed — any slip would dry it |
| P | 32 | 32 | **+0 EXACT** | 32nd = 72 | none needed — same |

LS: 12 records, no draft slot → 1,200−12 = **1,188 draftable**, confirming the donor-era "written 1,188 · dropped 12, all LS" number.

**ANSWER (the wave's direct question):** at 28 rounds / 896 picks, **no position runs dry** — provided (a) the ruled HB↔FB zero-cost lane lands and (b) the existing flex lanes stand (TE via WR −4; C via OG 0; SAM via CB/SS −4/−2). Without flex lanes the stranding classes would be **FB −24, TE −11, C −1, LB −5**.

## 4 · Does the cpuPick replacement floor of 76 bind? (VERIFIED in code, l.1405–1448)

Three code facts:
1. `rlow[s] = Math.max(repl[g]==null?70:repl[g], 76)` — a per-slot **valuation clamp** inside the value formula (`w = table − slotWins(s, rl)`). It clamps the replacement term; **there is no `continue` keyed on OVR-vs-76 anywhere in the candidate loop** — nothing is ever *prohibited* by the floor.
2. What *does* skip candidates: rounds 1–3 credibility floors (`ovrFloor`: R1 ≥ max(90, topAvail−5); R2–3 ≥ max(85, topAvail−8); later −∞) and the "only the best remaining at a position" rule for rounds ≤3 — the comment names "(kicker, punter, fullback)" as the intended low-priority reach case.
3. Force-fill: `if(!best){ const s = firstOpenSlotAny(roster); … best = st.pool[0]; }` — a slot that no candidate fits is **never left empty**; the fallback takes the best player left for any open slot.

**Verdict: the floor binds VALUATION, never selection.** Forced sub-76 picks (demand − count≥76, when positive): QB 8 · backfield 38 · WR 9 · TE ~23 (+11 flexed TE2) · OT 13 · OG 23 · C 14 · DE 0 · DT 1 · LB 44 · CB 15 · S 0 · K 11 · P 12 ≈ **209–220 of 896 picks (~23–25%) price at-or-below zero VOR** — a quarter of the draft is floor-priced, which is *why* K/P/FB/second-TE picks defer to the late rounds under the round-1–3 credibility floors, and why the force-fill fallback exists. If the floor were a prohibition, the exact-fit K and P classes and the −1 C would strand teams in the final picks — **that reading is false in code.**

## 5 · Provenance — the Set B question closes

Working tree (`044d1759`) vs last-committed blob (`40233d6b`): **identical pools** — 1,200 records, same per-position counts at every value above. Nobody grew the pool; the pool never moved. The prior "Set B" census (FB 46 / K 70 / P 70 / HB 95 / TE 61) was a methodological error — double-quoted token matching over non-`PLAYERS` regions (slot labels, group definitions) — mine, and superseded; correction appended to `_agents/glm/notes/V22-FB-P-SECTION.md`. The provenance-UNKNOWN owner flag **dissolves**; the parse-verified numbers (Set A) are final and may be published in the doc.

## 6 · Adjacency (no arithmetic change)

- **P0-20 gate literals**: the two `32*26` sites (l.849, 866) still require the 896 fix — unchanged by this census.
- **22-Oct Owner Nickel ruling** (4-3: CB3 on → SAM off; 3-4: CB3/Nickel on → nose tackle off, DT2→ILB2 worth MIKE, SAM worn by OLB2 worth WILL): changes **deployment, not draft supply** — the 28 draft slots and the pool stand. MIKE/WILL/SAM interchangeability (zero-cost, `NATURAL_SLOT_MAP`) is what feeds both base presentations; the DT pool (125 for 64 slots) comfortably covers 3-4 nose duty; the LB-family −5 is the same number in both bases.
- **K→P direction** (a K record picked into a P slot) is closed today (`FLEX.K={}`); with 32/32 exact fit the class supplies regardless — that lane is a rules-implementation choice for the FB/P work item, not a supply risk.

## Not checked

1. How the draft UI's priority chart displays this supply — out of scope for the wave.
2. `replacementLevels()` recompute cadence (`st.replPool − st.pool.length ≥ 6`) — the clamp point is verified; how late the floor's timing drifts during the draft is not traced.
3. Season-model consequences of ~34 WR→TE flexed picks (−4 rating) — not simulated here.
4. Whether the CPU would *choose* WR→TE −4 over HB→FB 0 for the 11 TE2 holes when both compete in the same late-round valuation — plausible ordering, not traced through `cpuBias`/`cpuNoise`.
