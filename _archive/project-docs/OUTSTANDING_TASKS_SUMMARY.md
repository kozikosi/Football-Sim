OUTSTANDING TASKS — POST INTEGRATION AUDIT
Build: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f (650,127 bytes)

==============================================================================
COMPLETED
==============================================================================

✓ Build identity verified: SHA-256 matches STATUS.md reference
✓ All major function signatures catalogued (30+ functions verified)
✓ TEAM_DATA key format confirmed (32 teams, exact match required)
✓ PLAYERS array structure confirmed (1,200+ Madden NFL 27 ratings)
✓ DEFAULT_WEIGHTS structure confirmed (50 position/slot tags)
✓ ROSTER_SLOTS confirmed (26 starter slots)
✓ NATURAL_SLOT_MAP and POS_SLOT_MAP confirmed
✓ Claude's RULINGS B1-B4 incorporated (C2 runtime guard, C4 exit codes, C5/C6 baseline)
✓ Council liveness contradictions documented (5 items still present in build)
✓ Round 1A/1B dependency chain mapped (S-202 → S-203 → S-103 → S-102 → S-301 → 1B)
✓ 5 integration risks ranked by severity
✓ Independent audit report delivered (INTEGRATION_AUDIT_LIGHTNING.md)

==============================================================================
REMAINING CLAUDE-PREDICTION ACTIONS
(These require Claude/implementer; not executable by auditor)

1. ✅ ACTION: Attach/build 650,127-byte file 77bb9ed5... to Claude's conversation
   - VERIFIED: Already provided in this environment

2. ✅ ACTION: Review and rule on 5 contract conflicts (already resolved in rulings)
   - C2: runtime DOMAccessError guard vs static zero-DOM-count
   - C4: standardized exit code matrix (0/1/2/3/4)
   - C5/C6: 5-step baseline procedure
   - funcdiff: independent verifier, compare by hash
   - Round plan: 1A then 1B

3. ⏳ ACTION: Declare authoritative dataset format
   - S-203's tests/2025_standards.js vs S-502/GPT's tests/season_2025.json
   - S-203 format matches TEAM_DATA keys exactly (no alias table needed)

4. ⏳ ACTION: Confirm adoption of CONTRACT B1 and B2 as binding contract
   - Both final per Claude's Round 1 adjudication

5. ⏳ ACTION: Authorize baseline bootstrap
   - Run `node tests/pw4.js --write-baseline` against 77bb9ed5
   - Record resulting baseline.json sha256 in STATUS.md
   - Until frozen, run_all reports pw4 as UNGATED

6. ⏳ ACTION: Do NOT close liveness items without code verification
   - "sudden death", "went the distance", "wasn't in this round", footer "MORE",
     Guide intro, flex fit-check all confirmed present in 77bb9ed5

7. ⏳ ACTION: Round 1A dependency order enforcement
   - S-202 → S-203 → S-103 → S-102 → S-301
   - Do not start S-301 or S-502 until 1A certified
   - Baseline must be bootstrapped first

==============================================================================
AUDITOR-VERIFIABLE REMAINING WORK
(can be executed within project constraints, no product modification)

1. Verify node --check on extracted SIM-CORE block
   - Requires parsing JS from HTML first
   - Would validate the pure mathematical functions

2. Test computeScore() headless computation
   - Function already computes scores for all 32 TEAM_DATA rosters
   - Can be extracted and tested in isolation
   - Uses DEFAULT_WEIGHTS + getSynergy() penalties

3. Validate buildDraftState() DOM-freeness
   - Lines 1404-1425 (per S-102) are pure state-building
   - No document./window. references in this range
   - Can be extracted and evaluated in vm context

4. Verify simulateDraftHeadless() entry point
   - Lines 1482-1486 equivalent: draft + lineup finalization
   - Calls cpuPick(), executePick(), optimizeCpuLineups(),
     applyLineup() with optimalLineup()
   - All pure math functions; no DOM access

5. Check buildLeagueFromDraft() unification
   - Replaces duplicated bootstrap in startSeason() and runLeague100()
   - Called with {preseason:true} or {preseason:false}
   - Returns {L, names} with teams, schedule, unitRatings, etc.

6. Draft distribution measurements (M11 in S-102)
   - Per draft: round-1 picks under 90 OVR (count + share)
   - OVR gap to best player still on board at each pick
   - Share of bottom-tier-position picks (K, TE, RB2…) that were best available
   - Computed from draftSim.log: {round, pickInRound, overall, teamIndex, player, slot}

7. U-12 evidence baseline
   - Measure before any changes: round-1 pick OVR distribution
   - Establish baseline for future regression detection

==============================================================================
DEPENDENCY CHAIN STATUS

S-202 (SIM-CORE markers + 3 entry points)
  ↓ (requires: none; enables: everything else)
  
S-203 (tests/2025_standards.js) 
  ↓ (data-only; no product change; consumed in 1B by S-502)
  
S-103 (tests/funcdiff.js)
  ↓ (CLI tool; no product change)
  
S-102 (tests/pw4.js) -- REQUIREMENT: S-202 entry points first
  ↓ (includes M11 draft-distribution measurements)
  
S-301 (tests/run_all.sh) -- REQUIREMENT: S-202→S-102 first
  ↓ (steps 0-3; 1B does not start until 1A certified)

1B pipeline (after 1A certified):
  S-502 (validate.js) -- requires: S-202 markers + S-203 dataset + headless projection
  S-401 (phone.js) -- 390px nowrap rule reconcile with U-17 before U-17 ships

==============================================================================
NEXT IMMEDIATE STEPS

1. If not already done: ensure Claude has the 650,127-byte build 77bb9ed5...
   (Verified available in this auditor's environment)

2. Claude to resolve 8 pre-implementation actions (listed above)

3. First session to run --write-baseline against 77bb9ed5 creates baseline.json

4. After S-202 markers in place, S-102 pw4.js can extract core and run headless drafts

5. After S-202 + baseline, S-502 validate.js can measure against real 2025 data

6. Throughout: verify liveness items against 77bb9ed5 before closing

==============================================================================
AUDITOR CONSTRAINTS

- Do NOT modify NFL Draft Simulator.html (product file reserved for Claude)
- Do NOT implement any submissions (Claude's role only)
- Do NOT modify SUBMISSIONS.md, STATUS.md, or project documents
- Can verify, audit, report, and prepare test specifications
- All findings cite exact file, function, and line numbers
- Distinguish: verified by code inspection, verified by execution, inferred,
  unknown — per audit report conventions