# PROMPT FOR CLAUDE: V21 → V22 CHANGES

**TO: CLAUDE (ARCHITECT)**
**FROM: OWNER (KOSI)**
**DATE: 2026-10-21**
**SUBJECT: V21 → V22 UI/DATA CHANGES — MERGE.HTML (V21 CANDIDATE)**

---

## **CONTEXT**

- **Current Build:** `merged.html` (V21 candidate, `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B)
- **Branch:** `merge/v20-donor` @ `ff8c05ae0ef89e9030faa991a942d1c611f891bd`
- **Status:** V21 candidate assembled; MiniMax smoke PASS; OpenChamber E2E v2 PARTIAL (390px preseason CTA FAIL)
- **Next Version:** After changes + verification → **V22**

---

## **REQUIRED CHANGES (UI/DATA ONLY — NO PROTECTED CONSTANTS)**

### **1. DRAFTBOARD UI (merge.html)**

| # | Change | Location | Current → Target |
|---|--------|----------|------------------|
| 1 | Remove "Value Here" (sort) | Line 418 | `Sort: value here` → `Sort: value` |
| 2 | Remove "Value Here" (column) | Line 426 | `Value here` → `Value` (keep title) |
| 3 | Remove "MORE" from footer | ~440-445 | Find/remove "MORE" |
| 4 | Move badges to bottom | Lines 510, 625 → after 548 | Badge section + inline badges → under weights |
| 3 | "Use model weights" → "Default" | Line 548 | Text change |
| 4 | "Back to my weights" → "Save My Weights" + state logic | Line 548 | Transparent/disabled → blue/clickable on change |

**State Logic for "Save My Weights":**
- Default (no changes): Transparent (opacity ~0.4), `Save My Weights`, disabled
- After weight change: Blue (like "Default"), `My Weights`, enabled

**Reference:** "Sim to End" button (line 404) — transparent when disabled, blue when active.

---

### **3. TEAM COMPARISON PAGE**

| Change | Current | Target |
|--------|---------|--------|
| Remove "real" | `"Put any two real rosters side by side."` | `"Put any two rosters side by side."` |
| Remove disclaimer | `"Ratings shown are effective ratings..."` | **Remove entirely** |
| Remove parentheses | `Offense (QB+RB+WR+TE+OL)` → `Offense` | All parentheses removed |
| Reorganize | Flat list | **Offense section** → break → **Defense section** |

**Target Order:**
```
OFFENSE: Offense, Quarterback, Offensive Line, Running Backs, Wide Receivers, Tight Ends, Run Game, Pass Game
DEFENSE: Defense, Defensive Line, Linebackers, Secondary, Run Defense, Pass Defense
```

---

### **4. GUIDE PAGE**

| Change | Current | Target |
|--------|---------|--------|
| Remove Guide Box | `"Guide\nShort reference sections..."` | **Remove entirely** |
| Rewrite "Play the season" | `"1 Play the season. Seventeen games..."` | `"Play the season. seventeen game Regular Season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself."` |
| Remove parenthetical | `"advanced stats (what caused sacks and big runs)"` | `"advanced stats"` |
| Remove "x wins from 70-90" | Throughout positional value section | **Remove entirely** |
| Remove "Wins, 70→90" column | From positional value table | Keep only "Wins per +1 OVR" + "Pass / Run" |

### **Positional Value Table — Weight Adjustments**

| Position | Current Wins/+1 OVR | Target Wins/+1 OVR | Pass/Run |
|----------|---------------------|---------------------|----------|
| DE1 | 0.065 | 0.069 (1.38/20) | 79/21 |
| CB2 | 0.059 | 0.0475 (0.95/20) | 88/12 |
| WR2 | 0.030 | 0.0315 (0.63/20) | 95/5 |
| RB1 | 0.033 | 0.029 (0.58/20) | 35/65 |
| K | 0.036 | 0.0225 (0.45/20) | 100/0 (ST) |
| TE1 | 0.040 | ~0.055-0.105 | Within 0.5 of WR1 |
| TE2 | 0.007 | ~0.019-0.069 | Within 0.5 of WR3 |
| QB | 0.127 | 0.127 | 100/0 → 90/10 |
| WRs | 100/0 | ~95/5 | Add run % |

**TE Constraints:** TE1 within 0.5 of WR1 (0.055); TE2 within 0.5 of WR3 (0.019)

**Pass/Run Splits:**
- QB: 100/0 → 90/10
- WRs: 100/0 → ~95/5
- RB1: 35/65 (keep)
- RB2: 60/40 → 40/60

---

## **ARCHITECT DECISIONS NEEDED (5 MAX)**

| # | Decision | Recommended Default | Cost of Wrong |
|---|----------|---------------------|---------------|
| 1 | **Default tab:** Draft (current) vs Season (donor) | Keep Draft (V21 decision) | One line change later |
| 2 | **POSITION_TIER/TIER_BONUS:** Delete (dead code) vs wire | DELETE + correct notes | Two dead lines vs re-tuning economy |
| 3 | **E2E driver:** Adopt `tests/e2e-smoke.mjs` (GPT spec + MiniMax) | Adopt as single gate | One file vs third harness |
| 4 | **390px preseason CTA:** Fix `#startSeasonBtn` placement vs protocol exception | PRODUCT FIX — move CTA into viewport | Silent waiver ships mobile UX defect |
| 5 | **Gate `E_viewportUsable`:** Add `inViewport` assertions + probe at preseason | YES — add both booleans + move probe | Gate passes but CTA below fold |

---

## **OWNER DECISIONS NEEDED (5 MAX)**

| # | Decision | Recommended Default | Urgency |
|---|----------|---------------------|---------|
| 1 | **47-message recovery:** Append from `stash@{1}` with content IDs | YES | HIGH |
| 2 | **Freeze shared docs:** Commit every round to `council-record`; name sync owner | YES (GLM as sync) | HIGH |
| 3 | **Hard-rule violation:** Quarantine invented ratings files | YES — move to `_fixtures/example-ratings/` | URGENT |
| 4 | **Promotion criteria:** Require OpenChamber E2E v2 PASS before tag | YES — wait for E2E PASS | BLOCKS PROMOTION |
| 5 | **Label collisions:** Adopt content IDs (sha256(body)[:8]) | YES | HIGH |

---

## **VERIFICATION REQUIREMENTS**

After changes:
1. **MiniMax smoke test** (`post-merge-smoke.mjs`) → EXIT 0
2. **OpenChamber E2E v2** → PASS (Week 1 + 390px preseason CTA)
3. **Gate `E_viewportUsable`** includes `inViewport` booleans; probes preseason
3. **Result.v2.proposed.json** adopted (schema-valid, corrects 4 items)
4. **Merge manifest** 11/4/2 adopted as canonical
5. **Hard-rule violation** quarantined (`sports/football/ratings.json`, `sports/basketball/all_time_draft.json`)
6. **No console errors**, 390px responsive, smoke test PASS

---

## **FILES TO MODIFY**

- `merged.html` (V21 candidate) — all changes
- `NFL Draft Simulator.html` — reference only
- `NFL Draft Simulator v20 Claude.html` — reference only

**V21 → V22:** After verification passes, promoted build becomes **V22**.

---

**OWNER: KOSI | ARCHITECT: CLAUDE | DATE: 2026-10-21**