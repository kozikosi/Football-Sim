# COLORS V1 integration plan: Architect's engine inside Z.ai's shell (file was named V23-INTEGRATION-PLAN.md; the Owner renamed the build "Colors v1" on 28 Oct, file `Football-Sim-Colors-v1.html`) (Architect, 29 Oct 2026)
Basis: Z.ai's `HANDOFF-TO-CLAUDE.md` (w33, read in full) and my function-hash diffs of w30 and w33 against Pre-Colors (`_agents/W30-ENGINE-DIFF-2026-10-28.md`). Labels: VERIFIED = I ran it; REPORTED = Z.ai's word.
Shell: `Football-Sim-Z-post-blue-w33.html`, sha256 `68d105f0100db3eb…`, 1,440,296 B (REPORTED current; Owner has not yet played w32/w33). Not a build.

## Findings (VERIFIED, w33 vs Pre-Colors)
- Identical: `playGame`, `applyOffPlan`, `applyDefPlan`, `optimalLineup`, `effOvr`, `flexPenaltyFor`, `modelWeights`, `slotWinsPerOvr`, `cpuBias`, `generateGameSummary`, `playByPlay`, `PLAN_K`.
- Changed: `simulateGame`, `matchupModel`, `teamRatings`, `cpuPick` (QB-before-round-25 rule, REPORTED), `boardEntries`, `computeRegularSeasonAwards`; constants `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `RATING_SPECS`, `MC`. 136 functions changed, 55 added; Math.random 62 sites.
- **Protected constants moved without a pinned approval I can find.** `DEFAULT_WEIGHTS` in w33 reads QB 320, RB1 100, WR1 60, K 5, a duplicate `DL5` key. The handoff says "QB anchored at 1000"; the source says 320. UNRESOLVED; the two statements cannot both hold for this literal (a later payload block may rebind it, not checked). My Owner-approved table (spec §2) supersedes it either way.
- The shell's engine/UI seam is real: Z.ai lists 10 contracts (§3 of the handoff). Ordered payload blocks (w13, w27, w29, w30, w32) re-bind functions; last definition wins.

## Decision: transplant the engine into the shell. Do not write a second UI, do not refactor first.
Reasons: the Owner is happy with the UI; the seam is a set of named functions; a refactor now would move 1.4 MB of UI-coupled code that the engine extraction (Stage 2) will move later anyway, once the engine is one seeded, DOM-free block.

## Steps (each ends in a gate; none starts before the previous passes)
0. **Seam harness.** Pull Z.ai's `w32_verify.js` (97 checks) and `w32_stress.js` (20) from the w32/w33 folders; run both on the untouched shell for a baseline.
1. **Consolidate the engine functions.** One delimited `SIM-CORE` block that is the only definition of each engine function; delete the overridden duplicates in payload blocks (engine functions only; UI payloads stay). Gate: suites unchanged, function list identical.
2. **Seeded RNG.** One `rng()` through all 62 `Math.random` sites (T-20261022-claude-2). Gate: same seed gives byte-identical season; suites pass.
3. **Constants.** Install the 32-spot table, flex REV 2 (`flex.json`), DL5/TE3/WR4, defensive posture, fitted literals (`results/engine-patch-2026-10-28-recv.js.txt`). Gate: `tools/mathlab/run-all.sh` ALL PASS on the new file; re-pin hashes in `MERGE-MANIFEST.md`.
4. **Math functions.** Replace `teamRatings`, `matchupModel`, `simulateGame` with the lab versions, keeping the shapes in handoff §3 (nine unit ratings; events `{q,t,pts,type}`; `defScores` with `forcer`/`sameMan`). Keep the QB-25 rule in `cpuPick`; keep the render-time integer law; the kicker damping in `ensureRatings` is reviewed against K = 200.
5. **Memoise** `simRecs()` by `draftSim.pos` (12 forward runs per board render).
6. **Replace silent `try/catch`** around `renderDraftLive`/`setActiveTab` with a visible SETBACK note.
7. Test order `_agents/TEST-ORDERS/V23-1.md`; a seat that wrote none of it verifies.

## Blockers and asks (for the Owner)
1. 50-OVR player data (P-201): a 32-round draft needs 96 TE and 128 WR; pool has about 51 and 142. Without it V23 ships with the current round count.
2. Z.ai's w33 changed protected constants (above). Default: my approved table replaces them; tell me if any Z.ai value was an Owner instruction.
3. The Owner's "go" on V23 (spec §9).
Not checked: w33 behaviour in a browser; the w32 suites; whether payload blocks rebind `DEFAULT_WEIGHTS`; `simulateGame`/`matchupModel` line diffs.

## Update 28 Oct 17:16 HST (Owner: permission to build; name Colors v1)
**Z.ai flex vs REV 2 (VERIFIED by reading both).** w33 `FLEX` is the Owner's 21 Oct addendum; `flex.json` is REV 2 (26 Oct) and governs. Main differences (REV 2 / w33):
- Missing in w33: NICKEL and DIME as destinations for WR, TE, EDGE, MIKE/ILB, SS, FS, CB (w33 has CB3 only for SS and MIKE/WILL/SAM); FB as a destination for RB, TE, OL, DT, EDGE, ILB; DL5; every REV 2 entry for FB/P (`FB:{}`).
- Different values: QB (WR/SS/FS 6 vs RB/WR 6, no S); RB->WR 4, FB 2 (w33: TE only); WR->RB 4, CB 6 (w33: RB 6, CB 4); TE->RB 6 (w33: 4), TE->OL/DL 6 (absent); EDGE->OLB 2 (w33: WILL/SAM 0), ->ILB 4 (MIKE 4), ->NICKEL 6 (absent); MIKE->S 6, NICKEL 6, DIME 6 (w33: SS 2, FS 4, CB3 4); OLB->EDGE 4, DT 6, NICKEL 4, SS 6 (w33: 2, 4, 2, 4); SS->CB 6, ILB 6, OLB 4, WR 6 (w33: 4, 4, 2, 4); FS->NICKEL/DIME 0 (absent); CB->NICKEL/DIME 0 (absent); P->K 2 (w33: 0).
- Extra in w33, absent in REV 2: OL->RB 6, DT->LB 4, DT->RB 6, FS/CB->LB 4-6, FS/CB->TE/RB 6.
Resolution: REV 2 is installed in Colors v1 (spec §12.2 adds DL5). Z.ai's shell reads `flexPenaltyFor`, so no UI change is needed.

**Data.** The Owner's new Madden file did not arrive: BOC's CSV is header-only and the Beam raw/JSON files are not on its branch (VERIFIED). Request: attach the file (or push `madden-ratings-raw.txt`) so I can parse it (name, pos, team, OVR, SPD, STR). Consequences: AGENTS.md §7 "1,200-player dataset frozen" is superseded by the Owner; the ratings fit (z-score weights, returner score, K/P curves) is re-run on the new distribution before the table is trusted; the pool-size blocker (P-201) is likely resolved (1,941 players REPORTED by Beam). Model input: OVR only for slot value; SPD (and STR where a role needs it) allowed in the returner score and in tie-breaking; the browser and the board show only OVR, STR, SPD.

**3&O / 4&O cinematics are not honest today (VERIFIED, w33 `zpbLastDrivesHTML`).** Its own comment says the model has no drives; it picks a "plausible yard line" from `12 + (i*7 + |margin|*3) % 26`, labels any quiet stretch in the last quarter a 3&O, and names the carrier and returner from season box-score ranks. None of that comes from the engine. To make it honest the engine needs a drive model: a generated drive sequence (start spot, plays, yards, result: TD, FG, punt, turnover, downs, end of half) conditioned so that drive yards, points, punts, takeaways and sacks sum to the team totals the current model produces (identity checks in the test order). 3&O (three plays, punt), 4&O (turnover on downs) and yard lines then come from the same data as the score. This is a new engine stage ahead of the cinematics work and replaces the fabricated drive chart; PRIORITIES entry to follow. The shell's `{q,t,pts,type}` events stay the contract; drives add `g.result.drives[]`.

**Order now:** steps 0-3 of the plan above, then the drive generator, then steps 4-7; new data refit is gated on the file.

## ADDENDUM 31 Oct (Architect): staged onboarding onto the newest wX shell (Owner-approved, verbatim in `_agents/owner-notes/2026-10-31-w50-onboarding-decisions-verbatim.txt`)
Shell = the newest `Football-Sim-Z-post-blue-wN.html` on `origin/council/zai` (w50 today, sha256 `3d5f7d0b973ea14b…`, 1,559,883 B, VERIFIED by `sha256sum` of the extracted file; Z.ai's own md5 is `babc5dc1…`). Re-check for a newer wN before every stage; a stage starts from the newest shell, never from a stale one. Z.ai's seam is the ten contracts of `HANDOFF-TO-CLAUDE.md` §3; w50 is not a build (AGENTS.md §2).

> **SUPERSEDED 4 Nov 2026 (Owner: faithful rebuild, no shell adapter, no `window.Colors`; see `_agents/owner-notes/2026-11-04-answers-to-5-decisions-verbatim.md`).**

**Shape (portable to React and Svelte).** `colors/src/api/store.ts`: pure, DOM-free `createStore()` with `getState()`, `subscribe(fn)`, `dispatch(action)`; the state is plain JSON-able data, and the same store is used by the shell (through a bundled `window.Colors`) and by a future React/Svelte view (one hook or one Svelte store over the same three functions). `colors/src/api/seam.ts`: adapters that return exactly the shapes of Z.ai's contracts 1-10, so the shell calls the engine where it called its own math. `build/build.mjs` emits one IIFE; the shell inlines it.

**Compatibility found before starting (VERIFIED by reading `ratings.ts`):** `Ratings` already holds the nine units the shell reads (`olRun, olPass, rb, qb, rec, passRush, frontRun, coverage, kicker`) plus extras, so contract 3 needs no remapping. UNKNOWN until built: the event shape (`{q,t,pts,type}` with TD|FG|SAF|TO versus my `ScoreEvent{kind,period,at}`), and `g.detail` stat keys.

**Stages (each ends with tests and a pushed hash; a later stage does not start until the earlier one passes the shell's own suites).**
0. Store + seam skeleton + build script; unit tests; shell untouched.
1. Seeded RNG through the shell's 61 `Math.random` sites is replaced by the engine's `rng`; swap contracts 3, 4, 1 (`teamRatings`, `matchupModel`, `simulateGame`). Gate: the shell's `w50_live.js` stays green and draft -> season -> playoffs runs with a clean console.
2. Contracts 5, 8, 9: wins-value family, CPU draft, weights. **Weights are mine to set (Owner 31 Oct): QB up to 1000, every other weight an integer ending in 0 or 5**; the monotone-quantisation contract in AGENTS.md §3 is kept, and the table plus its re-pin go in the same commit.
3. Contract 7: season scaffolding, standings, seeding, playoffs.
4. Contracts 2, 6, 10: `g.detail`, ratings, recaps, awards, previews.
Non-aesthetic shell edits are allowed where the engine needs them; an aesthetic edit only if clearly broken, otherwise I ask the Owner first.

**Owner ruling 31 Oct 20:23 (verbatim in the owner-notes file): the engine's shapes win.** Z.ai's ten contracts are a map of where the shell calls the math, not a specification to match. The store and seam expose the engine's own structures (`ScoreEvent{kind,period,at}`, `PlayerLine`, `Recap`, the 32-spot `SlotId`s); where the shell reads a different shape, the shell's reading code is changed (non-aesthetic edits only, aesthetics per the earlier rule). The earlier line "keep the shapes" in the handoff is superseded. Consequence: the seam adapter is thin and mostly pass-through, and the shell's renderers (replay, recap, stat tables) are edited to read engine data directly.
