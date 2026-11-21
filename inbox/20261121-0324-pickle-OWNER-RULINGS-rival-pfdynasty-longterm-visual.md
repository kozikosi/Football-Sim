SPEAKER: pickle | ROLE: council seat (advisor) | TASK: file the Owner's long-term product direction from the rival Pro Football Dynasty; verbatim words + sourced page facts + labelled implications | DATE: 2026-11-21T03:24Z
FOR: Owner (verbatim record), MUSE (verbatim intake + ledger + PRIORITY: line), Architect/Claude (long-term design input). Council record only — no product, engine, pin, governance or queue file was edited by me.

## The Owner's words, verbatim (this chat, 2026-11-21T03:2xZ)

> "I would like to note something very particular about this rival product; i don't want the scouting or full gm experience but i think we should note the playbooks and visualizatios of the players and the fields and a longterm goal. i don't love the player faces but if we could visualize purely through badges spatially; tese are long term goals"

(Typos preserved — "visualizatios", "tese", "longterm".)

The two links the Owner supplied:
- `https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/`
- `https://store.steampowered.com/developer/sidelinesimstudios`

## Rulings I read from those words (Owner-supplied — quote is the authority)

| # | Direction | Force |
|---|---|---|
| A | **Do NOT build scouting or the full GM experience.** These are explicitly unwanted. | Non-goal / anti-goal, Owner-stated |
| B | **Note the playbooks** as a long-term goal. | Long-term goal, Owner-stated |
| C | **Note visualizations of the players and the fields** as a long-term goal. | Long-term goal, Owner-stated |
| D | **No player faces.** If players are visualized, do it "purely through badges spatially." | Long-term design constraint, Owner-stated |
| E | All of B–D are **long-term** — not part of v1, not a work-order change now. | Scope/timing, Owner-stated |

Nothing here changes the current build (Colors v1 / S15 / engine). Do not fold these into the active slice or the queue as near-term work.

## What the rival actually is (REPORTED — fetched from the Owner's two Steam URLs this sitting, 2026-11-21T03:2xZ)

Source: the Steam store pages themselves, read via webfetch. Not a gate, not a product claim about our engine.

- Title **Pro Football Dynasty**, app 4769350; developer/publisher **SidelineSim Studios**; planned release **January 2027**; "not yet available", **no user reviews**. From the makers of *Football Coach: College Dynasty* (app 2151290, released 16 Jan 2025, $19.99).
- Positioning in their own words: "The ultimate American football management sim. Call plays, sign free agents, scout prospects, draft superstars, and dive into deep stats for every player and team. Take control as a coach or GM... And yes, you can now watch every snap!"
- Tags: Sports, Simulation, Football (American), Management, Text-Based, Sandbox, Turn-Based Tactics, Strategy, Tactical, Resource Management, Singleplayer.
- Play-call layer: "200+ offensive and defensive plays", install schemes, depth charts, practice, 50-year career, "watch every play develop in the new animation system, with different views."
- The **scouting / full-GM** layer the Owner rejects: "scouting prospects and finding gems", salary cap/contracts, "Play as a GM, with a hands off approach to coaching, or full Franchise."
- The **faces** the Owner rejects: "Customizable portraits for all players and staff... billions of combinations (including headbands, necklaces, eye black...), all human-made pixel art."
- The **field/player visualization** the Owner wants to note: the animation system with "different views", per-player stat tracking, team/league histories and records.

## Implications for our product (INFERRED / IDEAS — my reasoning, not the Owner's words)

The Owner is drawing a boundary and a direction at once: adopt the rival's *playbook* and *spatial field/player visualization* ideas, reject its *scouting*, *full-GM management*, and *portrait/faces* ambitions. That boundary fits our fixed shape: offline, one self-contained file, real names/teams with non-EA ratings, model-first, draft board with a one-click Draft button and a separate TOP badge. A badge-based spatial language is closer to what the board already does (`.cp-top3`, `.cp-topbtns`, slot labels) than any portrait system, so D is a natural extension rather than a new product.

Long-term ideas to hold, unranked, for whenever the Owner opens this:
1. **Badge-only player glyph** — encode role/scheme-fit/engine value as a spatial badge on the board row; no avatar asset, offline-safe, scales to the 1,953-player pool.
2. **Field-as-badge-map** — a top-down spatial view where each roster slot is a badge on a field, so "visualize the players and the fields" is one gesture rather than two screens.
3. **Playbook as scheme badges** — represent a team's playbook/scheme as a small badge set (concept, not a play-calling sim — keep A's non-goal).
4. **Guard rail**: whatever is built, do not add portrait art or a GM/scouting mode; those are the Owner's explicit anti-goals, and they would also violate the offline single-file and data-integrity rules.

I have NOT designed, scoped or estimated any of these into work. They are prompts for a later brainstorm, not accepted direction.

## What is NOT decided

- Whether "playbooks" means scheme labels only or any play-selection surface — the Owner said "note", not "build".
- Whether field visualization is static (board-like) or animated — the rival's animation system is REPORTED about them, not a request for us.
- Any timing, priority or release target. "Long term" is all the Owner gave; do not convert it into a queue date.
- No protected constant, engine pin, build, brand name or Owner approval is implied here.

## Verification status of this filing

Verbatim Owner text is from this chat (the Owner's own message). Steam facts are REPORTED from the two URLs the Owner supplied, fetched this sitting; they describe the rival, not our product. The table in "Rulings" is my reading of the Owner's words; the implications are INFERRED and labelled. No gate, build, engine or hash check was run. No product, engine, pin, governance, queue or `tools/` file was edited.

Owner notes/PRIORITY intake is MUSE's file; I did not edit it. Request to MUSE: save the verbatim block above into `_agents/owner-notes/` and add a non-dated, long-term PRIORITY entry for B–D (and the A non-goal) to the intake ledger — without turning them into near-term queue work.

— pickle (council seat; advisor)
