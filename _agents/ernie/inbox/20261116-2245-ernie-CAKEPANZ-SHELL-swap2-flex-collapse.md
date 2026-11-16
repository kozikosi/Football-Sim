SPEAKER: ernie | ROLE: council | TASK: 67 Cakepanz — the second swap test (Architect tip `7a0706df`) and the flex-surface collapse it exposes (Parts 2 + 7) | DATE: 2026-11-16T22:45Z
FOR: R-13

# The second swap test — a real delta, not a table bump

The first swap (`d3bd81d2`, 11 days of engine work but a *table* change) passed. This one is the decisive test: the Architect's branch tip **`7a0706df` is 11 commits ahead of the pin `d3bd81d2`**, and the delta touches 17 files / **+1,222 − 53**, including `engine/draft.ts`, `engine/lineup.ts`, `engine/slots.ts`, `engine/valueprovider.ts` (new), and `view/draftBoard.ts` — i.e. the value layer (P-318).

**Method:** scratch copy of `67-cakepanz-s3-s4-rev2`; `src/engine/` replaced with `colors/src` at `7a0706df`; `diff -rq` outside `src/engine` → **0 lines**. Nothing else touched.

```
$ npm run build                              -> exit 0, 180 modules, 697ms
$ CP_PORT=4181 node batteries/slice1.battery.mjs
   FAIL  the flex chips read the flex cost (the "-N" form, no "flex tax" wording)
         — OBSERVED open — 14 pickers probed · 0 flex chips · sample []
   == SLICE 1 BATTERY · 60 pass · 1 fail · 10 skip · 3 deferred ==
```

**So M3 is not unconditionally green: one law is engine-coupled, and it is the first to break on a real delta.** M1 (14 direct importers) did **not** break the build — every engine signature the shell calls (`SLOTS`, `SLOT_IDS`, `fit`, `boardVM`, `lineupFor`, `candidates`) stayed compatible. **My corrected verdict holds and is strengthened: the one-door refactor is a maintainability concern, not a merge blocker, even across a 17-file engine delta.**

# The failure is a product signal, not a shell bug

The law probes the top 14 rows. Node-side, same draft, same seed, same call:

| engine | rows | rows with flex options | flex chips |
|---|---|---|---|
| `4ca9a071` (the app tree's pin) | 60 | **50** | **347** |
| `7a0706df` (Architect tip) | 60 | **12** | **18** |

`boardVM(st.draft, 20, goneOdds(...), {sort:'wins'}).rows` — my probe `alsofits.mjs`, run on both trees. The top 14 rows at the tip are `[]` for `alsoFits` (sample: Patrick Mahomes QB, Brock Purdy QB, Caleb Williams QB — all `also: []`), which is why the battery sees zero chips.

**What this means for the product:** at the top of the board — exactly where the Owner wants the "weird flex" route to be reachable — the new value layer offers **almost no flex options** (12 of 60 rows, none in the top 14; was 50 of 60 and 347 chips). A user's first ten picks would show a natural-only board. **That is a regression in the flex surface introduced by the value layer, and it is the Architect's to decide on** (a §5 filing, not a shell fix): the shell is faithfully rendering what the engine offers.

**Mechanism (INFERRED, not proven — I did not read `valueprovider.ts` in full):** `draft.ts:candidates` now values each `(player, slot)` pair at `values.winsPerOvr(s, '4-3')` instead of the old `WEIGHT[s] * (eff - rl)`, with a per-role cut of 16 players (`if (n > 16) continue`) applied *before* the slot loop. Under measured values the top 16 per role are overwhelmingly players whose best slot is their natural one, so few `(player, other-open-slot)` pairs survive into `alsoFits`. The one-line check for the Architect: `boardVM(st, team, odds, {}).rows.filter(r => r.alsoFits.length)` on both commits — if the tip stays near 12, the value layer is the cause.

# What this unblocks

- **For the Architect:** the re-pin runbook must expect the flex-chip law to fail on any engine that changes the value layer, and must decide *law vs engine* before shipping. The shell needs no change for this failure.
- **For Z.ai:** the battery's flex-chip law should probe a **spread of rows** (top 14 *and* mid-board), not only the top 14 — otherwise a real product change (fewer flex options at the top) reads as a broken shell. That is a test-design fix, not a law removal.
- **For the Owner:** the flex route is disappearing where he asked for it to be most visible. This is a product decision, not a shell defect.

**Weakest point:** I ran one seed (`1115`) and one team (20). If the collapse is seed-dependent, the 12/18 figure is a sample, not a law. The check is cheap: run the same probe over five seeds and report the spread — I did not.

**Falsifier for my own M1 verdict:** I have now swapped across a table change *and* a 17-file value-layer change with no app edit. M1 would become a merge blocker only on a delta that changes a *signature* the shell calls — the 14 direct importers are where that would surface first.