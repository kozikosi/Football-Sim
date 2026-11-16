SPEAKER: ernie | ROLE: council | TASK: 67 Cakepanz — the M3 swap test, run independently, and a correction to my own seam verdict (Parts 2 + 3) | DATE: 2026-11-16T21:26Z
FOR: R-13

# The swap test, run

**Tree:** a scratch copy of `67-cakepanz-s3-s4-rev2` at `/tmp/cp-swap`. The **only** mutation: `src/engine/` replaced with `colors/src` at `d3bd81d2` (57 files). Everything else byte-identical to the delivered tree.

```
$ rm -rf src/engine && <copy d3bd81d2 colors/src -> src/engine>
$ diff -rq src/engine <4ca9a071 extract> | wc -l        -> 11     (the expected pin delta)
$ diff -rq src <delivered src> | grep -v "src/engine"   -> 0      (nothing outside src/engine changed)
$ npm run build                                         -> exit 0, built in 1.88s
$ CP_PORT=4180 node batteries/slice1.battery.mjs        -> exit 0 · 61 pass · 0 fail · 10 skip · 3 deferred
```

**The app builds and the full battery passes on the other engine pin with zero edits outside `src/engine/`.** My earlier verdict ("the merge is a port, not a drop-in") was **too strong for the runtime path and I withdraw that part of it.**

# What actually breaks: the verification apparatus, not the app

```
$ npm run test:engine        -> exit 1 · 9 failing tests
```

The nine, all in the carried engine suite:

- `flex: the typed table equals tools/mathlab/flex.json (REV 4) rule by rule`
- `flex: every penalty is 0, 2, 4 or 6 and every role in the data has a row`
- `flex: Owner rulings of 28 and 29 Oct (REV 3, REV 4)`
- `flex: NICKEL and DIME are free for CB, SS and FS; WR pays 4`
- `flex: DL5 is natural for DT and EDGE and costs the cheaper of role->DT, role->EDGE for the rest`
- `flex: no arbitrage; going A -> B -> C through two spots is never cheaper than the listed A -> C`
- `base: totals are not comparable. A roster of 4-3 natives …`
- `base: with a second natural ILB the 3-4 lineup has no flex at all …`
- `E5 pins: the engine and data stamps are what the last deliberate change left them`
  (`actual: 'nfl1.14a4e9333e888a'` vs `expected: 'nfl1.0e237387b2647f'`)

**Cause, with file and line:** `test/engine/nfl/lineup.test.ts:16` reads `../../../tools/mathlab/flex.json`, and the tree's copy is the **old pin's** table (`28a2e9935af4c848…`), not the live 99-rule one (`0a26d7c225cb7ec8…`, which the sitting ships at `flex-live/tools/mathlab/flex.json`). The carried `test/` suite (35 files) is likewise written against the old pin. So the re-pin procedure is **three directories, not one**:

1. `src/engine/` — replace with the new pin (verified: no app edit needed)
2. `tools/mathlab/flex.json` — replace with the new pin's table
3. `test/` — replace with the new pin's suite

Steps 2 and 3 are **outside** `src/engine/`, so **M2 ("one directory") fails strictly**, while **M3 ("the app builds and the battery passes") passes**.

# Corrected verdict on the five M-requirements

| | before (my filing of 21:06) | after the swap test |
|---|---|---|
| **M1** one door | FAIL — 14 files import `src/engine/**` | **unchanged: FAIL** |
| **M2** one directory | FAIL | **FAIL, but narrowly** — only `test/` and `tools/mathlab/` also move; no screen, store or VM needs an edit |
| **M3** the swap test | "NOT RUN by the builder; a swap today would require edits outside src/engine" | **PASS** — build exit 0, battery 61/0/10/3, `diff -rq` outside `src/engine` empty |
| **M4** written contract | FAIL — no `SNAPSHOT.md` | **unchanged: FAIL** |
| **M5** thin seam | 76 lines / 13 files | **unchanged: 76 lines / 13 files** |

**So the accurate statement for the handoff is:** *the shell already drops in on a new engine for runtime purposes — the app builds and the whole battery passes with zero edits outside `src/engine/`. What does not travel is the verification apparatus (`test/`, `tools/mathlab/flex.json`) and the documentation (no `SNAPSHOT.md`, no seam module). The one-door refactor (M1) is therefore **not required for mergeability** — it is required for *maintainability*: 14 files naming engine modules is what makes each future re-pin a small port rather than a swap.*

**Why the battery stayed green while the pin changed** (a strength worth recording): the shell's laws assert *observations and relationships* (the board renders 60 rows from the view model; the chosen team drafts; the gone% tooltip equals a node recompute; the feed's UI game equals the engine's game), never fixed counts. The pin migration changes the *values* (QB→FS 10→12, 24→21 flexed picks, 1/32 user picks identical) and the battery does not encode those values — which is exactly why it survives a re-pin. A battery that asserted the old flex numbers would have failed here for the wrong reason.

# What this unblocks

- **For the Architect:** merge day is cheaper than the tree's prose suggests — the app half is a directory swap; only the test fixtures and the flex table need to move with it. The cutover runbook should name all three paths, not one.
- **For Z.ai:** `SNAPSHOT.md` (M4) and one `enginePort.ts` (M1) remain the two artifacts worth building, but neither is a merge blocker. If time is short, `SNAPSHOT.md` + the three-path runbook is the higher-value pair.

**Falsifier I did not run:** I swapped `4ca9a071` → `d3bd81d2` only. A second swap (e.g. to the Architect's newest engine commit, which per AGENTS.md is beyond `d3bd81d2`) would test whether the pattern holds for a *larger* delta; if a future pin changes a signature rather than a table, the 14 direct importers are where it would break, and M1 would become a merge blocker after all.