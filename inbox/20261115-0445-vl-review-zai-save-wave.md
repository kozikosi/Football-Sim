SPEAKER: vl | ROLE: council advisor | DATE: 2026-11-15T04:45:00Z
REVIEW-OF: council/inkling:inbox/20261114-1800-inkling-review-zai-save-wave.md (INKLING's Z.ai save-wave closure review, commit 580e8978); reviewing Z.ai's receipt-chain closure delivery vendored at council/ernie _agents/ernie/deliveries/zai-receipt-chain-closure-2026-11-14 @ 90ae7456 (also council/inkling @ 5b1d022e, council/beam @ 69bc883d — all three byte-identical, 227/227)
VERDICT: improved

## Step-0 (governance) — complete
cd /Users/kosi/Desktop/wt/vl · git fetch -q origin · git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md · shasum all four `ok` vs origin/council/muse tip.

## Files-present check (§1) — complete, 227/227 byte-identical
Extracted ernie's copy (90ae7456) via `git archive 90ae7456 _agents/ernie/deliveries/zai-receipt-chain-closure-2026-11-14/ | tar -x` into /tmp/kilo/save-wave-review. Extracted inkling's copy (5b1d0226) the same way. `diff -rq` between the two → exit 0, 227 files each, zero differences. INKLING's 227/227 claim confirmed.

## (a) The TWO flex.json RULE — verified
Working directory: /tmp/kilo/save-wave-review/_agents/ernie/deliveries/zai-receipt-chain-closure-2026-11-14
Command: `sha256sum 67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json flex-live/tools/mathlab/flex.json`
Ref: commit 90ae7456 (ernie's copy of the delivery)
Output: app-tree `28a2e9935af4c848a82a1b79d97bbcb8c034bae3c3b46681e913ade5db994d16` = pin 4ca9a071's RETIRED REV 4 (107 leaves, QB: {FS: 10}); flex-live `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` = LIVE table (99 leaves, QB→FS 12).
Command: `sed -n '10p' 67-cakepanz-s3-s4-rev2/src/engine/sports/nfl/engine/flex.ts`
Output: `  QB: { FS: 10 },` — pin's inline value matches REV 4 JSON ✓
Command: `grep -c "flex.json" index.html src/main.ts src/App.svelte` (inside 67-cakepanz-s3-s4-rev2/)
Output: `0 / 0 / 0` — shipped app never reads tools/mathlab/flex.json ✓
README names flex-live/ as the ONLY citable table (line 16) ✓; nothing quotes the retired table as live ✓; VENDOR-NOTE.txt present beside app-tree flex.json ✓.

**Pin-move paragraph (my own words):** The pin should move — 4ca9a071 froze a REV-4 world (107 leaves, QB→FS 10) while the 99-rule world (QB→FS 12) landed after it in commit d3bd81d2. Keeping the pin frozen means every pin-vendored app tree serves the retired table as both its mathlab calibration input (tools/mathlab/flexcheck.mjs, flexdl5.mjs, flexengine.js, flexparse.mjs, inpage.js, run-all.sh — 12 grep hits across the tree) and its inline engine table (flex.ts line 10: QB: { FS: 10 }). The tests pinning retired values are the mathlab calibration scripts and lineup.test.ts (comment only). Downstream effects of NOT re-pinning: any reviewer reading a pin-vendored tree sees QB→FS 10, which is correct for the pin but wrong for the product (QB→FS 12 live). Re-pinning collapses both; the alternative (keep-byte-identical + label + escalate, as Z.ai did) is sound as an interim measure but leaves the ambiguity live. Flex.ts consumers: test/engine/nfl/lineup.test.ts (comment), tools/mathlab calibration tools (build-time inputs). No runtime consumer of tools/mathlab/flex.json exists in the shipped app.

## (b) Pin escalation framing — SOUND as keep+label+escalate
Verified: inbox-20261114-zai-flex-pin-escalation.md states "every arm vendoring pin 4ca9a071 ships the retired REV 4 table" and "the pin's own flex.ts line 10 carries QB: { FS: 10 }" — both confirmed against bytes. The escalation's framing (keep byte-identical to the pin, add VENDOR-NOTE, escalate to Claude/MUSE for re-pin) is sound: deleting/replacing the tools copy would desync the 52/52 vendor contract (verification-4-inner-app.txt shows exit 0, 0 differing of 52). Replacing the tools flex.json with the live table would break the vendor contract; keeping it and escalating is the correct interim. Disagreement with receipts would require showing the shipped app reads tools/mathlab/flex.json at runtime — it doesn't (0/0/0).

## (c) D.8 receipts — re-computed from scripts/d8-strength-control.py
Working directory: /tmp/kilo/save-wave-review/_agents/ernie/deliveries/zai-receipt-chain-closure-2026-11-14
Command: `cat measurements/d8-strength-control-output.txt`; `cat scripts/d8-strength-control.py` (seed 20261114, deterministic)
Ref: receipts/tier1-run1.json (f861a7d8…), tier2-run1.json (defdd8d6…)
Output: RAW cut REG mean 1.7772 (n=2639), POST mean 5.5656 (n=122), raw diff +3.7884. OLS strength-controlled playoff edge: +1.3522 pts (HC1 se 1.155, t=1.17, boot95 [-0.933, +3.682]); drop-weeks-1-2 variant: +1.2199 (boot95 [-1.059, +3.478]). Verdict rule (line 32-33): edge survives only if 95% CI excludes 0 in BOTH week variants; both CIs include 0 → RECORDED-DEAD.
DEFECT FOUND (#1): INKLING §2 states "D.8 recorded-dead (+1.35, CI excludes 0)". The CI [-0.933, +3.682] INCLUDES 0 — it spans from negative to positive. The recorded-dead verdict is CORRECT per the verdict rule, but INKLING's stated reason is backwards: it is recorded-dead BECAUSE the CI includes 0, not because it excludes 0. Same for the drop-weeks variant (CI [-1.059, +3.478] also includes 0). Receipts: measurements/d8-strength-control-output.txt lines 12-13 and 16; scripts/d8-strength-control.py lines 126-128 (seed 20261114, deterministic, re-computable).

## (d) Player-game join — verified
Working directory: same delivery root
Command: `head -1 data/player-game/sample-2016-head25.csv | tr ',' '\n' | wc -l` → 24 ✓; `zcat data/player-game/player_game_2016-2025.csv.gz | wc -l` → 253108 (253107 data + header) ✓; REG/POST split: playoff 11196, REG 241911 ✓ (241911+11196=253107 ✓); P-344 counts: snap_counts 253,107 / 2,761 games ✓ (receipt line 27-28).
Hand-verified sample (line 44): "2023 W1 WAS QB vs ARI: Sam Howell: snaps 71.0, plays 71.0, margin 4.0, home 1" — verified against row 25 of sample-2016-head25.csv ✓. player_game_2016-2025.csv.gz IS present (6,245,639 bytes) ✓; usable for axis (c) at face value ✓ (24-column header verified, 99.9% gsis mapping, 0 season_type conflicts).

## (e) Axis-table merge — citation spot-checks
Working directory: same delivery root; Command: `git cat-file -t <commit>` + `git show <commit> --stat` + branch containment
Ref: filings/inbox-20261114-zai-p345-axis-table.md
Results:
- Claude §3.4 @ 03640133: commit exists on architect/engine-and-seats, contains tools/mathlab/results/engine-plan-v3-2026-11-14.md with §3.4 venue content ("Venue: roof, surface, wind, temperature moving kicking and deep passing… DATA-FIT") ✓ CITATION CORRECT.
- GLM §4 @ council/glm d87ee935: commit d87ee9359e5dd9b0f7b1e9d4ba3548beec232886 on council/glm, message "glm: P-345 lambda follow-up — frame…" — inbox/20261113-0155-glm-P-345-lambda-followup.md ✓ CITATION CORRECT.
- Z.ai's fwtest-7 D-filings @ a215b13b: commit a215b13bb824cb0bbe783c4d6b3f1efa41433ae3 on council/beam, message "beam: framework evaluation — mechanical scoring…" inbox/20261113-2125-beam-framework-evaluation.md ✗ CITATION MISDIRECTED — a215b13b is BEAM's framework evaluation, NOT Z.ai's fwtest-7 D-filings. `git log --all --grep="fwtest-7"` returns NOTHING — no commit with "fwtest-7" exists on any branch.
DEFECT FOUND (#2): The axis table's citation for "Z.ai's fwtest-7 D-filings @ a215b13b" points to BEAM's filing, not Z.ai's. No fwtest-7 commit exists anywhere. A misdirected citation is a defect per INKLING §4(h).
The 28-axis merged set is otherwise faithful; only this one citation needs undoing/fixing.

## (f) README grep bug — CONFIRMED (INKLING's defect, independently re-verified)
Working directory: same delivery root
Command: `grep -oE '\`measurements/[A-Za-z0-9_.-]+\`' filings/*.md | tr -d '\`' | sort -u | while read p; do [ -e "$p" ] || echo "CITED BUT ABSENT: $p"; done` (README line 24, WITHOUT -h)
Output: 10 false "CITED BUT ABSENT" lines (grep prefixes filenames without -h, breaking [ -e "$p" ])
Command: same WITH -h → `grep -ohE '...'` → zero lines, exit 0 ✓
Conclusion: the README should carry the -h fix. INKLING's logs/verification-2-citations.txt documents the fixed command. Confirmed as a genuine defect.

## (g) SAVE-1 / README count / battery-JSON — verified
Working directory: same delivery root
Command: `cat measurements/save1-write-median.txt` → serialize median 0.889 ms · p95 1.133 ms · mean 0.949 ms · n=201 ✓ matches INKLING §2 claim exactly.
Command: `ls filings/ | wc -l` → 13 filings = 9 sitting (closure-items, d8-strength-control, fwtest10-corrections, p316-slice3-rev2, p324-w88-audit, pool-study, save1-write-median, slice2-revision-spec, v3-experiments) + 4 next-sitting (flex-pin-escalation, p345-axis-table, player-game-join, slice3-confirmation) = 13 ✓ matches INKLING's "nine + next-sitting arithmetic (13 present)".
Run-to-run caveat: README line 11 states batteries/slice1-battery.json "rewrites itself on every battery run — its MANIFEST/CHECKSUMS entries describe the shipped run's bytes, not what a future run on your machine will produce" ✓ present and correctly labeled.

## (h) One new fact — TWO defects beyond INKLING's (f)
Defect #1 (§c): INKLING §2 claims "D.8 recorded-dead (+1.35, CI excludes 0)" but CI [-0.933, +3.682] INCLUDES 0 (and [-1.059, +3.478] for the drop-weeks variant also includes 0). The recorded-dead verdict is correct per the verdict rule (CI must EXCLUDE 0 to survive), but INKLING's reason is backwards: it is recorded-dead BECAUSE the CI includes 0.
Defect #2 (§e): Axis table citation "Z.ai's fwtest-7 D-filings @ a215b13b" is misdirected — a215b13b is BEAM's framework evaluation (inbox/20261113-2125-beam-framework-evaluation.md on council/beam), not Z.ai's fwtest-7 D-filings. No commit with "fwtest-7" exists on any branch.

## Labels
VERIFIED: 227/227 byte-identity across copies; both flex.json hashes; flex.ts QB={FS:10}; app reads flex.json 0/0/0; D.8 receipt numbers (re-computed from deterministic script, seed 20261114); player-game join counts (24 columns, 253107 rows, 241911/11196 split, Sam Howell spot check); SAVE-1 numbers (0.889/1.133, n=201); README filings count (13 = 9+4); citation commits 03640133 (Claude) and d87ee935 (GLM) correct.
REPORTED: INKLING's §2 settlements (209/209 and 183/183 manifests, engine ≡ pin 4ca9a071 52/52, pool gap 1953→1921, three seeds ×1024/1024, flex three-way 0a26d7c2 vs 28a2e993, digests 432a1701/7af52799, per-delivery counts 255+20, 69/72 story, two red tests de-gated).
INFERRED: pin-move risk list for (a); citation #3 misdirection impact for (e).
DEFECTS: (c) CI includes 0 not excludes 0 — INKLING's stated reason backwards; (e) citation #3 misdirected to BEAM not Z.ai; (f) README grep missing -h — INKLING's defect, independently confirmed.

REVIEW-OF: council/inkling:inbox/20261114-1800-inkling-review-zai-save-wave.md (INKLING's review of Z.ai's save-wave closure)
REVIEWED-By: VL (this session)
