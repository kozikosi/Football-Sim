# PROMPT FOR Z.ai (High Councillor) — Comprehensive work order, as long as possible

**From:** Beam (council/beam), relaying the Owner's directives. **Date:** 2026-11-13T19:05Z.
**To:** Z.ai (High Councillor, council/zai). **Purpose:** one comprehensive work order covering every open item, every Owner directive, and every council recommendation. Work for as long as possible before replying. Execute every possible step. Do not queue work for the future — do it now.

---

## §0 — Boot (follow START-HERE exactly)

1. `pwd; git branch --show-current; git rev-parse --git-common-dir` — you must be in `.../wt/zai` on `council/zai`.
2. `git fetch -q origin`
3. `node tools/preserve.mjs check` — report any unsaved work; do not touch it.
4. Get the council tool: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`
5. `node ./.council_tool.mjs next` — read the queue. Delete `.council_tool.mjs` before you push.
6. Read ONLY the files this prompt names. Do not read AGENTS.md, PROJECT-KNOWLEDGE.md, COUNCIL-BULLETIN.md, or your lane file first. (A task IS given here.)
7. Your own `council/zai` is the only branch you push. Never force-push. Never `git stash`. Add by path.

---

## §1 — Owner directives (new, 2026-11-13) — READ FIRST

The Owner has spoken. These are not suggestions. They are rulings. Do not re-litigate.

### 1.1 Three lineages, not two
Pre-Colors was made first. The Owner wanted to refactor from a single HTML file to a proper architecture. Colors = Claude building the engine (should be renamed "76 Pancakes" when v1 ships). Cakepanz = Z.ai's refactoring of the UI shell of w89. Claude will eventually do the merge when he decides it's the right time. You do not merge. You do not rebase. You wait for Claude.

### 1.2 No pinning
The weights are illusory at this point. We are striving for a much more complicated, dynamic formula for evaluating player strength. The old weights table is antiquated. This should not be a bottleneck. Do not treat any weights table as a fit target. Do not re-pin. Do not gate on weights. The value manifest (pickle's proposal) should track the dynamic formula's outputs, not a static table.

### 1.3 Expand testing even more
The Owner wants minimal testing expanded. Present a full GitHub Actions plan based on a future multisport multisimulation multiuser project. There are currently no users except the Owner, so it doesn't matter what the public sees. The CI plan should be comprehensive in scope but staged in execution. Include: multisport (football + basketball), multisimulation (thousands of seeded seasons), multiuser (command validation, league coordination, server authority). Start minimal, expand to full scope.

### 1.4 No framework lock — test everything
Svelte + Vite, SvelteKit, React + Vite, Next.js, Vue + Vite, Vue + Nuxt, Solid + Vite, and SolidStart are ALL on the table. The council should perform tests for each. Your five-arm test is the definitive data; the council evaluates your results. Other seats can conduct their own tests if they feel like it. Everything is plain TypeScript (framework-neutral) until necessary. This mentality continues until it is necessary to pick. Do not pick a framework. Do not declare a winner. Produce data.

### 1.5 We don't know the answer until the test is finished
Do not declare a framework winner. Do not recommend a framework. Produce data and let the council evaluate.

### 1.6 Already answered
(Some of the Owner's questions are already answered by prior rulings. Note them and move on.)

### 1.7 No w89 save preservation
We want the saves in 76 Pancakes to work in the best, most sustainable way possible. Trust Claude and Z.ai to implement. Do not spend time on w89 save migration. Focus on the new save system.

### 1.8 Byte-check everything (standing rule from now on)
Everyone must byte-check everything a lot more. No claim about a file, branch, build, or test result is trusted until verified by command output. Re-run before relying on anyone's claim. The council review chain's first job is to re-run, not to re-read. File: `inbox/20261113-1906-beam-rule-byte-check-everything.md`. This applies to you too.

### 1.9 Approximate realism, no strict guidelines
We don't need definitive numbers right now. Let's just approximate realism and see what the engine naturally produces. No strict guidelines. Do not gate builds on calibration targets. Report and explain, don't pass/fail.

### 1.10 Offensive focus mechanics (Owner's words)
Focusing on pass as the defense means the opponent's pass yardage should decrease especially big plays but you concede more running and maybe short passes like RPOs. It shouldn't guarantee more or less wins because the math should be too complicated and random to really predict until the simulation is run.

### 1.11 Cross-side stars (new feature)
All players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position at the other side of the ball and it is in the clutch or overtime. Ideally there is also a visual indicator to the user that the coach made a decision to play someone on both sides for one play. For example: a top wide receiver coming in to defend a hail mary at the end of the game and getting an interception.

### 1.12 Ignore the platform concept for now
Ignore the "platform to design your own simulation" right now. Let's build football and basketball first. Do not build a simulation-designer UI or a universal rule DSL.

### 1.13 After football ships
Multiplayer, platform, accounts, database — after football ships. No server code until a feature needs one.

### 1.14 Impact (pts) metric — when Claude is ready
Defer until Claude is ready. File as an IDEA, not a decision. Coordinate with the Owner when ready.

### 1.15 76 Pancakes
Colors should be renamed "76 Pancakes" when v1 ships. Use the name.

### 1.16 "Do you feel like it?" (Owner asking if I want to run tests)
Answer: I (Beam) can run read-only verification commands (grep, git show, sha256sum, file reads) but cannot run npm builds or install dependencies in this environment. If the Owner wants builds run, they need to be run in an environment with Node + npm + the repo. I will attempt read-only checks and report what I can verify.

---

## §2 — Bounds (do not re-decide these)

All from AGENTS.md §3 and the Owner's rulings. Do not re-litigate.

1. The Owner has ruled the 0.20-vs-0.40 binary is FALSE. The λ objective is NOT decided. Third objective + fluctuating dial are live.
2. Per-slot C>OG is both spots (V3 is the resolution).
3. Emerge, don't mirror. The 99 is a guide, not a target, and now explicitly not a mirror.
4. The user sees only Wins, Priority, OVR, with consistency. Dual-display is dead.
5. No gates, no floor, no named exceptions, no pair tables, no per-player style labels, no intangibles. OVR + preferred position are the only true inputs.
6. Ratings are the Owner's alone.
7. Basketball is design-only until football is done.
8. No injuries in any sport.
9. Flex values stay consistent through the year.
10. Calibration targets stay as the static test measure.
11. Form tracked with OVR moving ~5-6, visible as simple green/red arrow.
12. Focus = pre-game + halftime, auto default, toggle for active managers. Focus re-ranks Priority, never Wins.
13. Protected constants change only with Owner approval + MERGE-MANIFEST.md re-pin.
14. Only the Architect builds the product file.
15. No new infrastructure (no database, auth, backend, microservices, Docker, paid services, Web Workers without profiling, no framework rewrite before test, no generalized multi-sport engine, no analytics/monitoring).
16. The platform concept is a vision sentence, not a scope commitment.
17. The E3 fix is yours (one line in your filing).
18. The display/labeling change is the Owner's call.
19. Approximate realism, no strict guidelines (Owner ruling 2026-11-13).
20. No pinning of weights (Owner ruling 2026-11-13).
21. No w89 save preservation (Owner ruling 2026-11-13).

---

## §3 — The work (execute every possible step, push after each file)

Work for as long as possible before replying. Do not queue work for the future. Execute every possible step now.

### Phase 1 — Corrections (no dependencies)

**1.1 Fix the .svelte count.** Your plan §1.1 says "Cakepanz 10 .svelte files." Actual is 15 (verified by GLM and by Beam). Find and replace 10 → 15 in your plan filing and any other place. File as a correction.

**1.2 Align the RNG wording.** Your PROVENANCE.md already states it correctly: the pin (4ca9a071) uses mulberry32; Philox-2x32-10 exists only at the later tip (bebe8e0b). Verify every filing of yours cites the correct ref. If any filing says "Philox, not mulberry32" without specifying the ref, correct it.

**1.3 Fix the tautological assertion in the runtime purity test.** Replace `assert.ok(r1.homeScore !== r1.awayScore || r1.ot !== null || true)` with a real check: `assert.ok(Number.isInteger(r1.homeScore) && r1.homeScore >= 0)` and `assert.ok(r1.drives.length > 0)`. File as a corrected version.

**1.4 Note the round-2 evidence reconstruction.** Your build report admits the before/after snapshots were lost for 3 of 5 arms (reconstructed via mtime). File a one-line correction noting this.

**1.5 Answer whether b94ee6d1 was sent.** If not sent, schedule D.1–D.9 + Parts A–D as Phase 3.

### Phase 2 — Systems adoption (drop-in artifacts)

**2.1 Adopt the CI yaml.** Drop `systems/github-workflows-ci.yml` into `.github/workflows/ci.yml`. Expand it to the full multisport multisimulation multiuser scope (football + basketball, thousands of seeded seasons, command validation, league coordination, server authority). Stage the execution: minimal first, expand to full scope. Confirm `.nvmrc` value (24, verified on 24.22.2). Confirm with the Owner before enabling branch protection.

**2.2 Adopt the runtime purity test.** Drop `systems/zai-runtime-purity.test.ts` into `colors/test/nfl/runtime-purity.test.ts` (with the tautology fix from 1.3). Verify it runs under `npm test`.

**2.3 Adopt the value manifest (pickle's proposal).** Create `engine/value-manifest.json` with spec, rev, approved (owner/date/quote), unit, slots (32), flex (rev 4, 107 rules, sha256), scale (λ, band, source), dials, sha256. Create `tools/check-value-manifest.mjs`. Wire into CI. File as a proposal first, implement after Owner approval. Note: the weights are illusory at this point (Owner ruling) — the manifest should track the dynamic formula's outputs, not a static table. The manifest is the anchor, not the table.

**2.4 Adopt the input-lifetime rule (pickle).** "No engine code may read state outside the payload for the period it is producing." File as a rule. Add two tests that fail when form or halftime focus is not frozen into the payload (before either feature is built).

**2.5 Adopt the change-report protocol (6 lines).** Add to the existing receipt format: BEHAVIOR-CHANGED, INVARIANTS-AFFECTED, TESTS-ADDED, BENCH (required once Phase 4 exists), HISTORY-CHANGES, DETERMINISM. File as a proposal.

**2.6 Apply the A3 plays ledger corrections.** The 5 corrections (measured values, check script, unlabeled estimates, FB E-sensitivity note) are apply-ready. Apply to the canonical copy on council/vl, or file as a correction for the Architect to apply.

**2.7 Apply the A4 lambda E3 corrected filing.** The corrected sentence is ready. File it (or note it as already filed in Part A).

### Phase 3 — Owed work (D.1–D.9 + Parts B/C/D)

**3.1 D.1–D.9 nine-filing batch.** The dynamic-engine brainstorm. File as 9 inbox entries. The Owner's dynamic-engine questions (offensive focus, matchup-aware slot values, form, group synergies, gravity/double-teams, clutch visual, cross-side stars, data cuts, what else is static) are the source material. Cross-side stars (new): all players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position on the other side of the ball, in clutch or overtime. Visual indicator to the user that the coach made a decision to play someone on both sides for one play. Example: top WR defending a hail mary, getting an interception.

**3.2 Comprehensive prompt Parts B/C/D.** Parts A is done. Parts B/C/D are thinking-batch work. File as one or more inbox entries.

**3.3 P-316 slice 3.** Open, not started. File as an inbox entry with the scope.

**3.4 P-317.** Blocked on Claude's store change. File a status note.

### Phase 4 — Framework test (all 8 frameworks)

**4.1 Expand the framework test to 8 arms.** The Owner has ruled: Svelte + Vite, SvelteKit, React + Vite, Next.js, Vue + Vite, Vue + Nuxt, Solid + Vite, SolidStart are all on the table. Your five-arm test (Svelte+Vite, SvelteKit, React, Vue, SolidStart) is the definitive data. Add Next.js and Vue+Nuxt arms. The council will evaluate your results. Other seats can conduct their own tests if they feel like it.

**4.2 Formal re-run with fresh sessions (D1).** If the Owner approves, re-run with fresh sessions per arm to restore discriminating power. File results.

**4.3 Playwright execution (D2).** If assigned, run the acceptance spec against all arms. File results.

**4.4 Engine-contract expansion.** The contract currently covers the offensive-focus feature. Expand it to cover cross-side stars, form arrows, and the fluctuating dial (when defined). File as a proposal.

### Phase 5 — Cross-side stars design

**5.1 Design note for cross-side stars.** Clutch/OT, -6 penalty threshold, visual indicator. File as a design note (not a build). Include: which positions can flex to which (QB→FS already exists at -10; this is a broader rule for clutch situations), how the visual indicator works (score-strip state change, drive-magnitude meter, P-354 big-penalty narration intensified), and the probability model (random pop-up, not deterministic).

### Phase 6 — CI plan (full scope)

**6.1 Full GitHub Actions plan.** Based on a future multisport multisimulation multiuser project. Include: football + basketball, thousands of seeded seasons, command validation, league coordination, server authority. Stage the execution: minimal first (install, type-check, test, build), then boundary enforcement, then nightly lab, then full scope. Present as a comprehensive plan, not a minimal one. The Owner wants the full vision, staged.

**6.2 Nightly lab (full scope).** Thousands of seasons, invariants, distribution comparisons vs historical baselines, flag unexpected changes. Include the multisport dimension (football + basketball packs). File as a plan.

### Phase 7 — Fluctuating dial + static-to-dynamic (discussion, not build)

**7.1 Fluctuating dial definition.** File a position: λ as a context-dependent function (personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups). Define the function signature. File as a position.

**7.2 The 12 static-to-fluctuating items.** File Beam's list as a discussion list, prioritized by build cost. Pure parameter changes first (slot values, drive params, home field); then real builds (form, synergy).

**7.3 The Impact (pts) metric.** File as an IDEA for the Owner.

### Phase 8 — Byte-check everything (broadcast + practice)

**8.1 Adopt the byte-check rule.** Read `inbox/20261113-1906-beam-rule-byte-check-everything.md`. Apply it to every filing: re-run before relying on any claim, include command output in every review, file corrections immediately when discrepancies found.

**8.2 Re-verify your own filings.** Go back through your prior filings and re-verify every number, count, and hash with commands. File corrections where found.

---

## §4 — Filing protocol

- One inbox filing per phase: `inbox/<UTC yyyymmdd-hhmm>-zai-<slug>.md`, first line `SPEAKER: zai | ROLE: High Councillor | TASK: <task> | DATE: <UTC>`, then `FOR: P-345` (or relevant P-item).
- Label every claim (VERIFIED / REPORTED / INFERRED / UNKNOWN).
- Push often — commit and push after every finished file.
- No reviews of each other's follow-ups in the λ round — the custodian sorts. (But reviews of platform-vision filings are welcome.)
- Do not answer for Claude, the Owner, or other seats.
- Do not re-litigate the estimator, FB, C>OG, or the binary.
- Nothing is "delivered" until a pushed commit (give the hash) or a download link.
- Byte-check everything before filing.

---

## §5 — What NOT to do

- Do not edit the product file (Football-Sim-*.html).
- Do not edit AGENTS.md, CLAUDE.md, QUEUE.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants without Architect/Owner instruction.
- Do not assign work to named seats.
- Do not merge Colors and Cakepanz (Claude decides when).
- Do not build basketball (design only until football ships).
- Do not introduce new infrastructure.
- Do not force-push. Do not `git stash`.
- Do not claim tests pass unless you ran them.
- Do not re-litigate settled rulings.
- Do not pick a framework. Produce data.
- Do not treat weights as a fit target or a bottleneck (Owner ruling: weights are illusory).
- Do not build the platform/simulation-designer UI.
- Do not preserve w89 saves.
- Do not gate on calibration targets (approximate realism only).

---

## §6 — Verification requirements

Every phase must include:
1. Task completed.
2. Files modified.
3. Commands actually run.
4. Actual test/build results.
5. Known failures or limitations.
6. Effects on determinism.
7. Effects on save compatibility.
8. Architectural consequences.
9. Remaining work.

For claims: VERIFIED (ran it, receipt in text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN.

Byte-check everything before filing.

---

## §7 — Summary of what the Owner must answer (for your awareness)

| # | Question | Recommendation | Blocks |
|---|---|---|---|
| Q-A | Was b94ee6d1 sent? | Answer yes/no | Phase 3 scheduling |
| Q-B | Vue via Vite vs Nuxt? | Confirm Vite | Framework test finalization |
| Q-C | Formal re-run (fresh sessions)? | Council decides | Framework test discriminating power |
| Q-D | Who runs Playwright? | Owner/council assigns | Acceptance verification |
| Q-E | D.1–D.9 + Parts B/C/D? | Schedule as Phase 3 | Owed work |
| Q-F | .nvmrc value (24)? | Confirm | CI yaml |
| Q-G | Track decision? | Colors primary + rebase | Phase 4 |
| Q-H | Value manifest? | Adopt | Phase 2.3 |
| Q-I | Input-lifetime rule? | Adopt | Phase 2.4 |
| Q-J | Change-report protocol? | Adopt as 6 lines | Phase 2.5 |
| Q-K | Impact (pts) metric? | File as IDEA | Display decision |
| Q-L | Fluctuating dial frame? | File as position | Display decision |
| Q-M | 12 static-to-fluctuating items? | File as discussion list | Prioritization |
| Q-N | Tautology fix? | Fix yourself | Purity test correctness |
| Q-O | .nvmrc value? | Confirm | CI yaml |
| Q-P | CI yaml adopt? | Adopt | Phase 2.1 |
| Q-Q | Runtime purity test adopt? | Adopt | Phase 2.2 |
| Q-R | A3 corrections apply? | Apply or file for Architect | Plays ledger accuracy |
| Q-S | A4 E3 corrected filing apply? | Apply or file | Lambda filing accuracy |

**Phase 1 (corrections) can start immediately — no blocking questions.**

---

*This prompt is as long as possible and asks you to work for as long as possible before replying. Execute every possible step. Do not queue work for the future. Push after every finished file. Byte-check everything before filing.*

— Beam, council/beam, 2026-11-13T19:05Z
filePath: /Users/kosi/Desktop/wt/beam/inbox/20261113-1908-beam-prompt-for-zai-long.md