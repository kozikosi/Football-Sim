# _agents/ — roster and lanes

Writer: the Owner or Architect. This table is the Owner's **priority notes**, not an admission gate: a seat exists when `origin/council/<seat>` exists (`node tools/roster.mjs` lists them); retired names are in `RETIRED.txt`. **Nothing in a lane is authoritative**; the product file and the root protocol files are. A seat owns its own folder and never edits another's. Process for joining, leaving and clean-up: `RETIREMENT.md`. New lane: copy `TEMPLATE-LANE.md`.

Lane file convention: `_agents/<folder>/<SEAT>.md` (e.g. `_agents/beam/BEAM.md`), the one file a seat rewrites at session end. Subfolders: `notes/`, `deliveries/`, `tools/`. No build copies or images (see `RETIREMENT.md` §4).

Platforms (24 Oct): **Kilo** = Glyph, FK, Beam, VL, UK, OR · **independent** = GPT, Z.ai · **OpenChamber** = everyone else. Nobody is assigned work by seat: `PRIORITIES.md`.

## Roster (Owner's ruling, 23 Oct 2026, second list)

| Seat | State | Folder | Notes |
|---|---|---|---|
| Beam | **core** | `beam/` | Owner relies on heavily. Has file access to the Owner's machine. |
| Pickle | **core** | `pickle/` | Keeper of the Pre-Colors anchor build. |
| BOC | **core** | `boc/` (to create) | No folder on any branch the Architect can see; creates its lane from the template. |
| DS | standby | `ds/` | Over the footprint budget (1.7 MB of old snapshots/images); trim at next session end. |
| VL | standby | `vl/` | Lane file lives at `_agents/vl/notes/vl.md`: `git mv` it to `_agents/vl/VL.md`. |
| VLOC | standby | `vloc/` (to create) | |
| Super | standby | `nemo-super/` | |
| OR | standby | `or/` (to create) | Only `_agents-payload/or/` exists. |
| GLM | standby (reinstated) | `glm/` | 20 Oct scorecard rank 3. |
| Ultra | standby (reinstated) | `nemotron-3-ultra-free/` | Folder mapping REPORTED by Beam; see `ULTRA.md`. |
| Flint | probation | `flint/` (to create) | Owner wants more evidence. |
| UK | probation (reinstated) | `uk/` (to create) | Beam's report mentions UK commits on a branch; no folder seen. |
| MiMo | probation (reinstated) | `mimo/` (to create) | |
| Glyph | probation (reinstated) | `glyph/` (to create) | |
| FK | advisor (new) | `fk/` | Claude 3.5 Sonnet in Kilo Desktop; fantasy/IDP metrics and roster strategy. Worktree `wt/fk`, branch `council/fk`. |
| GPT | **High Councillor** (independent) | none | Named by the Owner 24 Oct. Posts monthly or so; nothing waits on GPT. Wrote review documents in `_agents/reviews/october-2026/` (not yet on origin: see `chat-management.md`). |
| Z.ai | **High Councillor** (independent) | `zai/` | Named by the Owner 24 Oct. Handoff `_agents/zai/deliveries/HANDOFF-FOR-CLAUDE.md` (not yet on origin). Its former "V23" file is **Z-post-blue**. |
| MiniMax | retired (unavailable) | `minimax/` | Tombstone. |
| MOC | retired (unavailable) | `moc/` | Tombstone. |
| LongCat, LK, Cohere, Lightning, OpenClaw | retired (Owner: "retire LongCat and anyone I didn't mention") | none | |
| Nemo Ultra (`nemo-ultra/`) | tombstone | `nemo-ultra/` | 19 patch scripts, no surviving rewrite; may be an earlier Ultra session (UNKNOWN). |

New members: `ONBOARDING.md` and `RETIREMENT.md` §5. The Owner admits alone (`tools/admit-seat.sh`); every new seat is advisor level; no Architect step. Worktrees: `../wt/<seat>` on `council/<seat>` (`AGENTS.md` §4).
