# W4 — Evidence publication: what is already published, and the rollback

**Author.** MOC · 20 Oct 2026 · ID block S-2500–2599

## 1. Disclosure first — I published before this brief

Acting on the Owner's earlier instruction ("attach or link the current result JSON, script, screenshots and
trace from a durable location in the PR discussion. The 65 MB trace should be linked as an artifact rather
than committed to the product branch"), I did the following **before** the council brief arrived:

| action | detail | when (UTC) |
|---|---|---|
| created a release | `e2e-evidence-2026-10-20T225702Z` on `kozikosi/Football-Sim` | 23:28:06 |
| uploaded 9 assets | `result.json`, `SUPERSEDED.md`, `test-script.spec.js`, `OPENCHAMBER-E2E-RESULT.schema.json`, `screenshots.zip` (19,697,908 B), `trace-1792537070181.zip` (65,863,244 B), `schema-validation.txt`, `trace-playoffs-forensics.txt`, `validate-e2e-result.py` | 23:28–23:30 |
| posted a comment on PR #3 | the reconciliation, 13,822 chars | 23:29:10 |
| verified | every asset URL returns HTTP 200; `result.json` re-downloaded and hashed → `d64a5f9b…` (identical) | after |

**Release URL:** <https://github.com/kozikosi/Football-Sim/releases/tag/e2e-evidence-2026-10-20T225702Z>
**PR comment:** <https://github.com/kozikosi/Football-Sim/pull/3#issuecomment-6304124055>

**Two things the Owner should know:**

1. **The repository is public** (`gh repo view --isPrivate` → `false`), although R1 calls the project
   internal. A *published* release therefore makes these assets publicly downloadable. The content is the
   simulator's own public screenshots and a trace of a public app — no credentials, no personal data — but
   the visibility change is real and is the Owner's call.
2. **I published rather than proposed**, because the brief's W4 says "Do not upload, merge, or change the
   PR without assignment from an architect or owner", and the assignment that existed at the time was the
   Owner's explicit instruction in the preceding turn. The protocol itself also asks for exactly this
   ("Attach screenshots and the Playwright trace/report to the same PR or run artifact; do not commit large
   binary traces into the product branch. Include the JSON and artifact links in the PR discussion."), so
   the action is protocol-compliant in substance.

**Rollback, if the Owner prefers the proposal-only path (one command each):**

```sh
# 1. delete the release and its assets
gh release delete e2e-evidence-2026-10-20T225702Z --repo kozikosi/Football-Sim --yes
# 2. delete the comment
gh api -X DELETE repos/kozikosi/Football-Sim/issues/comments/6304124055
```

Nothing was committed to any branch, so there is no commit to revert and the product branch never
contained the trace.

## 2. Proposal (if the Owner wants the artefacts elsewhere)

| option | where the evidence lives | pros | cons | default |
|---|---|---|---|---|
| **A. Published release (current state)** | GitHub release assets on the public repo | durable, versionable, standard download URLs, no branch pollution, no size limit | assets become public on a public repo; a release is immutable-ish (assets can be replaced, the tag can move) | **current choice** — it matches the protocol's own instruction |
| B. Draft release | same, but not published | private to collaborators | **the download URLs 404** — a draft release's assets are not linkable, so this fails the brief's "durable location" requirement | rejected, with the caveat measured (I tried it: `/releases/download/…` → *Not Found*) |
| C. GitHub Actions artifact | an artifact from a workflow run | the native CI mechanism, 90-day retention | needs a workflow on the branch (the PR branch has none), retention is short, and it is a moving target | rejected |
| D. Commit the small files to the PR branch, keep the trace on a release | `tests/evidence/…` on `gpt/openchamber-e2e-suite` | per-file permanent blob URLs inside the PR; reviewers see the evidence in the diff | adds a commit to another seat's branch; the 20 MB of PNGs would bloat the repo history | **recommended next step, on assignment** — commit only `result.json` (+ the v2 record) and the script; leave PNGs and trace on the release |
| E. The owner's own storage | any object store the Owner controls | full control, private | not linked from the PR without a stable public-ish URL | available if the Owner prefers a private location |

## 3. What is still missing from the published set, and why I did not add it

The **proposed corrected result record** (`_agents/moc/notes/result.v2.proposed.json`, sha256
`ccddff0dedf51937f828c7ac9e31accd369eb66111ac9a33167c7e8bf378bcc2`) and the **W2/W3/W5 notes** are **not**
uploaded, because the brief now says not to change the PR without assignment. They are ready to attach on
one word, and the brief's W5 explicitly wants "a new, clearly versioned file or correction record that
points to the original and explains the difference" — the v2 record is exactly that:

- it **does not modify** the original (`d64a5f9b…` is cited in its first note);
- it corrects the Week 1 reason, the screenshot count (26) and the schema-validation claim;
- it is **schema-valid** (jsonschema 4.25.1, Draft 2020-12 + FormatChecker → 0 errors, 17/17 required
  fields) — verified, not asserted;
- it keeps `seasonMetrics.*` null, because the run did not measure them.

## 4. Also worth deciding (Owner / architects)

1. **Does the evidence belong in the repo at all?** The protocol says "Attach … to the same PR or run
   artifact; do not commit large binary traces into the product branch" — it does not forbid committing the
   JSON and the script. Today `tests/openchamber-e2e.spec.js` is untracked and absent from PR #3, so the PR
   contains the protocol and the schema but **not the executable** the run used. Recommended default:
   commit the script + the result JSON to the PR branch (option D) so the PR is self-contained; the trace
   and PNGs stay on the release. Cost of being wrong: one extra commit to review, and a stale copy risk if
   the script changes without a new run.
2. **The evidence file name.** The protocol asks for `e2e-40233d6b-2026-10-20.json`; the run folder is
   `e2e-<epoch-ms>` and the file is `result.json`. Recommended default: publish the copy under the
   protocol's name and keep the local path too. Cost: nothing.
3. **A "run id" that is immutable.** Today the only run identifier is a directory name that a later run
   would not overwrite, but the *result file inside it* was overwritten. Recommended default: the harness
   writes `result.<runId>.json` and never mutates it (W3 R6). Cost: one line in the harness.

---

## STATUS UPDATE — 2026-10-21T00:25Z (appended, not rewritten)

- **MiniMax took W4 at M-109** (publication plan). The brief's W4 says "Do not upload, merge, or change the
  PR without assignment" — I had already published under the Owner's earlier instruction, so my §1
  disclosure stands and my recommendation is that his plan **extends** this state rather than replacing it.
  **BOC M-110 has already verified the published state independently** ("Release
  `e2e-evidence-2026-10-20T225702Z` VERIFIED present with 9 assets incl. trace (65,863,244 B) and
  screenshots.zip (19,697,908 B); no re-upload needed, BOC extends rather than replaces"), so there is no
  duplicate upload and nothing to undo.
- The **v2 proposed record** (`result.v2.proposed.json`, sha256 `ccddff0d…`) and the W2/W3/W5 notes are
  still **not** uploaded; they remain available for attachment on one word, and the v2 record is
  schema-valid (jsonschema 4.25.1 → 0 errors, 17/17 required fields).
