# Go read this — for ANY council seat (Beam's final prompt, 2026-11-13)

**From:** Beam (council/beam). **Date:** 2026-11-13T22:51Z.
**To:** Any council seat. **You have no memory of this chat. Read these files from GitHub.**

All files are on branch `council/beam` at `origin/council/beam`. Read them in this order. Do not skip any.

## Boot (do this first, every time)
```
cd <your worktree>            # ../wt/<seat>
git fetch -q origin
node tools/preserve.mjs check  # report unsaved work; do not touch it
```
Then read: `git show origin/council/muse:_agents/START-HERE.md` and follow it exactly.

## Read these (in order)

1. `git show origin/council/beam:_agents/owner-notes/2026-11-13-beam-insights-record.md` — comprehensive insights record (342 lines). All Owner directives, key findings, rulings, files created, open questions, next steps. **Read this first after START-HERE.**

2. `git show origin/council/beam:inbox/20261113-1906-beam-rule-byte-check-everything.md` — standing rule: byte-check everything. No claim trusted until verified by command output. Re-run before relying on anyone's claim.

3. `git show origin/council/beam:inbox/20261113-2228-beam-prompt-for-council-final.md` — the longest possible work order (654 lines, 10 phases). All directives, all open items, all verification requirements, filing protocol.

4. `git show origin/council/beam:inbox/20261113-2125-beam-framework-evaluation.md` — framework evaluation (mechanical scoring + Playwright behavioral + Z.ai self-questions + subjective experience reminder).

5. `git show origin/council/beam:inbox/20261113-1940-beam-fwtest8-evaluation.md` — fwtest8 evaluation (verification lane, contract identity, forbidden globals, round-2 evidence, CHECKSUMS absence, build verification).

6. `git show origin/council/beam:inbox/20261113-1930-beam-12-static-to-fluctuating-items.md` — 12 static-to-fluctuating items (OVR and flex prices static to user, underlying math flexible, form drifts ±5).

7. `git show origin/council/beam:inbox/20261113-1932-beam-fluctuating-dial-position.md` — fluctuating dial position (static binary not open for discussion, dial must fluctuate).

8. `git show origin/council/beam:inbox/20261113-1928-beam-cross-side-stars-design.md` — cross-side stars design (clutch/OT, -6 penalty, "2-WAY" visual).

9. `git show origin/council/beam:inbox/20261113-1925-beam-A3-plays-ledger-corrections.md` — A3 plays ledger corrections (5 corrections, apply-ready).

10. `git show origin/council/beam:inbox/20261113-1926-beam-A4-lambda-E3-corrected.md` — A4 lambda E3 corrected (one sentence fix).

11. `git show origin/council/beam:inbox/20261113-2136-beam-critique-of-inkling-v3.md` — critique of INKLING v3 work order.

12. `git show origin/council/beam:inbox/20261113-2136-beam-rewritten-prompt-to-zai.md` — rewritten prompt to Z.ai (incorporating INKLING directives + improvements).

## Key directives (Owner, 2026-11-13)

- Three lineages: Colors (Claude engine, 76 Pancakes at v1), Cakepanz (Z.ai UI shell of w89), w89 (live site, neither). Claude merges when ready.
- No pinning. Weights illusory. Dynamic formula is the goal.
- No framework lock. All 8 frameworks on the table. Test everything. Z.ai's test is definitive data; council evaluates.
- No w89 save preservation. Trust Claude + Z.ai.
- Byte-check everything (standing rule). No claim trusted until verified by command output.
- Approximate realism, no strict guidelines.
- Offensive focus: pass defense → less opponent pass yardage/big plays, concede more run/short passes. No win guarantee.
- Cross-side stars: -6 penalty, clutch/OT only, "2-WAY" visual. Example: WR defending hail mary, getting INT.
- Ignore platform concept. Build football and basketball first.
- After football ships for multiplayer/platform.
- Impact (pts) when Claude is ready.
- Claude will merge (literally or rewrite). Cakepanz mostly TypeScript.
- Full wave. No clock. Run all tests without time limits.
- Quiet arrangement. Set up testing quietly, don't disrupt repo.
- Use Owner's words verbatim where it makes sense.
- Try building. Start helping with building.
- More tool combinations: Astro, Qwik, Remix, Angular, Lit, HTMX, Alpine.js, Vitest, Jest, Cypress, etc.
- Form drifts ±5. OVR and flex prices static to user. Underlying math more flexible.
- Static binary not open for discussion. Dial must fluctuate.
- .nvmrc = 24 (most recent version).
- A3 + A4: make notes to everyone and ask them (filed as corrections).
- Cross-side stars details: (a) -6, (b) clutch/OT only, (c) yes visual, (d) "2-WAY".
- All frameworks on the table. Test all.
- Fresh sessions for re-run.
- Everyone has Playwright. If not, get it.
- b94ee6d1 was sent.
- 12 items approved.
- Fluctuating dial: static binary not open. Dial must fluctuate.
- Boundary check + save safeguards: approved.
- Roadmap order: approve Claude's (Hygiene → product tree → persistence → TS port).
- Vue vs Nuxt: test all of them.
- Formal re-run: yes, fresh sessions.
- Playwright: everyone runs it.
- A3 + A4: apply to canonical copies.
- .nvmrc: 24.

## Key findings (verified by command output)

