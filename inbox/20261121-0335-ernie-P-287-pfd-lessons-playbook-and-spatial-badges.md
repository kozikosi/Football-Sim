SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: Pro Football Dynasty — the three things worth taking (playbooks, spatial badges, a long-term arc), what to leave, and the smallest honest build of each | DATE: 2026-11-21T03:35Z
FOR: P-287 (shell UX) · P-317 (cakepanz / shell)

Scope line first: the Owner said these are **long-term goals**, and named the rival as a *note*, not
a work order. Nothing below touches the engine, the pin, ratings or data. Every anchor is a file in
the cakepanz-14 tree I reviewed this session; every "no engine bytes" claim is checked.

## 1 · What the rival actually is (so we copy the right layer)

Pro Football Dynasty (SidelineSim Studios, Jan 2027, pre-release, "Text-Based" + "Turn-Based
Tactics" tags) is a **management** sim: 200+ named plays, "watch every snap" animation, 50-year
career, cap/contracts/scouting, pixel-art portraits. The Owner's note is a *subtraction* from that:
no scouting, no full GM, no faces. What survives is exactly the layer that is **cheap for us and
strong for them**: the scheme is legible, the players are legible in space, and there is a horizon.

## 2 · The three takes

### 2a. The playbook screen — highest value, near-zero cost (recommended first)

We already simulate schemes; we just never show them. `matchup.ts:14-15`:

```
OFF_OPTS = 5 personnel (11/12/13/21/22) × 3 strategies (run/neutral/pass)  = 15
DEF_OPTS = 2 packages (base/nickel)     × 3 focuses (run/neutral/pass)      =  6   → 21 plans
```

Each has a display label already (`specs.ts:47-57`: "11 personnel", "run-heavy", "base", "pass
focus"), and `plans.ts:22 teamIdentity(teamRatings, leagueRatings)` already returns
`{ off, def, tilt, tiltD }` — the plan the coach actually picks, plus two leans (run-vs-pass,
front-vs-coverage). So the screen is:

- **Team Select**: each team's identity card — "Chicago: 12 personnel, run-heavy; base, run focus;
  leans run (+0.42)" — from `teamIdentity` on the *real* ratings. The user picks a team partly by how
  it wants to play, which is a decision the engine already makes and the UI hides.
- **Complete / Hub**: your identity line, and how it differed from what you drafted.
- **A 21-cell playbook grid** (offence row, defence row) with your plan highlighted — the whole
  "install schemes" fantasy in one screen, no new simulation.
- Zero engine bytes; one new view module + three call sites. Check: a node law that the card's
  `off.pers`/`off.strat` equals `teamIdentity(...)` for that team's ratings (the same "oracle from
  the engine, never from text" discipline as L24).

Why this is the best first move: it makes the *engine's existing sophistication visible*, which is
the product's actual differentiator versus a management sim — and it costs a screen, not a system.

### 2b. Spatial badges instead of faces — the depth chart as a field

The engine's `slots.ts` gives 32 slots (offence 16 · defence 14 incl. DL5 · special 2) and
`fieldSlots(base)` already relabels for 4-3 / 3-4 with **no weight change** (Owner 2 Nov ruling:
"the same position carries the same weight in both bases"). There are **no coordinates** in the
engine, which is the good news: coordinates are pure presentation, so:

- add `src/lib/view/fieldMap.ts`: `slotId → { x: 0..100, y: 0..53.3, unit }` for one half-field
  (offence left-to-right, defence mirrored), plus a `personnel` variant for 11/12/13/21/22 that dims
  the off-field badges using the *package definition* (standard football, labelled as such — it is
  the meaning of "11 personnel", not a rating claim).
- badge = position label + OVR + the engine's value reading (the same numbers the board shows), at a
  fixed 44 px touch target. No portrait, no likeness, no generated art — this also sidesteps the
  entire portrait-asset problem PFD solves with "billions of combinations of human-made pixel art",
  and it keeps AGENTS §7 intact (we invent no player facts).
- phone (390 px): the field becomes a vertical **depth chart** — the existing list — with the badge
  rail sticky; the spatial view appears at ≥768. A 32-badge field at 390 is not a good idea and I
  would not pretend otherwise. Check: extend the viewport matrix with "badge count = 32 and
  `scrollOverflow=0` at 390/768/1280", and a board law that every badge's OVR equals the engine's
  `BoardRowVM.ovr` for that id (no re-typed numbers).

This is the Owner's "visualize purely through badges spatially", and it is *more* honest than faces:
the badge can only show what the engine knows.

### 2c. The field/drive visual we can actually populate — a drive ribbon

`drives.ts:24` `Drive` has `side, period, start, secs, plays, rush, pass, sacks, end, pts, conv,
oppPts, defTD` — and **no field position**. So the "ball on the 34, 1st & 10" view is not available
without inventing data (barred). What *is* available and currently wasted (the Feed shows a text
summary):

- a **drive ribbon**: one block per drive, width ∝ plays, fill = rush/pass split, colour = end
  (TD / FG / punt / turnover / downs / safety), height ∝ points; hover/focus gives "12 plays, 68
  rush, 41 pass, ended in a punt".
- the **scoring shape** of the game at a glance — the single most-requested thing a text sim lacks,
  built from data we already have.
- Zero engine bytes; `feedVM.ts` already normalises the drive list for the feed.

## 3 · The long-term goal (named, not scoped)

"the longterm goal" = **the franchise arc**: one draft → season → offseason → next season, with
league history, awards and records retained. The engine already has `season.ts`, `seasonrun.ts`,
`league.ts`, `awards.ts`, `standings.ts`, `legacyprovider.ts`; the shell plays exactly one season
and hard-codes `year: 2027` (`App.svelte:307`). So the arc is a **shell** feature over existing
engine calls: a season-end screen (standings → awards → your record), then "next season" re-seeding
the league with a new year and carrying a `legacy` record. That is the honest version of "dynasty"
for a product with no cap/contracts — and it is the one that would make the product feel long.

## 4 · What to leave (deliberately, so nobody re-litigates)

Scouting, cap/contracts/staff/facilities, 200+ named plays, play-by-play animation, player portraits
and likeness, "watch every snap". The Owner excluded scouting and the GM layer explicitly, and the
engine is statistical (drive generator, step 6) — it has no named plays to animate. Pretending
otherwise would be the "invented surface" the council keeps catching.

## 5 · Order of work I would recommend (when the Owner wants it, not now)

1. **2a playbook screen** — visible payoff, one screen, no new data, makes the engine legible.
2. **2c drive ribbon** — fixes the biggest hole in the game presentation; pure view over `drives.ts`.
3. **2b spatial badges** — the Owner's own idea; needs the 390 fallback discipline, so do it after
   the two cheap wins.
4. **the arc (§3)** — the long-term goal; shell-side loop, biggest scope, do it last.

## 6 · Guardrails

No engine bytes, no pin change, no ratings or data invented, no `colors/` edits, no product HTML —
advice only. The badge coordinates and the personnel-package dimming are presentation; both must be
labelled as presentation, never as engine facts. If the Owner wants only one thing from this file:
**build 2a** — the shell is sitting on 21 simulated schemes it has never shown anyone.

— ERNIE (advisor; signs as ERNIE, never as another seat)