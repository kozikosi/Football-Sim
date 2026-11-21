SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: Owner note intake — the rival-product note (Pro Football Dynasty) and what the two Steam pages actually say | DATE: 2026-11-21T03:30Z
FOR: MUSE (owner-notes intake + queue) · TO-ARCHITECT (product direction)

## 1 · The Owner's note, verbatim (2026-11-21T03:22Z, this chat)

> I would like to note something very particular about this rival product; i don't want the scouting
> or full gm experience but i think we should note the playbooks and visualizatios of the players and
> the fields and a longterm goal. i don't love the player faces but if we could visualize purely
> through badges spatially; tese are long term goals
>
> https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/
>
> https://store.steampowered.com/developer/sidelinesimstudios

MUSE: this needs an intake row. I did **not** edit `_agents/owner-notes/` or the ledger — that is
yours under the standing permission. Filing the verbatim text here so nothing is lost if this chat
ends; please copy it into `owner-notes/` with the timestamp above.

## 2 · What the two pages say (VERIFIED — fetched 2026-11-21T03:25Z, both URLs)

`store.steampowered.com/app/4769350` — **Pro Football Dynasty**, developer+publisher
**SidelineSim Studios**, planned release **January 2027**, "from the makers of Football Coach:
College Dynasty". No user reviews yet (pre-release). Tags: Sports · Simulation · Football (American)
· Management · **Text-Based** · Sandbox · **Turn-Based Tactics** · Choices Matter · Strategy ·
Tactical · Resource Management · Singleplayer. Stated features:

- "Call plays with a robust and realistic simulation engine, featuring **200+ offensive and defensive plays**"
- head coach **or** coordinator, "deep career mode of rises and falls across **50 years**"
- "Install **schemes**, set **depth charts** and run practice"; coaching staffs and facilities
- "**Watch every snap**" — a new animation system with different views
- draft / free agency / trades, **scouting** prospects, salary cap, contracts, practice squad
- stat tracking per player and team "from snap counts to career totals"; league histories, awards,
  Hall of Fame, records
- "Customizable **portraits** for all players and staff … billions of combinations … all
  **human-made pixel art**" (headbands, necklaces, eye black)
- toggles for injuries, free agency rules, draft rules, cap

`store.steampowered.com/developer/sidelinesimstudios` — the studio page (same studio; the fetch
returned the developer listing). Not independently informative beyond confirming the studio identity.

## 3 · My reading of what the Owner is asking for (so the queue rows are not invented)

The Owner names **three** things he wants noted and **four** he does not:

| wants noted | does not want |
|---|---|
| **playbooks** (schemes/personnel/strategy, shown, not just simulated) | scouting |
| **visualizations of the players** — spatially, via **badges**, not faces | the full GM experience (cap, contracts, staff hires) |
| **visualizations of the field** | player faces / portrait art |
| **a long-term goal** (a multi-season arc) | 200+ named plays + animation (that is PFD's "watch every snap") |

"Tese are long term goals" — the Owner is explicit that these are **direction**, not this sitting's
scope. Nothing here authorises an engine change, a pin move, or new product data.

## 4 · What our tree can already do about it (VERIFIED in the cakepanz-14 tree I reviewed today)

- The engine's **playbook vocabulary exists**: `matchup.ts:14` `OFF_OPTS` = 5 personnel packages
  (`11/12/13/21/22`) × 3 strategies (`run/neutral/pass`) = **15 offensive plans**; `:15` `DEF_OPTS` =
  2 packages (`base/nickel`) × 3 focuses = **6 defensive plans** — 21 plans, each with a display label
  already in `specs.ts:47-57` ("11 personnel", "run-heavy", …). `plans.ts:22 teamIdentity()` already
  picks a team's identity plan and returns `tilt`/`tiltD` (run-vs-pass lean, front-vs-coverage lean).
  **A playbook screen is a view over these — zero engine bytes.**
- The **spatial roster** needs no engine change either: `slots.ts` has 32 slots (offense 16 ·
  defense 14 incl. DL5 · special 2) with no x/y, and `fieldSlots(base)` already relabels for 4-3 vs
  3-4 (same position, same weight). Coordinates are pure presentation → a shell-side
  `fieldMap.ts` (slotId → x,y) + badges.
- **What is NOT in the data:** `drives.ts:24` `Drive` carries side/period/secs/plays/rush/pass/ends/
  points but **no field position per drive**, so a "ball on the 34, 1st & 10" view cannot be
  populated without inventing data — that is barred by AGENTS §7. The honest field visual is a
  **drive ribbon** (one block per drive, sized by plays, coloured by end) plus the roster field map.
- The **long-term arc is shell-side, not engine-side**: the engine has `season.ts`, `seasonrun.ts`,
  `league.ts`, `awards.ts`, `standings.ts`, `legacyprovider.ts`, but the shell plays one season and
  hard-codes the year (`App.svelte:307` `year: 2027`). A multi-season loop is therefore a shell
  feature over existing engine calls — the biggest single "long-term goal" item.

Full design proposal (what to build, anchors, risks, checks): `inbox/20261121-0335-ernie-P-287-pfd-lessons-playbook-and-spatial-badges.md`.

## 5 · Suggested queue rows (MUSE decides the wording; I am not editing the queue)

```
PRIORITY+: P-317 cakepanz/S15 — "playbook screen": a view over OFF_OPTS/DEF_OPTS + teamIdentity()
  (21 plans, labels already in specs.ts), the installed scheme on Team Select/Complete, and the
  tilt/tiltD plain-language line. No engine bytes. Owner 2026-11-21 (rival note).
PRIORITY+: P-287 shell UX — "spatial badge depth chart": slotId→x,y field map + badge rendering of
  the 32 slots (offense/defense/special), 4-3/3-4 aware via fieldSlots(), phone fallback = the
  existing list at 390. No faces, no ratings invented. Owner 2026-11-21 (rival note).
PRIORITY+: P-287 shell UX — "drive ribbon": per-drive blocks (side/period/plays/rush-vs-pass/end/
  points) from drives.ts, replacing the text-only scoring summary. No field position is invented.
  Owner 2026-11-21 (rival note).
PRIORITY+: P-3 long-term — "the franchise arc": offseason → next season loop (engine already has
  season/awards/standings/league; shell hard-codes 2027), dynasty-level stat retention. NOT this
  sitting's scope; Owner-labelled long-term.
```

— ERNIE (advisor; signs as ERNIE, never as another seat)