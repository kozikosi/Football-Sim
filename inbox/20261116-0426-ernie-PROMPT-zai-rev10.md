SPEAKER: ernie | ROLE: council advisor | TASK: a self-contained work order for Z.ai (Rev 10) — suggested, not assigned | DATE: 2026-11-16T04:26Z
FOR: framework comparison (R-13)

PRIORITY+: Rev 10 for the fresh-start/framework track — close the five gate defects in Rev 9, ship the receipts that don't exist, and hand the Architect three falsifier harnesses. Same organising rule as last round: **a gate is not verified until you have shown it failing.**

> This is a **draft prompt for the Owner to hand over**, not an assignment by me. Work still comes from the queue. Below this line is the prompt, written to be pasted as-is; every item is reproducible from the delivery alone.

---

# PROMPT — Z.ai · Rev 10 · "make the delivery able to fail"

## Who this is for
The **Z.ai** seat: the fresh-start / framework-comparison track (two arms, Vue 3 + Vite and Svelte 5 + Vite), and the harnesses that ship with that delivery.

## What you may touch
- Your own two repos (`football-sim-vue`, `football-sim-svelte`), your delivery tree, your own `scripts/` and `probes/`.
- New files in **your** lane: `_agents/zai/inbox/…`, `_agents/zai/deliveries/…`.
- **§5 patch proposals** to the Architect for anything that lives in `colors/`.

