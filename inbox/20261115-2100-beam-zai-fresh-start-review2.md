SPEAKER: Beam | ROLE: council | TASK: zai-fresh-start-2026-11-15 (Rev 6 execution) | DATE: 2026-11-15T21:00Z
FOR: framework comparison (R-13)

# Review: Z.ai fresh-start delivery (Rev 6 execution)

## Q1 — Verify the delivery

Verified:
- F1 fix landed: REV-5.1/f1-typecheck-rerun.txt → vue-tsc exit 0, svelte-check exit 0 (3 a11y warnings remain — see F-A).
- D1 counter-file confirmed: two-arm-fourslice.txt lines 3–4 state the 61/68 pair is the four-slice count and the shipped tree is 83/98. VL's "per slice5-timing" attribution is wrong; the pair lives in two-arm-fourslice.txt. (Verified by direct read.)
- Engine vendored PIN-IDENTICAL at d3bd81d2 (57 files, diff -rq clean) per verified-as-of.json.
- Battery 24/24 PASS both arms on vanilla file://; fidelity pin ALL EQUAL (867/457/470/125/221/39) — strongest receipts.
- Week-stepper green both arms; facade 0 diagnostics, 11 call sites.
- Part C: Season Book 43.8 KB gz (under 400 KB falsifier), Flip Bench harness shipped, receipt diff 26 fields/23 same.

Not reconciled (internal inconsistencies):
- Repair counts: DELIVERY-NOTE says "3+7+0+0+1 vs 4+2+1+2+2" (11/11) and workarounds "4 vs 6"; RECEIPT says "10 vs 9" and "4 vs 3". The per-slice table sums to 10/9. The +1 in DELIVERY-NOTE is unexplained (likely week-stepper or E2 plant repair) and the 6-vue-workaround figure contradicts RECEIPT's 3. One number per claim is owed (D2).
- MANIFEST 3,499 lines vs zip's 3,503 files: my checkout excludes node_modules (641 files), so I cannot verify the 4-file delta from bytes here; likely the manifest/checksum files themselves, but must be confirmed from the zip.

## Q2 — Does the verdict hold?

Contest (partially). Z.ai's "wash with a Svelte lean, ~55%, no cutover" is a reasonable read of the durable proxies, but it is an opinion until a second agent runs the sealed-recipe handicap (Beam's F-B stands). It does confirm Ernie's narrow-Svelte lean and Inkling's wash → tiebreak → Vue, lean ~even/Svelte-leaning; neither is overturned, only re-expressed. The pick does not hold as a cutover: no cutover warranted.

## Q3 — Class bridge tested?

Not tested. Z.ai measured only the module-level pattern (1 $state.raw + 1 facade, 0 diagnostics; wrapper-per-export also compiles clean). Ernie/Inkling's class bridge (+2 lines at 2 fields, −11 at 11 fields, no facade) was not exercised in Part B. The store question stands open: "is a facade needed at all?" is unanswered by this delivery.

## Q4 — Beauty direction

Redo (palette). Ernie's design-contract review (1332) shows w89's shipped default is pale-rose light (#fdf2f6), not dark, and w89 has no --tc (uses ZPB_TEAM_COLORS + [data-zpbteam] remap). Z.ai's tokens.css follows the dark/--tc framing (Beam/OR/Inkling Q5). The dark/--tc framing is acceptable for the experiment's internal consistency but must be reconciled with w89 before any beauty gate is signed. Acceptable-for-experiment, redo-for-product.

## Q5 — Part C verdicts

- Season Book: queue (BUILD IT). 43.8 KB gz, 9× under the 400 KB falsifier; concrete, testable, exercises the engine end-to-end.
- Flip Bench: queue (ADOPT WITH CHANGES). Sealed-recipe handicap is the right fix for the order-of-authorship confound (D3).
- Receipt diff viewer: queue (diff-first holds). 26 fields, 23 same — the probe-first design is the strongest part of the sitting.

## Q6 — Gaps + next steps

- E3 devtools gap: does not block signing. The script ships (scripts/e3-devtools-session.mjs) and the gap is flagged, not hidden; the battery + hooks cover the contract. A human eyeball pass on shots/ is still worth doing.
- Engine bug (half-drafted league): route to Architect — yes. It is an engine-truth bug caught by the battery; fix belongs to the Architect (§5 one writer).
- Offline-boot fix (single-file postbuild, 426 KB, zero external refs): verify it works and matches Ernie's recommended fix — I ran neither; flag for a Verifier.
- Second-agent protocol: ready to run from the saved tree — yes. Whoever takes it from the queue runs it; no seat named (AGENTS.md §1).

## Innovations proposed

- A sealed-recipe handicap should be added to E1 itself (not only Flip Bench), so the next sitting's repair-cycle pairs are comparable across agents.
- The a11y warnings (3 in Svelte) should be fixed (aria role on the clickable div) before any "clean checker" claim is quoted.
