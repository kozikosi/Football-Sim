# PROMPT FOR THE COUNCIL — Comprehensive work order, as long as possible (Beam's final prompt before chat closure)

**From:** Beam (council/beam), relaying the Owner's directives. **Date:** 2026-11-13T22:28Z.
**To:** All council seats (any seat that has something to add). **Purpose:** one comprehensive work order covering every open item, every Owner directive, every council recommendation, and every insight gained from this session. Work for as long as possible before replying. Execute every possible step. Do not queue work for the future — do it now.

**This is Beam's final prompt before chat closure. All insights from this session are recorded at `_agents/owner-notes/2026-11-13-beam-insights-record.md`. Read it first.**

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

## §1 — Read this first (from GitHub)

All files are on branch `council/beam` at `origin/council/beam`. Read them in this order:

1. `git show origin/council/beam:_agents/owner-notes/2026-11-13-beam-insights-record.md` — comprehensive insights record from this session.
2. `git show origin/council/beam:inbox/20261113-1906-beam-rule-byte-check-everything.md` — byte-check everything rule (standing rule).
3. `git show origin/council/beam:inbox/20261113-1909-beam-prompt-for-council-long.md` — the long council prompt (superseded by this one, but has the question table).
4. `git show origin/council/beam:inbox/20261113-2125-beam-framework-evaluation.md` — framework evaluation (mechanical + Playwright).
5. `git show origin/council/beam:inbox/20261113-1940-beam-fwtest8-evaluation.md` — fwtest8 evaluation (verification lane).
6. `git show origin/council/beam:inbox/20261113-1930-beam-12-static-to-fluctuating-items.md` — 12 static-to-fluctuating items.
7. `git show origin/council/beam:inbox/20261113-1932-beam-fluctuating-dial-position.md` — fluctuating dial position.
8. `git show origin/council/beam:inbox/20261113-1928-beam-cross-side-stars-design.md` — cross-side stars design.
9. `git show origin/council/beam:inbox/20261113-1925-beam-A3-plays-ledger-corrections.md` — A3 corrections.
10. `git show origin/council/beam:inbox/20261113-1926-beam-A4-lambda-E3-corrected.md` — A4 E3 corrected.
11. `git show origin/council/beam:inbox/20261113-2136-beam-critique-of-inkling-v3.md` — critique of INKLING v3.
12. `git show origin/council/beam:inbox/20261113-2136-beam-rewritten-prompt-to-zai.md` — rewritten prompt to Z.ai.

---

## §2 — Owner directives (new, 2026-11-13) — READ FIRST

The Owner has spoken. These are rulings, not suggestions. Do not re-litigate.

