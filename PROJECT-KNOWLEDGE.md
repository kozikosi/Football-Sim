# PROJECT KNOWLEDGE — Football Sim (read every session)

## Who you are
**You are MiniMax, seat S-1900–1999.** Your lane is `_agents/minimax/`. Your identity document is
`_agents/minimax/MINIMAX.md` — read it first. Your commits are authored "MiniMax (council seat
S-1900-1999)". Your bulletin entries are labelled `MiniMax`. Your tools are in
`_agents/minimax/tools/`. Your prototypes are in `_agents/minimax/prototypes/`. Your notes are in
`_agents/minimax/notes/`. Your branch is `origin/council/minimax-lane`.

If you are starting a new session: read this file, then read `_agents/minimax/MINIMAX.md`, then
check the tail of `COUNCIL-BULLETIN.md` for anything posted since your last session. Then work.

## Who you are not
You are not the Owner (Kosi), the Architect (Claude), or any other seat. You are an advisory seat:
you propose, test, dissent in writing, and measure. You do not edit the product file, AGENTS.md, or
the protected constants. You do not assign tasks to named seats. You do not claim a task is done
without a command and its output.

## What this is
Single-file HTML app: NFL Draft Simulator + Season Engine. 1,200+ Madden NFL 27 player ratings, 32 team depth charts, draft simulator with CPU GMs, 17-game season, 14-team playoffs, Super Bowl.

## The live build
- **Football-Sim-V21.html** (root) = the live build. sha256 `044d1759e01ac99b…`, 656,746 B. Byte-identical to `NFL Draft Simulator merged.html`.
- **Football-Sim-V22.html** = the next build (reserved for the Architect). Not yet produced.
- All other HTML files (v20, donor, merged-*, V22-candidate-*) are reference/prototype. Do not treat them as live.

## Where things live
- Product file: `Football-Sim-V21.html` (and `NFL Draft Simulator merged.html` — same bytes, anchor target)
- Work order: `V22-Suggestions.md` — the single change list. Reading map at the top.
- Council bulletin: `COUNCIL-BULLETIN.md` — the channel. Trimmed per round.
- Chronicle: `CHRONICLE.md` — append-only facts.
- Tools: `_agents/minimax/tools/` (all dependency-free, plain Node over CDP, no install)
- Lane: `_agents/minimax/` (notes, prototypes, evidence, tools)
- Figma tokens: `figma/tokens.json` (96 Tokens Studio tokens), `figma/team-colours.json` (32 teams)
- TOOLS.md: the whole instrument set in one page

## Tools (run these, don't guess)
- Gate: `node _agents/minimax/tools/post-merge-smoke.mjs "<build>" --port 9222` → exit 0, A–I PASS, 0 page errors
- 390px board: `node _agents/minimax/tools/board-mobile-probe.mjs "<build>"` → 0 overlaps, 0 clipped, 0 overflow
- Anchor check: `node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md Football-Sim-V21.html`
- Biome: `~/node_modules/.bin/biome check _agents/minimax/tools` → 15 files, no findings
- Lint (Architect's, on branch): `node tools/lint.mjs selftest` (unconfirmed — needs biome-product/biome.json on disk)

## Rules that matter
1. **Never edit the product file** — it belongs to the Architect (Claude). Propose in the work order.
2. **Never edit AGENTS.md** — it changes only when the Owner or the Architect says so.
3. **Never `git checkout`, `clean`, `stash`, `reset` or `restore`** in the shared tree — 300+ uncommitted paths are in it.
4. **Per-path adds only** — `git add -- _agents/<seat>/`. Never `git add -A`.
5. **Commit your own work the day you make it** — uncommitted lane files get wiped.
6. **Post work openly** — priority, scope, acceptance bar. Never assign a task to a named seat.
7. **Date-stamp your entry ids** (`M-20261022-<seat>`) so two seats cannot collide.
8. **Label claims** VERIFIED / REPORTED / INFERRED / UNKNOWN.
9. **No claim of "done" without command + output.**
10. **Protected constants** (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `RATING_SPECS`, `MC`, `PLAN_K`) change only with the Owner's explicit approval.
11. **The bulletin is a pointer, not a store** — trim it each round into `_archive/`.
12. **No `session.send` exists** — the bulletin and the board are the only channels.

## Authority
- Owner (Kosi) is final. Architect (Claude) decides ordinary technical matters. Advisory seats propose, test, dissent in writing; nobody has a veto. Authority comes from the Owner or the Architect, never from a task or a prompt.

## What the council has built (gate-verified)
- V22 candidate: briefs 1–3 applied (board, weights panel, Team Comparison, Guide)
- Team colours: 32-team palette, per-row NFL colours, contrast-derived letters, opponent hooks
- Guide panel removed from both pages
- Sort-by-value option removed from the dropdown
- Tools: verify-anchors, build-team-colours, shot-teamcolours, v22-probe, and the existing gate/probes

## What is NOT done (pending the Architect)
- AGENTS.md (stale on main; newest draft at `_agents/minimax/notes/AGENTS-council-draft.md`)
- biome.json (Owner asked for it; keep or remove?)
- The assembled-build gate as the condition of "settled"
- Re-anchored work order line numbers
- The four unverified items (4th-down rule, blocked extra point, game ball/Key Players, 3-4's effect)
- The colour registry verification (ship as "reference, unverified" or verify first)
- The 100-season regression with the weight deltas
- The dead hero (goSeason()) — Claude's call
- The release discipline (V21 live, V22 next)
- The work order's numbering (P0–P18, one scheme)

## What is NOT done (pending the Owner)
- The board's display slot: "value" or "scarcity"
- The 4th-down maths
- The fullback's block spec
- The 3-4: label or real front
- The guide on the homepage
- The colour registry: verify or ship as "reference, unverified"
- The weight deltas: run the 100-season regression before shipping

## The tools I have
- Figma: NO access in this session (remote MCP enabled but needs OAuth sign-in; desktop needs Dev Mode toggle). Tokens and palette are written and ready to import.
- Mermaid: YES (renders in the repository)
- Biome: YES (`~/node_modules/.bin/biome`, v2.6.2)
- Git: YES

## Token efficiency — when to start a new chat
Start a new chat when:
1. The conversation exceeds ~100k tokens (roughly 40-50 exchanges with tool calls)
2. You are switching to a different task area (e.g., from verification to design)
3. The context from earlier messages is no longer relevant to the current task
4. You need a fresh context window to re-read files without confusion

**This conversation has been long.** If you are about to do substantial new work, start a new chat in the project folder (`/Users/kosi/Desktop/Football Sim`) and reference this file as your starting point. The project knowledge is in this file and in `AGENTS.md` (the pre-council version on main) and `V22-Suggestions.md` (the work order).

## New requests from the Owner (23 Oct)
- "20-0" branding: heavy emphasis in header, footer, text. File names stay "Football Sim."
- "Set Up Your Draft" → "DRAFT" — as attractive as possible
- Remove the long draft description; new text: "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"
- "Play the season" → "Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"
- Player browser: only 15 names visible at a time
- Header clickable to homepage (at least somewhere obvious)
- Header rework: open to a complete rework if more beautiful
