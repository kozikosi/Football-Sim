# WORKFLOW CHANGE NOTICE — Round 1 Pre-Dispatch Adjudication (19 October 2026)

Purpose: This document establishes the new agent workflow for Round 1 of the NFL Draft Simulator project, effective 19 October 2026. It supersedes prior workflow references and should be read in conjunction with AGENTS.md, SUBMISSIONS.md, STATUS.md, and COLLECTIVE-PROMPT.md.

STATUS: This is the authoritative workflow for Round 1. All council sessions and implementing agents must conform to these rules. Violations will be flagged by the promoter/verifier.

---

## NEW: CLAUDE'S RULINGS — ROUND 1 PRE-DISPATCH ADJUDICATION

On 19 October 2026, Claude (sole implementer) issued RULINGS — Round 1 pre-dispatch
adjudication, documenting three blockers and several contract amendments. These rulings
are now binding for Round 1 implementation.

Key rulings all agents must observe:
1. C2 EXTRACTION BOUNDARY (B1):
   - REPLACES: "assert the slice contains zero `document.`/`window.` references"
   - WITH: runtime DOMAccessError guard in vm context
   - Markers + vm sandbox + entry-point execution check
   - Static dom_text_refs=N printed in manifest as INFO only, NOT a gate
   - Missing symbol → ReferenceError → exit 3; DOMAccessError → exit 3

2. C4 EXIT CODE MATRIX (B2):
   - ADOPTED: 0=pass, 1=validation finding, 2=data-integrity violation,
     3=extraction/boundary failure, 4=usage error/missing input
   - S-301's "phone.js exit 2 = usage/parse" is SUPERSEDED
   - All scripts (S-102, S-103, S-401, S-502) must match B2 matrix
   - Scripts may not silently redefine exit codes

3. C5/C6 BASELINE PROCEDURE (B3/B4):
   - 5-step procedure: identity verification → bootstrap → reproduce → freeze → funcdiff
   - First session to run --write-baseline against 77bb9ed5 creates authority
   - Baseline sha256 recorded in STATUS.md; subsequent runs must reproduce exactly
   - Until frozen, run_all reports pw4 as UNGATED — no regression gate claims

4. funcdiff (B4 step 6):
   - Belongs to independent verifier, NOT routine run_all.sh
   - Compares against previous certified build by sha256 in STATUS.md
   - Expected-changed set must equal union of accepted entries' touched functions

---

## AGENT ROLES — Round 1 (submission workflow, adopted 19 Oct)

| Role                                                          | May Write                                                                      | May Not Write                                            | Responsibilities                                                                                                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **All agent sessions** (GLM, DS, Nemo Super, Nemo Ultra, GPT) | **OWN SECTION ONLY** in SUBMISSIONS.md (S-100–199, S-300–399, S-500–599)       | Another agent's section; another's entries; product file | Propose submissions in own ID block; no file access for product.html                                                                                                      |
| **Claude** (sole implementer)                                 | **Complete builds** as candidate artifacts                                     | N/A                                                      | Decides accept/defer/reject per round (max 5–6 accepted changes); delivers one complete updated HTML file; verification gates before publish                              |
| **User** (only relay/publisher)                               | **SUBMISSIONS.md** (all sections); **STATUS.md** (hash line); **BUILD-LOG.md** | Agent sections other than own                            | Pastes Claude's decisions verbatim under each entry; bumps hash in STATUS.md; records round row in BUILD-LOG.md; pushes GitHub branches                                   |
| **Verifier** (any session, read-only)                         | **STATUS.md** hash line only; **five-line report**                             | Product file; agent sections; SUBMISSIONS.md edits       | Runs read-only verification: node --check + E2E draft→season→playoffs, 390px layout, clean console; files five-line report; updates ONLY the build-hash line in STATUS.md |

---

## SUBMISSION WORKFLOW — Round 1 (step-by-step)

ROUND 1A (5 entries, at the cap — cannot accept more without breaking cap):
1. **S-202** (GLM) — SIM-CORE markers + 3 entry points
   - Product change: marker comments + three function moves
   - Enables: everything else in Round 1
   - Dependency: NONE (first in order)

2. **S-203** (GLM) — tests/2025_standards.js
   - Data only; no product change
   - Team names must match TEAM_DATA keys exactly
   - Consumed in 1B by S-502

3. **S-103** (DS) — tests/funcdiff.js
   - CLI tool; no product change
   - Changed-set must equal manifest per CONTRACT B4

4. **S-102** (DS) — tests/pw4.js
   - Requires S-202 entry points first
   - Includes M11 draft-distribution measurements for U-12

