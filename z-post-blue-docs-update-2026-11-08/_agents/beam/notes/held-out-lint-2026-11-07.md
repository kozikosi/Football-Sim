# Held-out lint (T-governance) — Beam, 2026-11-07

Rule: no fit script may read 2024–2025 data. Fit on 2016–2023; validate on 2024; final-test 2025 (Claude's split, adopted over original 2024–25 blanket holdout per Z.ai synthesis §7).

Enforcement: grep fit scripts for year literals 2024/2025 in data paths; fail if found. Implemented as a manual check this round; tooling to follow.

Command (manual): grep -R "202[45]" tools/mathlab/*.mjs tools/mathlab/*.js | grep -i "wins\|stats\|snap" || echo "no held-out reads found"
