# V21 Suggestions — Consolidated Feedback for V21 (merged.html → V22)

**Compiled from:** Owner (Kosi) directives, Council review sessions, E2E testing, and code analysis
**Date:** 2026-10-21
**Target Build:** `merged.html` (sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`) — V20 merge candidate → V21/V22 baseline

---

## 1. Draft Board — "Value Here" Removal

**Status:** ✅ Implemented & Verified (prototype complete)

**Changes Made:**
- Removed "Value here" column header from draft board table
- Removed "Value here" sort option from dropdown
- Removed "Value here" data cells from draft board rows
- Fixed colspan from 10 → 9 in "No players match" row
- Updated guide text: removed "Value here" bullet point
- Updated section title: "Reading the draft board (Wins, Priority, Gone, stars)"

**Mathematical Integrity Preserved:**
- `r.v` (Value here) still computed for all background math
- Priority = Value here − expected later (still works)
- Flex value tags, sorting by value, bar widths all use `r.v` internally
- Zero console errors, E2E PASS

**Files:**
- `merged-patched.html` — patched build with changes
- `prototype-hide-value-here.patch` — patch file
- `tests/value-here-390px-test.spec.js` — Playwright test (PASS)

---

## 2. Guide Page — "Reading the Draft Board" Section

**Change:** Remove "Value Here" bullet point entirely

**Current Text to Remove:**
> **Value here** — the same math, but at the exact spot he would fill on your roster. It includes the flex penalty (a guard slotted at tackle plays 4 points worse) and how important that particular spot is (a receiver 1 matters more than a receiver 3).

**Keep:** Priority bullet point (reworded to not reference "Value here" by name)

---

## 3. Guide Page — "How the computer teams pick"

**Current Text:**
> "How the computer teams pick. Each CPU team takes the player who adds the most wins over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste for certain positions and some randomness. They can also flex a player."

**Change:** Remove the parenthetical
> **Remove:** `(never below a 76 rating) at a spot it still needs,`

**Result:**
> "How the computer teams pick. Each CPU team takes the player who adds the most wins over a replacement-level starter, with a little personal taste for certain positions and some randomness. They can also flex a player."

---

## 4. Guide Page — "Flexing Players, explained"

**Change:** Never just say "tackle." Always say "offensive Tackle"

**Action:** Find all instances of "tackle" (lowercase, standalone) in flexing section and replace with "offensive Tackle"

**Context:** The flexing explanation table/list should use full position names for clarity

---

## 5. Guide Page — Combine "Position Values" + "Drafting: which positions matter"

**Current State:**
- Two separate dropdown sections: "Drafting: which positions matter" + "THE POSITION VALUES dropdown"
- Content is essentially identical

**Action:**
1. Combine into single section
2. Place at location of "Drafting: which positions matter"
3. Rename dropdown: **"Drafting & Position Values"**
4. Remove duplicate "THE POSITION VALUES dropdown" section

---

## 6. Glossary Expansion — Football Terms for Casual Fans

**Request:** Cross-reference football terms in game previews/reviews with glossary. Add terms a casual fan (watches Super Bowl once/year) wouldn't know.

**Terms to Add to Glossary:**
- [ ] **Flex / Flexing** — Player playing out of natural position with rating penalty
- [ ] **Slot** — Specific roster position (e.g., WR1, CB2, TE2)
- [ ] **Priority** — Value here minus expected value at next pick
- [ ] **Wins Above Replacement** — Extra wins vs 70 OVR replacement
- [ ] **Flex Penalty** — OVR reduction for playing out of position
- [ ] **Personnel / Package** — Offensive/defensive formation (11 personnel, Nickel, etc.)
- [ ] **Game Plan** — Offensive/defensive strategy for a specific game
- [ ] **Coaching Philosophy** — Default offensive/defensive style
- [ ] **Aggressiveness** — 2-pt conversion / 4th down tendency
- [ ] **Unit** — Position group (OL Pass, DB, DL, etc.)
- [ ] **Unit Grade** — Team's rating at a position group
- [ ] **Win Chance** — Model's projected win probability
- [ ] **Pressure / Sacks Allowed** — OL pass protection metric
- [ ] **Run Blocking / Pass Protection** — OL run vs pass grades
- [ ] **Run Defense / Pass Coverage** — Defensive unit grades
- [ ] **SAM / MIKE / WILL** — Linebacker positions
- [ ] **Edge Rusher / DE / DT** — Defensive line positions
- [ ] **Slot Corner / Nickel** — CB3 position
- [ ] **2-Pt Conversion** — 2-point attempt after TD
- [ ] **Priority Board** — Draft board sorting by Priority
- [ ] **Gone %** — Chance player is gone by next pick

**Format:** Each term → plain English definition (1-2 sentences, no jargon)

---

## 7. Unit Comparison Page — Regroup Offense/Defense

**Current:** Flat table of 9 units
**Change:** Regroup into Offense (6) + Defense (4) with subtitle rows

**Offense (6):** QB, RB, WR, TE, OL Pass, OL Run
**Defense (4):** DL, LB, DB, K

**Visual Break:** Heavier top border (3px `var(--accent)`) on first defensive row (DL)

**Subtitle Rows:** Span both score columns, styled as group headers
```html
<tr class="unit-group-header">
  <td colspan="3" style="font-weight:700;background:var(--panel2);padding:8px;border-top:3px solid var(--accent);">Offense</td>
</tr>
<!-- 6 offense rows -->
<tr class="unit-group-header">
  <td colspan="3" style="font-weight:700;background:var(--panel2);padding:8px;border-top:3px solid var(--accent);">Defense</td>
</tr>
```

**Label Parentheses:** Remove — current labels already unambiguous (QB, RB, WR, TE, OL Pass, OL Run, DL, LB, DB, K)

---

## 8. Guide Page — Remove "Guide Box"

**Current:** Wrapper box with heading "Guide" + intro sentence
**Change:** Remove box wrapper; keep heading + intro + first section open

**New Structure:**
```html
<div class="panel">
  <h2 style="margin-top:0;">Guide</h2>
  <p class="narr" style="margin-bottom:16px;">Short reference sections for the terms the sim uses. Click through only what you need.</p>
</div>
<details class="panel" open>
  <summary>How the site works</summary>...
</details>
<details class="panel">...</details>
...
```

---

## 8. FB/P Flex Rules — Owner Directive

**Owner Directive (2026-10-21):**
- No flex cost for FB (from HB) and P (from K)
- 28 rounds (was 26)
- RB/HB interchangeable for agents; preserve site labeling
- Other positions can flex into FB/P roles
- **Don't change existing flex penalties**

**Implementation:**
- Add FB/P slots to `NATURAL_SLOT_MAP`
- FB natural position: HB (0 flex cost)
- P natural position: K (0 flex cost)
- Other positions → FB/P: existing flex penalties unchanged
- 28 rounds (64 additional picks)
- Draftable count: 1,148 → 1,188 (drop LS 12)

---

## 8. Soccer Source — Owner Directive

**Owner:** "Use whatever you want for the soccer source. All simulations should follow same format as the current football sim."

**Resolution:** Architect chooses source; World Football Elo (clubelo.com) recommended; same HTML format as football sim.

---

## 9. Merge.html Changes Spec (BOC) — 10 Items for Claude

| #   | Change                                                 | Status                          |
| --- | ------------------------------------------------------ | ------------------------------- |
| 1   | Value here visual removal                              | ✅ Done                         |
| 2   | Remove "MORE" from tab footer                          | ⏳ Pending                      |
| 3   | Move badges under weights                              | ⏳ Pending                      |
| 4   | "Use model weights" → "Default"                        | ⏳ Pending                      |
| 5   | "Back to my weights" → "Save My Weights" (conditional) | ⏳ Pending                      |
| 6   | Weights table + DEFAULT_WEIGHTS                        | ⏳ Pending (protected constant) |
| 7   | Delete user weights                                    | ⏳ Pending                      |
| 8   | Player browser: ~15 visible                            | ⏳ Pending                      |
| 9   | Position Rankings dropdown combos                      | ⏳ Pending                      |
| 10  | Team Comparison defaults (Chiefs/Raiders)              | ⏳ Pending                      |

---

## 10. Outstanding Owner Decisions (11 items)

| #   | Decision                                 | Recommended Default              |
| --- | ---------------------------------------- | -------------------------------- |
| 1   | Keep public E2E release?                 | Yes                              |
| 2   | Commit script+result to `docs/e2e-runs`? | Yes                              |
| 3   | Immutable `result.<runId>.json`?         | Yes                              |
| 4   | Week 1 SKIP for V20 donor?               | Yes (V21 implements)             |
| 5   | 390px gate: full 8 clauses for V21?      | Yes                              |
| 6   | Soccer scope: top-K or phasing?          | Derive list, bring SIZE to Owner |
| 7   | Soccer source: Elo primary?              | Yes (Elo)                        |
| 8   | Soccer cutoff: Elo ≥1700?                | Yes                              |
| 9   | FIFA artifact: name product/edition?     | Owner must name                  |
| 10  | Ratify `40233d6b` as build of record?    | Yes                              |
| 11  | PR #5 with fixes?                        | Approve with fixes               |

---

## 11. Architect Decisions Needed (8 items)

| #   | Decision                                                   |
| --- | ---------------------------------------------------------- |
| A   | `seasonState` exposure on `window`                         |
| B   | FB/P flex implementation (exact `FLEX`/`NATURAL_SLOT_MAP`) |
| C   | 28 rounds UI impact                                        |
| D   | Week 1 persistent display                                  |
| E   | 390px gate remaining clauses                               |
| F   | 100-season return navigation in gate                       |
| G   | Seeded RNG implementation plan                             |
| H   | Persistence (localStorage) design                          |

---

## 12. Soccer Data Templates Created

**Created Files:**
- `_multi-sport/soccer-current/data/players-template.json` (8 examples)
- `_multi-sport/soccer-current/data/players-template.csv`
- `_multi-sport/soccer-current/data/SUBMISSION-TEMPLATE.md`
- `_multi-sport/soccer-alltime/data/players-template.json` (10 examples)
- `_multi-sport/soccer-alltime/data/players-template.csv`
- `_multi-sport/soccer-alltime/data/SUBMISSION-TEMPLATE.md`
- `_multi-sport/soccer-current/README.md`
- `_multi-sport/soccer-alltime/README.md`

**Format:** Same structure as NFL/NBA, soccer attributes (pac, sho, pas, dri, def, phy)

---

## 13. Soccer All-Time Pool — Era Adjustment Tiers (Proposed)

| Era           | pac | sho | pas | dri | def | phy |
| ------------- | --- | --- | --- | --- | --- | --- |
| Pre-1960      | -10 | -5  | -5  | -5  | +5  | +5  |
| 1960s-1980s   | -5  | -2  | -2  | -2  | +2  | +2  |
| 1990s-2000s   | 0   | 0   | 0   | 0   | 0   | 0   |
| 2000s-2010s   | +2  | +2  | +2  | +2  | -2  | -2  |
| 2010s-present | +5  | +3  | +3  | +3  | -3  | -3  |

_Pending Owner approval_

---

## 14. Key Files for Claude (Architect)

| File                                  | Purpose                            |
| ------------------------------------- | ---------------------------------- |
| `merged-patched.html`                 | Value here removed, 390px verified |
| `prototype-hide-value-here.patch`     | Patch for Value here removal       |
| `scripts/partition_bulletin.py`       | Bulletin partition migration       |
| `OWNER-DIRECTIVE-FB-P-FLEX.md`        | FB/P flex rules                    |
| `OWNER-DIRECTIVE-SOCCER-SOURCE.md`    | Soccer source = architect choice   |
| `BULLETIN-PARTITION.md`               | Bulletin partition design          |
| `PARTITION-READY.md`                  | Migration script + verification    |
| `MOC-DS-BOC-POOL-ANALYSIS.md`         | Pool composition analysis          |
| `v21-ui-issue-inventory.md`           | 8 UI issues prioritized            |
| `v21-unit-comparison-guide-visual.md` | Unit Comparison/Guide visual specs |
| `v21-visual-items-2-3-5-8.md`         | Visual items 2,3,5,8 analysis      |
| `v21-flow/FLOW-AUDIT.md`              | Flow audit (8 clicks)              |

---

## 15. 390px Mobile Verification — Complete

**Test:** `tests/value-here-390px-test.spec.js` — **PASS**

**Grid Spans (Shipped):**
| Row | Element      | Grid Column     |
| --- | ------------ | --------------- |
| 1   | Player name  | `1 / 9`         |
|     | OVR          | `9 / 11`        |
|     | Action btn   | `11 / 13`       |
| 2   | Pos          | `1 / 3`         |
|     | Team         | `3 / 5`         |
|     | Wins         | `5 / 7`         |
|     | **Priority** | **`7 / 13`**    |
| 3   | Gone         | `1 / 3` (row 3) |
|     | Fills        | `3 / 13`        | row 3 |

**All Checks Pass:**
- ✅ 0 page overflow at 390px
- ✅ 9 cells/row (Value here removed)
- ✅ Priority spans 7/13 (absorbs Value width)
- ✅ Gone moves to row 3, col 1/3
- ✅ 0 horizontal overflow
- ✅ mstack applied correctly

---

## 15. Files Ready for Claude

| File                               | Purpose                            |
| ---------------------------------- | ---------------------------------- |
| `merged-patched.html`              | Value here removed, 390px verified |
| `prototype-hide-value-here.patch`  | Patch for Value here removal       |
| `scripts/partition_bulletin.py`    | Bulletin partition migration       |
| `OWNER-DIRECTIVE-FB-P-FLEX.md`     | FB/P flex rules                    |
| `OWNER-DIRECTIVE-SOCCER-SOURCE.md` | Soccer source = architect choice   |

---

**Prepared for:** Claude (Architect) + Owner (Kosi)
**Compiled by:** Ultra (Council Advisor) + Council contributions
**Date:** 2026-10-21

---

## Next Steps for Claude (Architect)

1. **Apply Owner directives** to `merged.html` → produce `merged-v21-candidate.html`
2. **Implement 10 merge.html changes** (BOC spec)
3. **Apply FB/P flex rules** (28 rounds, NATURAL_SLOT_MAP changes)
4. **Update Guide page** per Owner directives
5. **Run E2E verification** on `merged-v21-candidate.html`
6. **Present for Owner review** before V22

---

**End of V21 Suggestions**
