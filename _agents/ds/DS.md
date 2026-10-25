# DS — lane file

**Seat:** DS · **Model:** deepseek-v4.1-flash-free
**Worktree:** `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds`
**Branch:** `council/ds` · **merge-base HEAD origin/council/base:** `29e2f4de`
**Last session end:** 2026-10-25 02:57 UTC (24 Oct local)

The `wt/ds` worktree at `/Users/kosi/Desktop/wt/ds` is **orphaned** — its `.git` points at
`.git/worktrees/ds`, which no longer exists. Do not work there. This worktree is the live one.

## State

The 23 Oct deep clean removed this lane's uncommitted files from both the shared tree and
`council/ds`. They were recovered on 24 Oct from **`2ffe3627`** ("DS: preserve uncommitted lane work
(36 files) — committed by Beam at the Owner's request to prevent loss"), reachable from
`council/uk` and the `preserve/*` branches, **not** from `council/ds`. Seven files were restored
here; the rest of the preserve commit stayed behind because later lane work supersedes it.

## What this lane now holds

| file | what it is |
|---|---|
| `notes/MATHCORE-VS-PRECOLORS.md` | 26-slot `slotWins`/`modelWeights` comparison, Pre-Colors vs `044d1759`; causal proof by restoring `PERS['11']` |
| `notes/UPDATE-TO-CLAUDE-2026-10-22.md` | consolidated answers to the Architect's four questions and five asks |
| `notes/OWNER-RULINGS-2026-10-22-PROVENANCE-COLOURS.md` | dataset frozen by Owner attestation; 32×3 palette; the seven changed hexes |
| `tools/ln2-probe.mjs` | five-arm `matchupModel` fixture probe |
| `tools/mathcore-probe.mjs` | loads a build, exports its own `slotWins`/`slotWinsPerOvr`/`modelWeights`/`PERS`; `--zero11` causal test |
| `tools/verify-build-pins.mjs` | document-wide pin scanner (superseded in scope by the pin work below) |
| `tools/task-validator-probe.mjs` | 18-case adversarial harness for `tools/check-tasks.mjs` |

`notes/master_plan.md` was reduced to a stub on 24 Oct. It named `nfl_power_rankings.html` as the
single build, called v20 "current", and told sessions to avoid git — all three obsolete, and the
last one directly contrary to the current protocol. Its original text is in git history.

## Findings still live

1. **Math.LN2 — closed.** Not a sign error: a neutral `0.000` baseline was replaced by `ln 2`.
   Pre-Colors is clean. In the drift build the effect is +7.52 pts on an all-80 fixture and the
   valuation core degenerates — `modelWeights()` puts the kicker at 700 above the quarterback at
   605. Restoring the one coefficient reproduces Pre-Colors exactly (`max |perOvr delta| = 0.0`).
   The `F4` label is retired; do not reuse it.
2. **Build truth.** `044d1759` = **656,746 B**; `40233d6b` (Pre-Colors) = **657,486 B**. Any document
   pairing `044d1759` with 657,486 B is wrong. `merged.html` and `Football-Sim-V21.html` are the
   same bytes.
3. **Biome F6 — complete.** All 14 declared rule names are accepted by 2.6.2 and fire. But
   `tools/biome-product/biome.json` as written is **fatal in-tree**: `"root": true` gives
   *"Found a nested root configuration"*. `"root": false` is accepted; omitting the key is also
   fatal. `"recommended": false` is **deprecated** — use `"preset": "none"`, identical diagnostics.
   `--reporter=json` writes pure JSON to stdout: `{summary, diagnostics, command}`, each diagnostic
   `{severity, message, category, location:{path,start:{line,column},end}, advices}`. Pretty
   diagnostics go to **stderr**. Two-line fix required before the config can be used.
4. **`tools/check-tasks.mjs` — 3 defects, 15/18 cases correct.**
   - the id regex `[a-z0-9]+` **rejects hyphenated seat names**, so `T-…-nemo-super-1` fails and two
     existing seats cannot register. Fix: `[a-z0-9-]+`.
   - `claimed_at` is required but never validated — `"yesterday"` passes.
   - `base_build_sha` accepts 9 hex characters (range is 8–64 by design; fine, but undocumented).
   - the duplicate-id check can never fire alone: a duplicate id in a second file also fails the
     filename rule first, so uniqueness is enforced by the filesystem, not the check.
5. **Pins — two names, four files.** `"V20"` and `"NFL Draft Simulator.html"` are each **two
   different files under one name**:
   - v20 — git `_archive/builds/…v20 Claude.html` = `31b7d61f`, 649,032 B; disk
     `./NFL Draft Simulator v20 Claude.html` = `8f916df9`, 648,310 B.
   - donor — git `NFL Draft Simulator.html` = `77bb9ed5`, 650,127 B; disk = `8f0f8d50`, 649,490 B.
     There is a third on disk: `backup-before-reorg/NFL Draft Simulator.html` = `f114ef8e`, 648,130 B.
   - Pre-Colors `40233d6b` 657,486; drift `044d1759` 656,746.
   `_archive/builds/` **does not exist on disk**, so `AGENTS.md` §2 pins a path that is not there.
6. **Bundle.** `origin/claude/v21-and-council-ops` = `5157c53a`; `1ce97573` is its direct ancestor;
   no remote ref points at `1ce97573`; no PR has this branch as head. The stale worktree
   `/Users/kosi/Desktop/FootballSim-architect` is still at `1ce97573`.
7. **Owner rulings.** The 1,200-row dataset is frozen and Owner-verified — do not re-rate, re-source
   or question it. The colour palette matches `figma/team-colours.json` for 25/32; exactly seven
   teams change; apply only after the bundle PR.

## Pending for the next session

- **P8 pin table — inventory done, table not written.** Four ambiguity pairs above; produce one
  table separated into live documents and historical logs, with a rule that no row carries a hash
  and a byte count belonging to different files.
- **P4/P1 V22-Suggestions.md conflict resolution — assigned, NOT started.** The dispatch claims 342
  headings / 199 with ids / 178 unique / 21 duplicated; I have not reproduced those counts. The file
  differs between `main` (6,202 lines) and the branch (5,017 lines), so measure both.
- **P5 colour patch, P6 dataset hash, P7 RNG design — not started.**
- `check-tasks.mjs` fixes are findings for the Architect; do not edit `tools/`.

## Open questions

1. Which v20 is canonical — git `31b7d61f` or disk `8f916df9`? `AGENTS.md` pins the git one at a
   path that does not exist on disk. Default: the git blob, because it is reproducible; cost of being
   wrong: line-number references drift by one build.
2. Should `check-tasks.mjs` widen the seat pattern to `[a-z0-9-]+`? Default: yes; cost if wrong: a
   registry that cannot name `nemo-super` or `nemo-ultra`.

_DS end-anchor · this lane only._
