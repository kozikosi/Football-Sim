SPEAKER: hy4 | ROLE: advisor | TASK: record Owner's note on rival product Pro Football Dynasty + long-term visualization goals | DATE: 2026-11-21T03:22Z
FOR: Owner · MUSE (please file verbatim in `_agents/owner-notes/` and add PRIORITY+ rows) · Architect (Claude) · Z.ai. Advisory record only — nothing built, no engine or product edits.

## 0 · The Owner's message, verbatim (do not paraphrase)

> I would like to note something very particular about this rival product; i don't want the scouting or full gm experience but i think we should note the playbooks and visualizatios of the players and the fields and a longterm goal. i don't love the player faces but if we could visualize purely through badges spatially; tese are long term goals
>
> https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/
>
> https://store.steampowered.com/developer/sidelinesimstudios

## 1 · What the two links actually say (REPORTED — fetched 2026-11-21T03:22Z, Steam store/developer pages; no user reviews yet)

- **Pro Football Dynasty**, SidelineSim Studios, planned release **January 2027**; from the makers of *Football Coach: College Dynasty* (out 16 Jan 2025, $19.99). Tags include **Text-Based**, Simulation, Management, Turn-Based Tactics, Strategy, Sandbox. PC/Mac.
- Store blurb: "the ultimate American football management sim… call plays, sign free agents, scout prospects, draft superstars, and dive into deep stats for every player and team."
- Feature blocks the Owner's note touches: **CALL PLAYS AND RISE THE RANKS** — "200+ offensive and defensive plays", schemes, depth charts, practice, "watch every play develop in the new animation system, with different views"; **EVERY STORY IS SAVED** — stat tracking for every player/team, histories, awards, Hall of Fame, records, and "customizable portraits for all players and staff… human-made pixel art".
- Blocks the Owner explicitly **excludes**: scouting prospects, free agency/trades, salary cap, contracts, practice squad, staff skills/personalities, 50-year career, coach/GM/Franchise mode split.
- Source limits: this is a **pre-release store description**, not a hands-on review (REPORTED, not VERIFIED in-game). No screenshots were evaluated; the "badges spatially" idea is the Owner's, not a feature claim about the rival.

## 2 · Anti-goals — binding, because the Owner said them plainly

1. **No scouting system.** Do not build prospect-scouting reports, grades, or a scouting interface. Our draft board's VM-derived "why" and top-three treatment is *not* scouting; keep it that way.
2. **No full-GM layer.** No salary cap, contracts, trades, free agency, staff hiring, practice squad, or 50-year dynasty mode. Our season is a 20-0 season record, not a franchise simulation.
3. **No player faces/portraits.** "I don't love the player faces" — the Owner's alternative is explicit: **badges, spatially**. This supersedes any portrait or pixel-art ambition, including the rival's customizable portraits.
4. **These are long-term goals.** Not v1.1, not a cutover gate, not a reason to touch the engine pin or delay Colors v1.

## 3 · The three things worth noting (the Owner's "very particular" point)

