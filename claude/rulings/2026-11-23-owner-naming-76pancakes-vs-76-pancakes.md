# Owner ruling, 23 Nov 2026 (REPORTED in the Owner's message; recorded by the Architect, append-only)

**Owner's words:** "The official name is '76Pancakes' within the url or documents but the user or in the readme it should always be referred to as '76 Pancakes'."

**How I apply it (Architect's reading; the Owner can correct it):**
| Where | Form |
|---|---|
| URLs and repo name/path (`<owner>/76Pancakes`), identifiers, file names, documents in the repo | **76Pancakes** |
| `README.md`, and everything a user sees (page title, headers, app text, share cards) | **76 Pancakes** |
Hostnames are case-insensitive and canonically lowercase, so `76pancakes.workers.dev` is the same address as `76Pancakes.workers.dev`; the rule governs what we write, not DNS. "Documents" I read as repo documents other than the README (governance, contracts, rulings); that is the one phrase I am least sure of.

**Going forward (V = what exists today, git grep over live paths; frozen dirs excluded).**
- New files I write use **76Pancakes**; the README and UI text use **76 Pancakes**. Existing files are NOT rewritten now (churn; the sweep is commit 1 of the cutover, `inbox/20261122-1749-…-DELTA-1.md` §4).
- Today the user-visible page title is `20-0` (`colors/index.html:6`, `colors/src/main.ts:56,59`, the engine dev page, not the product UI). The product UI is Z.ai's lane: **flag for Z.ai: page `<title>` and the header say "76 Pancakes"** (slice work, not an engine change; no `colors/src/{core,sports,platform}` bytes may change).
- `package.json` descriptions already say "76 Pancakes" (`colors/package.json`, `server/package.json`): correct for user-facing prose; the technical `name` fields (`colors`, `server`) are a commit-2 rename.
- Hostnames already read `play.76pancakes.workers.dev` (`server/wrangler.jsonc:16`, `server/src/auth.ts:7`, `server/test/*`); unchanged, lowercase is the hostname form. The account subdomain is still the Owner's to create (NOW.md OPEN).
- **Commit-1 sweep list (old brand "Football-Sim"/"Football Sim", 46 live files outside frozen dirs; top by count):** `claude/chat-management.md` 8, `NEW_GIT_WORKFLOW.md` 7, `GOVERNANCE-ROUNDTABLE.md` 5, `claude/ref/agents-2-build-truth.md` 4, `BASELINES.md` 4, `PROJECT-KNOWLEDGE.md` 3, `INDEX.md` 3, `COUNCIL-BULLETIN.md` 3, `tools/sync-mirrors.sh` 2, `AGENTS.md` 2, `claude/bootstrap.sh` 1, and in `tools/mathlab/`: `param-diff.mjs` 3, `recv-plan-experiment.js` 3, `apply-math-patch.mjs` 2, `README.md` 1, `run-all.sh` 1 (`CLAUDE.md` has none). Also found: a compiled `tools/mathlab/__pycache__/pmath.cpython-313.pyc` is tracked in git; it should not cross into the clean repo (drop it from the commit-0 crossing set and ignore `__pycache__`). **Never swept:** real historical artifact filenames (`Football-Sim-Z-post-blue-w54.html`, `Football-Sim-PreColors.html` in `colors/src/sports/nfl/view/{teamColors,theme}.ts:2`, `colors/test/nfl/theme.test.ts:8`, `colors/tools/make-golden-matchup.cjs:3`): they cite real files by md5.
- No README exists yet (`git ls-tree`: 0 matches); it is a commit-1 file and will say "76 Pancakes".
