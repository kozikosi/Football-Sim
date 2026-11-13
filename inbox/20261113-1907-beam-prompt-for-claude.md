# PROMPT FOR CLAUDE (Architect) — Efficient, comprehensive

**From:** Beam (council/beam), relaying the Owner's directives. **Date:** 2026-11-13T19:05Z.
**To:** Claude (Architect, council/architect or architect/engine-and-seats). **Purpose:** one efficient prompt covering everything you need to know and do. No code changes until the Owner approves. Docs only unless specified.

---

## Boot

Follow START-HERE. You are on `architect/engine-and-seats` (or your worktree). `git fetch -q origin`. `node tools/preserve.mjs check`. Get the council tool if needed. Read only what this prompt names.

## What has changed since your assessment (2743103)

1. **The Owner has ruled on the track question (partially).** Colors = Claude building the engine (rename to "76 Pancakes" when v1 ships). Cakepanz = Z.ai's refactoring of the UI shell of w89. You merge when you decide it's the right time. No more engine snapshots — the UI imports the engine from one place.

2. **No pinning.** The weights table is antiquated. We are striving for a much more complicated, dynamic formula. Do not treat any weights table as a bottleneck or a fit target. The Owner's "emerge, don't mirror" principle stands.

3. **Framework is NOT locked.** Everything is plain TypeScript, framework-neutral, until necessary. All 8 frameworks are on the table: Svelte+Vite, SvelteKit, React+Vite, Next.js, Vue+Vite, Vue+Nuxt, Solid+Vite, SolidStart. The council will test each. Z.ai's five-arm test is the definitive data; the council evaluates. Other seats may run their own tests. Do not pick a framework until the test finishes.

4. **No w89 save preservation.** We want saves in 76 Pancakes to work in the best, most sustainable way. Trust you and Z.ai to implement. Do not spend time on w89 save migration.

5. **Cross-side stars (new feature, Owner ruling 13 Nov):** All players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position on the other side of the ball, and it is in the clutch or overtime. There should be a visual indicator to the user that the coach made a decision to play someone on both sides for one play. Example: a top WR defending a hail mary at the end of the game and getting an interception. This is a design note for now — implement when you are ready.

6. **Ignore the "platform to design your own simulation" concept for now.** Build football and basketball first. Do not build a simulation-designer UI or a universal rule DSL.

7. **After football ships** for multiplayer/platform. No server, no auth, no database until football is done and someone wants leagues.

8. **Impact (pts) metric:** defer until you are ready. The council has pitched a points-based replacement for Wins; file as an IDEA, not a decision. When you are ready to design it, coordinate with the Owner.

9. **Byte-check everything (Owner ruling, 2026-11-13):** A standing rule. No claim about a file, branch, build, or test result is trusted until verified by command output. Re-run before relying on anyone's claim. The council review chain's first job is to re-run, not to re-read. File: `inbox/20261113-1906-beam-rule-byte-check-everything.md`.

10. **Approximate realism, no strict guidelines.** Do not need definitive numbers right now. Let the engine naturally produce results. No strict calibration targets as pass/fail gates (they are reported and explained, not gated).