- **Playbooks** — the rival makes play-calling and schemes central. Our engine already has the seed of this: `applyOffPlan` / `applyDefPlan` / `ensureGamePlans` / `planWhy` (AGENTS.md §9) and the preseason coaching-philosophy copy (P-176). Long term, the shell could give plans a *visual* home instead of a dropdown.
- **Player visualization** — not faces: each player as a **badge in a spatial arrangement** (his slot/depth position), carrying only facts we already own (OVR/SPD/STR from the frozen ratings, slot, flex cost, needs). Gold marker for the higher OVR per the V23 ruling; team colours per the Owner's 22 Oct table. No invented attributes.
- **Field visualization** — a top-down field whose markers follow the drive events already emitted by the engine's feed (`gameFeed`, period/scoring/turnover, OT-block rule). This is a **shell-only renderer** of existing engine data: no engine change, exactly like the why-line derivation. Long term it could serve the Owner's 30–60 s game animation request (V23 request #1) without touching the pin.
- **The connecting idea:** all three are *spatial presentations of engine truth*, not new simulation. That is the part that fits our architecture; the rival's management depth is the part the Owner does not want.

## 4 · Concrete long-term sketch (advisory; builder detail, not a decision)

- **A "field" view toggle beside the board** — 11 badge tokens on a pitched field at their natural slots; hover/focus reveals the same VM numbers the table shows. It must satisfy the uniform-board law in spirit: one anatomy, no second data source, no display-parsed values.
- **A playbook card surface** — a small set of named plays/schemes drawn from the engine's own plan vocabulary, each shown as a spatial glyph map with the plan's reason (`planWhy`). No 200-play library: we show what the engine can actually simulate, and label anything else as out of scope.
- **Provenance and constraints:** every badge reads from the frozen ratings and the exported VM; any new shell-side field needs the declared save-envelope schema (my 0305 ideas, §1) before it persists. Offline is hard — SVG/CSS glyphs only, no remote assets, no CDN. Reduced-motion must kill any field animation.
- **Sequencing:** file as P3 ideas now; revisit only after Colors v1 ships, the S15 evidence pipeline closes, and the cutover is done. The rival's Jan 2027 date is context, not a deadline for us.

## 5 · What I am NOT proposing

No scouting, no GM/cap/trade system, no portraits, no new engine data, no reference to the rival's design as proof of what our product should be. No queue edit by me — MUSE owns `_agents/QUEUE.md`; I ask for two `PRIORITY+` lines in my bulletin, one per cluster (playbooks; spatial badge/field visualization), each marked P3 and post-v1.1.

## 6 · Status

Owner note recorded verbatim in §0; facts in §1 labelled REPORTED with fetch time; §2–4 are my INFERRED implications for discussion. Nothing accepted, nothing built. No product, engine, pin, governance or queue file edited.

## 7 · Addendum — images browsed and stored (Owner's follow-up request)

Both pages were opened in the in-app browser (Store + Developer tabs, text captured); the in-app `browser.capture` failed with `UnknownVizError`, so I pulled the store's own image assets directly and stored them at `research/competitors/pro-football-dynasty/2026-11-21/`:
- `screenshots/pfd-01.jpg … pfd-13.jpg` — all 13 full 1920×1080 store screenshots.
- `developer-page/dev-01.jpg … dev-11.jpg` — the developer page's distinct images (PFD header/shots plus *Football Coach: College Dynasty*).
- `INDEX.md` (which images matter, rights note), `CHECKSUMS.sha256` (24 entries), `SOURCE-PAGES.txt`, `SOURCE-SCREENSHOTS.txt`, `SOURCE-DEVELOPER-IMAGES.txt`.
- VERIFIED by opening them: `pfd-01` is the spatial field with portraits and route arrows; `pfd-03` the player card with OVR/PRJ badges and attribute bars; `pfd-11` the win-probability chart; `pfd-13` the portrait/appearance editor (the faces the Owner excluded). This is reference material only — third-party copyrighted images, not for product use.
- Stored under `research/`, not in my lane, per "lanes hold no images".

## 8 · Owner ruling — the two north-star screens, with badge tokens instead of faces

**Verbatim Owner message (do not paraphrase):**
> Make a note that 01 and 02 are the real goals of our site; but repalce the player faces with more of a badge format

- **How I read "01 and 02" (INFERRED, flagged for correction if wrong):** `screenshots/pfd-01.jpg` and `screenshots/pfd-02.jpg` in the stored set. I opened both to confirm: **pfd-01** is the spatial field (11 players at their positions, route arrows, coverage label, Call Plays / Game Plan tabs); **pfd-02** is the play-calling screen (full-pitch field view, last-snap ticker, opponent and your-call play cards with formation diagrams, "Change Play" / "Suggest", tendency bars). Together they are exactly the "playbooks and… fields" pair from §0. If the Owner meant the first two images of the rendered gallery instead (pfd-01 + pfd-03, the player card), say so and I will correct this note.
- **What changes in status:** these two are no longer merely rival curiosities or P3 ideas — they are **Owner-stated product goals** for 76 Pancakes: a spatial field presentation and a playbook/play-call presentation. The earlier "these are long term goals" still stands: I do **not** treat this as v1.1 scope, a cutover gate, or a reason to touch the engine pin.
- **The binding substitution:** **no player faces.** In both screens every player is represented as a **badge token** at his spatial position. Badge contents must come only from facts we already own — name/position, OVR, SPD/STR, natural slot + flex cost, team colours (Owner's 22 Oct table), and a gold marker for the higher OVR per V23. No portraits, no invented attributes, no pixel-art customization (pfd-13 stays the counter-example).
- **Engine boundary (INFERRED, shell-only):** the field can be driven by existing `gameFeed` drive events; the playbook surface by the engine's own plan vocabulary (`applyOffPlan` / `applyDefPlan` / `planWhy`). Everything else on pfd-02 (tendency bars, opponent play secrecy, play libraries) is rival product surface we do not commit to.
- **Routing:** MUSE — please upgrade the two `PRIORITY+` rows from "ideas" to "Owner-stated long-term product goals", keeping P3 and post-v1.1; Architect — treat pfd-01/pfd-02 as the north-star visual direction for the Cakepanz/Colors shell when that work is scoped. No one is assigned; no build is authorised by this note.
