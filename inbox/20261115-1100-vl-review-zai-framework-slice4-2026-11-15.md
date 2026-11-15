SPEAKER: vl | ROLE: council advisor | DATE: 2026-11-15T11:00:00Z
REVIEW-OF: council/vl inbox/20261115-1045-vl-passthrough-zai-framework-slice4-2026-11-15.md — Z.ai framework slice4 delivery 2026-11-15, `deliveries/zai-pass-through/zai-framework-slice4-2026-11-15/` on council/vl (commit 706eb97b)
VERDICT: ok (no defects found; two Architect findings reported inside the delivery, VL reports them, does not fix)

## Step-0 (governance) — complete
cd /Users/kosi/Desktop/wt/vl · git fetch -q origin · git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md · shasum all four `ok` vs origin/council/muse tip.

## Files-present check (§1) — complete, 432/432 present
Working directory: /Users/kosi/Desktop/wt/vl/_agents/vl/deliveries/zai-pass-through/zai-framework-slice4-2026-11-15
Command: `sha256sum -c CHECKSUMS.txt` at folder root; `cd _agents/zai/deliveries/zai-sitting-2026-11-15 && sha256sum -c CHECKSUMS.txt`
Ref: commit 706eb97b (this push)
Output: both exit 0, all OK. 432 files delivered (431 delivery files + 1 top-level CHECKSUMS.txt; the sitting itself re-verified 185-entry inner MANIFEST + CHECKSUMS-slice1/2/3-4.txt normalized to pure sha256 format — 7/8 stale md5s replaced this sitting).

## Verification lane — all checks run against pushed bytes

### Engine byte-identity vs pin 4ca9a071 — 52/52, VERIFIED
Working directory: same delivery root
Command: `diff -rq src/engine <(git archive 4ca9a071 -- colors/src | tar -x)` inside `67-cakepanz-s3-s4-rev2/`
Ref: pin 4ca9a071 (origin/architect/engine-and-seats)
Output: exit 0, 0 differing files; 52 files on both sides. The engine is the vendored pin; neither arm edits `src/engine/**` (per ZAI.md standing rule).

### Flex.json hashes — VERIFIED (matches both flex-pin filings)
Working directory: same delivery root
Command: `sha256sum 67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json flex-live/tools/mathlab/flex.json`
Output: app-tree `28a2e9935af4c848a82a1b79d97bbcb8c034bae3c3b46681e913ade5db994d16` = pin's RETIRED REV 4 (107 leaves, QB→FS 10); flex-live `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` = LIVE table (99 leaves, QB→FS 12).
Command: `sed -n '10p' 67-cakepanz-s3-s4-rev2/src/engine/sports/nfl/engine/flex.ts`
Output: `  QB: { FS: 10 },` — pin's inline engine table matches its REV-4 JSON ✓
Command: `grep -c "flex.json" 67-cakepanz-s3-s4-rev2/index.html 67-cakepanz-s3-s4-rev2/src/main.ts 67-cakepanz-s3-s4-rev2/src/App.svelte`
Output: `0 / 0 / 0` — shipped app never reads tools/mathlab/flex.json ✓

### Two-arm framework test (R-1) — receipts present, slope FLAT
Working directory: `framework-two-arm/`
Command: `cat framework-two-arm/receipts/two-arm-fourslice.txt` + `cat receipts/two-arm-bundles.txt` + `cat PREFERENCE-INTERVIEW.md`
Ref: receipts/two-arm-fourslice.txt, receipts/two-arm-bundles.txt, PREFERENCE-INTERVIEW.md
Output:
- Lines/framework-owned: svelte 347 (main 6 + App 26 + appStore 68 + Board 61 + TeamSelect 35 + Saves 72 + FeedPanel 79), vue 332 (main 5 + App 30 + appStore 61 + Board 57 + TeamSelect 34 + Saves 71 + FeedPanel 74) — shared identical bytes excluded (bootData 74 + savesService 71 + feedVM 160 + abbr 20 + ink 35 + feed.css 106 + engine 52 files + fixture.json)
- Cumulative: svelte 103→202→248→347 · vue 99→198→244→332 (vue −1.6% to −4.3% at every stage, FLAT, no widening, no closing)
- R (mean marginal vue/svelte) = 0.9778; R_total (cumulative vue/svelte at slice 4) = 0.9568; both inside registered 0.85–1.18 band → INSIDE THE BAND, NO SIGNAL. Falsifier does NOT fire.
- Bundle: four-slice JS-only gz delta −10,946 B toward Svelte (vue js gz 114,553 − svelte js gz 103,607 = 10,946 B). Method labelled this sitting: totals = gzip -9 of concatenated js+css via stdin; per-file gzips carry 18–19 B name header and do NOT sum to totals (per-file sum shown beside each total). JS-only delta stated explicitly: 104,481 − 92,912 = 11,569 B (the −11.6 KB bundle conclusion built on THIS number).
- Type-check: svelte-check 3 errors + 1 warning exit 1; vue-tsc 3 errors exit 2 — both fixed in one pass (verbatim in receipts/fourslice-typecheck-first-run.txt).
- Probe `two-arm-fourslice.mjs`: ALL FOUR-SLICE LAWS PASS both arms · 0 console errors · 0 blocked requests · 390 px clean on all four screens · keyboard Tab reaches nav · LOAD navigates to board (the one behavioral bug found and fixed identically on both arms).

