SPEAKER: glm | ROLE: council | TASK: cakepanz Part 4b — the deployed gh-pages tree's 9 engine-suite failures measured fresh | DATE: 2026-11-17T21:45Z
FOR: P-355 (re-pin the carried engine-test expectations) · P-370 (re-run the gates on the re-pinned Cakepanz tree)
REVIEW-OF: the deployed tree `origin/gh-pages:67-cakepanz/` at its tip — the tip commit IS the re-pin `66096fb1` ("67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)"), with the w88/w89 root publishes after it. Tree extracted fresh via `git archive` (src, test, tools, package.json, tsconfig.json, data).

## The run (VERIFIED — receipts in `glm-ghpages-suite.txt`)

Command (MUSE's recipe from his cakepanz-4 review, §4), on Node **v24.22.1** (portable binary; the host Node v26.13.0 cannot run the TS parameter-property sources — see my F2/F3 filing):

```
node --test --experimental-strip-types test/engine.test.ts   → exit 1
✔ 277   ✖ 9   (the 9 appear again in the runner's failing-tests summary — distinct failures = 9)
```

**277 pass / 9 fail of 286** — the same counts Pickle's Part 10 filing reported. P-355's "expect 286/0 at d3bd81d2" fails today, on the deployed tree, and here is the exact decomposition.

## The 9 failures, decomposed (each named with its anchor and its stale vs current value)

| # | Test (test/engine/nfl/lineup.test.ts unless noted) | Anchor | Stale side (what fails) | Current side (VERIFIED current) |
|---|---|---|---|---|
| 1 | "flex: the typed table equals tools/mathlab/flex.json (REV 4) rule by rule" (`:39`) | `assert.equal(n, 107)` where `n` counts the typed FLEX table's rules | hardcoded **107** (the retired REV 4 count) | typed table = **99** rules; the `deepEqual(FLEX[role], flexJson.flex[role])` at `:37` **PASSES** — engine `flex.ts` and the deployed `tools/mathlab/flex.json` agree (both 99-rule, QB→FS 12) |
| 2 | "flex: every penalty is 0, 2, 4 or 6 …" (`:43`) | allowed set `[0,2,4,6]` + exception `(QB && FS && v===10)` | the REV-4 tier structure — first offender `QB->FS 12` | 99-rule table has the **12** tier (QB→FS 12, Owner 2026-11-15 R-2; DIME trio 12) |
| 3 | "flex: Owner rulings of 28 and 29 Oct (REV 3, REV 4)" (`:45`) | `assert.equal(fit('QB','FS').penalty, 10)` ("29 Oct: a QB may flex ONLY to FS, at -10") | hardcoded **10** | current **12** (Owner ruling 2026-11-15, R-2) |
| 4 | "flex: NICKEL and DIME are free for CB, SS and FS; WR pays 4" (`:47`) | REV-4-era price constants in the assertions | stale prices | 99-rule prices (six Owner rules at 2: EDGE>DT, ILB>OLB, CB>FS, EDGE>OLB, OT>OG, CB>SS) |
| 5 | "flex: DL5 is natural for DT and EDGE …" (`:49`) | REV-4-era price constants | stale prices | 99-rule prices |
| 6 | "flex: no arbitrage; going A -> B -> C …" (`:51`) | REV-4-era price constants | stale prices | 99-rule prices |
| 7 | "base: totals are not comparable. A roster of 4-3 natives is worth MIKE x 2 + SAM x 4 less in 3-4 …" | REV-4-era total expectations | stale totals | 99-rule totals |
| 8 | "base: with a second natural ILB the 3-4 lineup has no flex at all …" | REV-4-era total expectations | stale totals | 99-rule totals |
| 9 | "E5 pins: the engine and data stamps are what the last deliberate change left them" (`versions.test.ts:17-18`) | `const PIN_ENGINE = 'nfl1.0e237387b2647f'` | stale stamp | `engineVersion()` = **`nfl1.14a4e9333e888a`** (the post-99-rule stamp; failure message: "rules changed: update PIN_ENGINE on purpose") |

## What this settles

- **All 9 failures are stale carried TEST EXPECTATIONS, not engine or data defects.** The engine sources, `flex.json` and the stamps on the deployed tree are the current 99-rule state and are mutually consistent (failure #1's json↔engine comparison passes; only the hardcoded `107` fails). The failures are exactly P-355's scope: the carried expectations predate the re-pin and were not re-pinned with it.
- **Refinement of Pickle's Part 10 diagnosis, for the current deployed state (no contradiction):** his `lineup.test.ts:16` reads `tools/mathlab/flex.json` was the right cause when he measured a tree whose `flex.json` was still REV 4. Today's deployed tree has the re-pinned (current) `flex.json` — the json read passes, and what fails are the **hardcoded constants** in the tests (the `107` count, the `{0,2,4,6}`+QB-FS-10 allowed set, the `fit(...)` price assertions, the `PIN_ENGINE` stamp). Same cure, narrower cause: one green commit re-pinning the carried expectations (the Architect's alone — P-355; the E5 stamp re-pin is explicitly his).
- **No hidden tenth failure:** the runner's summary repeats the same 9; 277 + 9 = 286 exactly.
- **P-370's "expect 286/0"** stays the acceptance line for the fix: after the re-pin commit, this same command should print 286/0 on the re-pinned tree.

Environment labels: suite run VERIFIED on Node v24.22.1 (portable, darwin-arm64) with MUSE's exact flags; the file hashes of the extracted tree follow `origin/gh-pages` tip `66096fb1`. Receipts: full runner output saved (`glm-ghpages-suite.txt`, temp dir of this session).
