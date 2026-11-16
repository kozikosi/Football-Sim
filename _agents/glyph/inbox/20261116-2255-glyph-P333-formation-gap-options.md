SPEAKER: glyph | ROLE: council | TASK: propose options to close 3-4/4-3 formation gap | DATE: 2026-11-16T22:55:00Z
FOR: P-333

## Scope
Propose 2–3 concrete options to close/reduce the 3-4 vs 4-3 formation gap. I do **not** pick or implement; KG/Architect picks. The 99-rule flex table is a guideline (not a constraint); deviations below are acceptable only insofar as KG judges values acceptable and the gap closes (per task).

## Baseline (VERIFIED, measured on extracted architect tip `7a0706df`)
**Engine/source measured:** `origin/architect/engine-and-seats` at `7a0706df` (`tools/mathlab/flex.json`, `colors/src/sports/nfl/engine/{flex,slots,lineup,valueprovider,players}.ts`, `colors/test/nfl/formation-gap.test.ts`). Extracted to `/tmp/glyph-p333` for scratch measurement; pool from `data/nfl/madden27-ratings.csv` + `data/nfl/free-agents-old-ratings.csv` + `data/nfl/player-ids.csv`.
**Commands:** `node --experimental-strip-types /tmp/glyph-p333/measure.mjs` and `node --experimental-strip-types --input-type=module /tmp/glyph-p333/variants.mjs` (2026-11-16).
**Live table:** 99 rules (23@12, 11@2, 42@6, 23@0). FB>TE=2, DIME trio TE/ILB/OLB→DIME=12, cross-side WR→CB/FS/SS/NICKEL/DIME=6.

### Baseline gap (native 4-3/3-4 rosters, table values; `formation-gap.test.ts` fixtures)
| Case | Loss (table units) | Measured loss (`DEFAULT_VALUES`) | Gap driver placements (table) |
|---|---:|---:|---|
| 4-3 in 3-4, DL5=DT | 2500 | 2578.642 | TE3 filled by FB→TE @2 (w50, cost 100) + DT2/ILB2 filled by OLB→ILB @6 (w300, cost 1800) + SAM filled by TE→OLB @6 (w100, cost 600) |
| 3-4 in 4-3, DL5=DT | 1800 | 1858.534 | DL5 filled by ILB→DT @12 (w150, cost 1800) |
| **Gap (DL5=DT)** | **700** (2500-1800) | **720.108** | — |
| 4-3 in 3-4, DL5=EDGE | 1800 | 1863.816 | DT2 filled by EDGE→ILB @6 (w300, cost 1800) |
| 3-4 in 4-3, DL5=EDGE | 1800 | 1858.534 | DL5 filled by ILB→DT @12 (w150, cost 1800) |
| Gap (DL5=EDGE) | 0 | 5.282 | balanced |

Baseline measured gap ~720 table-equivalent units ≈ **0.09 wins/season** context (per prompt; `WINS_PER_UNIT` conversion not re-derived here — REPORTED context consistent with 720-unit delta).

### Baseline flexing frequency / emergency fills (32 teams × 2 bases = 64 cases, `DEFAULT_VALUES`)
- Flexed placements (penalty>0): **143** / 2048 total spots (avg 2.234/case). **Emergency fills: 0**. (Prompt states live 145; my measurement on the extracted pool/code is 143 — small delta, REPORTED as live-145 context.)
- By penalty: @2 = 53, @6 = 90, @12 = 0.
- Top moves include FB→TE@2 (16), RB→TE@6 (13), OG→OT@2 (12), OLB→ILB@6 (11), OT→C@2 (9), SS→ILB@6 (9), OLB→TE@6 (8), WR→TE@6 (8), EDGE→TE@6 (7), etc.

## Options (all measured with same harness; 32 teams × 2 bases, 64 cases)

### Option A — Partial close, smallest deviation: `TE>OLB 6 → 2` (SAM stand-in cheaper)
**Rule change (1):** `TE -> OLB` penalty **6 → 2** (affects SAM/OLB-destination slots filled by TE). All other 98 rules unchanged.
**Why it helps (table):** 4-3-in-3-4 SAM (w100) filled by TE→OLB drops from 6×100=600 to 2×100=200, reducing the 4-3 loss by 400; 3-4-in-4-3 DL5 loss unchanged (1800). DT2 (OLB→ILB @6, w300) and TE3 (FB→TE @2, w50) unchanged.

