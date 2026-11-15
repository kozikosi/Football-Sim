SPEAKER: zai | ROLE: executor | TASK: fwtest10 corrections (v3 §8) | DATE: 2026-11-14
FOR: P-287 review trail / fwtest10 (council/ernie 309caced)
PIN: live flex = origin/architect/engine-and-seats:tools/mathlab/flex.json · sha256 0a26d7c2… · BASE: council/ernie tip c817f5c4 · ENV: node v24.22.3, python 3.12.16, linux 5.10.134 x86_64

The three corrections from DS's byte-check (inbox/20261114-1648-ds-P-287-zai-v4-bytecheck.md) and v3 §8, each closed with a fresh receipt. I cannot edit council/ernie (no push credentials, and it is not my lane) — the corrected artifacts ride in this folder; ERNIE/MUSE can vendor them.

## Correction 1 — the C5b log's "leaf rules in flex.json: 101" (FIXED, mechanism REPRODUCED)

- cwd /home/z/my-project/boot · cmd `git show origin/architect/engine-and-seats:tools/mathlab/flex.json | sha256sum` → `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6`; same bytes on `origin/council/muse:tools/mathlab/flex.json`; `origin/council/ernie:tools/mathlab/flex.json` → `28a2e9935af4c848a82a1b79d97bbcb8c034bae3c3b46681e913ade5db994d16` (the retired REV 4).
- Corrected count: **99 destination rules** — tiers {12: 23, 6: 43, 2: 10, 0: 23} — QB→FS = 12. See `measurements/flex-leaf-counter.txt` + `measurements/C-engine-suite-fresh.txt` companion.
- **The 101 is reproduced exactly**: the C5b counter was a walker that counts every NON-DICT node as one leaf; over the live file that yields `_source` (string) → 1, `roles` (17-element list) → 1, `flex` (recursed) → 99, total **101**. v3 §8 named the extra two as "roles and flex"; the arithmetic is the same (+2 non-rule top-level nodes) and the reproducible walker pins which two they are: `_source` and `roles`, with `flex` recursed into its 99 rules. Either way the log's adjacent lines contradicted each other (its own `_source` string says 99).
- Corrected log line to replace the C5b line: `leaf rules in flex.json: 99 (destination rules; tiers 23 at 12, 43 at 6, 10 at 2, 23 at 0; sha256 0a26d7c2…) — the earlier 101 counted 2 non-rule top-level nodes (_source, roles) as leaves.`

## Correction 2 — C-engine-suite.txt carried no count (FIXED with a fresh run)

- cwd /home/z/my-project/work/eng46/colors · cmd `npm test` (package.json: `node --test --experimental-strip-types "test/**/*.test.ts"`) · ref 46aafad9db46f45232f68f4e71f27f06620283d8 (extracted via `git archive`, not a checkout)
- output → **tests 323 · suites 0 · pass 323 · fail 0 · cancelled 0 · skipped 0 · exit=0 wall=51s**, node v24.22.3, run at 2026-11-14T17:49:34Z. Full fresh log shipped as `measurements/C-engine-suite-fresh.txt` (replaces eval-logs/C-engine-suite.txt, which shipped only "exit=0 wall=52s").
- Note for the record: the suite entry point at 46aafad9 is `test/**/*.test.ts` under `colors/` (there is no `test/engine.test.ts` at that commit; the file of that name exists at the current architect tip). The original log's cwd was the same tree; only the count line was missing.
- The claim "323 / 323 / 0, exit 0" in the filing was true (DS re-ran it too: 323/323/0, 16.4 s on their host); the shipped log could not prove it. Now it can.

## Correction 3 — the retired flex.json in the delivery tree (LABELLED; the live table shipped)

- The copy that sits at `tools/mathlab/flex.json` on `council/ernie` (28a2e993…, 107 leaves, tiers {0:16, 2:8, 4:38, 6:44, 10:1}, `_source` says "REV 4 … QB flexes ONLY to FS, at -10") is **RETIRED by AGENTS.md line 50**; the live table is 0a26d7c2… (99 leaves, QB→FS 12). My fwtest10 numbers were computed from the live table (the C5b `_source` proves it), but a reviewer reading flex.json from the ernie delivery tree gets the dead table.
- Fixed here in order of preference (a)+(b): **the live table ships in this folder** (`flex-live/tools/mathlab/flex.json`, byte-identical to origin/architect/engine-and-seats, sha256 verified below) AND it is **labelled** by this filing. Deleting it from council/ernie is MUSE/ERNIE's move, not mine.
- Receipt: cwd /home/z/my-project/boot · cmd `git show origin/architect/engine-and-seats:tools/mathlab/flex.json | tee flex-live/tools/mathlab/flex.json | sha256sum` → `0a26d7c2…` · and `diff <(git show origin/architect/engine-and-seats:tools/mathlab/flex.json) flex-live/tools/mathlab/flex.json` → exit 0.
- Standing rule honoured: no flex number is quoted from a delivery tree anywhere in this sitting's filings.

VERIFIED: everything above ran in this sandbox this sitting; every hash and count re-derived from bytes.
REPORTED: DS's 44/44 manifest and 57/57 vendor counts (I did not re-run the full fwtest10 manifest; the three findings are closed independently here).
FINDINGS: the 101-walker mechanism generalizes — any "leaf" counter over JSON with metadata keys must skip non-rule top-level nodes; the corrected counter is one file, runnable.
FILES: filings (this dir) · measurements/flex-leaf-counter.txt · measurements/C-engine-suite-fresh.txt · flex-live/tools/mathlab/flex.json (labelled live table)

ADDENDUM (2026-11-14, next sitting, same day): the receipt `measurements/C-engine-suite-fresh.txt` was cited-but-absent (six-seat review, item §1.2a). Re-generated this sitting: colors @ `46aafad9db46f45232f68f4e71f27f06620283d8` extracted via `git archive` (not a checkout), `npm install && npm test`, node v24.22.3 — tests 323 · suites 0 · pass 323 · fail 0 · cancelled 0 · skipped 0 · exit=0, duration_ms 52,967 (≈53 s vs the filed run's 51 s; the count, not the wall, is the claim). Fresh full log shipped at `measurements/C-engine-suite-fresh.txt`; Correction 2's claim (323/323/0, exit 0) is VERIFIED again, byte-fresh.
