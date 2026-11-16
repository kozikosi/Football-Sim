**FOR: Engine test round — make every gate prove it can fail (framework comparison R-13 / P-333 / P-342 as marked)**

**This prompt SUPERSEDES `council-engine-tests-2026-11-15.md` (pushed `72b5ee2d`) — do not send the earlier one. It merges MUSE's engine-test prompt with Ernie's test-round draft (`_agents/ernie/deliveries/council-test-round-prompt-draft.md`, `4f4663e1`) and Inkling's record prompt (Rev 7). Best of each; disagreements flagged at the end, not smoothed away.**

**Organising idea (Ernie).** Not "run the tests" — make every gate prove it can fail. Four times in three days a gate passed while the thing it guarded was broken:

| Gate | Said | Actually |
|---|---|---|
| Rev 6 gate 5 | 0 errors | the **build** was red |
| Architect's CI | every step success | the build **failed** (`continue-on-error`) |
| Z.ai's C2 gate | `PASS — 1023 entries` | a manifest parsed to **0 entries** |
| Rev 6 prose | typecheck 0/0 on shipped tree | the shipped tree failed both checkers |

None was broken. Each was built so it *couldn't* fail. This round's rule is one sentence: **a gate is not verified until you have shown it failing.** A reply reporting only green gates is explicitly incomplete — the value is in the survivors and the stalls.

**Where things stand.** Claude's 1b vertical slice landed at `6dcf13b` (suite 363/363, tsc ratchet 89/89, per his report — this round verifies it). Claude timed out on 1c (pack builder); the 1c work did not land (branch still at `86f22d10`; `sim/` has only the 1b files) — do not test 1c code that isn't in the repo. The P-333 derivation round is filed (Beam, Inkling, Ernie); the Owner declined a confirmation round and delegated the derivation, the optimizer defect, and the trade-off to Claude. The pin is FIXED at `d3bd81d2` (Council Rev 6, unanimous, five seats); the Architect's NOW.md floats it to the latest engine commit — this round re-checks the record (item F). The sealed-recipe bench is OWED and unrun. Z.ai's Rev 8 delivery is reviewed (four seats, wash + Svelte lean, no number).

**Verified premises you may rely on after re-checking (label your claims VERIFIED / REPORTED / INFERRED / UNKNOWN):**
- Optimizer scale (VERIFIED independently by MUSE and Ernie, at `86f22d10`, measured provider): sum(v)=8,628.6, v_max=999.31, largest single-spot swing=98,932, largest whole-lineup value=854,227. EMERGENCY=1e5 is 1.01× the single-spot swing and 0.117× the whole-lineup max. PLAYS=1e7 is 11.7× the whole-lineup max (safe). ILLEGAL=1e12 is 1.2e6× the max (safe).
- EMERGENCY A/B (synthetic rosters, VERIFIED by two independent runs): mean emergency fills ~1.0–1.7 per roster with EMERGENCY=1e5, 0.000 with a strict constant (1e9). OPEN: does it survive the real 1,953-player pool, or was the synthetic roster the artefact? (Item D.)
- Flat-roster gap 2773.0387 under the measured provider at `6dcf13b` (VERIFIED by four seats, P-342); third stand-in CB3←TE @ −6. The reference-table gap is 2700/1800/900 (a different provider — keep them separate).
- Rev 8 delivery: nested manifest 360/360 OK; VERIFY.txt 659 entries; C2 gate passes vacuously on a 53-line prose manifest (0 entries parsed); `r51_patch.py` unshipped ("applied 17/17" unverifiable).
- Sealed recipe sha `7fcc3fc0…` (OWED). w89 register: light default `--bg:#fdf2f6`, dark `#1e1119`; no `--tc` in w89; Cinzel inlined base64.
- The Hungarian is exact (three seats verified by reading `colors/src/core/hungarian.ts` + `colors/src/sports/nfl/engine/lineup.ts`). This round is about the constants and the gates, not the algorithm.

**Do NOT:** edit the product file, the engine, flex, `colors/`, `design.json` (read-only), another seat's bytes, governance files, or the queue. Do NOT assign work to any seat — everything below is taken, not assigned. Do NOT re-litigate the framework pick, the pin, or the palette ruling (the Owner holds those). Do NOT fix what you find — file it (§5 patch proposals are filings, not fixes; the Architect integrates them). Do NOT run the sealed bench if you authored the sealed recipe or the fresh-start delivery (see the flagged disagreement in item L).

**A. The 1b slice — mutation-test the twelve new tests.**

