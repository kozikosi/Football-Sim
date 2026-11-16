**FOR: Engine test round — make every gate prove it can fail (framework comparison R-13 / P-333 / P-342 as marked)**

**Organising idea.** Not "run the tests" — make every gate prove it can fail. Four times in three days a gate passed while the thing it guarded was broken:

| Gate | Said | Actually |
|---|---|---|
| Rev 6 gate 5 | 0 errors | the **build** was red |
| The Architect's CI | every step success | the build **failed** (every step is `continue-on-error`, so a failed step still shows green) |
| Z.ai's C2 gate | `PASS — 1023 entries` | a manifest parsed to **0 entries** (the gate read nothing and passed) |
| Rev 6 prose | typecheck 0/0 on the shipped tree | the shipped tree failed both checkers |

None was broken. Each was built so it *couldn't* fail. This round's rule is one sentence: **a gate is not verified until you have shown it failing.** A reply reporting only green gates is explicitly incomplete — the value is in the survivors and the stalls.

**What this round is.** The project is a football draft simulator ("76 Pancakes"). The engine is written by one person, the Architect (Claude), on the branch `architect/engine-and-seats`. The council (this group) reviews, tests, and proposes changes — it never edits the engine or the product itself. This round asks the council to test the engine and the delivery gates, and to make each gate prove it can fail. Every item below is self-contained: you need only this prompt and the repo. Do not assume you have read anything else. If a term is unfamiliar, it is defined where it first appears.

**The engine, in one paragraph.** The engine picks the best 32-player lineup for a team by solving an assignment problem (the Hungarian algorithm, exact). Each of the 32 spots (QB, WR1, DE1, OT1, DT1, CB1, and so on) has a value — how much one OVR point at that spot is worth, in wins per season. A player can play a spot other than his own at a flex penalty (0, 2, 6, or 12 OVR points; 99 rules total). If no player can legally play a spot, the solver uses an "emergency fill" (a player at −8 OVR). The solver has four priorities, strongest first: (1) a quarterback never plays an unlisted spot; (2) every rostered player who can play, plays, before any empty spot is filled; (3) as few emergency fills as possible; (4) the highest total value. These priorities are enforced by constants in the cost matrix: ILLEGAL (for a quarterback in an unlisted spot), PLAYS (reward for playing a player), EMERGENCY (cost of one emergency fill). Each constant must be strictly larger than everything below it, or a lower priority can buy out a higher one. The spot values come from a "value provider": the default is MEASURED (measured from the matchup model, `slotWins20 / 20`), and the old fitted table is RETIRED (kept only as a reference for tests).

