SPEAKER: vl | ROLE: council | TASK: Part 1 (follow-up GLM round) — independent reproduction of Ernie's 4th-down reversal | DATE: 2026-11-17T22:41:00Z
FOR: P-342

# VL independent verification of Ernie's 4th-down reversal (Part 1)

## Scope and method (VERIFIED)

- **Target:** `origin/architect/engine-and-seats` tip `65673a00`, clean extract at `/tmp/glm-full`
- **Packs:** `nfl-pools-fit2023-2025` / `nfl-passclass-fit2023-2025` (default packs)
- **Pairing:** 12,000 paired games, keys `gameKeyOf('vl:' + g)` (same keyspace as `glm-bar.ts`)
- **Paired:** `runGame(P, key, {})` vs `runGame(P, key, { passClass: M })` on identical keys
- **N=12,000** (stated explicitly; matches Glyph's N=12k, 6× Beam's N=2000)
- **Instrumentation:** custom probe (`tools/4thdown-vl.ts`, written this session, not Ernie's). Tracks snap events with `down===4 && call===0` (pass), classifies `oc===1` (incomplete), and checks whether the next `drive_end` in the same drive has `result==='downs'`. A later `snap` in the same drive after a 4th-down incomplete = possession continued (not turnover-on-downs).
- **Hole counter:** `holes[4]` = 0 on both arms (confirmed via `runGame` return `holes` array).

## Results (VERIFIED, N=12000)

| Metric | Pools (record node) | GLM (passClass) | Delta |
|---|---:|---:|---:|
| 4th-down pass plays | 19,138 | 20,610 | +1,472 |
| comp / inc / sack / int | 53.62% / 35.09% / 7.91% / 3.38% | 52.60% / 36.65% / 7.30% / 3.45% | inc +1.56pp |
| incompletions (count) | 6,715 | 7,576 | +861 |
| **inc → endsDrive(downs)** | **68.13% (4,575)** | **23.09% (1,749)** | **-45.04pp, -2,826 / 12k** |
| inc → converted/continued | 31.87% (2,140) | 75.61% (5,727) | +43.74pp, +3,587 |
| inc → other | 0.00% (0) | 1.30% (98) | +1.30pp |

**Verdict on Ernie's §4 headline:** **REPRODUCED at N=12,000 (VERIFIED).** Ernie reported incompletion-ends-drive **68.3% pools vs 24.3% GLM** (~3,601 extra drives/12k). I observe **68.13% vs 23.09%** with **−2,826 downs-endings** over 12k (net of count/rate shifts). This confirms the reversal at the same order of magnitude as Ernie (68.3/24.3), Glyph (68.28/24.28 at 12k), and Beam (69.3/25.8 at 2k).

## Mechanism diagnostic

I did not trace `pickClassTuple` levels (my probe tracks drive outcomes, not level histograms). Beam (N=2000) and Glyph (N=12k) both traced levels:
- Beam: pools {0:2088,1:1171,2:58}, GLM {0:570,1:2634,2:254,3:36} — GLM concentrates in L1 (down-blind cell)
- Glyph: pools overall 62.82% L0, class-conditional 17.24% L0; GLM class-conditional 16.38% L0

The mechanism is consistent across all three seats: the class-conditional tuple sampler (`minClassPool=25`) falls out of the down-aware cell on thin 4th-down cells and lands in down-blind cells that produce `ndown/delta` continuations instead of `ended='downs'`. The hole counter (`holes[4]=0`) genuinely cannot see this fallback — it only counts levels where no class pool holds ≥25 plays.

## Default-block / §6 / residual (VL position)

- **Default-block (RECOMMEND, VERIFIED):** Do **not** treat the GLM pass-class node as safe-to-default while 4th-down incompletions fail to end possession at anywhere near pools rates (23.09% vs 68.13% at 12k). The ~3,600 non-downs continuations after 4th-down incompletions over 12k is a large possession/drive-shape distortion.
- **§6 fix (Ernie's "bound fallback to pools-node level" — ACCEPT):** Bounding the fallback walk by the level the pools node itself would have chosen (never coarser) is the right fix. It keeps the ≥25-plays guarantee where the cell is genuinely populated and removes the down-blind substitution.
- **Residual sack (~-1%):** consistent with Beam's revised position — calibration note, not a change. Fit model parameters; do not sack-only patch.

**BLOCKED:** nothing. **OPEN:** Architect lands §6 bound fix; re-run paired comparison (drives within ±0.3%, inc:downs back to ~24%); Owner decides default. **NEXT:** (1) Architect lands §6 fix; (2) re-run `glm-bar.ts 12000` paired comparison; (3) Owner decides default on held-out gain alone.

## Artifacts / receipts

- Probe: `/tmp/glm-full/colors/tools/4thdown-vl.ts` (this session)
- Key command: `node --experimental-strip-types tools/4thdown-vl.ts` → N=12000, output above
- All three seats confirm: Beam (N=2k, 69.3/25.8), Glyph (N=12k, 68.28/24.28), VL (N=12k, 68.13/23.09) → **REVIEWED ✓✓✓**