5. **S-301** (Nemo Super) — tests/run_all.sh
   - Requires S-202→S-102 first
   - Steps: 0 (sha256 identity), 1 (pw4 drift gate), 2 (validate lint),
     3 (phone lint)
   - 1B does NOT start until 1A certified

ROUND 1B (after 1A certified):
6. **S-502** (GPT) — validate.js
- Requires S-202 markers + S-203 dataset + headless projection
- Published r≈0.66/ρ≈0.69/RMSE≈2.6 are references, not gates, until measured

7. **S-401** (Nemo Ultra) — tests/phone.js
   - 390px overflow lint; reconcile U-17 nowrap rule before U-17 ships

DEPENDENCY CHAIN: S-202 → S-203 → S-103 → S-102 → S-301 → (1A certified) → 1B

---

## SUBMISSION FILING — How to File (all agents)

1. **Use your ID block** — pre-allocated so parallel batches never collide:
   - DS: S-100–199
   - GLM: S-200–299
   - Nemo Super: S-300–399
   - Nemo Ultra: S-400–499
   - GPT: S-500–599
   - Gemini: S-700–799 (reserved — fallback implementer, not an advisor)

2. **State the build** — the hash from STATUS.md your proposal applies to.
   - Current: `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f`

3. **Be self-contained** — Claude sees only what the user pastes. Quote the exact
   current code being replaced (whole functions, with their names), then give the full
   replacement code. Exception (amended 19 Oct): if the build file is attached to the
   round, the current code of any function may be referenced by name + line range + build
   hash instead of quoted, regardless of length — the replacement and all NEW code are
   still always quoted in full. Without an attached build, quote the current code in full,
   unless the function is moved unchanged — then name + line range + hash suffices.

4. **Blast radius** — name what else calls this code and what could regress (check your
   callers before writing).

5. **Evidence** — how any numerical claim was produced: the command, the sample size,
   the code path. A number without these is prose and must be marked as such; measured
   risks outrank prose ones in the pre-sort. Two sessions citing the same code path is
   not independent confirmation.

6. **Say what you checked** — `node --check` result, any simulation you ran, or "untested".
   Never claim results you don't have.

7. **One topic per entry** — a bug fix and a feature are two entries. Exception granted
   only to the Round-1 assessment bundles declared in the assignment packet; from Round 2
   on, each actionable item is its own entry.

8. **Conflicts are Claude's call** — if two submissions collide, Claude chooses; note
   the collision in your entry if you see it.

9. **Stand-ins don't self-rule** — a session serving as implementer for a round has its
   own pending entries for that round deferred to the next (queue maintainer enforces;
   adopted with the implementer-succession decision, 19 Oct).

---

## SUBMISSION FILING — Git (new option, 19 Oct 2026)

Agents may now post submissions directly to the GitHub repo, avoiding the copy-paste
SUBMISSIONS.md workflow. To file a submission to Git:
1. Create a markdown file named `LIGHTNING_SUBMISSION.md` (or appropriate name for your
   agent) containing your submission content, formatted as a SUBMISSIONS.md entry.

2. Place the file in the `Football Sim/` directory (the git repo checkout).

3. Commit and push:

   ```
   git add LIGHTNING_SUBMISSION.md
   git commit -m "S-<id> <brief title>"
   git push origin main
   ```

4. If there are merge conflicts (other commits on main), resolve per git workflow:
   - `git pull origin main --allow-unrelated-histories` (first time only)
   - Resolve conflicts in affected files
   - `git add <resolved-files>`
   - `git commit -m "S-<id> <brief title>"`
   - `git push origin main`

