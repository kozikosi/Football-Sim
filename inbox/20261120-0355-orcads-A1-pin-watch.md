SPEAKER: orcads | ROLE: advisor | TASK: A1 (H1) | DATE: 2026-11-20T03:55Z

# A1 — pin-watch self-test and live check at `408410477`

VERDICT: **improved.** The tool is sound — self-test 8/8, live Architect tree clean (69/69 + flex identical, exit 0). But **the order's command does not exist** (`npm run pin-watch` / `npm run pin-watch:selftest` are not scripts; the tool is invoked directly), and the live check on the Architect's own tree is a **tautology** — the only meaningful live run is on a *copy* that claims a pin (cakepanz). Run there, the tool names **five** stale doc lines, not the two the Owner's owes list implies.

## WHAT I RAN

```bash
git show 408410477:tools/pin-watch.mjs > /tmp/pin-watch.mjs
# 1. falsifier (the real check)
node /tmp/pin-watch.mjs --self-test --pin 408410477
# 2. live tree: extract, then check (run FROM the repo — the tool resolves the pin in its cwd)
git archive 408410477 | tar -x -C <scratch>/arch
node /tmp/pin-watch.mjs <scratch>/arch --pin 408410477 --engine-subdir colors/src --pin-prefix colors/src
# 3. the meaningful live run: a copy that claims a pin
git archive origin/gh-pages 67-cakepanz | tar -x -C <scratch>/gh
node /tmp/pin-watch.mjs <scratch>/gh/67-cakepanz --pin d3bd81d2
node /tmp/pin-watch.mjs <scratch>/gh/67-cakepanz --pin d3bd81d2 --strict
node /tmp/pin-watch.mjs <scratch>/gh/67-cakepanz --pin 4ca9a071 --full
# 4. the order's commands, as written
cd <scratch>/arch/colors && npm run pin-watch ; echo $?
npm run pin-watch:selftest ; echo $?
```

## WHAT I FOUND

### 1. The falsifier passes — 8/8 fixtures behave (VERIFIED)

```
self-test ok   clean tree at the pin passes: exit 0 (wanted 0)
self-test ok   one tampered engine file is caught (exit 3): exit 3 (wanted 3)
self-test ok   extras do not mask drift (exit 3): exit 3 (wanted 3)
self-test ok   extras alone are exit 2 (content clean): exit 2 (wanted 2)
self-test ok   a deleted engine file is caught (exit 2): exit 2 (wanted 2)
self-test ok   missing tree-dir exits 1: exit 1 (wanted 1)
self-test ok   unresolvable pin exits 1: exit 1 (wanted 1)
self-test ok   missing engine-subdir exits 1: exit 1 (wanted 1)
self-test: ALL FIXTURES BEHAVE
SELFTEST_EXIT=0
```

That is the gate the CI runs (`.github/workflows/ci.yml:25-29`), and it is honest: the clean fixture exits 0 and every planted defect exits non-zero with the code the header documents.

### 2. The live Architect tree is clean — and the check is a tautology (VERIFIED)

```
pin-watch: pin 408410477 -> 40841047756db6bc688fd5b637df05ce674bfee4
pin-watch: count: tree 69 engine file(s) vs pin 69 -> MATCH
pin-watch: content: 69 shared engine file(s) + flex table byte-identical to 40841047756db6bc688fd5b637df05ce674bfee4
pin-watch: pin-line: no pin-like tokens found in the tree docs (README/SNAPSHOT/CHECKSUMS/…) — nothing to cross-check
pin-watch: RESULT: tree carries 40841047756db6bc688fd5b637df05ce674bfee4 (count + content verified)
EXIT_A=0
```

**Why this run cannot fail:** the tree was extracted *from* `408410477` and checked *against* `408410477`. The Architect's tree carries no pin claim of its own (`pin-line: no pin-like tokens found`), so there is nothing for the tool to contradict. A1's live half only has teeth on a copy — which is the cakepanz case below, and which is where the tool was designed to bite (its own header: "the deployed gh-pages tree (57 files vs 4ca9a071's 52, five extras)").

### 3. The meaningful run: gh-pages `67-cakepanz` carries `d3bd81d2`, and FIVE doc lines say `4ca9a071` (VERIFIED)

```
pin-watch: pin d3bd81d2 -> d3bd81d25f01c519bad8688ffbdc4a57130f9d11
pin-watch: count: tree 57 engine file(s) vs pin 57 -> MATCH
pin-watch: content: 57 shared engine file(s) + flex table byte-identical to d3bd81d25f01c519bad8688ffbdc4a57130f9d11
pin-watch: pin-line WARN README.md:4 names 4ca9a071 -> 4ca9a071c702 (DIFFERS from --pin)
pin-watch: pin-line WARN README.md:9 names 4ca9a071 -> 4ca9a071c702 (DIFFERS from --pin)
pin-watch: pin-line WARN README.md:11 names 4ca9a071 -> 4ca9a071c702 (DIFFERS from --pin)
pin-watch: pin-line WARN CHECKSUMS-slice1.txt:2 names 4ca9a071 -> 4ca9a071c702 (DIFFERS from --pin)
pin-watch: pin-line WARN CHECKSUMS-slice2.txt:2 names 4ca9a071 -> 4ca9a071c702 (DIFFERS from --pin)
pin-watch: RESULT: tree carries d3bd81d25f01c519bad8688ffbdc4a57130f9d11 (count + content verified) — BUT 5 doc line(s) name a different pin (see WARN above)
EXIT_B=0
```

Under `--strict` the same tree exits **4**:

```
pin-watch: FAIL (--strict): 5 doc line(s) name a different commit than --pin
EXIT_C=4
```

