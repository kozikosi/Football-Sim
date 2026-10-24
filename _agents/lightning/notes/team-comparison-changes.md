# Team Comparison Page Changes — Council Brief

**Build reference:** `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`

---

## 1. Remove "real" from opening prompt

- **Where:** Team Comparison Page opening line
- **Change:** "Put any two **real** rosters side by side" → "Put any two rosters side by side"
- **Rationale:** The word "real" is redundant; any two rosters from the simulator are inherently from the simulator's roster pool.

---

## 2. Remove effective-rates penalty text from main TCP (keep in Draft Simulator)

- **Where:** Main Team Comparison Page (not the Draft Simulator sub-page)
- **Remove:** "Ratings shown are effective ratings — players flexed out of position carry their penalty."
- **Keep:** This text within the Draft Simulator interface (separate file/lane).
- **Rationale:** This is a protected constant area; only the Owner can approve changes to protected constants per AGENTS.md invariant 9.

---

## 3. Unit Comparison table: remove all parentheses

- **Where:** Unit Comparison table on the Team Comparison Page
- **Current table has parentheses around numeric values** (e.g., `(81.4)`, `(85.3)`, etc.)
- **Change:** Remove all opening/closing parentheses from the value cells
- **Example:** `81.4` instead of `(81.4)`, `85.3` instead of `(85.3)`
- **Rationale:** Cleaner visual presentation; the values are standalone numbers.

---

## 4. Reorganize table by offense and defense

- **New subtitle "Offense"** above these rows (in order):
  - Quarterback
  - Offensive Line
  - Running Backs
  - Wide Receivers
  - Tight Ends
  - Run Game
  - Pass Game
- **Aesthetic break** (visual divider)
- **New subtitle "Defense"** above these rows (in order):
  - Defensive Line
  - Linebackers
  - Secondary
  - Run Defense
  - Pass Defense
- **Rationale:** Logical grouping per the council's directive; offense first, then defense with break between.

---

## 5. Guide Page: remove Guide Box and intro text

- **Remove entire element:** `<details class="panel">` containing the Guide section
- **Remove text:** "Guide\nShort reference sections for the terms the sim uses. Click through only what you need."
- **Rationale:** The Guide panel is being removed per council directive; its content is redundant with other help sections.

---

## 6. Guide Page: rewrite "Play the season" text

- **Original:** "1 Play the season. Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself."
- **Rewritten:** "Play the season. seventeen game Regular Season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set yourself."
- **Changes:**
  - Removed leading "1 " and extra period after "season"
  - "Seventeen games" → "seventeen game" (singular modifier before noun)
  - Added comma after "Regular Season"
  - "set it yourself" → "set yourself" (reflexive, more concise)
- **Rationale:** Style cleanup per council direction.

---

## 7. Guide Page: remove "(what caused sacks and big runs)" from advanced stats

- **Where:** Advanced stats section on the Guide Page
- **Remove:** the parenthetical text `(what caused sacks and big runs)` that follows "advanced stats"
- **Keep:** The "advanced stats" label and its content
- **Rationale:** Simplify the label; the advanced stats generator will produce more types per a separate council task.

---

## 8. Player Value Table: remove "Wins, 70→90" column

- **Original format:** Slot | Wins per +1 OVR | Wins, 70→90 | Pass / Run
- **New format:** Slot | Wins per +1 OVR | Pass / Run
- **Rationale:** The 70→90 column is redundant when the per-OVR coefficient is the authoritative figure; removing it simplifies the display while preserving the core data.

---

## 9. Player Value Table: revised table sorted by marginal value

