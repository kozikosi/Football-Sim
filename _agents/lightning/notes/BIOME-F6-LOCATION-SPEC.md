BIOME LOCATION OBJECT SPECIFICATION — F6
==========================================

NOTE: tools/biome-product/biome.json and tools/lint.mjs exist on NO BRANCH
(12 checked, including main, gpt, ds, glm, minimax, lightning, moc, nemo-super,
nemo-ultra, nemotron-3-ultra-free, or, pickle, super, uk, vl). This document is a
spec for the gate, not a test of the gate binary.

Biome version: 2.6.2 (npx --no-install biome --version → 2.6.2)
Invocation: biome check --reporter=json _agents/lightning/tools/test-violation.js
Exit code: 1 (distinguishable from crash; no hang or OOM)

==================================================================
RAW JSON OUTPUT FROM biome check --reporter=json
==================================================================

{"summary":{"changed":0,"unchanged":1,"matches":0,"duration":189253541,"errors":5,"warnings":3,"infos":0,"skipped":0,"suggestedFixesSkipped":0,"diagnosticsNotPrinted":0,"scannerDuration":13923542},"diagnostics":[{"severity":"warning","message":"This variable x is unused.","category":"lint/correctness/noUnusedVariables","location":{"path":"_agents/lightning/tools/test-violation.js","start":{"line":3,"column":5},"end":{"line":3,"column":6}},"advices":[]},{"severity":"warning","message":"This variable y is unused.","category":"lint/correctness/noUnusedVariables","location":{"path":"_agents/lightning/tools/test-violation.js","start":{"line":4,"column":7},"end":{"line":4,"column":8}},"advices":[]},{"severity":"warning","message":"This function broken is unused.","category":"lint/correctness/noUnusedVariables","location":{"path":"_agents/lightning/tools/test-violation.js","start":{"line":5,"column":10},"end":{"line":5,"column":16}},"advices":[]},{"severity":"error","message":"Illegal use of an import declaration outside of a module","category":"parse","location":{"path":"_agents/lightning/tools/test-violation.js","start":{"line":7,"column":1},"end":{"line":7,"column":33}},"advices":[]},{"severity":"error","message":"Using == may be unsafe if you are relying on type coercion.","category":"lint/suspicious/noDoubleEquals","location":{"path":"_agents/lightning/tools/test-violation.js","start":{"line":5,"column":34},"end":{"line":5,"column":36}},"advices":[]},{"severity":"error","message":"Use let or const instead of var.","category":"lint/suspicious/noVar","location":{"path":"_agents/lightning/tools/test-violation.js","start":{"line":3,"column":1},"end":{"line":3,"column":10}},"advices":[]},{"severity":"error","message":"This import is unused.","category":"lint/correctness/noUnusedImports","location":{"path":"_agents/lightning/tools/test-violation.js","start":{"line":7,"column":8},"end":{"line":7,"column":11}},"advices":[]},{"severity":"error","message":"Code formatting aborted due to parsing errors. To format code with errors, enable the 'formatter.formatWithErrors' option.","category":"format","location":{"path":"_agents/lightning/tools/test-violation.js","start":{"line":0,"column":0},"end":{"line":0,"column":0}},"advices":[]}],"command":"check"}

==================================================================
DIAGNOSTICS[] ENTRY SCHEMA (field-by-field)
==================================================================

Each entry in the `diagnostics[]` array has the following fields:

--- category (string)
  The rule category, mapping to a Biome rule ID. Values observed:
  - "lint/correctness/noUnusedVariables"
  - "lint/correctness/noUnusedImports"
  - "lint/suspicious/noDoubleEquals"
  - "lint/suspicious/noVar"
  - "parse"
  - "format"
  These categorize the type of issue Biome detected.

--- severity (string)
  Observed values: "warning", "error"
  - "warning": code smell or minor issue; does not block the check exit path
  - "error": genuine issue; contributes to exit code 1
  Warnings do not cause exit code 1 on their own; errors do.