**Where things stand (all re-checkable; label your claims VERIFIED / REPORTED / INFERRED / UNKNOWN).**
- The Architect's latest slice ("1b", one neutral drive from pack to box score) landed at commit `6dcf13b` on `architect/engine-and-seats`. His report says the test suite is 363/363 and the type-check ratchet is 89/89. This round verifies both (item A).
- The next slice ("1c", the pack builder — the real play-by-play data baked into a pack so TypeScript can re-run the totals check) did NOT land: the Architect timed out before pushing, so the branch is still at `86f22d10` and the `sim/` folder has only the 1b files. Do not test 1c code that isn't in the repo.
- The optimizer's value scale, measured at commit `86f22d10` under the measured provider: the 32 spot values sum to 8,628.6; the largest single spot value is 999.31; the largest value swing on one spot (value × 99 OVR) is 98,932; the largest whole-lineup value (sum × 99) is 854,227. The shipped EMERGENCY constant is 100,000 — that is 1.01× the single-spot swing and 0.117× the whole-lineup value, so priority 3 (fewest emergency fills) is NOT strictly above priority 4 (value). Two independent runs on seeded rosters found the shipped constants accept about 1–2 avoidable emergency fills per roster, while a strict constant (1,000,000,000) uses none. Re-measure this yourself in item D; do not take these numbers on trust. OPEN: does it survive the real 1,953-player pool, or was the synthetic roster the artefact?
- The 3-4 vs 4-3 formation gap: a roster built for the 4-3 loses value in the 3-4. Measured under the MEASURED provider at `6dcf13b`, the gap is 2773.0387 (four seats recomputed it independently). Measured under the RETIRED table, the gap is 2700 (with the two one-way losses 2700 and 1800, a gap of 900). These are two measurements of the same thing under two different providers — keep them separate, and do not pin anything to the 2773 number (the Owner ruled nothing is pinned to it; it should emerge from the engine, not be verified against).
- The "pin" is the frozen engine commit that the UI tracks consume: it is FIXED at `d3bd81d2` (decided by the council in five unanimous answers, and recorded in AGENTS.md and PROJECT-KNOWLEDGE.md). The Architect's NOW.md says the pin "resolves to the latest engine commit" — this round re-checks the record (item F). The latest engine commit is `6dcf13b`; that is not the pin unless an explicit re-pin act says so.
- The UI work ("fresh-start", two new repos, one in Vue 3 + Vite and one in Svelte 5 + Vite) was delivered by Z.ai (called "Rev 8") and reviewed by four seats: the verdict is a wash with a narrow Svelte lean, no number, no cutover. The delivery's own numbers: the nested manifest is 360/360 OK; VERIFY.txt says 659 entries; the C2 gate passes vacuously on a 53-line prose manifest (0 entries parsed); a script called `r51_patch.py` is unshipped, so the claim "applied 17/17" cannot be verified.
- The "sealed bench" is a blind test to settle Vue vs Svelte fairly: a fresh agent who has not seen the instructions builds the same 11-field store in both frameworks, measured on repair cycles and first-try greens. The recipe is sealed (a file with a known hash); it has been written but never run. It is OWED.
- The live website is "w89" (the 89th wave). Its default look is pale-rose light (`--bg:#fdf2f6`), with a dark mode (`--bg:#1e1119`). Team colour comes from a JavaScript map (`ZPB_TEAM_COLORS`) plus a `[data-zpbteam]` remap — there is no `--tc` variable anywhere in w89. The display font is Cinzel, inlined as base64 so it works offline.

**Do NOT:** edit the product file, the engine, flex, `colors/`, `design.json` (read-only), another seat's bytes, governance files, or the queue. Do NOT assign work to any seat — everything below is taken, not assigned. Do NOT re-litigate the framework pick, the pin, or the palette ruling (the Owner holds those). Do NOT fix what you find — file it (a §5 patch proposal is a filing, not a fix; the Architect integrates it). Do NOT run the sealed bench if you authored the sealed recipe or the fresh-start delivery.

**A. The 1b slice — mutation-test the twelve new tests.**

The 1b slice is the Architect's latest work (commit `6dcf13b`, branch `architect/engine-and-seats`). Extract it with `git archive origin/architect/engine-and-seats` and work from the extracted copy.
1. Run the test suite (his report says 363/363) and the type-check ratchet (his report says 89/89). Report the exact commands you ran and their outputs.
2. Mutation-test the twelve new tests from 1b: break one thing each test guards and show the test dies (fails). If a test passes with its guard broken, it is a tautology — name it.
3. Is the type-check ratchet actually a ratchet? A ratchet means: if you add a type error, the check must exit non-zero AND refuse to record the error as the new baseline. Add a type error and report what happens. If it records the error as the new baseline, it is not a ratchet.
4. Two tests were "de-gated" (rewritten from failing tests into structural assertions). Are they live assertions or tautologies? Show each one failing on a broken input.
5. The 1b CI run showed green even though its build step failed, because every step is `continue-on-error`. Does the CI summary really say green on a failing commit? Report what the summary says and what the steps actually did.

File: `inbox/<UTC>-<seat>-1b-mutation.md`, FOR: P-342. (P-342 is the queue item for the 1b slice and the engine questions around it.)

**B. Rewrite the lineup weight test as a §5 patch proposal.**

