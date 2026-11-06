# Repo re-audit — semi-professional / best-practices standard

Owner request 2026-11-05 (13:32 HST): "Reaudit the repo organization and make sure it looks like a semi-professional repo. all the folder names are semi-professional and make sense and would be found in a best practices repo." (13:27: clean the repo root — no stray documents on the homepage, everything tucked into folders.)

**Status: EXECUTED 2026-11-05 (Owner: "just move around the files now to their appropriate places").** The moves below are DONE on council/muse (commit, see the bulletin). The root went from 46 .md files + 1 HTML + 4 config (51 files) to 5 harness .md files + 1 HTML + 4 config + README.md + LICENSE (12 files). The held items (harness files + product HTML) still need the Architect — see "Held" below.

## Current state (council/muse root, verified 2026-11-05)

- **~45 .md files at root** (frozen Oct-era docs + live governance docs). Largest: V22-Suggestions.md 329K, CHRONICLE.md 186K, SUBMISSIONS.md 116K, GOVERNANCE-ROUNDTABLE.md 60K.
- **Product:** Football-Sim-PreColors.html (657,486 B, sha256 40233d6b…, pinned by AGENTS.md/BASELINES.md).
- **Config:** .gitattributes, .gitignore, .kilo, biome.json (1,065 B).
- **13 dirs:** _agents, _agents-payload, _archive, _reference, bulletin, colors, council-brief, council, data, inbox, scripts, tasks, tests. (claude/ exists on base/architect, NOT on council/muse.)
- **Missing (best-practices):** NO README.md, NO LICENSE, NO .github, NO docs/ on any council branch.
- **main (the GitHub homepage):** HAS README.md, but NO LICENSE, NO .github. Root is the same ~45 .md files + 2 HTML product files + logo folders (mlb/nba/nfl/soccer-team-logos) + z-core + z-post-blue-* dirs. The homepage is cluttered — the "stray documents" problem lives on main, not just council/muse.

## Folder contents (one level deep, verified)

| Dir | Contents | Verdict |
|---|---|---|
| `council/` | Only `scorecard/` (one subdir) | Confusing name (collides with "the council"); the scorecard is the only thing here. Move it and remove the dir. |
| `council-brief/` | Only `2026-10-21/` (dated dir) | Frozen (Oct 21 brief). → _archive/. |
| `_agents-payload/` | Seat subdirs: beam, ds, nemo-super, or, pickle, vl | Old seat payloads/deliveries. Audit contents; move to the seat lanes (`_agents/<seat>/deliveries/`) or _archive/. |
| `_reference/` | Sacks.webp, Sacksmol.webp (2 images) | Reference images. Move to docs/assets/ if referenced, else _archive/. |
| `data/` | README.md, free-agents-old-ratings.csv, madden27-ratings.csv, madden27-raw-paste.txt, old-names-absent-in-new.txt | KEEP. This is the dataset (1,941 players, tracked, unmodified). Note: the CSVs ARE on council/base and on every seat branch — Beam's P-263 claim that they are "not in this worktree" is wrong; his worktree is stale or he did not look in data/. The Q10 reproduction is NOT blocked by missing data. |
| `scripts/` | build_council_scorecard.py (1 file) | Merge into tools/ (it is a council tool) or keep (best-practices repos have scripts/). |
| `tasks/` | CRITIQUES-DIGEST.md, ROUND-1-*.md, T-20261022/23-claude-*.json, T1–T12 .md | Frozen history (the council now uses PRIORITIES.md + inbox). → _archive/. |
| `tests/` | CONTRACT.md, madden-sim.spec.js | Old-shell tests. The new tests live in colors/test/. → _archive/ (or delete at cutover with the old shell). |
| `_agents/` | ~20 .md (governance + design docs) + seat lanes (beam, ds, glm, minimax, moc, muse, nemo-super, nemo-ultra, nemotron-3-ultra-free, owner-notes, pickle, seats, vl) + TEST-ORDERS | The council's working system. See the rename question below. |
| `inbox/` | 173 files | The council's inbox (one file per idea/snippet). See the rename question below. |
| `bulletin/` | 41 files | The council's message board (one entry per session). See the rename question below. |
| `tools/` | ~20 files (council.mjs, next.mjs, council-sync.mjs, preserve.mjs, lint.mjs, etc.) | KEEP as-is. Best-practices repos have tools/. |
| `colors/` | package.json, src, test | The Svelte 5 + Vite app. KEEP (the name "colors" is the rebuild codename; at cutover the fresh repo may put the app at the root as a standard Vite project — the Architect's call). |

## Root files — the Owner's rule (revised 2026-11-05 16:48 HST): NO LOOSE FILES. Everything in folders.

The Owner's rule is absolute for documents: no loose files at the root. The ONLY files that stay at root are the standard root files that best-practices repos (and the tools themselves) require there — README.md, LICENSE, .gitignore, .gitattributes, biome.json, .kilo. (README.md is the homepage GitHub renders; LICENSE is the root license; .gitignore/.gitattributes/biome.json/.kilo are config the tools read from the root. Every best-practices repo has these at root — they are the root's own files, not "loose" documents.) Everything else goes into a folder.

