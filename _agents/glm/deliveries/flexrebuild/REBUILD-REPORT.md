# flexrebuild report — 2026-11-09T15:19:20.728Z

D input: /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/glm-flexrebuild/tools/mathlab/results/thetaprice-2026-11-09.md (sha256 72dae5bcc07ce15a) — parsed from thetaprice-2026-11-09.md (thetaprice md, D@90 column)
Base table: /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/glm-flexrebuild/tools/mathlab/flex.json (sha256 4d03772cba4e8f10)
Rounding: D -> nearest tier of 0/2/6/12, cutoffs 1/4/9 (>= cutoff goes up). Overrides: 53. Removals: 7.
Rules: universe 104 -> rebuilt 97. Tier counts old {"0":14,"2":16,"6":18,"12":56} -> new {"0":30,"2":16,"6":32,"12":19}. Rules at 0: 30.

## MOVES (62) — every rule the Owner should review

| rule | old | new | D@90 | source |
|---|---|---|---|---|
| FB>EDGE | 12 | REMOVED | 19.27 | REMOVED |
| FB>DT | 12 | REMOVED | 19.05 | REMOVED |
| FB>ILB | 12 | REMOVED | 18.42 | REMOVED |
| FB>OLB | 12 | REMOVED | 16.83 | REMOVED |
| C>DT | 6 | 12 | 14.3 | override |
| OLB>ILB | 2 | 6 | 10.05 | override |
| OLB>SS | 12 | 6 | 9.99 | override |
| OG>EDGE | 12 | 6 | 8.3 | rounding |
| TE>OG | 12 | 6 | 7.54 | rounding |
| OLB>TE | 12 | 6 | 7.34 | rounding |
| CB>WR | 12 | 6 | 6.84 | rounding |
| OT>EDGE | 12 | 6 | 5.38 | override |
| SS>CB | 12 | 6 | 5.07 | override |
| FS>CB | 12 | 6 | 5.06 | override |
| DT>EDGE | 12 | 6 | 4.61 | rounding |
| OG>OT | 6 | 2 | 3.99 | rounding |
| RB>TE | 12 | 6 | 0.21 | override |
| SS>ILB | 12 | 6 | 0.12 | override |
| P>K | 12 | 2 | 0.01 | override |
| C>FB | 2 | 0 | 0 | rounding |
| CB>RB | 12 | REMOVED | 0 | REMOVED |
| CB>SS | 2 | 0 | 0 | rounding |
| DT>C | 6 | 0 | 0 | rounding |
| DT>FB | 2 | 0 | 0 | rounding |
| DT>OG | 6 | 2 | 0 | override |
| DT>OT | 12 | 6 | 0 | override |
| DT>TE | 12 | REMOVED | 0 | REMOVED |
| EDGE>C | 12 | 2 | 0 | override |
| EDGE>DT | 2 | 0 | 0 | rounding |
| EDGE>FB | 2 | 0 | 0 | rounding |
| EDGE>FS | 12 | REMOVED | 0 | REMOVED |
| EDGE>ILB | 12 | 0 | 0 | rounding |
| EDGE>NICKEL | 12 | 0 | 0 | rounding |
| EDGE>OG | 12 | 0 | 0 | rounding |
| EDGE>OLB | 2 | 0 | 0 | rounding |
| EDGE>OT | 12 | 0 | 0 | rounding |
| EDGE>RB | 12 | 0 | 0 | rounding |
| EDGE>TE | 12 | 6 | 0 | override |
| FS>OLB | 12 | 6 | 0 | override |
| ILB>FB | 2 | 0 | 0 | rounding |
| ILB>NICKEL | 12 | 6 | 0 | override |
| ILB>SS | 12 | 2 | 0 | override |
| ILB>TE | 12 | 6 | 0 | override |
| K>P | 0 | 2 | 0 | override |
| OG>FB | 2 | 0 | 0 | rounding |
| OLB>FB | 2 | 0 | 0 | rounding |
| OT>C | 0 | 2 | 0 | override |
| OT>FB | 2 | 0 | 0 | rounding |
| RB>FB | 2 | 0 | 0 | rounding |
| SS>OLB | 12 | 2 | 0 | override |
| SS>TE | 12 | 6 | 0 | override |
| TE>C | 12 | 6 | 0 | override |
| TE>DIME | 12 | 6 | 0 | override |
| TE>FB | 2 | 0 | 0 | rounding |
| TE>NICKEL | 12 | 6 | 0 | override |
| TE>OLB | 12 | 6 | 0 | override |
| WR>CB | 6 | 2 | 0 | override |
| WR>DIME | 6 | 2 | 0 | override |
| WR>FS | 6 | 2 | 0 | override |
| WR>NICKEL | 6 | 2 | 0 | override |
| WR>RB | 12 | 6 | 0 | override |
| WR>SS | 6 | 2 | 0 | override |

## Unchanged (42)

## Rules at 0 — free (30)

RB>FB TE>FB OT>OG OT>FB OG>C OG>FB C>FB DT>C DT>FB EDGE>DT EDGE>OLB EDGE>ILB EDGE>OG EDGE>OT EDGE>RB EDGE>FB EDGE>NICKEL ILB>ILB ILB>OLB ILB>FB OLB>OLB OLB>FB SS>NICKEL SS>DIME FS>NICKEL FS>DIME CB>FS CB>NICKEL CB>DIME CB>SS

## PENDING POST-BUMP (8) — D for these was read from a PRE-bump file and depends on the WILL/C slopes; re-run when the spec re-fit lands

OG>C C>FB DT>C EDGE>OLB ILB>OLB OLB>OLB OLB>FB OLB>TE

## Standalone checks

- flexcheck.mjs on the rebuilt table: run from a dir containing this flex.json (receipt belongs to the run, not the script).
- flexeval.mjs pick counts vs the P-310 baseline: the Architect/Verifier run in a colors/ scratch (seeds 1001-1016,3001-3016 tune / 4001-4016 fresh).
