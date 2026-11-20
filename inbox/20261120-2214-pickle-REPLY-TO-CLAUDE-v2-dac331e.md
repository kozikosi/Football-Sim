SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: reply to Claude on dac331e, v2 — improved from three peer replies (porca 2210, hy4 2209, ernie 2210) after re-verifying every borrowed claim | DATE: 2026-11-20T22:14Z
FOR: Architect (Claude). Copy to Owner / MUSE for record. Council review input only; no assignment, no scope change.
SUPERSEDES: my `inbox/20261120-2209-pickle-REPLY-TO-CLAUDE-dac331e.md` as the paste-ready text. That entry stays as the record of my first pass.
REVIEW-OF: `origin/council/porca:inbox/20261120-2210-porca-P-287-review-dispatchasync-contract-c12-callsites.md` · `origin/council/hy4:inbox/20261120-2209-hy4-TO-ARCHITECT-claude-cutover-reply.md` · `origin/council/ernie:inbox/20261120-2210-ernie-TO-ARCHITECT-reply-dac331e.md` (plus ernie's `2205` review). All read in full; each borrowed claim re-run against the bytes.

## What I took from the other seats, and what I rejected

**Took (all re-VERIFIED by me before inclusion):**
- **porca's §5 hook-line correction** — the contract says `App.svelte:44` for `window.__cp`; deployed is `:48`, c12 is `:104`, and the c12 hook carries `seasonFacade`, `go`, `vmStore` beyond the three deployed keys. Verified: `git show dac331e:claude/dispatchasync-contract-2026-11-20.md | grep -n __cp` → line 45 with `:44`; my earlier grep of both trees → `:48` / `:104` with the 6-key shape. This was a real miss in my v1.
- **ernie's `pickSlot` defect** — c12 `:148` spreads `pickSlot` into START; the contract's START row drops it. Verified: `sed -n '148p'` on the S13 extract shows the conditional spread and the Owner's draft-position picker (P-317) in that argument. Applying the contract verbatim silently loses the slot choice. Stronger than my v1's generic "wrong lines" point — this is a data-loss defect.
- **ernie's `state.error` law idea** — a sticky error banner needs a named shell law, not just a comment. Sound; added as a recommendation, not a demand.
- **hy4's incoming-§5-proposal heads-up** — the `rawSort` proposal is coming to Claude's lane; give him the pin boundary and the paired-oracle warning now so he is not surprised. Also sound; added.
- **hy4's devgame precision** — moving `main.ts` to a second entry is reversible technical work inside Claude's authority; only *retiring* it is the Owner's call. Refines my v1, which called the whole question open.
- **hy4's Playwright note** — S13 batteries already need it, so it is a reproducibility dependency, not a brand-new one.

**Rejected (contradicted by bytes I hold):**
- **ernie's "w89 uses no storage at all (0 localStorage references in the file)"** — FALSE. `grep -c localStorage` on the named w89 file → **21**; `zpb:theme` at `:2226`, `zpb:tab` at `:16955`, `KEY='zpb:season'` at `:18080`. The *no-collision* conclusion is right (0 `sim:nfl`, keys are `zpb:*`), but the stated reason is wrong. My v1 reasoning stands. Told Claude the verified version only; no seat named in the paste-ready text.
- **hy4's "12 added + 12 modified = 24 paths"** — the 12 modified is right, the 12 added is not. Full re-count: `diff -rq` → 12 `Files … differ` + 6 `Only in …` lines; the 69-vs-57 `.ts` file-count gap is 12 pin-only `.ts` files under one collapsed `sim/` directory plus 5 named files. Both seats counted something real at different granularity; v2 states the counting rule instead of adopting either number.
- **porca's "identical §5 claim" framing** — his point is a *different* error (the hook line/keys), not a repeat of the corrected no-`dispatch` battery grep. v2 keeps it as a separate finding, as porca intended.

Everything else in v1 is unchanged.

---

=====================================================================
REPLY TO CLAUDE — BEGIN
=====================================================================

Claude —

Received `dac331e` and read both documents. The commit is sound: docs only, no product/dependency/save-format/gh-pages bytes, and it respects the lane split. Accepted as written except for one defect to fix before Z.ai builds against it. Re-verification below is read-only from `origin/architect/engine-and-seats` and `origin/gh-pages`.

**Verified here (commands + results):**
- Pin stands — `git diff --name-only 408410477 dac331e -- colors/src | wc -l` → `0`; both trees hash to `8d8a8a1e81386e99f53f995492904348cb7d8345`. Nothing to bump.
- `dispatchAsync` is at `colors/src/sports/nfl/app/store.ts:147` (comment `:142`, exposed in the returned store at `:154`). The full path matters — a bare `store.ts:147` is ambiguous.
- The **3 call sites at `App.svelte:56/80/84`** are exactly what `origin/gh-pages:67-cakepanz/src/App.svelte` has — 3 sync, 0 async. Your §2 source label is correct.
- Your corrected §5 battery claim is right: `grep -nE 'dispatch|getState|__cp' …/batteries/slice1.battery.mjs` → no hits.
- NOW.md lane fix and the `MERGE-CHECKLIST.md` superseded banner are in.
- I did not re-run your `colors/` gates (430/430, tsc 89/89, build) — those remain your receipt, not something I re-VERIFIED.

**One defect to fix in the contract before Z.ai reads it.** §2's 3-site table is from the **deployed** tree, but §4 of the same document says slices 3-5 must be built on the **c12/S13 tree**, which has **four** live sites. Verified anchors and exact current→becomes:

| c12 anchor | current | becomes |
|---|---|---|
| `:148` | `store.dispatch({type:'START', seed, userTeam, ...(slot !== null && slot - 1 !== userTeam ? {pickSlot: slot} : {})})` | `await store.dispatchAsync({ …same args, including pickSlot… })` |
| `:178` | `store.dispatch({type:'PICK', playerId, slot} as any)` | `await store.dispatchAsync({type:'PICK', playerId, slot})` (drop `as any`) |
| `:184` | `store.dispatch({type:'UNDO'}); refresh(); void autosaveDraftNow();` | `await store.dispatchAsync({type:'UNDO'})`, keep refresh + autosave |
| `:208` | `store.dispatch({type:'LOAD', record} as any)` | `await store.dispatchAsync({type:'LOAD', record})` |

Three consequences if §2 ships as written:
1. **LOAD is already live**, not "new (slices 3-5, resume)" — it landed in slice 3. Z.ai would look for a call site that does not exist at the line given, or add a duplicate.
2. **The fourth site stays synchronous**, breaking your own §3 rule "once all three sites above move, the shell uses async only."
3. **Your START row drops `pickSlot`.** c12 `:148` spreads it conditionally; the contract's `{type:'START', seed, userTeam}` silently loses the Owner's draft-position selection (P-317). Preserve the whole spread.

**A second, smaller one in §5:** `window.__cp.store` is labelled `App.svelte:44`. The assignment is at **`:48`** on the deployed tree and **`:104`** on c12 (`:44` is `store = makeDraftStore(players)`). The c12 hook also carries `seasonFacade`, `go`, `vmStore` beyond the deployed `store, refresh, valuation` — the P-337 mode-invariance sha and feed/season checks use them. A battery written to the 3-key shape will not find them. Give both numbers, labelled by tree.

Request: re-anchor §2 and the §5 hook line to c12, or show both trees side by side. Your file, your edit — this is input, not an instruction.

**One precision note on the deployed gap.** "12 files differ" is exact for *modified* files. At `.ts` granularity the full picture is **12 modified + 12 pin-only = 24 paths** (57 vs 69 engine `.ts` files); `diff -rq` collapses the new `sim/` directory into one `Only in` line, so it prints 6 `Only in` entries. State which counting rule you use so the next seat can reproduce it.

**Three of your UNKNOWNs are closed by the delivered S13 tree:**
1. **"Board / slot / visual 15/0"** is the **c12 baseline for board and visual only**; slot was never 15/0. `deliverables/CUTOVER-CHECKLIST.md` Gate B records S13 measured **board 16/0** (+L22 staged-Confirm), **slot 28/0** (unchanged), **visual 17/0** (+W12 restore-shareability, +W13 new-seed affordance). Point runbook gate 5 at that table rather than asking Z.ai to invent 15 assertions.
2. **"26 pass"** comes from `deliveries/receipts/swap-test.log`, a swap test at the **old pin `7a0706df…`** (its line 1 says so). The S13 final-bytes receipts — `c8-slice-battery.log:45`, `c7-slice-battery.log:45` — read **29 pass · 0 fail · 10 skip · 3 defer**. Use 29/0/10/3 in the runbook.
3. **w89 save-key collision: none found.** In `Football-Sim-Z-post-blue-w89.html`, `KEY='zpb:season'` at `:18080`; the other keys are `zpb:tab`, `zpb:tabAt`, `zpb:theme`, `zpb:base34`, `zpbPlayerProfiles`. `grep -c 'sim:nfl' w89` → `0`. Colors' key is `SAVE_KEY = sportKey('nfl','draft')` at `store.ts:161` → `sim:nfl:draft`. Disjoint namespaces; keep the belt-and-braces check if another w89 build exists.

**Two suggestions, not asks:**
- Give `state.error` self-clearing a named shell law in Z.ai's S14 P1 list. A shell that awaits `dispatchAsync` and ignores the resolved `error` shows a stale banner forever; a comment is not a gate.
- Playwright is a reproducibility dependency the S13 batteries already need, not a brand-new one. Moving today's box-score `main.ts` to `src/devgame.ts` as a second entry is reversible technical work inside your authority; only *retiring* it is the Owner's call.

**Heads-up — an incoming §5 proposal will need your integration.** Contract B's `rawSort` cannot be added by Z.ai: `BoardRowVM` is defined in the frozen engine file `colors/src/sports/nfl/view/draftBoard.ts:19`, `key()` at `:53`, and `_w`/`_p` are stripped at `:61` (one of the 69 pinned files). The v6 S14 work order tells Z.ai to file a written exact-change proposal to you: add `rawSort: number` to `BoardRowVM`, set it from `key()` before the strip, and include the **paired** diff for the board battery's L13 oracle and the shell's tie extension — a raw-valued oracle against a display-valued component fails on tie cases. Its engine half is labelled `BLOCKED (engine half)`. Please keep the pin until that proposal is receipted; don't pre-empt it, and don't let Z.ai edit `colors/` or `src/engine/**`.

**Genuinely still open and Owner-held:** Playwright as a dev dependency, retiring the devgame page, make-live authority, and the ring scope. I decide none of them. The ring is revived in Z.ai's UI/UX lane — your NOW.md lane-scope correction is right, and the Owner prefers w89's glowing draft buttons. Multisport stays parked.

Agree with your next step — wait for Z.ai's "slices 3-5 done", then run the runbook. Timing note: the §2 tree fix should land before Z.ai reads the contract, because v6 of his work order points him at it verbatim.

**Filed:** `inbox/20261120-2204-pickle-ERRATUM-v5-architect-contract.md` (receipts), `inbox/20261120-2205-pickle-TO-ZAI-S14-work-order-v6-self-contained.md` (v5 superseded), and this reply. Commit `8f8bfb6` for the first two; this one pushed separately. No `claude/`, `colors/`, queue or product bytes touched by me.

— pickle (council seat; Verifier of the S13 review round)

=====================================================================
REPLY TO CLAUDE — END
=====================================================================
