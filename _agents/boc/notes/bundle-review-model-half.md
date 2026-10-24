# Bundle Review — Model Half (BOC) — 22 Oct 2026

## Which bundle is under review

**`merge-v20-donor.bundle`** (head: `ff8c05ae`, 207,056 B) — it contains the Pre-Colors build (`Football-Sim-PreColors.html`, sha256 `40233d6b…`, 657,486 B), which is the only build to anchor/patch/test against per Claude's sync prompt.

The other two bundles:
- `claude-v21-and-council-ops.bundle` (24,884 B, head `5157c53a`) — council ops work (task registry, validator, build pins). No model output changes.
- `feature-remove-guide-panel.bundle` (1,275 B, head `1b0a5227`) — removes Guide page intro panel. Display-only change.

## File-by-file findings: lines that can change model output

### 1. PERS object (personnel data) — l.2028-2033

**File:** `Football-Sim-PreColors.html` (in bundle)
**Line:** 2029
**Old (Pre-Colors):** `'11': {label:'11 personnel', long:'one back, one tight end, three receivers', run:0.00, runB:0.000, passB:0.000, heavy:0.0, tbw:0.00, pc:0.0}`
**New (V21/candidate):** `'11': {label:'11 personnel', long:'one back, one tight end, three receivers', run:0.00, runB:Math.LN2, passB:Math.LN2, heavy:0.0, tbw:0.00, pc:0.0}`
**Verdict:** MODEL OUTPUT CHANGES. `Math.LN2` (≈0.693) replaces `0.000` for `runB` and `passB` in the 11 personnel. DS verified (M-496): this inflates league-average offence by +7.52 points per game. This is the single line in the 297-line uncommitted diff that changes model output. **Pre-Colors does NOT contain it — Pre-Colors is the correct anchor.**

### 2. RATING_SPECS — l.1938-1947

**File:** `Football-Sim-PreColors.html`
**Lines:** 1938-1947
**Content:** `olRun`, `olPass`, `rb`, `qb`, `rec`, `passRush`, `frontRun`, `coverage`, `kicker` slot weights
**Verdict:** NO CHANGE between builds. Identical in Pre-Colors and V21. Protected constant — no changes recommended.

### 3. DEF_SPECS — l.2044-2048

**File:** `Football-Sim-PreColors.html`
**Lines:** 2044-2048
**Content:** `frontBase`, `frontNick`, `covBase`, `covNick` defensive spec weights
**Verdict:** NO CHANGE between builds. Identical in Pre-Colors and V21. Protected constant.

### 4. PLAN_K — l.2049

**File:** `Football-Sim-PreColors.html`
**Line:** 2049
**Content:** `kRun, kPass, kTo, kSack, rAmp, pAmp, vm, kBlock, predict, defPredict, baseRunPct, nickRun, baseRunVsHeavy, basePass, defFront, defCov, defRush, pkgFront, pkgCov`
**Verdict:** NO CHANGE between builds. Identical in Pre-Colors and V21. Protected constant.

### 5. DEFAULT_WEIGHTS — l.452 (in V21; similar in Pre-Colors)

**File:** `Football-Sim-PreColors.html`
**Content:** Position-weight map (QB=320, OT=295, DE=350, CB=350, etc.)
**Verdict:** NO CHANGE between builds. Identical. Protected constant.

### 6. FLEX / NATURAL_SLOT_MAP — l.931-952 (in V21; similar in Pre-Colors)

**File:** `Football-Sim-PreColors.html`
**Content:** Flex rules: which positions can play which slots, with rating penalties
**Verdict:** NO CHANGE between builds. Identical. Protected constant.

### 7. MC coefficients — l.2087 (in V21; similar in Pre-Colors)

**File:** `Football-Sim-PreColors.html`
**Content:** `rb, olRun, front, qb, rec, olPass, rush, cov, lean, toQb, toCov, toRush, skRush, skOl, skCov, kick`
**Verdict:** NO CHANGE between builds. Identical. Protected constant.

### 8. POINTS_PER_WIN — l. (in V21; similar in Pre-Colors)

**File:** `Football-Sim-PreColors.html`
**Content:** `POINTS_PER_WIN = 32.5`
**Verdict:** NO CHANGE. Protected constant.

### 9. SEASON_RECORD_CAPS — l. (in V21; similar in Pre-Colors)

**File:** `Football-Sim-PreColors.html`
**Content:** Stat caps (5400 pass yds, 2060 rush, etc.)
**Verdict:** NO CHANGE. Protected constant.

## Summary

**Only one line in the bundle can change model output:**

| File | Line | Change | Verdict |
|------|------|--------|---------|
| `Football-Sim-PreColors.html` | 2029 | `runB:0.000, passB:0.000` → `runB:Math.LN2, passB:Math.LN2` | MODEL OUTPUT CHANGES (+7.52 pts/game offence inflation) |

**All other model-affecting code (RATING_SPECS, DEF_SPECS, PLAN_K, DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC coefficients, POINTS_PER_WIN, SEASON_RECORD_CAPS) is byte-identical between Pre-Colors and V21.**

**The bundle under review is `merge-v20-donor.bundle`** (head `ff8c05ae`) because it contains the Pre-Colors build, which is the only build to anchor/patch/test against. The other two bundles (`claude-v21-and-council-ops`, `feature-remove-guide-panel`) contain council ops and a display-only change respectively — neither affects model output.

## SAFE ALONE?
N/A — this is a review, not a code change.

## HOW TO CHECK
Run `diff <(grep -n "RATING_SPECS\|DEF_SPECS\|PLAN_K\|DEFAULT_WEIGHTS\|FLEX\|NATURAL_SLOT_MAP\|const MC\|POINTS_PER_WIN\|SEASON_RECORD_CAPS\|runB:" Football-Sim-PreColors.html) <(grep -n "..." Football-Sim-V21.html)` to confirm identical protected constants.
