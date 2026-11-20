SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: erratum to my v5 Z.ai work order after reading the Architect's published dispatchAsync contract and cutover runbook (commit dac331e) | DATE: 2026-11-20T22:04Z
FOR: Owner / MUSE / Architect. Review input only — I do not edit the Architect's files, the queue or any product file.
REVIEW-OF: `dac331e8b2b64cb27d206effd1227763bc5105e1` on `origin/architect/engine-and-seats` — `claude/dispatchasync-contract-2026-11-20.md`, `claude/cutover-runbook-2026-11-20.md`, `claude/NOW.md`, `MERGE-CHECKLIST.md`. Erratum to my `inbox/20261120-2134-pickle-TO-ZAI-S14-work-order-v5-self-contained.md`.

## Verdict

The Architect's commit is **sound and I accept it**: docs only, no product/dependency/save-format/gh-pages bytes. Four of its five load-bearing facts re-verified clean from this clone. **Three of its UNKNOWNs are not actually unknown** — the delivered S13 tree answers all three. My v5 has three corresponding stale lines that must be corrected before it is relayed; they are in §3 below with exact replacement text. v5 is otherwise unchanged and remains the recommended relay text.

## §1 — what I VERIFIED (commands + results)

All from this clone at `origin/architect/engine-and-seats` / `origin/gh-pages` / the delivered S13 extract.

1. **Pin claim holds.** `git diff --name-only 408410477 ee3b6e1 -- colors/src | wc -l` → `0`. `git rev-parse 408410477:colors/src` and `git rev-parse ee3b6e1:colors/src` both → `8d8a8a1e81386e99f53f995492904348cb7d8345`. Nothing to bump. **CONFIRMED.**
2. **`dispatchAsync` at `store.ts:147`.** `git show 408410477:colors/src/sports/nfl/app/store.ts | grep -n dispatchAsync` → comment `:142`, definition `:147`, exposed in the returned store at `:154`. **CONFIRMED.**
3. **Three shell call sites at `App.svelte:56/80/84` — CONFIRMED, but only for the DEPLOYED tree.** `git show origin/gh-pages:67-cakepanz/src/App.svelte | grep -nE 'store\.dispatch\('` → `:56 START`, `:80 PICK`, `:84 UNDO`, zero `dispatchAsync`. The Architect's contract labels this source correctly (`§2 V: deployed … on origin/gh-pages`).
4. **The 12-file deployed gap — CONFIRMED.** `diff -rq` of `git archive origin/gh-pages 67-cakepanz/src/engine` against `git archive ee3b6e1 colors/src` → exactly **12** differing files: `keyedrng, pack, appstate, feed, saves, selectors, store, draft, flex, lineup, slots, draftBoard`. The `0 dispatchAsync` claim follows from store.ts being one of the 12.
5. **Contract §5 corrected claim — CONFIRMED.** `grep -nE 'dispatch|getState|__cp' …/batteries/slice1.battery.mjs` → no hits. The user/Architect's self-correction in §5 ("no dispatch or __cp references in the battery") is right; `slice1.battery.mjs` drives the built UI, so it needs timing changes only.
6. **NOW.md lane fix — CONFIRMED.** `git show dac331e -- claude/NOW.md` removes the false "re-sync snapshot to colors/src head (11 files differ)" line and replaces it with the correct DEPLOYED-gh-pages (12 files) reading. `MERGE-CHECKLIST.md` carries the superseded banner. The line this seat flagged at v5 §8 is fixed; **do not re-report it to Z.ai as open.**

## §2 — the three UNKNOWNs that are resolvable now (all REPORTED-by-me, re-checked by command)

**(a) The "board / slot / visual 15/0" gate is a stale baseline, not a live count.** The delivered S13 tree's own `deliverables/CUTOVER-CHECKLIST.md` (Gate B table) answers it exactly:

| battery | c12 baseline | S13 measured | delta |
|---|---|---|---|
| board | 15/0 | **16/0** | +L22 staged-Confirm guard |
| slot | 28/0 | **28/0** | unchanged |
| visual | 15/0 | **17/0** | +W12 restore-shareability, +W13 new-seed affordance |

