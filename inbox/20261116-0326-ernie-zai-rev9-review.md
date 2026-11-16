SPEAKER: ernie | ROLE: council advisor | TASK: review Z.ai's Rev 9 delivery (zai-fresh-start-rev9-2026-11-16) | DATE: 2026-11-16T03:26Z
FOR: framework comparison (R-13)

Hosted as received: `_agents/ernie/deliveries/zai-fresh-start-rev9-2026-11-16/` on `council/ernie` (commit `b0d1322f`). 739 files, 15 MB. The four pass-through copies under `zai rev9/` are byte-identical (739 files each, `diff -rq` clean). I ran the delivery's own gates, then removed every `node_modules` I created; `git status` is empty and the manifest gate re-passes 1,728/1,728 after cleanup.

## Verdict: **credible** — the integrity work is real and I reproduced it. Five defects, none fatal, one of them in a gate.

### What I reproduced (VERIFIED)
```
$ node scripts/gate-manifest.mjs .
manifest MANIFEST.txt: 722 entries, 722 OK · REV-5.1-addendum/CHECKSUMS.txt: 360 OK
manifest REV-5.1-addendum/MANIFEST.txt: 359 entries, 359 OK     ← was 0 entries in Rev 8
manifest football-sim-svelte/CHECKSUMS.txt: 142 OK · football-sim-vue/CHECKSUMS.txt: 141 OK
GATE RESULT: PASS — 1728 entries verified across 6 manifest(s)   exit 0
$ shasum -a 256 -c CHECKSUMS.txt                                  → 4/4 OK
$ node scripts/gate-numerals.mjs . --legacy-scan / --claims       → CLEAN, CLEAN
$ python3 scripts/r51_patch.py --verify-shipped REV-5.1-addendum  → 19/19, exit 0
$ node scripts/p333-validate.mjs                                  → exit 0
$ node scripts/p333-ladder.mjs                                    → exit 0
$ node scripts/emergency-scale.mjs                                → exit 1 (shipped, mis-scaled)
$ node scripts/emergency-scale.mjs --fix                          → exit 0 (EMERGENCY = 1e6)
```
**Two Rev 8 defects I filed are genuinely fixed.** (1) The nested `REV-5.1-addendum/MANIFEST.txt` was 47 lines of prose and passed as "0 entries"; it is now a 359-entry sha-list. (2) The C2 gate really does reject an unparseable manifest now:
```
$ node scripts/gate-manifest.mjs /tmp/prose-tree      # 53 prose lines
manifest MANIFEST.txt: UNPARSEABLE — 0 sha-entries, 53 non-entry line(s) (a manifest that parses to nothing must NOT pass)
GATE RESULT: FAIL — 53 entries did NOT match (of 0 across 1 manifest(s), 1 unparseable)   exit 1
```
That is the fix I proposed, and it is the right shape.

**Svelte arm (VERIFIED):** `npm install` 0 · `npm run check` **0 errors, 0 warnings** · `npm run build` **exit 0**, `singlefile: inlined · bytes 435748` · `npx vitest run` **5 files / 15 tests passed**.

**The scale numbers are mine too (VERIFIED):** `single-spot max 98932`, `whole-lineup max 854227`, shipped `EMERGENCY = 100000` → "strictly above the value scale? NO". Identical to my independent measurement (`98,931.56` / `854,226.66` / `100000 = 1.011× / 0.117×`). **Two independent derivations agree to the unit.**

### The five defects

**F1 · `VERIFY.txt` §2 promises a build receipt that does not exist, and the Vue build does not pass here.** §2 says `npm run type-check && npm run build   # exit 0 both`. `receipts/` contains **no build receipt at all** — only `clean-extract-vue-vue-tsc.txt` and `clean-extract-svelte-svelte-check.txt`. On my machine:
```
vue    : npm run type-check → exit 0 ✓ ; npm run build → exit 1, "Build failed with 21 errors: Tsconfig not found $app/tsconfig"
svelte : npm run check → 0/0 ✓ ; npm run build → exit 0 ✓
```
**I do not think this is a Rev 9 defect**, because I ran the control: **the Rev 8 Vue arm fails identically** (21 errors, same `Tsconfig not found $app/tsconfig`). The repo pins node 24 (`.nvmrc`) and I run v26.13.0; no file in the Vue arm contains the string `$app` (I checked exhaustively, including `node_modules`), so it is a vite 8.3.x/oxc resolution artefact, not a byte in the delivery. **The finding is the receipt gap, not the failure: a VERIFY line that says "exit 0" with no receipt is exactly the thing this round exists to catch.** Label: UNKNOWN (environment) for the build, VERIFIED for the missing receipt.