At `86f22d10` (extract via `git archive origin/architect/engine-and-seats`):
1. Run the suite (expect 363/363) and the tsc ratchet (expect 89/89). Report the exact commands + outputs.
2. Mutation-test the twelve new tests from 1b: break one thing each guards and show it dies. If a test passes with its guard broken, it is a tautology — name it.
3. Is the tsc ratchet actually a ratchet? Add a type error; it must exit non-zero AND refuse to record it. If it records the error as the new baseline, it is not a ratchet.
4. Are the two de-gated tests live assertions or tautologies? Show each one failing on a broken input.
5. Does the CI summary really say green on a failing commit? (The 1b CI run showed green with a failed build step because every step is `continue-on-error`.) Report what the summary says and what the steps actually did.

File: `inbox/<UTC>-<seat>-1b-mutation.md`, FOR: P-342.

**B. Rewrite `lineup.test.ts` (option (b)) as a §5 patch proposal.**

The test (`colors/test/nfl/lineup.test.ts:26`) asserts `WEIGHT[id] == design[id]` key by key against `tools/mathlab/design.json`. `WEIGHT`/`design.json` are the RETIRED reference table (`colors/src/sports/nfl/engine/slots.ts`: "RETIRED REFERENCE TABLE (P-318, 14 Nov 2026)"; `valueprovider.ts`: "The retired fitted table as a provider… Reference and tests only"). The council (Rev 6, unanimous, five seats) decided the test should be REWRITTEN (option (b)).

Draft the rewrite as a §5 patch proposal (target build + sha256, WHERE anchor, old → new, WHY, SAFE ALONE?, HOW TO CHECK). Keep the structural guards (32 spots, QB == 1000 as scale normalisation, multiples of 5, 16/14/2 unit counts, ID set equality). Drop the `design.json` equality (move it to `tools/mathlab/check-design.mjs`, which already loads `design.json`). Add the guard `assert.equal(DEFAULT_VALUES.name, 'measured')` (fails if WEIGHT is wired back into the solver). Refile out of the engine suite (e.g. `weights-table.test.ts` or the lab gate). Keep the flex typed-table↔`flex.json` equality intact (different animal — single live source of truth).

Also drop the number from the test comment: the comment's "(it is 2700 today)" loses the parenthetical number entirely — it does not get replaced with another number. The Owner ruled nothing pins to the 2773 number.

Do NOT edit the engine. Draft the patch; the Architect integrates it.

File: `inbox/<UTC>-<seat>-lineup-test-rewrite.md`, FOR: P-342.

**C. Review the formation-gap test (report, do not change).**

`colors/test/nfl/formation-gap.test.ts` still pins the reference-table 2700/1800/900 as asserts (table arithmetic, not the measured gap). The Owner ruled nothing pins to the 2773.04 number, but has not ruled on whether these table-arithmetic asserts should stay. Review the test and report: are the 2700/1800/900 asserts table arithmetic (and therefore fine to keep) or are they a number-pin (and therefore should go)? State your reasoning and your recommendation. Do not change the test — report only. The Owner decides.

File: `inbox/<UTC>-<seat>-formation-gap-review.md`, FOR: P-342.

**D. The EMERGENCY defect — reproduce, real-pool test, failing test, §5 patch.**

