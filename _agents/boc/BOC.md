# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- Anchor build: Football-Sim-PreColors.html, sha256 40233d6be00e987c…, 657,486 B.
- Session 29 Oct (cont. 14): reviewed P-109 (improved) — caught a definite bug: `${card}` (function object) instead of `${players}` in renderKeyPlayersHTML, plus missing `</div>`, LABELS[p.group] lookup, and 13 further findings. Pushed inbox/20261029-2006-boc-P-109-review.md.
- Session 29 Oct (cont. 15): reviewed P-110 (improved) — caught lineupEditorHTML receiving a slotmap where a roster is expected (`seasonState.teams[user].slotmap` vs `draftSim.rosters`), `renderLineupMatchupMath` never rendering (guards on non-existent `S.opponent`), `zpbTeamLogo` absent (beam's claim otherwise), win-value decimal nuance, invalid mobile CSS. Pushed inbox/20261029-2010-boc-P-110-review.md.
- Session 29 Oct (cont. 16): reviewed P-111 (improved) — font-size 21px conflict, `--gold` light-mode override conflict, single-file font constraint (base64 vs relative paths), `foilShimmer` vs `textShimmer` naming, `#fff` in gradients, `--rose` undefined, `!important` overuse, Cinzel too ornate for small UI. Pushed inbox/20261029-2011-boc-P-111-review.md.
- Session 29 Oct (cont. 17): reviewed P-112 (improved) — recap detail divs are flex items in `.sched-cards` (layout bug), win/loss tint never applies (`--team-primary-rgb` never set per card), `@/vs` nested inside user's block not between logos, `wireScheduleClicks` line ref wrong (3874 not 3888) and becomes dead code, playoff section is incomplete placeholder, bye-week card unimplemented (no byes in schedule), cards not keyboard-operable, `getTeamColor`/`Cinzel` unguarded. Provided full corrected implementation. Pushed inbox/20261029-2022-boc-P-112-review.md.
- Session 29 Oct (cont. 18): reviewed P-114 (improved) — `seasonState.playerStats[user]` undefined (keyed `team|name`), `formatPlayerStats` undefined (use `seasonStatLine`), `renderSeasonSummaryPanel` returns string but called as void, `getTeamColor`/`zpbTeamLogo` unguarded, undefined keyframes (`textShimmer`/`buttonShimmer`/`championRotate`/`badgePulse`), undefined vars (`--rose`/`--gold-light`/`--team-*`), palette literals (`#fff`/`#fff8e1`/`rgba(255,255,255,0.4)`), `showSummary` lifecycle, `divisionStandings(conf,...)` wrong arg type, `divRank` 0-guard. Provided corrected core. Pushed inbox/20261029-2030-boc-P-114-review.md.
- Session 29 Oct (cont. 19): reviewed P-115 (improved) — turnover hook wrong: turnovers are in `g.detail[side].giveaways` (INT/FUM), not `homeEvents`/`awayEvents` (which only hold TD/FG/SAF/OTH); OT 75s exceeds Owner's 60s cap; guarded `var(--team-primary)`/`var(--opp-primary)` and Cinzel; CONTINUE button must be removed not hidden and appended to animation container; `+x` pop needs positioned container; giveaway needs `t` for ordering; `animateGame` is P-007's to create; `playGame` at 3478 not 3479. Provided corrected spec. Pushed inbox/20261029-2040-boc-P-115-review.md.
- Session 29 Oct (cont. 20): reviewed P-116 (improved) — `generateGameSummary` returns string not array (`.map` throws); turnover item text property is `.t` not `.txt`; undefined helpers `isCurrentQ`/`switchQuarter`/`filterPlays`/`formatPlayText`/`formatScoreAtPlay`/`gameBallPlayer`; MVP not guaranteed in stars list; `reviewCtx` not stored on game (ctx needed for narrative); `#fff8e1` literal in `.gr-game-ball`; `getTeamColor`/`Cinzel`/`textShimmer` unguarded. Provided corrected core + integration. Pushed inbox/20261029-2050-boc-P-116-review.md.

## What the next session needs
- Read this file, then `node tools/council-sync.mjs --days 3`.
- Worktree: /Users/kosi/Desktop/wt/boc, branch council/boc.
- Candidate next items: P-112, P-114, P-115, P-116 (2/3, need review #3), or P-058, P-067, P-100, P-101 (1/3), or any new top-of-list item from `node tools/next.mjs`.
- Madden ratings: raw dump still not saved; parser ready at `_agents/boc/tools/parse_madden_ratings.py`. Populate when user provides raw.txt.
- New build name: "Colors v1". Architect building on architect/engine-and-seats.
- council/base vs e0f805a divergence unresolved — Architect must merge.

## Open questions
- Whether the Architect will re-hash protected functions with SHA-256 and pin in MERGE-MANIFEST.md (P-038 recommendation).
- Whether team-colours.json brand entries for the 6 mismatched teams will be re-synced (P-034 recommendation).
- Whether Red Zone Efficiency (P-036 stat 10) should be dropped or scoped as sim-core work.
- Whether the Madden ratings raw dump will be saved and parsed.
- Whether the 9 interpretations in W33-INTAKE-LEDGER will be vetoed by the Owner.
- Whether `foilShimmer` or `textShimmer` becomes the canonical keyframe name (P-111 recommendation: `foilShimmer`).
- Whether fonts ship as base64 or system-serif fallback (P-111: single-file constraint; Owner decides).

## Live files
- `_agents/boc/BOC.md` (this file)
- `_agents/boc/tools/parse_madden_ratings.py`
- `_agents/boc/data/madden27-ratings.csv` (header only)
- `_agents/boc/data/README.md`
- `bulletin/20261028-0100-boc.md`, `bulletin/20261028-0200-boc.md`, `bulletin/20261028-0300-boc.md`, `bulletin/20261029-0310-boc.md`, `bulletin/20261029-0950-boc.md`, `bulletin/20261029-1000-boc.md`
- inbox claim/review files through P-111 (P-019, P-020, P-021, P-022, P-023, P-042, P-043, P-044, P-045, P-046, P-064, P-068, P-069, P-103, P-104, P-108, P-109, P-110, P-111)

## Worktree / branch
- Path: /Users/kosi/Desktop/wt/boc
- Branch: council/boc
- merge-base HEAD origin/council/base: d1e335e9 (verify with git merge-base HEAD origin/council/base)