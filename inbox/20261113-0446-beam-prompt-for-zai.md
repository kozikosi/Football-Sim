# PROMPT FOR Z.ai — Comprehensive work order, 2026-11-13

**From:** Beam (council/beam), relaying the Owner's request. **Date:** 2026-11-13T04:45Z.
**To:** Z.ai (High Councillor, council/zai). **Purpose:** one comprehensive work order covering every open item the council has assigned or recommended to you, in priority order, with bounds, receipts, and the questions the Owner must answer before you start.

**How to use this prompt:** read §0 (boot) first, then §1 (bounds — do not re-decide), then §2 (questions for the Owner — answer these before starting, or note "not answered, proceeding on default"), then §3 (the work, in order). File one inbox entry per phase. Push after every finished file. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN.

---

## §0 — Boot (follow START-HERE exactly)

1. `pwd; git branch --show-current; git rev-parse --git-common-dir` — you must be in `.../wt/zai` on `council/zai`. If not, stop and tell the Owner.
2. `git fetch -q origin`
3. `node tools/preserve.mjs check` — report any unsaved work; do not touch it.
4. Get the tool into your worktree: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`
5. `node ./.council_tool.mjs next` — read the queue. Delete `.council_tool.mjs` before you push.
6. Read ONLY the files this prompt names. Do not read AGENTS.md, PROJECT-KNOWLEDGE.md, COUNCIL-BULLETIN.md, or your lane file first unless a task is not given. (A task IS given here — go straight to §3.)
7. Your own `council/zai` is the only branch you push. Never force-push. Never `git stash` (WIP commit instead). Add by path, never `git add -A`.

---

## §1 — Bounds (do not re-decide these)

These are settled. Do not re-litigate. If you disagree, file a dissenting inbox entry; do not silently override.

1. **The Owner has ruled the 0.20-vs-0.40 binary is FALSE.** The λ objective is NOT decided. The third objective (testing creatively for the best value, stable long-term structure, maximum flexibility for the dial) and the fluctuating dial are the live questions. Do not re-litigate the binary.
2. **Per-slot C>OG is both spots** (V3 per-slot min-collapse is the resolution).
3. **Emerge, don't mirror** (standing principle): the model should emerge from the formula, not mirror the Owner's table. The 99 is a guide, not a target, and now explicitly not a mirror.
4. **The user sees only Wins, Priority, OVR, with consistency.** The dual-display is dead. Do not revive it.
5. **No gates, no floor, no named exceptions, no pair tables, no per-player style labels, no intangibles.** OVR + preferred position are the only true inputs.
6. **Ratings are the Owner's alone.** Do not change any rating.
7. **Basketball is design-only until football is done.** No basketball build.
8. **No injuries in any sport.** (Owner verdict; 32 rounds kept.)
9. **Flex values stay consistent through the year.** (Owner verdict.)
10. **Calibration targets stay as the static test measure.** (Owner verdict.)
11. **Form tracked with OVR moving ~5–6, visible as simple green/red arrow** (green = hot, red = cold, per team palette, no emojis, no "HOT"/"cold" text). (Owner verdict.)
12. **Focus = pre-game + halftime, auto default, toggle for active managers.** Focus re-ranks Priority, never Wins. (Owner verdict.)
13. **Protected constants** (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS) change only with Owner approval + MERGE-MANIFEST.md re-pin. Do not touch.
14. **Only the Architect builds the product file.** You supply ideas, exact code snippets, mock-ups, measurements. Never edit Football-Sim-*.html.
15. **No new infrastructure** (no database, auth, backend, microservices, Docker, paid services, Web Workers without profiling evidence, no framework rewrite before the test, no generalized multi-sport engine, no analytics/monitoring until deliberate Owner decision).
16. **The Owner's platform vision** ("a platform to design your own simulation, potentially anything that requires similar attributes") is a vision sentence and portfolio narrative — keep it in the README, never let it rank above the football product.
17. **The E3 fix is yours (one line in your filing).** Do not rewrite MUSE's filing; file the corrected sentence as your own correction. (Already done in A4 — verify it landed.)
18. **The display/labeling change is the Owner's call.** The council thinks; the Owner decides.

---

## §2 — Questions for the Owner (answer before you start, or note "not answered, proceeding on default")

These are genuine Owner decisions that block or shape your work. For each, I have given my recommendation. If the Owner does not answer, proceed on the recommendation and note it in your filing.

### Q-A. Was follow-up prompt `b94ee6d1` sent? (YOUR question, from the intake ledger)
Your build report asks: "Owner, was it sent?" This prompt (Fix 4 CHECKSUMS + three open numbers + four builds) determines whether your D.1–D.9 batch and comprehensive prompt Parts A–D are already in flight or still owed. **Answer before starting.** If not sent, they are owed and should be scheduled (Phase 3 below).

### Q-B. D3 — Vue via Vite vs Nuxt
Your judgment call (D3 in the framework-test results): Vue tested via Vite, not Nuxt, because Nuxt's differentiators (SSR, file routing, server routes) would not be exercised by a one-screen prototype and Nuxt's install/build weight would dominate the tooling metric. **Recommend: confirm.** If the Owner wants Nuxt, that is a re-run of one arm (additive, not a rewrite).

### Q-C. D1 — formal re-run with fresh sessions
The framework test's round 2 (fifth focus) ran in a single session, not fresh sessions per arm, because the sandbox is one continuous session. The mtime-based evidence is reconstructed (3 of 5 snapshots lost). **Recommend: the council/Owner decides whether to re-run with fresh sessions to restore discriminating power.** If yes, you run it (or the council does). If no, note the confound and proceed.

### Q-D. D2 — who runs Playwright?
The Playwright acceptance spec ships but was not executed (browser download ~170 MB × 5 installs, outside sandbox budget). **Recommend: the Owner or a council seat with bandwidth runs it; you provide the per-arm drop-in paths (already shipped).** If you are to run it, the Owner must provide the environment (CI runner or local with browser).

### Q-E. D.1–D.9 nine-filing batch + comprehensive prompt Parts A–D
Still owed (from your intake ledger). **Recommend: schedule as Phase 3 (after the corrections in Phase 1).** If the Owner has already sent `b94ee6d1`, these may be in flight — confirm before duplicating.

### Q-F. The `.nvmrc` value (24)
Your CI yaml proposes Node 24. **Recommend: confirm against the environment the suite was actually verified on (Node 24.22.2 in your sandbox).** If the Architect's CI runs a different Node, pin that instead. One line either way.

### Q-G. Track decision (Colors vs Cakepanz vs merge)
Owner decision, blocks all product/UI work. The council converges on: Colors primary, rebase the Cakepanz fork (do not merge). But or argues for merge. **Recommend: Owner picks; you do not start Phase 4 (track-dependent work) until decided.** Phase 1 (corrections) and Phase 2 (systems adoption) do not depend on this.

### Q-H. The `value-manifest.json` (pickle's proposal)
Pickle proposed a single hashed file that IS the value model, with `check-value-manifest.mjs`. The council recommends adopting it. **Recommend: adopt as your Phase 2 item.** If the Owner disagrees (e.g., prefers the Architect's own approach), note it.

### Q-I. The input-lifetime rule (pickle)
"No engine code may read state outside the payload for the period it is producing." The council recommends adopting. **Recommend: adopt as a rule in your filings and as a test.**

### Q-J. The change-report protocol (6 lines)
GPT proposed an AI change-report protocol; you recommended it be 6 extra lines in the existing receipt, not a new document. The council agrees. **Recommend: adopt as 6 receipt fields.**

### Q-K. The `Impact (pts)` metric pitch (Beam)
Beam pitched "Impact" in points instead of Wins. **Recommend: file as an IDEA, not a decision.** The Owner decides whether to adopt or reject.

### Q-L. The fluctuating dial frame (Beam)
Beam framed λ as a context-dependent function (fixed λ is the degenerate case). **Recommend: file as a position, not a decision.** The Owner decides the frame.

### Q-M. The 12 static-to-fluctuating items (Beam's Q7 list)
Beam listed 12 static assumptions that should fluctuate. **Recommend: file as a discussion list for the council, prioritized by build cost (pure parameter changes first: slot values, drive params, home field; then real builds: form, synergy).**

### Q-N. The tautological assertion in the purity test
`assert.ok(r1.homeScore !== r1.awayScore || r1.ot !== null || true)` is always true. **Recommend: fix it yourself (replace with a real check: scores are non-negative integers, drives.length > 0) — no Owner decision needed.**

### Q-O. The `.nvmrc` value (24)
Proposed 24; your sandbox verified on 24.22.2. **Recommend: confirm with the Owner; if the Architect's CI runs a different Node, pin that.**

### Q-P. The CI yaml — adopt as-is?
The council recommends adopting. **Recommend: adopt, with the `.nvmrc` value confirmed (Q-O).**

### Q-Q. The runtime purity test — adopt?
The council strongly recommends adopting (it makes the server-ready boundary a test, not prose). **Recommend: adopt, with the tautology fix (Q-N).**

### Q-R. The A3 plays ledger corrections — apply to canonical copy?
The 5 corrections (measured values, check script, unlabeled estimates, FB E-sensitivity note) are apply-ready. **Recommend: apply to the canonical copy on council/vl, or file as a correction and let the Architect apply.**

### Q-S. The A4 lambda E3 corrected filing — apply?
The corrected sentence is ready. **Recommend: file it (or note it as already filed in Part A).**

---

## §3 — The work (in priority order)

Do these in order. File one inbox entry per phase. Push after every finished file.

### Phase 1 — Corrections (no dependencies, do first)

**1.1 Fix the `.svelte` count.** Your plan §1.1 says "Cakepanz 10 .svelte files." The actual count is 15 (verified by GLM and by me). Find and replace 10 → 15 in your plan filing and any other place it appears. File as a correction.

**1.2 Align the RNG wording.** Your plan §1.3 and the PROVENANCE.md already state it correctly: the pin (4ca9a071) uses mulberry32; Philox-2x32-10 exists only at the later tip (bebe8e0b). The audit's "Colors engine RNG is Philox2x32, not mulberry32" is true of the tip, not the pin. Make sure every filing of yours cites the correct ref. No new filing needed if already correct; verify with grep.

**1.3 Fix the tautological assertion in the runtime purity test.** Replace `assert.ok(r1.homeScore !== r1.awayScore || r1.ot !== null || true)` with a real check: e.g., `assert.ok(Number.isInteger(r1.homeScore) && r1.homeScore >= 0)` and `assert.ok(r1.drives.length > 0)`. File as a corrected version of the purity test.

**1.4 Note the round-2 evidence reconstruction.** Your build report admits the before/after snapshots were lost for 3 of 5 arms (reconstructed via mtime). File a one-line correction noting this, so the council's scoring weights the evidence correctly.

**1.5 Answer Q-A (was b94ee6d1 sent?).** If not sent, schedule D.1–D.9 + Parts A–D as Phase 3.

### Phase 2 — Systems adoption (drop-in artifacts)

**2.1 Adopt the CI yaml.** Drop `systems/github-workflows-ci.yml` into `.github/workflows/ci.yml` (repo root). Confirm `.nvmrc` value (Q-O). Confirm with the Owner before enabling (branch protection is an Owner setting).

**2.2 Adopt the runtime purity test.** Drop `systems/zai-runtime-purity.test.ts` into `colors/test/nfl/runtime-purity.test.ts` (with the tautology fix from 1.3). Verify it runs under `npm test`.

**2.3 Adopt the value manifest (pickle's proposal).** If the Owner approves (Q-H): create `engine/value-manifest.json` with spec, rev, approved (owner/date/quote), unit, slots (32), flex (rev 4, 107 rules, sha256), scale (λ, band, source), dials, sha256. Create `tools/check-value-manifest.mjs`. Wire into CI. File as a proposal first, implement after Owner approval.

**2.4 Adopt the input-lifetime rule (pickle).** "No engine code may read state outside the payload for the period it is producing." File as a rule in your delivery; add two tests that fail when form or halftime focus is not frozen into the payload (before either feature is built).

**2.5 Adopt the change-report protocol (6 lines).** Add to the existing receipt format: BEHAVIOR-CHANGED, INVARIANTS-AFFECTED, TESTS-ADDED, BENCH (required once Phase 4 exists), HISTORY-CHANGES, DETERMINISM. File as a proposal.

**2.6 Apply the A3 plays ledger corrections.** The 5 corrections (measured values, check script, unlabeled estimates, FB E-sensitivity note) are apply-ready. Apply to the canonical copy on council/vl, or file as a correction for the Architect to apply.

**2.7 Apply the A4 lambda E3 corrected filing.** The corrected sentence is ready. File it (or note it as already filed in Part A).

### Phase 3 — Owed work (D.1–D.9 + Parts B/C/D)

**3.1 D.1–D.9 nine-filing batch.** The dynamic-engine brainstorm (offensive focus, matchup-aware slot values, form, group synergies, gravity/double-teams, clutch visual, cross-side stars, data cuts, what else is static). This is the work the Owner's dynamic-engine prompts asked for. File as 9 inbox entries.

**3.2 Comprehensive prompt Parts B/C/D.** Parts A is done (patched v3 delivery). Parts B/C/D are thinking-batch work. File as one or more inbox entries.

**3.3 P-316 slice 3.** Open, not started. File as an inbox entry with the scope.

**3.4 P-317.** Blocked on Claude's store change. File a status note (blocked, waiting on Architect).

### Phase 4 — Track-dependent work (blocked on Owner's track decision Q-G)

**4.1 Framework test formal re-run.** If the Owner approves (Q-C), re-run with fresh sessions per arm. Restore D1. File results.

**4.2 Playwright execution.** If the Owner assigns it (Q-D), run the acceptance spec against all 5 arms. File results.

**4.3 Track rebase.** If the Owner picks Colors primary (recommended), rebase the Cakepanz fork: delete fork's src/engine/, import the library. File as a proposal with the acceptance test (same player gets same Wins from board and engine; 284 tests still green; drift table reads 0 differing files).

**4.4 Engine boundary enforcement.** Implement the 3 greps + replay hash as report-only for one week, then flip to fail. File as a proposal.

**4.5 Save versioning.** Add version field to new saves; unversioned = v0 legacy path; validate on load; backup-then-write; recovery-quarantine; migration tests. File as a proposal.

### Phase 5 — Fluctuating dial + static-to-dynamic (discussion, not build)

**5.1 Fluctuating dial definition.** File a position: λ as a context-dependent function (personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups). Define the function signature. File as a position, not a build.

**5.2 The 12 static-to-fluctuating items.** File Beam's Q7 list as a discussion list, prioritized by build cost. File as a position.

**5.3 The `Impact (pts)` metric.** File as an IDEA for the Owner.

---

## §4 — Filing protocol

- One inbox filing per phase: `inbox/<UTC yyyymmdd-hhmm>-zai-<slug>.md`, first line `SPEAKER: zai | ROLE: High Councillor | TASK: <task> | DATE: <UTC>`, then `FOR: P-345` (or the relevant P-item).
- Label every claim (VERIFIED / REPORTED / INFERRED / UNKNOWN).
- Push often — commit and push after every finished file.
- No reviews of each other's follow-ups in the λ round — the custodian sorts. (But reviews of platform-vision filings are welcome.)
- Do not answer for Claude, the Owner, or other seats.
- Do not re-litigate the estimator, FB, C>OG, or the binary (all settled).
- Nothing is "delivered" until a pushed commit (give the hash) or a download link.

---

## §5 — What NOT to do

- Do not edit the product file (Football-Sim-*.html). Only the Architect builds.
- Do not edit AGENTS.md, CLAUDE.md, QUEUE.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants without Architect/Owner instruction.
- Do not assign work to named seats.
- Do not merge Colors and Cakepanz without the Owner's track decision.
- Do not build basketball (design-only until football ships).
- Do not introduce new infrastructure (no database, auth, backend, etc.).
- Do not force-push. Do not `git stash`.
- Do not claim tests pass unless you ran them.
- Do not re-litigate settled rulings (binary, FB, C>OG, estimator, per-player clutch, no injuries, flex consistency, calibration targets static).

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

---

## §7 — Summary of what the Owner must answer (§2 recap)

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

**The questions that genuinely block Phase 1 (corrections, no dependencies):** none. Phase 1 can start immediately.

**The questions that block Phase 2 (systems adoption):** Q-F/Q-O (.nvmrc), Q-H (manifest), Q-P (CI yaml), Q-Q (purity test).

**The questions that block Phase 3 (owed work):** Q-A (b94ee6d1 status), Q-E (scheduling).

**The questions that block Phase 4 (track-dependent):** Q-G (track decision), Q-C (re-run), Q-D (Playwright).

**The questions that are discussion (no block):** Q-K, Q-L, Q-M, Q-B, Q-I, Q-J, Q-N, Q-R, Q-S.

---

*This prompt is the longest possible work order for Z.ai at this moment, incorporating every finding, correction, and recommendation from the council's review of his delivery and every other seat's filings. The Owner should answer the blocking questions (Q-A, Q-F/Q-O, Q-G, Q-H, Q-P, Q-Q) before or during Phase 2; the rest can be answered in parallel or deferred.*

— Beam, council/beam, 2026-11-13T04:45Z
filePath: /Users/kosi/Desktop/wt/beam/inbox/20261113-0446-beam-prompt-for-zai.md