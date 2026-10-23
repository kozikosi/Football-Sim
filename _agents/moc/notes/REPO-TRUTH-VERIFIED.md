# REPO-TRUTH-VERIFIED — #16, DS's repo-state claims re-run independently

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: #16 — verify and correct DS's repo-state claims | DATE: 2026-10-21T05:20:00Z**

**Pin (re-verified):** branch `gpt/council-reliability-scorecard` @ `4558e81` · `NFL Draft Simulator merged.html`, 657,486 B,
sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` · repo `kozikosi/Football-Sim`, **10 remote branches**.

**Method.** Every check re-run by me, read-only, against the GitHub API (`gh api repos/…/contents`) and local git.
Nothing was committed, pushed, branched, or written outside `_agents/moc/`. `NFL Draft Simulator.html` was not touched.

---

## (a) DS's claims, re-run — 4 CONFIRMED, 2 CORRECTED

| #   | DS's claim                                                                                                                                                                                                                                  | verdict                                                                         | my command → real output                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `NFL Draft Simulator merged.html` absent from `main`                                                                                                                                                                                        | **CONFIRMED**                                                                   | `gh api "repos/kozikosi/Football-Sim/contents/NFL%20Draft%20Simulator%20merged.html?ref=main"` → `{"message":"Not Found","status":"404"}`                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2   | `SIM-PLATFORM/` 404 on `main` **and every branch tested**                                                                                                                                                                                   | **CONFIRMED, and wider than stated**                                            | `for b in $(gh api "…/branches?per_page=100" --jq '.[].name'); do gh api "…/contents/SIM-PLATFORM?ref=$b"; done` → **10/10 branches 404** (council-intake, feature/remove-guide-panel, gpt/all-time-player-source-intake-20261020, gpt/council-reliability-scorecard, gpt/council-tooling-player-validator, gpt/multisport-strategy-proposal, gpt/openchamber-e2e-suite, gpt/v21-preflight-review, main, merge/v20-donor) — DS tested fewer branches than exist                                                                                                                |
| 3   | all three E2E suites untracked                                                                                                                                                                                                              | **CONFIRMED**                                                                   | `git ls-files --error-unmatch` → NO for all three; and `for f in …; do for b in <10 branches>; do gh api "…/contents/$f?ref=$b"; done; done` → **present on 0 of 10 remote branches**. Line counts match DS exactly: `e2e-smoke.mjs` 468, `openchamber-e2e-v2.spec.js` 669, `openchamber-e2e.spec.js` 459                                                                                                                                                                                                                                                                      |
| 4   | `_agents/` absent from `main`                                                                                                                                                                                                               | **CONFIRMED**                                                                   | `gh api "…/contents/_agents?ref=main"` → 404                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 5   | `AGENTS.md`, `STATUS.md`, `MERGE-MANIFEST.md`, `COUNCIL-BULLETIN.md` present on `main`                                                                                                                                                      | **CORRECTED — only `AGENTS.md` is on `main`**                                   | `gh api "…/contents?ref=main"` lists `AGENTS.md` and **not** the other three. Per-file check: `STATUS.md` **ABSENT** (present on 9 branches), `MERGE-MANIFEST.md` **ABSENT** (6 branches), `COUNCIL-BULLETIN.md` **ABSENT** (9 branches). Also absent from main: `CHRONICLE.md`, `SUBMISSIONS.md`, `INDEX.md`. `main`'s `tests/` holds **only** `madden-sim.spec.js` (7,026 B) — no E2E suite is on main. `main` also still carries the legacy artefacts `index.html` and `Madden NFL 27 Team Power Rankings & Draft Simulator (8).html` / `(9) (OC).html`                     |
| 6   | **TWO clones** of the same repo on this disk: `Football Sim/` on `gpt/council-reliability-scorecard`, and nested `Football Sim/Football Sim/` on `council-intake` with 14 dirty files, while AGENTS.md claims the nested clone is on `main` | **CORRECTED — there are exactly TWO clones, and the third path is not a clone** | `git -C <d> rev-parse --abbrev-ref HEAD` for `.` → `gpt/council-reliability-scorecard` @ `4558e81`, 126 dirty · `Football Sim` → `council-intake` @ `caace3e`, **14 dirty** (your number is right) · `Football Sim/Football Sim` → **no `.git` at all** (not a clone; a plain subdirectory inside clone #2). The "on `main`" staleness is real but attaches to `Football Sim/`: `AGENTS.md` l.116 says _"`Football Sim/`: the repository — git clone of github.com/kozikosi/Football-Sim, **checked out on `main`**"_, while it is in fact on **`council-intake` @ `caace3e`** |

**Strongest single line of evidence for (5):** `gh api "repos/kozikosi/Football-Sim/contents?ref=main" --jq '.[].name'` returns 30 names; `STATUS.md`, `MERGE-MANIFEST.md` and `COUNCIL-BULLETIN.md` are **not among them** while `AGENTS.md` is.

## (b) The commit manifest — what a fresh clone needs

**Already tracked → a fresh clone already has them (no action):**

| file                                  |   bytes | why                                       |
| ------------------------------------- | ------: | ----------------------------------------- |
| `NFL Draft Simulator v20 Claude.html` | 649,032 | parent build A                            |
| `NFL Draft Simulator.html`            | 650,127 | parent build B (donor)                    |
| `tools/build-merged.js`               |   4,840 | the candidate builder                     |
| `NFL Draft Simulator merged.html`     | 657,486 | **the candidate itself, already tracked** |
| `tools/sync-mirrors.sh`               |   1,621 | the mirror sync                           |
| `scripts/build_council_scorecard.py`  |  12,167 | the PR #5 generator                       |
| `tests/CONTRACT.md`                   |  10,005 | the harness contract                      |
| `tests/madden-sim.spec.js`            |   7,026 | the existing smoke spec                   |
| the shared council docs               |       — | tracked (stale content, but present)      |

**Must be committed — these are the reproduction gaps:**

| file                                              |     bytes | needed for                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------- | --------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SIM-PLATFORM/data/nfl/current.json`              |   937,366 | **the pool** — the pool variant cannot be rebuilt without it                                                                                                                                                                                                                                                           |
| `SIM-PLATFORM/tools/build-pool-variant.mjs`       |     6,030 | the pool→build builder                                                                                                                                                                                                                                                                                                 |
| `SIM-PLATFORM/data/nfl/candidate-work-queue.json` | 1,181,912 | the queue the pool was assembled from (reproduces the _pool_, not just the variant)                                                                                                                                                                                                                                    |
| `SIM-PLATFORM/tools/validate-dataset.mjs`         |    15,556 | the pool gate (taxonomy + coverage + draft capacity)                                                                                                                                                                                                                                                                   |
| `tests/openchamber-e2e-v2.spec.js`                |    27,551 | the canonical acceptance suite (see (d))                                                                                                                                                                                                                                                                               |
| `tests/openchamber-e2e.spec.js`                   |    18,173 | **provenance**: the script that produced the published `e2e-40233d6b` evidence                                                                                                                                                                                                                                         |
| `tests/e2e-smoke.mjs`                             |    28,211 | the fast screen (see (d))                                                                                                                                                                                                                                                                                              |
| `merged.html`                                     |   657,486 | **only because the E2E result's `artifactPath` points at it** — it is byte-identical to the tracked `NFL Draft Simulator merged.html` (both `40233d6b…`, `cmp` → identical). **Recommended: point the spec at the tracked name and drop the duplicate**, rather than committing a second copy of the same 657 KB build |

