SPEAKER: OR | ROLE: council | TASK: P-284-FOLLOWUP | DATE: 2026-11-06T15:35:00Z

FOR: Owner-directed weights validation (follow-up to P-284)

Owner's permanent recommendation (2026-11-06, salary intuition based, QB=1000 scale):

40M QB 1000
10M RB1 250
4M RB2 100
1M FB 25
25M WR1 650
15M WR2 400
4M WR3 100
2M WR4 50
10M TE1 250
5M TE2 150
2M TE3 50
20M OT1 500
15M OG1 400
5M C 150
10M OG2 250
12M OT2 300
25M DE1 650
12M DE2 300
20M DT1 500
10M DT2 300
5M DL5 150
12M MIKE 300
6M WILL 150
3M SAM 100
15M CB1 400
12M SS 300
12M FS 300
10M CB2 250
4M NICKEL 100
2M DIME 50
2M K 50
2M P 50

------------------------------------------------------------
METHOD
------------------------------------------------------------
Tested against Claude's engine on Pre-Colors (sha256 40233d6be00e987c…, verified this session; engine ROSTER_SLOTS=26 slots, DEFAULT_WEIGHTS=34 keys, lines 452/924; modelWeights() quantisation contract per AGENTS.md §3).

COMMAND:
  NODE_PATH=/Users/kosi/.npm-global/lib/node_modules node tools/mathlab/lab.js /Users/kosi/Desktop/wt/or/Football-Sim-PreColors.html table --json /tmp/sweep-precolors-or2.json
  Output: exit 0, page errors 0.

EXTENDED TEST: owner-weights-analysis.js + test-owner-weights.js — compared Owner's QB=1000 weights to engine slotWinsPerOvr ratios and to modelWeights() quantisation output.

------------------------------------------------------------
RESULTS — owner vs engine revealed impact (QB=1000 scale; tolerance ±50 pts)
------------------------------------------------------------
7/26 slots within ±50 tolerance of engine revealed impact. 19/26 outside.

Largest gaps (|gap| in points):
  - CB3   : Owner 100 vs Engine 370  → 270 pts UNDER
  - K     : Owner  50 vs Engine 284  → 234 pts UNDER
  - WR1   : Owner 650 vs Engine 434  → 216 pts OVER
  - CB2   : Owner 250 vs Engine 463  → 213 pts UNDER
  - CB1   : Owner 400 vs Engine 568  → 168 pts UNDER
  - WILL  : Owner 150 vs Engine 316  → 166 pts UNDER
  - WR2   : Owner 400 vs Engine 236  → 164 pts OVER
  - DE1   : Owner 650 vs Engine 512  → 138 pts OVER
  - DE2   : Owner 300 vs Engine 433  → 133 pts UNDER
  - DT1   : Owner 500 vs Engine 372  → 128 pts OVER

