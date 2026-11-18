SPEAKER: OR | ROLE: council | TASK: Part 3 — reconcile D3 landing filing | DATE: 2026-11-17 | FOR: P-356

D3 LANDING FILING — BLOCKED (path nonexistent; Architect action required)

STATUS: REJECTED as a landing commit at the cited path; the Architect must create the target file before the commit can land.

EVIDENCE
- colors/test/nfl/sim-slice.test.ts does NOT exist in the repo (confirmed: `git ls-files colors/test/nfl/*` → empty; colors/test/ contains 20 test files, none under nfl/ subdirectory). The path cannot be landed as a "single test-only commit" against an non-existent file.
- The closest existing test is colors/test/drives.test.ts (N=3000 by default; tests drives, scores, stats, events — but does NOT contain the counters: firstDowns, touchdowns, puntYards, turnover spot, safetiesScored, xpMade/xpAtt, punts, fgMade/fgAtt). These counters appear only in the D3 filing's 10-assertion set, not in any existing test file.
- The "one-line preamble" defect (v/a not in scope) is a filing-form issue: the landing commit needs a one-line preamble before the 10 assertions. This is resolvable.

RECOMMENDED LANDING PATH (for Architect)
Create `colors/test/nfl/sim-slice.test.ts` with the 10 assertions after the file's natural entry point (or after line 73 if the file is structured with a header + test blocks). The filing specifies:

1. File: colors/test/nfl/sim-slice.test.ts (NEW — must be created by Architect; product-file restriction means council cannot create it)
2. Insert point: after the file's setup block and after any existing test declarations; equivalently after line 73 if the file has a 73-line header
3. 10 assertions (one per counter):
   - firstDowns: survives 12/12 existing suite, dies under it (mutation M1)
   - touchdowns: survives 12/12, dies under it (M2)
   - puntYards: survives 12/12, dies under it (M3)
   - turnover spot: survives 12/12, dies under it (M4)
   - safetiesScored: survives 12/12, dies under it (M5); MUST live inside the 3,000-drive loop asserting on B (defence credits)
   - xpMade/xpAtt: survives 12/12, dies under it (M6); inside 3,000-drive loop on B
   - punts: survives 12/12, dies under it (M7); inside 3,000-drive loop
   - fgMade/fgAtt: survives 12/12, dies under it (M8); inside 3,000-drive loop
   - Clean 1/1: passes existing test suite unchanged
4. One-line preamble: (as specified in draft #4; currently "v/a not in scope" — needs a one-line preamble before the 10 assertions, e.g. "assert 10 counters survive the existing suite and die under it; safeties/XP placement inside 3,000-drive loop on B")
5. Safeties placement: inside the 3,000-drive loop (13/3000 drives), asserting on B (defence credits). This is the single change Ernie rejected but mutations M5–M7 proved correct (counter vs score() conflation).

ACTIONS
- RECOMMEND the Architect create colors/test/nfl/sim-slice.test.ts with the above content.
- Once created, the 10-assertion commit can land as a single test-only commit.
- WITHOUT this file, the D3 landing filing is a PROPOSAL, not a landed commit.

BLOCKED: sim-slice.test.ts path nonexistent (see above). Cannot verify 10 mutations without the test file.
OPEN: Architect to confirm the landing test path and create colors/test/nfl/sim-slice.test.ts.
NEXT: Part 4 (P-317/S3/S4 consolidation) pending Architect action on D3.