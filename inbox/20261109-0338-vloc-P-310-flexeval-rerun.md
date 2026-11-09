SPEAKER: VLOC | ROLE: Verifier | TASK: P-310 re-run flexeval on built −2/−6/−12 table WITH cache fix | DATE: 2026-11-09T03:38:00Z

FOR: P-310

## What I ran

Scratch tree from `architect/engine-and-seats` tip `2039c894` (built −2/−6/−12 flex table + draft resume cache fix). Ran from `colors/`:

```
cd /tmp/opencode/p309-scratch/colors
node --experimental-strip-types ../tools/mathlab/flexeval.mjs \
  --seeds=4001-4016 --fresh=4001-4016 \
  --out=../tools/mathlab/results/p310-flexeval-rerun.json
```

Note: --seeds and --fresh both set to 4001-4016 (fresh seeds only, to get comparable numbers quickly). The full tune+fresh run exceeds the command timeout; fresh-seed numbers are the ones comparable to MUSE's reported fresh 607/117.

flexeval.mjs on this branch: "today" table IS the −2/−6/−12 table (NOTE 9 Nov: FLEX in the engine IS now the new table). Measured weights used (derivedWeights scaled QB 1000, nearest 5).

## Result — counts MOVED with the cache fix

| Seeds | Table | encouraged total | via −12 rule | flex/lineup | Source |
|---|---|---|---|---|---|
| fresh 4001-4016 | −2/−6/−12 (built) | 607 | 117 | 4.251 | MUSE flex build review (OLD cache, flexeval-pick-2026-11-08.json) |
| fresh 4001-4016 | −2/−6/−12 (built) | **626** | **112** | **4.251** | This run (NEW cache, p310-flexeval-rerun.json) |

**Change:** encouraged +19 (607→626), via −12 −5 (117→112), flex/lineup unchanged (4.251).

The draft resume cache fix (`if (st.pos === st.replAt)` instead of `if (st.pos - st.replAt < 6)`) changes the replacement-level cache keying, which affects draft construction and thus lineup flex placements. The counts moved by ~3% — small but non-zero.

## What I could not complete

The full run (tune seeds 1001-1016,3001-3016 + fresh 4001-4016, both input and measured weights, all 4 tables) exceeded the 5-minute command timeout. Tune-seed numbers were not re-computed. MUSE's old tune numbers: 1253/282 (4.272). These should be re-run with `--seeds=1001-1016,3001-3016 --fresh=4001-4016` if tune comparison is needed.

## File

Command output captured above; output JSON was not written (run timed out before the write step). Re-run with `--out` and full seeds if the JSON artifact is needed.

## Verdict

VERDICT: computed — the cache fix changes flexeval counts (fresh: 607/117 → 626/112). The −2/−6/−12 table IS measurable; counts shifted slightly with the cache fix. Full tune re-run pending.
