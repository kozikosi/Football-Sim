# AGENTS.md — Instructions for AI Coding Agents

**Audience.** Owner (the user), Architect (Claude, sole implementer), and equal council advisors. Read before touching anything. Parse `V22-Suggestions.md` (the live work order) second.

## 1. Project purpose

This is the **NFL Draft Simulator** (Madden NFL 27 ratings, Season-first layout) — a single-file HTML application containing:
- 1,200+ real Madden NFL 27 player ratings (`PLAYERS` array)
- 32 team depth charts (`TEAM_DATA` object)
- Customizable position weights (`DEFAULT_WEIGHTS`) with synergy penalties
- Draft Simulator: 32-team snake draft with CPU GMs using the same valuation math as the season engine
- Season Engine: 17-game schedule, 14-team playoff bracket, game-by-game simulation with box scores, recaps, advanced stats, awards
- Matchup Model: Nine unit ratings (QB, RB, WR/TE, OL run/pass, pass rush, run defense, coverage, kicker) feed an exponential yardage/points model with game-plan adjustments

## 2. Build truth (read before citing any line number)

The project has **one** product file under active development. Every build-specific claim (line number, hash, behavior) names the file, the sha256, the byte count, and when it was measured.

| File | sha256 | Size | Role |
|------|--------|------|------|
| `NFL Draft Simulator merged.html` | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B | **The working file — V22 is built from this**, @ `merge/v20-donor` `ff8c05ae` — measured 2026-10-22 |
| `NFL Draft Simulator v20 Claude.html` | `8f916df9…` | 648,310 B | **Older reference build** — measured 2026-10-22 |
| `NFL Draft Simulator.html` | `8f0f8d50…` | 649,490 B | Donor of fixes (Season-first + DS patches), not the base |

Near-duplicate names exist on disk (`merged.html`, `merged_v22.html`) — they are scratch copies with different bytes. **Never** target them. The deliverable artifact is `Football-Sim-V22.html`, produced by the Architect from `NFL Draft Simulator merged.html`.

A hash pin is a claim, not a fact: re-measure with `shasum -a 256 "<file>"` and `wc -c "<file>"` before acting on it.

## 3. Architecture overview

### Data layer (embedded in HTML)

| Variable | Purpose |
|----------|---------|
| `PLAYERS` | Array of `[name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf?]` — 1,200+ entries |
| `TEAM_DATA` | Object: `teamName -> {slot: {ovr, name}}` for 36 roster slots per team |
| `DEFAULT_WEIGHTS` | Position-weight map (QB=320, OT=295, DE=350, CB=350, etc.) |
| `ROSTER_SLOTS` | 26 starter slots drafted (excludes DL5, LB4, CB4, SS2, FS2, WR4, P, FB) |
| `FLEX` / `NATURAL_SLOT_MAP` | Flex rules: which positions can play which slots, with rating penalties |

### Core math functions (do not modify without approval)

| Function | Purpose |
|----------|---------|
| `slotWins(slot, ovr)` | Wins/season added by a player at `slot` with given OVR vs. 70 baseline |
| `slotWinsPerOvr()` | Marginal wins per +1 OVR at each slot (cached) |
| `modelWeights()` | Converts `slotWinsPerOvr` to 0–700 scale (QB=700) |
| `replacementLevels(pool, rosters)` | Replacement OVR by position group based on remaining starters league-wide |
| `cpuPick(teamIndex, state)` | CPU GM logic: value over replacement × bias × noise, with miss rate |
| `matchupModel(O, D, lg, plan)` | Expected points from offensive/defensive unit ratings + game plan |
| `teamRatings(slotmap)` | Nine unit ratings from lineup (flex penalties applied) |
| `simulateGame()` | Realizes yards/TOs/sacks from model, adds noise, late-game script, OT |
| `optimalLineup(slotmap)` | Hungarian algorithm for max-wins slot assignment (flex-aware) |

### UI tabs (in DOM order)

1. **Season** (default active) — the whole site lives here: onboarding, draft handoff, preseason editor, weekly sim, playoffs, Super Bowl
2. **Draft** — setup, live draft board, priority chart, roster depth chart, results with "Play a Season" CTA
   Supplementary bottom links (below the views): Team Rankings, Player Browser, Position Rankings, Team Comparison, Guide.

### Season phases (state machine in `seasonState.phase`)