1. Reproduce the A/B (300 seeded rosters, EMERGENCY=1e5 vs a strict constant). Report your mean emergency fills for each. If your numbers differ from the premises (~1.0–1.7 → 0.000), say so and show your roster generation.
2. The question that matters: does it survive the real 1,953-player pool, or was the synthetic roster the artefact? Run the same comparison on the 32 real rosters (from the pool in `data/`). If the real rosters show 0 avoidable emergency fills under both constants, the defect is a synthetic-roster artefact — say so plainly. If they show avoidable fills, the defect is real.
3. Write a test that FAILS on the current tree (demonstrating an avoidable emergency fill) and PASSES with a strictly-scaled constant. (MUSE has a draft: a seeded 32-man roster, `makeRng(0)`, that takes 1 emergency fill at 1e5 and 0 at 1e9 — verify it, don't trust it. The full-suite check on MUSE's draft is INCONCLUSIVE — the run's output was truncated and a re-run was interrupted; re-run the full suite yourself and report the counts.)
4. Ship the test and the fix as a §5 patch proposal (`colors/src/sports/nfl/engine/lineup.ts` is the Architect's — you do not edit it). The fix derives the ladder from the provider (e.g. scale = sum(v) × 99; EMERGENCY = 2 × scale; PLAYS = 1000 × scale; ILLEGAL = 1000 × PLAYS). The Architect decides whether to accept it.

File: `inbox/<UTC>-<seat>-emergency-defect.md`, FOR: P-333.

**E. The Rev 8 integrity sweep — re-run the delivery's own gates.**

Re-run on the tree you have (a pass-through copy or `_agents/<seat>/deliveries/zai-fresh-start-rev8-2026-11-15/`), from a clean copy:
1. `sha256sum -c CHECKSUMS.txt` (expect 4/4 OK) and `sha256sum -c REV-5.1-addendum/CHECKSUMS.txt` (expect 360/360 OK, exit 0 — and if YOUR tree prints anything else, stop and say so) · `node scripts/gate-manifest.mjs .` (expect PASS, ~1,023 entries) · `node scripts/gate-numerals.mjs . --legacy-scan` and `--claims` (expect CLEAN ×2) · read both `probes/battery-*.json` against these two equations: pass == true, checks.all(ok == true), screens nodeCounts equal (expect 871/457/470/125/221/39 both) · `grep -rn "358/358" .` outside REV-8-ERRATA.md (expect zero). If anything fails for you, report the failure verbatim, not a theory of why.
2. The C2 gate passes vacuously on a manifest it cannot parse (53 lines of prose, 0 entries, PASS). Reproduce it, then state the fix (a manifest that parses to 0 entries must exit non-zero and say "unparseable") as a §5 proposal — do not fix it yourself.
3. The C3 numeral gate: plant a false numeral and show it catches that too. A gate that only catches what it was built for isn't one.
4. Reproduce the gate-5 falsification probe: append an export of state to the class store and facade, run `npm run build`, and report whether the build fails while `svelte-check` reports 0 errors. (Beam and Ernie did this once — reproduce it, don't trust it.)
5. Report the exact outputs — one line each, plus the one that surprises you most.

File: `inbox/<UTC>-<seat>-rev8-gates.md`, FOR: framework comparison (R-13).

**F. The pin reading — the record, not the opinion.**

1. Grep the live muse docs and the architect tree for any text supporting "the pin floats to the latest engine commit" (search the whole `_agents/`, `bulletin/`, `rulings`, `NOW.md`, `BASELINES.md`, `V23-OWNER-NOTES-INTAKE-LEDGER.md`). Name every hit; if the only hits are the Architect's NOW.md line, say so.
2. Then name the rulings that hold the pin down (e.g., AGENTS.md l.46, PROJECT-KNOWLEDGE.md l.18, BASELINES.md if it has one) — cite file and line.
3. One line: which reading the record supports, and what must happen before it changes (not your opinion — the record's own terms).

File: `inbox/<UTC>-<seat>-pin-reading.md`, FOR: framework comparison (R-13).

**G. P-333 arithmetic — verify the derivation numbers, don't trust them.**

At `6dcf13b` (extract via `git archive origin/architect/engine-and-seats`):
1. Recompute the flat natural-4-3 roster lineup in both bases. Report the gap to 4 decimals (expected 2773.0387 under measured DEFAULT_VALUES at this commit) and the flexed placements with weights (expected TE3←FB, DT2←SS, CB3←TE, all at −6, in some deterministic tie order). If your extract differs, report the SHA you extracted, the gap you got, and the stand-in you got — do not adjust to expectation.
2. Recompute d_Z (pool-centred, (ovr,spd,str)) for the six DIME-side pairs (WR/CB/SS/FS/TE/ILB/OLB→DIME) and the three FS pairs (ILB/OLB/TE→FS). Confirm or correct Inkling's filing's numbers (1.59/1.27/1.28 for the DIME trio; 0.36/0.00/0.46/0.43 for the others; 1.16/0.86/0.86 for FS).
3. Re-derive the identity gap = 70 × (spot-value diff) + Σ(u·penalty) for the measured provider (expect spot-value diff exactly 0).

File: `inbox/<UTC>-<seat>-P-333-recheck.md`, FOR: P-333.

**H. Hungarian, lineup, flex, both providers — read, don't trust.**

1. Read `core/hungarian.ts` + `core/hungarian.test.ts` + `colors/test/nfl/lineup.test.ts`. Confirm: exact min-cost potentials, O(n³), square-only rejection, deterministic index-order tie-break, 300-random-matrix brute-force gate. Name any way you can make it wrong (a sign/scale bug, a transpose, a corrupt tie-path) that the existing 300-matrix test does NOT catch.
2. Read `colors/src/sports/nfl/engine/flex.ts` + `tools/mathlab/flex.json`. Confirm 99 rules, tier counts {23×12, 43×6, 10×2, 23×0}, and that the display/typed copies match rule by rule. Name any cell where the table contradicts the pinned overrides (e.g., EDGE>DL5 vs interior weights — say what you see, don't paper over).
3. State which provider the gap in G was measured under and which provider `formation-gap.test.ts` pins as table-value (2700). Both numbers have names in the record — keep them separate.

File: `inbox/<UTC>-<seat>-hungarian-flex-read.md`, FOR: P-333.

**I. Fresh-start repos — clean verify, read-only.**

For any seat with a worktree that can build: clone `kozikosi/football-sim-vue` and `kozikosi/football-sim-svelte` shallow; `npm ci`; `npm run type-check` (vue) / `npm run check` (svelte — expect 0 errors 0 warnings; the one scaffold gap Svelte admitted was a missing vitest plugin — report if you see it); `npx vitest run`; if `probes/probe-battery.mjs` exists in your clone, run it and report the line it prints. Do not modify any file in either repo. Do not push anything there. If your machine can't do it, say so and mark the rows UNKNOWN.

File: `inbox/<UTC>-<seat>-freshstart-verify.md`, FOR: framework comparison (R-13).

**J. Self-lint your own record — the stale numbers die here.**

Every seat greps their own review files on their branch and appends a one-line advisory correction to their next bulletin entry listing: any 358/358, 867, 658, unlabelled 10 vs 9/4 vs 6, any dark/`--tc` = w89 framing restated without the live-layer caveat, any gh-pages tip sha not matching `66096fb1`, and any REPORTED claim repeated as verified. This is a lint of the archive, not a code change — no file edits; the corrections live in the bulletin.

File: `inbox/<UTC>-<seat>-self-lint.md`, FOR: framework comparison (R-13).

**K. Label hygiene — P-345 vs R-13.**

Grep your branch's inbox for `FOR: P-345` on framework-comparison work (lineup gap, pin, flex derivation, the sitting, fresh-start, this seat's). File one page naming every mislabel you find, and name the correct FOR (framework comparison R-13 or the P- number owed) — no renumbering happens; the flag goes to KG/MUSE.

File: `inbox/<UTC>-<seat>-label-hygiene.md`, FOR: framework comparison (R-13).

**L. The owed bench — whoever has the time, and was not there.**

The sealed-recipe second-agent bench is unrun and owed. If you have a clean tree, a second machine or session, and you did not author the sealed recipe or the fresh-start delivery, you may run it — protocol at `REV-5.1-addendum/measurements/PROTOCOL-FOR-A-SECOND-AGENT.md`, handoff at `SEALED-RECIPE.md` / `SECOND-AGENT-HANDOFF.md` in the delivery. Claim the run by filing a reply first (`inbox/<UTC>-<seat>-sealed-bench-claim.md`, one line, FOR: framework comparison R-13) — first past the post runs it, nobody else double-runs. If two of you file in the same window, KG/MUSE decides which one is canonical. **The stalls are a deliverable even if the bench never finishes** — they are the raw material for Z.ai's Rev 9 Part C cold-read audit. Two seats running it gives the across-agent variance that has contaminated every timing number so far.

File: `inbox/<UTC>-<seat>-sealed-bench-claim.md` (claim) and `inbox/<UTC>-<seat>-sealed-bench-run.md` (run), FOR: framework comparison (R-13).

**Filing.** Each item you complete is its own inbox file, `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: <seat> | TASK: <task> | DATE: <UTC>`, then `FOR: <ID>` per item (A → P-342; B/C → P-342; D/G/H → P-333; E/F/I/J/K/L → framework comparison R-13). Appended ledger lines separate: VERIFIED / REPORTED / INFERRED / UNKNOWN. For a patch proposal, use the §5 form (target build + sha256, WHERE anchor, old → new, WHY, SAFE ALONE?, HOW TO CHECK). For a review, state your verdict (improved / ok / credible) and your reasoning. Push after every finished file. If any single command fails you, the failure is the answer — report it verbatim. After the round items, take the top queue line (`node tools/council.mjs next`) — a review you can do beats new work in the same tier.

**Innovation.** If any test above can be made stronger, or you have a falsifier that kills your own preference, propose it inside your findings. Disagreements are filed, not smoothed; two seats disagreeing on what the record shows is a finding, not a conflict.

**Sequence.** This round runs before the Z.ai prompt and the Claude prompt; neither blocks you; the framework pick, the pin, and the palette stay the Owner's to rule, on your evidence.

**Disagreements flagged (not smoothed):**
1. **Sealed bench runners.** Inkling's draft puts a hard rule: "don't run the sealed bench if you authored any portion of the fresh-start repos." The Owner's decision (2026-11-15) lists MUSE, Inkling, Ernie, AND Z.ai as runners — and Inkling and Z.ai both authored fresh-start work. The Owner's list governs; Inkling's rule is recorded as a concern (blindness matters — the runner must not have seen the sealed recipe/instructions in advance). If the Owner wants to narrow the runner list, he will say so.
2. **MUSE's council-member draft.** MUSE answered the earlier engine-test prompt as a council member before this merge (scale numbers VERIFIED, A/B reproduced, a failing-test draft written). That draft is a LABELED DRAFT, not a council filing — MUSE authored the prompt, so it cannot count as an independent filing. A different seat must verify it (item D asks for exactly that — reproduce the A/B and the test, don't trust MUSE's draft).
