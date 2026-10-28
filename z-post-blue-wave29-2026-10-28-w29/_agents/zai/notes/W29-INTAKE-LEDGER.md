# W29 INTAKE LEDGER — Z.ai · session 21 · 2026-10-28

Owner round-29 message, mapped line by line. Baseline: w28 (md5 84e1f8a8…, 1,356,317 B).
Product name law: **Football-Sim-Z-post-blue-w29.html**; zip ends **w29**.

## §A · "Where they line up" visualization (Guide → Defense)

| # | Directive | Map |
|---|-----------|-----|
| A1 | Defense lined up across (below) from the Offense | rework zpbDefGuideHTML field layout: defensive row(s) mirrored below the offensive row |
| A2 | WRs moved out at least one extra bubble-length toward the sidelines | widen WR x-offsets ≥ +1 slot-unit |
| A3 | CBs directly across from WRs | CB x == WR x (mirror) |
| A4 | Nickel + Dime in the gap between the offensive line and the WRs | NICKEL/DIME x = slot gap between OL edge and WR |

## §B · Coaching section visuals (Guide → Coaching)

| # | Directive | Map |
|---|-----------|-----|
| B1 | Replace coaching-section defense visualizations "4-3", "3-4", "Nickel" with the Defense-section visualizations | reuse the A-section field renderer for the three coaching cards |
| B2 | Colors kept; key shapes per position must match the Defense key: DT2 always square, ILB2 + SAM always triangle | shape map keyed by label, not slot index |

## §C · Text removals / rewrites (Guide)

| # | Directive | Map |
|---|-----------|-----|
| C1 | Remove "Squares are the defensive line, triangles the linebackers, circles the defensive backs. The five named spots wear their own colors — lit where they play, dimmed where they don't." | delete |
| C2 | Remove from Coaching Philosophy: "If you leave it on Auto, the math picks the style that does best for your roster against an average team." | delete; the other two sentences centered, one per line |

## §D · Reading the Draft Board (Guide)

| # | Directive | Map |
|---|-----------|-----|
| D1 | WINS title styled "[WINS]" like the other two titles | match PRIORITY/GONE bracket style |
| D2 | Wins section text = "How many more games per season a player adds than a 70-rated player at his position" + "WINS are static." | rewrite, preserve indentation, centered |
| D3 | PRIORITY = "Do I need to take him now." + "What picking him now adds over the best you could expect to still find at that spot at your next pick. Priority changes as your roster fills and as the board thins." | rewrite |
| D4 | GONE = "Is he about to leave." + "The chance that a player will be picked by another team before your next turn" | rewrite |
| D5 | Linebacker-priority explainer rewritten per verbatim text; indentations preserved; whole section (titles + text) centered | rewrite + CSS |

## §E · Draft panels + Undo

| # | Directive | Map |
|---|-----------|-----|
| E1 | "CPU DRAFT STRATEGY" and "Undo" get their own panels | new hint panels on draft board |
| E2 | CPU DRAFT STRATEGY text = "CPU teams draft by priority with a little personal taste for certain positions and some randomness." | verbatim |
| E3 | UNDO text = "The ↶ Undo button takes back your most recent pick" | verbatim |
| E4 | Undo available every round, once per round | JS law change: per-round undo flag (was once-per-draft) |

## §F · Math of every game-plan panel (Guide)

| # | Directive | Map |
|---|-----------|-----|
| F1 | Subtitles just "OFFENSE" / "DEFENSE" (drop "what each choice does to a league-average team against a league-average defense") | heading rewrite |
| F2 | Order: keep 11/12/13 grouping, but "balanced" first in every section; run-heavy shown as **R+** badge, pass-heavy as **P+** badge (no spelled words) | reorder rows + badge labels |

## §G · Game-plan line rewrites (verbatim)

| # | Old | New |
|---|-----|-----|
| G1 | "The default. No lean, no cost." (11 balanced) | "The default" |
| G2 | "Strong run blockers and backs, or a quarterback that is a liability. Cuts giveaways and variance." | "Strong run blockers and running backs or a weak quarterback. Reduces giveaways and variance" |
| G3 | "Tight ends clearly better than the third receiver. Adds blocking and a second receiving threat." | "Second tight end is clearly better than third receiver. Adds blocking but fewer long-yardage receptions" |
| G4 | "Three tight ends on the field. Only two are drafted; the third is a generic 70." | "Three tight ends on the field. Great blocking but few big passing plays" |
| G5 | "Rarely right" | "Personnel and strategy are paradoxical. Rarely selected." |

## §H · Team Comparison page

| # | Directive | Map |
|---|-----------|-----|
| H1 | Dropdown entries show short nickname ("Chiefs") not city ("Kansas City"); no partial words ever; full name preferred when screen at max width | option label = nickname, ellipsis rules kept |
| H2 | Right team's dropdown aligned to the right edge of its panel | CSS |

## §I · Comparison player panels

| # | Directive | Map |
|---|-----------|-----|
| I1 | Every player gets a backing panel (no bare players) | CSS/template |
| I2 | Highlighted-border panel reserved for 85+ players | border tier = rating ≥ 85 |

## §J · Self-guidance

| # | Directive | Map |
|---|-----------|-----|
| J1 | w28 → w29 naming law everywhere (html + zip end with w29) | START §3 rewrite (session 21), ZAI.md rewrite, filenames |

## §Open · Interpretations to flag (for Owner veto)

1. **A1 geometry** — "defense across (below) from the Offense" read as one mirrored field: offense on top, defense below, each defender at his man's x. SAM drawn strong-side left (the tight end's side), safeties two-deep at ±2. Veto any station you want moved.
2. **E4 once-per-round scope** — "once per round" = one undo spent per round number; after the re-pick the same round stays spent, the next round re-arms the button. Nothing to undo before the very first pick.
3. **H1 width law** — nickname ("Chiefs") below 1100 px, full name ("Kansas City Chiefs") at maximum width; threshold is my choice, veto to move it. The (sim)/(actual)/"Your Team" wording is kept on both tiers.
4. **F2 badge scope** — R+/P+ badges replace run-heavy/pass-heavy everywhere in the game-plan math panel (strategy column, the Spread prose, and the 22-run cell); the DEFENSE table's focus words ("run-defense"/"pass-defense") are different words, so they stay.
5. **G5 13-pass** — "Rarely right: one receiver on the field." became "Personnel and strategy are paradoxical. Rarely selected. One receiver on the field." (kept the receiver clause); 21/22-pass drop the clause entirely. The defensive dfit line "…plays coverage; rarely right." is a different sentence and was left alone.
6. **B1 titles** — the coaching cards reuse the Defense-section titles (4-3 / 3-4 / NICKEL) and their own shorter descriptions; a FOCUS card in the same defcard style replaces the old Focus box so the row stays uniform.

## §Build · Final

- Product: Football-Sim-Z-post-blue-w29.html md5 7286495bce6eb3ec1af77dd50fba43cf (1,360,583 B)
- Chain: w29_patch.py (6 edits) → w29_patch2.py (20) → w29_patch3.py (6) = 32 asserted edits; one hotfix after browser evidence (.zpb-fm-row i → .zpb-fm-row > i so the station labels keep their flow inside the initials cells)
- Verify: w29_verify.js 78/78 · w29_reg28.js (w28 laws) 55/55 · w29_stress.js (season) 13/13 · zero console errors · 9 evidence screenshots
