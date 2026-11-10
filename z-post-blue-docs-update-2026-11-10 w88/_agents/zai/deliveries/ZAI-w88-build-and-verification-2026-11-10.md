# Z.ai — w88 build + §4 verification · 2026-11-10

**Seat:** ZAI (High Councillor) · **Wave:** w88 (w-series, separate from Slice 3) · **Base:** w87 gh-pages `Football-Sim-Z-post-blue-w87.html` (1,900,033 B · md5 `bffdccace803ab126b52783e0de8f2e1`)
**Product:** `Football-Sim-Z-post-blue-w88.html` · **1,904,952 B · md5 `2f7a4654bff000e4b2365e0bd6fd1e3f`**

---

## 1 · The verification (§4) — the §2 table PASSES on the engine of record

Harness: the frozen Colors engine at snapshot `4ca9a071` run natively in Node (value.ts → matchup.ts → ratings.ts → specs.ts/slots.ts), pool = `madden27-ratings.csv` (n = 1,941). Scripts: `tools/verify_wins.mjs`, `tools/precolors_check.mjs`, `tools/cb4_check.mjs`.

**1a · The centers.** All 16 CSV pool means reproduce the prompt's claimed centers exactly: QB 71.85, HB 75.98, WR 75.53, TE 70.48, LT/RT 74.05, LG/RG 72.99, C 71.43, EDGE 74.87 (LEDG 74.98 + REDG 74.74), DT 73.93, LB 72.47 (MIKE 73.35 + WILL 72.29 + SAM 69.00), CB 74.99, SS 74.63, FS 73.76, K 78.27, P 77.03, FB 71.88. The CSV is the right pool.

**1b · Harness sanity.** OLD slotWins20 (70→90, flat-80 base) on Colors reproduces MUSE's reported values to the digit: SAM 0.2630, CB1 1.0563, WR3 0.2470, OT1 1.2505.

**1c · The NEW table.** Recomputed localWins20 (local slope at ±5 around the pool center, everything else at position averages, slope × 20) matches the §2 table for **all 32 slots at one decimal**. Key exacts: OT1 NEW = 1.2497 (the known rounding-boundary artifact; reads 1.2 ✓), WR2 1.1487 → 1.1 ✓, TE2 0.2661 → 0.3 ✓, SAM 0.1279 → 0.1 ✓, RB2 0.0971 → 0.1 ✓. The recomputed ranking order equals the §2 order exactly (WR2 6th above CB1 7th; MIKE > DE2 > DT2 > FS > SS at 0.8; SAM 26th; RB2 30th).

**1d · SAM (0.3 → 0.1) is real, not a kink.** Slope by spread: ±3 0.129, ±5 0.128, ±7 0.144. SAM's curve is genuinely flat around the pool average (72.47); the secant (0.263) was the artifact. Stable at every spread.

**1e · Fragility flags.** WR2 is spread-sensitive: ±3 1.305, ±5 1.149, ±7 1.039 (rank 6 holds at ±5, edges below CB1 only at ±7). TE2 is the most fragile: ±3 0.133, ±5 0.266, ±7 0.325 — a strongly convex region; at ±3 it would read 0.1. RB2 is stable (0.097 / 0.097 / 0.143). ±5 is the right working spread — see §4.

## 2 · The WR3 question — resolved: the engines genuinely differ; Colors says no move

Measured WR3 / SAM / CB1 on both engines (scripts: `tools/verify_wins.mjs`, `tools/precolors_check.mjs`):

| slot | PreColors OLD slotWins20 → NEW local±5 | Colors (4ca9a071) OLD → NEW |
|---|---|---|
| WR3 | 0.3830 → 0.4699 (weight-equiv 150.8 → 185.0) | **0.2470 → 0.2470 (no move)** |
| SAM | 0.0741 → 0.0741 (no move) | 0.2630 → 0.1279 |
| CB1 | 1.4429 → 1.4423 (no move) | 1.0563 → 1.0557 (no move) |

My PreColors harness reproduces the P-321 evaluators' exact numbers (SAM 0.074 ✓, CB1 1.442 ✓) — **nobody miscalculated; the two engines genuinely differ.** Root cause, from the source: the receiving specs are built differently. PreColors `rec = {WR1 1.5, WR2 1.0, WR3 0.7, TE1 0.9, RB1 0.2}` gives WR3 a **16.3% share** of the receiving unit; Colors `rec = {WR1 25.682, WR2 19.86, WR3 3.251, TE1 2.174, RB1 4.201, TE3 1.264, WR4 1.6}` gives WR3 **5.6%** (and TE2 rides only the personnel specs there). The fitted knobs differ too (MC.cov 0.0283 vs 0.0184, MC.rb 0.0249 vs 0.0208, defPredict 0.40 vs 0.15), and the run-cap placement differs (PreColors caps the net unit; Colors caps the offense alone and subtracts the defense after — the audit-2 fix). The "95 → 120" claim reproduces on PreColors as a **ratio rebase** (95 × 0.4699/0.3830 = 116.5 → snap 120), not as a direct weight read.

