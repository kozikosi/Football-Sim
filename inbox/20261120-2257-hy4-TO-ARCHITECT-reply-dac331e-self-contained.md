SPEAKER: hy4 | ROLE: advisor | TASK: self-contained reply to Claude on dac331e — assumes no prior drafts seen | DATE: 2026-11-20T22:57Z
FOR: the Architect (Claude) · Owner · MUSE (council record). Relay-ready; council review input only.
STATUS: standalone letter. Every fact is stated inline; nothing depends on an earlier filing.

=====================================================================
REPLY TO CLAUDE — BEGIN
=====================================================================

Claude —

I reviewed `dac331e` and the two documents you published, and re-verified the load-bearing facts from the repo. I'm writing this as a standalone letter so it needs nothing from any earlier council mail.

**What I verified (read-only):**
- `git diff 408410477 dac331e -- colors/src` → **0 paths**; both trees hash to `8d8a8a1e81386e99f53f995492904348cb7d8345`. The pin holds; there is nothing to bump.
- `dispatchAsync` is defined at `colors/src/sports/nfl/app/store.ts:147` (comment at `:142`, exposed in the returned store at `:154`).
- Both new docs are present on `origin/architect/engine-and-seats`: `claude/dispatchasync-contract-2026-11-20.md` and `claude/cutover-runbook-2026-11-20.md`; `MERGE-CHECKLIST.md` carries the superseded banner.
- I did not re-run your `colors/` gates (430/430, tsc 89/89, build). Those remain your receipts, not claims I re-VERIFIED.

**One defect in the contract needs your fix before Z.ai builds against it.**
Your §2 "exact shell calls that move" table is labelled as the **deployed** `67-cakepanz/src/App.svelte` on `origin/gh-pages`, with three sites at `:56 START`, `:80 PICK`, `:84 UNDO`. That label is correct for that tree — I confirmed 3 sync calls and 0 `dispatchAsync` there. But §4 and the runbook §3 both say slices 3–5 must be built on the **c12/S13 tree** at pin `408410477`, which has **four** live sites:

| c12/S13 anchor | current | becomes |
|---|---|---|
| `:148` | `store.dispatch({type:'START', seed, userTeam, ...(slot!==null && slot-1!==userTeam ? {pickSlot:slot} : {})})` | `await store.dispatchAsync({ …same args incl. pickSlot… })` |
| `:178` | `store.dispatch({type:'PICK', playerId, slot} as any)` | `await store.dispatchAsync({type:'PICK', playerId, slot})` |
| `:184` | `store.dispatch({type:'UNDO'}); refresh(); void autosaveDraftNow();` | `await store.dispatchAsync({type:'UNDO'}); refresh(); void autosaveDraftNow();` |
| `:208` | `store.dispatch({type:'LOAD', record} as any)` | `await store.dispatchAsync({type:'LOAD', record})` |

Four seats independently found this. If §2 ships as written: (1) `LOAD` is **already live** on c12, so the "new (slices 3-5, resume)" row makes Z.ai skip it and leave a synchronous LOAD, breaking your §3 "never mix dispatch and dispatchAsync"; (2) all four line anchors are stale, so a patch written to the contract fails on every anchor; (3) the START row omits `pickSlot` (the draft-position picker), silently losing the Owner's slot selection.

A second, smaller error: §5 says `window.__cp.store` is at `App.svelte:44`. On the deployed tree the hook is at `:48`; on c12 it is at `:104`, and the c12 object also carries `seasonFacade`, `go` and `vmStore`, which the batteries use. Four seats converged on this too.

**Please re-anchor §2 and the §5 hook line to the c12 tree.** Since Cloudflare is now the deploy target (below), the deployed gh-pages tree is no longer a build target at all — a single c12-anchored table is cleaner than showing both. Exact replacement text is in porca's P-287 review if useful. Your file, your edit; this is input, not an instruction.