**Total to commit: 2,875,882 B ≈ 2.87 MB raw** (of which 2.12 MB is the pool + queue).

**One byte-pin check worth recording:** `.gitattributes` in the root already contains `* text=auto` **and** `*.html -text`, and the tracked candidate's blob size equals the file size (657,486 = 657,486) — so the HTML byte-pins are protected against line-ending normalisation on clone. That risk is already closed.

## (c) Does the 1,200-record pool belong in git or in release assets? — **In git**

1. **It is a build input, not a run output.** The pool variant is _rebuilt_ from it; a fresh clone that lacks it cannot produce the artefact the council keeps citing. Release assets are for things you _download_, not things you _rebuild_.
2. **Size is a non-issue, measured:** zlib level 9 (git's compression) takes the 937,366 B pool to **50,231 B (5.4 %)** and the 1,181,912 B queue to **53,856 B (4.6 %)**. Fifty revisions of the pool ≈ **2.5 MB of history** — against GitHub's 100 MB/file recommendation and 5 GB/repo hard limit. Compare the artefacts that _should_ stay out: the 65.9 MB trace and the 19.7 MB screenshot bundle.
3. **Diffability is the point.** A rating change is one line in a text file; in a release asset it is invisible. A receipt-backed council needs a reviewable diff of the pool it approved.
4. **The protocol agrees:** its evidence-delivery clause says to keep _large binary traces_ out of the product branch — a JSON pool is neither large nor binary.
5. **The discipline to keep:** commit the pool at **approved-pool milestones**, not per-record; keep the per-record working state in `candidate-work-queue.json`. If the pool were committed on every single rating edit, history would still be small, but the diff noise would be.

**Release assets remain right for:** the trace (65,863,244 B), `screenshots.zip` (19,697,908 B) and the _published_ result JSON — the JSON belongs in **both** (in git to diff it, on the release to link it).

## (d) Which E2E suite is canonical? — `tests/openchamber-e2e-v2.spec.js`, with one graft needed

Measured by what each file implements:

| suite                              | lines | `schemaVersion` | `tracing.start` | `emulateMedia` | `fullyInside` / `centerUncovered` | `receipt_id` |
| ---------------------------------- | ----: | --------------: | --------------: | -------------: | --------------------------------: | -----------: |
| `tests/openchamber-e2e.spec.js`    |   459 |               1 |               1 |              2 |                             0 / 0 |            0 |
| `tests/openchamber-e2e-v2.spec.js` |   669 |               1 |               1 |              3 |                         **6 / 5** |            0 |
| `tests/e2e-smoke.mjs`              |   468 |               0 |               0 |              0 |                             0 / 0 |        **4** |
- **Canonical: `tests/openchamber-e2e-v2.spec.js`** — the only suite that implements the protocol's element-level 390 px clauses (`fullyInside`, `centerUncovered`), and it is the harness that produced the unanimous P0 measurement (DS 963.03, LongCat 963, Pickle 963 — Pickle's M-146 notes the v2 harness holds **both** centre conventions, in two functions). It keeps the schema-conformant result, the trace and the light/dark captures.
  - **Gap to close before it can be canonical:** it has **no `receipt_id`** — the mechanism that makes a hand-edited result file detectable. That guard currently exists only in `e2e-smoke.mjs` (4 occurrences). **Graft the receipt id from the smoke driver into v2**; then v2 is the one canonical acceptance suite.
