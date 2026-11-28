SPEAKER: hy4 | ROLE: advisor (independent Verifier — authored none of the reviewed work) | TASK: review Z.ai's S17 continuation Wave-1 PARTIAL delivery | DATE: 2026-11-28T05:53Z
REVIEW-OF: zai-s17-continuation-p5-2026-11-27/ (the 857-file tree now mirrored on council/hy4@f65b6aa5b — see "Mirroring" below)
VERDICT: improved — the thirteen Wave-1 code items are honestly reported and the headline numbers reproduce; three defects below must be fixed before a Gate-1 claim of 0 RED can be made.

## Mirroring (the Owner's first request — VERIFIED)

- `rsync -a --exclude=node_modules --exclude=.git --exclude=.DS_Store` from `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-p5-2026-11-27/` into this worktree; `find … -type f | wc -l` = **857**; `diff -rq` (same excludes) exit **0** = byte-identical.
- `git add -- zai-s17-continuation-p5-2026-11-27` → 857 files staged, commit `f65b6aa5beec5c61785b9fde99f70764023ed090`; push `council/hy4` → `6efb032f3..f65b6aa5b`; `git ls-remote origin refs/heads/council/hy4` = `f65b6aa5beec5c61785b9fde99f70764023ed090`. Anyone can now read the exact PARTIAL bytes at that commit. The shared tree was not edited.

## What I ran (all VERIFIED — commands + outputs at the packaged bytes)

| Check | Command (cwd = mirror root unless noted) | Result |
|---|---|---|
| Claims | `node scripts/check-claims.mjs` | **31 OK · 6 RED**, exit 1 — exactly Z.ai's declared state |
| Package seal | `node tools/verify-package.mjs .` | **416 OK / 0 FAILED / 0 missing**, converse clean, exit 0 |
| Manifest gate | `node scripts/gate-manifest.mjs` | PASS (416 entries, dist/ covered, converse clean) |
| Numerals gate | `node scripts/gate-numerals.mjs` | CLEAN ×2 |
| Battery syntax | `node scripts/gate-battery-syntax.mjs` | PASS — 9 batteries parse, zero TS tokens |
| Engine suite | `npm run test:engine` (Node v26.13.0) | **430 pass / 0 fail** |
| Node battery | `npm run battery:node` | **37 pass / 0 fail** |
| Wave B battery | `npm run battery:waveb` | **# WAVE B · 12 pass · 0 fail** |
| Engine fence | `git archive 408410477 colors/src` vs `src/engine`, `diff -rq` | **EMPTY**, 69 pin files byte-identical (engine untouched) |
| Byte-latch | `sourceTreeSha()` vs `seam-card.json.treeSha` vs constant inside `dist/assets/index-*.js` | all three = `2d0517981b33ef…` — the chip cannot falsely show numbers |
| Side-by-side receipt | read `deliveries/receipts/s15-side-by-side.json` | 41 captures, matrix complete; **6 named FALLBACKs** (left s3-pick-confirm 390 light/dark; left s5-panel 1180+390 light/dark) and the same 6 `nonVacuity.met=false` — the PARTIAL's honesty is exact |
| Spaced-path defect class | `grep -rn 'new URL(.*)\.pathname' scripts tools batteries --include='*.mjs'` | no live code offender (only comments) — item 7's code half holds |
| Spaced-path tool | `node scripts/verify-spaced-path.mjs` (run twice, in a scratch copy) | **FAIL / FAIL**, exit 1 both times — see defect D3 |

**Not run (stated plainly):** browser-driven batteries (visual 18/0, slot 28/0, contrast 2/0, offline tent, the side-by-side *capture* run) — no Playwright browser in this seat's worktree. Their receipts were checked indirectly through the claims gate (which joins their JSON to the live dist fingerprint) and the receipts' own numbers were read, but I did not re-drive a browser. All engine/node/Wave-B/seal numbers above are my own fresh runs.

## Findings

### D1 — defect (shown): generated state blocks are stale and falsely report a seal failure

`state-blocks-fresh` is a genuine RED, not cosmetic. `node scripts/gen-state-block.mjs --check` exits 1 naming README.md, ZAI.md and `deliveries/zai-s15-closeout-handover-2026-11-21.md`. I regenerated in a scratch copy (never in the mirror) and diffed: the on-disk header says `30 OK · 6 RED` with `- **RED [seal-verifies]** verify-package exit ≠ 0: 412 OK / 4 FAILED …`; the regenerated block says `31 OK · 5 RED` with `- OK [seal-verifies] verify-package green …`. `node tools/verify-package.mjs .` on the packaged bytes is **416/0**, so the prose's "4 FAILED" line is false at the delivered bytes. An auditor reading the top of README/ZAI would conclude the seal is broken when it is green. **Fix:** the final close-out pass must end with `node scripts/gen-state-block.mjs` after the last reseal, then reseal again (the chain already calls it, but at these bytes the last regeneration predates the last reseal).

