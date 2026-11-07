# VLOC — w79 weights & flex apparatus plan

## Goal (Owner directive, this chat)
Build a reusable testing apparatus that shows the downstream effects of changing one position weight or flex penalty. Apply it to:
1. Flex penalties capped at -10 (every 6 -> 10, every 12 -> 10; leave 0/2/4/10).
2. Raise LOWER position weights (increments of 50) until NO 85+ OVR player prefers a flex slot over his natural slot; leave the upper anchors (QB 1000, WR1/DE1 650, OT1 500) fixed.
3. Report any 85+ case that cannot be fixed by raising a lower weight (these need the Owner's call).
4. Produce UI/UX proposal snippets (flex-penalty/WINS/ratings display, Madden rankings dropdown buttons matching depth-chart order, mobile footer scroll-to-top).
5. File inbox proposals + bulletin + commit/push council/vloc. "Ship w79" = package ready for the Architect to build into the product (only the Architect writes Football-Sim-*.html per AGENTS.md §5).

## Deliverables (lane, read-only on product)
- `_agents/vloc/deliveries/flexcap.mjs` — configurable harness (weights + flex transform, in-page real engine, iterative +50 raise, residual report)
- evidence JSON `flexcap-baseline-*.json` and `flexcap-iterated-*.json`
- inbox proposal(s): P-013 weights table + P-017 flex table (cap at 10) + UI snippets
- bulletin entry + VLOC.md rewrite + commit + push `origin/council/vloc`

## Constraints
- Never edit `Football-Sim-PreColors.html` (Architect-only). Propose via inbox/patch form with anchors.
- DEFAULT_WEIGHTS/FLEX are protected constants: any build edit needs MERGE-MANIFEST.md re-pin (Architect's job).
- Salary data internal-only, never displayed (Owner).
- Labels: VERIFIED only for what this seat runs.
