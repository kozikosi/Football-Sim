# PROJECT KNOWLEDGE — Football Sim / 20-0 (read every session)

## Who you are
**You are MiniMax, seat S-1900–1999.** Your lane is `_agents/minimax/`. Your identity document is
`_agents/minimax/MINIMAX.md` — read it first. Your commits are authored "MiniMax (council seat
S-1900-1999)". Your bulletin entries are labelled "MiniMax". Your tools are in
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

## Build truth
- **Pre-Colors** (`_agents/pickle/builds/Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`, 657,486 B) is the ONLY build to anchor, patch and test against. It is byte-identical to `git show HEAD:"NFL Draft Simulator merged.html"`.
- **`Football-Sim-V21.html` (`044d1759…`, 656,746 B) is NOT a build** — it carries a hand edit that changes model output (Math.LN2 in PERS['11']). Every measurement against it is REPORTED, not VERIFIED.
- **V21 and V22 are retired as build names.** The next release is **V23**, written only by the Architect.
- `Football-Sim-V20 Claude.html` (`8f916df9…`, 648,310 B) and `NFL Draft Simulator.html` (`8f0f8d50…`, 649,490 B) are frozen reference builds.

## Where things live
- Product file: `Football-Sim-PreColors.html` (the only valid build)
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
- Anchor check: `node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md Football-Sim-PreColors.html`
- Biome: `~/node_modules/.bin/biome check _agents/minimax/tools` → 15 files, no findings
- Lint (Architect's, on branch): `node tools/lint.mjs selftest` (unconfirmed — needs biome-product/biome.json on disk)

## Rules that matter
1. **Never edit the product file** — it belongs to the Architect (Claude). Propose in the work order.
2. **Never edit AGENTS.md** — it changes only when the Owner or the Architect says so.
3. **Never `git checkout`, `clean`, `stash`, `reset` or `restore`** in the shared tree — 300+ uncommitted paths are in it.
4. **Per-path adds only** — `git add -- _agents/<seat>/`. Never `git add -A`.
5. **Commit your own work the day you make it** — uncommitted lane files get wiped.
6. **Post work openly** — priority, scope, acceptance bar. Never assign a task to a named seat.
7. **Date-stamp your entry ids** (`M-20261022-<seat>`) so two seats cannot claim the same number.
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
- The work order's numbering (P0–P19, one scheme)

## What is NOT done (pending the Owner)
- The board's display slot: "value" or "scarcity" — **answered: value**
- The 4th-down maths — **for Claude to verify**
- The fullback's block spec — **scale with OVR**
- The 3-4: label or real front — **answered: the games should track the difference; Claude decides**
- The guide on the homepage — **remove panel and text completely**
- The colour registry: verify or ship as "reference, unverified" — **use GPT's table**
- The weight deltas: run the 100-season regression before shipping — **simulate before shipping; Claude decides**
- The defender star threshold — **2 or more takeaways**
- The game ball in a tie — **least highly rated player by static wins**
- The "Glossary" rename — **yes**
- "Value here" remove completely — **done in the build; sort dropdown option being removed**
- "Value here" visible anywhere — **already removed; sort dropdown option being removed**

## The tools I have
- Figma: NO access in this session (remote MCP enabled but needs OAuth sign-in; desktop needs Dev Mode toggle). Tokens and palette are written and ready to import.
- Mermaid: YES (renders in the repository)
- Biome: YES (`~/node_modules/.bin/biome`, v2.6.2)
- Git: YES

## Token efficiency — when to start a new chat
Start a new chat when:
1. The conversation exceeds ~100k tokens (roughly 30–40 exchanges with tool calls)
2. You are switching to a different task area (e.g., from verification to design)
3. The context from earlier messages is no longer relevant to the current task
4. You need a fresh context window to re-read files without confusion

**This conversation has been extremely long.** If you are about to do substantial new work, start a new chat in the project folder (`/Users/kosi/Desktop/Football Sim`) and reference this file as your starting point. The project knowledge is in this file and in `AGENTS.md` (the pre-council version on main) and `V22-Suggestions.md` (the work order).

## New requests from the Owner (23 Oct)
- "20-0" branding: heavy emphasis in header, footer, text. File names stay "Football Sim."
- "Set Up Your Draft" → "DRAFT" — as attractive as possible
- Remove the long draft description; new text: "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"
- "Play the season" → "Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"
- Player browser: only 15 names visible at a time
- Header clickable to homepage (at least somewhere obvious)
- Header rework: open to a complete rework if more beautiful

## Owner's answers (23 Oct 10:00)
- "Football and site terms" → "Glossary": Yes
- The weights tables: order-dependent circular dependency in the model; needs fixing before V22
- "Save My Weights" button: keep as a signal that stores locally (localStorage); "Default" restores model's
- Board display slot: "value" (show each player where he is worth the most)
- Guide on homepage: remove the panel and text completely
- Colour registry: use GPT's table as supplied
- Weight deltas: simulate before shipping; Claude decides whether the values are final
- Defender star: "2 or more takeaways"
- Game ball in a tie: "least highly rated player by static wins" (rewards beating expectation)
- Dead hero (goSeason): "Claude decides"
- 4th-down maths: "Claude needs to answer this"
- Fullback block spec: "Scale with his OVR rating"
- 3-4 base: "The games should track the difference of having the extra LB vs the extra DT. Claude should decide if more detailed maths is needed"
- Four unverified items: explained in detail to the Owner
- "Value here" remove completely: done in the build; sort dropdown option being removed
- "Glossary" rename: Yes — one line
- Guide panel on homepage: remove panel and text — both pages
- "Value here" visible anywhere: already removed; sort dropdown option being removed

## 11. Session 2026-10-23 (MOC) — second end-of-session log

- **Seat:** MOC (Council reviewer, S-2500–2599)
- **What changed (additional):** project knowledge plan created (ec33fc1b) + seat roster note (67515ffa) in OpenChamber. Token-efficiency rule appended to PROJECT-KNOWLEDGE.md (§10, commit 437fa650). Best session-start prompt produced (hybrid of 4 templates, ~350 words). DS commit analysis delivered (discipline gap, not quality gap; verify-build-pins.mjs + ln2-probe.mjs verified working). 12 seats dispatched with branding-verification assignments. Roster note maps all 12 seats to lanes/tools (fixes the "no lane file" gap for 16 seats).
- **New open questions:** header rework Option 1 vs 2; Q4 poll results; V23 on hold.
- **Updated council status:** project knowledge panel now has identity note + guide plan. Token-efficiency rule is in PROJECT-KNOWLEDGE.md. No product edit. No V23 work.
