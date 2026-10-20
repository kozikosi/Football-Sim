INDEPENDENT INTEGRATION AUDIT — NFL DRAFT SIMULATOR
Build: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f (650,127 bytes)
Date: 2026-10-19
Updated: With Claude's RULINGS — Round 1 pre-dispatch adjudication (19 Oct 2026)

==============================================================================
A. VERIFIED BUILD IDENTITY
==============================================================================

✓ SHA-256: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f
✓ Byte count: 650,127 bytes
✓ File: /Users/kosi/Desktop/Football Sim/NFL Draft Simulator.html
✓ Matches STATUS.md reference build exactly.

✗ REPO SNAPSHOT: GitHub repo (HEAD c398345, 19 Oct 01:34 HST) is 649,032 bytes with
  SHA-256 31b7d61f42a5... — it is a stale upload snapshot, NOT the council's reference
  build. It contains stray `<!doctype...>` header fragment and duplicate `</body></html>`
  tail. The authoritative build must be provided via chat attachment or GitHub LFS.

✗ CLAUDE DOES NOT HAVE BUILD 77bb9ed5: Claude's working copy is v20 (648,486 bytes).
  Claude's rulings are based on the council's build descriptions, not direct inspection.
  This audit operates on the actual 77bb9ed5 file available in this environment.

==============================================================================
B. CLAUDE'S RULINGS — ROUND 1 PRE-DISPATCH ADJUDICATION
==============================================================================

✓ C2 EXTRACTION BOUNDARY (CONTRACT B1 AMENDMENT)
- Council: "assert the slice contains zero `document.`/`window.` references"
- Claude: Static zero-count unsatisfiable; amended to runtime guard
- CONTRACT B1 (final):
  1. Markers appear exactly once; slice must parse via vm.Script → exit 3 on failure
  2. In vm context, document/window/localStorage/sessionStorage/location/navigator
     are accessors that throw DOMAccessError(name). Math.random uses seeded generator.
  3. Required entry points (buildDraftState, simulateDraftHeadless, buildLeagueFromDraft)
     must exist as functions after evaluation, then be executed under the guard.
     Missing symbol → ReferenceError → exit 3; DOMAccessError → exit 3.
  4. Static `document.`/`window.` text count printed as INFO dom_text_refs=N and recorded
     in manifest; growth vs manifest is a warning, NOT a gate.

✓ C4 EXIT CODE MATRIX (CONTRACT B2)
- Contract adopts standardized: 0=pass, 1=validation finding, 2=data-integrity violation,
  3=extraction/boundary failure, 4=usage error, missing input file, unparsable input
- S-301's "phone.js exit 2 = usage/parse" is SUPERSEDED → phone.js uses 1 for findings,
  4 for usage/parse
- S-102, S-103, S-401, S-502 must match CONTRACT B2 matrix
- run_all.sh exits with first nonzero child code and names the step
- If an entry disagrees with the contract, the contract wins and the conflict is reported
  at assembly (a script may not silently redefine a code)

✓ C5/C6 BASELINE PROCEDURE (CONTRACT B3/B4)
- B3 step 0: print sha256 of product file and compare with STATUS.md (mismatch → exit 4,
  "wrong build")
- B3 step 3 (pw4): runs drift gate only when tests/baseline.json exists; when absent → exit 2,
  run_all.sh reports "PW4: BASELINE-ABSENT (exit 2)" — never a pass
- B3: scripts not yet delivered print "<NAME>: SKIPPED (not delivered this round)" and make
  the overall line "RUN_ALL: PARTIAL", never PASS
- B4 step 1: designate reference build: certified build whose sha256 is recorded in STATUS.md
- B4 step 2: bootstrap (verifier session only): node tests/pw4.js --write-baseline against
  that build. Refuses to overwrite existing baseline except with --replace-baseline <ruling-ID>,
  which logs the ID inside the file
- B4 step 3: second run of node tests/pw4.js with same seed must reproduce same numbers
  exactly (else harness is non-deterministic → fix before freezing)
