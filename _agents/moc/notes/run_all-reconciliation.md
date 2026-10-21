# S-301 `run_all.sh` — Phase A reconciliation, the proposed implementation, and Phase C verification

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: prepare the first infrastructure improvement (audit-only until approved) | DATE: 2026-10-21T17:10:00Z**

**Status: NOT CREATED IN `tests/`. Approval is required first — see §A5.** The product HTML and the protected constants were not touched.

---

## A · PHASE A — RECONCILE

### A1 · The authoritative requirements for `run_all.sh`

**`tests/CONTRACT.md` C5 ("Run order + aggregation — `run_all.sh`, S-301 — ruled B3") is the authority.** C4 fixes the shared norms and the exit codes; C6 fixes ownership, the baseline and where `funcdiff` belongs.

**The locked run order (C5), and the contract's exact words:**

| step | what C5 requires | if the thing is missing |
|---|---|---|
| **0** | print the product file's sha256 and **compare with `STATUS.md`**; a mismatch is **exit 4, "wrong build"** | no `STATUS.md` hash → exit 4 |
| **1** | `node --check` on the extracted core | extraction/marker failure → **exit 3** |
| **2** | `manifest.txt` presence + function-name check (S-202 item 6) | not delivered → **SKIPPED** |
| **3** | `pw4` — its drift gate runs **only when `tests/baseline.json` exists**; when absent pw4 exits 2 and the runner reports **`PW4: BASELINE-ABSENT (exit 2)`** | not delivered → SKIPPED; baseline absent → `BASELINE-ABSENT (exit 2)`, **never a pass** |
| **4** | `validate` (external 2025 gate, S-502) | not delivered → SKIPPED |
| **5** | `phone` (static 390 px lint, S-401) | not delivered → SKIPPED |

**C5's aggregation rule, verbatim:** *"Steps for scripts not yet delivered print `<NAME>: SKIPPED (not delivered this round)` and make the overall line `RUN_ALL: PARTIAL` — never `PASS`. The run order is locked; additions go to the end of the list and require a version…"*

**C4's exit codes, verbatim:** `0` pass · `1` validation/lint finding (numbers, drift, overflow) · `2` data-integrity violation (dataset checks, **manifest mismatch**, **missing or invalid baseline**) · `3` runtime-guard/marker failure · `4` usage/wrong build. Each script's final line is `PASS <name>` or `FAIL <name> <reason>`.

**C6, on scope and ownership:** *"`tests/` scripts are tooling, not product, but they follow the same submission workflow: changes go through each author's own section in `SUBMISSIONS.md`, get verified before shipped, and the verifier's function-diff covers them."* And: ***"`funcdiff` belongs to the independent verification procedure, not routine `run_all.sh`"*** — the runner cannot know the predecessor.

### A2 · The conflicts, and how they are resolved

1. **The filed entry vs the contract.** `SUBMISSIONS.md` S-301 (Nemo Super, 19 Oct) specifies a **four-step** order (check → pw4 → validate → phone), no identity step, no manifest step, exit "0 if all pass, 1 if any fail", and a missing script reported as **`MISSING: <script>` with exit 1**. **C5 says otherwise**: the identity and manifest steps are part of the order, a not-delivered script is **SKIPPED** (not "MISSING"), and the run is **PARTIAL** (not a failure). **The contract wins, on its own terms:** C4 states that *"the entry-wins precedence rule is repealed for exit codes and status-line grammar. If a filed entry disagrees, the contract wins and the conflict is reported at assembly — a script may not silently redefine a code."* **The conflict is reported here, and the proposal follows C5.**
2. **`AGENTS.md` vs the contract.** AGENTS.md's testing checklist names `pw4.js` ("100-season validation (`pw4.js`) produces r > 0.6") and its Key Files section names `tests/madden-sim.spec.js` as if the harness existed. `HARNESS-STATUS.md` is the accurate record: `pw4.js`, `validate.js`, `phone.js`, `run_all.sh`, `funcdiff.js` are all **draft** in `_agents/beam/notes/harness-drafts/`, and `tests/2025_standings.js`, `tests/baseline.json`, `tests/manifest.txt`, `tests/math-baseline.json` are **missing (not yet drafted)**. **A runner that names scripts which do not exist must report them as SKIPPED, not as failures** — which is exactly what C5 says.
3. **`AGENTS.md` / `STATUS.md` vs the build under test.** `STATUS.md` still names the v20 reference build (`31b7d61f…`, 649,032 B) and says *"the merged result has no hash yet"*. The candidate is `044d1759…` (656,746 B). **So C5's step 0 cannot pass today for any build in the tree** — which is the contract working as designed, and the reason step 0's exit-4 path must be demonstrated (it is, in Phase C case G).
4. **The run order is locked.** The five Playwright specs are **not** in C5's order, and C5 says additions require a version change. **They must not be added to the runner.**

