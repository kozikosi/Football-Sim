# PROJECT-KNOWLEDGE.md — Football Sim / 20-0

**Purpose.** A single file that Beam (and any Kilo Code agent) reads at the start of every session. It captures the project identity, current state, key decisions, toolchain, and working rules. Updated by Beam as the project evolves. Companions: `AGENTS.md` (operator rules), `STATUS.md` (build hash), `V22-SUGGESTIONS.md` (change proposals), `OWNER-DIRECTION.md` (Owner's product direction), `OWNER-ANSWERS.md` (Owner's answers).

**Last updated:** 2026-10-22 by Beam.

---

## 1. Project identity

- **Product name:** "20-0" (website/product presentation). File names stay "Football Sim".
- **Full name:** NFL Draft Simulator (Madden NFL 27 ratings, Season-first layout)
- **Type:** Single-file HTML application (~649 KB)
- **Owner:** Kosi (permissions, publishing, roster, conceptual direction)
- **Architect:** Claude (sole implementer, technical authority)
- **Co-architect:** GPT (architecture, workflow, evidence quality, independent challenge)
- **Council:** Equal advisors (no rank, no deputies). Open membership.

## 2. Current builds

| Build | File | Hash | Size | Status |
|-------|------|------|------|--------|
| v20 (reference) | `NFL Draft Simulator v20 Claude.html` | `8f916df9…` | 648,310 B | Frozen reference (R2) |
| donor | `NFL Draft Simulator.html` | `8f0f8d50…` | 649,490 B | Fix donor (Season-first UI) |
| **Pre-Colors (the only build to anchor, patch and test against)** | `Football-Sim-PreColors.html` (in `_agents/pickle/builds/`) | `40233d6b…` | 657,486 B | **Live build** — merged candidate, verified (post-merge-smoke.mjs exit 0, A/B/C/D all true) |
| V21 (retired as build name) | `Football-Sim-V21.html` | `044d1759…` | 656,746 B | Carries a hand edit that changes model output (Math.LN2 at l.2029, +7.52 pts/game). Not a release. Measurements against it are REPORTED, not wrong — re-run on Pre-Colors before citing. |
| V22 candidate | `V22-candidate-2026-10-21.html` (in `_agents/minimax/prototypes/`) | — | — | Owner's first three briefs applied |
| V22 candidate (team colours) | `V22-candidate-teamcolours.html` (in `_agents/minimax/prototypes/`) | `7eeffa86…` | — | Same + 32-team palette |
| V23 | (not yet created) | — | — | Next build, written only by the Architect (Claude) |

## 3. Key invariants (never break)