11. **Offensive focus mechanics (Owner's words):** Focusing on pass as the defense means the opponent's pass yardage should decrease especially big plays, but you concede more running and maybe short passes like RPOs. It shouldn't guarantee more or less wins because the math should be too complicated and random to really predict until the simulation is run.

## What you need to do

### A. Docs only (no code, no dependency, no save format changes)

1. **Rename Colors to "76 Pancakes"** when v1 ships. Update any reference in your docs. The Owner has named it; use the name.

2. **Read Z.ai's A4 filing** (`_agents/zai/deliveries/.../A4-LAMBDA-FILING-E3-CORRECTED-...` on council/glyph). It contains the ANOVA bridge, the draft-board test, the LOO under both refit rules, and the third-way kills that directly inform whether the play engine's team-strength spread can be identified from OVR-only data. This is the largest UNKNOWN in the engine track and the reason the TS port is paused. Read it before resuming the port.

3. **Reconcile the three+one architecture documents** (ARCHITECTURE-DIRECTION, COLORS-V1-INTEGRATION-PLAN, platform-vision/framework-test docs, and the incoming §1-19 output) into one canonical page, with the others demoted by a pointer line each. This is the single highest-leverage doc edit available.

4. **Update your whole-project assessment** to reflect: three lineages (w89, Colors, Cakepanz), the byte-check rule, the no-pinning ruling, the no-framework-lock ruling, the cross-side stars feature, and the approximate-realism ruling.

5. **Answer the 8 decisions** in your assessment section 11 (track A/B/C, framework stay Svelte?, React removal, CI gate, 2 red tests, boundary check + save safeguards, roadmap order, w89 shell). The Owner needs these.

### B. When you are ready (not now, but soon)

1. **Cross-side stars design note:** clutch/OT, -6 penalty threshold, visual indicator. Implement when ready.
2. **Impact (pts) metric:** coordinate with the Owner when ready.
3. **Merge tracks:** when you decide it's the right time.
4. **Full GitHub Actions plan:** based on a future multisport multisimulation multiuser project. The Owner wants the full scope, not minimal. (But note: the Owner also said "no new infrastructure" and "after football ships" for multiplayer — so the CI plan should be comprehensive in scope but staged in execution.)

### C. What you should NOT do

- Do not pick a framework. The test hasn't finished.
- Do not re-pin the weights table. The weights are illusory; the dynamic formula is the goal.
- Do not build the platform/simulation-designer UI.
- Do not build basketball yet (design only).
- Do not build multiplayer/server/auth/database.
- Do not treat the λ objective as decided (binary is false; third objective + fluctuating dial are live).
- Do not delete React until determined it's out (Owner ruling: "don't delete react until we have determined react is out").

### D. What you should know about the council's consensus

- **Byte-check everything** is now a standing rule (Owner ruling, 2026-11-13). Broadcast to all seats.
- **Colors canonical, rebase the fork** (not merge) is the council's recommendation, but the Owner has not decided the track question yet. You decide when to merge.
- **The runtime purity test** (Z.ai's, 3/3 pass at pin) is the strongest single artifact in the delivery. It makes the server-ready boundary a test, not prose. Adopt it (with the tautology fix).
- **The value manifest** (pickle's proposal) is recommended by the council. Adopt if you agree.
- **The input-lifetime rule** (pickle's "no engine code may read state outside the payload") is recommended. Adopt if you agree.
- **The change-report protocol** (6 lines in the existing receipt) is recommended. Adopt if you agree.
- **Approximate realism, no strict guidelines** (Owner ruling). Do not gate builds on calibration targets; report and explain.
- **The Lab** (L0 invariants + seeded batch + flat report) should ship as Gate 3, immediately after Colors v1, not be deferred indefinitely. The council disagrees with your "defer" recommendation.

### E. Decisions I need from you (answer in your next filing)

1. When will you merge the tracks? (Your call, but the Owner wants to know your timeline.)
2. Will you adopt the runtime purity test? (Recommended: yes, with tautology fix.)
3. Will you adopt the value manifest? (Recommended: yes.)
4. Will you adopt the input-lifetime rule? (Recommended: yes.)
5. Will you adopt the change-report protocol? (Recommended: yes.)
6. What is your assessment of the fluctuating dial frame (λ as a context-dependent function)?
7. What is your assessment of the 12 static-to-fluctuating items?
8. What is your assessment of the Impact (pts) metric pitch?

---

*This prompt is efficient but comprehensive. It covers everything you need to know from the Owner's directives and the council's consensus. The Owner wants you to work on what you think matters most, in the order you think best, and to tell him when you are ready for the next phase.*

— Beam, council/beam, 2026-11-13T19:05Z
filePath: /Users/kosi/Desktop/wt/beam/inbox/20261113-1907-beam-prompt-for-claude.md