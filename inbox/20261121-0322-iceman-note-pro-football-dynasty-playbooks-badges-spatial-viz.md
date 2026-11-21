SPEAKER: iceman | ROLE: advisor (OpenCode/Iceman Free) | TASK: note user-reported inspiration from rival product (Pro Football Dynasty / Sideline Sim Studios) for long-term UI/UX goals (playbooks + field/player spatial viz, badges-not-faces) | DATE: 2026-11-21T03:22:00Z

FOR: product/UX direction (long-term goals; not a current build request)

## Source (REPORTED by user)
- Steam page: https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/
- Developer page: https://store.steampowered.com/developer/sidelinesimstudios

The user asked to “note something very particular about this rival product”. I did not independently browse/evaluate the pages beyond recording the links here (UNKNOWN details beyond user report).

## User intent (verbatim in meaning, recorded carefully)
- “I don't want the scouting or full GM experience…” (so those modes/scope are **not** desired for 76 Pancakes/Cakepanz direction as stated).
- “but i think we should note the playbooks and visualizatios of the players and the fields…” as things to note.
- “i don't love the player faces but if we could visualize purely through badges spatially…” 
- “these are long term goals”

## What to capture (INFERRED structure of the note)
1. **Playbooks (long-term):** consider how playbook concepts could be visualized/explained in the shell (how plays/concepts are represented, not full GM playbook authoring unless later decided). This is adjacent to “visualizations of…” and could inform season/game presentation or coaching/plan explanations later.
2. **Visualizations of players and the fields (long-term):** spatial/diagrammatic representations of players on/around the field (and related visual storytelling). Prioritize clarity and game feel over realism.
3. **Badges, not faces (preference):** avoid photoreal/player-face dependence; prefer **badge/icon/system-based** player identity in spatial views (consistent with team colors, roles, OVR/role markers already in shell). This aligns with current Cakepanz tone (clean UI, tokens, no face art pipeline implied).
4. **Explicit non-goals (per user, now):** do **not** pursue scouting or full GM experience as part of adopting this inspiration.

## Implications for Cakepanz / UI shell (INFERRED, for future brainstorming)
- Spatial “field view” concepts could complement (not replace) the current board/season screens: e.g. a lightweight schematic showing formations/personnel concepts or play-call outcomes visually, using badges + team accents + field lines/grid — stays offline-friendly, no art asset bloat.
- Badge-first identity is compatible with existing design language (team three-colors framing, gold/rose tokens) and reduces licensing/asset risk compared to faces.
- Any playbook visualization should be read-only/explanatory first (tied to engine/state facts) before any interactive editor, to respect “not full GM”.

## Open questions (UNKNOWN until explored)
- What exact visualization patterns Pro Football Dynasty uses (field diagrams, play arrows, player markers) — requires viewing the product/screenshots/trailers (not done here).
- Whether Claude’s engine/sim data can support the needed states for meaningful spatial viz (snap-to-snap detail level?) or if this is a presentation-layer layer only.

## Suggested next step (optional)
If/when the Owner or Architect wants this pursued, create a small mood/requirements note (with screenshots captured by someone who can view Steam page) and a P-level idea in the queue — **do not** implement in current S15/Cakepanz WIP work.


## Images stored (VERIFIED, downloaded 2026-11-21)
Stored under `inbox/assets/pro-football-dynasty-20261121/` (from Steam page assets referenced above):
- `header.jpg` (store header)
- `extras-01.avif`, `extras-02.avif`, `extras-03.avif`, `extras-04.avif`, `extras-05.avif` (page extras/section images)
- `poster.avif` (poster/teaser image shown on the page)

Note: These are third-party assets from the Steam/store CDN as shown on the page at fetch time; stored here for reference/brainstorming context in this repo. AVIF/JPG formats as served.
