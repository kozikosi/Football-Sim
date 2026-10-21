# The draft in your team's colours — and where else beauty would pay

**From:** MiniMax (seat S-1900–1999) · **21 Oct 2026** · **For:** Kosi and Claude

**Artifact:** `_agents/minimax/prototypes/V22-candidate-teamcolours.html`, sha256 `b3de05233f08cae64a08d7c4f880509b61496523996654e891c13ee68fd18592`, 662,533 B (the V22 candidate + the team colours).
**Builder:** `_agents/minimax/tools/build-team-colours.mjs` (re-runnable, anchors asserted, the input never edited).
**Screenshots:** `_agents/minimax/shots/draft-kansas-city-chiefs.png`, `draft-seattle-seahawks.png`, `draft-green-bay-packers.png` — 1440 px, the draft panel as the user sees it.
**Receipts:** `post-merge-smoke.mjs` **exit 0, A–I PASS, 0 findings, 0 page errors** (receipt `aa09c46982fc`); `node --check` exit 0.

## 1. What it does
The draft wears the colours of the team you are drafting for. Three colours per team — **primary** (the fill), **secondary** (the letters on it), **accent** (the ring and the special-teams tint) — and every one of them is the team's real identity colour:

| | primary | secondary | accent |
|---|---|---|---|
| Kansas City Chiefs | #E31837 red | #FFFFFF white | #FFB81C gold |
| Seattle Seahawks | #002244 navy | #69BE28 action green | #FFFFFF white |
| Green Bay Packers | #203731 green | #FFB612 gold | #FFFFFF white |
| … | all 32 teams are in the map | | |

```js
// WHERE: a new constant next to the other draft constants, and one call where the draft starts
// WHAT: ADDS the team's colours as three CSS variables and themes the header, the board and the cards.
const TEAM_COLORS = { 'Kansas City Chiefs':['#E31837','#FFFFFF','#FFB81C'], /* …32 teams… */ };
function applyTeamColors(teamName){
 const c = TEAM_COLORS[teamName] || ['#4F8DFF','#FFFFFF','#FFC24B'];
 const r = document.documentElement.style;
 r.setProperty('--team1', c[0]); r.setProperty('--team2', c[1]); r.setProperty('--team3', c[2]);
}
```
```css
/* WHERE: the CSS next to the existing .draftingas rules */
/* WHAT: REPLACES the app's blue with the team's colours. Nothing is removed from the layout. */
:root{--team1:#4F8DFF;--team2:#FFFFFF;--team3:#FFC24B;}
.draftingas{background:linear-gradient(90deg, color-mix(in srgb, var(--team1) 15%, transparent), color-mix(in srgb, var(--team3) 9%, transparent));border:1px solid var(--team1);}
.draftingas .badge-mono{background:var(--team1);color:var(--team2);box-shadow:0 0 0 3px var(--team3);}
.draftingas .das-text b{color:var(--team1);}
#draftTable2 tbody tr td.dc-name{box-shadow:inset 3px 0 0 var(--team1);padding-left:8px;}
#draftTable2 tbody tr:hover{background:color-mix(in srgb, var(--team1) 9%, transparent);}
#draftTable2 tbody tr:hover td.dc-name{box-shadow:inset 3px 0 0 var(--team3);}
.pcard{border-left:4px solid var(--team1);}
```

**Measured in the running build** (computed styles, three teams):

| team | badge | ring | team name | frame | row edge |
|---|---|---|---|---|---|
| Chiefs | rgb(227,24,55) | rgb(255,184,28) | rgb(227,24,55) | rgb(227,24,55) | rgb(227,24,55) |
| Seahawks | rgb(0,34,68) | rgb(255,255,255) | rgb(0,34,68) | rgb(0,34,68) | rgb(0,34,68) |
| Packers | rgb(32,55,49) | rgb(255,255,255) | rgb(32,55,49) | rgb(32,55,49) | rgb(32,55,49) |

The same map can drive the roster's left edge (the "team colours" item in `V22-Suggestions.md` P4-2) — one table, two consumers.

## 2. Where else beauty would pay (the council's list, cheapest first)
1. **The draft board's panel frame** — the board sits in a plain white panel while every other screen has a coloured header. A 1 px frame in the team colour, with a soft wash, would tie the board to the header.
2. **The position cards' grouping** — the cards are grouped by position chip; a team-coloured left edge per group (offence in the primary, defence in the secondary, specialists in the accent) would let the eye scan the roster by unit.
3. **The priority bars** — the green/grey split is the same for every team. The "what you gain" part in the team colour and the "what you would probably still find" part in grey would connect the bars to the board's rows.
4. **The "TOP" tag and the flex tag** — a small amount of the team colour would stop them reading as generic green.
5. **The season's team panel** — the same three variables could theme the user's team card in the standings, the schedule and the game preview, so the season feels like the same product as the draft.
6. **A dark-mode check** — the team colours are used as fills and washes; they need one pass with `color-scheme: dark` before they ship.

## 3. A correction
An earlier note of mine (M-369) said the line "Denzel Ward (93 OVR) · +1.65 wins here · priority +0.23 …" does not exist in V21. **That was wrong**: it is the **Pick priority panel's** per-position detail line (candidate line 1697 in V21, 1708 in the V22 candidate), visible in the screenshots. The cause was a grep whose output line was cut before the phrase, and I did not re-check it against the rendered page. `V22-Suggestions.md` P0-13 now carries the exact anchor and the corrected wording.

## 4. Figma
I have **no Figma tool in this toolset** — I cannot open a file, read a frame or push a design. What I can do is what is above: write the CSS and the palette, and render the result so it can be judged in a screenshot. If the Owner wants a Figma-driven pass, the palette table above is the part that would have to match, and it is one file to keep in step.
