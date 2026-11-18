SPEAKER: INKLING | ROLE: council (MUSE delegation) | TASK: REVIEW of the pools-node fix (57fb83c) and its report | DATE: 2026-11-18

VERDICT: **ok — the fix is real, verified end-to-end by independent reproduction; the acceptance-bar change is right; one open conformance anomaly must not be left in place forever, and the totals bar is owed before anyone says "good for totals".**

## What I verified (re-run, not reused)

1. **414/414 engine tests pass on my Node v26.13.0** (fresh `git archive 57fb83c colors data tools`; `npm run test`, 15.8 s) — matches his "414/414". The replay/golden pin is inside that suite and green.
2. **Independent before/after reproduction with 3,000 matched `hier:<g>` keys** (half the Architect's 40k, both trees from `git archive`):
   - 4th-down passes resumed without a first down: **17.22% → 0.13%** (his 40k: 17.35% → 0.24%);
   - 4th-down runs: **9.56% → 0.12%** (his: 9.83% → 0.13%);
   - conversion rates ~unchanged (pass 34.5% → 34.1%, run 60.7% → 61.1%);
   - points/game −0.30 (his 40k: −0.28), drives +0.068 (his +0.105), plays −0.38 (his −0.24), 4th-down pass tries −0.057/game (his −0.059);
   - giveaways, yards, sacks, completions all inside ±2 SE — same picture.
   **The headline (real 2023-25 resume rates are 0.2% / 0.0%) now matches the sim; the artefact is gone; conversions are intact. This is the correct shape for the fix.**
3. **`recDownKeys`/`recDown` are fully removed** (grep clean across src/test/tools); the class-then-tuple sampler and the pools node now share the one down-preserving `rec`; the lab hook `classMix` still works; `glm-shift.ts` migrated (no dangling import — the old failing state he described is gone in the landed commit).
4. **`hier.test.ts` + `oldhier.ts` read clean**: outcome-shaped laws (wrong-down landing ≤ 0.5%, resume ≤ 0.5%; both eras; passes and runs; whole-game arm over 3,000 games), and the planted old hierarchy proves they fail (resume 17-48% territory; the guard asserts > 5% under the plant). The "check can fail" discipline is intact.
5. **Report consistency**: `hier-fix-2026-11-18.md` numbers re-derive from the same harness I ran (the harness is `colors/tools/hier-sim.ts`, self-contained — good new tool; it also gained usage docs). The `before = 3363eb0` pairing is correct.
6. **Acceptance-bar change endorsed**: he used "a 4th-down try that goes on has given a first down", not my `inc:downs ≈ 24%` — his is the genuinely broken outcome (`inc:downs` is a class-mix statistic, and the pool's own incompletion rate was never the defect). Outcome-shaped, pass AND run, downs 1–4, both eras, whole games, falsifiable by the plant. This is the better bar and it is mine to acknowledge, not revisit.
7. **GLM default untouched; sacks shift untouched** — both as ordered. Lambda stays 0; GLM tests green.

## What is NOT verified / the open items

1. **The `clockLate` / `kick_digest` 2016–22 anomaly is the one thing that can quietly rot.** He found that a fresh oracle regeneration of `poolnode-vectors-fit2016-2022.json` also differed from the committed file in exactly those two nodes, never found why, and "spliced only `rec` in, left the rest as committed". Consequences as they stand: (a) TS-vs-committed-vectors still passes (pack unchanged, log hash and pack hash held — the suite is green and the default gameplay is unaffected); (b) the oracle can no longer **reproduce the committed 2016-22 vectors** for clockLate/kick — so oracle↔TS conformance on those two nodes is **not currently provable**, only assumed; (c) the splice is correct today and wrong later — the next re-pin will carry it forward silently. **Owed before or at the next pin:** a root-cause statement (who drifted — the pack, the oracle, or the data pipeline? `keys_clock` and `build_kicks` are untouched by the commit, so this pre-dates 57fb83c — likely an older drift he inherited, e.g. `pack.py`/`prep()` or a re-bake that post-dates the vectors) — then either regenerate the whole file coherently or document the two nodes as historically pinned with the reason. Do not splice a second generation on top of a splice without resolving cause.
2. **The totals bar is owed, not run** — "good for totals" is unproven, as he said. Note `colors/tools/totals-bar.ts` already exists; the bar against real 2023-25 season totals (points per game distribution, not just means) should land before any cutover claim rides on this fix. Points moved −0.28/game *toward* typical NFL scoring, but that direction being favourable is INFERRED by him, not verified.
3. **40k-game claims**: I reproduced directionally at 3k, within noise of his numbers; I did not run 40k. REPORTED for the exact z values.
4. **Runs "as broken as passes"** — confirmed structurally (shared hierarchy was the defect) and by my 9.56% → 0.12% (run resume) reproduction. His claim that a pass-only fix ships a half-truth stands.

## For the Owner

- **The fix is sound and should stay.** It changes the default engine honestly: measured before, re-measured after, conversions preserved, points realigned, conformance in one commit. It is not "good for anything beyond totals" until the totals bar runs, and it is not "done" until the 2016-22 clockLate/kick_digest cause is known or the two nodes are regenerated coherently.
- **`NOW.md` updates**: the report is honest about both debts; keep both on the NEXT list and do not let "414/414" close them.
- **GLM default**: stays off; the Lab re-runs with the new pool baseline first (his correct note that the old GLM-vs-pool numbers are stale).
- **The hierarchy is now ONE hierarchy** — the era of parallel `rec`/`recDown` bookkeeping is over; future oracle generations should be forced one way. If we ever see "spliced" again without a named cause, that is a process defect worth blocking a re-pin on.
