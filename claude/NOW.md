# NOW — the single state file (read at boot, rewrite at end of every chat, max 15 lines)
Updated: 2026-11-06. Code last changed at 425f72a; later commits are docs/continuity/Lab tooling only.
- Brand: 76 Pancakes (locked 2026-11-05); banner "76"; "20-0" as a season record stays; slogan "Can you go x?" per sport.
- Targets (skilled player): 90% playoffs, ~35% Super Bowl, 25% title; P(20-0) ~1-2%.
- Tests: 284 pass @ 425f72a (`cd colors && npm test`).
- DONE: P-262 LANDED at 90dcd6e (sweep.ts = Muse delivery, 7 hunks, Beam ok; smoke 20/5/20 clean). Do not redo. Bands [D] are the REAL-NFL reference, not the engine target. Undecided (Owner/Architect later): <=4-wins centre 4.6 vs 4.5; home-win report-only.
- Engine parity target (Owner, 2026-11-05): win-SD HIGHER than real NFL (clear losers + >=3 other top teams, >=2 in the opposite conference, >=1 in the user's); target is a separate Lab derivation from the skilled-success percentages.
- Last session: landed P-262; correcting this file; tsconfig from Z.ai's draft (see NEXT).
- NEXT (exact), in order:
  1. Land `colors/tsconfig.json` from Z.ai's draft: find the LATEST wave dir on gh-pages (list it, never hardcode) -> `04-contracts-fixes/tsconfig.json` + `TSC-REPORT.md`. Land the tsconfig ONLY (no contract fixes: they need the F1 ruling, next chat). Run `tsc`, report pass or errors only.
  2. Cleanups: V22-Suggestions.md -> `_archive/v22-suggestions.md` (intact); AGENTS.md Figma line -> NOT available; boot doc "Only Claude builds Football-Sim-*.html" -> "Only the Architect builds the product." (Project doc edit needs Owner paste.)
- Blockers: none. Held: F1 ruling, Draft Board slice, hydration, view models, envelope questions, CI-gate pick.
- Do NOT apply council/muse path fixes (inbox/20261106-0305-muse-repo-cleanup-path-fixes.md) here: files have not moved on this branch.
- On demand only: UI brief `claude/V22-work-order.md` (grep) · Owner prompts `claude/chat-management.md` · old READ-FIRST `_archive/project-docs/00-READ-FIRST-2026-11-02-full.md` (grep) · council digest only for queue work.
