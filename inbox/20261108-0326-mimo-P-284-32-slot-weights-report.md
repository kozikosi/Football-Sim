SPEAKER: mimo | ROLE: council seat | TASK: P-284 32-slot weights measurement + final-table recommendation | DATE: 2026-11-08
FOR: P-284

# P-284 — 32-slot revealed-impact measurement and final-table recommendation

**Target builds measured.**
- Shipped product: `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…` (657,486 B) — VERIFIED this session.
- Colors engine: `origin/architect/engine-and-seats` tip `949627a6`, extracted read-only to `/tmp/mimo-p284/colors` via `git archive` — VERIFIED.

**Recommendation (the deliverable): the Owner's 6 Nov salary table is the final table.** It is already installed verbatim in `colors/src/sports/nfl/engine/slots.ts` (VERIFIED 32/32 exact below), the fitted engine reproduces it inside the Owner's ±50 room for all 32 slots, and it has a documented source (Owner-supplied salary column + `weight = salary×25` convention with 10 named ±25/50 adjustments). No other table has a source. Measurement and recommendation only — no protected constant was touched; the Owner/Architect re-pin `DEFAULT_WEIGHTS`/`MERGE-MANIFEST` under P-013.

## Receipt 1 — engine test suite on the extracted Colors tree

```
$ git archive origin/architect/engine-and-seats colors data tools | tar -x -C /tmp/mimo-p284
$ (cd /tmp/mimo-p284 && node --test colors/test/)   # after also extracting tools/ for design.json
284/284 tests pass
```
VERIFIED. (First run: 251 tests / 1 fail — ENOENT `tools/mathlab/design.json` from an incomplete extraction; fixed by extracting `tools/` too. Not a product defect.)

## Receipt 2 — the 32-slot table

```
$ node --experimental-strip-types _agents/mimo/tools/owner-weights-test.mts /tmp/mimo-p284/colors /tmp/mimo-p284/precolors-sweep.json
CHECK 1 slots.ts == Owner table: PASS (32/32 exact)
CHECK 2 ±50 band (4-3): 32/32 inside; worst DE1 +23.3
CHECK 2 ±50 band (3-4): 32/32 inside; worst DE1 +23.3
CHECK 3 weight == salary×25: 22/32 exact; adjusted: WR1 +25, WR2 +25, TE2 +25, OG1 +25, C +25, DE1 +25, DT2 +50, DL5 +25, SAM +25, CB1 +25
SUMMARY  in ±50 band: 32/32 | rank flags vs Owner's table: 0 | rank flags vs shipped DEFAULT_WEIGHTS (26 shared): 16
CHECK 5 cross-engine: Spearman(product, colors) = 0.712 over 26 shared slots
```
VERIFIED (exit 0, this session).

**Columns.** `colors reveal` = `derivedWeights('4-3')` on the extracted engine, Owner's 1000-QB scale (weights points; QB measured 999.3 confirms `WEIGHT_UNIT_WINS=0.00254` puts revealed impact on that scale — VERIFIED). `product reveal` = the P-224 lab sweep on Pre-Colors (wins per +1 OVR, 70→90). Ranks use average ties. `gap` = DEFAULT rank − revealed rank; `|gap|≥4` = FLAG. `salary` = Owner's 6 Nov column (source: `_agents/owner-notes/2026-11-06-salary-weights-verbatim.md`, mirrored in `tools/mathlab/salary-reference.json` — VERIFIED identical). `recommended` = Owner's table (my recommendation; equals installed `slots.ts`).

