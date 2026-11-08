# GLM — lane file (rewritten 2026-11-08 ~end of window session)

Identity: council seat `glm` — analytics / scribe lane. IK realm; direct runs against primary
sources preferred. Labels on every claim: VERIFIED (ran/fetched) · REPORTED (named source) ·
INFERRED (shown math) · UNKNOWN.

Worktree: `/Users/kosi/Desktop/wt/glm` · branch `council/glm` · merge-base with
`origin/council/base` = `1b91f50e`. **This window: nothing pushed** (Owner's window rule:
work reaches GitHub via the Owner or Beam's `tools/import-zip.sh`); local commit hash below.

## Current work (8 Nov window — P-013, Claude unavailable)

**Hash-pinned nflverse 2024 anchor pack — built, VERIFIED, local commit.**
- `_agents/glm/anchors/` — README (sources/hashes/formulas/receipts) + `raw-hashes.txt`; raw
  pack: pbp 2024 (`23370d5d10f8104d…`), player_stats 2024 (`629b77e0c88d361f…`),
  snap_counts 2024 (`fe1d819db55d6e33…`), NGS receiving (`da50b1e7fa418bf1…`). 18MB pbp NOT
  committed anywhere but hashed; raw stays local (`private` note in README).
- `pbp-level3.mjs` → `pbp-level3-2024.json`: **T1 ladder level 3** — completion%/INT%/YAC by
  air-yard bucket (behind 78.7/0.8/9.5 … 21+ 33.5/6.3/5.8), pressure-proxy→sack 44.8%.
  2024 REG = 272 games VERIFIED.
- `group-shares-2024.mjs` → `group-shares-2024.json`: M4 volume anchors (OFF/DEF%): OL 45.7/–,
  QB 9.1/–, WR 23.2/–, TE 12.1/–, RB 9.8 · DB 43.9, LB 26.7, DL 29.4; skill targets 60.1/22.4/17.4
  (WR/TE/RB); skill-EPA 64.7/23.2/27.7/−15.6.
- **Beam's M4 numbers reproduced within 0.3pp on pinned 2024 data → his findings upgraded
  REPORTED → VERIFIED** (secondary fits snap share; DL overweighted; LB underweighted;
  TE underweighted vs skill-EPA; QB in-band).
- `_agents/glm/tests/heldout-lint.mjs` — governance artifact (Beam §2.2): exits 0/1/2 VERIFIED;
  scan any fit script before trusting output.
- Data map correction (VERIFIED): nextgen_stats has NO defense feed; player_stats has no
  defensive EPA → defense EPA is a pbp-join task, not "unavailable".
- Claude-facing prompt rev 2: `inbox/20261108-1800-glm-P-013-anchor-pack-and-claude-prompt.md`
  (includes my positions: raw-curve witness YES on Colors track; RNG lands draft-first).

## Events / exception log (window)

- `council.mjs` call for `show E-207` timed out even with --no-fetch reads avoided (60s wall);
  **E-207 review was NOT done this window** — P-013 anchored work took the window per Owner
  (Claude-innovation invite). Next session: `node ./.council_tool.mjs --no-fetch show E-207`,
  or read `council/or:inbox/20261104-0524-or-E-207-review.md` directly (1st-line route).
- pbp `.zip` asset and `ngs_2024_defense` 404 (GitHub "Not Found" 4KB) — cleaned; the `.gz`
  pbp and receiving-only NGS are the correct assets (expanded_assets listing VERIFIED).
- The 4KB "Not Found" gzip binaries were discarded; hashes above are of the four real files.

## What the next session needs

- The un-run **N=400 probe** (carried over; command pattern preserved in tests dir).
- **P-013 window artifacts to integrate:** my anchor pack + lint go to the Architect's digest
  via `node tools/council.mjs digest` after import; E-207 review if not yet 3-seat REVIEWED.
- M5-by-OVR (Madden27 join), defense-EPA pbp join, M3 data-only fit — all now unblocked by my
  pack; anyone may take them (no assignment).

## Prior sessions — receipts that remain true (condensed)

- 7 Nov owner-weights reveal: 32/32 inside ±50 (max DE1 +23.3, WR1 −18; DT2 10M→300 is +50 over
  salary×25, Owner's call). Tests on my bench: lineup 34/34, matchup 19/19, versions 7/7.
  Report `inbox/20261107-0200-glm-OWNER-WEIGHTS-report.md`, push `099561e1`.
- 6 Nov: ASK outcome-CI gate answered (`5ca6c747`,`010db8a3`); P-261 DATA-LICENSE (`ac1b9e12`);
  P-263 review posted; P-262 retire op pending quorum (`83079d6c`); tip-side N=100 VERIFIED
  reproduces ASK; probe tool `_agents/glm/tests/outcome-band-probe.mts` (N=400 un-run, ~40 min).
- Environment receipt: node v24.22.0, npm 11.19.1; `colors/`+`data/nfl/` are untracked work
  copies — never `rm -rf` them; refresh: `git checkout origin/architect/engine-and-seats --
  colors data tools/mathlab/design.json`.

## Open questions (carried)

- DT2 salary deviation (10M → 300): Owner's taste or a typo?
- Is 23.3 max deviation (hot pass rush / cold WR1) accepted as final, or refit?

## Dedication rule (worked well)

Pre-register → measure → label; nothing silently resolved. Owner's priors in Beam's prereg §1
(write your own before results). All window work kept to `_agents/glm/` + `inbox/` — no product
files, no protected constants, no pushes, no cross-seat edits.
