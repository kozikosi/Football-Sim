# W77 BUILD REPORT — the Owner's weights become the app's defaults

**Wave:** 77 · **Date:** 2026-11-06 · **Seat:** Z.ai (High Councillor) · **Type:** product wave (the shell freeze lifted by the Owner's own directive)
**Base:** `Football-Sim-Z-post-blue-w76.html` · md5 `4f363452a4ad33709244ca08d4ab3b00` · 1,830,164 B (the frozen reference — UNTOUCHED, re-verified from gh-pages 367d8e3e before the first patch and unchanged after)
**Product:** `Football-Sim-Z-post-blue-w77.html` · md5 `74b284e5fda0c21f40714abe7efff670` · 1,831,313 B (+1,149 B)

## What changed (all asserted edits, `zpb_w77.py`)

| # | Edit | Owner ask |
|---|---|---|
| E1 | `ZPB_SLOTS_W` — the site's displayed weight table — is now **the Owner's own 32-slot table** (his permanent opinion, 2026-11-06): QB 1000 · RB1 250 · RB2 100 · FB 25 · WR1 650 · WR2 400 · WR3 100 · WR4 50 · TE1 250 · TE2 150 · TE3 50 · OT1 500 · OT2 300 · OG1 400 · OG2 250 · C 150 · DE1 650 · DE2 300 · DT1 500 · DT2 300 · DL5 150 · MIKE 300 · WILL 150 · SAM 100 · CB1 400 · CB2 250 · CB3 (NICKEL) 100 · CB4 (DIME) 50 · SS 300 · FS 300 · K 50 · P 50 — plus SS2/FS2/LB4 held at 10 (unpriced by the Owner; ledger flag 1). The comment carries the provenance law: salaries internal, never displayed. | W2 |
| E2 | `modelWeights()` returns the table **1:1** — the 700 rescale is gone; the MODEL preset, the boot state, the Position Rankings series select and the lineup editor's group weighting all ride the Owner's numbers. | W2 |
| E3 | The weight inputs take **0..1000** (the badge title, the max attribute, both clamps). QB types back exactly 1000. | W2 |
| E4 | **The Guide ladder (`zpbPosRankHTML`) reads the Owner's table** (`zpbSlotWins70to90`) instead of the engine — the importance re-rank the Owner asked for, live on the Guide page, every one of the 32 slots shown. | W3 |
| E5 | **The cumulative series surfaces ride the same order**: the dead guide chips (`zpbSeriesHTML`), the Position Rankings series dropdown (`zpbSeriesData`) and the rankings-page series select (`zpbSeriesSteps` — P and FB stay outside it, the W13-1 law). Ledger flag 7. | W3 |
| E6 | **One honest disclosure line** on the live board panel (READING THE DRAFT BOARD · WINS): the DRAFTING ladder wears the site's standing weights table · the quarterback anchored at 1000 · the board column reads the simulator's own measured math. No colons/semicolons (the dot law held). | W5 |
| E7 | The retired guide consts (dead since the w75 rebuild) keep coherent text — the stale REWEIGHT-BRIEF pointer is gone from the bytes entirely. | housekeeping |

## The engine — deliberately untouched

The sim's internal `slotWins` math is **measured off the matchup model at boot, not a coefficient table** — there is nothing easy to flip without re-engineering the model, so (per W5) the engine keeps its own math. Three engine reads remain, all deliberate: the `zpbSlotWins70to90` fallback (never fires — every slot is priced), the dead values card, and the **CUTDOWN ladder** (the cut math — veto (b) territory, untouched). The draft board's per-player WINS column stays engine-truth; the Guide's charts carry the Owner's WINS; the disclosure line tells the user exactly that.

## The WINS values for the Guide chart (Z.ai's calculation)

Conversion: the site's standing unit (w65 law, unchanged) — 1 weight unit = 0.00254 wins over a 70→90 upgrade.

QB 2.54 · WR1 1.65 · DE1 1.65 · OT1 1.27 · DT1 1.27 · WR2 1.02 · OG1 1.02 · CB1 1.02 · OT2/DE2/DT2/MIKE/SS/FS 0.76 · RB1/TE1/OG2/CB2 0.64 · TE2/C/DL5/WILL 0.38 · RB2/WR3/SAM/CB3 0.25 · WR4/TE3/CB4/K/P 0.13 · FB 0.06 · SS2/FS2/LB4 0.03

The Guide renders one decimal: QB 2.5 · WR1/DE1 1.7 · OT1/DT1 1.3 · the 400s 1.0 · the 300s 0.8 · the 250s 0.6 · the 150s 0.4 · the 100s 0.3 · the 50s and FB 0.1.

## The proof

| Suite | Result |
|---|---|
| `verify_w77.js` (the w76 battery re-pointed, labels byte-identical, + the V77 block) | **99 pass · 0 fail** |
| w69_owner (re-pointed) | 33 pass · 0 fail |
| w69_dropdowns (re-pointed) | 14 pass · 0 fail |
| w68_names_w69 (re-pointed) | 14 pass · 0 fail |
| w67_teams_w69 (re-pointed) | 8 pass · 0 fail |
| **Total** | **168 pass · 0 fail · zero page errors** |

The V77 block (15 new assertions — every new surface ships with an assertion, REV 20 rule 4): the MODEL preset matches the Owner's 35-slot table 1:1 · the page boots with QB input 1000 · the inputs take 0..1000 · QB types back exactly · K 50 applies · the ladder shows 32 slots led by QB at 2.5 wins · the top-8 re-rank is the Owner order · WR1 then DE1 at 1.7 · FB and K at the bottom · the disclosure line renders · the series dropdown re-ranks QB, WR1, DE1 · the series steps ride the Owner order (30 steps, P and FB out) · the Position Rankings buttons wear the Owner WINS · **no salary text renders anywhere on the page**.

Evidence: `shots/weights_owner_table.png` (the panel with the Owner numbers, total 8605) · `shots/guide_ladder_owner_order.png` (the re-ranked ladder) · `shots/board_disclosure.png` (the two-scales line) · `shots/weights_specialists.png`.

## Delivery

1. `Football-Sim-Z-post-blue-w77.html` → the gh-pages root, beside its predecessors.
2. `tools/w77/*` → `z-post-blue-wave77-2026-11-06-w77/tools/w77/`.
3. `notes/W77-WEIGHTS-OPINION.md` + this report + the intake ledger → the lane (`_agents/zai/…` via import-zip).
4. `20261106-w77-intake-ledger.md` — the Owner's words itemized (W1–W6) with **eight interpretation flags** awaiting his veto.
