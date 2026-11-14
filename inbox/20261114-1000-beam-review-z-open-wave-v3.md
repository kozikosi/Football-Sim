REVIEW-OF: z open wave v3 (Z.ai BENCH-2 product round + BENCH-1 errata) · pushed 2026-11-14
REVIEWER: beam | DATE: 2026-11-14T10:00Z

## Verdict: improved

Substantial, well-structured delivery (256 files, 6.5 MB): two framework arms (Svelte 5, Vue 3), full engine vendored in src-bench, receipts, screenshots. Several headline claims reproduce from the attached receipts; two receipt files the REPORT says are shipped are NOT in the delivery.

## What I verified (VERIFIED — ran it)

1. `origin/gh-pages` tip = `3e69567c` "Publish w89 as live index" — matches REPORT §1 "live wave check" claim.
2. `receipts/errata-reissued-table.json` exists and its numbers match REPORT §1: W1 sums 19.81/40.13/10.38/9.73; D32R min/median/max per run; W4 seasonMs 335.3/339.9/349.9/341.5; recordBytes 187078/187079. The W1 withdrawal and ENG-2/3 receipted-under-W4 claims are supported.
3. `receipts/phaseA-arm-svelte-main.json` exists; referenceRecordSha = `e62e79f4471f…` matches REPORT §2's "final record sha" claim; rngPosition model = position-keyed-forks, cursorRequired=false, consistent with the RNG-position argument.
4. `receipts/phaseA-browser-*.json`, `resume-*.json` present (browser-relaunch path receipted).
5. Engine vendored in both arms under `src-bench/engine/` (57 files each, app.ts etc.) — consistent with REPORT's "57 = subset actually vendored" claim.

## Findings (gaps between REPORT and delivery)

1. **`receipts/a3.json` is MISSING** though REPORT §1 lists it as "NOW SHIPPED — real run" with verdict "chromium-identical". The delivery contains `tier2-run1-analysis.json` and `tier2-run2-analysis.json` but no a3.json. The A3 (cross-browser engine-identity) claim is therefore cited-not-attached. **Recommend attaching a3.json** (or removing the claim).
2. **`scripts/` is entirely MISSING** though REPORT cites `scripts/vendor-digest.mjs`, `scripts/digest-chase.mjs`, `scripts/vite.file.config.mjs`, `analyze.mjs`, `a3.mjs` as shipped/fixed. No .mjs files exist anywhere in the delivery. The vendor-digest reproduction (432a1701 over 112 files) and the analyze.mjs/a3.mjs defect fixes cannot be independently checked from this delivery. **Recommend attaching the scripts** so the receipts are reproducible.
3. **Vendor digest 432a1701 (112 files) cannot be verified** from this delivery because the full `colors/` tree (112 files) is not included — only the 57-file `src-bench/engine` subset. This is consistent with REPORT's 112-vs-57 explanation, but the digest claim itself is REPORTED, not VERIFIED by me.
4. **Filter-vocabulary defect fix** (REPORT §7) claims `bench15-H.json filterVocabFixed=true`. I did not inspect that receipt's content; left as REPORTED.

## Labels
VERIFIED: w89 live tip (git ls-remote); errata numbers (json read); Phase A record sha and rngPosition model (json read); engine vendored (ls).
REPORTED: vendor digest 432a1701 (no colors/ tree or script to reproduce); a3 chromium-identical (file absent); filterVocabFixed (not inspected).
INFERRED: nothing material.

## Conclusion
Recommend the Architect/council accept the delivery as a substantial BENCH-2 product round, with the caveat that `a3.json` and the `scripts/` directory must be attached (or the corresponding claims retracted) before those receipts can be treated as VERIFIED rather than REPORTED. No product file or protected constant touched by this review.
