# REV-5.1 ADDENDUM — the reviewed authoring sitting, corrected (Part 0)

Seat: Z.ai · 2026-11-15 · base: `zai-sitting-2026-11-15-authoring` (hosted on `council/ernie` `731e4e3c`,
vendored on `council/inkling` `85a54b66`) · reviews applied: Inkling (D1–D6), Beam (D7), VL (all-gates
check), Ernie (F1–F7). **This addendum carries the file fixes D1–D4 + D7 + F1–F5. D5/D6 are governance
(no file edits owed; the Owner holds them).** Every fix was applied as an asserted exact replacement
(`scripts/r51_patch.py`, applied 17/17) to a copy of the delivered tree; the patched tree ships in this zip.

## Fix table

| review item | fix applied | evidence in this zip |
|---|---|---|
| **F1 (Ernie) — shipped tree fails type-check in BOTH arms** (`savesService.ts(58,16)` TS2352, byte-identical shared file, introduced by the week-save-hydration work after the type-check receipts were taken) | one-line cast fix `as unknown as { payload: Record<string, unknown> }` applied to arm-vue and arm-svelte (`arm-vue-vapor` predates the week branch — no change owed there, verified); `vue-tsc --build` re-run (exit 0) and `svelte-check` re-run (0 errors, 3 warnings — the same real a11y warnings, no suppression lines) | `f1-typecheck-rerun.txt`; the patched `savesService.ts` in both arms |
| **D1 + F2 (store counts) + F3 (surface tie)** | CATEGORY-WINNERS row 9 and the verdict file now quote BOTH numbers, labelled: shipped store totals **83 vs 98** (`wc -l`, delivered tree) and the four-slice receipt's **61 vs 68** (whole store file, framework-owned by construction); delta 7 → **15 lines as shipped**; surface fact added: the delivered surface is an exact tie **1,249 = 1,249** framework-owned lines, so row 9's tax is 15/1,249 = **1.2%** — the row decides on structure, not volume | patched row 9 + verdict §(1); counts re-verified below |
| **D2 (bundle numbers unlabeled)** | row 1 rewritten: six real figures, one number per claim, each with its method (10,969 four-slice concat / 11,569 four-slice JS-per-file canonical / 10,530 season concat / 10,706 slice-5 JS-per-file / 9,519 vapor concat; Ernie's rebuild 10,588 B noted) | patched row 1 |
| **D3 (34/9 min qualifier lost in compression)** | standing qualifier added at the top of AUTHORING-COST.md's table and into row 18: **after the shared instrumentation exists, the second arm of this pair is ~9 min in either direction** | patched AUTHORING-COST.md + row 18 |
| **D4 (w85 frame)** | struck in README.md ("Live site: **w89**, verified 2026-11-15, gh-pages tip `3e69567c`"), SLICE-DONE-PROPOSAL.md ("The w89 bar") and INNOVATION.md ("the w89 single-file discipline") | patched files, greps below |
| **D7 (Beam — headline lacks the confound caveat)** | verdict file's headline amended to: **"Vue 3 + Vite, narrow, 62% — authoring-cost row confounded by probe inheritance; second agent required to harden."** Also carried into CATEGORY-WINNERS' overall pick | patched verdict HEADLINE block + overall pick |
| **F4 (stale receipts)** | "MEASURED AT (tree/pin)" date-stamps added to `two-arm-lines.txt` (52-file engine = pre-slice-5 tree; shipped is 57 at d3bd81d2), `two-arm-fourslice.txt` (pin 4ca9a071 then; shipped pin d3bd81d2, stores 83/98), `bundles-pin-d3bd81d2.txt` (css 6,598 B = four-slice chrome; shipped chrome 11,473 B; JS 10,969 concat = four-slice; Ernie's shipped-tree rebuild 10,588 B) | stamped receipts |
| **F5 (idiom cost restated)** | "taxes every module-level reactive export forever" struck everywhere; restated as **one facade, paid once** (the compiler forces ONE indirection at the module boundary — Ernie compiled the cheaper form in this project, 0 diagnostics); what survives (the boundary is more awkward than Vue's; real migration cost at call sites) kept; the facade's migration cost is measured in this zip's week-stepper (Part B) | patched row 9 + DECIDES + verdict; Part B receipts |
| **F7b (negative clock named)** | `filings/OT-clock-fix-PENDING.txt` appended: the defect renders a NEGATIVE clock (`p5:Q4 -3:-4`), so the Architect's fix must correct both the clamp AND the negative remainder | stamped filing |

## Counter-file (one point, with receipt evidence)

**VL's attribution of the 61/68 pair is imprecise.** VL says 61/68 is "the framework-owned count (per
slice5-timing)". The receipts say otherwise: the 61/68 pair comes from
`framework-two-arm/receipts/two-arm-fourslice.txt` (lines 16–18: `appStore.svelte.ts 68`,
`appStore.ts 61` — the whole store files of the FOUR-SLICE tree); `slice5-timing.txt` quotes the
CARD SCREEN counts (86 vs 88) and explicitly zeroes new getter wrappers for slice 5
("workaround_lines: 0 … the getter-wrapper idiom in appStore.svelte.ts PREDATES slice 5"). Ernie's F2
is the accurate reading (61 also happens to be the vapor arm's shipped store size; 68 matches no
shipped file). This does not change D1's fix — both numbers get labelled — it changes only WHICH
receipt row 9 cites, and the patched row 9 now cites it correctly. The fix is applied as directed.

## Post-fix verification (run this sitting, receipts attached)

```
$ npx vue-tsc --build      (arm-vue, after fix)   exit 0
$ npx svelte-check --tsconfig ./tsconfig.json --output human  (arm-svelte, after fix)
svelte-check found 0 errors and 3 warnings in 2 files            exit 0
```

Warnings kept verbatim (no suppression): Cards.svelte:57 a11y_click_events_have_key_events ×2,
a11y_no_static_element_interactions, FeedPanel.svelte tabindex — the same real a11y warnings
Ernie's review reported. Gate 5 of SLICE-DONE-PROPOSAL.md ("both typecheckers clean") now holds ON
THE SHIPPED TREE, not only on the receipts.

## What I would change about the reviews' process (delivery-note input)

One process observation, offered as agreed critique: the reviews verified the receipts against each
other (and each other) thoroughly, but only Ernie ran the checkers ON the shipped tree — the one
check that would have caught F1 immediately. A "re-run the gates on the shipped tree, not the
receipts" rule for reviewers would catch this class (stale-receipt) at review time. Filed as a
suggestion, not a demand.
