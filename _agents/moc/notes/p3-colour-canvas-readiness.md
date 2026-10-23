# P3 · The colour canvas, audited for readiness — what is live, what is one line away, and the two gaps in the rules

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P3 · the Owner's colour brief, audited against the built candidate | DATE: 2026-10-22T10:00:00Z**

**What this is.** MiniMax's P14 gives the council **twenty surfaces, each with one rule**; P15 hands the palette, the state list and the rules to Claude, who has Figma. That is the right shape. **What nobody has done is the next question: of those twenty surfaces, how many actually work in the built candidate today?** This note answers it, with measurements, and it finds **two gaps in the rules themselves** that the Architect would otherwise discover late.

**Artifact measured:** `_agents/minimax/prototypes/V22-candidate-teamcolours.html`, sha256 `a70369f39945…`, 663,428 B (gate PASS, exit 0, receipt `e941ef8f053f` — M-20261022-f).

## 1 · The readiness of the canvas — measured

| the canvas's mechanism | the surfaces it serves | in the candidate, outside the style block | state |
|---|---|---|---|
| `--team1/2/3` on `:root` + `.draftingas` | **S1** the drafting-as frame | live | **BUILT** |
| `[data-team="…"] { --t1/--t2/--t3 }` — 32 rules, l.5-36 | S2, and any row that names its team | live (the map is emitted) | **BUILT** |
| `.pcard` (`border-left:4px solid var(--team1)`) | **S3** the position cards | live (markup l.1447) | **BUILT** |
| `teamTag()` | **S5, S10, S16** — the preview's team names, the turnover line, the recaps | **1 call site**, and it resolves to **blue for all 32 teams** (M-20261022-f) | **BUGGY** |
| `.opp-panel` | **S6, S7, S9, S12** — the preview's unit lines, the key players, the scoreboard, the standings | **0** | **NOT WIRED** |
| `.gamestar` | **S7, S8, S14** — the stars, the game-ball line, the awards | **0** | **NOT WIRED** |
| `.vscard` | **S11** the "vs" card | **0** — and **no such CSS rule exists either** | **NEVER WRITTEN** |
| `.teamframe` | **S4, S20** — your roster, your season card | **0** — and **no such CSS rule exists either** | **NEVER WRITTEN** |

**So: three surfaces are live (S1, S2, S3); seventeen are waiting on five mechanisms — of which one is buggy, two have no call site, and two have never been written at all.** That is the whole canvas's distance from done: **three small fixes and two small CSS blocks.**

**The three fixes, exactly.**

1. **`teamTag()`'s lookup** (M-20261022-f) — one function, one line of logic: accept a full name *or* a nickname.
2. **`.opp-panel` and `.gamestar` call sites** — the CSS is written and correct; the game review's key-player rows and the quarter scoreboard need to carry them, with the row's own palette on `--t1/--t2/--t3`.
3. **The board's row edge reads the wrong variable** — measured at the candidate's l.277:
   ```css
   #draftTable2 tbody tr td.dc-name{box-shadow:inset 3px 0 0 var(--team1);padding-left:8px;}
   ```
   The board rows **already carry their own team** (`<tr data-team="${r.p[2]}">`, l.1811; 34 `data-team=` attributes in the build), and the per-team CSS rules are already emitted (`[data-team="…"] { --t1/--t2/--t3 }`, l.5-36). **`--team1` is the root variable — your team. `--t1` is the row's own team.** The rule reads the root, so **every row of the draft board wears your colour** and the edge means nothing. Changing `var(--team1)` → `var(--t1, var(--team1))` makes each row wear its player's NFL colour, with your colour as the fallback for rows that name no team — which is exactly the canvas's S2 rule, in one token.

**And the two blocks to write:** `.vscard` (the diagonal "vs" card, S11) and `.teamframe` (your roster and your season card, S4 and S20).

## 2 · Gap one: the canvas has no rule for `.ub` — the marker that already exists

The house convention is *"the user's team is shown in blue (`.ub` class, MutationObserver on `.ub`)"*. **That convention is the single most important "this is you" signal in the build, and P14's twenty surfaces never mention it.** Measured in the candidate:

```css
.ub{color:var(--accent);font-weight:700;}          /* l.134 — the generic blue */
```

and exactly **two** call sites: a score cell (l.4353) and the season's team heading (l.5457).

**So the Owner's primary ask — "indicate what team you are" — still resolves to a generic blue wherever the build already had a mechanism to mark your team**, while the *new* banner (S1) is correctly in the team's colours. **The fix is one CSS line:**

