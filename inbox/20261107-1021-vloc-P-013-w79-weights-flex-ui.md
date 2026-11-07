SPEAKER: VLOC | ROLE: council seat | TASK: w79 weights & flex analysis + UI/UX proposals | DATE: 2026-11-07T10:21Z
FOR: P-013 (Owner final weights — protected constant DEFAULT_WEIGHTS), P-017 (flex rules — protected constant FLEX); related UI items P-012/P-015 (Madden rankings/Guide display)
Base build: Football-Sim-PreColors.html sha256 40233d6be00e987c… (657,486 B), VERIFIED via this seat's apparatus.

## Summary (all numbers measured on the REAL engine in headless Chromium; nothing on disk modified)

**Apparatus (reusable):** `_agents/vloc/deliveries/flexcap.mjs`. Installs a configurable DEFAULT_WEIGHTS + flex transform in memory, reports every player who would rather flex than play natural, with 85+ emphasis. `mode=baseline|iterate`, `--weights <json>` to test "change one weight, see downstream effects." Evidence JSONs in `_agents/vloc/deliveries/`.

**Flex — applied as directed (Owner approval: this chat).** Cap at 10: every 6 -> 10, every 12 -> 10 (none existed); leave 0/2/4/10. Proposed table: `_agents/vloc/deliveries/flex-proposed-cap10.json` (44 rules changed; penalties now only {0,2,4,10}; QB->FS stays 10; TE->WR stays 2; CB->WR stays 4). Validated: all penalties in {0,2,4,10}. FLEX is a protected constant (AGENTS.md §3) — the build edit + MERGE-MANIFEST.md re-pin is the Architect's job, same commit.

**Weights — NO self-consistent lower-weight raise set exists (PROVEN, this is the "problem" to report).**
Baseline (Owner weights + flex cap 10) leaves 10 positions with 85+ flex-outs; each requires its natural weight raised to ~479–623 (see weights-flex-proposal-w79.md table). I tested three raise strategies:
1. baseline: 10 positions still violate (CB->WR1, DT->DE1, SS/FS->WR1, MIKE/WILL->DE1/DT1, TE->MIKE/SS/FS, RG/LG->OT1/DT1, C->OG1/OT1/DT1).
2. small raises (TE1 250->300, OG1 400->500): fixes TE/OG but CREATES a new RB->TE1 violation (17 HB flex-outs). Net worse.
3. full collapse (CB1/DT1/SS/FS/MIKE/C/OG1 toward 500-650): shifts violations — OTs and TEs newly flex; still 9 positions violate. Does not clear.
4. iterate (+50 loop): diverges to 3000+; OT1 capped at 500 (anchor) so OTs keep getting pulled off it. Never clears.

Conclusion: under flex cap 10 + leave-2s/4s + upper anchors fixed, every lower-weight raise cascades into a new flex-out. The Owner must choose: (a) raise the offending 4-penalties (contradicts "leave 4s"), (b) accept some stars flex, or (c) accept collapsed weights (~650 for CB1/DT1/SS/FS/MIKE, erasing QB 1000 >> WR1/DE1 650 differentiation). I do NOT fabricate a weights table that doesn't work. Owner's base table stands; exact required raise per position documented for his decision.

**UI/UX (display-only, no game-math):** proposals in `_agents/vloc/deliveries/ui-proposals-w79.md`:
- U-1 Madden Rankings quick buttons (draft-board style) + depth-chart order, keep position groups.
- U-2 mobile footer tab change scrolls to top (setActiveTab robust scroll-to-top).
- U-3 flex-penalty/WINS/ratings displays auto-update from flex.json + DEFAULT_WEIGHTS; no salary displayed.

## Patch form (for the Architect)
All changes are proposals in this seat's lane; the Architect integrates. Where anchors refer to Football-Sim-PreColors.html original lines.

1. FLEX (protected): tools/mathlab/flex.json — every penalty 6->10 and 12->10. Proposed file: _agents/vloc/deliveries/flex-proposed-cap10.json. Requires MERGE-MANIFEST.md re-pin in same commit (Architect).
2. DEFAULT_WEIGHTS (protected): keep Owner's base table; do NOT apply blanket raises (proven unsafe). Flag problem positions + required raises (weights-flex-proposal-w79.md) for Owner decision.
3. UI U-1/U-2/U-3: patch-form anchors in ui-proposals-w79.md (lines 356-367, 439-446, 832-840, 1142, 1250, 1284, 426, 568-580).

## Evidence
- flexcap-baseline-2026-11-07T10-13.json (baseline, cap 10)
- flexcap-baseline-2026-11-07T10-15.json (candidate-2: TE1 300/OG1 500 cascade)
- flexcap-iterate-2026-11-07T10-13.json (iterate divergence)
- candidate-2-og1-te1.json, candidate-3-collapse.json (weight inputs)

## Safe alone? No single piece is product-safe-complete: FLEX and DEFAULT_WEIGHTS are protected constants needing Architect + MERGE-MANIFEST re-pin; UI U-1/U-2 are safe-alone additive UI. Verifier must be a different seat.

## Next
Review chain: needs two reviews by seats other than VLOC, then REVIEWED -> Architect's digest.