The file `colors/test/nfl/lineup.test.ts` (on `architect/engine-and-seats`) has a test at line 26 that asserts the engine's weight table (`WEIGHT`, one number per spot, QB = 1000) equals `tools/mathlab/design.json` key by key. That table is RETIRED: the file `colors/src/sports/nfl/engine/slots.ts` says "RETIRED REFERENCE TABLE (P-318, 14 Nov 2026). Draft, lineup and the board no longer read these weights", and `valueprovider.ts` says the retired table is "Reference and tests only". The solver now spends the MEASURED provider (`DEFAULT_VALUES`), not the retired table. Five council seats unanimously decided the test should be REWRITTEN (not deleted, not kept as-is).

Draft the rewrite as a §5 patch proposal. A §5 proposal has: target build (file + commit hash) · WHERE (an anchor string, not just a line number) · old → new (exact code) · WHY · SAFE ALONE? (can it land by itself?) · HOW TO CHECK (the command + expected output). Keep the structural guards: 32 spots; QB == 1000 (as scale normalisation, not a weight pin); every weight a multiple of 5; unit counts 16 offense / 14 defense / 2 special; the ID set is consistent. Drop the `design.json` value equality (move it to `tools/mathlab/check-design.mjs`, which already loads `design.json`). Add the guard `assert.equal(DEFAULT_VALUES.name, 'measured')` (it fails if the retired table is ever wired back into the solver). Move the test out of the engine test suite (for example into a new file `weights-table.test.ts` or the lab gate). Keep the flex-table equality intact (the typed flex table must equal `tools/mathlab/flex.json` rule by rule — that is a different check, a single live source of truth, and it stays).

Also drop a number from a test comment in the same file: the base test has a comment that says the gap "(it is 2700 today)". Delete that parenthetical entirely — do not replace it with another number. The Owner ruled nothing is pinned to the gap number.

Do NOT edit the engine. Draft the patch; the Architect integrates it.

File: `inbox/<UTC>-<seat>-lineup-test-rewrite.md`, FOR: P-342.

**C. Review the formation-gap test (report, do not change).**

The file `colors/test/nfl/formation-gap.test.ts` has tests that assert exact numbers under the RETIRED table: a roster built for its own base is worth 600250 at 70 OVR; a 4-3 roster loses 2700 in the 3-4; a 3-4 roster loses 1800 in the 4-3; a gap of 900. (With a different player at the DL5 spot, both lose 1800 and the gap is 0.) The Owner ruled nothing is pinned to the 2773.04 number (the MEASURED gap), but has not ruled on whether these retired-table asserts should stay. Review the test and report: are the 2700/1800/900 asserts arithmetic on a frozen retired table (and therefore fine to keep, as a check that the solver logic is unchanged), or are they a number-pin on the gap (and therefore should go, so the gap can emerge)? State your reasoning and your recommendation. Do not change the test — report only. The Owner decides.

File: `inbox/<UTC>-<seat>-formation-gap-review.md`, FOR: P-342.

**D. The emergency-constant defect — reproduce, real-pool test, failing test, §5 patch.**

The solver's EMERGENCY constant (100,000) is the cost of one emergency fill in the cost matrix. The claim is that it is too small: the whole-lineup value is about 854,227, so the optimizer can accept an emergency fill when the value gained elsewhere exceeds 100,000. (The scale numbers are in "Where things stand" above — re-measure them yourself, don't take them on trust.)
1. Reproduce the comparison: build two copies of the engine that differ only in EMERGENCY (100,000 vs 1,000,000,000), run the same 300 seeded rosters through each, and report the mean emergency fills for each. If your numbers differ from the ones above (~1–2 per roster → 0.000), say so and show how you generated your rosters.
2. The question that matters: does it survive the real 1,953-player pool, or was the synthetic roster the artefact? The pool is 1,953 players (1,941 ratings rows + 12 free agents) in `data/`. Run the same comparison on the 32 real rosters (one per team). If the real rosters show 0 avoidable emergency fills under both constants, the defect is a synthetic-roster artefact — say so plainly. If they show avoidable fills, the defect is real.
3. Write a test that FAILS on the current tree (it demonstrates an avoidable emergency fill) and PASSES with a strictly-scaled constant. A concrete construction that works: generate a 32-player roster from seed 0 (roles drawn from QB/WR/TE/CB/SS/FS/RB/OT/OG/C/ILB/OLB/EDGE/DT, OVRs 55–95) and assert the lineup has zero emergency fills. On the current tree it takes 1; with a strict constant it takes 0. Verify that yourself — do not take this construction on trust.
4. Ship the test and the fix as a §5 patch proposal. The file `colors/src/sports/nfl/engine/lineup.ts` is the Architect's — you do not edit it. The fix derives the ladder from the provider instead of hard-coding it: for example, scale = (sum of spot values) × 99 (the largest whole-lineup value); EMERGENCY = 2 × scale; PLAYS = 1000 × scale; ILLEGAL = 1000 × PLAYS. The Architect decides whether to accept it. Your patch must include the full test suite run (all tests green with the fix, and the new test failing without it) — report the counts, not just "it passed".

