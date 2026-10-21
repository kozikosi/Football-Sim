# TEST-PLAN.md — Unified Test Strategy

**Version:** 1.0  
**Last Updated:** 2026-10-20  
**Status:** Post-merge (pre-v21) — harness scripts not yet implemented

---

## 1. Test Strategy Overview

### 1.1 Test Pyramid
```
                    ┌─────────────┐
                    │   E2E (1)   │  ← post-merge-smoke.mjs (full draft→season→playoffs→100-season)
                   ┌──────────────┐
                  │  Integration │  ← pw4.js (100-season regression), validate.js (2025 validation)
                 ┌───────────────┐
                │   Unit Tests   │  ← funcdiff.js, phone.js, validate.js, pw4.js, run_all.sh
               └─────────────────┘
```

### 1.2 Test Levels

| Level | Scope | Tools | Trigger | Gate |
|-------|-------|-------|---------|------|
| **Unit** | Individual functions (`slotWins`, `cpuPick`, `optimalLineup`, etc.) | `funcdiff.js` (function-level diff), `funcdiff-detail.js` | Pre-commit / PR | `node --check` + unit assertions |
| **Integration** | Module interactions (draft→season, lineup→ratings, game→stats) | `pw4.js` (100-season regression), `validate.js` (2025 validation) | Pre-merge | Exit 0 + thresholds |
| **E2E** | Full draft → season → playoffs → Super Bowl → 100-season report | `post-merge-smoke.mjs` (Playwright) | Pre-promotion | Exit 0 + all checks pass |
| **Mobile** | 390px layout, element-level overflow, touch interactions | `phone.js` (static lint) + `cdp-phone-check.mjs` (dynamic) | Pre-merge | Exit 0 + 0 overflow |

---

## 2. Test Matrix

### 2.1 Unit Test Coverage Targets

| Module | Functions | Target Coverage | Status |
|--------|-----------|-----------------|--------|
| Valuation (`slotWins`, `slotWinsPerOvr`, `modelWeights`) | 3 | 100% | ❌ Not implemented |
| Draft (`cpuPick`, `userFits`, `optimalLineup`) | 4 | 100% | ❌ Not implemented |
| Lineup (`optimalLineup`, `effOvr`, `flexPenaltyFor`) | 3 | 100% | ❌ Not implemented |
| Season (`teamRatings`, `matchupModel`, `simulateGame`) | 5 | 100% | ❌ Not implemented |
| Season Engine (`playGame`, `simulateCurrentWeek`, playoffs) | 6 | 100% | ❌ Not implemented |
| Narrative (`generateGameSummary`, `playByPlay`, `factorParagraph`) | 4 | 100% | ❌ Not implemented |
| Awards (`computeRegularSeasonAwards`, `computePlayoffAwards`) | 3 | 100% | ❌ Not implemented |
| **Total** | **~20 core functions** | **100%** | **0% implemented** |

### 2.2 Integration Test Scenarios

| Scenario | Description | Expected Result | Verification |
|----------|-------------|-----------------|--------------|
| **Draft → Season** | Complete 26-round draft → 17-week season → playoffs → SB | Valid champion, valid stats | `post-merge-smoke.mjs` exit 0 |
| **Lineup → Ratings** | Optimal lineup → teamRatings → matchupModel | Consistent unit ratings | `teamRatings()` + `matchupModel()` invariant |
| **Draft → CPU Picks** | CPU picks respect round floors, posBest, bounded miss | No `seen>16` deep picks in rounds 1-3 | `cpuPick` funcdiff vs donor |
| **Game Simulation** | Simulate game → box score + recap + stats | Valid scores, stats, recap | `simulateGame()` + `generateGameSummary()` |
| **Season Simulation** | 17 weeks → playoffs → SB → awards | Valid champion, stats, awards | `playGame()` × 272 + playoffs |
| **100-Season Regression** | 100 seasons → win correlation r > 0.6 | Statistical validity | `pw4.js` exit 0 + r > 0.6 |

---

## 3. Test Harness Specification

### 3.1 Required Scripts (per `tests/CONTRACT.md`)