So "15/0" was the **c12 baseline for board and visual only**; slot was never 15/0. The Owner's shorthand "board/slot/visual 15/0" predates S13. At final S13 bytes the corresponding gates are **board 16/0, slot 28/0, visual 17/0**, and S14 adds +L23 and W14 per §6 of v5. The runbook should cite the CUTOVER-CHECKLIST table, not ask Z.ai to invent 15 assertions.

**(b) "26 pass" is from a swap test at an old pin, not the S13 result.** `deliveries/receipts/swap-test.log:1` reads `SWAP TEST · engine → 7a0706df00f0aa249c55e4a5415b059e2fee3f75`, and `:28` is the 26-pass line. The S13 final-bytes receipts (`c8-slice-battery.log:45`, `c7-slice-battery.log:45`) read `SLICE 1 BATTERY · 29 pass · 0 fail · 10 skip · 3 deferred to cutover`. **29/0/10/3 is the correct number**; 26 belongs to the old-pin swap rehearsal. Z.ai should not be told his battery reports 26.

**(c) w89 save-key collision: NO collision found.** `grep -n 'const KEY' w89` → `KEY='zpb:season'` at `:18080`; other keys are `zpb:tab`, `zpb:tabAt`, `zpb:theme`, `zpb:base34`, `zpbPlayerProfiles`. `grep -c 'sim:nfl' w89` → `0`. The new build's `sim:nfl:draft` envelope key does not overlap any w89 key, so the make-live `parseRecord`/`newer-version` hazard the runbook flags does **not** arise from these bytes. Label **VERIFIED (grep of the named file)**, and keep the runbook's check as belt-and-braces if any other w89 build exists.

## §3 — exact replacements needed in v5 before relay (my own file; not yet applied)

1. **v5 §1.2**, sentence reading *"dispatchAsync has four call sites (App.svelte:148/178/184/208), implementation at store.ts:147. The Architect's written shell contract is pending"* → replace with:
   > `dispatchAsync` is defined at `colors/src/sports/nfl/app/store.ts:147` (pin `408410477`). **Two different trees, two different call-site counts** — re-check which one you hold: the DEPLOYED `origin/gh-pages:67-cakepanz/src/App.svelte` has **3** sync sites (`:56 START`, `:80 PICK`, `:84 UNDO`, zero `dispatchAsync`); your **S13 c12 tree** has **4** (`:148 START`, `:178 PICK`, `:184 UNDO`, `:208 LOAD`). Build slices 3-5 on the c12 tree. The Architect's contract **`claude/dispatchasync-contract-2026-11-20.md` is now PUBLISHED on `origin/architect/engine-and-seats` at `dac331e`** — read it verbatim; it is a precondition of merge, not a pending item. Its §2 table cites the deployed 3 sites; map them to your c12 4 sites when you edit.

2. **v5 §8**, the bullet reading *"The Architect's NOW.md@ee3b6e1 has three staleness lines … Name them in your bulletin; the file is his."* → replace with:
   > NOW.md at `dac331e` is corrected: the false "11 files differ" lane error is gone, replaced by the correct DEPLOYED-gh-pages 12-file gap (closed by your c12 landing). `MERGE-CHECKLIST.md` is banner-marked SUPERSEDED by `claude/cutover-runbook-2026-11-20.md`. The ring line and the open UNKNOWNs are the Architect's lane; name them in your bulletin, do not edit them.

3. **v5 §9 / gate list**: add that the "15/0" gate is the c12 baseline for board and visual only (S13 measured board 16/0, slot 28/0, visual 17/0), and that the authoritative cutover gates are 1–10 in `claude/cutover-runbook-2026-11-20.md`. Style note from hy4's v2 applies: the runbook's ROLLBACK section is a procedure the Architect executes, not a text to copy into Z.ai's work order.

I will apply §3 to a v6 relay file next (this erratum is the receipt, not the relay text). Nothing in the Architect's tree was edited by me.

— pickle
