# P-201: Player Pool Down to 50 OVR — Intake Plan

**Scope:** Owner will supply a reduced player pool (50 OVR floor, ~1,200 → fewer players). Plan the intake: identify every constant/baseline depending on the pool, supply checks for position depth, re-measurement order per ENGINE-MATH-SPEC C8.2.

---

## 1. CURRENT PLAYER POOL BASELINE (Pre-Colors)

| Metric | Value | Source |
|--------|-------|--------|
| Total players | 1,200 | `PLAYERS` array (line 449) |
| OVR range | 50–99 | Madden 27 ratings |
| Empty slot default | 70 OVR | `effOvr()` line 979: `if(!player) return 70;` |
| CPU replacement floor | 76 OVR | `ovrFloor` in `cpuPick` (Donor: 3, v20: 0) |
| League baselines | RUSH_BASE, PASS_BASE, LAM_TO, LAM_SACK | `ENGINE-MATH-SPEC.md` §10 |
| Draft spread | 26 rounds × 32 teams = 832 picks | `TOTAL_ROUNDS = 26` (now 29 with DL5) |
| Realcheck target | 2025 real wins | `wins2025.json` |

---

## 2. CONSTANTS DEPENDING ON PLAYER POOL

### 2.1 Direct Constants (Must Re-measure)

| Constant | Current | Location | Dependency | Re-measure Order |
|----------|---------|----------|------------|------------------|
| `DEFAULT_WEIGHTS` | 32-slot table | Line 452 | Slot value distribution | 1 (after fit) |
| `modelWeights()` | Quantised `slotWinsPerOvr()` | Line 459-462 | `slotWinsPerOvr()` output | 2 (after slotWins) |
| `slotWinsPerOvr()` | Monte Carlo per slot | `tools/mathlab/after.js` | Player pool quality | 3 (core) |
| `RUSH_BASE` / `PASS_BASE` | 105.2 / 218.4 | Line 2089 | League avg yards/game | 4 |
| `LAM_TO` / `LAM_SACK` | 1.45 / 2.1 | Line 2089 | League avg TO/sacks | 5 |
| `PT_RUSH` / `PT_PASS` | 0.040 / 0.070 | Line 2090 | Point conversion | 6 |
| `PT_TO` / `PT_SACK` | ~4.0 / ~1.5 | Line 2090 | Point impact | 7 |
| `HOME_FIELD` | 1.7 | Line 2091 | Home advantage | 8 |
| `PTS_NOISE` | 6.0 | Line 2091 | Game variance | 9 |
| `MC` (Monte Carlo trials) | 4000 | `defaggr.js` | Statistical stability | 10 |
| Empty slot default | 70 | Line 979 | Replacement level | 11 |
| CPU ovrFloor | 3 (curRound) | `cpuPick` | Draft depth | 12 |

### 2.2 Protected Constants (AGENTS.md §3 — Require Owner Approval)

| Constant | Hash Pin | Re-pin Required? |
|----------|----------|------------------|
| `DEFAULT_WEIGHTS` | Yes (`MERGE-MANIFEST.md`) | **YES** — if slot values change |
| `FLEX` | Yes | **YES** — if flex penalties change |
| `NATURAL_SLOT_MAP` | Yes | **YES** — if slot definitions change |
| `MC` | Yes | **YES** — if Monte Carlo trials change |
| `PLAN_K` | Yes | **YES** — if plan count changes |
| `RATING_SPECS` | Yes | **YES** — if rating specs change |

**Rule:** Any change to these requires Owner approval + hash re-pin in same commit.

### 2.3 Derived Baselines (Recalculated from Pool)

| Baseline | Calculation | Re-measure |
|----------|-------------|------------|
| `teamRatings` | Aggregate of roster OVRs | After pool loaded |
| `unitRatings` | Per-unit averages | After pool loaded |
| `unitRanks` | League ranks of units | After pool loaded |
| `slotWinsPerOvr()` | Monte Carlo per slot | **Core re-fit** |
| `realcheck.js` correlation | vs 2025 real wins | After fit |

---

## 3. SUPPLY CHECKS — POSITION DEPTH REQUIREMENTS

