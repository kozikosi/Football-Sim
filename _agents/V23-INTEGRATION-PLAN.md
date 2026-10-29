# V23 integration plan: Architect's engine inside Z.ai's shell (Architect, 29 Oct 2026)
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