File: `inbox/<UTC>-<seat>-emergency-defect.md`, FOR: P-333. (P-333 is the queue item for the formation-balance / flex-derivation work; the optimizer defect came out of it.)

**E. The Rev 8 integrity sweep — re-run the delivery's own gates.**

"Rev 8" is Z.ai's delivery of the fresh-start UI work (two new repos, Vue and Svelte). It lives as pass-through copies under `_agents/<seat>/deliveries/zai-fresh-start-rev8-2026-11-15/` on several council branches. Re-run its own gates on the tree you have, from a clean copy:
1. `sha256sum -c CHECKSUMS.txt` (expect 4/4 OK) and `sha256sum -c REV-5.1-addendum/CHECKSUMS.txt` (expect 360/360 OK, exit 0 — and if YOUR tree prints anything else, stop and say so) · `node scripts/gate-manifest.mjs .` (expect PASS, about 1,023 entries) · `node scripts/gate-numerals.mjs . --legacy-scan` and `--claims` (expect CLEAN twice) · read both `probes/battery-*.json` and check these two equations: pass == true, and every check's ok == true, and the per-screen node counts are equal in both arms (expect 871/457/470/125/221/39 in both) · `grep -rn "358/358" .` outside REV-8-ERRATA.md (expect zero). If anything fails for you, report the failure verbatim, not a theory of why.
2. The C2 gate passes vacuously on a manifest it cannot parse: the manifest is 53 lines of prose, not a list of hashes, so the gate read 0 entries and PASSED. Reproduce that, then state the fix (a manifest that parses to 0 entries must exit non-zero and say "unparseable") as a §5 proposal — do not fix it yourself.
3. The C3 numeral gate checks that numbers quoted in prose match the receipts. Plant a false numeral and show it catches that too. A gate that only catches what it was built for isn't one.
4. Reproduce the gate-5 falsification probe: append an export of state to the class store and the facade, run `npm run build`, and report whether the build fails while the type-checker reports 0 errors. (Two seats did this once — reproduce it, don't trust it.)
5. Report the exact outputs — one line each, plus the one that surprises you most.

File: `inbox/<UTC>-<seat>-rev8-gates.md`, FOR: framework comparison (R-13). (R-13 is the Owner's ruling that the framework is tested in two arms, Vue vs Svelte, and measurement decides. Framework-comparison work files under it, not under a P-number.)

**F. The pin reading — the record, not the opinion.**

The "pin" is the frozen engine commit the UI tracks consume. Two readings exist: (a) the pin is FIXED at `d3bd81d2` and only moves by an explicit re-pin act; (b) the pin "resolves to the latest engine commit". 
1. Search the whole repo for any text supporting reading (b): grep `_agents/`, `bulletin/`, `rulings`, `NOW.md`, `BASELINES.md`, and `V23-OWNER-NOTES-INTAKE-LEDGER.md` for "resolves to the latest" and "pin floats". Name every hit; if the only hits are in the Architect's NOW.md, say so.
2. Then name the rulings that hold the pin down — cite file and line (for example AGENTS.md and PROJECT-KNOWLEDGE.md both bind the pin to `d3bd81d2`).
3. One line: which reading the record supports, and what must happen before it changes (not your opinion — the record's own terms).

File: `inbox/<UTC>-<seat>-pin-reading.md`, FOR: framework comparison (R-13).

**G. P-333 arithmetic — verify the derivation numbers, don't trust them.**

P-333 is the queue item for deriving the flex penalties from a formula (destination weight + athletic distance) instead of hand-setting 99 rules. Three seats filed derivation sketches. Verify the numbers in those sketches from the engine, at commit `6dcf13b` (extract via `git archive origin/architect/engine-and-seats`):
1. Recompute the flat natural-4-3 roster lineup in both bases (a roster of 70-OVR players, one per spot, built for the 4-3). Report the gap to 4 decimals (the filings say 2773.0387 under the measured provider) and the flexed placements with weights (the filings say TE3←FB, DT2←SS, CB3←TE, all at −6, in some deterministic tie order). If your extract differs, report the SHA you extracted, the gap you got, and the stand-in you got — do not adjust to expectation.
2. Recompute the athletic distance (pool-centred, on (OVR, speed, strength)) for the six pairs into DIME (WR/CB/SS/FS/TE/ILB/OLB→DIME) and the three pairs into FS (ILB/OLB/TE→FS). Confirm or correct the filed numbers (the filings say about 1.59/1.27/1.28 for the DIME trio, 0.36/0.00/0.46/0.43 for the others, and 1.16/0.86/0.86 for FS).
3. Re-derive the accounting identity: gap = 70 × (spot-value difference) + sum over flexed spots of (spot value × flex price), for the measured provider. The filings say the spot-value difference is exactly 0 (so the whole gap is flex cost). Confirm or correct that.

File: `inbox/<UTC>-<seat>-P-333-recheck.md`, FOR: P-333.

**H. Hungarian, lineup, flex, both providers — read, don't trust.**

1. Read `colors/src/core/hungarian.ts`, its test, and `colors/test/nfl/lineup.test.ts`. Confirm: the algorithm is exact min-cost (not a greedy approximation); it is O(n³); it rejects a non-square matrix; it breaks ties deterministically by index order; and there is a test that checks it against brute force on 300 random matrices. Name any way you can make it wrong (a sign error, a scale error, a transpose, a corrupt tie-path) that the existing 300-matrix test does NOT catch.
2. Read `colors/src/sports/nfl/engine/flex.ts` and `tools/mathlab/flex.json`. Confirm 99 rules with tier counts {23 at 12, 43 at 6, 10 at 2, 23 at 0}, and that the typed table and the JSON file match rule by rule. Name any cell where the table contradicts a pinned Owner override — say what you see, don't paper over it.
3. State which provider the gap in item G was measured under (measured) and which provider `formation-gap.test.ts` pins as table-value (retired table, 2700). Both numbers have names in the record — keep them separate.

File: `inbox/<UTC>-<seat>-hungarian-flex-read.md`, FOR: P-333.

**I. Fresh-start repos — clean verify, read-only.**

The two fresh-start repos are `kozikosi/football-sim-vue` and `kozikosi/football-sim-svelte` (new standalone repos, one per framework). For any seat with a worktree that can build: clone each shallow; run `npm ci`; run `npm run type-check` (Vue) / `npm run check` (Svelte — expect 0 errors, 0 warnings); run `npx vitest run`; if `probes/probe-battery.mjs` exists in your clone, run it and report the line it prints. Do not modify any file in either repo. Do not push anything there. If your machine can't do it, say so and mark the rows UNKNOWN.

File: `inbox/<UTC>-<seat>-freshstart-verify.md`, FOR: framework comparison (R-13).

**J. Self-lint your own record — the stale numbers die here.**

Every seat greps their own review files on their own branch and appends a one-line advisory correction to their next bulletin entry listing: any "358/358" (the shipped number is 360), any "867" (the shipped number is 871), any "658" (the shipped number is 659), any unlabelled "10 vs 9 / 4 vs 6" (line counts that need their method stated), any dark-background / `--tc` framing of w89 stated without the caveat that w89's default is pale-rose light and has no `--tc`, any gh-pages tip hash not matching `66096fb1`, and any REPORTED claim repeated as verified. This is a lint of the archive, not a code change — no file edits; the corrections live in the bulletin.

File: `inbox/<UTC>-<seat>-self-lint.md`, FOR: framework comparison (R-13).

**K. Label hygiene — P-345 vs R-13.**

P-345 is the queue item for the play-level innovation round. It is NOT the framework comparison — framework work files under R-13 (the Owner's two-arm ruling). Grep your branch's inbox for `FOR: P-345` on framework-comparison work (lineup gap, pin, flex derivation, the sitting, fresh-start, this round). File one page naming every mislabel you find, and name the correct FOR (framework comparison R-13, or the P-number owed). No renumbering happens; the flag goes to KG/MUSE.

File: `inbox/<UTC>-<seat>-label-hygiene.md`, FOR: framework comparison (R-13).

**L. The owed bench — whoever has the time, and was not there.**

The sealed bench is a blind test to settle Vue vs Svelte fairly. The recipe is sealed (a file with a known hash, `7fcc3fc0…`): a fresh agent who has not seen the instructions builds the same 11-field store in both frameworks, measured on repair cycles and first-try greens. It has been written but never run. It is OWED. If you have a clean tree, a second machine or session, and you did not author the sealed recipe or the fresh-start delivery, you may run it — the protocol is in `REV-5.1-addendum/measurements/PROTOCOL-FOR-A-SECOND-AGENT.md` and the handoff in `SEALED-RECIPE.md` / `SECOND-AGENT-HANDOFF.md` in the Rev 8 delivery. Claim the run by filing a reply first (`inbox/<UTC>-<seat>-sealed-bench-claim.md`, one line, FOR: framework comparison R-13) — first past the post runs it, nobody else double-runs. If two of you file in the same window, KG/MUSE decides which one is canonical. **The stalls are a deliverable even if the bench never finishes** — they are the raw material for making the recipe turnkey. Two seats running it gives the across-agent variance that has contaminated every timing number so far.

Two positions on who may run it, stated plainly (the Owner decides if they conflict): the Owner has named MUSE, Inkling, Ernie, and Z.ai as runners. A concern has also been raised that a runner who authored the fresh-start work cannot run it blind, because they have seen both trees. The Owner's list governs; the concern is noted here so each runner can judge their own blindness before claiming.

File: `inbox/<UTC>-<seat>-sealed-bench-claim.md` (claim) and `inbox/<UTC>-<seat>-sealed-bench-run.md` (run), FOR: framework comparison (R-13).

**Filing.** Each item you complete is its own inbox file, `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: <seat> | TASK: <task> | DATE: <UTC>`, then `FOR: <ID>` per item (A → P-342; B/C → P-342; D/G/H → P-333; E/F/I/J/K/L → framework comparison R-13). Appended ledger lines separate: VERIFIED (you ran it, the receipt is in the text) / REPORTED (someone else says so) / INFERRED (reasoned, not run) / UNKNOWN. For a patch proposal, use the §5 form (target build + commit hash, WHERE anchor, old → new, WHY, SAFE ALONE?, HOW TO CHECK). For a review, state your verdict (improved / ok / credible) and your reasoning. Push after every finished file. If any single command fails you, the failure is the answer — report it verbatim. After the round items, take the top queue line (`node tools/council.mjs next`) — a review you can do beats new work in the same tier.

**Innovation.** If any test above can be made stronger, or you have a falsifier that kills your own preference, propose it inside your findings. Disagreements are filed, not smoothed; two seats disagreeing on what the record shows is a finding, not a conflict.

**Sequence.** This round runs before the Z.ai prompt and the Claude prompt; neither blocks you; the framework pick, the pin, and the palette stay the Owner's to rule, on your evidence.
