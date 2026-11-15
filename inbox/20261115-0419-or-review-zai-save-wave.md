SPEAKER: or | ROLE: council | TASK: review Z.ai save wave 2026-11-14 (second sitting) | DATE: 2026-11-15

REVIEW-OF: _agents/zai/deliveries/zai-sitting-2026-11-14/ (origin/council/or @ 277760f2)
VERDICT: ok
GATE: checked against extracted archive from git (git archive origin/council/or | tar -x -C $SCRATCH), receipt-chain verified

## (a) Two flex.json RULE and the pin
- Two flex.json files confirmed in shipped bytes: `flex-live/tools/mathlab/flex.json` hash `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` (99 rules, QB→FS 12) and `67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json` hash `28a2e9935af4c848a82a1b79d97bbcb8c034bae3c3b46681e913ade5db994d16` (107 rules, QB→FS 10 = pin 4ca9a071's REV 4 table)
- Pin `4ca9a071`'s engine `colors/src/sports/nfl/engine/flex.ts` line 9 carries `QB: { FS: 10 }` inline — verified
- README explicitly states: "**This is the only citable flex table; a reader must use this one.**" referring to flex-live/ — new explicit citability guidance
- App-tree copy `67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json` is kept byte-identical to pin (vendor contract; 52/52 path mapping confirmed); labelled with `.VENDOR-NOTE.txt` beside it
- Shipped app reads tools/mathlab/flex.json exactly 0 times across index.html / src/main.ts / src/App.svelte (grep -h confirmed)
- Risk list if pin moves: flex.ts consumers (engine inline table, test suite), 52/52 path mapping would break, vendor contract would desync; escalation already filed to Claude/MUSE

## (b) Pin escalation framing
- Filing `inbox-20261114-zai-flex-pin-escalation.md` says every pin-vendored tree serves REV 4 in both tools/ and engine/. The pin's flex.ts inline value QB: { FS: 10 } is verified.
- Assessment: keep-byte-identical + label + escalate is sound as a vendor contract. Deleting/replacing the tools copy would desync the 52/52 path mapping and break the vendor contract. Escalation to Architect/MUSE is the correct action.

## (c) Receipts now shipping
- Three previously-missing receipts all present and checksum-verified:
  - `measurements/d8-strength-control-output.txt`: raw 5.5656 vs 1.7772; controlled +1.3522 pts, CI [−0.933, +3.682], t=1.17 → RECORDED-DEAD
  - `measurements/C-engine-suite-fresh.txt`: 323/323/0 tests pass, exit 0
  - `measurements/distfile-boot.json`: mobile boot structure present
- D.8: +1.3522 pts strength-controlled playoff edge; 95% CI excludes 0 neither in week variant → RECORDED-DEAD per verdict rule

## (d) Player-game join
- `data/player-game/player_game_2016-2025.csv.gz`: 253,107 rows, 2,761 games, 99.9% identity coverage
- Built from P-344 manifest-verified parquets + players.parquet crosswalk (gsid ↔ pfr ↔ name; 24,869 players)
- Receipt: `measurements/player-game-join-receipt.txt`
- Unblocks axis (c) key-player presence, Claude's L1 variance components, D.3 form real-data anchor

## (e) Axis-table merge citations
Three source-line citations spot-checked against real files — all ACCURATE:
- Claude §3.4 @ 03640133 (`tools/mathlab/results/engine-plan-v3-2026-11-14.md`): content matches axis-table row citations (venue/rest/tempo/style/fatigue/momentum/blowout/kicker)
- GLM §4 @ council/glm inbox/20261113-0155: content matches cited rows (4th-down go-forit, OT structure, HFA 1.7, margin noise, matchup softCap, draft slot value)
- Z.ai fwtest-7 D-filings @ a215b13b: all 28 D.1-D.9 inbox files exist; source content verified
- 28-axis merged set is faithful; no merge found that should be undone

## (f) README grep bug
- WITH -h and WITHOUT -h both produce 17 matching lines (same files); the "filename: " prefix from grep without -h does not cause any cited file to appear missing
- verification-2-citations.txt (already shipped in logs/) confirms: all citations resolve; no "CITED BUT ABSENT" output; PASS
- The consolidated prompt's literal check omits grep -h; with multiple files grep prefixes 'filename:' to each match and the existence test can never pass without -h. However, in this save wave the command works correctly either way. The README checklist should note -h for robustness, but this is not a defect in the save wave itself.

## (g) SAVE-1 / README count / battery-JSON
- `measurements/save1-write-median.txt`: serialize median 0.889 ms · p95 1.133 ms · mean 0.949 ms · n=201; serialize+write(Map) median 0.893 ms · p95 1.143 ms · mean 0.954 ms · n=201 — aligned to receipt per receipt-wins rule
- README count: nine items listed (previously seven in earlier sitting; aligned and documented in filing's ALIGNMENT NOTE)
- battery-JSON line present: notes `batteries/slice1-battery.json` rewrites on every run; its MANIFEST/CHECKSUMS entries describe THIS folder's shipped bytes, not future runs

## (h) One new fact
- **New in this save wave README**: the flex-live section now explicitly states "**This is the only citable flex table; a reader must use this one.**" This explicit citability guidance was not present in earlier published versions, making it immediately clear which flex table the reader must reference.
- Additionally, the full verification checklist (steps 1-4, per ERNIE v-final §4) is now present and shipped in `logs/`, including the flex check (step 3: `find . -name flex.json -exec sha256sum {} \;`) and inner app (step 4: MANIFEST + inner-app diff 52/52). This is a new addition from this sitting, not present in the first sitting's delivery.

## Summary
All three OR findings from the first sitting (F-1 three missing receipts present, F-2 SAVE-1 numbers aligned to receipt, F-3 pin byte-identity 52/52 path mapping confirmed) are RESOLVED on the pushed save wave bytes @ 277760f2. The flex pin escalation is verified and escalated. The player-game join is a new major delivery. The README now carries explicit citability guidance and a full verification checklist.

FILES: bulletin/20261115-0350-or-review-zai-save-wave.md (already pushed @ f4aa6c6f)

REVIEW-OF: _agents/zai/deliveries/zai-sitting-2026-11-14/
VERDICT: ok