5. The file is now visible on GitHub at `https://github.com/kozikosi/Football-Sim/ 
   /tree/main/LIGHTNING_SUBMISSION.md` (or equivalent for your agent's submission).

6. The promoter/verifier will read the Git submission and incorporate Claude's decisions
   into STATUS.md/SUBMISSIONS.md as part of the round closure process.

---

## CONTRACT AMENDMENTS — Final Form (CONTRACT v2, 19 Oct 2026)

These amendments are now part of the binding contract for Round 1. All sessions must
conform.

B1 — C2 (extraction boundary): See "New: Claude's Rulings" section above.

B2 — C4 (exit codes) and the entry-wins rule: REPEALED. The contract's 0/1/2/3/4
now governs every script uniformly. S-301's exit 2 superseded. All scripts must match.

B3 — C5 (run order): Insert step 0: environment/identity (print sha256, compare with
STATUS.md, mismatch → exit 4). Step 3 (pw4) runs drift gate only when
tests/baseline.json exists; when absent → exit 2, run_all.sh reports "PW4:
BASELINE-ABSENT (exit 2)". Steps for scripts not yet delivered print "<NAME>: SKIPPED
(not delivered this round)" and make the overall line "RUN_ALL: PARTIAL", never PASS.

B4 — C6 (baseline and funcdiff procedure):
1. Designate reference build: certified build whose sha256 is recorded in STATUS.md.
2. Bootstrap (verifier session only): node tests/pw4.js --write-baseline against that
   build. Refuses to overwrite existing baseline except with --replace-baseline <ruling-ID>,
   which logs the ID inside the file.
3. Validate: file records build sha256, seed, Node version, sample sizes (drafts ×
   seasons) and tolerance bands; an immediate second run of node tests/pw4.js with the
   same seed must reproduce the same numbers exactly (else the harness is non-deterministic
   → fix before freezing).
4. Freeze: the user records baseline.json's sha256 in STATUS.md. Regeneration is an
   explicit ruling, and mandatory re-measurement follows any accepted change to
   weights/MC/PLAN_K (C8.2).
5. Until frozen, run_all reports pw4 as UNGATED. Round 1A may NOT claim any statistical
   regression gate.
6. funcdiff belongs to the independent verification procedure, not routine run_all.sh.
   Reference = the previous certified build named in STATUS.md, identified by sha256 in
   the report; the script asserts reference ≠ candidate hash (else exit 4) and prints
   both hashes. Expected-changed set must equal the union of the accepted entries' touched
   functions. For Round 1A (markers + moves) the expected set is the functions physically
   moved/wrapped, listed in the implementer's manifest.

---

## VERIFICATION — Round 1 (how acceptance is confirmed)

1A Acceptance (after S-202 through S-301 implemented):

(a) Markers exactly once; node --check passes on slice and whole script
(b) Runtime-guard evaluation passes, entry points exist with S-102's quoted signatures
(per CONTRACT B1 C7)
(c) Browser E2E on the candidate identical to the reference: draft → season → playoffs →
Super Bowl, clean console, 390px no overflow
(d) funcdiff changed-set equals the manifest (per CONTRACT B4)
(e) Baseline bootstrapped and reproduced exactly (per CONTRACT B3/B4)
(f) Manifest check
(g) A deliberately injected defect (e.g. delete one function, then flip one MC
coefficient) makes run_all fail — proof the gates can fail

1B Acceptance (after 1A certified):
- validate re-measured on the real build (published r≈0.66/ρ≈0.69/RMSE≈2.6 are
  references, not gates, until measured)
- exit-code matrix tested (missing dataset → 2, missing marker → 3, bad arg → 4)
- validate must FAIL on three injected defects (shuffled team ratings, zeroed QB weight,
  reversed wins)
- phone.js flags the known offenders, and stays a lint (the 390px browser pass remains
  the authority)
- S-301 nowrap rule is reconciled with U-17 before U-17 ships
- 1B does not start until 1A is certified

---

## COUNCIL LIVENESS ITEMS — Do Not Close Without Verification

Per Claude's Rulings (section A), the following items council claims are "already fixed"
are CONFIRMED PRESENT in build 77bb9ed5 via grep. **Do not close these items based on 
council word alone** — they require code-level verification on 77bb9ed5:
1. "sudden death" wording in overtime recap — present in both v20 and 77bb9ed5
2. "Same division: a second meeting..." banner prints for every divisional game regardless
   of meeting count — present in both
3. "wasn't in this round" — present in both
4. Footer "More" label — present in both (U-04 not done)
5. Guide intro text — fixed in Claude's lineage but different in 77bb9ed5
6. Old flex fit-check text still in dead function fitNoteHTML — present in v20

---

## CONTACT & GOVERNANCE

- **Promoter**: the user (only one who pushes hash to STATUS.md, pastes Claude decisions
  to SUBMISSIONS.md, records build-logs)
- **Verifier**: any read-only session; runs five-line report; updates ONLY the build-hash
  line in STATUS.md
- **Governance master document** (short, navigation-only): references manifest/baseline/AGENTS.md
  follows Round 1A certification
- **After 1B**: next priority is mathematical validation — does a player's estimated draft
  value predict the wins he adds in simulated seasons — rather than more infrastructure
- **Git repo**: `https://github.com/kozikosi/Football-Sim` (checked out on `main`)
- **Reference build**: `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f`
  (650,127 bytes; SHA-256 verified against STATUS.md)

---

## ACKNOWLEDGMENTS

This workflow was established through Claude's Round 1 pre-dispatch adjudication (19 Oct
2026), incorporating input from GLM, DS, Nemo Super, Nemo Ultra, and GPT council
sessions. The independent integration auditor (Nemotron Lightning) verified build identity
and rulings compatibility before this document was finalized.

---

END OF DOCUMENT
