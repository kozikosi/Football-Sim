# E2E evidence audit — W1 (independent re-verification), W4 (publication plan), W6 (id census)

**MiniMax (S-1900–1999) · 21 Oct 2026 · read-only audit + one new tool · no product file touched.**

Labels: **VERIFIED** (reproduced from the stated artifact) · **REPORTED** (another party says so; I
could not reproduce it) · **INFERRED** (reasoned, basis stated) · **UNKNOWN** (the evidence does not
settle it).

---

## W1 — independent artifact audit (my re-verification of the brief's claims)

| Claim | My check | Verdict |
|---|---|---|
| `result.json` sha256 `d64a5f9bb3ab6e7b…` | `shasum -a 256 test-results/e2e-1792537022298/result.json` | **VERIFIED** — `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396` |
| executable script sha256 `ee9aaa44d00557d6…` | hashed both the run copy `test-script.spec.js` and `tests/openchamber-e2e.spec.js` | **VERIFIED** — identical, `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` |
| artifact sha256 `40233d6be00e987c…` | hashed **four** copies: `merged.html` (workspace root), `NFL Draft Simulator merged.html`, `origin/merge/v20-donor:NFL Draft Simulator merged.html`, and my own `/tmp` extraction | **VERIFIED** — all four are byte-identical `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) |
| 26 screenshots listed, all present | 26 entries in `result.json.screenshots`, 26 PNG files in the run dir, **0 missing** | **VERIFIED** |
| the JSON's own note says "24 screenshots" | the note reads *"…11 steps, 20 viewport checks, 24 screenshots…"* while the array holds 26 | **VERIFIED — a stale count inside the record itself** |
| trace present, ~65.9 MB | `test-results/e2e-1792537022298/trace/trace-1792537070181.zip` | **VERIFIED** — 65,863,244 B (62.8 MiB) |
| 11 steps, `week-1-display` SKIP, 10 PASS; status PARTIAL | read `steps[]` and `status` | **VERIFIED** — 11 steps, `week-1-display=SKIP`, the other ten PASS, `status: "PARTIAL"` |
| 20 viewport records, 0 console/page errors, runner Playwright 1.64.1 / Chromium 156.0.8078.4 | read `viewportChecks`, `consoleErrors`, `pageErrors`, `runner` | **VERIFIED** as recorded |
| the 100-season step took 14,451 ms | the step record carries the duration; `seasonMetrics.reportDurationMs` is **null** | **VERIFIED** — the metric and the step disagree; report the step duration, keep the null visible |
| the JSON records 272 games | `seasonMetrics.regularSeasonGamesPlayed` is **null**; the step text says the expected count is 272 | **VERIFIED that 272 is NOT verified by the record** — it is an expectation |
| Lightning's run | no Lightning run artifacts exist in this checkout (`test-results/` holds one populated run dir and one empty one) | **UNKNOWN** — not reproducible here; I do not infer |

### Three findings that are NOT in the brief's list

1. **`test-results/.last-run.json` contradicts the evidence record.** It contains
   `{"status":"passed","failedTests":[]}` — Playwright's own last-run marker says **passed**, while
   `result.json` says **PARTIAL** (one step SKIPped). A reviewer who opens only that file concludes
   the suite passed. **VERIFIED** (file read; 45 bytes).
2. **There are two run directories, and the second one is empty.** `test-results/e2e-1792537022083/`
   contains only an empty `trace/` directory and **no result.json** — a second run attempt that
   produced no record. So "the run" is not unique on disk. **VERIFIED.**
3. **The recorded `artifactPath` is an owner-machine absolute path** —
   `/Users/kosi/Desktop/Football Sim/merged.html`. It resolves here (the file is present, and its
   hash matches), but the file is **untracked** in git (`git status` → `?? merged.html`), and the
   tracked copy on the branch has a *different filename* (`NFL Draft Simulator merged.html`). A
   reviewer who clones the repo cannot resolve the recorded path. **VERIFIED.**

## W4 — evidence publication plan (proposal only; nothing uploaded, merged or changed)

* **Keep the 63 MB trace off the product branch.** Proposed: a **GitHub release asset** on a tag
  named for the run (`e2e-1792537022298`) attached to the repository's releases, linked from the PR
  and from the evidence index. A tag is immutable; a release asset is downloadable by every reviewer
  and cannot enter the product tree. (Cost: one upload of 63 MB by whoever owns publishing.)
* **Publish the small evidence in a dedicated branch**, e.g. `evidence/e2e-1792537022298`, holding
  `result.json` (14 KB), `test-script.spec.js` (17 KB), the schema copy, and the 26 PNGs (~13 MB
  total) — and let PR #3 link to that branch by commit id. The product branch stays clean; the
  evidence is versioned and reviewable.
* **Make the record self-contained:** replace the absolute `artifactPath` with a repo-relative path
  plus the hash (the hash is the real identity), and split the screenshot list into *viewport* and
  *light/dark* groups so the 26 entries are readable — the brief asks for that distinction, and the
  array currently mixes `viewport-*.png` with `*-light.png` / `*-dark.png`.
* **Never mutate the original.** Any correction ships as a new versioned record that names the file
  it supersedes and lists the differences — the three stale statements I verified (the "24
  screenshots" note, the null `reportDurationMs`, the `.last-run.json` "passed") are exactly what a
  correction record should enumerate.
* **Cost of being wrong:** low (nothing is uploaded or merged by this proposal; the Architect and
  the Owner own publishing). **Cost of doing nothing:** the evidence stays on one machine, and the
  next reviewer repeats the reconciliation from scratch — which is what this audit just did.

## W6 — markup-id census (a new tool, `SIM-PLATFORM/tools/id-census.mjs`)

The brief lists "scan markup IDs referenced by code and identify missing or unused IDs". Done
mechanically, on the merged candidate and on the reference build:

| | merged candidate `40233d6b…` | v20 `31b7d61f…` |
|---|---:|---:|
| ids referenced by code | 105 | 100 |
| ids in the static markup | 63 | 63 |
| ids created in JS only | 61 | 56 |
| ids defined (union) | 124 | 119 |
| **referenced but absent** | **2** | **1** |
| defined but unused | 21 | 21 |

**The two "absent" ids, examined one by one — neither is a crash risk:**

* **`seasonHost`** (first referenced at line 847) — the **donor's** Season-tab host. The merged
  build keeps v20's markup, so there is no `#seasonHost`; the call is **null-guarded**
  (`const host = document.getElementById('seasonHost'); if(!host) return;`). Harmless — and it is
  *evidence* that donor Season-tab code rode along into a build that has no Season tab, which is the
  same class of finding as the `renderSeasonTabInner` question in M-53/M-66. **Coupling note for the
  Architect, not a defect.**
* **`lineupSeason`** (first referenced at line 3996) — a **false positive of the static census**: the
  id is assigned at runtime (`wireLineupEditor(roster, 'lineupSeason', …)` → `container.id = …`), so
  it never appears as `id="lineupSeason"` in the source. The same id appears in v20, where the
  census behaves identically.

**Recommended default (proposal, not a change):** run the census as a *reporting* step of the gate
for one round, and promote "referenced but absent" to a FAIL only after the runtime-assigned class
is taught to the tool — a FAIL on a census with a known false-positive class would train the council
to ignore it. Cost of being wrong: one round of noise. Cost of doing nothing: a missing id (a crash
at runtime, not a visual nit) is found by a user instead of by the gate.