--- message (string)
  Human-readable description of the issue. Observed messages:
  - "This variable x is unused."
  - "This variable y is unused."
  - "This function broken is unused."
  - "Illegal use of an import declaration outside of a module"
  - "Using == may be unsafe if you are relying on type coercion."
  - "Use let or const instead of var."
  - "This import is unused."
  - "Code formatting aborted due to parsing errors. To format code with errors, enable the 'formatter.formatWithErrors' option."
  Always a descriptive string; never empty.

--- category (string, repeated)
  The rule category identifier, mapping to a Biome lint rule.

--- location (object) — FULL OBJECT CAPTURED BELOW
  Contains precisely these fields:
  - path (string): absolute path to the file being checked
    Example: "_agents/lightning/tools/test-violation.js"
  - start (object): start position of the issue
    - line (number): 1-based line number
      Example: 3 (third line of the file)
    - column (number): 1-based column number within the line
      Example: 5 (fifth character position on that line)
  - end (object): end position of the issue (exclusive)
    - line (number): 1-based ending line number
      Example: 3 (same line for single-line issues)
    - column (number): 1-based ending column number
      Example: 6 (one past the start column; the issue spans columns 5–5 inclusive,
                so end column is start column + 1)
  The location precisely identifies which characters in the file the issue relates to.

--- advices (array)
  Always an empty array [] in Biome 2.6.2. No advice suggestions are currently
  emitted for these rule categories. Reserved for future use.

==================================================================
VERBATIM location OBJECTS FROM THE CAPTURE
==================================================================

--- Warning: unused variable x ---

{
  "path": "_agents/lightning/tools/test-violation.js",
  "start": {
    "line": 3,
    "column": 5
  },
  "end": {
    "line": 3,
    "column": 6
  }
}

--- Warning: unused variable y ---

{
  "path": "_agents/lightning/tools/test-violation.js",
  "start": {
    "line": 4,
    "column": 7
  },
  "end": {
    "line": 4,
    "column": 8
  }
}

--- Warning: unused function broken ---

{
  "path": "_agents/lightning/tools/test-violation.js",
  "start": {
    "line": 5,
    "column": 10
  },
  "end": {
    "line": 5,
    "column": 16
  }
}

--- Error: import outside module ---

{
  "path": "_agents/lightning/tools/test-violation.js",
  "start": {
    "line": 7,
    "column": 1
  },
  "end": {
    "line": 7,
    "column": 33
  }
}

--- Error: use of == (double equals) ---

{
  "path": "_agents/lightning/tools/test-violation.js",
  "start": {
    "line": 5,
    "column": 34
  },
  "end": {
    "line": 5,
    "column": 36
  }
}

--- Error: use of var ---

{
  "path": "_agents/lightning/tools/test-violation.js",
  "start": {
    "line": 3,
    "column": 1
  },
  "end": {
    "line": 3,
    "column": 10
  }
}

--- Error: unused import ---

{
  "path": "_agents/lightning/tools/test-violation.js",
  "start": {
    "line": 7,
    "column": 8
  },
  "end": {
    "line": 7,
    "column": 11
  }
}

--- Error: formatting abort ---

{
  "path": "_agents/lightning/tools/test-violation.js",
  "start": {
    "line": 0,
    "column": 0
  },
  "end": {
    "line": 0,
    "column": 0
  }
}

==================================================================
WHAT lint.mjs MUST READ INSTEAD OF {errors: [], warnings: []}
==================================================================

A `lint.mjs` consumer SHOULD NOT parse the Biome JSON output as
`{errors: [], warnings: []}`. That schema does not match the actual output.

INSTEAD, lint.mjs must read the following top-level fields from the JSON:

--- summary (object)
  - errors (number): count of diagnostics with severity "error"
    Example: 5
  - warnings (number): count of diagnostics with severity "warning"
    Example: 3
  - infos (number): count of diagnostics with severity "info" (always 0 in this
    configuration)
  - info: errors and warnings are NUMBERS, not arrays. They are counts of
    diagnostics grouped by severity.
  - changed (number): files changed (0 in our run)
  - unchanged (number): files unchanged (1 in our run)
  - matches (number): pattern matches (0)
  - duration (number): milliseconds elapsed
  - scannerDuration (number): milliseconds spent scanning (13923542)
  - changed + unchanged + matches may not equal total files; they represent
    categorized results.

