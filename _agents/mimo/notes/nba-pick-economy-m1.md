SPEAKER: MIMO | ROLE: Council reviewer (assignee of Pickle, M1) | TASK: M1 — NBA pick-economy worked example (roster size vs ~1,500–2,000 pool) | DATE: 2026-10-21 (UTC)

Worked example only — pick-economy arithmetic for a 30-team league at roster sizes 10/12/13/15. No ratings, no pool contents, no roster-size decision: the Owner owns that choice.

## Command (executed this session; output verbatim)

```
python3 - <<'PY'
pool_lo, pool_hi, teams = 1500, 2000, 30
print(f"{'roster':>6} {'picks':>6} {'pct1500':>7} {'pct2000':>7} {'und1500':>8} {'und2000':>8} {'cand_per_pick@1500':>18}")
for r in (10, 12, 13, 15):
    picks = teams * r
    print(f"{r:>6} {picks:>6} {100*picks/pool_lo:>6.1f}% {100*picks/pool_hi:>6.1f}% {pool_lo-picks:>8} {pool_hi-picks:>8} {pool_lo/picks:>18.2f}")
prev = None
for r in (10, 12, 13, 15):
    if prev is not None:
        print(f"  marginal {prev}->{r}: +{r-prev} picks/team, +{(r-prev)*teams} total")
    prev = r
PY

roster  picks pct1500 pct2000  und1500  und2000  cand_per_pick@1500
    10    300   20.0%   15.0%     1200     1700               5.00
    12    360   24.0%   18.0%     1140     1640               4.17
    13    390   26.0%   19.5%     1110     1610               3.85
    15    450   30.0%   22.5%     1050     1550               3.33
  marginal 10->12: +2 picks/team, +60 total
  marginal 12->13: +1 picks/team, +30 total
  marginal 13->15: +2 picks/team, +60 total
```

## Arithmetic behind the table

- Total picks = 30 teams × roster size (snake draft, one pick per team per round → rounds = roster size).
- Share of pool = picks ÷ pool (1,500 or 2,000). Undrafted = pool − picks. Candidates-per-pick = 1,500 ÷ picks.
- Marginal picks per team = Δ roster size; marginal league-wide = Δ × 30. Cumulative 10→15: +5 picks/team, +150 total.

## Structural fact, stated plainly

**The pool does not bind at any of these sizes.** The largest draft (roster 15: 450 picks) consumes 30.0% of the smallest pool (1,500) and 22.5% of the largest (2,000); every scenario leaves ≥1,050 candidates undrafted, and even the 15-slot draft leaves 3.33 candidates per pick at the 1,500 level. Roster size changes the draft's length, not its feasibility — any binding constraint would live in rotation utility and roster fragility, not in pool supply. No roster-size recommendation is made here.

## Verified

- The command above, executed 2026-10-21 in this session; receipt = the output block.
- Pool targets ~1,500–2,000 candidate players per sport — as stated in my M1 brief (REPORTED via Pickle's assignment; Owner's data direction).
- 30-team league — working assumption carried from `_agents/mimo/notes/nba-draft-rotation-comparison.md` (INFERRED there; the number appears in no direction doc I read).

## Not checked

- Pool scope: this arithmetic assumes ONE shared pool per sport that all 30 teams draft from (matches the Owner's "per sport" wording); per-league-version pools were not adjudicated — flagged separately in `_agents/mimo/notes/SOCCER-CUTOFF-DECISION.md` §3 as an open definitional point.
- Design assumptions not re-verified: snake mechanics (1 pick/team/round), 30 franchises, no free agency, real-NBA roster-size facts.
- No product file read or modified for this note; merge candidate re-hashed this session unchanged (sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B).
- No ratings, fields, or pool contents — pure arithmetic on counts.
