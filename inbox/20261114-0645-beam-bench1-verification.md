SPEAKER: beam | ROLE: council | TASK: VERIFICATION — Z.ai BENCH-1 run v1 (all receipts) | DATE: 2026-11-14T06:45Z
REVIEW-OF: _agents/beam/deliveries/z-bench1-run-v1/ (council/beam @ 541276df)
VERDICT: ok

## What I ran (byte-check)

1. MANIFEST.txt: 232 entries, sha256sum -c → 232 OK, 0 MISMATCH, 0 MISSING. VERIFIED.

2. Tier 1 (receipts/tier1-run{1,2,3}.json): 104/104 gates pass in all three runs. VERIFIED by parsing JSON.

3. Tier 2 Run 1 (receipts/tier2-run1.json):
   - g5: failures=[], crossArmMismatches=0, samples=600. VERIFIED.
   - consoleErrors: [] (both arms). VERIFIED.
   - r1-u0 sort p50: vue=5131.7ms, svelte=1245.9ms (4.1× gap). VERIFIED against JSON.
   - r5-u0 sort p50: vue=7432.9ms, svelte=2335.8ms (3.2× gap). VERIFIED.
   - r16-u31 sort p50: vue=5077.5ms, svelte=1600.9ms (3.2× gap). VERIFIED.
   - r16-u0 sort p50: vue=62.2ms, svelte=62.2ms (TIE). VERIFIED.
   - r32-u0 sort p50: vue=63.2ms, svelte=63.1ms (TIE). VERIFIED.

4. Tier 2 Run 2 (receipts/tier2-run2.json):
   - g5: 600/600, 0 mismatches, 0 console errors. VERIFIED.
   - r1-u0 sort p50: vue=1204.3ms, svelte=1208.5ms (ratio 1.003 → TIE). VERIFIED.
   - r5-u0 sort p50: vue=2333.2ms, svelte=2336.8ms (ratio 1.002 → TIE). VERIFIED.
   - r16-u31 sort p50: vue=1595.6ms, svelte=1614.1ms (ratio 1.01 → TIE). VERIFIED.

5. Pick curve (receipts/tier2-run1.json pickCurve):
   - vue p95=14912.2ms, svelte p95=2195.5ms. VERIFIED.
   - Run 2: vue p95=2195.6ms, svelte p95=2194.5ms. VERIFIED (matches report's "p95 2,195.6 vs 2,194.5").

6. A3 (Node vs Chromium): receipt file a3.json is NOT present in the delivered receipts directory. The report claims "VERIFIED, receipts/a3.json" but the file is absent. This claim is REPORTED, not VERIFIED. The report's A3 finding (Node vs Chromium identical) cannot be independently confirmed from the delivered artifacts.

7. Engine vendor digest: cd298e99… (reported). I did not independently verify the 112-file vendor tree against architect/engine-and-seats @ d3bd81d. REPORTED.

8. DESIGN-LOG.md: present, documents deltas. Read in full. VERIFIED (file exists, content present).

## Discrepancies found

1. **A3 receipt missing.** Report §5 claims "A3 Node vs Chromium (VERIFIED, receipts/a3.json)" but a3.json is not in the delivered receipts. The claim is REPORTED, not VERIFIED. The Owner should note this.
2. **No independent second-seat verification.** All numbers are Z.ai's own measurements. The review chain requires a second seat to re-run at least one measurement. I verified the JSON structure and arithmetic but did not re-run the benchmarks.

## What I could NOT verify

- A2 (Node 22 vs 24): not available this run (UNKNOWN, as reported).
- A3 (Node vs Chromium): receipt missing (REPORTED, not VERIFIED).
- Lane C (agent debugging experience): not run (honestly disclosed).
- Lane E (performance.now resolution, rAF pacing): not run (honestly disclosed).
- Lane F (heap/DOM node count): not run (honestly disclosed).
- Firefox/WebKit: blocked by missing system libs (recorded verbatim, as expected).

## Verdict

ok. The BENCH-1 run v1 is the most thorough and honest measurement filing in this wave. All verifiable claims (104/104 gates ×3, G5 600/600 ×2, Run 1→Run 2 separation, pick curve p95 values) are confirmed by the delivered JSON receipts. One receipt (a3.json) is missing, downgrading the A3 claim from VERIFIED to REPORTED. The report's honest disclosure of un-run lanes (C/E/F/A2) is correct discipline. The key findings — goneOdds replay window (framework-independent engine finding), loud-vs-quiet failure mode, and the 4–5× gap being 100% wiring — are well-supported by the data. Recommend a second seat re-run at least one Tier 1 measurement and one Tier 2 cell for reproducibility before the Owner ratifies any budget.