| slot | product reveal | colors reveal | Owner rank | colors rank | gapO | DEFAULT rank | gapD | ≥4 | salary $M | **recommended** |
|---|---|---|---|---|---|---|---|---|---|---|
| QB | 0.1271 | 999.3 | 1.0 | 1.0 | 0.0 | 4.5 | 3.5 | . | 40 | **1000** |
| DE1 | 0.0650 | 673.3 | 2.5 | 2.0 | +0.5 | 2.0 | 0.0 | . | 25 | **650** |
| WR1 | 0.0552 | 632.0 | 2.5 | 3.0 | −0.5 | 20.0 | 17.0 | FLAG | 25 | **650** |
| DT1 | 0.0473 | 518.0 | 4.5 | 4.0 | +0.5 | 4.5 | 0.5 | . | 20 | **500** |
| OT1 | 0.0518 | 492.3 | 4.5 | 5.0 | −0.5 | 9.5 | 4.5 | FLAG | 20 | **500** |
| CB1 | 0.0721 | 415.9 | 7.0 | 6.0 | +1.0 | 2.0 | −4.0 | FLAG | 15 | **400** |
| OG1 | 0.0426 | 394.0 | 7.0 | 7.0 | 0.0 | 9.5 | 2.5 | . | 15 | **400** |
| WR2 | 0.0300 | 389.0 | 7.0 | 8.0 | −1.0 | 22.5 | 14.5 | FLAG | 15 | **400** |
| MIKE | 0.0432 | 312.2 | 11.5 | 9.0 | +2.5 | 14.0 | 5.0 | FLAG | 12 | **300** |
| DE2 | 0.0550 | 311.1 | 11.5 | 10.0 | +1.5 | 2.0 | −8.0 | FLAG | 12 | **300** |
| FS | 0.0427 | 310.7 | 11.5 | 11.0 | +0.5 | 20.0 | 9.0 | FLAG | 12 | **300** |
| DT2 | 0.0380 | 310.6 | 11.5 | 12.0 | −0.5 | 6.0 | −6.0 | FLAG | 10 | **300** |
| SS | 0.0442 | 310.4 | 11.5 | 13.0 | −1.5 | 17.0 | 4.0 | FLAG | 12 | **300** |
| OT2 | 0.0518 | 295.7 | 11.5 | 14.0 | −2.5 | 9.5 | −4.5 | FLAG | 12 | **300** |
| CB2 | 0.0589 | 259.8 | 16.5 | 15.0 | +1.5 | 9.5 | −5.5 | FLAG | 10 | **250** |
| OG2 | 0.0426 | 246.4 | 16.5 | 16.0 | +0.5 | 9.5 | −6.5 | FLAG | 10 | **250** |
| TE1 | 0.0400 | 245.4 | 16.5 | 17.0 | −0.5 | 17.0 | 0.0 | . | 10 | **250** |
| RB1 | 0.0333 | 242.8 | 16.5 | 18.0 | −1.5 | 14.0 | −4.0 | FLAG | 10 | **250** |
| WILL | 0.0401 | 155.3 | 20.5 | 19.0 | +1.5 | 14.0 | −5.0 | FLAG | 6 | **150** |
| DL5 | — | 154.9 | 20.5 | 20.0 | +0.5 | — | — | — | 5 | **150** |
| C | 0.0426 | 147.7 | 20.5 | 21.0 | −0.5 | 9.5 | −11.5 | FLAG | 5 | **150** |
| TE2 | 0.0072 | 145.7 | 20.5 | 22.0 | −1.5 | 25.0 | 3.0 | . | 5 | **150** |
| SAM | 0.0037 | 103.5 | 24.5 | 23.0 | +1.5 | 20.0 | −3.0 | . | 3 | **100** |
| CB3 | 0.0470 | 102.9 | 24.5 | 24.0 | +0.5 | 17.0 | −7.0 | FLAG | 4 | **100** |
| WR3 | 0.0191 | 97.2 | 24.5 | 25.0 | −0.5 | 25.0 | 0.0 | . | 4 | **100** |
| RB2 | 0.0110 | 97.1 | 24.5 | 26.0 | −1.5 | 22.5 | −3.5 | . | 4 | **100** |
| DIME | — | 51.8 | 29.0 | 27.0 | +2.0 | — | — | — | 2 | **50** |
| K | 0.0361 | 50.0 | 29.0 | 28.0 | +1.0 | 29.5 | 1.5 | . | 2 | **50** |
| P | — | 50.0 | 29.0 | 29.0 | 0.0 | — | — | — | 2 | **50** |
| TE3 | — | 48.6 | 29.0 | 30.0 | −1.0 | — | — | — | 2 | **50** |
| WR4 | — | 40.1 | 29.0 | 31.0 | −2.0 | — | — | — | 2 | **50** |
| FB | — | 24.6 | 32.0 | 32.0 | 0.0 | — | — | — | 1 | **25** |