### A3 · Must run · may run · must be reported skipped

- **Must run (the runner's own work):** step 0 identity, step 1 `node --check`, step 2 manifest check. These are not optional and not skippable.
- **Must be reported SKIPPED when not delivered:** `pw4`, `validate`, `phone` (and `manifest.txt`, which is part of step 2). SKIPPED ⇒ `RUN_ALL: PARTIAL` — **never PASS**.
- **Must be reported as a specific condition, not a skip:** `pw4` with no `tests/baseline.json` ⇒ `PW4: BASELINE-ABSENT (exit 2)`.
- **May run, but not in the locked order:** the Playwright specs (PR #3's suite), `funcdiff` (C6: independent verification, not routine), `post-merge-smoke.mjs` and the CDP probes (the council's evidence path, exit 0/1/4 per `tests/CONTRACT.md`).

### A4 · Which required scripts exist — VERIFIED

| required | exists? | where |
|---|---|---|
| `tests/pw4.js` (S-102) | **no** | draft at `_agents/beam/notes/harness-drafts/pw4.js`; needs SIM-CORE markers + entry points |
| `tests/validate.js` (S-502) | **no** | draft at `_agents/beam/notes/harness-drafts/validate.js`; needs `tests/2025_standings.js` |
| `tests/phone.js` (S-401) | **no** | draft at `_agents/beam/notes/harness-drafts/phone.js`; needs the CDP version |
| `tests/manifest.txt` (S-202) | **no** | listed in HARNESS-STATUS.md as missing |
| `tests/baseline.json` | **no** | missing; and C6 says it may be written **only by a verifier session**, refusing to overwrite |
| `tests/2025_standings.js` (S-203) | **no** | missing |
| `tests/run_all.sh` (S-301) | **no** | draft at `_agents/beam/notes/harness-drafts/run_all.sh` |
| `tests/funcdiff.js` (S-103) | **no** (but not in the runner's order) | `funcdiff-full.js` in `_agents/ds/tools/` is the precise version |
| `tests/madden-sim.spec.js` + 4 more specs | **yes** | Playwright; outside C5's order |

**Consequence:** a compliant runner can only ever report **PARTIAL** today, and its step 0 exits 4 until `STATUS.md` names the build under test. **That is the truth of the repository, and the runner must say it plainly rather than dress it up.**

### A5 · Does creating `run_all.sh` require approval? — **YES. Stopping here.**

Three independent rules say so:

1. **The queue.** `SUBMISSIONS.md` line 45: `| S-301 | tests/run_all.sh composite runner + mobile acceptance thresholds | **Nemo Super** | improvement | **pending** |`. The file is an **existing, pending, someone else's submission** — it is not an unclaimed improvement.
2. **C6:** *"`tests/` scripts are tooling, not product, but they follow the same submission workflow: changes go through each author's own section in `SUBMISSIONS.md`, get verified before shipped…"* And `HARNESS-STATUS.md`'s vocabulary: `missing → draft (in _agents/) → proposed (in SUBMISSIONS.md) → **accepted (Claude approved)** → built (in tests/) → verified`. **"Built in `tests/`" comes *after* "accepted".**
3. **Who arbitrates.** *"This contract is maintained by the queue-maintainer (currently GLM); unsettled interface questions go back to the implementer (Claude) for arbitration."* My own lane has no standing to land S-301, and the contract's own text is what I am proposing to implement.

**So: I have not created `tests/run_all.sh`.** What I have done instead is the exact proposed implementation, verified (§C), and this reconciliation for the queue-maintainer and the Architect.

---

## B · PHASE B — the exact proposed implementation (for approval)

**File:** `_agents/moc/notes/run_all-proposed.sh` — the verbatim content proposed for `tests/run_all.sh`. It is `sh` + `node` only, no installs, no network, no new package, and it **reuses** the existing `node --check` and the existing script CLIs rather than reimplementing them. It resolves every path `__dirname`-relative, never `process.cwd()` (C4/C5).

**What it does, in the contract's order:** step 0 prints the build's sha256 and compares it with `STATUS.md` (mismatch → **exit 4**); step 1 extracts the inline `<script>` block and runs `node --check` on it (failure → **exit 3**); step 2 checks `tests/manifest.txt` and that every function it names exists in the build (missing name → **exit 2**, per C4's "manifest mismatch"); step 3 runs `pw4` only when `tests/baseline.json` exists, and otherwise prints `PW4: BASELINE-ABSENT (exit 2)`; steps 4 and 5 run `validate` and `phone`; a not-delivered script prints `<NAME>: SKIPPED (not delivered this round)`. **Each step's exit code is preserved and the worst one wins.** The final line is `RUN_ALL: PASS` (all checks ran and passed), `RUN_ALL: FAIL (<step>)` (a check failed) or `RUN_ALL: PARTIAL (…)` (a required check could not run).

**Two points I want the reviewer's ruling on, because the contract is silent:**
1. **The exit code for PARTIAL.** C5 fixes the *line* (`RUN_ALL: PARTIAL`) but not the code. I propose **2** — the league's "could not verify" code, and the same code the contract already uses for a missing baseline. The alternative is 1. **This is the queue-maintainer's call, not mine.**
2. **Reading the pinned hash out of `STATUS.md`.** `STATUS.md` mentions several hashes (v20 `31b7d61f…`, the donor `77bb9ed5…`, and the merged build, which "has no hash yet"). My matcher takes the first "Reference build" mention, which in the current file yields the donor's hash. **The runner should read one unambiguous line**, so the proposal expects a single canonical `REFERENCE_BUILD_SHA256=` line; until `STATUS.md` has one (an Owner assignment — "the verifying session may update only the build-hash line"), step 0 must fail loudly rather than compare against the wrong hash.

**One defect in the existing draft, for the record** (`_agents/beam/notes/harness-drafts/run_all.sh`): it ends with an unconditional `echo "RUN_ALL: PARTIAL (scripts not yet delivered)"` and **never propagates a step's exit code** — so it prints PARTIAL even when every check passed, and **exits 0 on a failing check**. The proposal fixes both.

---

## C · PHASE C — VERIFICATION

**Commands executed** (the proposal was run from a sandbox copy; **nothing was created in the repository**, and the sandbox and every fixture were removed afterwards):

```
sh _agents/moc/notes/moc-verify-runall.sh      # the Phase C harness
```

| case | setup | result | exit |
|---|---|---|---|
| **A** | all three scripts + manifest + baseline present and passing | `CHECK: OK` · `MANIFEST: OK` · `PW4: OK (exit 0)` · `RUN_ALL: **PASS**` | **0** |
| **B** | `phone.js` **not delivered** | `PHONE: **SKIPPED (not delivered this round)**` · `RUN_ALL: **PARTIAL**` | **2** |
| **C** | `phone.js` exits 1 (a finding) | `FAIL phone 3 overflow risks` · `PHONE: FAIL (exit 1)` | **1** |
| **D** | `phone.js` exits 2 (data-integrity) | `PHONE: FAIL (exit 2)` | **2** |
| **E** | the manifest names `buildDraftState`, which the build does not have | `MANIFEST: **FAIL missing functions: buildDraftState**` | **2** |
| **F** | `pw4.js` present, `baseline.json` absent | `PW4: **BASELINE-ABSENT (exit 2)**` | **2** |
| **G** | **the real repository, as it stands** | `RUN_ALL: **FAIL (wrong build: 044d1759… != 77bb9ed5)**` | **4** |
| **H** | the existing draft, in the same situation | `RUN_ALL: PARTIAL (scripts not yet delivered)` — **with exit 0** | **0** |

**The four demonstrations the task asked for:** a successful check is reported **PASS** (A, and the per-step `PASS <name>` lines); a missing required check is reported **missing/FAIL, never PASS** (E: the manifest mismatch → FAIL; G: the wrong build → FAIL; and a not-delivered script → SKIPPED, never PASS); a deliberately skipped check is reported **SKIP** (B); a failed check produces a **nonzero overall exit code** (C → 1, D → 2, E → 2, F → 2, G → 4); and the final status distinguishes **PASS** (A), **FAIL** (C–E, G) and **PARTIAL** (B).

**Case G is the honest current state of the repository:** the runner correctly refuses to certify a build that `STATUS.md` does not name. **Case H is the defect in the existing draft:** it reports PARTIAL *and* exits 0, and it would print the same PARTIAL line if every check had passed.

**Temporary fixtures removed:** the sandbox (`…/opencode/sb-runall`, `…/opencode/sb-real`) and every fixture (`pw4.js`, `validate.js`, `phone.js`, `baseline.json`, `manifest.txt`) are gone; the repository's `tests/` contains only the seven pre-existing files, and **no fixture of mine is present** (VERIFIED by listing the directory and by grepping for the fixture marker).

**The product build under test — VERIFIED:** `NFL Draft Simulator merged.html`, sha256 **`044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`**, 656,746 B (the candidate; the Owner's V21).

---

## D · Disagreements between the contract and the proposed behaviour

1. **S-301's filed text vs C5** — the contract wins (C4's precedence rule). The filed entry's four-step order, its `MISSING:` wording and its exit-1-for-a-missing-script are **not** implemented; C5's six-step order, `SKIPPED` wording and `PARTIAL` status are.
2. **The exit code for PARTIAL** — the contract fixes the line, not the code; I propose **2** and ask for a ruling.
3. **The `STATUS.md` matcher** — the contract assumes one reference-build hash; the current file has three, and the merged build "has no hash yet". The proposal needs a single canonical line.
4. **`AGENTS.md`'s testing checklist** names `pw4.js` as if it exists; the runner will report it SKIPPED. That is a documentation drift, not a runner defect.

## E · Remaining blockers

- **Owner/Architect/queue-maintainer approval** to build `tests/run_all.sh` at all (S-301 is pending, owned by Nemo Super; C6 requires acceptance first).
- **A `STATUS.md` build-hash line naming the build under test** — without it, step 0 exits 4 on every build. AGENTS.md allows *"the verifying session"* to update **only the build-hash line**; the Owner assigns that session.
- **The harness scripts themselves** (pw4, validate, phone) and `tests/manifest.txt`, `tests/baseline.json`, `tests/2025_standings.js` — none exist; each is its own queued submission (S-102, S-502, S-401, S-202, S-203).
- **The SIM-CORE markers and the three headless entry points** — a product change only Claude can make, and the precondition for the whole harness.

## F · The next recommended task

**Not a new runner.** The cheapest next step that the current governance already authorises: **the Council Contribution Assessment and Assignment Guide (PR #5) and the intake validator (PR #6) are both open PRs** — merging PR #6 alone brings the player-data validator, eight node tests, the repository's **only** CI workflow, the issue/PR templates and the workflow guide. That is a bigger improvement per unit of effort than a runner whose scripts do not yet exist. After that, the **decision framing note** (`_agents/moc/notes/decision-framing.md`) gives the Owner five consolidated questions instead of a queue of open ones.

**Files changed by me in this task:** none in the repository. Added, in my own lane only: `_agents/moc/notes/run_all-proposed.sh` (the proposed implementation) and this note. The Phase C harness lives in the temp directory and the sandbox was removed.