## What you may not touch
`colors/` (the Architect's), the engine, `flex.json`, `design.json`, the product HTML, another seat's bytes, `AGENTS.md` / `PROJECT-KNOWLEDGE.md` / the queue. You do not edit the engine to make a test pass; you file the change.

## What you may not claim
- A gate passed without its **output pasted in full** (stdout **and** exit code).
- A number you did not measure yourself. If it is someone else's, label it `REPORTED` and name them.
- A blind result. You authored the fresh-start work, so you cannot run the sealed bench blind — that is not a comment on your honesty, it is what "blind" means.

## The rule for this round
Rev 9 fixed real things — the C2 gate now rejects a prose manifest (`UNPARSEABLE`, exit 1), the nested addendum manifest is a 359-entry sha-list instead of prose, and `emergency-scale.mjs` **fails** on the shipped constants and prints `PREMISE CORRECTION (honest)`. That last one is the best artifact in the delivery: a gate that argues against its own work order. This round is about the five places where the delivery still says PASS when it should not, or says "exit 0" when it has no receipt.

**Every item below has three parts: the repro I ran, the fix, and the falsifier that proves the fix can fail.** An item without a falsifier is incomplete.

---

## A. The five gate defects (fix, then show each one dying)

### A1 · `VERIFY.txt` §2 promises a build exit code that has no receipt
`VERIFY.txt` §2 says `npm run build  # exit 0 both`. **`receipts/` contains no build receipt for either arm** — only `clean-extract-vue-vue-tsc.txt` and `clean-extract-svelte-svelte-check.txt`.

On my machine (node **v26.13.0**; your `.nvmrc` pins **24**):
```
vue    : npm run type-check → exit 0 ✓ ; npm run build → exit 1
         "Build failed with 21 errors: Tsconfig not found $app/tsconfig"   (vite 8.3.8 / oxc)
svelte : npm run check → 0 errors, 0 warnings ✓ ; npm run build → exit 0 ✓  (singlefile, 435,748 B)
```
I do **not** think this is your defect: **the Rev 8 Vue arm fails identically** (21 errors, same message), and no file in the Vue arm contains the string `$app` (I checked every file, including `node_modules`). It looks like the vite/oxc tsconfig lookup under node 26.

**Do:** run `npm run build` in both arms **on node 24**, capture the full output, and check `receipts/` gets the two files. If the Vue build cannot pass on the pinned node either, **say so in `VERIFY.txt`** and move the build to the UNKNOWN list. A VERIFY line with no receipt is the defect, whether or not the build is green.
**Falsifier:** delete the receipt you just added, re-run the check that consumes it, and show it fails.

### A2 · `REV-9-ERRATA.md` §0.7 states the wrong entry counts
It says the new repo `CHECKSUMS.txt` files are "**129 vue / 132 svelte** entries". The shipped files are **141** and **142** — counted three ways (`grep -cE`, an independent python count, and `gate-manifest.mjs`'s own line).
**Do:** make the count **computed, not typed** — have the packaging step print the counts and paste that output. 
**Falsifier:** add one file to a repo, re-run the count, and show the printed number move. If the errata number does not move with it, the number is typed, not measured.

### A3 · §0.11's "zero live instances" is not zero
The errata says the `358/358|658 entries` grep returns "zero live instances". A plain grep returns **two**:
```
RECEIPT.md:146        … grep "358/358|658 entries" → zero live instances
DELIVERY-NOTE.md:34   … OLD "358/358 OK" → NEW "360/360 OK, re-verified …"
```
Both quote the old value in order to correct it, so nothing is substantively stale — but `RECEIPT.md:146`'s own sentence contains the string it says is absent.
**Do:** reword to "zero live **claims**" and make the self-lint exclude the errata and the correction lines it is describing. 
**Falsifier:** the grep must still find the two correction lines and must still report zero *claims*.

### A4 · A tree with no manifest at all still passes (half the vacuity fix)
```
$ node scripts/gate-manifest.mjs /tmp/empty-tree
gate-manifest: 0 manifest file(s) found under /tmp/empty-tree
GATE RESULT: PASS — 0 entries verified across 0 manifest(s)   exit 0
```
The prose-manifest case now fails; the *no-manifest* case does not.
**Do:** `PASS` requires `manifests.length > 0 && entriesTotal > 0`.
**Falsifier:** an empty tree must exit non-zero with "no manifest found".

### A5 · The gate cannot see an added file — and one of your own gates writes into the tree
I injected `EXTRA-INJECTED.txt` into the delivery root and re-ran:
```
GATE RESULT: PASS — 1728 entries verified across 6 manifest(s)   exit 0
```
The gate verifies that *listed* files match their hashes; it never checks that the tree contains **only** listed files. "1,728 entries verified" is therefore not "this is the delivered tree".

Related: `scripts/p333-ladder.mjs`, which `VERIFY.txt` §4 tells the reader to run, **writes `ladder.json` and `ladder.md` into the delivery root** — a verifying step that dirties the verified tree (I had to delete them before the manifest would re-pass cleanly).
**Do:** warn (or fail) on non-excluded files that are absent from the manifest; make every `p333-*` script write to `--out` (default: a temp dir), never the tree.
**Falsifier:** add one unlisted file → non-zero (or a loud WARN that names it); run `p333-ladder.mjs` twice → the tree's manifest hash is unchanged.

---

## B. The receipts that do not exist yet
`VERIFY.txt` §2–§4 lists commands; `receipts/` holds a subset. Ship a receipt for **each** line of §2–§4, with the **node version** and the **browser version** in the header:
- the four arm-level builds under `REV-5.1-addendum/framework-two-arm/` (`arm-vue` `vue-tsc --build`, `arm-svelte` `svelte-check`)
- `probes/probe-battery.mjs` (both arms) · `probes/probe-sealed-week.mjs` (both arms) · `scripts/e3-extra-part-a-probe.mjs` (both arms) · `scripts/screenshots-rev9.mjs`
- `r51_patch.py --reproduce <pre-patch-tree> <rev6-addendum>` → **I could not run this**: it needs `council/inkling`'s pre-patch tree and the Rev 6 addendum. Either ship the two inputs' hashes and a script that fetches them, or mark it UNKNOWN in VERIFY.

**Falsifier for this item:** for each new receipt, change one input by one byte and show the receipt's command fails. A receipt you cannot invalidate is decoration.

---

## C. Your own store-cost result needs a wrapper named
Rev 9 reports **Pinia setup store 81 L vs a plain `reactive({...})` module 45 L**, and concludes the "Svelte store tax" is partly a Pinia artefact. That is a good finding and it is the right shape — but it is a **wrapper** comparison, not a framework comparison, and the verdict text says so only in passing.
**Do:** re-baseline the store cost as a 2×2 — {class bridge, facade/reactive module} × {Vue, Svelte} — and publish the four line counts with the file each was measured in. Then the claim reads "wrapper X costs N lines on both frameworks", which is a fact, instead of "Vue costs 36 lines more", which is a category error.
**Falsifier:** if the Svelte reactive module is also 36 L lighter than its class bridge, the difference is the wrapper and the framework claim dies. Show which it is.

## D. Three harnesses for the Architect (yours to build, his to integrate)
These are **engine** questions; you cannot edit `colors/`, so you ship (1) a harness that reproduces the gap, and (2) a §5 proposal naming file + anchor + old → new + why + safe-alone + how to check.

**D1 · the Hungarian's tie rule is untested.** `colors/test/nfl/lineup.test.ts` proves the solver's **cost** equals brute force on 300 random matrices, but nothing pins *which* optimum it returns. I changed one character in `colors/src/core/hungarian.ts` (`if (minv[j] < delta)` → `<=`): **300/300 matrices still equal brute force, and the assignment changes on 5/300.** For this product the tie rule decides *which of two equal-value players is shown starting*.
*Ship:* a script that runs both variants over the same 300 matrices and prints "cost equal on N/300, assignment differs on M/300" (mine printed 300 and 5), plus a §5 proposal for a 4×4 double-optimum case that pins the exact returned permutation.

**D2 · `colors/tsconfig.json` excludes `test/`.** The "89/89 type-check ratchet" covers `src/` only; a type error in any test file is invisible to both gates. I proved the ratchet itself is sound (plant an error → check exits 1, `--write` refuses, baseline hash unchanged), so the gap is *scope*, not the ratchet.
*Ship:* a `tsconfig.tests.json` that includes `test/**/*`, the error count it reports, and a §5 proposal to add it to the ratchet (or to CI) so the number is honest.

**D3 · four 1b box-score fields are asserted by no test.** I mutated the 1b sim slice twelve ways; twelve died, but four survived **all four** related test files: `puntYards` never accumulated, `touchdowns` never counted, `firstDowns` never counted, and an interception spotted at the 20 instead of at the catch. "Every screen agrees" checks ~8 of the 25 `TeamLine` fields and compares two folds of the same events, so it cannot see a **consistent** misclassification.
*Ship:* the four mutations as a script (each with its anchor string), and a §5 proposal for the missing assertions. This is the highest-value item in section D: a box score that silently stops counting touchdowns is a product defect, not a test gap.

## E. The sealed bench — do the two things you can do without running it
1. **Withdraw the author-run data point from the verdict's evidence.** You already say it is "a DATA POINT, not the falsifier"; make that structural — move it out of the evidence list and into a clearly-marked "author observation, not evidence" section, so nobody can quote it later as support.
2. **Pre-register the settle rule before anyone runs it blind.** You proposed a paired, variance-relative rule; write it down with the threshold, the N, the unit, and the exact command, and hash it. A settle rule written after the numbers exist is not a settle rule. This is the one thing that converts "the Owner picks on familiarity" into "the measurement said X".
3. Make the handoff stranger-proof by **handing it to someone who has not seen the trees** and recording where they stall. Do not run it yourself.

## F. Self-lint (same as last round)
Grep **your own** files on your own branch and append a one-line advisory correction to your next bulletin entry for:
- any `358/358` or `658` presented as a **current** number (both are stale; 360 and 722 are live)
- any `10 vs 9` / `4 vs 6` line count without its method stated
- any `w89` described as dark-background, or with a `--tc` variable (w89's default is pale rose `#fdf2f6`; it has no `--tc` — `grep -c -- "--tc" w89.html` → 0)
- any `gh-pages` tip hash other than **`66096fb1`** (`3e69567c` is the w89 *publishing* commit, an ancestor)
- any `REPORTED` claim restated as verified
- any number in prose that disagrees with a number in a receipt in the same tree

---

## Filing
- One file per item: `_agents/zai/inbox/<UTC yyyymmdd-hhmm>-zai-<slug>.md`, first line `SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>`, then `FOR: framework comparison (R-13)`.
- A patch proposal uses the §5 form: target build (file + commit) · WHERE (anchor string) · old → new · WHY · SAFE ALONE? · HOW TO CHECK.
- Label every claim: **VERIFIED** (you ran it, receipt in the text) / **REPORTED** (someone else) / **INFERRED** / **UNKNOWN**.
- **Push after every finished file.** A reply that reports only green gates is incomplete — the value is in the survivors and the stalls.
- If one command fails you, the failure **is** the answer: paste it verbatim.

## Do not
- Do not re-litigate the framework pick, the pin (`d3bd81d2`), or the palette ruling — the Owner holds those.
- Do not "fix" a number in a receipt to make a gate pass; fix the cause or file the finding.
- Do not run the sealed bench yourself.
- Do not edit the engine, `colors/`, `flex.json`, `design.json`, another seat's bytes, or the queue.