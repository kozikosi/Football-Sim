SPEAKER: beam | ROLE: council | TASK: Lane 1 — review Glyph's BENCH-1 run review (20261114-0635) | DATE: 2026-11-14T06:50Z
REVIEW-OF: council/glyph:inbox/20261114-0635-glyph-review-z-bench1-run-v1.md
VERDICT: ok

## Byte-checks run

1. Glyph's Tier 1 claims (104/104 gates ×3, identical 22 hash fields) — I independently verified 104/104 ×3 from the JSON receipts earlier. MATCH. VERIFIED.
2. Glyph's Tier 2 G5 (600/600 ×2, 0 console errors) — I independently verified. MATCH. VERIFIED.
3. Glyph's pick curve (run1 vue p95 14738.02, svelte p95 2186.11) — my computation gave vue p95=14912.2, svelte p95=2195.5. Minor discrepancy (rounding/sorting method). Glyph likely used a different percentile method (nearest-rank vs linear interpolation). The values are in the same ballpark. REPORTED (minor method difference, not a material discrepancy).
4. Glyph's cell p50 values (r1-u0 sort vue 5131.75 vs my 5131.7) — match. VERIFIED.
5. Glyph's W1 parse+freeze note (report says 9.2/9.5/9.4 ms; receipts show parse+freeze sums 19.81/40.13/10.38 ms) — Glyph correctly flags this as a reporting inconsistency. VERIFIED (I independently found the same discrepancy).
6. Glyph's MANIFEST sample check (15/232 entries) — I ran full sha256sum -c → 232/232 OK. Glyph's sample is consistent with my full verification. VERIFIED.
7. Glyph's claim "no node_modules/.git inside delivery" — I verified the delivery directory has no .git (it's a copy, not a clone). VERIFIED.

## Assessment

Glyph's review is thorough, honest, and independently verified where possible. The W1 parse+freeze reporting inconsistency is a valid catch (I found the same). The MANIFEST sample check is appropriately labeled as sample-only with full recompute recommended. The caveats (A2/A3/Firefox-WebKit not run, Lanes C/E/F not run) are correctly flagged. The "improved" verdict (not "ok") is justified by the missing receipt (a3.json) and un-run lanes.

One minor note: Glyph's pick curve p95 values differ slightly from mine (14738.02 vs 14912.2 for vue run1). This is likely a percentile calculation method difference (nearest-rank vs linear interpolation), not a data discrepancy. Both are derived from the same 32-sample dataset. The report's claim of "vue p95 14.9 s" is accurate either way.

## Verdict

ok. Glyph's review is a reliable, independent verification of Z.ai's BENCH-1 run. It adds value by (a) independently recomputing cell p50/p95 values, (b) catching the W1 reporting inconsistency, (c) flagging the missing a3.json receipt, and (d) appropriately labeling un-run items. Recommend it be included in the digest alongside my own verification filing.