### Bundle method fix (receipt defect #1 fixed this sitting)
`two-arm-bundles.txt` METHOD block now labels: per-file figures = gzip -9 of each asset separately (name header included); totals = gzip -9 of concatenated js+css via stdin (one stream, one dictionary, no name header). Per-file gzips therefore do NOT sum to totals; per-file sum shown beside each total. Reproducibility block pins commands + versions (node v24.22.3, npm 11.19.1, vite 7.3.8 re-run resolving ^7.3.6 → 7.3.8, output verified byte-identical) + per-asset sha256 for both arms.

### Architect findings (FOR Claude — VL reports, does not fix)
Two findings were filed inside this same delivery by Z.ai:
1. `colors/src/sports/nfl/app/feed.ts` l.59–60 `clock()` maps OT starts (≥3600s) to Q4 with negative `900*q−secs` remainder — fix is one line at the next re-pin (R-2 just ruled `d3bd81d2` live; the pin move is the sitting to land it).
2. vite dist `crossorigin` on `<script>`/`<link>` tags breaks vanilla `file://` boot (4 CORS errors, app never mounts, zero blocked requests — dist IS self-sufficient, only the attribute wrong for offline use) — fix: strip `crossorigin` in post-build for offline artifacts, or a `file://` build target.

### Flex-pin escalation carry
Pin serves REV 4 in engine code too (`4ca9a071:flex.ts` = `QB: { FS: 10 }`, `d3bd81d2:flex.ts` = `QB: { FS: 12 }`). Pin move is a PAIR move (flex.ts + its companion rules-test; 99-vs-107 count and tier-set splits are hard assertions in `lineup.test.ts`). R-7 ruling carried (ILB flex asymmetries deliberate — "the ILB is the more valuable player and so flexes for less"). Pin-migration table in filings (fixed draft seed 1115, Chicago Bears — 1/32 user picks identical, QB→FS 10→12, 24→21 flexed picks, same-player-same-slot pick −900 → −3,300 wins).

### λ estimator — design only, no fitting code (by design §6b.4), VERIFIED as design
Per-cell fold densities: REG pooled 2,639 games / POST 122 games; minimum resolvable cell ≈ 541 games; REG pooled clears 4.9×, POST never at this data volume — "a result, not a failure"; snap percentages 100% filled vs raw play counts (n_off_plays 21.9%, n_def_plays 18.9%); nfl_id/gsis_id bridge uniform 23,862–26,615 per season, no season dropped. λ̂ and CI values UNKNOWN (not in this tree by design; the REPORTED union "wider than the window" is the only admitted fact).

## Labels
VERIFIED: CHECKSUMS.txt exit 0 (both levels); inner sitting MANIFEST exit 0; engine 52/52 byte-identical to pin 4ca9a071; both flex.json hashes; flex.ts QB={FS:10}; app reads flex.json 0/0/0; two-arm fourslice receipt (lines, slope, R, R_total, probe laws); bundles.txt method + delta + reproducibility block; PREFERENCE-INTERVIEW.md verdict (Svelte 5 narrowly, twice-measured, confidence 70%); both Architect findings read verbatim.
REPORTED: all settled §0 items (five ties, pin migration table, Slice 4 re-run, residues, Owner's R-1…R-12 rulings) — not re-measured, per standing rule.
INFERRED: the pin-move pair-move consequence (flex.ts + rules-test must move together); w88/w89 ZPB_SLOTS_WINS tables inherit pin-era Wins values (the table's presence VERIFIED in previous sitting's gh-pages check; inheritance reasoned).
DEFECTS: none found in this delivery. The two Architect findings above are reports, not defects in this delivery — VL does not fix them (no engine or build-config edits).
NOT DONE BY DESIGN: no fitting code for λ (§6b.4); no re-run of either arm's build by VL (receipts present, not independently verified).

REVIEW-OF: _agents/vl/deliveries/zai-pass-through/zai-framework-slice4-2026-11-15/ (Z.ai framework slice4 delivery 2026-11-15)
REVIEWED-By: VL (this session)
