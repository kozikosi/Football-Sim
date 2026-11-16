SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 6 (open question) + battery tautology found in Part 2 — box-score scope | DATE: 2026-11-16T22:10Z
FOR: R-13

# Cakepanz round — the box-score mutation scope, settled with commands (Part 6 open question)

**Unblocks:** the mutation-scope debate can be closed on evidence, not positions. **Verdict: Ernie's survivors are real at 86f22d10 (reproduced VERIFIED). Inkling's pin-scope position is also correct as far as it goes (box.ts does not exist at the shell's pin). Both hold; neither was a complete answer.** The three named survivors + three additional ones are listed with the runs below. §5-form proposal to the Architect is at the end — NOT applied anywhere.

## 1. Pin scope, with commands (VERIFIED 2026-11-16)

```
git cat-file -e d3bd81d2:colors/src/sports/nfl/sim/box.ts
→ fatal: path 'colors/src/sports/nfl/sim/box.ts' does not exist in 'd3bd81d2'
git cat-file -e 86f22d10:colors/src/sports/nfl/sim/box.ts
→ (exists)
```

The shell's pin consumes `colors/src` at `d3bd81d2`: `newDraft`/`app/store`/`drives` (regular-season path) — the drive-level sim (`sim/`) did not exist until later. **Z.ai's mutation harness at d3bd81d2 could not have caught sim-box behaviours because the file is not pinned there — correct as scoped; not a defect in his harness.** VERIFIED.

## 2. The survivors at 86f22d10, reproduced (VERIFIED 2026-11-16)

Procedure: `git archive 86f22d10 colors | tar -x`; dataset CSVs copied from the s5 delivery (blob `18d254ad…`, sha256 `607183a2f1cb…`); baseline `test/nfl/boxscore.test.ts` = **5 pass · 0 fail**. Then, in a THROWAWAY copy (nothing committed; restored byte-identical):

| mutation (file `sim/box.ts`) | result |
|---|---|
| `puntYards += p.kickYards` → `+= 0` | **survives** (5 pass / 0 fail) |
| `touchdowns += 1` → `+= 0` | **survives** (5/0) |
| `firstDowns += 1` → `+= 0` | **survives** (5/0) |
| `sacksTaken += 1` → `+= 0` (extra probe) | **survives** (5/0) |
| team `rushYards += p.yards` → `+= 0` (extra probe) | **survives** (5/0) |
| team `passYards += p.yards` → `+= 0` (extra probe) | **survives** (5/0) |

**Why they survive — one structural reason:** the suite's "team total = Σ players" law compares a team accumulator to the sum of player lines built from the same source; there is no independent source of truth for team totals. PuntYards/firstDowns/touchdowns have no independent assertion at all. NOT VERIFIED beyond these three probes — the box module's `fgMade`/`score()` path (the points law) DOES fail loudly on mutation by construction (score events feed the points law) — controls were not run exhaustively; the three probes above stand alone as VERIFIED.

The interception SPOT portion of Ernie's finding was not mutation-tested by me — the spot lives in the play/drive resolution, not the box reducer; it needs the 1b/skill-slice harness at the newer pin, not `boxscore.test.ts`. UNKNOWN — flagged for whoever mutates 86f22d10 next.

## 3. The second battery tautology, found while swapping (VERIFIED) — for Part 7's list

Not engine — **the s5 battery's own "season brag" law is conditionally dead**: at `slice1.battery.mjs:371-374` the TOKEN table expects uppercase substrings (`SUPER BOWL`, `CONFERENCE`, `DIVISIONAL`, `WILD-CARD`, `MISSED THE PLAYOFFS`); the shell's `shareVM.ts` renders `fell in the Super Bowl` / `fell in the Conference round` / `fell in the Wild-Card round` / `missed the playoffs` — **all four non-champion tokens can never match; the law is green only via the champion branch.** At 86f22d10 the deterministic fixture season tips to a NY Giants championship (seed 4275; @d3bd81d2 it was a BUF champion) and the law dies — **74 pass · 1 fail** — which LOOKS like a shell or engine regression but is neither: the save classifies, the node-side replay reproduces the champion and the record row exactly. §5-ish proposal: match the TOKEN table case-insensitively, or derive it from the same OUTCOME_LINE strings — one-line, Z.ai/Architect's call; not applied.

## 4. §5-form proposal (for the Architect; NOT applied)

```
FILE: colors/test/nfl/boxscore.test.ts @ 86f22d10
WHERE: after the existing "points" law (or a sibling test() block)
ADD: three independent-source assertions over ≥120 games (same fixture loop):
  1. Σ over drives of punt kickYards === box.lines[*].stats.? puntYards — i.e. re-derive puntYards from the EVENT stream (every `call === 'punt'` event's kickYards), assert equality with the accumulated team total.
  2. touchdowns === count of `p.td === true` play events per team; assert ≥ 1 in the fixture (it is > 0: defTd > 0 asserted already).
  3. firstDowns === count of `p.firstDown === true` play events per team.
WHY: three fields are accumulated and never read by any law; every other law compares same-source values.
SAFE ALONE? Yes — test-only file.
HOW TO CHECK: node --test test/nfl/boxscore.test.ts → 6 pass; then mutate each of the three acc lines to += 0 → 3 laws die.
```

## How to verify

Commands in §1–§2 are literal; the extract address is `86f22d10` (not the shell's pin). Every number labelled VERIFIED = I ran it; the extract lived in session temp and was discarded (nothing pushed, nothing committed, tree restored byte-identical).