```css
/* OLD */  .ub{color:var(--accent);font-weight:700;}
/* NEW */  .ub{color:var(--team1);font-weight:700;}
```

`--team1` is set to the user's own team at draft start (`applyTeamColors(userTeamName)`), and defaults to the blue before then — so the behaviour is correct in both states. **SAFE ALONE: yes** (one rule, no markup change). **HOW TO CHECK:** pick a team in the draft; your team name in the season screen and your score cell take the team's colour; before a draft starts they are still blue.

**This is also a rule the canvas needs:** *the "you" marker is a colour role, not a shade of blue* — and it should be one of the twenty surfaces' rules rather than an unowned house convention.

## 3 · Gap two: the canvas contradicts its own rule 2 on the board

- **Rule 2 (P14):** *"Two saturated colours per screen is the limit — yours in the accent role, the opponent's in the secondary role, the rest in the app's greys. A rainbow is not a stadium."*
- **S2 (P14):** *"each row's left edge in **that player's NFL team colour**; your own picks in **your** colour."*

**On the draft board these cannot both hold** — a board shows 32 teams, so S2 puts 32 colours on one screen and breaks rule 2. The canvas needs a resolution, and this is the one I would hand the Architect:

> **On a many-team surface (the board, the standings, the rankings, the 100-season table), a team's colour is an EDGE, never a fill, and only your own rows are saturated.** Other teams' colours appear as the 3 px left edge and the chip — at full strength on the edge, muted on the chip's background — and the *numbers* stay in the neutral ink. Two saturated colours per screen then holds literally: yours and, on a matchup screen, the opponent's.

This also fixes the measured symptom in §1: today **every** board row is saturated with *your* colour, which is neither rule 2 nor S2 — it is a colour that means "this row exists".

## 4 · The Figma hand-off (P15) — one correction of emphasis and one addition

Claude owns Figma and builds the frame from the packet, so the packet's state list is the design's vocabulary. **Measured against the packet:**

- **The palette line is accurate** — `[data-team="…"] { --t1/--t2/--t3 }` really is emitted for all 32 teams (l.5-36), and the inline `teamTag()` path uses the same three variables. Good.
- **The state list has no matchup state.** It lists four board states (the row you are looking at, the flexed row, the TOP row, the row gone by your next pick) and the season's items (banner, trophy, star, team chip, "vs" card, quarter cards, award card). **Everything there is a board state or a single-team object. There is no state for "the other team".** The Owner's brief is half matchup — the opponent's panels, their star, their "(Vikings)" — and **a frame designed without that state cannot carry it.**

**The amendment, in the packet's own words:** *add a **role** to the state list — `you | opponent | gold | neutral` — and let every team-name surface resolve its colour through the role rather than through a hard-coded team.* This is M-20261022-e's rule, expressed in the form Claude needs: **the role is the design token, the team is the data.**

**And one emphasis for whoever hands the packet over:** the packet's palette says *"32 teams × (primary, secondary, accent)"* and the build's map is `TEAM_COLORS[team] = [primary, secondary, tertiary]`. **The third value is the accent** in the packet's language and the tertiary in the build's — fine, but **the names should match in the token sheet**, or the CSS variables will be `--t1/--t2/--t3` on one side and "primary/secondary/accent" on the other. (The build uses `--t1` = primary, `--t2` = secondary, `--t3` = the third colour — for the Chiefs that is red, white, gold.)

## 5 · What I did not check

- **I did not open the build in a browser** — every statement here is from the source text or a scripted count; the colours have not been seen rendered.
- **I did not verify the contrast of any team colour** on the panel in either theme; the canvas's rule 6 asks for it and nobody has done it. **The white-secondary case (the Chiefs, the Colts, the Packers' white) is the hard one** and needs a real check, not an assumption.
- **I did not check the palette's provenance** — still unsourced (M-20261022-e, M-20261022-f); this note does not change that.
- **I did not implement anything** — the product file is the Architect's, `V22-Suggestions.md` is a shared document, and this note is in my lane.
- **I did not check the 17 blocked surfaces individually** — the audit is at the level of *mechanisms*, which is where the distance to done actually is.

**One line for the bulletin:** *Took the canvas readiness audit — 3 of 20 surfaces live, 17 waiting on 5 mechanisms; 3 fixes (one a single token, `var(--team1)` → `var(--t1, var(--team1))`) and 2 CSS blocks unblock the lot; the canvas needs a rule for `.ub` and a resolution of its own rule 2 on the board.*
