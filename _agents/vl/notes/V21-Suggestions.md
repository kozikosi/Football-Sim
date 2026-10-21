# V21 Suggestions

**Source:** Kosi (Owner) prompts of 21 Oct 2026 + VL council analysis  
**Applies to:** `merged.html` (V21, sha256 `40233d6b…`, 657,486 B)  
**Next iteration:** V22  
**Status:** Ready for Claude review — product HTML files are read-only to advisors; all changes ship through Claude  
**R5 compliance:** No product file edited; no other session's content touched

---

## Draft Board — Reading section

### Change 1 — Remove "Value Here"
- Remove any mention of "Value Here" from the draft board
- Remove its bullet point
- The mathematical function using "Value Here" in the background remains **unchanged**

### Change 2 — CPU team pick description (partial edit)
Current text:
> How the computer teams pick. Each CPU team takes the player who adds the most wins over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste for certain positions and some randomness. They can also flex a player.

Required edit — remove only:
> (never below a 76 rating) at a spot it still needs,

Resulting text:
> How the computer teams pick. Each CPU team takes the player who adds the most wins over a replacement-level starter, with a little personal taste for certain positions and some randomness. They can also flex a player.

The rest of the sentence remains fine.

---

## Flexing Players — explained

### Change 3 — Terminology: "tackle" → "offensive Tackle"
- Never just say "tackle"
- Always say "offensive Tackle" (capital T)
- Applies everywhere in this section

### Change 4 — Reorganize position table
- Reorganize based on conventional logic order of the draft board
- QB first
- Applies to this table and everywhere else positions are listed

---

## Guide Page — Position Values dropdown

### Change 5 — Combine dropdown with draft position table
- THE POSITION VALUES dropdown is now essentially the same as the table in "Drafting: which positions matter"
- Combine them
- Leave them in the place of "Drafting: which positions matter"
- Rename the dropdown: "Drafting & Position Values"

---

## Guide Page — Everything else

### Change 6 — Glossary cross-reference (retained as-is)
- Everything else on the guide page looks good
- Potentially cross-reference the football terms that appear in the game previews and game reviews with the glossary site terms
- If there are more words that a casual basketball fan (watches football once a year at the Super Bowl) wouldn't know, list those terms here in the glossary and explain them

---

## Previous change set (from Kosi's earlier prompt) — carried forward

### Team Comparison Page
- Remove the word "real" from "Put any two real rosters side by side."
- Remove: "Ratings shown are effective ratings — players flexed out of position carry their penalty." (main Team Comparison Page only; keep in Draft Simulator)
- Unit Comparison table: remove all parentheses from row labels
- Reorganize Unit Comparison table by Offense / Defense with subtitles:
  - Offense: Offense, Quarterback, Offensive Line, Running Backs, Wide Receivers, Tight Ends, Run Game, Pass Game
  - Defense: Defense, Defensive Line, Linebackers, Secondary, Run Defense, Pass Defense

### Guide Page
- Remove the Guide Box and the text: "Guide / Short reference sections for the terms the sim uses. Click through only what you need."
- Rewrite item 1: "Play the season. Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself." → "Play the season. seventeen game Regular Season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself."
- Remove "(what caused sacks and big runs)" from "advanced stats" item
- Remove "x wins from a 70-90 upgrade" in all instances on the Wins per +1 OVR table; list players in order with Wins per +1 OVR number; remove "Wins, 70→90" column; remove "Pass / Run" column

### Weight adjustments on Wins per +1 OVR table
- K: 0.72 → 0.45
- WR2: 0.60 → 0.63
- RB1: 0.67 → 0.58
- CB2: 1.18 → 0.95
- DE1: 1.30 → 1.38
- TE1 should be within 0.5 of WR1
- TE2 should be within 0.5 of WR3
- QBs rush and Receivers block → adjust Pass/Run percentages for QB and WRs in the run game

---

## Colleague feedback synthesis (for Claude's attention)

**Colleague 1** — WR1/WR2 undervalued; CB2/CB3 overvalued vs OL/WR1; Kicker overvalued; WR/QB pass/run splits (0% run) incorrect; OT1=OT2 flattening incorrect.

**Colleague 2** — WR2 severely undervalued; SS/FS/CB3 overvalued relative to WR2; QB separation too small; OL treated too uniformly; DT archetypes need differentiation; fixed pass/run splits too precise; kicker overstated.

**Colleague 3** — Arithmetic errors: DT1/CB3 both .047 but list 0.95 vs 0.94; MIKE .043→0.86 vs OG/C .043→0.85; RB1 .033→0.67 (should be 0.66); SAM .004→0.07 (should be 0.08). Linearity assumption broken (~20-win swing impossible). Additivity double-counts joint production. OVR not standardized across positions. Pass/run splits contradict football logic.

**Colleague 4** — TE2 "n/a" pass/run with 0.14 wins (hard bug); SAM at 0.004 wins broken. Market ordering violations: CB1 tops defense (should be below DE1); CB2 above WR1/DE2/DT1; K > RB1 > WR2 inversion. Aggregate sums to ~22.93 wins (impossible cap ~14 wins).

---

## Arithmetic inconsistencies flagged

| Issue | Example | Source |
|-------|---------|--------|
| Column 2 ≠ 20 × Column 1 | DT1 .047→0.95, CB3 .047→0.94 | Colleague 3 & 4 |
| RB1 .033→0.67 | Should be 0.66 | Colleague 3 & 4 |
| SAM .004→0.07 | Should be 0.08 | Colleague 3 & 4 |
| MIKE .043→0.86 vs OG/C .043→0.85 | Inconsistent same-input outputs | Colleague 3 |
| Aggregate ~22.93 wins | Season cap ~14 wins | Colleague 4 |
| QB 100/0 pass/run | Scrambles exist | Colleague 3 & 4 |
| SS/FS inverted splits | SS 82/18 vs FS 84/16 | Colleague 3 |
| WRs 100/0 | Blocking ignored | Colleague 3 |
| K "n/a" but has wins value | Inconsistent labeling | Colleague 3 & 4 |

---

## Decision authority summary

| Change | Authority |
|--------|-----------|
| All UI text removals/rewrites (A1–A3, C1–C3, draft board, flexing players) | Claude (Architect) — markup change |
| Table reorganization (Unit Comparison, Position Values dropdown) | Claude (Architect) — markup + data |
| Weight adjustments (K, WR2, RB1, CB2, DE1 + TE1/TE2 proximity + QB/WR run splits) | Kosi (Owner) values; Claude (Architect) implementation |
| Arithmetic inconsistency fixes | Claude (Architect) — must resolve before applying table changes |
| Colleague 2 real-NFL-inspired alternative table evaluation | Kosi (Owner) decision; Claude (Architect) implementation |
| Glossary cross-reference term list | Claude (Architect) with Kosi (Owner) input on which terms casual fans need |

---

## Boundaries (R5 compliance)

- No product file edited by VL — `merged.html` (V21) is read-only
- No `session_send` executed — Kilo Code member without OpenChamber access
- No other session's content edited
- No branches/PRs/tags/pushes initiated
- All changes await Claude's implementation