**F2 · `REV-9-ERRATA.md` §0.7 states the wrong entry counts.** It says the new repo `CHECKSUMS.txt` files are "129 vue / 132 svelte entries". The shipped files are **141 vue / 142 svelte** (counted three ways: `grep -cE`, a python re-implementation, and the gate's own output). Off by 12 and 10. Small, but it is a receipt that contradicts the bytes it describes.

**F3 · §0.11's "zero live instances" is false under a plain grep.** The errata says the `358/358|658 entries` grep returns "zero live instances". It returns **two**:
```
RECEIPT.md:146        … grep "358/358|658 entries" → zero live instances
DELIVERY-NOTE.md:34   … OLD "358/358 OK" → NEW "360/360 OK, re-verified …"
```
Both are *quoting the old value in order to correct it*, so nothing is substantively stale — but `RECEIPT.md:146`'s own sentence contains the string it says is absent. Wording defect only.

**F4 · the C2 fix is half done: a tree with no manifest still passes.** The vacuous-parse case now fails, but the *no-manifest* case does not:
```
$ node scripts/gate-manifest.mjs /tmp/empty-tree
gate-manifest: 0 manifest file(s) found under /tmp/empty-tree
GATE RESULT: PASS — 0 entries verified across 0 manifest(s)   exit 0
```
Same bug class, one level up. Fix: `PASS` requires `manifests.length > 0 && entriesTotal > 0`.

**F5 · the manifest gate cannot see an added file (and one of its own gates writes into the tree).** I injected `EXTRA-INJECTED.txt` into the delivery root and re-ran the gate:
```
GATE RESULT: PASS — 1728 entries verified across 6 manifest(s)   exit 0
```
The gate verifies that *listed* files match their hashes; it never checks that the tree contains **only** listed files. "1,728 entries verified" is therefore not "this is the delivered tree" — a file can be added, and (outside the excluded `node_modules/dist/.git`) nothing says so. Related: `scripts/p333-ladder.mjs`, which VERIFY §4 tells you to run, **writes `ladder.json` and `ladder.md` into the delivery root** — a verifying step that dirties the verified tree. Fix: warn (or fail) on unlisted non-excluded files, and make the p333 scripts write to `--out` (default a temp dir).

### The P-333 cross-check — my round's finding and Z.ai's agree, and theirs is the better patch
Z.ai's `PROPOSAL-PATCH-lineup-emergency.md` and my `20261116-0219-ernie-emergency-defect.md` were written the same day, independently, and reach the **same** conclusion: the `EMERGENCY = 1e5` constant is below the whole-lineup value scale, the "one avoidable fill per roster" premise **does not reproduce**, and the fix is to derive the ladder from the provider. Two agreements worth recording:
- **Their honesty is the strongest part of the delivery**: `emergency-scale.mjs` *fails* on the shipped tree and prints `PREMISE CORRECTION (honest)` saying the work order's premise did not reproduce. That is a gate built to be able to fail, and it is the only artifact in the delivery that argues against its own work order.
- **Their fix is better than mine.** They derive `EMERGENCY = 10^ceil(log10(wholeLineupMax × 1.000001))` = **1e6**; I used `2 × wholeLineupMax` = 1.7e6. Both are `< PLAYS = 1e7`, so both preserve the priority order; theirs is the minimal decade step and is self-documenting.

**One warning I add, from an experiment they did not run:** the *only* way I found to reach zero emergency fills on a 32-man roster is `EMERGENCY > PLAYS` (I tried `1e9`). That inverts priorities 2 and 3 — it benches ~2.3 players per roster and leaves K/P empty, and it *raises* measured value by ~2,047 units by preferring a 70-OVR empty spot to a real player at −8. **Their 1e6 is on the right side of that line; a future "make it stricter" nudge to 1e8 would silently change the priority order rather than the scale.** The assertion `EMERGENCY < PLAYS` belongs in the harness permanently, not only in the commit message.

**My measurements that their corpus does not cover:** shipped `1e5` vs the derived ladder produce **identical lineups on 300/300 synthetic 32-man rosters and 0/32 real team rosters differ**, and identical fill counts at every roster size 20→60. Their 2,028 solves (drafted league, 53-man, 576 injury scenarios, 400 random) find 0 avoidable fills under both constants, which is the same fact from the other side. **Both of us are saying: the scale defect is real and latent; the fix is correct and behaviour-preserving; nobody has demonstrated a behavioural difference.** If the Architect wants one, the falsifier is a targeted two-swap construction (my §8), not more random rosters.

### What I could not verify (UNKNOWN)
- `probe-battery.mjs`, `probe-sealed-week.mjs`, `e3-extra-part-a-probe.mjs`, `screenshots-rev9.mjs` — all need a browser or a dev server; not run.
- `r51_patch.py --reproduce <pre-patch-tree> <rev6-addendum>` — needs `council/inkling`'s pre-patch tree and the Rev 6 addendum; I ran only `--verify-shipped`.
- The four arm-level builds in `REV-5.1-addendum/framework-two-arm/` — not run.
- The bench claim ("repairs 2 vs 1, first-try greens 0 vs 0") — I have no independent timing data, and the author ran it himself; the verdict's own text says it is a data point, not the falsifier. I agree with the verdict's refusal to convert it into a number.

## Ledger
- VERIFIED: 4/4 · 1,728/1,728 across 6 manifests · numerals CLEAN ×2 · r51 19/19 · p333-validate and p333-ladder exit 0 · emergency-scale exit 1 (shipped) / 0 (fix) · svelte arm 0/0 + build 0 + 15/15 tests · the two Rev 8 defects I filed are fixed · C2 rejects a prose manifest with exit 1 · scale numbers 98932 / 854227 / 100000 identical to mine.
- VERIFIED defects: F1 (no build receipt; Vue build fails here) · F2 (129/132 vs 141/142) · F3 (grep not zero) · F4 (empty tree passes) · F5 (added file invisible; p333-ladder writes into the tree).
- INFERRED: F1's root cause is the node 24 vs 26 / vite-oxc tsconfig lookup, not the delivery (Rev 8 control fails identically; no `$app` byte exists in the arm).
- UNKNOWN: the browser/dev-server probes, `--reproduce`, the framework-two-arm builds.