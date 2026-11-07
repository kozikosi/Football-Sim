# VLOC — w79 weights & flex proposal (Owner directive, 2026-11-07)

## What this is
A tested, reproducible analysis of the Owner's standing instruction:
- flex penalties capped at -10 (every 6 -> 10, every 12 -> 10; leave 0/2/4/10)
- raise LOWER position weights (increments of 50) until NO 85+ OVR player prefers a flex slot over his natural slot
- leave the upper anchors fixed (QB 1000, WR1/DE1 650, OT1 500)
- report any case that cannot be fixed by raising a lower weight ("let me know if they cause a problem")

All numbers come from the REAL engine in headless Chromium against Football-Sim-PreColors.html (sha256 40233d6be00e987c). Nothing on disk is modified.

## Apparatus (reusable)
`_agents/vloc/deliveries/flexcap.mjs` — configurable harness:
- installs a configurable DEFAULT_WEIGHTS table in memory (restored after)
- applies a configurable flex-penalty transform to the engine's flexRule
- reports every player who would rather play a non-natural slot than his best natural slot, with 85+ emphasis
- `mode=baseline`: one-off report with required natural weight to stop each violation
- `mode=iterate`: node-driven loop, raises violating natural weights by +50 until no 85+ flex-outs (detects divergence/cascade)

usage: `NODE_PATH=/Users/kosi/node_modules node flexcap.mjs [html] [baseline|iterate] [--weights <json>]`

This is the standing system for "if I change one player's weight, show me the downstream effects": pass a `--weights` JSON with one slot changed and re-run; the byPos table shows exactly which positions/new players flip.

## Flex decision — applied as directed
Proposed file: `_agents/vloc/deliveries/flex-proposed-cap10.json`
Rule: every penalty of 6 -> 10, every 12 -> 10 (none existed); 0/2/4/10 unchanged. 44 rules changed; penalties now only {0,2,4,10}.
- QB->FS already 10 (unchanged, the Owner's QB-only flex at -10).
- TE->WR stays 2, CB->WR stays 4 ("leave all 2s and 4s").
- This is a PROTECTED CONSTANT (FLEX). Owner approval is this chat. The build edit + MERGE-MANIFEST.md re-pin is the Architect's job (only the Architect writes product/tools changes per AGENTS.md §5/§8). Proposed via inbox.

## Weights decision — NO safe self-consistent raise set exists (PROVEN)
The Owner's base weights (his permanent opinion) were used as the starting point. The apparatus shows:

| position | natural slot | cur weight | 85+ flex-outs | required natural weight to stop | attractor (weight, penalty) |
|---|---|---|---|---|---|
| CB | CB1 | 400 | 19 | > 623.47 | WR1 650, pen 4 |
| DT | DT1 | 500 | 17 | > 622.92 | DE1 650, pen 4 |
| SS | SS | 300 | 9 | > 622.04 | WR1 650, pen 4 |
| TE | TE1 | 250 | 9 | > 269.70 | MIKE 300, pen 10 |
| MIKE | MIKE | 300 | 9 | > 583.67 | DE1 650, pen 10 / DT1 500, pen 4 |
| FS | FS | 300 | 7 | > 622.34 | WR1 650, pen 4 |
| RG/LG | OG1 | 400 | 6/4 | > 479 | OT1 500, pen 4 / DT1 500, pen 4 |
| C | C | 150 | 6 | > 478.95 | OG1 400 pen 0 / OT1 500 pen 4 / DT1 500 pen 4 |
| WILL | MIKE | 300 | 4 | > 580.11 | DE1 650, pen 10 / DT1 500, pen 4 |

Note TE/MIKE/WILL penalties are now 10 (was 6), which is why their required weights dropped vs the pre-cap baseline.

### The incompatibility (the "problem" to report)
I tested three ways to raise lower weights:
1. **baseline (Owner weights + cap 10)**: 10 positions still have 85+ flex-outs (table above).
2. **small safe raises** (TE1 250->300, OG1 400->500): fixes TE and OG, but CREATES a new RB->TE1 violation (17 HB flex-outs) because RB->TE is still pen 10 and TE1 at 300 now beats RB1 at 250 for top RBs. Net: no gain, new problem. (`candidate-2-og1-te1.json`)
3. **full collapse** (CB1/DT1/SS/FS/MIKE/C/OG1 all raised toward 500-650): shifts violations around — OTs and TEs newly flex off OT1/TE1; still 9 positions with 85+ flex-outs. Does not clear. (`candidate-3-collapse.json`)
4. **iterate** (+50 loop until no 85+ flex-outs): diverges into an arms race (weights climb to 3000+, new positions LT/RT/DE enter) and never clears — OT1 is capped at 500 (anchor) so OTs keep getting pulled off it once OG1/C rise.

Conclusion: **under flex cap 10 + leave-2s/4s + upper anchors fixed, there is NO set of lower-weight raises that makes all 85+ players prefer their natural slot.** Every raise cascades into a new flex-out somewhere, because the positions are coupled through free/cheap flexes (OT<->OG free, C<->OG free, RB<->TE, TE<->MIKE/SS/FS).

### Recommendation (Owner decision required)
The three constraints cannot all be satisfied. To get all 85+ players natural, exactly ONE of the following must give:
- **(a)** raise the offending 4-penalties (CB->WR, DT->DE1, SS->WR, MIKE->DT1, etc.) above 4 — contradicts "leave all 4s"; or
- **(b)** accept that some stars still flex (the cleanest small fix is TE1->300 and/or OG1->500, but each pulls another position); or
- **(c)** accept collapsed weights (CB1/DT1/SS/FS/MIKE all ~600-650, erasing the QB 1000 >> WR1/DE1 650 >> ... differentiation the Owner's table was built around).

I do NOT fabricate a weights table that doesn't work. The Owner's base table stands as the proposal; the exact required raise per problem position is above for his decision.

## UI/UX impact (display-only, does not change game math)
Per the Owner: "These do not need to accurately show up in any background math... change anything the user would see in w79 regarding weights or flex penalties."
- Flex penalty displays (`(flex −${pen})` in lineup editor, roster slot dropdowns, lineup advice) are computed from flexPenaltyFor() → auto-update to −10 when flex.json changes.
- WINS displays (draft board "Wins" column, roster "Group scores", Madden Rankings score) are computed from weights/modelWeights() → auto-update when DEFAULT_WEIGHTS changes.
- The weights editor (Madden Rankings page) shows DEFAULT_WEIGHTS as "my weights" default; it should reflect the Owner's table.
- Separate UI proposals (Madden rankings quick buttons + depth-chart order, mobile footer scroll-to-top) are in `ui-proposals-w79.md`.

## Files in this lane
- `weights-flex-proposal-w79.md` (this document)
- `flexcap.mjs` (apparatus)
- `flexcap-baseline-*.json` (baseline evidence)
- `flexcap-iterate-*.json` (divergence evidence)
- `candidate-2-og1-te1.json` / `candidate-3-collapse.json` (cascade evidence)
- `flex-proposed-cap10.json` (proposed flex table)
- `ui-proposals-w79.md` (UI/UX patch-form proposals)
- `inbox/...` (proposal filed for the Architect)
- `bulletin/...` (session entry)
