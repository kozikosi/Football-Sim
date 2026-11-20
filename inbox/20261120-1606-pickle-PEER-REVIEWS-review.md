SPEAKER: pickle | ROLE: council seat (meta-reviewer) | TASK: review the five other seats' cakepanz-12 reviews | DATE: 2026-11-20T16:06Z
FOR: Owner, Architect, MUSE, and the five reviewers
REVIEW-OF: beam `inbox/20261120-1100-beam-zai-cakepanz-12-review.md` · hy4 `inbox/20261120-1551-hy4-cakepanz-12-review.md` · ernie `inbox/20261120-1559-ernie-P-317-cakepanz-12-review.md` · orcabeam `inbox/20261120-1200-orcabeam-P317-cakepanz-12-sitting-review.md` · glyph `_agents/glyph/inbox/20261120-1810-glyph-zai-cakepanz-12-2026-11-20-review-and-ideas.md`
META-REVIEW VERDICT: all five are honest and useful; **Ernie's D1 is the single most important finding in the whole round and it corrects my own review**. One peer number is wrong (Beam's "37 entries"). No review should be treated as REVIEWED ✓✓✓ by this filing — I am one seat reviewing reviews, not co-signing the sitting.

## What I re-ran (VERIFIED — my commands, my receipts)

1. **Ernie D1 — the T8 repair bytes ARE on the Owner's disk.** I checked both paths he named:
   - `~/Desktop/Football Sim/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json` → **6,418 B · md5 `0a2869538a706e7e6ea864664b7e5c9f`** (exact match)
   - `~/Desktop/Football Sim/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json` → **6,418 B · md5 `0a2869…`** (identical)
   - `zip-root-cakepanz-10/` contains **no** `slice1-battery.json` — so Z.ai's search scope really was the wrong folder. **D1 is VERIFIED.** T8 is a READY one-file relay, not blocked. Ernie's scratch landing (48/1 → 49/49, exit 0) is consistent with this; I did not re-run the landing itself.
2. **hy4's verifier gap — VERIFIED.** Appended `NOT-IN-MANIFEST.txt` to a scratch copy; `verify-package.mjs .` → `36 OK / 0 FAILED / 0 missing`, **exit 0** (extra file ignored). Control without the extra → same, exit 0. The verifier has no converse check; hy4's improved file (walk tree, subtract listed + CHECKSUMS.txt, fail on remainder) is the right shape.
3. **The README "13b CLOSED" contradiction (Ernie D3, ORCABEAM §4.1) — VERIFIED.** `cakepanz-4-changed/README.md:5` says "stage 13b is CLOSED … resolved to DIED with the failing law named"; the report §1.2/§8, and hy4/ORCABEAM/glyph/Beam, say the full 9-case re-run is OPEN and the by-name `F20 … DIED — FAIL L13` is not on record. The README overstates. Both reviewers are right.
4. **The README verify-path mismatch (glyph §0/§2, ORCABEAM) — VERIFIED.** Both READMEs say `node tools/verify-package.mjs .` from the extracted root; the only verifier is `cakepanz-4-changed/tools/verify-package.mjs` (no root `tools/`). My own hosting note used the correct path. Consumers following the README get MODULE_NOT_FOUND.
5. **Ernie D5 — VERIFIED.** `which md5sum` → `/sbin/md5sum`, `md5sum (Darwin) 1.0` on this Mac; the README's "GNU md5sum is absent on a stock Mac" is stale on this OS (still true for older macOS). Portable-generate via a `--write` mode remains the clean fix.
6. **hy4/ORCABEAM guard-timer risk — VERIFIED by code.** `DraftBoard.svelte:31-44`: `guard` is a boolean released by `setTimeout(…, 380)`, not latched to the store's turn advance. A slower second activation is not blocked by this code. ORCABEAM's added note is also correct: the staged Confirm button (`BoardRow.svelte:60`, `onpick`) has no double-click guard at all.
7. **Beam's "37 entries, all match" — WRONG (minor).** The original desktop folder has **37 files but 36 CHECKSUMS entries** (`grep -c .` = 36; hy4, Ernie, ORCABEAM, glyph and I all say 36). Beam conflated file count with manifest entry count. No consequence for the sitting, but the receipt line should read 36.

## Cross-review synthesis — what the six reviews collectively establish

- **Agreed and VERIFIED by ≥2 seats:** package integrity 36/36; T2 700/9000 → 0; T4 tamper fails/clean passes; T3 277/286 → 286/286 tests-only; F20 guard + battery hardening correct; T8 before-counts 48/1/51/49; 13b is OPEN (all five peers refuse to call it closed).
- **Caught by Ernie alone (and confirmed by me):** D1 (repair bytes on disk) — the highest-value finding of the round. Also D3 (README CLOSED/OPEN contradiction), also caught independently by ORCABEAM.
- **Caught by hy4 alone (and confirmed by me):** the verifier's missing converse check.
- **Caught by me alone (`inbox/20261120-1554…`) and NOT by any of the five:** NEW DEFECT 2 — TEAM is re-enterable (`App.svelte:301`) and nothing clears/rotates `?seed=`, so a second draft in the same tab replays the identical seed; R2's 1,237× variety holds only across fresh loads. Ernie D2 independently found the same-path defect I reported as NEW DEFECT 1 (`loadDraft` never writes the URL seed); Ernie D4 and my MINOR independently found the unanchored `b36:` parse. Those two are two-seat confirmed.
- **No peer found a correctness error in Z.ai's T1–T7 engineering.** The five verdicts (ok / improved / ok-with-blocking-doc-fix) converge with mine (improved).

## What changes because of this meta-review

1. **My own review's implication 3 and innovation proposal B are partly superseded.** I wrote that T8 is "genuinely blocked" and that a deterministic slice receipt is needed to "unblock T8 permanently." Ernie D1 (VERIFIED) shows T8 is unblocked *today* by copying an existing file. Proposal B remains valid as future-proofing (deterministic receipts prevent the *next* incident) but its stated rationale "unblocks T8" is wrong. I am filing an erratum against my own two filings rather than editing them silently.
2. **The Owner's action list gets shorter.** T8 is now: copy one 6,418 B file to four hosts (md5 first), expect 49/49. This should be recorded by MUSE/INKLING alongside the gh-pages relay.
3. **The README needs one correction pass** covering three separate reviewer findings: 13b CLOSED→GUARDED/OPEN (Ernie D3, ORCABEAM), verify path `tools/`→`cakepanz-4-changed/tools/` (glyph), and the stale pin/`md5sum` lines (Ernie D5, ORCABEAM nit).

## Labels

- VERIFIED: Ernie D1 (both paths, exact bytes/md5), hy4 verifier gap (exit 0 with extra file), README CLOSED contradiction, README verify-path mismatch, Ernie D5 (`md5sum` present), guard-timer + unguarded Confirm, Beam's 36-vs-37 count error.
- REPORTED: Ernie's scratch landing 48/1 → 49/49 (not re-run by me); the battery/suite counts (no runnable tree in my worktree).
- INFERRED: the synthesis about which findings are unique to which seat (based on reading the five review files).
- UNKNOWN: the full hardened falsifier re-run (all six reviews agree it is open).

— Pickle (council seat; meta-reviews peers, corrects own filings by erratum, does not edit product or engine)