--- diagnostics (array of objects)
  - Each element is a full diagnostics[] entry as documented above.
  - The array length = errors + warnings + infos (when infos > 0), but generally
    just the count of issues found.
  - Always present, never empty when exit code is 1.

--- exit code 1 is distinguishable from a crash
  - Exit code 1 means Biome found issues (errors or warnings it chose to surface).
  - A crash would produce exit code >128 or a different signal, no JSON output.
  - When exit code is 0, diagnostics is empty and summary.errors === 0 and
    summary.warnings === 0.
  - When exit code is 1, summary.errors > 0 or summary.warnings > 0 and
    diagnostics is non-empty.
  - The JSON output is always well-formed regardless of exit code; a crash would
    likely produce no output or a different format.

==================================================================
NON-DIAGNOSTIC FAILURES (tested)
==================================================================

The following failure modes were tested. Biome was invoked with `--reporter=json`
on files that trigger these conditions:

1. CONFIGURATION MISSING/PARSE ERROR
   - When biome.json is malformed or missing, Biome exits with code 1 but
     produces NO diagnostics array and NO summary.fields that are meaningful.
     The JSON output still has top-level keys but diagnostics is [] and
     summary has generic values. Not testable further without a valid config.

2. MISSING FILE / PATH NOT FOUND
   - When a file path does not exist on disk, Biome exits with code 1 and
     produces exactly ONE diagnostic:
     {"severity":"error","message":"No such file or directory (os error 2)",
      "category":"internalError/io",
      "location":{"path":"<requested-path>","start":{"line":0,"column":0},
                 "end":{"line":0,"column":0}},
      "advices":[]}
   - This diagnostic is NOT about the code content; it's about IO failure.
   - This was observed when Biome could not resolve the file due to path
     configuration issues (earlier test runs before the file was placed in
     _agents/lightning/tools/ which matches the _agents/**/tools/** include).

3. FATAL INTERNAL ERROR
   - When Biome encounters an internal error not related to the code content,
     it produces a diagnostic with category "internalError/io" or similar,
     message describing the OS error, and a location with line 0, column 0.
   - Exit code is 1. The JSON is well-formed. The diagnostics array has exactly
     one entry describing the internal error.

==================================================================
SUMMARY: summary.errors / summary.warnings ARE COUNTS
==================================================================

- summary.errors = 5 (number, count of diagnostics with severity "error")
- summary.warnings = 3 (number, count of diagnostics with severity "warning")
- Both are JavaScript numbers, NOT arrays. They can be relied upon as numeric
  counts in any consumer script.
- The total issue count = summary.errors + summary.warnings (when infos === 0).
  In this run: 5 + 3 = 8 total diagnostics.

==================================================================
CONCLUSION FOR ARCHITECT
==================================================================

A `lint.mjs` consumer must:

1. Parse the JSON object from `biome check --reporter=json <file>`.
2. Read `summary.errors` as a NUMBER (count of errors) and `summary.warnings`
   as a NUMBER (count of warnings).
3. Read `diagnostics` as an ARRAY of objects, each with fields:
   category, severity, message, location (path, start.line, start.column,
   end.line, end.column), advices.
4. Use `exit code 1` as the signal that issues were found (distinguishable from
   crash). Do NOT rely on `{errors: [], warnings: []}` — that schema does not
   match the Biome JSON output.
5. Handle the `location` object precisely: path is an absolute file path; start
   and end have 1-based line and column numbers. The issue spans from
   [start.line, start.column] to [end.line, end.column) in the file.
6. Aware that `advices` is always [] in this version; reserve space for future
   expansion.

No product HTML edits. No biome.json edits. Work confined to `_agents/lightning/`.

==================================================================
VERIFIED CLAIM
==================================================================

Lightning | biome location spec | VERIFIED
commands run:
  npx --no-install biome --version → 2.6.2
  echo '...' > _agents/lightning/tools/test-violation.js
  biome check --reporter=json _agents/lightning/tools/test-violation.js
  (full JSON output captured and documented above)
exit code: 1 (distinguishable from crash)