| Script | Purpose | Input | Output | Exit Codes |
|--------|---------|-------|--------|------------|
| `pw4.js` | 100-season regression | v20 + donor builds | r, ρ, RMSE, exit code | 0=pass, 1=fail, 2=error |
| `validate.js` | 2025 external validation | Embedded 2025 wins table | r≈0.66, ρ≈0.69, RMSE≈2.6 | 0=pass, 1=fail, 2=error |
| `phone.js` | 390px static lint | HTML file | Overflow findings | 0=clean, 1=overflow, 2=error |
| `funcdiff.js` | Function-level diff | Two HTML files | 17-function diff table | 0=pass, 1=differences, 2=error |
| `run_all.sh` | Composite runner | — | Aggregated results | First non-zero exit |

### 3.2 Acceptance Gate (`post-merge-smoke.mjs`)

| Check | v20 (reference) | Donor (reference) | Merged Build Must Be |
|-------|-----------------|-------------------|----------------------|
| **A** — 100-season report renders | ❌ (crash) | ✅ | ✅ |
| **D** — Draft→Season→Playoffs complete | ✅ | ✅ | ✅ |
| **B** — No element overflows 390px | ❌ (7,208) | ✅ | **0 offenders** |
| **C** — No uncaught page errors | ❌ (`ReferenceError: rWeights`) | ✅ | **0** |
| **Exit code** | 1 | 0 | **0** |

**Thresholds:**
- `B` = 0 offenders (element-level check, ≥200ms debounce)
- `C` = 0 uncaught errors (ReferenceError, TypeError, etc.)
- `A` = true (report renders without crash)
- `D` = true (complete draft→season→playoffs→SB)

### 3.3 Verification Commands (Must Run Before Promotion)

```bash
# 1. Syntax check
node --check "NFL Draft Simulator.html"

# 2. Unit diff (funcdiff)
node _agents/ds/tools/funcdiff-full.js v20.html donor.html --hashes

# 3. Mobile lint
node tests/phone.js "NFL Draft Simulator.html"

# 4. Full E2E smoke test
node _agents/minimax/tools/post-merge-smoke.mjs "candidate.html"

# 5. Regression suite
bash tests/run_all.sh
```

---

## 3. Test Data Management

### 3.1 Reference Datasets

| Dataset | Location | Format | Purpose |
|---------|----------|--------|---------|
| `tests/2025_standings.js` | `tests/` | JS module exporting `[teamName, wins, losses, ties, pointDiff][]` | External validation (validate.js) |
| `tests/math-baseline.json` | `tests/` | JSON: `{function: sha256_prefix}` | Math core hash gate |
| `tests/manifest.txt` | `tests/` | One function name per line | Function manifest for funcdiff |
| `tests/baseline.json` | `tests/` | Frozen baseline from certified build | Regression baseline |

### 3.2 Test Fixtures

| Fixture | Location | Purpose |
|---------|----------|---------|
| `tests/fixtures/v20-reference.html` | `tests/fixtures/` | Frozen v20 reference build |
| `tests/fixtures/donor-reference.html` | `tests/fixtures/` | Frozen donor reference build |
| `tests/fixtures/merged-candidate.html` | `tests/fixtures/` | Candidate build for verification |

---

## 4. Test Execution Protocol

### Pre-Merge Checklist
- [ ] `node --check "NFL Draft Simulator.html"` — syntax clean
- [ ] `node tests/funcdiff.js <candidate> <donor> --hashes` — 17-function oracle
- [ ] `node tests/phone.js <candidate>` — 390px lint clean
- [ ] `node _agents/minimax/tools/post-merge-smoke.mjs <candidate>` — E2E gate pass
- [ ] `bash tests/run_all.sh` — full suite green

### Post-Merge Verification
- [ ] Verifier creates `verified-merge-<hash>` tag
- [ ] Owner promotes via GitHub UI (preserve-then-rename)
- [ ] `git ls-remote origin refs/heads/main refs/tags/verified-merge-*` match
- [ ] `git ls-remote origin HEAD` resolves to live branch

---

## 4. Test Infrastructure

### Required Tools (Zero-Dependency)
- **Node.js** ≥ 22 (built-in `vm`, `fs`, `path`, `child_process`)
- **Playwright** (for `post-merge-smoke.mjs` — headless Chromium)
- **Shell** (`bash`, `grep`, `awk`, `shasum`, `wc`, `git`)

### Forbidden
- ❌ npm packages / package.json
- ❌ Build steps (webpack, vite, etc.)
- ❌ CDN dependencies
- ❌ Paid APIs
- ❌ TypeScript / transpilation

---

## 5. Test Metrics & Reporting

