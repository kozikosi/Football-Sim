SPEAKER: glyph | ROLE: council seat | TASK: Owner note — rival reference (Pro Football Dynasty) as long-term viz direction for cakepanz/UI shell | DATE: 2026-11-21T03:23Z
FOR: Owner request (chat, 2026-11-21) — long-term goals note; not a current queue item, not a build/change request
EVIDENCE: Owner-stated direction (VERIFIED as stated in chat) + Steam store observations (REPORTED, fetched 2026-11-21)

## Sources reviewed (REPORTED)
- https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/
  - Observed on page: “ultimate American football management sim…”; features listed include calling plays with “200+ offensive and defensive plays”, installing schemes / setting depth charts / run practice, and “watch every play develop in the new animation system, with different views…”; also roster/cap/draft/FA/trades/GM-coach roles, deep stat tracking, and “customizable portraits for all players…” (pixel art). Planned release shown as January 2027.
- https://store.steampowered.com/developer/sidelinesimstudios
  - Observed: SidelineSim Studios (sports management sims) — Pro Football Dynasty (upcoming) and Football Coach: College Dynasty (released).

## Owner direction (VERIFIED — stated)
- Note this rival/product as a **long-term goal** reference for: **playbooks** and **visualizations of players and the field**.
- **Explicitly out of scope for this inspiration:** scouting and the full GM experience.
- **Not wanted:** player faces/portraits. Preferred: **visualize purely through badges, spatially**.
- Scope/priority: long-term goals (does not alter current S15/cakepanz WIP priorities, engine/pin, ratings, or protected constants).

## Implications for cakepanz / UI-UX shell for Claude’s engine (INFERRED — proposals, long-term)
Goal: richer spatial understanding of football context while staying presentation-only over engine truth (engine untouched; no invented data).

1. **Playbook / scheme visualization (explanatory, not GM)**
   - Diagram formations, alignments, routes/assignments as static or stepped visuals tied to engine outputs (gameplan, play/feed context) — e.g. compact play-card or drive-context panel showing “who is where / doing what” for key moments.
   - Keep it descriptive of engine results/state; avoid becoming a separate play-calling/sim system unless explicitly requested later.

2. **Badge-based spatial player representation (no faces)**
   - Represent players as tokens/badges encoding position/role, team identity (color/abbr), number or slot marker, and state (on-ball, target, pressure, result, open/filled need where relevant) — placed spatially on a field/formation map.
   - Advantages (INFERRED): legible at small sizes (390px-aware), information-dense, consistent with data/model-first and “label travels with numbers” provenance; avoids portrait asset/style/likeness complexity.

3. **Field visualization (feed-linked)**
   - 2D field strip/situational view (LOS, down/distance, ball spot, direction/result) to complement the existing drive-level feed: render chronological, engine-sourced events spatially (badge positions/movement/event markers) without fabricating detail.
   - Progressive ambition: static situation snapshots → event-step diagrams → optional animated playback (must respect reduced motion; deterministic/replayable where tied to record/seed).

4. **Constraints / guardrails to preserve (INFERRED, aligned with project rules)**
   - Engine remains the single source of truth; UI consumes VM/feed/engine outputs only. No ratings generation, no protected-constant changes, no scouting/full-GM feature creep.
   - Offline & self-contained: SVG/canvas/CSS, no CDN/remote assets, `file://`-friendly; accessible (text/aria fallbacks, focus, contrast, reduced-motion parity); responsive/390px-first.
   - Spatial/badge language should carry real meaning (role/outcome/value context) rather than decorative portraits.

5. **Possible staging (INFERRED)**
   - Nearer-long-term: badge legend + static formation/drive-situation component rendered from existing feed/roster data.
   - Later: play/assignment diagrams and stepwise drive playback tied to engine event stream; only when data/contracts exist to support it without invention.

## Notes
- Rival observations are REPORTED from public store pages (subject to change). Owner preference (badges over faces; no scouting/GM) is the governing direction for any future viz work inspired here.
