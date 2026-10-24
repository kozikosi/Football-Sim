# V22 Suggestions — Full Compilation — BOC — 21 Oct 2026

Source: Owner (Kosi) directives across multiple prompts on 21 Oct 2026. Read-only specification for Claude (Architect). No product edits by BOC. No protected constants changed by BOC (weight changes require explicit approval).

Build reference: `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (V22 candidate). From now on, this build is referred to as V22 (Owner ruling, 22 Oct). The older build names are historical only.

---

## A. Changes to merge.html (V22) — Owner directive (10 items)

### A-1. Remove "Value Here" from visual draft board
- Remove the "Value Here" column from the draft board visual. Keep `r.v` in all background math (priority, bars, flex comparisons, sorting by value).
- Locations: CSS l.268 (two changes), sort option l.418, table header l.426, row cell l.1766, colspan 10→9 l.1768, guide bullet l.4991, section title + Priority header title l.426/l.5056.
- Prototype: `_agents/boc/notes/value-here-prototype.md` (M-353/M-355/M-357). MOC verified: headers 10→9, cells 1,148→0, console 0, node --check PASS.

### A-2. Remove "MORE" from tab footer
- Delete `<span class="footlabel">More</span>` at l.439. Nav keeps aria-label.

### A-3. Move badges to bottom of page under weights
- Badges ("Can't Run", "Weak D", "Can't Pass") built at l.624–627, rendered in table rows at l.631.
- Move to a single strip below the weights buttons (l.548). Show "No team carries a penalty badge on these weights." when empty. Strip sits UNDER the two buttons.
- Exact edits: `_agents/boc/notes/merge-html-edits-2-5.md`.

### A-4. "Use model weights" → "Default"
- Rename button at l.548.

### A-5. "Back to my weights" → "Save My Weights" (conditional visibility)
- Rename at l.548. Only clickable after a change is made to default weights.
- Default state: transparent (opacity 0.45, pointer-events none) until a default weight is changed.
- After change: blue (like "Default"), text "My Weights".
- Dirty-flag state machine: `weightsDirty = JSON.stringify(weights) !== JSON.stringify(modelWeights())`.
- No persistence (in-memory only; item A-7 deletes user weights record).

### A-6. Weights table label correction
- "The default is the model weights: what each spot is really worth in wins, scaled so the biggest spot (QB) is 700 and rounded to the nearest 5. Edit any number to build your own set; the buttons switch between the two." → "Default is how the draft simulator sees the game."

### A-7. Delete user weights record
- Remove any saved user weights. Only use the model weights (DEFAULT_WEIGHTS). Forget user weights.

### A-8. Player browser: ~15 players on desktop
- Cap renderPlayers (l.791) to 15 desktop / 10 mobile with "Show more" button (incremental). Reset _pageSize on filter change.
- Footer tabs always visible at bottom (CSS l.239: position: sticky; bottom: 8px).
- Exact edits: `_agents/boc/notes/merge-html-edits-8.md`.

### A-9. Position Rankings: complete combinations
- Ensure every combination of top x players available. Use default model weights.
- Offense: QB, QB+WR1, QB+WR1+OT1, QB+WR1+OT1+OT2, ... continue to WR3.
- Defense: CB1, CB1+DE1, CB1+DE1+CB2, CB1+DE1+CB2+DE2, ... continue to DT2.
- Combined Units: start with first combination not already present (QB+CB1), continue to WR3.
- Only one copy of each set of units in the dropdown.
- Plural "s" for multiples of positions (e.g., "Defensive Line (Edges + DTs)").
- Remove "(WR1-3)" → "(WR1+WR2+WR3)". Same pattern for all similar instances.
- Remove "(CB1-4)" → "(CB1+CB2+CB3+CB4)".

### A-10. Team Comparison
- Remove "real" from "Put any two real rosters side by side." → "Put any two rosters side by side."
- Remove "Ratings shown are effective ratings — players flexed out of position carry their penalty." Only on Team Comparison page (l.3364). Keep in Draft Simulator (l.3420).
- Unit Comparison table: remove all parentheses from labels. Reorganize by Offense then Defense with subtitle rows. 12 data rows (drop PRIMCOV, add LB). Order: Offense — Quarterback, Offensive Line, Running Backs, Wide Receivers, Tight Ends, Run Game, Pass Game; Defense — Defensive Line, Linebackers, Secondary, Run Defense, Pass Defense.
- Default matchup: Chiefs as Team A, Raiders as Team B.
- Exact edits: `_agents/boc/notes/merge-html-edits-team-guide.md`.

## B. Guide Page Changes

### B-1. Reading the Draft Board
- Remove any mention of "Value Here" and its bullet point.
- "How the computer teams pick" text: Remove "(never below a 76 rating) at a spot it still needs, " — keep the rest: "Each CPU team takes the player who adds the most wins over a replacement-level starter, with a little personal taste for certain positions and some randomness. They can also flex a player."

### B-2. Flexing Players, explained → "Flexing"
- Rename section title from "Flexing players, explained" to "Flexing".
- Never just say "tackle." Always say "offensive Tackle." (applies to row labels, cells, and sentences).
- Reorganize the flex table based on conventional logic order of the draft board (QB first). Order: Quarterback, Running back, Wide receiver, Tight end, Offensive tackle, Guard/center, Defensive tackle, Edge rusher, Linebacker, Cornerback, Safety.

### B-3. Position Values dropdown → "Drafting & Position Values"
- The "Position values: all 26 starting spots" table is now essentially the same as the "Drafting: which positions matter" table. Combine them.
- Leave in the place of "Drafting: which positions matter" but rename the dropdown/section to "Drafting & Position Values".
- Remove duplicate table.
- Remove "Wins, 70→90" column from the slot role table. Keep "Wins per +1 rating" column.
- Remove "x wins from a 70→90 upgrade" from tier list → plain ordered list of slots.
- Weight adjustments (Owner-provided): K 0.72 → 0.45, WR2 0.60 → 0.63, RB1 0.67 → 0.58, CB2 1.18 → 0.95, DE1 1.30 → 1.38. TE1 within 0.5 of WR1, TE2 within 0.5 of WR3. QBs rush and receivers block → adjust pass/run splits.
- Note: These are DEFAULT_WEIGHTS/slotWinsPerOvr changes (protected constants). Owner is final authority; Claude decides.

### B-4. Guide Box
- Remove the Guide box header ("Guide" + "Short reference sections for the terms the sim uses. Click through only what you need.").
- "Play the season. Seventeen games, a 14-team playoff, then the Super Bowl." → "Play the season. Seventeen-game regular season, the Playoffs, then the Super Bowl."
- "advanced stats (what caused sacks and big runs)" → "advanced stats".

### B-5. Glossary cross-reference
- Cross-reference football terms that appear in game previews and game reviews with the glossary site terms.
- If there are more words a casual basketball fan (watches football once a year at the Super Bowl) wouldn't know, list them in the glossary and explain them.

## C. Owner's Default Weights (DEFAULT_WEIGHTS — protected constant, Owner-provided)

QB 700
RB1 185, RB2 60
WR1 305, WR2 165, WR3 105, WR4 5
TE1 220, TE2 40
OT1 285, OT2 285, OG1 235, OG2 235, C 235
DE1 360, DE2 305, DT1 260, DT2 210, DL5 5
MIKE 240, WILL 220, SAM 20, LB4 5
CB1 395, CB2 325, CB3 260, CB4 5, SS 245, SS2 5, FS 235, FS2 5
K 200, P 1, FB 1

Note: "Default is how the draft simulator sees the game." (replaces previous label text)

## D. Player Browser
- On desktop, only ~15 players visible at a time. Footer tabs always visible at bottom.
- Exact edits: `_agents/boc/notes/merge-html-edits-8.md`.

## E. NBA 2027 Pool
- Owner supplied 538-player 2027 NBA OVR list. Converted to schema shape: `_agents/boc/notes/nba_2027_pool.json`.
- Source: https://www.hoopshype.com/nba-2k/players/ (to be confirmed as exact source/version).
- Positions and teams NOT yet added (435 of 538 unknown). Unknown list: `_agents/boc/notes/nba_2027_unknown_positions.txt`.
- MOC prompted to verify transcription and schema conformance.

## F. Additional context from Owner directives
- "From now on let's consider the merge.html (V22) and the newest edition V22." (Owner ruling 22 Oct: the current build is V22)
- "Liquid, Glyph, Omni, Cohere have all been permanently archived. You can delete all of their contributions unless any of them seem somewhat structural."
- "Feel free to parallel batch prompt anyone or everyone to help you."
- Owner's product direction (PR #4): priorities (NFL V22 → all-time NFL → current NBA → all-time NBA → other sports/soccer), architecture (provisional: protect NFL product, per-sport rules/math, self-contained HTML, extract shared engine after demonstrated reuse), pools (1,500–2,000, OVR, no −5, modern franchises, distinct layers), modern rules, draft design, beta/testing, council guide (qualitative, no authority changes).

## G. Aesthetics & Beauty (Owner directive, 21 Oct 2026)

Owner: "Feel free to think about aesthetics and beauty more as well. I love what you did with Draft Header. Anywhere else you can add beauty and aesthetics (making the draft board's colors reflect the user's selected team) are highly encouraged."

### G-1. Team colors on draft board
- BOC spec: `_agents/boc/notes/team-colors-spec.md`.
- Recipe (from `.draftingas` l.180): gradient background (primary→secondary at 15%/8% opacity) + primary border + primary-filled badge + primary bold text.
- Mechanism: TEAM_COLORS map (32 teams → primary/secondary/tertiary), CSS variables `--team-primary/secondary/tertiary` set on `#draftLive` at draft start (l.1486). Consumed by `.draftingas`, draft board header, position cards, OVR chip, roster panel, footer tabs.
- Default (no team/casino): falls back to `--accent` (#4f8cff) / `--accent2` (#ff6b4a).
- Colors NOT invented by BOC — MiMo verifying the data source. Recommended source: official NFL team brand guidelines or verified public dataset.

### G-2. Other aesthetic opportunities (for Claude to consider)
- Position cards: team-colored left border accent.
- Roster panel: team-colored header.
- Footer tabs: team-colored border/accent (optional — may be too much).
- Draft board header: team-colored tinted background.
- Season view: team-colored accents on the user's team cards.
- Figma setup: Owner mentioned Figma access may need more configuration. BOC does not have Figma configured.

### G-3. Figma
- Owner: "You have access to Figma now as well I believe but I might need to do more to set that up."
- BOC does not have Figma configured. If the Owner completes setup, Figma could be used for design mockups. Until then, all design work is text-based (CSS specs in _agents/boc/notes/).

## H. Weights Discussion Context (for Claude)

The Owner provided the following DEFAULT_WEIGHTS (protected constant) and colleague opinions. The Owner's weights are the defaults Claude should use. The colleague debates are context — Claude decides.

### Owner's DEFAULT_WEIGHTS (from prior prompt)
QB 700, RB1 185, RB2 60, WR1 305, WR2 165, WR3 105, WR4 5, TE1 220, TE2 40, OT1 285, OT2 285, OG1 235, OG2 235, C 235, DE1 360, DE2 305, DT1 260, DT2 210, DL5 5, MIKE 240, WILL 220, SAM 20, LB4 5, CB1 395, CB2 325, CB3 260, CB4 5, SS 245, SS2 5, FS 235, FS2 5, K 200, P 1, FB 1.

### Owner's weight adjustments
K 0.72 → 0.45, WR2 0.60 → 0.63, RB1 0.67 → 0.58, CB2 1.18 → 0.95, DE1 1.30 → 1.38. TE1 within 0.5 of WR1, TE2 within 0.5 of WR3. QBs rush and receivers block → adjust pass/run splits.

### Colleague opinions (context, not decisions)
- Colleague 1: WR1/WR2 undervalued; CB2/CB3 overvalued vs offense; kicker overvalued vs WR2; pass/run splits too extreme (WR 100/0, QB 100/0); OT1=OT2 and OG=C flat weighting inconsistent.
- Colleague 2: QB separation too small; WR2 severely undervalued (19th); safeties overvalued; CB3 too close to CB1; OL too uniform; DT needs differentiation; pass/run splits too precise; kicker overstated; fundamental problem: OVR not standardized, players interact, wins nonlinear; salary market hierarchy supports QB/EDGE/WR/OT/elite CB.
- Colleague 3: arithmetic inconsistencies (DT1/CB3 both .047 but 0.95 vs 0.94; MIKE .043→0.86 vs OG/C .043→0.85); linearity breaks at roster scale (~20 win swing impossible); additivity double-counts joint production (offense sums to ~0.555, defense ~0.557, suspiciously balanced); +1 OVR not same across positions; pass/run splits contradict football logic (QB 100/0, SS/FS inverted, RB2 0/100, WR 100/0); OT1=OT2 and OG=C flat; no baseline, no cost dimension; K nearly equals WILL.
- Colleague 4 (rebalanced table): DE1 and CB1 swap (1.44/1.30); DT1 up to 1.12; CB2 down to 0.98; K/RB1/WR2 inversion fixed; SAM rebuilt (0.07→0.48); TE2 de-bugged (0.14→0.18); RB2 split 0/100→40/60; DT2 56/44→48/52; arithmetic made exact. New totals: offense 11.11, defense 11.52, K 0.45, grand total 23.08 (same scale as before 22.93). Caveats: ~23-win grand total still impossible as literal win total (fix belongs in win-probability layer, not this table); K at 0.45 still above WR3 at 0.38 (drop to 0.36 if strict salary ordering).

## I. Additional Context
- "From now on let's consider the merge.html (V22) and the newest edition V22." (Owner ruling 22 Oct: the current build is V22)
- "Liquid, Glyph, Omni, Cohere have all been permanently archived. You can delete all of their contributions unless any of them seem somewhat structural."
- "Feel free to parallel batch prompt anyone or everyone to help you."
- The next document Claude should produce once all changes are done: "Football-Sim-V22.html".

## J. Aesthetics & Beauty (Owner directive, 21 Oct 2026)

Owner: "Feel free to think about aesthetics and beauty more as well. I love what you did with Draft Header. Anywhere else you can add beauty and aesthetics (making the draft board's colors reflect the user's selected team) are highly encouraged."

### J-1. Team colors on draft board
- BOC spec: `_agents/boc/notes/team-colors-spec.md`.
- Recipe (from `.draftingas` l.180): gradient background (primary→secondary at 15%/8% opacity) + primary border + primary-filled badge + primary bold text.
- Mechanism: TEAM_COLORS map (32 teams → primary/secondary/tertiary), CSS variables `--team-primary/secondary/tertiary` set on `#draftLive` at draft start (l.1486). Consumed by `.draftingas`, draft board header, position cards, OVR chip, roster panel, footer tabs.
- Default (no team/casino): falls back to `--accent` (#4f8cff) / `--accent2` (#ff6b4a).
- Colors NOT invented by BOC — MiMo verifying the data source. Recommended source: official NFL team brand guidelines or verified public dataset.

### J-2. Other aesthetic opportunities (for Claude to consider)
- Position cards: team-colored left border accent.
- Roster panel: team-colored header.
- Footer tabs: team-colored border/accent (optional — may be too much).
- Draft board header: team-colored tinted background.
- Season view: team-colored accents on the user's team cards.
- Figma setup: Owner mentioned Figma access may need more configuration. BOC does not have Figma configured.

### J-3. Figma
- Owner: "You have access to Figma now as well I believe but I might need to do more to set that up."
- BOC does not have Figma configured. If the Owner completes setup, Figma could be used for design mockups. Until then, all design work is text-based (CSS specs in _agents/boc/notes/).

## K. NBA 2027 Pool
- Owner supplied 538-player 2027 NBA OVR list. Converted to schema shape: `_agents/boc/notes/nba_2027_pool.json`.
- Source: https://www.hoopshype.com/nba-2k/players/ (to be confirmed as exact source/version).
- Positions and teams NOT yet added (435 of 538 unknown). Unknown list: `_agents/boc/notes/nba_2027_unknown_positions.txt`.
- MOC prompted to verify transcription and schema conformance.

## L. Weights Discussion Context (for Claude)
[Same as section H above — see section H for full details]

## M. Additional Context
- "From now on let's consider the merge.html (V22) and the newest edition V22." (Owner ruling 22 Oct: the current build is V22)
- "Liquid, Glyph, Omni, Cohere have all been permanently archived. You can delete all of their contributions unless any of them seem somewhat structural."
- "Feel free to parallel batch prompt anyone or everyone to help you."
- The next document Claude should produce once all changes are done: "Football-Sim-V22.html".

## N. Mermaid Map
Three diagrams (from `_agents/boc/notes/v22-mermaid-map.md`):
1. Priority map: Value-here removal + Star removal → Board re-measure; Derivation rules → Weight recalibration; both → Verification gate.
2. Change-set map: P0/P1/P2/Test edits → merged.html/notes/e2e spec.
3. "Who decides" map: Claude (merge keep-list, surface branch, wrapper, cpuPick, phone-layout, color-scheme) / Kosi (DEFAULT_WEIGHTS, −5, default tab, quarantine, archived) / Measured by council (390px P0, Week 1, 272 games, 54 penalty, 1,188 draftable).

## O. Verification Checklist
| # | Check | Command | Expected |
|---|-------|---------|----------|
| 1 | Script syntax | `node --check` on extracted `<script>` block | exit 0 |
| 2 | 390px gate | `node tests/e2e-smoke.mjs "<build>" --port 9222` | exit 0, A/B/C/D true, 0 overflow, 0 page errors |
| 3 | 100-season smoke | Rebuild `pw4.js` first (not in tree), then run | r > 0.6, report renders |
| 4 | Candidate lint | `node _agents/minimax/tools/candidate-lint.mjs "<build>"` | exit 0, 44/44 pins |
| 5 | Visual | Draft board renders without "Value here" column; priority bars present; no console errors | pass |
| 6 | Guide | Guide box removed; flex table QB-first; "Drafting & Position Values" section present | pass |

---

BOC's lane is clear. All assignments are complete. Awaiting assignment. No product edits made. No protected constants changed. No git commits/pushes.
EOF
echo "written"