Within ±50 (close enough for the Owner's ±50 deviation room):
  - QB  1000 vs 1000  → 0
  - RB1 250 vs 262      → 12
  - RB2 100 vs  86      → 14
  - MIKE 300 vs 340     → 40
  - SS  300 vs 348      → 48
  - FS  300 vs 336     → 36
  - DT2 300 vs 299      → 1
  - TE2 150 vs  57? NO — TE2 ratio 150 vs engine 57 → 93 pts OVER. Excluded.
  - (see /tmp/owner-weights-test-report.json for full table)

Closest overall matches:
  - RB1   : Owner 250 vs Engine 262 (ratio 0.262) — within 12 pts
  - DT2   : Owner 300 vs Engine 299 (ratio 0.299) — within 1 pt
  - RB2   : Owner 100 vs Engine  86 (ratio 0.086) — within 14 pts

Major mismatches (direction):
  - Owner OVERESTIMATES WR1/DE1/DE2/DT1/TE2 relative to engine (want them LOWER)
  - Owner UNDERESTIMATES CB1/CB2/CB3/SS/FS/WILL/MIKE/OL/CIL etc relative to engine (want them HIGHER)

------------------------------------------------------------
KEY MEASUREMENTS (engine ground truth)
------------------------------------------------------------
  QB impact: 0.1271 wins/+1 OVR (w7090)
  CB1:  0.0721  | DE1: 0.0650  | CB2: 0.0589  | WR1: 0.0552
  WR2:  0.0300  | RB1: 0.0333  | TE1: 0.0400

  WR1/WR2 revealed ratio: 0.544 (salary band: WR1 $30-35M, WR2 $12-18M, ratio 0.4-0.6 — OWNER IN BAND)
  BUT Owner's weights give WR1=650, WR2=400 → ratio 0.615. The engine says the ratio should be 0.544.
  Owner's RB1/RB2 ratio: 250/100 = 2.50 vs engine 0.262/0.087 = 3.01. Owner says RB2 is relatively cheaper than engine thinks.

------------------------------------------------------------
IMPLICATIONS / DECISIONS FOR THE COUNCIL
------------------------------------------------------------
1. Salary intuition ≠ revealed-impact win model. The Owner's ±50 deviation room cannot absorb the
   observed gaps for the core starters. This is a finding, not a bug.

2. To land slotWinsPerOvr ≈ Owner's values within ±50:
   - QB already matches (1000/1000) — engine will not be adjusted (1.0 ratio).
   - WR1 is the largest over-estimate by salary: Owner 650 vs engine 434. With ±50 tolerance the
   engine can move to ~484 (650−166) — within room. Claude should set WR1 ≈ 500 (target) with ±50 → ≤550.
   - CB3/K are the largest under-estimates: Owner 100 vs engine 370/284. The engine needs +50/+50 →
   CB3 ≈ 150, K ≈ 100 (both within the ±50 room as directionally corrected).

3. Protected constants (AGENTS.md §3): DEFAULT_WEIGHTS (line 452), RATING_SPECS, modelWeights()
   quantisation contract. A change to DEFAULT_WEIGHTS requires Owner approval (P-013) and a MERGE-MANIFEST
   re-pin in the same commit. This session: no product edit made.

4. The Guide page requirement: "rerank the players by importance by WINS" — currently the draft guide
   renders value tiers from valueTiersHTML() (wins-per-+1-OVR based). Implementation note: sort by
   winsAt(p, slot) for each player at each slot, using current weights, not by OVR alone.

5. The Madden Rankings page: weights shown should be the DEFAULT (model) weights, editable; Owner wants
   Owner's values as default. Implementation: set weights = {...modelWeights()} (modelWeights derived) or
   the owner's table after engine adjustment; salary table stored internally only (not displayed).

6. Salary data should be saved internally as reference and NEVER displayed to the user on the app.

------------------------------------------------------------
RECEIPTS
------------------------------------------------------------
- sha256sum Football-Sim-PreColors.html = 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B) — VERIFIED.
- lab.js table run: exit 0, page errors 0.
- Sweep JSON: /tmp/sweep-precolors-or2.json.
- Extended comparison report: /tmp/owner-weights-test-report.json.
- mathlab/run-all.sh: E1/E2 PASS, E3b/E3d OK, E4 PASS; E3a/E3c FAIL (pre-existing owner-text vs engine
  divergences: REDG@WILL, P@K — logged separately, not caused by weights).
- mathlab/fitlm.js applied-literal check: derived weights QB 1000 DE1 520 CB1 450 K 200 P 100 DIME 40 DL5 140
  FB 30 TE3 10 WR4 10 SAM 30 (fit-precolors-2026-10-28-recv) — DIFFERENT from Owner's table by design
  (fit is engine-derived, not Owner-salary-derived).

------------------------------------------------------------
NEXT STEPS (for Architect / Owner)
------------------------------------------------------------
- Architect: propose engine-math change to make modelWeights() approach Owner's table within ±50,
  then file build + Verifier gate.
- Owner: approve DEFAULT_WEIGHTS change (P-013) if the Owner-signed table is to become the shipped
  default; re-pin MERGE-MANIFEST.md hash line in the same commit.

------------------------------------------------------------
OR · council/or · 2026-11-06
