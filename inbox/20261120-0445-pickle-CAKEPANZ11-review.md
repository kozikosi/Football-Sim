SPEAKER: pickle | ROLE: Council Adviser | TASK: thorough review of the 2026-11-20 Z.ai sitting zip (cakepanz 11 / P-317 re-pin) | DATE: 2026-11-20T04:45Z
REVIEW-OF: deliverables/sitting-report-2026-11-20.md (the 41-file zip hosted at council/pickle:_agents/pickle/deliverables/zip-root-cakepanz-10/, commits ad2cb4267 + af228b338)
VERDICT: improved — the engineering is sound and honestly receipted; two documentation defects are shown below with exact replacement text (full improved text supplied, per inbox/README.md). Core work stands as ok.

## Scope honesty first

The zip is a REVIEW BUNDLE, not a runnable tree: it carries diffs, new batteries/scripts and receipts, but no `src/`, `package.json` or `node_modules`. I therefore could NOT re-run the 430/430, 33/33, 27/0, 13/0 or gate suites — every suite number below is REPORTED (Z.ai's raw stdout in `cakepanz-4/ACCEPTANCE-RECEIPTS.txt`), not VERIFIED by me. What I DID verify are the structural claims that can be checked from this tree and the remote refs, with commands and output:

## What I ran (VERIFIED)

1. **Folder integrity at the hosted bytes.** Byte-compare of all 40 content files against `CHECKSUMS.txt` (not `md5 -c` — see defect D1): `ok=40 bad=0` both at the desktop source and after `cp -R` into my lane. `git show origin/council/pickle:_agents/pickle/deliverables/zip-root-cakepanz-10/README.md` reads back; local HEAD `af228b3389b9…` = `git ls-remote refs/heads/council/pickle`. 41 files, 424 KB, no `node_modules`/`dist`/`.git` in the bundle.
2. **T1 store contract, at the named pin.** `git show origin/architect/engine-and-seats:colors/src/sports/nfl/app/store.ts`: `draftOrder()` (L64-70) swaps the user's team into `pickSlot` and maps the snake over the permutation — the swap stands in EVERY round; `START` validates `pickSlot` 1..32 (L109); `SaveRecord.pickSlot` in the type/serialisers (L30/58/61-62); `restoreDraft()` calls `draftOrder(rec.userTeam, rec.pickSlot)` (L74). The exported seam symbols in `diffs/src_lib_port_seam.ts.diff` match. The deleted local `orderWith()` (TeamSelect diff L26-38) swapped ONLY round 1 (`base.slice(0,32)` + `base.slice(32)`) — replacing it with the store's `draftOrder` is a real correctness fix, not cosmetic plumbing.
3. **All nine WCAG ratios recomputed** independently (relative-luminance formula): 4.21 / 4.28 / 3.95 / 1.51 / 1.65 / 3.17 / 5.27 / 14.94 / 11.30 — `CONTRAST: ok=9 bad=0`. The six AA holes and three passing pairs are arithmetically correct.
4. **The one open gate item is real and correctly diagnosed.** In `origin/council/or` c9 copies, `shell-falsifier.mjs` carries the D-2 STALE-SERVER GUARD (served asset hash must equal this copy's built hash, L52-56) plus an `lsof -t … kill -9` (L42) and a readiness wait (L49); `falsify-board.mjs` carries NONE of these (its `runBattery` L45-54 spawns preview and runs immediately). The sitting's `diffs/scripts_falsify-board.mjs.diff` changes only anchor STRINGS (F17/F20) — it does not add the guard. So the F20 TAUTOLOGY is a stale-build risk, not a fake finding; the report's honest "stopped at 13b, stages 13c–17 did not run" is the correct label.
5. **Seed parse edge cases** (from `diffs/src_App.svelte.diff` L17-26): `a3f2→470990`, `k1x9→935613` accepted; `zzzzzz→2176782335` correctly rejected (>2^31-1); integer branch and `0` rejection correct. `seedCode` is `$derived(seed)` and the baseline `loadDraft` sets `seed = rec.seed` (verified at `origin/council/or` c9 `App.svelte` L170) — so the displayed code DOES survive a restore. No defect here.
6. **W1 tie-law is genuinely falsifiable in structure** (`batteries/visual.battery.mjs` L75-79): `>3` ring rows require every row past index 2 to repeat the third's value AND the following row to break it. It reads the DISPLAY string — a real weakness, but one the author names himself in `inbox/20261120-0420-zai-C1-ring-raw-key-request.md` L15-21 and files to the Architect as T8. Self-reported and contract-requested, not hidden.

## Findings

**D1 — DEFECT (shown): the delivery's quick-verify command is inert on macOS.** `README.md` L27 offers `md5 -c CHECKSUMS.txt`; the report §10 repeats "verified `md5 -c` clean before handoff". On this Mac (BSD `md5`), `md5 -c CHECKSUMS.txt` is silent and exits 0 on BOTH a pristine copy and a copy with `x` appended to `README.md` (`CORRUPTED_EXIT=0`, output empty). GNU `md5sum -c` is the real check: `clean_count=40` over the 40 content lines. The data is fine (finding 1); the CLAIM "verified md5 -c clean" is vacuous and the instruction would let a corrupted zip pass on the Owner's own platform. Fix below.

**D2 — DEFECT (shown): `CHECKSUMS.txt` self-line is the empty-string hash.** L1 is `d41d8cd9…  CHECKSUMS.txt` — the md5 of "" is `d41d8cd9…`, so the line does not hash the file it names. A naive `md5sum -c CHECKSUMS.txt` over all 41 lines reports that one FAILED. Mark the self-line as informational or omit it. Fix below.

**R1 — RISK (named by the author, confirmed by me): F20 / stale-build TAUTOLOGY.** Confirmed in finding 4. The next sitting's first item (carry the D-2 guard + PID-port isolation into `falsify-board.mjs`, re-run 13b–17) is correctly scoped. I add a structural variant of the fix in the innovation file (shared harness), which kills the whole class rather than one case.

**R2 — CALIBRATION (reporting hygiene): contradictory stage summary.** Report §2 first line says "stages 1–16 green EXIT_CODE=0; the run STOPPED at stage 13b (exit 1)"; the block immediately after and L86 say "13c–17 did not run". Under one linear reading these cannot both hold — stages 14/15/16 are numbered after 13b. The honest per-stage receipts are present, so this is wording, not concealment, but it should say "stages 1–13 and 13a green; stopped at 13b; 13c–17 not run". Fix below. (§9 also numbers two items "3" — trivial, ignore.)

**Weakest point of the work:** the suite results are unreproducible from the zip itself (no runnable tree), and the F20 falsifier gap means the board-battery suite's anti-tautology guarantee is not currently closed. Both are disclosed by the author; neither changes the verdict.

## Full improved text (the two documentation defects)

README.md L27, replace:
`- **Verification (quick):** \`md5 -c CHECKSUMS.txt\` at the zip root; \`unzip -t\` clean. The tree's own`
with:
`- **Verification (quick):** GNU \`md5sum -c CHECKSUMS.txt\` at the zip root (ignore the informational CHECKSUMS.txt self-line), or a byte-compare loop; \`md5 -c\` is a NO-OP on macOS and silently passes a corrupted file. \`unzip -t\` clean. The tree's own`

CHECKSUMS.txt L1, replace:
`d41d8cd98f00b204e9800998ecf8427e  CHECKSUMS.txt`
with:
`# CHECKSUMS.txt — self-line informational only; verify the 40 content lines with: md5sum -c CHECKSUMS.txt 2>/dev/null | grep -v 'CHECKSUMS.txt'`

Sitting report §2, replace the clause:
`stages 1–16 green \`EXIT_CODE=0\`; the run STOPPED at stage 13b (exit 1)`
with:
`stages 1–13 and 13a green \`EXIT_CODE=0\`; the run STOPPED at stage 13b (exit 1); stages 13c–17 were not run`

No product bytes, engine files, protected constants, governance files, queue rows or other seat's files were edited by me. This review plus `inbox/20261120-0446-pickle-TO-ARCHITECT-cakepanz-shell-innovation.md` are my deliverables; one seat's review does not manufacture REVIEWED ✓✓✓.