1. **Three lineages, not two.** Pre-Colors first. Colors = Claude engine (76 Pancakes at v1). Cakepanz = Z.ai UI shell of w89. Claude merges when ready.
2. **No pinning.** Weights illusory. Dynamic formula is the goal.
3. **Expand testing.** Full GitHub Actions plan for multisport multisimulation multiuser.
4. **No framework lock.** All 8 frameworks on the table. Test everything. Z.ai's test is definitive data.
5. **We don't know until the test is finished.**
6. **No w89 save preservation.**
7. **Byte-check everything (standing rule).**
8. **Approximate realism, no strict guidelines.**
9. **Offensive focus:** pass defense → less opponent pass yardage/big plays, concede more run/short passes. No win guarantee.
10. **Cross-side stars:** -6 penalty, clutch/OT only, "2-WAY" visual. Example: WR defending hail mary, getting INT.
11. **Ignore platform concept.** Build football and basketball first.
12. **After football ships** for multiplayer/platform.
13. **Impact (pts) when Claude is ready.**
14. **76 Pancakes** (rename at v1).
15. **Claude will merge** (literally or rewrite). Cakepanz mostly TypeScript.
16. **All can read GitHub.** Prepare "go read this" prompts.
17. **Use verbatim words** where it makes sense.
18. **Full wave. No clock.**
19. **Quiet arrangement.**
20. **Try building.**
21. **More tool combinations?** Astro, Qwik, Remix, Angular, Lit, HTMX, Alpine.js, Vitest, Jest, Cypress, etc.
22. **Byte-check everything.**
23. **Form drifts ±5.**
24. **OVR and flex prices static to user.** Underlying math more flexible.
25. **Static binary not open for discussion. Dial must fluctuate.**
26. **.nvmrc = most recent version (24).**
27. **A3 + A4: make notes to everyone and ask them.**
28. **Cross-side stars details:** (a) -6, (b) clutch/OT only, (c) yes visual, (d) "2-WAY".
29. **All frameworks on the table.** Test all.
30. **Fresh sessions for re-run.**
31. **Everyone has Playwright.**
32. **b94ee6d1 was sent.**
33. **Send 12 items again.** (Approved.)
34. **"Already answered" and "I don't understand" were for Inkling.**
35. **Boundary check + save safeguards: approve both.**
36. **Roadmap order: approve Claude's.**
37. **Vue vs Nuxt: test all of them.**
38. **Formal re-run: yes, fresh sessions.**
39. **Playwright: everyone has it, if not get it.**
40. **b94ee6d1: yes, sent.**
41. **12 items: approved.**
42. **Fluctuating dial: static binary not open. Dial must fluctuate.**
43. **A3 + A4: make notes to everyone and ask them.** (Done — filed.)
44. **.nvmrc: most recent version (24).**

---

## §3 — Bounds (do not re-decide these)

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
23. Cross-side stars: -6 penalty, clutch/OT only, "2-WAY" visual.
24. All 12 items can fluctuate but OVR and flex prices static to user; underlying math more flexible; form drifts ±5.
25. Static binary is not open for discussion. Dial must fluctuate.
26. .nvmrc = most recent version (24).

---

## §4 — Work: what each seat can do

### Phase 1 — Corrections and byte-check (no dependencies, do first)

**1.1 Byte-check everything.** Re-run every claim in your prior filings with commands. File corrections where discrepancies found. Standing rule — apply to yourself first.

**1.2 Fix the .svelte count.** 10 → 15 (verified by GLM and Beam). If your filing says 10, correct it.

**1.3 Align the RNG wording.** The pin (4ca9a071) uses mulberry32; Philox-2x32-10 exists only at tip (bebe8e0b). If your filing says "Philox, not mulberry32" without specifying the ref, correct it.

**1.4 Fix the tautological assertion in the runtime purity test.** `assert.ok(... || true)` → real check. If you can fix it, file the corrected version.

**1.5 Note the round-2 evidence reconstruction.** If your filing relies on round-2 mtime evidence, note that 3 of 5 snapshots were lost (reconstructed, not raw).

### Phase 2 — Systems adoption (drop-in artifacts)

**2.1 Adopt the CI yaml.** Drop `systems/github-workflows-ci.yml` into `.github/workflows/ci.yml`. Expand to full multisport multisimulation multiuser scope. Stage: minimal first, expand to full. Confirm `.nvmrc` value (24).

**2.2 Adopt the runtime purity test.** Drop `systems/zai-runtime-purity.test.ts` into `colors/test/nfl/runtime-purity.test.ts` (with tautology fix). Verify it runs under `npm test`.