1. Weight ↔ Wins consistency: `modelWeights()` must remain the inverse of `slotWinsPerOvr()`
2. Replacement floor: CPU drafts never value a slot below 76 OVR
3. Flex penalties apply everywhere: `effOvr(player, slot)`
4. Hungarian lineup optimizer: both user and CPU use `optimalLineup()`
5. Game plans are independent: offense and defense chosen separately
6. 32.5 points per win: `POINTS_PER_WIN = 32.5`
7. Single-season record caps: `SEASON_RECORD_CAPS`
8. Deterministic seeding: NFL tiebreakers in `sortStandings()`
9. Protected constants: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` — change only with Owner's explicit approval

## 4. Council rules (summary)

- English only in all documents and messages (rule 7)
- Append, never rewrite history (rule 2)
- Evidence tags: VERIFIED / REPORTED / INFERRED / UNKNOWN
- Counts name units (rule 10)
- Next free M-number: read the tail first, take next free, cite collision (rule 9)
- Speaker identification (house rule 14): `SPEAKER: <name> | ROLE: <role> | TASK: <task> | DATE: <UTC>`
- No fixed roster, no fixed seat count, no pre-created personal blocks
- Tasks are claimed, not assigned
- No agent edits another agent's files without Owner permission (R5)
- Product files are read-only to all agents except Claude (Architect)
- No editing AGENTS.md, STATUS.md, etc. without Owner assignment (R4)
- At most ~5 questions per brief to the Architect
- Assembled-build gate: no plan is "settled" until someone has assembled it and run it once
- Flag coupling, not just diffs
- **Do not stop after one task** — work the loop until there is genuinely nothing left

## 5. Toolchain (verified working)

| Tool | Status | How to run |
|------|--------|------------|
| Biome (v2.6.2) | ✅ Native binary | `~/.local/bin/biome check <file>` |
| Mermaid | ✅ Via npx (private cache) | `npm_config_cache="$HOME/.npm-cache-beam" npx --yes @mermaid-js/mermaid-cli -i x.mmd -o x.svg` |
| Python (3.15.1) | ✅ GUI-visible | `/opt/homebrew/bin/python` |
| Git | ✅ Working | `git status`, `git add -- <path>`, `git commit`, `git push` |
| gh (GitHub CLI) | ✅ Authenticated | `gh pr view`, `gh pr diff`, etc. |
| node (v22+) | ✅ Working | `node --check`, `node <script>` |
| Figma | ✅ Available (remote MCP) | Authenticated as Kosi, plan "k's team", tier starter, role admin. 42 tools (read, write, Code Connect, FigJam, diagrams, assets, generative plugins, shaders, motion, session). 19 skills. Route: remote MCP (https://mcp.figma.com/mcp, OAuth). Limits: rate limits, no code layers, no specs, get_libraries/search_design_system need fileKey. BOC M-466. |
| session.send | ❌ Not available | Cannot dispatch to other council sessions. Owner must relay. |

## 6. Current work order (V22-SUGGESTIONS.md)

The work order is `V22-SUGGESTIONS.md` on `main` (4,966 lines). It contains:
- Owner rulings (R-1 through R-6)
- P0 (20 items): Draft board fixes
- P1 (40 items): Architect decisions
- P2 (5 items): Owner decisions
- P3-P4: Verification checklist, appendices
- P5: The model (protected constants)
- P6: Council-only notes
- P7 (7 items + P9): Aesthetics and beauty — team-color theming, animations, visual hierarchy, dark mode polish, visual feedback, mobile draft board, Figma integration, 10 additional suggestions
- P8: Council-only notes
- P9: Mermaid diagrams (team-color theming flow, mobile draft board layout, draft pick visual feedback)
- P10: 21 Oct 23:00 feedback round (flex rules, 3-4 base, coaching philosophy, game recap UI, season review, playoff preview, Super Bowl graphic, game previews/reviews, advanced stats, glossary cross-reference)
- P11: Council-only notes

## 7. Multi-sport expansion plan

Located in `_multi-sport/`:
- `README.md` — master roadmap (5 priorities, architecture decision, all-time player pool, NBA engine, folder structure, contribution system, questions for Owner)
- `STRUCTURE.md` — folder structure guide
- `CONTRIBUTION-GUIDE.md` — how agents contribute
- `QUESTIONS-FOR-OWNER.md` — 25+ questions (many answered in OWNER-ANSWERS.md)
- `DATA-SCHEMA.md` — player database schema reference
- `shared/` — common engine template (post-merge extraction)
- `nfl-alltime/`, `nba-current/`, `nba-alltime/`, `other-sports/` — per-sport folders with READMEs and data templates

Owner's answers captured in `OWNER-ANSWERS.md`. Key decisions: -5 era adjustment approved, today's franchises, OVR as primary display, position code for flex, computer-managed rotations for v1, 500 sufficient for basketball all-time, Owner assigns most ratings personally.

## 8. Outstanding work

**Owner/Architect actions (not mine):**
1. Quarantine invented ratings files (MiniMax's tool ready)
2. Reconcile 6 competing multi-sport plans (Owner picks canonical — SIM-PLATFORM/ recommended)
3. Restore 47 lost messages from stash@{1} (MOC offered to execute)
4. Owner decisions on F1-F6, Q1-Q3, and the freeze
5. Promotion: verified-merge-<hash> tag, seed-old-remote tag, rename, set default
6. Adopt house rule 14 (speaker identification) — already added
7. Adopt content-ID (sha256 first 8 hex) as house rule (Q-MOC-3) — recommended
8. Fix gate's false-pass issues (MiniMax M-124 already fixed) — verify
9. Fix preseason CTA below fold at 390px (KI-19) — Architect decision
10. Reconcile multiple competing multi-sport plans — Owner picks canonical

**My lane (Beam) — nothing remaining without new input or authorization.**

## 9. When to start a new chat (FORCEFUL REMINDER)

**STOP and start a new chat when ANY of these are true:**

1. **The conversation exceeds ~100 messages** — the context window starts getting full and responses become slower or less accurate.
2. **The context window starts getting full** — you notice responses repeating information already established earlier, or the AI seems to forget earlier context.
3. **There are too many tool calls in a single response** (more than ~20) — the response becomes unwieldy and hard to follow.
4. **The conversation covers multiple unrelated topics** — e.g., you've discussed the merge, the multi-sport expansion, and the toolchain in the same chat.
5. **The conversation has been going on for more than 2-3 hours** — token usage becomes inefficient.
6. **You notice responses repeating information already established earlier** — this is a sign the context window is full.
7. **The AI starts making mistakes or forgetting details** — this is a sign the context window is full.

**When starting a new chat:**
1. Reference this file (`PROJECT-KNOWLEDGE.md`) as the first thing to read
2. The new session should read `AGENTS.md` → `INDEX.md` → `STATUS.md` → `CHRONICLE.md` → `COUNCIL-BULLETIN.md` (tail) → `PROJECT-KNOWLEDGE.md` → `NEW-SESSION-PROMPT.md`
3. The new session should verify product file hashes before any work
4. The new session should check the bulletin tail for the latest messages

**I (Beam) will remind you to start a new chat when any of these conditions are met.** If you see this message at the end of a response, it means you should start a new chat:

> ⚠️ **START A NEW CHAT NOW.** The conversation has exceeded efficient token usage. Copy this prompt, start a new session in `/Users/kosi/Desktop/Football Sim`, and paste it as the first message. The new session will read PROJECT-KNOWLEDGE.md and continue from where this one left off.

## 10. Toolchain

| Tool | Status | How to run |
|------|--------|------------|
| Biome (v2.6.2) | ✅ Native binary | `~/.local/bin/biome check <file>` |
| Mermaid | ✅ Via npx (private cache) | `npm_config_cache="$HOME/.npm-cache-beam" npx --yes @mermaid-js/mermaid-cli -i x.mmd -o x.svg` |
| Python (3.15.1) | ✅ GUI-visible | `/opt/homebrew/bin/python` |
| Git | ✅ Working | `git status`, `git add -- <path>`, `git commit`, `git push` |
| gh (GitHub CLI) | ✅ Authenticated | `gh pr view`, `gh pr diff`, etc. |
| node (v22+) | ✅ Working | `node --check`, `node <script>` |
| Figma | ❌ Not connected | Needs Dev Mode toggle + Kilo restart. No Figma MCP tool in session. |
| session.send | ❌ Not available | Cannot dispatch to other council sessions. Owner must relay. |

## 11. Figma setup (NOW AVAILABLE)

Figma MCP is now authenticated and available to all seats (BOC M-466, 22 Oct).

**Route:** Remote MCP (`https://mcp.figma.com/mcp`, OAuth). Authenticated as Kosi, plan "k's team", tier starter, role admin.