### D2 — defect (shown): `start-doc-current` is a stale claim literal, so Gate 1 can never be 0 RED as written

`claims.json:198-202` hardcodes `"pattern": "2026-11-24"` and desc "the START file's state block is the 2026-11-24 sitting". `START-OF-CHAT-ZAI.md:15` correctly says `## 2 · Current state — 2026-11-28, the Wave-1 fix sitting … PARTIAL`. The claim REDs on a correct document. This is the *same defect class* the checker's own header says it exists to kill (the 2026-11-23 verifier's literal "37 pass · 0 fail" RED). Consequence: `PARTIAL-2026-11-28.md` step 6 says "Gate 1 verbatim" but will stay RED after a perfect resume. **Fix (exact, content-derived preferred):** replace the literal with a generation-anchored check — e.g. add a `stateSitting` claim kind that extracts the sitting date from `PARTIAL-2026-11-28.md`'s title and requires `START-OF-CHAT-ZAI.md` §2 header to contain it. Minimal alternative: `s/2026-11-24/2026-11-28/` on both the pattern and desc at `claims.json:199,202`, then regenerate. Note `boot-docs-current` (OK) separately expects `2026-11-24` in other docs — leave it alone; only this row is wrong.

### D3 — defect (shown): the spaced-path gate is self-referential and cannot PASS on its first run

`scripts/verify-spaced-path.mjs:31-38` includes `check-claims (full)` as a leg; `:53` writes `deliveries/receipts/path-portability.log` only *after* all legs. On a clean run the copied tree has no receipt → the `path-portability` claim returns `missing receipt: … (run node scripts/verify-spaced-path.mjs)` → check-claims exits 1 → `SPACED-PATH GATE: FAIL`, exit 1. I reproduced this in a scratch copy: first run log ends `RED [path-portability] missing receipt …` / `SPACED-PATH GATE: FAIL`; second run ends `RED [path-portability] the spaced-path gate receipt does not say PASS …` / `SPACED-PATH GATE: FAIL` — two runs, both FAIL. Even after all other REDs are cleared, run 1 must fail on the missing receipt, so the resume's step 6 cannot succeed first try. **Fix (choose one):** (a) write a *provisional* log containing `spaced root: <SPACED>` and `SPACED-PATH GATE: PASS-pending` before the legs and overwrite it at the end, with `SPACED-PATH GATE: PASS` as the final line (the claim's regex stays valid); or (b) add `CP_SKIP_PATH_PORTABILITY=1` to the env of the inner `check-claims` calls (mirroring the existing `CP_CLAIMS_SKIP_STATEBLOCKS` recursion guard in `check-claims.mjs:425`) and skip that row there; or (c) make gate PASS depend on the four path-specific legs' exit codes only, and record full-claims status as informational. (b) is the smallest and keeps the protocol's "no green while RED" spirit for everything else.

### R1 — risk: the mirror citation and the "nothing was pushed" sentence are now historical, not current

`README-S17-PACKAGE-NOTE.md:10-25` cites `council/hy4@3cd405cfa6` as the mirror and states "**NOTHING WAS PUSHED — not in this sitting, not in any sitting**"; `START-OF-CHAT-ZAI.md:17,22` repeats both. Those were true of Z.ai's sitting, but the p5 tree now *is* pushed at `council/hy4@f65b6aa5b` (Owner's request). Next sitting must add a top block distinguishing the received 2026-11-25 tree (old citation, still correct as history) from the p5 PARTIAL tree (new mirror hash), or an auditor will cite the wrong commit. Not a defect of the reviewed bytes at the time they were sealed — a new fact created by this sitting's mirror.

### R2 — risk: `close-out-chain.mjs` can report CONVERGED while prose is stale

`close-out-chain.mjs:56-65` exits on `seal stable twice && card.sealCount === seal lines`; it never checks `gen-state-block.mjs --check` or `check-claims` in the convergence predicate. Step 3/5 of the resume can therefore say "CONVERGED" and still leave D1 in place. **Fix:** add a third leg to the predicate: run `node scripts/gen-state-block.mjs --check` and require exit 0 (plus `node scripts/check-claims.mjs --phase packaging` green) before declaring convergence. Cheap, and it turns the chain into the thing that actually closes the sitting.

### Intentional simplification (not a defect)

The PARTIAL declares 6 RED instead of massaging them green; `sbs-receipt`/`sbs-nonvacuity` name all six fallback cells; `acceptance-covers-this-tree` honestly says the pre-sitting attestation cannot certify the new tree. That is exactly the desired behaviour — keep it.

## Weakest point of the work

The machine layer is strong (seal, manifest, claims kinds, byte-latch, engine fence all reproduce), but the *handoff* layer is where it breaks: a stale literal (D2), stale generated prose (D1), and a self-referential evidence tool (D3) mean the next sitting can follow the resume verbatim and still fail Gate 1. Fix those three before re-zip; the engine and the shell need no change.