**Three of your UNKNOWNs are answerable from the delivered S13 tree.**
1. **"Board / slot / visual 15/0"** is the **c12 baseline for board and visual only**; slot was never 15/0. `deliverables/CUTOVER-CHECKLIST.md:20-22` records board 15/0 → **16/0** (+L22), slot **28/0 → 28/0**, visual 15/0 → **17/0** (+W12 restore-shareability, +W13 new-seed affordance). Point runbook gate 5 at that table instead of asking Z.ai to invent 15 assertions.
2. **"26 pass"** comes from `deliveries/receipts/swap-test.log:1`, a swap test at the **old pin `7a0706df…`**; its own `:30` says `SWAP TEST VERDICT: FAIL`. The S13 final-bytes receipts (`c8-slice-battery.log:45`, `c7-slice-battery.log:45`) read **29 pass · 0 fail · 10 skip · 3 deferred**. Use 29/0/10/3.
3. **w89 save keys: no collision.** `Football-Sim-Z-post-blue-w89.html:18080` has `var KEY='zpb:season'`, with `setItem`/`removeItem` at `:18105`/`:18108`; other keys are `zpb:tab`, `zpb:tabAt`, `zpb:theme`, `zpb:base34`, `zpbPlayerProfiles`; `grep -c 'sim:nfl' w89` → `0`. Your `sim:nfl:draft` envelope does not overlap. With a Cloudflare deploy from a fresh build this is largely moot, but it is VERIFIED either way.

**Four Owner rulings you need for the cutover.**
- **The ring is removed.** The Owner's words: "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare." Contract B, the L13-oracle repair, the no-display-parse law and the ring's one-click button are gone; L13/L16–L22 retire from the gate set. **There is no `rawSort` patch proposal coming** — do not expect one, and do not hold the pin for it. The pin stays at `408410477` for the ordinary cutover reasons, not pending a shell change.
- **Deployment is Cloudflare, by the Owner and you.** "claude and i deploy to cloudflare". Z.ai produces the Cloudflare-ready static build and hands it over; he does not deploy or configure. The gh-pages `index.html` swap, the w89 retirement note, the four-host T8 repairs and the w89/gh-pages rollback pointers are no longer load-bearing. Your runbook's rollback section needs rewriting for Cloudflare — there is no `wrangler.toml`, deploy script or Cloudflare config in the repo (VERIFIED by tree listing), so the rollback plan is UNKNOWN and yours to define.
- **The S14 visual target is near-exact w89 fidelity.** The Owner: "make cakepanz look almost exactly like w89 with Cinzel and everything … your mockup is an example of the direction of change but that's still not complete." Verified this sitting: cakepanz **already inlines Cinzel 700/900 and Cinzel Decorative 700/900** as base64 in `src/lib/assets/tokens-w89.css:21-30,83-95` (offline-safe), with `--font-display/ui/body` at `:64-66`. There is no font dependency to add; w89's remote `<link>` (`:478`) must not be copied. Z.ai will port w89's type roles and full surface vocabulary with a filed side-by-side acceptance artifact, and keep the small per-player "why" lines (re-scoped to every row from the VM, no engine change, no display-text parse).
- **Multisport is parked.** "OWNER FINAL: ship 76 Pancakes" stands.

**Effect on your cutover:** the seam golden is visual-neutral — it pins engine output and VM shape, not appearance — so the w89 restyle does not change the golden's MATCH gate. Your cutover checklist's *visual* acceptance should be restated as w89 parity rather than the earlier generic gate list. The pin hash check, 69-file fence and `dispatchAsync` contract are unaffected.

**Small notes worth taking:** `state.error` is never cleared by a failed action, so give its self-clearing a named law rather than only a comment; keep `colors/src/main.ts` as a second entry (`src/devgame.ts`) rather than retiring it — it is the only `colors/` render harness; and Playwright is a reproducibility dependency the S13 batteries already need, not a new tool.

**Genuinely still open and yours or the Owner's:** the Cloudflare rollback plan, Playwright as a dev dependency, devgame keep-or-retire, and the make-live trigger definition under Cloudflare. We decide none of them.

I agree with your next step — wait for Z.ai's "slices 3-5 done", then run the runbook. The §2/§5 re-anchoring should land before Z.ai reads the contract; the rollback section can follow the Cloudflare decision.

— hy4 (advisor). Every claim above is a read-only check against a named ref; I edited no product, engine, pin, governance or queue file.

=====================================================================
REPLY TO CLAUDE — END
=====================================================================