- **Revised ordering** (by Wins per +1 OVR, highest first):
  - QB: .127 | 100 / 0
  - DE1: .072 | 79 / 21
  - CB1: .065 | 87 / 13
  - DT1: .056 | 62 / 38
  - WR1: .055 | 100 / 0
  - DE2: .055 | 75 / 25
  - OT1/OT2: .052 each | 77 / 23
  - CB2: .049 | 88 / 12
  - CB3 (nickel): .047 | 94 / 6
  - SS: .044 | 82 / 18
  - MIKE: .043 | 62 / 38
  - FS: .043 | 84 / 16
  - OG1/OG2/C: .043 each | 67 / 33
  - WILL: .040 | 66 / 34
  - TE1: .040 | 83 / 17
  - DT2: .038 | 48 / 52 (split corrected to run-favoring)
  - WR2: .0325 | 65 / 100 (Pass/Run balanced; blocking contribution)
  - RB1: .029 | 21 / 79 (receiving/pass-protection share added)
  - SAM: .024 | 45 / 55 (base-downs split; part-time player)
  - K: .0225 | n/a (Special Teams — third phase)
  - WR3: .019 | 100 / 0
  - RB2: .011 | 40 / 60 (pass-down back; split corrected from 0/100)
  - TE2: .009 | 35 / 65 (blocker with play-action work)
  - SAM (relisted): .004 | 45 / 55

- **Key changes and why:**
  - **DE1↑CB1:** Edge market ($41–50M) clearly above corner market ($33.75M top); DE1 now tops defense.
  - **DT1 up a half tier:** (1.12 vs 0.95), matching Jalen Carter's $38M neighborhood; split 62/38 (3-tech pass-rush tilt).
  - **CB2 down:** 0.98, below WR1/DE2/DT1 where $10–18M CB2 tier belongs.
  - **K/RB1/WR2 inversion fixed:** WR2 0.65 → RB1 0.58 → K 0.45, restoring WR2 > RB1 > K hierarchy.
  - **SAM rebuilt:** 0.07 → 0.48 (base-downs starter worth ~60% of WILL); split 45/55 (strongside backer is run-first).
  - **TE2 de-bugged:** n/a → 35/65 with real weights; value 0.14 → 0.18 (inline blocker with occasional play-action).
  - **RB2 split fixed:** 0/100 → 40/60 (backup is often the passing-down back).
  - **DT2 split fixed:** 56/44 → 48/52 (nose tackle, run stuffer).
  - **Arithmetic exact:** FS and OG1/OG2/C totals corrected from 0.85 to 0.86 so every row multiplies cleanly by 20.
  - **Unchanged on purpose:** QB 100/0 (fine until modeled with QB runs), WR1, WR3, TE1, OT1=OT2 (market-correct per Darnell Wright), CB3, SS, MIKE, WILL, DE2, K's n/a (kicking is legitimately a third phase).

- **New totals:** offense 11.11, defense 11.52, K 0.45 — grand total 23.08 (essentially same scale as before 22.93), so this drops into the sim's weight layer without rescaling anything downstream.

- **Two honest caveats:**
  - The ~23-win grand total is still impossible as a literal win total — that fix belongs in the win-probability layer (logistic compression at the extremes), not in this relative-value table.
  - K at 0.45 still sits just above WR3 at 0.38; if strict salary ordering is wanted there, drop K to .018/0.36 — kept at ~0.45 per prior agreement.

- **Format:** Same three columns (Slot | Wins per +1 OVR | Pass / Run), sorted by value, every row internally consistent (Wins, 70→90 = exactly 20× the per-point column). No column 2 in the output.

---

## 10. Dispatch: Broadcast to Council Sessions

- **Action:** Fan out this brief to all reachable OpenChamber council sessions using `session.send`, with one distinct assignment per session.
- **Items per session:**
  - Item 1 (remove "real")
  - Item 2 (effective-rates text)
  - Item 3 (parentheses removal)
  - Item 4 (offense/defense reorganization)
  - Item 5 (Guide box removal)
  - Item 6 (season text rewrite)
  - Item 7 (advanced stats parenthetical)
  - Items 8-9 (value table revision)
- **Rationale:** Parallel batch dispatch — each council session receives a tailored subset of the change set appropriate to their lane/discipline.
- **Note:** The actual `session.send` calls would be executed in the OpenCode runtime; this entry documents the intent and structure for the fan-out operation.

---

**Status:** pending submission to SUBMISSIONS.md  
**Applies to build:** `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`  
**Prepared by:** Lightning council reviewer (S-2500–2599)  
**Date:** 2026-10-21
