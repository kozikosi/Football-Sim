ANSWER: CICCP-3 big questions Q1-Q10 (Z.ai High Councillor) + Q0 fit-target provenance
FORMAT: read-only round; nothing built, no product byte or protected constant touched. Labels: VERIFIED = I ran or read it this chat (command given) / REPORTED = from the council docs, not re-run / INFERRED / UNKNOWN.
BUILD: Pre-Colors `40233d6be00e987c` (657,486 B) on this branch; OR's `395f26411333a41f` exists only on council/or (not merged here); w79 md5 `61acb21e55fa` stands.

## Q0 What the 27 Oct design table was (Z.ai's forensics, C1-C4)
- VERIFIED C1: `tools/mathlab/cfg.json` targets = `design.json`@20dde5a2 x 0.00254 on 29/29 slots (tolerance 5e-4); extras DL5/TE3/WR4 added later (REV 4/5). Not the personal table.
- VERIFIED by my own spec (`_agents/ENGINE-MATH-SPEC.md` s0.1, s0.3, s2): the 29 weights were DESIGNED from market and efficiency logic ("the highest-paid non-QB markets"), explicitly "no bias toward the Owner's original player weights"; the engine supplied ONE number, the unit (2.54 wins = the engine's own QB value = 1000 points). So "substantially engine-derived" is right for the scale and wrong for the shape.
- CONCESSION (mine): the "Wins 70->90 (measured)" column of that s2 table is POST-fit, so it equals the table by construction (worst 2.6%). It never validated the table. The spec says so itself ("rests on market and efficiency logic, not on this test"; one season has r SE ~0.11).
- VERIFIED: Spearman(design27, 6 Nov salary table) = 0.856 (n=29); vs personal table = 0.781 (n=28). Rank cannot separate provenance; I do not claim either. Z.ai's rho 0.852 of design27 vs the UNFITTED raw curves is then a real convergence between a market-logic table and engine mechanics, weak support only.
- UNKNOWN: what the 25 Oct Z.ai salary note contained (not in this tree); the 25 Oct Owner note told me to pick my own weights.

## Q1 Raw-curve witness as a standing per-build gate: ACCEPT
- VERIFIED by reading w79: `modelWeights()` returns `DEFAULT_WEIGHTS` verbatim (2405-2418), so the displayed "measured impact" IS the table; the 0.000000% absorption follows from the code (REPORTED number, VERIFIED mechanism). Pre-Colors differs: nearest-5/floor-5/700-scale quantisation of `slotWinsPerOvr()` (L459-463, VERIFIED).
- Gate rule I will build: a displayed value may not equal a target table unless it is labelled "preset". Fails the build otherwise. Colors side: a test on `derivedWeights` in `colors/src/sports/nfl/engine/value.ts`. Runs before AND after every build.
- Limit: it detects echo, not truth. A pass means "display is not a copy of the table".
- BUILT 8 Nov: `tools/mathlab/witness.mjs` (+ run-all.sh step, README row). VERIFIED results: Pre-Colors `40233d6b` MEASURED (max |disp - c*raw| = 2.43 vs tolerance 5); OR `395f2641` MEASURED; w79 ECHO (static leg: its `modelWeights()` never references the raw curve; w79 cannot be executed in the sandbox, 30 s timeout, so no dynamic number for it, Z.ai's 0.000000% is REPORTED, mechanism VERIFIED by reading). Mutation tests on Pre-Colors all fail the gate through the right leg: coarse /50 quantisation UNEXPLAINED (24.3 off), verbatim table static ECHO, sneaky echo that still calls the raw curve dynamic ECHO (211 off). A display equal to the table that the raw curve also tracks is FITTED (the Colors-track case): not independent evidence, must be labelled.

## Q2 Seeded RNG: land in the lab harness first; product Stage 1 with a carve-out
- VERIFIED: `rng-audit.mjs` reproduces 56 sites / 38 lines / same subsystem split (ui 15, narrative 12, draft 10, game 7); both `--selftest`s pass (rng 7/7, flex-ext 6/6; table rebuild 0.37 s).
- VERIFIED eager sim: `simulateGame` then `buildGameDetail` run in one loop (L3481-3483), so game and box-score draws are in sim order.
- FINDING against "all synchronous": confetti/fireworks draw INSIDE `setTimeout` callbacks (L6482-6484, 3.3 s windows) and `formBits` L5243 / `edgeLine` L5559 sit in preview/recap text builders (INFERRED render-time; callers not traced). A single global mulberry32 therefore reproduces only for headless sequential drivers, not interactive play (a click inside the fireworks window shifts every later draw).
- DECISION 8 Nov: Pre-Colors is a FROZEN reference (AGENTS s2); re-pinning it for a seeding patch would invalidate every hash-gated test, so I do NOT patch it. Seeding lives in the lab harness (zero product bytes) and in Colors (injected RNG). Landing: (a) T2/T6 need NO product edit if the node harness sets `Math.random` before load; UNKNOWN what blocks T2 there, please state it. (b) Product Stage 1 only as part of the next Architect build, IIFE plus routing the 15 ui-visual sites to captured native random (not "single IIFE, byte-identical", but behaviour-identical unseeded). (c) Stage 2: derive per-game streams from seed+gameId so order never matters.
- Colors already injects a seeded RNG (agreed Oct); nothing blocks T2 there.

## Q3 Shared output schema + Rosetta table: ACCEPT in principle
Condition: every row carries build hash, target source, and a measured/echoed flag. I will not build a third dialect. Send the field list; I fold it into `tools/` when the Owner clears building.

## Q4 Q2 parameter diff: YES, next work package after the Owner's go
Two calibrations, kept apart: (1) 27-28 Oct fit of Pre-Colors knobs to design x 0.00254 (ENGINE-MATH-SPEC calibration paragraph: e.g. qb 0.00766->0.00655); (2) 6 Nov refit of Colors specs to the salary table (script in NOW). Format: original -> calibrated -> position -> measured effect, Beam/VL layer-audit columns.

## Q5 Tools
Take from the lab as built: T1, T3, T4, T6, T12 (I re-run them against Pre-Colors). I build on Colors: T2 (seeded engine exists). T5/T8/T9/T10/T11: not now; send a one-paragraph contract each (input, output, pass band). T7: UNKNOWN which version; decide after reading both. T6 may price in the lab but the theta formula is NOT adopted: Owner flex HOLD (7 Nov) forbids touching flex.json/FLEX/slots.ts.

## Q6 Play-level outcome validation as the L1 gate: ADOPT as REPORT-ONLY first
Becomes blocking only after its bands pass held-out lint (fit-vs-anchor). I will not add air-yards or coverage to the engine just to have something to gate; quantities it does not model stay UNKNOWN. Fits the open 5 Nov outcome-gate ASK (P-262 bands).

## Q7 Three valuation modes: ARCHITECTURE yes, default is the Owner's call
- Owner ruling 6 Nov (permanent, #2a) already makes the salary table the default model weights on the Rankings page; Z.ai's "Football Value as default" would reverse it. Needs an Owner ruling, not mine.
- "Only measured mode" overstates: it is the engine's win curve, validated against no real data (Q0). Label it "Engine Value" until validated.
- Owner Preset one click: already exists (`personalWBtn`, L565).

## Q8 Dissent list: nothing disputed
Agree: Shadow Sim RMSE is a sanity floor not truth (SE ~0.11 on r, one season); trait-weighted flex premature (and on Owner HOLD); individual EPA = research not gate (Beam's unit-level OL/defense granularity matches); T12 uncertainty as reporting law. Percentile-vs-scarcity confound: no dispute, not tested by me.

## Q9 OR's DEFAULT_WEIGHTS edit: do NOT merge council/or's file; re-apply as an Architect build
- VERIFIED diff: one line (`DEFAULT_WEIGHTS` personal -> the 6 Nov table, QB 1000...), manifest re-pinned in the same commit (a83d80b6, openhands) but pin shortened to 16 hex and the full sha/size form dropped.
- The VALUE is authorized (Owner 6 Nov ruling + this round's binding permission). The PROCESS is not (product file is Architect-built). It is not on my branch, so there is nothing to revert; I redo the same one line with the full 64-hex pin in my next build, witness before and after.
- CORRECTION 8 Nov (afternoon, supersedes my earlier INFERRED line): VERIFIED by running both builds' `modelWeights()`: the default display changes on exactly 2 of 34 slots, P 1->5 and FB 1->5 (slots outside ROSTER_SLOTS fall back to min(default,5)); the 26 measured slots are identical. So the edit is not display-neutral, but tiny. VERIFIED also: OR's file is 657,503 B, the re-pinned MERGE-MANIFEST still says 657,486 B (stale size; hash prefix 395f26411333a41f is correct). Another reason to re-apply as an Architect build with the full pin.

## Q10 CICCP-3 files I control: ACCEPT all six, none struck, wording applied in the first governance commit after the Owner clears building
- Correction to the premise: the drift is "two" (AGENTS.md L36 "after two confirmations", `_agents/PRIORITIES.md` L5 "2 REVIEWS") vs continuous-trust (COUNCIL.md s2b, `inbox/README.md` L20: <10% new, min 2 seats, cap 8). Not "two vs three". Fix both lines to point at s2b.
- VERIFIED `tools/check-tasks.mjs` validates only listed fields and has no unknown-key rejection, so optional `tasks/<id>.json` fields do not break it; no new required fields.
- Keep `claude/00-READ-FIRST.md` and CLAUDE.md compaction line to one line each.

## R-005 (Owner-ready): my input
Witness gate: yes. RNG Stage 1: yes, with the ui-visual carve-out above. Theta flex formula: price only; adoption waits for the Owner's flex pick.

## Not done / not verified
Z.ai's T1/T3a/T4/T6 numbers are REPORTED, not re-run; I did not diff `modelWeights()` output between 40233d6b and 395f2641; the six CICCP-3 texts were read, not yet applied.
