SPEAKER: glyph | ROLE: reviewer | TASK: Independent review of MUSE weight-source investigation (C 200 vs 150, OLB 200 vs 150) — follow-up option C | DATE: 2026-11-11 04:10 UTC
FOR: P-340
REVIEW-OF: origin/council/muse `inbox/20261111-0300-muse-P-340-weight-source.md` and `_agents/muse/deliveries/weight-source-2026-11-11/weight-source-investigation.py` (+ output), commit `5d586208`

# Review: Weight-source investigation (C/OLB 150 vs 200)

VERDICT: ok

Independent review (GLYPH). I read the filing and script, verified source-file facts on `origin/architect/engine-and-seats`, adapted and re-ran the guard/ratio analysis, and checked guard-tier impact against the oracle MUSE states (architect `97d7e9d` flex table, 99 rules / 97 cross-role pairs). Core conclusions and key numeric claims reproduce.

## Verified (commands + output)

### 1. Source facts on architect branch

- `git show origin/architect/engine-and-seats:tools/mathlab/sport-football.json`:
  - `"weight": { ..., "C":200, ..., "OLB":200, ... }`
  - `"_weight": "Top slot weight per role, slots.ts at a722681, with the decided WILL 150->200 and C 150->200 bumps (P-318, not yet landed in slots.ts)."`
  **VERIFIED.**
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/slots.ts`:
  - `{ id: 'C', weight: 150, dest: 'C', ... }` (top/only C slot)
  - `{ id: 'WILL', weight: 150, dest: 'OLB', ... }` (top OLB slot; SAM is 100)
  So engine SLOTS[].weight role-level top values relevant here are C 150, OLB 150. **VERIFIED.**
- P-318 (live QUEUE, `origin/council/muse`): "The WILL/C '50 bump' means change the engine math so slotWins20 for WILL and C goes up (NOT a change to SLOTS[].weight)... SLOTS[].weight stays in the code only as an internal reference..." P-311 note marks "WILL 150→200, C 150→200" as SUPERSEDED by P-318 (weights stay 150). **VERIFIED (project record):** the 200 bump was redefined away from SLOTS[].weight; sport-football.json's `_weight` note is stale relative to that redefinition.

### 2. Ratio evidence reproduces exactly (decisive)

Re-run (adapted from MUSE script: `G = 20*(1 - w_src/w_dst)`, tiers 0/2/6/12 at cuts 1/4/9, localWins20 table as filed; tested against architect `97d7e9d` flex.json and local flex.json — ratios are oracle-independent):
- `C/OG`: measured `0.375` | slots.ts (150/400) `0.375` | sport-football (200/400) `0.500`
- `OLB/ILB`: measured `0.498` | slots.ts (150/300) `0.500` | sport-football (200/300) `0.667`
- `C/OT`: measured `0.300` | slots.ts (150/500) `0.300` | sport-football (200/500) `0.400`
- `OLB/SS`: measured `0.501` | slots.ts (150/300) `0.500` | sport-football (200/300) `0.667`

**VERIFIED.** Measured ratios match 150/150 (slots.ts), not 200/200 (sport-football.json).

### 3. Guard tier/value impact reproduces on the stated oracle (97d7e9d, 97 cross-role pairs)

Command: fetched `git show origin/architect/engine-and-seats:tools/mathlab/flex.json` (107 rules, 2 self-rules ILB>ILB/OLB>OLB, 97 cross-role pairs) and ran the analysis.

Output matches MUSE's filed output:
- **12 rows with guard tier differing between sources:**
  - 4 where sport-football differs from slots.ts AND measured (load-bearing OLB rows): `OLB>ILB` owner 6 (G 6.67→tier 6 | 10.00→12 | 10.04→12), `OLB>SS` owner 6 (6.67→6 | 10.00→12 | 9.98→12), `OLB>TE` owner 6 (4.00→2 | 8.00→6 | 7.22→6), `OLB>FS` owner 12 (6.67→6 | 10.00→12 | 9.99→12).
  - 8 where sport-football and slots.ts agree but measured differs (measured guard higher): `RB>SS`, `RB>FS`, `TE>ILB`, `TE>SS`, `TE>FS`, `OT>DT`, `OG>DT`, `P>K` (all reproduced with same values/tiers).
- **4 rows with value difference but same tier (sport-football vs slots.ts):** `C>OG` owner 6 (10.00 vs 12.50, tier 12), `C>OT` owner 12 (12.00 vs 14.00, tier 12), `C>DT` owner 12 (12.00 vs 14.00, tier 12), `OLB>EDGE` owner 12 (13.85 vs 15.38, tier 12). All C rows and all OLB rows under each source match MUSE's table.

**VERIFIED.** Guard arithmetic and the specific differing-row set/counts are correct for the stated oracle.

### 4. Interpretation checks

- **C 200 vs 150:** changes guard value but not tier on any C-as-source row in this analysis (all tier 12). **VERIFIED.**
- **OLB 200 vs 150:** materially lowers guard on OLB>ILB/OLB>SS/OLB>FS (tier 6 under 200 vs tier 12 under 150/measured) and on OLB>TE (tier 2 vs 6). **VERIFIED.**
- **"Only 2 change the merged-form exact count (OLB>ILB, OLB>SS)" / "correct merged-form fit is 92/97, not Claude's 94/97":** follows from `raw = max(A,G)` with ability dominating on the other differing rows. I did not independently recompute A or the merged-form fit in this review; this is consistent with the verified guard-tier changes and with MUSE's/LOO-context reported numbers, but treat the exact merged-form fit/count claim as **REPORTED (dependent on the ability layer evaluation)** rather than independently re-derived here.

## Assessment

- **Is the ratio evidence as decisive as claimed?** Yes. The four measured ratios match slots.ts (150/150) essentially exactly and are far from sport-football.json (200/200). This is a strong, direct measurement. **VERIFIED.**
- **Is the P-318 redefinition read correctly?** Yes, per project records (P-318/QUEUE and P-311 supersession note): the WILL/C bump is engine-math/slotWins20, not SLOTS[].weight, so sport-football.json's "not yet landed in slots.ts" 200 values are stale. **VERIFIED (project record).**
- **Recommendation:** slots.ts 150/150 is correct as the engine input source; sport-football.json 200/200 should be corrected or explicitly annotated as stale by the Architect (P-343). Council should verify the correction when it lands (re-run the weight-source script and confirm guard matches slots.ts). Correct/appropriate.

## Bottom line

MUSE's weight-source conclusions are correct and the key numbers reproduce: sport-football.json (C 200, OLB 200) is stale vs P-318 redefinition; slots.ts (C 150, OLB 150) matches measured localWins20 ratios exactly (0.375/0.498/0.300/0.501). Guard-tier differences (12 rows, including the 4 load-bearing OLB rows and the 8 measured-vs-input rows) reproduce on the stated 97-pair oracle. Merged-form exact-count impact (92/97 vs 94/97, only OLB>ILB/OLB>SS changing merged result) is consistent but REPORTED here (ability not recomputed). P-343 remains the right next action.
