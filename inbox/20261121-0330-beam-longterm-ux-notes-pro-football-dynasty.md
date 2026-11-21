# inbox/20261121-0330-beam-longterm-ux-notes-pro-football-dynasty.md

SPEAKER: Beam | ROLE: council seat | TASK: long-term UX notes — rival product "Pro Football Dynasty" (Sideline Sim Studios) | DATE: 2026-11-21T03:30Z
TYPE: IDEA (long-term, post-v1.1)

## Source
- https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/
- https://store.steampowered.com/developer/sidelinesimstudios

## What is worth noting (Owner's words, verbatim-ish)
- The rival product leans on **playbooks** and **visualizations of players and fields**. We do NOT want the scouting or full GM experience, but playbooks + field/player visualizations are worth noting as a long-term direction.
- The Owner does not love the rival's **player faces**. Preferred direction: visualize purely through **badges, spatially** (no faces). Badges placed on the field / in space, carrying ratings/role identity.

## Implications for cakepanz / the shell (long-term, NOT for v1)
1. **Playbook viz as a post-draft, post-game surface.** The engine already computes plans (`applyOffPlan`/`applyDefPlan`, `planWhy`, `matchupModel`). A long-term "playbook view" could render the chosen plan as spatial badges on a field diagram, tied to the same engine numbers — not a new sim, a new view of existing sim output. Keep it offline-first, one self-contained HTML, no assets.
2. **Spatial badges instead of faces.** A badge = role + rating + (optionally) a one-letter/shape glyph, positioned on a field schematic. This matches the engine's slot/role model (`NATURAL_SLOT_MAP`, `flexPenaltyFor`) and avoids likeness/rights issues entirely. Candidate home: the recap's drive chart or a new "field view" tab post-cutover.
3. **No scouting/GM bloat.** The Owner explicitly does NOT want the scouting or full GM experience. So: no scouting reports, no prospect watch, no contract negotiations. Only playbooks + spatial field viz. This is a scope guardrail, not a feature list.
4. **Offline + single-file constraint still governs.** Any viz must ship inside the self-contained HTML (no CDN, no paid API). SVG/CSS badges are fine; raster faces are out.
5. **Post-v1.1, after Colors cutover + basketball.** Do not let this pull scope from Colors v1. File as a P3 long-term idea; revisit after the engine is the single source and the shell ships.

## What NOT to do
- Do not add faces, portraits, or likeness-based assets (rights + size + offline).
- Do not build scouting/GM screens.
- Do not let this delay Colors v1 / the cutover.

## Suggested follow-up (for later sittings)
- A mock-up in a lane (static HTML <=10 KB) of a "spatial badge field view" driven by one real drive's events — proves the concept without engine changes.
- An inbox proposal naming the exact engine anchors (`playGame`, `playByPlay`, `generateGameSummary`) the viz would consume, so the Architect can confirm the data path exists.

— Beam · noted per Owner request. No code changed.
