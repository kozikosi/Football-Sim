# flexrebuild report — 2026-11-10T00:49:05.709Z

D input: (none - keep-base mode) (sha256 none) — base values kept as built
Base table: /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/glm-flexrebuild/flex-728b.json (sha256 da582c8b1f84c202) — KEEP-BASE mode: unoverridden base values are kept, no rounding pass
Rounding: D -> nearest tier of 0/2/6/12, cutoffs 1/4/9 (>= cutoff goes up). Overrides: 11 (from items-3-7-overrides.json). Removals: 7.
Rules: universe 97 -> rebuilt 99. Tier counts old {"0":23,"2":15,"6":40,"12":19} -> new {"0":26,"2":16,"6":40,"12":23}. Rules at 0: 23.

## MOVES (10) — every rule the Owner should review

| rule | old | new | D@90 | source |
|---|---|---|---|---|
| EDGE>SAM | — | 0 |  | added |
| FS>SAM | — | 6 |  | added |
| ILB>FS | — | 12 |  | added |
| ILB>SAM | — | 0 |  | added |
| OLB>FS | — | 12 |  | added |
| OLB>SAM | — | 0 |  | added |
| SS>SAM | — | 2 |  | added |
| TE>DIME | 6 | 12 |  | override |
| TE>FS | 6 | 12 |  | override |
| TE>SAM | — | 6 |  | added |

## Unchanged (95)

## Rules at 0 — free (23)

RB>FB TE>FB OT>OG OT>FB OG>FB C>FB DT>FB EDGE>DT EDGE>OLB EDGE>FB ILB>ILB ILB>OLB ILB>FB OLB>OLB OLB>FB SS>NICKEL SS>DIME FS>NICKEL FS>DIME CB>FS CB>NICKEL CB>DIME CB>SS

## PENDING POST-BUMP (0) — D for these was read from a PRE-bump file and depends on the WILL/C slopes; re-run when the spec re-fit lands

(none)

## Standalone checks

- flexcheck.mjs on the rebuilt table: run from a dir containing this flex.json (receipt belongs to the run, not the script).
- flexeval.mjs pick counts vs the P-310 baseline: the Architect/Verifier run in a colors/ scratch (seeds 1001-1016,3001-3016 tune / 4001-4016 fresh).
