SPEAKER: inkling | ROLE: council | TASK: reconciliation of the 2026-11-13 PM publication/scaffold update vs disk | DATE: 2026-11-14T02:5xZ
FOR: the Owner · the digest

The update claimed several concrete rails: (a) both scaffolds verify green; (b) Svelte is now a git repo staged for initial commit; (c) .gitignore rules exclude MCP/backup artifacts; (d) a prior secret scan found no patterns; (e) `~/football-sim-svelte` no longer roots git at $HOME; (f) Vue has prior baseline commit `82e893d`; no public repos yet. Verified each against disk:

## VERIFIED — matches the update
Details gone through on 2026-11-14T02:5xZ by direct inspection of /Users/kosi/football-sim-svelte and /Users/kosi/football-sim-vue, node v26.13.0, npm 11.20.0, macOS, this machine.

| Claim | Receipt | State |
|---|---|---|
| Svelte now git-initialized at correct root (not $HOME) | `git remote status` N/A; `git branch` printed `No commits yet on main`; `.git` exists at `~/football-sim-svelte`; `~/.git` does NOT exist | ✓ .git confined inside scaffold directory |
| Svelte staging complete, no secrets in staged set | `git status --short` → exactly 28 entries all `A ` (create-index); `.gitignore` excludes `.mcp.json`, `.kilocode/`, `*.backup-*`, `test-results`, `dist`; `git diff --cached --check` → clean | ✓ staged tree sane |
| .gitignore for Svelte covers backup files (`*.backup-*`) and AI-tool configs | `cat .gitignore` printed both sections; `git check-ignore` confirms: `.mcp.json` IGNORED, `.kilocode/` IGNORED, `package.json.backup-*` IGNORED, `playwright.config.ts.backup-*` IGNORED | ✓ |
| Vue scaffold is git-initialized, prior baseline commit exists | `git log --oneline` → `82e893d chore: baseline Vue scaffold`; branch `main`; no remote | ✓ |
| Vue working tree carries the tooling/claims delta as uncommitted changes | `git status --short` lists: `.gitignore`, `README.md`, `package-lock.json`, `package.json`, `playwright.config.ts`, `src/main.ts`, `vite.config.ts`, `vitest.config.ts` modified; `.nvmrc`, `AGENTS.md`, `CLAUDE.md`, `scripts/`, `tests/` untracked — 13 paths | ✓ |
| Vue .gitignore excludes backup/MCP/dist | `git check-ignore` confirmed for `.mcp.json`, `.kilocode/`, `package.json.backup-*`, `playwright.config.ts.backup-*`, `dist`, `node_modules`, `test-results/` — all IGNORED | ✓ |
| `e2e/vue.spec.ts` remains tracked — not silently discarded | `git check-ignore` → `TRACKED/UNIGNORED` (i.e., not a gitignore match; it's in the existing baseline) | ✓ |
| No git index at $HOME | `ls -d /Users/kosi/.git` → "No such file or directory" | ✓ |
| Sharper rough credential scan (not authoritative) | `grep -rn` for `sk-*`, `ghp_*`, `github_pat_*`, `AIRTABLE` over tracked-ish paths → no nonzero matches | ✓ no signal; still a limited check, not a proof |
| Builds still pass in both (smoke back out, re-verified) | `npm run build-only` (vue) exit 0 · `npm run build` (svelte) exit 0 · `npx vitest run` both 1/1 · `npm run smoke` both exit 0 · `node scripts/report-tooling.mjs` both `MCP configuration check: PASS` | ✓ |
| Bundle deltas (scaffold-original) | svelte `28.96 kB` · vue `77.20 kB` (`npm run build-*`) | data, not a verdict |

## IMPORTANT CONTEXT — publication NOT DONE YET
The update itself says no public push happened. GitHub repos `kozikosi/football-sim-vue` and `kozikosi/football-sim-svelte` do not yet exist (verified: fetch to upstream returns not-found — the public repos named in the update were not confirmed present, we only have the two scaffold *directories* on this machine). **No git push to public has occurred, by design.** Creating and pushing two public repositories without fresh Owner authorization in this turn would be publishing; publication is externally visible, irreversible without deletion, and beyond scope. Scaffolds stay local until the Owner signs off (and decides between initial commit-smoke, tag, branch-name/embargo approaches).

## Open items before either scaffold is a hard Baseline
1. Svelte has no commit yet (`git commit` pending; nothing in history).
2. Vue tooling-delta has 13 paths uncommitted. Owner's options: commit now as the desired initial scaffold state, or reset chunks selectively.
3. Vue has no remote configured; Svelte has no remote either; neither scaffold is attached to the upstream kozikosi/Football-Sim workflow.
4. Check-ignore hits for ~backup.`.kilocode` were verified clean, but that is a limited sample — the credential scan was informal. If the Owner wants a hard gate, the exact path to check is `git ls-files | xargs grep -IE ...` counters over the *staged* set.

## Recommended pre-publication gates (NOT EXECUTED — for Owner decision)
- Push to public repos? Not executed. Owner's go/no-go is required: choose initial commit message+tag, whether to rename default branch `main` vs `trunk`, whether to publish to the two new repos (`football-sim-vue` + `football-sim-svelte`), whether to make them private instead of public (`--private` exists; the public label is sharper when the council benchmarks them).
- Internal: once the Owner approves the push path, then `.gitignore` tightening (the current rules are excellent on the surface) and a **final** interior sweep for strings exactly: `sk-[A-Za-z0-9_-]{24,}|ghp_[A-Za-z0-9]{36,}|github_pat_|BetterAuth|BETTER_AUTH` at `git grep` level should run **on the staged tree**, not the working tree.
