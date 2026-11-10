# INTAKE LEDGER — Slice 3 + Slice 4 (Z.ai · 2026-11-10)

The Owner's and MUSE's words, item by item, each with where it landed. Sources:
`council/muse:_agents/muse/deliveries/prompts-2026-11-05/zai-slice3-2026-11-09.md` (§1–§5),
`…/zai-slice3-followup-2026-11-10.md`, `…/zai-slice3-slice4-2026-11-10.md`, and the muse P-314 review.

## §1 — Slice 3 (P-316, hydration + board chrome)

| # | Directive (source) | Landed |
|---|---|---|
| 1 | "Consume the engine snapshot pinned at `4ca9a071`, do not move the pin, do not update flex values in Slice 3" (slice3 §2/§3) | Pin re-verified byte-identical before build (`diff -rq`, 52 files, exit 0) and again after; zero flex values touched |
| 2 | "The hydration code (`hydrate.ts` landed unwired and untested) plus the load/save UI" (cakepanz prompt §3-A slice 3) | `src/lib/savesApp.ts` wires `hydrateWeek` / `hydrateSeasonConsistency` / `saves.serialize` / `restore`; `src/lib/components/Saves.svelte` is the load/save UI (slots A/B/C) |
| 3 | "The FeedEvent union at drive-level granularity" (cakepanz prompt §3-A slice 3) — already in the snapshot (`app/feed.ts`); the SLICE task is consuming it | Slice 4 consumes exactly that union; Slice 3's UI renders the hydrated week summary (the season screens are later slices) |
| 4 | "The gone-odds tooltip. Between now and my next pick: show the odds a player will be gone by my next pick, with a tooltip on hover explaining its method" (slice3 §2 item 1, carried from Slice 1) | `BoardRow.svelte`: the gone% cell is hover/focusable; tooltip names the method verbatim: real CPU logic, `sims` replays, `picksBetween` picks; the meta comes from the `goneOdds` object App already computes |
| 5 | "The 'my needs' sticky row. A sticky row showing which of my 32 slots are still open, clickable to filter the board to those slots" (slice3 §2 item 2) | `NeedsRow.svelte`: sticky under the board header; open slots from the engine's `openSlots`, labels from `slotLabel`, grouped by unit; click toggles the filter (row fills the slot OR lists it in also-fits); "ALL" clears |
| 6 | "Flexing is fun… let the user try the weird flex, not just the optimal one" (slice3 §5) | The needs chips and the also-fits chips stay side by side; the filter matches flex fills too, so a weird flex route to a needed slot is reachable in two clicks; no cost is hidden |
| 7 | "When you display flex information, the cost should read as a consequence of what the player can and can't do — not as an arbitrary number" (slice3 §1) | Design note honoured: chips keep the engine's `−N flex` form (the law), and the tooltip's method sentence explains WHERE the number comes from; a deeper "why the cost" explainer is filed as `IDEA:` in the README (needs per-role skill profiles — the engine's future, not mine to invent) |
| 8 | Review criteria (P-314/P-316): snapshot byte-identical, battery green, boundaries respected, README with the comparison notes | All four delivered; the battery JSON carries the counts |

## §2 — Slice 4 (P-287, N3 drive-level feed UI)

| # | Directive (source) | Landed |
|---|---|---|
| 9 | "The drive-level feed UI… each drive as a feed event — what happened on the drive, who scored, the key plays — presented as a feed the user can scroll through, not just a box score" (slice3-slice4 prompt) | `src/lib/screens/Feed.svelte` + `src/lib/feedVM.ts`: one entry per drive — clock, team, outcome badge, the engine's own summary sentence, the scoring events as badges, the running score |
| 10 | Owner verbatim: "i like the badge format and the colors of the current version… keep the badge format and the colors. Do not redesign the feed's look from scratch" | The w88 anatomy is rebuilt line-for-line: `zrl-t` clock stamp (neutral ink) · crest/team chip in the team's ink · `zrl-badge` chips (currentColor border, 6px radius, .62rem/800/.08em) · `zrl-sc` running score `away · home` · `zrl-me` glow on the user's drives · quarter marks · the FINAL card · the beat-in animation with `prefers-reduced-motion` off-switch. Inks come from the snapshot's own `TEAM_COLORS` (the Owner's 22 Oct table) — presentation picks the readable tone; no new palette invented |
| 11 | "Make it more dynamic with Svelte + hydration, but do not change the badge format or the colors" | Svelte 5 state: the newest-first toggle (a feed reading vs the replay reading), the ME filter, the lead-change marks — all live without touching the line anatomy |
| 12 | "It reads from the engine snapshot (pinned at `4ca9a071`) — the same snapshot Slice 3 uses. Do not move the pin" | The game is played by `simulateGame` through `matchupModel`/`teamIdentity` from the snapshot; the fixture is the engine's own `buildSchedule` week 1 and the seed is the engine's own `gameSeed` derivation; the feed is mapped through the snapshot's `gameFeed` |
| 13 | "Do not generate ratings" (boundary) | No ratings are generated: team ratings come from the engine's own `lineupFor` → `teamRatings` path on the rosters the draft log produced (the same path the engine's fixture and season use). The UI invents no number |
| 14 | "Yards: v1 null — do not fake it" (engine `feed.ts` field comment) | The UI renders plays and time only; no yard figure appears anywhere |
| 15 | "Newest first, with the score and the story of the drive visible at a glance" (brief) vs the w88 replay look (game order) | Both: the default reading is the w88 game order (the look the Owner likes); a toggle flips to newest-first (the brief's feed reading). Score + outcome badge + summary are visible on every entry in both readings |
| 16 | Review criteria (P-287): w77 battery extended (adapter), snapshot still frozen, view-models map to plain JSON, delivery README | Battery extended (+20 APPLY laws; the feed laws recompute the SAME game node-side and compare the UI against it exactly); snapshot re-verified; `feedVM.ts` outputs plain JSON only; README written |

## §3 — Standing rules honoured

| # | Rule | How |
|---|---|---|
| 17 | "Do not respond until Slice 3 AND Slice 4 are both complete" (standing rule) | Both slices complete in this one delivery; one zip |
| 18 | "If you find a fragility, a trap, or a gap, report it in the delivery, do not hide it" (the w88 lesson) | Three findings filed in the Slice 4 README (the empty-roster flex trap, the `gameSeed` home/away subtlety, the ratings-not-stored gap) |
| 19 | Innovate at full strength (both prompts) | Five innovations built and listed per slice; four `IDEA:` lines filed |
| 20 | §5 rules: no push, zip at end of chat, verify with measurements, no work-report without a link and md5 | Zip + md5 in `download/`; every number in this delivery was printed by a script |