- **MOVE to docs/ (the harness operating set + live docs):** AGENTS.md, CLAUDE.md, SOUL.md, IDENTITY.md, USER.md, ONBOARDING.md — the harness files Claude and every seat read at chat start — go into `docs/` (with the live docs: CHRONICLE.md, COUNCIL-BULLETIN.md, SUBMISSIONS.md, STATUS.md, INDEX.md, BASELINES.md, MERGE-MANIFEST.md, COLLECTIVE-PROMPT.md, PROJECT-KNOWLEDGE.md, DECISION-LOG.md, and the other live-but-referenced docs). **This breaks Claude's boot unless the boot doc is updated** — he reads AGENTS.md/CLAUDE.md by path at chat start. The boot doc (`claude/00-READ-FIRST.md` + the Project boot doc) must be updated to the new paths (`docs/AGENTS.md`, `docs/CLAUDE.md`, …). That is Architect work (he owns AGENTS.md/CLAUDE.md and the boot doc), done as a package with the move. This also needs a reference sweep first (AGENTS.md, tools/, PRIORITIES.md, COUNCIL.md reference the docs by path) + a coordinated update.
- **MOVE to _archive/ (frozen Oct-era, zero live references):** V22-Suggestions.md (already approved — move intact, do not split), master_task_list.md, rulings_r1_predispatch.md, GOVERNANCE-ROUNDTABLE.md, GOVERNANCE_CHANGE_PROPOSAL.md, NEW_WORKFLOW_ROUND1.md, OPENCLAW-PROMPT.md, and the other frozen-batch files (verified: all live-file references are 0 except V22's two tombstone refs in AGENTS.md + retire-seat.mjs). The V22 move is in Claude's CHAT 1 (approved, queued).
- **MOVE the product file to builds/ (or delete at cutover):** Football-Sim-PreColors.html (657,486 B, pinned by AGENTS.md/BASELINES.md) goes into `builds/` — it is a build artifact, not a document. It is pinned by sha256, so moving it needs re-pinning (Architect work). Note: the old shell is approved for deletion at cutover (latest-wave anchor + archive tag), so this file may simply be deleted then instead of moved. Do not move it now without the re-pin.

## Target structure (best-practices, for the fresh repo at cutover)

```
76-pancakes/                  # fresh repo (Owner confirms the name at cutover)
├── README.md                 # the homepage (GitHub renders it) — NEW
├── LICENSE                   # MIT (Owner decision 2026-11-04) — NEW
├── .gitignore .gitattributes # config (tools read them from root)
├── biome.json .kilo          # config (tools read them from root)
├── .github/                  # NEW — workflows (CI-gate), issue/PR templates
├── builds/                   # the current verified build (PreColors HTML, re-pinned) — or deleted at cutover
├── colors/                   # the Svelte 5 + Vite app (or the app at root as a standard Vite project — Architect's call)
│   ├── package.json src test
├── data/                     # the dataset (madden27-ratings.csv, 1,941 players)
├── docs/                     # ALL documents — the harness operating set (AGENTS.md, CLAUDE.md, SOUL.md, IDENTITY.md,
│                             # USER.md, ONBOARDING.md) + the live docs (CHRONICLE, COUNCIL-BULLETIN, SUBMISSIONS,
│                             # STATUS, INDEX, BASELINES, MERGE-MANIFEST, ...) — NO loose .md files at root
├── tools/                    # council tooling (council.mjs, next.mjs, preserve.mjs, lint.mjs, ...)
├── _agents/                  # council system (see below — rename question)
├── inbox/ bulletin/          # council message board (see below — rename question)
└── _archive/                 # frozen history (V22-Suggestions, master_task_list, tasks/, tests/, council-brief/, ...)
```
Root rule: the ONLY files at root are README.md, LICENSE, .gitignore, .gitattributes, biome.json, .kilo. Everything else — every .md, every HTML — lives in a folder.

## Decisions needed (Owner — these are the load-bearing ones)

1. **The council system names (`_agents/`, `inbox/`, `bulletin/`).** Three options:
   (a) **Keep the underscore/root names** (`_agents/`, `inbox/`, `bulletin/`). The underscore prefix is a clear "not part of the product" signal (like `_archive`, `_reference`). It is unusual but honest and clear, and it costs nothing (no path changes, no tool changes).
   (b) **Nest them under one council dir** (`council/inbox/`, `council/bulletin/`, `council/queue/` for _agents/PRIORITIES.md + lanes). Cleaner and more professional-looking, but it is a migration: `tools/council.mjs`, `tools/next.mjs`, `tools/council-sync.mjs`, AGENTS.md, and every inbox/bulletin reference hardcode the current paths. The Architect must do it (tools/ is Architect-owned) and every seat branch must rebase.
   (c) **Rename to dot-prefixed meta dirs** (`.agents/`, `.council/`). Best-practices repos use dot-prefixed dirs for meta (.github, .vscode). Same migration cost as (b).
   My recommendation: **(a) keep the names for now** (the underscore convention is defensible and costs nothing), and revisit at the fresh-repo cutover if the council system is still the same shape. The visible win is the root .md cleanup + README/LICENSE/.github, not the council dir names.
2. **The branch question (where the cleanup lands).** The GitHub homepage shows `main`, not council/muse. Cleaning council/muse does NOT change the homepage until merged. Options:
   (a) **Clean council/muse now** (as a mergeable proposal) — the fresh repo inherits a clean structure at cutover.
   (b) **Wait for the fresh-repo cutover** — the fresh repo starts clean (README/LICENSE/.github/docs/ + the app + the council system), and the old repo becomes a read-only archive (already decided). No cleanup work on the old branches.
   (c) **Clean main directly** — changes the homepage now, but main has a different history (unrelated root) and is the Owner's direct-push branch; the council branches cannot merge into it cleanly.
   My recommendation: **(b) wait for cutover** (the fresh repo is the clean root; cleaning the old branches is churn). But do the **safe, reversible** moves on council/muse now if the Owner wants visible progress: the V22 → _archive move (already approved, in Claude's CHAT 1) + tasks/ → _archive/ + council-brief/ → _archive/ (both frozen, zero live refs).
3. **README.md + LICENSE + .github/.** These are NEW files (they do not exist on any branch). The README is a portfolio surface (the Owner's pitch is "I managed AI agents building a complex product" — the README should tell that story). The LICENSE is MIT (decided). The .github workflows are the CI-gate (the Architect picks the design). Who writes the README? The Owner said the interview-ready README is deferred late-stage work he will handle or narrate himself. So: do NOT write the README now (defer to the Owner); DO add the LICENSE (MIT, one-line, no decision needed) and the .github CI workflow (once the Architect picks the CI-gate design).
4. **`colors/` — keep the name or rename at cutover?** "Colors" is the rebuild codename. At cutover the fresh repo could put the app at the root as a standard Vite project (src/, package.json at root) — that is the most best-practices shape. But it is the Architect's call (he owns the code layout). Do not rename now.
5. **The harness files move (AGENTS.md, CLAUDE.md, etc. → docs/) + the boot-doc update.** Moving the harness files breaks Claude's boot (he reads AGENTS.md/CLAUDE.md by path at chat start). The boot doc (`claude/00-READ-FIRST.md` + the Project boot doc) must be updated to the new paths (`docs/AGENTS.md`, `docs/CLAUDE.md`, …) in the SAME change as the move. That is Architect work (he owns AGENTS.md/CLAUDE.md and the boot doc). Do not move the harness files without the boot-doc update in the same package — a move without it strands Claude at his next cold start.

## Execution (2026-11-05, Owner-directed) — DONE

- **Frozen docs (28 files, 0 live refs) → `_archive/project-docs/`** (new dir): ADVISOR-PLAYBOOK, BOOTSTRAP, CLAUDE_DOMINANT_WORKFLOW, CONSENSUS_BLOCK_FORMAT, COUNCIL-RELIABILITY-REVIEW-PROMPT, COUNCIL-RELIABILITY-RULE, COUNCIL-SCORECARD, DECISION-LOG, FINAL_CONSOLIDATION, GOVERNANCE_CHANGE_PROPOSAL, INTAKE-NOTE, INTEGRATION_AUDIT_LIGHTNING, KNOWN-ISSUES, LIGHTNING_SUBMISSION_READY, MASTER_GUIDE, MERGE-CHECKLIST, NEW_GIT_WORKFLOW, NEW_WORKFLOW_ROUND1, OPENCLAW-PROMPT, OUTSTANDING_TASKS_SUMMARY, OtherChambers_AI_Critiques, ROADMAP, ULTRA_PROMPT, V20_COMPARED_TO_AUTHORITATIVE, V20_CRITIQUE_vs_CANONICAL, VERIFICATION-TEMPLATE, master_task_list, rulings_r1_predispatch.
- **V22-Suggestions.md → `_archive/v22-suggestions.md`** (intact, not split). This completes Claude's CHAT 1 cleanup item 3a — he should skip it.
- **Live docs (12 files) → `docs/`** (new dir): BASELINES, CHRONICLE, COLLECTIVE-PROMPT, COUNCIL-BULLETIN, GOVERNANCE-ROUNDTABLE, INDEX, MERGE-MANIFEST, ONBOARDING, PROJECT-KNOWLEDGE, QUESTIONS-FOR-THE-ARCHITECT, STATUS, SUBMISSIONS.
- **tasks/ (24 files) → `_archive/tasks/`; council-brief/ → `_archive/council-brief/`; tests/ (CONTRACT.md, madden-sim.spec.js) → `_archive/tests/`; _agents-payload/ → `_archive/payloads/`; _reference/ (Sacks.webp, Sacksmol.webp) → `_archive/reference/`.**
- **council/scorecard/ → `_agents/scorecard/`** (events.jsonl + archive/); `scripts/build_council_scorecard.py` line 17 updated to the new path; the empty `council/` dir removed.
- **References I could update — done:** _agents/PRIORITIES.md (MERGE-MANIFEST.md, CHRONICLE.md → docs/); _agents/README.md + _agents/RETIREMENT.md (_agents-payload/ → _archive/payloads/); scripts/build_council_scorecard.py (scorecard path).
- **References I could NOT update — filed for the Architect:** `inbox/20261106-0305-muse-repo-cleanup-path-fixes.md` (exact fix list for AGENTS.md + tools/sync-mirrors.sh + tools/retire-seat.mjs + tools/build-seat-packets.mjs + tools/admit-seat.sh). These dangle until Claude fixes them in his next chat.
- **NEW files:** README.md (sample, in the Owner's tone — draft for him to edit) + LICENSE (MIT, Owner decision 2026-11-04).

## Held (NOT moved — needs the Architect)

- **Harness files** (AGENTS.md, CLAUDE.md, SOUL.md, IDENTITY.md, USER.md) stay at root. Moving them needs the boot-doc update (`claude/00-READ-FIRST.md` + the Project boot doc) to the new paths in the SAME change, or Claude's next cold start breaks. The move + boot-doc update is a package for Claude's next chat.
- **Football-Sim-PreColors.html** stays at root. It is pinned by sha256 (AGENTS.md/BASELINES.md); moving it needs a re-pin. It may simply be deleted at cutover (approved, latest-wave anchor + archive tag).

## Root after the cleanup

5 harness .md files (AGENTS.md, CLAUDE.md, IDENTITY.md, SOUL.md, USER.md) + Football-Sim-PreColors.html + .gitattributes + .gitignore + .kilo + biome.json + README.md + LICENSE = 12 files. Root dirs: _agents/, _archive/, bulletin/, colors/, data/, docs/, inbox/, scripts/, tools/. (council/ is gone.)

## Not in this audit

- The product code layout (colors/src/) — the Architect's domain.
- The CI-gate design (the Architect picks from OR/Beam/VL/VLOC/GLM answers).
- The README content (deferred to the Owner, late-stage).
