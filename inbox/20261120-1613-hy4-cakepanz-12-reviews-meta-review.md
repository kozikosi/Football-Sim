SPEAKER: hy4 | ROLE: advisor | TASK: review the other seats' reviews of the cakepanz-12 delivery | DATE: 2026-11-20T16:13Z
REVIEW-OF (six files, all on their authors' own branches):
- `origin/council/beam:inbox/20261120-1100-beam-zai-cakepanz-12-review.md`
- `origin/council/ernie:inbox/20261120-1559-ernie-P-317-cakepanz-12-review.md`
- `origin/council/orcabeam:inbox/20261120-1200-orcabeam-P317-cakepanz-12-sitting-review.md`
- `origin/council/orcaman:inbox/20261120-1200-orcaman-zai-cakepanz-12-review.md`
- `origin/council/pickle:inbox/20261120-1554-pickle-CAKEPANZ12-review.md`
- `origin/council/glyph:_agents/glyph/inbox/20261120-1810-glyph-zai-cakepanz-12-2026-11-20-review-and-ideas.md`
VERDICT: the six reviews are substantially sound; one claim they mostly share (T8 is blocked) is REFUTED by Ernie D1, which I re-ran and confirmed. None of them found the verifier's missing converse check (my `inbox/20261120-1551-hy4-cakepanz-12-review.md`).

## Per-seat verdicts

| seat | their verdict | my check |
|---|---|---|
| Beam | ok (improved) | **ok with one correction.** 13b-OPEN correctly held; guard-extraction idea good. Its T8 "blocked; bytes only in the Owner's zip root" is wrong — see below. Double-announce risk plausible, minor. |
| Ernie | improved | **confirmed, strongest of the six.** D1–D5 all re-verified by me (below). This review changes the plan. |
| OrcaBeam | ok with one blocking doc defect | **confirmed with one correction.** README 13b-CLOSED contradiction is real and blocking; stale pin real. T8 "blocked" wrong. Guard-extraction idea agrees with Beam. |
| OrcaMan | ok with named open items | **ok.** Honest about what it did not run; source-level guard/hardening description matches the bytes. T8 "blocked" appears as an open item — now resolved by Ernie D1. |
| Pickle | improved | **confirmed.** NEW DEFECT 1 = Ernie D2 (verified); NEW DEFECT 2 and the ring-surface implication are real (below). T8 "blocked; only zip root" wrong. |
| Glyph | ok, not acceptance-closed | **confirmed.** README verifier path mismatch is real; 13b-OPEN correct. |

## Claims I re-ran (all VERIFIED unless labelled)

1. **Ernie D1 — T8 is NOT blocked; the repair bytes are on disk. CONFIRMED.** Both named paths exist with the exact bytes:
```
FOUND bytes=6418 md5=0a2869538a706e7e6ea864664b7e5c9f :: /Users/kosi/Desktop/Football Sim/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
FOUND bytes=6418 md5=0a2869538a706e7e6ea864664b7e5c9f :: /Users/kosi/Desktop/Football Sim/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
```
I re-ran Ernie's landing on a fresh extract of the inkling c10 host with his script:
```
before: 48 OK / 1 missing / 51 files (entries 49)
after : 49 OK / 0 missing / 52 files (entries 49)
OK: 49/49, missing 0, files 52     LAND_EXIT=0
```
So T8 is READY, not blocked. Z.ai's "not in any branch/history" was true; "not on disk" was never checked. Beam, OrcaBeam, Pickle and Z.ai's report all repeat the blocked claim — correct them to Ernie's finding. Note also the script prints 52 files while the true pre-state is 51 (MUSE's correction); Ernie's own scratch output inherits the script's 52.
2. **Ernie D2 = Pickle NEW DEFECT 1 — restored draft desyncs the URL seed. CONFIRMED.** `App.svelte:183` sets `seed = rec.seed`; the only `writeSeedToUrl(seed)` call is at `:120` in `startDraft`. No call in `loadDraft`. Real R2 regression; the one-line fix and W12 law they propose are correct.
3. **Ernie D3 = OrcaBeam §4.1 — README says 13b CLOSED, report says OPEN. CONFIRMED.** `cakepanz-4-changed/README.md:5` literally reads "stage 13b is CLOSED … resolved to DIED with the failing law named", while the report §1.2/§8 says the 9-case re-run did not happen. Blocking doc defect; six seats agree and I agree.
4. **Ernie D4 = Pickle MINOR — `b36:` parse unanchored. CONFIRMED by running the product module:**
```
"b36:1.5" -> 1      "b36:12 34" -> 38      "b36:12abc###" -> 1786296
"b36:zzz" -> 46655  "b36:" -> null
```
Malformed prefixed links silently load a different seed. Minor (canonical codes are fine).
5. **Ernie D5 — md5sum present on this Mac. CONFIRMED:** `md5sum (Darwin) 1.0`. The README's "GNU md5sum absent on a stock Mac" is stale on this OS, though the portability fix is still right.
6. **Glyph — README verifier path mismatch. CONFIRMED:** no `tools/` at the zip root (`ls` → NO-ROOT-TOOLS); the verifier is at `cakepanz-4-changed/tools/verify-package.mjs`. I hit the same thing and invoked it by the real path.
7. **Pickle NEW DEFECT 2 — R2 variety defeated within a tab. CONFIRMED structurally (INFERRED for behaviour):** `App.svelte:301` has `{ id: 'team', show: true }` and `:119` `seed = parseSeed()` reads the URL that `:120` just wrote. Second drafts in the same tab replay the same seed unless a control clears it. Product call (Pickle correctly does not guess).
8. **Pickle's ring-surface implication — CONFIRMED as a real conflict.** The Owner dropped the ring this sitting, but c12's L16/L18/L21 and the F20 mutant assume `suggest`/`cp-suggest` exists. Closing 13b may close a gate for behaviour that will not ship. Architect/Owner must decide before 13b is called a cutover gate.
9. **Common claim "13b is still OPEN" — CONFIRMED by all six and by me.** I verified from `board.battery.mjs:247` that the mutant should fail L13, but the by-name receipt has not been run. "Mechanism proven, composite not final" is the honest posture.

## What the six reviews collectively missed
No other review found that `tools/verify-package.mjs` has no converse check: I showed that adding an unlisted `NOT-IN-MANIFEST.txt` still verifies clean (`36 OK / 0 FAILED / 0 missing`, exit 0). Grep of all six files for `converse|EXTRA|unlisted` returned nothing. Full improved verifier is in my review file. This matters more now that T8 is READY — the relay should use a verifier that catches undeclared bytes.

## Bottom line for the Owner / next sitting
1. Treat T8 as READY with Ernie's on-disk source; the relay can proceed (49/49 or STOP).
2. Fix the README's "13b CLOSED" line before anyone reads it as final.
3. Fold in the two seed defects (restore URL write-back; tab-repeat seed) and the four verifier/parse robustness fixes.
4. Run the hardened falsifier re-run and the closing composite; then decide whether ring-dependent laws survive the ring's removal.
5. Relay the verifier converse fix with the landing.

## What I did not do
No edits to any seat's file, no product/engine changes, no browser or acceptance runs; I re-ran only the self-contained receipts and read-only checks named above. The full battery counts remain REPORTED from Z.ai's receipts.
