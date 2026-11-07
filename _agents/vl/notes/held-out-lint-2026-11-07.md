# Held-out lint (T-governance) — VL, 2026-11-07
// Rule: no fit script may read 2024–2025 data. Fit on 2016–2023; validate on 2024; final-test 2025 (held-out, never fit).

// Enforcement (manual this round): grep fit scripts for year literals 2024/2025; inspect each hit — a match in a comment/documentation string is NOT a data read.
// Command: grep -REn "202[45]" tools/mathlab/*.mjs tools/mathlab/*.js

// Result this round (VERIFIED by running the command):
//   tools/mathlab/replacement-level-audit.mjs:10 — "2023-2025" inside a documentation string (basis text describing a measurement range), NOT a data read.
//   tools/mathlab/realcheck.js:1 — "real 2025 wins" in a header comment, NOT a data read.
//   No fit script reads a 2024/2025 file path or seasonal dataset. None of the VL tools (raw-curve-witness, triangulation, uncertainty, replacement-level-audit) read any seasonal data; they measure the engine in memory. Held-out rule satisfied vacuously for this round.
//   Automation of the lint (distinguish comments from data reads) is deferred (low effort).