`preseason` → `regular` (weeks 1–17) → `regularReview` → `playoffs` (wildcard→divisional→champ→superbowl) → `complete`

---

## 3. Critical invariants (never break these)

1. **Weight ↔ Wins Consistency**: `modelWeights()` must remain the inverse of `slotWinsPerOvr()`. The 700-scale is derived, not arbitrary.
2. **Replacement Floor**: CPU drafts never value a slot below 76 OVR replacement (see `rlow` in `cpuPick`).
3. **Flex Penalties Apply Everywhere**: `effOvr(player, slot)` used in draft board, lineup editor, season ratings, game simulation.
4. **Hungarian Lineup Optimizer**: Both user (advisory) and CPU (binding) use `optimalLineup()` — same math.
5. **Game Plans Are Independent**: Offense and defense chosen separately; coaches scored vs. *expected* opponent plan, not actual.
6. **32.5 Points Per Win**: `POINTS_PER_WIN = 32.5` converts point differentials to wins (Pythagenpat-based).
7. **Single-Season Record Caps**: `SEASON_RECORD_CAPS` truncates stats at real NFL records (5400 pass yds, 2060 rush, etc.).
8. **Deterministic Seeding**: NFL tiebreakers (H2H → division → conference → point diff) in `sortStandings()`.
9. **Protected Constants**: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` change only with the user's explicit approval.

---

## 4. Council operating principles

**Goal: minimum coordination for maximum collective intelligence.** Agents spend their time reasoning, researching, implementing, challenging and improving — not navigating procedures. Optimize for the quality and velocity of finished work, not the appearance of rigor.

| Principle | What it means |
|-----------|---------------|
| **Parallel by default** | Independent tasks run concurrently. No central dispatch needed. |
| **Propose, don't ask** | Agents write proposals directly. No permission slips. |
| **Read freely, write responsibly** | Any agent reads any file. Write only to your lane or shared docs with clear ownership. |
| **Disagree in public** | Conflicting proposals go to `COUNCIL-BULLETIN.md` with reasoning. No private resolution. |
| **Simple tasks skip ceremony** | One-file fixes, typo corrections, obvious improvements: just do them and note it in `CHRONICLE.md`. |
| **Complex tasks use rounds** | Multi-file, cross-system, or protected-constant changes: round-based with explicit acceptance. |
| **Claude is Architect, not gatekeeper** | Decides technical approach on accepted work. Does not approve every proposal. |
| **Owner decides product direction** | Protected constants, new features, scope changes = Owner decision. Document it. |
| **No shared sequential names** | The bulletin has had duplicated M-numbers because "read the tail, take the next free number" is a race, not a lock — two seats posting in the same window both claim it. Label messages and proposals with a date-stamped id (`M-20261022-a`) or a round id; if you must reuse a number, cite it with its date. Never edit another seat's label to fix a clash — post the correction as a new entry. |

## 5. Coordination: how the council actually works

**One work order, one numbering, one form.** `V22-Suggestions.md` is the single work order. It uses **P0** = do this first, **P1** = a decision the Architect makes, **P2** = a decision the Owner makes, **R1/R2/R3** = the round the work came from, **C** = council-only (for the record, not to implement). **Do not introduce a new label scheme.** Refer to entries by their title, not their number — "P0-17" was ambiguous four different ways before the scheme was fixed.

The work order is a work order, not a diary. One entry per change, in the form:

> **WHERE** file + line · **WHAT** old → new, exactly · **WHY** one line · **SAFE ALONE?** yes|depends · **HOW TO CHECK** command + output

A change that cannot fill the last two fields is not ready. If your item is already there, add one line — your agreement, your measurement, or your dissent — instead of restating it. Findings that are not changes belong in your lane (`_agents/<seat>/`), not in the work order.

**The built-work table is the source of truth for "what exists."** The work order opens with it: what is implemented, where the artifact is, its sha256, and the receipt. Never rebuild a change that is already built — take the artifact and diff it. If it is not in the table, it is not built.

**The queue is suggestions, not assignments.** Seats are not always free. Post work as a suggestion with its scope and its value; whoever is free takes it. Never assign a task to a named seat.

**Lane discipline, and the shared tree.** Each seat works in `_agents/<seat>/`. The shared root and shared documents are write-once per round: before editing a shared document, check the tree (`git rev-parse --abbrev-ref HEAD`, `git status`) — if the branch changed under you or the index has an unmerged path, stop and re-read. **Never `git checkout`, `git clean`, `git stash` or `git reset` in the shared tree**: the Owner or the coordinator does that, because a seat doing it silently deletes other seats' uncommitted work. This is not hypothetical: two lanes' files were wiped and the branch was switched twice in a single evening.

**Everything that matters is committed.** Proposals, receipts, artifacts and corrections go into git the day they are made. A lane file that is not committed is a lane file that will be wiped. The bulletin is a **pointer, not a store** — it tells the council where the work is; it does not hold it.

**The bulletin is a log for the current round, not an archive.** It has passed 5,000 lines; nobody can read it, so reading it is a cost every seat pays every round. Post one entry per contribution, dated and labelled, and trim the archive at the end of each round into `_archive/` (or fold it into `CHRONICLE.md`, which is the durable, append-only record). Read the tail, not the file.

**Disagreements are data.** When two seats write the same change, do not average them: say which one is right and why, in the work order. A council that converges early loses more than it saves.

**Verification is part of the work, not a report on it.** A change ships with its receipt: the command that was run and its result. "I believe it works" is not a receipt.

**The tools.** The council's JavaScript is checked with **biome** (the repo's `biome.json` — house rules, adopted; it deliberately excludes the product HTML). The work order's diagrams are drawn in **mermaid**, which renders in the repository and costs nothing. Claude has **Figma**; the council's job is to hand it a palette, a state list and a data model, and to say plainly what the screen must communicate.

**Two modes, one line.** A one-file, no-protected-constant change is just done and noted (`CHRONICLE.md`). Anything that touches the protected constants, the maths, or more than one system is a round: proposal in the work order, verification, receipt.

## 6. Roles

| Role | Who | Authority |
|------|-----|-----------|
| Owner (the user) | User | Permissions, publishing, the roster, per-edit assignments for shared documents. Final decisions land in `GOVERNANCE-ROUNDTABLE.md` §7. |
| Architect | Claude | Technical authority on design, implementation, what enters the build, and how a submission is resolved (R3). Advisors advise with evidence; no outvoting; nobody edits the Architect's documents (R5). The Architect does not verify his own build — a verifier reports facts; he decides what to do with them. |
| Verifier | Any session that authored nothing in the round being verified | Read-only: `node --check`, E2E, 390px, manifest checks; five-line report (hash · E2E driven · numbers re-measured with command + sample size · console/390px result · what was deliberately not checked) plus the function-diff where two builds exist (`tests/funcdiff.js`). |
| Equal members (advisors) | Open membership — any agent the Owner admits joins the same way: read `ONBOARDING.md` v2 → availability line in `COUNCIL-BULLETIN.md` → claim the next free S-range (**S-1500s**) → log arrival in `CHRONICLE.md` with one command as evidence | Proposals → own `SUBMISSIONS.md` section; governance verdicts → roundtable §8; conversation → `COUNCIL-BULLETIN.md`; facts → `CHRONICLE.md`; questions for the Architect → `QUESTIONS-FOR-THE-ARCHITECT.md`. No editing another session's files without the Owner's permission (R5); historical roles ("queue-keeper", "promoter") are by Owner assignment, not rank. |

**Maintenance rule (interim, pending D9):** no one owns `STATUS.md` / `AGENTS.md` / `COLLECTIVE-PROMPT.md` by rank. The Owner assigns who folds an approved change into a shared doc; the change is logged in `CHRONICLE.md`.

**Implementer succession (user decision 19 Oct):** Claude → GPT → Gemini (fallback implementer only, S-700–799 reserved). Handover between rounds; the stand-in follows the identical delivery contract; a stand-in's own pending entries defer to the next round.

**Note on GPT:** GPT participates chat-only (no file access, cannot run commands). Its contributions are treated as design input labelled `REPORTED`, not verified findings. It is not a verifiable seat.

## 7. Ownership & write access

| Path | Who writes | Others |
|------|------------|-----------|
| `NFL Draft Simulator*.html` | **Claude only** (build arrives via the user) | read-only for every agent |
| `SUBMISSIONS.md` | Each session: its own section only, inserting new entries above its section's end-anchor | read-only |
| `COUNCIL-BULLETIN.md` | Any session | read + comments |
| `CHRONICLE.md` | Any session (append only) | read |
| `STATUS.md` | Owner-assigned session (build-hash line by Verifier) | read |
| `V22-Suggestions.md` | Council (BOC compiles; entries per-seat) | read + one line per contribution |
| `master_task_list.md` | Owner-assigned | read |
| `_agents/<name>/` | That session only | never edit or rename another session's files |
| `_reference/`, `_archive/` | Nobody — frozen | read-only |
| `AGENTS.md`, `COLLECTIVE-PROMPT.md`, `ONBOARDING.md`, `MASTER_GUIDE.md`, `master_task_list.md`, `tasks/` | Maintained at the Owner's request, by Owner assignment per edit | propose via `SUBMISSIONS.md` or `COUNCIL-BULLETIN.md` |

**Key rule:** if you didn't author it and don't own it per the table above, it is read-only.

**One exception, by design:** `V22-Suggestions.md` and `COUNCIL-BULLETIN.md` are shared by construction. That is why the coordination rules above exist — they are the only two files where several seats write, and they need the single-writer discipline, the one numbering scheme and the one-form entries. Everything else stays in a lane until the Architect takes it.

## 8. Shared documents (source of truth)

| File | Purpose | Updated by |
|------|---------|------------|
| `V22-Suggestions.md` | The single work order: P0/P1/P2 entries, one per change, `WHERE·WHAT·WHY·SAFE ALONE?·HOW TO CHECK` | Council (BOC compiles; entries per-seat) |
| `SUBMISSIONS.md` | Formal proposals (Mode B / round-based work) | Each agent (own section) |
| `COUNCIL-BULLETIN.md` | Disagreements, counter-proposals, technical debates, availability strip | Any session |
| `CHRONICLE.md` | Immutable log of all changes + verifications | Any session (append) |
| `STATUS.md` | Build hash + roles + parked decisions | Verifier (hash line only) |
| `GOVERNANCE-ROUNDTABLE.md` | Governance draft + session verdicts; §7 = Owner decisions | Formal governance rounds |
| `QUESTIONS-FOR-THE-ARCHITECT.md` | The council's question pack for Claude | When contributing or answering |
| `ONBOARDING.md` v2.1 | Joiner prompt for any new agent | New agents: read first |
| `_agents/ds/notes/Owner-Rulings-19-Oct.md` | R1–R5 verbatim — the root of all authority | Whenever a ruling question comes up |

**Read order for a new member:** `ONBOARDING.md` v2.1 → the table above in order → contributions.

## 9. Agent autonomy guidelines

1. **Pick up work, don't wait for assignment** — Check `V22-Suggestions.md` and `COUNCIL-BULLETIN.md`. If a task is unclaimed and you can do it, claim it by adding your name.
2. **Challenge assumptions** — If a proposal seems wrong, write a counter-proposal in `COUNCIL-BULLETIN.md`. Don't silently comply.
3. **Escalate only when stuck** — Technical disagreements → `COUNCIL-BULLETIN.md`. Process disagreements → Owner. Product disagreements → Owner.
4. **Document decisions** — Every Owner decision gets a line in `STATUS.md` with date and reference.
5. **No orphan work** — If you start something, finish it or hand off explicitly in `CHRONICLE.md`.

## 10. Verification requirements

### Every change

- `node --check` on the extracted `<script>` block → exit 0
- A **receipt**: the command that was run and its output. "I believe it works" is not a receipt. A number without a command is prose.

### Tooling

- Council JavaScript: `npx biome check` (repo's `biome.json` — house rules). Diagrams: **mermaid** (renders in the repository). Claude has Figma; the council hands it a palette, a state list and a data model, and says plainly what the screen must communicate.

### Never claim

- Running `pw4.js`, `validate.js`, `phone.js`, `tests/run_all.sh` — these are targets, not existing files. Never claim to have run them.
- That a change was verified because a document says so — the receipt is the command and its output.

## 11. Prohibited actions (hard rules)

- ❌ Change `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` without explicit Owner approval
- ❌ Invent player ratings, team assignments, or statistical outputs
- ❌ Add paid APIs, CDN dependencies, or build steps
- ❌ Split the single HTML file without explicit Owner request
- ❌ Create git commits/branches/PRs unless asked
- ❌ Hand-edit evidence files (`result.json`, etc.)
- ❌ Break `modelWeights() = f(slotWinsPerOvr())` (weight ↔ wins consistency)
- ❌ Write to another agent's `_agents/<name>/` directory
- ❌ Modify `_reference/` or `_archive/`

## 12. Style rules

- Plain informative language; no "expected scoring"/"before kickoff" in post-game text
- Critique only 85+ OVR players in recaps; every turnover named
- Overtime events only in the overtime block; never "sudden death"
- Stats near real NFL records (enforced by `SEASON_RECORD_CAPS`)
- User's team shown in blue (`.ub` class, MutationObserver on `.ub`)
- "2-Pt Conv" not "two-point conversion" (except Guide)
- No "with no strong lean either way" anywhere
- Flex is realistic (not an exploit); QB **cannot** flex
- **English only** in all shared documents, logs, messages — Owner reads EN/FR/ES/PT/Latin; council chat defaults to English for auditability

## 13. Key files & entry points

| Task | Search for |
|------|------------|
| Draft board columns | `boardEntries()`, `renderDraftBoard2()` |
| CPU draft logic | `cpuPick()`, `cpuBias()`, `cpuNoise()`, `cpuMiss()` |
| Season simulation | `simulateGame()`, `playGame()`, `simulateCurrentWeek()` |
| Matchup math | `matchupModel()`, `applyOffPlan()`, `applyDefPlan()` |
| Lineup/flex | `optimalLineup()`, `effOvr()`, `flexPenaltyFor()`, `lineupEditorHTML()` |
| Game plans | `ensureGamePlans()`, `teamIdentity()`, `planWhy()` |
| Recaps/narrative | `generateGameSummary()`, `playByPlay()`, `factorParagraph()` |
| Awards | `computeRegularSeasonAwards()`, `computePlayoffAwards()` |
| Mobile CSS | `@media (max-width:760px)` block |
| Weight controls | `buildControls()`, `modelWeights()`, `personalWeights` |

## 14. Product files

- **Older reference build (not the current one)**: `NFL Draft Simulator v20 Claude.html` — 648,310 bytes, `8f916df9…` (re-measured 2026-10-22)
- **The working file — V22 is built from this**: `NFL Draft Simulator merged.html` — 656,746 bytes, `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` @ `merge/v20-donor` `ff8c05ae` (re-measured 2026-10-22). **This is a working-tree file: its hash changes when anyone applies a patch. Any note quoting its hash must say when it measured it.**
- **Do not name the current build V20 or V21.** It is **V22** (Owner ruling, 22 Oct). The older build names are historical only.
- **Donor of fixes**: `NFL Draft Simulator.html` — 649,490 bytes, `8f0f8d50…` (Season-first base + DS patch, incl. the division-tag look-ahead repair)
- **Rollback**: `backup-before-reorg/NFL Draft Simulator (GLM verified build).html`

Near-duplicate names exist on disk (`merged.html`, `merged_v22.html`) — they are scratch copies with different bytes. Never target them. The deliverable artifact is `Football-Sim-V22.html`, produced by the Architect from `NFL Draft Simulator merged.html`.

## 15. Testing checklist before delivery

- [ ] Draft completes without errors (all 32 teams, 26 rounds)
- [ ] Season sims to completion (regular + playoffs + Super Bowl)
- [ ] 100-season validation (`pw4.js`) produces r > 0.6 — *script does not exist yet; treat as target, not run result*
- [ ] Phone layout: no horizontal scroll at 390px (`tests/e2e-smoke.mjs`)
- [ ] Weight changes recalc instantly in Team Rankings
- [ ] Flex penalties visible in draft board "Value here" column
- [ ] Game recaps show chronological scoring + turnovers + game ball
- [ ] No console errors in browser devtools

## 16. Appendix: quick reference for new agents

**Start here:** Read `ONBOARDING.md` → `AGENTS.md` → `V22-Suggestions.md` (five-minute header + priority labels)

**Your lane:** `_agents/<your-name>/` — write freely here.

**To propose:** Add to `V22-Suggestions.md` (your section, one entry per change) or `COUNCIL-BULLETIN.md` (disagreement).

**To log work:** Append to `CHRONICLE.md` with `YYYY-MM-DD | <session> · <what happened> · <evidence>`.

**To check status:** Read `STATUS.md` (hash, roles, decisions).

**When in doubt:** Ask in `COUNCIL-BULLETIN.md`. The council is here to help.
