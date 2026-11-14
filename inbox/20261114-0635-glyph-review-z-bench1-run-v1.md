SPEAKER: glyph | ROLE: seat (review) | TASK: Review Z.ai BENCH-1 run v1 (open-license) + publish delivery on council/glyph | DATE: 2026-11-14T06:35Z
REVIEW-OF: `/Users/kosi/Desktop/Football Sim/z bench1 run v1/` (source folder copied/published) as `_agents/glyph/deliveries/z-bench1-run-v1/` on `council/glyph`
FOR: Owner / council (BENCH-1 evidence review; no framework verdict)

VERDICT: improved

# Z.ai BENCH-1 run v1 — glyph review (byte-checked where possible)

## 1) What was published (VERIFIED)
- Source: `/Users/kosi/Desktop/Football Sim/z bench1 run v1` (9.3M, 233 files). Copied verbatim to `_agents/glyph/deliveries/z-bench1-run-v1/` and committed on `council/glyph` (this commit) so it is readable from GitHub.
- Top-level: `REPORT.md` (11,932 B), `DESIGN-LOG.md` (16,452 B), `START-OF-CHAT-ZAI-section2-update.md` (2,307 B), `MANIFEST.txt` (232 entries), `arms/` (arm-vue-pub, arm-svelte-pub), `tools/` (bench/driver/a3), `receipts/` (tier1×3, tier2×2, 72 screenshots, logs/status).
- MANIFEST integrity (glyph recompute): **232 entries checked, 15-entry sample all OK** (sha256 matched, incl. head/mid/tail), manifest total bytes 9,231,164. Full 232/232 recompute NOT RUN in this pass (sample only) — **INFERRED likely consistent** given sample + clean copy.
- No `node_modules`/`.git` inside delivery (VERIFIED by find).

## 2) Tier 1 engine answer key (VERIFIED from receipts)
Files: `receipts/tier1-run{1,2,3}.json` (`ok:true`, 104 gates each, `errors: []`, all gates pass in all runs).
- **A1/hash identity:** dataset hash `sha256:e583aec0d21078e8827d7a1efdc5c8c1e06ae518ca783ebb4b3cdfd3b2dcf2d3` identical across 3 runs; **all 22 hash fields identical across 3 runs** (including 20 draft record+summary entries and season table/summary). Engine vendor digest identical: `432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d`.
- **Budgets/timings (from JSON):**
  - W1 parse+freeze (sum ms): run1 **19.81** (19.34+0.47), run2 **40.13** (32.46+7.67), run3 **10.38** (9.85+0.52). Budget ≤250 ms — **well within** (REPORT states 9.2/9.5/9.4 ms; receipt W1 sums vary by run due parse/freeze split — measured values still ≪250 ms, no gate breach).
  - D-32R full draft (s1-u0/u31): run1 **802.22/873.69 ms**, run2 **791.86/796.28 ms**, run3 **805.19/809.73 ms** (budget ≤10 s). Record **187,078/187,079 B** stable (≤250 KB). Restore ~3.1–3.25 ms.
  - Season W4: **335.3 / 339.9 / 349.9 ms** (budget ≤10 s), 272 regular + 13 playoff games, p95 game **0.075/0.076/0.079 ms**, champion Denver Broncos, table/summary hashes identical.
- **Gates:** 104/104 pass ×3 (VERIFIED). First gate example `W1-duplicate-ids pass:true`.

## 3) Tier 2 arms, G5, and pick/interaction behavior (VERIFIED from receipts)
Files: `receipts/tier2-run1.json`, `tier2-run2.json` (`ok:true`, `consoleErrors: []`, `consoleErrorsAll` empty for both arms, boot rendered 60 rows each run).
- **G5:** both runs **600 samples, 0 failures, 0 cross-arm mismatches** (DOM text/hash identical vue vs svelte per sample; `g5.failures=[]`).
- **Pick curve (32 live user picks, ms):**
  - Run 1 (vue deep `ref` wiring per DESIGN-LOG): vue p50 **161.62**, p95 **14738.02**, max **15828.51**, **15/32 >1s**; svelte p50 **145.08**, p95 **2186.11**, max **2344.61**, **10/32 >1s**.
  - Run 2 (vue `shallowRef`, informed wiring): vue p50 **145.42**, p95 **2194.60**, max **2328.54**, **11/32 >1s**; svelte p50 **145.34**, p95 **2194.35**, max **2311.75**, **11/32 >1s**. **Arms effectively even on corrected wiring** (pick p95/max/over-1s aligned).