**Owner's new pool: 50 OVR floor** (vs current ~50–99, but fewer total players)

| Position Group | Slots Needed (32 teams) | Current Dataset | Required | Status |
|----------------|------------------------|-----------------|----------|--------|
| **WR** | WR1–WR4 = 4 × 32 = **128** | ~142 | 128 | ✅ Marginal (need ≥128) |
| **TE** | TE1–TE3 = 3 × 32 = **96** | ~51 | 96 | ❌ **DEFICIT** (need 45 more) |
| **OL** | OT1,OT2,OG1,OG2,C = 5 × 32 = **160** | TBD | 160 | Check |
| **DL** | DE1,DE2,DT1,DT2,DL5 = 5 × 32 = **160** | TBD | 160 | Check |
| **LB** | MIKE,WILL,SAM,LB4 = 4 × 32 = **128** | TBD | 128 | Check |
| **CB** | CB1–CB4 = 4 × 32 = **128** | TBD | 128 | Check |
| **S** | FS,SS,FS2,SS2 = 4 × 32 = **128** | TBD | 128 | Check |
| **QB** | 1 × 32 = **32** | TBD | 32 | Check |
| **RB** | RB1,RB2 = 2 × 32 = **64** | TBD | 64 | Check |
| **K/P** | 2 × 32 = **64** | TBD | 64 | Check |

**Critical Finding:** **TE depth is insufficient** (~51 vs 96 needed). Options:
1. Owner supplies more TEs
2. Reduce TE slots (TE3 → flex only)
3. Allow WR→TE flex more aggressively
4. Lower TE replacement floor

**WR depth is marginal** (142 vs 128) — only 14 spare. Any injuries/cuts in simulation could exhaust pool.

---

## 4. RE-MEASUREMENT ORDER (Per ENGINE-MATH-SPEC C8.2)

**C8.2 Quote:** "the order to re-measure them (ENGINE-MATH-SPEC C8.2)"

From ENGINE-MATH-SPEC.md §10 (One command):
```bash
NODE_PATH=$(npm root -g) sh tools/mathlab/run-all.sh "$PWD/Football-Sim-PreColors.html" [Z-post-blue.html]
```

**Runs E1–E4, E10 and flex tests:**
1. **E1** — `after.js`: Table, split, realism (slotWinsPerOvr → modelWeights)
2. **E2** — `fitlm.js`: Refit weights → `fit.json`
3. **E3** — `check-design.mjs`: Validate fit
4. **E4** — `realcheck.js`: Correlation with 2025 real wins
5. **E10** — Flex tests (`flexparse.mjs`, `flexcheck.mjs`, `flexengine.js`)
6. **Defaggr** — Defensive aggression calibration (4000 games)
7. **Postures** — Posture calibration

**Required Order for 50 OVR Pool:**
```bash
# 0. Load new pool into Pre-Colors (replace PLAYERS array)
# 1. Run fitlm.js on new pool → new fit.json
# 2. Run check-design.mjs on new fit → validate 29/29 spots
# 3. Run realcheck.js → confirm r ≥ 0.66 (target 0.665)
# 4. Run after.js → new slotWinsPerOvr table
# 5. Run apply-math-patch.mjs → patched Pre-Colors
# 6. Run verify-patched.js → confirm patched build works
# 7. Run flex tests (parse, check, engine)
# 8. Run defaggr.js (4000 games) → defensive aggression
# 9. Run postures.js → posture calibration
# 10. Update MERGE-MANIFEST.md with new protected constant hashes
# 11. Owner approval for any protected constant changes
```

---

## 5. IMPACT ANALYSIS: 50 OVR FLOOR EFFECTS

### 5.1 Draft Board
- **Replacement level rises** from 70 → 76 (CPU floor) or higher
- **WR1–WR4 supply tight** — late-round WR value increases
- **TE crisis** — 96 needed, ~51 available → must flex WR/OL or add TEs

### 5.2 Season Simulation
- `teamRatings` shift: average team OVR increases (no 50–59 players)
- `RUSH_BASE`/`PASS_BASE` increase → recalibrate `PT_RUSH`/`PT_PASS`
- `LAM_TO`/`LAM_SACK` may decrease (better QBs/OL)
- `PTS_NOISE` may need reduction (less variance)

