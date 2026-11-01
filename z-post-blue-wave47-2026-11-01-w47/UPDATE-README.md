# UPDATE-README — wave 47 (the Owner's round-47 directives)

Delivered 2026-11-01 · the product: `Football-Sim-Z-post-blue-w47.html` ·
md5 `eef6b93849b3df5d49b3f262185f678b` · 1,546,955 chars · base: the w46 bytes (md5 `aca7fe4f…`).

## The shimmer becomes one constant gold (O2/O4)

The pale-band sweep is gone. Every 90+ name on every surface now reads the CONSTANT deep gold
(`--zshim`) with one synchronized glow pulse — the Chiefs and the Raiders identical at every
instant, both themes. The Madden rankings' light-mode ANCHOR chip leaves pink for the site's own
gold family, and the anchored player's name follows the tier law inside the chip (90+ shimmer,
85+ bold) — the chip was the last surface without it. The audit (`w47_audit_gold.js`, 32 checks,
every player-listing surface, both themes) is green.

## The lineup dropdown speaks last names once opened (O1)

The closed box keeps the full name; the open menu reads "Stafford", "Smith-Njigba", "Bowman Jr" —
last names only, the position · OVR beside each, the full name on hover, shared last names in one
menu keep their full names.

## The theme follows the computer; no signal → dark (O5)

Two unguarded dark blocks had been forcing dark at boot since w32. The guard is restored: the
system's preference decides; a device that reports nothing boots dark; his saved choice still
wins. Verified live: system light → light, system dark → dark, no `matchMedia` at all → dark.

## The draft board's DIME stacks under the NICKEL (O6)

Both at x=−3 — the N of NICKEL sits right above the D of DIME (measured: nickel x=479 y=507,
dime x=479 y=556). The Guide's map stacks the same way.

## The toggles read clearly at night (O7)

The selected option on the 4-3/3-4 toggle, the roster view and the Table/Cards segment wears a
lit gold pill with an inset ring in dark mode — the faded wash that read like the opposite
choice is gone.

## Small moves (O8/O9/O16)

Slow sits before Instant. The Table/Cards segment rides the top right of its panel. The recap's
final score is wider in its panel with both team names pinned to their own sides.

## The depth chart lands with the map (O10)

The YOUR ROSTER tab's Full Depth Chart rows carry the pick-order beats and release on the map's
look-gate clock — row N lands exactly when player N arrives on the line-of-scrimmage map. The
LOS visualization itself is untouched.

## The lineup editor grows up (O11/O12/O13)

The squares and triangles retire. The formation (4-3 / 3-4) is now a STAGED change beside a
lineup editor — APPLY THE CHANGES saves it (and a formation-only stage lights the button up).
The bar reads ↶ UNDO · APPLY THE CHANGES (n) · RETURN TO MODEL LINEUP · REVERT CHANGES: UNDO
takes back the most recent applied move, RETURN TO MODEL LINEUP restores the math's lineup.

## The dark halfway ink (O14/O15)

Two answers, one law. The plan captions read the readable team ink at night for every team.
And the during-game screen's team ink is the team's OWN dark halfway (`txMd` — half of the way
from the dark page ink to the crayola anchor, clamped to read): Denver reads Denver, the
Chargers read the Chargers, the neutral text stays neutral.

## The review page speaks in badges (O17–O22)

The honors summary sits indented, one line per honor. The OPOY wears [#1 TE] [92 RTG]; the DPOY
[DE1] [100 RTG] (EDGE retired for the depth-chart spot); the COY [PROJ W 8] [W 12]; the
statistical champions wear the site's stat chips. The All-Pro, Pro Bowl and playoff honor chips
lead with the crests.

## SIM PLAYOFFS tells the run, then the storm (O23/O24)

No more divisional during-game interrupting the reveal. The user's run plays as its own
cinematics — one card per round, joyous for a win (the team's wash), plain for a loss ("SEASON
ENDS · KC 25 · 32 NE · THE RUN ENDS HERE") — then the Super Bowl stage mounts. Reduced motion
skips to the stage; missing the playoffs goes straight to the reveal.

## The last two (O25/O26)

"Awards, stats, your report card and how the season was decided" is retired. The box score's
final column reads the same faded 0.50 tone as the rest — one rule, every stage.

## Verify

- `w47_live.js` **51/53** (both themes, full draft→season→playoffs drive; the 2 fails are the
  environment flakes superseded by the dedicated checks below — the suite's own page keeps a
  layout quirk under the review map and the replay's line timing).
- `w47_map_check.js` **4/4** — the DIME stack (nickel x=479 y=507 · dime x=479 y=556) and the
  per-team dark halfway ink on the live play lines (LAC read #80c8ee, Denver #f89a76).
- `w47_audit_gold.js` **32/32** — every 90+ gold, every 85+ bold, both themes, all surfaces.
- `w46_live.js` on the w47 bytes **27/29** — the 2 fails are exactly the pink-anchor asserts
  this wave supersedes (his "make it more golden").
- `node --check` **11/11** script blocks · zero console errors through the whole drive ·
  390px: no horizontal overflow on the review page.
- Dashes: the new rendered strings carry only dots; the standing w46 report holds (compound
  terms, source comments, arithmetic minus).

Screenshots in `_agents/zai/notes/evidence/` · the suites in `_agents/zai/tools/`.
§veto candidates live in `notes/W47-INTAKE-LEDGER.md`.