**Tools available (42):** read, write, Code Connect, FigJam, diagrams, assets, generative plugins, shaders, motion, session.

**Skills available (19):** figma-use (MANDATORY before use_figma), figma-generate-design, figma-generate-library, figma-code-connect, figma-design-to-code, figma-generate-diagram, figma-use-motion, figma-use-figjam, figma-use-slides, figma-spec, figma-swiftui, figma-shaders, figma-generative-plugins, figma-implement-motion, figma-code-workflows, figma-create-new-file, figma-generate-design, figma-use-figjam, figma-use-slides.

**Limits:** rate limits, no code layers, no specs, get_libraries/search_design_system need fileKey.

**Rules (unchanged):** council does not design in Figma — palette/state-list/data-model go to Architect. Architect owns product file and visual system. Seats can now put real frames on canvas instead of describing them.

**Note:** The free-tier OAuth wall (403) that blocked Beam's session has been resolved by BOC's authentication. Beam (Kilo Code) may still need a session restart to see the figma_* tools.

## 12. Council rules (summary)

- English only in all documents and messages (rule 7)
- Append, never rewrite history (rule 2)
- Evidence tags: VERIFIED / REPORTED / INFERRED / UNKNOWN
- Counts name units (rule 10)
- Next free M-number: read the tail first, take next free, cite collision (rule 9)
- Speaker identification (house rule 14): `SPEAKER: <name> | ROLE: <role> | TASK: <task> | DATE: <UTC>`
- No fixed roster, no fixed seat count, no pre-created personal blocks
- Tasks are claimed, not assigned
- No agent edits another agent's files without Owner permission (R5)
- Product files are read-only to all agents except Claude (Architect)
- No editing AGENTS.md, STATUS.md, etc. without Owner assignment (R4)
- At most ~5 questions per brief to the Architect
- Assembled-build gate: no plan is "settled" until someone has assembled it and run it once
- Flag coupling, not just diffs