Reading notes:
- **vs the Owner's table: 0 rank flags** (worst |gapO| = 2.5). The engine and his table agree on importance ordering everywhere within tie noise.
- **vs the shipped product's `DEFAULT_WEIGHTS`: 16 of 26 shared slots flagged.** The shipped default is the old personal table (line 452, 35 keys); the new engine does not reproduce it. This is the open P-013 re-pin, not a defect in either table.
- The 6 slots with no product reveal (DL5, DIME, P, TE3, WR4, FB) are outside the P-224 sweep's 26-slot set; DEFAULT rank/gap is n/a for them (their `DEFAULT_WEIGHTS` entries exist — DL5 5, WR4 5, P 1, FB 1 — but were not ranked).
- Cross-engine **Spearman(product reveal, colors reveal) = 0.712** over the 26 shared slots — moderate disagreement; cause: the 6 Nov spec refit (INFERRED; measured directly in the companion audit filing `20261108-0326-mimo-fit-bias-audit-and-engine-truth-protocol.md`).

## Receipt 3 — salary×25 convention (CHECK 3)

22 of 32 weights equal `salary×25` exactly; 10 carry named manual adjustments: WR1 +25, WR2 +25, TE2 +25, OG1 +25, C +25, DE1 +25, DT2 +50, DL5 +25, SAM +25, CB1 +25. VERIFIED. Salary data is internal reference only — no `salary` string exists anywhere in `colors/src/` (VERIFIED: `grep -r salary colors/src/` → 0 hits), so the never-displayed rule holds.

## Receipt 4 — P-224 sweep reproduced on Pre-Colors

```
$ NODE_PATH=/Users/kosi/node_modules node tools/mathlab/lab.js "$PWD/Football-Sim-PreColors.html" table --json /tmp/mimo-p284/precolors-sweep.json
QB 0.1271 … SAM 0.0037, 26 slots, page errors 0
```
VERIFIED — reproduces VLOC's and Beam's published numbers exactly.

## Receipt 5 — draft-policy calibration observation (uncertainty per T12)

```
$ node --experimental-strip-types colors/tools/calibrate-draft.ts 40 greedy,top30,favorites   # 140 s
```
VERIFIED run; N=40 per policy, Wilson 95% CIs computed this session:

| policy | playoffs | 95% CI | title | 95% CI |
|---|---|---|---|---|
| greedy | 37/40 = 92.5% | [80.1%, 97.4%] | 5/40 = 12.5% | [5.5%, 26.1%] |
| top30 | 17/40 = 42.5% | [28.5%, 57.8%] | 2/40 = 5.0% | [1.4%, 16.5%] |
| favorites | 13/40 = 32.5% | [20.1%, 48.0%] | 0/40 = 0.0% | [0%, 8.8%] |

**INFERRED (observation only):** against the standing 80/25/10 target, greedy looks high and favorites low, but N=40 gives wide CIs and P-276 forbids tuning against either cluster until a pinned baseline exists. Not a tuning basis.

## Labels

- All command outputs above: **VERIFIED** (run this session, receipts inline).
- Cause of the 0.712 cross-engine gap: **INFERRED** (spec refit; effect measured in the companion audit).
- Whether the Owner's table matches real NFL value: **UNKNOWN** — no real-data anchor has been run (T1/T3 pending data).
- Final-table choice: recommendation = Owner's 6 Nov table; adoption is the Owner's/Architect's call under P-013.
