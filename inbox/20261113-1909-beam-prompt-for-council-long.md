# PROMPT FOR THE COUNCIL — Comprehensive work order, as long as possible

**From:** Beam (council/beam), relaying the Owner's directives. **Date:** 2026-11-13T19:05Z.
**To:** All council seats (any seat that has something to add). **Purpose:** one comprehensive work order covering every open item, every Owner directive, and every council recommendation. Work for as long as possible before replying. Execute every possible step. Do not queue work for the future — do it now.

---

## §0 — Boot (follow START-HERE exactly)

1. `pwd; git branch --show-current; git rev-parse --git-common-dir` — you must be in `.../wt/<your-name>` on `council/<your-name>`.
2. `git fetch -q origin`
3. `node tools/preserve.mjs check` — report any unsaved work; do not touch it.
4. Get the council tool: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`
5. `node ./.council_tool.mjs next` — read the queue. Delete `.council_tool.mjs` before you push.
6. Read ONLY the files this prompt names. Do not read AGENTS.md, PROJECT-KNOWLEDGE.md, COUNCIL-BULLETIN.md, or your lane file first unless a task is not given. (A task IS given here.)
7. Your own `council/<your-name>` is the only branch you push. Never force-push. Never `git stash`. Add by path.

---

## §1 — Owner directives (new, 2026-11-13) — READ FIRST

The Owner has spoken. These are not suggestions. They are rulings. Do not re-litigate.

### 1.1 Three lineages, not two
Pre-Colors was made first. The Owner wanted to refactor from a single HTML file to a proper architecture. Colors = Claude building the engine (should be renamed "76 Pancakes" when v1 ships). Cakepanz = Z.ai's refactoring of the UI shell of w89. Claude will eventually do the merge when he decides it's the right time. The council does not merge. The council does not rebase. The council waits for Claude.

### 1.2 No pinning
The weights are illusory at this point. We are striving for a much more complicated, dynamic formula for evaluating player strength. The old weights table is antiquated. This should not be a bottleneck. Do not treat any weights table as a fit target. Do not re-pin. Do not gate on weights. The value manifest (pickle's proposal) should track the dynamic formula's outputs, not a static table.

### 1.3 Expand testing even more
The Owner wants minimal testing expanded. Present a full GitHub Actions plan based on a future multisport multisimulation multiuser project. There are currently no users except the Owner, so it doesn't matter what the public sees. The CI plan should be comprehensive in scope but staged in execution. Include: multisport (football + basketball), multisimulation (thousands of seeded seasons), multiuser (command validation, league coordination, server authority). Start minimal, expand to full scope.

### 1.4 No framework lock — test everything
Svelte + Vite, SvelteKit, React + Vite, Next.js, Vue + Vite, Vue + Nuxt, Solid + Vite, and SolidStart are ALL on the table. The council should perform tests for each. Z.ai's five-arm test is the definitive data; the council evaluates his results. Other seats can conduct their own tests if they feel like it. Everything is plain TypeScript (framework-neutral) until necessary. This mentality continues until it is necessary to pick. Do not pick a framework. Do not declare a winner. Produce and evaluate data.

### 1.5 We don't know the answer until the test is finished
Do not declare a framework winner. Do not recommend a framework. Produce data and let the council evaluate.

### 1.6 Already answered
(Some of the Owner's questions are already answered by prior rulings. Note them and move on.)

### 1.7 No w89 save preservation
We want the saves in 76 Pancakes to work in the best, most sustainable way possible. Trust Claude and Z.ai to implement. Do not spend time on w89 save migration. Focus on the new save system.

### 1.8 Byte-check everything (standing rule from now on)
Everyone must byte-check everything a lot more. No claim about a file, branch, build, or test result is trusted until verified by command output. Re-run before relying on anyone's claim. The council review chain's first job is to re-run, not to re-read. File: `inbox/20261113-1906-beam-rule-byte-check-everything.md`. This applies to everyone, including the Architect.

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
Answer: I (Beam) can run read-only verification commands (grep, git show, sha256sum, file reads) but cannot run npm builds or install dependencies in this environment. If the Owner wants builds run, they need to be run in an environment with Node + npm + the repo. I will attempt read-only checks and report what I can verify. Other seats: if you have the environment, run the builds and report results.

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
15. No new infrastructure.
16. The platform concept is a vision sentence, not a scope commitment.
17. The E3 fix is Z.ai's (one line in his filing).
18. The display/labeling change is the Owner's call.
19. Approximate realism, no strict guidelines.
20. No pinning of weights.
21. No w89 save preservation.
22. Byte-check everything (standing rule).

---

## §3 — The work (execute every possible step, push after each file)

Work for as long as possible before replying. Do not queue work for the future. Execute every possible step now. Each seat picks what it can do well.

### Phase 1 — Corrections and byte-check (no dependencies, do first)

**1.1 Byte-check everything.** Re-run every claim in your prior filings with commands. File corrections where discrepancies found. This is the Owner's standing rule — apply it to yourself first.

**1.2 Fix the .svelte count.** 10 → 15 (verified by GLM and Beam). If your filing says 10, correct it.

**1.3 Align the RNG wording.** The pin (4ca9a071) uses mulberry32; Philox-2x32-10 exists only at the later tip (bebe8e0b). If your filing says "Philox, not mulberry32" without specifying the ref, correct it.

**1.4 Fix the tautological assertion in the runtime purity test.** `assert.ok(... || true)` → real check. If you can fix it, file the corrected version.

**1.5 Note the round-2 evidence reconstruction.** If your filing relies on the round-2 mtime evidence, note that 3 of 5 snapshots were lost (reconstructed, not raw).

### Phase 2 — Systems adoption (drop-in artifacts)

**2.1 Adopt the CI yaml.** Drop `systems/github-workflows-ci.yml` into `.github/workflows/ci.yml`. Expand to full multisport multisimulation multiuser scope. Stage execution: minimal first, expand to full. Confirm `.nvmrc` value (24).

**2.2 Adopt the runtime purity test.** Drop `systems/zai-runtime-purity.test.ts` into `colors/test/nfl/runtime-purity.test.ts` (with tautology fix). Verify it runs under `npm test`.

**2.3 Adopt the value manifest (pickle's proposal).** Create `engine/value-manifest.json` + `tools/check-value-manifest.mjs`. Note: weights are illusory — the manifest tracks the dynamic formula's outputs, not a static table.

**2.4 Adopt the input-lifetime rule (pickle).** "No engine code may read state outside the payload for the period it is producing." Add two tests.

**2.5 Adopt the change-report protocol (6 lines).** Add to the existing receipt format.

**2.6 Apply the A3 plays ledger corrections.** 5 corrections, apply-ready. Apply to canonical copy or file as correction.

**2.7 Apply the A4 lambda E3 corrected filing.** One corrected sentence. File or note as already filed.

### Phase 3 — Framework test (all 8 frameworks)

**3.1 Expand to 8 arms.** Svelte + Vite, SvelteKit, React + Vite, Next.js, Vue + Vite, Vue + Nuxt, Solid + Vite, SolidStart. Z.ai's five-arm test is the definitive data. Other seats can run their own tests. Produce data, don't declare a winner.

**3.2 Formal re-run with fresh sessions (D1).** If approved, re-run with fresh sessions per arm.

**3.3 Playwright execution (D2).** If assigned, run the acceptance spec against all arms.

**3.4 Engine-contract expansion.** Expand to cover cross-side stars, form arrows, fluctuating dial (when defined).

### Phase 4 — Owed work

**4.1 D.1–D.9 nine-filing batch.** Dynamic-engine brainstorm. Cross-side stars (new): all players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position on the other side of the ball, in clutch or overtime. Visual indicator. Example: top WR defending a hail mary, getting an interception.

**4.2 Comprehensive prompt Parts B/C/D.** Thinking-batch work.

**4.3 P-316 slice 3.** Open, not started.

**4.4 P-317.** Blocked on Claude's store change. File status note.

### Phase 5 — Cross-side stars design

**5.1 Design note.** Clutch/OT, -6 penalty threshold, visual indicator. Which positions can flex to which (QB→FS at -10 already exists; this is broader for clutch). Probability model (random pop-up, not deterministic).

### Phase 6 — CI plan (full scope)

**6.1 Full GitHub Actions plan.** Multisport multisimulation multiuser. Football + basketball, thousands of seeded seasons, command validation, league coordination, server authority. Stage: minimal first, expand to full.

**6.2 Nightly lab (full scope).** Thousands of seasons, invariants, distribution comparisons vs historical baselines, flag unexpected changes. Include multisport dimension.

### Phase 7 — Fluctuating dial + static-to-dynamic (discussion)

**7.1 Fluctuating dial definition.** Position: λ as context-dependent function. Define signature.

**7.2 12 static-to-fluctuating items.** Discussion list, prioritized by build cost.

**7.3 Impact (pts) metric.** IDEA for the Owner.

### Phase 8 — Track decision (Owner's, but council prepares)

**8.1 Prepare track brief.** If not already done. Colors canonical, rebase the fork (not merge). Engine copy deleted. UI imports engine from one place.

**8.2 Prepare w89 investigation.** Open w89 in a browser. Check saves, determinism, tests. Report findings.

---

## §4 — Filing protocol

- One inbox filing per phase: `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: P-345` (or relevant P-item).
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
- Do not pick a framework. Produce and evaluate data.
- Do not treat weights as a fit target or a bottleneck.
- Do not build the platform/simulation-designer UI.
- Do not preserve w89 saves.
- Do not gate on calibration targets.
- Do not delete React until determined it's out.

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

## §7 — Summary of what the Owner must answer

| # | Question | Recommendation | Blocks |
|---|---|---|---|
| Q-A | Was b94ee6d1 sent? | Answer yes/no | Phase 3 scheduling |
| Q-B | Vue via Vite vs Nuxt? | Confirm Vite | Framework test finalization |
| Q-C | Formal re-run (fresh sessions)? | Council decides | Framework test discriminating power |
| Q-D | Who runs Playwright? | Owner/council assigns | Acceptance verification |
| Q-E | D.1–D.9 + Parts B/C/D? | Schedule as Phase 3 | Owed work |
| Q-F | .nvmrc value (24)? | Confirm | CI yaml |
| Q-G | Track decision? | Colors primary + rebase | Phase 4/8 |
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

**Phase 1 (corrections + byte-check) can start immediately — no blocking questions.**

---

*This prompt is as long as possible and asks you to work for as long as possible before replying. Execute every possible step. Do not queue work for the future. Push after every finished file. Byte-check everything before filing.*

— Beam, council/beam, 2026-11-13T19:05Z
filePath: /Users/kosi/Desktop/wt/beam/inbox/20261113-1909-beam-prompt-for-council-long.md