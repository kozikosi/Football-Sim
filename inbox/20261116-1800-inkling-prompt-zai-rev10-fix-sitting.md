SPEAKER: inkling as draft; FOR: framework comparison (R-13); TASK: draft the Rev 10 fix sitting for Z.ai | DATE: 2026-11-16T18:00Z

FOR Z.AI — fresh-start Rev 10: the Rev 9 doc-count fixes, and nothing else.

Where the Rev 9 delivery stands: council/inkling @ 51c81adf, `_agents/inkling/deliveries/zai-fresh-start-rev9-2026-11-16/` (739 files, byte-identical to your machine's folder). Inkling reviewed it: **"improved"**. The integrity story is finally real — their gates fail when they must, the C2 prose-manifest hole is plugged (reproduced on a clean copy), the emergency-scale harness refutes the original defect claim (0/2028 real-pool solves, independent re-run), the ladder ships a negative result, the contrast table honestly flags 14 AA failures (mostly w89's own debt), variants byte-identical across repos, zero hex outside the token layer. Warranty: everything below was re-measured on a clean extract this sitting, not taken from the delivery's prose.

Three count-class defects and one unlabelled reference remain. This sitting fixes exactly those, re-runs the gates, and leaves the rest alone.

THE THREE FIXES

1. VERIFY.txt §1 — "expect: 5 manifest(s)" is wrong on this tree. The fixed gate prints 6. (CHECKSUMS.txt · MANIFEST.txt · REV-5.1-addendum/CHECKSUMS.txt · REV-5.1-addendum/MANIFEST.txt · football-sim-vue/CHECKSUMS.txt · football-sim-svelte/CHECKSUMS.txt.) Rewrite the line to expect 6 with the exact gate output quoted, e.g. "GATE RESULT: PASS — 1728 entries verified across 6 manifest(s)" (re-run to get your own count; it may shift by the count of bytes you regenerate — quote whichever you measure, but it must equal the gate's print at packaging).

2. Repo CHECKSUMS entry counts — DELIVERY-NOTE (Part 0) and REV-9-ERRATA 0.7 say "129 vue / 132 svelte entries"; the gate prints 141 / 142 (football-sim-vue/CHECKSUMS.txt: 141 entries, all OK; football-sim-svelte/CHECKSUMS.txt: 142 entries, all OK). Either the counts were stale when written, or the repos were re-pinned after the note was drafted. Either way: the note must match the gate at packaging time. Check both repos; if you regenerate the repo CHECKSUMS.txt (allowed — it is a packaging artifact; do not chase a number by changing pinned bytes), do it LAST after all edits, and paste the gate output with the new numbers.

3. The reproduce reference — DELIVERY-NOTE (Part 0), RECEIPT.md (Part 0), verified-as-of.json (rev51) and VERIFY §4 all say "--reproduce … 12/12 byte-identical, exit 0". That is true ONLY against the Rev 6 published addendum (council/glyph `_agents/glyph/deliveries/zai-fresh-start-2026-11-15/REV-5.1-addendum`). Against the shipped addendum the tool prints 11/12, exit 1 BY DESIGN — SLICE-DONE-PROPOSAL.md carries the deliberate Rev 8 build-green clause; r51-patches.json post_side discloses exactly this. Name the reference explicitly in all four places (e.g. "--reproduce <85a54b66 unpatched tree> <council/glyph Rev 6 addendum> → 12/12 exit 0"), and state the shipped-tree outcome (11/12 exit 1) plainly in DELIVERY-NOTE and RECEIPT — not as a caveat footnote, as a line your reader will actually see.

THEN, from a clean extract (cp -R, no node_modules), paste outputs verbatim for each:
node scripts/gate-manifest.mjs .            → expect the PASS line from §1
node scripts/gate-numerals.mjs . --legacy-scan  → expect CLEAN, 0 hits
node scripts/gate-numerals.mjs . --claims       → expect CLEAN, 0 hits
python3 scripts/r51_patch.py --verify-shipped REV-5.1-addendum   → expect 19/19, exit 0
python3 scripts/r51_patch.py --reproduce <85a54b66 tree> <council/glyph Rev 6 addendum>  → expect 12/12 IDENTICAL, exit 0
python3 scripts/r51_patch.py --reproduce <85a54b66 tree> REV-5.1-addendum  → expect 11/12, exit 1, the SLICE-DONE-PROPOSAL.md clause named
node scripts/p333-validate.mjs               → expect exit 0
node scripts/p333-ladder.mjs                 → expect exit 0
node scripts/emergency-scale.mjs             → expect exit 1 (Scale proof; not a defect to fix)
node scripts/emergency-scale.mjs --fix       → expect exit 0
If any output surprises you, that is the answer — report it, do not tune the gate to it.

Re-freeze order (if any pinned byte moved): edit → regenerate MANIFEST.txt → regenerate CHECKSUMS.txt → re-run gate → the VERIFY §1 count must equal what you quote.

ONE-PAGE FIX NOTE (REV-10-ERRATA.md, Rev 9-errata style): for each of the three fixes, the file, the old → new line, the command and its exit code. Name WHICH incumbent doc line carried each stale claim — the value of this sitting is that your own record ends up trying to replicate the tree. No hyperbole; if a fix is impossible as specified (e.g., the repo counts cannot both mean the same thing), say so in plain text and ship the smallest true version — same rule as Rev 9's premise correction.

OUT OF SCOPE — hard fences:
- No edits to the engine, lineup.ts/flex.ts/slots.ts, any test, or any pin (`d3bd81d2` stays; 2773.0387 stays named-as-measured). The Architect integrates PROPOSAL-PATCH-lineup-emergency.md and the P333 FB→TE 6→2, not you.
- No w89 edits, no gh-pages pushes, nothing for Wave 90.
- No palette ruling: Variant L remains the direction-labelled candidate, Variant D remains the labelled experiment; CONTRAST-TABLE.md stays as-is — the failing cells (dark --text, gold display cells) wait for the Owner's contrast ruling, which is owed and is not yours.
- No sealed-bench re-run in your sandbox (you authored the recipe; your run was one author-adjacent data point, like inkling's). The blind run is owed by MUSE/Ernie/Inkling. Do not touch the recipe; do not "improve" it; do not cite your 0.5 ratio as a verdict.
- No framework ruling of any kind: the pick stays the Owner's; WASH stands; do not re-litigate first-try greens.
- week-sb-game: the note stays, nothing merges until the Owner rules.
- The emergency-scale harness stays exactly as filed; the FB→TE 6→2 stays a filing.
- REGEN-MANIFEST.md stays available for KG/MUSE; the re-cut happens when the Owner or KG calls it, not on this sitting's own schedule.

WHAT SHIPS: the three fixed docs; the re-pinned CHECKSUMS (if touched); the clean-extract gate outputs; the one-page fix-note. The Owner reads it in one sitting; the delivery's own argument survives both fixes and receipts.

Honest first: the "improved" verdict stands on your habit of naming your own failures. This sitting is that habit pointed at three lines of your own prose. If anything above is wrong — a count you measure differently, a reference you find missing, a gate that surprises you — that is the answer; report it verbatim, not a tidy justification.
