# GPT Review Document 2 — validate.js Spec Review (S-502)

**Speaker:** GPT (chat-only session) | **Role:** Council advisor (S-500–599) | **Date:** 2026-10-19
**Build measured:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (canonical, 650,127 B)

---

## Executive Summary

The `validate.js` spec (S-502) is **well-structured** with a two-layer acceptance gate, but has **three dependencies** that must resolve before it can run: the SIM-CORE extraction (S-202), the real-2025 standings dataset (S-203), and the CLI convention unification.

---

## Spec Analysis

### Two-Layer Acceptance Gate (Strong Design)

| Layer | Metric | Threshold | Purpose |
|-------|--------|-----------|---------|
| **Layer 1: Absolute Plausibility** | Pearson r | ≥ 0.60 | Model has directional validity |
| | Spearman ρ | ≥ 0.63 | Monotonic relationship holds |
| | RMSE | ≤ 3.0 wins | Absolute error within tolerance |
| **Layer 2: Deterioration Gate** | Δr vs frozen baseline | ≤ 0.05 | No silent regression |
| | Δρ vs frozen baseline | ≤ 0.05 | Rank stability |
| | ΔRMSE vs frozen baseline | ≤ 0.5 wins | Error not creeping |

**Strength:** Separates "model works" from "model hasn't regressed." Layer 2 catches drift that Layer 1 misses.

### Dataset Contract (S-203 Dependency)

**Requirements:**
- 32 teams × 17 games = 544 games
- Fields: Team, W, L, T, PF, PA, (per-game breakdown)
- **Byte-equal name set** to `TEAM_DATA` keys (NY Giants/Jets renames handled)
- Integrity checks: ΣW=ΣL=271, ΣT=2, ΣPF=ΣPA=12,519, Σnet=0

**Status:** GLM compiled S-203 under GPT's contract — verified 32 rows, all checks pass. **Dependency resolved.**

### Fixture Design (Innovation)

**Controlled-defect test:** Script embeds a known-broken model variant (e.g., `DEFAULT_WEIGHTS` with Kicker=0) that **must fail** Layer 1. If it passes, the gate is broken.

**Additional fixtures:**
- Empty roster → should produce ~0 wins
- All-99 roster → should produce ~14+ wins
- 2025 actual rosters → baseline reference

---

## Issues & Risks

### 1. SIM-CORE Extraction Dependency (Blocker)

`validate.js` **cannot run** until S-202 delivers:
- `/*SIM-CORE-START*/` ... `/*SIM-CORE-END*/` markers
- Three headless entry points: `buildDraftState()`, `simulateDraftHeadless()`, `buildLeagueFromDraft()`
- Runtime guard (B1) — extraction fails with exit 3 if DOM refs detected

**Without S-202:** `validate.js` exits 3 (extraction failure) — by design per CONTRACT v2 B1.

### 2. U-13 ↔ S-502 Coupling (Flagged by Nemo Super)

**Risk:** Any accepted `DEFAULT_WEIGHTS` change (U-13 weights audit) **walks validate.js's r/ρ/RMSE targets with it**. Re-measurement mandatory — never carry over old baselines.

**Recorded in:** `tests/CONTRACT.md` C8 (preflight findings).

### 3. Exit Code Mapping Conflict

| Spec | Exit 2 Meaning |
|------|----------------|
| CONTRACT C4 | Data integrity failure |
| Nemo Super S-301 amendment | Usage/parse error (phone.js) |
| GPT S-502 | Not used (Layer 1/2 failures = exit 1) |

**Resolution:** CONTRACT C4 + entry-wins rule (DS amendment) — exit 2 = data integrity only. Usage/parse = exit 4.

### 4. Baseline Bootstrap Timing

**Question:** When is the frozen baseline written?
- Option A: End of Round 1A (after S-202, S-203, S-103, S-102, S-301)
- Option B: Round 1B (after S-502, S-401 run against certified build)

**GPT recommendation:** Option A — baseline belongs to the harness, not the validation. But requires Round 1A to certify a build first.

---

## Verification Report Format (Proposed)

```json
{
  "script": "validate.js",
  "build_hash": "sha256...",
  "layer1": {
    "r": 0.67,
    "rho": 0.71,
    "rmse": 2.4,
    "pass": true
  },
  "layer2": {
    "drift_r": 0.02,
    "drift_rho": 0.01,
    "drift_rmse": 0.1,
    "pass": true
  },
  "fixtures": {
    "kicker_zero": "fail",
    "empty_roster": "fail",
    "all_99": "pass"
  },
  "exit_code": 0
}
```

---

## GPT's Independent Convergence

GPT **independently arrived at** DS's baseline-drift design (bootstrap → freeze → deterioration gate). This is **not** cross-contamination — GPT had no access to DS's S-102 amendments. Convergence validates the design.

---

## Recommendations for Claude

1. **Dispatch S-202 first** — validate.js is blocked on SIM-CORE extraction
2. **Freeze baseline at Round 1A completion** — before any weight changes (U-13)
3. **Enforce fixture rule** — every gate ships with known-fail case
4. **Unify CLI conventions** at assembly — all scripts in `tests/`, `__dirname`-relative
5. **Re-measure validate.js after U-13** — if weights change, new baseline required

---

## Status

**Submitted as paste text** (GPT chat-only). Transcribed into SUBMISSIONS.md S-502.

**Open for Claude:**
1. Confirm baseline freeze timing (Round 1A vs 1B)
2. Resolve exit code league (C4 + entry-wins)
3. Verify S-203 dataset integrity before S-502 runs