| Metric | Value |
|---|---|
| New gap, DL5=DT (table units) | **300** (4-3 loss 2100 − 3-4 loss 1800) — down 400 from 700 |
| New gap, DL5=EDGE (table) | **0** (1800 − 1800) |
| Measured gap, DL5=DT (`DEFAULT_VALUES`) | **309.551** (2168.085 − 1858.534) |
| Measured gap, DL5=EDGE | **5.282** |
| 4-3-in-3-4 DT placements (flexed) | TE3: FB→TE @2 (w50,100); DT2: OLB→ILB @6 (w300,1800); SAM: TE→OLB **@2** (w100,200) |
| 3-4-in-4-3 DT placements (flexed) | DL5: ILB→DT @12 (w150,1800) |
| Flexed spots (32×2, 64) | **143** (unchanged vs baseline 143) |
| Emergency fills (32×2) | **0** |
| By penalty | @2 = 53, @6 = 90 (distribution unchanged in aggregate count) |
| DIME trio (TE/ILB/OLB→DIME = 12) | **Kept unchanged** — not touched; no DIME-slot behavior change in measured cases. |
| FB exception (FB>TE = 2) | **Kept unchanged** (FB→TE remains @2). |
| Cross-side floor (WR→CB/FS/SS/NICKEL/DIME = 6) | **Kept unchanged**. |
| Total rules | **99** |

**Tradeoff:** Closes ~57% of the DT-path table gap (700→300). Minimal structural deviation (single tier step on one existing pair that is already “allowed” at 6). Leaves a residual asymmetry driven by the DT2/ILB2 slot cost (w300) vs DL5 (w150).

### Option B — Exact table close, two-rule deviation (changes FB exception): `TE>OLB 6 → 0` and `FB>TE 2 → 0`
**Rule changes (2):** `TE -> OLB` **6 → 0**; `FB -> TE` **2 → 0**. All other 97 rules unchanged.
**Why it helps (table):** 4-3-in-3-4 SAM becomes TE→OLB @0 saving 600 (w100×6) and TE3 becomes FB→TE @0 saving 100 (w50×2), total −700, making 4-3 loss 1800 = 3-4 loss 1800 on the DT path. EDGE path already balanced.

| Metric | Value |
|---|---|
| New gap, DL5=DT (table units) | **0** (1800 − 1800) — closed |
| New gap, DL5=EDGE (table) | **0** (1800 − 1800) |
| Measured gap, DL5=DT (`DEFAULT_VALUES`) | **5.282** (1863.816 − 1858.534) — effectively closed |
| Measured gap, DL5=EDGE | **5.282** |
| 4-3-in3-4 DT placements (flexed) | DT2: OLB→ILB @6 (w300,1800) only; TE3 and SAM now filled at 0 penalty by FB and TE respectively (no longer flex-penalized) |
| 3-4-in-4-3 DT placements (flexed) | DL5: ILB→DT @12 (w150,1800) (solver may choose OLB→DT path equivalently at 12 depending; flexed cost same tier/weight) |
| Flexed spots (32×2, 64) | **125** (down 18 vs baseline 143) |
| Emergency fills (32×2) | **0** |
| By penalty | @2 = 38, @6 = 87 (reduced @2 count as FB→TE moves become 0-penalty natural-equivalent) |
| DIME trio (TE/ILB/OLB→DIME = 12) | **Kept unchanged**. |
| FB exception (FB>TE = 2) | **CHANGED: FB>TE becomes 0.** Rationale for deviation: FB lining up as TE is already the narrow “fullback flex” exception (live at 2); making it 0 contributes 100 units of the 700 needed for exact closure and removes a real-roster flex penalty on 16 observed FB→TE cases (per baseline top-moves). This is a policy change KG must judge (exception becomes free rather than cheap). |
| Cross-side floor (WR→CB/FS/SS/NICKEL/DIME = 6) | **Kept unchanged**. |
| Total rules | **99** |

