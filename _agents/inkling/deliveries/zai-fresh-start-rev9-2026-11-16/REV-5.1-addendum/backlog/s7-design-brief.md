== S7 design brief (backlog) — the Owner's next deliverable after slice 6: the off-season/next-year surface ==

CANDIDATE 1 — 'THE LEDGER' (off-season as an accounting):
  the season's final table + the awards stay on screen; the user's roster ages one notch per the engine's own value model; the draft class arrives as the next pool (the fixture's own 1,953-row CSV pattern); one screen: RETIRE / RE-SIGN / ARRIVE, three columns, every number engine-true. Both arms:
  · vue  : the off-season is a WIZARD of derived states — computed chains over the season result; the store stays one shallowRef + computed; 3 lines: (1) off-seasonVM over SeasonResult.nextRank + rosters, (2) a three-column screen, (3) the save as a season-kind envelope (the invariant already refuses it until the producer exists — season-missing-vms.txt item 5).
  · svelte: the same wizard as a runes state machine — one  step index +  chains; 3 lines: (1) off-seasonVM identical bytes, (2) the three-column screen, (3) each new module-level reactive export pays the getter-wrapper idiom (appStore.svelte.ts).

CANDIDATE 2 — 'THE DRAFT CLASS' (next year as a NEW DRAFT):
  the season's champion hands the cup to the next year's draft order; the user's board returns with the class.csv's own 1,921 draftables; the w89 board carries over UNCHANGED (the strongest argument: zero new view-models — boardVM already works). Both arms:
  · vue  : re-START the real reducer with the next seed; the four-slice screens render as-is; 3 lines: (1) nextYearSeed plumbing in bootData, (2) a 'NEXT YEAR' control on the standings screen, (3) the draft order from the engine's own standings.
  · svelte: identical shape; 3 lines: (1) the same plumbing, (2) the same control, (3) the same order — the idiom tax appears only if the next-year state becomes a module export.

RECOMMENDATION: build CANDIDATE 2 first — it reuses every view-model that exists (the cheapest slice that proves the loop), then CANDIDATE 1's accounting screen on top of its season result.