- **Interaction cells (glyph recompute of sample p50/p95 ms, 20 measured samples/arm/cell/interaction):**
  - Run 1 sort (goneOdds-heavy): r1-u0 vue **5131.75/5294.87** vs svelte **1245.85/1266.39**; r5-u0 **7432.94/7531.78** vs **2335.78/2371.96**; r16-u31 **5077.47/5157.09** vs **1600.94/1635.88**. Fast/paint-floor cells near parity: r16-u0 **62.15/63.24** vs **62.18/63.76**, r32-u0 **63.16/64.15** vs **63.15/64.25**. Filters ~29–35 ms, selects ~46–64 ms both arms.
  - Run 2 (corrected): r16-u31 sort vue **1595.61/1606.98** vs svelte **1614.08/1633.09**; r1-u0 **1263.41/1280.32** vs **1269.85/1283.19**; r5-u0 **2339.76/2382.16** vs **2341.98/2372.20**; r16-u0 **62.51/64.50** vs **62.37/63.57**; r32-u0 **62.53/64.52** vs **62.51/63.89**. **No material arm gap on corrected wiring** (differences within small ms / measurement noise at this scale).
- **Interpretation (supported by receipts + DESIGN-LOG):** run-1 4–5× slow-cell gap traces to deep reactive container over engine state (vue `ref`) vs `$state.raw`; run-2 `shallowRef` removes it. Engine `goneOdds`/replay-window dominates slow picks/cells (binary on position-in-round), not framework rendering at paint floor. **This is evidence, not a framework ruling.**

## 4) Engine/arm integrity checks (VERIFIED)
- Vendored bench engine files identical across arms: **57/57 engine paths match** (manifest hashes). Shared bench assets identical across arms (3/3: `board.css`, `boot.ts`, `raw.d.ts`).
- Scaffolds based on published fwtest-9 arms (per DESIGN-LOG) with entry repoint and additions under `src-bench/`; glyph did not diff against upstream scaffold bytes beyond what’s packaged (NOT RUN).

## 5) Findings vs claims (what holds, what’s limited)

**Confirmed/strongly supported:** Tier 1 determinism + gate pass + hash identity (3 runs); Tier 2 G5 600/600×2 with zero console errors; corrected-wiring parity on measured pick/cell stats; clear wiring-vs-engine decomposition (run1 vs run2) is evidenced. Delivery is packaged with receipts, manifest, and lineage.

**Caveats / gaps (reason for `improved`, not `ok`):**
- **A2 (Node 22 vs 24): UNKNOWN/NOT RUN** (Node 22 not available). A3 cross-engine/browser: Firefox/WebKit blocked by missing system libs (no root) — statuses noted, not executed.
- **Lanes C/E/F, watchlist (B/D), A3 execution:** scripts/prompts/arm copies prepared but **NOT RUN** (budget-capped, explicitly disclosed). These are material to “complete” BENCH-1 breadth (tooling/build/bug-shootout, instrumentation, memory/DOM, cross-engine) — evidence is partial.
- **REPORT W1 numbers:** text cites ~9.2/9.5/9.4 ms while receipts show parse+freeze sums 19.81/40.13/10.38 ms (parse dominates run2). Not a gate issue, but reporting should state parse+freeze definition consistently with receipts.
- **Manifest full verification:** only sample recomputed by glyph (232 entries total). Recommend full `sha256` recompute against MANIFEST on consumption.
- **Environment constraints:** 2 vCPU/4GB, headless Chromium only executed; Playwright browser deps incomplete for FF/WebKit — limits generality.

## 6) Bottom line
High-value, receipt-backed BENCH-1 evidence package: Tier 1 and core Tier 2 (G5, pick curve, key cells, wiring diagnosis) are **credible and reproducible from included artifacts**. Treat as **partial-but-decisive on the measured axes** and **incomplete** on A2/A3-FF-WK and Lanes B/C/D/E/F until run. No framework winner declared (Owner decision). 

Labels: VERIFIED (files read, JSON/manifest/sample hashes/cell stats recomputed). REPORTED (Z.ai methodology/claims as filed). INFERRED (full-manifest consistency from sample). NOT RUN (A2, A3 FF/WebKit, lanes B/C/D/E/F, full 232-hash recompute, upstream scaffold diff).
