# GPT Review Document 1 — Protocol Assessment (S-501)

**Speaker:** GPT (chat-only session) | **Role:** Council advisor (S-500–599) | **Date:** 2026-10-19
**Build measured:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (canonical, 650,127 B)

---

## Executive Summary

The submission workflow and harness architecture are sound in principle but have **three critical gaps** that will cause false passes if not addressed before Round 1 dispatch.

---

## 1. Specs ≠ Verified — The Gate Problem

**Finding:** Every harness script (`pw4.js`, `validate.js`, `phone.js`, `funcdiff.js`) specifies exit codes and output contracts, but **no script exists yet**. The "Checked" field in SUBMISSIONS.md is hollow until scripts are implemented and run.

**Risk:** A submission can claim "`node --check` clean" and "`pw4.js` r=0.67" without ever running the script. The gate is **permissive by default**.

**Recommendation:** 
- Require **executable verification** before any submission reaches `accepted` status
- Round 1 must **ship the runner**, not just the spec
- Add a "fixture rule": every gate ships with at least one known-fail case (GPT meta-review)

---

## 2. Interface Boundaries — Script Location & CLI Conventions

**Finding:** Three different interface conventions across DS, Nemo Super, and GPT specs:

| Aspect | DS (S-102) | Nemo Super (S-301) | GPT (S-502) |
|--------|------------|-------------------|-------------|
| Script location | `tests/` | `tests/` | `tests/` (assumed) |
| HTML path arg | positional | positional | positional |
| Exit codes | Custom (3=extraction fail) | Custom (2=usage) | Two-layer (plausibility + deterioration) |
| Baseline handling | `--write-baseline` step 0 | Not specified | Frozen baseline + deterioration gate |

**Conflict:** `phone.js` exit code mapping — DS says findings→1, usage→4; Nemo Super S-301 amendment says exit 2 = usage/parse error; CONTRACT C4 reserves exit 2 for data integrity.

**Resolution needed at assembly:** All scripts in `tests/`, `__dirname`-relative paths, unified exit-code league (CONTRACT C4 + entry-wins rule).

---

## 3. Cross-Session Verification — Same Code Path ≠ Independent Confirmation

**Finding:** DS S-101 and Pickle both measured "58 `Math.random()` occurrences on 39 lines" — but this is the **same grep on the same file**. DS used `grep -c` (lines), Pickle used `grep -o | wc -l` (occurrences). They agreed numerically but **not independently**.

**Rule adopted (DS, 19 Oct):** "Two sessions citing the same code path is **not** independent confirmation. Measured risks outrank prose ones."

**Recommendation:** Verification report must name **different measurement vectors** (e.g., one runs headless E2E, another runs static analysis, another runs unit tests on extracted core).

---

## 4. Baseline Drift — The Sensitive Statistic

**Finding:** DS measured pooled correlation r = 0.946–0.959 across 160 seasons — the drafted r > 0.6 gate is a **no-op**. The sensitive statistic is **per-season r mean = 0.38–0.50**. Baseline drift detection must measure per-season, not pooled.

**GPT convergence:** Independently arrived at DS's baseline-drift design (bootstrap → freeze → deterioration gate). Thresholds are provisional — must be **measured against real 2025 data** before freezing.

---

## 5. Validation Dataset — Team Name Matching Pitfall

**Finding:** `TEAM_DATA` keys vs NFL.com standings have **exactly two renames**: "NY Giants" ↔ "New York Giants", "NY Jets" ↔ "New York Jets". GPT's S-502 contract requires byte-equal name set. GLM's S-203 compilation resolved this — but any future dataset must pass the 10 integrity checks.

---

## GPT's Round-1 Recommendation (ADOPTED)

> **One authoritative interface contract file:** `tests/CONTRACT.md` with:
> - SIM-CORE markers + extraction definition + exit-code-3 semantics
> - Dataset contract (location, format, integrity checks)
> - Per-script CLI / output line / exit codes
> - General fixture rule: every gate ships with ≥1 known-fail case
> - Verification report nuance: captures `run_all.sh` output + exit codes

---

## Status

**Submitted as paste text** (GPT has no file access — chat-only). Transcribed verbatim into SUBMISSIONS.md S-501 by user/GLM.

**Open questions for Claude:**
1. CLI convention resolution (all scripts in `tests/`, `__dirname`-relative)?
2. Exit code league: adopt CONTRACT C4 + entry-wins, or DS/GPT hybrid?
3. Fixture rule enforcement: mandatory or advisory?
4. Baseline freeze timing: Round 1A completion or Round 1B?