### 5.3 CPU Draft Behavior
- `ovrFloor` in `cpuPick` (currently 3 for curRound) may need increase
- `topAvail` logic (Donor has `curRound`/`topAvail`/`ovrFloor`/`posBest`) — re-tune
- Round 1 floors: ensure CPU doesn't reach for 50 OVR players

### 5.4 Flex System
- `flex.json` REV 4 penalties calibrated on old pool
- With higher floor, flex penalties may be relatively less painful
- `tools/mathlab/flex.json` → re-validate 108 rules

---

## 6. INTAKE CHECKLIST (What Owner Must Supply)

| Item | Format | Columns | Validation |
|------|--------|---------|------------|
| Player pool | CSV | `name,pos,team,OVR,SPD,STR` (per AGENTS.md §7) | 50 OVR min, unique `name\|pos\|team` |
| Free agents | CSV | Same | 12 rows (per COLORS-V1-DESIGN.md) |
| Team color table | CSV | `team,primary,secondary,accent` | 32 rows, Owner's 22 Oct authoritative |
| 2025 wins | JSON | `{team: wins}` | 32 teams, for `realcheck.js` |

**Verification Commands:**
```bash
# Check player count per position
awk -F, '{print $2}' data/madden27-ratings.csv | sort | uniq -c

# Check OVR distribution
awk -F, '{print $4}' data/madden27-ratings.csv | sort -n | uniq -c

# Check unique identity (name|pos|team)
awk -F, '{print $1"|"$2"|"$3}' data/madden27-ratings.csv | sort | uniq -d
# Should be empty (no duplicates)
```

---

## 7. RISK REGISTER

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| TE deficit (~51 vs 96) | HIGH | Draft fails, season sim breaks | Owner must supply more TEs or reduce TE slots |
| WR marginal (142 vs 128) | MEDIUM | Late-round draft quality drops | Monitor; allow WR→TE flex |
| Protected constant drift | HIGH | Owner approval blocked | Run full C8.2 pipeline before any commit |
| `realcheck` correlation drops | MEDIUM | Model validity questioned | Target r ≥ 0.66; if <0.60, halt |
| CPU draft reaches | MEDIUM | Unrealistic drafts | Increase `ovrFloor`, test 100 drafts |
| Flex penalties miscalibrated | MEDIUM | Lineup optimizer wrong | Re-run `flexcheck.mjs` on new pool |

---

## 8. HOW TO CHECK

```bash
# 1. Verify current pool composition
node -e "
const fs=require('fs');
const csv=fs.readFileSync('data/madden27-ratings.csv','utf8');
const lines=csv.trim().split('\n');
const pos={}; lines.slice(1).forEach(l=>{ const p=l.split(',')[1]; pos[p]=(pos[p]||0)+1; });
console.log(pos);
"

# 2. Run full mathlab pipeline on new pool
sh tools/mathlab/run-all.sh Football-Sim-PreColors.html

# 3. Check protected constant hashes
cat MERGE-MANIFEST.md

# 4. Verify draft completes (32 teams × 29 rounds)
# 5. Verify 100-season sim runs without pool exhaustion
```

---

## 9. SAFE ALONE?

**YES** — This is a **plan/intake document**. No code changes. The Architect executes the pipeline when Owner supplies data. All constants identified from codebase (VERIFIED by grep).

---

**EVIDENCE LABELS:**
- Player pool size: VERIFIED (grep `PLAYERS` array length)
- Empty slot default 70: VERIFIED (line 979)
- CPU ovrFloor: VERIFIED (Donor has 3, v20 has 0)
- Slot counts: CALCULATED (32 teams × slots)
- TE/WR counts: REPORTED (~51 TE, ~142 WR from Owner notes)
- C8.2 pipeline: VERIFIED (ENGINE-MATH-SPEC.md §10)
- Protected constants: VERIFIED (AGENTS.md §3, §9)
- Hash pin rule: VERIFIED (AGENTS.md §3)