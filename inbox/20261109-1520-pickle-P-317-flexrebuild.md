SPEAKER: pickle | ROLE: council (verification + tooling) | TASK: P-317 | DATE: 2026-11-09T15:20Z
FOR: P-317 (flexrebuild.mjs — proposed in council-zai-prompt-D-custom-table-2026-11-09.md §"flexrebuild.mjs does NOT exist — build it")
ALSO: P-311 (verifier for Claude's rebuild), P-312 (scan targets)

# P-317 done: the flex rebuild is now one command, and the gate rejects today's table

**For Claude / the Architect — read in this order:**
1. `_agents/pickle/notes/flex-D-2026-11-09.md` (findings, receipts, four entries).
2. `tools/mathlab/flex-owner-2026-11-09.json` (the Owner's decisions as data).
3. `tools/mathlab/results/flex-D-2026-11-09-wins.md` — the **62 rules that move**, which is the complete
   diff the Owner asked to review before the table lands.

## What is new

- `tools/mathlab/flexrebuild.mjs` — deterministic generator: D (displacement-aware, θ=1.0) → nearest tier
  0/2/6/12 (cutoffs 1/4/9) → Owner removals/overrides → `flex.json` + `flex.ts` + an md report. `--selftest`,
  `--check=<flex.json>`, `--write=<dir>`.
- `tools/mathlab/flexverify.mjs` — P-311 verifier, no engine: legal shape/tiers, 7 removals absent, 53
  overrides exact, unmentioned rules = rounded D, `flex.json` ≡ `flex.ts` rule by rule. `--selftest`.
- `tools/mathlab/flex-owner-2026-11-09.json` — the Owner's list as data (7 removed, 53 set, bumps, note
  per contested rule).
- `tools/mathlab/results/flex-D-2026-11-09-{wins,weight}.*` — both slope readings, generated.

## Result

`104 rules in, 97 kept, 7 removed, 62 move; tiers {0:30, 2:16, 6:32, 12:19}` — **exactly 30 rules at 0**,
the number the Owner wrote in the relay. That is the convergence check.

Three findings that change how P-311 is run (details + commands in the note):

1. **The WILL/C weight bump does not move D at all under the engine's slope** (`slotWins20/20` is independent
   of `SLOTS[].weight`; measured, max Δ = 0). P-311 step 2 ("D must be recomputed with the new weights") is a
   no-op — a reviewer expecting movement will either false-fail or accept pre-bump numbers silently.
2. The Owner's "~6.7 after the bump" for `OLB>ILB` / `OLB>SS` is true under a **weight-ratio** slope, not the
   engine's measured one (10.05 / 9.99 → 12). The Owner's −6 is right **as an override**. Both readings agree
   on all four headline rules to ≤0.4, which is why nobody noticed.
3. Three final rules are slope-definition dependent and the Owner did not name them: `TE>FS` (6 vs 2),
   `TE>SS` (6 vs 2), `OG>OT` (2 vs 6). Recommend the wins slope and an explicit Owner line on these three.

## Receipts

```
$ node tools/mathlab/flexrebuild.mjs --selftest      -> FLEXREBUILD SELFTEST OK
$ node tools/mathlab/flexverify.mjs  --selftest      -> FLEXVERIFY SELFTEST OK
$ node tools/mathlab/flexverify.mjs --table=results/flex-D-2026-11-09-wins.flex.json --ts=.../*.ts
  -> FLEXVERIFY OK 97 rules match the Owner table            (exit 0)
$ node tools/mathlab/flexverify.mjs --table=<colors@3ed03627 tools/mathlab/flex.json>
  -> FLEXVERIFY FAIL 62                                      (exit 1)
```

## How to check (the whole P-311 in one line, when his rebuild lands)

```
cd <colors checkout>
node --experimental-strip-types <repo>/tools/mathlab/flexrebuild.mjs \
  --owner=<repo>/tools/mathlab/flex-owner-2026-11-09.json --check=tools/mathlab/flex.json
```
Exit 0 = his table equals the Owner's rules. Exit 1 = every differing rule printed. If his table differs only
on `TE>FS`/`TE>SS`/`OG>OT`, that is D-PICKLE-03, not a bug.

## SAFE ALONE?

Yes. Read-only on the engine and on every flex.json; output goes to `--out-dir`/`--write`. Nothing in this
entry is a build or an accepted change.

## What is NOT done / what I could not check

- Claude's rebuild has still not landed (tip `3ed03627`), so P-311 itself is **not reviewable yet**; this is the
  instrument, not the review.
- `flexeval.mjs` replay on the rebuilt table (P-312) — not run here; it needs his tree's draft scan. H-PICKLE-01
  is pre-registered for whoever runs it (prediction: EDGE/DT placed at OT/C through a 0 rule).
- P-313 calibration re-run (WILL/C weights) — not run; needs the Lab, and the weights are not in the shipped
  build yet.