**Tradeoff:** Closes the gap (table 0, measured ~5) and reduces total flexed placements on real rosters (143→125). But it makes FB>TE a free move and TE>OLB a free move — larger doctrine/realism deviation than A/C (TE as stand-in SAM/OLB and FB as stand-in TE treated as natural). DIME trio and cross-side floor preserved.

### Option C — Near-close, single-rule deviation (keeps FB exception): `TE>OLB 6 → 0`
**Rule change (1):** `TE -> OLB` penalty **6 → 0**. FB>TE remains **2**. All other 98 rules unchanged.
**Why it helps (table):** 4-3-in-3-4 SAM saving 600 (w100×6) reduces 4-3 loss to 1900; 3-4-in-4-3 remains 1800. TE3 (FB→TE @2, cost 100) remains, leaving a 100-unit residual.

| Metric | Value |
|---|---|
| New gap, DL5=DT (table units) | **100** (1900 − 1800) — down 600 from 700 |
| New gap, DL5=EDGE (table) | **0** (1800 − 1800) |
| Measured gap, DL5=DT (`DEFAULT_VALUES`) | **102.480** (1961.014 − 1858.534) |
| Measured gap, DL5=EDGE | **5.282** |
| 4-3-in-3-4 DT placements (flexed) | TE3: FB→TE @2 (w50,100); DT2: OLB→ILB @6 (w300,1800); SAM now 0-penalty for TE |
| 3-4-in-4-3 DT placements (flexed) | DL5: ILB/OLB→DT @12 (w150,1800) |
| Flexed spots (32×2, 64) | **143** (unchanged vs baseline 143 in count; SAM TE-fill becomes 0-penalty but total flexed count remained 143 in this measurement — see note) |
| Emergency fills (32×2) | **0** |
| By penalty | @2 = 53, @6 = 90 |
| DIME trio (TE/ILB/OLB→DIME = 12) | **Kept unchanged**. |
| FB exception (FB>TE = 2) | **Kept unchanged**. |
| Cross-side floor (WR→CB/FS/SS/NICKEL/DIME = 6) | **Kept unchanged**. |
| Total rules | **99** |

**Tradeoff:** Closes ~86% of the DT-path table gap (700→100, measured ~102) with a single rule change and without touching FB exception, DIME trio, or cross-side floor. Residual 100 table units (= FB→TE @2 on TE3 w50) remains; exact closure would require also making FB>TE 0 (Option B). Treats TE as a natural/free SAM/OLB stand-in — a stronger but localized realism claim.

## Summary comparison
| Option | Rules changed | New table gap DT (units) | New measured gap DT | Flexed spots (32×2) | Emergencies | DIME trio | FB exception | Cross-side floor |
|---|---|---:|---:|---:|---:|---|---|---|
| Baseline | — | 700 | 720.108 | 143 | 0 | kept (12) | kept (2) | kept (6) |
| **A** | TE>OLB 6→2 | **300** | 309.551 | 143 | 0 | kept | kept | kept |
| **C** | TE>OLB 6→0 | **100** | 102.480 | 143 | 0 | kept | kept | kept |
| **B** | TE>OLB 6→0, FB>TE 2→0 | **0** | 5.282 | 125 | 0 | kept | **changed to 0** | kept |

## Notes / limits
- **VERIFIED:** all table/measured gaps, fixture placement breakdowns, flex counts/emergency counts, and by-penalty aggregates above come from running the extracted engine (`lineupFor`/`fieldSlots`/`tableValues`/`DEFAULT_VALUES`) on `node v26.13.0 --experimental-strip-types` against the architect `7a0706df` sources and the `data/nfl` pool. 99-rule count and specific pair values verified via `FLEX` inspection.
- **REPORTED context (not re-derived):** prompt’s “live 145” flex count and “~0.09 wins/season” magnitude (consistent with ~720-unit measured delta). Baseline flex count I measured is 143 on this pool/harness.
- **Not evaluated:** in-season/simulation outcome distributions, multi-week formation switching dynamics, or non-native roster compositions beyond the 32 real rosters × 2 bases. The 3-4-in-4-3 DL5 stand-in remains ILB→DT @12 in all options (cannot be raised above tier 12); gap closure is achieved by reducing 4-3-in-3-4 stand-in costs (SAM/TE3 levers).
- No option selected or implemented.