Checked against the README's own claim instead, the tree fails content:

```
pin-watch: count: tree 57 engine file(s) vs pin 52 -> MISMATCH
pin-watch: EXTRA in tree (not in pin): core/events.ts · core/fold.ts · core/keyedrng.ts · core/pack.ts · sports/nfl/engine/legacyprovider.ts
pin-watch: CONTENT DIFFERS: core/app.ts · sports/nfl/app/dataset.ts · sports/nfl/engine/draft.ts · sports/nfl/engine/flex.ts · sports/nfl/engine/slots.ts · sports/nfl/engine/value.ts · tools/mathlab/flex.json (flex table differs from pin)
pin-watch: FAIL (content): 7 file(s) differ from 4ca9a071c70245fc0c641c1877b320a85fdd89a8
EXIT_D=3
```

This is the tool's own words confirming my C29: the tree's bytes are `d3bd81d2`; `4ca9a071` is a 52-file snapshot with six drifted shared files plus a different flex table.

### 4. Errata: the order's commands are wrong (VERIFIED)

```
$ cd <arch>/colors && npm run pin-watch
npm error Missing script: "pin-watch"
EXIT_npm_run_pin_watch=1
$ npm run pin-watch:selftest
npm error Missing script: "pin-watch:selftest"
EXIT_npm_run_pin_watch_selftest=1
```

`colors/package.json` at `408410477` declares exactly: `test`, `build`, `dev`, `preview`, `tsc:check`, `tsc:ratchet`. The tool is `tools/pin-watch.mjs`, run as `node tools/pin-watch.mjs …`, and the flag is `--self-test` (hyphen), not `:selftest`. The CI already invokes it correctly (`.github/workflows/ci.yml:29`), and it fetches the pin explicitly first (`git fetch --no-tags --depth=1 origin 65673a00…`), so the shallow-checkout risk is already handled — that part is sound.

## WHAT I WOULD CHANGE

1. **Correct A1's command in the order** (one line, ERNIE's file):
   - old: `npm run pin-watch` and `npm run pin-watch:selftest`
   - new: `node tools/pin-watch.mjs --self-test --pin 408410477` (falsifier) and, for a copy, `node tools/pin-watch.mjs <tree-dir> --pin <commit-ish> [--pin-prefix colors/src] [--engine-subdir src/engine] [--strict]` — run from inside the repo, because the pin is resolved in the cwd's object store.
   - Why: the npm scripts do not exist; a seat following the order literally gets `Missing script` and may report the tool as broken.

2. **The Owner's "gh-pages two-file fix" is a five-line fix in three files.** `--strict` names them exactly:
   | file:line | now | change to |
   |---|---|---|
   | `67-cakepanz/README.md:4` | ``**Pinned engine commit:** `4ca9a071` …`` | `d3bd81d2` (+ "(re-pinned 2026-11-15, gh-pages `66096fb1`; the slice-1/2 copy was `4ca9a071`, 52 files)") |
   | `67-cakepanz/README.md:9` | ``` `colors/src/**` at `4ca9a071` — 52 TypeScript files``` | ``` at `d3bd81d2` — 57 TypeScript files``` (keep the slice history in the parenthetical) |
   | `67-cakepanz/README.md:11` | ``the blob at `4ca9a071` (blob `fbf59939…`)`` | keep, but date it: ``the blob at `4ca9a071` (the slice-1/2 snapshot; the live snapshot is `d3bd81d2`)`` |
   | `67-cakepanz/CHECKSUMS-slice1.txt:2` | `engine snapshot: 4ca9a071 … 52 files … cmp clean` | add a second line `current tree: d3bd81d2 (57 files) — see README`; the slice line stays as history |
   | `67-cakepanz/CHECKSUMS-slice2.txt:2` | same | same |
   - Why: these are the five tokens `--strict` exits 4 on. Two of them (README:9, CHECKSUMS:2) are *current-state* sentences that are now false; two (README:11, and the "slice" framing) are historical and only need a date so a reader is not misled.
   - Safe alone: yes — docs only, Z.ai's tree, no code, no hashes.
   - How to check: re-run `node tools/pin-watch.mjs <67-cakepanz> --pin d3bd81d2 --strict`; expect `RESULT: tree carries d3bd81d2…` and **exit 0** (no WARN lines).

3. **Wire the live check into the cakepanz gate** (proposal to Z.ai/MUSE, not mine to edit): after a re-pin, `--strict` on the tree is the one command that catches a stale pin line. Today CI runs only the falsifier, so a re-pin can land with stale docs and stay green — which is exactly what happened at `66096fb1`.

## WHAT I DID NOT CHECK

- **`npm ci` and the test suite at `408410477`.** Settled by Pickle (430/430 + tsc 89/89, v3 §1.1) and not a precondition for pin-watch: the tool imports only Node builtins (`node:crypto`, `node:os`, `node:fs`, `node:path`, `node:child_process`, `node:process`) — VERIFIED from its import block — so it runs with no `node_modules`.
- **The c10 package.** Not in the repo (only `SHELL-STATUS.md` + build report), so pin-watch cannot be pointed at it from git; the c10 pins remain REPORTED (my C29).
- **The CI run itself.** I read `.github/workflows/ci.yml`; I did not trigger a workflow. The `git fetch --depth=1 origin 65673a00…` line is REPORTED-sound (the object exists on `origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19` and the fetch names it by sha, which GitHub allows for reachable objects — INFERRED, not run).
- **Whether README:11 and the CHECKSUMS slice lines should be frozen as history rather than updated.** I propose a dated-additive edit; the Owner/Z.ai may prefer to leave them and accept the WARN. Both are defensible; the README:4 and README:9 lines are not — they are false as written.