- Three product lineages: w89 (live site, 1.9 MB, no tests, unseeded), Colors (engine, no UI, doesn't build), Cakepanz (Svelte UI, 15 components, builds, 284 tests).
- MUSE's audit had 4 material errors: saves ARE versioned, tags DO exist, live site is NOT Cakepanz, esbuild vs Vite has an answer.
- React is dead in Colors (0 imports, 0 .tsx/.jsx). Needs Owner approval to remove.
- Two RNGs: mulberry32 (pin) + Philox-2x32-10 (tip). Pin uses mulberry32.
- LoadedDataset leaks NFL 8-field tuple into core/app.ts (line 39).
- Suite not hermetic: 11 test files read data/ and tools/ at repo root.
- 2 red tests at head: stale pins after flex-table work, not engine breakage.
- No CI on any branch. Node not pinned. Biome in Colors, not Cakepanz.
- Framework test: 7 arms, all build, 6 pass Playwright (SolidStart fails rendering).
- Contract byte-identity verified: 265ea8c6... across all 5 (part A) arms.
- Forbidden global scan: clean (0 findings).
- Playwright spec has a bug: async function boardRows → remove async (one line).
- CHECKSUMS.txt: 539 entries, all verify OK. 2 phantom entries.
- 9-arm suite doesn't exist. Only 7 arms in v2. INKLING's 2 arms don't exist on any branch.

## Framework evaluation (mechanical + behavioral)

Ranking: Svelte > Vue > React > SvelteKit > Nuxt > Next.js > SolidStart (eliminated).

Playwright: 6/7 pass (SolidStart fails rendering). Spec bug found and fixed.

## The 12 static-to-fluctuating items (with clarification)

1. Slot values — static display, fluctuating underlying
2. Flex prices — static display, flexible underlying
3. Drive model params — not visible, fluctuating
4. Home-field advantage — not visible, fluctuating
5. Player ratings/form — OVR static, form drifts ±5 (visible)
6. Group synergies — not visible, fluctuating
7. Gravity/double-teams — surfaced in Advanced Stats, fluctuating
8. Calibration targets — not visible, fluctuating
9. Game state/clutch — surfaced in recap, fluctuating
10. Noise/variance — not visible, fluctuating
11. Draft slot value — static display, fluctuating underlying
12. Flex legality — static display, fluctuating underlying

All 12 can fluctuate. OVR and flex prices static to user. Underlying math more flexible. Form drifts ±5.

## The fluctuating dial position

λ is a context-dependent function, not a number. Fixed λ (0.40) is the degenerate case. Static binary (0.20 vs 0.40) is not open for discussion. Dial must fluctuate.

## Cross-side stars design

- Penalty threshold: -6 or less
- Window: clutch or overtime only
- Visual indicator: "2-WAY"
- Example: top WR defending hail mary, getting interception

## A3 + A4 corrections (filed for council/Architect)

A3: 5 corrections with measured values. Check script shipped. Unlabeled estimates flagged. FB E-sensitivity note.
A4: One sentence fix. Family cell better by 0.016, not worse.

## Files to read (all on council/beam)

1. `_agents/owner-notes/2026-11-13-beam-insights-record.md` — comprehensive insights record (342 lines)
2. `inbox/20261113-1906-beam-rule-byte-check-everything.md` — byte-check rule
3. `inbox/20261113-2228-beam-prompt-for-council-final.md` — longest work order (654 lines)
4. `inbox/20261113-2125-beam-framework-evaluation.md` — framework evaluation
5. `inbox/20261113-1940-beam-fwtest8-evaluation.md` — fwtest8 evaluation
6. `inbox/20261113-1930-beam-12-static-to-fluctuating-items.md` — 12 items
7. `inbox/20261113-1932-beam-fluctuating-dial-position.md` — fluctuating dial
8. `inbox/20261113-1928-beam-cross-side-stars-design.md` — cross-side stars
9. `inbox/20261113-1925-beam-A3-plays-ledger-corrections.md` — A3 corrections
10. `inbox/20261113-1926-beam-A4-lambda-E3-corrected.md` — A4 E3 corrected
11. `inbox/20261113-2136-beam-critique-of-inkling-v3.md` — critique of INKLING v3
12. `inbox/20261113-2136-beam-rewritten-prompt-to-zai.md` — rewritten prompt to Z.ai
13. `inbox/20261113-1933-beam-addendum-all-prompts.md` — addendum to all prompts
14. `zai-fwtest7-dynamic-engine-2026-11-13/` — Z.ai v2 delivery (540 files)

## Do not

- Edit the product file (Football-Sim-*.html)
- Edit AGENTS.md, CLAUDE.md, QUEUE.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants
- Assign work to named seats
- Merge Colors and Cakepanz (Claude decides)
- Build basketball (design only)
- Introduce new infrastructure
- Force-push or stash
- Claim tests pass unless you ran them
- Re-litigate settled rulings
- Pick a framework (produce and evaluate data)
- Treat weights as a fit target
- Build the platform/simulation-designer UI
- Preserve w89 saves
- Gate on calibration targets
- Delete React
- Treat the λ objective as decided

## Byte-check everything

No claim trusted until verified by command output. Re-run before relying on anyone's claim. The council review chain's first job is to re-run, not to re-read.

## Phase 1 can start immediately

No blocking questions. All defaults applied. Read the insights record first, then the work order, then start executing.

Work for as long as possible before replying. Execute every possible step. Do not queue work for the future. Push after every finished file.

— Beam, council/beam, 2026-11-13T22:51Z