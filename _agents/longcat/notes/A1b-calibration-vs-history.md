# A1b — Calibration vs history: where the real 2025 wins data lives, and whether r≈0.66 is reproducible

SPEAKER: LongCat | ROLE: Council member | TASK: A1b — calibration vs history | DATE: 2026-10-22
Anchor build: `_agents/pickle/builds/Football-Sim-PreColors.html` sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B (VERIFIED).
Hold §7 respected: no candidates, no renumbering, no bulletin trim, no product edit. Propose only.

## Answers in one line each

**A1b bulletin line:** `M-20261022-A1b · LongCat · data FOUND (SUBMISSIONS.md §S-203 paste, not materialized) · reproducible NO · r≈0.66/ρ≈0.69/RMSE≈2.6 stays REPORTED · VERIFIED (commands below)`

## 1. Where the real 2025 wins data lives — FOUND, but only as a proposal paste

- **The data exists in the tree, but not as a runnable file.** `tests/2025_standings.js` does not exist (glob `**/*2025_standings*` → 0 files; `ls tests/` → CONTRACT.md, e2e-smoke.mjs, guide-flex-table-390px.spec.js, madden-sim.spec.js, openchamber-e2e-v2.spec.js, openchamber-e2e.spec.js, value-here-390px-test.spec.js).
- **It survives verbatim inside `SUBMISSIONS.md` §S-203** (GLM, proposed 2026-10-19, status *pending*): the full 32-row `[teamName, wins, losses, ties, pointDiff]` table quoted in the entry's code block, with provenance (NFL.com 2025 REG league standings + Wikipedia "2025 NFL season" § Regular season standings, both fetched 2026-10-19, agreeing on W-L-T-PF-PA for all 32 teams).
- **My own integrity re-check of that paste (VERIFIED, node):** extracted the code block to /tmp and required it — 32 rows; every row W+L+T = 17; ΣW = ΣL = 271; ΣT = 2 (ties on DAL and GB); Σnet (point differential) = 0; name set byte-equal to the Pre-Colors `TEAM_DATA` key set in **both** directions (0 table-only names, 0 TEAM_DATA-only names; TEAM_DATA parsed from the `const TEAM_DATA = {` line of the anchor build, 32 keys). GLM's stated integrity log reproduces exactly.
- **The prose claim lives in four doc sites and one product site:** `AGENTS.md:71`, `docs/TEST-PLAN.md:69`, `_multi-sport/README.md:420`, and the build's own Guide section "Does the model predict real results?" (`NFL Draft Simulator merged.html:6132`, same text in Pre-Colors' lineage), which itself says *"This check was run once at build time on 2025 results and is not recomputed live."*

## 2. Is the claim reproducible today? — NO

- **`validate.js` does not exist as a working script.** The only file matching `validate*.js` is `_agents/beam/notes/harness-drafts/validate.js` — a deliberate stub that exits **2** (missing `tests/2025_standings.js`) or **3** (no SIM-CORE markers / no DOM-free entry points) by design. It computes nothing.
- **Pre-Colors carries 0 SIM-CORE markers** (grep `SIM-CORE-START|SIM-CORE-END` → 0). Even with the dataset materialized, the extraction path GPT's S-502 and CONTRACT.md depend on is absent from the anchor build.
- **The projection method was never implemented.** GPT's S-502 spec (SUBMISSIONS.md, `tasks/ROUND-1-GPT.md`) defines the comparison basis and exit codes, but no implementation exists anywhere in the tree. The strength→projected-wins mapping therefore exists only in prose.
- **Conclusion:** the numbers r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6 are **REPORTED** — repeated across docs and displayed in the product's Guide as a build-time one-off. Per the assignment rule: with no executable path from the anchor build + dataset to those three numbers, **the claim cannot be raised to VERIFIED by any seat today**. (It also must be re-measured, never carried over, after any accepted DEFAULT_WEIGHTS change — CONTRACT.md §U-13/S-502 coupling already says this.)

## 3. What a calibration would need that the tree does not have

1. **Materialize `tests/2025_standings.js`** from the S-203 paste — one new file, exact content already written and integrity-checked (mine above + GLM's original). Architect action (new file outside any lane; propose-only under hold §7).
2. **A working `validate.js`** implementing GPT's S-502 spec (exit 0/1/2/3/4, parseable `VALIDATE: r=…, rho=…, rmse=… PASS|FAIL` line, two-layer gates). Beam's draft is the skeleton, not the engine.
3. **DOM-free entry points or a browser-driven projection path.** Pre-Colors has no SIM-CORE markers; two known routes: (a) S-202 markers + headless signatures (blocked, V23 hold), or (b) drive the build over CDP/Playwright with its own `teamRatings`/`lineupWins`/`pearson` functions — MOC's and DS's probe receipts show this route works read-only without touching the build.
4. **The frozen-baseline fixture rule** (GPT S-502 § two-layer acceptance + the controlled-defect test): at least one known-fail case, or the gate passes trivially and detects nothing (DS's pw4 lesson).

## Not checked

- I did not re-run any season simulation; no seeded RNG needed for this question (the projection in S-502's design is analytic, roster-strength-based, not simulated).
- I did not audit the S-203 numbers against NFL.com live (sources were fetched 2026-10-19 by GLM); I verified internal consistency and name matching only.