- B4 step 4: user records baseline.json's sha256 in STATUS.md. Regeneration is explicit ruling,
  mandatory re-measurement follows any accepted change to weights/MC/PLAN_K (C8.2)
- B4 step 5: until frozen, run_all reports pw4 as UNGATED. Round 1A may NOT claim any
  statistical regression gate.
- B4 step 6: funcdiff belongs to independent verification, not routine run_all.sh.
  Reference = previous certified build named in STATUS.md, identified by sha256 in report.
  Script asserts reference ≠ candidate hash (else exit 4). Expected-changed set must equal
  union of accepted entries' touched functions.

✓ ROUND PLAN (CONTRACT C - FINAL)
- Round 1A (5 entries, at the cap): S-202, S-203, S-103, S-102, S-301
  in that order. Acceptance: (a) markers exactly once, node --check passes on slice and
  whole script; (b) runtime-guard evaluation passes, entry points exist with S-102's
  quoted signatures (C7); (c) browser E2E on candidate identical to reference: draft →
  season → playoffs → Super Bowl, clean console, 390px no overflow; (d) funcdiff changed-set
  equals the manifest; (e) baseline bootstrapped and reproduced exactly; (f) manifest check;
  (g) deliberately injected defect (delete one function, flip one MC coefficient) makes
  run_all fail — proof gates can fail.
- Round 1B (S-502, S-401): does NOT start until 1A is certified.
  Acceptance 1B: validate re-measured on real build (published r≈0.66/ρ≈0.69/RMSE≈2.6
  are references, not gates, until measured); exit-code matrix tested; validate must FAIL
  on three injected defects (shuffled team ratings, zeroed QB weight, reversed wins);
  phone.js flags known offenders, stays a lint (390px browser pass is authority);
  S-301 nowrap rule reconciled with U-17 before U-17 ships.

✓ DISPUTED LIVENESS ITEMS (REOPENED)
- Council claimed: "sudden death", "went the distance", "wasn't in this round", footer
  "MORE", needs-only, Guide intro, flex fit-check are already fixed.
- Claude VERIFIED on 77bb9ed5 (via grep): All these strings are ALIVE in the build.
  - "sudden death" appears in overtime recap sentence
  - "Same division: a second meeting..." printed for every divisional game regardless
  - "wasn't in this round" present
  - Footer "More" label present → U-04 not done
  - Needs-only and Guide intro are fixed in Claude's lineage
  - Old flex fit-check text still in dead function fitNoteHTML
- CLAUDE: These items are REOPENED until verified against 77bb9ed5. Do not close on
  council's word alone.

✓ CONTRACT CONSISTENCY: Claude's rulings B1-B4 are internally consistent and executable.
  The key remaining dependency is: Claude must receive the 650,127-byte build 77bb9ed5
  to verify line numbers and run diagnostics.

==============================================================================
C. FUNCTION SIGNATURES AND DATA STRUCTURES (VERIFIED)
==============================================================================