- **`tests/openchamber-e2e.spec.js` (459) → keep, but retire it as a runner.** It is the script that produced the **published** evidence (`e2e-40233d6b-2026-10-20`, 26 captures, the 65.9 MB trace). Deleting it would leave the council's evidence without a reproducible origin. Keep it verbatim, labelled as the script of that run, and stop maintaining it as a second acceptance suite.
- **`tests/e2e-smoke.mjs` (468) → keep, as a different role, not a duplicate.** It is a fast screen (no trace, no light/dark, no schema result, but a `receipt_id`): the pre-flight that says "this candidate still boots, still overflows nothing at 390 px, still produces no page errors". It should be described as the **screen**, and the spec as the **acceptance run**. Two suites are defensible; **three** are not.
- **All three are untracked today** (0 of 10 remote branches) — so "canonical" is currently only a local convention.

## (e) The two-clone problem

| clone           | path                                            | branch                              | HEAD      |   dirty | role                                                                             |
| --------------- | ----------------------------------------------- | ----------------------------------- | --------- | ------: | -------------------------------------------------------------------------------- |
| **#1 (root)**   | `/Users/kosi/Desktop/Football Sim`              | `gpt/council-reliability-scorecard` | `4558e81` | **126** | the live working checkout: live council docs, the candidate, the pool, the tools |
| **#2 (mirror)** | `/Users/kosi/Desktop/Football Sim/Football Sim` | `council-intake`                    | `caace3e` |  **14** | the push mirror (the Owner's git infra)                                          |
| _(not a clone)_ | `…/Football Sim/Football Sim`                   | —                                   | —         |       — | a plain subdirectory inside clone #2                                             |

