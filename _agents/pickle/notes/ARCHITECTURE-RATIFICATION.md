# ARCHITECTURE-RATIFICATION.md

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | TASK: Owner decision #8, architecture co-decision (with DS) | DATE: 2026-10-21

Pin under test: `gpt/council-reliability-scorecard` @ `4558e81` · `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (the V20 merge candidate — not "V21").

Read with: `_agents/ds/notes/architecture-options.md` (DS's memo, the primary text) and `_agents/glm/architecture/REPO-ARCHITECTURE-OPTIONS.md` (GLM's independent paper). This file **ratifies DS's Option A + no-touch variant**, sharpens item (c), and **differs from DS on two points** — flagged inline as **[Pickle differs]**.

Every claim below is tagged **VERIFIED** (command measured this session), **REPORTED** (DS or GLM measured it; I did not re-run) or **UNKNOWN**.

---

## 0. The decision, one sentence

**Adopt DS's Option A (one repo, one folder per simulation, `shared/` deliberately empty) with GLM's no-touch variant; declare the competing topology directories non-authoritative; and write the extraction trigger so `shared/` cannot stay empty by drift.** DS decides provisionally; **Claude reviews and makes the final architecture call** (Owner decision #8, and §d below says so in the words every document must carry).

---

## (a) The ratified layout, followable without asking

A session that reads only this section can work correctly.

**Which directory is authoritative today — the repository root.**
- **VERIFIED:** the root **is** the git repo (`git rev-parse --show-toplevel` → `/Users/kosi/Desktop/Football Sim`), 231 tracked files on this branch, 165 on `main`.
- **VERIFIED:** the product is a single self-contained HTML at root: `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6b…`.
- **VERIFIED:** the root holds the governing layer the council actually runs on — `AGENTS.md`, `STATUS.md`, `COLLECTIVE-PROMPT.md`, `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `INDEX.md`, `ONBOARDING.md`, `tests/CONTRACT.md`.
- **Verdict: the root is authoritative. Nothing else is, until this is ratified and Claude confirms it.**

**Which directory is the per-sim destination — `sims/`.**
- **VERIFIED:** `sims/` exists and is **empty — 0 files** (`find sims -type f | wc -l` → `0`). The directory is the election; it holds no layout to invent.
- **[Pickle differs — naming.]** GLM's paper (REPORTED, `REPO-ARCHITECTURE-OPTIONS.md` l.21) proposes `sims/nfl-current/`, `nfl-alltime/`, `nba-current/`, `nba-alltime/`. **I ratify those four names**, because they match the Owner's stated priority order (NFL current → NFL all-time → NBA current → NBA all-time) and match the four real project folders already on disk (`SIM-PLATFORM/projects/1-football-current … 4-nba-all-time`, **VERIFIED** present). Reusing the names already in the tree costs nothing and prevents a fifth naming scheme. **DS's memo does not fix the four names; this does.**

**The exact path shape for a sim.**

```
sims/
  nfl-current/
    product/            the self-contained HTML build for this sim (one filename per build)
    pool/               the sim's own data input (build-time, swappable; never hand-edited in place)
    README.md           what this sim is, its build hash, its E2E suite and its trigger status
  nfl-alltime/   (same shape)
  nba-current/   (same shape)
  nba-alltime/   (same shape)
```

**One filename per build (VERIFIED warning, DS §5b and I agree):** `merged.html` and `NFL Draft Simulator merged.html` are **byte-identical today** (both sha256 `40233d6b…`, 657,486 B). Two paths to one build is how a stale copy circulates under a matching recorded hash. Pickle writes neither; **the duplicate is the Architect's to collapse — proposed: keep `NFL Draft Simulator merged.html`, let git history carry the rest.**

