# gh-pages fix — 67-cakepanz/ pin lines (Z.ai · cakepanz-6 · 2026-11-18)

## The defect (F-3, measured this sitting)
The deployed `67-cakepanz/` on `origin/gh-pages` (tip `66096fb`, "re-pin engine snapshot
4ca9a071 -> d3bd81d2") names a pin its bytes are not:

- `README.md:4` + `README.md` §"What was copied" + `CHECKSUMS-slice2.txt:2` say **4ca9a071 / 52 files**;
- the deployed `src/engine` is byte-identical to **d3bd81d2**'s `colors/src` — `diff -rq` → exit 0,
  **57 .ts files** on both sides (the re-pin's own stat shows exactly the 5 added core modules:
  events, fold, keyedrng, pack + legacyprovider → 52+5=57);
- the deployed `tools/mathlab/flex.json` is byte-identical to the pin's (`cmp` → exit 0) — the
  99-rule table (17/17/42/23 at 0/2/6/12) is the one flex identity across d3bd81d2 → 5c808472 → 65673a00;
- and the file count itself disproved the old lines before any hash did (the F-3 lesson: count
  first, spot-hash second, manifest hash never alone).

## What the fix changes (two files, four lines, nothing else)
1. `README.md` — the Pinned-engine-commit line and the What-was-copied line now name `d3bd81d2`
   / 57 files, with the re-pin provenance (bytes re-pinned 2026-11-15 by gh-pages `66096fb`).
2. `CHECKSUMS-slice2.txt` — the snapshot line names `d3bd81d2` / 57 files; the engine-tests line
   now carries the MEASURED verdict at the deployed bytes instead of the stale 284/284:
   **286 tests, 277 pass / 9 FAIL** (npm ci && npm run test:engine, 2026-11-18) — every red is a
   flex-table expectation from the pre-re-pin suite. That red is OPEN (the Owner/Architect decide
   the re-point; the cakepanz-4 shell tree already carries the re-pointed suite pattern). REPORTED,
   not fixed — the engine and its suite are not mine to edit.

## How to place it
Copy the two corrected files over `67-cakepanz/README.md` and `67-cakepanz/CHECKSUMS-slice2.txt`
on `gh-pages` (one commit). Nothing else moves — the zip carries those two files plus this receipt
(three files total; the c8 A7 correction — the F3 listing says the same), taken from
the deployed bytes with the four lines corrected.

## Receipts (this sitting, 2026-11-18)
- diff -rq deployed src/engine vs d3bd81d2 colors/src → exit 0 (57 files each)
- cmp deployed tools/mathlab/flex.json vs d3bd81d2's → exit 0
- deployed tree npm ci → exit 0; npm run test:engine → 286 tests / 277 pass / 9 fail (the 9 named above)
- sha256 of the two corrected files (as staged here):
- README.md sha256 2a28bc153bcffbaf2243053b42a05a1a1c9c5c29ba9b342f4367685d76c595aa (11346 B)
- CHECKSUMS-slice2.txt sha256 d5a67371e769086ac0b7f2660e6b0377941c5b5ac2d8aa5b8691b6d15c776dfd (1560 B)
