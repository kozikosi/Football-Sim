# UPDATE-README — w77 (the Owner's weights round)

**From:** Z.ai (High Councillor) · **Type:** PRODUCT WAVE — the Owner spent w77 himself: his permanent opinion on the weights becomes the app's defaults. The shell freeze lifted for this round only; w76 stands untouched as the frozen reference.

## What this wave is

The Owner ran his own salary analysis and set the weights by intuition: "this is what I want to save as my permanent opinion on the weights that the engine should be built around." Wave 77 (a) saves that opinion permanently, (b) makes his weights the defaults the user sees on the Madden Rankings page, (c) re-ranks the Guide's importance chart by the WINS his weights imply — all UI/UX, the engine untouched, exactly as he scoped it ("w77 is primarily a ui/ux shell… even if the game doesn't fully use this math").

## The product

`Football-Sim-Z-post-blue-w77.html` — md5 `74b284e5fda0c21f40714abe7efff670` · 1,831,313 B (base: the w76 bytes `4f363452…`, re-verified from gh-pages 367d8e3e).

What changed (the full itemization is in the build report; the Owner's words are in the intake ledger):

1. **The MODEL preset IS the Owner's table** — QB 1000 · RB1 250 · RB2 100 · FB 25 · WR1 650 · WR2 400 · WR3 100 · WR4 50 · TE1 250 · TE2 150 · TE3 50 · OT1 500 · OT2 300 · OG1 400 · OG2 250 · C 150 · DE1 650 · DE2 300 · DT1 500 · DT2 300 · DL5 150 · MIKE 300 · WILL 150 · SAM 100 · CB1 400 · CB2 250 · NICKEL 100 · DIME 50 · SS 300 · FS 300 · K 50 · P 50. The page boots with it; MODEL WEIGHTS restores it; the lineup editor and the series select ride it.
2. **The weight inputs take 0..1000** (the old 700 ceiling is gone — QB types back exactly).
3. **The Guide re-ranks importance by WINS** — the ladder reads the Owner's table through the standing conversion (1 unit = 0.00254 wins over a 70→90): QB 2.5 · WR1 1.7 · DE1 1.7 · OT1 1.3 · DT1 1.3 · WR2/OG1/CB1 1.0 · the 300s 0.8 · the 250s 0.6 · the 150s 0.4 · the 100s 0.3 · the 50s and FB 0.1. All 32 slots shown, the Owner's order.
4. **The salaries are internal-only** — saved in the lane docs (the intake ledger + `notes/W77-WEIGHTS-OPINION.md`), never in the product bytes, never rendered. Asserted twice: a byte-sweep at build time and a live-render sweep in the battery.
5. **One honest line** on the Guide's board panel: the DRAFTING ladder wears the site's standing weights table · the quarterback anchored at 1000 · the board column reads the simulator's own measured math.
6. The engine keeps its own math — the draft board's per-player WINS and the cutdown math stay engine-truth (Claude lands `slotWinsPerOvr` within ±50 of the table in the 76 Pancakes port; the opinion doc carries the engine-ready JSON).

## The proof

`verify_w77.js` (the w76 battery re-pointed, labels byte-identical, + 15 new V77 assertions) — **99 pass · 0 fail**; the four standing suites re-pointed — 33 + 14 + 14 + 8, all green; **total 168 pass · 0 fail, zero page errors**. Evidence in `shots/`.

## How to install

1. `Football-Sim-Z-post-blue-w77.html` → the gh-pages root (beside its predecessors).
2. `tools/w77/*` → `z-post-blue-wave77-2026-11-06-w77/tools/w77/`.
3. `notes/` + the ledger + the build report + `_agents/zai/*` → the lane on `council/zai` via import-zip.

## Awaiting the Owner's call

Eight interpretation flags in `20261106-w77-intake-ledger.md` — headliners: the three unpriced slots (SS2/FS2/LB4 held at 10), the series surfaces riding his order, the salaries' storage shape (docs-only), TE3 applying without a badge. The five cutover flags also still stand.
