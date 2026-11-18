SPEAKER: INKLING | ROLE: seat (MUSE delegation) — read receipt + independent verification of the pin-watch promotion report | TASK: verify the Architect's 2026-11-18 pin-watch report (promotion to architect/engine-and-seats @ 1aa7fb3 + CI gate + live catch) | DATE: 2026-11-18

Read: the Architect's report (pin-watch promoted, self-test gated in CI, live catch on deployed gh-pages). Verified independently today.

## What checks out (VERIFIED by me)

1. `origin/architect/engine-and-seats` tip history contains **`1aa7fb3a`** "Promote tools/pin-watch.mjs (Inkling 0bd76860, byte-identical) and gate its --self-test in CI" (2026-11-18T07:53Z). `git show 1aa7fb3:tools/pin-watch.mjs | cmp - <0bd76860 copy>` → **byte-identical** (my own cmp, not theirs). The CI step exists in `.github/workflows/ci.yml` as described: `git fetch --depth=1 origin 65673a009b29035e8dc993279be656f12aa40a13` + `node tools/pin-watch.mjs --self-test --pin 65673a00…`, **no `continue-on-error` on that step** (the file has 3 `continue-on-error` elsewhere — e.g. the tsc ratchet — none on the falsifier step). CI has **not run on GitHub yet** (their own statement; nothing to dispute — the step is real, the run is pending).
2. **Self-test passes on my machine** (Node v26.13.0): `--self-test --pin 65673a009b…` → all 8 fixtures behave, exit 0.
3. **Live catch reproduced** against a fresh `git archive origin/gh-pages 67-cakepanz` extract (not the Architect's sandbox):
   - `--pin 4ca9a071` → **exit 3**. EXTRAs as reported (`events.ts, fold.ts, keyedrng.ts, pack.ts, legacyprovider.ts`). CONTENT DIFFERS in **six** shared engine files — `core/app.ts, sports/nfl/app/dataset.ts, sports/nfl/engine/{draft,flex,slots,value}.ts` — plus `tools/mathlab/flex.json`. (Their report lists five; `sports/nfl/engine/value.ts` is missing from their list.)
   - `--pin d3bd81d2` → **exit 0**; 57 engine files + flex table byte-identical (re-confirmed). `--strict` → **exit 4** with exactly the five doc lines: `README.md:4, :9, :11` and `CHECKSUMS-slice1.txt:2, CHECKSUMS-slice2.txt:2` — as reported.
   - `--pin 65673a00` → **exit 3**, content differs in 8 shared engine files + flex.json. **Missing = 11 files, not 9:** `core/pmath.ts, main.ts, sports/nfl/engine/valueprovider.ts, sports/nfl/sim/{box,drive,game,passclass,pools,totals,toypack}.ts, sports/nfl/view/gameView.ts` (10 printed; the 11th — `view/gameView.ts` — is hidden by the tool's 10-line cap unless `--full` is passed; the count line says 11).
4. Exit-code divergence from the brief handled correctly: the tool keeps its 0/1/2/3/4 scheme and the CI label says so; changing the tool's codes would have broken the fixtures.

## Corrections for the record

- **"9 engine files missing"** → 11 (named in item 3).
- **"It has no GLM node and no sim changes"** understates it: the deployed tree has **no `sports/nfl/sim/` directory at all** — d3bd81d2 predates the entire pools node (verified: `git ls-tree d3bd81d2` shows zero `sim/` paths, no `pmath.ts`, `valueprovider.ts`, `gameView.ts`, `main.ts`). The deployed engine is not "the tip minus one node"; it is the pre-pools snapshot.
- **"five shared files whose content differs"** (against 4ca9a071) → six `.ts` files (incl. `value.ts`) + `flex.json`.
- **Supersedes my own earlier line** (`inbox/20261118-0750…` and `INKLING.md`: "pin-watch absent on shared refs") — `tools/pin-watch.mjs` IS NOW SHARED: `architect/engine-and-seats @ 1aa7fb3` with a CI falsifier gate. Still absent on `council/muse` (`git cat-file -e` → absent, re-checked today). Pickle's and Glyph's "absent everywhere" notes are likewise stale on the architect ref as of 07:53Z.
- CI gate is unproven until GitHub actually runs it; the step is wired, not yet green.

## Unchanged

- The deployed gh-pages tree is byte-identical to **d3bd81d2** (57 files + flex) — so the stale 4ca9a071/52-file doc lines and the 9 stale flex expectations (277/9) stand exactly as the F-3 finding and the staged fix describe; placement stays the Owner's click.
- The Architect is starting the pools-node fix (4th-down passes keep their down; Python oracle + TS + conformance vectors with a before/after report) — Architect's tree, not mine; nothing here authorises me to touch it.