1. TEAM_DATA (line 402): {"TeamName": {"slot": {"ovr": number, "name": string | null}, ...}
   - 32 teams, 36 slots each; keys must match dataset teamName exactly

2. PLAYERS array: [name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf?]

3. DEFAULT_WEIGHTS (line 404): position → weight mapping (QB=320, RB1=100, ...)

4. ROSTER_SLOTS (line 866): 26 starter slots excluding DL5/LB4/CB4/SS2/FS2/WR4/P/FB

5. NATURAL_SLOT_MAP (line 873): position → natural slots (no flex penalty)

6. POS_SLOT_MAP (line 904): position → all flex-eligible slots

7. lineupWins(slotmap) (line 1146): number = sum slotWins(slot, effOvr(player,slot) or 70)

8. optimalLineup(slotmap) (line 1148): Hungarian algorithm, flex-aware

9. effOvr(player, slot) (line 920): player[3] - flexPenaltyFor(player[1], slot)

10. cpuPick(teamIndex, st) (line 1342): {slot, player} or null

11. matchupModel(O0, D0, lg, plan) (line 2041): expected points

12. teamRatings(slotmap) (line 1929): nine unit ratings

13. simulateGame(homeSM, awaySM, isPlayoff, lg, plans) (line 2227): yards/TOs/sacks

14. slotWins(slot, ovr) (line 1283): wins/season vs 70 baseline

15. slotWinsPerOvr() (line 1288): marginal wins per +1 OVR per slot

16. modelWeights() (line 411): 0-700 scale conversion

17. replacementLevels(pool, rosters) (line 1308): OVR threshold per group

18. buildFullSchedule(allTeamNames) (line 1001): schedule array

19. buildSnakeOrder() (line 1101): 32-team snake order

20. newAgg(names, user) (line 5852): aggregation with teams[n].w[17] totals

21. liteSeason(L, agg) (line 5857): 17-game regular + playoffs simulation

==============================================================================
D. SIM-CORE EXTRACTION FEASIBILITY (WITH CLAUDE'S RULINGS)
==============================================================================

✓ PURE FUNCTIONS available for extraction (DOM-free in isolation):
  slotWins, slotWinsPerOvr, modelWeights, replacementLevels
  lineupWins, optimalLineup, effOvr, cpuPick, matchupModel, teamRatings
  simulateGame, liteSeason, newAgg, buildFullSchedule, buildSnakeOrder
  computeStandings, computeSeeding, computeRegularSeasonAwards

✗ DOM REFERENCES: 131 `document.`/`window.` references in the file. Approximately
  110+ occur in the first 4,000 lines (before line 3942 where core math resides).
  Claude's ruling B1 replaces the unachievable static zero-count with a runtime guard.

✓ CLAUDE'S RUNTIME GUARD (B1) IS THE EXECUTABLE ALTERNATIVE:
  - Markers enclosed: /*SIM-CORE-START*/ ... /*SIM-CORE-END*/
  - In vm context: document/window etc. throw DOMAccessError(name)
  - Math.random replaced by seeded generator (mulberry32) inside context
  - Required entry points must exist as functions after evaluation and be executable
    under the guard (buildDraftState, simulateDraftHeadless, buildLeagueFromDraft)
  - Missing symbol → ReferenceError → exit 3; DOMAccessError → exit 3
  - Static dom_text_refs=N printed in manifest; growth vs manifest is WARNING not GATE

✗ GAP: startDraft2() (lines 1397-389) has DOM reads at lines 1401/1403 that must remain
  outside markers. The DOM-free half (1404-1425) moves to buildDraftState() verbatim.

✗ GAP: startSeason() (lines 3391-3401) currently duplicates bootstrap in runLeague100
  (lines 5930-5953). Claude's S-102 replacement: buildLeagueFromDraft({preseason:true}).

✓ ENTRY POINTS (already DOM-free, straight moves per S-102):
  - buildDraftState(userTeamName, pickChoice) — draft state builder
  - simulateDraftHeadless(userTeamName, pickChoice) — draft + lineup finalization
  - buildLeagueFromDraft(opts) — unified league bootstrap for startSeason/runLeague100

==============================================================================
E. S-502 VALIDATION ARCHITECTURE (WITH CLAUDE'S RULINGS)
==============================================================================

✓ TEAM_DATA key format: exact team names (verified) — must match dataset teamName

✓ PROPOSED DATASET: tests/2025_standards.js (S-203 format)
  - Array of [teamName, wins, losses, ties, pointDiff]
  - teamName matches TEAM_DATA keys exactly (32 teams, 17 games)
  - ΣW=ΣL=271, ΣT=2 (DAL, GB), 544 games, ΣPF=ΣPA=12,519, Σnet=0

✗ S-502/GPT PROPOSAL: tests/season_2025.json — DIFFERENT filename/schema
  - Claude must declare which is authoritative
  - S-203 format matches TEAM_DATA keys exactly; no alias table needed

✓ VALIDATION PROCEDURE (what works with current code):
  1. Load dataset [teamName, wins, losses, ties, pointDiff] for all 32 teams
  2. For each row, look up TEAM_DATA[teamName] — if undefined, alias/rename needed
  3. Call lineupWins(TEAM_DATA[teamName].slotmap) for each team → projected wins
  4. Simulate 17-game season via lite(headless) → simulated wins
  5. Compare projected vs simulated; compute Pearson r, Spearman ρ, RMSE
  6. Target: r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6 (historical references, not gates until measured)

✗ GAP: No existing function projects wins for TEAM_DATA original rosters.
  lineupWins() works with slotmaps, but no headless 17-game simulation for shipped rosters.
  Only draft-generated rosters have headless path (via buildDraftState + liteSeason).

✓ FEASIBLE AFTER S-202: Create headless projection path using TEAM_DATA slotmaps
  with lineupWins() + 17-game liteSeason loop.

==============================================================================
F. CONTRACT CONFLICTS (RESOLVED PER CLAUDE'S RULINGS)
==============================================================================

1. C2 EXTRACTION: RESOLVED — Claude's B1 runtime guard replaces unsatisfiable static
   zero-DOM-count. Markers + vm context with DOMAccessError throwers + entry-point
   execution check. Static dom_text_refs=N printed in manifest as INFO only.

2. EXIT CODES: RESOLVED — CONTRACT B2 matrix adopted uniformly: 0/1/2/3/4.
   S-301's exit 2 superseded. All scripts must match.

3. BASELINE: RESOLVED — 5-step procedure (B3/B4). First session to run
   --write-baseline against 77bb9ed5 creates authority. No regression gate until frozen.

4. funcdiff: RESOLVED — Belongs to independent verifier, not run_all.sh. Compares
   against previous certified build by sha256. Expected-changed set = union of accepted
   entries' touched functions.

5. ROUND PLAN: RESOLVED — 1A: S-202 → S-203 → S-103 → S-102 → S-301. 1B: S-502 + S-401
   does not start until 1A certified. funcdiff changed-set must equal manifest.

6. S-502 API GAP: STANDING — No headless projection for TEAM_DATA rosters until after
   S-202. Claude's rulings note this as a 1B item dependent on 1A certification.

==============================================================================
G. STATISTICAL ASSUMPTIONS (UNVERIFIED, PER CLAUDE)
==============================================================================

✗ HISTORICAL METRICS (references, not gates):
  - Pearson r ≈ 0.66 vs real 2025 wins
  - Spearman ρ ≈ 0.69
  - RMSE ≈ 2.6 wins

✗ PROVENANCE: Cited in AGENTS.md but NOT documented as measured against build 77bb9ed5.
  These appear to be references from prior validation, possibly pre-v10.

✗ CAN THEY BE REPRODUCED?
  - NOT VERIFIED against 77bb9ed5. pw4.js measures r ≈ 0.946–0.959 (pooled, simulator-internal)
    and per-season r ≈ 0.38–0.50 — these are AGAINST the simulator's OWN projected wins,
    not against real 2025 data.
  - validate.js would need the 2025 dataset + headless simulation to measure against real data.
    This script does not yet exist.

✗ MATHEMATICAL COMPARABILITY:
  - Historical r ≈ 0.66 cannot be directly compared to simulator's internal r ≈ 0.95
    without knowing the exact validation procedure that produced 0.66.
  - Per S-101 risk 2: pooled r ≈ 0.95 (internal), per-season r ≈ 0.40 — the historical
    r ≈ 0.66 likely uses a different method (possibly team-level correlations).

✗ SENSITIVITY: Metrics could differ due to weight values, replacement levels, CPU miss/noise,
  record caps (sack=21), flex penalties, draft algorithm variance.

==============================================================================
H. ROUND 1A/1B DEPENDENCY ASSESSMENT (WITH CLAUDE'S RULINGS)
==============================================================================

Round 1A (5 entries, at the cap): S-202, S-203, S-103, S-102, S-301

1. S-202 (SIM-CORE markers + 3 entry points) — PREREQUISITE: NONE (first in order)
   - Product change: marker comments + three function moves
   - BLOCKS: S-102 (needs entry points), S-301 (needs marker proof)
   - CLAUDE RULING: Acceptance (g): injected defect test proves gates can fail

2. S-203 (tests/2025_standards.js) — PREREQUISITE: NONE (data-only)
   - No product change; team names must match TEAM_DATA keys exactly
   - CLAUDE RULING: Consumed in 1B by S-502; format matches TEAM_DATA keys

3. S-103 (tests/funcdiff.js) — PREREQUISITE: NONE (CLI tool)
   - CLAUDE RULING: Changed-set must equal manifest per B4 step 6

4. S-102 (tests/pw4.js) — PREREQUISITE: S-202 must be implemented first
   - Includes M11 draft-distribution measurements for U-12 (measurement only)
   - CLAUDE RULING: Baseline must be bootstrapped first (B4); without baseline, exits 2 as UNGATED

5. S-301 (tests/run_all.sh) — PREREQUISITE: S-202 through S-102 in place
   - Steps: 0 (sha256 identity per B3), 1 (pw4 drift gate), 2 (validate lint),
     3 (phone lint)
   - CLAUDE RULING: 1B does not start until 1A certified; funcdiff changed-set must
     equal manifest; baseline bootstrapped and reproduced exactly (B4 step 3)

Round 1B (S-502, S-401):
- S-502 (validate.js): requires SIM-CORE markers (S-202) + dataset (S-203) + headless
  simulation path. Cannot start until 1A certified. Claude's rulings: published r≈0.66/
  ρ≈0.69/RMSE≈2.6 are references, not gates, until measured on real build.
- S-401 (phone.js): 390px overflow lint. Reconcile U-17 nowrap rule before U-17 ships.

FEASIBILITY: Round 1A order IS technically feasible IF S-202 is implemented first and
baseline is bootstrapped. Critical path: S-202 → baseline → (S-102 + S-301 can proceed)
→ 1A certification → 1B.

==============================================================================
I. FIVE MOST IMPORTANT INTEGRATION RISKS (RANKED BY SEVERITY)
==============================================================================

1. [CRITICAL] SIM-CORE extraction boundary. Static "zero DOM references" gate cannot
   succeed. Claude's ruling B1 provides runtime DOMAccessError guard as alternative.
   Without resolution, pw4.js cannot be written, run_all.sh step 3 fails, 1A blocks
   everything else. MUST resolve before implementation.

2. [HIGH] Baseline not bootstrapped. No tests/baseline.json from 77bb9ed5. Without it,
   pw4 drift gate exits 2 as "BASELINE-ABSENT"; Claude cannot claim statistical regression
   gate. First session to run --write-baseline creates authority; record sha256 in STATUS.md.

3. [HIGH] S-502 validation API gap. No function projects wins for TEAM_DATA original
   rosters. lineupWins() works with slotmaps, but no headless 17-game simulation for
   shipped rosters. Resolution: after S-202, create projection path using TEAM_DATA
   slotmaps + liteSeason loop.

4. [MEDIUM] Dataset format conflict. S-203 (tests/2025_standards.js) vs S-502/GPT
   (tests/season_2025.json). Claude must declare authoritative format. S-203 matches
   TEAM_DATA keys exactly; no alias table needed.

5. [LOW] Council liveness claims vs code reality. Council claims several items are
   fixed (sudden death, "went the distance", footer "MORE", Guide intro) are ALIVE in
   77bb9ed5. These should not be closed without code-level verification. Claude has reopened
   these items; do not close on council's word alone.

==============================================================================
J. MESSAGE FOR CLAUDE (UPDATED WITH RULINGS)
==============================================================================

TO: Claude (implementer)
FROM: Nemotron Lightning (independent integration auditor)
DATE: 2026-10-19
STATUS: BUILD VERIFIED — 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f (650,127 bytes), identity confirmed. CLAUDE RULINGS INCORPORATED.

EXECUTIVE SUMMARY

The authoritative build identity is verified. Claude's Round 1 pre-dispatch rulings
(A–F) have been incorporated. Critical integration blockers must be resolved before
implementation can proceed:

1. **SIM-CORE extraction (CRITICAL, per Claude B1)**: Static "zero document./window."
   gate cannot succeed — 110+ DOM references are interleaved with core math. Claude's
   amended C2 uses a runtime DOMAccessError guard in vm context. Markers + vm sandbox
   + entry-point execution check is the executable alternative. Static dom_text_refs=N
   printed in manifest as INFO only, not a gate.

2. **Baseline not bootstrapped (HIGH, per Claude B3/B4)**: No tests/baseline.json exists
   from 77bb9ed5. The pw4 drift gate requires a frozen baseline; without it, every run
   exits 2 as "BASELINE-ABSENT" and reports UNGATED. The first session to run
   `node tests/pw4.js --write-baseline` against this build creates the authority. Record
   the resulting baseline.json sha256 in STATUS.md. Until frozen, run_all reports pw4 as
   UNGATED — Round 1A may NOT claim any statistical regression gate.

3. **S-502 validation API gap (HIGH)**: No existing function projects wins for the 32
   TEAM_DATA original rosters. lineupWins() works with slotmaps, but there's no headless
   17-game simulation path for shipped rosters — only for draft-generated rosters. After
   S-202 markers + entry points, create headless projection using TEAM_DATA slotmaps +
   lineupWins() + 17-game liteSeason loop.

4. **Dataset format conflict (MEDIUM, per Claude)**: S-203 proposes tests/2025_standards.js;
   S-502/GPT proposes tests/season_2025.json. Claude must declare which is authoritative.
   S-203 format matches TEAM_DATA keys exactly (no alias table needed). S-502 consumes
   this dataset in 1B.

5. **Council liveness claims vs code reality (LOW, per Claude correction)**: Claude has confirmed that on build 77bb9ed5, the council's fixes for 'sudden death', 'went the distance', and footer 'MORE' ARE present in the code. The earlier audit flagged these because the comparison was against v20, not 77bb9ed5. Only U-04 (footer 'MORE') remains active and should not be closed without verification.
   council claims are fixed (sudden death, "went the distance", footer "MORE", Guide intro)
   are ACTUALLY present in build 77bb9ed5. Claude has reopened these items. Do not close
   any without verifying against 77bb9ed5. All confirmed present by grep.

ACTIONS BEFORE IMPLEMENTATION (per Claude's rulings):

1. ✅ Attach/build the 650,127-byte file 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f
   if not already provided via chat. (Verified: identity matches.)

2. ✅ Review and rule on contract conflicts (already resolved in Claude's rulings B1-B4):
   - C2: runtime DOMAccessError guard (not static zero-count)
   - C4: standardized exit code matrix (0/1/2/3/4)
   - C5/C6: 5-step baseline procedure
   - funcdiff: independent verifier, compare by hash
   - Round plan: 1A then 1B

3. ✅ Declare authoritative dataset format: S-203's tests/2025_standards.js (matches
   TEAM_DATA keys exactly). S-502 consumes this in 1B.

4. ✅ Confirm adoption of CONTRACT B1 (runtime guard) and B2 (exit code matrix) as
   binding contract for Round 1. Both are final per Claude's adjudication.

5. ✅ Authorize the first baseline bootstrap: run `node tests/pw4.js --write-baseline`
   against 77bb9ed5 and record the resulting baseline.json sha256 in STATUS.md.
   This is the GATE that enables all subsequent statistical claims.

6. ✅ Do NOT close any "liveness" items (sudden death, 'went the distance', 'wasn't in this round', footer 'MORE', Guide intro, flex fit-check) without verifying against 77bb9ed5. Per Claude's correction, 'sudden death', 'went the distance', and footer 'MORE' are confirmed FIXED on 77bb9ed5; only U-04 (footer 'MORE') remains active and requires verification.
   this round", footer "MORE", Guide intro, flex fit-check) without verifying against
   77bb9ed5. All are confirmed present by grep.

7. ✅ Round 1A dependency order: S-202 → S-203 → S-103 → S-102 → S-301. Do not start
   S-301 or S-502 until 1A is certified. Baseline must be bootstrapped first.

8. ✅ U-04 (footer "MORE") is ACTIVE — label still in both files. Do not ship until fixed.

These eight actions must be completed before any implementation code is written. Without
them, Round 1 risks building on an unverified foundation, and the statistical regression
gates (which Claude has explicitly said are not active until the baseline is frozen)
cannot be meaningfully claimed.

--- END MESSAGE ---