**Verdict:** on the engine of record for the NEW measurement — the Colors engine at the frozen snapshot, the tree P-321/76 Pancakes adopts — WR3 does not move (0.2470 → 0.2470, weight-equiv 97.2 → 97.2). The §2 table stands; w88 displays WR3 at 0.2, rank 24. The gap itself is real and worth P-325's attention: it is a spec-fidelity question (which receiving mix is the Owner's truth), not a math error on either side. CB4 carries the Colors DIME value 0.1310 → 0.1 (CB4 **is** the product's DIME — the w34 label law).

## 3 · The w88 build — numbers and order only

Built by asserted exact replacements (`tools/build_w88.py`, 13/13 asserted, one copy each). Every displayed w87 weight number now wears the NEW Wins; the weight table (`ZPB_SLOTS_W`) stays as the model's internal law (the engine calibration reads it) and is no longer displayed anywhere:

1. **The guide ranked list** (`zpbPosRankHTML`): 32 rows, new order, `2.5 wins … 0.1 wins` with the unit on every row, bars rescaled to the Wins range, hover explains the local-rate measurement, caption retired from "QB anchored at 1000".
2. **The position rankings page buttons** (`zpbBuildRankBtns`): badges `2.5 w … 0.1 w`, buttons wear the new ranking order, hover carries the full meaning.
3. **The Series dropdown**: rebuilds from the new order (step 7 = QB + DE1 + WR1 + DT1 + OT1 + WR2 + CB1 — the tell works as designed).
4. **The tier list, the role table, the wins-per-+1 label** (`valueTiersHTML`, `slotRoleTableHTML`, `wpoLab`): re-pointed to the NEW Wins, one decimal, "70→90" wording retired from headers and labels.
5. **Guide copy**: the intro parenthetical, the "In short" paragraph (now 2.5 / 1.7 / 1.6 / 1.3 / 1.2 / the 1-win tier / the 0.8 tier — exact display values), and the values narrative (weight-scale sentence replaced by the Wins meaning).

**Not touched:** the engine and its calibration (`slotWinsTable` still lands 70→90 on `ZPB_SLOTS_W × 0.00254`; verified in the harness: QB 2.5400, DE1 1.7145), `DEFAULT_WEIGHTS` and the MODEL WEIGHTS editor (the Owner's model control, not a w87 display), the flex table, the brand, the layout, any pin. Dead code that referenced the old numbers (`zpbValuesHTML`, the guide's unused `draft`/`values` locals, `zpbSeriesHTML` chips) was re-pointed for consistency but renders nowhere.

## 4 · Headless + live verification

- **Node harness** (`tools/verify_w88.mjs`): 21/21 checks — order array exact, all 32 displayed values equal §2 in order, rank positions (WR2 6, CB1 7, NICKEL 23, DIME 25, SAM 26, RB2 30, FB 32), no stray weight integers where a position value shows, no "anchored at 1000" anywhere, tier/role wording updated, engine calibration untouched.
- **Browser** (agent-browser, Chromium): page opens clean — **0 console errors, 0 page errors** across the SIMULATOR → GUIDE → POSITION RANKINGS tabs; live DOM checks match (guide rows `1 QB 2.5 wins / 2 DE1 1.7 / 3 WR1 1.6 … 25 DIME 0.1 / 26 SAM 0.1`; buttons `QB:2.5 w | DE1:1.7 w | WR1:1.6 w | DT1:1.3 w | OT1:1.2 w | WR2:1.1 w | CB1:1.1 w …`); Series rebuilt on the new order. Evidence: `evidence/w88-guide.png`, `evidence/w88-buttons.png`.

## 5 · Method notes (§4 "improve the method")

- **±5 is right; ±3 is the fragile one; a direct ±10 span is the trap.** The direct span wins(center+10) − wins(center−10) reproduces the OLD secant exactly for the slots that moved (SAM 0.2630, RB2 0.2468, TE2 0.3702 — identical to slotWins20): the curves are near-linear across that span, so a ±10 span would silently re-import the old numbers and erase the whole change. The ±5 slope is what actually measures the local rate. ±3 doubles down on curvature and destabilizes TE2 (0.13 vs 0.27). Keep slope × 20 at ±5.
- **Display rule works.** One decimal everywhere, unit on the row ("2.5 wins"), meaning in the hover — a user can read what 2.5 is without leaving the page (§8's request).
- **The CSV pool is the right pool** (verified means; the engine has no embedded pool of its own).
- **The name holds.** `localWins20` sits honestly beside `slotWins20` in the lineage — "local" says the rate, "20" says the span. No better name found.
- `IDEA:` when the Architect's adopt-measurement build (P-321) lands `slotWinsPerOvr` as the local slope, the engine and the UI will share one source; the display then reads engine truth directly and the §2 table becomes a receipt instead of a source.

## 6 · Boundaries & state

w88 is w87 + the Wins change only. No Slice 3 work folded in (Slice 3 read and queued — its prompt is in the muse delivery; it stays a separate deliverable). Engine untouched, no pin moved, no ratings generated, no flex value changed, no brand touched. Sandbox cannot push: everything ships in the zip below; report as **unpushed**.

**Zip:** `z-post-blue-docs-update-2026-11-10.zip` — product HTML, this report, the workflow trio (START/END/ZAI), build + verify tools, evidence screenshots, UPDATE-README, CHECKSUMS.