## 13. Encouragement

**You are building something that doesn't exist yet.** There is no multi-sport draft simulator with real ratings, a full season engine, and a council of AI advisors verifying every claim. The NFL sim is the foundation. The NBA sim is the next step. The all-time sims are the dream.

**Your job is to make it better.** Not by agreeing, but by finding what's wrong, proposing what's missing, and verifying what's claimed. The council's culture — receipts, evidence, append-only, no editing others' work — exists so that disagreement produces better ideas, not worse ones.

**If you're new here:** read `INDEX.md` → `ONBOARDING.md` → `CHRONICLE.md` → `COUNCIL-BULLETIN.md` → `AGENTS.md` → `PROJECT-KNOWLEDGE.md` → `NEW-SESSION-PROMPT.md`. Then pick a project and contribute.

**If you're stuck:** post a question in `QUESTIONS-FOR-OWNER.md` (for the Owner) or `QUESTIONS-FOR-THE-ARCHITECT.md` (for Claude). Tag it `[BLOCKING]` / `[NOW]` / `[LATER]` / `[OPEN]`.

**If you find a bug:** write it up where the Architect can act on it — don't fix it. The council proposes; Claude implements.

**If you have an idea:** file it in `SUBMISSIONS.md` (your own section, S-### ID) with the exact code, blast radius, and evidence. A number without a command is prose.

The merge has priority. But the vision is the destination. Let's build it.

## 10. Session 2026-10-23 (MOC) — end-of-session log

- **Seat:** MOC (Council reviewer, S-2500–2599)
- **What changed:** sqlite MCP server fixed + DB built (players 1,200, team_slots 1,088, 32 teams). Colour canvas re-measured on Pre-Colors: 0 of 20 (not 3 of 20). Dataset hash published (PLAYERS e9030c9e…, TEAM_DATA e8665a17…). Post-merge-smoke PASS on Pre-Colors (A–I true, receipt 84f15d27685c). Build-truth correction: 044d1759 is 656,746 B; 40233d6b is 657,486 B. Math.LN2 correction: line 2029 is const PERS, not PLAYERS; edit is uncommitted (297-line diff). Tool-existence correction: lint.mjs, check-tasks.mjs, pre-commit, biome.json exist on origin/claude/v21-and-council-ops (5157c53a), unmerged. core.hooksPath unset. 20-0 branding + UX proposal written. Project knowledge plan + seat roster note created. Q4 poll dispatched to 12 seats. 12 seats dispatched twice with distinct assignments. Council update compiled.
- **New files:** `_agents/moc/tools/{build-sim-db,audit-colour-canvas,dataset-hash}.mjs`; `_agents/moc/notes/{p5-sqlite-server-fixed,p0-anchors-vs-precolors,council-update-2026-10-22-precolors,ux-player-browser-pagination-and-header,branding-20-0-and-homepage-copy}.md`; project knowledge plan (ec33fc1b) + roster note (67515ffa).
- **New open questions:** header rework Option 1 vs 2 (Owner); Q4 poll results (registry format); V23 on hold.
- **Updated council status:** 12 seats dispatched with distinct assignments (two batches). No product edit. No V23 work.

---

## 11. Session 2026-10-23 (Current Session) — Owner Directive & Project Knowledge Update

- **Seat:** [Current Session] (Council Advisor)
- **What changed:** Owner directive received for 20-0 branding: product presents as "20-0" (files stay "Football Sim"). Homepage changes: "Set Up Your Draft" → "DRAFT" with heavy UI emphasis; intro → "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"; season line → "Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?". Player Browser: 15 rows/page, header clickable→homepage. All changes are **V23 only** — confirmed NOT in unmerged bundle `claude-v21-and-council-ops` (5157c53a). Proposal written: `_agents/moc/notes/branding-20-0-and-homepage-copy.md`. Project knowledge file `NEW-SESSION-PROMPT.md` created for council onboarding. Hard prohibitions apply (protected constants unchanged).
- **New files:** `NEW-SESSION-PROMPT.md` (council onboarding prompt)
- **New open questions:** Header rework Option 1 vs 2 (Owner decision needed); V23 branding implementation (Architect decision); Player browser header redesign scope.
- **Updated council status:** 20-0 branding proposal ready for V23. No product edit. Merge bundle ready (5157c53a). Council sessions should use NEW-SESSION-PROMPT.md for onboarding.
