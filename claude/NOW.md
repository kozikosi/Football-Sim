# NOW — the single state file (read at boot, rewrite at end of every chat, max 15 lines)
Updated: 2026-11-06 (boot-v3 + w74 rulings chat). Code last changed at 425f72a; later commits are docs/continuity/Lab tooling/tsconfig only.
- Brand: 76 Pancakes (locked 2026-11-05); banner "76"; "20-0" as a season record stays; slogan "Can you go x?" per sport.
- Targets (skilled player): 90% playoffs, ~35% Super Bowl, 25% title; P(20-0) ~1-2%.
- Tests: 284 pass @ 425f72a (`cd colors && npm test`).
- DONE: P-262 at 90dcd6e (sweep.ts = Muse delivery; bands [D] = REAL-NFL reference, not the engine target; undecided: <=4-wins centre 4.6 vs 4.5, home-win report-only). tsconfig at b27571a (Z.ai w74/04 draft; w75 has none). Cleanups done: V22-Suggestions.md -> `_archive/v22-suggestions.md`, AGENTS.md Figma line, Project boot doc reworded.
- tsc: 298 errors after w74/04 landed (`cd colors && npm ci && npx tsc --noEmit`; typescript is now a devDep; NO_PROXY override). 0 in contract files. Tests 284 pass.
- Engine parity target (Owner, 2026-11-05): win-SD HIGHER than real NFL (clear losers + >=3 other top teams, >=2 in the opposite conference, >=1 in the user's); target is a separate Lab derivation from the skilled-success percentages.
- NEXT (exact): pin a tsc baseline (per-file counts) as the CI gate, then guard passes (drives, schedule, seasonrun = 96 of 298); then the Draft Board slice against `appstate.ts` + `DraftStoreState` (root reducer delegates draft actions to the store). Z.ai: unblocked, rulings in `claude/rulings/2026-11-06-w74-rulings.md`.
- Blockers: none for Z.ai. Owner may overrule the 3 envelope answers (rulings file). Held: hydration wiring/tests, CI-gate pick.
- DONE 6 Nov (boot-v3): bootstrap widens refspec (council/*, gh-pages) and prints a NOW-CHECK freshness verdict; rules live in repo `claude/00-READ-FIRST.md` (authoritative), Project doc = boot stub; AGENTS.md split into a 10 KB core + `claude/ref/agents-*.md` (HTML-era passages corrected). vite IS already a devDep (^8.3.6); only typescript is missing.
- Do NOT apply council/muse path fixes (inbox/20261106-0305-muse-repo-cleanup-path-fixes.md) here: files have not moved on this branch.
- On demand only: UI brief `claude/V22-work-order.md` (grep) · Owner prompts `claude/chat-management.md` · old READ-FIRST `_archive/project-docs/00-READ-FIRST-2026-11-02-full.md` (grep) · council digest only for queue work.