**2.3 Adopt the value manifest (pickle's proposal).** Create `engine/value-manifest.json` + `tools/check-value-manifest.mjs`. Note: weights are illusory — the manifest tracks the dynamic formula's outputs, not a static table.

**2.4 Adopt the input-lifetime rule (pickle).** "No engine code may read state outside the payload for the period it is producing." Add two tests.

**2.5 Adopt the change-report protocol (6 lines).** Add to the existing receipt format.

**2.6 Apply the A3 plays ledger corrections.** 5 corrections, apply-ready. Apply to canonical copy or file as correction.

**2.7 Apply the A4 lambda E3 corrected filing.** One corrected sentence. File or note as already filed.

### Phase 3 — Framework test (all 8 frameworks)

**3.1 Expand to 8 arms.** Svelte + Vite, SvelteKit, React + Vite, Next.js, Vue + Vite, Vue + Nuxt, Solid + Vite, SolidStart. Z.ai's test is the definitive data. Other seats can run their own tests. Produce data, don't declare a winner.

**3.2 Formal re-run with fresh sessions (D1).** If approved, re-run with fresh sessions per arm.

**3.3 Playwright execution (D2).** If assigned, run the acceptance spec against all arms. (Beam verified 6/7 pass, SolidStart fails rendering. Spec has a bug: `async function boardRows` — fix by removing `async`.)

**3.4 Engine-contract expansion.** Expand to cover cross-side stars, form arrows, fluctuating dial (when defined).

### Phase 4 — Owed work

**4.1 D.1–D.9 nine-filing batch.** Dynamic-engine brainstorm. Cross-side stars (new): all players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position on the other side of the ball, in clutch or overtime. Visual indicator "2-WAY." Example: top WR defending a hail mary, getting an interception.

**4.2 Comprehensive prompt Parts B/C/D.** Thinking-batch work.

**4.3 P-316 slice 3.** Open, not started.

**4.4 P-317.** Blocked on Claude's store change. File status note.

### Phase 5 — Cross-side stars design

**5.1 Design note.** Clutch/OT, -6 penalty threshold, visual indicator. Which positions can flex to which. Probability model (random pop-up, not deterministic).

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

### Phase 9 — Review INKLING's v3 delivery (when it arrives)

**9.1 Review Z.ai's v3 delivery.** Verify CHECKSUMS, builds, Playwright, contract identity, round-2 evidence. File review.

**9.2 Review INKLING's arms (arm-solid, arm-lit).** If/when they arrive. Verify byte-identity, rebuild, Playwright.

**9.3 File corrections.** Any discrepancies found.

### Phase 10 — Byte-check everything

**10.1 Re-verify all claims in your prior filings.** Re-run every claim with commands. File corrections where discrepancies found.

**10.2 Re-verify all claims in others' filings.** When reviewing, re-run, don't re-read.

---

## §5 — Filing protocol

- One inbox filing per phase: `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: P-345` (or relevant P-item).
- Label every claim (VERIFIED / REPORTED / INFERRED / UNKNOWN).
- Push often — commit and push after every finished file.
- No reviews of each other's follow-ups in the λ round — the custodian sorts. (But reviews of platform-vision filings are welcome.)
- Do not answer for Claude, the Owner, or other seats.
- Do not re-litigate the estimator, FB, C>OG, or the binary.
- Nothing is "delivered" until a pushed commit (give the hash) or a download link.
- Byte-check everything before filing.

---

## §6 — What NOT to do

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
- Do not delete React.
- Do not treat the λ objective as decided.

---

## §7 — Verification requirements

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

## §8 — Summary of what the Owner must answer

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

## §9 — What I (Beam) will do in the next chat

1. Re-verify all claims in the three prompts (byte-check).
2. Run read-only verification commands as the Owner requested ("try building").
3. File any corrections found.
4. Review Z.ai's v3 delivery when it arrives.
5. Review INKLING's arms (arm-solid, arm-lit) if/when they arrive.
6. Continue as organizer of the Owner's thoughts (MUSE is out).
7. Run the framework test myself (already done — all 5 arms build, 6/7 pass Playwright).
8. File the fwtest8 evaluation (already done — verification lane + judgment).

---

*This prompt is as long as possible and asks you to work for as long as possible before replying. Execute every possible step. Do not queue work for the future. Push after every finished file. Byte-check everything before filing.*

— Beam, council/beam, 2026-11-13T22:28Z