**Until the first sim folder is created, the working rule is simpler and needs no directory move:**
1. **Read/build from the root product file.** The shipping file **never moves** (GLM's no-touch rule; DS agrees). A sim folder receives a **copy**, never a move.
2. **Agent lanes stay `_agents/<you>/`.** Copying product bytes into a `sims/` folder does not change where a session writes its notes.
3. **Nothing else changes on day one.** This is a destination election, not a migration.

---

## (b) The five directories to declare non-authoritative

Named individually, each with its **measured** reason. Unit stated per rule 10. All counts measured this session (**VERIFIED**).

| #   | Directory | Files now                      | What emptied it / why it exists                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | When                       |
| --- | --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| 1   | `core/`   | **0**                          | Never populated. There is **no** universal engine: the "core/ engine all sports use" described in `FOLDER_STRUCTURE_RECOMMENDATION.md` **does not exist** — the directory is empty and **git has never tracked a file under it** (`git log --all -- core/*` → no output). A doc describes a target state as if it were present.                                                                                                                                                                          | dir mtime 2026-10-20 12:48 |
| 2   | `sims/`   | **0**                          | Never populated. Elected as the per-sim destination by this decision, but today holds nothing; git has never tracked a file under it. Empty is the _starting_ state, not a loss.                                                                                                                                                                                                                                                                                                                         | dir mtime 2026-10-20 11:44 |
| 3   | `shared/` | **0**                          | Never populated — **and this is deliberate** (see (c)). Holds no code today. Empty-by-design is the load-bearing part of the decision; the trigger in (c) is what keeps it honest.                                                                                                                                                                                                                                                                                                                       | dir mtime 2026-10-20 11:44 |
| 4   | `sports/` | **2** (both quarantined stubs) | **Emptied by the ratings quarantine.** `records: []` in both files; the original bytes were **not deleted** — preserved at `_fixtures/example-ratings/quarantined-originals/` (`football-ratings.quarantined.json` sha256 `5d1164125ad9…`; `basketball-all_time_draft.quarantined.json` sha256 `536b5114bc5f…`). **VERIFIED** in M-310. Quarantine executed by MiMo 2026-10-21 UTC per VLOC assignment. Not an architecture destination — a source-intake path AGENTS.md states the prohibition against. | 2026-10-21                 |
| 5   | `Sim/`    | **0**                          | Never populated. A second, differently-capitalised proto-directory (`Sim/` vs `sims/`) — a naming race already lost. Git has never tracked a file under it.                                                                                                                                                                                                                                                                                                                                              | dir mtime 2026-10-20 12:09 |

**Two more that are non-authoritative but are _not_ empty — declare them by scope, not by emptiness:**
- **`datasets/` — 1 file** (`datasets/schema.json`): a schema, not data. Superseded in practice by `SIM-PLATFORM/data/schema/` (3 schema files, **VERIFIED**). Non-authoritative for the pool; keep the file, do not point anyone at it.
- **`SIM-PLATFORM/` — 48 files (VERIFIED: 32 `.md`, 9 `.mjs`, 7 `.json`)**: real and substantial, but it is a **research/proposal layer**, not the product. **[Pickle differs — count.]** DS's memo §1 records `SIM-PLATFORM/` as **45 files**; I measure **48**. The difference (3 files) should be reconciled before DS publishes; the direction of the error does not change the verdict. `SIM-PLATFORM/ARCHITECTURE.md` describes a staged `engine/` + `packs/` design that is **Option B and unstarted** — it should say so plainly rather than read as a decision taken (DS §6.2; I agree).

**What "non-authoritative" means here, precisely:** not "delete", and not "wrong". It means **no session may take layout, naming or structure from these directories; the root and the ratified `sims/<name>/` shape are the only sources for those.** Nothing in (b) is deleted — the Owner's record-preservation rule (#15) governs, and every one of these directories is another agent's or the Architect's to move.

**Not on the list, deliberately:** `AGENTS.md`-governed `_agents/`, `_reference/`, `_archive/`, `backup-before-reorg/`, `Football Sim/`. These are **frozen or lane-scoped**, not topology competitors, and the rules for them already exist. `Football Sim/` is the one to note: **VERIFIED** it is a **nested git clone** (669 files, branch `council-intake` @ `caace3e`, its own `.git`) and it is **gitignored** (`.gitignore` l.10). It is a mirror, not a topology — but **a session could mistake it for the repo**, so the ratified doc must name it as a mirror and say the root governs.

---

## (c) The shared-code extraction trigger, in writing

**`shared/` stops being empty when — and only when — one of these is TRUE and is recorded in `shared/README.md` with the evidence that made it true:**
1. **Duplicate-fix:** the _same_ defect has had to be fixed in **two or more** sims within **one** council round. (Unit = sims touched by one defect in one round.)
2. **Overlap threshold:** a **third** sim needs **> 70 %** of its functions **unchanged** from an existing sim. (Unit = percent of functions, measured by function-diff against the existing sim's build.)
3. **Receipt repetition:** a hash pin or validation receipt has to be **repeated verbatim for a second sport**. (Unit = receipts.)

**Until a trigger fires, `shared/` holds exactly one file: `shared/README.md`, which states this trigger and names the round's date.**

**[Pickle differs — one addition.]** DS's three conditions are the right shape and I ratify all three. **I add a fourth, a circuit-breaker, because triggers 1–3 can all be satisfied by work that is not actually reusable:**
4. **Disproof condition — `shared/` stays empty even if 1–3 fire, when the extraction would require a protected constant, `MC`/`PLAN_K`/`RATING_SPECS`-style model math, or the matchup model to move before those are stable.** (Owner rule: those change only with explicit approval.) A shared module that forces a protected constant to split is **not** ready to extract, no matter how much duplication it removes. This is the guard that keeps the trigger from firing under pressure and destabilising the most-reviewed artefact.

**Why the trigger matters, plainly:** without it, "keep `shared/` empty" is indistinguishable from "never revisit". The trigger is what makes this a **decision** rather than a drift (DS §5.4; I agree in full).

---

## (d) The paragraph every document must carry

Worded for Claude. This exact paragraph (or wording that Claude confirms is equivalent) must appear in **every** document that states the ratified architecture — DS's published text, `docs/ARCHITECTURE.md`, `SIM-PLATFORM/ARCHITECTURE.md`, and any README added under `sims/`:

> **Architecture status — provisional, pending Claude's review.** The layout ratified here was decided provisionally by DS with Pickle as co-decider, under the Owner's decision #8 ("DS decides provisionally"). **It is not final.** Claude reviews this architecture and **may overrule it**; where Claude's reading differs, Claude's call governs, because Claude is the sole implementer of the product file and the technical authority (R3). Until Claude has reviewed it, no session should treat any layout choice here as settled, and none should act on it in a way that is hard to reverse. Statements elsewhere that describe a shared engine, a `core/`, or a platform layer describe _targets_, not the present tree, unless this paragraph accompanies them and says otherwise.

---

## (e) What evidence would make me reverse the decision

Stated in advance, so the decision is falsifiable rather than defended:
1. **The engine-separability test.** If someone demonstrates a **second sport's** season loop, bracket and matchup maths running from the _same_ functions with **no fork** — i.e. a genuine architecture seam, not a data seam — then Option B becomes cheaper than A and I reverse. Today's measured seam (§2 of DS's memo; REPORTED) is a **data** seam only: exactly one differing line (line 449, `const PLAYERS =`), and the pool swap is **not lossless** (52 of 1,200 players dropped: 32 punters, 12 long snappers, 8 fullbacks — because the build has 19 legal slot codes and `P`/`LS`/`FB` are not among them). One demonstrated data line is **not** engine reuse.
2. **A second self-contained build with real overlap.** If a second sim ships and its function-diff shows **> 70 %** unchanged functions, the trigger in (c.2) fires and my "keep `shared/` empty" position reverses to "extract now".
3. **A measured cost of duplication.** If the same fix lands twice in one round and the second landing is shown to have cost a verifier cycle or a hash bump, (c.1) fires and I reverse.
4. **Claude's review.** If Claude's reading of the product file shows the single-file-per-sport model **cannot** hold the Owner's roadmap (five priorities, four sims) without breaking a protected constant, I defer to that measurement and reverse.
5. **The Owner's priority order changes.** If a second sport is promoted above the NFL sim before the NFL sim stabilises, the sequencing under A reverses even if the layout does not.

**What would NOT make me reverse:** a document asserting the engine already exists (it does not — `core/` is empty), or a preference for a tidier tree without a measured defect count behind it.

---

## #16 — my opinion (DS decides; this is input, and I disagree with DS where I disagree)

DS published no #16 position before this file; these are my opinions, offered for DS's final text.

**(1) Is `main` the record? — Yes, with a measured caveat.** `main` should be the record. **VERIFIED caveat:** `main` **does not currently hold the merge candidate.** `main` (tip `bb4b025`) tracks only `NFL Draft Simulator v20 Claude.html` (`31b7d61f…`, 649,032 B) and `NFL Draft Simulator.html` (`77bb9ed5…`, 650,127 B). The **merged candidate is committed** on `merge/v20-donor` and `gpt/council-reliability-scorecard` (blob `1087b656…`, 657,486 B — **byte-identical to the working file**, `git diff` empty). So: **elect `main` as the record, and state plainly that the candidate has not reached it** — it is on the merge branch, tag `e2e-40233d6b-2026-10-21T0037Z` points at commit `ff8c05a` which carries it.

**(2) Does the 1,200-record pool belong in git or in release assets? — Release assets, and the site argues itself.** **VERIFIED:** `SIM-PLATFORM/data/nfl/current.json` is **937,366 B / 1,200 records, and untracked** — so it is already _out_ of git by practice, not by accident. Git already carries **two evidence-release tags** (`e2e-40233d6b-2026-10-21T0037Z`, `e2e-evidence-2026-10-20T225702Z`) — the release-asset mechanism exists and is in use. A pool is a **build input**, versioned like the build it feeds and hashed like it (`SIM-PLATFORM/tools/build-pool-variant.mjs` already produces a hashed variant). Recommendation: **pools ship as tagged release assets, referenced by sha256; git tracks the reference and the schema, not the 937 KB.** One caveat: the pool is a genuine build input, so a **hash pin in the build's own manifest** (not a path) must be what a verifier checks — path-based references rot when the asset moves.

**(3) Which of the three E2E suites is canonical? — `tests/openchamber-e2e-v2.spec.js`. Measured, and this corrects the record.**
- **VERIFIED:** three suites exist. `tests/madden-sim.spec.js` (7,026 B, sha256 `9e26b59a47fb`) is the **only tracked** one. `tests/openchamber-e2e.spec.js` (18,173 B, `6a781e71…`) and `tests/openchamber-e2e-v2.spec.js` (27,551 B, `f0f49e8c…`) are **both untracked**.
- **VERIFIED:** the artifact we have all been citing — `test-results/e2e-1792543053379/result.json`, 13 steps, suite `OPENCHAMBER-E2E-NFL-1` — contains the step ids `report-back` and `responsive-390-audit`. Those two ids are present in **v2 only**; `openchamber-e2e.spec.js` carries **11** of the 13 ids, **v2 carries all 13**.
- **Therefore: the canonical suite is v2.** This **corrects** the attribution in M-310 (mine), LongCat's L1, and Lightning's Run B closure, all of which named `openchamber-e2e.spec.js` (`6a781e71…`) as the run's source. The run came from **v2**. The build attribution (`artifactSha256` = `40233d6b…`) stands; only the **suite file** was wrong.
- **Recommendation:** elect **v2** canonical; **track it** (`git add tests/openchamber-e2e-v2.spec.js`); keep `openchamber-e2e.spec.js` as history (superseded) rather than deleting it; keep `tests/madden-sim.spec.js` as the tracked smoke suite it already is. There is **no playwright config** (**VERIFIED** — no `playwright.config.*`), so "canonical" must be written into `tests/CONTRACT.md`, not into a config the runner reads.

---

## Appendix — evidence table (every load-bearing measurement)

| Claim                                  | Command                                                           | Output                                            | Tag      |
| -------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------- | -------- |
| Root is the repo                       | `git rev-parse --show-toplevel`                                   | `/Users/kosi/Desktop/Football Sim`                | VERIFIED |
| Candidate bytes                        | `shasum -a 256 "NFL Draft Simulator merged.html"`                 | `40233d6b…`, 657,486 B                            | VERIFIED |
| Duplicate build                        | `shasum -a 256 merged.html`                                       | same `40233d6b…`                                  | VERIFIED |
| `core/` empty, never tracked           | `find core -type f \| wc -l`; `git log --all -- core/*`           | `0`; no output                                    | VERIFIED |
| `sims/` empty                          | `find sims -type f \| wc -l`                                      | `0`                                               | VERIFIED |
| `shared/` empty                        | `find shared -type f \| wc -l`                                    | `0`                                               | VERIFIED |
| `Sim/` empty                           | `find Sim -type f \| wc -l`                                       | `0`                                               | VERIFIED |
| `sports/` quarantined                  | `cat sports/football/ratings.json`                                | `quarantined:true`, `records:[]`, pointer present | VERIFIED |
| Quarantine originals                   | `shasum -a 256 _fixtures/example-ratings/quarantined-originals/*` | `5d1164125ad9…`, `536b5114bc5f…`                  | VERIFIED |
| `SIM-PLATFORM/` size                   | `find SIM-PLATFORM -type f \| wc -l`                              | **48** (32 md, 9 mjs, 7 json) — DS recorded 45    | VERIFIED |
| Nested clone                           | `git -C "Football Sim" rev-parse`                                 | branch `council-intake` @ `caace3e`               | VERIFIED |
| Clone is ignored                       | `git check-ignore -v "Football Sim/index.html"`                   | `.gitignore:10:Football Sim/`                     | VERIFIED |
| `main` lacks candidate                 | `git ls-tree main --name-only \| grep html`                       | v20 + donor only, no merged                       | VERIFIED |
| Candidate committed                    | `git rev-parse merge/v20-donor:"NFL Draft Simulator merged.html"` | blob `1087b656…`, 657,486 B, `git diff` empty     | VERIFIED |
| Pool size/status                       | `wc -c SIM-PLATFORM/data/nfl/current.json`; `git ls-files`        | 937,366 B, 1,200 records, untracked               | VERIFIED |
| Release-asset precedent                | `git tag`                                                         | `e2e-40233d6b-…`, `e2e-evidence-…`                | VERIFIED |
| Suite step counts                      | literal step-id grep in each `.spec.js`                           | e2e: 11 ids; **e2e-v2: 13 ids**                   | VERIFIED |
| Artifact suite source                  | `grep "report-back"/"responsive-390-audit"` in each               | present in v2 only                                | VERIFIED |
| Suite tracking                         | `git ls-files --error-unmatch <f>`                                | madden-sim TRACKED; e2e & e2e-v2 UNTRACKED        | VERIFIED |
| No playwright config                   | `ls playwright.config.*`                                          | no match                                          | VERIFIED |
| Pool swap is not lossless              | DS memo §2                                                        | 52 of 1,200 dropped (32 P, 12 LS, 8 FB)           | REPORTED |
| `sims/` four names, `engine/`+`packs/` | GLM paper l.21, l.41-54                                           | proposal text                                     | REPORTED |

**What I did not check (honest limits):** I did not run either E2E suite (read-only, and running writes artifacts); I did not open `SIM-PLATFORM/ARCHITECTURE.md` line by line; I did not re-run `build-pool-variant.mjs` (DS's §2 result is REPORTED, not re-measured by me); I did not verify the three-file `SIM-PLATFORM` discrepancy's cause; I did not inspect the `.kilo/worktrees/` copies of `madden-sim.spec.js`; no product file was opened or modified; writes only in `_agents/pickle/`.

**Scope.** Read-only outside `_agents/pickle/`. Product `40233d6b…` unchanged. No commits, pushes, branches or PRs. Claude is the only implementer of the product file; this document proposes only.
