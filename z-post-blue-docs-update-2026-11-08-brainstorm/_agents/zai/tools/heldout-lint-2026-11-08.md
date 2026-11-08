# Receipt: heldout-lint.mjs — held-out data lint with fit-vs-anchor distinction (Z.ai, 2026-11-08)

```
$ node _agents/zai/tools/heldout-lint.mjs --selftest
HELD-OUT LINT — scanned 5 script files under: /tmp/heldout-lint-test-UdOE0P
  held-out years: 2024, 2025 · salary tokens: salary, salaries, SALARY, Salary
  anchor allowlist source: built-in default (REPORTED; no manifest found) (10 entries)
  READ-ADJACENT violations: 2 · anchor reads (allowed): 1 · non-read references: 1
  VIOLATION /tmp/heldout-lint-test-UdOE0P/bad1.mjs:1 [year] const y = readFileSync('data/nflverse-standings-2020-2024.csv');
  VIOLATION /tmp/heldout-lint-test-UdOE0P/bad2.py:1 [ salary] sal = pd.read_csv('data/salary_table.csv')
  anchor-read /tmp/heldout-lint-test-UdOE0P/realcheck.js:1 [allowed: validation anchor] const w = readFileSync('wins2025.json'); // anchor: allowed
  reference /tmp/heldout-lint-test-UdOE0P/note.mjs:1 [comment-reference] // TODO: cross-check vs 2024 later (comment only, no read)
RESULT: FAIL — 2 fit-script violation(s). Fit scripts must not read held-out years or the salary table.
  PASS  clean file passes and violations caught
  PASS  exactly 2 violating files (anchor realcheck.js allowed)
  PASS  comment-only reference flagged as reference, not violation

$ node _agents/zai/tools/heldout-lint.mjs tools _agents  (real scan of the vloc toolchain)
HELD-OUT LINT — scanned 29 script files under: tools, _agents
  anchor allowlist source: built-in default (REPORTED; no manifest found) (10 entries)
  anchor-read tools/mathlab/run-all.sh:16 [allowed: validation anchor] run "E4 real rosters vs 2025 wins"            node "$D/realcheck.js" "$PRE" "$FIT" "$D/wins2025.json" "$D/cfg.json"
RESULT: PASS — no fit script reads held-out years or the salary table as data (anchor reads shown above are validation uses).
```

Findings (VERIFIED):
- The naive rule flags tools/mathlab/run-all.sh:16 (E4 → realcheck.js → wins2025.json) — a VALIDATION ANCHOR, i.e. the legitimate consumer of held-out data. The lint therefore distinguishes fit scripts (never read held-out years or the salary table) from anchor scripts (must read them); allowlist overridable by tools/mathlab/heldout-manifest.json (Architect-owned).
- Final real scan: PASS — 0 fit-script violations, 1 allowed anchor-read, 27 non-read references (mostly salary-table arithmetic cross-checks in weights-measure.mjs, correctly non-violations).
- Self-test 3/3 PASS (exit 0).