**Which is authoritative:** **the root.** `INDEX.md` already says so — _"this root is the canonical checkout; `Football Sim/` is git infrastructure the Owner pushes"_. The evidence agrees: the root holds the live documents, the candidate build, the pool and the tools; the mirror holds **stale copies**.

**The part that is actually broken (and DS's finding is right to worry about):** the shared documents exist in **three** states, and only one of them is current:
1. the root's working tree — live (126 dirty entries; my last commit of the docs was `4558e81`, and seats have appended since);
2. the mirror's working tree — a _copy_ of the docs (6 modified + 8 untracked there), uncommitted;
3. git history — the root's `4558e81` (docs as of my snapshot) and the mirror's `caace3e` (much older).

So **a push from the mirror ships none of the live documents, and a push from the root ships a branch that the remote has never seen.** Nothing is lost today only because the root's working tree still holds it.

**How a session should tell them apart (one command, no ambiguity):**

```sh
git rev-parse --show-toplevel      # root clone  → /Users/kosi/Desktop/Football Sim
git rev-parse --show-toplevel      # run in the mirror → …/Football Sim/Football Sim
```

The **toplevel path** is the reliable tell — the directory _names_ are both "Football Sim", so the name cannot distinguish them. Two more tells, for scripts: `git rev-parse --abbrev-ref HEAD` (root: a feature branch; mirror: `council-intake`) and `git status --porcelain | wc -l` (root: 126; mirror: 14).

**The fix, in order (the Owner's call, not mine):** (1) commit the shared documents in the root, each round — this is already the rule I have been following since `a3a26ae`; (2) run `sh tools/sync-mirrors.sh` to refresh the mirror's copies; (3) have the Owner push the **root's** branch, and stop treating the mirror as a second working copy — or drop the mirror's `.git` and keep it as a plain directory, so there is exactly one clone. Today the mirror's 14 dirty entries are a _symptom_: a second working tree that is nobody's working tree.

## What I did NOT check (stated plainly)

- **I did not push, commit, branch, tag, or open a PR**, and I did not modify the mirror clone or any file outside `_agents/moc/`.
- **I did not verify the content of the mirror's 14 dirty files** — only that it has 14 and what they are named; I did not diff them against the root.
- **I did not run the E2E suites** — the (d) verdict is a static read of what each file implements, not an executed comparison of their outputs.
- **I did not check the 126 dirty entries in the root individually** (count and character only); in particular I did not audit whether any _other_ seat's lane is uncommitted in a way that would be lost by a checkout.
- **I did not check the two `Madden NFL 27 … (8).html` / `(9) (OC).html` legacy artefacts on `main`** — whether either is a newer or older build than the candidate.
- **I did not verify the pool's _content_** (1,148 draftable + 52 non-slot records) — only its size and its git-tracking status; the pool's own validation is `validate-dataset.mjs`'s job.
- **I did not check whether the `Football Sim/Football Sim/` subdirectory's contents are needed**; I only established that it is not a clone.
- **I did not re-derive the "1,200-record" figure** in the assignment text beyond confirming the pool file holds 1,200 records.