### 5.1 Required Metrics Per Run
| Metric | Target | Measurement |
|--------|--------|-------------|
| 100-season win correlation (r) | > 0.6 | `pw4.js` output |
| 2025 validation Pearson r | ≈ 0.66 | `validate.js` output |
| 2025 validation Spearman ρ | ≈ 0.69 | `validate.js` output |
| 2025 validation RMSE | ≈ 2.6 | `validate.js` output |
| 390px overflow offenders | 0 | `phone.js` / `post-merge-smoke.mjs` |
| Uncaught errors | 0 | `post-merge-smoke.mjs` |
| 100-season report render | true | `post-merge-smoke.mjs` |
| Draft→Season→Playoffs→SB complete | true | `post-merge-smoke.mjs` |

### 5.2 Reporting Format
All scripts output final line: `PASS <name>` or `FAIL <name> <reason>`
Composite runner (`run_all.sh`) exits with first non-zero exit code.

---

## 6. Continuous Integration (Post-v21)

### CI Pipeline (When Enabled)
```yaml
# Conceptual only — no CI configured yet
stages:
  - lint: node --check + phone.js lint
  - unit: funcdiff.js --hashes
  - integration: pw4.js + validate.js
  - e2e: post-merge-smoke.mjs
  - mobile: phone.js + cdp-phone-check.mjs
```

### Gate Policy
- **No merge to `main`** without `verified-merge-<hash>` tag
- **No force-push** to `main` ever
- **All pushes to `main`** must go through `merge/v20-donor` → verifier → tag → Owner promote

---

## 7. Test Data Integrity

### Data Integrity Checks
- `PLAYERS` array: 1,200+ entries, no duplicates by name+team+pos
- `TEAM_DATA`: 32 teams × 36 slots, no null starters in drafted slots
- `DEFAULT_WEIGHTS`: All 26 `ROSTER_SLOTS` have weights > 0
- `FLEX`/`NATURAL_SLOT_MAP`: Every position in `PLAYERS` has at least one legal slot
- `ROSTER_SLOTS`: 26 slots, matches `DEFAULT_WEIGHTS` keys

### Data Integrity Commands
```bash
# Player count
node -e "console.log(require('./NFL Draft Simulator.html').match(/PLAYERS\s*=\s*\[([\s\S]*?)\];/)[1].split('],[').length)"

# Team count
node -e "console.log(Object.keys(require('./NFL Draft Simulator.html').match(/TEAM_DATA\s*=\s*(\{[\s\S]*?\});/)[1]).length)"

# Weight coverage
node -e "const w=require('./NFL Draft Simulator.html').match(/DEFAULT_WEIGHTS\s*=\s*(\{[\s\S]*?\});/)[1]; console.log(Object.keys(JSON.parse(w)).length)"
```

---

## 8. Regression Prevention

### Regression Gates
| Gate | Trigger | Action |
|------|---------|--------|
| `node --check` | Every commit | Fail fast on syntax errors |
| `funcdiff.js --hashes` | Pre-merge | Block if math core drifts |
| `phone.js` | Pre-merge | Block if 390px overflow |
| `post-merge-smoke.mjs` | Pre-promotion | Block if E2E fails |
| `run_all.sh` | Pre-promotion | Block if any suite fails |

### Regression Detection
- **Math drift:** Hash gate detects any change to 8 protected functions
- **Visual regression:** 390px element-level overflow check
- **Functional regression:** 100-season regression (r > 0.6)
- **External validity:** 2025 validation (r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6)

---

## 9. Test Maintenance

### Adding a New Test
1. Add test function to appropriate `tests/<name>.js`
2. Add to `tests/run_all.sh` in correct order
3. Update `TEST-PLAN.md` matrix
3. Verify `bash tests/run_all.sh` passes

### Updating Test Expectations
1. Update expected values in test file
2. Update `TEST-PLAN.md` targets if thresholds change
3. Record change in `DECISIONS.md` with receipt
3. Re-run full suite

---

## 10. Test Sign-Off

**Before any promotion to `main`:**
- [ ] `node --check` passes
- [ ] `node tests/funcdiff.js <candidate> <donor> --hashes` → 17 diffs, 8 math functions identical
- [ ] `node tests/phone.js` → 0 overflow offenders
- [ ] `node _agents/minimax/tools/post-merge-smoke.mjs <candidate>` → exit 0, all checks pass
- [ ] `bash tests/run_all.sh` → exit 0
- [ ] Verifier signs off with `verified-merge-<hash>` tag

---

*This test plan is a living document. Update with each round. Every claim must have a receipt command.*